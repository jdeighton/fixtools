import type { FixMessage, Settings, CustomEnum } from '../context/AppContext'
import { FIELDS, FIELDS_42, FIELDS_TT42, FIELDS_TT44, MSG_TYPES, REQUIRED_FIELDS_42, REQUIRED_FIELDS_44, REQUIRED_FIELDS_TT42, REQUIRED_FIELDS_TT44, fieldName } from '../data/fixDictionary'

export type ValidationProfile = 'auto' | 'FIX.4.2' | 'FIX.4.4' | 'TT-FIX.4.2' | 'TT-FIX.4.4'

export interface ValidationIssue {
  severity: 'error' | 'warning'
  tag?: number
  tagName: string
  description: string
}

const TIMESTAMP_RE = /^\d{8}-\d{2}:\d{2}:\d{2}(\.\d+)?$/
const LOCALMKT_RE = /^\d{8}$/
const MONTHYEAR_RE = /^\d{6}(\d{2})?$/

function isValidInt(v: string) { return /^-?\d+$/.test(v.trim()) }
function isValidFloat(v: string) { return /^-?\d+(\.\d+)?$/.test(v.trim()) }
function isValidChar(v: string) { return v.length === 1 }
function isValidBool(v: string) { return v === 'Y' || v === 'N' }

function validateType(type: string, value: string): boolean {
  switch (type) {
    case 'INT': case 'NUMINGROUP': case 'SEQNUM': case 'LENGTH': return isValidInt(value)
    case 'FLOAT': case 'PRICE': case 'AMT': case 'QTY': case 'PERCENTAGE': case 'PRICEOFFSET': return isValidFloat(value)
    case 'CHAR': return isValidChar(value)
    case 'BOOLEAN': return isValidBool(value)
    case 'UTCTIMESTAMP': return TIMESTAMP_RE.test(value)
    case 'LOCALMKTDATE': return LOCALMKT_RE.test(value)
    case 'MONTHYEAR': return MONTHYEAR_RE.test(value)
    default: return true  // STRING and unknown types accept anything
  }
}

function parseFixTs(v: string): Date | null {
  const m = v.match(/^(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?$/)
  if (!m) return null
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6], m[7] ? +m[7].padEnd(3, '0').slice(0, 3) : 0))
}

// Reconstruct message body with SOH for checksum/body-length calculation
function reconstructWithSoh(tags: Map<number, string>): string {
  let s = ''
  for (const [tag, value] of tags) {
    s += `${tag}=${value}\x01`
  }
  return s
}

function computeChecksum(tags: Map<number, string>): number {
  let sum = 0
  for (const [tag, value] of tags) {
    if (tag === 10) break
    const field = `${tag}=${value}\x01`
    for (let i = 0; i < field.length; i++) sum += field.charCodeAt(i)
  }
  return sum % 256
}

function computeBodyLength(tags: Map<number, string>): number {
  let length = 0
  for (const [tag, value] of tags) {
    if (tag === 8 || tag === 9) continue
    if (tag === 10) break
    length += `${tag}=${value}\x01`.length
  }
  return length
}

