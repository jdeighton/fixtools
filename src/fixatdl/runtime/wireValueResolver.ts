import type {
  Strategy, Parameter, Control, ParameterType, ControlType,
} from '../model'
import type { ControlValue, TicketStateMap } from '../ticket/ticketTypes'
import { checkBoxWireValue } from '../ticket/resolveInit'
import { TAG_959_TYPE_CODES } from '../data/tag959TypeCodes'
import { evalCondition } from './stateRuleEngine'

// ── Public types ───────────────────────────────────────────────────────────────

export interface ResolvedField {
  tag: number
  paramName: string
  wireValue: string
  controlId: string | null
}

export interface WireValueOutput {
  fields: ResolvedField[]
  invertOnWireParams: string[]      // param names that have invertOnWire=true
  strategyEditFailures: string[]    // errorMsg for each failing StrategyEdit
}

// ── Main resolver ──────────────────────────────────────────────────────────────

export function resolveWireValues(
  strategy: Strategy,
  controls: Control[],
  ticketState: TicketStateMap,
  getStandardField: (name: string) => string | undefined,
  now: Date = new Date(),
): WireValueOutput {
  const fields: ResolvedField[] = []
  const invertOnWireParams: string[] = []

  for (const param of strategy.parameters) {
    if (param.fixTag == null) continue  // no tag → 957-only param, skip in resolver

    if (param.invertOnWire) {
      invertOnWireParams.push(param.name)
    }

    let wireValue: string | null = null
    let controlId: string | null = null

    // constValue always wins
    if (param.constValue !== undefined) {
      wireValue = resolveConstValue(param.constValue, param, now)
    } else {
      // Find bound controls (may be multiple for RadioButton_t)
      const bound = controls.filter(c => c.parameterRef === param.name)
      if (bound.length === 0) {
        // Parameter not bound to any control — skip
        continue
      }

      const result = resolveFromControls(bound, param, ticketState, controls)
      if (result === null) continue  // uninitialized / {NULL}
      wireValue = result.value
      controlId = result.controlId
    }

    if (wireValue === null) continue

    // Apply type formatting
    wireValue = applyTypeFormatting(wireValue, param, now)
    if (wireValue === null) continue

    fields.push({ tag: param.fixTag, paramName: param.name, wireValue, controlId })
  }

  // For 957-only params (no fixTag), still need them for 957 mode — expose via tag=0
  for (const param of strategy.parameters) {
    if (param.fixTag != null) continue
    if (param.constValue !== undefined) {
      const wireValue = resolveConstValue(param.constValue, param, now)
      if (wireValue !== null) {
        fields.push({ tag: 0, paramName: param.name, wireValue, controlId: null })
      }
      continue
    }
    const bound = controls.filter(c => c.parameterRef === param.name)
    if (bound.length === 0) continue
    const result = resolveFromControls(bound, param, ticketState, controls)
    if (result === null) continue
    let wireValue: string | null = applyTypeFormatting(result.value, param, now)
    if (wireValue === null) continue
    if (param.invertOnWire && !invertOnWireParams.includes(param.name)) {
      invertOnWireParams.push(param.name)
    }
    fields.push({ tag: 0, paramName: param.name, wireValue, controlId: result.controlId })
  }

  const strategyEditFailures = evaluateStrategyEdits(
    strategy, fields, ticketState, getStandardField,
  )

  return { fields, invertOnWireParams, strategyEditFailures }
}

// ── 957 mode accessor ─────────────────────────────────────────────────────────

export interface Tag957Line {
  paramName: string
  typeCode: number
  wireValue: string
  controlId: string | null
}

export function buildTag957Lines(
  strategy: Strategy,
  wireOutput: WireValueOutput,
): Tag957Line[] {
  const fieldMap = new Map(wireOutput.fields.map(f => [f.paramName, f]))
  return strategy.parameters
    .map(p => {
      const f = fieldMap.get(p.name)
      if (!f) return null
      return {
        paramName: p.name,
        typeCode: TAG_959_TYPE_CODES[p.xsiType] ?? 9,
        wireValue: f.wireValue,
        controlId: f.controlId,
      }
    })
    .filter((x): x is Tag957Line => x !== null)
}

// ── Internal: resolve from control(s) ─────────────────────────────────────────

