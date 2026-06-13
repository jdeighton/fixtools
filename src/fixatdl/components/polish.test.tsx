import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MatrixTab } from './MatrixTab'
import type { AtdlDocument, Finding, Strategy } from '../model'

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeStrategy(name: string): Strategy {
  return {
    name,
    wireValue: name,
    parameters: [],
    strategyEdits: [],
    localEdits: [],
  }
}

function makeDoc(overrides: Partial<AtdlDocument> = {}): AtdlDocument {
  return {
    version: '1.1',
    namespaces: {},
    strategies: [makeStrategy('S1')],
    tag957Support: true,
    globalEdits: [],
    findings: [],
    sourceLineIndex: { getLine: () => undefined },
    sourceXml: '',
    ...overrides,
  }
}

function makeError(ruleId = 'X-001'): Finding {
  return { ruleId, severity: 'error', message: 'test error', location: { path: '' } }
}

// ── MatrixTab: degraded banner ────────────────────────────────────────────────

describe('MatrixTab degraded banner', () => {
  test('not shown when no errors', () => {
    render(<MatrixTab doc={makeDoc()} onStrategySelect={() => {}} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('shown when doc has error findings and at least one strategy', () => {
    render(<MatrixTab doc={makeDoc({ findings: [makeError()] })} onStrategySelect={() => {}} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toContain('parse errors')
  })

  test('not shown when errors exist but no strategies', () => {
    const doc = makeDoc({ strategies: [], findings: [makeError()] })
    render(<MatrixTab doc={doc} onStrategySelect={() => {}} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  test('warning-only findings do not trigger degraded banner', () => {
    const doc = makeDoc({ findings: [{ ruleId: 'W-001', severity: 'warning', message: 'warn', location: { path: '' } }] })
    render(<MatrixTab doc={doc} onStrategySelect={() => {}} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})

// ── MatrixTab: empty state for no strategies ──────────────────────────────────

describe('MatrixTab empty state', () => {
  test('shows empty state when doc has no strategies', () => {
    const doc = makeDoc({ strategies: [] })
    render(<MatrixTab doc={doc} onStrategySelect={() => {}} />)
    expect(screen.getByText(/no strategies found/i)).toBeInTheDocument()
  })

  test('does not show empty state when doc has strategies', () => {
    render(<MatrixTab doc={makeDoc()} onStrategySelect={() => {}} />)
    expect(screen.queryByText(/no strategies found/i)).not.toBeInTheDocument()
  })
})

// ── MatrixTab: strategies CSV export button ───────────────────────────────────

describe('MatrixTab strategies toolbar', () => {
  test('Export CSV button present in strategies sub-tab', () => {
    render(<MatrixTab doc={makeDoc()} onStrategySelect={() => {}} />)
    // Switch to Strategies sub-tab
    const stratTab = screen.getByRole('tab', { name: /strategies/i })
    stratTab.click()
    expect(screen.getAllByText('Export CSV').length).toBeGreaterThanOrEqual(1)
  })

  test('sub-tab buttons have role=tab and aria-selected', () => {
    render(<MatrixTab doc={makeDoc()} onStrategySelect={() => {}} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toBeGreaterThanOrEqual(2)
    const paramTab = tabs.find(t => t.textContent?.includes('Parameters'))!
    expect(paramTab).toHaveAttribute('aria-selected', 'true')
    const stratTab = tabs.find(t => t.textContent?.includes('Strategies'))!
    expect(stratTab).toHaveAttribute('aria-selected', 'false')
  })
})

// ── MatrixTab: filter input aria-label ───────────────────────────────────────

describe('MatrixTab accessibility', () => {
  test('filter input has aria-label', () => {
    render(<MatrixTab doc={makeDoc()} onStrategySelect={() => {}} />)
    expect(screen.getByLabelText(/quick filter parameters/i)).toBeInTheDocument()
  })
})
