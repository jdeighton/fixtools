import sampleXml from '../data/SampleStrategiesFor-v1_1.xml?raw'
import { parseAtdlDocument } from '../parse'
import type {
  AtdlDocument, Strategy, Parameter, ParameterType, Control, ControlType,
  StrategyPanel, Finding,
} from '../model'
import { checkPA } from './rules/pa'
import { checkCT } from './rules/ct'
import { validateDocument } from './engine'

// ── Tracked rule IDs for meta-test ────────────────────────────────────────────

const testedRuleIds = new Set<string>()

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeParam(overrides: Partial<Parameter> & { name: string; xsiType: ParameterType }): Parameter {
  return {
    use: 'optional',
    mutableOnCxlRpl: true,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    fixTag: 100,
    ...overrides,
  }
}

function makeControl(overrides: Partial<Control> & { id: string; xsiType: ControlType }): Control {
  return {
    kind: 'control',
    label: overrides.id,
    listItems: [],
    stateRules: [],
    ...overrides,
  }
}

function makePanel(children: Array<StrategyPanel | Control>): StrategyPanel {
  return {
    kind: 'panel',
    collapsed: false,
    collapsible: false,
    orientation: 'VERTICAL',
    children,
  }
}

function makeStrategy(overrides: Partial<Strategy> & { name: string }): Strategy {
  return {
    wireValue: overrides.name,
    version: '1',
    parameters: [],
    strategyEdits: [],
    localEdits: [],
    ...overrides,
  }
}

function makeDoc(strategies: Strategy[], tag957Support = false): AtdlDocument {
  return {
    version: '1.1',
    namespaces: {},
    strategies,
    tag957Support,
    globalEdits: [],
    findings: [],
    sourceLineIndex: { getLine: () => undefined },
    sourceXml: '',
  }
}

function hasPA(findings: Finding[], id: string): boolean {
  return findings.some(f => f.ruleId === id)
}

// ── golden: bundled sample produces zero PA/CT findings ───────────────────────

describe('bundled sample — zero PA/CT findings', () => {
  let findings: Finding[]
  beforeAll(() => { findings = validateDocument(parseAtdlDocument(sampleXml)) })

  test('zero PA/CT errors', () => {
    const paCt = findings.filter(f => f.ruleId.startsWith('PA-') || f.ruleId.startsWith('CT-'))
    expect(paCt.filter(f => f.severity === 'error')).toHaveLength(0)
  })
  test('zero PA/CT warnings', () => {
    const paCt = findings.filter(f => f.ruleId.startsWith('PA-') || f.ruleId.startsWith('CT-'))
    expect(paCt.filter(f => f.severity === 'warning')).toHaveLength(0)
  })
})

// ── PA-001: Parameter @name ───────────────────────────────────────────────────

describe('PA-001', () => {
  testedRuleIds.add('PA-001')

  test('missing @name triggers PA-001', () => {
    const p = makeParam({ name: '', xsiType: 'Int_t', fixTag: 101 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-001')).toBe(true)
  })

  test('invalid StringID triggers PA-001', () => {
    const p = makeParam({ name: '1BadName', xsiType: 'Int_t', fixTag: 101 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-001')).toBe(true)
  })

  test('valid name does not trigger PA-001', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'MyParam', xsiType: 'Int_t', fixTag: 101 })] })])
    expect(hasPA(checkPA(doc), 'PA-001')).toBe(false)
  })
})

// ── PA-002: Parameter @xsi:type ───────────────────────────────────────────────

describe('PA-002', () => {
  testedRuleIds.add('PA-002')

  test('missing xsiType triggers PA-002', () => {
    const p = makeParam({ name: 'P', xsiType: '' as ParameterType, fixTag: 101 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-002')).toBe(true)
  })

  test('valid xsiType does not trigger PA-002', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101 })] })])
    expect(hasPA(checkPA(doc), 'PA-002')).toBe(false)
  })
})

// ── PA-003: Parameter @use ────────────────────────────────────────────────────

describe('PA-003', () => {
  testedRuleIds.add('PA-003')

  test('invalid @use triggers PA-003', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, use: 'mandatory' as 'optional' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-003')).toBe(true)
  })

  test('"optional" does not trigger PA-003', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, use: 'optional' })] })])
    expect(hasPA(checkPA(doc), 'PA-003')).toBe(false)
  })

  test('"required" does not trigger PA-003', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, use: 'required' })] })])
    expect(hasPA(checkPA(doc), 'PA-003')).toBe(false)
  })
})

