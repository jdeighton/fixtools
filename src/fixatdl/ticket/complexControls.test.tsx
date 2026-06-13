import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { resolveClockInitValue, matchListItem, doubleSpinnerTooltip, tzAbbrev } from './complexControls'
import { ControlRenderer } from './ControlRenderer'
import { TicketContext } from './TicketContext'
import type { TicketCtx } from './TicketContext'
import type { Control, Parameter, Strategy } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'
import { useState } from 'react'

// ── Pure logic helpers ─────────────────────────────────────────────────────────

function makeCtrl(overrides: Partial<Control> = {}): Control {
  return {
    kind: 'control',
    id: 'ctrl1',
    xsiType: 'Clock_t',
    listItems: [],
    stateRules: [],
    ...overrides,
  }
}

function makeStrategy(params: Parameter[] = []): Strategy {
  return { name: 'S', wireValue: 'S', parameters: params, strategyEdits: [], localEdits: [] }
}

// ── Context wrapper for component tests ───────────────────────────────────────

function CtxWrapper({
  control,
  initialValue,
  strategy,
  children,
  onChangeSpy,
}: {
  control: Control
  initialValue: ControlValue
  strategy?: Strategy
  children: React.ReactNode
  onChangeSpy?: ReturnType<typeof vi.fn>
}) {
  const [state, setState] = useState<TicketStateMap>(new Map([[control.id, initialValue]]))
  const strat = strategy ?? makeStrategy()

  const ctx: TicketCtx = {
    state,
    effectiveState: new Map(),
    strategy: strat,
    onChange: (id, v) => {
      setState(new Map([[id, v]]))
      onChangeSpy?.(id, v)
    },
    onRadioSelect: vi.fn(),
    getStandardField: () => undefined,
    hoveredControlId: null,
    setHoveredControlId: () => {},
    cxlRplMode: false,
    originalState: null,
    sendOrder: () => {},
  }

  return <TicketContext.Provider value={ctx}>{children}</TicketContext.Provider>
}

function renderControl(
  control: Control,
  initialValue: ControlValue = { raw: null, initialized: false },
  strategy?: Strategy,
  onChangeSpy?: ReturnType<typeof vi.fn>,
) {
  render(
    <CtxWrapper control={control} initialValue={initialValue} strategy={strategy} onChangeSpy={onChangeSpy}>
      <ControlRenderer control={control} />
    </CtxWrapper>,
  )
}

// ── resolveClockInitValue ──────────────────────────────────────────────────────

describe('resolveClockInitValue', () => {
  const NOW = new Date('2024-01-15T13:00:00Z')

  test('undefined initValue returns null', () => {
    expect(resolveClockInitValue(undefined, undefined, 'UTCTimeOnly_t', NOW)).toBeNull()
  })

  test('no initValueMode returns initValue unchanged', () => {
    expect(resolveClockInitValue('14:00:00', undefined, 'UTCTimeOnly_t', NOW)).toBe('14:00:00')
  })

  test('initValueMode=0 returns initValue unchanged', () => {
    expect(resolveClockInitValue('12:00:00', 0, 'UTCTimeOnly_t', NOW)).toBe('12:00:00')
  })

  test('UTCTimeOnly_t future time: returns initValue', () => {
    expect(resolveClockInitValue('14:00:00', 1, 'UTCTimeOnly_t', NOW)).toBe('14:00:00')
  })

  test('UTCTimeOnly_t past time: returns now as HH:MM:SS', () => {
    const result = resolveClockInitValue('12:00:00', 1, 'UTCTimeOnly_t', NOW)
    expect(result).toBe('13:00:00')
  })

  test('TZTimeOnly_t past time: returns now as HH:MM:SS', () => {
    const now = new Date('2024-01-15T09:30:45Z')
    const result = resolveClockInitValue('09:00:00', 1, 'TZTimeOnly_t', now)
    expect(result).toBe('09:30:45')
  })

  test('UTCTimeOnly_t exact match: future (initSecs > nowSecs)', () => {
    const now = new Date('2024-01-15T13:00:00Z')
    expect(resolveClockInitValue('13:00:01', 1, 'UTCTimeOnly_t', now)).toBe('13:00:01')
  })

  test('UTCDateOnly_t ignores initValueMode=1 — returns initValue', () => {
    expect(resolveClockInitValue('2024-01-20', 1, 'UTCDateOnly_t', NOW)).toBe('2024-01-20')
  })

  test('MonthYear_t ignores initValueMode=1 — returns initValue', () => {
    expect(resolveClockInitValue('2024-06', 1, 'MonthYear_t', NOW)).toBe('2024-06')
  })

  test('UTCTimestamp_t future timestamp: returns initValue', () => {
    const future = '2024-01-15T14:00:00Z'
    expect(resolveClockInitValue(future, 1, 'UTCTimestamp_t', NOW)).toBe(future)
  })

  test('UTCTimestamp_t past timestamp: returns ISO time', () => {
    const past = '2024-01-15T12:00:00Z'
    const result = resolveClockInitValue(past, 1, 'UTCTimestamp_t', NOW)
    expect(result).toBe('2024-01-15T13:00:00')
  })
})

