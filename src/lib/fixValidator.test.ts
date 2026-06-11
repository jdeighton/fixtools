import { describe, it, expect } from 'vitest'
import { validateMessage } from './fixValidator'
import { parseFixMessages } from './fixParser'
import type { Settings } from '../context/AppContext'

const DEFAULT_SETTINGS: Settings = { compareMaxAutoDisplay: 10, validatorTimeDeltaSeconds: 60, validateBodyLengthChecksum: true, appendOnInput: false, hideHeartbeats: false, copyIncludePreamble: true }
const SOH = '\x01'

function buildMsg(pairs: [number, string][]): string {
  return pairs.map(([t, v]) => `${t}=${v}`).join(SOH) + SOH
}

function computeBodyLength(pairs: [number, string][]): number {
  return pairs
    .filter(([t]) => t !== 8 && t !== 9 && t !== 10)
    .reduce((s, [t, v]) => s + `${t}=${v}\x01`.length, 0)
}

function computeChecksum(pairs: [number, string][]): number {
  const withoutCs = pairs.filter(([t]) => t !== 10)
  let sum = 0
  for (const [t, v] of withoutCs) {
    const field = `${t}=${v}\x01`
    for (let i = 0; i < field.length; i++) sum += field.charCodeAt(i)
  }
  return sum % 256
}

function makeValidNOS(): string {
  const body: [number, string][] = [
    [35, 'D'], [49, 'CLIENT'], [56, 'BROKER'], [34, '1'], [52, '20240101-09:30:00.000'],
    [11, 'ORD1'], [54, '1'], [55, 'AAPL'], [38, '100'], [40, '2'], [60, '20240101-09:30:00.000'],
  ]
  const bl = computeBodyLength([[8, 'FIX.4.4'], [9, '0'], ...body, [10, '000']])
  const pairs: [number, string][] = [[8, 'FIX.4.4'], [9, String(bl)], ...body]
  const cs = computeChecksum([...pairs, [10, '000']])
  return buildMsg([...pairs, [10, cs.toString().padStart(3, '0')]])
}

