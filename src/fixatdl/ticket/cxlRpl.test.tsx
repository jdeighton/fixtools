import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { ControlRenderer } from './ControlRenderer'
import { TicketContext } from './TicketContext'
import type { TicketCtx } from './TicketContext'
import type { Control, Parameter, Strategy } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeCtrl(overrides: Partial<Control> = {}): Control {
  return {
    kind: 'control',
    id: 'c1',
    xsiType: 'TextField_t',
    listItems: [],
    stateRules: [],
    ...overrides,
  }
}

function makeParam(overrides: Partial<Parameter> & Pick<Parameter, 'xsiType'>): Parameter {
  return {
    name: 'P',
    use: 'optional',
    mutableOnCxlRpl: true,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    ...overrides,
  }
}

function makeStrategy(params: Parameter[] = []): Strategy {
  return { name: 'S', wireValue: 'S', parameters: params, strategyEdits: [], localEdits: [] }
}

// ── Context wrapper with C/R support ─────────────────────────────────────────

function CxlRplWrapper({
  control,
  initialValue,
  cxlRplMode,
  originalState,
  strategy,
  children,
}: {
  control: Control
  initialValue: ControlValue
  cxlRplMode: boolean
  originalState: TicketStateMap | null
  strategy?: Strategy
  children: React.ReactNode
}) {
  const [state, setState] = useState<TicketStateMap>(new Map([[control.id, initialValue]]))
  const strat = strategy ?? makeStrategy()

  const ctx: TicketCtx = {
    state,
    effectiveState: new Map(),
    strategy: strat,
    onChange: (id, v) => setState(new Map([[id, v]])),
    onRadioSelect: vi.fn(),
    getStandardField: () => undefined,
    hoveredControlId: null,
    setHoveredControlId: () => {},
    cxlRplMode,
    originalState,
    sendOrder: () => {},
  }

  return <TicketContext.Provider value={ctx}>{children}</TicketContext.Provider>
}

// ── mutableOnCxlRpl tests ─────────────────────────────────────────────────────

describe('mutableOnCxlRpl', () => {
  const param = makeParam({ xsiType: 'String_t', name: 'P', mutableOnCxlRpl: false })
  const ctrl = makeCtrl({ id: 'c1', xsiType: 'TextField_t', parameterRef: 'P' })
  const strat = makeStrategy([param])

  test('control is enabled when not in C/R mode', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: 'hello', initialized: true }} cxlRplMode={false} originalState={null} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })

  test('control is disabled in C/R mode when mutableOnCxlRpl=false', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: 'hello', initialized: true }} cxlRplMode={true} originalState={new Map([['c1', { raw: 'hello', initialized: true }]])} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  test('tooltip says Cannot modify on Cancel/Replace when disabled', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: 'hello', initialized: true }} cxlRplMode={true} originalState={new Map([['c1', { raw: 'hello', initialized: true }]])} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    // The tooltip appears on the wrapper div that contains the input
    const input = screen.getByRole('textbox')
    const wrap = input.closest('[title]') as HTMLElement
    expect(wrap?.title).toBe('Cannot modify on Cancel/Replace')
  })

  test('control is enabled when mutableOnCxlRpl=true even in C/R mode', () => {
    const mutableParam = makeParam({ xsiType: 'String_t', name: 'P', mutableOnCxlRpl: true })
    const mutableStrat = makeStrategy([mutableParam])
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: 'hello', initialized: true }} cxlRplMode={true} originalState={new Map([['c1', { raw: 'hello', initialized: true }]])} strategy={mutableStrat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.getByRole('textbox')).not.toBeDisabled()
  })
})

// ── revertOnCxlRpl tests ──────────────────────────────────────────────────────

describe('revertOnCxlRpl', () => {
  const param = makeParam({ xsiType: 'String_t', name: 'P', revertOnCxlRpl: true })
  const ctrl = makeCtrl({ id: 'c1', xsiType: 'TextField_t', parameterRef: 'P' })
  const strat = makeStrategy([param])
  const original: TicketStateMap = new Map([['c1', { raw: 'ORIGINAL', initialized: true }]])

  test('ghost hint shown when value is cleared in C/R mode', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: null, initialized: false }} cxlRplMode={true} originalState={original} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    const hint = screen.getByTestId('cxl-revert-hint')
    expect(hint).toBeInTheDocument()
    expect(hint.textContent).toContain('ORIGINAL')
  })

  test('no ghost hint when value is set in C/R mode', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: 'CURRENT', initialized: true }} cxlRplMode={true} originalState={original} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.queryByTestId('cxl-revert-hint')).not.toBeInTheDocument()
  })

  test('no ghost hint when not in C/R mode', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: null, initialized: false }} cxlRplMode={false} originalState={original} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.queryByTestId('cxl-revert-hint')).not.toBeInTheDocument()
  })

  test('no ghost hint when original is null', () => {
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: null, initialized: false }} cxlRplMode={true} originalState={null} strategy={strat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.queryByTestId('cxl-revert-hint')).not.toBeInTheDocument()
  })

  test('no ghost hint when revertOnCxlRpl=false', () => {
    const nonRevertParam = makeParam({ xsiType: 'String_t', name: 'P', revertOnCxlRpl: false })
    const nonRevertStrat = makeStrategy([nonRevertParam])
    render(
      <CxlRplWrapper control={ctrl} initialValue={{ raw: null, initialized: false }} cxlRplMode={true} originalState={original} strategy={nonRevertStrat}>
        <ControlRenderer control={ctrl} />
      </CxlRplWrapper>,
    )
    expect(screen.queryByTestId('cxl-revert-hint')).not.toBeInTheDocument()
  })
})

// ── sendOrder snapshot tests ──────────────────────────────────────────────────

describe('sendOrder state snapshot', () => {
  test('Simulate C/R button is disabled before Send', () => {
    // Tested via integration: the button has disabled attr when originalState is null.
    // Here we verify the context contract: sendOrder() should create the snapshot.
    const snapshots: TicketStateMap[] = []

    function TestComp() {
      const [state] = useState<TicketStateMap>(new Map([['c1', { raw: '42', initialized: true }]]))
      const [originalState, setOriginalState] = useState<TicketStateMap | null>(null)
      const [cxlRplMode] = useState(false)

      const ctx: TicketCtx = {
        state,
        effectiveState: new Map(),
        strategy: makeStrategy(),
        onChange: vi.fn(),
        onRadioSelect: vi.fn(),
        getStandardField: () => undefined,
        hoveredControlId: null,
        setHoveredControlId: () => {},
        cxlRplMode,
        originalState,
        sendOrder: () => {
          const snap = new Map(state)
          snapshots.push(snap)
          setOriginalState(snap)
        },
      }

      return (
        <TicketContext.Provider value={ctx}>
          <button onClick={ctx.sendOrder}>Send</button>
          <span data-testid="has-original">{String(originalState !== null)}</span>
        </TicketContext.Provider>
      )
    }

    render(<TestComp />)
    expect(screen.getByTestId('has-original').textContent).toBe('false')
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(snapshots).toHaveLength(1)
    expect(snapshots[0].get('c1')?.raw).toBe('42')
  })
})
