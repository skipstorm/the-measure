## 1. Icon primitive types & library scaffolding

- [x] 1.1 Add `IconPrimitive` union type and `UnitIconRef` type (new file, e.g. `src/lib/icons/types.ts`)
- [x] 1.2 Create `src/lib/icons/families.ts` with the 10 parametrized builder functions (`ruler`, `weight`, `squareUnit`, `beakerUnit`, `clockUnit`, `ampereUnit`, `thermometerUnit`, `moleUnit`, `candelaUnit`, `mapBlob`), each `(label?: string) => IconPrimitive[]`, transcribed from the current snippets in `UnitIcon.svelte` (shape primitives unchanged, label rendered as a trailing `text` primitive only when `label` is truthy)
- [x] 1.3 Create `src/lib/icons/one-off.ts` (or split into a couple of files if unwieldy) with one function per current one-off pictogram (bus, football pitch, paper sheet, banana, trip-around-the-world, earth-moon, Pisa tower, Eiffel tower, pyramid, Fiat Panda, pickup truck, blue whale, great wall, tennis court, elephant, horse, pasta pack, hamster, Boeing 747, apple, swimming pool, drop, teaspoon, teacup, glass, blink of an eye, day/sun, Earth year, Pluto year/ring, LED, phone charger, toaster, car starter motor, lightning bolt, human body temperature, Earth's core, melting iron, melting lead, Sun's surface, frying oil, dozen, human population, grains of sand, stars, candle flame, incandescent bulb, car headlight, lighthouse beacon), each transcribed 1:1 from the current `{:else if name === '...'}` branch, ignoring the label argument
- [x] 1.4 Create `src/lib/icons/index.ts` exporting `ICONS: Record<string, (label?: string) => IconPrimitive[]>` that registers all family + one-off functions under stable kebab-case names, plus `ICONS.default` (the catch-all dot)

## 2. Generic renderer component

- [x] 2.1 Rewrite `src/lib/components/UnitIcon.svelte` to accept `{ icon: UnitIconRef; size?: number }` instead of `{ name: string; size?: number }`
- [x] 2.2 Resolve primitives via `(ICONS[icon.n] ?? ICONS.default)(icon.s)` and render them through one recursive `{#each}`/`{#if el.type === ...}` block covering the fixed primitive kinds (rect/line/circle/ellipse/path/polygon/polyline/text/g), including recursing into `g.children`
- [x] 2.3 Delete the old `SYM`, `MAP_CODE`, all the `*Names` `Set`s, and the ~45-branch name-matching chain from `UnitIcon.svelte`

## 3. Migrate unit data (`src/lib/data.ts`)

- [x] 3.1 Add `icon: UnitIconRef` to the `Unit` interface
- [x] 3.2 Assign `icon` to every `length` unit, using today's rendered icon as the source of truth (rulers get `{n:'ruler', s:<SYM value>}`, weights `{n:'weight', s:...}`, one-offs like bus/football pitch/paper sheet/banana/etc. get their new stable one-off name with no `s`)
- [x] 3.3 Assign `icon` to every `area` unit (squares get `{n:'square', s:...}`, country/lake units get `{n:'map', s:<3-letter code from old MAP_CODE>}`, football pitch/tennis court reuse their one-off icons)
- [x] 3.4 Assign `icon` to every `mass` unit (weights + elephant/horse/pasta/hamster/Boeing/apple one-offs)
- [x] 3.5 Assign `icon` to every `volume` unit (beakers + pool/drop/teaspoon/teacup/glass one-offs)
- [x] 3.6 Assign `icon` to every `time` unit (clocks + blink/day/Earth-year/Pluto-year one-offs)
- [x] 3.7 Assign `icon` to every `current` unit (amperes + LED/phone-charger/toaster/car-starter/lightning one-offs)
- [x] 3.8 Assign `icon` to every `temperature` unit (thermometers + body-temp/Earth's-core/melting-iron/melting-lead/sun-surface/frying-oil one-offs)
- [x] 3.9 Assign `icon` to every `amount` unit (moles + dozen/population/sand/stars one-offs)
- [x] 3.10 Assign `icon` to every `luminous` unit (candela + candle/bulb/headlight/lighthouse one-offs)

## 4. Update call sites

- [x] 4.1 `src/routes/[quantity]/plain/+page.svelte`: carry `icon` through the `proposals` derivation (alongside `unitName`) and pass `icon={p.icon}` to `<UnitIcon>` instead of `name={p.unitName}`
- [x] 4.2 `src/routes/[quantity]/convert/+page.svelte`: pass `icon={u.icon}` to `<UnitIcon>` in the picker rows instead of `name={u.name}`

## 5. Verification

- [x] 5.1 `npm run check` — zero type errors
- [x] 5.2 Run the dev server and, for every one of the 9 quantities, open the unit picker and visually confirm every row's icon matches the pre-refactor screenshots (spot-check label-badge units like metre/centimetre/kelvin/degree Celsius and country/lake units like Italy/Vatican City especially, since a wrong `s` is a silent visual bug, not a type error)
- [x] 5.3 For Length and Mass "In Plain Terms" pages, confirm the "Rendered Equivalently" watermark icons still match, and the direct-conversion shortcut button still opens Direct Conversion with the right unit pre-selected
- [x] 5.4 Confirm renaming a unit's `name`/`plural` in `data.ts` (without touching its `icon` field) leaves its icon unchanged, closing out the original bug report