function resolveFromControls(
  bound: Control[],
  param: Parameter,
  ticketState: TicketStateMap,
  allControls: Control[],
): { value: string; controlId: string } | null {
  // RadioButton_t: find checked button in the group
  if (bound.length > 0 && bound[0].xsiType === 'RadioButton_t') {
    return resolveRadioGroup(bound, param, ticketState, allControls)
  }

  // All other control types: use the first (only) bound control
  const ctrl = bound[0]
  const cv = ticketState.get(ctrl.id)

  if (!cv || !cv.initialized || cv.raw === null) return null

  const value = resolveControlValue(ctrl.xsiType, cv.raw, ctrl, param)
  if (value === null) return null
  return { value, controlId: ctrl.id }
}

function resolveRadioGroup(
  bound: Control[],
  param: Parameter,
  ticketState: TicketStateMap,
  allControls: Control[],
): { value: string; controlId: string } | null {
  // Find all RadioButton controls in the same group (may span beyond `bound`)
  const groupName = bound[0].radioGroup ?? bound[0].id
  const groupControls = allControls.filter(
    c => c.xsiType === 'RadioButton_t' && (c.radioGroup ?? c.id) === groupName,
  )
  const checked = groupControls.find(c => ticketState.get(c.id)?.raw === true)
  if (!checked) return null

  const enumPair = param.enumPairs.find(ep => ep.enumID === checked.checkedEnumRef)
  if (!enumPair) return null
  if (enumPair.wireValue === '{NULL}') return null
  return { value: enumPair.wireValue, controlId: checked.id }
}

function resolveControlValue(
  xsiType: ControlType,
  raw: ControlValue['raw'],
  control: Control,
  param: Parameter,
): string | null {
  switch (xsiType) {
    case 'CheckBox_t': {
      if (typeof raw !== 'boolean') return null
      // Handle deprecated trueWireValue/falseWireValue with {NULL} = omit
      if (raw && param.trueWireValue) {
        return param.trueWireValue === '{NULL}' ? null : param.trueWireValue
      }
      if (!raw && param.falseWireValue) {
        return param.falseWireValue === '{NULL}' ? null : param.falseWireValue
      }
      return checkBoxWireValue(raw, control, param)
    }

    case 'DropDownList_t':
    case 'RadioButtonList_t':
    case 'Slider_t': {
      if (typeof raw !== 'string') return null
      const ep = param.enumPairs.find(e => e.enumID === raw)
      if (!ep) return null
      return ep.wireValue === '{NULL}' ? null : ep.wireValue
    }

    case 'CheckBoxList_t':
    case 'MultiSelectList_t': {
      const selected = Array.isArray(raw) ? raw : typeof raw === 'string' ? [raw] : []
      const wireVals = selected
        .map(enumID => param.enumPairs.find(e => e.enumID === enumID)?.wireValue)
        .filter((v): v is string => v !== undefined && v !== '{NULL}')
      return wireVals.length === 0 ? null : wireVals.join(' ')
    }

    case 'TextField_t':
    case 'EditableDropDownList_t':
    case 'Duration_t':
    case 'HiddenField_t':
      return typeof raw === 'string' ? raw || null : null

    case 'SingleSpinner_t':
    case 'DoubleSpinner_t':
      if (typeof raw === 'number') return String(raw)
      if (typeof raw === 'string' && raw !== '') return raw
      return null

    case 'Clock_t':
      // Clock_t stores datetime-local / time / date strings
      return typeof raw === 'string' ? raw || null : null

    case 'Label_t':
      return null  // no wire value

    default:
      return typeof raw === 'string' ? raw || null : null
  }
}

// ── Internal: constValue resolution ───────────────────────────────────────────

function resolveConstValue(constValue: string, param: Parameter, now: Date): string | null {
  if (
    (param.xsiType === 'UTCTimestamp_t' || param.xsiType === 'TZTimestamp_t') &&
    param.localMktTz
  ) {
    // constValue is HH:MM:SS time-of-day in localMktTz; combine with today's date in that tz → UTC
    return timeOfDayInTzToUTC(constValue, param.localMktTz, now)
  }
  return constValue
}

// ── Internal: type formatting ──────────────────────────────────────────────────

