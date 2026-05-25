import { useState, useMemo } from 'react'
import { FIELDS, FIELDS_42, FIELDS_TT42, FIELDS_TT44, MESSAGES_42, MESSAGES_44, MESSAGES_TT42, MESSAGES_TT44 } from '../../data/fixDictionary'
import type { FieldDef, MessageDef } from '../../data/fixDictionary'
import styles from './DictionaryTab.module.css'

type Version = 'FIX.4.2' | 'FIX.4.4' | 'TT-FIX.4.2' | 'TT-FIX.4.4'
type SubTab = 'msgtype' | 'msgname' | 'fieldtag' | 'fieldname'
type DictView =
  | { kind: 'list' }
  | { kind: 'message'; msgtype: string }
  | { kind: 'field'; tag: number }

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: 'msgtype', label: 'Messages by MsgType' },
  { id: 'msgname', label: 'Messages by Name' },
  { id: 'fieldtag', label: 'Fields by Tag #' },
  { id: 'fieldname', label: 'Fields by Name' },
]

type FieldsMap = Record<number, FieldDef>

function backLabel(history: DictView[], messages: MessageDef[], fields: FieldsMap): string {
  if (history.length < 2) return '← Back'
  const prev = history[history.length - 2]
  if (prev.kind === 'list') return '← Back to list'
  if (prev.kind === 'message') {
    const msg = messages.find(m => m.msgtype === prev.msgtype)
    return `← ${msg?.name ?? prev.msgtype}`
  }
  if (prev.kind === 'field') {
    const def = fields[prev.tag]
    return `← ${def?.name ?? `Tag ${prev.tag}`}`
  }
  return '← Back'
}

// ── Message detail ─────────────────────────────────────────────────────────────

interface MessageDetailProps {
  msgtype: string
  version: string
  messages: MessageDef[]
  fields: FieldsMap
  nameToTag: Map<string, number>
  backLabel: string
  onBack: () => void
  onField: (tag: number) => void
}

