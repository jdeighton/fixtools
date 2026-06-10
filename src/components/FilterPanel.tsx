import { useCallback } from 'react'
import styles from './FilterPanel.module.css'
import { useApp } from '../context/AppContext'
import { getFilterError, type Filter } from '../lib/filterLines'

let nextId = 1

export function FilterPanel() {
  const { filters, setFilters } = useApp()

  const addFilter = useCallback(() => {
    setFilters([...filters, { id: String(nextId++), text: '', isRegex: false }])
  }, [filters, setFilters])

  const updateFilter = useCallback((id: string, patch: Partial<Filter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...patch } : f))
  }, [filters, setFilters])

  const deleteFilter = useCallback((id: string) => {
    setFilters(filters.filter(f => f.id !== id))
  }, [filters, setFilters])

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.label}>
          Filters{filters.length > 0 ? ` (${filters.length})` : ''}
        </span>
        <button className={styles.addBtn} onClick={addFilter} title="Add filter">
          + Add filter
        </button>
      </div>

      {filters.length > 0 && (
        <div className={styles.filterList}>
          {filters.map(f => {
            const error = getFilterError(f)
            return (
              <div key={f.id}>
                <div className={styles.filterRow}>
                  <input
                    type="text"
                    className={`${styles.textInput} ${error ? styles.textInputError : ''}`}
                    value={f.text}
                    onChange={e => updateFilter(f.id, { text: e.target.value })}
                    placeholder={f.isRegex ? 'Regular expression…' : 'Text to match…'}
                    spellCheck={false}
                  />
                  <label className={styles.regexLabel} title="Toggle regex mode">
                    <span
                      className={`${styles.toggleTrack} ${f.isRegex ? styles.toggleTrackOn : ''}`}
                      onClick={() => updateFilter(f.id, { isRegex: !f.isRegex })}
                    >
                      <span className={`${styles.toggleThumb} ${f.isRegex ? styles.toggleThumbOn : ''}`} />
                    </span>
                    Regex
                  </label>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteFilter(f.id)}
                    title="Remove filter"
                  >
                    ✕
                  </button>
                </div>
                {error && <div className={styles.errorMsg}>{error}</div>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
