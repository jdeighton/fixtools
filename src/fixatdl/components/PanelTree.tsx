import { useState } from 'react'
import type { StrategyPanel, Control } from '../model'
import styles from './PanelTree.module.css'

// ── ControlSlot ───────────────────────────────────────────────────────────────

function ControlSlot({ control }: { control: Control }) {
  return (
    <div className={styles.slot} data-testid="control-slot">
      <span className={styles.slotId}>{control.id}</span>
      <span className={styles.slotType}>{control.xsiType}</span>
      {control.label && <span className={styles.slotLabel}>{control.label}</span>}
    </div>
  )
}

// ── Panel (recursive) ─────────────────────────────────────────────────────────

function Panel({ panel }: { panel: StrategyPanel }) {
  const [collapsed, setCollapsed] = useState(panel.collapsed)
  const hasHeader = panel.title != null || panel.collapsible

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
          style={{ flexDirection: panel.orientation === 'HORIZONTAL' ? 'row' : 'column' }}
        >
          {panel.children.map((child, i) =>
            child.kind === 'panel'
              ? <Panel key={i} panel={child} />
              : <ControlSlot key={child.id} control={child} />
          )}
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
