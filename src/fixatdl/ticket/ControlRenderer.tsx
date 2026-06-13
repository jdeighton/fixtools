import { useContext, useState, useCallback } from 'react'
import type { Control, Parameter, ParameterType } from '../model'
import type { ControlValue } from './ticketTypes'
import { TicketContext } from './TicketContext'
import { matchListItem, doubleSpinnerTooltip, tzAbbrev } from './complexControls'
import styles from './ControlRenderer.module.css'

// ── Common chrome ──────────────────────────────────────────────────────────────

interface WrapProps {
  control: Control
  param?: Parameter
  children: React.ReactNode
  inline?: boolean
  enabled?: boolean
  hasValue?: boolean
}

function ControlWrap({ control, param, children, inline = false, enabled = true, hasValue = false }: WrapProps) {
  const ctx = useContext(TicketContext)
  const isHovered = ctx?.hoveredControlId === control.id
  const isRequired = param?.use === 'required'

  const onMouseEnter = useCallback(() => ctx?.setHoveredControlId(control.id), [ctx, control.id])
  const onMouseLeave = useCallback(() => ctx?.setHoveredControlId(null), [ctx])

  return (
    <div
      className={[
        inline ? styles.wrapInline : styles.wrap,
        !enabled ? styles.wrapDisabled : '',
        isHovered ? styles.wrapHovered : '',
      ].join(' ').trim()}
      title={control.tooltip ?? undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {!inline && control.label != null && (
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor={control.id}>
            {control.label}
            {isRequired && <span className={styles.required} aria-hidden="true"> *</span>}
          </label>
          {!enabled && hasValue && (
            <span className={styles.valuedDot} title="Has value on wire" aria-hidden="true" />
          )}
          {control.helpText && (
            <button type="button" className={styles.helpBtn} title={control.helpText} aria-label={`Help for ${control.id}`}>
              ⓘ
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

// ── Control props ──────────────────────────────────────────────────────────────

interface CtrlProps {
  control: Control
  param: Parameter | undefined
  value: ControlValue
  onChange: (v: ControlValue) => void
  enabled?: boolean
}

// ── TextField_t ────────────────────────────────────────────────────────────────

function TextFieldControl({ control, param, value, onChange, enabled }: CtrlProps) {
  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <input
        id={control.id}
        type="text"
        className={styles.textInput}
        value={typeof value.raw === 'string' ? value.raw : ''}
        onChange={e => onChange({ raw: e.target.value, initialized: true })}
        placeholder={control.tooltip ?? undefined}
      />
    </ControlWrap>
  )
}

// ── SingleSpinner_t ────────────────────────────────────────────────────────────

function SingleSpinnerControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const step = control.increment ?? 1
  const minVal = param?.minValue !== undefined ? Number(param.minValue) : undefined
  const maxVal = param?.maxValue !== undefined ? Number(param.maxValue) : undefined
  const current = typeof value.raw === 'number' ? value.raw : (value.raw !== null ? Number(value.raw) : '')

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <input
        id={control.id}
        type="number"
        className={styles.numberInput}
        value={current}
        step={step}
        min={minVal}
        max={maxVal}
        onChange={e => onChange({ raw: e.target.value === '' ? null : Number(e.target.value), initialized: true })}
      />
    </ControlWrap>
  )
}

// ── Slider_t ───────────────────────────────────────────────────────────────────

function SliderControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const hasItems = control.listItems.length > 0

  if (hasItems) {
    const items = control.listItems
    const idx = items.findIndex(it => it.enumID === value.raw)
    const sliderIdx = idx >= 0 ? idx : 0
    const current = items[sliderIdx]

    return (
      <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
        <div className={styles.sliderWrap}>
          <div className={styles.sliderRow}>
            <input
              id={control.id}
              type="range"
              className={styles.slider}
              min={0}
              max={items.length - 1}
              value={sliderIdx}
              step={1}
              onChange={e => {
                const i = Number(e.target.value)
                onChange({ raw: items[i]?.enumID ?? null, initialized: true })
              }}
            />
            <span className={styles.sliderValue}>{current?.uiRep ?? ''}</span>
          </div>
        </div>
      </ControlWrap>
    )
  }

  const minVal = param?.minValue !== undefined ? Number(param.minValue) : 0
  const maxVal = param?.maxValue !== undefined ? Number(param.maxValue) : 100
  const current = typeof value.raw === 'number' ? value.raw : minVal

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <div className={styles.sliderWrap}>
        <div className={styles.sliderRow}>
          <input
            id={control.id}
            type="range"
            className={styles.slider}
            min={minVal}
            max={maxVal}
            value={current}
            step={control.increment ?? 1}
            onChange={e => onChange({ raw: Number(e.target.value), initialized: true })}
          />
          <span className={styles.sliderValue}>{current}</span>
        </div>
      </div>
    </ControlWrap>
  )
}

// ── DropDownList_t ─────────────────────────────────────────────────────────────

function DropDownListControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const selected = typeof value.raw === 'string' ? value.raw : ''

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <select
        id={control.id}
        className={styles.select}
        value={selected}
        onChange={e => onChange({ raw: e.target.value, initialized: true })}
      >
        {!value.initialized && <option value="">—</option>}
        {control.listItems.map(it => (
          <option key={it.enumID} value={it.enumID}>{it.uiRep}</option>
        ))}
      </select>
    </ControlWrap>
  )
}

