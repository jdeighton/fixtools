// Generates sample FIX 4.2 log files demonstrating futures trading scenarios.
// Run: node scripts/generateSamples.mjs
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')
const outDir = resolve(root, 'samples')
mkdirSync(outDir, { recursive: true })

const SOH = '\x01'

// ── FIX wire helpers ────────────────────────────────────────────────────────

function bodyLength(pairs) {
  return pairs
    .filter(([t]) => t !== 8 && t !== 9 && t !== 10)
    .reduce((n, [t, v]) => n + `${t}=${v}\x01`.length, 0)
}

function checksum(pairs) {
  let s = 0
  for (const [t, v] of pairs) {
    if (t === 10) break
    for (const c of `${t}=${v}\x01`) s += c.charCodeAt(0)
  }
  return s % 256
}

function buildFix(version, body) {
  const bl = bodyLength([[8, version], [9, '0'], ...body, [10, '000']])
  const msg = [[8, version], [9, String(bl)], ...body]
  const cs = checksum([...msg, [10, '000']])
  return [...msg, [10, cs.toString().padStart(3, '0')]]
    .map(([t, v]) => `${t}=${v}`).join(SOH) + SOH
}

function pipe(msg) { return msg.slice(0, -1).replaceAll(SOH, '|') }
function logLine(ts, dir, msg) { return `${ts} [FixSession] (DEBUG) ${dir === 'out' ? 'Sending' : 'Receiving'} ${pipe(msg)}` }

// "2026-06-05 09:30:00.102" → "20260605-09:30:00.102"
function fts(ts) { const [d, t] = ts.split(' '); return d.replace(/-/g, '') + '-' + t }

// ── Message builders ─────────────────────────────────────────────────────────

