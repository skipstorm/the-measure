## Context

The "Rendered Equivalently" section on the Plain Terms page ([src/routes/[quantity]/plain/+page.svelte](../../../src/routes/[quantity]/plain/+page.svelte)) renders proposal cards in a CSS grid:

```css
.proposals-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
}
```

The two-column count is fixed regardless of viewport width, so on narrow screens each card is too tight. This is a presentation-only adjustment scoped to that single rule.

## Goals / Non-Goals

**Goals:**
- Below a 700px viewport width, the proposal cards render one per column (single column).
- At 700px and above, the existing two-column layout is unchanged.

**Non-Goals:**
- No change to card count, ordering, the More/Fewer control, scroll behavior, or card internals.
- No change to any other grid or page in the app.

## Decisions

- **Breakpoint via a `max-width` media query at the `.proposals-grid` rule.** Keep the default `repeat(2, 1fr)` and override to `1fr` under a media query, rather than rewriting the base rule mobile-first. This is the smallest diff and leaves the desktop layout literally untouched.
  - Alternative considered: `repeat(auto-fit, minmax(<min>, 1fr))`. Rejected — it collapses to one column based on card min-width rather than the explicit 700px viewport threshold the request specifies, making the exact breakpoint implicit and harder to reason about.
- **"Below 700px" means strictly below.** Use `@media (max-width: 699.98px)` so exactly 700px still shows two columns, avoiding the both-rules-match boundary that a plain `max-width: 700px` would create.

## Risks / Trade-offs

- [Only the plain page grid is scoped; component styles are `:local` in Svelte] → No risk of leaking into other grids; the media query lives inside this component's `<style>` block.
- [Breakpoint value is a magic number] → Acceptable for a one-off presentational rule; documented here and in the task.
