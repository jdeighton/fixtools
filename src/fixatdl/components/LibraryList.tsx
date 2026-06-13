import { useState, useRef, useEffect } from 'react'
import type { LibraryEntry } from '../lib/libraryStore'
import type { AtdlVersion } from '../model'
import styles from './LibraryList.module.css'

interface Props {
  entries: LibraryEntry[]
  activeId: string | null
  onSelect: (entry: LibraryEntry) => void
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
  onDeleteAll: () => void
  onExport: () => void
  onImportFile: (file: File) => void
}

const VERSION_BADGE: Record<AtdlVersion, string> = {
  '1.0': styles.badge10,
  '1.1': styles.badge11,
  '1.2': styles.badge12,
  'unknown': styles.badgeUnknown,
}

function EntryRow({
  entry, active, onSelect, onRename, onDelete,
}: {
  entry: LibraryEntry
  active: boolean
  onSelect: () => void
  onRename: (name: string) => void
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(entry.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  function commitRename() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== entry.name) onRename(trimmed)
    setEditing(false)
    setDraft(entry.name)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitRename()
    if (e.key === 'Escape') { setEditing(false); setDraft(entry.name) }
    e.stopPropagation()
  }

  return (
    <div
      className={`${styles.entry} ${active ? styles.entryActive : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      aria-current={active ? 'true' : undefined}
    >
      <div className={styles.entryTop}>
        {editing ? (
          <input
            ref={inputRef}
            className={styles.renameInput}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span
            className={styles.entryName}
            onDoubleClick={e => { e.stopPropagation(); setEditing(true); setDraft(entry.name) }}
            title={`${entry.name} (double-click to rename)`}
          >
            {entry.name}
          </span>
        )}
        <button
          className={styles.deleteBtn}
          onClick={e => { e.stopPropagation(); onDelete() }}
          title="Remove from library"
          aria-label={`Delete ${entry.name}`}
          type="button"
        >
          ✕
        </button>
      </div>
      <div className={styles.entryMeta}>
        <span className={`${styles.badge} ${VERSION_BADGE[entry.detectedVersion]}`}>
          {entry.detectedVersion === 'unknown' ? '?' : `v${entry.detectedVersion}`}
        </span>
        <span className={styles.metaText}>
          {entry.strategyCount} {entry.strategyCount === 1 ? 'strategy' : 'strategies'}
        </span>
      </div>
    </div>
  )
}

export function LibraryList({
  entries, activeId, onSelect, onRename, onDelete, onDeleteAll, onExport, onImportFile,
}: Props) {
  const importRef = useRef<HTMLInputElement>(null)

  function handleImportChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onImportFile(file)
    e.target.value = ''
  }

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <button
          className={styles.toolbarBtn}
          onClick={onExport}
          disabled={entries.length === 0}
          title="Export library as JSON"
          type="button"
        >
          Export
        </button>
        <button
          className={styles.toolbarBtn}
          onClick={() => importRef.current?.click()}
          title="Import library from JSON"
          type="button"
        >
          Import
        </button>
        <button
          className={`${styles.toolbarBtn} ${styles.toolbarBtnDanger}`}
          onClick={onDeleteAll}
          disabled={entries.length === 0}
          title="Clear all library entries"
          type="button"
        >
          Clear all
        </button>
        <input
          ref={importRef}
          type="file"
          accept=".json"
          className={styles.hiddenInput}
          onChange={handleImportChange}
        />
      </div>

      {entries.length === 0 ? (
        <p className={styles.empty}>No documents loaded yet.</p>
      ) : (
        <div className={styles.list}>
          {entries.map(entry => (
            <EntryRow
              key={entry.id}
              entry={entry}
              active={entry.id === activeId}
              onSelect={() => onSelect(entry)}
              onRename={name => onRename(entry.id, name)}
              onDelete={() => onDelete(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
