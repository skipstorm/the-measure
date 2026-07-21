# The Measure

### The measurement authority for people who refuse to cooperate with the metric system.

Struggling with classic units of measure? Are you a journalist who won't be told what a
kilometre is? A parent explaining distance to a child who only understands **bananas**? A
professional who thinks in **buses** and settles arguments in **blue whales**?

For centuries, humanity has suffered under the tyranny of the metre. **The Measure** ends that
suffering. Enter any quantity and receive it, instantly, in the units that actually mean
something to you.

## 👉 Try it live

**[skipstorm.github.io/the-measure](https://skipstorm.github.io/the-measure/)**

No install. No account. No dignity required.

---

## What it does

The Measure takes a quantity in a boring, government-approved base unit and renders it in **plain
terms** — the everyday objects your brain already understands.

Type `320,480,923,840` metres and learn, with clinical precision, that this is approximately:

- 🌍 **833.7 Earth–Moon distances**
- 🗺️ **7,997 trips around the world**
- 🧱 **15,120 Great Walls of China**
- 🗼 **971,154,315 Eiffel Towers**
- 🚌 **26,706,743,653 city buses** (standard 12-metre model, naturally)
- 🐋 **13,353,371,827 blue whales**
- 🍌 **1,780,449,576,889 bananas**

Prefer a direct answer? The **Direct Conversion** mode converts between any two units — the
respectable SI ones _and_ the ones measured in Fiat Pandas, Ford F-150s, Leaning Towers of Pisa,
football pitches, and Great Pyramids of Giza.

## What it measures

Nine of the great quantities of the physical universe, each with its own catalogue of sensible
and deeply unsensible units:

**Length · Area · Mass · Volume · Time · Electric current · Temperature · Amount of substance ·
Luminous intensity**

Numbers automatically scale on screen so that even a figure with fourteen digits remains,
technically, readable.

## A note on scientific rigour

The conversion factors are real. The units are real objects. The decision to measure the
Earth–Moon distance in bananas is entirely yours, and we support it.

---

## For the curious (a.k.a. developers)

The Measure is a [SvelteKit](https://svelte.dev/docs/kit) app (Svelte 5, runes) built as a fully
static site and deployed to GitHub Pages.

```sh
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce the static site in build/
npm run preview  # preview the production build locally
```

### Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the site (with
`BASE_PATH=/the-measure` so links resolve under the project subpath) and publishes it to GitHub
Pages. No manual steps.

---

<sub>The Measure is a joke that happens to give correct answers. Do not use it to build a bridge,
dose a medication, or file your taxes. Do use it to win an argument about how many buses tall a
mountain is.</sub>
