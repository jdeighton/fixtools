import { useState } from 'react'
import styles from './FilteredDataPanel.module.css'
import { useApp } from '../context/AppContext'

export function FilteredDataPanel() {
  const { filters, filteredRawInput, rawInput } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  if (filters.length === 0) return null

  const totalLines = rawInput.split('\n').filter(l => l.trim()).length
  const matchedLines = filteredRawInput.split('\n').filter(l => l.trim()).length
  const status = `${matchedLines} of ${totalLines} lines match`

  return (
    <div className={styles.panel}>
      <button
        className={styles.toggle}
        onClick={() => setCollapsed(c => !c)}
        aria-expanded={!collapsed}
      >
        <span className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ''}`}>&#9650;</span>
        Filtered Data
        <span className={styles.statusInline}>{status}</span>
      </button>
      {!collapsed && (
        <div className={styles.body}>
          <textarea
            className={styles.textarea}
            value={filteredRawInput}
            readOnly
            rows={6}
            placeholder="No lines match the current filters."
          />
        </div>
      )}
    </div>
  )
}
