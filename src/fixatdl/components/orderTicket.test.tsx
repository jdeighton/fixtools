import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PanelTree } from './PanelTree'
import { pickControlType, generateFallbackLayout } from '../lib/fallbackLayout'
import type { StrategyPanel, Parameter, Strategy } from '../model'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeParam(overrides: Partial<Parameter> & Pick<Parameter, 'xsiType'>): Parameter {
  return {
    name: 'P',
    use: 'optional',
    mutableOnCxlRpl: false,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    ...overrides,
  }
}

function makeStrategy(params: Parameter[]): Strategy {
  return {
    name: 'S',
    wireValue: 'S',
    parameters: params,
    strategyEdits: [],
    localEdits: [],
  }
}

function makePanel(overrides: Partial<StrategyPanel> = {}): StrategyPanel {
  return {
    kind: 'panel',
    orientation: 'VERTICAL',
    collapsed: false,
    collapsible: false,
    children: [],
    ...overrides,
  }
}

// ── pickControlType ───────────────────────────────────────────────────────────

describe('pickControlType', () => {
  test('parameter with enumPairs → DropDownList_t', () => {
    const p = makeParam({ xsiType: 'String_t', enumPairs: [{ enumID: 'A', wireValue: '1' }] })
    expect(pickControlType(p)).toBe('DropDownList_t')
  })

  test('Boolean_t → CheckBox_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'Boolean_t' }))).toBe('CheckBox_t')
  })

  test('Float_t → SingleSpinner_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'Float_t' }))).toBe('SingleSpinner_t')
  })

  test('Int_t → SingleSpinner_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'Int_t' }))).toBe('SingleSpinner_t')
  })

  test('Price_t → SingleSpinner_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'Price_t' }))).toBe('SingleSpinner_t')
  })

  test('UTCTimestamp_t → Clock_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'UTCTimestamp_t' }))).toBe('Clock_t')
  })

  test('LocalMktDate_t → Clock_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'LocalMktDate_t' }))).toBe('Clock_t')
  })

  test('String_t → TextField_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'String_t' }))).toBe('TextField_t')
  })

  test('Currency_t → TextField_t', () => {
    expect(pickControlType(makeParam({ xsiType: 'Currency_t' }))).toBe('TextField_t')
  })

  test('enum takes precedence over numeric type', () => {
    const p = makeParam({
      xsiType: 'Int_t',
      enumPairs: [{ enumID: 'A', wireValue: '1' }],
    })
    expect(pickControlType(p)).toBe('DropDownList_t')
  })
})

// ── generateFallbackLayout ────────────────────────────────────────────────────

describe('generateFallbackLayout', () => {
  test('produces a single vertical panel', () => {
    const layout = generateFallbackLayout(makeStrategy([makeParam({ xsiType: 'String_t' })]))
    expect(layout.panels).toHaveLength(1)
    expect(layout.panels[0].orientation).toBe('VERTICAL')
  })

  test('excludes const parameters', () => {
    const strategy = makeStrategy([
      makeParam({ xsiType: 'Price_t', constValue: '100' }),
      makeParam({ name: 'Keep', xsiType: 'String_t' }),
    ])
    const layout = generateFallbackLayout(strategy)
    const children = layout.panels[0].children
    expect(children).toHaveLength(1)
    expect(children[0].kind === 'control' && children[0].parameterRef).toBe('Keep')
  })

  test('includes all non-const parameters', () => {
    const strategy = makeStrategy([
      makeParam({ name: 'A', xsiType: 'String_t' }),
      makeParam({ name: 'B', xsiType: 'Boolean_t', constValue: 'Y' }),
      makeParam({ name: 'C', xsiType: 'Float_t' }),
    ])
    const layout = generateFallbackLayout(strategy)
    expect(layout.panels[0].children).toHaveLength(2)
  })

  test('assigns correct control types', () => {
    const strategy = makeStrategy([
      makeParam({ name: 'Qty', xsiType: 'Qty_t' }),
      makeParam({ name: 'Flag', xsiType: 'Boolean_t' }),
      makeParam({ name: 'Time', xsiType: 'UTCTimestamp_t' }),
      makeParam({ name: 'Sym', xsiType: 'String_t' }),
      makeParam({ name: 'Side', xsiType: 'Char_t', enumPairs: [{ enumID: 'Buy', wireValue: '1' }] }),
    ])
    const layout = generateFallbackLayout(strategy)
    const types = layout.panels[0].children.map(c => c.kind === 'control' ? c.xsiType : null)
    expect(types).toEqual(['SingleSpinner_t', 'CheckBox_t', 'Clock_t', 'TextField_t', 'DropDownList_t'])
  })

  test('produces no-op layout for all-const strategy', () => {
    const strategy = makeStrategy([
      makeParam({ name: 'X', xsiType: 'Int_t', constValue: '0' }),
    ])
    const layout = generateFallbackLayout(strategy)
    expect(layout.panels[0].children).toHaveLength(0)
  })
})

