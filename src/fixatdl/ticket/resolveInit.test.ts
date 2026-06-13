import { describe, test, expect } from 'vitest'
import type { Control, Parameter } from '../model'
import {
  resolveInitialValue,
  checkBoxWireValue,
  applyRadioSelect,
  initTicketState,
  collectAllControls,
} from './resolveInit'
import type { TicketStateMap } from './ticketTypes'

// ── Helpers ────────────────────────────────────────────────────────────────────

function ctrl(overrides: Partial<Control> = {}): Control {
  return {
    kind: 'control',
    id: 'ctrl1',
    xsiType: 'TextField_t',
    listItems: [],
    stateRules: [],
    ...overrides,
  }
}

function param(overrides: Partial<Parameter> = {}): Parameter {
  return {
    name: 'Param1',
    xsiType: 'String_t',
    use: 'optional',
    mutableOnCxlRpl: true,
    revertOnCxlRpl: false,
    definedByFIX: false,
    enumPairs: [],
    ...overrides,
  }
}

// ── resolveInitialValue ────────────────────────────────────────────────────────

describe('resolveInitialValue', () => {
  test('no initValue returns uninitialized null', () => {
    expect(resolveInitialValue(ctrl(), null)).toEqual({ raw: null, initialized: false })
  })

  test('initValue returns initialized raw string', () => {
    expect(resolveInitialValue(ctrl({ initValue: 'hello' }), null)).toEqual({ raw: 'hello', initialized: true })
  })

  test('UseFixField reads available field', () => {
    const c = ctrl({ initPolicy: 'UseFixField', initFixField: 'ClOrdID' })
    expect(resolveInitialValue(c, () => 'ABC123')).toEqual({ raw: 'ABC123', initialized: true })
  })

  test('UseFixField falls back to initValue when field unavailable', () => {
    const c = ctrl({ initPolicy: 'UseFixField', initFixField: 'ClOrdID', initValue: 'fallback' })
    expect(resolveInitialValue(c, () => undefined)).toEqual({ raw: 'fallback', initialized: true })
  })

  test('UseFixField returns uninitialized when field unavailable and no initValue', () => {
    const c = ctrl({ initPolicy: 'UseFixField', initFixField: 'ClOrdID' })
    expect(resolveInitialValue(c, () => undefined)).toEqual({ raw: null, initialized: false })
  })

  test('UseFixField with null getter falls back to initValue', () => {
    const c = ctrl({ initPolicy: 'UseFixField', initFixField: 'ClOrdID', initValue: 'static' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 'static', initialized: true })
  })

  test('CheckBox_t "false" coerces to boolean false', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', initValue: 'false' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: false, initialized: true })
  })

  test('CheckBox_t "true" coerces to boolean true', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', initValue: 'true' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: true, initialized: true })
  })

  test('CheckBox_t "Y" coerces to boolean true', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', initValue: 'Y' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: true, initialized: true })
  })

  test('CheckBox_t "N" coerces to boolean false', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', initValue: 'N' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: false, initialized: true })
  })

  test('CheckBox_t "1" coerces to boolean true', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', initValue: '1' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: true, initialized: true })
  })

  test('SingleSpinner_t "42" coerces to number 42', () => {
    const c = ctrl({ xsiType: 'SingleSpinner_t', initValue: '42' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 42, initialized: true })
  })

  test('SingleSpinner_t "3.14" coerces to number', () => {
    const c = ctrl({ xsiType: 'SingleSpinner_t', initValue: '3.14' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 3.14, initialized: true })
  })

  test('SingleSpinner_t non-numeric falls back to 0', () => {
    const c = ctrl({ xsiType: 'SingleSpinner_t', initValue: 'abc' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 0, initialized: true })
  })

  test('Slider_t "10" coerces to number 10', () => {
    const c = ctrl({ xsiType: 'Slider_t', initValue: '10' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 10, initialized: true })
  })

  test('DropDownList_t initValue stays as string', () => {
    const c = ctrl({ xsiType: 'DropDownList_t', initValue: 'e_Fast' })
    expect(resolveInitialValue(c, null)).toEqual({ raw: 'e_Fast', initialized: true })
  })
})

// ── checkBoxWireValue ──────────────────────────────────────────────────────────

