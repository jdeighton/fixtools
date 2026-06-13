import { useRef, useState, useCallback } from 'react'
import type { DragEvent, ChangeEvent, ClipboardEvent } from 'react'
import sampleXml from '../data/SampleStrategiesFor-v1_1.xml?raw'
import styles from './DocumentInput.module.css'

interface Props {
  onLoad: (xml: string, source: 'file' | 'paste' | 'sample', name: string) => void
  disabled?: boolean
}

export function DocumentInput({ onLoad, disabled }: Props) {
  const [dragging, setDragging] = useState(false)
  const [pasteText, setPasteText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pasteDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const readFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const xml = e.target?.result as string
      if (xml) onLoad(xml, 'file', file.name.replace(/\.[^.]+$/, ''))
    }
    reader.readAsText(file)
  }, [onLoad])

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave() {
    setDragging(false)
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) readFile(file)
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) readFile(file)
    e.target.value = ''
  }

  function handlePasteEvent(e: ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData('text')
    if (!text) return
    if (pasteDebounceRef.current) clearTimeout(pasteDebounceRef.current)
    pasteDebounceRef.current = setTimeout(() => {
      onLoad(text, 'paste', '')
      setPasteText('')
    }, 300)
  }

  function handleLoadClick() {
    if (pasteText.trim()) {
      onLoad(pasteText.trim(), 'paste', '')
      setPasteText('')
    }
  }

  return (
    <div className={styles.root}>
      <div
        className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label="Drop FIXatdl file here"
      >
        <span className={styles.dropIcon}>⬇</span>
        <span className={styles.dropLabel}>Drop .xml / .atdl here</span>
        <button
          className={styles.browseBtn}
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          type="button"
        >
          Browse…
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xml,.atdl,.fixatdl,.txt"
          className={styles.hiddenInput}
          onChange={handleFileChange}
          tabIndex={-1}
        />
      </div>

      <div className={styles.pasteSection}>
        <textarea
          className={styles.pasteArea}
          placeholder="Paste XML here…"
          value={pasteText}
          onChange={e => setPasteText(e.target.value)}
          onPaste={handlePasteEvent}
          rows={4}
          disabled={disabled}
          aria-label="Paste FIXatdl XML"
        />
        <button
          className={styles.loadBtn}
          onClick={handleLoadClick}
          disabled={disabled || !pasteText.trim()}
          type="button"
        >
          Load
        </button>
      </div>

      <button
        className={styles.sampleBtn}
        onClick={() => onLoad(sampleXml, 'sample', 'Sample v1.1')}
        disabled={disabled}
        type="button"
      >
        Load sample (v1.1)
      </button>
    </div>
  )
}
