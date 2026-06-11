import { useState, useCallback } from 'react'
import styles from './CopyRawButton.module.css'
import { useApp } from '../context/AppContext'
import { extractCopyText } from '../lib/copyText'

interface Props {
  rawLine: string
}

export function CopyRawButton({ rawLine }: Props) {
  const { settings } = useApp()
  const [copied, setCopied] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const text = extractCopyText(rawLine, settings.copyIncludePreamble)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [rawLine, settings.copyIncludePreamble])

  return (
    <button
      className={`${styles.btn} ${copied ? styles.copied : ''}`}
      onClick={handleClick}
      title={copied ? 'Copied!' : 'Copy raw line'}
    >
      {copied ? '✓' : '⧉'}
    </button>
  )
}
