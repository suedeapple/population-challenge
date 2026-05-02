import { useEffect, useRef, useState } from 'react'

type FilterValues = {
  showAll: boolean
  useRealData: boolean
}

type Props = {
  open: boolean
  onClose: (values: FilterValues) => void
  initialShowAll: boolean
  initialUseRealData: boolean
  countryCount: number
}

export function FiltersModal({ open, onClose, initialShowAll, initialUseRealData, countryCount }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Draft state — changes are local until the modal closes
  const [showAll, setShowAll] = useState(initialShowAll)
  const [useRealData, setUseRealData] = useState(initialUseRealData)

  // Reset draft to current applied values each time the modal opens
  useEffect(() => {
    if (open) {
      setShowAll(initialShowAll)
      setUseRealData(initialUseRealData)
    }
  }, [open, initialShowAll, initialUseRealData])

  // Keep native dialog in sync with React state
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) dialog.showModal(); else dialog.close()
  }, [open])

  function commit() {
    onClose({ showAll, useRealData })
  }

  // Clicking the backdrop (outside the content box) closes the dialog
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) commit()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="filters-title"
      onClick={handleBackdropClick}
      onClose={commit}
    >
      <div className="modal-header">
        <h2 id="filters-title">Filters</h2>
        <button className="modal-close" onClick={commit} aria-label="Close filters">✕</button>
      </div>

      <div className="modal-body">
        <div className="modal-section">
          <p className="modal-label">View</p>
          <div className="toggle-group">
            <button className={`toggle-btn ${!showAll ? 'active' : ''}`} onClick={() => setShowAll(false)}>
              Top 10
            </button>
            <button className={`toggle-btn ${showAll ? 'active' : ''}`} onClick={() => setShowAll(true)}>
              All Countries ({countryCount})
            </button>
          </div>
        </div>

        <div className="modal-section">
          <p className="modal-label">Dataset</p>
          <div className="toggle-group">
            <button className={`toggle-btn ${!useRealData ? 'active' : ''}`} onClick={() => setUseRealData(false)}>
              Original data
            </button>
            <button className={`toggle-btn ${useRealData ? 'active' : ''}`} onClick={() => setUseRealData(true)}>
              Realistic data
            </button>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="modal-done" onClick={commit}>Done</button>
      </div>
    </dialog>
  )
}
