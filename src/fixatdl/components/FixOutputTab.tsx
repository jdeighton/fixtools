import { useContext, useMemo, useState, useCallback } from 'react'
import type { AtdlDocument, EditNode } from '../model'
import { TicketContext } from '../ticket/TicketContext'
import { collectAllControls } from '../ticket/resolveInit'
import { generateFallbackLayout } from '../lib/fallbackLayout'
import { resolveWireValues, buildTag957Lines } from '../runtime/wireValueResolver'
import { evaluateStrategyEdits } from '../runtime/strategyEditEngine'
import type { StrategyEditResult } from '../runtime/strategyEditEngine'
import { fieldName } from '../data/fixFieldDictionary'
import styles from './FixOutputTab.module.css'

// ── Standard FIX header fields shown in output ─────────────────────────────────

const HEADER_TAGS: Array<{ tag: number; name: string }> = [
  { tag: 35, name: 'MsgType' },
  { tag: 11, name: 'ClOrdID' },
  { tag: 55, name: 'Symbol' },
  { tag: 54, name: 'Side' },
  { tag: 38, name: 'OrderQty' },
  { tag: 40, name: 'OrdType' },
  { tag: 44, name: 'Price' },
  { tag: 59, name: 'TimeInForce' },
  { tag: 60, name: 'TransactTime' },
]

const HEADER_FIELD_MAP: Record<string, string> = {
  'ClOrdID': '11', 'Symbol': '55', 'Side': '54', 'OrderQty': '38',
  'OrdType': '40', 'Price': '44', 'TimeInForce': '59', 'TransactTime': '60',
}

const STD_FIELD_NAMES = [
  'ClOrdID', 'Symbol', 'Side', 'OrderQty', 'OrdType',
  'Price', 'TimeInForce', 'TransactTime',
]

type Transport = 'UDF' | '957'

// ── Validation tree renderer ───────────────────────────────────────────────────

function NodeLabel({ node }: { node: EditNode }) {
  if (node.kind === 'compare') {
    const rhs = node.field2 ?? (node.value !== undefined ? `"${node.value}"` : '')
    return <span className={styles.nodeLabel}>{node.field} {node.op}{rhs ? ` ${rhs}` : ''}</span>
  }
  if (node.kind === 'logic') {
    return <span className={styles.nodeOp}>{node.op}</span>
  }
  return <span className={styles.nodeLabel}>ref:{node.id}</span>
}

