## ADDED Requirements

### Requirement: Responsive column count for proposal cards
The "Rendered Equivalently" proposal cards SHALL be laid out in two columns when the viewport width is 700px or greater, and in a single column when the viewport width is below 700px.

#### Scenario: Wide viewport
- **WHEN** the Plain Terms page is viewed at a viewport width of 700px or more
- **THEN** the proposal cards are arranged in two columns

#### Scenario: Narrow viewport
- **WHEN** the Plain Terms page is viewed at a viewport width below 700px
- **THEN** the proposal cards are arranged one per column (a single column)

#### Scenario: Exact breakpoint boundary
- **WHEN** the viewport width is exactly 700px
- **THEN** the proposal cards are arranged in two columns

### Requirement: Layout responsiveness does not alter card content or count
Changing the column count in response to viewport width SHALL NOT change which proposal cards are shown, their order, or the behavior of the More/Fewer control and scroll region.

#### Scenario: Same cards across breakpoints
- **WHEN** the viewport is resized across the 700px breakpoint without any other input
- **THEN** the same set of cards, in the same order, remains displayed — only their column arrangement changes
