import { describe, it, expect } from 'vitest'
import { parseFixTimestamp, parseLogTimestamp } from './timestamps'

describe('parseFixTimestamp', () => {
  it('parses a standard FIX timestamp', () => {
    const d = parseFixTimestamp('20240101-09:30:00.000')
    expect(d).not.toBeNull()
    expect(d!.getUTCFullYear()).toBe(2024)
    expect(d!.getUTCMonth()).toBe(0)  // January
    expect(d!.getUTCDate()).toBe(1)
    expect(d!.getUTCHours()).toBe(9)
    expect(d!.getUTCMinutes()).toBe(30)
    expect(d!.getUTCSeconds()).toBe(0)
    expect(d!.getUTCMilliseconds()).toBe(0)
  })

  it('parses a FIX timestamp without milliseconds', () => {
    const d = parseFixTimestamp('20240101-09:30:00')
    expect(d).not.toBeNull()
    expect(d!.getUTCHours()).toBe(9)
    expect(d!.getUTCSeconds()).toBe(0)
  })
})

describe('parseLogTimestamp', () => {
  it('parses a log-line timestamp with space separator', () => {
    const d = parseLogTimestamp('2024-01-01 09:30:00.123')
    expect(d).not.toBeNull()
    expect(d!.getUTCFullYear()).toBe(2024)
    expect(d!.getUTCMonth()).toBe(0)
    expect(d!.getUTCDate()).toBe(1)
    expect(d!.getUTCHours()).toBe(9)
    expect(d!.getUTCMinutes()).toBe(30)
    expect(d!.getUTCSeconds()).toBe(0)
    expect(d!.getUTCMilliseconds()).toBe(123)
  })

  it('parses a log-line timestamp with T separator', () => {
    const d = parseLogTimestamp('2024-01-01T09:30:00')
    expect(d).not.toBeNull()
    expect(d!.getUTCHours()).toBe(9)
  })

  it('returns null for an unrecognised format', () => {
    expect(parseLogTimestamp('not-a-timestamp')).toBeNull()
    expect(parseLogTimestamp('01/01/2024 09:30')).toBeNull()
  })
})

describe('edge cases', () => {
  it('truncates sub-millisecond precision to 3 digits', () => {
    const d = parseFixTimestamp('20240101-09:30:00.1')
    expect(d!.getUTCMilliseconds()).toBe(100)
  })

  it('returns null for malformed FIX timestamps', () => {
    expect(parseFixTimestamp('not-a-timestamp')).toBeNull()
    expect(parseFixTimestamp('')).toBeNull()
    expect(parseFixTimestamp('2024-01-01 09:30:00')).toBeNull()
  })

  it('returns null for malformed log timestamps', () => {
    expect(parseLogTimestamp('not-a-timestamp')).toBeNull()
    expect(parseLogTimestamp('')).toBeNull()
    expect(parseLogTimestamp('20240101-09:30:00')).toBeNull()
  })
})
