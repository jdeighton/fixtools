import type { FixMessage } from '../context/AppContext'
import { fieldValueDescription, msgTypeDescription } from '../data/fixDictionary'

export interface SummaryPart {
  text: string
  color?: 'buy' | 'sell'
}

function tag(msg: FixMessage, num: number): string {
  return msg.tags.get(num) ?? ''
}

function sideColor(side: string): 'buy' | 'sell' | undefined {
  if (side === '1') return 'buy'
  if (side === '2') return 'sell'
  return undefined
}

// Returns parts so callers can render buy/sell color inline
export function buildSummaryParts(msg: FixMessage): SummaryPart[] {
  const msgType = tag(msg, 35)
  const side = tag(msg, 54)
  const symbol = tag(msg, 55)
  const qty = tag(msg, 38) || tag(msg, 14) // OrderQty or CumQty
  const price = tag(msg, 44)
  const ordType = tag(msg, 40)
  const tif = tag(msg, 59)
  const clOrdId = tag(msg, 11)
  const testReqId = tag(msg, 112)

  const ordTypeDesc = ordType ? (fieldValueDescription(40, ordType) ?? ordType) : ''
  const tifDesc = tif ? (fieldValueDescription(59, tif) ?? '') : ''
  const sideLabel = side === '1' ? 'Buy' : side === '2' ? 'Sell' : side ? (fieldValueDescription(54, side) ?? side) : ''

  switch (msgType) {
    case 'D': { // New Order Single
      const parts: SummaryPart[] = []
      if (sideLabel) parts.push({ text: sideLabel, color: sideColor(side) })
      const detail = [qty, symbol, price ? `@ ${price}` : '', ordTypeDesc, tifDesc].filter(Boolean).join(' ')
      if (detail) parts.push({ text: (parts.length ? ' ' : '') + detail })
      return parts.length ? parts : [{ text: `New Order — ClOrdID ${clOrdId}` }]
    }

    case '8': { // Execution Report
      const execType = tag(msg, 150)
      const ordStatus = tag(msg, 39)
      const cumQty = tag(msg, 14)
      const leavesQty = tag(msg, 151)
      const execTypeDesc = execType ? (fieldValueDescription(150, execType) ?? execType) : ''
      const ordStatusDesc = ordStatus ? (fieldValueDescription(39, ordStatus) ?? ordStatus) : ''
      const parts: SummaryPart[] = []
      if (sideLabel) parts.push({ text: sideLabel + ' ', color: sideColor(side) })
      let detail = execTypeDesc || ordStatusDesc
      if (cumQty || qty) detail += ` ${cumQty || qty}`
      if (symbol) detail += ` ${symbol}`
      if (price) detail += ` @ ${price}`
      if (ordStatusDesc && ordStatusDesc !== detail.trim()) detail += ` — ${ordStatusDesc}`
      if (leavesQty && leavesQty !== '0') detail += ` (leaves ${leavesQty})`
      parts.push({ text: detail.trim() || `ExecReport ${clOrdId}` })
      return parts
    }

    case 'F': // Order Cancel Request
      return [{ text: `Cancel ClOrdID ${clOrdId}${symbol ? ` — ${symbol}` : ''}` }]

    case 'G': // Order Cancel/Replace
      return [{ text: `Cancel/Replace ClOrdID ${clOrdId}${symbol ? ` — ${symbol}` : ''}` }]

    case '0': // Heartbeat
      return [{ text: testReqId ? `Heartbeat — TestReqID: ${testReqId}` : 'Heartbeat' }]

    case '1': // Test Request
      return [{ text: `Test Request${testReqId ? ` — TestReqID: ${testReqId}` : ''}` }]

    case 'A': // Logon
      return [{ text: 'Logon' }]

    case '5': // Logout
      return [{ text: `Logout${tag(msg, 58) ? ` — ${tag(msg, 58)}` : ''}` }]

    case '2': // Resend Request
      return [{ text: `Resend Request ${tag(msg, 7)}–${tag(msg, 16)}` }]

    case '3': // Reject
      return [{ text: `Reject — ${tag(msg, 58) || tag(msg, 45) || ''}` }]

    case '4': // Sequence Reset
      return [{ text: `Sequence Reset → ${tag(msg, 36)}` }]

    case 'V': // Market Data Request
      return [{ text: `Market Data Request — ${tag(msg, 262)}` }]

    case 'W': // Market Data Snapshot
      return [{ text: `Market Data Snapshot — ${symbol}` }]

    case 'X': // Market Data Incremental
      return [{ text: `Market Data Incremental Refresh` }]

    default:
      return [{ text: `${msgTypeDescription(msgType)} (${msgType})` }]
  }
}

// Plain text version for filter/display purposes
export function buildSummaryText(msg: FixMessage): string {
  return buildSummaryParts(msg).map(p => p.text).join('')
}
