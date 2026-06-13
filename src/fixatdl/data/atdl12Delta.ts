// Vocabulary delta between FIXatdl 1.1 and 1.2 RC2.
// Source: FIXTradingCommunity/fixatdl-specification v1-2/resources/schema XSDs.
// See docs/fixatdl-12-delta.md for full annotated delta.

// ---------------------------------------------------------------------------
// Namespaces
// ---------------------------------------------------------------------------

export const ATDL_12_NAMESPACES = [
  'http://www.fixprotocol.org/FIXatdl-1-2/Core',
  'http://www.fixprotocol.org/FIXatdl-1-2/Layout',
  'http://www.fixprotocol.org/FIXatdl-1-2/Flow',
  'http://www.fixprotocol.org/FIXatdl-1-2/Validation',
  'http://www.fixprotocol.org/FIXatdl-1-2/Regions',
  'http://www.fixprotocol.org/FIXatdl-1-2/Timezones',
] as const;

// ---------------------------------------------------------------------------
// New elements (core schema)
// ---------------------------------------------------------------------------

export const ATDL_12_NEW_ELEMENTS = [
  'Filter',        // top-level named filter, child of Strategies
  'Clients',       // child of Filter — client-ID filtering dimension
  'Client',        // child of Clients
  'VendorConfig',  // child of Strategy — OMS leg-support hints
  'DeliveryMethods', // child of Strategy — accepted FIX message types
  'FixMsg',        // child of DeliveryMethods
] as const satisfies readonly string[];

export type Atdl12NewElement = (typeof ATDL_12_NEW_ELEMENTS)[number];

// ---------------------------------------------------------------------------
// New control types (layout schema)
// ---------------------------------------------------------------------------

export const ATDL_12_NEW_CONTROL_TYPES = [
  'Duration_t', // time-duration input; initValue: xs:time
] as const satisfies readonly string[];

export type Atdl12NewControlType = (typeof ATDL_12_NEW_CONTROL_TYPES)[number];

// ---------------------------------------------------------------------------
// New attributes — grouped by element
// ---------------------------------------------------------------------------

export const ATDL_12_NEW_ATTRS = {
  Strategy: [
    'filter',              // ref to Filter/@id
    'requiredNumberOfLegs', // replaces removed totalLegs
    'totalLegsTag',
    'legSequenceTag',
    'objective',           // enum: PAIRS | BUTTERFLY | BUY-WRTIE | ...
    'legAreSeverable',
  ],

  Parameter: [
    'filter', // ref to Filter/@id
    'scope',  // ORDER | LEG
  ],

  EnumPair: [
    'filter', // ref to Filter/@id
  ],

  // Grid placement — inherited by StrategyPanel and Control via PanelItem_t
  PanelItem: [
    'row',
    'col',      // NOTE: XSD uses 'col', not 'column' (PRD §4.1 has a typo)
    'rowSpan',
    'colSpan',
  ],

  StrategyPanel: [
    'numRows',   // grid row count (used with orientation="GRID")
    'numCols',   // grid column count
    'fillOrder', // ROW-MAJOR | COL-MAJOR
  ],

  ListItem: [
    'filter', // ref to Filter/@id
  ],

  Clock: [
    'enablingControlType',           // CheckBox | RadioButton
    'disablingControlType',          // CheckBox | RadioButton
    'disablingControlLabel',
    'disablingControlLabelOrientation', // Left | Right | Above | Below
    'displayableDate',
    'editableDate',
    'displayableTimeZone',
    'editableTimeZone',
  ],
} as const satisfies Record<string, readonly string[]>;

// Flat set of all new attribute names for quick membership tests.
export const ATDL_12_NEW_ATTR_NAMES = new Set<string>(
  Object.values(ATDL_12_NEW_ATTRS).flat(),
);

// ---------------------------------------------------------------------------
// New / extended enum values
// ---------------------------------------------------------------------------

// PanelOrientation_t gains GRID alongside existing HORIZONTAL | VERTICAL
export const ATDL_12_NEW_PANEL_ORIENTATIONS = ['GRID'] as const;

// FillOrder_t — new type introduced in 1.2
export const ATDL_12_FILL_ORDER_VALUES = ['ROW-MAJOR', 'COL-MAJOR'] as const;

// Strategy/@objective enum values (RC2)
export const ATDL_12_OBJECTIVE_VALUES = [
  'PAIRS',
  'BUTTERFLY',
  'BUY-WRTIE', // typo preserved from RC2 XSD
  'CALENDAR-SPREAD',
  'PRICE-SPREAD',
  'DIAGONAL-SPREAD',
  'SPREAD',
  'PORTFOLIO',
] as const;

// ---------------------------------------------------------------------------
// Removed attributes (were present in 1.1; absent in 1.2)
// ---------------------------------------------------------------------------

export const ATDL_11_ATTRS_REMOVED_IN_12 = {
  Strategy: [
    'totalLegs',   // replaced by requiredNumberOfLegs
    'totalOrders', // no direct replacement
  ],
} as const satisfies Record<string, readonly string[]>;

// ---------------------------------------------------------------------------
// Deprecated in 1.2 (still in XSD but doc-flagged)
// ---------------------------------------------------------------------------

export const ATDL_12_DEPRECATED_ATTRS = {
  Strategy: ['fixMsgType'],
} as const satisfies Record<string, readonly string[]>;