// ── PA-004: constValue + required is contradictory ────────────────────────────

describe('PA-004', () => {
  testedRuleIds.add('PA-004')

  test('constValue on required param triggers PA-004', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, use: 'required', constValue: '42' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-004')).toBe(true)
  })

  test('constValue on optional param does not trigger PA-004', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, use: 'optional', constValue: '42' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-004')).toBe(false)
  })
})

// ── PA-005: no fixTag without tag957Support ───────────────────────────────────

describe('PA-005', () => {
  testedRuleIds.add('PA-005')

  test('no fixTag + no tag957Support triggers PA-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t' })
    delete (p as Partial<Parameter>).fixTag
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })], false)
    expect(hasPA(checkPA(doc), 'PA-005')).toBe(true)
  })

  test('no fixTag but tag957Support=true does not trigger PA-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t' })
    delete (p as Partial<Parameter>).fixTag
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })], true)
    expect(hasPA(checkPA(doc), 'PA-005')).toBe(false)
  })

  test('constValue param without fixTag does not trigger PA-005', () => {
    const p: Parameter = { name: 'P', xsiType: 'Int_t', use: 'optional', constValue: '1',
      mutableOnCxlRpl: true, revertOnCxlRpl: false, definedByFIX: false, enumPairs: [] }
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })], false)
    expect(hasPA(checkPA(doc), 'PA-005')).toBe(false)
  })
})

// ── PA-006: fixTag must be > 0 ────────────────────────────────────────────────

describe('PA-006', () => {
  testedRuleIds.add('PA-006')

  test('fixTag=0 triggers PA-006', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 0 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-006')).toBe(true)
  })

  test('fixTag=-1 triggers PA-006', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: -1 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-006')).toBe(true)
  })

  test('fixTag=1 does not trigger PA-006', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 1 })] })])
    expect(hasPA(checkPA(doc), 'PA-006')).toBe(false)
  })
})

// ── PA-007: minValue/maxValue parse as parameter type ─────────────────────────

describe('PA-007', () => {
  testedRuleIds.add('PA-007')

  test('non-numeric minValue on Int_t triggers PA-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, minValue: 'abc' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-007')).toBe(true)
  })

  test('MINUS_INF minValue on Int_t does not trigger PA-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, minValue: 'MINUS_INF' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-007')).toBe(false)
  })

  test('HH:MM:SS maxValue on UTCTimestamp_t does not trigger PA-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCTimestamp_t', fixTag: 101, maxValue: '16:00:00' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-007')).toBe(false)
  })

  test('full timestamp on UTCTimestamp_t does not trigger PA-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCTimestamp_t', fixTag: 101, minValue: '20231201-09:30:00' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-007')).toBe(false)
  })

  test('bad date on UTCDateOnly_t triggers PA-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCDateOnly_t', fixTag: 101, minValue: 'not-a-date' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-007')).toBe(true)
  })
})

// ── PA-008: minValue ≤ maxValue ───────────────────────────────────────────────

describe('PA-008', () => {
  testedRuleIds.add('PA-008')

  test('min > max triggers PA-008', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, minValue: '10', maxValue: '5' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-008')).toBe(true)
  })

  test('min = max does not trigger PA-008', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, minValue: '5', maxValue: '5' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-008')).toBe(false)
  })

  test('min < max does not trigger PA-008', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, minValue: '1', maxValue: '100' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-008')).toBe(false)
  })
})

// ── PA-009: type-inapplicable attributes ──────────────────────────────────────

describe('PA-009', () => {
  testedRuleIds.add('PA-009')

  test('precision on Int_t triggers PA-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, precision: 2 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-009')).toBe(true)
  })

  test('minLength on Boolean_t triggers PA-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101, minLength: 1 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-009')).toBe(true)
  })

  test('minValue on String_t triggers PA-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101, minValue: '0' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-009')).toBe(true)
  })

  test('precision on Float_t does not trigger PA-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, precision: 2 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-009')).toBe(false)
  })
})

// ── PA-010: precision/minLength/maxLength non-negative ────────────────────────

