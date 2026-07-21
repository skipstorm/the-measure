## Purpose
Digit-count-driven, independently-scaled integer/decimal font sizing (in `rem`) with a line-wrap fallback, applied consistently to every rendered numeric value in the app (computed results and live keypad input alike), so that quantities ranging from vanishingly small to astronomically large stay legible instead of overflowing or being clipped.

## Requirements

### Requirement: Shared digit-band scaling function
The system SHALL provide a single scaling function that maps a digit count to a size multiplier using four non-cumulative bands: 1–3 digits → 100%, 4–5 digits → 70%, 6–8 digits → 50%, 9+ digits → 20%. This function SHALL be the only source of digit-based scaling used anywhere numeric values are displayed.

#### Scenario: Band boundaries
- **WHEN** the function is called with digit counts 3, 4, 5, 6, 8, and 9
- **THEN** it returns 100%, 70%, 70%, 50%, 50%, and 20% respectively

### Requirement: Integer and decimal parts scale independently
The integer part's display size SHALL be derived from the digit count of the integer part only. The decimal part's display size SHALL be derived from the digit count of the decimal part only, using the same scaling function, and MUST NOT be derived from the integer part's size or digit count.

#### Scenario: Short integer, long decimal
- **WHEN** a value renders with a 1-digit integer part and an 8-digit decimal part
- **THEN** the decimal part's size reflects its own 8-digit band, not the integer's 1-digit band

#### Scenario: Long integer, short decimal
- **WHEN** a value renders with a 9-digit integer part and a 2-digit decimal part
- **THEN** the integer part is scaled to the 9+ digit band while the decimal part is scaled to the 1–3 digit band

### Requirement: Decimal part carries a flat 80% size discount
After scaling the decimal part by its own digit count via the shared scaling function, the system SHALL apply an additional flat 80% multiplier to the decimal part's size, making it visually subordinate to what its own digit-count band would otherwise produce.

#### Scenario: Equal digit counts
- **WHEN** the integer part and decimal part have the same digit count
- **THEN** the decimal part renders at 80% of the size the integer part renders at

### Requirement: Numeric display sizing uses rem units
All computed font sizes for digit-scaled numeric displays SHALL be expressed in `rem`, not `px` or `em`.

#### Scenario: Sizes are rem-based
- **WHEN** the integer or decimal part's font size is computed
- **THEN** the resulting CSS value is expressed in `rem`

### Requirement: Digit-based scaling applies to every rendered numeric value
Digit-based integer/decimal scaling SHALL apply consistently to all four places the app renders a numeric value: the Plain Terms live input display, the Plain Terms "Rendered Equivalently" proposal cards, the Direct Conversion live input display, and the Direct Conversion result display.

#### Scenario: Live input display scales like a computed result
- **WHEN** a user types a value with more than 8 digits into either the Plain Terms or Direct Conversion input
- **THEN** the displayed value is scaled using the same integer/decimal band logic as computed results, not rendered at a fixed size

### Requirement: Long decimal values wrap instead of being clipped
When the decimal part does not fit alongside the integer part, it SHALL wrap onto its own line rather than being clipped by the containing element.

#### Scenario: Decimal part too long for one line
- **WHEN** a decimal part's rendered width exceeds the available space on the integer part's line
- **THEN** the decimal part flows onto a new line beneath the integer part instead of being cut off