// ── PanelTree orientation ─────────────────────────────────────────────────────

describe('PanelTree orientation', () => {
  test('HORIZONTAL panel body has flex-direction: row', () => {
    const panel = makePanel({
      orientation: 'HORIZONTAL',
      children: [{ kind: 'control', id: 'c1', xsiType: 'TextField_t', listItems: [], stateRules: [] }],
    })
    const { getAllByTestId } = render(<PanelTree panels={[panel]} />)
    const body = getAllByTestId('panel-body')[0]
    expect(body).toHaveStyle({ flexDirection: 'row' })
  })

  test('VERTICAL panel body has flex-direction: column', () => {
    const panel = makePanel({
      orientation: 'VERTICAL',
      children: [{ kind: 'control', id: 'c1', xsiType: 'TextField_t', listItems: [], stateRules: [] }],
    })
    const { getAllByTestId } = render(<PanelTree panels={[panel]} />)
    const body = getAllByTestId('panel-body')[0]
    expect(body).toHaveStyle({ flexDirection: 'column' })
  })

  test('omitted orientation defaults to column', () => {
    const panel: StrategyPanel = {
      kind: 'panel',
      collapsed: false,
      collapsible: false,
      children: [{ kind: 'control', id: 'c1', xsiType: 'TextField_t', listItems: [], stateRules: [] }],
    }
    const { getAllByTestId } = render(<PanelTree panels={[panel]} />)
    const body = getAllByTestId('panel-body')[0]
    expect(body).toHaveStyle({ flexDirection: 'column' })
  })
})

// ── Collapsible panel ─────────────────────────────────────────────────────────

describe('Collapsible panel', () => {
  const ctrl = { kind: 'control' as const, id: 'myCtrl', xsiType: 'TextField_t' as const, listItems: [], stateRules: [] }

  test('expanded panel shows children', () => {
    const panel = makePanel({ collapsible: true, collapsed: false, children: [ctrl] })
    render(<PanelTree panels={[panel]} />)
    expect(screen.getByText('myCtrl')).toBeInTheDocument()
  })

  test('collapsed panel hides children', () => {
    const panel = makePanel({ collapsible: true, collapsed: true, children: [ctrl] })
    render(<PanelTree panels={[panel]} />)
    expect(screen.queryByText('myCtrl')).not.toBeInTheDocument()
  })

  test('clicking toggle button expands a collapsed panel', () => {
    const panel = makePanel({ collapsible: true, collapsed: true, children: [ctrl] })
    render(<PanelTree panels={[panel]} />)
    expect(screen.queryByText('myCtrl')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /expand panel/i }))
    expect(screen.getByText('myCtrl')).toBeInTheDocument()
  })

  test('clicking toggle button collapses an expanded panel', () => {
    const panel = makePanel({ collapsible: true, collapsed: false, children: [ctrl] })
    render(<PanelTree panels={[panel]} />)
    expect(screen.getByText('myCtrl')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /collapse panel/i }))
    expect(screen.queryByText('myCtrl')).not.toBeInTheDocument()
  })
})
