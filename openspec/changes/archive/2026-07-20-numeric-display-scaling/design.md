## Context

Four places in the app render a numeric value at large display size: the Plain Terms live input, the Plain Terms "Rendered Equivalently" proposal cards, the Direct Conversion live input, and the Direct Conversion result. Only two of these (the two computed results) currently scale down for long numbers, and they do it two different ways:

- `plain/+page.svelte` counts digits in the **integer part only** (`digitCount(intPart)`) and picks one of two fixed px sizes for both integer and decimal spans, with the decimal always rendered at 80% of whatever the integer's size is.
- `convert/+page.svelte` counts digits across the **whole formatted string** (integer + decimal combined) and picks one of two fixed px sizes for the entire un-split result string — there is no integer/decimal split here at all today.

Both cards additionally clip overflow (`overflow: hidden` on `.prop-card`) rather than wrapping, so a number that doesn't fit is silently cut off rather than made readable.

Separately, both computed-result displays already use a *responsive* `clamp(minPx, Nvw, maxPx)` for their baseline size — a viewport-width-driven concern, orthogonal to the digit-count-driven concern this change addresses. The two need to compose, not replace each other.

## Goals / Non-Goals

**Goals:**
- One shared, pure function (`scaleForDigits`) is the single source of truth for digit-count → size-multiplier mapping, used everywhere.
- Integer and decimal parts are sized from their *own* digit counts independently — a short integer next to a long decimal (or vice versa) doesn't cause the long part to inherit a falsely-large size from its short sibling.
- The decimal part carries an additional flat 80% discount on top of its own digit-count scale, so it reads as "detail" rather than competing with the integer part.
- All four numeric-value surfaces use this system, including the two that currently have no digit-based sizing at all.
- A decimal part that doesn't fit wraps to its own line instead of being clipped.

**Non-Goals:**
- Changing the underlying number formatting (`fmt()` in `format.ts`) or its 8-decimal-digit cap.
- Changing the conversion math or unit data.
- Building a general-purpose "auto-fit text" system beyond this app's four specific numeric surfaces.
- Guaranteeing zero overflow for arbitrarily extreme digit counts (see Risks) — this reduces the problem to a rare edge case, it doesn't eliminate it mathematically.

## Decisions

**1. `scaleForDigits(count: number): number` — pure function, four non-cumulative bands.**
```ts
export function scaleForDigits(count: number): number {
	if (count > 8) return 0.2;
	if (count > 5) return 0.5;
	if (count > 3) return 0.7;
	return 1;
}
```
Non-cumulative per the conversation: each band is evaluated against the *original* digit count, not applied on top of the previous band's result. Lives alongside the existing `digitCount()` helper in `src/lib/format.ts` (or a new `src/lib/numeric-display.ts` — see Decision 3), since `digitCount()` already solves the "don't count commas, don't hit exponential notation" problem by operating on `fmt()`'s output rather than the raw number. The scaling function must always receive a digit count derived the same way — from a formatted string via `digitCount()` — never from `rawNumber.toString()`.

**2. Integer and decimal scale independently; decimal gets a flat extra 80%.**
```ts
intScale = scaleForDigits(digitCount(intPart))
decScale = scaleForDigits(digitCount(decPart)) * 0.8
```
Each part's final `rem` size is `baseRem * partScale`. This was the crux decided in conversation: a short integer next to a long decimal must not force the decimal to inherit the integer's (large) scale — the decimal's own length drives its own size, discounted by a flat 80% so it stays visually subordinate even when its own digit count alone would put it in the same band as the integer.

**3. New shared module: `src/lib/numeric-display.ts`.**
Exports `scaleForDigits` and a `scaledSizes(formatted: string, baseRem: number): { intPart, decPart, intRem, decRem }` that internally calls `splitDecimal` (already in `format.ts`) and `digitCount`, then applies Decision 2. Kept separate from `format.ts` because `format.ts` is about turning numbers into strings; this module is about turning a formatted string into display metrics — different concern, same input contract.

