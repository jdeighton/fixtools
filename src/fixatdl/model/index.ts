export type AtdlVersion = '1.0' | '1.1' | '1.2' | 'unknown'

export interface AtdlDocument {
  version: AtdlVersion
  namespaces: Record<string, string>
  strategies: Strategy[]
  strategyIdentifierTag?: number
  versionIdentifierTag?: number
  tag957Support: boolean
  changeStrategyOnCxlRpl?: boolean
  draftFlagIdentifierTag?: number
  imageLocation?: string
  description?: string
  globalEdits: EditDef[]
  findings: Finding[]
  sourceLineIndex: LineIndex
  sourceXml: string
}

export interface Strategy {
  name: string
  uiRep?: string
  wireValue: string
  version?: string
  fixMsgType?: 'D' | 'E' | 'AB' | 's'
  providerID?: string
  providerSubID?: string
  disclosureDoc?: string
  imageLocation?: string
  sentOrderLink?: string
  totalOrders?: number
  totalLegs?: number
  totalOrdersTag?: number
  commonIDTag?: number
  orderSequenceTag?: number
  filter?: string
  regions?: RegionFilter
  markets?: MarketFilter[]
  securityTypes?: SecurityTypeFilter[]
  parameters: Parameter[]
  repeatingGroup?: RepeatingGroup
  strategyEdits: StrategyEdit[]
  localEdits: EditDef[]
  layout?: StrategyLayout
  description?: string
}

export type ParameterType =
  | 'Int_t' | 'Length_t' | 'NumInGroup_t' | 'SeqNum_t' | 'TagNum_t'
  | 'Float_t' | 'Qty_t' | 'Price_t' | 'PriceOffset_t' | 'Amt_t' | 'Percentage_t'
  | 'Char_t' | 'Boolean_t' | 'String_t' | 'MultipleCharValue_t' | 'MultipleStringValue_t'
  | 'Currency_t' | 'Exchange_t' | 'MonthYear_t' | 'UTCTimestamp_t' | 'UTCTimeOnly_t'
  | 'UTCDateOnly_t' | 'LocalMktDate_t' | 'TZTimestamp_t' | 'TZTimeOnly_t'
  | 'data_t' | 'Tenor_t' | 'Language_t' | 'Country_t'

export interface Parameter {
  name: string
  xsiType: ParameterType
  fixTag?: number
  use: 'optional' | 'required'
  constValue?: string
  minValue?: string
  maxValue?: string
  minLength?: number
  maxLength?: number
  precision?: number
  multiplyBy100?: boolean
  mutableOnCxlRpl: boolean
  revertOnCxlRpl: boolean
  definedByFIX: boolean
  localMktTz?: string
  invertOnWire?: boolean
  trueWireValue?: string
  falseWireValue?: string
  scope?: 'ORDER' | 'LEG'
  filter?: string
  enumPairs: EnumPair[]
  description?: string
}

export interface EnumPair {
  enumID: string
  wireValue: string
  description?: string
  filter?: string
}

export type ControlType =
  | 'Clock_t' | 'TextField_t' | 'SingleSpinner_t' | 'DoubleSpinner_t'
  | 'DropDownList_t' | 'EditableDropDownList_t' | 'RadioButtonList_t'
  | 'RadioButton_t' | 'CheckBox_t' | 'CheckBoxList_t' | 'Slider_t'
  | 'Label_t' | 'HiddenField_t' | 'MultiSelectList_t' | 'Duration_t'

export interface ListItem {
  enumID: string
  uiRep: string
  filter?: string
}

export interface Control {
  readonly kind: 'control'
  id: string
  xsiType: ControlType
  parameterRef?: string
  label?: string
  tooltip?: string
  helpText?: string
  initValue?: string
  initPolicy?: 'UseValue' | 'UseFixField'
  initFixField?: string
  initValueMode?: 0 | 1
  localMktTz?: string
  increment?: number
  incrementPolicy?: string
  innerIncrement?: number
  innerIncrementPolicy?: string
  outerIncrement?: number
  outerIncrementPolicy?: string
  orientation?: 'HORIZONTAL' | 'VERTICAL'
  radioGroup?: string
  checkedEnumRef?: string
  uncheckedEnumRef?: string
  disableForTemplate?: boolean
  listItems: ListItem[]
  stateRules: StateRule[]
  grid?: { row?: number; col?: number; rowSpan?: number; colSpan?: number }
}

export interface StrategyPanel {
  readonly kind: 'panel'
  title?: string
  collapsed: boolean
  collapsible: boolean
  color?: string
  orientation?: 'HORIZONTAL' | 'VERTICAL' | 'GRID'
  border?: 'None' | 'Line'
  numRows?: number
  numCols?: number
  fillOrder?: 'ROW-MAJOR' | 'COL-MAJOR'
  grid?: { row?: number; col?: number; rowSpan?: number; colSpan?: number }
  children: Array<StrategyPanel | Control>
}

export interface StrategyLayout {
  panels: StrategyPanel[]
}

export interface StateRule {
  enabled?: boolean
  visible?: boolean
  value?: string
  condition: EditNode
}

export type EditNode =
  | { kind: 'logic'; op: 'AND' | 'OR' | 'XOR' | 'NOT'; operands: EditNode[]; id?: string }
  | { kind: 'compare'; field: string; op: 'EX' | 'NX' | 'EQ' | 'NE' | 'LT' | 'GT' | 'LE' | 'GE'; field2?: string; value?: string; id?: string }
  | { kind: 'ref'; id: string }

export interface EditDef {
  id: string
  node: EditNode
}

export interface StrategyEdit {
  errorMsg: string
  condition: EditNode
}

export interface RepeatingGroup {
  fixTag?: number
  minSize: number
  maxSize?: number
  parameters: Parameter[]
  description?: string
}

export interface RegionFilter {
  regions: Array<{
    name: string
    inclusion: 'Include' | 'Exclude'
    countries: Array<{ code: string; inclusion: 'Include' | 'Exclude' }>
  }>
}

export interface MarketFilter {
  micCode: string
  inclusion: 'Include' | 'Exclude'
}

export interface SecurityTypeFilter {
  name: string
  inclusion: 'Include' | 'Exclude'
}

export interface Finding {
  ruleId: string
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion?: string
  specRef?: string
  location: { path: string; line?: number; column?: number }
}

export interface LineIndex {
  getLine(element: Element): number | undefined
}
