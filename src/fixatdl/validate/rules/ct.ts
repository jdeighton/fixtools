import type {
  AtdlDocument, Strategy, Parameter, Control, StrategyPanel, ControlType, Finding,
} from '../../model'
import { CONTROL_PARAM_COMPAT } from '../controlParamCompatibility'
import { STRING_ID_RE, collectControls } from '../../lib/treeUtils'

// ── Helpers ───────────────────────────────────────────────────────────────────

const LIST_CONTROLS = new Set<ControlType>([
  'DropDownList_t', 'EditableDropDownList_t', 'RadioButtonList_t',
  'CheckBoxList_t', 'MultiSelectList_t',
])

function ctrlPath(stratName: string, ctrlId: string): string {
  return `Strategy[${stratName}]/Control[${ctrlId}]`
}

// Validate initValue for specific control types where format matters
function initValueValid(xsiType: ControlType, val: string): boolean {
  switch (xsiType) {
    case 'CheckBox_t':
      return /^(Y|N|y|n|true|false|0|1)$/i.test(val)
    case 'SingleSpinner_t':
    case 'DoubleSpinner_t':
    case 'Slider_t':
      return val.trim() !== '' && !isNaN(Number(val))
    case 'Clock_t':
      // Accept HH:MM:SS or YYYYMMDD-HH:MM:SS
      return /^\d{2}:\d{2}(:\d{2})?$/.test(val) || /^\d{8}-\d{2}:\d{2}/.test(val)
    default:
      // List-based controls and TextField etc. — any non-empty string is fine
      return true
  }
}

// ── Per-strategy checks ───────────────────────────────────────────────────────

