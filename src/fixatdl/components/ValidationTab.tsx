import { useState, useMemo, useEffect, useRef } from 'react'
import type { AtdlDocument, Finding } from '../model'
import { validateDocument } from '../validate'
import styles from './ValidationTab.module.css'

// ── Types ─────────────────────────────────────────────────────────────────────

type Severity = 'error' | 'warning' | 'info'

const SEV_ICON: Record<Severity, string> = { error: '✕', warning: '⚠', info: 'ℹ' }

// ── Source excerpt ────────────────────────────────────────────────────────────

interface ExcerptProps {
  sourceLines: string[]
  line: number  // 1-based
}

function SourceExcerpt({ sourceLines, line }: ExcerptProps) {
  const start = Math.max(0, line - 2)
  const end = Math.min(sourceLines.length - 1, line)
  const excerpt = sourceLines.slice(start, end + 1)
  return (
    <pre className={styles.excerpt}>
      {excerpt.map((text, i) => {
        const lineNum = start + i + 1
        const active = lineNum === line
        return (
          <div key={lineNum} className={active ? styles.excerptLineActive : styles.excerptLine}>
            <span className={styles.excerptNum}>{lineNum}</span>
            <span>{text}</span>
          </div>
        )
      })}
    </pre>
  )
}

// ── Finding row ───────────────────────────────────────────────────────────────

interface RowProps {
  finding: Finding
  index: number
  expanded: boolean
  active: boolean
  sourceLines: string[]
  onToggle(): void
  onActivate(): void
}

