import { describe, it, expect } from 'vitest'
import { resolveProfile } from './fixValidator'
import { FIELDS, FIELDS_42, FIELDS_TT42, FIELDS_TT44, REQUIRED_FIELDS_42, REQUIRED_FIELDS_44, REQUIRED_FIELDS_TT42, REQUIRED_FIELDS_TT44 } from '../data/fixDictionary'

describe('resolveProfile', () => {
  it('returns FIELDS_42 and REQUIRED_FIELDS_42 for explicit FIX.4.2', () => {
    const { fields, requiredFieldsTable } = resolveProfile('FIX.4.2', undefined)
    expect(fields).toBe(FIELDS_42)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_42)
  })

  it('returns FIELDS and REQUIRED_FIELDS_44 for explicit FIX.4.4', () => {
    const { fields, requiredFieldsTable } = resolveProfile('FIX.4.4', undefined)
    expect(fields).toBe(FIELDS)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_44)
  })

  it('returns TT42 tables for TT-FIX.4.2 profile', () => {
    const { fields, requiredFieldsTable } = resolveProfile('TT-FIX.4.2', undefined)
    expect(fields).toBe(FIELDS_TT42)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_TT42)
  })

  it('returns TT44 tables for TT-FIX.4.4 profile', () => {
    const { fields, requiredFieldsTable } = resolveProfile('TT-FIX.4.4', undefined)
    expect(fields).toBe(FIELDS_TT44)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_TT44)
  })

  it('auto-selects FIX.4.2 when BeginString is FIX.4.2', () => {
    const { fields, requiredFieldsTable } = resolveProfile('auto', 'FIX.4.2')
    expect(fields).toBe(FIELDS_42)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_42)
  })

  it('auto-selects FIX.4.4 when BeginString is FIX.4.4', () => {
    const { fields, requiredFieldsTable } = resolveProfile('auto', 'FIX.4.4')
    expect(fields).toBe(FIELDS)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_44)
  })

  it('auto-selects FIX.4.4 as default when BeginString is missing', () => {
    const { fields, requiredFieldsTable } = resolveProfile('auto', undefined)
    expect(fields).toBe(FIELDS)
    expect(requiredFieldsTable).toBe(REQUIRED_FIELDS_44)
  })
})
