import { useMemo, useState } from 'react'
import { useApp } from '../../context/AppContext'
import { validateMessage, type ValidationIssue } from '../../lib/fixValidator'
import { msgTypeDescription } from '../../data/fixDictionary'
import styles from './ValidatorTab.module.css'

interface MsgResult {
  sequenceIndex: number
  msgType: string
  direction: string
  timestamp: string
  issues: ValidationIssue[]
  errorCount: number
  warningCount: number
}

export function ValidatorTab() {
  const { messages, settings, customEnums } = useApp()
  const [filter, setFilter] = useState('')

  const results: MsgResult[] = useMemo(() => messages.map(msg => {
    const issues = validateMessage(msg, settings, customEnums)
    return {
      sequenceIndex: msg.sequenceIndex,
      msgType: msg.tags.get(35) ?? '?',
      direction: msg.direction,
      timestamp: msg.timestamp ? msg.timestamp.toISOString().slice(11, 23) : '',
      issues,
      errorCount: issues.filter(i => i.severity === 'error').length,
      warningCount: issues.filter(i => i.severity === 'warning').length,
    }
  }), [messages, settings, customEnums])

  const failing = useMemo(() => {
    const withIssues = results.filter(r => r.issues.length > 0)
    if (!filter) return withIssues
    const q = filter.toLowerCase()
    return withIssues.filter(r =>
      String(r.sequenceIndex + 1).includes(q) ||
      r.msgType.toLowerCase().includes(q) ||
      r.direction.toLowerCase().includes(q) ||
      r.issues.some(i =>
        i.severity.includes(q) ||
        (i.tag !== undefined && String(i.tag).includes(q)) ||
        i.tagName.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
      )
    )
  }, [results, filter])

  const totalErrors = results.reduce((s, r) => s + r.errorCount, 0)
  const totalWarnings = results.reduce((s, r) => s + r.warningCount, 0)

  if (messages.length === 0) {
    return <div className={styles.empty}>Load FIX messages to run validation.</div>
  }

  return (
    <div className={styles.root}>
      {/* Summary banner */}
      {totalErrors === 0 && totalWarnings === 0 ? (
        <div className={styles.successBanner}>
          All {messages.length} message{messages.length !== 1 ? 's' : ''} passed validation.
        </div>
      ) : (
        <div className={styles.errorBanner}>
          {totalErrors > 0 && <span>{totalErrors} error{totalErrors !== 1 ? 's' : ''}</span>}
          {totalErrors > 0 && totalWarnings > 0 && <span className={styles.sep}>·</span>}
          {totalWarnings > 0 && <span className={styles.warnText}>{totalWarnings} warning{totalWarnings !== 1 ? 's' : ''}</span>}
          <span className={styles.bannerSub}> across {results.filter(r => r.issues.length > 0).length} of {messages.length} messages</span>
        </div>
      )}

      {/* Filter + results */}
      {failing.length > 0 || filter ? (
        <div className={styles.body}>
          <div className={styles.filterRow}>
            <input
              className={styles.filter}
              placeholder="Filter by message #, severity, tag, or description..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>

          <div className={styles.results}>
            {failing.map(r => (
              <div key={r.sequenceIndex} className={styles.msgBlock}>
                <div className={styles.msgHeader}>
                  <span className={styles.msgIdx}>Message #{r.sequenceIndex + 1}</span>
                  <span className={styles.msgType}>{r.msgType} — {msgTypeDescription(r.msgType)}</span>
                  <span className={styles.msgTs}>{r.timestamp}</span>
                  <span className={styles.msgDir}>{r.direction}</span>
                  <div className={styles.badges}>
                    {r.errorCount > 0 && <span className={styles.badgeError}>{r.errorCount} error{r.errorCount !== 1 ? 's' : ''}</span>}
                    {r.warningCount > 0 && <span className={styles.badgeWarn}>{r.warningCount} warning{r.warningCount !== 1 ? 's' : ''}</span>}
                  </div>
                </div>
                <table className={styles.issueTable}>
                  <thead>
                    <tr>
                      <th>Severity</th>
                      <th>Tag #</th>
                      <th>Tag Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.issues.map((issue, ii) => (
                      <tr key={ii} className={issue.severity === 'error' ? styles.rowError : styles.rowWarn}>
                        <td>
                          <span className={issue.severity === 'error' ? styles.badgeError : styles.badgeWarn}>
                            {issue.severity}
                          </span>
                        </td>
                        <td>{issue.tag ?? '—'}</td>
                        <td>{issue.tagName}</td>
                        <td>{issue.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            {failing.length === 0 && filter && (
              <p className={styles.noMatch}>No issues match "{filter}"</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