// ── RadioButtonList_t ──────────────────────────────────────────────────────────

function RadioButtonListControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const selected = typeof value.raw === 'string' ? value.raw : null
  const isHoriz = control.orientation === 'HORIZONTAL'

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <div className={isHoriz ? styles.listGroupH : styles.listGroup} role="radiogroup">
        {control.listItems.map(it => (
          <label key={it.enumID} className={styles.listItem}>
            <input
              type="radio"
              className={styles.radio}
              name={control.id}
              value={it.enumID}
              checked={selected === it.enumID}
              onChange={() => onChange({ raw: it.enumID, initialized: true })}
            />
            <span className={styles.listItemLabel}>{it.uiRep}</span>
          </label>
        ))}
      </div>
    </ControlWrap>
  )
}

// ── CheckBox_t ─────────────────────────────────────────────────────────────────

function CheckBoxControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const checked = value.raw === true

  return (
    <div
      className={`${styles.wrapInline} ${enabled === false ? styles.wrapDisabled : ''}`}
      title={control.tooltip ?? undefined}
    >
      <input
        id={control.id}
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={e => onChange({ raw: e.target.checked, initialized: true })}
      />
      {control.label != null && (
        <label htmlFor={control.id} className={styles.inlineLabel}>
          {control.label}
          {param?.use === 'required' && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      {control.helpText && (
        <button type="button" className={styles.helpBtn} title={control.helpText} aria-label={`Help for ${control.id}`}>ⓘ</button>
      )}
    </div>
  )
}

// ── CheckBoxList_t ─────────────────────────────────────────────────────────────

function CheckBoxListControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const selected: string[] = Array.isArray(value.raw) ? value.raw : []
  const isHoriz = control.orientation === 'HORIZONTAL'

  function toggle(enumID: string) {
    const next = selected.includes(enumID)
      ? selected.filter(v => v !== enumID)
      : [...selected, enumID]
    onChange({ raw: next, initialized: true })
  }

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && selected.length > 0}>
      <div className={isHoriz ? styles.listGroupH : styles.listGroup}>
        {control.listItems.map(it => (
          <label key={it.enumID} className={styles.listItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={selected.includes(it.enumID)}
              onChange={() => toggle(it.enumID)}
            />
            <span className={styles.listItemLabel}>{it.uiRep}</span>
          </label>
        ))}
      </div>
    </ControlWrap>
  )
}

// ── MultiSelectList_t ──────────────────────────────────────────────────────────

function MultiSelectListControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const selected: string[] = Array.isArray(value.raw) ? value.raw : []
  const size = Math.min(Math.max(control.listItems.length, 3), 8)

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && selected.length > 0}>
      <select
        id={control.id}
        multiple
        className={styles.select}
        size={size}
        value={selected}
        onChange={e => {
          const vals = Array.from(e.target.selectedOptions).map(o => o.value)
          onChange({ raw: vals, initialized: true })
        }}
      >
        {control.listItems.map(it => (
          <option key={it.enumID} value={it.enumID}>{it.uiRep}</option>
        ))}
      </select>
    </ControlWrap>
  )
}

// ── RadioButton_t (single standalone radio) ────────────────────────────────────

function RadioButtonControl({
  control,
  value,
  onRadioSelect,
  enabled,
}: {
  control: Control
  value: ControlValue
  onRadioSelect: (radioGroup: string, selectedId: string) => void
  enabled?: boolean
}) {
  const checked = value.raw === true
  const group = control.radioGroup ?? control.id

  return (
    <div
      className={`${styles.wrapInline} ${enabled === false ? styles.wrapDisabled : ''}`}
      title={control.tooltip ?? undefined}
    >
      <input
        id={control.id}
        type="radio"
        className={styles.radio}
        name={group}
        checked={checked}
        onChange={e => {
          if (e.target.checked) onRadioSelect(group, control.id)
        }}
      />
      {control.label != null && (
        <label htmlFor={control.id} className={styles.inlineLabel}>{control.label}</label>
      )}
      {control.helpText && (
        <button type="button" className={styles.helpBtn} title={control.helpText} aria-label={`Help for ${control.id}`}>ⓘ</button>
      )}
    </div>
  )
}

