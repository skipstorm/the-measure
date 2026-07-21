## 1. Implementation

- [x] 1.1 In `src/routes/[quantity]/plain/+page.svelte`, add a `@media (max-width: 699.98px)` block in the component `<style>` that overrides `.proposals-grid` to `grid-template-columns: 1fr` (single column), leaving the base `repeat(2, 1fr)` rule unchanged for ≥700px.

## 2. Verification

- [x] 2.1 At a viewport ≥700px, confirm the proposal cards still render in two columns.
- [x] 2.2 At a viewport <700px (e.g. 375px and 699px), confirm the proposal cards render in a single column, one per row.
- [x] 2.3 At exactly 700px, confirm two columns (breakpoint boundary), and confirm card count, order, and the More/Fewer control are unchanged across the breakpoint.
