import { useState, useMemo, useCallback, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useApp, type FixMessage } from '../../context/AppContext'
import { fieldName, msgTypeDescription } from '../../data/fixDictionary'
import { darkTheme } from '../../lib/gridTheme'
import styles from './CompareTab.module.css'

ModuleRegistry.registerModules([AllCommunityModule])

interface TagRow {
  tag: number
  name: string
  [key: string]: unknown
}

function colKey(msg: FixMessage) { return `msg_${msg.sequenceIndex}` }

function colHeader(msg: FixMessage): string {
  const mt = msg.tags.get(35) ?? '?'
  const ts = msg.timestamp ? msg.timestamp.toISOString().slice(11, 23) : ''
  return `#${msg.sequenceIndex + 1} — ${mt}${ts ? ' — ' + ts : ''}`
}

export function CompareTab() {
  const { messages, settings } = useApp()
  const threshold = settings.compareMaxAutoDisplay
  const exceeds = messages.length > threshold

  const [mode, setMode] = useState<'range' | 'individual'>('range')
  const [rangeStart, setRangeStart] = useState(1)
  const [rangeEnd, setRangeEnd] = useState(Math.min(threshold, messages.length))
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [showing, setShowing] = useState<FixMessage[] | null>(null)
  const [tagFilter, setTagFilter] = useState('')

  useEffect(() => {
    if (!exceeds) {
      setShowing(messages)
    } else {
      setShowing(null)
      setRangeEnd(Math.min(threshold, messages.length))
    }
  }, [messages, exceeds, threshold])

  const toggle = useCallback((idx: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(idx) ? n.delete(idx) : n.add(idx); return n })
  }, [])

  const showRange = () => {
    const s = Math.max(0, rangeStart - 1)
    const e = Math.min(messages.length, rangeEnd)
    setShowing(messages.slice(s, e))
  }

  const showIndividual = () => {
    setShowing(messages.filter(m => checked.has(m.sequenceIndex)))
  }

  const { rowData, colDefs } = useMemo(() => {
    if (!showing || showing.length === 0) return { rowData: [], colDefs: [] as ColDef<TagRow>[] }

    const allTags = new Set<number>()
    for (const msg of showing) for (const tag of msg.tags.keys()) allTags.add(tag)

    const sortedTags = [...allTags].sort((a, b) => a - b)

    let rows: TagRow[] = sortedTags.map(tag => {
      const row: TagRow = { tag, name: fieldName(tag) }
      for (const msg of showing) row[colKey(msg)] = msg.tags.get(tag) ?? ''
      return row
    })

    if (tagFilter) {
      const q = tagFilter.toLowerCase()
      rows = rows.filter(r => String(r.tag).includes(q) || r.name.toLowerCase().includes(q))
    }

    const cols: ColDef<TagRow>[] = [
      { field: 'tag', headerName: 'Tag #', width: 72, pinned: 'left', sort: 'asc' },
      { field: 'name', headerName: 'Tag Name', width: 170, pinned: 'left' },
      ...showing.map(msg => {
        const key = colKey(msg)
        return {
          field: key,
          headerName: colHeader(msg),
          minWidth: 130,
          flex: 1,
          cellStyle: (params: { data?: TagRow; value?: unknown }) => {
            const vals = showing.map(m => (params.data?.[colKey(m)] as string) ?? '')
            const nonEmpty = vals.filter(v => v !== '')
            if (nonEmpty.length === 0 || params.value === '') return { color: 'var(--text-muted)' }
            const allSame = nonEmpty.every(v => v === nonEmpty[0])
            return allSame
              ? { background: 'rgba(34,197,94,0.12)', color: '#4ade80' }
              : { background: 'rgba(239,68,68,0.12)', color: '#f87171' }
          },
        } as ColDef<TagRow>
      }),
    ]

    return { rowData: rows, colDefs: cols }
  }, [showing, tagFilter])

  if (messages.length === 0) {
    return <div className={styles.empty}>Load FIX messages to use the Compare tool.</div>
  }

  return (
    <div className={styles.root}>
      {exceeds && !showing && (
        <div className={styles.selector}>
          <p className={styles.selectorHint}>
            {messages.length} messages loaded — select which to compare (max auto-display: {threshold})
          </p>
          <div className={styles.modeTabs}>
            <button className={`${styles.modeBtn} ${mode === 'range' ? styles.active : ''}`} onClick={() => setMode('range')}>Range</button>
            <button className={`${styles.modeBtn} ${mode === 'individual' ? styles.active : ''}`} onClick={() => setMode('individual')}>Individual</button>
          </div>

          {mode === 'range' && (
            <div className={styles.rangeForm}>
              <label>From message</label>
              <input type="number" min={1} max={messages.length} value={rangeStart}
                onChange={e => setRangeStart(Number(e.target.value))} className={styles.numInput} />
              <label>to</label>
              <input type="number" min={1} max={messages.length} value={rangeEnd}
                onChange={e => setRangeEnd(Number(e.target.value))} className={styles.numInput} />
              <button className={styles.showBtn} onClick={showRange}>Show Comparison</button>
            </div>
          )}

          {mode === 'individual' && (
            <div className={styles.individualForm}>
              <div className={styles.msgList}>
                {messages.map(m => (
                  <label key={m.sequenceIndex} className={styles.msgItem}>
                    <input type="checkbox" checked={checked.has(m.sequenceIndex)} onChange={() => toggle(m.sequenceIndex)} />
                    <span className={styles.msgIdx}>#{m.sequenceIndex + 1}</span>
                    <span className={styles.msgType}>{m.tags.get(35)} — {msgTypeDescription(m.tags.get(35) ?? '')}</span>
                    <span className={styles.msgTs}>{m.timestamp?.toISOString().slice(11, 23) ?? ''}</span>
                    <span className={styles.msgDir}>{m.direction}</span>
                  </label>
                ))}
              </div>
              <button className={styles.showBtn} disabled={checked.size < 1} onClick={showIndividual}>
                Show Comparison ({checked.size} selected)
              </button>
            </div>
          )}
        </div>
      )}

      {showing && (
        <div className={styles.compareSection}>
          <div className={styles.filterRow}>
            <input className={styles.filter} placeholder="Filter by tag # or name..."
              value={tagFilter} onChange={e => setTagFilter(e.target.value)} />
            <span className={styles.hint}>{showing.length} message{showing.length !== 1 ? 's' : ''} compared, {rowData.length} tags</span>
            {exceeds && (
              <button className={styles.changeBtn} onClick={() => setShowing(null)}>Change Selection</button>
            )}
          </div>
          <div className={styles.gridWrap}>
            <AgGridReact theme={darkTheme} rowData={rowData} columnDefs={colDefs} animateRows={false} suppressCellFocus />
          </div>
        </div>
      )}
    </div>
  )
}
