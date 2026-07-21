## Why

On narrow viewports the "Rendered Equivalently" cards are still forced into two columns, so each card is too cramped to hold its scaled number and label comfortably — content gets squeezed and the layout feels broken on phones. Below a 700px viewport the cards should stack one per column so each gets the full width.

## What Changes

- The "Rendered Equivalently" proposal grid switches from a fixed two-column layout to a **single column below a 700px viewport width**, reverting to two columns at 700px and above.
- No change to the number of cards shown, their ordering, the More/Fewer control, or the scroll behavior — only the column count responds to viewport width.

## Capabilities

### New Capabilities
- `proposal-cards-layout`: How the "Rendered Equivalently" proposal cards are arranged on screen, including their responsive column count.

### Modified Capabilities
<!-- None: no existing capability owns the proposal-card layout. -->

## Impact

- `src/routes/[quantity]/plain/+page.svelte` — the `.proposals-grid` style rule (currently `grid-template-columns: repeat(2, 1fr)`).
- Presentation-only change: no data, routing, or component API is affected.
