import { describe, it, expect, vi } from 'vitest'
import { evaluateStateRules, createEngineState } from './stateRuleEngine'
import type { Control, StateRule, EditNode } from '../model'
import type { ControlValue, TicketStateMap } from '../ticket/ticketTypes'

// ── Test helpers ───────────────────────────────────────────────────────────────

function mkCtrl(id: string, rules: StateRule[]): Control {
  return { kind: 'control', id, xsiType: 'TextField_t', listItems: [], stateRules: rules }
}

function mkState(...entries: [string, ControlValue][]): TicketStateMap {
  return new Map(entries)
}

function cv(raw: ControlValue['raw'], initialized = true): ControlValue {
  return { raw, initialized }
}

function eqNode(field: string, value: string): EditNode {
  return { kind: 'compare', field, op: 'EQ', value }
}


function exNode(field: string): EditNode {
  return { kind: 'compare', field, op: 'EX' }
}

function nxNode(field: string): EditNode {
  return { kind: 'compare', field, op: 'NX' }
}

function andNode(...operands: EditNode[]): EditNode {
  return { kind: 'logic', op: 'AND', operands }
}

function orNode(...operands: EditNode[]): EditNode {
  return { kind: 'logic', op: 'OR', operands }
}

function xorNode(...operands: EditNode[]): EditNode {
  return { kind: 'logic', op: 'XOR', operands }
}

function notNode(operand: EditNode): EditNode {
  return { kind: 'logic', op: 'NOT', operands: [operand] }
}

function mkRule(condition: EditNode, action: Pick<StateRule, 'enabled' | 'visible' | 'value'>): StateRule {
  return { condition, ...action }
}

// ── Convention i: enabled=X ────────────────────────────────────────────────────

describe('Convention i — enabled', () => {
  it('enabled=true when condition true; reverts to false when condition becomes false', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { enabled: true })]),
    ]

    const eng0 = createEngineState()

    // condition true → enabled
    const r1 = evaluateStateRules(controls, mkState(['flag', cv('on')], ['target', cv(null, false)]), eng0)
    expect(r1.effects.get('target')?.enabled).toBe(true)

    // condition false → !true = disabled
    const r2 = evaluateStateRules(controls, mkState(['flag', cv('off')], ['target', cv(null, false)]), r1.nextEngineState)
    expect(r2.effects.get('target')?.enabled).toBe(false)
  })

  it('enabled=false when condition true; reverts to true when condition becomes false', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { enabled: false })]),
    ]

    const eng0 = createEngineState()

    const r1 = evaluateStateRules(controls, mkState(['flag', cv('on')], ['target', cv(null, false)]), eng0)
    expect(r1.effects.get('target')?.enabled).toBe(false)

    const r2 = evaluateStateRules(controls, mkState(['flag', cv('off')], ['target', cv(null, false)]), r1.nextEngineState)
    expect(r2.effects.get('target')?.enabled).toBe(true)
  })

  it('last rule in document order wins on conflict', () => {
    const controls = [
      mkCtrl('target', [
        mkRule(eqNode('flag', 'on'), { enabled: true }),   // first: enabled
        mkRule(eqNode('flag', 'on'), { enabled: false }),  // last: wins → disabled
      ]),
    ]

    const r = evaluateStateRules(controls, mkState(['flag', cv('on')], ['target', cv(null, false)]), createEngineState())
    expect(r.effects.get('target')?.enabled).toBe(false)
  })
})

// ── Convention ii: visible=X ───────────────────────────────────────────────────

describe('Convention ii — visible', () => {
  it('visible=false hides when condition true; shows when condition becomes false', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('mode', 'hidden'), { visible: false })]),
    ]

    const eng0 = createEngineState()

    const r1 = evaluateStateRules(controls, mkState(['mode', cv('hidden')], ['target', cv(null, false)]), eng0)
    expect(r1.effects.get('target')?.visible).toBe(false)

    const r2 = evaluateStateRules(controls, mkState(['mode', cv('shown')], ['target', cv(null, false)]), r1.nextEngineState)
    expect(r2.effects.get('target')?.visible).toBe(true)
  })
})

