import { describe, it, expect } from 'vitest'
import { resolveWireValues, buildTag957Lines, timeOfDayInTzToUTC } from './wireValueResolver'
import type { Strategy, Parameter, Control, ParameterType, ControlType, EnumPair } from '../model'
import type { ControlValue, TicketStateMap } from '../ticket/ticketTypes'

// ── Test helpers ───────────────────────────────────────────────────────────────

function mkParam(
  overrides: Partial<Parameter> & { name: string; xsiType: ParameterType; fixTag?: number },
): Parameter {
  return {
    use: 'optional',
    mutableOnCxlRpl: true,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    ...overrides,
  }
}

function mkCtrl(
  id: string,
  xsiType: ControlType,
  parameterRef: string,
  extra: Partial<Control> = {},
): Control {
  return {
    kind: 'control',
    id,
    xsiType,
    parameterRef,
    listItems: [],
    stateRules: [],
    ...extra,
  }
}

function mkEnumPair(enumID: string, wireValue: string): EnumPair {
  return { enumID, wireValue }
}

function mkStrategy(params: Parameter[]): Strategy {
  return {
    name: 'S',
    wireValue: 'v1',
    parameters: params,
    strategyEdits: [],
    localEdits: [],
  }
}

function mkState(...entries: [string, ControlValue][]): TicketStateMap {
  return new Map(entries)
}

function cv(raw: ControlValue['raw'], initialized = true): ControlValue {
  return { raw, initialized }
}

const noSF = () => undefined

// ── UDF transport: tag=wireValue pairs ────────────────────────────────────────

