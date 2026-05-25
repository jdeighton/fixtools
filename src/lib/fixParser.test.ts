import { describe, it, expect } from 'vitest'
import { parseFixMessages } from './fixParser'

const SOH = '\x01'

function fix(...pairs: [number, string][]): string {
  return pairs.map(([t, v]) => `${t}=${v}`).join(SOH) + SOH
}

describe('parseFixMessages', () => {
  it('parses a raw SOH-delimited FIX 4.4 new order single', () => {
    const raw = fix([8, 'FIX.4.4'], [9, '100'], [35, 'D'], [49, 'CLIENT'], [56, 'BROKER'], [34, '1'], [52, '20240101-09:30:00.000'], [11, 'ORD1'], [54, '1'], [55, 'AAPL'], [38, '100'], [44, '150.00'], [40, '2'], [59, '1'], [10, '123'])
    const msgs = parseFixMessages(raw)
    expect(msgs).toHaveLength(1)
    expect(msgs[0].fixVersion).toBe('FIX.4.4')
    expect(msgs[0].tags.get(35)).toBe('D')
    expect(msgs[0].tags.get(49)).toBe('CLIENT')
    expect(msgs[0].direction).toBe('CLIENT → BROKER')
    expect(msgs[0].session).toBe('CLIENT→BROKER')
  })

  it('parses pipe-delimited FIX messages', () => {
    const raw = '8=FIX.4.2|9=50|35=0|49=A|56=B|34=1|52=20240101-10:00:00.000|10=100|'
    const msgs = parseFixMessages(raw)
    expect(msgs).toHaveLength(1)
    expect(msgs[0].tags.get(35)).toBe('0')
  })

  it('parses QuickFIX/J log format with session bracket', () => {
    const raw = '20240101-09:30:00.123 : [FIX.4.4:CLIENT->BROKER] 8=FIX.4.4|9=100|35=D|49=CLIENT|56=BROKER|34=1|52=20240101-09:30:00.000|10=000|'
    const msgs = parseFixMessages(raw)
    expect(msgs).toHaveLength(1)
    expect(msgs[0].session).toBe('FIX.4.4:CLIENT->BROKER')
    expect(msgs[0].timestamp).not.toBeNull()
  })

  it('parses multiple messages from a multi-line log', () => {
    const line1 = '8=FIX.4.4|9=50|35=A|49=S1|56=T1|34=1|52=20240101-09:00:00.000|10=001|'
    const line2 = '8=FIX.4.4|9=50|35=0|49=S1|56=T1|34=2|52=20240101-09:00:01.000|10=002|'
    const msgs = parseFixMessages(`${line1}\n${line2}`)
    expect(msgs).toHaveLength(2)
    expect(msgs[0].sequenceIndex).toBe(0)
    expect(msgs[1].sequenceIndex).toBe(1)
  })

  it('returns empty array for empty input', () => {
    expect(parseFixMessages('')).toHaveLength(0)
    expect(parseFixMessages('   \n  ')).toHaveLength(0)
  })

  it('skips lines without tag 8 or 35', () => {
    const raw = '35=D|49=A|56=B|\nnot a fix message\n8=FIX.4.4|9=10|35=0|49=X|56=Y|34=1|52=20240101-10:00:00.000|10=100|'
    const msgs = parseFixMessages(raw)
    expect(msgs).toHaveLength(1)
  })

  it('assigns sequenceIndex correctly', () => {
    const lines = Array.from({ length: 5 }, (_, i) =>
      `8=FIX.4.4|9=50|35=0|49=A|56=B|34=${i + 1}|52=20240101-09:00:0${i}.000|10=00${i}|`
    ).join('\n')
    const msgs = parseFixMessages(lines)
    msgs.forEach((m, i) => expect(m.sequenceIndex).toBe(i))
  })
})
