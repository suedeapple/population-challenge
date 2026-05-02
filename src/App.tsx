import { useState, useEffect } from 'react'
import rawData from './data/population-data.json'
import realData from './data/population-data-real.json'
import { PopulationChart } from './components/PopulationChart'
import { FiltersModal } from './components/FiltersModal'
import { HelpModal } from './components/HelpModal'
import type { YearData } from './types'
import './App.css'

const originalData = rawData as YearData[]
const realisticData = realData as YearData[]

// localStorage key + TTL for suppressing the help dialog on repeat visits
const HELP_KEY = 'help-seen-at'
const HELP_TTL = 30 * 60 * 1000 // 30 minutes

function shouldShowHelp(): boolean {
  try {
    const raw = localStorage.getItem(HELP_KEY)
    if (!raw) return true
    return Date.now() - Number(raw) > HELP_TTL
  } catch {
    // localStorage may be blocked in private browsing — default to showing help
    return true
  }
}

function markHelpSeen() {
  try { localStorage.setItem(HELP_KEY, String(Date.now())) } catch { /* ignore */ }
}

function App() {
  const [yearIdx, setYearIdx] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [useRealData, setUseRealData] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  // Lazy initialiser reads localStorage once on mount — avoids a flicker
  const [showHelp, setShowHelp] = useState(() => shouldShowHelp())

  const data = useRealData ? realisticData : originalData
  const current = data[yearIdx]

  // Arrow keys navigate years; re-registers if data length changes
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  setYearIdx(i => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setYearIdx(i => Math.min(data.length - 1, i + 1))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [data.length])

  function closeHelp() {
    setShowHelp(false)
    markHelpSeen()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Population Challenge</h1>
        <p>World population by year</p>
        <button
          className="help-toggle"
          onClick={() => setShowHelp(true)}
          aria-label="Help"
          aria-haspopup="dialog"
        >
          <i className="fa-solid fa-circle-question" aria-hidden="true" />
        </button>
      </header>

      <main className="app-main">
        <div className="chart-card">
          {/* Year navigation centred, Filters button pinned right */}
          <div className="chart-card-header">
            <div className="year-nav">
              <button
                onClick={() => setYearIdx(i => i - 1)}
                disabled={yearIdx === 0}
                aria-label="Previous year"
              >
                <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              </button>
              <span className="year-label">{current.Year}</span>
              <button
                onClick={() => setYearIdx(i => i + 1)}
                disabled={yearIdx === data.length - 1}
                aria-label="Next year"
              >
                <i className="fa-solid fa-chevron-right" aria-hidden="true" />
              </button>
            </div>

            <button
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(true)}
              aria-label="Open filters"
              aria-haspopup="dialog"
            >
              <i className="fa-solid fa-sliders" aria-hidden="true" />
              <span className="filter-label">Filters</span>
            </button>
          </div>

          <div className="chart-card-body">
            {/* key forces a clean remount on dataset switch, resetting lastTop positions */}
            <PopulationChart key={`${useRealData}-${showAll}`} countries={current.Countries} limit={showAll ? undefined : 10} />
          </div>
        </div>
      </main>

      <FiltersModal
        open={showFilters}
        onClose={() => setShowFilters(false)}
        showAll={showAll}
        onShowAllChange={setShowAll}
        useRealData={useRealData}
        onUseRealDataChange={setUseRealData}
        countryCount={current.Countries.length}
      />

      <HelpModal
        open={showHelp}
        onClose={closeHelp}
      />

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Population Challenge</p>
      </footer>
    </div>
  )
}

export default App
