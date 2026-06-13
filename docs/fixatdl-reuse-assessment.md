# FIXatdl Workbench — Shared Module Reuse Assessment

Assesses which existing FIX toolkit modules `src/fixatdl/` can safely import,
which need adapters, and which must not be reused.

Rule: modules under `src/fixatdl/` must not import from `src/context/` or any
component that itself imports from `src/context/`.

---

## 1. `src/data/fixDictionary.ts`

**Verdict: Reuse as-is.**

Pure data module. No imports from context, components, or anything
FIX-toolkit-specific. Exports:

| Export | FIXatdl use |
|---|---|
| `fieldName(tag)` | Resolve tag numbers → field names in the FIX output panel |
| `fieldValueDescription(tag, value)` | Resolve wire values → human descriptions in the FIX output panel |
| `FIELDS` | Source for a name→tag reverse lookup in the standard fields panel |
| `MSG_TYPES`, `msgTypeDescription()` | Optional: label the FIX message type in the output panel |

**Gap:** No exported name→tag reverse lookup. The standard fields panel
needs one. Build it inline from `FIELDS` (a single `Object.entries` inversion),
or add a `fieldTag(name: string): number | undefined` helper to the dictionary.
See `sharedModuleNotes.ts` for the recommended pattern.

**Circular import risk:** None. `fixDictionary.ts` has zero intra-project imports.

---

## 2. `src/lib/gridTheme.ts`

**Verdict: Reuse as-is.**

Single exported constant (`darkTheme`) built from `ag-grid-community`. No
intra-project imports. Import directly wherever a Matrix or findings grid is
needed inside `src/fixatdl/`.

```ts
import { darkTheme } from '../../lib/gridTheme'
```

**Circular import risk:** None.

---

## 3. `src/components/CopyRawButton.tsx`

**Verdict: Do not reuse. Create a thin replacement.**

The component calls `useApp()` to read `settings.copyIncludePreamble`, then
passes it to `extractCopyText`. This couples it to `AppContext` (forbidden) and
to the FIX log preamble concept (not applicable to FIXatdl output — FIXatdl
modules copy XML fragments or FIX wire values, not log lines with a leading
timestamp/session prefix).

Create `src/fixatdl/components/CopyButton.tsx` that accepts a `text: string`
prop and calls `navigator.clipboard.writeText(text)` directly. It can reuse the
same CSS token values (`--text-muted`, `--accent`, etc.) but should have its own
CSS Module. See `sharedModuleNotes.ts` for the stub signature.

**Circular import risk:** Importing the existing component would transitively
pull in `AppContext` → blocked.

---

## 4. `src/lib/copyText.ts`

**Verdict: Do not reuse.**

`extractCopyText(rawLine, includePreamble)` strips everything before `8=FIX`
in a FIX log line. The FIXatdl FIX output panel produces clean FIX wire values
(no log preamble), so the stripping logic adds no value and could silently
corrupt output if a wire value happened to contain `8=FIX` later in the string.

FIXatdl copy paths should use `navigator.clipboard.writeText(text)` directly,
with no pre-processing. This module has no imports that make it forbidden —
it just isn't useful for the FIXatdl use case.

**Circular import risk:** None (the module itself is safe), but there is no
reason to import it.

---

## 5. `src/context/AppContext.tsx`

**Verdict: Do not reuse.**

`AppContext` owns FIX message state (`FixMessage[]`), FIX filter state, and
FIX-specific settings (`copyIncludePreamble`, `validateBodyLengthChecksum`,
etc.). None of this is relevant to the FIXatdl Workbench, which manages its
own document state via local `useState` (as specified in issue #13).

The types exported from `AppContext` that might appear useful:

| Type | Decision |
|---|---|
| `FixMessage` | FIX-toolkit-specific — do not share. FIXatdl has its own parsed document model. |
| `Settings` | FIX-toolkit-specific — do not share. |
| `Filter`, `FilterSet`, `FilterMode` | Re-exported from `src/lib/filterLines.ts`. If FIXatdl ever needs them, import from `filterLines` directly — **not** via `AppContext`. |
| `CustomEnum` | FIX-toolkit-specific — do not share. |

**Circular import risk:** Importing `AppContext` from `src/fixatdl/` is
explicitly forbidden by the layer rule. Additionally, `AppContext` imports
`fixParser` and `filterLines`, so any change to those libs could have
unexpected effects on FIXatdl behaviour if context were shared.

---

## Summary

| Module | Verdict | Import path (if reusable) |
|---|---|---|
| `src/data/fixDictionary.ts` | ✅ Reuse as-is | `../../data/fixDictionary` |
| `src/lib/gridTheme.ts` | ✅ Reuse as-is | `../../lib/gridTheme` |
| `src/components/CopyRawButton.tsx` | ❌ Do not reuse — create `CopyButton.tsx` | — |
| `src/lib/copyText.ts` | ❌ Do not reuse — not applicable | — |
| `src/context/AppContext.tsx` | ❌ Do not reuse — forbidden layer | — |