function FindingRow({ finding: f, expanded, active, sourceLines, onToggle, onActivate }: RowProps) {
  const hasDetail = f.suggestion || f.specRef || f.location.line != null

  return (
    <div
      className={`${styles.row} ${styles[`row_${f.severity}`]} ${active ? styles.rowActive : ''}`}
      onClick={() => { onToggle(); if (f.location.line != null) onActivate() }}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onToggle(); if (f.location.line != null) onActivate() } }}
      aria-expanded={expanded}
    >
      <div className={styles.rowHeader}>
        <span className={`${styles.sevIcon} ${styles[`sev_${f.severity}`]}`}>
          {SEV_ICON[f.severity]}
        </span>
        <span className={styles.ruleChip}>{f.ruleId}</span>
        <span className={styles.locPath}>{f.location.path}</span>
        {hasDetail && (
          <span className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}>›</span>
        )}
      </div>

      <div className={styles.message}>{f.message}</div>

      {expanded && hasDetail && (
        <div className={styles.detail}>
          {f.suggestion && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Suggestion</span>
              <span className={styles.detailValue}>{f.suggestion}</span>
            </div>
          )}
          {f.specRef && (
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Spec ref</span>
              <span className={styles.detailValue}>{f.specRef}</span>
            </div>
          )}
          {f.location.line != null && (
            <div className={styles.excerptWrapper}>
              <SourceExcerpt sourceLines={sourceLines} line={f.location.line} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Source view ───────────────────────────────────────────────────────────────

interface SourceViewProps {
  sourceLines: string[]
  activeLine: number | null
  containerRef: React.RefObject<HTMLDivElement>
}

function SourceView({ sourceLines, activeLine, containerRef }: SourceViewProps) {
  return (
    <div className={styles.sourceOuter} ref={containerRef}>
      <pre className={styles.sourcePre}>
        {sourceLines.map((text, i) => {
          const n = i + 1
          return (
            <div
              key={n}
              data-line={n}
              className={activeLine === n ? styles.sourceLineActive : styles.sourceLine}
            >
              <span className={styles.lineNum}>{n}</span>
              <span className={styles.lineContent}>{text}</span>
            </div>
          )
        })}
      </pre>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  doc: AtdlDocument | null
}

export function ValidationTab({ doc }: Props) {
  const findings = useMemo(() => (doc ? validateDocument(doc) : []), [doc])
  const sourceLines = useMemo(() => doc?.sourceXml.split('\n') ?? [], [doc])

  const [showError, setShowError] = useState(true)
  const [showWarn, setShowWarn] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [ruleSearch, setRuleSearch] = useState('')
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)
  const [activeLine, setActiveLine] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const sourceRef = useRef<HTMLDivElement>(null)

  const errorCount = useMemo(() => findings.filter(f => f.severity === 'error').length, [findings])
  const warnCount  = useMemo(() => findings.filter(f => f.severity === 'warning').length, [findings])
  const infoCount  = useMemo(() => findings.filter(f => f.severity === 'info').length, [findings])

  const visible = useMemo(() => findings.filter(f => {
    if (f.severity === 'error'   && !showError) return false
    if (f.severity === 'warning' && !showWarn)  return false
    if (f.severity === 'info'    && !showInfo)  return false
    if (ruleSearch && !f.ruleId.toLowerCase().includes(ruleSearch.toLowerCase())) return false
    return true
  }), [findings, showError, showWarn, showInfo, ruleSearch])

  // Degraded: errors present but document was partially parsed
  const isDegraded = errorCount > 0 && (doc?.strategies?.length ?? 0) > 0

  // Scroll source view to active line
  useEffect(() => {
    if (activeLine == null || !sourceRef.current) return
    const el = sourceRef.current.querySelector<HTMLElement>(`[data-line="${activeLine}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeLine])

  async function copyFindings() {
    const header = '| Severity | Rule | Location | Message |'
    const divider = '|----------|------|----------|---------|'
    const rows = visible.map(f =>
      `| ${f.severity} | ${f.ruleId} | ${f.location.path} | ${f.message.replace(/\|/g, '\\|')} |`
    )
    await navigator.clipboard.writeText([header, divider, ...rows].join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleRowClick(f: Finding, idx: number) {
    setExpandedIdx(prev => prev === idx ? null : idx)
    if (f.location.line != null) setActiveLine(f.location.line)
  }

  if (!doc) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>⊘</span>
        Load a FIXatdl document to run validation.
      </div>
    )
  }

  return (
    <div className={styles.root}>
      {/* Summary / filter bar */}
      <div className={styles.bar}>
        <button
          className={`${styles.badge} ${styles.badgeError} ${!showError ? styles.badgeOff : ''}`}
          onClick={() => setShowError(v => !v)}
          title={showError ? 'Click to hide errors' : 'Click to show errors'}
        >
          {errorCount} error{errorCount !== 1 ? 's' : ''}
        </button>
        <button
          className={`${styles.badge} ${styles.badgeWarn} ${!showWarn ? styles.badgeOff : ''}`}
          onClick={() => setShowWarn(v => !v)}
          title={showWarn ? 'Click to hide warnings' : 'Click to show warnings'}
        >
          {warnCount} warning{warnCount !== 1 ? 's' : ''}
        </button>
        <button
          className={`${styles.badge} ${styles.badgeInfo} ${!showInfo ? styles.badgeOff : ''}`}
          onClick={() => setShowInfo(v => !v)}
          title={showInfo ? 'Click to hide info' : 'Click to show info'}
        >
          {infoCount} info
        </button>

        <input
          className={styles.search}
          type="search"
          placeholder="Filter rule ID…"
          value={ruleSearch}
          onChange={e => setRuleSearch(e.target.value)}
          aria-label="Filter by rule ID"
        />

        <button
          className={styles.copyBtn}
          onClick={copyFindings}
          title="Copy visible findings as markdown table"
        >
          {copied ? '✓ Copied' : 'Copy findings'}
        </button>
      </div>

      {isDegraded && (
        <div className={styles.degradedBanner} role="alert">
          Document has errors — matrix and ticket show partial data.
        </div>
      )}

      {/* Split: findings list + source view */}
      <div className={styles.split}>
        <div className={styles.findingsList}>
          {visible.length === 0 ? (
            <div className={styles.noFindings}>
              {findings.length === 0
                ? '✓ No issues found.'
                : 'No findings match the current filters.'}
            </div>
          ) : (
            visible.map((f, i) => (
              <FindingRow
                key={i}
                index={i}
                finding={f}
                expanded={expandedIdx === i}
                active={f.location.line != null && activeLine === f.location.line}
                sourceLines={sourceLines}
                onToggle={() => handleRowClick(f, i)}
                onActivate={() => f.location.line != null && setActiveLine(f.location.line)}
              />
            ))
          )}
        </div>

        <SourceView
          sourceLines={sourceLines}
          activeLine={activeLine}
          containerRef={sourceRef}
        />
      </div>
    </div>
  )
}