function logon(sender, target, seq, ts) {
  return buildFix('FIX.4.2', [
    [35, 'A'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [98, '0'], [108, '30'],
  ])
}

function logout(sender, target, seq, ts, text) {
  return buildFix('FIX.4.2', [
    [35, '5'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    ...(text ? [[58, text]] : []),
  ])
}

function heartbeat(sender, target, seq, ts, testReqId) {
  return buildFix('FIX.4.2', [
    [35, '0'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    ...(testReqId ? [[112, testReqId]] : []),
  ])
}

function testRequest(sender, target, seq, ts, testReqId) {
  return buildFix('FIX.4.2', [
    [35, '1'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [112, testReqId],
  ])
}

function newOrder({ sender, target, seq, ts, clOrdId, account, symbol, maturity, exchange, side, qty, ordType, price, tif = '0' }) {
  return buildFix('FIX.4.2', [
    [35, 'D'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [11, clOrdId], [1, account], [21, '1'],
    [55, symbol], [167, 'FUT'], [200, maturity], [207, exchange],
    [54, side], [38, String(qty)], [40, ordType],
    ...(price !== undefined ? [[44, String(price)]] : []),
    [59, tif], [60, fts(ts)],
  ])
}

function execReport({ sender, target, seq, ts, orderId, clOrdId, origClOrdId, execId, execTransType = '0', execType, ordStatus,
  symbol, maturity, exchange, side, qty, ordType, price, lastQty, lastPx, cumQty, leavesQty, avgPx, text, transactTs }) {
  return buildFix('FIX.4.2', [
    [35, '8'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [37, orderId], [11, clOrdId], ...(origClOrdId ? [[41, origClOrdId]] : []),
    [17, execId], [20, execTransType], [150, execType], [39, ordStatus],
    [55, symbol], [167, 'FUT'], [200, maturity], [207, exchange],
    [54, side], [38, String(qty)], [40, ordType],
    ...(price !== undefined ? [[44, String(price)]] : []),
    [32, String(lastQty ?? 0)], [31, String(lastPx ?? '0.00')],
    [14, String(cumQty)], [151, String(leavesQty)], [6, String(avgPx)],
    ...(text ? [[58, text]] : []),
    [60, fts(transactTs ?? ts)],
  ])
}

function cancelRequest({ sender, target, seq, ts, clOrdId, origClOrdId, orderId, account, symbol, maturity, exchange, side, qty }) {
  return buildFix('FIX.4.2', [
    [35, 'F'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [11, clOrdId], [41, origClOrdId], [37, orderId], [1, account],
    [55, symbol], [167, 'FUT'], [200, maturity], [207, exchange],
    [54, side], [38, String(qty)], [60, fts(ts)],
  ])
}

function cancelReplaceRequest({ sender, target, seq, ts, clOrdId, origClOrdId, orderId, account, symbol, maturity, exchange, side, qty, ordType, price }) {
  return buildFix('FIX.4.2', [
    [35, 'G'], [49, sender], [56, target], [34, seq], [52, fts(ts)],
    [11, clOrdId], [41, origClOrdId], [37, orderId], [1, account], [21, '1'],
    [55, symbol], [167, 'FUT'], [200, maturity], [207, exchange],
    [54, side], [38, String(qty)], [40, ordType],
    ...(price !== undefined ? [[44, String(price)]] : []),
    [60, fts(ts)],
  ])
}

// ── Scenario builder helper ───────────────────────────────────────────────────

function scenario(name) {
  const lines = []
  const add = (ts, dir, msg) => lines.push(logLine(ts, dir, msg))
  const write = () => {
    writeFileSync(resolve(outDir, name), lines.join('\n') + '\n', 'utf8')
    console.log(`Written samples/${name} (${lines.length} messages)`)
  }
  return { add, write }
}

// ═══════════════════════════════════════════════════════════════════════════════
// File 1: ESU6 E-mini S&P 500 — buy 2 contracts, partial fill then fill
// Prices circa June 2026
// ═══════════════════════════════════════════════════════════════════════════════

{
  const { add, write } = scenario('es_buy_partial_fill.txt')
  const S = 'TRADER01', T = 'CME_GW'
  const SYM = { symbol: 'ESU6', maturity: '202609', exchange: 'CME' }
  const ACCT = 'ACCT-FUT-001'

  add('2026-06-05 09:29:58.142', 'out', logon(S, T, 1, '2026-06-05 09:29:58.142'))
  add('2026-06-05 09:29:58.391', 'in',  logon(T, S, 1, '2026-06-05 09:29:58.391'))

  // BUY 2 ESU6 @ 5824.25 LIMIT Day
  const clOrdId = 'ES-20260605-BUY-001'
  add('2026-06-05 09:30:00.102', 'out', newOrder({
    sender: S, target: T, seq: 2, ts: '2026-06-05 09:30:00.102',
    clOrdId, account: ACCT, ...SYM, side: '1', qty: 2, ordType: '2', price: '5824.25',
  }))

  // Acknowledged
  const orderId = 'CME-847291000'
  add('2026-06-05 09:30:00.215', 'in', execReport({
    sender: T, target: S, seq: 2, ts: '2026-06-05 09:30:00.215',
    orderId, clOrdId, execId: 'CME-EX-10010001', execType: '0', ordStatus: '0',
    ...SYM, side: '1', qty: 2, ordType: '2', price: '5824.25',
    cumQty: 0, leavesQty: 2, avgPx: '0.00',
    transactTs: '2026-06-05 09:30:00.102',
  }))

  // Partial fill: 1 @ 5824.25
  add('2026-06-05 09:30:00.847', 'in', execReport({
    sender: T, target: S, seq: 3, ts: '2026-06-05 09:30:00.847',
    orderId, clOrdId, execId: 'CME-EX-10010002', execType: '1', ordStatus: '1',
    ...SYM, side: '1', qty: 2, ordType: '2', price: '5824.25',
    lastQty: 1, lastPx: '5824.25', cumQty: 1, leavesQty: 1, avgPx: '5824.25',
  }))

  // Fill remaining 1 @ 5824.50 (traded through limit)
  add('2026-06-05 09:30:01.203', 'in', execReport({
    sender: T, target: S, seq: 4, ts: '2026-06-05 09:30:01.203',
    orderId, clOrdId, execId: 'CME-EX-10010003', execType: '2', ordStatus: '2',
    ...SYM, side: '1', qty: 2, ordType: '2', price: '5824.25',
    lastQty: 1, lastPx: '5824.50', cumQty: 2, leavesQty: 0, avgPx: '5824.375',
  }))

  // Heartbeats
  add('2026-06-05 09:31:00.000', 'out', heartbeat(S, T, 3, '2026-06-05 09:31:00.000'))
  add('2026-06-05 09:31:00.081', 'in',  heartbeat(T, S, 5, '2026-06-05 09:31:00.081'))

  // Logout
  add('2026-06-05 09:45:00.000', 'out', logout(S, T, 4, '2026-06-05 09:45:00.000', 'Session complete'))
  add('2026-06-05 09:45:00.109', 'in',  logout(T, S, 6, '2026-06-05 09:45:00.109'))

  write()
}

// ═══════════════════════════════════════════════════════════════════════════════
// File 2: CLU6 WTI Crude Oil — sell 5 contracts, partial fill 2, cancel remaining 3
// ═══════════════════════════════════════════════════════════════════════════════

{
  const { add, write } = scenario('cl_sell_partial_cancel.txt')
  const S = 'TRADER01', T = 'NYMEX_GW'
  const SYM = { symbol: 'CLU6', maturity: '202609', exchange: 'NYMEX' }
  const ACCT = 'ACCT-FUT-001'

  add('2026-06-05 09:29:58.142', 'out', logon(S, T, 1, '2026-06-05 09:29:58.142'))
  add('2026-06-05 09:29:58.420', 'in',  logon(T, S, 1, '2026-06-05 09:29:58.420'))

  // SELL 5 CLU6 @ 67.85 LIMIT Day
  const clOrdId1 = 'CL-20260605-SELL-001'
  add('2026-06-05 09:32:15.440', 'out', newOrder({
    sender: S, target: T, seq: 2, ts: '2026-06-05 09:32:15.440',
    clOrdId: clOrdId1, account: ACCT, ...SYM, side: '2', qty: 5, ordType: '2', price: '67.85',
  }))

  // Acknowledged
  const orderId = 'NYMEX-293817000'
  add('2026-06-05 09:32:15.612', 'in', execReport({
    sender: T, target: S, seq: 2, ts: '2026-06-05 09:32:15.612',
    orderId, clOrdId: clOrdId1, execId: 'NYM-EX-20391001', execType: '0', ordStatus: '0',
    ...SYM, side: '2', qty: 5, ordType: '2', price: '67.85',
    cumQty: 0, leavesQty: 5, avgPx: '0.00',
    transactTs: '2026-06-05 09:32:15.440',
  }))

  // Partial fill: 2 contracts @ 67.85
  add('2026-06-05 09:32:16.089', 'in', execReport({
    sender: T, target: S, seq: 3, ts: '2026-06-05 09:32:16.089',
    orderId, clOrdId: clOrdId1, execId: 'NYM-EX-20391002', execType: '1', ordStatus: '1',
    ...SYM, side: '2', qty: 5, ordType: '2', price: '67.85',
    lastQty: 2, lastPx: '67.85', cumQty: 2, leavesQty: 3, avgPx: '67.85',
  }))

  // Heartbeat / test request exchange
  add('2026-06-05 09:32:30.000', 'in',  testRequest(T, S, 4, '2026-06-05 09:32:30.000', 'TEST-001'))
  add('2026-06-05 09:32:30.045', 'out', heartbeat(S, T, 3, '2026-06-05 09:32:30.045', 'TEST-001'))

  // Cancel remaining 3
  const clOrdId1c = 'CL-20260605-SELL-001-CXL'
  add('2026-06-05 09:32:45.200', 'out', cancelRequest({
    sender: S, target: T, seq: 4, ts: '2026-06-05 09:32:45.200',
    clOrdId: clOrdId1c, origClOrdId: clOrdId1, orderId, account: ACCT,
    ...SYM, side: '2', qty: 3,
  }))

  // Canceled
  add('2026-06-05 09:32:45.389', 'in', execReport({
    sender: T, target: S, seq: 5, ts: '2026-06-05 09:32:45.389',
    orderId, clOrdId: clOrdId1c, origClOrdId: clOrdId1, execId: 'NYM-EX-20391003',
    execType: '4', ordStatus: '4',
    ...SYM, side: '2', qty: 5, ordType: '2', price: '67.85',
    cumQty: 2, leavesQty: 0, avgPx: '67.85',
    text: 'Cancelled on client request',
  }))

  add('2026-06-05 09:45:00.000', 'out', logout(S, T, 5, '2026-06-05 09:45:00.000', 'Session complete'))
  add('2026-06-05 09:45:00.114', 'in',  logout(T, S, 6, '2026-06-05 09:45:00.114'))

  write()
}

// ═══════════════════════════════════════════════════════════════════════════════
// File 3: GCU6 Gold — buy 3 contracts, price amended, fill
// ═══════════════════════════════════════════════════════════════════════════════

{
  const { add, write } = scenario('gc_buy_amend_fill.txt')
  const S = 'TRADER01', T = 'COMEX_GW'
  const SYM = { symbol: 'GCU6', maturity: '202609', exchange: 'COMEX' }
  const ACCT = 'ACCT-FUT-001'

  add('2026-06-05 09:29:58.142', 'out', logon(S, T, 1, '2026-06-05 09:29:58.142'))
  add('2026-06-05 09:29:58.408', 'in',  logon(T, S, 1, '2026-06-05 09:29:58.408'))

  // BUY 3 GCU6 @ 3248.60 LIMIT Day
  const clOrdId1 = 'GC-20260605-BUY-001'
  add('2026-06-05 09:33:42.115', 'out', newOrder({
    sender: S, target: T, seq: 2, ts: '2026-06-05 09:33:42.115',
    clOrdId: clOrdId1, account: ACCT, ...SYM, side: '1', qty: 3, ordType: '2', price: '3248.60',
  }))

  // Acknowledged
  const orderId = 'COMEX-558291000'
  add('2026-06-05 09:33:42.280', 'in', execReport({
    sender: T, target: S, seq: 2, ts: '2026-06-05 09:33:42.280',
    orderId, clOrdId: clOrdId1, execId: 'CMX-EX-30182001', execType: '0', ordStatus: '0',
    ...SYM, side: '1', qty: 3, ordType: '2', price: '3248.60',
    cumQty: 0, leavesQty: 3, avgPx: '0.00',
    transactTs: '2026-06-05 09:33:42.115',
  }))

  // Amend price to 3251.20 (market moved away, willing to pay more)
  const clOrdId2 = 'GC-20260605-BUY-001-AMD'
  add('2026-06-05 09:34:10.500', 'out', cancelReplaceRequest({
    sender: S, target: T, seq: 3, ts: '2026-06-05 09:34:10.500',
    clOrdId: clOrdId2, origClOrdId: clOrdId1, orderId, account: ACCT,
    ...SYM, side: '1', qty: 3, ordType: '2', price: '3251.20',
  }))

  // Replaced — exchange confirms new price
  add('2026-06-05 09:34:10.692', 'in', execReport({
    sender: T, target: S, seq: 3, ts: '2026-06-05 09:34:10.692',
    orderId, clOrdId: clOrdId2, origClOrdId: clOrdId1, execId: 'CMX-EX-30182002',
    execType: '5', ordStatus: '5',
    ...SYM, side: '1', qty: 3, ordType: '2', price: '3251.20',
    cumQty: 0, leavesQty: 3, avgPx: '0.00',
    transactTs: '2026-06-05 09:34:10.500',
  }))

  // Fill all 3 @ 3251.20
  add('2026-06-05 09:34:11.044', 'in', execReport({
    sender: T, target: S, seq: 4, ts: '2026-06-05 09:34:11.044',
    orderId, clOrdId: clOrdId2, execId: 'CMX-EX-30182003', execType: '2', ordStatus: '2',
    ...SYM, side: '1', qty: 3, ordType: '2', price: '3251.20',
    lastQty: 3, lastPx: '3251.20', cumQty: 3, leavesQty: 0, avgPx: '3251.20',
  }))

  add('2026-06-05 09:45:00.000', 'out', logout(S, T, 4, '2026-06-05 09:45:00.000', 'Session complete'))
  add('2026-06-05 09:45:00.108', 'in',  logout(T, S, 5, '2026-06-05 09:45:00.108'))

  write()
}

// ═══════════════════════════════════════════════════════════════════════════════
// File 4: Mixed session — ESU6, NQU6 and CLU6 orders across a trading session
// Demonstrates a realistic intraday flow with multiple instruments
// ═══════════════════════════════════════════════════════════════════════════════

{
  const { add, write } = scenario('mixed_session.txt')
  const S = 'TRADER01', T = 'CME_GW'
  const ACCT = 'ACCT-FUT-001'
  const ES = { symbol: 'ESU6', maturity: '202609', exchange: 'CME' }
  const NQ = { symbol: 'NQU6', maturity: '202609', exchange: 'CME' }
  const CL = { symbol: 'CLU6', maturity: '202609', exchange: 'CME' }
  let sSeq = 1, tSeq = 1
  const sNext = () => sSeq++
  const tNext = () => tSeq++

  // ── Session open
  add('2026-06-05 09:29:58.142', 'out', logon(S, T, sNext(), '2026-06-05 09:29:58.142'))
  add('2026-06-05 09:29:58.391', 'in',  logon(T, S, tNext(), '2026-06-05 09:29:58.391'))

  // ── 09:30 — ES BUY 1 @ market (OrdType=1)
  const esOrdId1 = 'ES-20260605-001'
  add('2026-06-05 09:30:00.050', 'out', newOrder({
    sender: S, target: T, seq: sNext(), ts: '2026-06-05 09:30:00.050',
    clOrdId: esOrdId1, account: ACCT, ...ES, side: '1', qty: 1, ordType: '1',
  }))
  const esExchId1 = 'CME-ES-9001000'
  add('2026-06-05 09:30:00.183', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:30:00.183',
    orderId: esExchId1, clOrdId: esOrdId1, execId: 'EX-9001001',
    execType: '0', ordStatus: '0',
    ...ES, side: '1', qty: 1, ordType: '1',
    cumQty: 0, leavesQty: 1, avgPx: '0.00',
    transactTs: '2026-06-05 09:30:00.050',
  }))
  // Market order fills immediately
  add('2026-06-05 09:30:00.195', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:30:00.195',
    orderId: esExchId1, clOrdId: esOrdId1, execId: 'EX-9001002',
    execType: '2', ordStatus: '2',
    ...ES, side: '1', qty: 1, ordType: '1',
    lastQty: 1, lastPx: '5831.00', cumQty: 1, leavesQty: 0, avgPx: '5831.00',
  }))

  // ── 09:31 — NQ BUY 1 @ 20882.50 LIMIT
  const nqOrdId1 = 'NQ-20260605-001'
  add('2026-06-05 09:31:15.330', 'out', newOrder({
    sender: S, target: T, seq: sNext(), ts: '2026-06-05 09:31:15.330',
    clOrdId: nqOrdId1, account: ACCT, ...NQ, side: '1', qty: 1, ordType: '2', price: '20882.50',
  }))
  const nqExchId1 = 'CME-NQ-9002000'
  add('2026-06-05 09:31:15.498', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:31:15.498',
    orderId: nqExchId1, clOrdId: nqOrdId1, execId: 'EX-9002001',
    execType: '0', ordStatus: '0',
    ...NQ, side: '1', qty: 1, ordType: '2', price: '20882.50',
    cumQty: 0, leavesQty: 1, avgPx: '0.00',
    transactTs: '2026-06-05 09:31:15.330',
  }))

  // ── 09:32 — CL SELL 3 @ 67.85 LIMIT
  const clOrdId1 = 'CL-20260605-001'
  add('2026-06-05 09:32:05.780', 'out', newOrder({
    sender: S, target: T, seq: sNext(), ts: '2026-06-05 09:32:05.780',
    clOrdId: clOrdId1, account: ACCT, ...CL, side: '2', qty: 3, ordType: '2', price: '67.85',
  }))
  const clExchId1 = 'CME-CL-9003000'
  add('2026-06-05 09:32:05.941', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:32:05.941',
    orderId: clExchId1, clOrdId: clOrdId1, execId: 'EX-9003001',
    execType: '0', ordStatus: '0',
    ...CL, side: '2', qty: 3, ordType: '2', price: '67.85',
    cumQty: 0, leavesQty: 3, avgPx: '0.00',
    transactTs: '2026-06-05 09:32:05.780',
  }))

  // ── 09:33 — NQ amends price up to 20886.75
  const nqOrdId1a = 'NQ-20260605-001-AMD'
  add('2026-06-05 09:33:00.100', 'out', cancelReplaceRequest({
    sender: S, target: T, seq: sNext(), ts: '2026-06-05 09:33:00.100',
    clOrdId: nqOrdId1a, origClOrdId: nqOrdId1, orderId: nqExchId1, account: ACCT,
    ...NQ, side: '1', qty: 1, ordType: '2', price: '20886.75',
  }))
  add('2026-06-05 09:33:00.274', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:33:00.274',
    orderId: nqExchId1, clOrdId: nqOrdId1a, origClOrdId: nqOrdId1, execId: 'EX-9002002',
    execType: '5', ordStatus: '5',
    ...NQ, side: '1', qty: 1, ordType: '2', price: '20886.75',
    cumQty: 0, leavesQty: 1, avgPx: '0.00',
    transactTs: '2026-06-05 09:33:00.100',
  }))

  // ── 09:33 — NQ fills @ 20886.75
  add('2026-06-05 09:33:00.901', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:33:00.901',
    orderId: nqExchId1, clOrdId: nqOrdId1a, execId: 'EX-9002003',
    execType: '2', ordStatus: '2',
    ...NQ, side: '1', qty: 1, ordType: '2', price: '20886.75',
    lastQty: 1, lastPx: '20886.75', cumQty: 1, leavesQty: 0, avgPx: '20886.75',
  }))

  // ── 09:34 — CL partial fill 1 @ 67.85
  add('2026-06-05 09:34:12.550', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:34:12.550',
    orderId: clExchId1, clOrdId: clOrdId1, execId: 'EX-9003002',
    execType: '1', ordStatus: '1',
    ...CL, side: '2', qty: 3, ordType: '2', price: '67.85',
    lastQty: 1, lastPx: '67.85', cumQty: 1, leavesQty: 2, avgPx: '67.85',
  }))

  // ── 09:35 — CL fill remaining 2 @ 67.84
  add('2026-06-05 09:35:02.810', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:35:02.810',
    orderId: clExchId1, clOrdId: clOrdId1, execId: 'EX-9003003',
    execType: '2', ordStatus: '2',
    ...CL, side: '2', qty: 3, ordType: '2', price: '67.85',
    lastQty: 2, lastPx: '67.84', cumQty: 3, leavesQty: 0, avgPx: '67.8433',
  }))

  // ── 09:37 — ES SELL 1 @ market to close position
  const esOrdId2 = 'ES-20260605-002'
  add('2026-06-05 09:37:30.200', 'out', newOrder({
    sender: S, target: T, seq: sNext(), ts: '2026-06-05 09:37:30.200',
    clOrdId: esOrdId2, account: ACCT, ...ES, side: '2', qty: 1, ordType: '1',
  }))
  const esExchId2 = 'CME-ES-9004000'
  add('2026-06-05 09:37:30.348', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:37:30.348',
    orderId: esExchId2, clOrdId: esOrdId2, execId: 'EX-9004001',
    execType: '0', ordStatus: '0',
    ...ES, side: '2', qty: 1, ordType: '1',
    cumQty: 0, leavesQty: 1, avgPx: '0.00',
    transactTs: '2026-06-05 09:37:30.200',
  }))
  add('2026-06-05 09:37:30.362', 'in', execReport({
    sender: T, target: S, seq: tNext(), ts: '2026-06-05 09:37:30.362',
    orderId: esExchId2, clOrdId: esOrdId2, execId: 'EX-9004002',
    execType: '2', ordStatus: '2',
    ...ES, side: '2', qty: 1, ordType: '1',
    lastQty: 1, lastPx: '5843.75', cumQty: 1, leavesQty: 0, avgPx: '5843.75',
    text: 'Position closed',
  }))

  // ── Periodic heartbeats
  add('2026-06-05 09:30:30.000', 'out', heartbeat(S, T, sNext(), '2026-06-05 09:30:30.000'))
  add('2026-06-05 09:30:30.078', 'in',  heartbeat(T, S, tNext(), '2026-06-05 09:30:30.078'))
  add('2026-06-05 09:36:00.000', 'out', heartbeat(S, T, sNext(), '2026-06-05 09:36:00.000'))
  add('2026-06-05 09:36:00.063', 'in',  heartbeat(T, S, tNext(), '2026-06-05 09:36:00.063'))

  // ── Session close
  add('2026-06-05 09:45:00.000', 'out', logout(S, T, sNext(), '2026-06-05 09:45:00.000', 'End of morning session'))
  add('2026-06-05 09:45:00.118', 'in',  logout(T, S, tNext(), '2026-06-05 09:45:00.118'))

  write()
}