describe('UDF transport — resolveWireValues', () => {
  it('produces fixTag=wireValue pairs for initialized controls', () => {
    const param = mkParam({ name: 'Qty', xsiType: 'Qty_t', fixTag: 38 })
    const ctrl = mkCtrl('qty_ctrl', 'SingleSpinner_t', 'Qty')
    const strategy = mkStrategy([param])
    const state = mkState(['qty_ctrl', cv(100)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields).toHaveLength(1)
    expect(out.fields[0]).toMatchObject({ tag: 38, paramName: 'Qty', wireValue: '100' })
  })

  it('omits uninitialized parameters', () => {
    const param = mkParam({ name: 'Qty', xsiType: 'Qty_t', fixTag: 38 })
    const ctrl = mkCtrl('qty_ctrl', 'SingleSpinner_t', 'Qty')
    const strategy = mkStrategy([param])
    const state = mkState(['qty_ctrl', cv(null, false)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields).toHaveLength(0)
  })

  it('omits null raw values', () => {
    const param = mkParam({ name: 'TxtP', xsiType: 'String_t', fixTag: 58 })
    const ctrl = mkCtrl('txt', 'TextField_t', 'TxtP')
    const strategy = mkStrategy([param])
    const state = mkState(['txt', cv(null)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields).toHaveLength(0)
  })

  it('maps enumID to wireValue for DropDownList_t', () => {
    const param = mkParam({
      name: 'Side', xsiType: 'Char_t', fixTag: 54,
      enumPairs: [mkEnumPair('buy', '1'), mkEnumPair('sell', '2')],
    })
    const ctrl = mkCtrl('side_dd', 'DropDownList_t', 'Side')
    const strategy = mkStrategy([param])
    const state = mkState(['side_dd', cv('buy')])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields[0].wireValue).toBe('1')
  })

  it('maps CheckBox_t with checkedEnumRef to wireValue', () => {
    const param = mkParam({
      name: 'Agg', xsiType: 'Boolean_t', fixTag: 9000,
      enumPairs: [mkEnumPair('Y', 'Y'), mkEnumPair('N', 'N')],
    })
    const ctrl = mkCtrl('agg_cb', 'CheckBox_t', 'Agg', {
      checkedEnumRef: 'Y',
      uncheckedEnumRef: 'N',
    })
    const strategy = mkStrategy([param])
    const state = mkState(['agg_cb', cv(true)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields[0].wireValue).toBe('Y')
  })

  it('maps CheckBoxList_t selections to space-delimited wireValues', () => {
    const param = mkParam({
      name: 'Markets', xsiType: 'MultipleStringValue_t', fixTag: 9001,
      enumPairs: [
        mkEnumPair('NYSE', 'N'), mkEnumPair('NASDAQ', 'Q'), mkEnumPair('BATS', 'B'),
      ],
    })
    const ctrl = mkCtrl('mkt_cbl', 'CheckBoxList_t', 'Markets')
    const strategy = mkStrategy([param])
    const state = mkState(['mkt_cbl', cv(['NYSE', 'BATS'])])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields[0].wireValue).toBe('N B')
  })

  it('uses constValue directly (not ticketState)', () => {
    const param = mkParam({ name: 'Venue', xsiType: 'String_t', fixTag: 100, constValue: 'SMART' })
    const strategy = mkStrategy([param])

    const out = resolveWireValues(strategy, [], mkState(), noSF)
    expect(out.fields[0]).toMatchObject({ tag: 100, wireValue: 'SMART' })
  })

  it('records invertOnWire params but still emits the raw value', () => {
    const param = mkParam({ name: 'Pct', xsiType: 'Percentage_t', fixTag: 9002, invertOnWire: true })
    const ctrl = mkCtrl('pct_spin', 'SingleSpinner_t', 'Pct')
    const strategy = mkStrategy([param])
    const state = mkState(['pct_spin', cv(0.15)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.invertOnWireParams).toContain('Pct')
    expect(out.fields[0].wireValue).toBe('0.15')
  })
})

// ── 957 transport ──────────────────────────────────────────────────────────────

describe('957 transport — buildTag957Lines', () => {
  it('produces paramName/typeCode/wireValue triplets matching PRD worked example pattern', () => {
    // PctVol: Percentage_t (code 11), value 0.15
    // FC: Exchange_t (code 13), value Y
    const params = [
      mkParam({ name: 'PctVol', xsiType: 'Percentage_t' }),  // no fixTag = 957-only
      mkParam({ name: 'FC', xsiType: 'Exchange_t' }),
    ]
    const controls = [
      mkCtrl('pct_ctrl', 'SingleSpinner_t', 'PctVol'),
      mkCtrl('fc_ctrl', 'TextField_t', 'FC'),
    ]
    const strategy = mkStrategy(params)
    const state = mkState(['pct_ctrl', cv(0.15)], ['fc_ctrl', cv('Y')])

    const wireOut = resolveWireValues(strategy, controls, state, noSF)
    const lines = buildTag957Lines(strategy, wireOut)

    expect(lines).toHaveLength(2)
    expect(lines[0]).toMatchObject({ paramName: 'PctVol', typeCode: 11, wireValue: '0.15' })
    expect(lines[1]).toMatchObject({ paramName: 'FC', typeCode: 13, wireValue: 'Y' })
  })

  it('omits params with no resolved wire value', () => {
    const params = [
      mkParam({ name: 'A', xsiType: 'String_t' }),
      mkParam({ name: 'B', xsiType: 'String_t' }),
    ]
    const ctrls = [
      mkCtrl('a', 'TextField_t', 'A'),
      mkCtrl('b', 'TextField_t', 'B'),
    ]
    const strategy = mkStrategy(params)
    const state = mkState(['a', cv('hello')], ['b', cv(null, false)])

    const wireOut = resolveWireValues(strategy, ctrls, state, noSF)
    const lines = buildTag957Lines(strategy, wireOut)

    expect(lines).toHaveLength(1)
    expect(lines[0].paramName).toBe('A')
  })
})

// ── constValue UTCTimestamp + localMktTz ────────────────────────────────────────

describe('constValue UTCTimestamp tz combination', () => {
  it('converts 08:30:00 America/Chicago DST → YYYYMMDD-13:30:00 UTC', () => {
    // 2024-06-15 12:00 UTC = 07:00 CDT (summer, UTC-5)
    // Today in Chicago = 2024-06-15
    // 08:30 CDT = 13:30 UTC
    const now = new Date('2024-06-15T12:00:00Z')
    const result = timeOfDayInTzToUTC('08:30:00', 'America/Chicago', now)
    expect(result).toBe('20240615-13:30:00')
  })

  it('converts 08:30:00 America/Chicago winter → YYYYMMDD-14:30:00 UTC', () => {
    // 2024-01-15 12:00 UTC = 06:00 CST (winter, UTC-6)
    // Today in Chicago = 2024-01-15
    // 08:30 CST = 14:30 UTC
    const now = new Date('2024-01-15T12:00:00Z')
    const result = timeOfDayInTzToUTC('08:30:00', 'America/Chicago', now)
    expect(result).toBe('20240115-14:30:00')
  })

  it('resolves constValue for UTCTimestamp_t param with localMktTz', () => {
    const param = mkParam({
      name: 'OpenTime', xsiType: 'UTCTimestamp_t', fixTag: 9005,
      constValue: '08:30:00',
      localMktTz: 'America/Chicago',
    })
    const strategy = mkStrategy([param])
    const now = new Date('2024-06-15T12:00:00Z')

    const out = resolveWireValues(strategy, [], mkState(), noSF, now)
    expect(out.fields[0].wireValue).toBe('20240615-13:30:00')
  })
})

// ── Precision rounding ────────────────────────────────────────────────────────

describe('precision rounding', () => {
  it('rounds float values to specified decimal places', () => {
    const param = mkParam({ name: 'Price', xsiType: 'Price_t', fixTag: 44, precision: 2 })
    const ctrl = mkCtrl('px', 'SingleSpinner_t', 'Price')
    const strategy = mkStrategy([param])
    const state = mkState(['px', cv(1.23456)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields[0].wireValue).toBe('1.23')
  })
})

// ── multiplyBy100 ─────────────────────────────────────────────────────────────

describe('multiplyBy100 for Percentage_t', () => {
  it('multiplies raw value × 100', () => {
    const param = mkParam({
      name: 'Pct', xsiType: 'Percentage_t', fixTag: 9010,
      multiplyBy100: true,
    })
    const ctrl = mkCtrl('pct', 'SingleSpinner_t', 'Pct')
    const strategy = mkStrategy([param])
    const state = mkState(['pct', cv(0.15)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields[0].wireValue).toBe('15')
  })

  it('applies precision after multiply', () => {
    const param = mkParam({
      name: 'Pct', xsiType: 'Percentage_t', fixTag: 9011,
      multiplyBy100: true, precision: 1,
    })
    const ctrl = mkCtrl('pct2', 'SingleSpinner_t', 'Pct')
    const strategy = mkStrategy([param])
    const state = mkState(['pct2', cv(0.156)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    // 0.156 * 100 = 15.6 → toFixed(1) = "15.6"
    expect(out.fields[0].wireValue).toBe('15.6')
  })
})

// ── {NULL} / uninitialized → omitted ─────────────────────────────────────────

describe('{NULL} wireValue → tag omitted', () => {
  it('omits a DropDownList selection that maps to {NULL} wireValue', () => {
    const param = mkParam({
      name: 'OT', xsiType: 'Char_t', fixTag: 9020,
      enumPairs: [mkEnumPair('none', '{NULL}'), mkEnumPair('lmt', '2')],
    })
    const ctrl = mkCtrl('ot_dd', 'DropDownList_t', 'OT')
    const strategy = mkStrategy([param])
    const state = mkState(['ot_dd', cv('none')])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields).toHaveLength(0)
  })

  it('omits CheckBox_t when trueWireValue is {NULL} and box is checked', () => {
    const param = mkParam({
      name: 'Flag', xsiType: 'Boolean_t', fixTag: 9021,
      trueWireValue: '{NULL}',
    })
    const ctrl = mkCtrl('flag_cb', 'CheckBox_t', 'Flag')
    const strategy = mkStrategy([param])
    const state = mkState(['flag_cb', cv(true)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.fields).toHaveLength(0)
  })
})

// ── StrategyEdit failures ─────────────────────────────────────────────────────

describe('StrategyEdit failures', () => {
  it('reports errorMsg when a StrategyEdit condition fails', () => {
    const param = mkParam({ name: 'Qty', xsiType: 'Qty_t', fixTag: 38 })
    const ctrl = mkCtrl('qty', 'SingleSpinner_t', 'Qty')
    const strategy: Strategy = {
      ...mkStrategy([param]),
      strategyEdits: [
        {
          errorMsg: 'Qty must be positive',
          condition: { kind: 'compare', field: 'Qty', op: 'GT', value: '0' },
        },
      ],
    }
    // Qty = 0 → GT 0 → false → failure
    const state = mkState(['qty', cv(0)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.strategyEditFailures).toContain('Qty must be positive')
  })

  it('does not report failures when all conditions pass', () => {
    const param = mkParam({ name: 'Qty', xsiType: 'Qty_t', fixTag: 38 })
    const ctrl = mkCtrl('qty', 'SingleSpinner_t', 'Qty')
    const strategy: Strategy = {
      ...mkStrategy([param]),
      strategyEdits: [
        {
          errorMsg: 'Qty must be positive',
          condition: { kind: 'compare', field: 'Qty', op: 'GT', value: '0' },
        },
      ],
    }
    const state = mkState(['qty', cv(5)])

    const out = resolveWireValues(strategy, [ctrl], state, noSF)
    expect(out.strategyEditFailures).toHaveLength(0)
  })
})