function checkOne(strat: Strategy): Finding[] {
  const findings: Finding[] = []
  if (!strat.layout) return findings

  const controls = collectControls(strat.layout.panels)
  const paramMap = new Map<string, Parameter>()
  for (const p of [...strat.parameters, ...(strat.repeatingGroup?.parameters ?? [])]) {
    paramMap.set(p.name, p)
  }

  const idCounts = new Map<string, number>()
  for (const c of controls) {
    if (c.id) idCounts.set(c.id, (idCounts.get(c.id) ?? 0) + 1)
  }

  for (const ctrl of controls) {
    const loc = ctrlPath(strat.name, ctrl.id || '?')
    const param = ctrl.parameterRef ? paramMap.get(ctrl.parameterRef) : undefined

    // CT-001: @id required and valid StringID
    if (!ctrl.id) {
      findings.push({
        ruleId: 'CT-001', severity: 'error',
        message: `Strategy[${strat.name}] has a Control with no @id`,
        location: { path: `Strategy[${strat.name}]/Control` },
      })
    } else if (!STRING_ID_RE.test(ctrl.id)) {
      findings.push({
        ruleId: 'CT-001', severity: 'error',
        message: `${loc}/@id "${ctrl.id}" is not a valid StringID`,
        location: { path: loc },
      })
    }

    // CT-002: @xsi:type required
    if (!ctrl.xsiType) {
      findings.push({
        ruleId: 'CT-002', severity: 'error',
        message: `${loc} has no @xsi:type (required)`,
        location: { path: loc },
      })
    }

    // CT-003: @parameterRef must reference a known parameter
    if (ctrl.parameterRef != null && !paramMap.has(ctrl.parameterRef)) {
      findings.push({
        ruleId: 'CT-003', severity: 'error',
        message: `${loc}/@parameterRef "${ctrl.parameterRef}" does not match any Parameter in this strategy`,
        location: { path: loc },
      })
    }

    // CT-004: listItem enumID and uiRep both required
    for (const item of ctrl.listItems) {
      if (!item.enumID) {
        findings.push({
          ruleId: 'CT-004', severity: 'error',
          message: `${loc}/ListItem is missing @enumID (required)`,
          location: { path: loc },
        })
      }
      if (!item.uiRep) {
        findings.push({
          ruleId: 'CT-004', severity: 'error',
          message: `${loc}/ListItem[@enumID="${item.enumID}"] is missing @uiRep (required)`,
          location: { path: `${loc}/ListItem[${item.enumID}]` },
        })
      }
    }

    // CT-005: listItem enumIDs must match parameter enumPair enumIDs
    if (param && ctrl.listItems.length > 0 && param.enumPairs.length > 0) {
      const paramEnumIDs = new Set(param.enumPairs.map(e => e.enumID))
      for (const item of ctrl.listItems) {
        if (item.enumID && !paramEnumIDs.has(item.enumID)) {
          findings.push({
            ruleId: 'CT-005', severity: 'warning',
            message: `${loc}/ListItem/@enumID "${item.enumID}" does not match any EnumPair/@enumID in Parameter "${param.name}"`,
            location: { path: `${loc}/ListItem[${item.enumID}]` },
          })
        }
      }
    }

    // CT-006: all parameter enumPairs must have a corresponding listItem
    if (param && param.enumPairs.length > 0 && ctrl.listItems.length > 0) {
      const ctrlEnumIDs = new Set(ctrl.listItems.map(i => i.enumID))
      for (const ep of param.enumPairs) {
        if (!ctrlEnumIDs.has(ep.enumID)) {
          findings.push({
            ruleId: 'CT-006', severity: 'warning',
            message: `${loc} is missing a ListItem for Parameter "${param.name}" EnumPair/@enumID "${ep.enumID}"`,
            suggestion: `Add <ListItem enumID="${ep.enumID}" uiRep="..." />`,
            location: { path: loc },
          })
        }
      }
    }

    // CT-007: control type / parameter type compatibility
    if (param && ctrl.xsiType) {
      const compat = CONTROL_PARAM_COMPAT[ctrl.xsiType]
      if (compat !== 'any' && !compat.has(param.xsiType)) {
        findings.push({
          ruleId: 'CT-007', severity: 'warning',
          message: `${loc} is a ${ctrl.xsiType} but references Parameter "${param.name}" with type ${param.xsiType} — these types are not typically compatible`,
          location: { path: loc },
        })
      }
    }

    // CT-008: initValue valid for control type
    if (ctrl.initValue != null && ctrl.xsiType) {
      if (!initValueValid(ctrl.xsiType, ctrl.initValue)) {
        findings.push({
          ruleId: 'CT-008', severity: 'warning',
          message: `${loc}/@initValue "${ctrl.initValue}" is not a valid value for ${ctrl.xsiType}`,
          location: { path: loc },
        })
      }
    }

    // CT-009: CheckBox_t with parameterRef should have checkedEnumRef and uncheckedEnumRef
    if (ctrl.xsiType === 'CheckBox_t' && param && param.enumPairs.length > 0) {
      if (!ctrl.checkedEnumRef) {
        findings.push({
          ruleId: 'CT-009', severity: 'warning',
          message: `${loc} is CheckBox_t with parameter EnumPairs but has no @checkedEnumRef`,
          suggestion: 'Add @checkedEnumRef referencing the "checked" EnumPair/@enumID',
          location: { path: loc },
        })
      }
      if (!ctrl.uncheckedEnumRef) {
        findings.push({
          ruleId: 'CT-009', severity: 'warning',
          message: `${loc} is CheckBox_t with parameter EnumPairs but has no @uncheckedEnumRef`,
          suggestion: 'Add @uncheckedEnumRef referencing the "unchecked" EnumPair/@enumID',
          location: { path: loc },
        })
      }
    }

    // CT-010: Clock_t initValue format
    if (ctrl.xsiType === 'Clock_t' && ctrl.initValue != null) {
      if (!/^\d{2}:\d{2}(:\d{2})?$/.test(ctrl.initValue) && !/^\d{8}-\d{2}:\d{2}/.test(ctrl.initValue)) {
        findings.push({
          ruleId: 'CT-010', severity: 'warning',
          message: `${loc}/@initValue "${ctrl.initValue}" does not match expected Clock_t format (HH:MM:SS or YYYYMMDD-HH:MM:SS)`,
          location: { path: loc },
        })
      }
    }

    // CT-011: spinner increment must be > 0
    for (const [attr, val] of [
      ['increment', ctrl.increment],
      ['innerIncrement', ctrl.innerIncrement],
      ['outerIncrement', ctrl.outerIncrement],
    ] as const) {
      if (val != null && val <= 0) {
        findings.push({
          ruleId: 'CT-011', severity: 'error',
          message: `${loc}/@${attr} ${val} must be > 0`,
          location: { path: loc },
        })
      }
    }

    // CT-012: control IDs unique within strategy
    if (ctrl.id && (idCounts.get(ctrl.id) ?? 0) > 1) {
      findings.push({
        ruleId: 'CT-012', severity: 'error',
        message: `Strategy[${strat.name}] has duplicate Control/@id "${ctrl.id}"`,
        location: { path: loc },
      })
      // Remove from map so we only report once per ID
      idCounts.delete(ctrl.id)
    }

    // CT-013: initPolicy=UseFixField requires initFixField
    if (ctrl.initPolicy === 'UseFixField' && !ctrl.initFixField) {
      findings.push({
        ruleId: 'CT-013', severity: 'error',
        message: `${loc} has @initPolicy="UseFixField" but no @initFixField`,
        suggestion: 'Add @initFixField with a valid FIX field name',
        location: { path: loc },
      })
    }

    // CT-014: Label_t should not have parameterRef
    if (ctrl.xsiType === 'Label_t' && ctrl.parameterRef) {
      findings.push({
        ruleId: 'CT-014', severity: 'warning',
        message: `${loc} is a Label_t with @parameterRef "${ctrl.parameterRef}" — Label_t is display-only and should not reference a parameter`,
        location: { path: loc },
      })
    }

    // CT-015: HiddenField_t with no parameterRef is likely pointless
    if (ctrl.xsiType === 'HiddenField_t' && !ctrl.parameterRef) {
      findings.push({
        ruleId: 'CT-015', severity: 'info',
        message: `${loc} is a HiddenField_t with no @parameterRef — this control has no effect`,
        location: { path: loc },
      })
    }

    // CT-016: listItems on non-list controls
    if (ctrl.listItems.length > 0 && !LIST_CONTROLS.has(ctrl.xsiType)) {
      findings.push({
        ruleId: 'CT-016', severity: 'warning',
        message: `${loc} is ${ctrl.xsiType} but has ${ctrl.listItems.length} ListItem(s) — ListItems are only meaningful on list-type controls`,
        location: { path: loc },
      })
    }
  }

  return findings
}

// ── Public API ────────────────────────────────────────────────────────────────

export function checkCT(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []
  for (const strat of doc.strategies) {
    findings.push(...checkOne(strat))
  }
  return findings
}
