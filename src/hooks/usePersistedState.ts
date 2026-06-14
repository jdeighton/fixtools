import { useState, useCallback, useRef } from 'react'

function loadJson<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch {
    return fallback
  }
}

/**
 * Like useState, but persists the value to localStorage.
 *
 * Reads from localStorage on mount (lazy init).
 * Writes to localStorage synchronously on every setValue call,
 * so the persisted value is always in sync with React state.
 */
export function usePersistedState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setState] = useState<T>(() => loadJson(key, defaultValue))
  const valueRef = useRef(value)
  valueRef.current = value

  const setValue = useCallback((updater: React.SetStateAction<T>) => {
    const next = typeof updater === 'function'
      ? (updater as (prev: T) => T)(valueRef.current)
      : updater
    valueRef.current = next
    setState(next)
    localStorage.setItem(key, JSON.stringify(next))
  }, [key])

  return [value, setValue]
}