describe('fixValidator', () => {
  it('reports no errors for a well-formed message', () => {
    const raw = makeValidNOS()
    const [msg] = parseFixMessages(raw)
    const issues = validateMessage(msg, DEFAULT_SETTINGS)
    const errors = issues.filter(i => i.severity === 'error')
    expect(errors).toHaveLength(0)
  })

  it('flags invalid BeginString', () => {
    const pairs: [number, string][] = [[8, 'FIX.4.9'], [9, '10'], [35, '0'], [49, 'A'], [56, 'B'], [34, '1'], [52, '20240101-09:00:00'], [10, '000']]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, DEFAULT_SETTINGS)
    expect(issues.some(i => i.tag === 8 && i.severity === 'error')).toBe(true)
  })

  it('flags missing required header tag', () => {
    // Missing SenderCompID (49) and TargetCompID (56)
    const pairs: [number, string][] = [[8, 'FIX.4.4'], [9, '5'], [35, '0'], [34, '1'], [52, '20240101-09:00:00'], [10, '000']]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, DEFAULT_SETTINGS)
    expect(issues.some(i => i.tag === 49 && i.severity === 'error')).toBe(true)
    expect(issues.some(i => i.tag === 56 && i.severity === 'error')).toBe(true)
  })

  it('flags unknown MsgType', () => {
    // Use '~' which is definitely not in the FIX 4.4 spec
    const pairs: [number, string][] = [[8, 'FIX.4.4'], [9, '20'], [35, '~'], [49, 'A'], [56, 'B'], [34, '1'], [52, '20240101-09:00:00'], [10, '000']]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, DEFAULT_SETTINGS)
    expect(issues.some(i => i.tag === 35 && i.severity === 'error')).toBe(true)
  })

  it('flags checksum mismatch', () => {
    const pairs: [number, string][] = [[8, 'FIX.4.4'], [9, '47'], [35, 'D'], [49, 'CLIENT'], [56, 'BROKER'], [34, '1'], [52, '20240101-09:30:00.000'], [11, 'ORD1'], [54, '1'], [55, 'AAPL'], [38, '100'], [40, '2'], [10, '999']]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, DEFAULT_SETTINGS)
    expect(issues.some(i => i.tag === 10 && i.severity === 'error')).toBe(true)
  })

  it('produces a warning when TransactTime and SendingTime are far apart', () => {
    const pairs: [number, string][] = [
      [8, 'FIX.4.4'], [9, '80'], [35, 'D'], [49, 'A'], [56, 'B'], [34, '1'],
      [52, '20240101-09:00:00.000'], [60, '20240101-09:05:00.000'],  // 5 min apart
      [11, 'ORD1'], [54, '1'], [55, 'AAPL'], [38, '100'], [40, '2'], [10, '000'],
    ]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, { ...DEFAULT_SETTINGS, validatorTimeDeltaSeconds: 60 })
    expect(issues.some(i => i.tag === 60 && i.severity === 'warning')).toBe(true)
  })

  it('warns when NoX declared count exceeds parsed instances', () => {
    const pairs: [number, string][] = [
      [8, 'FIX.4.4'], [9, '100'], [35, '8'],
      [49, 'CME_GW'], [56, 'TRADER01'], [34, '1'], [52, '20240101-09:00:00'],
      [37, 'ORD1'], [11, 'CL1'], [17, 'EX1'], [20, '0'], [150, '0'], [39, '0'],
      [55, 'ESU6'], [54, '1'], [38, '2'], [32, '0'], [31, '0.00'], [14, '0'], [151, '2'], [6, '0.00'],
      [60, '20240101-09:00:00'],
      [453, '2'],                                   // declares 2 NoPartyIDs instances
      [448, 'CLRG-001'], [447, 'D'], [452, '4'],    // only 1 instance — tag 10 terminates the group
      [10, '000'],
    ]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, { ...DEFAULT_SETTINGS, validateBodyLengthChecksum: false })
    expect(issues.some(i => i.tag === 453 && i.severity === 'warning')).toBe(true)
  })

  it('does not warn when NoX declared count matches parsed instances', () => {
    const pairs: [number, string][] = [
      [8, 'FIX.4.4'], [9, '100'], [35, '8'],
      [49, 'CME_GW'], [56, 'TRADER01'], [34, '1'], [52, '20240101-09:00:00'],
      [37, 'ORD1'], [11, 'CL1'], [17, 'EX1'], [20, '0'], [150, '0'], [39, '0'],
      [55, 'ESU6'], [54, '1'], [38, '2'], [32, '0'], [31, '0.00'], [14, '0'], [151, '2'], [6, '0.00'],
      [60, '20240101-09:00:00'],
      [453, '2'],
      [448, 'CLRG-001'], [447, 'D'], [452, '4'],    // instance 1
      [448, 'TRADER01'], [447, 'D'], [452, '11'],    // instance 2
      [10, '000'],
    ]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, { ...DEFAULT_SETTINGS, validateBodyLengthChecksum: false })
    expect(issues.every(i => !(i.tag === 453 && i.severity === 'warning'))).toBe(true)
  })

  it('warning description names the tag and both counts', () => {
    const pairs: [number, string][] = [
      [8, 'FIX.4.4'], [9, '100'], [35, '8'],
      [49, 'CME_GW'], [56, 'TRADER01'], [34, '1'], [52, '20240101-09:00:00'],
      [37, 'ORD1'], [11, 'CL1'], [17, 'EX1'], [20, '0'], [150, '0'], [39, '0'],
      [55, 'ESU6'], [54, '1'], [38, '2'], [32, '0'], [31, '0.00'], [14, '0'], [151, '2'], [6, '0.00'],
      [60, '20240101-09:00:00'],
      [453, '2'],
      [448, 'CLRG-001'], [447, 'D'], [452, '4'],
      [10, '000'],
    ]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, { ...DEFAULT_SETTINGS, validateBodyLengthChecksum: false })
    const warn = issues.find(i => i.tag === 453 && i.severity === 'warning')
    expect(warn?.description).toMatch(/NoPartyIDs/)
    expect(warn?.description).toMatch(/\b2\b/)   // declared count
    expect(warn?.description).toMatch(/\b1\b/)   // actual count
  })

  it('does not warn when TransactTime and SendingTime are within threshold', () => {
    const pairs: [number, string][] = [
      [8, 'FIX.4.4'], [9, '80'], [35, 'D'], [49, 'A'], [56, 'B'], [34, '1'],
      [52, '20240101-09:00:00.000'], [60, '20240101-09:00:30.000'],  // 30s apart
      [11, 'ORD1'], [54, '1'], [55, 'AAPL'], [38, '100'], [40, '2'], [10, '000'],
    ]
    const [msg] = parseFixMessages(buildMsg(pairs))
    const issues = validateMessage(msg, { ...DEFAULT_SETTINGS, validatorTimeDeltaSeconds: 60 })
    expect(issues.every(i => !(i.tag === 60 && i.severity === 'warning'))).toBe(true)
  })
})
