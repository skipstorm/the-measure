## Context

`UnitIcon.svelte` currently resolves an icon by testing the unit's *display* `name` against ~55 string literals: 9 `Set`s (one per "label-badge" family: ruler, weight, square, beaker, clock, ampere, thermometer, mole, candela) backing a shared `SYM` abbreviation map, a `MAP_CODE` table for country/lake units, and a 45-branch `{#if name === '...'}` chain for one-off pictograms (bus, elephant, banana, ...). `data.ts` only stores `name`/`plural`/`f`/`cat`/`note` — the icon is implicit, derivable only by reading the component. This already broke once (renaming "A4 sheet" → "Copy paper thickness" silently lost its icon) and will keep breaking as units are renamed or reworded for the satirical copy.

## Goals / Non-Goals

**Goals:**
- Each `Unit` record in `data.ts` explicitly declares which icon it renders, as `icon: { n: <icon-name>; s?: <label> }`.
- Icon lookup in the component is a direct map/function lookup keyed on `icon.n`, not a name-matching chain.
- Shared pictograms (ruler, weight, square, beaker, clock, ampere, thermometer, mole, candela, map-blob) stay defined once and take a caller-supplied label (`icon.s`) instead of deriving one from a `SYM`/`MAP_CODE` table keyed by unit name.
- One-off pictograms (bus, elephant, banana, pyramid, ...) are addressable by a stable icon name independent of the unit's current display text.
- Every icon renders pixel-identical to today's output — this is a structural refactor, not a visual redesign.

**Non-Goals:**
- Redesigning any icon's appearance.
- Touching `QuantityIcon.svelte` (the 9 medallion icons) — it already takes an explicit `id` prop with no name-derived lookup problem.
- Building a generic/animated icon system, external icon set, or icon picker UI. This is strictly measurement-unit icons.

## Decisions

**1. Icons are data, not markup — a primitive shape DSL in a `.ts` module.**
Svelte 5 `{#snippet}`/`{@render}` only exist inside `.svelte` files, so keeping ~45 one-off shapes as snippets would still require a `.svelte` file with a per-icon-name branch — same problem, just relocated. Instead, each icon is a plain function `(label?: string) => IconPrimitive[]`, where `IconPrimitive` is a small closed union mirroring the SVG elements actually used today:

```ts
type IconPrimitive =
  | { type: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'circle'; cx: number; cy: number; r: number; fill?: string; stroke?: string }
  | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number; transform?: string }
  | { type: 'path'; d: string; fill?: string }
  | { type: 'polygon'; points: string }
  | { type: 'polyline'; points: string }
  | { type: 'text'; x: number; y: number; fontSize: number; text: string }
  | { type: 'g'; transform?: string; strokeWidth?: number; children: IconPrimitive[] };
```

`UnitIcon.svelte` becomes a single generic renderer: look up the function by name, call it with the label, and `{#each}` the returned primitives through one `{#if el.type === ...}` chain over these ~9 fixed primitive kinds (not unit names). That chain is bounded and stable — it doesn't grow when units are added or renamed.

*Alternative considered*: keep per-icon Svelte snippets in `UnitIcon.svelte`, just re-keyed by an `icon.n` lookup instead of `name`. Rejected — it still leaves a large per-icon branch living in the component; moving the icon *definitions* into data (functions in a `.ts` module) is what actually decouples "which icon" from "how the component matches it," and is easier to unit-test/tree-shake later if needed.

**2. Shared "label-badge" families become parametrized builder functions.**
`ruler(label?)`, `weight(label?)`, `squareUnit(label?)`, `beakerUnit(label?)`, `clockUnit(label?)`, `ampereUnit(label?)`, `thermometerUnit(label?)`, `moleUnit(label?)`, `candelaUnit(label?)`, `mapBlob(label?)` each return the fixed pictogram primitives plus (if `label` is truthy) a trailing `{ type: 'text', ... }` primitive at that family's established position/size (e.g. ruler's label at `x:12,y:22.5,fontSize:6.6`). These builders are registered in `ICONS` under one name each (e.g. `ICONS.ruler = ruler`), and every unit that used to match via `rulerNames`/`SYM` now instead sets `icon: { n: 'ruler', s: 'cm' }` etc. directly in `data.ts`.

