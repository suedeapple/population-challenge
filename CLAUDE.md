# CLAUDE.md — Population Challenge

## Project Overview
Single-page React app: interactive horizontal bar chart of country populations.
Data loaded from a local JSON file at `src/data/population-data.json`.

## Dev Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Dev server → http://localhost:5173 |
| `npm run build` | Type-check + compile to `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint |

## Tech Stack
- Vite 5, React 18, TypeScript 5
- Recharts 2 — horizontal bar chart
- CSS Modules — scoped styles
- No external API — data from `src/data/population-data.json`

## Structure
```
public/
  favicon.svg
  robots.txt
  llms.txt
src/
  data/
    population-data.json       # Primary dataset
    population-data-real.json  # Real-world figures
    concept.gif                # Design reference
  components/
    PopulationChart.tsx        # Animated horizontal bar chart (hero widget)
    FiltersModal.tsx           # Native <dialog> — view + dataset toggles
    HelpModal.tsx              # Native <dialog> — how it works, shown on first visit
  utils/
    formatters.ts              # Population abbreviation (1.4B, 300M)
    iso3.ts                    # Country → ISO 3166-1 alpha-3 mapping
    colors.ts                  # Bar color helpers
  types/
    index.ts                   # Shared TypeScript types
  App.tsx                      # Root layout, owns topN + sortOrder state
  App.css
  index.css
  main.tsx                     # React root mount
```

## Data Shape
```json
[
  { "name": "China", "population": 1412600000 },
  { "name": "India", "population": 1393000000 }
]
```
