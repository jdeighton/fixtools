import { useState, useMemo, useCallback, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueGetterParams,
  IHeaderParams,
  RowClickedEvent,
} from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import type { AtdlDocument, Parameter, StrategyPanel, StrategyLayout } from '../model'
import { darkTheme } from '../../lib/gridTheme'
import { ParameterDetail } from './ParameterDetail'
import type { ParamOccurrence } from './ParameterDetail'
import styles from './MatrixTab.module.css'

ModuleRegistry.registerModules([AllCommunityModule])

// ── Types ─────────────────────────────────────────────────────────────────────

interface CellData {
  use: 'optional' | 'required'
  isConst: boolean
  constValue?: string
  inRG: boolean
  param: Parameter
  stratName: string
}

interface MatrixRow {
  paramName: string
  xsiType: string
  fixTag: string
  cells: Map<string, CellData>
}

interface StrategyRow {
  name: string
  uiRep: string
  wireValue: string
  version: string
  fixMsgType: string
  providerID: string
  geography: string
  paramCount: number
  controlCount: number
  editCount: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildMatrixRows(doc: AtdlDocument): MatrixRow[] {
  const order: string[] = []
  const seen = new Set<string>()

  for (const s of doc.strategies) {
    for (const p of s.parameters) {
      if (!seen.has(p.name)) { seen.add(p.name); order.push(p.name) }
    }
    if (s.repeatingGroup) {
      for (const p of s.repeatingGroup.parameters) {
        if (!seen.has(p.name)) { seen.add(p.name); order.push(p.name) }
      }
    }
  }

  return order.map(paramName => {
    const cells = new Map<string, CellData>()
    const fixTags = new Set<string>()
    let xsiType = ''

    for (const s of doc.strategies) {
      const param = s.parameters.find(p => p.name === paramName)
      const rgParam = s.repeatingGroup?.parameters.find(p => p.name === paramName)
      const main = param ?? rgParam
      if (!main) continue

      if (!xsiType) xsiType = main.xsiType
      fixTags.add(main.fixTag?.toString() ?? '—')

      cells.set(s.name, {
        use: main.use,
        isConst: main.constValue != null,
        constValue: main.constValue,
        inRG: !param && !!rgParam,
        param: main,
        stratName: s.name,
      })
    }

    const fixTag =
      fixTags.size === 0 ? '—'
      : fixTags.size === 1 ? [...fixTags][0]
      : 'varies'

    return { paramName, xsiType, fixTag, cells }
  })
}

function countControls(layout: StrategyLayout | undefined): number {
  if (!layout) return 0
  let n = 0
  function walk(panel: StrategyPanel) {
    for (const child of panel.children) {
      if (child.kind === 'control') n++
      else walk(child)
    }
  }
  layout.panels.forEach(walk)
  return n
}

function summarizeGeography(s: AtdlDocument['strategies'][number]): string {
  const parts: string[] = []
  if (s.regions) {
    s.regions.regions.filter(r => r.inclusion === 'Include').forEach(r => parts.push(r.name))
  }
  if (s.markets) {
    s.markets.filter(m => m.inclusion === 'Include').forEach(m => parts.push(m.micCode))
  }
  if (s.securityTypes) {
    s.securityTypes.filter(t => t.inclusion === 'Include').forEach(t => parts.push(t.name))
  }
  return parts.length > 0 ? parts.join(', ') : 'All'
}

function buildStrategyRows(doc: AtdlDocument): StrategyRow[] {
  return doc.strategies.map(s => ({
    name: s.name,
    uiRep: s.uiRep ?? '—',
    wireValue: s.wireValue,
    version: s.version ?? '—',
    fixMsgType: s.fixMsgType ?? '—',
    providerID: s.providerID ?? '—',
    geography: summarizeGeography(s),
    paramCount: s.parameters.length + (s.repeatingGroup?.parameters.length ?? 0),
    controlCount: countControls(s.layout),
    editCount: s.strategyEdits.length + s.localEdits.length,
  }))
}

// ── Cell / header components ───────────────────────────────────────────────────

function MatrixCell({ value }: { value?: CellData | null }) {
  if (!value) return null
  return (
    <div className={styles.matrixCell}>
      <span
        className={`${styles.badge} ${value.use === 'required' ? styles.badgeR : styles.badgeO}`}
        title={value.use}
      >
        {value.use === 'required' ? 'R' : 'O'}
      </span>
      {value.isConst && (
        <span className={`${styles.badge} ${styles.badgeC}`} title={`const: ${value.constValue ?? ''}`}>
          C
        </span>
      )}
      {value.inRG && (
        <span className={`${styles.badge} ${styles.badgeRG}`} title="Member of RepeatingGroup">
          ⟳
        </span>
      )}
    </div>
  )
}

type StratHeaderExtra = { stratName: string; stratVersion?: string; onSelect: (n: string) => void }

function StrategyHeader(params: IHeaderParams & StratHeaderExtra) {
  return (
    <button
      className={styles.stratHeaderBtn}
      title={params.stratVersion ? `v${params.stratVersion}` : params.stratName}
      onClick={() => params.onSelect(params.stratName)}
    >
      {params.displayName}
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

interface Props {
  doc: AtdlDocument | null
  onStrategySelect: (name: string) => void
}

type SubTab = 'parameters' | 'strategies'

export function MatrixTab({ doc, onStrategySelect }: Props) {
  const [subTab, setSubTab] = useState<SubTab>('parameters')
  const [filterText, setFilterText] = useState('')
  const [selectedRow, setSelectedRow] = useState<MatrixRow | null>(null)
  const matrixApiRef = useRef<GridApi<MatrixRow> | null>(null)
  const stratApiRef = useRef<GridApi<StrategyRow> | null>(null)

  const matrixRows = useMemo(() => (doc ? buildMatrixRows(doc) : []), [doc])
  const strategyRows = useMemo(() => (doc ? buildStrategyRows(doc) : []), [doc])

  const isDegraded = useMemo(
    () => (doc?.findings.filter(f => f.severity === 'error').length ?? 0) > 0
       && (doc?.strategies.length ?? 0) > 0,
    [doc],
  )

  const matrixCols = useMemo((): ColDef<MatrixRow>[] => {
    const left: ColDef<MatrixRow>[] = [
      { field: 'paramName', headerName: 'Parameter', pinned: 'left', width: 190, sortable: true },
      { field: 'xsiType', headerName: 'Type', pinned: 'left', width: 180, sortable: true },
      { field: 'fixTag', headerName: 'FIX Tag', pinned: 'left', width: 90, sortable: true },
    ]
    if (!doc) return left

    const stratCols: ColDef<MatrixRow>[] = doc.strategies.map(s => ({
      colId: `s_${s.name}`,
      headerName: s.uiRep ?? s.name,
      headerComponent: StrategyHeader,
      headerComponentParams: {
        stratName: s.name,
        stratVersion: s.version,
        onSelect: onStrategySelect,
      } satisfies StratHeaderExtra,
      width: 110,
      sortable: false,
      resizable: true,
      valueGetter: (p: ValueGetterParams<MatrixRow>) => p.data?.cells.get(s.name) ?? null,
      cellRenderer: MatrixCell,
      getQuickFilterText: () => '',
    }))

    return [...left, ...stratCols]
  }, [doc, onStrategySelect])

  const strategyCols = useMemo((): ColDef<StrategyRow>[] => [
    { field: 'name', headerName: 'Name', width: 180, sortable: true },
    { field: 'uiRep', headerName: 'UI Label', width: 160, sortable: true },
    { field: 'wireValue', headerName: 'Wire Value', width: 110, sortable: true },
    { field: 'version', headerName: 'Version', width: 80, sortable: true },
    { field: 'fixMsgType', headerName: 'MsgType', width: 85, sortable: true },
    { field: 'providerID', headerName: 'Provider', width: 110, sortable: true },
    { field: 'geography', headerName: 'Regions / Markets / Security Types', flex: 1, minWidth: 160, sortable: true },
    { field: 'paramCount', headerName: 'Params', width: 80, sortable: true },
    { field: 'controlCount', headerName: 'Controls', width: 88, sortable: true },
    { field: 'editCount', headerName: 'Edit Rules', width: 95, sortable: true },
  ], [])

  const onMatrixReady = useCallback((e: GridReadyEvent<MatrixRow>) => {
    matrixApiRef.current = e.api
  }, [])

  const onStrategyReady = useCallback((e: GridReadyEvent<StrategyRow>) => {
    stratApiRef.current = e.api
  }, [])

  const onRowClicked = useCallback((e: RowClickedEvent<MatrixRow>) => {
    if (!e.data) return
    setSelectedRow(prev => prev?.paramName === e.data!.paramName ? null : e.data!)
  }, [])

  const exportCsv = useCallback(() => {
    matrixApiRef.current?.exportDataAsCsv({
      processCellCallback(params) {
        const cell = params.value as CellData | null
        if (!cell) return ''
        const parts: string[] = [cell.use === 'required' ? 'R' : 'O']
        if (cell.isConst) parts.push('C')
        if (cell.inRG) parts.push('RG')
        return parts.join(' ')
      },
    })
  }, [])

  const exportStrategiesCsv = useCallback(() => {
    stratApiRef.current?.exportDataAsCsv({ fileName: 'strategies.csv' })
  }, [])

  const detailOccurrences = useMemo((): ParamOccurrence[] => {
    if (!selectedRow) return []
    return [...selectedRow.cells.values()].map(c => ({
      stratName: c.stratName,
      param: c.param,
      use: c.use,
      inRG: c.inRG,
      isConst: c.isConst,
      constValue: c.constValue,
    }))
  }, [selectedRow])

  if (!doc) {
    return (
      <div className={styles.root}>
        <p className={styles.empty}>Load a FIXatdl document to view the parameter matrix.</p>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.subTabBar} role="tablist">
        {(['parameters', 'strategies'] as SubTab[]).map(id => (
          <button
            key={id}
            role="tab"
            aria-selected={subTab === id}
            className={`${styles.subTab} ${subTab === id ? styles.subTabActive : ''}`}
            onClick={() => setSubTab(id)}
          >
            {id === 'parameters' ? `Parameters (${matrixRows.length})` : `Strategies (${strategyRows.length})`}
          </button>
        ))}
      </div>

      {isDegraded && (
        <div className={styles.degradedBanner} role="alert">
          ⚠ Document has parse errors — data shown may be incomplete
        </div>
      )}

      {doc.strategies.length === 0 ? (
        <div className={styles.empty}>No strategies found in this document.</div>
      ) : (
        <>
          {subTab === 'parameters' && (
            <>
              <div className={styles.toolbar}>
                <input
                  className={styles.filterInput}
                  placeholder="Quick filter…"
                  value={filterText}
                  onChange={e => setFilterText(e.target.value)}
                  aria-label="Quick filter parameters"
                />
                <button className={styles.exportBtn} onClick={exportCsv}>Export CSV</button>
              </div>

              <div className={styles.gridDetailSplit}>
                <div className={styles.gridSection}>
                  <AgGridReact<MatrixRow>
                    theme={darkTheme}
                    rowData={matrixRows}
                    columnDefs={matrixCols}
                    quickFilterText={filterText}
                    onGridReady={onMatrixReady}
                    onRowClicked={onRowClicked}
                    rowSelection={{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }}
                    animateRows={false}
                    suppressCellFocus
                  />
                </div>

                <div className={`${styles.detailSection} ${selectedRow ? styles.detailSectionOpen : ''}`}>
                  {selectedRow && doc && (
                    <ParameterDetail
                      paramName={selectedRow.paramName}
                      fixTag={selectedRow.fixTag}
                      occurrences={detailOccurrences}
                      doc={doc}
                      onClose={() => setSelectedRow(null)}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {subTab === 'strategies' && (
            <>
              <div className={styles.toolbar}>
                <button className={styles.exportBtn} onClick={exportStrategiesCsv}>Export CSV</button>
              </div>
              <div className={styles.strategiesGrid}>
                <AgGridReact<StrategyRow>
                  theme={darkTheme}
                  rowData={strategyRows}
                  columnDefs={strategyCols}
                  onGridReady={onStrategyReady}
                  animateRows={false}
                  suppressCellFocus
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
