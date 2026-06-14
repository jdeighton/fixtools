import type { AtdlDocument, Strategy, StrategyPanel, Finding } from '../../model'
import { collectControls } from '../../lib/treeUtils'

// ── Helpers ───────────────────────────────────────────────────────────────────

function checkPanels(
  panels: StrategyPanel[],
  stratName: string,
  docVersion: string,
  findings: Finding[],
): void {
  for (const panel of panels) {
    checkPanel(panel, stratName, docVersion, findings)
  }
}

function checkPanel(
  panel: StrategyPanel,
  stratName: string,
  docVersion: string,
  findings: Finding[],
): void {
  const loc = `Strategy[${stratName}]/StrategyPanel`

  // LY-002: must not mix Control and StrategyPanel children
  const hasControls = panel.children.some(c => c.kind === 'control')
  const hasPanels = panel.children.some(c => c.kind === 'panel')
  if (hasControls && hasPanels) {
    findings.push({
      ruleId: 'LY-002', severity: 'error',
      message: `Strategy[${stratName}] has a StrategyPanel that mixes Control and StrategyPanel children — all children must be the same kind`,
      suggestion: 'Wrap the Controls in a nested StrategyPanel',
      location: { path: loc },
    })
  }

  // LY-003: orientation required
  if (!panel.orientation) {
    findings.push({
      ruleId: 'LY-003', severity: 'error',
      message: `Strategy[${stratName}] has a StrategyPanel missing @orientation (required per FIXatdl errata)`,
      suggestion: 'Add orientation="VERTICAL" or orientation="HORIZONTAL"',
      location: { path: loc },
    })
  }

  // LY-004: collapsible absent → info
  if (panel.collapsible == null) {
    findings.push({
      ruleId: 'LY-004', severity: 'info',
      message: `Strategy[${stratName}] has a StrategyPanel with no @collapsible — defaults to false`,
      location: { path: loc },
    })
  }

  // LY-006: color present → info
  if (panel.color != null) {
    findings.push({
      ruleId: 'LY-006', severity: 'info',
      message: `Strategy[${stratName}] StrategyPanel/@color "${panel.color}" is set — colour is advisory only; renderers may ignore it`,
      location: { path: loc },
    })
  }

  // LY-090: GRID orientation panel (1.2 feature) — rendered as CSS grid
  if (docVersion === '1.2' && panel.orientation === 'GRID') {
    findings.push({
      ruleId: 'LY-090', severity: 'info',
      message: `Strategy[${stratName}] StrategyPanel uses FIXatdl 1.2 GRID orientation — rendering as CSS grid`,
      location: { path: loc },
    })
  }

  // LY-090: panel has grid-position attributes (1.2 PanelItem_t feature)
  if (docVersion === '1.2' && panel.grid != null) {
    findings.push({
      ruleId: 'LY-090', severity: 'info',
      message: `Strategy[${stratName}] StrategyPanel has FIXatdl 1.2 grid-position attributes — honoured when placed inside a GRID-orientation parent panel`,
      location: { path: loc },
    })
  }

  // Recurse into sub-panels
  for (const child of panel.children) {
    if (child.kind === 'panel') checkPanel(child, stratName, docVersion, findings)
  }

  // LY-090: control has grid-position attributes (1.2 PanelItem_t feature)
  for (const child of panel.children) {
    if (child.kind === 'control' && docVersion === '1.2' && child.grid != null) {
      const isGridParent = panel.orientation === 'GRID'
      findings.push({
        ruleId: 'LY-090', severity: 'info',
        message: isGridParent
          ? `Strategy[${stratName}] Control[${child.id}] grid position applied (FIXatdl 1.2)`
          : `Strategy[${stratName}] Control[${child.id}] has FIXatdl 1.2 grid-position attributes but parent is not GRID orientation — attributes ignored, flow layout used`,
        location: { path: `Strategy[${stratName}]/Control[${child.id}]` },
      })
    }
  }
}

function checkOne(strat: Strategy, docVersion: string): Finding[] {
  const findings: Finding[] = []

  if (!strat.layout) return findings

  // LY-001: at least one StrategyPanel
  if (strat.layout.panels.length === 0) {
    findings.push({
      ruleId: 'LY-001', severity: 'error',
      message: `Strategy[${strat.name}] StrategyLayout has no StrategyPanel children (at least one required)`,
      location: { path: `Strategy[${strat.name}]/StrategyLayout` },
    })
    return findings
  }

  // Walk panels for structural checks
  checkPanels(strat.layout.panels, strat.name, docVersion, findings)

  // LY-005: parameter with no constValue and no bound Control
  const controls = collectControls(strat.layout.panels)
  const boundParams = new Set(controls.filter(c => c.parameterRef).map(c => c.parameterRef!))
  const allParams = [
    ...strat.parameters,
    ...(strat.repeatingGroup?.parameters ?? []),
  ]
  for (const p of allParams) {
    if (p.constValue == null && !boundParams.has(p.name)) {
      findings.push({
        ruleId: 'LY-005', severity: 'warning',
        message: `Strategy[${strat.name}]/Parameter[${p.name}] has no constValue and no Control bound to it — the parameter cannot be set by the user`,
        suggestion: `Add a Control with parameterRef="${p.name}" or set a constValue on the parameter`,
        location: { path: `Strategy[${strat.name}]/Parameter[${p.name}]` },
      })
    }
  }

  return findings
}

// ── Public API ────────────────────────────────────────────────────────────────

export function checkLY(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []
  for (const strat of doc.strategies) {
    findings.push(...checkOne(strat, doc.version))
  }
  return findings
}
