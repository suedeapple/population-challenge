import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { countryColor } from '../utils/colors'
import { formatPopulation } from '../utils/formatters'
import { iso3 } from '../utils/iso3'
import type { CountryData, Tooltip } from '../types'

type Props = {
  countries: CountryData[]
  limit?: number  // how many bars to show; defaults to all
}

const ROW_HEIGHT = 48  // px — must match the CSS row height

// Shared animation config; opacity/filter override this with a shorter duration
const TRANSITION = { duration: 0.6, ease: 'easeInOut' as const }

export function PopulationChart({ countries, limit }: Props) {
  // Spread to avoid mutating the prop in place
  const sorted = [...countries].sort((a, b) => b.Population - a.Population)
  const maxPop = sorted[0].Population
  const visibleCount = limit ?? sorted.length

  // null means nothing is selected (all bars fully opaque)
  const [selected, setSelected] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)

  // Ref so tooltip coordinates can be relative to the chart, not the viewport
  const chartRef = useRef<HTMLElement | null>(null)
  
  // Remembers each row's last rendered top so exiting rows animate out from
  // their current position rather than snapping back to rank * ROW_HEIGHT
  const lastTop = useRef<Record<string, number>>({})

  function handleClick(name: string) {
    setSelected(s => s === name ? null : name)
  }

  function handleBarMouseMove(e: React.MouseEvent, country: string, population: number, max: number) {
    const rect = e.currentTarget.getBoundingClientRect()
    // barEnd is the pixel position where the filled portion ends
    const barEnd = rect.left + (population / max) * rect.width
    if (e.clientX <= barEnd) {
      const chartRect = chartRef.current?.getBoundingClientRect()
      if (!chartRect) return

      // Keep tooltip coordinates local to the chart container to avoid viewport offset issues.
      setTooltip({
        x: e.clientX - chartRect.left + 22,
        y: e.clientY - chartRect.top - 18,
        text: `${country}\nPop: ${population.toLocaleString('en-GB')}`,
      })
    } else {
      // Cursor is over the empty track beyond the bar — hide tooltip
      setTooltip(null)
    }
  }

  return (
    // Explicit height needed because rows are absolutely positioned inside
    <section ref={chartRef} className="population-chart" style={{ height: visibleCount * ROW_HEIGHT }}>
      {sorted.map((country, rank) => {
        const isVisible = rank < visibleCount
        const isDimmed = selected !== null && selected !== country.Country

        // Never-seen countries default to the bottom of the visible area so they
        // animate in from within the chart rather than flying in from off-screen.
        const top = isVisible
          ? rank * ROW_HEIGHT
          : (lastTop.current[country.Country] ?? (visibleCount - 1) * ROW_HEIGHT)

        if (isVisible) {
          lastTop.current[country.Country] = top
        }

        return (
          <motion.div
            key={country.Country}
            className="population-row"
            initial={false}  // skip enter animation on first render
            animate={{ top, opacity: isVisible ? 1 : 0 }}
            transition={TRANSITION}
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
          >
            <span className="population-label">
              {/* label-full shown on wide screens, label-iso3 on narrow */}
              <span className="label-full">{country.Country}</span>
              <span className="label-iso3">{iso3(country.Country)}</span>
            </span>

            <div
              className="population-bar-track"
              onClick={() => handleClick(country.Country)}
              onMouseMove={e => handleBarMouseMove(e, country.Country, country.Population, maxPop)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* scaleX animates from the left origin via CSS transform-origin */}
              <motion.div
                className="population-bar"
                initial={false}
                animate={{
                  scaleX: country.Population / maxPop,
                  opacity: isDimmed ? 0.15 : 1,
                  filter: isDimmed ? 'grayscale(1)' : 'grayscale(0)',
                }}
                transition={{ ...TRANSITION, opacity: { duration: 0.3 }, filter: { duration: 0.3 } }}
                style={{ background: countryColor(country.Country) }}
              />
            </div>

            <span className="population-value">{formatPopulation(country.Population)}</span>
          </motion.div>
        )
      })}

      {/* Tooltip follows the cursor via fixed positioning */}
      {tooltip && (
        <div
          className="population-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </section>
  )
}
