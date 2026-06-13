import { useContext } from 'react'
import type { Control, Parameter } from '../model'
import type { ControlValue } from './ticketTypes'
import { TicketContext } from './TicketContext'
import styles from './ControlRenderer.module.css'

// ── Common chrome ──────────────────────────────────────────────────────────────

interface WrapProps {
  control: Control
  param?: Parameter
  children: React.ReactNode
  inline?: boolean
  enabled?: boolean
}

function ControlWrap({ control, param, children, inline = false, enabled = true }: WrapProps) {
  const isRequired = param?.use === 'required'
  return (
    <div
      className={`${inline ? styles.wrapInline : styles.wrap} ${!enabled ? styles.wrapDisabled : ''}`}
      title={control.tooltip ?? undefined}
    >
      {!inline && control.label != null && (
        <div className={styles.labelRow}>
          <label className={styles.label} htmlFor={control.id}>
            {control.label}
            {isRequired && <span className={styles.required} aria-hidden="true"> *</span>}
          </label>
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
}

// ── TextField_t ────────────────────────────────────────────────────────────────

function TextFieldControl({ control, param, value, onChange }: CtrlProps) {
  return (
    <ControlWrap control={control} param={param}>
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

function SingleSpinnerControl({ control, param, value, onChange }: CtrlProps) {
  const step = control.increment ?? 1
  const minVal = param?.minValue !== undefined ? Number(param.minValue) : undefined
  const maxVal = param?.maxValue !== undefined ? Number(param.maxValue) : undefined
  const current = typeof value.raw === 'number' ? value.raw : (value.raw !== null ? Number(value.raw) : '')

  return (
    <ControlWrap control={control} param={param}>
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

function SliderControl({ control, param, value, onChange }: CtrlProps) {
  const hasItems = control.listItems.length > 0

  if (hasItems) {
    const items = control.listItems
    const idx = items.findIndex(it => it.enumID === value.raw)
    const sliderIdx = idx >= 0 ? idx : 0
    const current = items[sliderIdx]

    return (
      <ControlWrap control={control} param={param}>
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
    <ControlWrap control={control} param={param}>
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

function DropDownListControl({ control, param, value, onChange }: CtrlProps) {
  const selected = typeof value.raw === 'string' ? value.raw : ''

  return (
    <ControlWrap control={control} param={param}>
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

function RadioButtonListControl({ control, param, value, onChange }: CtrlProps) {
  const selected = typeof value.raw === 'string' ? value.raw : null
  const isHoriz = control.orientation === 'HORIZONTAL'

  return (
    <ControlWrap control={control} param={param}>
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

function CheckBoxControl({ control, param, value, onChange }: CtrlProps) {
  const checked = value.raw === true

  return (
    <div
      className={styles.wrapInline}
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

function CheckBoxListControl({ control, param, value, onChange }: CtrlProps) {
  const selected: string[] = Array.isArray(value.raw) ? value.raw : []
  const isHoriz = control.orientation === 'HORIZONTAL'

  function toggle(enumID: string) {
    const next = selected.includes(enumID)
      ? selected.filter(v => v !== enumID)
      : [...selected, enumID]
    onChange({ raw: next, initialized: true })
  }

  return (
    <ControlWrap control={control} param={param}>
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

function MultiSelectListControl({ control, param, value, onChange }: CtrlProps) {
  const selected: string[] = Array.isArray(value.raw) ? value.raw : []
  const size = Math.min(Math.max(control.listItems.length, 3), 8)

  return (
    <ControlWrap control={control} param={param}>
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
}: {
  control: Control
  value: ControlValue
  onRadioSelect: (radioGroup: string, selectedId: string) => void
}) {
  const checked = value.raw === true
  const group = control.radioGroup ?? control.id

  return (
    <div
      className={styles.wrapInline}
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

function DurationControl({ control, param, value, onChange }: CtrlProps) {
  return (
    <ControlWrap control={control} param={param}>
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

// ── Stub (Clock_t, DoubleSpinner_t, EditableDropDownList_t) ────────────────────

function StubControl({ control }: { control: Control }) {
  return (
    <div className={styles.stub} title={`${control.xsiType} — implemented in next release`}>
      <span className={styles.stubType}>{control.xsiType}</span>
      {control.label && <span className={styles.stubLabel}>{control.label}</span>}
    </div>
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

  const value = ctx.state.get(control.id) ?? { raw: null, initialized: false }
  const param = ctx.strategy.parameters.find(p => p.name === control.parameterRef)

  function onChange(v: ControlValue) {
    ctx.onChange(control.id, v)
  }

  if (control.xsiType === 'HiddenField_t') return null

  switch (control.xsiType) {
    case 'Label_t':
      return <LabelControl control={control} />
    case 'TextField_t':
      return <TextFieldControl control={control} param={param} value={value} onChange={onChange} />
    case 'SingleSpinner_t':
      return <SingleSpinnerControl control={control} param={param} value={value} onChange={onChange} />
    case 'Slider_t':
      return <SliderControl control={control} param={param} value={value} onChange={onChange} />
    case 'DropDownList_t':
      return <DropDownListControl control={control} param={param} value={value} onChange={onChange} />
    case 'RadioButtonList_t':
      return <RadioButtonListControl control={control} param={param} value={value} onChange={onChange} />
    case 'CheckBox_t':
      return <CheckBoxControl control={control} param={param} value={value} onChange={onChange} />
    case 'CheckBoxList_t':
      return <CheckBoxListControl control={control} param={param} value={value} onChange={onChange} />
    case 'MultiSelectList_t':
      return <MultiSelectListControl control={control} param={param} value={value} onChange={onChange} />
    case 'RadioButton_t':
      return <RadioButtonControl control={control} value={value} onRadioSelect={ctx.onRadioSelect} />
    case 'Duration_t':
      return <DurationControl control={control} param={param} value={value} onChange={onChange} />
    default:
      return <StubControl control={control} />
  }
}
