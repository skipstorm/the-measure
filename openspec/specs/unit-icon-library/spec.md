## Purpose
A name-referenced icon library for measurement units, where each unit's data record declares which icon to render (and an optional text label for label-badge icon families), decoupling icon selection from the unit's display name so that renaming a unit never orphans its icon.

## Requirements

### Requirement: Unit records declare an icon reference
Each unit entry in the `UNITS` table SHALL include an `icon` field that references an icon from the icon library by name, decoupled from the unit's `name`/`plural` display text. The `icon` field MAY include an optional label string to be shown inside label-badge icon families.

#### Scenario: Unit entry carries an icon reference
- **WHEN** a unit record is defined in `data.ts` (e.g. `centimetre`)
- **THEN** the record includes an `icon` field such as `{ n: 'ruler', s: 'cm' }` identifying the icon and its label

#### Scenario: Renaming a unit's display name does not orphan its icon
- **WHEN** a unit's `name`/`plural` is edited (e.g. "A4 sheet" renamed to "Copy paper thickness")
- **THEN** the unit's `icon` field is unchanged and the correct icon still renders, because icon lookup never depends on `name`

### Requirement: Icon component resolves icons by library name
The `UnitIcon` component SHALL accept an icon-reference prop (icon name plus optional label) and render the matching icon from the icon library, without inspecting the unit's display name.

#### Scenario: Rendering a known icon name
- **WHEN** `UnitIcon` receives `{ n: 'bus' }`
- **THEN** it renders the bus pictogram

#### Scenario: Rendering an unknown icon name falls back to a default
- **WHEN** `UnitIcon` receives an icon name absent from the library
- **THEN** it renders the default placeholder icon instead of throwing or rendering nothing

### Requirement: Parametrized icon families render a shared pictogram with a caller-supplied label
The icon library SHALL provide shared, parametrized icon families (at minimum: ruler, weight, square, beaker, clock, ampere, thermometer, mole, candela, map-blob) that render one pictogram and stamp an optional text label onto it, sourced from the unit's icon reference rather than derived from the unit name.

#### Scenario: Two units share an icon family with different labels
- **WHEN** `metre` declares `icon: { n: 'ruler', s: 'm' }` and `centimetre` declares `icon: { n: 'ruler', s: 'cm' }`
- **THEN** both render the same ruler pictogram, each with its own label ("m" vs "cm")

#### Scenario: Label-badge icon with no label
- **WHEN** a unit's icon reference for a label-badge family omits `s`
- **THEN** the icon renders the pictogram without a text label (no "undefined" text)

### Requirement: One-off unit pictograms remain available by name only
The icon library SHALL retain the existing distinct, non-parametrized pictograms (e.g. bus, football pitch, banana, elephant, horse, and the other unique practical-unit icons) addressable by icon name alone, with no label parameter required.

#### Scenario: Rendering a one-off icon
- **WHEN** `UnitIcon` receives `{ n: 'elephant' }`
- **THEN** it renders the elephant pictogram exactly as before the refactor, with no label text
