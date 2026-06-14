import type { Control, EditNode } from '../model'
import type { ControlValue, TicketStateMap } from '../ticket/ticketTypes'
import { compareValues } from './editNodeEvaluator'

export interface ControlEffectiveState {
  enabled: boolean
  visible: boolean
  forcedValue: string | null
}

export interface EngineState {
  prevResults: Map<string, boolean[]>
  lastNonNull: Map<string, ControlValue>
}

export function createEngineState(): EngineState {
  return { prevResults: new Map(), lastNonNull: new Map() }
}

export function evaluateStateRules(
  controls: Control[],
  ticketState: TicketStateMap,
  engineState: EngineState,
): {
  effects: Map<string, ControlEffectiveState>
  forcedValues: Map<string, ControlValue>
  nextEngineState: EngineState
} {
  // Update lastNonNull register from current ticketState (non-null values only)
  const lastNonNull = new Map(engineState.lastNonNull)
  for (const ctrl of controls) {
    const cv = ticketState.get(ctrl.id)
    if (cv && cv.raw !== null && cv.initialized) {
      lastNonNull.set(ctrl.id, cv)
    }
  }

  const workingState = new Map(ticketState)
  let currentPrevResults = new Map(engineState.prevResults)
  let finalEffects = new Map<string, ControlEffectiveState>()
  const totalForcedValues = new Map<string, ControlValue>()
  let converged = false

  for (let iter = 0; iter < 10; iter++) {
    const thisIterResults = new Map<string, boolean[]>()
    const effects = new Map<string, ControlEffectiveState>()
    const forcedThisIter = new Map<string, ControlValue>()

    for (const ctrl of controls) {
      // Defaults; last-in-document-order wins for enabled/visible
      let enabled = true
      let visible = true
      let forcedValue: string | null = null
      const prevRules = currentPrevResults.get(ctrl.id) ?? []
      const thisRules: boolean[] = []

      for (let i = 0; i < ctrl.stateRules.length; i++) {
        const rule = ctrl.stateRules[i]
        const cond = evalCondition(rule.condition, workingState)
        const prevCond = prevRules[i] ?? false
        thisRules[i] = cond

        const falseToTrue = !prevCond && cond

        if (rule.enabled !== undefined) {
          enabled = cond ? rule.enabled : !rule.enabled
        }
        if (rule.visible !== undefined) {
          visible = cond ? rule.visible : !rule.visible
        }

        // value action fires only on false→true transition
        if (rule.value !== undefined && falseToTrue) {
          if (rule.value === '{NULL}') {
            const prev = lastNonNull.get(ctrl.id)
            forcedThisIter.set(ctrl.id, prev ?? { raw: null, initialized: false })
          } else {
            forcedThisIter.set(ctrl.id, { raw: rule.value, initialized: true })
            forcedValue = rule.value
          }
        }
      }

      thisIterResults.set(ctrl.id, thisRules)
      effects.set(ctrl.id, { enabled, visible, forcedValue })
    }

    // Apply forced values to working state and detect convergence
    let stateChanged = false
    for (const [id, val] of forcedThisIter) {
      const existing = workingState.get(id)
      if (existing?.raw !== val.raw || existing?.initialized !== val.initialized) {
        workingState.set(id, val)
        totalForcedValues.set(id, val)
        stateChanged = true
      }
    }

    finalEffects = effects
    currentPrevResults = thisIterResults

    if (!stateChanged) {
      converged = true
      break
    }

    if (iter === 9) {
      // eslint-disable-next-line no-console
      console.warn('[StateRule] fixpoint did not converge after 10 iterations')
    }
  }

  if (!converged && totalForcedValues.size === 0) {
    converged = true
  }

  // Only report values that actually differ from the original ticketState
  const forcedValues = new Map<string, ControlValue>()
  for (const [id, val] of totalForcedValues) {
    const orig = ticketState.get(id)
    if (orig?.raw !== val.raw || orig?.initialized !== val.initialized) {
      forcedValues.set(id, val)
    }
  }

  return {
    effects: finalEffects,
    forcedValues,
    nextEngineState: { prevResults: currentPrevResults, lastNonNull },
  }
}

export function evalCondition(node: EditNode, state: TicketStateMap): boolean {
  switch (node.kind) {
    case 'ref':
      return false  // unresolved EditRef — should not occur after parsing

    case 'logic': {
      const { op, operands } = node
      if (op === 'AND') {
        for (const o of operands) {
          if (!evalCondition(o, state)) return false
        }
        return true
      }
      if (op === 'OR') {
        for (const o of operands) {
          if (evalCondition(o, state)) return true
        }
        return false
      }
      if (op === 'XOR') {
        let trueCount = 0
        for (const o of operands) {
          if (evalCondition(o, state)) trueCount++
        }
        return trueCount === 1
      }
      // NOT
      return !evalCondition(operands[0], state)
    }

    case 'compare': {
      const { field, op, field2, value } = node
      const cv = state.get(field)

      if (op === 'EX') return cv !== undefined && cv.initialized
      if (op === 'NX') return cv === undefined || !cv.initialized

      const lhsStr = rawToString(cv?.raw)
      const rhsStr = field2 !== undefined
        ? rawToString(state.get(field2)?.raw)
        : (value ?? '')

      return compareValues(lhsStr, rhsStr, op)
    }
  }

  return false
}

function rawToString(raw: ControlValue['raw'] | undefined): string {
  if (raw === null || raw === undefined) return ''
  if (typeof raw === 'boolean') return raw ? 'Y' : 'N'
  if (Array.isArray(raw)) return raw.join(' ')
  return String(raw)
}
