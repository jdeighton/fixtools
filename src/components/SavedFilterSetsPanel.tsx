import { useState, useCallback } from 'react'
import styles from './SavedFilterSetsPanel.module.css'
import { useApp } from '../context/AppContext'
import { appendFilterSet } from '../lib/filterLines'

export function SavedFilterSetsPanel() {
  const { filters, setFilters, filterSets, setFilterSets } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  const loadSet = useCallback((setId: string) => {
    const set = filterSets.find(s => s.id === setId)
    if (set) setFilters(appendFilterSet(filters, set))
  }, [filters, setFilters, filterSets])

  const deleteSet = useCallback((setId: string) => {
    setFilterSets(filterSets.filter(s => s.id !== setId))
  }, [filterSets, setFilterSets])

  if (filterSets.length === 0) return null

  return (
    <div className={styles.panel}>
      <button
        className={styles.toggle}
        onClick={() => setCollapsed(c => !c)}
        aria-expanded={!collapsed}
      >
        <span className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ''}`}>&#9650;</span>
        Saved Filter Sets ({filterSets.length})
      </button>
      {!collapsed && (
        <div className={styles.setList}>
          {filterSets.map(s => (
            <div key={s.id} className={styles.setRow}>
              <span className={styles.setName} title={s.name}>{s.name}</span>
              <button className={styles.loadBtn} onClick={() => loadSet(s.id)}>Load</button>
              <button className={styles.deleteBtn} onClick={() => deleteSet(s.id)} title="Delete preset">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
