import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export function HelpModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const doneRef = useRef<HTMLButtonElement>(null)

  // Keep native dialog in sync with React state; move focus to Done so the
  // ✕ button doesn't receive it on open (avoids accidental dismissal)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      dialog.showModal()
      doneRef.current?.focus()
    } else {
      dialog.close()
    }
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
      aria-labelledby="help-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="modal-header">
        <h2 id="help-title">How it works</h2>
        <button className="modal-close" onClick={onClose} aria-label="Close help">✕</button>
      </div>

      <div className="modal-body">
        <div className="modal-section help-section">
          <p>This chart shows the <strong>population of major countries</strong> over time, from 1990 to the present.</p>
          <p>Use the <strong>← →</strong> arrow buttons (or your keyboard arrow keys) to step through each year and watch the bars animate as populations grow and shift.</p>
          <p><strong>Click a country bar</strong> to highlight it — all other countries dim, making it easier to track one country's growth over time as you navigate the years.</p>
          <p>Use <strong>Filters</strong> to switch between Top 10 and all countries, or toggle between datasets.</p>
        </div>
      </div>

      <div className="modal-footer">
        <button ref={doneRef} className="modal-done" onClick={onClose}>Got it</button>
      </div>
    </dialog>
  )
}