describe('PA-010', () => {
  testedRuleIds.add('PA-010')

  test('precision=-1 triggers PA-010', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, precision: -1 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-010')).toBe(true)
  })

  test('minLength=-1 triggers PA-010', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101, minLength: -1 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-010')).toBe(true)
  })

  test('minLength > maxLength triggers PA-010', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101, minLength: 10, maxLength: 5 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-010')).toBe(true)
  })

  test('precision=0 does not trigger PA-010', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, precision: 0 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-010')).toBe(false)
  })
})

// ── PA-011: deprecated trueWireValue / falseWireValue ─────────────────────────

describe('PA-011', () => {
  testedRuleIds.add('PA-011')

  test('trueWireValue triggers PA-011', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101, trueWireValue: 'Y' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-011')).toBe(true)
  })

  test('falseWireValue triggers PA-011', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101, falseWireValue: 'N' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-011')).toBe(true)
  })

  test('no wire values does not trigger PA-011', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101 })] })])
    expect(hasPA(checkPA(doc), 'PA-011')).toBe(false)
  })
})

// ── PA-012: deprecated multiplyBy100 ─────────────────────────────────────────

describe('PA-012', () => {
  testedRuleIds.add('PA-012')

  test('multiplyBy100=true triggers PA-012', () => {
    const p = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101, multiplyBy100: true })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-012')).toBe(true)
  })

  test('multiplyBy100 absent does not trigger PA-012', () => {
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 101 })] })])
    expect(hasPA(checkPA(doc), 'PA-012')).toBe(false)
  })
})

// ── PA-013: EnumPair enumID / wireValue required ──────────────────────────────

describe('PA-013', () => {
  testedRuleIds.add('PA-013')

  test('EnumPair with empty enumID triggers PA-013', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: '', wireValue: '1' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-013')).toBe(true)
  })

  test('EnumPair with invalid enumID triggers PA-013', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: '1bad', wireValue: '1' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-013')).toBe(true)
  })

  test('EnumPair with null wireValue triggers PA-013', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: 'val1', wireValue: null as unknown as string }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-013')).toBe(true)
  })

  test('valid EnumPair does not trigger PA-013', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: 'eHigh', wireValue: '3' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-013')).toBe(false)
  })
})

// ── PA-014: EnumPair wireValues unique within parameter ───────────────────────

describe('PA-014', () => {
  testedRuleIds.add('PA-014')

  test('duplicate wireValues trigger PA-014', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'e1', wireValue: 'A' }, { enumID: 'e2', wireValue: 'A' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-014')).toBe(true)
  })

  test('distinct wireValues do not trigger PA-014', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'e1', wireValue: 'A' }, { enumID: 'e2', wireValue: 'B' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-014')).toBe(false)
  })
})

// ── PA-015: localMktTz applicability and valid IANA name ─────────────────────

describe('PA-015', () => {
  testedRuleIds.add('PA-015')

  test('localMktTz on Boolean_t triggers PA-015', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101, localMktTz: 'America/New_York' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-015')).toBe(true)
  })

  test('unknown timezone on UTCTimestamp_t triggers PA-015', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCTimestamp_t', fixTag: 101, localMktTz: 'Mars/Olympus' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-015')).toBe(true)
  })

  test('valid timezone on UTCTimestamp_t does not trigger PA-015', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCTimestamp_t', fixTag: 101, localMktTz: 'America/New_York' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-015')).toBe(false)
  })

  test('valid timezone on TZTimeOnly_t does not trigger PA-015', () => {
    const p = makeParam({ name: 'P', xsiType: 'TZTimeOnly_t', fixTag: 101, localMktTz: 'Europe/London' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-015')).toBe(false)
  })
})

// ── PA-016: invertOnWire only on Boolean_t ────────────────────────────────────

describe('PA-016', () => {
  testedRuleIds.add('PA-016')

  test('invertOnWire on Int_t triggers PA-016', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101, invertOnWire: true })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-016')).toBe(true)
  })

  test('invertOnWire on Boolean_t does not trigger PA-016', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101, invertOnWire: true })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-016')).toBe(false)
  })
})

// ── PA-017: constValue must parse as parameter type ───────────────────────────

describe('PA-017', () => {
  testedRuleIds.add('PA-017')

  test('non-numeric constValue on Int_t triggers PA-017', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', constValue: 'not-a-number' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-017')).toBe(true)
  })

  test('valid constValue on Int_t does not trigger PA-017', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', constValue: '42' })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-017')).toBe(false)
  })
})

// ── PA-018: deprecated index attribute on EnumPair (no-op — parser drops it) ─

