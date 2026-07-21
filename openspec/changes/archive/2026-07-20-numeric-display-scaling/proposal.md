## Why

The app displays satirical practical-unit conversions whose magnitudes range from vanishingly small (`0.00000007` metres) to astronomically large (`1,000,000,000,000,000,000,000,000` units for "stars in the observable universe"). Today only two of the four places that render a computed number apply any digit-based size reduction, they use inconsistent counting rules (whole-string digit count vs. integer-part-only digit count), and neither has a way to wrap — the containing card simply clips (`overflow: hidden`) whatever doesn't fit. Large results routinely overflow or are cut off, which defeats the point of an app about "faithfully rendering" quantities.

## What Changes

- Add a shared `scaleForDigits(count)` helper (four non-cumulative bands: ≤3 digits → 100%, 4–5 → 70%, 6–8 → 50%, 9+ → 20%) used everywhere a number is sized by its digit count.
- **BREAKING**: Replace the two existing ad hoc, inconsistent sizing computations (`plain/+page.svelte`'s integer-only two-tier logic, `convert/+page.svelte`'s whole-string two-tier logic) with the shared helper applied independently to the integer part and the decimal part.
- Decimal-part size is computed independently from its own digit count via the same helper, then discounted by a flat 80% relative to what that scale would give it — not derived from the integer part's size. This keeps a long decimal legible-but-subordinate even when the integer part is short.
- Switch sizing units from hardcoded `px` to `rem`.
- Extend digit-based sizing (currently only on the two computed-result displays) to the two live-input displays ("Value in X" on Plain Terms, "from-value" on Direct Conversion), which today render at a fixed size with no split between integer and decimal parts.
- Allow a number to wrap: the integer part stays on its own line; the decimal part flows to a line of its own when it doesn't fit, instead of being clipped by the card's `overflow: hidden`.

## Capabilities

### New Capabilities
- `numeric-display-scaling`: digit-count-driven, independently-scaled integer/decimal font sizing (in `rem`) with line-wrap fallback, applied consistently to every rendered numeric value in the app (computed results and live keypad input alike).

### Modified Capabilities
(none — no existing spec covers numeric display sizing; the current behavior was implementation-only, undocumented in `openspec/specs/`)

## Impact

- New shared helper (e.g. `src/lib/format.ts` or a new `src/lib/numeric-display.ts`) exporting `scaleForDigits` and a function that derives `{ intSize, decSize }` (in rem) from a formatted numeric string.
- `src/routes/[quantity]/plain/+page.svelte` — "Value in X" input display and the "Rendered Equivalently" proposal cards both move to the shared sizing logic; card CSS changes to allow the decimal part to wrap to its own line instead of being clipped.
- `src/routes/[quantity]/convert/+page.svelte` — "from-value" input display and the "Equals, in X" result both move to the shared sizing logic (the result must first be split into integer/decimal parts, which it isn't today).
- No change to `src/lib/data.ts`, `src/lib/icons/`, or the conversion math (`toBase`/`fromBase`) — this is purely a display-sizing concern.