// ── matchListItem ──────────────────────────────────────────────────────────────

describe('matchListItem', () => {
  const items = [
    { enumID: 'e_Buy', uiRep: 'Buy' },
    { enumID: 'e_Sell', uiRep: 'Sell' },
    { enumID: 'e_Short', uiRep: 'Sell Short' },
  ]

  test('exact match returns enumID', () => {
    expect(matchListItem('Buy', items)).toBe('e_Buy')
  })

  test('case-insensitive exact match returns enumID', () => {
    expect(matchListItem('buy', items)).toBe('e_Buy')
    expect(matchListItem('SELL', items)).toBe('e_Sell')
  })

  test('partial text that is not an exact match returns null', () => {
    expect(matchListItem('Buy something', items)).toBeNull()
  })

  test('exact multi-word match works', () => {
    expect(matchListItem('Sell Short', items)).toBe('e_Short')
  })

  test('unrecognized text returns null', () => {
    expect(matchListItem('Hold', items)).toBeNull()
  })

  test('empty string returns null', () => {
    expect(matchListItem('', items)).toBeNull()
  })
})

// ── doubleSpinnerTooltip ───────────────────────────────────────────────────────

describe('doubleSpinnerTooltip', () => {
  test('LotSize policy returns tooltip containing policy name and increment', () => {
    const tip = doubleSpinnerTooltip('LotSize', 100)
    expect(tip).toContain('LotSize')
    expect(tip).toContain('100')
  })

  test('Tick policy returns tooltip', () => {
    const tip = doubleSpinnerTooltip('Tick', 0.01)
    expect(tip).toContain('Tick')
    expect(tip).toContain('0.01')
  })

  test('Static policy returns undefined', () => {
    expect(doubleSpinnerTooltip('Static', 5)).toBeUndefined()
  })

  test('undefined policy returns undefined', () => {
    expect(doubleSpinnerTooltip(undefined, 1)).toBeUndefined()
  })
})

// ── tzAbbrev ───────────────────────────────────────────────────────────────────

describe('tzAbbrev', () => {
  test('UTC returns "UTC"', () => {
    expect(tzAbbrev('UTC')).toBe('UTC')
  })

  test('unknown timezone returns the tz string as-is', () => {
    expect(tzAbbrev('Not/ATimezone')).toBe('Not/ATimezone')
  })
})

// ── Clock_t rendering ──────────────────────────────────────────────────────────

describe('ClockControl rendering', () => {
  test('renders time input for UTCTimeOnly_t param', () => {
    const ctrl = makeCtrl({ id: 'c1', parameterRef: 'P' })
    const strat: Strategy = {
      ...makeStrategy(),
      parameters: [{
        name: 'P', xsiType: 'UTCTimeOnly_t', use: 'optional',
        mutableOnCxlRpl: false, revertOnCxlRpl: false, definedByFIX: false, enumPairs: [],
      }],
    }
    renderControl(ctrl, { raw: null, initialized: false }, strat)
    expect(document.querySelectorAll('input[type="time"]').length).toBe(1)
    expect(document.querySelectorAll('input[type="date"]').length).toBe(0)
  })

  test('renders timezone hint for localMktTz control', () => {
    const ctrl = makeCtrl({ id: 'c1', localMktTz: 'UTC' })
    renderControl(ctrl)
    expect(screen.getByTestId('tz-hint')).toHaveTextContent('UTC')
  })

  test('renders no tz hint when localMktTz is absent', () => {
    const ctrl = makeCtrl({ id: 'c1' })
    renderControl(ctrl)
    expect(screen.queryByTestId('tz-hint')).toBeNull()
  })

  test('renders month input for MonthYear_t param', () => {
    const ctrl = makeCtrl({ id: 'c1', parameterRef: 'P' })
    const strat: Strategy = {
      ...makeStrategy(),
      parameters: [{
        name: 'P', xsiType: 'MonthYear_t', use: 'optional',
        mutableOnCxlRpl: false, revertOnCxlRpl: false, definedByFIX: false, enumPairs: [],
      }],
    }
    renderControl(ctrl, { raw: null, initialized: false }, strat)
    expect(document.querySelector('input[type="month"]')).not.toBeNull()
  })
})

// ── DoubleSpinner_t rendering ──────────────────────────────────────────────────

