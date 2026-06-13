import type {
  AtdlDocument, Strategy, Parameter, Control, StrategyPanel,
  EditNode, EditDef, StateRule, StrategyEdit, ParameterType, ControlType, Finding,
} from '../../model'
import { FIX_FIELD_MAP } from '../../data/fixFieldDictionary'

// ── Helpers ───────────────────────────────────────────────────────────────────

function collectControls(panels: StrategyPanel[]): Control[] {
  const out: Control[] = []
  function walk(node: StrategyPanel | Control): void {
    if (node.kind === 'control') { out.push(node); return }
    for (const c of node.children) walk(c)
  }
  for (const p of panels) walk(p)
  return out
}

const COMPARISON_OPS_NEED_VALUE = new Set(['EQ', 'NE', 'LT', 'GT', 'LE', 'GE'])

// Simplified type-value parse check for ED-010
function valueParseOk(val: string, xsiType: ParameterType): boolean {
  const v = val.trim()
  if (v === '' || v === 'MINUS_INF' || v === 'PLUS_INF') return true
  switch (xsiType) {
    case 'Int_t': case 'Length_t': case 'NumInGroup_t': case 'SeqNum_t': case 'TagNum_t':
      return /^-?\d+$/.test(v)
    case 'Float_t': case 'Qty_t': case 'Price_t': case 'PriceOffset_t':
    case 'Amt_t': case 'Percentage_t':
      return !isNaN(Number(v))
    case 'Boolean_t':
      return /^[YNyn]$/.test(v) || /^(true|false|0|1)$/i.test(v)
    case 'Char_t':
      return v.length === 1
    case 'UTCTimestamp_t': case 'TZTimestamp_t':
      return /^\d{8}-\d{2}:\d{2}:\d{2}/.test(v) || /^\d{2}:\d{2}:\d{2}$/.test(v)
    case 'UTCTimeOnly_t': case 'TZTimeOnly_t':
      return /^\d{2}:\d{2}:\d{2}/.test(v)
    case 'UTCDateOnly_t': case 'LocalMktDate_t':
      return /^\d{8}$/.test(v)
    case 'MonthYear_t':
      return /^\d{6}/.test(v)
    default:
      return true
  }
}

const LIST_CTRL_TYPES = new Set<ControlType>([
  'DropDownList_t', 'EditableDropDownList_t', 'RadioButtonList_t',
  'CheckBoxList_t', 'MultiSelectList_t',
])

// ── Edit node walker ──────────────────────────────────────────────────────────

interface EditCtx {
  stratName: string
  isStateRule: boolean
  ctrlIds: Set<string>
  ctrlMap: Map<string, Control>
  paramNames: Set<string>
  paramMap: Map<string, Parameter>
  editDefIds: Set<string>
  ownerLoc: string   // e.g. "Strategy[S]/Control[C]/StateRule" or "Strategy[S]/StrategyEdit"
}

function walkNode(node: EditNode, ctx: EditCtx, findings: Finding[]): void {
  if (node.kind === 'ref') {
    // ED-008: EditRef must resolve to a known EditDef
    if (!ctx.editDefIds.has(node.id)) {
      findings.push({
        ruleId: 'ED-008', severity: 'error',
        message: `${ctx.ownerLoc} references EditRef/@id="${node.id}" which does not match any EditDef`,
        location: { path: ctx.ownerLoc },
      })
    }
    return
  }

  if (node.kind === 'logic') {
    // ED-001: logic node must have op set
    if (!node.op) {
      findings.push({
        ruleId: 'ED-001', severity: 'error',
        message: `${ctx.ownerLoc} has a logic Edit with no logicOperator`,
        location: { path: ctx.ownerLoc },
      })
    }
    // ED-007: logic node must have at least one operand
    if (!node.operands || node.operands.length === 0) {
      findings.push({
        ruleId: 'ED-007', severity: 'error',
        message: `${ctx.ownerLoc} has a logic Edit (${node.op}) with no child operands`,
        location: { path: ctx.ownerLoc },
      })
    }
    // ED-014: NOT with multiple operands
    if (node.op === 'NOT' && node.operands && node.operands.length > 1) {
      findings.push({
        ruleId: 'ED-014', severity: 'warning',
        message: `${ctx.ownerLoc} has a NOT Edit with ${node.operands.length} operands — NOT must have exactly one operand; extra operands are ignored`,
        suggestion: 'Wrap multiple conditions in an AND node, then wrap that in NOT',
        location: { path: ctx.ownerLoc },
      })
    }
    for (const op of node.operands ?? []) walkNode(op, ctx, findings)
    return
  }

  if (node.kind === 'compare') {
    // ED-001: compare node must have op set
    if (!node.op) {
      findings.push({
        ruleId: 'ED-001', severity: 'error',
        message: `${ctx.ownerLoc} has a compare Edit with no operator attribute`,
        location: { path: ctx.ownerLoc },
      })
    }
    // ED-003: field required
    if (!node.field) {
      findings.push({
        ruleId: 'ED-003', severity: 'error',
        message: `${ctx.ownerLoc} has a compare Edit with no @field attribute`,
        location: { path: ctx.ownerLoc },
      })
      return
    }
    // ED-002: field2 and value mutually exclusive
    if (node.field2 != null && node.value != null) {
      findings.push({
        ruleId: 'ED-002', severity: 'error',
        message: `${ctx.ownerLoc} Edit has both @field2 and @value — only one may be specified`,
        location: { path: ctx.ownerLoc },
      })
    }
    // ED-004: EQ/NE/LT/GT/LE/GE need value or field2
    if (COMPARISON_OPS_NEED_VALUE.has(node.op) && node.value == null && !node.field2) {
      findings.push({
        ruleId: 'ED-004', severity: 'error',
        message: `${ctx.ownerLoc} Edit operator="${node.op}" requires @value or @field2 but neither is set`,
        location: { path: ctx.ownerLoc },
      })
    }

    // ED-005 / ED-006: field reference validation
    checkFieldRef(node.field, false, node, ctx, findings)
    if (node.field2) checkFieldRef(node.field2, true, node, ctx, findings)
  }
}

