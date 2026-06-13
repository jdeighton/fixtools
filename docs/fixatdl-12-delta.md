# FIXatdl 1.1 → 1.2 Vocabulary Delta

Derived from direct XSD diff of `FIXTradingCommunity/fixatdl-specification` (v1-1-STANDARD vs v1-2/resources/schema).  
Status: FIXatdl 1.2 is Release Candidate — never formally ratified.

---

## 1. Namespace change

| Version | Core namespace |
|---------|---------------|
| 1.1 | `http://www.fixprotocol.org/FIXatdl-1-1/Core` |
| 1.2 | `http://www.fixprotocol.org/FIXatdl-1-2/Core` |

Same pattern applies to Layout, Flow, Validation, Regions, Timezones sub-schemas.

---

## 2. Core schema (`fixatdl-core-1-2.xsd`)

### 2.1 New elements

#### `Filter` (child of `Strategies`)

New top-level named-filter registry. A `Filter` is defined once under `Strategies` and referenced by `id` from any `Strategy`, `Parameter`, or `EnumPair`.

```xml
<Filter id="EU_EQ">
  <Regions>…</Regions>
  <Markets>…</Markets>
  <SecurityTypes>…</SecurityTypes>
  <Clients>…</Clients>
</Filter>
```

| XSD source | `core:Filter_t` |
|---|---|
| Attributes | `id` (xs:string, **required**) |
| Children | `Regions`, `Markets`, `SecurityTypes`, `Clients` (all optional) |
| 1.1 parser handling | Unknown element — no-op pass-through. **Requires explicit implementation.** |

#### `Clients` / `Client` (child of `Filter`)

New filtering dimension (not present in 1.1 at all).

```xml
<Clients>
  <Client ID="FIRM_XYZ"/>
</Clients>
```

| XSD source | `core:Clients_t` |
|---|---|
| `Client/@ID` | xs:string, required |
| 1.1 parser handling | Unknown element — no-op. Display as metadata badge (consistent with Regions/Markets non-goal). |

#### `VendorConfig` (child of `Strategy`)

Hints for vendor OMSs about leg-level support.

| Attribute | Type | Notes |
|---|---|---|
| `legParameters` | xs:boolean | True = OMS supports leg-level parameters |
| `tag66Support` | xs:boolean | |

1.1 parser handling: unknown element — no-op. No implementation required.

#### `DeliveryMethods` (child of `Strategy`)

Lists the FIX message types the algo provider can accept for this strategy.

```xml
<DeliveryMethods>
  <FixMsg msgType="NewOrderSingle"/>
  <FixMsg msgType="NewOrderMultiLeg"/>
</DeliveryMethods>
```

`FixMsg/@msgType` enum: `NewOrderSingle`, `NewOrderMultiLeg`, `NewOrderList`.

1.1 parser handling: unknown element — no-op. Display as metadata. No implementation required.

---

### 2.2 New attributes on existing elements

#### On `Strategy`

| Attribute | Type | Description | Impl required? |
|---|---|---|---|
| `filter` | xs:string | Reference to a `Filter/@id` defined in `Strategies` | Display as metadata badge |
| `requiredNumberOfLegs` | pattern `([0-9])*\|unbounded` | Replaces removed `totalLegs` | Display as metadata |
| `totalLegsTag` | xs:nonNegativeInteger | Tag to receive total leg count | Display as metadata |
| `legSequenceTag` | xs:nonNegativeInteger | Tag to receive per-leg sequence number | Display as metadata |
| `objective` | enum | Trade objective — see values below | Display as metadata |
| `legAreSeverable` | xs:boolean | Whether individual legs can be CxlRpl'd independently | Display as metadata |

`objective` enum values: `PAIRS`, `BUTTERFLY`, `BUY-WRTIE` *(sic — typo in RC2 XSD)*, `CALENDAR-SPREAD`, `PRICE-SPREAD`, `DIAGONAL-SPREAD`, `SPREAD`, `PORTFOLIO`.

#### On `Parameter`

