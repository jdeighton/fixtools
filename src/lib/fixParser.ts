import type { FixMessage } from '../context/AppContext'
import { parseFixTimestamp, parseLogTimestamp } from './timestamps'

// Detect the field delimiter used in a FIX message string
function detectDelimiter(line: string): string {
  if (line.includes('\x01')) return '\x01'
  if (line.includes('|')) return '|'
  return ','
}

interface GroupDef {
  firstDelimTag: number
  memberTags: Set<number>
}

// Hardcoded lookup: NoX tag → group structure for FIX 4.2 and 4.4.
// See docs/adr/0001-fix-repeating-group-lookup.md for the rationale.
const GROUP_DEFS = new Map<number, GroupDef>([
  // FIX 4.2
  [78,  { firstDelimTag: 79,  memberTags: new Set([79, 80, 81, 92, 161, 208, 209, 366]) }],  // NoAllocs
  [136, { firstDelimTag: 137, memberTags: new Set([137, 138, 139]) }],                        // NoMiscFees
  [146, { firstDelimTag: 55,  memberTags: new Set([22, 48, 55, 65, 167, 200, 207]) }],        // NoRelatedSym
  [232, { firstDelimTag: 233, memberTags: new Set([233, 234]) }],                             // NoStipulations
  [267, { firstDelimTag: 269, memberTags: new Set([269]) }],                                  // NoMDEntryTypes
  [268, { firstDelimTag: 269, memberTags: new Set([269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 282, 283, 284, 285, 286, 287, 288, 289, 290]) }], // NoMDEntries
  [382, { firstDelimTag: 375, memberTags: new Set([337, 375, 437, 438]) }],                   // NoContraBrokers
  [386, { firstDelimTag: 336, memberTags: new Set([336, 625]) }],                             // NoTradingSessions
  // FIX 4.4
  [453, { firstDelimTag: 448, memberTags: new Set([447, 448, 452]) }],                        // NoPartyIDs
  [454, { firstDelimTag: 455, memberTags: new Set([455, 456]) }],                             // NoSecurityAltID
  [539, { firstDelimTag: 524, memberTags: new Set([524, 525, 538]) }],                        // NoNestedPartyIDs
  [555, { firstDelimTag: 600, memberTags: new Set([556, 564, 565, 566, 587, 588, 600, 601, 602, 603, 606, 607, 608, 609, 610, 611, 612, 614, 615, 616, 617, 621, 624, 637, 675, 685, 687]) }], // NoLegs
  [711, { firstDelimTag: 311, memberTags: new Set([305, 308, 309, 310, 311, 312, 313, 315, 316, 317, 318]) }], // NoUnderlyings
])

interface ParsedTags {
  tags: Map<number, string>
  groups: Map<number, Record<number, string>[]>
}

// Parse tag=value pairs from a FIX message body, extracting repeating groups
function parseTags(body: string, delimiter: string): ParsedTags {
  const pairs: Array<[number, string]> = []
  for (const part of body.split(delimiter)) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const tagNum = parseInt(part.slice(0, eq), 10)
    if (isNaN(tagNum)) continue
    pairs.push([tagNum, part.slice(eq + 1)])
  }

  const tags = new Map<number, string>()
  const groups = new Map<number, Record<number, string>[]>()
  let i = 0

  while (i < pairs.length) {
    const [tag, value] = pairs[i]
    const def = GROUP_DEFS.get(tag)

    if (def && parseInt(value, 10) > 0) {
      tags.set(tag, value)
      i++

      const instances: Record<number, string>[] = []
      let current: Record<number, string> | null = null

      while (i < pairs.length) {
        const [t, v] = pairs[i]
        if (t === def.firstDelimTag) {
          if (current !== null) instances.push(current)
          current = { [t]: v }
          i++
        } else if (def.memberTags.has(t)) {
          if (current !== null) current[t] = v
          i++
        } else {
          break
        }
      }
      if (current !== null) instances.push(current)
      if (instances.length > 0) groups.set(tag, instances)
    } else {
      tags.set(tag, value)
      i++
    }
  }

  return { tags, groups }
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
    const { tags, groups } = parseTags(fixBody, delimiter)

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
      groups,
      sequenceIndex: messages.length,
    })
  }

  return messages
}
