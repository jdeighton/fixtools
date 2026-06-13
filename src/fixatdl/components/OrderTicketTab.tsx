import type { AtdlDocument, Strategy } from '../model'
import { generateFallbackLayout } from '../lib/fallbackLayout'
import { PanelTree } from './PanelTree'
import styles from './OrderTicketTab.module.css'

interface Props {
  doc: AtdlDocument | null
  activeStrategyName: string | null
  onStrategyChange: (name: string) => void
}

export function OrderTicketTab({ doc, activeStrategyName, onStrategyChange }: Props) {
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

  const useFallback = strategy.layout == null
  const layout = strategy.layout ?? generateFallbackLayout(strategy)

  function optionText(s: Strategy): string {
    const parts = [s.uiRep ?? s.name]
    if (s.wireValue) parts.push(`(${s.wireValue})`)
    if (s.version) parts.push(`v${s.version}`)
    return parts.join(' ')
  }

  return (
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
      </div>

      {useFallback && (
        <div className={styles.fallbackBanner}>
          No StrategyLayout declared — showing generated layout
        </div>
      )}

      <div className={styles.ticketBody}>
        <PanelTree panels={layout.panels} />
      </div>
    </div>
  )
}
