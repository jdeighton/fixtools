import { useState } from 'react'
import styles from './FixatdlPage.module.css'

type InnerTab = 'validation' | 'matrix' | 'orderTicket'

const INNER_TABS: { id: InnerTab; label: string }[] = [
  { id: 'validation', label: 'Validation' },
  { id: 'matrix', label: 'Matrix' },
  { id: 'orderTicket', label: 'Order Ticket' },
]

export function FixatdlPage() {
  const [railCollapsed, setRailCollapsed] = useState(false)
  const [innerTab, setInnerTab] = useState<InnerTab>('validation')

  return (
    <div className={styles.page}>
      <aside className={`${styles.rail} ${railCollapsed ? styles.railCollapsed : ''}`}>
        <button
          className={styles.railToggle}
          onClick={() => setRailCollapsed(c => !c)}
          aria-expanded={!railCollapsed}
          aria-label={railCollapsed ? 'Expand library' : 'Collapse library'}
        >
          <span className={`${styles.chevron} ${railCollapsed ? styles.chevronCollapsed : ''}`}>&#9650;</span>
          <span className={styles.railLabel}>Library</span>
        </button>
        {!railCollapsed && (
          <div className={styles.railBody}>
            <p className={styles.emptyRail}>Document library and input zone — coming soon.</p>
          </div>
        )}
      </aside>

      <div className={styles.main}>
        <div className={styles.docHeader}>
          <span className={styles.docStatus}>No document loaded</span>
        </div>

        <nav className={styles.innerNav} role="tablist">
          {INNER_TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={innerTab === id}
              className={`${styles.innerTab} ${innerTab === id ? styles.innerTabActive : ''}`}
              onClick={() => setInnerTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.innerContent} role="tabpanel">
          {innerTab === 'validation' && (
            <p className={styles.emptyState}>Load a FIXatdl document to run validation.</p>
          )}
          {innerTab === 'matrix' && (
            <p className={styles.emptyState}>Load a FIXatdl document to view the parameter matrix.</p>
          )}
          {innerTab === 'orderTicket' && (
            <p className={styles.emptyState}>Load a FIXatdl document and select a strategy to render the order ticket.</p>
          )}
        </div>
      </div>
    </div>
  )
}
