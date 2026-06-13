import sampleXml from '../data/SampleStrategiesFor-v1_1.xml?raw'
import { parseAtdlDocument } from '../parse'
import type {
  AtdlDocument, Strategy, Parameter, ParameterType, Control, ControlType,
  StrategyPanel, EditNode, EditDef, StateRule, StrategyEdit, Finding,
} from '../model'
import { checkLY } from './rules/ly'
import { checkED } from './rules/ed'
import { checkRG } from './rules/rg'
import { validateDocument } from './engine'

// ── Tracked rule IDs for meta-test ────────────────────────────────────────────

const testedRuleIds = new Set<string>()

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeParam(overrides: Partial<Parameter> & { name: string; xsiType: ParameterType }): Parameter {
  return {
    use: 'optional', mutableOnCxlRpl: true, revertOnCxlRpl: false,
    definedByFIX: false, enumPairs: [], fixTag: 100, ...overrides,
  }
}

function makeControl(overrides: Partial<Control> & { id: string; xsiType: ControlType }): Control {
  return { kind: 'control', listItems: [], stateRules: [], ...overrides }
}

function makePanel(children: Array<StrategyPanel | Control>, o: 'VERTICAL' | 'HORIZONTAL' = 'VERTICAL'): StrategyPanel {
  return { kind: 'panel', collapsed: false, collapsible: false, orientation: o, children }
}

function makeStateRule(condition: EditNode, overrides: Partial<StateRule> = {}): StateRule {
  return { enabled: true, condition, ...overrides }
}

function makeStratEdit(condition: EditNode, errorMsg = 'error'): StrategyEdit {
  return { errorMsg, condition }
}

function makeStrategy(overrides: Partial<Strategy> & { name: string }): Strategy {
  return {
    wireValue: overrides.name, version: '1', parameters: [],
    strategyEdits: [], localEdits: [], ...overrides,
  }
}

function makeDoc(strategies: Strategy[], tag957Support = true): AtdlDocument {
  return {
    version: '1.1', namespaces: {}, strategies, tag957Support,
    globalEdits: [], findings: [],
    sourceLineIndex: { getLine: () => undefined }, sourceXml: '',
  }
}

function has(findings: Finding[], id: string): boolean {
  return findings.some(f => f.ruleId === id)
}

// Shorthand for compare nodes
function eq(field: string, value?: string, field2?: string): EditNode {
  return { kind: 'compare', field, op: 'EQ', value, field2 }
}
function ex(field: string): EditNode {
  return { kind: 'compare', field, op: 'EX' }
}
function logic(op: 'AND' | 'OR' | 'XOR' | 'NOT', ...operands: EditNode[]): EditNode {
  return { kind: 'logic', op, operands }
}
function ref(id: string): EditNode {
  return { kind: 'ref', id }
}

// ── golden: bundled sample LY/ED/RG findings ─────────────────────────────────

describe('bundled sample — LY/ED/RG findings', () => {
  const PREFIXES = ['LY-', 'ED-', 'RG-']
  let all: Finding[]
  let lyEdRg: Finding[]
  beforeAll(() => {
    all = validateDocument(parseAtdlDocument(sampleXml))
    lyEdRg = all.filter(f => PREFIXES.some(p => f.ruleId.startsWith(p)))
  })

  test('zero LY/ED/RG errors', () => {
    expect(lyEdRg.filter(f => f.severity === 'error')).toHaveLength(0)
  })

  test('exactly one LY-005 warning (Tazer1 Text parameter has no bound control)', () => {
    const lys = lyEdRg.filter(f => f.ruleId === 'LY-005')
    expect(lys).toHaveLength(1)
    expect(lys[0].message).toMatch(/Text/)
  })

  test('no other LY/ED/RG warnings beyond LY-005', () => {
    const other = lyEdRg.filter(f => f.severity === 'warning' && f.ruleId !== 'LY-005')
    expect(other).toHaveLength(0)
  })

  test('no LY/ED/RG info findings', () => {
    expect(lyEdRg.filter(f => f.severity === 'info')).toHaveLength(0)
  })
})

// ── LY-001: StrategyLayout must have panels ───────────────────────────────────