export function validateMessage(msg: FixMessage, settings: Settings, customEnums: CustomEnum[] = [], profile: ValidationProfile = 'auto'): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const t = (num: number) => msg.tags.get(num)

  const beginStr = t(8)

  // Pick the field map for enum validation based on the selected profile
  const fieldsForVersion =
    profile === 'TT-FIX.4.2' ? FIELDS_TT42 :
    profile === 'TT-FIX.4.4' ? FIELDS_TT44 :
    profile === 'FIX.4.2' || (profile === 'auto' && beginStr === 'FIX.4.2') ? FIELDS_42 :
    FIELDS

  // Effective version string for matching custom enum accommodations
  const effectiveVersion: string =
    profile === 'auto' ? (beginStr ?? '') : profile

  const allowedOverrides = new Set(
    customEnums
      .filter(e => e.enabled && (!e.fixVersion || e.fixVersion === 'any' || e.fixVersion === effectiveVersion))
      .map(e => `${e.tag}:${e.value}`)
  )

  // Rule 1: BeginString — TT profiles still expect standard FIX.4.x on the wire
  const expectedBeginStr =
    profile === 'TT-FIX.4.2' ? 'FIX.4.2' :
    profile === 'TT-FIX.4.4' ? 'FIX.4.4' :
    profile === 'auto' ? null : profile  // null = accept both standard versions
  const validBeginStrs = expectedBeginStr ? [expectedBeginStr] : ['FIX.4.2', 'FIX.4.4']
  if (!beginStr || !validBeginStrs.includes(beginStr)) {
    issues.push({ severity: 'error', tag: 8, tagName: 'BeginString', description: `BeginString must be ${validBeginStrs.join(' or ')}, got "${beginStr ?? ''}"` })
  }

  // Rule 9: Tag ordering — 8 first, 9 second, 35 third, 10 last
  const tagOrder = [...msg.tags.keys()]
  if (tagOrder[0] !== 8) issues.push({ severity: 'error', tag: 8, tagName: 'BeginString', description: 'Tag 8 (BeginString) must be the first tag' })
  if (tagOrder[1] !== 9) issues.push({ severity: 'error', tag: 9, tagName: 'BodyLength', description: 'Tag 9 (BodyLength) must be the second tag' })
  if (tagOrder[2] !== 35) issues.push({ severity: 'error', tag: 35, tagName: 'MsgType', description: 'Tag 35 (MsgType) must be the third tag' })
  if (tagOrder[tagOrder.length - 1] !== 10) issues.push({ severity: 'error', tag: 10, tagName: 'CheckSum', description: 'Tag 10 (CheckSum) must be the last tag' })

  // Rule 4: Required header tags
  for (const requiredTag of [8, 9, 35, 49, 56, 34, 52]) {
    if (!msg.tags.has(requiredTag)) {
      issues.push({ severity: 'error', tag: requiredTag, tagName: fieldName(requiredTag), description: `Required header tag ${requiredTag} (${fieldName(requiredTag)}) is missing` })
    }
  }

  // Rule 3: MsgType must be known
  const msgType = t(35)
  if (msgType && !MSG_TYPES[msgType]) {
    issues.push({ severity: 'error', tag: 35, tagName: 'MsgType', description: `Unknown MsgType value: "${msgType}"` })
  }

  // Rule 5: Required fields per MsgType — use the profile's required-field table
  if (msgType) {
    let requiredForMsg: string[] = []
    if (profile === 'TT-FIX.4.2') {
      requiredForMsg = REQUIRED_FIELDS_TT42[msgType] ?? []
    } else if (profile === 'TT-FIX.4.4') {
      requiredForMsg = REQUIRED_FIELDS_TT44[msgType] ?? []
    } else if (profile === 'FIX.4.2' || (profile === 'auto' && beginStr === 'FIX.4.2')) {
      requiredForMsg = REQUIRED_FIELDS_42[msgType] ?? []
    } else {
      requiredForMsg = REQUIRED_FIELDS_44[msgType] ?? []
    }
    // Resolve field names to tag numbers using the active field map
    const fieldsByName = Object.entries(fieldsForVersion)
    for (const reqFieldName of requiredForMsg) {
      const entry = fieldsByName.find(([, f]) => f.name === reqFieldName)
      if (entry && !msg.tags.has(Number(entry[0]))) {
        issues.push({ severity: 'error', tag: Number(entry[0]), tagName: reqFieldName, description: `Required field "${reqFieldName}" (tag ${entry[0]}) missing for MsgType ${msgType}` })
      }
    }
  }

  // Rule 7: Enum validation (skips values covered by an enabled custom enum accommodation)
  for (const [tagNum, value] of msg.tags) {
    const fieldDef = fieldsForVersion[tagNum]
    if (fieldDef?.values && Object.keys(fieldDef.values).length > 0) {
      if (!(value in fieldDef.values) && !allowedOverrides.has(`${tagNum}:${value}`)) {
        issues.push({ severity: 'error', tag: tagNum, tagName: fieldDef.name, description: `Invalid value "${value}" for ${fieldDef.name} — not in allowed enum set` })
      }
    }
  }

  // Rule 6: Data type validation
  for (const [tagNum, value] of msg.tags) {
    if (tagNum === 10) continue  // Skip checksum (we validate separately)
    const fieldDef = FIELDS[tagNum]
    if (!fieldDef) continue
    if (!validateType(fieldDef.type, value)) {
      issues.push({ severity: 'error', tag: tagNum, tagName: fieldDef.name, description: `Value "${value}" is not a valid ${fieldDef.type} for ${fieldDef.name} (tag ${tagNum})` })
    }
  }

  // Rule 2: BodyLength
  if (settings.validateBodyLengthChecksum && msg.tags.has(9)) {
    const declared = parseInt(t(9)!, 10)
    const computed = computeBodyLength(msg.tags)
    if (!isNaN(declared) && declared !== computed) {
      issues.push({ severity: 'error', tag: 9, tagName: 'BodyLength', description: `BodyLength mismatch: declared ${declared}, computed ${computed}` })
    }
  }

  // Rule 8: Checksum
  if (settings.validateBodyLengthChecksum && msg.tags.has(10)) {
    const declared = parseInt(t(10)!, 10)
    const computed = computeChecksum(msg.tags)
    if (!isNaN(declared) && declared !== computed) {
      issues.push({ severity: 'error', tag: 10, tagName: 'CheckSum', description: `Checksum mismatch: declared ${declared.toString().padStart(3, '0')}, computed ${computed.toString().padStart(3, '0')}` })
    }
  }

  // Time delta warning
  const sendingTime = t(52)
  const transactTime = t(60)
  if (sendingTime && transactTime) {
    const st = parseFixTs(sendingTime)
    const tt = parseFixTs(transactTime)
    if (st && tt) {
      const deltaSec = Math.abs(tt.getTime() - st.getTime()) / 1000
      if (deltaSec > settings.validatorTimeDeltaSeconds) {
        issues.push({ severity: 'warning', tag: 60, tagName: 'TransactTime', description: `TransactTime/SendingTime delta is ${Math.round(deltaSec)}s (threshold: ${settings.validatorTimeDeltaSeconds}s)` })
      }
    }
  }

  return issues
}

export { reconstructWithSoh }