describe('PA-018', () => {
  testedRuleIds.add('PA-018')

  test('PA-018 never fires (index attribute stripped by parser)', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: '1' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-018')).toBe(false)
  })
})

// ── PA-019: fixTag ≥ 10000 → info ─────────────────────────────────────────────

describe('PA-019', () => {
  testedRuleIds.add('PA-019')

  test('fixTag=10000 triggers PA-019 info', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 10000 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    const findings = checkPA(doc)
    const f = findings.find(f => f.ruleId === 'PA-019')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('fixTag=9999 does not trigger PA-019', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 9999 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-019')).toBe(false)
  })
})

// ── PA-020: EnumPair enumIDs unique within parameter ──────────────────────────

describe('PA-020', () => {
  testedRuleIds.add('PA-020')

  test('duplicate enumIDs trigger PA-020', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }, { enumID: 'eA', wireValue: 'B' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-020')).toBe(true)
  })

  test('distinct enumIDs do not trigger PA-020', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }, { enumID: 'eB', wireValue: 'B' }] })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p] })])
    expect(hasPA(checkPA(doc), 'PA-020')).toBe(false)
  })
})

// ── PA-021: parameter names unique within strategy ───────────────────────────

describe('PA-021', () => {
  testedRuleIds.add('PA-021')

  test('duplicate parameter names trigger PA-021', () => {
    const p1 = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const p2 = makeParam({ name: 'P', xsiType: 'Float_t', fixTag: 102 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p1, p2] })])
    expect(hasPA(checkPA(doc), 'PA-021')).toBe(true)
  })

  test('unique parameter names do not trigger PA-021', () => {
    const p1 = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const p2 = makeParam({ name: 'P2', xsiType: 'Float_t', fixTag: 102 })
    const doc = makeDoc([makeStrategy({ name: 'S', parameters: [p1, p2] })])
    expect(hasPA(checkPA(doc), 'PA-021')).toBe(false)
  })
})

// ── CT-001: Control @id ───────────────────────────────────────────────────────

describe('CT-001', () => {
  testedRuleIds.add('CT-001')

  test('missing @id triggers CT-001', () => {
    const c = makeControl({ id: '', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-001')).toBe(true)
  })

  test('invalid StringID triggers CT-001', () => {
    const c = makeControl({ id: '1ctrl', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-001')).toBe(true)
  })

  test('valid id does not trigger CT-001', () => {
    const c = makeControl({ id: 'myCtrl', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-001')).toBe(false)
  })
})

// ── CT-002: Control @xsi:type ─────────────────────────────────────────────────

describe('CT-002', () => {
  testedRuleIds.add('CT-002')

  test('missing xsiType triggers CT-002', () => {
    const c = makeControl({ id: 'c1', xsiType: '' as ControlType })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-002')).toBe(true)
  })

  test('valid xsiType does not trigger CT-002', () => {
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-002')).toBe(false)
  })
})

// ── CT-003: @parameterRef must reference known parameter ─────────────────────

describe('CT-003', () => {
  testedRuleIds.add('CT-003')

  test('unknown parameterRef triggers CT-003', () => {
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t', parameterRef: 'NoSuchParam' })
    const strat = makeStrategy({ name: 'S', parameters: [], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-003')).toBe(true)
  })

  test('valid parameterRef does not trigger CT-003', () => {
    const p = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', parameterRef: 'P1' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-003')).toBe(false)
  })
})

// ── CT-004: listItem enumID and uiRep required ────────────────────────────────

describe('CT-004', () => {
  testedRuleIds.add('CT-004')

  test('listItem missing enumID triggers CT-004', () => {
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t',
      listItems: [{ enumID: '', uiRep: 'Option' }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-004')).toBe(true)
  })

  test('listItem missing uiRep triggers CT-004', () => {
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: '' }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-004')).toBe(true)
  })

  test('valid listItem does not trigger CT-004', () => {
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'Option A' }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-004')).toBe(false)
  })
})

// ── CT-005: listItem enumID must match parameter enumPair ─────────────────────

describe('CT-005', () => {
  testedRuleIds.add('CT-005')

  test('listItem enumID not in parameter enumPairs triggers CT-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }] })
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', parameterRef: 'P',
      listItems: [{ enumID: 'eX', uiRep: 'Unknown' }] })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-005')).toBe(true)
  })

  test('matching listItem enumID does not trigger CT-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }] })
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', parameterRef: 'P',
      listItems: [{ enumID: 'eA', uiRep: 'Option A' }] })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-005')).toBe(false)
  })
})

