import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { applyFilters, type Filter, type FilterSet, type FilterMode } from '../lib/filterLines'
import { parseFixMessages } from '../lib/fixParser'
import { usePersistedState } from '../hooks/usePersistedState'

export interface FixMessage {
  rawLine: string
  timestamp: Date | null
  session: string
  direction: string
  fixVersion: string
  tags: Map<number, string>
  groups: Map<number, Record<number, string>[]>
  sequenceIndex: number
}

export interface Settings {
  compareMaxAutoDisplay: number
  validatorTimeDeltaSeconds: number
  validateBodyLengthChecksum: boolean
  appendOnInput: boolean
  hideHeartbeats: boolean
  copyIncludePreamble: boolean
}

export interface CustomEnum {
  id: string
  tag: number
  value: string
  description: string
  fixVersion: string  // 'FIX.4.2' | 'FIX.4.4' | 'any'
  enabled: boolean
}

const DEFAULT_SETTINGS: Settings = {
  compareMaxAutoDisplay: 10,
  validatorTimeDeltaSeconds: 60,
  validateBodyLengthChecksum: true,
  appendOnInput: false,
  hideHeartbeats: false,
  copyIncludePreamble: true,
}

export type { Filter, FilterSet, FilterMode }

interface AppContextValue {
  messages: FixMessage[]
  setMessages: (msgs: FixMessage[]) => void
  rawInput: string
  setRawInput: (input: string) => void
  settings: Settings
  setSettings: (s: Settings) => void
  customEnums: CustomEnum[]
  setCustomEnums: (enums: CustomEnum[]) => void
  filters: Filter[]
  setFilters: (filters: Filter[]) => void
  filterMode: FilterMode
  setFilterMode: (mode: FilterMode) => void
  filterSets: FilterSet[]
  setFilterSets: (sets: FilterSet[]) => void
  filteredRawInput: string
  effectiveMessages: FixMessage[]
  resetAll: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<FixMessage[]>([])
  const [rawInput, setRawInput] = useState('')
  const [filters, setFilters] = useState<Filter[]>([])
  const [filterMode, setFilterMode] = useState<FilterMode>('AND')

  const [filterSets, setFilterSets] = usePersistedState<FilterSet[]>('fix-toolkit-filter-sets', [])

  const [settings, setSettings] = usePersistedState<Settings>('fix-toolkit-settings', DEFAULT_SETTINGS)

  const [customEnums, setCustomEnums] = usePersistedState<CustomEnum[]>('fix-toolkit-custom-enums', [])

  const filteredRawInput = useMemo(() => {
    if (filters.length === 0) return rawInput
    const lines = rawInput.split('\n')
    return applyFilters(lines, filters, filterMode).join('\n')
  }, [rawInput, filters, filterMode])

  const effectiveMessages = useMemo(() => {
    if (filters.length === 0) return messages
    return parseFixMessages(filteredRawInput)
  }, [filters, filteredRawInput, messages])

  const resetAll = useCallback(() => {
    setMessages([])
    setRawInput('')
    setFilters([])
  }, [])

  return (
    <AppContext.Provider value={{
      messages, setMessages,
      rawInput, setRawInput,
      settings, setSettings,
      customEnums, setCustomEnums,
      filters, setFilters,
      filterMode, setFilterMode,
      filterSets, setFilterSets,
      filteredRawInput,
      effectiveMessages,
      resetAll,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
