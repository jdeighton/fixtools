import styles from './TabNav.module.css'

export type TabId = 'translator' | 'compare' | 'parser' | 'validator' | 'enums' | 'dictionary' | 'examples'

const TABS: { id: TabId; label: string }[] = [
  { id: 'translator', label: 'Details' },
  { id: 'compare', label: 'Compare' },
  { id: 'parser', label: 'Sequence' },
  { id: 'validator', label: 'Validator' },
  { id: 'enums', label: 'Enums' },
  { id: 'dictionary', label: 'Dictionary' },
  { id: 'examples', label: 'Examples' },
]

interface Props {
  active: TabId
  onChange: (tab: TabId) => void
}

export function TabNav({ active, onChange }: Props) {
  return (
    <nav className={styles.nav} role="tablist">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={active === id}
          className={`${styles.tab} ${active === id ? styles.active : ''}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
