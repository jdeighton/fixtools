import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePersistedState } from './usePersistedState'

// jsdom in this vitest config does not provide global localStorage,
// so we stub a minimal in-memory Storage for the duration of these tests
function createMockStorage() {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    get length() { return store.size },
    key: (i: number) => [...store.keys()][i] ?? null,
  }
}

beforeEach(() => {
  const mock = createMockStorage()
  vi.stubGlobal('localStorage', mock)
  vi.stubGlobal('sessionStorage', mock)
})

describe('usePersistedState', () => {
  beforeEach(() => localStorage.clear())

  it('reads initial value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify({ count: 42 }))
    const { result } = renderHook(() => usePersistedState('test-key', { count: 0 }))
    expect(result.current[0]).toEqual({ count: 42 })
  })

  it('falls back to defaultValue when localStorage is empty', () => {
    const { result } = renderHook(() => usePersistedState('empty-key', { count: 7 }))
    expect(result.current[0]).toEqual({ count: 7 })
  })

  it('writes to localStorage on setValue', () => {
    const { result } = renderHook(() => usePersistedState('write-key', { count: 0 }))
    act(() => {
      result.current[1]({ count: 10 })
    })
    expect(result.current[0]).toEqual({ count: 10 })
    expect(localStorage.getItem('write-key')).toBe(JSON.stringify({ count: 10 }))
  })

  it('accepts a function updater (prevState → newState)', () => {
    const { result } = renderHook(() => usePersistedState('fn-updater', { count: 0 }))
    act(() => {
      result.current[1](prev => ({ count: prev.count + 1 }))
      result.current[1](prev => ({ count: prev.count + 1 }))
    })
    expect(result.current[0]).toEqual({ count: 2 })
    expect(localStorage.getItem('fn-updater')).toBe(JSON.stringify({ count: 2 }))
  })

  it('survives corrupted localStorage gracefully', () => {
    localStorage.setItem('corrupt-key', 'not json at all{{{')
    const { result } = renderHook(() => usePersistedState('corrupt-key', { ok: true }))
    expect(result.current[0]).toEqual({ ok: true })
  })
})