| Attribute | Type | Description | Impl required? |
|---|---|---|---|
| `filter` | xs:string | Reference to a `Filter/@id` | Display as metadata badge |
| `scope` | enum (`ORDER` \| `LEG`) | Parameter scope in multi-leg orders | Display as metadata |

#### On `EnumPair`

| Attribute | Type | Description | Impl required? |
|---|---|---|---|
| `filter` | xs:string | Reference to a `Filter/@id` | Display as metadata; no filtering logic |

---

### 2.3 Removed attributes from `Strategy`

| Removed | Replacement |
|---|---|
| `totalLegs` (xs:nonNegativeInteger) | `requiredNumberOfLegs` |
| `totalOrders` (xs:nonNegativeInteger) | *(no direct equivalent)* |

Note: `orderSequenceTag` and `totalOrdersTag` from 1.1 are replaced by `legSequenceTag` and `totalLegsTag` respectively.

---

### 2.4 Deprecated in 1.2

- `Strategy/@fixMsgType` — doc changed to "Value to use in FIX tag 35. Deprecated in FIXatdl 1.2." Still present in XSD.

---

## 3. Layout schema (`fixatdl-layout-1-2.xsd`)

### 3.1 New abstract base type: `PanelItem_t`

Both `StrategyPanel_t` and `Control_t` now extend `PanelItem_t`, which introduces four grid-placement attributes:

| Attribute | Type | Description |
|---|---|---|
| `row` | xs:nonNegativeInteger | Row in a grid-oriented panel |
| `col` | xs:nonNegativeInteger | Column in a grid-oriented panel |
| `rowSpan` | xs:nonNegativeInteger | Number of rows to span |
| `colSpan` | xs:nonNegativeInteger | Number of columns to span |

> **PRD note:** PRD §4.1 refers to the column attribute as `column`, but the RC2 XSD uses `col`. The XSD is authoritative.

1.1 parser handling: unknown attributes — ignored. **Requires explicit implementation** for grid layout rendering (CSS grid). Emit `LY-090` info finding for any grid attribute not supported.

### 3.2 New attributes on `StrategyPanel`

| Attribute | Type | Description |
|---|---|---|
| `numRows` | xs:nonNegativeInteger | Grid row count |
| `numCols` | xs:nonNegativeInteger | Grid column count |
| `fillOrder` | `FillOrder_t` | `ROW-MAJOR` or `COL-MAJOR` |

These apply when `orientation="GRID"` (see §3.3).

1.1 parser handling: unknown attributes — ignored. Required for grid layout.

### 3.3 Extended enum: `PanelOrientation_t`

New value added: `GRID` (alongside existing `HORIZONTAL`, `VERTICAL`).

Triggers use of `numRows`/`numCols`/`fillOrder` and child `row`/`col`/`rowSpan`/`colSpan` attributes.

### 3.4 New simple type: `FillOrder_t`

Enum: `ROW-MAJOR` | `COL-MAJOR`. Controls auto-placement order when explicit `row`/`col` are absent.

### 3.5 New control type: `Duration_t`

Extends `Control_t`. Single attribute:

| Attribute | Type |
|---|---|
| `initValue` | xs:time |

1.1 parser handling: `xsi:type="Duration_t"` on a `Control` is an unknown type. **Requires explicit implementation.** Emit `NS-007` info finding until implemented.

### 3.6 New attributes on `Clock_t`

| Attribute | Type | Default | Description |
|---|---|---|---|
| `enablingControlType` | enum (CheckBox \| RadioButton) | — | Control type that enables this clock |
| `disablingControlType` | enum (CheckBox \| RadioButton) | — | Control type that disables this clock |
| `disablingControlLabel` | xs:string | — | Label near the disabling control |
| `disablingControlLabelOrientation` | enum (Left \| Right \| Above \| Below) | — | Label placement |
| `displayableDate` | xs:boolean | true | Whether date portion is displayed |
| `editableDate` | xs:boolean | true | Whether date portion is editable |
| `displayableTimeZone` | xs:boolean | true | Whether timezone is displayed |
| `editableTimeZone` | xs:boolean | true | Whether timezone is editable |

1.1 parser handling: unknown attributes — ignored. Partial implementation acceptable (render clock, ignore unknown attributes).

