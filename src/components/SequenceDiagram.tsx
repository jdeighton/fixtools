import type { FixMessage } from '../context/AppContext'
import { msgTypeDescription } from '../data/fixDictionary'
import { buildSummaryParts } from '../lib/fixSummary'
import styles from './SequenceDiagram.module.css'

interface Props {
  messages: FixMessage[]
}

const MARGIN_LEFT = 80   // space for timestamp column
const LANE_W = 200       // width per lifeline lane
const HEADER_H = 50      // height of party name boxes
const ROW_H = 72         // vertical space per message (increased for summary line)
const ARROW_Y = 30       // arrow y offset within each row
const BOX_H = 30
const BOX_W = 160

function getCompIds(messages: FixMessage[]): string[] {
  const seen = new Set<string>()
  for (const m of messages) {
    const s = m.tags.get(49)
    const t = m.tags.get(56)
    if (s) seen.add(s)
    if (t) seen.add(t)
  }
  return [...seen]
}

function laneX(idx: number): number {
  return MARGIN_LEFT + idx * LANE_W + LANE_W / 2
}

function arrowColor(msg: FixMessage): string {
  const side = msg.tags.get(54)
  if (side === '1') return 'var(--buy)'
  if (side === '2') return 'var(--sell)'
  return '#9ca3af'
}

function msgLabel(msg: FixMessage): string {
  const mt = msg.tags.get(35) ?? '?'
  const desc = msgTypeDescription(mt)
  return `${mt} — ${desc}`
}

// Extract time string at original precision from tag 52, falling back to parsed timestamp
function rawTime(msg: FixMessage): string {
  const raw = msg.tags.get(52)
  if (raw) {
    const m = raw.match(/-(\d{2}:\d{2}:\d{2}(?:\.\d+)?)$/)
    if (m) return m[1]
  }
  if (msg.timestamp) {
    const iso = msg.timestamp.toISOString()
    // Trim trailing zeros after decimal but keep at least seconds
    const time = iso.slice(11, 23)
    return time.endsWith('.000') ? time.slice(0, 8) : time
  }
  return ''
}

export function SequenceDiagram({ messages }: Props) {
  const parties = getCompIds(messages)
  if (parties.length === 0) return null

  const svgWidth = MARGIN_LEFT + parties.length * LANE_W
  const svgHeight = HEADER_H + messages.length * ROW_H + 20

  return (
    <div className={styles.scroll}>
      <svg
        width={svgWidth}
        height={svgHeight}
        className={styles.svg}
        aria-label="FIX sequence diagram"
      >
        {/* Party header boxes */}
        {parties.map((party, i) => {
          const cx = laneX(i)
          return (
            <g key={party}>
              <rect
                x={cx - BOX_W / 2} y={6}
                width={BOX_W} height={BOX_H}
                rx={4}
                fill="#2e2e2e" stroke="#4a4a4a" strokeWidth={1}
              />
              <text x={cx} y={6 + BOX_H / 2 + 5} textAnchor="middle" fill="#e8e8e8" fontSize={12} fontWeight={600}>
                {party}
              </text>
              {/* Lifeline */}
              <line
                x1={cx} y1={6 + BOX_H}
                x2={cx} y2={svgHeight - 8}
                stroke="#3a3a3a" strokeWidth={1} strokeDasharray="4,4"
              />
            </g>
          )
        })}

        {/* Message arrows */}
        {messages.map((msg, rowIdx) => {
          const y = HEADER_H + rowIdx * ROW_H + ARROW_Y
          const sender = msg.tags.get(49) ?? ''
          const target = msg.tags.get(56) ?? ''
          const sIdx = parties.indexOf(sender)
          const tIdx = parties.indexOf(target)
          const ts = rawTime(msg)
          const label = msgLabel(msg)
          const color = arrowColor(msg)
          const summaryParts = buildSummaryParts(msg)
          const isSelf = sIdx === tIdx || sIdx === -1 || tIdx === -1

          const tsEl = (
            <text key={`ts-${rowIdx}`} x={4} y={y + 4} fill="#666" fontSize={10} fontFamily="monospace">
              {ts}
            </text>
          )

          if (isSelf) {
            const cx = sIdx >= 0 ? laneX(sIdx) : tIdx >= 0 ? laneX(tIdx) : MARGIN_LEFT + 40
            return (
              <g key={rowIdx}>
                {tsEl}
                <path d={`M ${cx} ${y} C ${cx + 50} ${y - 10}, ${cx + 50} ${y + 20}, ${cx} ${y + 20}`}
                  fill="none" stroke={color} strokeWidth={1.5}
                  markerEnd="url(#arrowhead)"
                />
                <text x={cx + 55} y={y + 6} fill={color} fontSize={11}>{label}</text>
                <text x={cx + 55} y={y + 20} fontSize={10}>
                  {summaryParts.map((p, i) => (
                    <tspan key={i} fill={p.color === 'buy' ? 'var(--buy)' : p.color === 'sell' ? 'var(--sell)' : '#9ca3af'}>
                      {p.text}
                    </tspan>
                  ))}
                </text>
              </g>
            )
          }

          const x1 = laneX(sIdx)
          const x2 = laneX(tIdx)
          const midX = (x1 + x2) / 2

          return (
            <g key={rowIdx}>
              {tsEl}
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={1.5}
                markerEnd="url(#arrowhead)"
              />
              {/* MsgType label above arrow */}
              <text x={midX} y={y - 8} textAnchor="middle" fill={color} fontSize={11}>
                {label}
              </text>
              {/* Summary sentence below arrow */}
              <text x={midX} y={y + 16} textAnchor="middle" fontSize={10}>
                {summaryParts.map((p, i) => (
                  <tspan key={i} fill={p.color === 'buy' ? 'var(--buy)' : p.color === 'sell' ? 'var(--sell)' : '#9ca3af'}>
                    {p.text}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}

        {/* Single arrowhead marker — orient="auto" rotates it to match the line direction */}
        <defs>
          <marker id="arrowhead" markerWidth={8} markerHeight={6} refX={8} refY={3} orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="context-stroke" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
