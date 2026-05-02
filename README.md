# Population Challenge

## Demo

See it live at [population-challenge.vercel.app](https://population-challenge.vercel.app/) — no install needed.

An interactive animated bar chart showing the population of major countries from 1990 to the present. Step through each year and watch country rankings shift in real time.

## Features

- Animated horizontal bars that reorder as populations change year by year
- Click a country to highlight it and dim all others — useful for tracking a single country across years
- Keyboard navigation: ← → arrow keys to step through years
- Toggle between Top 10 and all countries
- Two datasets: original and realistic population figures (World Bank)
- Responsive layout with ISO 3-letter country codes on narrow screens

## Accessibility

- Native `<dialog>` elements for modals — browser-managed focus trap, ESC to close, and `aria-modal` semantics out of the box
- `aria-label` and `aria-haspopup="dialog"` on all icon-only buttons
- Keyboard navigation for year stepping via ← → arrow keys
- Screen-reader context provided via a visually hidden `<section class="sr-only">` in the HTML — always present regardless of JavaScript
- All interactive controls are keyboard-focusable with visible focus styles

## Data

The original dataset provided for this project does not reflect real-world population figures. A "realistic data" toggle is included as a comparison, sourced from World Bank population data. In a production context the source, methodology, and accuracy of any supplied dataset should be validated with the client before it is used as the basis for a public-facing visualisation.

## Tech stack

- React 18 + TypeScript 5
- Vite 5
- Framer Motion — bar animations
- CSS custom properties + nesting — no CSS framework

## Getting started

```bash
npm install
npm run dev      # dev server → http://localhost:5173
```

## Build

```bash
npm run build    # type-check + compile to dist/
npm run preview  # serve the production build locally
```

## Lint

```bash
npm run lint
```