### 3.7 New attribute on `ListItem`

| Attribute | Type | Description |
|---|---|---|
| `filter` | xs:string | Reference to a `Filter/@id` |

1.1 parser handling: unknown attribute — ignored. Display-only (no filtering logic required per PRD non-goal).

---

## 4. Flow schema (`fixatdl-flow-1-2.xsd`)

No structural changes. Only namespace updates and documentation rewrites.

Informational: `logicOperator` documentation in 1.2 mentions `AND_ALSO` and `OR_ELSE` as advanced short-circuit variants of `AND`/`OR`. These do **not** appear in the XSD enum — they are documentation-only in the RC2 release.

---

## 5. Validation schema (`fixatdl-validation-1-2.xsd`)

No structural changes. A namespace alias bug was fixed: the 1.1 schema incorrectly used the `lay:` prefix for validation types; 1.2 correctly uses `val:`.

---

## 6. Regions schema (`fixatdl-regions-1-2.xsd`)

No structural changes. Namespace update only.

---

## 7. Summary table

| Category | Item | Schema | Needs impl? |
|---|---|---|---|
| New element | `Filter` / `Filter_t` | core | Yes — filter registry |
| New element | `Clients` / `Client` | core | No — display as metadata |
| New element | `VendorConfig` | core | No |
| New element | `DeliveryMethods` / `FixMsg` | core | No |
| New attribute | `Strategy/@filter` | core | No — display |
| New attribute | `Strategy/@requiredNumberOfLegs` | core | No — display |
| New attribute | `Strategy/@totalLegsTag` | core | No — display |
| New attribute | `Strategy/@legSequenceTag` | core | No — display |
| New attribute | `Strategy/@objective` | core | No — display |
| New attribute | `Strategy/@legAreSeverable` | core | No — display |
| New attribute | `Parameter/@filter` | core | No — display |
| New attribute | `Parameter/@scope` | core | No — display |
| New attribute | `EnumPair/@filter` | core | No — display |
| Removed attribute | `Strategy/@totalLegs` | core | — |
| Removed attribute | `Strategy/@totalOrders` | core | — |
| Deprecated | `Strategy/@fixMsgType` | core | — |
| New base type | `PanelItem_t` (grid placement) | layout | **Yes** — grid layout |
| New panel attr | `StrategyPanel/@numRows` | layout | **Yes** — grid layout |
| New panel attr | `StrategyPanel/@numCols` | layout | **Yes** — grid layout |
| New panel attr | `StrategyPanel/@fillOrder` | layout | **Yes** — grid layout |
| Extended enum | `PanelOrientation_t` + `GRID` | layout | **Yes** — grid layout |
| New simple type | `FillOrder_t` | layout | **Yes** — grid layout |
| New control type | `Duration_t` | layout | **Yes** — new control |
| New control attrs | `Clock_t` display/editable flags | layout | Partial — ignore unknown |
| New attr | `ListItem/@filter` | layout | No — display |

---

## 8. Implementation notes for the 1.2 pass

1. **Grid layout** is the highest-effort item. `PanelItem_t` attributes (`row`, `col`, `rowSpan`, `colSpan`) apply to both `Control` and `StrategyPanel` children of any panel. When `orientation="GRID"` the parent `StrategyPanel` also carries `numRows`, `numCols`, and `fillOrder`. CSS grid maps naturally. Fall back to flow layout and emit `LY-090` for any unrecognised grid attribute.

2. **Filter references** appear on `Strategy`, `Parameter`, `EnumPair`, and `ListItem`. All are display-only per the PRD non-goal (§1.2): parse `filter` as a string ref, look up the named `Filter` element, and display the resolved criteria as metadata badges. Do not filter.

3. **`Duration_t`** is the only genuinely new control type. Until implemented, unknown `xsi:type` values should fall back to a text field and emit `NS-007`.

4. **Multi-leg attributes** on `Strategy` (`requiredNumberOfLegs`, `objective`, `legAreSeverable`, etc.) are display metadata only.

5. The `col` attribute name in the XSD differs from `column` used in PRD §4.1. Parsers should accept `col`.
