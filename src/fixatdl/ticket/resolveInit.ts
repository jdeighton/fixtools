import type { Control, Parameter, StrategyPanel, Strategy } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'
import { resolveClockInitValue } from './complexControls'
import { collectControls } from '../lib/treeUtils'

// Re-export for backwards compatibility with existing callers
export { collectControls as collectAllControls }

export function resolveInitialValue(
  control: Control,
  getStandardField: ((name: string) => string | undefined) | null,
  param?: Parameter,
): ControlValue {
  let rawStr: string | undefined

  if (control.initPolicy === 'UseFixField' && control.initFixField && getStandardField) {
    const val = getStandardField(control.initFixField)
    if (val !== undefined) rawStr = val
  }

  if (rawStr === undefined) rawStr = control.initValue
  if (rawStr === undefined) return { raw: null, initialized: false }

  // Clock_t: apply initValueMode=1 (max(initValue, now))
  if (control.xsiType === 'Clock_t') {
    const adjusted = resolveClockInitValue(rawStr, control.initValueMode, param?.xsiType, new Date())
    return { raw: adjusted, initialized: adjusted !== null }
  }

  return { raw: coerceForType(control, rawStr), initialized: true }
}

function coerceForType(control: Control, val: string): string | boolean | number {
  switch (control.xsiType) {
    case 'CheckBox_t':
      return /^(Y|true|1)$/i.test(val)
    case 'SingleSpinner_t':
    case 'Slider_t': {
      const n = Number(val)
      return isNaN(n) ? 0 : n
    }
    default:
      return val
  }
}

export function checkBoxWireValue(
  raw: boolean,
  control: Control,
  param: Parameter | undefined,
): string {
  if (raw) {
    const ep = param?.enumPairs.find(e => e.enumID === control.checkedEnumRef)
    return ep?.wireValue ?? 'Y'
  } else {
    const ep = param?.enumPairs.find(e => e.enumID === control.uncheckedEnumRef)
    return ep?.wireValue ?? 'N'
  }
}

export function applyRadioSelect(
  state: TicketStateMap,
  allControls: Control[],
  radioGroup: string,
  selectedId: string,
): TicketStateMap {
  const next = new Map(state)
  for (const ctrl of allControls) {
    if (ctrl.radioGroup === radioGroup) {
      next.set(ctrl.id, { raw: ctrl.id === selectedId, initialized: true })
    }
  }
  return next
}

export function initTicketState(
  panels: StrategyPanel[],
  getStandardField: ((name: string) => string | undefined) | null,
  strategy?: Strategy,
): TicketStateMap {
  const controls = collectControls(panels)
  const map = new Map<string, ControlValue>()
  for (const ctrl of controls) {
    const param = strategy?.parameters.find(p => p.name === ctrl.parameterRef)
    map.set(ctrl.id, resolveInitialValue(ctrl, getStandardField, param))
  }
  return map
}
