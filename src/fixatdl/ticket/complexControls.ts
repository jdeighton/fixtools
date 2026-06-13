import type { ParameterType } from '../model'

// ── Clock_t init logic ─────────────────────────────────────────────────────────

const TIME_ONLY: ReadonlySet<ParameterType> = new Set(['UTCTimeOnly_t', 'TZTimeOnly_t'])
const STAMP: ReadonlySet<ParameterType> = new Set(['UTCTimestamp_t', 'TZTimestamp_t'])

/**
 * initValueMode=1 → max(initValue, now).
 * For time-only params: compare HH:MM:SS in UTC.
 * For timestamp params: compare full datetime.
 * Other types (date-only, MonthYear): return initValue unchanged.
 */
export function resolveClockInitValue(
  initValue: string | undefined,
  initValueMode: 0 | 1 | undefined,
  paramType: ParameterType | undefined,
  now: Date,
): string | null {
  if (!initValue) return null
  if (initValueMode !== 1) return initValue

  if (TIME_ONLY.has(paramType as ParameterType)) {
    const initSecs = timeToSecs(initValue)
    const nowSecs = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds()
    return initSecs > nowSecs ? initValue : secsToTime(nowSecs)
  }

  if (STAMP.has(paramType as ParameterType)) {
    const initMs = parseClockTimestamp(initValue)
    if (initMs !== null && initMs > now.getTime()) return initValue
    return toISOTime(now)
  }

  return initValue
}

function timeToSecs(hms: string): number {
  const [h = 0, m = 0, s = 0] = hms.split(':').map(Number)
  return h * 3600 + m * 60 + s
}

function secsToTime(secs: number): string {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`
}

function pad2(n: number): string {
  return String(Math.floor(n)).padStart(2, '0')
}

function parseClockTimestamp(value: string): number | null {
  // Accept YYYYMMDD-HH:MM:SS or YYYY-MM-DDTHH:MM:SS or HH:MM:SS (same-day)
  const dayTime = value.match(/^(\d{4})(\d{2})(\d{2})-(\d{2}:\d{2}:\d{2})$/)
  if (dayTime) {
    const [, y, mo, d, t] = dayTime
    const d2 = new Date(`${y}-${mo}-${d}T${t}Z`)
    return isNaN(d2.getTime()) ? null : d2.getTime()
  }
  const iso = new Date(value)
  return isNaN(iso.getTime()) ? null : iso.getTime()
}

function toISOTime(d: Date): string {
  return d.toISOString().slice(0, 19)
}

// ── Timezone abbreviation ──────────────────────────────────────────────────────

export function tzAbbrev(tz: string, date: Date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'short',
    }).formatToParts(date)
    return parts.find(p => p.type === 'timeZoneName')?.value ?? tz
  } catch {
    return tz
  }
}

// ── EditableDropDownList_t ─────────────────────────────────────────────────────

export function matchListItem(
  text: string,
  items: ReadonlyArray<{ enumID: string; uiRep: string }>,
): string | null {
  if (!text) return null
  const match = items.find(it => it.uiRep.toLowerCase() === text.toLowerCase())
  return match?.enumID ?? null
}

// ── DoubleSpinner_t ────────────────────────────────────────────────────────────

export function doubleSpinnerTooltip(
  policy: string | undefined,
  increment: number,
): string | undefined {
  if (policy === 'LotSize' || policy === 'Tick') {
    return `Increment policy '${policy}' requires market data — using static increment ${increment}`
  }
  return undefined
}
