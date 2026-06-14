import type { Strategy, Parameter, EditNode, StrategyEdit } from '../model'
import { compareValues } from './editNodeEvaluator'

export interface StrategyEditResult {
  edit: StrategyEdit | null     // null for data-contract checks
  errorMsg: string
  passed: boolean
  nodeResults: Map<string, boolean>  // path-id → result (enables tree UI)
  skippedFields: string[]            // FIX_* fields that were absent → rule skipped
  isDataContract: boolean
}

// ── Public API ─────────────────────────────────────────────────────────────────

export function evaluateStrategyEdits(
  strategy: Strategy,
  wireValues: Map<string, string>,    // paramName → wireValue
  standardFields: Map<string, string>, // FIX_<name> → value
): StrategyEditResult[] {
  const results: StrategyEditResult[] = []

  results.push(...runDataContractChecks(strategy.parameters, wireValues))

  const lookup = buildLookup(wireValues, standardFields)

  for (const edit of strategy.strategyEdits) {
    const fixRefs = collectFIXRefs(edit.condition)
    const skippedFields = fixRefs.filter(f => !standardFields.has(f))

    if (skippedFields.length > 0) {
      results.push({
        edit,
        errorMsg: edit.errorMsg,
        passed: true,
        nodeResults: new Map(),
        skippedFields,
        isDataContract: false,
      })
      continue
    }

    const nodeResults = new Map<string, boolean>()
    const passed = evalNodeTracked(edit.condition, lookup, nodeResults, '0')
    results.push({
      edit,
      errorMsg: edit.errorMsg,
      passed,
      nodeResults,
      skippedFields: [],
      isDataContract: false,
    })
  }

  return results
}

// ── Lookup building ────────────────────────────────────────────────────────────

function buildLookup(
  wireValues: Map<string, string>,
  standardFields: Map<string, string>,
): Map<string, string> {
  const lookup = new Map<string, string>()
  for (const [k, v] of wireValues) lookup.set(k, v)
  for (const [k, v] of standardFields) lookup.set(k, v)
  return lookup
}

// ── FIX_* reference scanner ────────────────────────────────────────────────────

function collectFIXRefs(node: EditNode): string[] {
  switch (node.kind) {
    case 'compare': {
      const refs: string[] = []
      if (node.field.startsWith('FIX_')) refs.push(node.field)
      if (node.field2?.startsWith('FIX_')) refs.push(node.field2)
      return refs
    }
    case 'logic':
      return node.operands.flatMap(collectFIXRefs)
    case 'ref':
      return []
  }
}

// ── Node evaluation with tracking ─────────────────────────────────────────────

function evalNodeTracked(
  node: EditNode,
  lookup: Map<string, string>,
  nodeResults: Map<string, boolean>,
  path: string,
): boolean {
  // Use node's own id if present, otherwise use tree path
  const id: string =
    node.kind !== 'ref' && node.id != null ? node.id : path

  switch (node.kind) {
    case 'ref': {
      nodeResults.set(id, false)
      return false
    }

    case 'logic': {
      const childResults = node.operands.map((op, i) =>
        evalNodeTracked(op, lookup, nodeResults, `${path}.${i}`),
      )
      let result: boolean
      switch (node.op) {
        case 'AND': result = childResults.every(r => r); break
        case 'OR':  result = childResults.some(r => r); break
        case 'XOR': result = childResults.filter(r => r).length === 1; break
        default:    result = !childResults[0]; break  // NOT
      }
      nodeResults.set(id, result)
      return result
    }

    case 'compare': {
      const { field, op, field2, value } = node
      const lhsStr = lookup.get(field) ?? ''

      if (op === 'EX') {
        const result = lookup.has(field) && lhsStr !== ''
        nodeResults.set(id, result)
        return result
      }
      if (op === 'NX') {
        const result = !lookup.has(field) || lhsStr === ''
        nodeResults.set(id, result)
        return result
      }

      const rhsStr = field2 !== undefined ? (lookup.get(field2) ?? '') : (value ?? '')

      const result = compareValues(lhsStr, rhsStr, op)

      nodeResults.set(id, result)
      return result
    }
  }
}

// ── Data-contract checks ───────────────────────────────────────────────────────

function runDataContractChecks(
  parameters: Parameter[],
  wireValues: Map<string, string>,
): StrategyEditResult[] {
  const results: StrategyEditResult[] = []

  for (const param of parameters) {
    const wv = wireValues.get(param.name)

    if (param.use === 'required' && (wv === undefined || wv === '')) {
      results.push(dc(`Required parameter missing: ${param.name}`))
      continue
    }

    if (wv === undefined || wv === '') continue

    const n = Number(wv)
    const isNumeric = !isNaN(n) && wv.trim() !== ''

    if (isNumeric && param.minValue !== undefined) {
      const min = Number(param.minValue)
      if (!isNaN(min) && n < min) {
        results.push(dc(`${param.name}: value ${wv} is below minimum ${param.minValue}`))
      }
    }

    if (isNumeric && param.maxValue !== undefined) {
      const max = Number(param.maxValue)
      if (!isNaN(max) && n > max) {
        results.push(dc(`${param.name}: value ${wv} exceeds maximum ${param.maxValue}`))
      }
    }

    if (param.minLength !== undefined && wv.length < param.minLength) {
      results.push(dc(`${param.name}: length ${wv.length} is below minimum length ${param.minLength}`))
    }

    if (param.maxLength !== undefined && wv.length > param.maxLength) {
      results.push(dc(`${param.name}: length ${wv.length} exceeds maximum length ${param.maxLength}`))
    }

    if (param.precision !== undefined) {
      const decimalPart = wv.split('.')[1] ?? ''
      if (decimalPart.length > param.precision) {
        results.push(dc(`${param.name}: ${decimalPart.length} decimal places exceeds precision ${param.precision}`))
      }
    }
  }

  return results
}

function dc(errorMsg: string): StrategyEditResult {
  return {
    edit: null,
    errorMsg,
    passed: false,
    nodeResults: new Map(),
    skippedFields: [],
    isDataContract: true,
  }
}
