import type { Control, Parameter, StrategyPanel } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'

export function resolveInitialValue(
  control: Control,
  getStandardField: ((name: string) => string | undefined) | null,
): ControlValue {
  if (control.initPolicy === 'UseFixField' && control.initFixField && getStandardField) {
    const val = getStandardField(control.initFixField)
    if (val !== undefined) {
      return { raw: coerceForType(control, val), initialized: true }
    }
  }
  if (control.initValue !== undefined) {
    return { raw: coerceForType(control, control.initValue), initialized: true }
  }
  return { raw: null, initialized: false }
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

export function collectAllControls(panels: StrategyPanel[]): Control[] {
  const out: Control[] = []
  function walk(nodes: Array<StrategyPanel | Control>): void {
    for (const node of nodes) {
      if (node.kind === 'control') out.push(node)
      else walk(node.children)
    }
  }
  walk(panels)
  return out
}

export function initTicketState(
  panels: StrategyPanel[],
  getStandardField: ((name: string) => string | undefined) | null,
): TicketStateMap {
  const controls = collectAllControls(panels)
  const map = new Map<string, ControlValue>()
  for (const ctrl of controls) {
    map.set(ctrl.id, resolveInitialValue(ctrl, getStandardField))
  }
  return map
}
