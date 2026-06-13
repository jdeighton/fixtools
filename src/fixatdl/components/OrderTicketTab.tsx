import { useRef, useState, useEffect, useMemo } from 'react'
import type { AtdlDocument, Strategy, Control } from '../model'
import { generateFallbackLayout } from '../lib/fallbackLayout'
import { PanelTree } from './PanelTree'
import { StandardFieldsPanel } from './StandardFieldsPanel'
import type { StandardFieldsHandle } from './StandardFieldsPanel'
import { TicketContext } from '../ticket/TicketContext'
import type { TicketCtx } from '../ticket/TicketContext'
import type { ControlValue, TicketStateMap } from '../ticket/ticketTypes'
import {
  initTicketState,
  collectAllControls,
  applyRadioSelect,
} from '../ticket/resolveInit'
import {
  evaluateStateRules,
  createEngineState,
} from '../runtime/stateRuleEngine'
import type { ControlEffectiveState, EngineState } from '../runtime/stateRuleEngine'
import { FixOutputPanel } from './FixOutputTab'
import styles from './OrderTicketTab.module.css'

interface Props {
  doc: AtdlDocument | null
  activeStrategyName: string | null
  onStrategyChange: (name: string) => void
}

export function OrderTicketTab({ doc, activeStrategyName, onStrategyChange }: Props) {
  const sfRef = useRef<StandardFieldsHandle>(null)

  if (!doc) {
    return (
      <div className={styles.root}>
        <p className={styles.empty}>Load a FIXatdl document to render the order ticket.</p>
      </div>
    )
  }

  if (doc.strategies.length === 0) {
    return (
      <div className={styles.root}>
        <p className={styles.empty}>No strategies in this document.</p>
      </div>
    )
  }

  const strategy =
    doc.strategies.find(s => s.name === activeStrategyName) ?? doc.strategies[0]

  return <TicketShell strategy={strategy} doc={doc} sfRef={sfRef} onStrategyChange={onStrategyChange} />
}

interface ShellProps {
  strategy: Strategy
  doc: AtdlDocument
  sfRef: React.RefObject<StandardFieldsHandle>
  onStrategyChange: (name: string) => void
}

function TicketShell({ strategy, doc, sfRef, onStrategyChange }: ShellProps) {
  const useFallback = strategy.layout == null
  const layout = strategy.layout ?? generateFallbackLayout(strategy)

  const allControls = useMemo(() => collectAllControls(layout.panels), [layout])

  const [ticketState, setTicketState] = useState<TicketStateMap>(() =>
    initTicketState(layout.panels, null, strategy),
  )

  const engineStateRef = useRef<EngineState>(createEngineState())
  const [effectiveState, setEffectiveState] = useState<Map<string, ControlEffectiveState>>(new Map())

  useEffect(() => {
    setTicketState(initTicketState(layout.panels, sfRef.current ? (n => sfRef.current!.getStandardField(n)) : null, strategy))
    engineStateRef.current = createEngineState()
  }, [strategy.name])

  // Re-evaluate StateRules whenever ticketState changes
  useEffect(() => {
    const { effects, forcedValues, nextEngineState } = evaluateStateRules(
      allControls,
      ticketState,
      engineStateRef.current,
    )
    engineStateRef.current = nextEngineState
    setEffectiveState(effects)

    if (forcedValues.size > 0) {
      setTicketState(prev => {
        const next = new Map(prev)
        for (const [id, val] of forcedValues) next.set(id, val)
        return next
      })
    }
  }, [ticketState])

  function onChange(id: string, value: ControlValue) {
    setTicketState(prev => {
      const next = new Map(prev)
      next.set(id, value)
      return next
    })
  }

  function onRadioSelect(radioGroup: string, selectedId: string) {
    setTicketState(prev => applyRadioSelect(prev, allControls, radioGroup, selectedId))
  }

  function getStandardField(name: string): string | undefined {
    return sfRef.current?.getStandardField(name)
  }

  const [hoveredControlId, setHoveredControlId] = useState<string | null>(null)
  const [showFIXOutput, setShowFIXOutput] = useState(false)

  const ctx: TicketCtx = {
    state: ticketState,
    effectiveState,
    strategy,
    onChange,
    onRadioSelect,
    getStandardField,
    hoveredControlId,
    setHoveredControlId,
  }

  const hiddenControls = useMemo(
    () => allControls.filter((c: Control) => c.xsiType === 'HiddenField_t'),
    [allControls],
  )

  function optionText(s: Strategy): string {
    const parts = [s.uiRep ?? s.name]
    if (s.wireValue) parts.push(`(${s.wireValue})`)
    if (s.version) parts.push(`v${s.version}`)
    return parts.join(' ')
  }

  return (
    <TicketContext.Provider value={ctx}>
      <div className={styles.root}>
        <div className={styles.pickerBar}>
          <label className={styles.pickerLabel} htmlFor="ot-strategy-picker">Strategy</label>
          <select
            id="ot-strategy-picker"
            className={styles.pickerSelect}
            value={strategy.name}
            onChange={e => onStrategyChange(e.target.value)}
          >
            {doc.strategies.map(s => (
              <option key={s.name} value={s.name}>{optionText(s)}</option>
            ))}
          </select>
          <button
            type="button"
            className={`${styles.fixOutputToggle} ${showFIXOutput ? styles.fixOutputToggleActive : ''}`}
            onClick={() => setShowFIXOutput(v => !v)}
            aria-pressed={showFIXOutput}
          >
            {showFIXOutput ? 'Hide FIX' : 'Generate FIX'}
          </button>
        </div>

        <StandardFieldsPanel ref={sfRef} strategy={strategy} />

        {useFallback && (
          <div className={styles.fallbackBanner}>
            No StrategyLayout declared — showing generated layout
          </div>
        )}

        <div className={styles.ticketBody}>
          <PanelTree panels={layout.panels} />

          {hiddenControls.length > 0 && (
            <details className={styles.hiddenStrip}>
              <summary className={styles.hiddenStripSummary}>
                Hidden fields ({hiddenControls.length})
              </summary>
              <table className={styles.hiddenTable}>
                <tbody>
                  {hiddenControls.map(c => {
                    const val = ticketState.get(c.id)
                    const display = val?.initialized
                      ? String(val.raw ?? '')
                      : <em className={styles.unset}>unset</em>
                    return (
                      <tr key={c.id} className={styles.hiddenRow}>
                        <td className={styles.hiddenId}>{c.id}</td>
                        <td className={styles.hiddenVal}>{display}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </details>
          )}
        </div>

        {showFIXOutput && <FixOutputPanel doc={doc} />}
      </div>
    </TicketContext.Provider>
  )
}