// ── CT-006: all parameter enumPairs must have listItem ───────────────────────

describe('CT-006', () => {
  testedRuleIds.add('CT-006')

  test('missing listItem for enumPair triggers CT-006', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }, { enumID: 'eB', wireValue: 'B' }] })
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', parameterRef: 'P',
      listItems: [{ enumID: 'eA', uiRep: 'Option A' }] })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-006')).toBe(true)
  })

  test('all enumPairs covered does not trigger CT-006', () => {
    const p = makeParam({ name: 'P', xsiType: 'Char_t', fixTag: 101,
      enumPairs: [{ enumID: 'eA', wireValue: 'A' }, { enumID: 'eB', wireValue: 'B' }] })
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', parameterRef: 'P',
      listItems: [{ enumID: 'eA', uiRep: 'A' }, { enumID: 'eB', uiRep: 'B' }] })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-006')).toBe(false)
  })
})

// ── CT-007: control/parameter type compatibility ──────────────────────────────

describe('CT-007', () => {
  testedRuleIds.add('CT-007')

  test('CheckBox_t on String_t triggers CT-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-007')).toBe(true)
  })

  test('Clock_t on UTCTimestamp_t does not trigger CT-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'UTCTimestamp_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'Clock_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-007')).toBe(false)
  })

  test('DropDownList_t on Int_t does not trigger CT-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101,
      enumPairs: [{ enumID: 'e1', wireValue: '1' }] })
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', parameterRef: 'P',
      listItems: [{ enumID: 'e1', uiRep: 'One' }] })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-007')).toBe(false)
  })

  test('SingleSpinner_t on Qty_t does not trigger CT-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Qty_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-007')).toBe(false)
  })

  test('TextField_t on any type does not trigger CT-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-007')).toBe(false)
  })
})

// ── CT-008: initValue valid for control type ──────────────────────────────────

describe('CT-008', () => {
  testedRuleIds.add('CT-008')

  test('CheckBox_t initValue="maybe" triggers CT-008', () => {
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', initValue: 'maybe' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-008')).toBe(true)
  })

  test('CheckBox_t initValue="false" does not trigger CT-008', () => {
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', initValue: 'false' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-008')).toBe(false)
  })

  test('Clock_t initValue="09:30:00" does not trigger CT-008', () => {
    const c = makeControl({ id: 'c1', xsiType: 'Clock_t', initValue: '09:30:00' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-008')).toBe(false)
  })

  test('SingleSpinner_t initValue="abc" triggers CT-008', () => {
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', initValue: 'abc' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-008')).toBe(true)
  })

  test('DropDownList_t initValue is not validated (skip)', () => {
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t', initValue: 'e_Uniform/e_Medium/No' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-008')).toBe(false)
  })
})

// ── CT-009: CheckBox_t with enumPairs needs checkedEnumRef/uncheckedEnumRef ───

describe('CT-009', () => {
  testedRuleIds.add('CT-009')

  test('CheckBox_t with enumPairs but no checkedEnumRef triggers CT-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101,
      enumPairs: [{ enumID: 'eTrue', wireValue: 'Y' }, { enumID: 'eFalse', wireValue: 'N' }] })
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-009')).toBe(true)
  })

  test('CheckBox_t with enumPairs and both refs does not trigger CT-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101,
      enumPairs: [{ enumID: 'eTrue', wireValue: 'Y' }, { enumID: 'eFalse', wireValue: 'N' }] })
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', parameterRef: 'P',
      checkedEnumRef: 'eTrue', uncheckedEnumRef: 'eFalse' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-009')).toBe(false)
  })

  test('CheckBox_t with no enumPairs does not trigger CT-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Boolean_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'CheckBox_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-009')).toBe(false)
  })
})

// ── CT-010: Clock_t initValue format ─────────────────────────────────────────