function EditNodeTree({
  node, nodeResults, path = '0',
}: {
  node: EditNode
  nodeResults: Map<string, boolean>
  path?: string
}) {
  const id = node.kind !== 'ref' && node.id != null ? node.id : path
  const result = nodeResults.get(id)

  return (
    <div className={styles.nodeGroup}>
      <div className={styles.nodeRow}>
        {result !== undefined && (
          <span className={result ? styles.nodeChipTrue : styles.nodeChipFalse}>
            {result ? 'T' : 'F'}
          </span>
        )}
        <NodeLabel node={node} />
      </div>
      {node.kind === 'logic' && (
        <div className={styles.nodeChildren}>
          {node.operands.map((op, i) => (
            <EditNodeTree key={i} node={op} nodeResults={nodeResults} path={`${path}.${i}`} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Validation panel ───────────────────────────────────────────────────────────

function ValidationPanel({ results }: { results: StrategyEditResult[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const failures = results.filter(r => !r.passed)
  const skipped  = results.filter(r => r.passed && r.skippedFields.length > 0)

  const allPassed = failures.length === 0

  function toggle(i: number) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  const totalChecks = results.filter(r => !r.skippedFields.length).length

  return (
    <details className={styles.validationSection} open={!allPassed}>
      <summary className={styles.validationSummary}>
        Validation
        {allPassed
          ? <span className={styles.summaryPass}> — {totalChecks} rule{totalChecks !== 1 ? 's' : ''} checked, no failures</span>
          : <span className={styles.summaryFail}> — {failures.length} failure{failures.length !== 1 ? 's' : ''}</span>}
      </summary>

      {allPassed ? (
        <div className={styles.validationPass}>✓ All validation rules passed</div>
      ) : (
        <div className={styles.validationList}>
          {failures.map((r, i) => (
            <div key={i} className={styles.validationItem}>
              <div
                className={styles.validationItemHeader}
                onClick={() => r.edit && toggle(i)}
                style={{ cursor: r.edit ? 'pointer' : 'default' }}
              >
                <span className={styles.failIcon}>✕</span>
                {r.isDataContract && (
                  <span className={styles.dcBadge}>data contract</span>
                )}
                <span className={styles.itemMsg}>{r.errorMsg}</span>
                {r.edit && (
                  <span className={styles.expandToggle}>
                    {expanded.has(i) ? '▲' : '▼'}
                  </span>
                )}
              </div>
              {expanded.has(i) && r.edit && (
                <div className={styles.editTree}>
                  <EditNodeTree node={r.edit.condition} nodeResults={r.nodeResults} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {skipped.length > 0 && (
        <div className={styles.skippedList}>
          {skipped.map((r, i) => (
            <div key={i} className={styles.skippedItem}>
              <span className={styles.infoIcon}>ℹ</span>
              rule skipped: {r.skippedFields.join(', ')} not in standard fields
            </div>
          ))}
        </div>
      )}
    </details>
  )
}

// ── Main panel ─────────────────────────────────────────────────────────────────

interface Props {
  doc: AtdlDocument
}

export function FixOutputPanel({ doc }: Props) {
  const ctx = useContext(TicketContext)
  const [rawMode, setRawMode] = useState(false)
  const [copied, setCopied] = useState(false)

  // Transport mode: determine what's available
  const hasFixTags = ctx?.strategy.parameters.some(p => p.fixTag != null) ?? false
  const can957 = doc.tag957Support !== false
  const canUDF = hasFixTags

  const defaultTransport: Transport = canUDF ? 'UDF' : '957'
  const [transport, setTransport] = useState<Transport>(defaultTransport)

  // Compute effective transport (locked if only one available)
  const effectiveTransport: Transport = !canUDF ? '957' : !can957 ? 'UDF' : transport

  const allControls = useMemo(() => {
    if (!ctx) return []
    const layout = ctx.strategy.layout ?? generateFallbackLayout(ctx.strategy)
    return collectAllControls(layout.panels)
  }, [ctx?.strategy])

  const wireOutput = useMemo(() => {
    if (!ctx) return null
    return resolveWireValues(ctx.strategy, allControls, ctx.state, ctx.getStandardField)
  }, [ctx?.strategy, allControls, ctx?.state])

  const tag957Lines = useMemo(() => {
    if (!wireOutput || !ctx) return []
    return buildTag957Lines(ctx.strategy, wireOutput)
  }, [ctx?.strategy, wireOutput])

  // Run validation engine
  const validationResults = useMemo(() => {
    if (!ctx || !wireOutput) return []
    const wireValues = new Map(wireOutput.fields.map(f => [f.paramName, f.wireValue]))
    const standardFields = new Map<string, string>()
    for (const name of STD_FIELD_NAMES) {
      const val = ctx.getStandardField(name)
      if (val !== undefined) standardFields.set(`FIX_${name}`, val)
    }
    return evaluateStrategyEdits(ctx.strategy, wireValues, standardFields)
  }, [ctx?.strategy, wireOutput, ctx?.state])

  // Build list of [tag, value, name, controlId, isHeader] tuples
  const allLines = useMemo(() => {
    if (!ctx || !wireOutput) return []

    const lines: Array<{
      tag: number; value: string; name: string
      controlId: string | null; isHeader: boolean; paramName: string | null
    }> = []

    // 35=D always first
    lines.push({ tag: 35, value: 'D', name: 'MsgType', controlId: null, isHeader: true, paramName: null })

    // Standard fields from panel
    for (const hf of HEADER_TAGS.slice(1)) {
      const sfName = Object.entries(HEADER_FIELD_MAP).find(([, t]) => t === String(hf.tag))?.[0]
      const val = sfName ? ctx.getStandardField(sfName) : undefined
      if (val) {
        lines.push({ tag: hf.tag, value: val, name: hf.name, controlId: null, isHeader: true, paramName: null })
      }
    }

    // Strategy identifier
    if (doc.strategyIdentifierTag) {
      lines.push({
        tag: doc.strategyIdentifierTag,
        value: ctx.strategy.wireValue,
        name: fieldName(doc.strategyIdentifierTag) ?? `Tag${doc.strategyIdentifierTag}`,
        controlId: null, isHeader: false, paramName: null,
      })
    }
    if (doc.versionIdentifierTag && ctx.strategy.version) {
      lines.push({
        tag: doc.versionIdentifierTag,
        value: ctx.strategy.version,
        name: fieldName(doc.versionIdentifierTag) ?? `Tag${doc.versionIdentifierTag}`,
        controlId: null, isHeader: false, paramName: null,
      })
    }

    if (effectiveTransport === 'UDF') {
      for (const f of wireOutput.fields) {
        if (f.tag === 0) continue  // no fixTag
        lines.push({
          tag: f.tag,
          value: f.wireValue,
          name: fieldName(f.tag) ?? f.paramName,
          controlId: f.controlId,
          isHeader: false,
          paramName: f.paramName,
        })
      }
    } else {
      // 957 mode
      lines.push({
        tag: 957, value: String(tag957Lines.length),
        name: fieldName(957) ?? 'NoStrategyParamCount',
        controlId: null, isHeader: false, paramName: null,
      })
      for (const l of tag957Lines) {
        lines.push({
          tag: 958, value: l.paramName,
          name: fieldName(958) ?? 'StrategyParameterName',
          controlId: l.controlId, isHeader: false, paramName: l.paramName,
        })
        lines.push({
          tag: 959, value: String(l.typeCode),
          name: fieldName(959) ?? 'StrategyParameterType',
          controlId: l.controlId, isHeader: false, paramName: l.paramName,
        })
        lines.push({
          tag: 960, value: l.wireValue,
          name: fieldName(960) ?? 'StrategyParameterValue',
          controlId: l.controlId, isHeader: false, paramName: l.paramName,
        })
      }
    }

    return lines
  }, [ctx, wireOutput, tag957Lines, effectiveTransport, doc])

  const rawText = useMemo(() => {
    const soh = rawMode ? '␁' : '|'
    return allLines.map(l => `${l.tag}=${l.value}`).join(soh) + (rawMode ? '' : '')
  }, [allLines, rawMode])

  const handleCopy = useCallback(() => {
    const text = rawMode
      ? allLines.map(l => `${l.tag}=${l.value}`).join('') + ''
      : allLines.map(l => `${l.tag}=${l.value}`).join('|')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }, [allLines, rawMode])

  if (!ctx) return null

  const udfLocked = !canUDF
  const s57Locked = !can957
  const udfLockedTip = udfLocked ? 'No fixTags defined — UDF not available' : undefined
  const s57LockedTip = s57Locked ? 'tag957Support=false — 957 mode not available' : undefined

  const hasValidation = validationResults.length > 0

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <span className={styles.toolbarTitle}>FIX Output</span>

        {/* Transport toggle */}
        <div className={styles.transportGroup}>
          <button
            type="button"
            className={[
              styles.transportBtn,
              effectiveTransport === 'UDF' ? styles.transportBtnActive : '',
              udfLocked ? styles.transportBtnDisabled : '',
            ].join(' ')}
            onClick={() => { if (!udfLocked && can957) setTransport('UDF') }}
            title={udfLockedTip}
            aria-pressed={effectiveTransport === 'UDF'}
          >
            UDF
          </button>
          <button
            type="button"
            className={[
              styles.transportBtn,
              effectiveTransport === '957' ? styles.transportBtnActive : '',
              s57Locked ? styles.transportBtnDisabled : '',
            ].join(' ')}
            onClick={() => { if (!s57Locked && hasFixTags) setTransport('957') }}
            title={s57LockedTip}
            aria-pressed={effectiveTransport === '957'}
          >
            957
          </button>
        </div>

        <div className={styles.sep} />

        <button
          type="button"
          className={`${styles.toggleBtn} ${rawMode ? styles.toggleBtnActive : ''}`}
          onClick={() => setRawMode(m => !m)}
          aria-pressed={rawMode}
        >
          Raw (SOH)
        </button>

        <button
          type="button"
          className={`${styles.copyBtn} ${copied ? styles.copyDone : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Validation results panel */}
      {hasValidation && <ValidationPanel results={validationResults} />}

      {/* invertOnWire notice */}
      {wireOutput && wireOutput.invertOnWireParams.length > 0 && (
        <div className={styles.invertChip}>
          invertOnWire not supported — affected: {wireOutput.invertOnWireParams.join(', ')}
        </div>
      )}

      {allLines.length === 0 ? (
        <div className={styles.empty}>No parameters with values</div>
      ) : rawMode ? (
        <div className={styles.rawArea}>{rawText}</div>
      ) : (
        <div className={styles.fieldList}>
          {allLines.map((line, i) => (
            <div
              key={i}
              className={[
                styles.fieldRow,
                line.isHeader ? styles.fieldRowHeader : '',
                line.controlId && ctx.hoveredControlId === line.controlId ? styles.fieldRowHovered : '',
              ].join(' ')}
              onMouseEnter={() => line.controlId && ctx.setHoveredControlId(line.controlId)}
              onMouseLeave={() => ctx.setHoveredControlId(null)}
            >
              <span className={styles.fieldTag}>{line.tag}</span>
              <span className={styles.fieldEq}>=</span>
              <span className={styles.fieldValue}>{line.value}</span>
              <span className={styles.fieldName} title={`Tag ${line.tag}`}>
                {line.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