function checkFieldRef(
  fieldName: string,
  isField2: boolean,
  node: { op: string; value?: string },
  ctx: EditCtx,
  findings: Finding[],
): void {
  const attr = isField2 ? 'field2' : 'field'

  if (ctx.isStateRule) {
    // ED-005: must reference a Control ID in the same strategy
    if (!ctx.ctrlIds.has(fieldName)) {
      findings.push({
        ruleId: 'ED-005', severity: 'error',
        message: `${ctx.ownerLoc} Edit/@${attr}="${fieldName}" does not match any Control/@ID in Strategy[${ctx.stratName}]`,
        location: { path: ctx.ownerLoc },
      })
      return
    }
    // ED-011: for list controls, value must be a listItem enumID
    if (!isField2 && node.value != null) {
      const ctrl = ctx.ctrlMap.get(fieldName)
      if (ctrl && LIST_CTRL_TYPES.has(ctrl.xsiType) && ctrl.listItems.length > 0) {
        const enumIDs = new Set(ctrl.listItems.map(i => i.enumID))
        if (!enumIDs.has(node.value)) {
          findings.push({
            ruleId: 'ED-011', severity: 'warning',
            message: `${ctx.ownerLoc} Edit compares Control "${fieldName}" to value "${node.value}" which is not a ListItem/@enumID of that control`,
            location: { path: ctx.ownerLoc },
          })
        }
      }
    }
  } else {
    // ED-006: must reference a Parameter name or FIX_* field
    if (fieldName.startsWith('FIX_')) {
      const fixName = fieldName.slice(4)
      if (!FIX_FIELD_MAP[fixName]) {
        findings.push({
          ruleId: 'ED-006', severity: 'warning',
          message: `${ctx.ownerLoc} Edit/@${attr}="${fieldName}" references FIX field "${fixName}" which is not in the standard FIX dictionary`,
          location: { path: ctx.ownerLoc },
        })
      }
    } else if (!ctx.paramNames.has(fieldName)) {
      findings.push({
        ruleId: 'ED-006', severity: 'error',
        message: `${ctx.ownerLoc} Edit/@${attr}="${fieldName}" does not match any Parameter name in Strategy[${ctx.stratName}] and is not a FIX_* reference`,
        location: { path: ctx.ownerLoc },
      })
    } else if (!isField2 && node.value != null) {
      // ED-010: value should parse as the parameter's type
      const param = ctx.paramMap.get(fieldName)
      if (param && !valueParseOk(node.value, param.xsiType)) {
        findings.push({
          ruleId: 'ED-010', severity: 'warning',
          message: `${ctx.ownerLoc} Edit/@value "${node.value}" cannot be parsed as ${param.xsiType} (type of Parameter "${fieldName}")`,
          location: { path: ctx.ownerLoc },
        })
      }
    }
  }
}

// ── Circular chain detection (ED-016) ─────────────────────────────────────────

function collectRefIds(node: EditNode, out: Set<string>): void {
  if (node.kind === 'ref') { out.add(node.id); return }
  if (node.kind === 'logic') { for (const op of node.operands ?? []) collectRefIds(op, out) }
}

