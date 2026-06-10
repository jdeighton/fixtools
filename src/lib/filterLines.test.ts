import { describe, it, expect } from 'vitest'
import { applyFilters, getFilterError, type Filter } from './filterLines'

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
