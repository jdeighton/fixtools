import { useCallback, useState, useRef, useEffect } from 'react'
import styles from './FilterPanel.module.css'
import { useApp } from '../context/AppContext'
import { getFilterError, createFilterSet, generateId, type Filter } from '../lib/filterLines'

export function FilterPanel() {
  const { filters, setFilters, filterSets, setFilterSets } = useApp()
  const [saving, setSaving] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [nameError, setNameError] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (saving) nameInputRef.current?.focus()
  }, [saving])

  const addFilter = useCallback(() => {
    setFilters([...filters, { id: generateId(), text: '', isRegex: false }])
  }, [filters, setFilters])

  const updateFilter = useCallback((id: string, patch: Partial<Filter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...patch } : f))
  }, [filters, setFilters])

  const deleteFilter = useCallback((id: string) => {
    setFilters(filters.filter(f => f.id !== id))
  }, [filters, setFilters])

  const confirmSave = useCallback(() => {
    const name = presetName.trim()
    if (!name) { setNameError(true); return }
    setFilterSets([...filterSets, createFilterSet(name, filters)])
    setPresetName('')
    setSaving(false)
    setNameError(false)
  }, [presetName, filters, filterSets, setFilterSets])

  const cancelSave = useCallback(() => {
    setSaving(false)
    setPresetName('')
    setNameError(false)
  }, [])

  const onNameKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') confirmSave()
    if (e.key === 'Escape') cancelSave()
  }, [confirmSave, cancelSave])

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.label}>
          Filters{filters.length > 0 ? ` (${filters.length})` : ''}
        </span>
        {filters.length > 0 && !saving && (
          <button className={styles.saveBtn} onClick={() => setSaving(true)} title="Save current filters as a preset">
            Save as preset
          </button>
        )}
        <button className={styles.addBtn} onClick={addFilter} title="Add filter">
          + Add filter
        </button>
      </div>

      {saving && (
        <div className={styles.saveRow}>
          <input
            ref={nameInputRef}
            type="text"
            className={`${styles.textInput} ${nameError ? styles.textInputError : ''}`}
            value={presetName}
            onChange={e => { setPresetName(e.target.value); setNameError(false) }}
            onKeyDown={onNameKey}
            placeholder="Preset name…"
            spellCheck={false}
          />
          <button className={styles.confirmBtn} onClick={confirmSave} title="Save preset">✓</button>
          <button className={styles.deleteBtn} onClick={cancelSave} title="Cancel">✕</button>
        </div>
      )}

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
