import type { ParameterType } from '../model'

// FIXatdl tag 959 (StrategyParameterType) integer codes — PRD Appendix B
export const TAG_959_TYPE_CODES: Record<ParameterType, number> = {
  Int_t:                 1,
  Length_t:              1,
  NumInGroup_t:          1,
  SeqNum_t:              1,
  TagNum_t:              1,
  Float_t:               2,
  Qty_t:                 3,
  Price_t:               4,
  PriceOffset_t:         5,
  Amt_t:                 6,
  Char_t:                7,
  Boolean_t:             8,
  String_t:              9,
  MultipleCharValue_t:  10,
  Percentage_t:         11,
  Currency_t:           12,
  Exchange_t:           13,
  MonthYear_t:          14,
  UTCTimestamp_t:       15,
  UTCTimeOnly_t:        16,
  LocalMktDate_t:       17,
  UTCDateOnly_t:        18,
  data_t:               19,
  MultipleStringValue_t: 20,
  TZTimestamp_t:        15,   // zone-aware timestamp — same code as UTC
  TZTimeOnly_t:         16,   // zone-aware time — same code as UTC
  Tenor_t:               9,   // string-based
  Language_t:            9,
  Country_t:             9,
}
