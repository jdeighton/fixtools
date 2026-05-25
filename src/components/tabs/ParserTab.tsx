import { useState, useMemo, useCallback, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useApp, type FixMessage } from '../../context/AppContext'
import { buildSummaryParts } from '../../lib/fixSummary'
import { fieldName } from '../../data/fixDictionary'
import { SequenceDiagram } from '../SequenceDiagram'
import { darkTheme } from '../../lib/gridTheme'
import styles from './ParserTab.module.css'

ModuleRegistry.registerModules([AllCommunityModule])

const DIAGRAM_THRESHOLD = 50

interface TimelineRow {
  idx: number
  time: string
  direction: string
  summaryText: string
  _msg: FixMessage
}

function SummaryCell({ msg }: { msg: FixMessage }) {
  const parts = buildSummaryParts(msg)
  return (
    <span>
      {parts.map((p, i) => (
        <span key={i} style={
          p.color === 'buy' ? { color: 'var(--buy)', fontWeight: 600 }
          : p.color === 'sell' ? { color: 'var(--sell)', fontWeight: 600 }
          : undefined
        }>{p.text}</span>
      ))}
    </span>
  )
}

function DirectionCell({ msg }: { msg: FixMessage }) {
  const sender = msg.tags.get(49) ?? ''
  const target = msg.tags.get(56) ?? ''
  return (
    <span className={styles.dirCell}>
      <span className={styles.compId}>{sender}</span>
      <span className={styles.arrow}>→</span>
      <span className={styles.compId}>{target}</span>
    </span>
  )
}

function TagDetail({ msg }: { msg: FixMessage }) {
  const rows = [...msg.tags.entries()].map(([tag, value]) => ({
    tag,
    name: fieldName(tag),
    value,
  }))
  return (
    <div className={styles.tagDetail}>
      <div className={styles.tagGrid}>
        {rows.map(r => (
          <div key={r.tag} className={styles.tagRow}>
            <span className={styles.tagNum}>{r.tag}</span>
            <span className={styles.tagName}>{r.name}</span>
            <span className={styles.tagVal}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ParserTab() {
  const { messages } = useApp()
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showDiagram, setShowDiagram] = useState(true)
  const [diagramRange, setDiagramRange] = useState<[number, number]>([1, Math.min(50, messages.length)])
  const [diagramMessages, setDiagramMessages] = useState<FixMessage[] | null>(null)
  const [pendingRange, setPendingRange] = useState(false)

  useEffect(() => {
    setSelectedIdx(messages.length > 0 ? 0 : null)
    setDiagramRange([1, Math.min(50, messages.length)])
    if (messages.length === 0) {
      setDiagramMessages(null)
      setPendingRange(false)
    } else if (messages.length > DIAGRAM_THRESHOLD) {
      setDiagramMessages(null)
      setPendingRange(true)
    } else {
      setDiagramMessages(messages)
      setPendingRange(false)
    }
  }, [messages])

  const rowData: TimelineRow[] = useMemo(() => messages.map(m => ({
    idx: m.sequenceIndex + 1,
    time: m.timestamp ? m.timestamp.toISOString().slice(11, 23) : '',
    direction: m.direction,
    summaryText: buildSummaryParts(m).map(p => p.text).join(''),
    _msg: m,
  })), [messages])

  const colDefs: ColDef<TimelineRow>[] = useMemo(() => [
    { field: 'idx', headerName: '#', width: 58 },
    { field: 'time', headerName: 'Time', width: 120, cellStyle: { fontFamily: 'var(--font-mono)', fontSize: '12px' } },
    {
      headerName: 'Direction',
      width: 210,
      cellRenderer: (p: { data?: TimelineRow }) => p.data ? <DirectionCell msg={p.data._msg} /> : null,
      valueGetter: p => p.data?.direction,
    },
    {
      headerName: 'Summary',
      flex: 1,
      minWidth: 200,
      cellRenderer: (p: { data?: TimelineRow }) => p.data ? <SummaryCell msg={p.data._msg} /> : null,
      valueGetter: p => p.data?.summaryText,
    },
  ], [])

  const onRowClicked = useCallback((e: { data?: TimelineRow }) => {
    if (e.data) setSelectedIdx(e.data._msg.sequenceIndex)
  }, [])

  const handleShowDiagram = () => {
    if (messages.length > DIAGRAM_THRESHOLD) {
      setPendingRange(true)
    } else {
      setDiagramMessages(messages)
    }
    setShowDiagram(true)
  }

  const applyDiagramRange = () => {
    const s = Math.max(0, diagramRange[0] - 1)
    const e = Math.min(messages.length, diagramRange[1])
    setDiagramMessages(messages.slice(s, e))
    setPendingRange(false)
  }

  const selectedMsg = selectedIdx !== null ? messages[selectedIdx] : null

  if (messages.length === 0) {
    return <div className={styles.empty}>Load FIX messages to use the Parser.</div>
  }

  return (
    <div className={styles.root}>
      {/* Timeline grid */}
      <div className={styles.timelineSection}>
        <div className={styles.gridWrap}>
          <AgGridReact
            theme={darkTheme}
            rowData={rowData}
            columnDefs={colDefs}
            rowSelection={{ mode: 'singleRow', checkboxes: false, enableClickSelection: true }}
            onRowClicked={onRowClicked}
            animateRows={false}
            suppressCellFocus
          />
        </div>
      </div>

      {/* Tag detail panel */}
      <div className={styles.detailSection}>
        <button className={styles.detailToggle} onClick={() => setShowDetail(d => !d)}>
          <span className={`${styles.chevron} ${showDetail ? '' : styles.chevronCollapsed}`}>▲</span>
          {selectedMsg
            ? <>Message #{selectedMsg.sequenceIndex + 1} — {selectedMsg.tags.get(35)} — {selectedMsg.direction}</>
            : 'Message Detail'}
        </button>
        {showDetail && !selectedMsg && <div className={styles.detailEmpty}>Click a message to inspect its tags</div>}
        {showDetail && selectedMsg && <TagDetail msg={selectedMsg} />}
      </div>

      {/* Sequence diagram */}
      <div className={styles.diagramSection}>
        <button className={styles.diagramToggle} onClick={() => { if (!showDiagram) handleShowDiagram(); else setShowDiagram(false) }}>
          <span className={`${styles.chevron} ${showDiagram ? '' : styles.chevronCollapsed}`}>▲</span>
          Sequence Diagram
          {showDiagram && diagramMessages && <span className={styles.diagHint}> — {diagramMessages.length} messages</span>}
        </button>

        {showDiagram && (
          <div className={styles.diagramBody}>
            {pendingRange && (
              <div className={styles.rangeGate}>
                <p>{messages.length} messages — the diagram may be large. Select a range:</p>
                <div className={styles.rangeForm}>
                  <label>From</label>
                  <input type="number" min={1} max={messages.length} value={diagramRange[0]}
                    onChange={e => setDiagramRange([Number(e.target.value), diagramRange[1]])}
                    className={styles.numInput} />
                  <label>to</label>
                  <input type="number" min={1} max={messages.length} value={diagramRange[1]}
                    onChange={e => setDiagramRange([diagramRange[0], Number(e.target.value)])}
                    className={styles.numInput} />
                  <button className={styles.renderBtn} onClick={applyDiagramRange}>Render Diagram</button>
                </div>
              </div>
            )}
            {diagramMessages && <SequenceDiagram messages={diagramMessages} />}
          </div>
        )}
      </div>
    </div>
  )
}