describe('CT-010', () => {
  testedRuleIds.add('CT-010')

  test('Clock_t initValue="bad-time" triggers CT-010', () => {
    const c = makeControl({ id: 'c1', xsiType: 'Clock_t', initValue: 'bad-time' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-010')).toBe(true)
  })

  test('Clock_t initValue="09:30:00" does not trigger CT-010', () => {
    const c = makeControl({ id: 'c1', xsiType: 'Clock_t', initValue: '09:30:00' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-010')).toBe(false)
  })
})

// ── CT-011: spinner increment must be > 0 ─────────────────────────────────────

describe('CT-011', () => {
  testedRuleIds.add('CT-011')

  test('increment=0 triggers CT-011', () => {
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', increment: 0 })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-011')).toBe(true)
  })

  test('increment=-1 triggers CT-011', () => {
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', increment: -1 })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-011')).toBe(true)
  })

  test('increment=0.5 does not trigger CT-011', () => {
    const c = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', increment: 0.5 })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-011')).toBe(false)
  })
})

// ── CT-012: control IDs unique within strategy ────────────────────────────────

describe('CT-012', () => {
  testedRuleIds.add('CT-012')

  test('duplicate control IDs trigger CT-012', () => {
    const c1 = makeControl({ id: 'sameId', xsiType: 'TextField_t' })
    const c2 = makeControl({ id: 'sameId', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c1, c2])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-012')).toBe(true)
  })

  test('unique control IDs do not trigger CT-012', () => {
    const c1 = makeControl({ id: 'ctrl1', xsiType: 'TextField_t' })
    const c2 = makeControl({ id: 'ctrl2', xsiType: 'TextField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c1, c2])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-012')).toBe(false)
  })
})

// ── CT-013: initPolicy=UseFixField requires initFixField ──────────────────────

describe('CT-013', () => {
  testedRuleIds.add('CT-013')

  test('UseFixField without initFixField triggers CT-013', () => {
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t', initPolicy: 'UseFixField' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-013')).toBe(true)
  })

  test('UseFixField with initFixField does not trigger CT-013', () => {
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t',
      initPolicy: 'UseFixField', initFixField: 'Symbol' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-013')).toBe(false)
  })
})

// ── CT-014: Label_t should not have parameterRef ──────────────────────────────

describe('CT-014', () => {
  testedRuleIds.add('CT-014')

  test('Label_t with parameterRef triggers CT-014', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'Label_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-014')).toBe(true)
  })

  test('Label_t without parameterRef does not trigger CT-014', () => {
    const c = makeControl({ id: 'c1', xsiType: 'Label_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-014')).toBe(false)
  })
})

// ── CT-015: HiddenField_t with no parameterRef → info ────────────────────────

describe('CT-015', () => {
  testedRuleIds.add('CT-015')

  test('HiddenField_t with no parameterRef triggers CT-015 info', () => {
    const c = makeControl({ id: 'c1', xsiType: 'HiddenField_t' })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    const findings = checkCT(doc)
    const f = findings.find(f => f.ruleId === 'CT-015')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('HiddenField_t with parameterRef does not trigger CT-015', () => {
    const p = makeParam({ name: 'P', xsiType: 'String_t', fixTag: 101 })
    const c = makeControl({ id: 'c1', xsiType: 'HiddenField_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-015')).toBe(false)
  })
})

// ── CT-016: listItems on non-list controls ────────────────────────────────────

describe('CT-016', () => {
  testedRuleIds.add('CT-016')

  test('listItems on TextField_t triggers CT-016', () => {
    const c = makeControl({ id: 'c1', xsiType: 'TextField_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-016')).toBe(true)
  })

  test('listItems on DropDownList_t does not trigger CT-016', () => {
    const c = makeControl({ id: 'c1', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([c])] } })
    const doc = makeDoc([strat])
    expect(hasPA(checkCT(doc), 'CT-016')).toBe(false)
  })
})

// ── meta-test: every rule ID has at least one test ───────────────────────────

test('meta: every PA/CT rule ID has test coverage', () => {
  const expected = [
    'PA-001', 'PA-002', 'PA-003', 'PA-004', 'PA-005', 'PA-006', 'PA-007',
    'PA-008', 'PA-009', 'PA-010', 'PA-011', 'PA-012', 'PA-013', 'PA-014',
    'PA-015', 'PA-016', 'PA-017', 'PA-018', 'PA-019', 'PA-020', 'PA-021',
    'CT-001', 'CT-002', 'CT-003', 'CT-004', 'CT-005', 'CT-006', 'CT-007',
    'CT-008', 'CT-009', 'CT-010', 'CT-011', 'CT-012', 'CT-013', 'CT-014',
    'CT-015', 'CT-016',
  ]
  for (const id of expected) {
    expect(testedRuleIds.has(id), `${id} has no test coverage`).toBe(true)
  }
})