// ── Convention iii: value=V transition ────────────────────────────────────────

describe('Convention iii — value forced on false→true only', () => {
  it('forces value on first true evaluation', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { value: 'forced' })]),
    ]
    const eng0 = createEngineState()
    const state = mkState(['flag', cv('on')], ['target', cv(null, false)])

    const r1 = evaluateStateRules(controls, state, eng0)
    expect(r1.forcedValues.get('target')).toEqual({ raw: 'forced', initialized: true })
  })

  it('does not re-force on repeated true evaluations (no false→true transition)', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { value: 'forced' })]),
    ]
    const eng0 = createEngineState()

    // First call: false→true, fires
    const stateOn = mkState(['flag', cv('on')], ['target', cv(null, false)])
    const r1 = evaluateStateRules(controls, stateOn, eng0)
    expect(r1.forcedValues.size).toBe(1)

    // Apply forced value so target is now 'forced' in ticketState
    const state2 = new Map(stateOn)
    state2.set('target', { raw: 'forced', initialized: true })

    // Second call: still true, prevResult=true — no transition
    const r2 = evaluateStateRules(controls, state2, r1.nextEngineState)
    expect(r2.forcedValues.size).toBe(0)
  })

  it('fires again if condition goes false then back to true', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { value: 'forced' })]),
    ]
    const eng0 = createEngineState()

    const stateOn = mkState(['flag', cv('on')], ['target', cv(null, false)])
    const r1 = evaluateStateRules(controls, stateOn, eng0)

    const stateOff = mkState(['flag', cv('off')], ['target', cv('forced')])
    const r2 = evaluateStateRules(controls, stateOff, r1.nextEngineState)
    expect(r2.forcedValues.size).toBe(0)

    // Back to on → fires again
    const r3 = evaluateStateRules(controls, stateOn, r2.nextEngineState)
    expect(r3.forcedValues.get('target')).toEqual({ raw: 'forced', initialized: true })
  })
})

// ── Convention iv: value="{NULL}" reverts ─────────────────────────────────────

describe('Convention iv — {NULL} reverts to last non-null', () => {
  it('reverts to lastNonNull when condition fires', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { value: '{NULL}' })]),
    ]
    const eng0 = createEngineState()

    // Call 1: flag=off, target="original" — lastNonNull captures "original"
    const state1 = mkState(['flag', cv('off')], ['target', cv('original')])
    const r1 = evaluateStateRules(controls, state1, eng0)
    expect(r1.forcedValues.size).toBe(0)

    // Target becomes null (e.g. user cleared it), flag turns on
    const state2 = mkState(['flag', cv('on')], ['target', cv(null, false)])
    const r2 = evaluateStateRules(controls, state2, r1.nextEngineState)

    // Should revert to "original"
    expect(r2.forcedValues.get('target')).toEqual({ raw: 'original', initialized: true })
  })

  it('falls back gracefully when no prior non-null value exists (no spurious change)', () => {
    const controls = [
      mkCtrl('target', [mkRule(eqNode('flag', 'on'), { value: '{NULL}' })]),
    ]
    // target is already null; {NULL} fires but reverts to null — no net change
    const state = mkState(['flag', cv('on')], ['target', cv(null, false)])
    const r = evaluateStateRules(controls, state, createEngineState())

    // No change to report since the "revert" value equals the current value
    expect(r.forcedValues.get('target')).toBeUndefined()
  })
})

// ── XOR logic ─────────────────────────────────────────────────────────────────

