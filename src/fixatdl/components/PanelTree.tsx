import { useState } from 'react'
import type { StrategyPanel, Control } from '../model'
import { ControlRenderer } from '../ticket/ControlRenderer'
import styles from './PanelTree.module.css'

// ── Grid placement helper ──────────────────────────────────────────────────────

function gridStyleFor(child: StrategyPanel | Control): React.CSSProperties {
  const g = child.grid
  if (!g) return {}
  const s: React.CSSProperties = {}
  if (g.col != null) s.gridColumn = g.colSpan ? `${g.col} / span ${g.colSpan}` : String(g.col)
  if (g.row != null) s.gridRow = g.rowSpan ? `${g.row} / span ${g.rowSpan}` : String(g.row)
  else if (g.rowSpan) s.gridRow = `span ${g.rowSpan}`
  return s
}

// ── Panel (recursive) ─────────────────────────────────────────────────────────

function Panel({ panel }: { panel: StrategyPanel }) {
  const [collapsed, setCollapsed] = useState(panel.collapsed)
  const hasHeader = panel.title != null || panel.collapsible
  const isGrid = panel.orientation === 'GRID'

  const bodyStyle: React.CSSProperties = isGrid
    ? {
        display: 'grid',
        gridTemplateColumns: panel.numCols
          ? `repeat(${panel.numCols}, 1fr)`
          : 'repeat(auto-fill, minmax(180px, 1fr))',
        ...(panel.numRows ? { gridTemplateRows: `repeat(${panel.numRows}, auto)` } : {}),
      }
    : { flexDirection: panel.orientation === 'HORIZONTAL' ? 'row' : 'column' }

  return (
    <div
      className={`${styles.panel} ${panel.border === 'Line' ? styles.panelLine : ''}`}
      data-orientation={panel.orientation ?? 'VERTICAL'}
    >
      {hasHeader && (
        <div
          className={`${styles.panelHeader} ${panel.border === 'Line' ? styles.panelLineSep : ''}`}
        >
          {panel.collapsible && (
            <button
              className={styles.collapseBtn}
              onClick={() => setCollapsed(c => !c)}
              aria-expanded={!collapsed}
              aria-label={collapsed ? 'Expand panel' : 'Collapse panel'}
            >
              {collapsed ? '▶' : '▼'}
            </button>
          )}
          {panel.title && <span className={styles.panelTitle}>{panel.title}</span>}
        </div>
      )}

      {!collapsed && (
        <div
          className={styles.panelBody}
          data-testid="panel-body"
          style={bodyStyle}
        >
          {panel.children.map((child, i) => {
            if (isGrid) {
              const gs = gridStyleFor(child)
              const key = child.kind === 'panel' ? i : child.id
              return (
                <div key={key} style={gs}>
                  {child.kind === 'panel'
                    ? <Panel panel={child} />
                    : <ControlRenderer control={child} />}
                </div>
              )
            }
            return child.kind === 'panel'
              ? <Panel key={i} panel={child} />
              : <ControlRenderer key={child.id} control={child} />
          })}
        </div>
      )}
    </div>
  )
}

// ── PanelTree ─────────────────────────────────────────────────────────────────

interface Props {
  panels: StrategyPanel[]
}

export function PanelTree({ panels }: Props) {
  return (
    <div className={styles.tree}>
      {panels.map((p, i) => <Panel key={i} panel={p} />)}
    </div>
  )
}