function detectCycles(
  editDefs: EditDef[],
  stratName: string,
  findings: Finding[],
): void {
  if (editDefs.length === 0) return

  const graph = new Map<string, Set<string>>()
  for (const ed of editDefs) {
    const refs = new Set<string>()
    collectRefIds(ed.node, refs)
    graph.set(ed.id, refs)
  }

  const visited = new Set<string>()
  const inPath = new Set<string>()
  const reported = new Set<string>()

  function dfs(id: string, path: string[]): void {
    if (inPath.has(id)) {
      if (!reported.has(id)) {
        reported.add(id)
        const cycle = [...path.slice(path.indexOf(id)), id].join(' → ')
        findings.push({
          ruleId: 'ED-016', severity: 'error',
          message: `Strategy[${stratName}] EditDef cycle detected: ${cycle}`,
          location: { path: `Strategy[${stratName}]/EditDef[${id}]` },
        })
      }
      return
    }
    if (visited.has(id)) return
    visited.add(id)
    inPath.add(id)
    for (const refId of graph.get(id) ?? []) dfs(refId, [...path, id])
    inPath.delete(id)
  }

  for (const id of graph.keys()) dfs(id, [])
}

// ── Per-strategy checks ───────────────────────────────────────────────────────

function checkOne(strat: Strategy, doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  const allParams = [
    ...strat.parameters,
    ...(strat.repeatingGroup?.parameters ?? []),
  ]
  const paramNames = new Set(allParams.map(p => p.name))
  const paramMap = new Map(allParams.map(p => [p.name, p]))

  const controls = strat.layout ? collectControls(strat.layout.panels) : []
  const ctrlIds = new Set(controls.map(c => c.id))
  const ctrlMap = new Map(controls.map(c => [c.id, c]))

  // Collect all reachable EditDef IDs (strategy-local + global)
  const editDefIds = new Set([
    ...strat.localEdits.map(e => e.id),
    ...doc.globalEdits.map(e => e.id),
  ])

  // ED-009: localEdits must have non-empty id
  for (const ed of strat.localEdits) {
    if (!ed.id) {
      findings.push({
        ruleId: 'ED-009', severity: 'error',
        message: `Strategy[${strat.name}] has an EditDef with no @id — edit definitions at strategy level must be named`,
        location: { path: `Strategy[${strat.name}]/Edit` },
      })
    }
  }

  // ED-016: circular EditRef chains
  detectCycles(strat.localEdits, strat.name, findings)

  // Check StateRule edit nodes within controls
  for (const ctrl of controls) {
    for (const sr of ctrl.stateRules) {
      // ED-013: must have condition
      if (!sr.condition) {
        findings.push({
          ruleId: 'ED-013', severity: 'error',
          message: `Strategy[${strat.name}]/Control[${ctrl.id}] StateRule has no condition (Edit or EditRef required)`,
          location: { path: `Strategy[${strat.name}]/Control[${ctrl.id}]/StateRule` },
        })
        continue
      }
      // ED-015: at least one action attribute
      if (sr.enabled == null && sr.visible == null && sr.value == null) {
        findings.push({
          ruleId: 'ED-015', severity: 'warning',
          message: `Strategy[${strat.name}]/Control[${ctrl.id}] StateRule has no action (enabled/visible/value) — it has no effect`,
          location: { path: `Strategy[${strat.name}]/Control[${ctrl.id}]/StateRule` },
        })
      }
      const ctx: EditCtx = {
        stratName: strat.name,
        isStateRule: true,
        ctrlIds, ctrlMap, paramNames, paramMap, editDefIds,
        ownerLoc: `Strategy[${strat.name}]/Control[${ctrl.id}]/StateRule`,
      }
      walkNode(sr.condition, ctx, findings)
    }
  }

  // Check StrategyEdit edit nodes
  for (const se of strat.strategyEdits) {
    // ED-012: errorMsg required
    if (!se.errorMsg) {
      findings.push({
        ruleId: 'ED-012', severity: 'error',
        message: `Strategy[${strat.name}] StrategyEdit has no @errorMessage (required)`,
        location: { path: `Strategy[${strat.name}]/StrategyEdit` },
      })
    }
    // ED-013: must have condition
    if (!se.condition) {
      findings.push({
        ruleId: 'ED-013', severity: 'error',
        message: `Strategy[${strat.name}] StrategyEdit has no condition (Edit or EditRef required)`,
        location: { path: `Strategy[${strat.name}]/StrategyEdit` },
      })
      continue
    }
    const ctx: EditCtx = {
      stratName: strat.name,
      isStateRule: false,
      ctrlIds, ctrlMap, paramNames, paramMap, editDefIds,
      ownerLoc: `Strategy[${strat.name}]/StrategyEdit`,
    }
    walkNode(se.condition, ctx, findings)
  }

  return findings
}

// ── Public API ────────────────────────────────────────────────────────────────

export function checkED(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  // ED-009: globalEdits must have non-empty id
  for (const ed of doc.globalEdits) {
    if (!ed.id) {
      findings.push({
        ruleId: 'ED-009', severity: 'error',
        message: 'Global EditDef is missing @id — global edit definitions must be named',
        location: { path: 'Strategies/Edit' },
      })
    }
  }

  for (const strat of doc.strategies) {
    findings.push(...checkOne(strat, doc))
  }

  return findings
}
