## 1. Shared sizing logic

- [x] 1.1 Add `scaleForDigits(count: number): number` to `src/lib/numeric-display.ts` (new file) with the four non-cumulative bands (≤3 → 1, 4–5 → 0.7, 6–8 → 0.5, 9+ → 0.2)
- [x] 1.2 Add `scaledSizes(formatted: string, baseRem: number)` to the same file: splits `formatted` via the existing `splitDecimal` from `format.ts`, computes `intRem = baseRem * scaleForDigits(digitCount(intPart))` and `decRem = baseRem * scaleForDigits(digitCount(decPart)) * 0.8`, returns `{ intPart, decPart, intRem, decRem }`
- [x] 1.3 Add the same sizing support for the raw (unformatted, no thousands separators) live-input buffers: confirm `scaledSizes` works unchanged when passed the raw typed string split on `.` (no `fmt()` involved)

## 2. Shared presentational component

- [x] 2.1 Create `src/lib/components/ScaledNumber.svelte` accepting `{ formatted: string; baseRem: number; showCursor?: boolean }`, rendering the integer span at `intRem`, the decimal span at `decRem`, with the decimal wrapping to its own line when it doesn't fit alongside the integer
- [x] 2.2 Add `overflow-wrap: anywhere` as a last-resort fallback on the integer span for pathologically long integers
- [x] 2.3 Add a `transition: font-size` on both spans so crossing a digit-count band boundary while typing doesn't look like an abrupt jump
- [x] 2.4 When `showCursor` is true, render the blinking cursor immediately after the decimal span if present, otherwise immediately after the integer span

## 3. Migrate existing computed-result surfaces

- [x] 3.1 `src/routes/[quantity]/plain/+page.svelte`: replace the current inline two-tier `sizeInt`/`sizeDec` px logic in the `proposals` derivation with `scaledSizes`, convert the card's base size (72px/57.6px) to rem, and render each proposal's number via `ScaledNumber`
- [x] 3.2 `src/routes/[quantity]/convert/+page.svelte`: replace the current whole-string `resultMax` px logic with a proper integer/decimal split via `scaledSizes` (this result currently has no split at all) and render via `ScaledNumber`
- [x] 3.3 Update `.prop-card` (plain page) CSS: remove reliance on `overflow: hidden` clipping the number specifically (watermark icon can keep its own clipping) so the decimal can wrap instead of being cut off
- [x] 3.4 Update the convert page's result container CSS analogously so a wrapped decimal has room to render on its own line

## 4. Add scaling to live-input surfaces (previously unscaled)

- [x] 4.1 `src/routes/[quantity]/plain/+page.svelte`: wire the "Value in X" input display (`.value-display`) through `scaledSizes`/`ScaledNumber`, preserving the existing `clamp(minPx, Nvw, maxPx)` responsive baseline converted to rem as the `baseRem` input, composed with the digit-based scale
- [x] 4.2 `src/routes/[quantity]/convert/+page.svelte`: wire the "from-value" input display (`.from-value`) through the same treatment
- [x] 4.3 Confirm the cursor still visually sits at the true end of the typed value in both cases, including immediately after typing a `.` with no digits yet after it

## 5. Verification

- [x] 5.1 `npm run check` — zero type errors
- [x] 5.2 For at least one quantity, drive a "normal" mid-range value through all four surfaces and confirm sizes look unchanged from before this change (no regression for the common case)
- [x] 5.3 For a quantity with a very large practical-unit factor (e.g. `amount` → "stars in the observable universe") and one with a very small factor (e.g. `length` → "Copy paper thickness" or "trip around the world" inverted), drive extreme values through all four surfaces and confirm: no clipping, decimal wraps instead of being cut off, integer/decimal scale independently of each other
- [x] 5.4 Confirm typing past a digit-count band boundary in a live input does not cause a jarring layout jump (transition is visible/smooth)
- [x] 5.5 Spot-check the "short integer, long decimal" and "long integer, short decimal" cases specifically (the scenarios called out in the spec) to confirm the two parts are genuinely scaling independently, not one inheriting the other's size
