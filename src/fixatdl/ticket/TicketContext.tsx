import { createContext, useContext } from 'react'
import type { Strategy } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'

export interface TicketCtx {
  state: TicketStateMap
  strategy: Strategy
  onChange: (id: string, value: ControlValue) => void
  onRadioSelect: (radioGroup: string, selectedId: string) => void
  getStandardField: (name: string) => string | undefined
}

export const TicketContext = createContext<TicketCtx | null>(null)

export function useTicketCtx(): TicketCtx {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTicketCtx requires TicketContext.Provider')
  return ctx
}
