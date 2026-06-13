import { describe, test, expect } from 'vitest'
import { createRef } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FIX_FIELD_MAP } from '../data/fixFieldDictionary'
import { StandardFieldsPanel, generateClOrdID } from './StandardFieldsPanel'
import type { StandardFieldsHandle } from './StandardFieldsPanel'

// ── FIX_FIELD_MAP ─────────────────────────────────────────────────────────────

describe('FIX_FIELD_MAP', () => {
  test('Symbol → 55', () => {
    expect(FIX_FIELD_MAP['Symbol']).toBe(55)
  })

  test('Side → 54', () => {
    expect(FIX_FIELD_MAP['Side']).toBe(54)
  })

  test('OrdType → 40', () => {
    expect(FIX_FIELD_MAP['OrdType']).toBe(40)
  })

  test('ClOrdID → 11', () => {
    expect(FIX_FIELD_MAP['ClOrdID']).toBe(11)
  })

  test('Price → 44', () => {
    expect(FIX_FIELD_MAP['Price']).toBe(44)
  })

  test('TransactTime → 60', () => {
    expect(FIX_FIELD_MAP['TransactTime']).toBe(60)
  })

  test('unknown field → undefined', () => {
    expect(FIX_FIELD_MAP['NotARealField']).toBeUndefined()
  })
})

// ── generateClOrdID ───────────────────────────────────────────────────────────

describe('generateClOrdID', () => {
  test('returns a non-empty string', () => {
    expect(typeof generateClOrdID()).toBe('string')
    expect(generateClOrdID().length).toBeGreaterThan(0)
  })

  test('two calls produce different values', () => {
    expect(generateClOrdID()).not.toBe(generateClOrdID())
  })
})

// ── StandardFieldsPanel component ────────────────────────────────────────────

describe('StandardFieldsPanel', () => {
  test('ClOrdID is auto-generated and non-empty on mount', () => {
    const ref = createRef<StandardFieldsHandle>()
    render(<StandardFieldsPanel ref={ref} strategy={null} />)
    expect(ref.current?.getStandardField('ClOrdID')).toBeTruthy()
  })

  test('TransactTime is set on mount', () => {
    const ref = createRef<StandardFieldsHandle>()
    render(<StandardFieldsPanel ref={ref} strategy={null} />)
    expect(ref.current?.getStandardField('TransactTime')).toBeTruthy()
  })

  test('getStandardField returns current Symbol value after user input', () => {
    const ref = createRef<StandardFieldsHandle>()
    render(<StandardFieldsPanel ref={ref} strategy={null} />)

    expect(ref.current?.getStandardField('Symbol')).toBeUndefined()

    fireEvent.change(screen.getByLabelText('Symbol'), { target: { value: 'AAPL' } })

    expect(ref.current?.getStandardField('Symbol')).toBe('AAPL')
  })

  test('getStandardField returns undefined for unknown field', () => {
    const ref = createRef<StandardFieldsHandle>()
    render(<StandardFieldsPanel ref={ref} strategy={null} />)
    expect(ref.current?.getStandardField('NotAField')).toBeUndefined()
  })

  test('empty field value returns undefined', () => {
    const ref = createRef<StandardFieldsHandle>()
    render(<StandardFieldsPanel ref={ref} strategy={null} />)
    // Symbol starts empty
    expect(ref.current?.getStandardField('Symbol')).toBeUndefined()
  })

  test('renders default field labels', () => {
    render(<StandardFieldsPanel strategy={null} />)
    expect(screen.getByLabelText('Symbol')).toBeInTheDocument()
    expect(screen.getByLabelText('OrderQty')).toBeInTheDocument()
    expect(screen.getByLabelText('Price')).toBeInTheDocument()
  })

  test('extra FIX_* fields appear when strategy references them', () => {
    const strategy = {
      name: 'S',
      wireValue: 'S',
      parameters: [],
      strategyEdits: [{
        errorMsg: 'err',
        condition: {
          kind: 'compare' as const,
          field: 'FIX_Account',
          op: 'EX' as const,
        },
      }],
      localEdits: [],
    }
    render(<StandardFieldsPanel strategy={strategy} />)
    expect(screen.getByLabelText('Account')).toBeInTheDocument()
  })

  test('no extra fields when strategy has no FIX_* refs beyond defaults', () => {
    const strategy = {
      name: 'S',
      wireValue: 'S',
      parameters: [],
      strategyEdits: [{
        errorMsg: 'err',
        condition: {
          kind: 'compare' as const,
          field: 'FIX_Symbol',  // Symbol is a default field
          op: 'EX' as const,
        },
      }],
      localEdits: [],
    }
    render(<StandardFieldsPanel strategy={strategy} />)
    // The extra section should not appear
    expect(screen.queryByText('Referenced by strategy rules')).not.toBeInTheDocument()
  })
})
