export type ControlValue = {
  raw: string | string[] | boolean | number | null
  initialized: boolean
}

export type TicketStateMap = Map<string, ControlValue>
