import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './InputPanel.module.css'
import { useApp } from '../context/AppContext'
import { parseFixMessages } from '../lib/fixParser'

export function InputPanel() {
  const { rawInput, setRawInput, setMessages, messages } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const processInput = useCallback((text: string) => {
    setRawInput(text)
    const parsed = parseFixMessages(text)
    setMessages(parsed)
    if (parsed.length === 0) {
      setStatus(text.trim() ? 'No FIX messages detected.' : '')
    } else {
      const versions = [...new Set(parsed.map(m => m.fixVersion))].join(', ')
      const sessions = [...new Set(parsed.map(m => m.session))].length
      setStatus(`${parsed.length} FIX message${parsed.length !== 1 ? 's' : ''} detected (${versions}, ${sessions} session${sessions !== 1 ? 's' : ''})`)
    }
    if (text.trim()) setCollapsed(true)
  }, [setRawInput, setMessages])

  useEffect(() => {
    if (messages.length > 0 && !rawInput) setCollapsed(false)
  }, [messages.length, rawInput])

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text')
    if (text) {
      e.preventDefault()
      processInput(text)
    }
  }, [processInput])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }, [])

  const onDragLeave = useCallback(() => setDragging(false), [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => processInput(ev.target?.result as string ?? '')
    reader.readAsText(file)
  }, [processInput])

  const onTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setRawInput(text)
    if (!text.trim()) {
      setMessages([])
      setStatus('')
    }
  }, [setRawInput, setMessages])

  const onLoadClick = useCallback(() => {
    if (textareaRef.current) processInput(textareaRef.current.value)
  }, [processInput])

  return (
    <div className={styles.panel}>
      <button
        className={styles.toggle}
        onClick={() => setCollapsed(c => !c)}
        aria-expanded={!collapsed}
      >
        <span className={`${styles.chevron} ${collapsed ? styles.chevronCollapsed : ''}`}>&#9650;</span>
        Input Data
        {status && <span className={styles.statusInline}>{status}</span>}
      </button>
      {!collapsed && (
        <div className={styles.body}>
          <div
            className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              value={rawInput}
              onChange={onTextChange}
              onPaste={onPaste}
              placeholder="Paste FIX messages here, or drag and drop a log file..."
              rows={8}
            />
          </div>
          <div className={styles.footer}>
            <span className={styles.status}>{status || 'Paste or drop a FIX log file to begin'}</span>
            <button className={styles.loadBtn} onClick={onLoadClick}>Parse</button>
          </div>
        </div>
      )}
    </div>
  )
}