describe('LY-001', () => {
  testedRuleIds.add('LY-001')

  test('empty panels triggers LY-001', () => {
    const strat = makeStrategy({ name: 'S', layout: { panels: [] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-001')).toBe(true)
  })

  test('non-empty panels does not trigger LY-001', () => {
    const strat = makeStrategy({
      name: 'S',
      layout: { panels: [makePanel([makeControl({ id: 'c1', xsiType: 'TextField_t' })])] },
    })
    expect(has(checkLY(makeDoc([strat])), 'LY-001')).toBe(false)
  })

  test('no layout at all does not trigger LY-001', () => {
    const strat = makeStrategy({ name: 'S' })
    expect(has(checkLY(makeDoc([strat])), 'LY-001')).toBe(false)
  })
})

// ── LY-002: no mixed children ─────────────────────────────────────────────────

describe('LY-002', () => {
  testedRuleIds.add('LY-002')

  test('mixed Control and StrategyPanel children triggers LY-002', () => {
    const panel = makePanel([
      makeControl({ id: 'c1', xsiType: 'TextField_t' }),
      makePanel([]),
    ])
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-002')).toBe(true)
  })

  test('only Controls does not trigger LY-002', () => {
    const panel = makePanel([
      makeControl({ id: 'c1', xsiType: 'TextField_t' }),
      makeControl({ id: 'c2', xsiType: 'TextField_t' }),
    ])
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-002')).toBe(false)
  })

  test('only StrategyPanels does not trigger LY-002', () => {
    const inner = makePanel([makeControl({ id: 'c1', xsiType: 'TextField_t' })])
    const outer = makePanel([inner])
    const strat = makeStrategy({ name: 'S', layout: { panels: [outer] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-002')).toBe(false)
  })
})

// ── LY-003: orientation required ──────────────────────────────────────────────

describe('LY-003', () => {
  testedRuleIds.add('LY-003')

  test('missing orientation triggers LY-003', () => {
    const panel: StrategyPanel = {
      kind: 'panel', collapsed: false, collapsible: false, children: [],
    }
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-003')).toBe(true)
  })

  test('orientation present does not trigger LY-003', () => {
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([])] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-003')).toBe(false)
  })
})

// ── LY-004: collapsible absent → info ─────────────────────────────────────────

describe('LY-004', () => {
  testedRuleIds.add('LY-004')

  test('collapsible absent triggers LY-004 info', () => {
    const panel: StrategyPanel = {
      kind: 'panel', collapsed: false, orientation: 'VERTICAL',
      collapsible: null as unknown as boolean, children: [],
    }
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    const findings = checkLY(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'LY-004')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('collapsible=false does not trigger LY-004', () => {
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([])] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-004')).toBe(false)
  })
})

// ── LY-005: parameter with no bound control → warning ────────────────────────

describe('LY-005', () => {
  testedRuleIds.add('LY-005')

  test('non-const param without bound control triggers LY-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const ctrl = makeControl({ id: 'c1', xsiType: 'TextField_t' })  // no parameterRef
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([ctrl])] } })
    const findings = checkLY(makeDoc([strat]))
    expect(has(findings, 'LY-005')).toBe(true)
    expect(findings.find(f => f.ruleId === 'LY-005')?.severity).toBe('warning')
  })

  test('const param without bound control does not trigger LY-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', constValue: '42' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([])] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-005')).toBe(false)
  })

  test('param with bound control does not trigger LY-005', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const ctrl = makeControl({ id: 'c1', xsiType: 'SingleSpinner_t', parameterRef: 'P' })
    const strat = makeStrategy({ name: 'S', parameters: [p], layout: { panels: [makePanel([ctrl])] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-005')).toBe(false)
  })
})

// ── LY-006: color present → info ─────────────────────────────────────────────

describe('LY-006', () => {
  testedRuleIds.add('LY-006')

  test('panel with color triggers LY-006 info', () => {
    const panel: StrategyPanel = {
      kind: 'panel', collapsed: false, collapsible: false,
      orientation: 'VERTICAL', color: '#ff0000', children: [],
    }
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    const findings = checkLY(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'LY-006')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('panel without color does not trigger LY-006', () => {
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([])] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-006')).toBe(false)
  })
})

// ── LY-090: grid attribute on 1.2 document → info ────────────────────────────

describe('LY-090', () => {
  testedRuleIds.add('LY-090')

  test('panel with grid in 1.2 doc triggers LY-090 info', () => {
    const panel: StrategyPanel = {
      kind: 'panel', collapsed: false, collapsible: false,
      orientation: 'VERTICAL', grid: { row: 0, col: 0 }, children: [],
    }
    const doc: AtdlDocument = {
      version: '1.2', namespaces: {}, strategies: [makeStrategy({ name: 'S', layout: { panels: [panel] } })],
      tag957Support: false, globalEdits: [], findings: [],
      sourceLineIndex: { getLine: () => undefined }, sourceXml: '',
    }
    const findings = checkLY(doc)
    const f = findings.find(f => f.ruleId === 'LY-090')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('panel with grid in 1.1 doc does not trigger LY-090', () => {
    const panel: StrategyPanel = {
      kind: 'panel', collapsed: false, collapsible: false,
      orientation: 'VERTICAL', grid: { row: 0, col: 0 }, children: [],
    }
    const strat = makeStrategy({ name: 'S', layout: { panels: [panel] } })
    expect(has(checkLY(makeDoc([strat])), 'LY-090')).toBe(false)
  })
})

// ── ED-001: Edit must have op ─────────────────────────────────────────────────

describe('ED-001', () => {
  testedRuleIds.add('ED-001')

  test('compare node with empty op triggers ED-001', () => {
    const cond: EditNode = { kind: 'compare', field: 'P1', op: '' as 'EQ', value: 'x' }
    const se = makeStratEdit(cond)
    const p = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-001')).toBe(true)
  })

  test('logic node with empty op triggers ED-001', () => {
    const cond: EditNode = { kind: 'logic', op: '' as 'AND', operands: [ex('P1')] }
    const se = makeStratEdit(cond)
    const p = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-001')).toBe(true)
  })

  test('well-formed node does not trigger ED-001', () => {
    const p = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P1'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-001')).toBe(false)
  })
})

// ── ED-002: field2 and value mutually exclusive ───────────────────────────────

describe('ED-002', () => {
  testedRuleIds.add('ED-002')

  test('both field2 and value set triggers ED-002', () => {
    const cond: EditNode = { kind: 'compare', field: 'P1', op: 'EQ', value: 'x', field2: 'P2' }
    const p1 = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const p2 = makeParam({ name: 'P2', xsiType: 'Int_t', fixTag: 102 })
    const strat = makeStrategy({ name: 'S', parameters: [p1, p2], strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-002')).toBe(true)
  })

  test('only field2 does not trigger ED-002', () => {
    const cond: EditNode = { kind: 'compare', field: 'P1', op: 'GT', field2: 'P2' }
    const p1 = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const p2 = makeParam({ name: 'P2', xsiType: 'Int_t', fixTag: 102 })
    const strat = makeStrategy({ name: 'S', parameters: [p1, p2], strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-002')).toBe(false)
  })
})

// ── ED-003: compare node must have field ──────────────────────────────────────

describe('ED-003', () => {
  testedRuleIds.add('ED-003')

  test('compare with empty field triggers ED-003', () => {
    const cond: EditNode = { kind: 'compare', field: '', op: 'EQ', value: 'x' }
    const strat = makeStrategy({ name: 'S', strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-003')).toBe(true)
  })

  test('compare with field set does not trigger ED-003', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-003')).toBe(false)
  })
})

// ── ED-004: EQ/NE/etc without value or field2 ────────────────────────────────

describe('ED-004', () => {
  testedRuleIds.add('ED-004')

  test('EQ without value or field2 triggers ED-004', () => {
    const cond: EditNode = { kind: 'compare', field: 'P', op: 'EQ' }
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-004')).toBe(true)
  })

  test('EX without value or field2 does not trigger ED-004', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-004')).toBe(false)
  })

  test('EQ with value does not trigger ED-004', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(eq('P', '1'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-004')).toBe(false)
  })
})

// ── ED-005: StateRule field must reference Control ID ────────────────────────

describe('ED-005', () => {
  testedRuleIds.add('ED-005')

  test('StateRule field referencing unknown control triggers ED-005', () => {
    const ctrl = makeControl({ id: 'realCtrl', xsiType: 'TextField_t',
      stateRules: [makeStateRule(eq('noSuchCtrl', 'v'))] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([ctrl])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-005')).toBe(true)
  })

  test('StateRule field referencing known control does not trigger ED-005', () => {
    const ctrl1 = makeControl({ id: 'picker', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const ctrl2 = makeControl({ id: 'target', xsiType: 'TextField_t',
      stateRules: [makeStateRule(eq('picker', 'eA'))] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([ctrl1, ctrl2])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-005')).toBe(false)
  })
})

// ── ED-006: StrategyEdit field must reference Parameter or FIX_* ──────────────

describe('ED-006', () => {
  testedRuleIds.add('ED-006')

  test('unknown field in StrategyEdit triggers ED-006 error', () => {
    const se = makeStratEdit(eq('NoSuchParam', '1'))
    const strat = makeStrategy({ name: 'S', strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-006')).toBe(true)
  })

  test('unknown FIX_* field in StrategyEdit triggers ED-006 warning (not error)', () => {
    const se = makeStratEdit(eq('FIX_NotRealField', '1'))
    const strat = makeStrategy({ name: 'S', strategyEdits: [se] })
    const findings = checkED(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'ED-006')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('warning')
  })

  test('known parameter name in StrategyEdit does not trigger ED-006', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-006')).toBe(false)
  })

  test('known FIX_* field (FIX_Symbol) does not trigger ED-006', () => {
    const se = makeStratEdit(ex('FIX_Symbol'))
    const strat = makeStrategy({ name: 'S', strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-006')).toBe(false)
  })
})

// ── ED-007: logic node must have at least one operand ────────────────────────

describe('ED-007', () => {
  testedRuleIds.add('ED-007')

  test('logic node with empty operands triggers ED-007', () => {
    const cond: EditNode = { kind: 'logic', op: 'AND', operands: [] }
    const strat = makeStrategy({ name: 'S', strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-007')).toBe(true)
  })

  test('logic node with operands does not trigger ED-007', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(logic('AND', ex('P')))] })
    expect(has(checkED(makeDoc([strat])), 'ED-007')).toBe(false)
  })
})

// ── ED-008: EditRef must resolve ──────────────────────────────────────────────

describe('ED-008', () => {
  testedRuleIds.add('ED-008')

  test('unresolved EditRef triggers ED-008', () => {
    const se = makeStratEdit(ref('noSuchDef'))
    const strat = makeStrategy({ name: 'S', strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-008')).toBe(true)
  })

  test('resolved EditRef does not trigger ED-008', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const editDef: EditDef = { id: 'myEdit', node: ex('P') }
    const se = makeStratEdit(ref('myEdit'))
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [se], localEdits: [editDef] })
    expect(has(checkED(makeDoc([strat])), 'ED-008')).toBe(false)
  })
})

// ── ED-009: EditDef at strategy level must have id ────────────────────────────

describe('ED-009', () => {
  testedRuleIds.add('ED-009')

  test('localEdit with empty id triggers ED-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const editDef: EditDef = { id: '', node: ex('P') }
    const strat = makeStrategy({ name: 'S', parameters: [p], localEdits: [editDef] })
    expect(has(checkED(makeDoc([strat])), 'ED-009')).toBe(true)
  })

  test('localEdit with id does not trigger ED-009', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const editDef: EditDef = { id: 'e1', node: ex('P') }
    const strat = makeStrategy({ name: 'S', parameters: [p], localEdits: [editDef] })
    expect(has(checkED(makeDoc([strat])), 'ED-009')).toBe(false)
  })
})

// ── ED-010: value type compatibility in StrategyEdit ─────────────────────────

describe('ED-010', () => {
  testedRuleIds.add('ED-010')

  test('non-numeric value on Int_t parameter triggers ED-010 warning', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const se = makeStratEdit(eq('P', 'not-a-number'))
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [se] })
    const findings = checkED(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'ED-010')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('warning')
  })

  test('valid numeric value on Int_t parameter does not trigger ED-010', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(eq('P', '42'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-010')).toBe(false)
  })
})

// ── ED-011: StateRule value must be listItem enumID for list controls ─────────

describe('ED-011', () => {
  testedRuleIds.add('ED-011')

  test('unknown enumID in StateRule compare triggers ED-011', () => {
    const picker = makeControl({ id: 'picker', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const target = makeControl({ id: 'target', xsiType: 'TextField_t',
      stateRules: [makeStateRule(eq('picker', 'eUnknown'))] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([picker, target])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-011')).toBe(true)
  })

  test('known enumID does not trigger ED-011', () => {
    const picker = makeControl({ id: 'picker', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const target = makeControl({ id: 'target', xsiType: 'TextField_t',
      stateRules: [makeStateRule(eq('picker', 'eA'))] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([picker, target])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-011')).toBe(false)
  })
})

// ── ED-012: StrategyEdit missing errorMsg ─────────────────────────────────────

describe('ED-012', () => {
  testedRuleIds.add('ED-012')

  test('empty errorMsg triggers ED-012', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const se: StrategyEdit = { errorMsg: '', condition: ex('P') }
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-012')).toBe(true)
  })

  test('errorMsg present does not trigger ED-012', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-012')).toBe(false)
  })
})

// ── ED-013: StrategyEdit/StateRule must have condition ───────────────────────

describe('ED-013', () => {
  testedRuleIds.add('ED-013')

  test('null StrategyEdit condition triggers ED-013', () => {
    const se: StrategyEdit = { errorMsg: 'err', condition: null as unknown as EditNode }
    const strat = makeStrategy({ name: 'S', strategyEdits: [se] })
    expect(has(checkED(makeDoc([strat])), 'ED-013')).toBe(true)
  })

  test('null StateRule condition triggers ED-013', () => {
    const ctrl = makeControl({ id: 'c1', xsiType: 'TextField_t',
      stateRules: [{ enabled: true, condition: null as unknown as EditNode }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([ctrl])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-013')).toBe(true)
  })

  test('valid StrategyEdit condition does not trigger ED-013', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(ex('P'))] })
    expect(has(checkED(makeDoc([strat])), 'ED-013')).toBe(false)
  })
})

// ── ED-014: NOT with multiple operands → warning ──────────────────────────────

describe('ED-014', () => {
  testedRuleIds.add('ED-014')

  test('NOT with 2 operands triggers ED-014 warning', () => {
    const p1 = makeParam({ name: 'P1', xsiType: 'Int_t', fixTag: 101 })
    const p2 = makeParam({ name: 'P2', xsiType: 'Int_t', fixTag: 102 })
    const cond = logic('NOT', ex('P1'), ex('P2'))
    const strat = makeStrategy({ name: 'S', parameters: [p1, p2], strategyEdits: [makeStratEdit(cond)] })
    const findings = checkED(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'ED-014')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('warning')
  })

  test('NOT with 1 operand does not trigger ED-014', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const cond = logic('NOT', ex('P'))
    const strat = makeStrategy({ name: 'S', parameters: [p], strategyEdits: [makeStratEdit(cond)] })
    expect(has(checkED(makeDoc([strat])), 'ED-014')).toBe(false)
  })
})

// ── ED-015: StateRule with no action ─────────────────────────────────────────

describe('ED-015', () => {
  testedRuleIds.add('ED-015')

  test('StateRule with no action triggers ED-015 warning', () => {
    const picker = makeControl({ id: 'picker', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const ctrl = makeControl({ id: 'target', xsiType: 'TextField_t',
      stateRules: [{ condition: eq('picker', 'eA') }] })   // no enabled/visible/value
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([picker, ctrl])] } })
    const findings = checkED(makeDoc([strat]))
    expect(has(findings, 'ED-015')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ED-015')?.severity).toBe('warning')
  })

  test('StateRule with enabled=false does not trigger ED-015', () => {
    const picker = makeControl({ id: 'picker', xsiType: 'DropDownList_t',
      listItems: [{ enumID: 'eA', uiRep: 'A' }] })
    const ctrl = makeControl({ id: 'target', xsiType: 'TextField_t',
      stateRules: [{ enabled: false, condition: eq('picker', 'eA') }] })
    const strat = makeStrategy({ name: 'S', layout: { panels: [makePanel([picker, ctrl])] } })
    expect(has(checkED(makeDoc([strat])), 'ED-015')).toBe(false)
  })
})

// ── ED-016: circular EditRef chain ────────────────────────────────────────────

describe('ED-016', () => {
  testedRuleIds.add('ED-016')

  test('direct self-reference triggers ED-016', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const editDef: EditDef = { id: 'e1', node: ref('e1') }
    const strat = makeStrategy({ name: 'S', parameters: [p], localEdits: [editDef] })
    expect(has(checkED(makeDoc([strat])), 'ED-016')).toBe(true)
  })

  test('A→B→A cycle triggers ED-016', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const e1: EditDef = { id: 'e1', node: ref('e2') }
    const e2: EditDef = { id: 'e2', node: ref('e1') }
    const strat = makeStrategy({ name: 'S', parameters: [p], localEdits: [e1, e2] })
    expect(has(checkED(makeDoc([strat])), 'ED-016')).toBe(true)
  })

  test('non-circular refs do not trigger ED-016', () => {
    const p = makeParam({ name: 'P', xsiType: 'Int_t', fixTag: 101 })
    const e1: EditDef = { id: 'e1', node: ex('P') }
    const e2: EditDef = { id: 'e2', node: ref('e1') }
    const strat = makeStrategy({ name: 'S', parameters: [p], localEdits: [e1, e2] })
    expect(has(checkED(makeDoc([strat])), 'ED-016')).toBe(false)
  })
})

// ── RG-001: minSize required; maxSize ≥ minSize ───────────────────────────────

describe('RG-001', () => {
  testedRuleIds.add('RG-001')

  test('negative minSize triggers RG-001', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: -1, fixTag: 555, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-001')).toBe(true)
  })

  test('maxSize < minSize triggers RG-001', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: 3, maxSize: 1, fixTag: 555, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-001')).toBe(true)
  })

  test('valid minSize/maxSize does not trigger RG-001', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: 1, maxSize: 5, fixTag: 555, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-001')).toBe(false)
  })
})

// ── RG-002: fixTag must be 555 or 68 ─────────────────────────────────────────

describe('RG-002', () => {
  testedRuleIds.add('RG-002')

  test('invalid fixTag triggers RG-002', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: 1, fixTag: 999, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-002')).toBe(true)
  })

  test('fixTag=555 does not trigger RG-002', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: 1, fixTag: 555, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-002')).toBe(false)
  })

  test('fixTag=68 does not trigger RG-002', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'AB',
      repeatingGroup: { minSize: 1, fixTag: 68, parameters: [] } })
    expect(has(checkRG(makeDoc([strat])), 'RG-002')).toBe(false)
  })
})

// ── RG-003: info notice when repeating group present ─────────────────────────

describe('RG-003', () => {
  testedRuleIds.add('RG-003')

  test('RepeatingGroup presence triggers RG-003 info', () => {
    const strat = makeStrategy({ name: 'S', fixMsgType: 'E',
      repeatingGroup: { minSize: 1, fixTag: 555, parameters: [] } })
    const findings = checkRG(makeDoc([strat]))
    const f = findings.find(f => f.ruleId === 'RG-003')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('no RepeatingGroup does not trigger RG-003', () => {
    const strat = makeStrategy({ name: 'S' })
    expect(has(checkRG(makeDoc([strat])), 'RG-003')).toBe(false)
  })
})

// ── meta-test: every rule ID has at least one test ───────────────────────────

test('meta: every LY/ED/RG rule ID has test coverage', () => {
  const expected = [
    'LY-001', 'LY-002', 'LY-003', 'LY-004', 'LY-005', 'LY-006', 'LY-090',
    'ED-001', 'ED-002', 'ED-003', 'ED-004', 'ED-005', 'ED-006', 'ED-007',
    'ED-008', 'ED-009', 'ED-010', 'ED-011', 'ED-012', 'ED-013', 'ED-014',
    'ED-015', 'ED-016',
    'RG-001', 'RG-002', 'RG-003',
  ]
  for (const id of expected) {
    expect(testedRuleIds.has(id), `${id} has no test coverage`).toBe(true)
  }
})
