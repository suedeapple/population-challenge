import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  showAll: boolean
  onShowAllChange: (v: boolean) => void
  useRealData: boolean
  onUseRealDataChange: (v: boolean) => void
  countryCount: number
}

export function FiltersModal({ open, onClose, showAll, onShowAllChange, useRealData, onUseRealDataChange, countryCount }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // Keep native dialog in sync with React state
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) dialog.showModal(); else dialog.close()
  }, [open])

  // Clicking the backdrop (outside the content box) closes the dialog
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="filters-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="modal-header">
        <h2 id="filters-title">Filters</h2>
        <button className="modal-close" onClick={onClose} aria-label="Close filters">✕</button>
      </div>

      <div className="modal-body">
        <div className="modal-section">
          <p className="modal-label">View</p>
          <div className="toggle-group">
            <button className={`toggle-btn ${!showAll ? 'active' : ''}`} onClick={() => onShowAllChange(false)}>
              Top 10
            </button>
            <button className={`toggle-btn ${showAll ? 'active' : ''}`} onClick={() => onShowAllChange(true)}>
              All Countries ({countryCount})
            </button>
          </div>
        </div>

        <div className="modal-section">
          <p className="modal-label">Dataset</p>
          <div className="toggle-group">
            <button className={`toggle-btn ${!useRealData ? 'active' : ''}`} onClick={() => onUseRealDataChange(false)}>
              Original data
            </button>
            <button className={`toggle-btn ${useRealData ? 'active' : ''}`} onClick={() => onUseRealDataChange(true)}>
              Realistic data
            </button>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="modal-done" onClick={onClose}>Done</button>
      </div>
    </dialog>
  )
}
