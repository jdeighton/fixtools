// Parse a UTC timestamp string (FIX format: YYYYMMDD-HH:MM:SS or YYYYMMDD-HH:MM:SS.mmm)
export function parseFixTimestamp(ts: string): Date | null {
  const m = ts.match(/^(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?/)
  if (!m) return null
  return new Date(Date.UTC(
    Number(m[1]), Number(m[2]) - 1, Number(m[3]),
    Number(m[4]), Number(m[5]), Number(m[6]),
    m[7] ? Number(m[7].padEnd(3, '0').slice(0, 3)) : 0
  ))
}

// Parse a log-line timestamp prefix (YYYY-MM-DD HH:MM:SS.mmm or YYYY-MM-DDTHH:MM:SS.mmm)
export function parseLogTimestamp(ts: string): Date | null {
  const m = ts.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?/)
  if (!m) return null
  return new Date(Date.UTC(
    Number(m[1]), Number(m[2]) - 1, Number(m[3]),
    Number(m[4]), Number(m[5]), Number(m[6]),
    m[7] ? Number(m[7].padEnd(3, '0').slice(0, 3)) : 0
  ))
}