**4. A shared presentational unit for the split/scale/wrap/cursor markup, not four copies.**
All four call sites need: an integer `<span>` sized via `intRem`, a decimal `<span>` sized via `decRem`, wrap behavior when the decimal doesn't fit, and (for the two live-input surfaces only) a blinking cursor after the last-typed character. Recommend a small shared Svelte component (e.g. `ScaledNumber.svelte`) taking `{ formatted: string; baseRem: number; showCursor?: boolean }`, so the wrap/scale CSS and cursor-placement logic exist once. The four call sites become thin: pass the already-`fmt()`-formatted computed value (proposal cards, convert result) or the raw typed buffer (live inputs — see Decision 6) plus their own `baseRem`.

**5. Digit-count scaling composes with the existing viewport-responsive `clamp()`, it doesn't replace it.**
Today's `clamp(minPx, Nvw, maxPx)` sizes are a *screen-width* responsiveness mechanism; the new system is a *digit-count* mechanism. Convert each surface's existing px baseline to rem (÷16) and keep its clamp, then multiply by the digit-derived scale:
```css
font-size: calc({intScale} * clamp(2.375rem, 8vw, 3.75rem));
```
So a value with few digits still gets the existing screen-size responsiveness, and a value with many digits shrinks further from wherever the clamp would have landed.

**6. Live-input surfaces scale the raw typed buffer, not a `fmt()`-formatted string.**
The Plain Terms/Direct Conversion inputs display the user's in-progress typed string (`value`/`convValue`) directly — no thousands separators, no `fmt()` rounding, cursor at the end. Splitting on `.` gives the raw integer/decimal parts directly; `digitCount()` still applies safely (it's just a `\d` count, no comma-stripping needed since there are none). The cursor is always positioned after whichever part is currently last (decimal part if a `.` has been typed, integer part otherwise) — since concatenating `intPart + '.' + decPart` (when present) reconstructs the exact typed string, the cursor's position falls out naturally from "render after decPart if it exists, else after intPart."

## Risks / Trade-offs

- **[Risk]** Font size changing while the user is mid-keystroke (crossing a digit-count band boundary) could read as a jarring jump → **Mitigation**: add a short CSS `transition: font-size` on the scaled spans, consistent with the app's existing motion language (`pageIn`/`tick` ease animations already used elsewhere).
- **[Risk]** One proposal card's decimal wrapping to two lines will stretch its CSS Grid row, visually mismatching its sibling card in the same row (`.proposals-grid` is a 2-column grid) → **Mitigation/Open Question**: acceptable as-is, or add `align-items: start` and accept a visible height difference between siblings instead of forced equal-height cards. Not blocking — a implementation-time visual call.
- **[Risk]** Even with independent int/dec scaling down to 20%, a pathologically long integer (e.g. the "stars in the observable universe" scale, 25 digits) at the smallest band could still be wider than its container on narrow viewports → **Mitigation**: keep a last-resort `overflow-wrap: anywhere` on the integer span too, so it can break letter-by-letter rather than blow out the layout, even though the primary fix is the digit-band scale-down.
- **[Trade-off]** Migrating the two already-scaled surfaces onto the new shared logic changes their exact pixel sizes for some digit counts (the old two-tier system and the new four-tier independent-parts system don't coincide everywhere) → acceptable and expected; verify visually across all 9 quantities same as the icon-library-refactor change, rather than assuming pixel-identical output.

## Migration Plan

1. Add `scaleForDigits` and `scaledSizes` to `src/lib/numeric-display.ts` (pure, unit-testable independent of Svelte).
2. Build the shared `ScaledNumber.svelte` (or equivalent shared markup/CSS) implementing split + independent scale + wrap + optional cursor.
3. Migrate the two existing computed-result surfaces (proposal cards, convert result) onto it — first, since they already have *some* scaling logic to replace, lowest risk of regressing something that works today.
4. Add scaling to the two live-input surfaces, which have none today.
5. Visual verification pass: for a representative extreme value per quantity (very large integer, very small/long-decimal value, and a "normal" mid-range value), screenshot all four surfaces and confirm no clipping, sensible wrap behavior, and no jarring layout shift.

No data or routing changes, so a plain git revert is sufficient rollback if needed.

## Open Questions

- Exact `baseRem` per surface: propose converting each surface's current px baseline 1:1 to rem (÷16) as the starting point, adjustable during implementation once real extreme values are visually checked.
- Whether proposal-card grid rows should force equal height (`align-items: stretch`, today's implicit default) or allow independent height when one card's decimal wraps (`align-items: start`) — leave as an implementation-time visual judgment call.
