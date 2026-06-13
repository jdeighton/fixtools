import type { AtdlDocument, Strategy, Parameter, ParameterType, Finding } from '../../model'
import { TZ_NAMES_SET } from '../../data/tzNames'

// ── Helpers ───────────────────────────────────────────────────────────────────

const STRING_ID_RE = /^[A-Za-z][A-Za-z0-9_]{0,254}$/

function path(stratName: string, paramName: string): string {
  return `Strategy[${stratName}]/Parameter[${paramName}]`
}

// Types that support minValue/maxValue
const HAS_RANGE = new Set<ParameterType>([
  'Int_t', 'Length_t', 'NumInGroup_t', 'SeqNum_t', 'TagNum_t',
  'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
  'UTCTimestamp_t', 'UTCTimeOnly_t', 'UTCDateOnly_t', 'LocalMktDate_t',
  'TZTimestamp_t', 'TZTimeOnly_t', 'MonthYear_t', 'Tenor_t',
])

// Types that support precision
const HAS_PRECISION = new Set<ParameterType>([
  'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
])

// Types that support minLength/maxLength
const HAS_STR_LEN = new Set<ParameterType>([
  'String_t', 'MultipleCharValue_t', 'MultipleStringValue_t',
  'Char_t', 'Currency_t', 'Exchange_t', 'Language_t', 'Country_t',
  'Tenor_t', 'data_t',
])

// Types that support localMktTz
const HAS_LOCAL_MKT_TZ = new Set<ParameterType>([
  'UTCTimestamp_t', 'UTCTimeOnly_t', 'UTCDateOnly_t', 'LocalMktDate_t',
  'TZTimestamp_t', 'TZTimeOnly_t', 'MonthYear_t',
])

function parsesAsType(val: string, xsiType: ParameterType): boolean {
  const v = val.trim()
  if (v === 'MINUS_INF' || v === 'PLUS_INF') return true
  switch (xsiType) {
    case 'Int_t':
    case 'Length_t':
    case 'NumInGroup_t':
    case 'SeqNum_t':
    case 'TagNum_t':
      return /^-?\d+$/.test(v)
    case 'Float_t':
    case 'Qty_t':
    case 'Price_t':
    case 'PriceOffset_t':
    case 'Amt_t':
    case 'Percentage_t':
      return v !== '' && !isNaN(Number(v))
    case 'Boolean_t':
      return /^[YNyn]$/.test(v) || /^(true|false|0|1)$/i.test(v)
    case 'Char_t':
      return v.length === 1
    case 'UTCTimestamp_t':
    case 'TZTimestamp_t':
      // Accept full timestamp (YYYYMMDD-HH:MM:SS) OR time-only (HH:MM:SS) per FIXatdl spec
      return /^\d{8}-\d{2}:\d{2}:\d{2}/.test(v) || /^\d{2}:\d{2}:\d{2}$/.test(v)
    case 'UTCTimeOnly_t':
    case 'TZTimeOnly_t':
      return /^\d{2}:\d{2}:\d{2}/.test(v)
    case 'UTCDateOnly_t':
    case 'LocalMktDate_t':
      return /^\d{8}$/.test(v)
    case 'MonthYear_t':
      return /^\d{6}/.test(v)
    case 'Tenor_t':
      return /^[A-Z]\d+[A-Z]?$/.test(v.toUpperCase()) || v !== ''
    default:
      return true
  }
}

function toNumber(val: string): number | null {
  const v = val.trim()
  if (v === 'MINUS_INF') return -Infinity
  if (v === 'PLUS_INF') return Infinity
  const n = Number(v)
  return isNaN(n) ? null : n
}

// ── Per-parameter checks ──────────────────────────────────────────────────────

