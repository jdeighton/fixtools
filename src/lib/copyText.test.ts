import { describe, it, expect } from 'vitest'
import { extractCopyText } from './copyText'

const PREAMBLE = '2024-01-01 09:30:00.123 [FIX.4.4:CLIENT->BROKER] '
const FIX_BODY = '8=FIX.4.4|9=100|35=D|49=CLIENT|56=BROKER|10=000|'

describe('extractCopyText', () => {
  it('returns the full raw line when includePreamble is true', () => {
    const raw = PREAMBLE + FIX_BODY
    expect(extractCopyText(raw, true)).toBe(raw)
  })

  it('strips the preamble when includePreamble is false and line has a preamble', () => {
    const raw = PREAMBLE + FIX_BODY
    expect(extractCopyText(raw, false)).toBe(FIX_BODY)
  })

  it('returns the full line when includePreamble is false but line already starts with 8=FIX', () => {
    expect(extractCopyText(FIX_BODY, false)).toBe(FIX_BODY)
  })

  it('returns the full line when includePreamble is false and line contains no 8=FIX', () => {
    const noFix = 'some log line with no fix content'
    expect(extractCopyText(noFix, false)).toBe(noFix)
  })

  it('returns empty string for empty input regardless of setting', () => {
    expect(extractCopyText('', true)).toBe('')
    expect(extractCopyText('', false)).toBe('')
  })
})
