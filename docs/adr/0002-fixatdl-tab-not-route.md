# ADR-0002: FIXatdl Workbench as a Top-Level Tab, Not a Hash Route

## Status

Accepted

## Context

The FIXatdl Workbench PRD (§2) specifies "a new route/page in the existing SPA, using hash-based routing compatible with `file://`." The existing app has no client-side router — navigation between the seven existing tools (Details, Compare, Sequence, Validator, Enums, Dictionary, Examples) is handled by a single `useState<TabId>` in `App.tsx` with a `TabNav` component.

Two approaches exist:

**Option 1 — Introduce a hash router:** add a dependency (`react-router-dom` or a lightweight custom hook) and convert the existing tab system to routes. FIXatdl becomes a distinct route (e.g. `#/fixatdl`).

**Option 2 — Add a top-level tab:** extend `TabId` with `'fixatdl'` and render the FIXatdl page component in the same tab-switch pattern already used for all other tools.

## Decision

Add FIXatdl as a new top-level tab (Option 2).

## Rationale

- The existing tab system is already hash-compatible with `file://` URLs (no pushState).
- Introducing a router adds a dependency, changes the navigation model for existing tools, and provides no observable benefit to users (deep-linking into a specific FIXatdl sub-tab is not a stated requirement).
- The FIXatdl workbench already has internal sub-tabs (Validation | Matrix | Order Ticket), managed by its own local `useState` — the same pattern used by the outer tab bar. No routing abstraction is needed.
- The single-file build constraint (`vite-plugin-singlefile`) makes hash routing redundant for the primary deployment target.

## Consequences

- The `TabId` union in `src/components/TabNav.tsx` gains `'fixatdl'`.
- The FIXatdl page manages its own internal tabs via local state; it does not share `AppContext`.
- Deep-linking to a specific FIXatdl sub-view (e.g. `#/fixatdl/matrix`) is not supported. If this becomes a requirement, revisit with a lightweight hash-param approach rather than a full router.
- Bookmark/back-button navigation does not distinguish the FIXatdl tab from others. Acceptable for a developer tool distributed as a single HTML file.

## Future Trigger

Re-evaluate if any of the following occur:
- A requirement for deep-linkable sub-views within FIXatdl (e.g. sharing a link to a specific strategy's ticket)
- The app grows beyond ~10 top-level tools and a tab bar becomes unwieldy
- A multi-page deployment model is adopted (currently out of scope)
