import type { FixMessage } from '../context/AppContext'

// Detect the field delimiter used in a FIX message string
function detectDelimiter(line: string): string {
  if (line.includes('\x01')) return '\x01'
  if (line.includes('|')) return '|'
  return ','
}

// Parse tag=value pairs from a FIX message body
function parseTags(body: string, delimiter: string): Map<number, string> {
  const tags = new Map<number, string>()
  const parts = body.split(delimiter)
  for (const part of parts) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const tagNum = parseInt(part.slice(0, eq), 10)
    if (isNaN(tagNum)) continue
    tags.set(tagNum, part.slice(eq + 1))
  }
  return tags
}

// Parse a UTC timestamp string (FIX format: YYYYMMDD-HH:MM:SS or YYYYMMDD-HH:MM:SS.mmm)
function parseFixTimestamp(ts: string): Date | null {
  // Format: 20240101-09:30:00.123
  const m = ts.match(/^(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?/)
  if (!m) return null
  return new Date(Date.UTC(
    Number(m[1]), Number(m[2]) - 1, Number(m[3]),
    Number(m[4]), Number(m[5]), Number(m[6]),
    m[7] ? Number(m[7].padEnd(3, '0').slice(0, 3)) : 0
  ))
}

// Parse a log-line timestamp prefix (YYYY-MM-DD HH:MM:SS.mmm)
function parseLogTimestamp(ts: string): Date | null {
  const m = ts.match(/(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?/)
  if (!m) return null
  return new Date(Date.UTC(
    Number(m[1]), Number(m[2]) - 1, Number(m[3]),
    Number(m[4]), Number(m[5]), Number(m[6]),
    m[7] ? Number(m[7].padEnd(3, '0').slice(0, 3)) : 0
  ))
}

interface ParsedLine {
  fixBody: string
  timestamp: Date | null
  session: string | null
}

// Attempt to extract FIX body and metadata from a log line using multiple format strategies
function extractFixBody(line: string): ParsedLine | null {
  // Strategy 1: QuickFIX/J format: "20240101-09:30:00.123 : [SESSION] 8=FIX.4.4|..."
  // or "20240101-09:30:00.123 [SESSION] : 8=FIX..."
  const qfjMatch = line.match(/^(\d{8}-\d{2}:\d{2}:\d{2}(?:\.\d+)?)\s*(?::)?\s*\[([^\]]+)\]\s*(?::)?\s*(8=FIX\..+)/)
  if (qfjMatch) {
    return {
      fixBody: qfjMatch[3],
      timestamp: parseFixTimestamp(qfjMatch[1]),
      session: qfjMatch[2],
    }
  }

  // Strategy 2: Raw FIX with ISO log timestamp prefix: "YYYY-MM-DD HH:MM:SS.mmm 8=FIX..."
  const isoTsMatch = line.match(/^(\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?)\s+(8=FIX\..+)/)
  if (isoTsMatch) {
    return {
      fixBody: isoTsMatch[2],
      timestamp: parseLogTimestamp(isoTsMatch[1]),
      session: null,
    }
  }

  // Strategy 3: Raw FIX with FIX timestamp prefix: "YYYYMMDD-HH:MM:SS.mmm 8=FIX..."
  const fixTsMatch = line.match(/^(\d{8}-\d{2}:\d{2}:\d{2}(?:\.\d+)?)\s+(8=FIX\..+)/)
  if (fixTsMatch) {
    return {
      fixBody: fixTsMatch[2],
      timestamp: parseFixTimestamp(fixTsMatch[1]),
      session: null,
    }
  }

  // Strategy 4: Line starts directly with 8=FIX
  if (line.trimStart().startsWith('8=FIX')) {
    return {
      fixBody: line.trim(),
      timestamp: null,
      session: null,
    }
  }

  // Strategy 5: Fallback — scan for 8=FIX.4 anywhere in line
  const idx = line.indexOf('8=FIX.4')
  if (idx !== -1) {
    return {
      fixBody: line.slice(idx),
      timestamp: null,
      session: null,
    }
  }

  return null
}

export function parseFixMessages(input: string): FixMessage[] {
  const lines = input.split(/\r?\n/).filter(l => l.trim())
  const messages: FixMessage[] = []

  for (const line of lines) {
    const extracted = extractFixBody(line)
    if (!extracted) continue

    const { fixBody, timestamp: lineTimestamp, session: lineSession } = extracted
    const delimiter = detectDelimiter(fixBody)
    const tags = parseTags(fixBody, delimiter)

    if (!tags.has(8) || !tags.has(35)) continue

    const fixVersion = tags.get(8) ?? 'FIX.4.4'
    const sender = tags.get(49) ?? ''
    const target = tags.get(56) ?? ''
    const direction = sender && target ? `${sender} → ${target}` : (sender || target || 'Unknown')
    const session = lineSession ?? (sender && target ? `${sender}→${target}` : direction)

    // Use SendingTime (tag 52) if no log-level timestamp
    let timestamp = lineTimestamp
    if (!timestamp && tags.has(52)) {
      timestamp = parseFixTimestamp(tags.get(52)!)
    }

    messages.push({
      rawLine: line,
      timestamp,
      session,
      direction,
      fixVersion,
      tags,
      sequenceIndex: messages.length,
    })
  }

  return messages
}
