import styles from './Header.module.css'

export type AppMode = 'messages' | 'atdl'

interface Props {
  mode: AppMode
  onModeChange: (mode: AppMode) => void
  onSettings: () => void
  onReset: () => void
}

export function Header({ mode, onModeChange, onSettings, onReset }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FIX Toolkit</h1>

      <div className={styles.modeSwitcher} role="group" aria-label="Mode">
        <button
          className={`${styles.modeBtn} ${mode === 'messages' ? styles.modeBtnActive : ''}`}
          onClick={() => onModeChange('messages')}
          aria-pressed={mode === 'messages'}
        >
          Messages
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'atdl' ? styles.modeBtnActive : ''}`}
          onClick={() => onModeChange('atdl')}
          aria-pressed={mode === 'atdl'}
        >
          ATDL
        </button>
      </div>

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
