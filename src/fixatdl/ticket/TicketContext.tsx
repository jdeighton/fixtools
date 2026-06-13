import { createContext, useContext } from 'react'
import type { Strategy } from '../model'
import type { ControlValue, TicketStateMap } from './ticketTypes'
import type { ControlEffectiveState } from '../runtime/stateRuleEngine'

export interface TicketCtx {
  state: TicketStateMap
  effectiveState: Map<string, ControlEffectiveState>
  strategy: Strategy
  onChange: (id: string, value: ControlValue) => void
  onRadioSelect: (radioGroup: string, selectedId: string) => void
  getStandardField: (name: string) => string | undefined
  hoveredControlId: string | null
  setHoveredControlId: (id: string | null) => void
  cxlRplMode: boolean
  originalState: TicketStateMap | null
  sendOrder: () => void
}

export const TicketContext = createContext<TicketCtx | null>(null)

export function useTicketCtx(): TicketCtx {
  const ctx = useContext(TicketContext)
  if (!ctx) throw new Error('useTicketCtx requires TicketContext.Provider')
  return ctx
}
