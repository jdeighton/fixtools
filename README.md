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
