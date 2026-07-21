## Why

`UnitIcon.svelte` currently picks an icon by running the unit's display `name` through a long `{#if name === '...'}` chain (~45 branches plus 9 "generic family" branches keyed off `Set`/`Record` lookups also built from names). This couples icon selection to display text: renaming a unit (as already happened with "A4 sheet" → "Copy paper thickness") silently orphans its icon case, and adding a unit requires knowing the exact icon-matching mechanics buried in the component. The unit data in `data.ts` should be the single source of truth for which icon a unit uses.

## What Changes

- Add an explicit `icon` field to each `Unit` entry in `data.ts`, e.g. `icon: { n: 'ruler', s: 'cm' }` — `n` names an icon from the library, `s` is an optional symbol/label string passed into icons that render a text badge (ruler, weight, square, beaker, clock, ampere, thermometer, mole, candela, map-blob).
- **BREAKING**: Remove all name-based matching from `UnitIcon.svelte` (the `Set`s of unit names, the `SYM` abbreviation map, the `MAP_CODE` table, and the big `{#if name === ...}` chain). The component instead takes an `icon` prop (`{ n: string; s?: string }`) and looks up `n` directly in an icon library.
- Introduce an icon library (`src/lib/icons/` or similar) that maps icon names to renderable shapes: shared parametrized icons (ruler, weight, square-unit, beaker, clock, ampere, thermometer, mole, candela, map-blob — each accepts the `s` label) plus one-off pictogram icons (bus, football-pitch, banana, elephant, horse, etc.).
- Update every `UNITS` entry across all 9 quantities in `data.ts` to declare its `icon`.
- Update call sites (`plain/+page.svelte`, `convert/+page.svelte`'s picker) to pass `unit.icon` instead of `unit.name` into `UnitIcon`.
- `QuantityIcon.svelte` (the 9 medallion icons on the front page / quantity page) is out of scope — it already takes an explicit `id` prop and has no name-matching problem.

## Capabilities

### New Capabilities
- `unit-icon-library`: a name-referenced icon library for measurement units, where each unit's data record declares which icon to render (and an optional text parameter for label-badge icon families), decoupling icon selection from the unit's display name.

### Modified Capabilities
(none — no existing specs predate this change)

## Impact

- `src/lib/data.ts` — every unit literal across `length`, `area`, `mass`, `volume`, `time`, `current`, `temperature`, `amount`, `luminous` gains an `icon` field; `Unit` interface gains `icon: UnitIconRef`.
- `src/lib/components/UnitIcon.svelte` — rewritten to accept `{ icon, size }` instead of `{ name, size }` and dispatch on `icon.n`.
- New icon library module(s) under `src/lib/icons/`.
- `src/routes/[quantity]/plain/+page.svelte` and `src/routes/[quantity]/convert/+page.svelte` — update `<UnitIcon>` usages to pass the unit's `icon` object.
