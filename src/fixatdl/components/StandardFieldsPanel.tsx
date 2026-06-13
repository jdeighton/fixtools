import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import type { Strategy, EditNode, StrategyPanel } from '../model'
import { FIELDS } from '../../data/fixDictionary'
import styles from './StandardFieldsPanel.module.css'

// ── Public handle ─────────────────────────────────────────────────────────────

export interface StandardFieldsHandle {
  getStandardField(name: string): string | undefined
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function generateClOrdID(): string {
  return (crypto as Crypto & { randomUUID?: () => string }).randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function nowDatetimeLocal(): string {
  return new Date().toISOString().slice(0, 16)
}

type SelectOption = { value: string; label: string }

function tagOptions(tag: number): SelectOption[] {
  const vals = FIELDS[tag]?.values
  if (!vals) return []
  return Object.entries(vals).map(([v, l]) => ({ value: v, label: `${v} – ${l}` }))
}

// ── Default field definitions ─────────────────────────────────────────────────

interface PanelField {
  name: string
  tag: number
  kind: 'text' | 'number' | 'select' | 'datetime-local'
  wide?: boolean
}

const DEFAULT_FIELDS: PanelField[] = [
  { name: 'ClOrdID',      tag: 11, kind: 'text', wide: true },
  { name: 'Symbol',       tag: 55, kind: 'text' },
  { name: 'Side',         tag: 54, kind: 'select' },
  { name: 'OrderQty',     tag: 38, kind: 'number' },
  { name: 'OrdType',      tag: 40, kind: 'select' },
  { name: 'Price',        tag: 44, kind: 'number' },
  { name: 'TimeInForce',  tag: 59, kind: 'select' },
  { name: 'TransactTime', tag: 60, kind: 'datetime-local', wide: true },
]

const DEFAULT_FIELD_NAMES = new Set(DEFAULT_FIELDS.map(f => f.name))

function initialFieldValues(): Record<string, string> {
  return {
    ClOrdID:      generateClOrdID(),
    Symbol:       '',
    Side:         '1',
    OrderQty:     '',
    OrdType:      '2',
    Price:        '',
    TimeInForce:  '0',
    TransactTime: nowDatetimeLocal(),
  }
}

// ── FIX_* reference extractor ─────────────────────────────────────────────────

function walkEditNode(node: EditNode, out: Set<string>): void {
  if (node.kind === 'compare') {
    if (node.field.startsWith('FIX_')) out.add(node.field.slice(4))
    if (node.field2?.startsWith('FIX_')) out.add(node.field2.slice(4))
  } else if (node.kind === 'logic') {
    node.operands.forEach(o => walkEditNode(o, out))
  }
}

function walkPanel(panel: StrategyPanel, out: Set<string>): void {
  for (const child of panel.children) {
    if (child.kind === 'control') child.stateRules.forEach(sr => walkEditNode(sr.condition, out))
    else walkPanel(child, out)
  }
}

function extractExtraFIXRefs(strategy: Strategy): string[] {
  const refs = new Set<string>()
  strategy.strategyEdits.forEach(e => walkEditNode(e.condition, refs))
  strategy.localEdits.forEach(e => walkEditNode(e.node, refs))
  strategy.layout?.panels.forEach(p => walkPanel(p, refs))
  return [...refs].filter(name => !DEFAULT_FIELD_NAMES.has(name))
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  strategy: Strategy | null
}

export const StandardFieldsPanel = forwardRef<StandardFieldsHandle, Props>(
  function StandardFieldsPanel({ strategy }, ref) {
    const [fields, setFields] = useState<Record<string, string>>(initialFieldValues)

    // Auto-refresh TransactTime on mount and every minute
    useEffect(() => {
      setFields(f => ({ ...f, TransactTime: nowDatetimeLocal() }))
      const id = setInterval(
        () => setFields(f => ({ ...f, TransactTime: nowDatetimeLocal() })),
        60_000,
      )
      return () => clearInterval(id)
    }, [])

    useImperativeHandle(ref, () => ({
      getStandardField(name: string): string | undefined {
        const val = fields[name]
        return val !== undefined && val !== '' ? val : undefined
      },
    }), [fields])

    const extraNames = strategy ? extractExtraFIXRefs(strategy) : []

    function set(name: string, value: string) {
      setFields(f => ({ ...f, [name]: value }))
    }

    function renderInput(f: PanelField | { name: string; tag: number; kind: 'text' }) {
      const id = `sfp_${f.name}`
      const val = fields[f.name] ?? ''

      if (f.kind === 'select') {
        const opts = tagOptions(f.tag)
        return (
          <select
            id={id}
            className={styles.select}
            value={val}
            onChange={e => set(f.name, e.target.value)}
            aria-label={f.name}
          >
            {opts.length === 0 && <option value="">—</option>}
            {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        )
      }
      return (
        <input
          id={id}
          className={styles.input}
          type={f.kind}
          value={val}
          onChange={e => set(f.name, e.target.value)}
          aria-label={f.name}
        />
      )
    }

    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Standard Order Fields</span>
        </div>

        <div className={styles.fields}>
          {DEFAULT_FIELDS.map(f => (
            <div key={f.name} className={`${styles.field} ${f.wide ? styles.fieldWide : ''}`}>
              <label className={styles.label} htmlFor={`sfp_${f.name}`}>
                {f.name}
                <span className={styles.labelTag}>[{f.tag}]</span>
              </label>
              {renderInput(f)}
            </div>
          ))}
        </div>

        {extraNames.length > 0 && (
          <div className={styles.extraSection}>
            <div className={styles.extraLabel}>Referenced by strategy rules</div>
            <div className={styles.fields} style={{ padding: 0 }}>
              {extraNames.map(name => (
                <div key={name} className={styles.field}>
                  <label className={styles.label} htmlFor={`sfp_${name}`}>{name}</label>
                  <input
                    id={`sfp_${name}`}
                    className={styles.input}
                    type="text"
                    placeholder="leave blank if unused"
                    value={fields[name] ?? ''}
                    onChange={e => set(name, e.target.value)}
                    aria-label={name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)
