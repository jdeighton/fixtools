# FIX Tools

A browser-based toolkit for inspecting, validating, and exploring FIX protocol messages. Built as a single self-contained HTML file that runs directly from the filesystem (`file://`) — no server, no install, no network required.

## What it does

Paste a FIX log or raw FIX message stream into the input panel. All tabs update immediately.

| Tab | Description |
|-----|-------------|
| **Details** | Decodes each message field-by-field, resolving tag numbers and enum values to human-readable descriptions using the FIX 4.2 / 4.4 spec |
| **Compare** | Side-by-side diff of two selected messages, highlighting fields that differ |
| **Sequence** | Renders a UML sequence diagram of the message flow between counterparties |
| **Validator** | Checks each message for structural errors: missing required tags, invalid enum values, bad BodyLength (tag 9), bad CheckSum (tag 10) |
| **Enums** | Manage custom tag/value → description mappings, scoped per FIX version, that override or extend the built-in dictionary across all tabs |
| **Dictionary** | Browse the full FIX 4.2 and 4.4 spec — messages by MsgType or name, fields by tag number or name — with drill-down navigation between messages and fields |
| **Examples** | Load pre-built FIX 4.2 futures trading sessions to explore the tool |

## Getting started

```sh
npm install
npm run build
```

Open `dist/index.html` in a browser. The file is fully self-contained — all assets are inlined.

For development with hot reload:

```sh
npm run dev
```

## Scripts

### `scripts/buildSpecJson.mjs`

Reads the raw QuickFIX XML spec files from the `specs/` directory and writes `fix_spec_combined.json`. This is the source-of-truth step — run it whenever you update or add a spec file.

```sh
node scripts/buildSpecJson.mjs
```

The `specs/` directory contains the following XML spec files:

| File | Source | Description |
|------|--------|-------------|
| `FIX42.xml` | [QuickFIX GitHub](https://github.com/quickfix/quickfix/tree/master/spec) | Standard FIX 4.2 spec — 405 fields, 46 messages |
| `FIX44.xml` | [QuickFIX GitHub](https://github.com/quickfix/quickfix/tree/master/spec) | Standard FIX 4.4 spec — 912 fields, 93 messages |
| `TT-FIX42.xml` | [Trading Technologies](https://library.tradingtechnologies.com/tt-fix/TT-FIX42.xml) | TT's FIX 4.2 dialect — 639 fields, 40 messages, includes TT-specific tags (e.g. `ManualOrderIndicator`) |
| `TT-FIX44.xml` | [Trading Technologies](https://library.tradingtechnologies.com/tt-fix/TT-FIX44.xml) | TT's FIX 4.4 dialect — 639 fields, 40 messages, includes TT-specific tags |

The TT spec files differ from the standard QuickFIX files in two ways: they use TT-specific proprietary tags, and their message definitions use `<component>` references (e.g. `Instrument`, `Parties`) which the script expands recursively into full field lists.

The parser in `buildSpecJson.mjs` handles both formats transparently — QuickFIX files use single-quoted attributes and no components; TT files use double-quoted attributes, XML comments, and nested components.

The four specs are stored as separate keys in `fix_spec_combined.json` (`fix42`, `fix44`, `tt_fix42`, `tt_fix44`). Currently `generateDictionary.mjs` uses only `fix42` and `fix44` to build the app's dictionary; the TT data is available in the JSON for future use.

To re-download the TT spec files (they are versioned and updated periodically by TT):

```sh
curl -o specs/TT-FIX42.xml https://library.tradingtechnologies.com/tt-fix/TT-FIX42.xml
curl -o specs/TT-FIX44.xml https://library.tradingtechnologies.com/tt-fix/TT-FIX44.xml
node scripts/buildSpecJson.mjs
npm run build
```

To add support for another FIX version (e.g. FIX 5.0):

1. Download the XML file — e.g. `curl -o specs/FIX50.xml https://raw.githubusercontent.com/quickfix/quickfix/master/spec/FIX50.xml`
2. Add an entry to the `SPEC_FILES` array near the top of `buildSpecJson.mjs`:
   ```js
   { key: 'fix50', file: 'FIX50.xml' },
   ```
3. Run `node scripts/buildSpecJson.mjs` to regenerate `fix_spec_combined.json`.
4. Update `generateDictionary.mjs` to read and export the new version's field and message arrays.
5. Wire the new version into the UI: version selectors in the Dictionary, Enums, and Validator tabs.

### `scripts/generateDictionary.mjs`

Reads `fix_spec_combined.json` (the raw FIX 4.2 + 4.4 spec data) and generates `src/data/fixDictionary.ts`, which contains:

- `FIELDS` — merged field map (FIX 4.4 takes precedence), keyed by tag number
- `FIELDS_42` — FIX 4.2-only field map, used by the validator for version-correct enum checking
- `MESSAGES_42` / `MESSAGES_44` — message definitions with required and optional field lists
- `ENUMS` — enum value descriptions for both versions

This script runs automatically before every build via the `prebuild` npm lifecycle hook. Run it manually if you update `fix_spec_combined.json` without running a full build:

```sh
node scripts/generateDictionary.mjs
```

### `scripts/generateSamples.mjs`

Generates the sample FIX 4.2 log files in the `samples/` directory. Each file contains a realistic futures trading session with correct BodyLength (tag 9) and CheckSum (tag 10) values.

| File | Scenario |
|------|----------|
| `es_buy_partial_fill.txt` | E-mini S&P 500 — buy 2 contracts at limit, partial fill then remainder filled |
| `cl_sell_partial_cancel.txt` | WTI Crude Oil — sell 5 contracts at limit, partial fill of 2, cancel remaining 3 |
| `gc_buy_amend_fill.txt` | Gold futures — buy 3 contracts, price amended, full fill at amended price |
| `mixed_session.txt` | Full intraday session across ES, NQ, and CL with multiple order types |

Run this script after making any changes to the sample scenarios (e.g. updating dates, symbols, or prices), then rebuild:

```sh
node scripts/generateSamples.mjs
npm run build
```

The sample files are inlined into the bundle at build time via Vite `?raw` imports — regenerating without rebuilding will not affect `dist/index.html`.

## Tech stack

- React 19 + TypeScript + Vite
- AG Grid Community (message timeline)
- `vite-plugin-singlefile` — inlines all JS and CSS into a single HTML file
- CSS Modules with CSS custom properties for theming
