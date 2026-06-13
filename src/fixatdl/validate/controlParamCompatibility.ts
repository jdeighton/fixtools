import type { ControlType, ParameterType } from '../model'

export const CONTROL_PARAM_COMPAT: Readonly<Record<ControlType, ReadonlySet<ParameterType> | 'any'>> = {
  // Unconstrained — renders as plain text input
  TextField_t:           'any',
  // Display-only / hidden — no type constraint
  Label_t:               'any',
  HiddenField_t:         'any',
  // List-based controls accept any type that carries enumPairs
  DropDownList_t:        'any',
  EditableDropDownList_t: 'any',
  RadioButtonList_t:     'any',
  CheckBoxList_t:        'any',
  MultiSelectList_t:     'any',
  // Clock renders a time/date picker
  Clock_t: new Set<ParameterType>([
    'UTCTimestamp_t', 'UTCTimeOnly_t', 'TZTimestamp_t', 'TZTimeOnly_t',
    'UTCDateOnly_t', 'LocalMktDate_t', 'MonthYear_t',
  ]),
  // Spinners render numeric steppers
  SingleSpinner_t: new Set<ParameterType>([
    'Int_t', 'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
    'Length_t', 'NumInGroup_t', 'SeqNum_t', 'TagNum_t',
  ]),
  DoubleSpinner_t: new Set<ParameterType>([
    'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
  ]),
  // Slider is a numeric range control
  Slider_t: new Set<ParameterType>([
    'Int_t', 'Float_t', 'Qty_t', 'Price_t', 'PriceOffset_t', 'Amt_t', 'Percentage_t',
  ]),
  // Boolean controls
  CheckBox_t:    new Set<ParameterType>(['Boolean_t']),
  RadioButton_t: new Set<ParameterType>(['Boolean_t']),
  // Duration: elapsed-time picker
  Duration_t: new Set<ParameterType>([
    'UTCTimestamp_t', 'UTCTimeOnly_t', 'TZTimestamp_t', 'TZTimeOnly_t', 'MonthYear_t',
  ]),
}
