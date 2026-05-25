import { useState, useCallback } from 'react'
import { useApp } from '../../context/AppContext'
import { parseFixMessages } from '../../lib/fixParser'
import esData from '../../../samples/es_buy_partial_fill.txt?raw'
import clData from '../../../samples/cl_sell_partial_cancel.txt?raw'
import gcData from '../../../samples/gc_buy_amend_fill.txt?raw'
import mixedData from '../../../samples/mixed_session.txt?raw'
import styles from './ExamplesTab.module.css'

interface Sample {
  filename: string
  messages: number
  instruments: string
  scenario: string
  data: string
}

const SAMPLES: Sample[] = [
  {
    filename: 'es_buy_partial_fill.txt',
    messages: 10,
    instruments: 'ESU6',
    scenario: 'E-mini S&P 500 — buy 2 contracts at limit 5547.25, partial fill at 5547.25 then remainder filled at 5547.50',
    data: esData,
  },
  {
    filename: 'cl_sell_partial_cancel.txt',
    messages: 11,
    instruments: 'CLU6',
    scenario: 'WTI Crude Oil — sell 5 contracts at limit 75.43, partial fill of 2 contracts, cancel remaining 3',
    data: clData,
  },
  {
    filename: 'gc_buy_amend_fill.txt',
    messages: 9,
    instruments: 'GCU6',
    scenario: 'Gold futures — buy 3 contracts at 2485.40, price amended to 2487.80, full fill at amended price',
    data: gcData,
  },
  {
    filename: 'mixed_session.txt',
    messages: 23,
    instruments: 'ESU6, NQU6, CLU6',
    scenario: 'Full intraday session — ES market buy & close, NQ limit order with price amendment & fill, CL sell with partial fills',
    data: mixedData,
  },
]

export function ExamplesTab() {
  const { setRawInput, setMessages } = useApp()
  const [loadedFile, setLoadedFile] = useState<string | null>(null)

  const load = useCallback((sample: Sample) => {
    const parsed = parseFixMessages(sample.data)
    setRawInput(sample.data)
    setMessages(parsed)
    setLoadedFile(sample.filename)
    setTimeout(() => setLoadedFile(f => f === sample.filename ? null : f), 2000)
  }, [setRawInput, setMessages])

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <h2>Example FIX Sessions</h2>
        <p>
          Pre-built FIX 4.2 log files demonstrating common futures trading scenarios.
          Click a filename to load it into the input panel — all tabs will update immediately.
        </p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>File</th>
              <th>Msgs</th>
              <th>Instrument(s)</th>
              <th>Scenario</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SAMPLES.map(s => {
              const loaded = loadedFile === s.filename
              return (
                <tr
                  key={s.filename}
                  className={`${styles.row} ${loaded ? styles.rowLoaded : ''}`}
                  onClick={() => load(s)}
                >
                  <td className={styles.filenameCell}>
                    <span className={styles.filename}>{s.filename}</span>
                  </td>
                  <td className={styles.countCell}>{s.messages}</td>
                  <td className={styles.instrCell}>{s.instruments}</td>
                  <td className={styles.scenarioCell}>{s.scenario}</td>
                  <td className={styles.actionCell}>
                    {loaded
                      ? <span className={styles.loadedBadge}>Loaded ✓</span>
                      : <span className={styles.loadBtn}>Load</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.notes}>
        <h3>Notes</h3>
        <ul>
          <li>All messages use FIX 4.2 with correct BodyLength (tag 9) and CheckSum (tag 10).</li>
          <li>Futures contracts use standard CME/NYMEX/COMEX symbols and realistic intraday prices.</li>
          <li>The <strong>Sequence</strong> tab shows the message flow as a UML diagram between TRADER01 and the exchange gateway.</li>
          <li>The <strong>Validator</strong> tab confirms all messages are well-formed — no errors expected.</li>
          <li>The mixed session file works well with the <strong>Compare</strong> tab to contrast execution reports across fills.</li>
        </ul>
      </div>
    </div>
  )
}
