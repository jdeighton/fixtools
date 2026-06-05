import { useState, useCallback, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, GridReadyEvent } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useApp, type FixMessage } from '../../context/AppContext'
import { buildSummaryParts, buildSummaryText } from '../../lib/fixSummary'
import { fieldName, fieldValueDescription, msgTypeDescription } from '../../data/fixDictionary'
import { darkTheme } from '../../lib/gridTheme'
import styles from './TranslatorTab.module.css'

ModuleRegistry.registerModules([AllCommunityModule])

// Header/trailer tag sets for splitting detail panels
const SESSION_TAGS = new Set([8, 9, 35, 49, 56, 34, 52, 43, 97, 122, 369, 10, 89, 93])

interface MsgRow {
  sequenceIndex: number
  time: string
  date: string
  direction: string
  session: string
  msgType: string
  msgTypeDesc: string
  clOrdId: string
  summaryText: string
  _msg: FixMessage
}

interface TagRow {
  tag: number
  name: string
  value: string
  description: string
}

function formatTime(ts: Date | null): string {
  if (!ts) return ''
  return ts.toISOString().slice(11, 23) // HH:MM:SS.mmm
}

function formatDate(ts: Date | null): string {
  if (!ts) return ''
  return ts.toISOString().slice(0, 10)
}

