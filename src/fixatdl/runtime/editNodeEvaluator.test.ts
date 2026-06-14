import { describe, it, expect } from 'vitest'
import { compareValues } from './editNodeEvaluator'

describe('compareValues', () => {
  describe('numeric comparison (both sides parse as numbers)', () => {
    it('EQ: equal numbers → true', () => {
      expect(compareValues('10', '10', 'EQ')).toBe(true)
      expect(compareValues('3.14', '3.14', 'EQ')).toBe(true)
    })

    it('EQ: different numbers → false', () => {
      expect(compareValues('10', '20', 'EQ')).toBe(false)
    })

    it('NE: different numbers → true', () => {
      expect(compareValues('10', '20', 'NE')).toBe(true)
    })

    it('LT: less than', () => {
      expect(compareValues('5', '10', 'LT')).toBe(true)
      expect(compareValues('10', '5', 'LT')).toBe(false)
      expect(compareValues('10', '10', 'LT')).toBe(false)
    })

    it('GT: greater than', () => {
      expect(compareValues('10', '5', 'GT')).toBe(true)
      expect(compareValues('5', '10', 'GT')).toBe(false)
    })

    it('LE: less than or equal', () => {
      expect(compareValues('5', '10', 'LE')).toBe(true)
      expect(compareValues('10', '10', 'LE')).toBe(true)
      expect(compareValues('10', '5', 'LE')).toBe(false)
    })

    it('GE: greater than or equal', () => {
      expect(compareValues('10', '5', 'GE')).toBe(true)
      expect(compareValues('10', '10', 'GE')).toBe(true)
      expect(compareValues('5', '10', 'GE')).toBe(false)
    })
  })

  describe('string comparison (at least one side is non-numeric)', () => {
    it('EQ: equal strings → true', () => {
      expect(compareValues('abc', 'abc', 'EQ')).toBe(true)
    })

    it('LT: lexicographic order', () => {
      expect(compareValues('aaa', 'zzz', 'LT')).toBe(true)
      expect(compareValues('zzz', 'aaa', 'LT')).toBe(false)
    })

    it('falls back to string when one side is empty', () => {
      expect(compareValues('', '10', 'EQ')).toBe(false)
      expect(compareValues('10', '', 'EQ')).toBe(false)
      expect(compareValues('', '', 'EQ')).toBe(true)
    })

    it('falls back to string when one side is non-numeric', () => {
      expect(compareValues('123', 'abc', 'LT')).toBe(true)  // '1' < 'a' in lexicographic order
    })
  })
})
