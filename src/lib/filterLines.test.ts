import { describe, it, expect } from 'vitest'
import { applyFilters, getFilterError, createFilterSet, appendFilterSet, type Filter } from './filterLines'

const f = (text: string, isRegex = false, id = '1'): Filter => ({ id, text, isRegex })

describe('applyFilters', () => {
  it('returns all lines when no filters are active', () => {
    const lines = ['line one', 'line two', 'line three']
    expect(applyFilters(lines, [])).toEqual(lines)
  })

  it('plain-text filter keeps lines containing the string (case-insensitive)', () => {
    const lines = ['Hello World', 'foo bar', 'HELLO again']
    expect(applyFilters(lines, [f('hello')])).toEqual(['Hello World', 'HELLO again'])
  })

  it('plain-text filter excludes lines that do not contain the string', () => {
    const lines = ['match this', 'excluded line', 'also a match']
    expect(applyFilters(lines, [f('match')])).toEqual(['match this', 'also a match'])
  })

  it('multiple plain-text filters combine with AND semantics', () => {
    const lines = [
      'ClOrdID=12345 OrdStatus=2',
      'ClOrdID=12345 OrdStatus=1',
      'ClOrdID=99999 OrdStatus=2',
    ]
    expect(applyFilters(lines, [f('ClOrdID=12345'), f('OrdStatus=2')])).toEqual([
      'ClOrdID=12345 OrdStatus=2',
    ])
  })

  it('regex filter applies the regular expression to each line', () => {
    const lines = ['8=FIX.4.4|35=D|', '8=FIX.4.2|35=8|', '8=FIX.4.4|35=8|']
    expect(applyFilters(lines, [f('35=D', true)])).toEqual(['8=FIX.4.4|35=D|'])
  })

  it('invalid regex filter is skipped — does not crash and does not exclude lines', () => {
    const lines = ['line one', 'line two']
    const invalid = f('[bad regex', true)
    expect(applyFilters(lines, [invalid])).toEqual(lines)
  })

  it('invalid regex filter is skipped but other filters in the same call still apply', () => {
    const lines = ['match line', 'other line']
    const invalid = f('[bad', true)
    const valid = f('match')
    expect(applyFilters(lines, [invalid, valid])).toEqual(['match line'])
  })

  it('empty filter text matches all lines (treated as pass-through)', () => {
    const lines = ['aaa', 'bbb']
    expect(applyFilters(lines, [f('')])).toEqual(lines)
  })

  it('mix of text and regex filters applies AND across both types', () => {
    const lines = [
      '8=FIX.4.4|35=D|49=CLIENT|',
      '8=FIX.4.4|35=8|49=CLIENT|',
      '8=FIX.4.2|35=D|49=BROKER|',
    ]
    expect(applyFilters(lines, [f('35=D'), f('CLIENT', true)])).toEqual([
      '8=FIX.4.4|35=D|49=CLIENT|',
    ])
  })
})

describe('applyFilters OR mode', () => {
  it('OR mode includes a line that matches any filter', () => {
    const lines = ['35=D line', '35=8 line', 'unrelated line']
    expect(applyFilters(lines, [f('35=D'), f('35=8')], 'OR')).toEqual(['35=D line', '35=8 line'])
  })

  it('OR mode excludes a line that matches no filter', () => {
    const lines = ['35=D line', 'nothing here']
    expect(applyFilters(lines, [f('35=D'), f('35=8')], 'OR')).toEqual(['35=D line'])
  })

  it('OR mode skips invalid regex and applies remaining filters', () => {
    const lines = ['35=D line', 'other line']
    expect(applyFilters(lines, [f('[bad', true), f('35=D')], 'OR')).toEqual(['35=D line'])
  })

  it('OR mode with an empty-text filter returns all lines (empty is pass-through)', () => {
    const lines = ['aaa', 'bbb']
    expect(applyFilters(lines, [f('')], 'OR')).toEqual(lines)
  })

  it('default mode (no mode arg) behaves as AND', () => {
    const lines = ['35=D 49=CLIENT', '35=D 49=BROKER', '35=8 49=CLIENT']
    expect(applyFilters(lines, [f('35=D'), f('CLIENT')])).toEqual(['35=D 49=CLIENT'])
  })
})

