import type { Strategy, StrategyLayout, Control, Parameter, ControlType, ParameterType } from '../model'

const NUMERIC_TYPES = new Set<ParameterType>([
  'Int_t', 'Length_t', 'NumInGroup_t', 'SeqNum_t', 'TagNum_t',
  'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
])

const TIMESTAMP_TYPES = new Set<ParameterType>([
  'UTCTimestamp_t', 'UTCTimeOnly_t', 'UTCDateOnly_t',
  'LocalMktDate_t', 'TZTimestamp_t', 'TZTimeOnly_t',
])

export function pickControlType(param: Parameter): ControlType {
  if (param.enumPairs.length > 0) return 'DropDownList_t'
  if (param.xsiType === 'Boolean_t') return 'CheckBox_t'
  if (NUMERIC_TYPES.has(param.xsiType)) return 'SingleSpinner_t'
  if (TIMESTAMP_TYPES.has(param.xsiType)) return 'Clock_t'
  return 'TextField_t'
}

export function generateFallbackLayout(strategy: Strategy): StrategyLayout {
  const controls: Control[] = strategy.parameters
    .filter(p => p.constValue == null)
    .map(p => ({
      kind: 'control' as const,
      id: `fallback_${p.name}`,
      xsiType: pickControlType(p),
      parameterRef: p.name,
      label: p.name,
      listItems: [],
      stateRules: [],
    }))

  return {
    panels: [{
      kind: 'panel' as const,
      orientation: 'VERTICAL' as const,
      collapsed: false,
      collapsible: false,
      children: controls,
    }],
  }
}
