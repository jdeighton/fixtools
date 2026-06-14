import { describe, it, expect } from 'vitest'
import { collectControls, STRING_ID_RE } from './treeUtils'
import type { StrategyPanel, Control } from '../model'

function mkPanel(children: Array<StrategyPanel | Control>): StrategyPanel {
  return { kind: 'panel', collapsed: false, collapsible: false, children }
}

function mkCtrl(id: string): Control {
  return { kind: 'control', id, xsiType: 'TextField_t' as any, listItems: [], stateRules: [] }
}

describe('collectControls', () => {
  it('returns empty array for no panels', () => {
    expect(collectControls([])).toEqual([])
  })

  it('flattens controls from a single panel', () => {
    const panels: StrategyPanel[] = [mkPanel([mkCtrl('a'), mkCtrl('b')])]
    const controls = collectControls(panels)
    expect(controls.map(c => c.id)).toEqual(['a', 'b'])
  })

  it('recurses into nested panels', () => {
    const inner = mkPanel([mkCtrl('inner')])
    const outer = mkPanel([mkCtrl('outer'), inner])
    const controls = collectControls([outer])
    expect(controls.map(c => c.id)).toEqual(['outer', 'inner'])
  })

  it('handles multiple top-level panels', () => {
    const p1 = mkPanel([mkCtrl('x')])
    const p2 = mkPanel([mkCtrl('y'), mkPanel([mkCtrl('z')])])
    const controls = collectControls([p1, p2])
    expect(controls.map(c => c.id)).toEqual(['x', 'y', 'z'])
  })

  it('returns Control objects (not copies)', () => {
    const ctrl = mkCtrl('ref')
    const controls = collectControls([mkPanel([ctrl])])
    expect(controls[0]).toBe(ctrl)
  })
})

describe('STRING_ID_RE', () => {
  it('accepts valid StringIDs', () => {
    expect(STRING_ID_RE.test('A')).toBe(true)
    expect(STRING_ID_RE.test('a')).toBe(true)
    expect(STRING_ID_RE.test('orderId123')).toBe(true)
    expect(STRING_ID_RE.test('MY_ID_99')).toBe(true)
    expect(STRING_ID_RE.test('a0_'.padEnd(255, 'x').replace(/x/g, 'a'))).toBe(true)
  })

  it('rejects invalid StringIDs', () => {
    expect(STRING_ID_RE.test('')).toBe(false)
    expect(STRING_ID_RE.test('1abc')).toBe(false)  // starts with digit
    expect(STRING_ID_RE.test('_abc')).toBe(false)  // starts with underscore
    expect(STRING_ID_RE.test('ab-c')).toBe(false)  // contains hyphen
    expect(STRING_ID_RE.test('a b')).toBe(false)   // contains space
  })

  it('accepts IDs up to 255 chars', () => {
    const exact = 'a' + 'b'.repeat(254)  // 255 chars total
    expect(STRING_ID_RE.test(exact)).toBe(true)
  })

  it('rejects IDs longer than 255 chars', () => {
    const tooLong = 'a' + 'b'.repeat(255)  // 256 chars total
    expect(STRING_ID_RE.test(tooLong)).toBe(false)
  })
})