describe('appendFilterSet', () => {
  it('appending to empty current returns the set filters with generated IDs', () => {
    const set = createFilterSet('test', [{ id: 'x', text: '35=D', isRegex: false }])
    const result = appendFilterSet([], set)
    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('35=D')
    expect(result[0].isRegex).toBe(false)
    expect(result[0].id).toBeDefined()
  })

  it('appending to existing filters returns existing followed by set filters', () => {
    const existing: Filter[] = [{ id: 'e1', text: 'ClOrdID=99', isRegex: false }]
    const set = createFilterSet('test', [{ id: 'x', text: '35=D', isRegex: false }])
    const result = appendFilterSet(existing, set)
    expect(result).toHaveLength(2)
    expect(result[0]).toEqual(existing[0])
    expect(result[1].text).toBe('35=D')
  })

  it('createFilterSet strips IDs from filters and preserves name and values', () => {
    const active: Filter[] = [
      { id: 'active-1', text: '35=D', isRegex: false },
      { id: 'active-2', text: '[A-Z]+', isRegex: true },
    ]
    const set = createFilterSet('My preset', active)
    expect(set.name).toBe('My preset')
    expect(set.filters).toHaveLength(2)
    expect(set.filters[0]).toEqual({ text: '35=D', isRegex: false })
    expect(set.filters[1]).toEqual({ text: '[A-Z]+', isRegex: true })
    expect((set.filters[0] as Filter).id).toBeUndefined()
  })

  it('appending an empty set returns current filters unchanged', () => {
    const existing: Filter[] = [{ id: 'e1', text: 'foo', isRegex: false }]
    const set = createFilterSet('empty', [])
    const result = appendFilterSet(existing, set)
    expect(result).toEqual(existing)
  })

  it('filter text and isRegex are preserved exactly through append', () => {
    const set = createFilterSet('test', [
      { id: 'a', text: '35=[D8]', isRegex: true },
      { id: 'b', text: 'CLIENT', isRegex: false },
    ])
    const result = appendFilterSet([], set)
    expect(result[0].text).toBe('35=[D8]')
    expect(result[0].isRegex).toBe(true)
    expect(result[1].text).toBe('CLIENT')
    expect(result[1].isRegex).toBe(false)
  })

  it('all IDs in the merged result are unique', () => {
    const existing: Filter[] = [
      { id: 'e1', text: 'foo', isRegex: false },
      { id: 'e2', text: 'bar', isRegex: false },
    ]
    const set = createFilterSet('test', [
      { id: 'x', text: 'baz', isRegex: false },
      { id: 'y', text: 'qux', isRegex: false },
    ])
    const result = appendFilterSet(existing, set)
    const ids = result.map(f => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('getFilterError', () => {
  it('returns null for a valid plain-text filter', () => {
    expect(getFilterError(f('hello'))).toBeNull()
  })

  it('returns null for a valid regex filter', () => {
    expect(getFilterError(f('35=D.*49=', true))).toBeNull()
  })

  it('returns null for an empty filter', () => {
    expect(getFilterError(f(''))).toBeNull()
  })

  it('returns an error string for an invalid regex filter', () => {
    const err = getFilterError(f('[invalid', true))
    expect(typeof err).toBe('string')
    expect(err!.length).toBeGreaterThan(0)
  })

  it('returns null for a plain-text filter whose text looks like broken regex', () => {
    // isRegex=false — never compiled as regex, so never invalid
    expect(getFilterError(f('[not compiled', false))).toBeNull()
  })
})