function MessageDetail({ msgtype, version, messages, fields, nameToTag, backLabel: bl, onBack, onField }: MessageDetailProps) {
  const msg = messages.find(m => m.msgtype === msgtype)
  if (!msg) return <div className={styles.notFound}>Message type "{msgtype}" not found in {version}.</div>

  const fieldRows = msg.allFields.map(name => {
    const tag = nameToTag.get(name)
    const def = tag !== undefined ? fields[tag] : undefined
    return { name, tag, type: def?.type ?? '', values: def?.values, required: msg.requiredFields.includes(name) }
  })

  return (
    <div className={styles.detailView}>
      <button className={styles.backBtn} onClick={onBack}>{bl}</button>
      <div className={styles.detailHeader}>
        <span className={styles.detailBadge}>{version} · MsgType {msgtype}</span>
        <h2 className={styles.detailTitle}>{msg.name}</h2>
        <span className={styles.detailMeta}>{msg.allFields.length} fields · {msg.requiredFields.length} required</span>
      </div>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Tag #</th>
            <th>Field Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Values</th>
          </tr>
        </thead>
        <tbody>
          {fieldRows.map((row, i) => (
            <tr
              key={i}
              className={row.tag !== undefined ? styles.clickableRow : ''}
              onClick={() => row.tag !== undefined && onField(row.tag)}
            >
              <td className={styles.monoCell}>{row.tag ?? '—'}</td>
              <td>{row.name}</td>
              <td className={styles.typeCell}>{row.type}</td>
              <td>{row.required && <span className={styles.requiredBadge}>Required</span>}</td>
              <td>
                {row.values && Object.keys(row.values).length > 0 &&
                  <span className={styles.enumBadge}>{Object.keys(row.values).length} values</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Field detail ───────────────────────────────────────────────────────────────

interface FieldDetailProps {
  tag: number
  version: string
  fields: FieldsMap
  messages: MessageDef[]
  backLabel: string
  onBack: () => void
  onMessage: (msgtype: string) => void
}

function FieldDetail({ tag, version, fields, messages, backLabel: bl, onBack, onMessage }: FieldDetailProps) {
  const def = fields[tag]
  if (!def) return <div className={styles.notFound}>Tag {tag} not found in {version}.</div>

  const enumEntries = def.values ? Object.entries(def.values) : []
  const usedIn = messages.filter(m => m.allFields.includes(def.name))

  return (
    <div className={styles.detailView}>
      <button className={styles.backBtn} onClick={onBack}>{bl}</button>
      <div className={styles.detailHeader}>
        <span className={styles.detailBadge}>{version} · Tag {tag}</span>
        <h2 className={styles.detailTitle}>{def.name}</h2>
        <span className={styles.detailMeta}>Type: {def.type}</span>
      </div>

      {enumEntries.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionHeader}>Enum Values</h3>
          <table className={styles.dataTable}>
            <thead>
              <tr><th>Value</th><th>Description</th></tr>
            </thead>
            <tbody>
              {enumEntries.map(([value, desc]) => (
                <tr key={value}>
                  <td className={styles.monoCell}>{value}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.sectionHeader}>Used in Messages ({usedIn.length})</h3>
        {usedIn.length === 0 ? (
          <span className={styles.noUsage}>Not used in any {version} message.</span>
        ) : (
          <div className={styles.msgLinkList}>
            {usedIn.map(m => (
              <button key={m.msgtype} className={styles.msgLink} onClick={() => onMessage(m.msgtype)}>
                <span className={styles.msgLinkType}>{m.msgtype}</span>
                <span className={styles.msgLinkName}>{m.name}</span>
                {m.requiredFields.includes(def.name) && <span className={styles.reqIndicator}>R</span>}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// ── Main tab ───────────────────────────────────────────────────────────────────

export function DictionaryTab() {
  const [version, setVersion] = useState<Version>('FIX.4.4')
  const [subTab, setSubTab] = useState<SubTab>('msgtype')
  const [search, setSearch] = useState('')
  const [history, setHistory] = useState<DictView[]>([{ kind: 'list' }])

  const view = history[history.length - 1]
  const navigate = (v: DictView) => setHistory(h => [...h, v])
  const back = () => setHistory(h => h.length > 1 ? h.slice(0, -1) : h)

  const messages =
    version === 'FIX.4.2'    ? MESSAGES_42  :
    version === 'TT-FIX.4.2' ? MESSAGES_TT42 :
    version === 'TT-FIX.4.4' ? MESSAGES_TT44 :
    MESSAGES_44

  const fields: FieldsMap =
    version === 'FIX.4.2'    ? (FIELDS_42   as FieldsMap) :
    version === 'TT-FIX.4.2' ? (FIELDS_TT42 as FieldsMap) :
    version === 'TT-FIX.4.4' ? (FIELDS_TT44 as FieldsMap) :
    FIELDS

  const handleVersionChange = (v: Version) => { setVersion(v); setHistory([{ kind: 'list' }]); setSearch('') }
  const handleSubTabChange = (t: SubTab) => { setSubTab(t); setSearch(''); setHistory([{ kind: 'list' }]) }

  const nameToTag = useMemo(() => {
    const map = new Map<string, number>()
    for (const [tag, def] of Object.entries(fields)) map.set(def.name, Number(tag))
    return map
  }, [fields])

  const fieldList = useMemo(() =>
    Object.entries(fields).map(([tag, def]) => ({ tag: Number(tag), ...def }))
  , [fields])

  const isMsgTab = subTab === 'msgtype' || subTab === 'msgname'
  const q = search.toLowerCase()

  const filteredMessages = useMemo(() => {
    const sorted = [...messages].sort((a, b) =>
      subTab === 'msgtype' ? a.msgtype.localeCompare(b.msgtype) : a.name.localeCompare(b.name)
    )
    return q ? sorted.filter(m => m.msgtype.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)) : sorted
  }, [messages, subTab, q])

  const filteredFields = useMemo(() => {
    const sorted = [...fieldList].sort((a, b) =>
      subTab === 'fieldtag' ? a.tag - b.tag : a.name.localeCompare(b.name)
    )
    return q ? sorted.filter(f => String(f.tag).includes(q) || f.name.toLowerCase().includes(q)) : sorted
  }, [fieldList, subTab, q])

  const bl = backLabel(history, messages, fields)

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <select
          className={styles.versionSelect}
          value={version}
          onChange={e => handleVersionChange(e.target.value as Version)}
        >
          <option value="FIX.4.2">FIX 4.2</option>
          <option value="FIX.4.4">FIX 4.4</option>
          <option value="TT-FIX.4.2">TT FIX 4.2</option>
          <option value="TT-FIX.4.4">TT FIX 4.4</option>
        </select>

        {view.kind === 'list' && (
          <div className={styles.subTabs}>
            {SUB_TABS.map(t => (
              <button
                key={t.id}
                className={`${styles.subTab} ${subTab === t.id ? styles.subTabActive : ''}`}
                onClick={() => handleSubTabChange(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {view.kind === 'list' && (
        <>
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              placeholder={isMsgTab ? 'Search messages…' : 'Search fields…'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
            />
            <span className={styles.count}>
              {isMsgTab ? filteredMessages.length : filteredFields.length} result{(isMsgTab ? filteredMessages.length : filteredFields.length) !== 1 ? 's' : ''}
            </span>
          </div>

          <div className={styles.list}>
            {isMsgTab
              ? filteredMessages.map(m => (
                <div key={m.msgtype} className={styles.listRow} onClick={() => navigate({ kind: 'message', msgtype: m.msgtype })}>
                  <span className={styles.listRowTag}>{m.msgtype}</span>
                  <span className={styles.listRowName}>{m.name}</span>
                  <span className={styles.listRowMeta}>{m.allFields.length} fields</span>
                </div>
              ))
              : filteredFields.map(f => (
                <div key={f.tag} className={styles.listRow} onClick={() => navigate({ kind: 'field', tag: f.tag })}>
                  <span className={styles.listRowTag}>{f.tag}</span>
                  <span className={styles.listRowName}>{f.name}</span>
                  <span className={styles.listRowMeta}>{f.type}{f.values && Object.keys(f.values).length > 0 ? ` · ${Object.keys(f.values).length} values` : ''}</span>
                </div>
              ))
            }
          </div>
        </>
      )}

      {view.kind === 'message' && (
        <MessageDetail
          msgtype={view.msgtype}
          version={version}
          messages={messages}
          fields={fields}
          nameToTag={nameToTag}
          backLabel={bl}
          onBack={back}
          onField={tag => navigate({ kind: 'field', tag })}
        />
      )}

      {view.kind === 'field' && (
        <FieldDetail
          tag={view.tag}
          version={version}
          fields={fields}
          messages={messages}
          backLabel={bl}
          onBack={back}
          onMessage={msgtype => navigate({ kind: 'message', msgtype })}
        />
      )}
    </div>
  )
}