function GroupInstance({
  idx, instance, fixVersion, resolveDesc,
}: {
  idx: number
  instance: Record<number, string>
  fixVersion: string
  resolveDesc: (tag: number, value: string, version: string) => string
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.instanceEntry}>
      <button className={styles.instanceToggle} onClick={() => setOpen(o => !o)}>
        <span className={`${styles.chevron} ${open ? '' : styles.chevronCollapsed}`}>▲</span>
        Instance {idx + 1}
      </button>
      {open && (
        <div className={styles.instanceRows}>
          {Object.entries(instance).map(([tagStr, value]) => {
            const tag = Number(tagStr)
            return (
              <div key={tag} className={styles.instanceTagRow}>
                <span className={styles.groupTagNum}>{tag}</span>
                <span className={styles.groupTagName}>{fieldName(tag)}</span>
                <span className={styles.groupTagVal}>{value}</span>
                <span className={styles.groupTagDesc}>{resolveDesc(tag, value, fixVersion)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function GroupEntry({
  noXTag, instances, fixVersion, resolveDesc,
}: {
  noXTag: number
  instances: Record<number, string>[]
  fixVersion: string
  resolveDesc: (tag: number, value: string, version: string) => string
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className={styles.groupEntry}>
      <button className={styles.groupToggle} onClick={() => setOpen(o => !o)}>
        <span className={`${styles.chevron} ${open ? '' : styles.chevronCollapsed}`}>▲</span>
        {fieldName(noXTag)} ({noXTag}) — {instances.length} instance{instances.length !== 1 ? 's' : ''}
      </button>
      {open && instances.map((inst, i) => (
        <GroupInstance key={i} idx={i} instance={inst} fixVersion={fixVersion} resolveDesc={resolveDesc} />
      ))}
    </div>
  )
}

function SummaryCell({ msg }: { msg: FixMessage }) {
  const parts = buildSummaryParts(msg)
  return (
    <span>
      {parts.map((p, i) => (
        <span key={i} style={p.color === 'buy' ? { color: 'var(--buy)', fontWeight: 600 } : p.color === 'sell' ? { color: 'var(--sell)', fontWeight: 600 } : undefined}>
          {p.text}
        </span>
      ))}
    </span>
  )
}

export function TranslatorTab() {
  const { messages, customEnums, settings } = useApp()

  const customEnumDesc = useMemo(() => {
    const map = new Map<string, string>()
    for (const e of customEnums) {
      if (e.enabled && e.description) map.set(`${e.tag}:${e.value}:${e.fixVersion || 'any'}`, e.description)
    }
    return map
  }, [customEnums])
  const [selected, setSelected] = useState<FixMessage | null>(null)
  const [msgFilter, setMsgFilter] = useState('')
  const [sessionFilter, setSessionFilter] = useState('')
  const [bizFilter, setBizFilter] = useState('')
  const gridRef = useRef<AgGridReact>(null)

  const visibleMessages = useMemo(
    () => settings.hideHeartbeats ? messages.filter(m => m.tags.get(35) !== '0') : messages,
    [messages, settings.hideHeartbeats]
  )

  const rowData: MsgRow[] = useMemo(() => visibleMessages.map(m => ({
    sequenceIndex: m.sequenceIndex,
    time: formatTime(m.timestamp),
    date: formatDate(m.timestamp),
    direction: m.direction,
    session: m.session,
    msgType: m.tags.get(35) ?? '',
    msgTypeDesc: msgTypeDescription(m.tags.get(35) ?? ''),
    clOrdId: m.tags.get(11) ?? '',
    summaryText: buildSummaryText(m),
    _msg: m,
  })), [visibleMessages])

  const colDefs: ColDef<MsgRow>[] = useMemo(() => [
    { field: 'time', headerName: 'Time', width: 110, pinned: 'left' },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'direction', headerName: 'Direction', width: 180 },
    { field: 'session', headerName: 'Session', width: 160 },
    {
      headerName: 'MsgType',
      width: 200,
      valueGetter: p => `${p.data?.msgType} — ${p.data?.msgTypeDesc}`,
    },
    { field: 'clOrdId', headerName: 'ClOrdID', width: 140 },
    {
      headerName: 'Summary',
      flex: 1,
      minWidth: 200,
      valueGetter: p => p.data?.summaryText,
      cellRenderer: (p: { data?: MsgRow }) => p.data ? <SummaryCell msg={p.data._msg} /> : null,
    },
  ], [])

  const onGridReady = useCallback((e: GridReadyEvent) => {
    if (visibleMessages.length > 0) {
      e.api.getDisplayedRowAtIndex(0)?.setSelected(true)
      setSelected(visibleMessages[0])
    }
  }, [visibleMessages])

  const onRowClicked = useCallback((e: { data?: MsgRow }) => {
    if (e.data) setSelected(e.data._msg)
  }, [])


  const resolveDesc = useCallback((tag: number, value: string, msgFixVersion: string): string =>
    customEnumDesc.get(`${tag}:${value}:${msgFixVersion}`)
    ?? customEnumDesc.get(`${tag}:${value}:any`)
    ?? fieldValueDescription(tag, value)
    ?? ''
  , [customEnumDesc])

  const sessionTagRows: TagRow[] = useMemo(() => {
    if (!selected) return []
    const rows: TagRow[] = []
    for (const [tag, value] of selected.tags) {
      if (!SESSION_TAGS.has(tag)) continue
      rows.push({ tag, name: fieldName(tag), value, description: resolveDesc(tag, value, selected.fixVersion) })
    }
    return rows.sort((a, b) => a.tag - b.tag)
  }, [selected, resolveDesc])

  const bizTagRows: TagRow[] = useMemo(() => {
    if (!selected) return []
    const rows: TagRow[] = []
    for (const [tag, value] of selected.tags) {
      if (SESSION_TAGS.has(tag)) continue
      rows.push({ tag, name: fieldName(tag), value, description: resolveDesc(tag, value, selected.fixVersion) })
    }
    return rows.sort((a, b) => a.tag - b.tag)
  }, [selected, resolveDesc])

  const tagColDefs: ColDef<TagRow>[] = useMemo(() => [
    { field: 'tag', headerName: 'Tag #', width: 70 },
    { field: 'name', headerName: 'Tag Name', width: 160 },
    { field: 'value', headerName: 'Value', width: 120 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 120 },
  ], [])

  const filterTagRows = useCallback((rows: TagRow[], filter: string): TagRow[] => {
    if (!filter) return rows
    const q = filter.toLowerCase()
    return rows.filter(r =>
      String(r.tag).includes(q) || r.name.toLowerCase().includes(q) ||
      r.value.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    )
  }, [])

  if (messages.length === 0) {
    return <div className={styles.empty}>Load FIX messages to use the Translator.</div>
  }

  return (
    <div className={styles.root}>
      <div className={styles.msgSection}>
        <div className={styles.filterRow}>
          <input
            className={styles.filter}
            placeholder="Filter messages..."
            value={msgFilter}
            onChange={e => setMsgFilter(e.target.value)}
          />
          <span className={styles.count}>{visibleMessages.length} message{visibleMessages.length !== 1 ? 's' : ''}</span>
        </div>
        <div className={styles.gridWrap}>
          <AgGridReact
            ref={gridRef}
            theme={darkTheme}
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }}
            onGridReady={onGridReady}
            onRowClicked={onRowClicked}
            quickFilterText={msgFilter}
            animateRows={false}
            suppressCellFocus
          />
        </div>
      </div>

      <div className={styles.detailSection}>
        <div className={styles.detailPanel}>
          <div className={styles.panelHeader}>
            Session Level Tags
            <input className={styles.filterSm} placeholder="Filter..." value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} />
          </div>
          <div className={styles.detailGrid}>
            <AgGridReact
              theme={darkTheme}
              rowData={filterTagRows(sessionTagRows, sessionFilter)}
              columnDefs={tagColDefs}
              animateRows={false}
              suppressCellFocus
            />
          </div>
        </div>

        <div className={styles.detailPanel}>
          <div className={styles.panelHeader}>
            Business Level Tags
            <input className={styles.filterSm} placeholder="Filter..." value={bizFilter} onChange={e => setBizFilter(e.target.value)} />
          </div>
          <div className={styles.detailGrid}>
            <AgGridReact
              theme={darkTheme}
              rowData={filterTagRows(bizTagRows, bizFilter)}
              columnDefs={tagColDefs}
              animateRows={false}
              suppressCellFocus
            />
          </div>
        </div>

        {selected && selected.groups.size > 0 && (
          <div className={styles.detailPanel}>
            <div className={styles.panelHeader}>Repeating Groups</div>
            <div className={styles.groupsBody}>
              {[...selected.groups.entries()].map(([noXTag, instances]) => (
                <GroupEntry
                  key={noXTag}
                  noXTag={noXTag}
                  instances={instances}
                  fixVersion={selected.fixVersion}
                  resolveDesc={resolveDesc}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