describe('XOR — exactly one true', () => {
  function xorSetup(aVal: string, bVal: string, cVal: string) {
    const condition = xorNode(
      eqNode('A', 'on'),
      eqNode('B', 'on'),
      eqNode('C', 'on'),
    )
    const controls = [mkCtrl('target', [mkRule(condition, { enabled: true })])]
    const state = mkState(
      ['A', cv(aVal)], ['B', cv(bVal)], ['C', cv(cVal)], ['target', cv(null, false)],
    )
    return evaluateStateRules(controls, state, createEngineState()).effects.get('target')?.enabled
  }

  it('is true when exactly one operand is true', () => {
    expect(xorSetup('on', 'off', 'off')).toBe(true)
    expect(xorSetup('off', 'on', 'off')).toBe(true)
    expect(xorSetup('off', 'off', 'on')).toBe(true)
  })

  it('is false when zero operands are true', () => {
    expect(xorSetup('off', 'off', 'off')).toBe(false)
  })

  it('is false when two or more operands are true', () => {
    expect(xorSetup('on', 'on', 'off')).toBe(false)
    expect(xorSetup('on', 'on', 'on')).toBe(false)
  })
})

// ── Short-circuit OR with NX ───────────────────────────────────────────────────

describe('Short-circuit — OR with uninitialized second operand', () => {
  it('returns true when first operand is true (never evaluates second)', () => {
    const condition = orNode(eqNode('A', 'x'), nxNode('B'))
    const controls = [mkCtrl('target', [mkRule(condition, { enabled: true })])]
    // A matches, B not in state — short-circuits, no error
    const state = mkState(['A', cv('x')], ['target', cv(null, false)])
    const r = evaluateStateRules(controls, state, createEngineState())
    expect(r.effects.get('target')?.enabled).toBe(true)
  })

  it('evaluates second operand when first is false', () => {
    const condition = orNode(eqNode('A', 'x'), nxNode('B'))
    const controls = [mkCtrl('target', [mkRule(condition, { enabled: true })])]

    // A does not match, B uninitialized → NX=true → OR=true
    const stateNoB = mkState(['A', cv('y')], ['target', cv(null, false)])
    const r1 = evaluateStateRules(controls, stateNoB, createEngineState())
    expect(r1.effects.get('target')?.enabled).toBe(true)

    // A does not match, B initialized → NX=false → OR=false
    const stateWithB = mkState(['A', cv('y')], ['B', cv('something')], ['target', cv(null, false)])
    const r2 = evaluateStateRules(controls, stateWithB, createEngineState())
    expect(r2.effects.get('target')?.enabled).toBe(false)
  })
})

// ── AND short-circuit ──────────────────────────────────────────────────────────

describe('AND short-circuit', () => {
  it('returns false when first operand is false (never evaluates second)', () => {
    const condition = andNode(eqNode('A', 'x'), exNode('B'))
    const controls = [mkCtrl('target', [mkRule(condition, { enabled: true })])]
    const state = mkState(['A', cv('y')], ['target', cv(null, false)])
    const r = evaluateStateRules(controls, state, createEngineState())
    expect(r.effects.get('target')?.enabled).toBe(false)
  })
})

// ── NOT ───────────────────────────────────────────────────────────────────────

describe('NOT', () => {
  it('negates its operand', () => {
    const controls = [mkCtrl('target', [mkRule(notNode(eqNode('A', 'x')), { enabled: true })])]

    const stateMatch = mkState(['A', cv('x')], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, stateMatch, createEngineState()).effects.get('target')?.enabled).toBe(false)

    const stateNoMatch = mkState(['A', cv('y')], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, stateNoMatch, createEngineState()).effects.get('target')?.enabled).toBe(true)
  })
})

// ── Numeric comparison ─────────────────────────────────────────────────────────

describe('Numeric comparison', () => {
  it('uses numeric comparison when both sides parse as numbers', () => {
    const controls = [
      mkCtrl('target', [mkRule({ kind: 'compare', field: 'qty', op: 'GT', value: '10' }, { enabled: true })]),
    ]

    const above = mkState(['qty', cv(100)], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, above, createEngineState()).effects.get('target')?.enabled).toBe(true)

    const below = mkState(['qty', cv(5)], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, below, createEngineState()).effects.get('target')?.enabled).toBe(false)
  })

  it('uses string comparison for non-numeric values', () => {
    const controls = [
      mkCtrl('target', [mkRule({ kind: 'compare', field: 'code', op: 'LT', value: 'M' }, { enabled: true })]),
    ]

    const before = mkState(['code', cv('A')], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, before, createEngineState()).effects.get('target')?.enabled).toBe(true)

    const after = mkState(['code', cv('Z')], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, after, createEngineState()).effects.get('target')?.enabled).toBe(false)
  })
})