// ── Label_t ────────────────────────────────────────────────────────────────────

function LabelControl({ control }: { control: Control }) {
  return (
    <span
      className={styles.labelText}
      title={control.tooltip ?? undefined}
    >
      {control.label ?? ''}
      {control.helpText && (
        <button type="button" className={styles.helpBtn} title={control.helpText} aria-label={`Help for ${control.id}`}> ⓘ</button>
      )}
    </span>
  )
}

// ── Duration_t ─────────────────────────────────────────────────────────────────

function DurationControl({ control, param, value, onChange, enabled }: CtrlProps) {
  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <input
        id={control.id}
        type="text"
        className={styles.textInput}
        value={typeof value.raw === 'string' ? value.raw : ''}
        onChange={e => onChange({ raw: e.target.value, initialized: true })}
        placeholder="e.g. 00:30:00"
      />
    </ControlWrap>
  )
}

// ── Clock_t ────────────────────────────────────────────────────────────────────

const DATE_PARAM_TYPES: ReadonlySet<ParameterType> = new Set([
  'UTCTimestamp_t', 'TZTimestamp_t', 'UTCDateOnly_t', 'LocalMktDate_t',
])
const TIME_PARAM_TYPES: ReadonlySet<ParameterType> = new Set([
  'UTCTimestamp_t', 'TZTimestamp_t', 'UTCTimeOnly_t', 'TZTimeOnly_t',
])

function ClockControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const current = typeof value.raw === 'string' ? value.raw : ''
  const paramType = param?.xsiType
  const isMonthYear = paramType === 'MonthYear_t'
  const hasDate = !isMonthYear && (paramType == null || DATE_PARAM_TYPES.has(paramType as ParameterType))
  const hasTime = !isMonthYear && (paramType == null || TIME_PARAM_TYPES.has(paramType as ParameterType))

  const splitAt = current.indexOf('T')
  const datePart = splitAt >= 0 ? current.slice(0, splitAt) : (hasDate && !hasTime ? current : '')
  const timePart = splitAt >= 0 ? current.slice(splitAt + 1) : (hasTime && !hasDate ? current : '')

  function setDate(d: string) {
    onChange({ raw: hasTime ? `${d}T${timePart}` : d, initialized: true })
  }
  function setTime(t: string) {
    onChange({ raw: hasDate ? `${datePart}T${t}` : t, initialized: true })
  }

  const tz = control.localMktTz
  const hint = tz ? tzAbbrev(tz) : null

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <div className={styles.clockRow}>
        {isMonthYear && (
          <input
            id={control.id}
            type="month"
            className={styles.clockInput}
            value={current}
            onChange={e => onChange({ raw: e.target.value, initialized: true })}
          />
        )}
        {!isMonthYear && hasDate && (
          <input
            id={hasTime ? undefined : control.id}
            type="date"
            className={styles.clockInput}
            value={datePart}
            onChange={e => setDate(e.target.value)}
          />
        )}
        {!isMonthYear && hasTime && (
          <input
            id={control.id}
            type="time"
            step="1"
            className={styles.clockInput}
            value={timePart}
            onChange={e => setTime(e.target.value)}
          />
        )}
        {hint && <span className={styles.tzHint} data-testid="tz-hint">{hint}</span>}
      </div>
    </ControlWrap>
  )
}

// ── DoubleSpinner_t ────────────────────────────────────────────────────────────

function DoubleSpinnerControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const current = typeof value.raw === 'number' ? value.raw : (value.raw !== null ? Number(value.raw) : 0)
  const min = param?.minValue !== undefined ? Number(param.minValue) : -Infinity
  const max = param?.maxValue !== undefined ? Number(param.maxValue) : Infinity

  const outerStep = control.outerIncrement ?? control.increment ?? 1
  const innerStep = control.innerIncrement ?? control.increment ?? 1

  function clamp(v: number): number {
    return Math.min(max, Math.max(min, v))
  }
  function step(delta: number) {
    onChange({ raw: clamp(current + delta), initialized: true })
  }

  const outerTip = doubleSpinnerTooltip(control.outerIncrementPolicy ?? control.incrementPolicy, outerStep)
  const innerTip = doubleSpinnerTooltip(control.innerIncrementPolicy ?? control.incrementPolicy, innerStep)

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <div className={styles.dsSpinner}>
        <div className={styles.dsArrows}>
          <button type="button" className={styles.dsBtn} onClick={() => step(outerStep)} title={outerTip} aria-label="Outer increment">▲</button>
          <button type="button" className={styles.dsBtn} onClick={() => step(-outerStep)} title={outerTip} aria-label="Outer decrement">▼</button>
        </div>
        <input
          id={control.id}
          type="text"
          inputMode="numeric"
          className={styles.dsInput}
          value={current}
          onChange={e => {
            const n = parseFloat(e.target.value)
            if (!isNaN(n)) onChange({ raw: clamp(n), initialized: true })
          }}
          onBlur={e => {
            const n = parseFloat(e.target.value)
            onChange({ raw: clamp(isNaN(n) ? 0 : n), initialized: true })
          }}
        />
        <div className={styles.dsArrows}>
          <button type="button" className={styles.dsBtn} onClick={() => step(innerStep)} title={innerTip} aria-label="Inner increment">▲</button>
          <button type="button" className={styles.dsBtn} onClick={() => step(-innerStep)} title={innerTip} aria-label="Inner decrement">▼</button>
        </div>
      </div>
    </ControlWrap>
  )
}

// ── EditableDropDownList_t ─────────────────────────────────────────────────────

function EditableDropDownListControl({ control, param, value, onChange, enabled }: CtrlProps) {
  const initialText = value.initialized && typeof value.raw === 'string'
    ? (control.listItems.find(it => it.enumID === value.raw)?.uiRep ?? value.raw)
    : ''

  const [text, setText] = useState(initialText)
  const listId = `${control.id}-list`

  function handleChange(inputText: string) {
    setText(inputText)
    const enumID = matchListItem(inputText, control.listItems)
    onChange({ raw: enumID ?? inputText, initialized: true })
  }

  function handleClear() {
    setText('')
    onChange({ raw: null, initialized: false })
  }

  return (
    <ControlWrap control={control} param={param} enabled={enabled} hasValue={value.initialized && value.raw !== null}>
      <div className={styles.edWrap}>
        <input
          id={control.id}
          type="text"
          list={listId}
          className={styles.edInput}
          value={text}
          onChange={e => handleChange(e.target.value)}
          placeholder={control.tooltip ?? undefined}
        />
        <datalist id={listId}>
          {control.listItems.map(it => (
            <option key={it.enumID} value={it.uiRep} />
          ))}
        </datalist>
        {(text || value.initialized) && (
          <button
            type="button"
            className={styles.edClear}
            onClick={handleClear}
            aria-label="Clear"
          >×</button>
        )}
      </div>
    </ControlWrap>
  )
}

// ── Dispatcher ─────────────────────────────────────────────────────────────────

export function ControlRenderer({ control }: { control: Control }) {
  const ctx = useContext(TicketContext)

  // Graceful fallback when rendered outside a provider (e.g. unit tests)
  if (!ctx) {
    return (
      <div className={styles.stub} data-testid="control-slot">
        <span className={styles.stubLabel}>{control.id}</span>
        <span className={styles.stubType}>{control.xsiType}</span>
      </div>
    )
  }

  const effective = ctx.effectiveState.get(control.id) ?? { enabled: true, visible: true, forcedValue: null }

  if (!effective.visible) return null

  const value = ctx.state.get(control.id) ?? { raw: null, initialized: false }
  const param = ctx.strategy.parameters.find(p => p.name === control.parameterRef)
  const enabled = effective.enabled

  function onChange(v: ControlValue) {
    ctx.onChange(control.id, v)
  }

  if (control.xsiType === 'HiddenField_t') return null

  switch (control.xsiType) {
    case 'Label_t':
      return <LabelControl control={control} />
    case 'TextField_t':
      return <TextFieldControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'SingleSpinner_t':
      return <SingleSpinnerControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'Slider_t':
      return <SliderControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'DropDownList_t':
      return <DropDownListControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'RadioButtonList_t':
      return <RadioButtonListControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'CheckBox_t':
      return <CheckBoxControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'CheckBoxList_t':
      return <CheckBoxListControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'MultiSelectList_t':
      return <MultiSelectListControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'RadioButton_t':
      return <RadioButtonControl control={control} value={value} onRadioSelect={ctx.onRadioSelect} enabled={enabled} />
    case 'Duration_t':
      return <DurationControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'Clock_t':
      return <ClockControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'DoubleSpinner_t':
      return <DoubleSpinnerControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    case 'EditableDropDownList_t':
      return <EditableDropDownListControl control={control} param={param} value={value} onChange={onChange} enabled={enabled} />
    default:
      return null
  }
}
