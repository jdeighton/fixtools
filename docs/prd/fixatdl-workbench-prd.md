# PRD: FIXatdl Workbench

A new page in the existing FIX Toolkit SPA for loading, validating, exploring, and interactively exercising FIXatdl documents.

**Status:** Draft for issue decomposition
**Target consumer:** Claude Code (this document will be broken into implementation issues)
**Host project:** Existing FIX protocol toolkit — Vite + React SPA, deployable from a `file://` URL, dark mode with orange accents, AG Grid and Vitest already in the dependency tree.

---

## 1. Overview

FIXatdl (FIX Algorithmic Trading Definition Language) is an XML standard for describing the FIX interface of algorithmic order types: parameters, validation rules, GUI layout, and flow-control rules. The Workbench lets a user:

1. Load a FIXatdl document (drag-and-drop, paste, file picker, or bundled sample) and keep a local library of loaded documents.
2. Validate the document against a rule catalog derived from the FIXatdl 1.1 specification (with Errata 20101221), with severity-classified findings and suggested fixes.
3. Browse a Strategy × Parameter matrix in AG Grid.
4. Render a live order ticket for any strategy using the FIXatdl control vocabulary, with full StateRule (flow-control) evaluation, StrategyEdit (validation rule) execution, and generation of the resulting FIX tag/value output in both supported transport modes.

### 1.1 Goals

- Give a developer/support engineer a fast way to sanity-check a broker's FIXatdl file before integration.
- Provide actionable, severity-graded validation output (not raw XSD parser noise).
- Simulate exactly what an E/OMS would put on the wire for a given form state, including the subtle rules around uninitialized controls, `{NULL}`, constValue, and enumID→wireValue mapping.
- Remain a pure client-side feature: no backend, no network calls, works from `file://`.

### 1.2 Non-goals (out of scope)

- True XSD validation via libxml2/WASM. Validation is a custom rule engine (see §5).
- RepeatingGroup message simulation (NewOrder-List 35=E, NewOrder-Multileg 35=AB basket/leg generation). RepeatingGroup parameters are **parsed and displayed** in the matrix with a badge, but the order ticket does not simulate repeating-group messages. A strategy whose only parameters are in a RepeatingGroup renders an informational placeholder in the ticket view.
- Regions / Markets / SecurityTypes filtering logic. These are parsed and **displayed as metadata** on the strategy (chips/summary), but the app does not filter strategies by a simulated order's country/exchange/security type.
- Fetching `imageLocation` / `disclosureDoc` resources. Render as a plain link (and `<img>` with graceful `onerror` fallback for imageLocation); no guarantee of loading under `file://`.
- Editing/round-tripping the FIXatdl XML (read-only tool; a future "apply suggested fix" feature is explicitly deferred).
- FIXatdl authoring assistance beyond the suggested-fix text in validation findings.

---

## 2. Integration & technical constraints

- **New route/page** in the existing SPA (e.g. `/fixatdl` or hash-route equivalent), added to existing navigation. Follow existing routing convention (the app uses hash-based routing compatible with `file://`).
- **No network access at runtime.** All assets (sample file, FIX field name dictionary, tz name list) are bundled at build time. Use Vite `?raw` imports for XML/sample assets.
- **Styling:** reuse the existing dark theme with orange accents, existing component primitives where available. AG Grid uses the project's existing dark theme configuration.
- **State:** page-local state (React); document library persisted to `localStorage`. On `file://`, localStorage generally works in Chromium and Firefox but treat it defensively: wrap all access in try/catch, and if unavailable fall back to in-memory library for the session plus Export/Import Library (JSON file download/upload) so nothing is silently lost.
- **Parsing:** browser-native `DOMParser` only. No XML libraries.
- **Testing:** Vitest. TDD encouraged; the validation rule engine and FIX generation engine are the highest-value test targets (see §10).
- **Module layout suggestion** (align with existing project conventions):

```
src/fixatdl/
  parse/        # DOM → typed model
  model/        # TypeScript types for the FIXatdl object model
  validate/     # rule engine + rule catalog
  runtime/      # form state, StateRule engine, StrategyEdit engine, FIX generator
  components/   # React: InputPanel, LibraryPanel, FindingsList, MatrixGrid,
                #        OrderTicket, controls/*, FixOutputPanel
  fixtures/     # sample + broken test fixtures (also used by demo loader)
  data/         # tag959 type map, FIX standard field name→tag map, tz names
```

The `parse/`, `validate/`, and `runtime/` layers must be pure TypeScript with **no React imports** so they are unit-testable in isolation and reusable.

---

## 3. Feature F1 — Document input & library

### 3.1 Input methods