// ── EX / NX ───────────────────────────────────────────────────────────────────

describe('EX / NX operators', () => {
  it('EX returns true when control is initialized', () => {
    const controls = [mkCtrl('target', [mkRule(exNode('A'), { enabled: true })])]
    const initialized = mkState(['A', cv('val', true)], ['target', cv(null, false)])
    const uninitialized = mkState(['A', cv(null, false)], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, initialized, createEngineState()).effects.get('target')?.enabled).toBe(true)
    expect(evaluateStateRules(controls, uninitialized, createEngineState()).effects.get('target')?.enabled).toBe(false)
  })

  it('NX returns true when control is not initialized or absent', () => {
    const controls = [mkCtrl('target', [mkRule(nxNode('A'), { enabled: true })])]
    const absent = mkState(['target', cv(null, false)])
    const uninitialized = mkState(['A', cv(null, false)], ['target', cv(null, false)])
    const initialized = mkState(['A', cv('val', true)], ['target', cv(null, false)])
    expect(evaluateStateRules(controls, absent, createEngineState()).effects.get('target')?.enabled).toBe(true)
    expect(evaluateStateRules(controls, uninitialized, createEngineState()).effects.get('target')?.enabled).toBe(true)
    expect(evaluateStateRules(controls, initialized, createEngineState()).effects.get('target')?.enabled).toBe(false)
  })
})

// ── Fixpoint convergence ───────────────────────────────────────────────────────

describe('Fixpoint convergence', () => {
  it('cascading value assignments converge within a few passes', () => {
    // When A="on", force B="v1"; when B="v1", force C="v2"
    const ctrlB = mkCtrl('B', [mkRule(eqNode('A', 'on'), { value: 'v1' })])
    const ctrlC = mkCtrl('C', [mkRule(eqNode('B', 'v1'), { value: 'v2' })])

    const state = mkState(
      ['A', cv('on')],
      ['B', cv(null, false)],
      ['C', cv(null, false)],
    )
    const r = evaluateStateRules([ctrlB, ctrlC], state, createEngineState())

    // Both cascaded forced values should be present
    expect(r.forcedValues.get('B')).toEqual({ raw: 'v1', initialized: true })
    expect(r.forcedValues.get('C')).toEqual({ raw: 'v2', initialized: true })
  })
})

// ── 10-iteration cap ───────────────────────────────────────────────────────────

describe('10-iteration cap', () => {
  it('non-convergent cycle does not throw and emits a dev warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    // Two rules on A that force it to alternate: "1"→"2" and "2"→"1"
    const controls = [
      mkCtrl('A', [
        mkRule(eqNode('A', '1'), { value: '2' }),
        mkRule(eqNode('A', '2'), { value: '1' }),
      ]),
    ]

    const state = mkState(['A', cv('1')])
    expect(() => evaluateStateRules(controls, state, createEngineState())).not.toThrow()
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('fixpoint'))

    warnSpy.mockRestore()
  })

  it('returns valid effects even without convergence', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const controls = [
      mkCtrl('A', [
        mkRule(eqNode('A', '1'), { value: '2' }),
        mkRule(eqNode('A', '2'), { value: '1' }),
      ]),
    ]

    const r = evaluateStateRules(controls, mkState(['A', cv('1')]), createEngineState())
    expect(r.effects.has('A')).toBe(true)
    expect(typeof r.effects.get('A')?.enabled).toBe('boolean')

    warnSpy.mockRestore()
  })
})

// ── Controls with no StateRules ────────────────────────────────────────────────

describe('Controls with no StateRules', () => {
  it('defaults to enabled=true, visible=true, forcedValue=null', () => {
    const controls = [mkCtrl('A', [])]
    const r = evaluateStateRules(controls, mkState(['A', cv('x')]), createEngineState())
    expect(r.effects.get('A')).toEqual({ enabled: true, visible: true, forcedValue: null })
    expect(r.forcedValues.size).toBe(0)
  })
})