function checkParam(
  strat: Strategy,
  param: Parameter,
  paramNames: Set<string>,
  tag957Support: boolean,
): Finding[] {
  const findings: Finding[] = []
  const loc = path(strat.name, param.name)

  // PA-001: name required and valid StringID
  if (!param.name) {
    findings.push({
      ruleId: 'PA-001', severity: 'error',
      message: `Strategy[${strat.name}] has a Parameter with no @name`,
      location: { path: `Strategy[${strat.name}]/Parameter` },
    })
  } else if (!STRING_ID_RE.test(param.name)) {
    findings.push({
      ruleId: 'PA-001', severity: 'error',
      message: `${loc}/@name "${param.name}" is not a valid StringID — must match [A-Za-z][A-Za-z0-9_]{0,254}`,
      location: { path: loc },
    })
  }

  // PA-002: xsiType must be recognised (model is typed, but guard against unknown types from JS cast)
  if (!param.xsiType) {
    findings.push({
      ruleId: 'PA-002', severity: 'error',
      message: `${loc} has no @xsi:type (required)`,
      location: { path: loc },
    })
  }

  // PA-003: use must be "optional" or "required"
  if (param.use !== 'optional' && param.use !== 'required') {
    findings.push({
      ruleId: 'PA-003', severity: 'error',
      message: `${loc}/@use "${String(param.use)}" must be "optional" or "required"`,
      location: { path: loc },
    })
  }

  // PA-004: constValue on a "required" parameter is contradictory
  if (param.constValue != null && param.use === 'required') {
    findings.push({
      ruleId: 'PA-004', severity: 'warning',
      message: `${loc} has @use="required" and @constValue — a constant never needs to be required`,
      suggestion: 'Remove @use="required" or remove @constValue',
      location: { path: loc },
    })
  }

  // PA-005: non-const param has no fixTag and tag957Support=false → error
  if (param.constValue == null && param.fixTag == null && !tag957Support) {
    findings.push({
      ruleId: 'PA-005', severity: 'error',
      message: `${loc} has no @fixTag and tag957Support is not enabled — parameter cannot be wired to a FIX field`,
      suggestion: 'Add @fixTag or enable tag957Support on Strategies/@tag957Support',
      location: { path: loc },
    })
  }

  // PA-006: fixTag must be > 0
  if (param.fixTag != null && param.fixTag <= 0) {
    findings.push({
      ruleId: 'PA-006', severity: 'error',
      message: `${loc}/@fixTag ${param.fixTag} is not valid — must be a positive integer`,
      location: { path: loc },
    })
  }

  // PA-007: minValue/maxValue must parse as the parameter's type
  for (const [attr, val] of [['minValue', param.minValue], ['maxValue', param.maxValue]] as const) {
    if (val != null && !parsesAsType(val, param.xsiType)) {
      findings.push({
        ruleId: 'PA-007', severity: 'error',
        message: `${loc}/@${attr} "${val}" cannot be parsed as ${param.xsiType}`,
        location: { path: loc },
      })
    }
  }

  // PA-008: minValue ≤ maxValue (numeric types only)
  if (param.minValue != null && param.maxValue != null) {
    const min = toNumber(param.minValue)
    const max = toNumber(param.maxValue)
    if (min !== null && max !== null && min > max) {
      findings.push({
        ruleId: 'PA-008', severity: 'error',
        message: `${loc}/@minValue "${param.minValue}" > @maxValue "${param.maxValue}"`,
        location: { path: loc },
      })
    }
  }

  // PA-009: type-inapplicable attributes
  if (param.minValue != null && !HAS_RANGE.has(param.xsiType)) {
    findings.push({
      ruleId: 'PA-009', severity: 'warning',
      message: `${loc}/@minValue is not applicable to ${param.xsiType} parameters`,
      location: { path: loc },
    })
  }
  if (param.maxValue != null && !HAS_RANGE.has(param.xsiType)) {
    findings.push({
      ruleId: 'PA-009', severity: 'warning',
      message: `${loc}/@maxValue is not applicable to ${param.xsiType} parameters`,
      location: { path: loc },
    })
  }
  if (param.precision != null && !HAS_PRECISION.has(param.xsiType)) {
    findings.push({
      ruleId: 'PA-009', severity: 'warning',
      message: `${loc}/@precision is not applicable to ${param.xsiType} — only float-family types support it`,
      location: { path: loc },
    })
  }
  if (param.minLength != null && !HAS_STR_LEN.has(param.xsiType)) {
    findings.push({
      ruleId: 'PA-009', severity: 'warning',
      message: `${loc}/@minLength is not applicable to ${param.xsiType} — only string-family types support it`,
      location: { path: loc },
    })
  }
  if (param.maxLength != null && !HAS_STR_LEN.has(param.xsiType)) {
    findings.push({
      ruleId: 'PA-009', severity: 'warning',
      message: `${loc}/@maxLength is not applicable to ${param.xsiType} — only string-family types support it`,
      location: { path: loc },
    })
  }

  // PA-010: precision/minLength/maxLength must be non-negative integers
  if (param.precision != null && param.precision < 0) {
    findings.push({
      ruleId: 'PA-010', severity: 'error',
      message: `${loc}/@precision ${param.precision} must be ≥ 0`,
      location: { path: loc },
    })
  }
  if (param.minLength != null && param.minLength < 0) {
    findings.push({
      ruleId: 'PA-010', severity: 'error',
      message: `${loc}/@minLength ${param.minLength} must be ≥ 0`,
      location: { path: loc },
    })
  }
  if (param.maxLength != null && param.maxLength < 0) {
    findings.push({
      ruleId: 'PA-010', severity: 'error',
      message: `${loc}/@maxLength ${param.maxLength} must be ≥ 0`,
      location: { path: loc },
    })
  }
  if (param.minLength != null && param.maxLength != null && param.minLength > param.maxLength) {
    findings.push({
      ruleId: 'PA-010', severity: 'error',
      message: `${loc}/@minLength ${param.minLength} > @maxLength ${param.maxLength}`,
      location: { path: loc },
    })
  }

  // PA-011: deprecated trueWireValue/falseWireValue
  if (param.trueWireValue != null) {
    findings.push({
      ruleId: 'PA-011', severity: 'warning',
      message: `${loc}/@trueWireValue is deprecated in FIXatdl 1.1+ — use EnumPair elements instead`,
      suggestion: 'Replace with EnumPair[@enumID="true"]/@wireValue and EnumPair[@enumID="false"]/@wireValue',
      location: { path: loc },
    })
  }
  if (param.falseWireValue != null) {
    findings.push({
      ruleId: 'PA-011', severity: 'warning',
      message: `${loc}/@falseWireValue is deprecated in FIXatdl 1.1+ — use EnumPair elements instead`,
      suggestion: 'Replace with EnumPair[@enumID="true"]/@wireValue and EnumPair[@enumID="false"]/@wireValue',
      location: { path: loc },
    })
  }

  // PA-012: deprecated multiplyBy100
  if (param.multiplyBy100) {
    findings.push({
      ruleId: 'PA-012', severity: 'warning',
      message: `${loc}/@multiplyBy100 is deprecated in FIXatdl 1.1+ — send the scaled value directly`,
      suggestion: 'Remove @multiplyBy100 and adjust the parameter values accordingly',
      location: { path: loc },
    })
  }

  // PA-013: EnumPair validation
  for (const ep of param.enumPairs) {
    if (!ep.enumID) {
      findings.push({
        ruleId: 'PA-013', severity: 'error',
        message: `${loc}/EnumPair is missing @enumID (required)`,
        location: { path: loc },
      })
    } else if (!STRING_ID_RE.test(ep.enumID)) {
      findings.push({
        ruleId: 'PA-013', severity: 'error',
        message: `${loc}/EnumPair/@enumID "${ep.enumID}" is not a valid StringID`,
        location: { path: `${loc}/EnumPair[${ep.enumID}]` },
      })
    }
    if (ep.wireValue == null) {
      findings.push({
        ruleId: 'PA-013', severity: 'error',
        message: `${loc}/EnumPair[@enumID="${ep.enumID}"] is missing @wireValue (required)`,
        location: { path: `${loc}/EnumPair[${ep.enumID}]` },
      })
    }
  }

  // PA-014: EnumPair wireValues unique within parameter
  const wireValuesSeen = new Map<string, string>()
  for (const ep of param.enumPairs) {
    if (ep.wireValue == null) continue
    const prev = wireValuesSeen.get(ep.wireValue)
    if (prev) {
      findings.push({
        ruleId: 'PA-014', severity: 'error',
        message: `${loc} has duplicate EnumPair/@wireValue "${ep.wireValue}" — used by both @enumID="${prev}" and "${ep.enumID}"`,
        location: { path: `${loc}/EnumPair[${ep.enumID}]` },
      })
    } else {
      wireValuesSeen.set(ep.wireValue, ep.enumID)
    }
  }

  // PA-015: localMktTz on non-time/date type OR invalid IANA name
  if (param.localMktTz != null) {
    if (!HAS_LOCAL_MKT_TZ.has(param.xsiType)) {
      findings.push({
        ruleId: 'PA-015', severity: 'warning',
        message: `${loc}/@localMktTz is not applicable to ${param.xsiType} — only time/date types support it`,
        location: { path: loc },
      })
    } else if (!TZ_NAMES_SET.has(param.localMktTz)) {
      findings.push({
        ruleId: 'PA-015', severity: 'warning',
        message: `${loc}/@localMktTz "${param.localMktTz}" is not a recognised IANA timezone name`,
        suggestion: 'Use an Olson/IANA name such as "America/New_York"',
        location: { path: loc },
      })
    }
  }

  // PA-016: invertOnWire only valid for Boolean_t
  if (param.invertOnWire && param.xsiType !== 'Boolean_t') {
    findings.push({
      ruleId: 'PA-016', severity: 'error',
      message: `${loc}/@invertOnWire is only applicable to Boolean_t parameters`,
      location: { path: loc },
    })
  }

  // PA-017: constValue must parse as parameter's type
  if (param.constValue != null && !parsesAsType(param.constValue, param.xsiType)) {
    findings.push({
      ruleId: 'PA-017', severity: 'error',
      message: `${loc}/@constValue "${param.constValue}" cannot be parsed as ${param.xsiType}`,
      location: { path: loc },
    })
  }

  // PA-018: deprecated index attribute on EnumPair — already dropped by parser; no-op
  // (would require parser changes to surface this)

  // PA-019: fixTag ≥ 10000 → info (user-defined field range)
  if (param.fixTag != null && param.fixTag >= 10000) {
    findings.push({
      ruleId: 'PA-019', severity: 'info',
      message: `${loc}/@fixTag ${param.fixTag} is in the user-defined field range (≥10000) — ensure broker/counterparty agreement`,
      location: { path: loc },
    })
  }

  // PA-020: EnumPair enumIDs unique within parameter
  const enumIDsSeen = new Set<string>()
  for (const ep of param.enumPairs) {
    if (!ep.enumID) continue
    if (enumIDsSeen.has(ep.enumID)) {
      findings.push({
        ruleId: 'PA-020', severity: 'error',
        message: `${loc} has duplicate EnumPair/@enumID "${ep.enumID}"`,
        location: { path: `${loc}/EnumPair[${ep.enumID}]` },
      })
    }
    enumIDsSeen.add(ep.enumID)
  }

  // Track for PA-021 (name uniqueness handled by caller)
  paramNames.add(param.name)

  return findings
}

// ── Public API ────────────────────────────────────────────────────────────────

export function checkPA(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  for (const strat of doc.strategies) {
    const paramNames = new Set<string>()
    const allParams = [
      ...strat.parameters,
      ...(strat.repeatingGroup?.parameters ?? []),
    ]

    for (const param of allParams) {
      findings.push(...checkParam(strat, param, paramNames, doc.tag957Support))
    }

    // PA-021: parameter names must be unique within a strategy
    const nameCounts = new Map<string, number>()
    for (const p of allParams) {
      if (p.name) nameCounts.set(p.name, (nameCounts.get(p.name) ?? 0) + 1)
    }
    for (const [name, count] of nameCounts) {
      if (count > 1) {
        findings.push({
          ruleId: 'PA-021', severity: 'error',
          message: `Strategy[${strat.name}] has ${count} parameters named "${name}" — parameter names must be unique within a strategy`,
          location: { path: `Strategy[${strat.name}]/Parameter[${name}]` },
        })
      }
    }
  }

  return findings
}