describe('checkBoxWireValue', () => {
  const p = param({
    enumPairs: [
      { enumID: 'e_Checked', wireValue: '1' },
      { enumID: 'e_Unchecked', wireValue: '0' },
    ],
  })

  test('raw=true maps to checkedEnumRef wireValue', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', checkedEnumRef: 'e_Checked' })
    expect(checkBoxWireValue(true, c, p)).toBe('1')
  })

  test('raw=false maps to uncheckedEnumRef wireValue', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', uncheckedEnumRef: 'e_Unchecked' })
    expect(checkBoxWireValue(false, c, p)).toBe('0')
  })

  test('raw=true with no matching enumPair defaults to Y', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', checkedEnumRef: 'e_Missing' })
    expect(checkBoxWireValue(true, c, p)).toBe('Y')
  })

  test('raw=false with no matching enumPair defaults to N', () => {
    const c = ctrl({ xsiType: 'CheckBox_t', uncheckedEnumRef: 'e_Missing' })
    expect(checkBoxWireValue(false, c, p)).toBe('N')
  })

  test('raw=true with no param defaults to Y', () => {
    const c = ctrl({ xsiType: 'CheckBox_t' })
    expect(checkBoxWireValue(true, c, undefined)).toBe('Y')
  })

  test('raw=false with no param defaults to N', () => {
    const c = ctrl({ xsiType: 'CheckBox_t' })
    expect(checkBoxWireValue(false, c, undefined)).toBe('N')
  })
})

// ── applyRadioSelect ───────────────────────────────────────────────────────────

describe('applyRadioSelect', () => {
  const controls: Control[] = [
    ctrl({ id: 'r1', xsiType: 'RadioButton_t', radioGroup: 'groupA' }),
    ctrl({ id: 'r2', xsiType: 'RadioButton_t', radioGroup: 'groupA' }),
    ctrl({ id: 'r3', xsiType: 'RadioButton_t', radioGroup: 'groupA' }),
    ctrl({ id: 'r4', xsiType: 'RadioButton_t', radioGroup: 'groupB' }),
  ]

  const initial: TicketStateMap = new Map([
    ['r1', { raw: true, initialized: true }],
    ['r2', { raw: false, initialized: true }],
    ['r3', { raw: false, initialized: true }],
    ['r4', { raw: true, initialized: true }],
  ])

  test('selects the target radio and clears others in same group', () => {
    const next = applyRadioSelect(initial, controls, 'groupA', 'r2')
    expect(next.get('r1')).toEqual({ raw: false, initialized: true })
    expect(next.get('r2')).toEqual({ raw: true, initialized: true })
    expect(next.get('r3')).toEqual({ raw: false, initialized: true })
  })

  test('does not affect controls in other groups', () => {
    const next = applyRadioSelect(initial, controls, 'groupA', 'r2')
    expect(next.get('r4')).toEqual({ raw: true, initialized: true })
  })

  test('returns a new Map (does not mutate)', () => {
    const next = applyRadioSelect(initial, controls, 'groupA', 'r3')
    expect(next).not.toBe(initial)
    expect(initial.get('r1')).toEqual({ raw: true, initialized: true })
  })

  test('can select r1 after another was selected', () => {
    const next = applyRadioSelect(initial, controls, 'groupA', 'r1')
    expect(next.get('r1')).toEqual({ raw: true, initialized: true })
    expect(next.get('r2')).toEqual({ raw: false, initialized: true })
    expect(next.get('r3')).toEqual({ raw: false, initialized: true })
  })
})

// ── collectAllControls + initTicketState ───────────────────────────────────────

describe('collectAllControls', () => {
  test('collects controls from nested panels', () => {
    const panels = [
      {
        kind: 'panel' as const,
        collapsed: false,
        collapsible: false,
        children: [
          ctrl({ id: 'c1' }),
          {
            kind: 'panel' as const,
            collapsed: false,
            collapsible: false,
            children: [ctrl({ id: 'c2' }), ctrl({ id: 'c3' })],
          },
        ],
      },
    ]
    const result = collectAllControls(panels)
    expect(result.map(c => c.id)).toEqual(['c1', 'c2', 'c3'])
  })
})

describe('initTicketState', () => {
  test('initializes all controls from flat panel', () => {
    const panels = [
      {
        kind: 'panel' as const,
        collapsed: false,
        collapsible: false,
        children: [
          ctrl({ id: 'c1', initValue: 'hello' }),
          ctrl({ id: 'c2', xsiType: 'CheckBox_t', initValue: 'true' }),
        ],
      },
    ]
    const state = initTicketState(panels, null)
    expect(state.get('c1')).toEqual({ raw: 'hello', initialized: true })
    expect(state.get('c2')).toEqual({ raw: true, initialized: true })
  })

  test('uses getStandardField for UseFixField controls', () => {
    const panels = [
      {
        kind: 'panel' as const,
        collapsed: false,
        collapsible: false,
        children: [
          ctrl({ id: 'c1', initPolicy: 'UseFixField', initFixField: 'Symbol' }),
        ],
      },
    ]
    const state = initTicketState(panels, name => name === 'Symbol' ? 'AAPL' : undefined)
    expect(state.get('c1')).toEqual({ raw: 'AAPL', initialized: true })
  })

  test('returns correct map size', () => {
    const panels = [
      {
        kind: 'panel' as const,
        collapsed: false,
        collapsible: false,
        children: [ctrl({ id: 'c1' }), ctrl({ id: 'c2' }), ctrl({ id: 'c3' })],
      },
    ]
    expect(initTicketState(panels, null).size).toBe(3)
  })
})