function applyTypeFormatting(raw: string, param: Parameter, _now: Date): string | null {
  let value = raw

  // Percentage multiplyBy100
  if (param.xsiType === 'Percentage_t' && param.multiplyBy100) {
    const n = Number(value)
    if (!isNaN(n)) value = String(n * 100)
  }

  // Precision rounding for float-like types
  if (param.precision !== undefined && isFloatType(param.xsiType)) {
    const n = Number(value)
    if (!isNaN(n)) value = n.toFixed(param.precision)
  }

  // UTCTimestamp_t / TZTimestamp_t from Clock_t with localMktTz
  if (
    (param.xsiType === 'UTCTimestamp_t' || param.xsiType === 'TZTimestamp_t') &&
    param.localMktTz &&
    value.includes('T')
  ) {
    value = localDatetimeToUTC(value, param.localMktTz)
  } else if (
    (param.xsiType === 'UTCTimestamp_t' || param.xsiType === 'TZTimestamp_t') &&
    value.includes('T')
  ) {
    // Already UTC — just reformat
    value = reformatDatetime(value)
  }

  // Char_t → single character
  if (param.xsiType === 'Char_t' && value.length > 1) {
    value = value[0]
  }

  return value || null
}

function isFloatType(xsiType: ParameterType): boolean {
  return ['Float_t', 'Price_t', 'PriceOffset_t', 'Qty_t', 'Amt_t', 'Percentage_t'].includes(xsiType)
}

// ── Internal: UTC timestamp helpers ───────────────────────────────────────────

// Convert "HH:MM:SS" time-of-day in a given TZ on `now`'s date → "YYYYMMDD-HH:MM:SS" UTC
export function timeOfDayInTzToUTC(timeOfDay: string, tz: string, now: Date): string {
  // Get today's date (YYYY-MM-DD) in the given timezone
  const todayParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)  // en-CA gives YYYY-MM-DD

  return localDatetimeToUTC(`${todayParts}T${timeOfDay}`, tz)
}

// Convert "YYYY-MM-DDTHH:MM:SS" local time in `tz` → "YYYYMMDD-HH:MM:SS" UTC
export function localDatetimeToUTC(localDatetime: string, tz: string): string {
  // Parse as if it were UTC to get a reference point
  const asUtc = new Date(localDatetime + 'Z')

  // Format that UTC instant as local time in tz (what would the clocks show?)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(asUtc)

  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
  const formattedLocal = `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`

  // Offset: localDatetime is what we WANT the clocks to show
  // formattedLocal is what the clocks show for asUtc
  // difference tells us how far off we are
  const localMs = new Date(localDatetime + 'Z').getTime()
  const formattedMs = new Date(formattedLocal + 'Z').getTime()
  const trueUtcMs = asUtc.getTime() + (localMs - formattedMs)

  const utc = new Date(trueUtcMs)
  const y = utc.getUTCFullYear()
  const mo = pad(utc.getUTCMonth() + 1)
  const d = pad(utc.getUTCDate())
  const h = pad(utc.getUTCHours())
  const mi = pad(utc.getUTCMinutes())
  const s = pad(utc.getUTCSeconds())
  return `${y}${mo}${d}-${h}:${mi}:${s}`
}

function reformatDatetime(dt: string): string {
  // "YYYY-MM-DDTHH:MM:SS" → "YYYYMMDD-HH:MM:SS"
  const [datePart, timePart] = dt.split('T')
  if (!datePart || !timePart) return dt
  return `${datePart.replace(/-/g, '')}-${timePart.slice(0, 8)}`
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

// ── Internal: StrategyEdit evaluation ────────────────────────────────────────

function evaluateStrategyEdits(
  strategy: Strategy,
  resolvedFields: ResolvedField[],
  ticketState: TicketStateMap,
  getStandardField: (name: string) => string | undefined,
): string[] {
  if (strategy.strategyEdits.length === 0) return []

  // Build a combined lookup: control IDs, param names → ControlValue for evalCondition
  const lookup = new Map<string, ControlValue>(ticketState)
  for (const f of resolvedFields) {
    // Expose resolved wire values under param name (overrides if already present)
    lookup.set(f.paramName, { raw: f.wireValue, initialized: true })
  }
  // Expose standard fields under FIX_<fieldName> form AND plain name
  const stdNames = [
    'ClOrdID', 'Symbol', 'Side', 'OrderQty', 'OrdType',
    'Price', 'TimeInForce', 'TransactTime',
  ]
  for (const name of stdNames) {
    const val = getStandardField(name)
    if (val !== undefined) {
      lookup.set(`FIX_${name}`, { raw: val, initialized: true })
      lookup.set(name, { raw: val, initialized: true })
    }
  }

  const failures: string[] = []
  for (const se of strategy.strategyEdits) {
    try {
      if (!evalCondition(se.condition, lookup)) {
        failures.push(se.errorMsg)
      }
    } catch {
      // Unresolvable condition — treat as failure
      failures.push(se.errorMsg)
    }
  }
  return failures
}
