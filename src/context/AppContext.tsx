import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface FixMessage {
  rawLine: string
  timestamp: Date | null
  session: string
  direction: string
  fixVersion: string
  tags: Map<number, string>
  sequenceIndex: number
}

export interface Settings {
  compareMaxAutoDisplay: number
  validatorTimeDeltaSeconds: number
  validateBodyLengthChecksum: boolean
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
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch {
    return fallback
  }
}

interface AppContextValue {
  messages: FixMessage[]
  setMessages: (msgs: FixMessage[]) => void
  rawInput: string
  setRawInput: (input: string) => void
  settings: Settings
  setSettings: (s: Settings) => void
  customEnums: CustomEnum[]
  setCustomEnums: (enums: CustomEnum[]) => void
  resetAll: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<FixMessage[]>([])
  const [rawInput, setRawInput] = useState('')

  const [settings, setSettingsState] = useState<Settings>(() =>
    ({ ...DEFAULT_SETTINGS, ...loadJson('fix-toolkit-settings', {}) })
  )

  const [customEnums, setCustomEnumsState] = useState<CustomEnum[]>(() =>
    loadJson<CustomEnum[]>('fix-toolkit-custom-enums', [])
  )

  const setSettings = useCallback((s: Settings) => {
    setSettingsState(s)
    localStorage.setItem('fix-toolkit-settings', JSON.stringify(s))
  }, [])

  const setCustomEnums = useCallback((enums: CustomEnum[]) => {
    setCustomEnumsState(enums)
    localStorage.setItem('fix-toolkit-custom-enums', JSON.stringify(enums))
  }, [])

  const resetAll = useCallback(() => {
    setMessages([])
    setRawInput('')
  }, [])

  useEffect(() => {
    localStorage.setItem('fix-toolkit-settings', JSON.stringify(settings))
  }, [settings])

  return (
    <AppContext.Provider value={{
      messages, setMessages,
      rawInput, setRawInput,
      settings, setSettings,
      customEnums, setCustomEnums,
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
