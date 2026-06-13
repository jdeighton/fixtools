import { describe, test, expect } from 'vitest'
import { evaluateStrategyEdits } from './strategyEditEngine'
import type { Strategy, StrategyEdit, Parameter, EditNode } from '../model'

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeStrategy(
  edits: StrategyEdit[] = [],
  params: Parameter[] = [],
): Strategy {
  return { name: 'S', wireValue: 'S', parameters: params, strategyEdits: edits, localEdits: [] }
}

function makeParam(name: string, overrides: Partial<Parameter> = {}): Parameter {
  return {
    name,
    xsiType: 'Float_t',
    use: 'optional',
    mutableOnCxlRpl: false,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    ...overrides,
  }
}

// EditNode builders
const lt   = (f: string, f2: string): EditNode => ({ kind: 'compare', field: f, op: 'LT', field2: f2 })
const ge   = (f: string, v: string):  EditNode => ({ kind: 'compare', field: f, op: 'GE', value: v })
const le   = (f: string, v: string):  EditNode => ({ kind: 'compare', field: f, op: 'LE', value: v })
const nx   = (f: string):             EditNode => ({ kind: 'compare', field: f, op: 'NX' })
const eq   = (f: string, v: string):  EditNode => ({ kind: 'compare', field: f, op: 'EQ', value: v })
const or   = (...ops: EditNode[]):    EditNode => ({ kind: 'logic', op: 'OR', operands: ops })
const and  = (...ops: EditNode[]):    EditNode => ({ kind: 'logic', op: 'AND', operands: ops })

// ── StartTime < EndTime ────────────────────────────────────────────────────────

