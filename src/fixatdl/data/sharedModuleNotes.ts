// Import guidance for FIXatdl feature implementors.
// See docs/fixatdl-reuse-assessment.md for full rationale.
//
// Rule: nothing under src/fixatdl/ may import from src/context/ or any
// component that transitively imports from src/context/.

// ---------------------------------------------------------------------------
// FIX output panel
// ---------------------------------------------------------------------------

// TODO(fix-output-panel): resolve tag numbers to field names:
//   import { fieldName } from '../../data/fixDictionary'
//   fieldName(tag)  →  e.g. "OrdType"

// TODO(fix-output-panel): resolve wire values to human descriptions:
//   import { fieldValueDescription } from '../../data/fixDictionary'
//   fieldValueDescription(tag, value)  →  e.g. "Limit" for tag 40 value "2"

// TODO(fix-output-panel): copy output to clipboard — do NOT use CopyRawButton
// or copyText.ts (both are FIX-log specific). Instead create:
//   src/fixatdl/components/CopyButton.tsx
//
//   Signature:
//     interface Props { text: string; title?: string }
//     export function CopyButton({ text, title }: Props): JSX.Element
//
//   Implementation: navigator.clipboard.writeText(text) directly — no preamble
//   stripping, no AppContext dependency.

// ---------------------------------------------------------------------------
// Standard fields panel / parameter-to-tag resolution
// ---------------------------------------------------------------------------

// TODO(standard-fields-panel): look up a FIX field tag by name. fixDictionary
// does not export a name→tag map, so build one at module init:
//
//   import { FIELDS } from '../../data/fixDictionary'
//
//   const NAME_TO_TAG: Map<string, number> = new Map(
//     Object.entries(FIELDS).map(([tag, def]) => [def.name.toLowerCase(), Number(tag)])
//   )
//
//   export function tagForName(name: string): number | undefined {
//     return NAME_TO_TAG.get(name.toLowerCase())
//   }
//
// Place this helper in src/fixatdl/lib/fixFieldLookup.ts so it is not
// duplicated across panels.

// ---------------------------------------------------------------------------
// AG Grid (Matrix tab, findings grid)
// ---------------------------------------------------------------------------

// TODO(matrix-tab): import the shared dark theme:
//   import { darkTheme } from '../../lib/gridTheme'
//   Pass as: theme={darkTheme} on <AgGridReact>