describe('DoubleSpinnerControl', () => {
  function makeDS(overrides: Partial<Control> = {}): Control {
    return makeCtrl({ xsiType: 'DoubleSpinner_t', ...overrides })
  }

  test('clicking outer increment button applies outerIncrement', () => {
    const spy = vi.fn()
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 100, innerIncrement: 10 })
    renderControl(ctrl, { raw: 0, initialized: true }, undefined, spy)
    fireEvent.click(screen.getByLabelText('Outer increment'))
    expect(spy).toHaveBeenCalledWith('ds1', { raw: 100, initialized: true })
  })

  test('clicking outer decrement button decrements by outerIncrement', () => {
    const spy = vi.fn()
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 100, innerIncrement: 10 })
    renderControl(ctrl, { raw: 200, initialized: true }, undefined, spy)
    fireEvent.click(screen.getByLabelText('Outer decrement'))
    expect(spy).toHaveBeenCalledWith('ds1', { raw: 100, initialized: true })
  })

  test('clicking inner increment button applies innerIncrement', () => {
    const spy = vi.fn()
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 100, innerIncrement: 10 })
    renderControl(ctrl, { raw: 50, initialized: true }, undefined, spy)
    fireEvent.click(screen.getByLabelText('Inner increment'))
    expect(spy).toHaveBeenCalledWith('ds1', { raw: 60, initialized: true })
  })

  test('clicking inner decrement button decrements by innerIncrement', () => {
    const spy = vi.fn()
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 100, innerIncrement: 10 })
    renderControl(ctrl, { raw: 50, initialized: true }, undefined, spy)
    fireEvent.click(screen.getByLabelText('Inner decrement'))
    expect(spy).toHaveBeenCalledWith('ds1', { raw: 40, initialized: true })
  })

  test('LotSize policy: outer increment button has tooltip mentioning LotSize', () => {
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 500, outerIncrementPolicy: 'LotSize' })
    renderControl(ctrl, { raw: 0, initialized: true })
    const btn = screen.getByLabelText('Outer increment')
    expect(btn.getAttribute('title')).toContain('LotSize')
    expect(btn.getAttribute('title')).toContain('500')
  })

  test('Tick policy: inner increment button has tooltip mentioning Tick', () => {
    const ctrl = makeDS({ id: 'ds1', innerIncrement: 0.25, innerIncrementPolicy: 'Tick' })
    renderControl(ctrl, { raw: 0, initialized: true })
    const btn = screen.getByLabelText('Inner increment')
    expect(btn.getAttribute('title')).toContain('Tick')
  })

  test('clamps value to param minValue', () => {
    const spy = vi.fn()
    const ctrl = makeDS({ id: 'ds1', outerIncrement: 50, parameterRef: 'P' })
    const strat: Strategy = {
      ...makeStrategy(),
      parameters: [{
        name: 'P', xsiType: 'Float_t', use: 'optional', minValue: '0', maxValue: '1000',
        mutableOnCxlRpl: false, revertOnCxlRpl: false, definedByFIX: false, enumPairs: [],
      }],
    }
    renderControl(ctrl, { raw: 10, initialized: true }, strat, spy)
    fireEvent.click(screen.getByLabelText('Outer decrement'))
    expect(spy).toHaveBeenCalledWith('ds1', { raw: 0, initialized: true })
  })
})

// ── EditableDropDownList_t rendering ──────────────────────────────────────────

describe('EditableDropDownListControl', () => {
  const items = [
    { enumID: 'e_Uniform', uiRep: 'Uniform', filter: undefined },
    { enumID: 'e_Medium', uiRep: 'Medium', filter: undefined },
    { enumID: 'e_Aggressive', uiRep: 'Aggressive', filter: undefined },
  ]

  function makeED(): Control {
    return makeCtrl({ id: 'ed1', xsiType: 'EditableDropDownList_t', listItems: items })
  }

  test('typing an exact uiRep stores the enumID', () => {
    const spy = vi.fn()
    renderControl(makeED(), { raw: null, initialized: false }, undefined, spy)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'Uniform' } })
    expect(spy).toHaveBeenCalledWith('ed1', { raw: 'e_Uniform', initialized: true })
  })

  test('typing case-insensitive uiRep stores the enumID', () => {
    const spy = vi.fn()
    renderControl(makeED(), { raw: null, initialized: false }, undefined, spy)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'uniform' } })
    expect(spy).toHaveBeenCalledWith('ed1', { raw: 'e_Uniform', initialized: true })
  })

  test('typing unmatched text stores the raw string', () => {
    const spy = vi.fn()
    renderControl(makeED(), { raw: null, initialized: false }, undefined, spy)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'CustomAlgo' } })
    expect(spy).toHaveBeenCalledWith('ed1', { raw: 'CustomAlgo', initialized: true })
  })

  test('clear button calls onChange with uninitialized null', () => {
    const spy = vi.fn()
    renderControl(makeED(), { raw: 'e_Uniform', initialized: true }, undefined, spy)
    const clear = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clear)
    expect(spy).toHaveBeenCalledWith('ed1', { raw: null, initialized: false })
  })

  test('clear button clears input text', () => {
    renderControl(makeED(), { raw: 'e_Medium', initialized: true })
    const clear = screen.getByRole('button', { name: /clear/i })
    fireEvent.click(clear)
    expect(screen.getByRole('combobox')).toHaveValue('')
  })

  test('datalist contains all listItems', () => {
    renderControl(makeED(), { raw: null, initialized: false })
    const options = document.querySelectorAll('datalist option')
    expect(options.length).toBe(3)
    const values = Array.from(options).map(o => o.getAttribute('value'))
    expect(values).toContain('Uniform')
    expect(values).toContain('Medium')
    expect(values).toContain('Aggressive')
  })
})
