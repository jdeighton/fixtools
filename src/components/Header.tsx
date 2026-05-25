import styles from './Header.module.css'

interface Props {
  onSettings: () => void
  onReset: () => void
}

export function Header({ onSettings, onReset }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FIX Toolkit</h1>
      <div className={styles.actions}>
        <button className={styles.btn} onClick={onSettings} aria-label="Settings">
          <span>&#9881;</span> Settings
        </button>
        <button className={`${styles.btn} ${styles.btnDanger}`} onClick={onReset} aria-label="Reset">
          <span>&#128465;</span> Reset
        </button>
      </div>
    </header>
  )
}
