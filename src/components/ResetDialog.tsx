import styles from './ResetDialog.module.css'

interface Props {
  onConfirm: () => void
  onCancel: () => void
}

export function ResetDialog({ onConfirm, onCancel }: Props) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={e => e.stopPropagation()} role="alertdialog" aria-label="Confirm reset">
        <h2>Reset all data?</h2>
        <p>This will clear all input data and reset every tool. This cannot be undone.</p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button className={styles.confirm} onClick={onConfirm}>Reset</button>
        </div>
      </div>
    </div>
  )
}