describe('StartTime < EndTime StrategyEdit', () => {
  const edit: StrategyEdit = {
    errorMsg: 'StartTime must be before EndTime',
    condition: lt('StartTime', 'EndTime'),
  }
  const strategy = makeStrategy([edit])

  test('passes when StartTime < EndTime', () => {
    const wireValues = new Map([['StartTime', '09:00:00'], ['EndTime', '16:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
  })

  test('fails when StartTime >= EndTime', () => {
    const wireValues = new Map([['StartTime', '16:00:00'], ['EndTime', '09:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(false)
    expect(r.errorMsg).toBe('StartTime must be before EndTime')
  })

  test('nodeResults populated with root node result', () => {
    const wireValues = new Map([['StartTime', '09:00:00'], ['EndTime', '16:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.nodeResults.size).toBeGreaterThan(0)
    expect(r.nodeResults.get('0')).toBe(true)
  })

  test('nodeResults shows false when condition fails', () => {
    const wireValues = new Map([['StartTime', '17:00:00'], ['EndTime', '09:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.nodeResults.get('0')).toBe(false)
  })
})

// ── ParticipationRate NX-or-range ─────────────────────────────────────────────

describe('ParticipationRate NX-or-range StrategyEdit', () => {
  const edit: StrategyEdit = {
    errorMsg: 'ParticipationRate must be between 0 and 100, or omitted',
    condition: or(nx('ParticipationRate'), and(ge('ParticipationRate', '0'), le('ParticipationRate', '100'))),
  }
  const strategy = makeStrategy([edit])

  test('passes when ParticipationRate is unset (NX)', () => {
    const results = evaluateStrategyEdits(strategy, new Map(), new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
    // NX node should be true
    expect(r.nodeResults.get('0.0')).toBe(true)
  })

  test('passes when ParticipationRate is within range', () => {
    const wireValues = new Map([['ParticipationRate', '50']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
  })

  test('passes at boundary value 0', () => {
    const wireValues = new Map([['ParticipationRate', '0']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
  })

  test('passes at boundary value 100', () => {
    const wireValues = new Map([['ParticipationRate', '100']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
  })

  test('fails when ParticipationRate is above range', () => {
    const wireValues = new Map([['ParticipationRate', '150']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(false)
    // NX should be false (field exists), AND-GE should be true, AND-LE should be false
    expect(r.nodeResults.get('0.0')).toBe(false)  // NX
    expect(r.nodeResults.get('0.1.1')).toBe(false) // LE 100
  })

  test('fails when ParticipationRate is below range', () => {
    const wireValues = new Map([['ParticipationRate', '-5']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(false)
  })
})

// ── FIX_TimeInForce IOC rule ───────────────────────────────────────────────────

describe('FIX_TimeInForce IOC StrategyEdit', () => {
  const edit: StrategyEdit = {
    errorMsg: 'TimeInForce must be IOC (3)',
    condition: eq('FIX_TimeInForce', '3'),
  }
  const strategy = makeStrategy([edit])

  test('passes when FIX_TimeInForce=3', () => {
    const standardFields = new Map([['FIX_TimeInForce', '3']])
    const results = evaluateStrategyEdits(strategy, new Map(), standardFields)
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
    expect(r.skippedFields).toHaveLength(0)
  })

  test('fails when FIX_TimeInForce != 3', () => {
    const standardFields = new Map([['FIX_TimeInForce', '1']])
    const results = evaluateStrategyEdits(strategy, new Map(), standardFields)
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(false)
  })

  test('rule is skipped when FIX_TimeInForce not in standardFields', () => {
    const results = evaluateStrategyEdits(strategy, new Map(), new Map())
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
    expect(r.skippedFields).toContain('FIX_TimeInForce')
    expect(r.nodeResults.size).toBe(0)
  })

  test('rule skipped even if other standard fields are present', () => {
    const standardFields = new Map([['FIX_Symbol', 'AAPL']])
    const results = evaluateStrategyEdits(strategy, new Map(), standardFields)
    const r = results.find(x => x.edit === edit)!
    expect(r.passed).toBe(true)
    expect(r.skippedFields).toContain('FIX_TimeInForce')
  })
})

// ── Data-contract: required parameter ─────────────────────────────────────────

describe('data-contract: required parameter', () => {
  const strategy = makeStrategy([], [makeParam('OrderQty', { use: 'required', xsiType: 'Qty_t' })])

  test('fails when required param has no wire value', () => {
    const results = evaluateStrategyEdits(strategy, new Map(), new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('OrderQty'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
    expect(dc!.isDataContract).toBe(true)
    expect(dc!.edit).toBeNull()
  })

  test('passes when required param has a wire value', () => {
    const wireValues = new Map([['OrderQty', '1000']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('OrderQty'))
    expect(dc).toBeUndefined()
  })
})

// ── Data-contract: minValue violation ─────────────────────────────────────────

describe('data-contract: minValue violation', () => {
  const strategy = makeStrategy([], [makeParam('Price', { xsiType: 'Price_t', minValue: '0.01' })])

  test('fails when value is below minValue', () => {
    const wireValues = new Map([['Price', '0.001']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
  })

  test('passes when value equals minValue', () => {
    const wireValues = new Map([['Price', '0.01']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeUndefined()
  })

  test('passes when value is above minValue', () => {
    const wireValues = new Map([['Price', '1.50']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeUndefined()
  })
})

// ── Data-contract: maxValue violation ─────────────────────────────────────────

describe('data-contract: maxValue violation', () => {
  const strategy = makeStrategy([], [makeParam('Rate', { xsiType: 'Percentage_t', maxValue: '100' })])

  test('fails when value exceeds maxValue', () => {
    const wireValues = new Map([['Rate', '101']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Rate'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
  })

  test('passes when value equals maxValue', () => {
    const wireValues = new Map([['Rate', '100']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Rate'))
    expect(dc).toBeUndefined()
  })
})

// ── Data-contract: precision violation ────────────────────────────────────────

describe('data-contract: precision violation', () => {
  const strategy = makeStrategy([], [makeParam('Price', { xsiType: 'Price_t', precision: 2 })])

  test('fails when value has more decimal places than precision', () => {
    const wireValues = new Map([['Price', '1.234']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
  })

  test('passes when value is within precision', () => {
    const wireValues = new Map([['Price', '1.23']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeUndefined()
  })

  test('passes when value has fewer decimal places than precision', () => {
    const wireValues = new Map([['Price', '1.2']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeUndefined()
  })

  test('passes when value is integer and precision >= 0', () => {
    const wireValues = new Map([['Price', '10']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Price'))
    expect(dc).toBeUndefined()
  })
})

// ── Data-contract: length violations ──────────────────────────────────────────

describe('data-contract: length violations', () => {
  const strategy = makeStrategy([], [makeParam('Tag', { xsiType: 'String_t', minLength: 2, maxLength: 5 })])

  test('fails when value is shorter than minLength', () => {
    const wireValues = new Map([['Tag', 'A']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Tag'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
  })

  test('fails when value is longer than maxLength', () => {
    const wireValues = new Map([['Tag', 'TOOLONG']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Tag'))
    expect(dc).toBeDefined()
    expect(dc!.passed).toBe(false)
  })

  test('passes when value is within length bounds', () => {
    const wireValues = new Map([['Tag', 'ABC']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dc = results.find(r => r.isDataContract && r.errorMsg.includes('Tag'))
    expect(dc).toBeUndefined()
  })
})

// ── Combined: edits + data-contract in same strategy ──────────────────────────

describe('combined StrategyEdits and data-contract checks', () => {
  const edit: StrategyEdit = {
    errorMsg: 'StartTime must be before EndTime',
    condition: lt('StartTime', 'EndTime'),
  }
  const strategy = makeStrategy(
    [edit],
    [makeParam('StartTime', { use: 'required', xsiType: 'UTCTimeOnly_t' })],
  )

  test('returns both StrategyEdit and data-contract results', () => {
    const wireValues = new Map([['StartTime', '09:00:00'], ['EndTime', '16:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const editResult = results.find(r => r.edit === edit)
    const dcResult = results.find(r => r.isDataContract)
    // EndTime not in wireValues, StartTime is required but has value
    expect(editResult).toBeDefined()
    expect(editResult!.passed).toBe(true)
    // StartTime is required and present → no dc failure
    expect(dcResult).toBeUndefined()
  })

  test('missing required param and failing edit both reported', () => {
    // StartTime missing, but also StartTime >= EndTime check
    const wireValues = new Map([['EndTime', '09:00:00']])
    const results = evaluateStrategyEdits(strategy, wireValues, new Map())
    const dcResult = results.find(r => r.isDataContract && r.errorMsg.includes('StartTime'))
    expect(dcResult).toBeDefined()
    expect(dcResult!.passed).toBe(false)
  })
})
