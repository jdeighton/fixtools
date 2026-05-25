import { useState } from 'react'
import styles from './SettingsModal.module.css'
import { useApp, type Settings } from '../context/AppContext'

interface Props {
  onClose: () => void
}

export function SettingsModal({ onClose }: Props) {
  const { settings, setSettings } = useApp()
  const [form, setForm] = useState<Settings>({ ...settings })

  const save = () => {
    setSettings(form)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()} role="dialog" aria-label="Settings">
        <div className={styles.header}>
          <h2>Settings</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">&#10005;</button>
        </div>
        <div className={styles.body}>
          <div className={styles.field}>
            <label htmlFor="maxAutoDisplay">Compare: max auto-display messages</label>
            <p className={styles.hint}>If message count &le; this value, Compare shows all automatically</p>
            <input
              id="maxAutoDisplay"
              type="number"
              min={1}
              max={500}
              value={form.compareMaxAutoDisplay}
              onChange={e => setForm(f => ({ ...f, compareMaxAutoDisplay: Number(e.target.value) }))}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="timeDelta">Validator: TransactTime vs SendingTime max delta (seconds)</label>
            <p className={styles.hint}>Flag messages where |TransactTime (60) &minus; SendingTime (52)| exceeds this threshold</p>
            <input
              id="timeDelta"
              type="number"
              min={1}
              value={form.validatorTimeDeltaSeconds}
              onChange={e => setForm(f => ({ ...f, validatorTimeDeltaSeconds: Number(e.target.value) }))}
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.validateBodyLengthChecksum}
                onChange={e => setForm(f => ({ ...f, validateBodyLengthChecksum: e.target.checked }))}
                className={styles.checkbox}
              />
              Validator: check BodyLength (tag 9) and CheckSum (tag 10)
            </label>
            <p className={styles.hint}>Disable when working with log-format FIX data where these values may not match the wire format</p>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
