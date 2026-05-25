import { useState, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { FIELDS, fieldValueDescription } from '../../data/fixDictionary'
import styles from './EnumsTab.module.css'

const FIX_VERSIONS = ['FIX.4.2', 'FIX.4.4', 'any'] as const

function versionLabel(v: string) {
  return v === 'any' ? 'Any' : v
}

function newId() {
  return Math.random().toString(36).slice(2, 10)
}

function TagName({ tag }: { tag: number }) {
  const name = FIELDS[tag]?.name
  return name ? <span className={styles.tagName}>{name}</span> : <span className={styles.tagNameUnknown}>Unknown tag</span>
}

function StandardValue({ tag, value }: { tag: number; value: string }) {
  const desc = fieldValueDescription(tag, value)
  if (desc) return <span className={styles.inStandard} title="Already in FIX standard">standard: {desc}</span>
  return null
}

export function EnumsTab() {
  const { customEnums, setCustomEnums } = useApp()

  const [addTag, setAddTag] = useState('')
  const [addValue, setAddValue] = useState('')
  const [addDesc, setAddDesc] = useState('')
  const [addVersion, setAddVersion] = useState('FIX.4.4')
  const [addError, setAddError] = useState('')

  const [editId, setEditId] = useState<string | null>(null)
  const [editTag, setEditTag] = useState('')
  const [editValue, setEditValue] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editVersion, setEditVersion] = useState('FIX.4.4')
  const [editError, setEditError] = useState('')

  const toggle = useCallback((id: string) => {
    setCustomEnums(customEnums.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e))
  }, [customEnums, setCustomEnums])

  const remove = useCallback((id: string) => {
    setCustomEnums(customEnums.filter(e => e.id !== id))
  }, [customEnums, setCustomEnums])

  const startEdit = useCallback((id: string) => {
    const entry = customEnums.find(e => e.id === id)
    if (!entry) return
    setEditId(id)
    setEditTag(String(entry.tag))
    setEditValue(entry.value)
    setEditDesc(entry.description)
    setEditVersion(entry.fixVersion || 'any')
    setEditError('')
  }, [customEnums])

  const cancelEdit = useCallback(() => {
    setEditId(null)
    setEditError('')
  }, [])

  const saveEdit = useCallback(() => {
    setEditError('')
    const tagNum = parseInt(editTag, 10)
    if (!editTag || isNaN(tagNum) || tagNum < 1) { setEditError('Enter a valid tag number.'); return }
    if (!editValue.trim()) { setEditError('Enter a value.'); return }
    if (!editDesc.trim()) { setEditError('Enter a description.'); return }
    if (customEnums.some(e => e.id !== editId && e.tag === tagNum && e.value === editValue.trim() && (e.fixVersion || 'any') === editVersion)) {
      setEditError(`Tag ${tagNum} value "${editValue.trim()}" already exists for ${versionLabel(editVersion)}.`); return
    }
    setCustomEnums(customEnums.map(e => e.id === editId
      ? { ...e, tag: tagNum, value: editValue.trim(), description: editDesc.trim(), fixVersion: editVersion }
      : e
    ))
    setEditId(null)
  }, [editId, editTag, editValue, editDesc, editVersion, customEnums, setCustomEnums])

  const handleAdd = useCallback(() => {
    setAddError('')
    const tagNum = parseInt(addTag, 10)
    if (!addTag || isNaN(tagNum) || tagNum < 1) { setAddError('Enter a valid tag number.'); return }
    if (!addValue.trim()) { setAddError('Enter a value.'); return }
    if (!addDesc.trim()) { setAddError('Enter a description.'); return }
    if (customEnums.some(e => e.tag === tagNum && e.value === addValue.trim() && (e.fixVersion || 'any') === addVersion)) {
      setAddError(`Tag ${tagNum} value "${addValue.trim()}" already exists for ${versionLabel(addVersion)}.`); return
    }
    setCustomEnums([...customEnums, {
      id: newId(),
      tag: tagNum,
      value: addValue.trim(),
      description: addDesc.trim(),
      fixVersion: addVersion,
      enabled: true,
    }])
    setAddTag('')
    setAddValue('')
    setAddDesc('')
  }, [addTag, addValue, addDesc, addVersion, customEnums, setCustomEnums])

  const enabledCount = customEnums.filter(e => e.enabled).length

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <h2>Custom Enum Accommodations</h2>
        <p>
          Add non-standard enum values that specific FIX clients send. Enabled entries suppress
          enum validation errors in the Validator tab for that tag/value combination.
          {customEnums.length > 0 && (
            <span className={styles.summary}> {enabledCount} of {customEnums.length} accommodation{customEnums.length !== 1 ? 's' : ''} active.</span>
          )}
        </p>
      </div>

      {/* Add form */}
      <div className={styles.addForm}>
        <h3>Add Accommodation</h3>
        <div className={styles.formRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="addTag">Tag #</label>
            <input
              id="addTag"
              className={styles.inputSm}
              type="number"
              min={1}
              placeholder="e.g. 150"
              value={addTag}
              onChange={e => setAddTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
            {addTag && !isNaN(parseInt(addTag)) && (
              <TagName tag={parseInt(addTag)} />
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="addValue">Value</label>
            <input
              id="addValue"
              className={styles.inputSm}
              placeholder="e.g. 1"
              value={addValue}
              onChange={e => setAddValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
            {addTag && addValue && !isNaN(parseInt(addTag)) && (
              <StandardValue tag={parseInt(addTag)} value={addValue} />
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="addDesc">Description</label>
            <input
              id="addDesc"
              className={styles.inputLg}
              placeholder="e.g. Partial Fill"
              value={addDesc}
              onChange={e => setAddDesc(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="addVersion">FIX Version</label>
            <select
              id="addVersion"
              className={styles.inputSm}
              value={addVersion}
              onChange={e => setAddVersion(e.target.value)}
            >
              {FIX_VERSIONS.map(v => (
                <option key={v} value={v}>{versionLabel(v)}</option>
              ))}
            </select>
          </div>

          <button className={styles.addBtn} onClick={handleAdd}>Add</button>
        </div>
        {addError && <p className={styles.addError}>{addError}</p>}
      </div>

      {/* Accommodation list */}
      {customEnums.length === 0 ? (
        <div className={styles.empty}>No accommodations defined yet. Add one above.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Active</th>
                <th>Tag #</th>
                <th>Tag Name</th>
                <th>Value</th>
                <th>Description</th>
                <th>FIX Version</th>
                <th>In Standard?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customEnums.map(entry => {
                const standardDesc = fieldValueDescription(entry.tag, entry.value)
                const fieldDef = FIELDS[entry.tag]
                const entryVersion = entry.fixVersion || 'any'

                if (entry.id === editId) {
                  const editTagNum = parseInt(editTag, 10)
                  const editStandardDesc = !isNaN(editTagNum) && editValue ? fieldValueDescription(editTagNum, editValue) : null
                  return (
                    <tr key={entry.id} className={styles.editRow}>
                      <td>
                        <button
                          className={`${styles.toggleBtn} ${entry.enabled ? styles.toggleOn : styles.toggleOff}`}
                          onClick={() => toggle(entry.id)}
                          title={entry.enabled ? 'Click to disable' : 'Click to enable'}
                          aria-label={entry.enabled ? 'Enabled — click to disable' : 'Disabled — click to enable'}
                        >
                          {entry.enabled ? 'ON' : 'OFF'}
                        </button>
                      </td>
                      <td>
                        <input
                          className={styles.editInputSm}
                          type="number"
                          min={1}
                          value={editTag}
                          onChange={e => setEditTag(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
                          autoFocus
                        />
                      </td>
                      <td className={styles.editHint}>
                        {!isNaN(editTagNum) && editTagNum > 0
                          ? (FIELDS[editTagNum]?.name ?? <span className={styles.tagNameUnknown}>Unknown</span>)
                          : ''}
                      </td>
                      <td>
                        <input
                          className={styles.editInputSm}
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
                        />
                      </td>
                      <td>
                        <div className={styles.editDescCell}>
                          <input
                            className={styles.editInputLg}
                            value={editDesc}
                            onChange={e => setEditDesc(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
                          />
                          {editError && <span className={styles.editError}>{editError}</span>}
                        </div>
                      </td>
                      <td>
                        <select
                          className={styles.editInputSm}
                          value={editVersion}
                          onChange={e => setEditVersion(e.target.value)}
                        >
                          {FIX_VERSIONS.map(v => (
                            <option key={v} value={v}>{versionLabel(v)}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {editStandardDesc
                          ? <span className={styles.inStandard} title={`Standard: ${editStandardDesc}`}>Yes — {editStandardDesc}</span>
                          : <span className={styles.notInStandard}>No</span>}
                      </td>
                      <td>
                        <div className={styles.actionCell}>
                          <button className={styles.saveBtn} onClick={saveEdit} aria-label="Save changes">Save</button>
                          <button className={styles.cancelBtn} onClick={cancelEdit} aria-label="Cancel edit">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )
                }

                return (
                  <tr key={entry.id} className={entry.enabled ? '' : styles.rowDisabled}>
                    <td>
                      <button
                        className={`${styles.toggleBtn} ${entry.enabled ? styles.toggleOn : styles.toggleOff}`}
                        onClick={() => toggle(entry.id)}
                        title={entry.enabled ? 'Click to disable' : 'Click to enable'}
                        aria-label={entry.enabled ? 'Enabled — click to disable' : 'Disabled — click to enable'}
                      >
                        {entry.enabled ? 'ON' : 'OFF'}
                      </button>
                    </td>
                    <td className={styles.monoCell}>{entry.tag}</td>
                    <td>{fieldDef?.name ?? <span className={styles.tagNameUnknown}>Unknown</span>}</td>
                    <td className={styles.monoCell}>{entry.value}</td>
                    <td>{entry.description}</td>
                    <td className={styles.versionCell}>{versionLabel(entryVersion)}</td>
                    <td>
                      {standardDesc
                        ? <span className={styles.inStandard} title={`Standard description: ${standardDesc}`}>Yes — {standardDesc}</span>
                        : <span className={styles.notInStandard}>No</span>
                      }
                    </td>
                    <td>
                      <div className={styles.actionCell}>
                        <button className={styles.editBtn} onClick={() => startEdit(entry.id)} aria-label="Edit accommodation">
                          ✏
                        </button>
                        <button className={styles.deleteBtn} onClick={() => remove(entry.id)} aria-label="Delete accommodation">
                          &#10005;
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
