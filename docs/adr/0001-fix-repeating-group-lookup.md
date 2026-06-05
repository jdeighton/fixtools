# ADR-0001: FIX Repeating Group Identification via Hardcoded Lookup Table

## Status

Accepted

## Context

FIX repeating groups are introduced by a "NoX" count tag (e.g. `453=NoPartyIDs`). Each group
definition has a known first-delimiter tag that marks the start of each instance, plus a set
of member tags that belong to that group. To parse groups correctly, the parser needs to know
this structure for each possible `NoX` tag.

The complete, authoritative group structure is available in the FIX spec XML — the same source
used to generate `fixDictionary.ts`. Two approaches exist:

**Option 1 — Hardcoded lookup table:** define a static map of
`noXTag → { firstDelimTag, memberTags }` in the parser source, covering FIX 4.2 and 4.4.

**Option 2 — Dynamic from spec XML:** extend `scripts/generateDictionary.mjs` to emit group
structure at build time and load it at runtime from `fixDictionary.ts`.

## Decision

Use the hardcoded lookup table (Option 1), defined in `src/lib/fixParser.ts` as `GROUP_DEFS`.

## Rationale

- FIX 4.2 and 4.4 are stable, published specs. The group structure does not change.
- `generateDictionary.mjs` currently emits only flat field definitions. Extending it to emit
  group hierarchy adds significant generator complexity for a one-time benefit.
- The hardcoded table is easy to read, audit against the spec, and test in isolation.
- The tool currently targets FIX 4.2 and 4.4 only; no immediate need for spec-agnostic parsing.

## Consequences

- The `GROUP_DEFS` table is the single source of truth for group structure in this codebase.
  Any spec discrepancy must be corrected there.
- FIX 5.0, FIX Latest, or custom/TradingTechnologies group extensions are not covered by the
  current table. They would require manual additions.
- If group coverage needs to expand significantly (e.g. full FIX 5.0), revisit Option 2 and
  consider deriving group structure from the spec XML during the dictionary generation step.

## Future Trigger

Re-evaluate if any of the following occur:
- FIX 5.0 / FIX Latest support is added
- TradingTechnologies custom repeating groups are encountered that don't match spec tags
- The hardcoded table requires frequent manual updates
