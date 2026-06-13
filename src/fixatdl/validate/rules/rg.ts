import type { AtdlDocument, Finding } from '../../model'

const VALID_RG_FIX_TAGS = new Set([555, 68])  // NoLegs=555, TotNoOrders=68

export function checkRG(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  for (const strat of doc.strategies) {
    const rg = strat.repeatingGroup
    if (!rg) continue

    const loc = `Strategy[${strat.name}]/RepeatingGroup`

    // RG-001: minSize required; maxSize ≥ minSize
    if (rg.minSize == null) {
      findings.push({
        ruleId: 'RG-001', severity: 'error',
        message: `${loc}/@minSize is missing (required)`,
        location: { path: loc },
      })
    } else if (rg.minSize < 0) {
      findings.push({
        ruleId: 'RG-001', severity: 'error',
        message: `${loc}/@minSize ${rg.minSize} must be ≥ 0`,
        location: { path: loc },
      })
    }

    if (rg.maxSize != null && rg.minSize != null && rg.maxSize < rg.minSize) {
      findings.push({
        ruleId: 'RG-001', severity: 'error',
        message: `${loc}/@maxSize ${rg.maxSize} is less than @minSize ${rg.minSize}`,
        location: { path: loc },
      })
    }

    // RG-002: fixTag must be 555 (NoLegs) or 68 (TotNoOrders)
    if (rg.fixTag != null && !VALID_RG_FIX_TAGS.has(rg.fixTag)) {
      findings.push({
        ruleId: 'RG-002', severity: 'error',
        message: `${loc}/@fixTag ${rg.fixTag} is not a valid repeating group tag — must be 555 (NoLegs) or 68 (TotNoOrders)`,
        location: { path: loc },
      })
    }

    // RG-003: info notice — simulation is out of scope
    findings.push({
      ruleId: 'RG-003', severity: 'info',
      message: `Strategy[${strat.name}] has a RepeatingGroup — multi-leg order simulation is not supported in this workbench; the repeating group rows will not be rendered`,
      location: { path: loc },
    })
  }

  return findings
}