- **Drag-and-drop** a file onto a drop zone (whole input panel is a valid drop target; visual highlight on dragover). Accept any file; attempt to parse as XML regardless of extension (`.xml`, `.atdl`, `.fixatdl`, `.txt` all seen in the wild).
- **Paste** XML into a textarea. Parse on explicit "Load" button and on paste-detection (debounced) — do not validate on every keystroke; the textarea is an input buffer, not an editor.
- **File picker** button (standard `<input type="file">`).
- **Load sample** button: loads the bundled `SampleStrategiesFor-v1_1.xml` (imported via `?raw` at build time) into the input flow exactly as if pasted — the user needs no local file. Verify the bundled sample is well-formed at build/test time; if the canonical FPL sample has issues (the spec PDF's inline listings contain typographic smart-quotes), include a cleaned copy and note the cleanup in a fixture README.

File size guard: warn above 2 MB, hard-refuse above 10 MB (DOMParser on the main thread; FIXatdl files are typically < 200 KB).

### 3.2 Document library

- Every successfully **parsed** document (well-formed XML with a `Strategies` root — validation findings do not block library entry) is saved to the library.
- Library entry: `{ id, name, source ('file'|'paste'|'sample'), addedAt, lastOpenedAt, detectedVersion, strategyCount, findingCounts: {error, warning, info}, xml }`. Name defaults to filename, or `providerID`/first strategy name for pasted content; user-renamable.
- Library UI: sidebar or dropdown listing entries with name, version badge, strategy count, and error/warning count badges. Selecting an entry re-parses and re-validates (results are not persisted — they are cheap to recompute and the rule catalog will evolve).
- Operations: rename, delete, delete-all, export library (JSON), import library (JSON). Duplicate detection by content hash → offer "replace timestamp / keep both".
- Storage key namespaced (e.g. `fixtoolkit.fixatdl.library.v1`). Migrate-or-discard on schema version bump.

---

## 4. Feature F2 — Parsing & object model

Build a typed object model from the DOM. Parsing is **lenient**: it captures everything it can and records structural problems as validation findings rather than throwing (a single bad parameter must not prevent the matrix and other strategies from rendering).

### 4.1 Version detection

Detect by the Core namespace URI of the root `Strategies` element (also check default xmlns and prefixed declarations):

| Detected | Namespace contains | Support level |
|---|---|---|
| 1.1 | `FIXatdl-1-1` (e.g. `http://www.fixprotocol.org/FIXatdl-1-1/Core`) | Full — primary target |
| 1.0 | `FIXatdl-1-0` | Best-effort: parse what maps onto the 1.1 model; finding `NS-005` (info) "FIXatdl 1.0 detected — validated against 1.1 rules; expect differences (e.g. CFICode-based security types, combined data/GUI model)" |
| 1.2 | `FIXatdl-1-2` (fixprotocol.org or fixtrading.org host) | RC-level: parse 1.1-compatible core fully; recognize documented 1.2 additions; finding `NS-006` (info) noting 1.2 is a Release Candidate |
| unknown | anything else / missing | Error `NS-002`; attempt parse anyway in "no-namespace" tolerant mode if root local-name is `Strategies` |

**FIXatdl 1.2 specifics** (1.2 is Release Candidate status — RC1/RC2 published by the FIX Trading Community; never formally ratified as of this writing):
- **Grid layout:** controls/panels may carry row/column grid-placement attributes instead of relying solely on nested orientation panels. Parse and honor these for layout when present (CSS grid maps naturally). If implementation encounters undocumented grid attributes, lay out in document order and emit info finding `LY-090` ("1.2 grid attribute X not supported; falling back to flow layout").
- **Parameter/control-level filtering:** Regions/Markets/SecurityTypes-style filter constructs may appear on Parameter and Control elements, not only Strategy. Parse and display as metadata badges (consistent with the strategy-level non-goal); do not filter.
- **General rule for 1.2:** any element/attribute not in the 1.1 vocabulary and not recognized as a known 1.2 addition produces info finding `NS-007` ("Unrecognized element/attribute X — may be a FIXatdl 1.2 construct not yet supported") — never an error. The implementation should fetch the RC2 schema files from `github.com/FIXTradingCommunity/fixatdl-specification` **at development time** to refine the 1.2 vocabulary list; runtime stays offline.

### 4.2 Model (TypeScript sketch)

```ts
interface AtdlDocument {
  version: '1.0' | '1.1' | '1.2' | 'unknown';
  namespaces: Record<string, string>;
  strategies: Strategy[];
  strategyIdentifierTag?: number;
  versionIdentifierTag?: number;
  tag957Support: boolean;            // default false
  changeStrategyOnCxlRpl?: boolean;
  draftFlagIdentifierTag?: number;
  imageLocation?: string;
  description?: string;
  globalEdits: EditDef[];            // Edits declared at Strategies level (must have id)
  findings: Finding[];               // structural problems found during parse
  sourceLineIndex: LineIndex;        // see §5.4
}

interface Strategy {
  name: string; uiRep?: string; wireValue: string; version?: string;
  fixMsgType?: 'D' | 'E' | 'AB' | 's';
  providerID?: string; providerSubID?: string;
  disclosureDoc?: string; imageLocation?: string; sentOrderLink?: string;
  totalOrders?: number; totalLegs?: number; totalOrdersTag?: number;
  commonIDTag?: number; orderSequenceTag?: number;
  regions?: RegionFilter; markets?: MarketFilter[]; securityTypes?: SecurityTypeFilter[];
  parameters: Parameter[];           // top-level (non-repeating-group)
  repeatingGroup?: RepeatingGroup;   // parsed, displayed, not simulated
  strategyEdits: StrategyEdit[];
  strategyEdits_localEdits: EditDef[]; // Edits declared at Strategy level (must have id)
  layout?: StrategyLayout;
  description?: string;
}

interface Parameter {
  name: string;
  xsiType: ParameterType;            // 'Int_t' | 'Float_t' | ... (29 types)
  fixTag?: number;
  use: 'optional' | 'required';      // default optional
  constValue?: string;
  minValue?: string; maxValue?: string;   // raw; typed interpretation in runtime
  minLength?: number; maxLength?: number;
  precision?: number; multiplyBy100?: boolean;
  mutableOnCxlRpl?: boolean;         // default true
  revertOnCxlRpl?: boolean;          // default false
  definedByFIX?: boolean;            // default false
  localMktTz?: string;
  invertOnWire?: boolean;
  trueWireValue?: string; falseWireValue?: string; // deprecated, still honored
  enumPairs: { enumID: string; wireValue: string }[];
  description?: string;
}

interface Control {
  id: string;
  xsiType: ControlType;              // 15 types
  parameterRef?: string;
  label?: string; tooltip?: string; helpText?: string;
  initValue?: string; initPolicy?: 'UseValue' | 'UseFixField'; initFixField?: string;
  initValueMode?: 0 | 1;             // Clock_t
  localMktTz?: string;
  increment?: number; incrementPolicy?: string;
  innerIncrement?: number; innerIncrementPolicy?: string;
  outerIncrement?: number; outerIncrementPolicy?: string;
  orientation?: 'HORIZONTAL' | 'VERTICAL';
  radioGroup?: string;
  checkedEnumRef?: string; uncheckedEnumRef?: string;
  disableForTemplate?: boolean;
  listItems: { enumID: string; uiRep: string }[];
  stateRules: StateRule[];
  // 1.2: grid placement (optional)
  grid?: { row?: number; column?: number; rowSpan?: number; colSpan?: number };
}

interface StateRule {
  enabled?: boolean; visible?: boolean; value?: string; // value may be '{NULL}'
  condition: EditNode;               // resolved Edit or EditRef
}

type EditNode =
  | { kind: 'logic'; op: 'AND' | 'OR' | 'XOR' | 'NOT'; operands: EditNode[]; id?: string }
  | { kind: 'compare'; field: string; op: 'EX'|'NX'|'EQ'|'NE'|'LT'|'GT'|'LE'|'GE';
      field2?: string; value?: string; id?: string }
  | { kind: 'ref'; id: string };     // resolved during a link pass

interface StrategyEdit { errorMsg: string; condition: EditNode; }
```

A **link pass** after raw parsing resolves: `parameterRef` → Parameter, `EditRef/@id` → Edit (Strategy scope first, then Strategies scope), ListItem enumIDs → EnumPairs. Unresolved references stay in the model as dangling (so the UI can show them) and produce error findings.

---

## 5. Feature F3 — Validation engine

### 5.1 Design

A custom rule engine (decision: no XSD/WASM). Three phases, each feeding the next; later phases run on whatever survived:

1. **Well-formedness** — `DOMParser`, detect `parsererror`, extract line/column from the browser's error text where available.
2. **Structural** — element placement, required attributes, attribute value domains, ID patterns. Driven by a declarative vocabulary table (element → allowed children, allowed/required attributes per version) so 1.0/1.1/1.2 differences live in data, not code.
3. **Semantic / cross-reference** — the constraints in the spec's "Dependencies and Structural Constraints beyond XML Schema" table, transport rules, type-compatibility checks, enum coverage, deprecation notices.

Each rule emits zero or more `Finding`s:

```ts
interface Finding {
  ruleId: string;                 // e.g. 'ED-001'
  severity: 'error' | 'warning' | 'info';
  message: string;                // what is wrong, with actual values interpolated
  suggestion?: string;            // concrete fix, ideally with corrected snippet
  specRef?: string;               // e.g. 'Spec §Dependencies, constraint 1'
  location: { path: string;      // human XPath-ish: Strategy[Tazer1]/Parameter[Variance]
              line?: number; column?: number };
}
```

**Severity policy (per requirements):**
- `error` — breaks compatibility with the spec; a conforming E/OMS may reject or misinterpret the document.
- `warning` — spec-legal but problematic: deprecated constructs, ambiguities, things that commonly cause interop pain; changing them improves compatibility.
- `info` — version notices, best-practice notes, unsupported-construct notices.

### 5.2 Validation rule catalog

This catalog is normative for the implementation. Each rule gets at least one positive and one negative Vitest case. Rule IDs are stable (used in tests, docs, and UI filtering).

#### Well-formedness & document (WF)

| ID | Sev | Check | Suggestion pattern |
|---|---|---|---|
| WF-001 | error | XML parses without `parsererror` | Quote browser error; point at line/col |
| WF-002 | warning | XML declaration present (`<?xml version="1.0" ...?>`) | "Add `<?xml version=\"1.0\" encoding=\"UTF-8\"?>`" |
| WF-003 | warning | Declared encoding is UTF-8 (spec: explicit UTF-8 support) | Recommend UTF-8 |
| WF-004 | warning | Smart/typographic quotes (`" " ' '`) detected in markup (common when copied from the spec PDF) | "Replace typographic quotes with ASCII quotes" + first offending line |

#### Namespaces & root (NS)

| ID | Sev | Check |
|---|---|---|
| NS-001 | error | Root element local-name is `Strategies` |
| NS-002 | error | Core namespace recognized (else version 'unknown') |
| NS-003 | error | Sub-schema namespaces (Validation/Layout/Flow) match the Core version — no mixing of 1.0/1.1/1.2 namespaces |
| NS-004 | error | `xsi` namespace (`http://www.w3.org/2001/XMLSchema-instance`) declared when any `xsi:type` is used |
| NS-005 | info | 1.0 detected — best-effort notice |
| NS-006 | info | 1.2 detected — RC support notice |
| NS-007 | info | Unrecognized element/attribute under a 1.2 namespace |

#### Strategies element (ST)

| ID | Sev | Check |
|---|---|---|
| ST-001 | error | `strategyIdentifierTag` present (required by spec) and a positive integer |
| ST-002 | error | At least one `Strategy` child |
| ST-003 | error | Transport rule: if `tag957Support` is false/absent, **every** wire-bound Parameter (no `constValue` exemption — constValue parameters also need a fixTag) must have `fixTag`. Per spec table: tag957Support=false + no fixTags = "Not allowed". |
| ST-004 | warning | `versionIdentifierTag` absent while strategies carry `version` values — version can't be transmitted |
| ST-005 | warning | Duplicate `Strategy/@wireValue` across strategies (recipient can't distinguish) |

#### Strategy (SG)

| ID | Sev | Check |
|---|---|---|
| SG-001 | error | `name` present, valid StringID, unique across the document |
| SG-002 | error | `wireValue` present (required) |
| SG-003 | error | `version` present (required by spec attribute table) |
| SG-004 | info | `uiRep` absent — UI falls back to `name` |
| SG-005 | error | `fixMsgType`, if present, one of D / E / AB / s |
| SG-006 | warning | `fixMsgType` E or AB without a `RepeatingGroup` (or vice versa: RepeatingGroup with fixMsgType D) |
| SG-007 | error | Region/Country/Market/SecurityType `inclusion` values are exactly `Include` or `Exclude`; Region names from the 3-value enum; Country codes match `[A-Z0-9]{2}` |
| SG-008 | warning | Redundant Exclude alongside an Include at the same level (spec: Include takes precedence; the Exclude is unnecessary) |

#### Parameter (PA)

| ID | Sev | Check |
|---|---|---|
| PA-001 | error | `name` matches `[A-Za-z][A-Za-z0-9_]{0,255}` |
| PA-002 | error | `name` unique within strategy (including RepeatingGroup parameters) |
| PA-003 | error | `xsi:type` present and one of the 29 valid parameter types |
| PA-004 | error | `fixTag`, if present, positive integer |
| PA-005 | error | No `fixTag` and document `tag957Support` ≠ true (per-parameter complement of ST-003) |
| PA-006 | warning | Duplicate `fixTag` within a strategy |
| PA-007 | error | `minValue`/`maxValue`/`constValue` parse as the type implied by `xsi:type` (e.g. `minValue="abc"` on Int_t) |
| PA-008 | error | `minValue` ≤ `maxValue` when both present and comparable |
| PA-009 | warning | min/max/precision/maxLength/etc. present on an `xsi:type` where the Parameter Type-Attribute Matrix marks them Not Applicable (list the attribute and type; "attribute will be ignored by conforming implementations") |
| PA-010 | error | `use`, if present, is `optional` or `required` |
| PA-011 | warning | `trueWireValue`/`falseWireValue` used (deprecated) — suggestion: rewrite as Char_t/String_t with two EnumPairs bound to a CheckBox with checked/uncheckedEnumRef (per spec migration note) |
| PA-012 | warning | `multiplyBy100` used — spec: not recommended; suggest integer parameter |
| PA-013 | warning | Parameter has `constValue` **and** is referenced by a Control (constants should have no GUI representation) |
| PA-014 | warning | `localMktTz` value not in the bundled Olson/tz name list (list from spec Appendix 1, bundled as data) |
| PA-015 | error | `localMktTz` absent on UTCTimestamp_t parameter that has time-only constValue/minValue/maxValue (spec: used in conjunction) — downgrade to warning if no such values present |
| PA-016 | error | EnumPair `enumID` unique within the parameter |
| PA-017 | warning | EnumPair `wireValue` duplicated within the parameter (legal XML, ambiguous reverse mapping) |
| PA-018 | info | EnumPair `index` attribute present — deprecated, ignored |
| PA-019 | warning | `fixTag` in standard range (1–5000) without `definedByFIX="true"` — suggestion: add `definedByFIX="true"` if intentionally redefining a standard tag |
| PA-020 | warning | `revertOnCxlRpl="true"` without explicit `mutableOnCxlRpl="false"` (spec recommended practice note) |
| PA-021 | error | EnumPair missing `enumID` or `wireValue` (both required) |

#### Control (CT)

| ID | Sev | Check |
|---|---|---|
| CT-001 | error | `ID` present, valid StringID, unique within strategy |
| CT-002 | error | `xsi:type` one of the 15 valid control types; absence is an error in 1.1 (errata removed the "absent = hidden" interpretation) — suggest `HiddenField_t` for non-displayed values |
| CT-003 | error | `parameterRef`, if present, resolves to a Parameter in the same strategy (spec constraint 8) |
| CT-004 | error | If control has ListItems **and** a parameterRef: parameter must have EnumPairs, and each ListItem `enumID` must match exactly one EnumPair `enumID` (constraint 9) |
| CT-005 | warning | EnumPairs of the bound parameter not covered by any ListItem (user can never produce those wire values) — list the orphaned enumIDs |
| CT-006 | error | `checkedEnumRef`/`uncheckedEnumRef` present without `parameterRef`, or values not matching the bound parameter's EnumPair enumIDs (constraint 10) |
| CT-007 | warning | Control/parameter type pairing implausible (CheckBox_t bound to Float_t; Clock_t bound to non-time type; list-type control bound to parameter without EnumPairs, etc.) — maintain an explicit compatibility table |
| CT-008 | error | `initValue` not parseable as the control's initValue type (per spec table: Clock_t→time, CheckBox_t→"true"/"false", SingleSpinner_t→double, DropDownList_t→enumID of a child ListItem, etc.). Unknown enumID in initValue for list controls is an error |
| CT-009 | error | `initPolicy="UseFixField"` without `initFixField`; or `initFixField` not matching `FIX_<FieldName>` format |
| CT-010 | warning | Clock_t with `initValue` but no `localMktTz` (spec: required when initValue supplied) |
| CT-011 | error | `orientation` missing on RadioButtonList_t / CheckBoxList_t (errata flipped this attribute to required) — suggest a default |
| CT-012 | warning | `radioGroup` on a non-RadioButton_t control; or RadioButton_t controls sharing a radioGroup bound to **different** parameters without checked/uncheckedEnumRef coherence |
| CT-013 | error | ListItem missing `enumID` while parent control has `parameterRef` (required in that case); ListItem missing `uiRep` |
| CT-014 | warning | Attribute present that the Control Type-Attribute Matrix marks Not Applicable for this xsi:type (e.g. `increment` on a TextField_t) |
| CT-015 | warning | Multiple controls bound to the same parameter where the controls are not all RadioButton_t (spec: many-to-one is only for radio button groups) |
| CT-016 | warning | Label_t with neither `label` nor `initValue` (nothing to render; initValue takes precedence when both present) |

#### Layout (LY)

| ID | Sev | Check |
|---|---|---|
| LY-001 | error | StrategyLayout, if declared, contains at least one StrategyPanel |
| LY-002 | error | StrategyPanel mixes Control and StrategyPanel children (constraint 3: all-controls or all-panels) |
| LY-003 | error | StrategyPanel missing `orientation` (errata: required) — suggest VERTICAL |
| LY-004 | info | `collapsible` unspecified — spec notes default-value conflict between document and schema; recommend treating as required |
| LY-005 | warning | Parameter with no `constValue` and no bound Control (cannot ever be populated by a user; fine if intentional, e.g. populated by EOMS logic) |
| LY-006 | info | `color` attribute present — spec recommends vendors ignore it |
| LY-090 | info | 1.2 grid attribute not supported → flow-layout fallback |

#### Edits, StateRules, StrategyEdits (ED)

| ID | Sev | Check |
|---|---|---|
| ED-001 | error | Edit has exactly one of `operator` / `logicOperator` (constraints 1, 6) |
| ED-002 | error | `field2` and `value` both present (constraint 2: mutually exclusive) |
| ED-003 | error | Comparison operator in {EQ,NE,LT,GT,LE,GE} without `value` or `field2` |
| ED-004 | error | `operator` present without `field` |
| ED-005 | error | Edit under a **StateRule**: `field`/`field2` must reference a Control ID in the same strategy |
| ED-006 | error/warning | Edit under a **StrategyEdit**: `field`/`field2` must reference a Parameter name (error if it matches neither a parameter nor `FIX_*`) or a `FIX_`-prefixed standard field. Unknown `FIX_X` name (checked against bundled FIX field dictionary) = **warning** only — spec says unsupported fields cause the rule to be skipped, not rejected |
| ED-007 | error | Edit with child Edits must use `logicOperator`, not `operator` (constraint 6) |
| ED-008 | error | `EditRef/@id` does not resolve at Strategy or Strategies scope |
| ED-009 | error | Edit declared directly under Strategies/Strategy without `id` (required there) |
| ED-010 | warning | `value` type incompatible with the referenced field's type (constraints 5, 7) — e.g. comparing Int_t parameter to `value="abc"`. Also: StrategyEdit `value` should be a **wireValue** for enumerated parameters; flag values that look like enumIDs |
| ED-011 | error | StateRule Edit `value` references an enumID not among the target control's ListItems (when the control has ListItems) |
| ED-012 | error | StrategyEdit missing `errorMsg` (required) |
| ED-013 | error | StrategyEdit / StateRule has neither Edit nor EditRef, or both (xor per hierarchy diagrams) |
| ED-014 | warning | `NOT` with more than one operand (semantics undefined; engine will apply NOT to the first operand) |
| ED-015 | error | StateRule `value="{NULL}"` combined with enabled/visible in the same StateRule is fine, but a StateRule with **no** action attribute (none of enabled/visible/value) is an error |
| ED-016 | warning | Circular/self-referencing StateRule chains detected (control A's rule reads control B whose rule writes control A's value, etc.) — engine guards at runtime; warn statically when a value-setting cycle is syntactically present |

#### RepeatingGroup (RG)

| ID | Sev | Check |
|---|---|---|
| RG-001 | error | `minSize` present (required); `maxSize` ≥ `minSize` when both present |
| RG-002 | error | `name`, if present, is `TotNoOrders` or `NoLegs`; `fixTag`, if present, is 555 or 68 |
| RG-003 | info | RepeatingGroup present — message simulation out of scope notice |

### 5.3 Findings UI

- Summary header: N errors / N warnings / N infos, with severity filter toggles and a rule-ID search box.
- Each finding row: severity icon (red/amber/blue with the orange-accent theme), ruleId chip, location path, message; expandable to show suggestion + spec reference + source line excerpt (3 lines of context with the offending line highlighted).
- Clicking a finding scrolls/highlights the corresponding line in a read-only source view (see §5.4).
- "Copy findings" → markdown table to clipboard (useful for filing issues against a broker's file).
- Documents with errors still render the matrix and ticket for whatever parsed successfully; a banner notes degraded mode.

### 5.4 Line mapping

`DOMParser` does not expose source positions. Implement a lightweight `LineIndex`: after parse, locate elements in the raw text by walking occurrences of `<ElementName` in document order and matching them to the DOM traversal order (same traversal sequence). This is approximate for pathological documents but reliable for real-world FIXatdl. Findings fall back to path-only location when a line cannot be confidently matched. Unit-test the index against the sample file.

---

## 6. Feature F4 — Strategy × Parameter matrix

AG Grid (already a project dependency), project dark theme.

- **Rows:** one per unique parameter name across all strategies in the document (union). Row grouping optional/deferred.
- **Pinned left columns:** Parameter name, xsi:type, fixTag.
- **One column per strategy** (header: `uiRep ?? name`, with version in a header tooltip). Cell content when the strategy defines that parameter:
  - Badge `R` (required) or `O` (optional) — color-coded (orange for required fits the theme).
  - fixTag if it differs per strategy (same parameter name may map to different tags across strategies; the pinned fixTag column shows the common value or `varies`).
  - `C` badge for constValue parameters (tooltip shows the constant).
  - `⟳` badge for RepeatingGroup membership.
  - Empty cell = parameter not defined for that strategy.
- Cell tooltip: full parameter detail (type, tag, use, min/max, enum count, description).
- Clicking a strategy column header opens that strategy in the order ticket (F5).
- Clicking a row opens a parameter detail side panel: all attributes, EnumPair table, bound control(s), StateRules/StrategyEdits that reference it.
- Quick filter box (AG Grid quickFilter) and CSV export (AG Grid built-in).
- A second, simpler grid tab "Strategies" lists strategy-level metadata: name, uiRep, wireValue, version, fixMsgType, provider, regions/markets/security-type summary chips, parameter count, control count, edit-rule count.

---

## 7. Feature F5 — Interactive order ticket

### 7.1 Strategy selection & shell

- Strategy picker (dropdown using uiRep, showing wireValue and version as secondary text) — this mirrors what an E/OMS shows the trader, and itself demonstrates `Strategies/@strategyIdentifierTag` behavior.
- Render the `StrategyLayout` panel tree: nested panels with HORIZONTAL → flex-row, VERTICAL → flex-column; `title` as a fieldset-style legend; `collapsible`/`collapsed` honored with a chevron toggle; `border="Line"` → 1px themed border, `None` → none; `color` ignored per spec recommendation (LY-006).
- 1.2 grid placement → CSS grid when grid attributes present on the children of a panel.
- Strategies without a StrategyLayout (legal — layout is optional in 1.1): auto-generate a fallback layout, one default control per non-const parameter chosen by type (enum→DropDownList, Boolean→CheckBox, numeric→SingleSpinner, timestamps→Clock, else TextField), with an info banner "No StrategyLayout declared — showing generated form".

### 7.2 Control rendering (FIXatdl → React mapping)

All controls are controlled components writing into a single `ticketState: Map<controlId, ControlValue>` where `ControlValue = { raw: string | string[] | boolean | number | null; initialized: boolean }`. "Uninitialized" is a first-class state (renders as empty; excluded from wire output) distinct from an explicit empty string.

| FIXatdl control | React rendering | Notes |
|---|---|---|
| CheckBox_t | `<input type="checkbox">` | Always initialized (checked/unchecked). checked/uncheckedEnumRef drive wire mapping |
| CheckBoxList_t | checkbox group, `orientation` → flex direction | Multi-value; output space-delimited per MultipleStringValue |
| Clock_t | `<input type="time" step="1">`; add a date input when the bound parameter type carries a date (UTCTimestamp_t/TZTimestamp_t/LocalMktDate_t/UTCDateOnly_t) | `initValue` in `localMktTz`; `initValueMode=1` → use max(initValue, now); render a small tz hint label |
| DoubleSpinner_t | custom component: numeric display + two stacked arrow pairs | outer pair steps by outerIncrement, inner by innerIncrement; incrementPolicy LotSize/Tick falls back to the static increment value (no symbol data) with a tooltip noting the fallback |
| DropDownList_t | `<select>` | options = ListItems (uiRep shown, enumID stored) |
| EditableDropDownList_t | combobox: text input + filtered dropdown (or `<datalist>` if acceptable in target browsers) | free text allowed; if text matches a uiRep, store its enumID, else store raw text |
| HiddenField_t | not rendered; value lives in state | shown in a collapsible "Hidden fields" debug strip on the ticket |
| Label_t | static text | `initValue` takes precedence over `label` (errata); value updatable by StateRule |
| MultiSelectList_t | `<select multiple>` | space-delimited output |
| RadioButton_t | `<input type="radio">`, grouped by `radioGroup` | many-to-one parameter binding allowed; checked/uncheckedEnumRef per button |
| RadioButtonList_t | radio group with `orientation` | stores selected enumID |
| SingleSelectList_t | `<select size={n}>` listbox | stores enumID |
| SingleSpinner_t | `<input type="number">` with step=increment | incrementPolicy fallback as DoubleSpinner |
| Slider_t | `<input type="range">` | With ListItems: discrete positions mapping to enumIDs with tick labels (uiRep). Without: continuous between bound parameter's min/max using `increment` as step |
| TextField_t | `<input type="text">` | maxLength from bound parameter |

Common control chrome: `label`, `tooltip` (title attr + themed tooltip), `HelpText` (ⓘ icon → popover), required-parameter indicator (orange asterisk when bound parameter `use="required"`), disabled and hidden visual states.

**Initialization order** per spec: `initPolicy="UseFixField"` → read from the standard-fields panel (§7.5) by `FIX_<name>`; if unavailable fall back to `initValue`; if neither, uninitialized. Default policy is UseValue.

### 7.3 StateRule engine (flow control)

- Evaluated **live**: on every control value change, re-evaluate all StateRules of all controls in the strategy (documents are small; full re-evaluation is simpler and matches "evaluated every time a Control's value has changed"). Also evaluated once after initialization.
- Condition evaluation: Edit trees over **control values** (Edit/@field = Control ID). Operators EX (initialized), NX (uninitialized), EQ/NE/LT/GT/LE/GE with type-aware comparison (numeric if both sides numeric, else string; enumID comparison for list controls per spec — Edit/@value holds an enumID in StateRule context). AND/OR short-circuit left-to-right preserving document order; XOR = exactly-one-true (no short-circuit); NOT applies to first operand.
- Action semantics (spec conventions i–iv):
  - `enabled=X` / `visible=X`: condition true → property X; condition false → property NOT(X). Implementation: compute each rule's contribution every pass; a control's effective enabled/visible is the AND of base state and all rule outcomes (document order; last writer wins on direct conflict — note this in code comments as an interpretation, and surface conflicting rules via ED-016-adjacent runtime console warnings in dev builds).
  - `value=V` on false→true transition: set control value to V (enumID for list controls, literal otherwise). No action when condition goes true→false (convention iii) **unless** V is `{NULL}`.
  - `value="{NULL}"` on false→true: revert control to previous non-NULL value or initial value (convention iv) — maintain a per-control "last non-NULL value" register. A control may end up uninitialized.
- Transition detection requires storing each rule's previous boolean result; initialize all to false before the first pass, then run passes until fixpoint (cap at 10 iterations; emit dev warning on non-convergence — guards ED-016 cycles).
- Disabled/hidden controls **retain their values** and those values still go on the wire (spec is explicit); the only thing that suppresses wire output is uninitialized/{NULL} state. The UI should make this teachable: a subtle dot on disabled-but-valued controls with tooltip "value will still be transmitted".

### 7.4 StrategyEdit engine (validation rules)

- Run **on demand**: a "Validate & Generate FIX" button (matching order-generation-time semantics). Also re-run automatically while the FIX output panel is open so it stays live once the user has asked for it.
- Evaluation context is **parameter wire values** (Edit/@field = parameter name; Edit/@value compared against **wireValue**, not enumID) plus `FIX_*` standard fields from the standard-fields panel. Parameter wire value = resolved per §7.6 from its bound control(s) / constValue.
- A rule whose Edit references an unknown/unsupported field is **skipped** (treated as passing) per spec, with an info chip on the results ("rule skipped: FIX_Foo unsupported").
- Failures render as a list of `errorMsg` strings above the FIX output, each expandable to show the rule's Edit tree with per-node evaluated values (true/false coloring) — this is a debugging tool, lean into explainability.
- Built-in checks run alongside StrategyEdits: required parameters (use="required") with no wire value; min/max/minLength/maxLength/precision violations against the parameter declarations. These are labeled "data contract" failures to distinguish them from the document's own StrategyEdits.

### 7.5 Standard order fields panel

A compact panel above the ticket with simulated standard FIX fields, enough to resolve `FIX_*` references and `initFixField`:

- ClOrdID(11) — auto-generated, editable
- Symbol(55), Side(54), OrderQty(38), OrdType(40), Price(44), TimeInForce(59), TransactTime(60, auto)
- An "add field" affordance to supply any other `FIX_<name>=value` pair on demand — when a loaded document references a FIX_ field not in the default set, prompt inline to provide it (or leave unset → EX/NX semantics apply).
- Backed by a bundled FIX field dictionary (name→tag for FIX 4.4/5.0 common fields; a few hundred entries, generated at build time — reuse the dictionary already present in the FIX toolkit if one exists).

### 7.6 FIX output panel (wire simulation)

Renders continuously once generated; updates with form state while open.

**Wire value resolution per parameter:**
1. `constValue` → that value always (with UTCTimestamp_t + localMktTz combination logic from the spec: constValue carries time-of-day; combine with current date in localMktTz, convert to UTC `YYYYMMDD-HH:MM:SS`).
2. Otherwise from bound control(s): uninitialized or `{NULL}` → **omit tag entirely**. RadioButton groups → the checked button's checkedEnumRef (or uncheckedEnumRef of others as applicable). CheckBox_t with checked/uncheckedEnumRef → mapped EnumPair wireValue; without → Boolean Y/N (honoring deprecated true/falseWireValue, including `{NULL}` sentinel = omit). List controls → selected enumID's EnumPair wireValue. Multi-selects → space-delimited wireValues.
3. Type formatting: precision rounding (Float_t/Price_t/PriceOffset_t/Qty_t); Percentage_t with `multiplyBy100`; UTCTimestamp_t from Clock_t value + control/parameter localMktTz → UTC; Char_t single char; `invertOnWire` noted as unsupported (info chip) if encountered.

**Message assembly (NewOrderSingle 35=D primary):**
- Header-ish fields shown for context but visually de-emphasized: 35=D, 11, 55, 54, 38, 40, 44 (when set), 59, 60.
- `strategyIdentifierTag=wireValue`, `versionIdentifierTag=strategy version` (when declared).
- **Transport mode toggle** (visible when `tag957Support="true"` and fixTags exist — per the spec's table the EOMS chooses one, never both):
  - **UDF mode:** `fixTag=wireValue` pairs.
  - **957 mode:** `957=N` then repeating `958=<paramName> 959=<typeCode> 960=<wireValue>` triplets, using the tag-959 type-code map in Appendix B.
  - When only one mode is legal (tag957Support=false → UDF; no fixTags → 957), toggle is locked with an explanatory tooltip referencing the spec's decision table.
- **Display:** pipe-delimited human view (`35=D|11=...|7000=v|...`) with tag-name tooltips, plus a "raw" toggle using SOH rendered as `␁`, plus copy button (copies with `|` or SOH per a setting). Reuse the existing FIX message rendering components from the toolkit's parser page if API-compatible — preferred over new code.
- Field provenance: hovering a tag highlights the originating control in the ticket and vice versa.

**Cancel/Replace simulation (stretch, separate issue):**
- Toggle to 35=G mode after a 35=D has been "sent" (a Send button snapshots the order). In G mode: controls for parameters with `mutableOnCxlRpl=false` are locked with a tooltip; clearing a control on a parameter with `revertOnCxlRpl=true` shows the original value ghosted and re-includes it on the wire; `revertOnCxlRpl=false` (default) → cleared = omitted (or Control/@initValue default per spec text). `changeStrategyOnCxlRpl=false` locks the strategy picker in G mode. 35=F (cancel) is out of scope.

---

## 8. Page layout & UX summary

Three-region layout consistent with the existing toolkit pages:

1. **Left rail:** document library + input zone (collapsible).
2. **Main area, tabbed:** `Validation` (findings + source view) | `Matrix` (AG Grid) | `Order Ticket` (strategy picker, standard fields, rendered ticket, StrategyEdit results, FIX output).
3. Persistent header strip for the active document: name, version badge, provider, strategy count, findings summary (clicking jumps to Validation tab).

Empty state (no document): drop zone front and center with the "Load sample" call to action.

Keyboard/general: all interactive controls reachable by keyboard; findings list and grids navigable; no reliance on color alone for severity (icons + text).

---

## 9. Bundled data assets

| Asset | Source | Build-time form |
|---|---|---|
| `SampleStrategiesFor-v1_1.xml` | provided file (cleaned if needed) | `?raw` import |
| tz name list | spec Appendix 1 (LocalMktTz) | string-array TS module |
| FIX field name→tag dictionary | existing toolkit dictionary if present; else generate from FIX 4.4/5.0 repository data | TS module |
| Tag 959 type-code map | Appendix B below | TS module |
| 1.1 vocabulary tables (elements/attributes/required/applicability matrices) | spec attribute tables + the six 1-1 XSDs (provided) | TS module driving structural validation |
| 1.2 vocabulary delta | FIXTradingCommunity/fixatdl-specification RC2 schemas (fetched at dev time) | TS module |

---

## 10. Testing strategy

Vitest throughout; `parse/`, `validate/`, `runtime/` are pure TS and carry the bulk of coverage.

- **Validation rules:** one `describe` per rule ID; each rule has ≥1 fixture that triggers it and ≥1 near-miss that must not. Fixtures live in `src/fixatdl/fixtures/broken/` named by rule ID (`ED-001-both-operators.xml`). A meta-test asserts every catalog rule ID has at least one fixture.
- **Golden file:** the bundled sample must parse with **zero errors** (warnings/infos asserted explicitly so changes are deliberate). Snapshot the parsed model.
- **StateRule engine:** table-driven tests for conventions i–iv, including: enable/disable implicit inversion; `{NULL}` revert-to-previous; value-set on transition only; XOR exactly-one; short-circuit order dependence (an OR whose second operand would NX-crash); fixpoint convergence and the 10-iteration cap.
- **StrategyEdit engine:** the spec's worked examples as test cases (StartTime<EndTime; ParticipationRate NX-or-range; FIX_TimeInForce IOC rule with the skip-unknown-field behavior).
- **FIX generation:** golden-string tests for the spec's two worked transport examples (PctVol/FC: `957=2|958=PctVol|959=11|960=0.15|958=FC|959=13|960=Y` and the UDF equivalent `7002=0.15|7003=Y`); constValue UTCTimestamp tz-combination example (`08:30:00` America/Chicago in DST → `...-13:30:00`); omission of uninitialized/{NULL}; multiplyBy100; precision rounding.
- **Component tests** (lighter): each control type renders, accepts input, reflects disabled/hidden, and round-trips through ticketState. One integration test drives the spec's Tazer sample: select "Send 0" in DQHandling → DisplayQty disabled with value 0 → appears as `7645=0`; select "Send nothing" → omitted.
- **LineIndex:** positions verified against known line numbers in the sample.
- **Library persistence:** localStorage mocked; quota-exceeded and unavailable paths exercised.

---

## 11. Suggested issue decomposition (build order)

1. **Scaffold:** route/page, three-region layout shell, tab structure, theming hookup.
2. **Model + parser:** TS types, DOMParser pipeline, version detection, link pass, LineIndex. (Tests: golden sample snapshot.)
3. **Input & library:** drop/paste/picker/sample, localStorage library with export/import.
4. **Validation engine core + WF/NS/ST/SG rules.**
5. **Validation PA/CT rules** (incl. type-attribute applicability matrices as data).
6. **Validation LY/ED/RG rules** (cross-reference + Edit constraints).
7. **Findings UI + source view with line highlighting.**
8. **Matrix grids** (parameter matrix + strategies grid, detail side panel).
9. **Ticket shell:** strategy picker, panel tree renderer, fallback layout generator.
10. **Control components** (15 types; DoubleSpinner and EditableDropDownList are the only custom-heavy ones).
11. **StateRule engine + live wiring.**
12. **Standard fields panel + FIX dictionary asset.**
13. **Wire-value resolution + FIX output panel** (both transports, provenance highlighting; reuse existing FIX render components).
14. **StrategyEdit engine + data-contract checks + explainable results UI.**
15. **1.2 support pass:** vocabulary delta from RC2 schemas, grid layout rendering, NS-006/NS-007/LY-090.
16. **Stretch: Cancel/Replace simulation.**
17. **Polish:** copy-findings, CSV export, a11y pass, empty/degraded states.

Each issue should land with its tests; issues 4–6 are independent of UI and parallelizable with 8–10.

---

## 12. Assumptions & open questions

- **Assumption:** StateRule conflicts (two rules driving the same property of the same control) resolve last-in-document-order; the spec is silent. Documented in code and surfaced in dev console.
- **Assumption:** `incrementPolicy` LotSize/Tick fall back to the static increment (no market data in this tool), per the errata's fallback language.
- **Assumption:** `invertOnWire` (MultipleCharValue/MultipleStringValue bitwise-not) is rare and gets an info "unsupported" chip rather than implementation.
- **Assumption:** EditableDropDownList free text that doesn't match a ListItem is sent as the raw string for the wire value (no EnumPair mapping possible).
- **Open:** whether the existing toolkit's FIX message renderer/dictionary modules are importable as-is — confirm during issue 12/13; budget a thin adapter if not.
- **Open:** exact 1.2 RC2 vocabulary — to be pinned during issue 15 from the FIXTradingCommunity repo; until then 1.2 documents get full 1.1-core treatment plus info findings.

---

## Appendix A — Parameter xsi:type list (29)

Amt_t, Boolean_t, Char_t, Country_t, Currency_t, Data_t, Exchange_t, Float_t, Int_t, Language_t, Length_t, LocalMktDate_t, MonthYear_t, MultipleCharValue_t, MultipleStringValue_t, NumInGroup_t, Percentage_t, Price_t, PriceOffset_t, Qty_t, SeqNum_t, String_t, TagNum_t, Tenor_t, TZTimeOnly_t, TZTimestamp_t, UTCDateOnly_t, UTCTimeOnly_t, UTCTimestamp_t.

## Appendix B — Tag 959 (StrategyParameterType) codes

| Code | Type | Code | Type | Code | Type |
|---|---|---|---|---|---|
| 1 | Int | 11 | Percentage | 21 | LocalMktDate |
| 2 | Length | 12 | Char | 22 | UTCDateOnly |
| 3 | NumInGroup | 13 | Boolean | 23 | Data |
| 4 | SeqNum | 14 | String | 24 | MultipleStringValue |
| 5 | TagNum | 15 | MultipleCharValue | 25 | Country |
| 6 | Float | 16 | Currency | 26 | Language |
| 7 | Qty | 17 | Exchange | 27 | TZTimeOnly |
| 8 | Price | 18 | MonthYear | 28 | TZTimestamp |
| 9 | PriceOffset | 19 | UTCTimestamp | 29 | Tenor |
| 10 | Amt | 20 | UTCTimeOnly | | |

(Cross-checked against the spec's worked example: Percentage_t → 959=11, Boolean_t → 959=13.)

## Appendix C — Control xsi:type list (15)

CheckBox_t, CheckBoxList_t, Clock_t, DoubleSpinner_t, DropDownList_t, EditableDropDownList_t, HiddenField_t, Label_t, MultiSelectList_t, RadioButton_t, RadioButtonList_t, SingleSelectList_t, SingleSpinner_t, Slider_t, TextField_t.