**3. One-off pictograms are named independently of unit display text.**
Each currently-hardcoded pictogram (bus, football pitch, paper sheet, banana, ...) gets a stable kebab-case icon name (e.g. `'paper-sheet'`, not `'a4-sheet'` or `'copy-paper-thickness'`) so future copy edits to a unit's `name`/`plural` never affect its icon. `ICONS['paper-sheet'] = () => [...]` ignores the label argument (one-offs never take a label).

**4. `UnitIconRef` lives next to `Unit` in `data.ts`.**
```ts
export interface UnitIconRef { n: string; s?: string }
export interface Unit {
  name: string; plural: string; f: number; off?: number; cat: Category; note?: string;
  icon: UnitIconRef;
}
```
Every literal in every `UNITS[...]` array gains an `icon` field. This is the mechanical bulk of the change (9 quantities × several units each).

**5. Unknown/missing icon name falls back to a default dot.**
`ICONS[icon.n] ?? ICONS.default`, where `ICONS.default` reproduces today's catch-all `<circle cx="12" cy="12" r="7" />`. This keeps the component defensive against a typo'd `n` without crashing the page.

**6. Call sites pass `unit.icon` instead of `unit.name`.**
`plain/+page.svelte` (watermark + "Rendered Equivalently" cards) and `convert/+page.svelte` (unit picker rows) currently do `<UnitIcon name={p.unitName} .../>` / `<UnitIcon name={u.name} .../>`. Both switch to `<UnitIcon icon={u.icon} .../>`. The `proposals` derivation in `plain/+page.svelte` needs to carry the unit's `icon` through alongside `unitName` (it currently only keeps `unitName` to re-derive the icon by name).

## Risks / Trade-offs

- **[Risk]** Manually re-deriving and assigning `icon.n`/`icon.s` for ~90 unit literals is mechanical and error-prone (easy to typo a name or mismatch a label) → **Mitigation**: build the `ICONS` registry keys first from the *existing* code's name-matching logic (so every current unit name has a known, correct target icon name today), then do the `data.ts` edit as a systematic pass grouped by quantity, and do a full visual diff (screenshot every quantity's picker + plain-terms page before/after) rather than spot checks, since a wrong `s` label or wrong `n` is a silent visual regression, not a type error.
- **[Risk]** `s` labels for the label-badge families were previously derived from a `SYM` map keyed by *exact* unit name string; if a unit's `name` and its intended abbreviation drift out of sync during the migration (e.g. copying the wrong `SYM` entry), the label will be wrong but nothing will fail to compile → **Mitigation**: transcribe the current `SYM`/`MAP_CODE` tables value-by-value into the corresponding `icon.s` fields rather than retyping abbreviations from memory.
- **[Trade-off]** The primitive-DSL approach is more verbose per one-off icon (an array of typed objects vs. inline SVG-shaped Svelte markup) and loses the (minor) benefit of the editor rendering literal SVG tags inline. Accepted because it's what actually removes the per-name branching from the component, which is the point of this change.

## Migration Plan

1. Introduce the `IconPrimitive` type, `UnitIconRef` type, and the icon-library module (`src/lib/icons/`) with all family builders + one-off icon functions, transcribed 1:1 from the current `UnitIcon.svelte` shapes — no visual change yet, nothing wired in.
2. Rewrite `UnitIcon.svelte` to the generic `{ icon, size }` renderer.
3. Add `icon` to the `Unit` interface and to every literal in `data.ts`, using the current name→icon mapping (documented via the existing `Set`s/`SYM`/`MAP_CODE`/`{#if}` chain) as the authoritative source of "what icon does this unit currently show."
4. Update the two call sites (`plain/+page.svelte`, `convert/+page.svelte`) to pass `icon` instead of `name`.
5. Delete the old name-matching code from `UnitIcon.svelte` only after step 3–4 compile and render correctly (keep it available in git history, not behind a flag — this is a small enough change to verify directly).
6. Visual regression pass: for every quantity, open the unit picker (all `si`/`customary`/`practical` rows) and the "Rendered Equivalently" cards, and compare icons against the pre-refactor screenshots taken in this session.

No data persistence, routing, or user-facing behavior changes, so no rollback beyond a normal git revert is needed.

## Open Questions

- Exact kebab-case icon names for each one-off pictogram are an implementation detail to finalize during `tasks.md`/implementation, not a decision that needs to be locked here — any stable, unit-name-independent identifier satisfies the requirement.
