import { useRef, useState } from 'react'
import type { AtdlDocument } from '../model'
import type { LibraryEntry } from '../lib/libraryStore'
import { LibraryStore } from '../lib/libraryStore'
import { loadDocument, formatBytes } from '../lib/loadDocument'
import { parseAtdlDocument } from '../parse'
import { DocumentInput } from './DocumentInput'
import { LibraryList } from './LibraryList'
import { MatrixTab } from './MatrixTab'
import { OrderTicketTab } from './OrderTicketTab'
import { ValidationTab } from './ValidationTab'
import styles from './FixatdlPage.module.css'

type InnerTab = 'validation' | 'matrix' | 'orderTicket'

const INNER_TABS: { id: InnerTab; label: string }[] = [
  { id: 'validation', label: 'Validation' },
  { id: 'matrix', label: 'Matrix' },
  { id: 'orderTicket', label: 'Order Ticket' },
]

type DupPrompt = {
  existing: LibraryEntry
  pendingEntry: LibraryEntry
  doc: AtdlDocument
}

export function FixatdlPage() {
  const storeRef = useRef<LibraryStore | null>(null)
  if (storeRef.current === null) storeRef.current = new LibraryStore()
  const store = storeRef.current

  const [railCollapsed, setRailCollapsed] = useState(false)
  const [innerTab, setInnerTab] = useState<InnerTab>('validation')
  const [entries, setEntries] = useState<LibraryEntry[]>(() => store.getEntries())
  const [activeEntry, setActiveEntry] = useState<LibraryEntry | null>(null)
  const [activeDoc, setActiveDoc] = useState<AtdlDocument | null>(null)
  const [dupPrompt, setDupPrompt] = useState<DupPrompt | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [sizeWarning, setSizeWarning] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeStrategyName, setActiveStrategyName] = useState<string | null>(null)

  function activate(entry: LibraryEntry, doc: AtdlDocument) {
    store.touch(entry.id)
    setActiveEntry(entry)
    setActiveDoc(doc)
    setEntries(store.getEntries())
  }

  async function handleLoad(xml: string, source: 'file' | 'paste' | 'sample', nameHint: string) {
    setIsLoading(true)
    setLoadError(null)
    setSizeWarning(null)

    const result = await loadDocument(xml, source, nameHint, store)
    setIsLoading(false)

    if (result.kind === 'too_large') {
      setLoadError(`File too large (${formatBytes(result.sizeBytes)}). Maximum is 10 MB.`)
      return
    }
    if (result.kind === 'duplicate') {
      setDupPrompt(result)
      return
    }
    if (result.kind === 'size_warned') {
      setSizeWarning(`Large document (${formatBytes(result.entry.xml.length)}) — parsing may be slow.`)
    }

    setEntries(store.getEntries())
    activate(result.entry, result.doc)
  }

  function handleSelectEntry(entry: LibraryEntry) {
    const doc = parseAtdlDocument(entry.xml)
    activate(entry, doc)
  }

  function handleRename(id: string, name: string) {
    store.rename(id, name)
    setEntries(store.getEntries())
    if (activeEntry?.id === id) setActiveEntry(e => e ? { ...e, name } : e)
  }

  function handleDelete(id: string) {
    store.remove(id)
    setEntries(store.getEntries())
    if (activeEntry?.id === id) { setActiveEntry(null); setActiveDoc(null) }
  }

  function handleDeleteAll() {
    store.removeAll()
    setEntries([])
    setActiveEntry(null)
    setActiveDoc(null)
  }

  function handleExport() {
    const json = store.exportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fixatdl-library.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportFile(file: File) {
    const reader = new FileReader()
    reader.onload = e => {
      const json = e.target?.result as string
      if (!json) return
      const { added, skipped } = store.importJSON(json)
      setEntries(store.getEntries())
      if (added > 0) setSizeWarning(`Imported ${added} document${added !== 1 ? 's' : ''}${skipped > 0 ? `, ${skipped} skipped (duplicate)` : ''}.`)
      else setLoadError(`Import found no new documents (${skipped} duplicate${skipped !== 1 ? 's' : ''}).`)
    }
    reader.readAsText(file)
  }

  function handleDupReplace() {
    if (!dupPrompt) return
    store.replace(dupPrompt.existing.id, dupPrompt.pendingEntry)
    const updated: LibraryEntry = { ...dupPrompt.pendingEntry, id: dupPrompt.existing.id }
    setEntries(store.getEntries())
    activate(updated, dupPrompt.doc)
    setDupPrompt(null)
  }

  function handleDupKeepBoth() {
    if (!dupPrompt) return
    store.add(dupPrompt.pendingEntry)
    setEntries(store.getEntries())
    activate(dupPrompt.pendingEntry, dupPrompt.doc)
    setDupPrompt(null)
  }

  const errorCount = activeDoc?.findings.filter(f => f.severity === 'error').length ?? 0
  const warningCount = activeDoc?.findings.filter(f => f.severity === 'warning').length ?? 0

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
            <DocumentInput onLoad={handleLoad} disabled={isLoading} />
            {loadError && (
              <div className={styles.bannerError}>
                {loadError}
                <button className={styles.bannerClose} onClick={() => setLoadError(null)} type="button">✕</button>
              </div>
            )}
            {sizeWarning && (
              <div className={styles.bannerWarn}>
                {sizeWarning}
                <button className={styles.bannerClose} onClick={() => setSizeWarning(null)} type="button">✕</button>
              </div>
            )}
            <div className={styles.sectionLabel}>Documents</div>
            <LibraryList
              entries={entries}
              activeId={activeEntry?.id ?? null}
              onSelect={handleSelectEntry}
              onRename={handleRename}
              onDelete={handleDelete}
              onDeleteAll={handleDeleteAll}
              onExport={handleExport}
              onImportFile={handleImportFile}
            />
          </div>
        )}
      </aside>

      <div className={styles.main}>
        <div className={styles.docHeader}>
          {activeEntry ? (
            <>
              <span className={styles.docName}>{activeEntry.name}</span>
              <span className={styles.docVersion}>
                {activeEntry.detectedVersion === 'unknown' ? '(version unknown)' : `FIXatdl ${activeEntry.detectedVersion}`}
              </span>
              <span className={styles.docStats}>
                {activeEntry.strategyCount} {activeEntry.strategyCount === 1 ? 'strategy' : 'strategies'}
              </span>
              {errorCount > 0 && (
                <span className={styles.badgeError}>{errorCount} error{errorCount !== 1 ? 's' : ''}</span>
              )}
              {warningCount > 0 && (
                <span className={styles.badgeWarn}>{warningCount} warning{warningCount !== 1 ? 's' : ''}</span>
              )}
            </>
          ) : (
            <span className={styles.docStatus}>No document loaded</span>
          )}
        </div>

        {dupPrompt && (
          <div className={styles.dupBanner}>
            <span className={styles.dupMsg}>
              <strong>"{dupPrompt.pendingEntry.name}"</strong> is already in the library
              as <strong>"{dupPrompt.existing.name}"</strong>. What would you like to do?
            </span>
            <div className={styles.dupActions}>
              <button className={styles.dupBtn} onClick={handleDupReplace} type="button">Replace existing</button>
              <button className={styles.dupBtn} onClick={handleDupKeepBoth} type="button">Keep both</button>
              <button className={`${styles.dupBtn} ${styles.dupBtnCancel}`} onClick={() => setDupPrompt(null)} type="button">Cancel</button>
            </div>
          </div>
        )}

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

        <div
          className={styles.innerContentFull}
          role="tabpanel"
        >
          {innerTab === 'validation' && (
            <ValidationTab doc={activeDoc} />
          )}
          {innerTab === 'matrix' && (
            <MatrixTab
              doc={activeDoc}
              onStrategySelect={name => { setActiveStrategyName(name); setInnerTab('orderTicket') }}
            />
          )}
          {innerTab === 'orderTicket' && (
            <OrderTicketTab
              doc={activeDoc}
              activeStrategyName={activeStrategyName}
              onStrategyChange={setActiveStrategyName}
            />
          )}
        </div>
      </div>
    </div>
  )
}
