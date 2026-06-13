import type { AtdlDocument, Strategy, Finding } from '../../model'

const STRING_ID_RE = /^[A-Za-z][A-Za-z0-9_]{0,254}$/
const COUNTRY_CODE_RE = /^[A-Z0-9]{2}$/
const VALID_FIX_MSG_TYPES = new Set(['D', 'E', 'AB', 's'])
const VALID_REGIONS = new Set(['TheAmericas', 'EuropeMiddleEastAfrica', 'AsiaPacificJapan'])

function checkOne(doc: AtdlDocument, strategy: Strategy, allNames: Set<string>): Finding[] {
  const findings: Finding[] = []
  const path = (sub?: string) => sub ? `Strategy[${strategy.name}]/${sub}` : `Strategy[${strategy.name}]`

  // SG-001: name present, valid StringID, unique
  if (!strategy.name) {
    findings.push({
      ruleId: 'SG-001', severity: 'error',
      message: 'Strategy/@name is missing (required)',
      location: { path: 'Strategy' },
    })
  } else if (!STRING_ID_RE.test(strategy.name)) {
    findings.push({
      ruleId: 'SG-001', severity: 'error',
      message: `Strategy/@name "${strategy.name}" is not a valid StringID — must match [A-Za-z][A-Za-z0-9_]{0,254}`,
      location: { path: path() },
    })
  } else if (allNames.has(strategy.name) && strategy.name !== doc.strategies.find(s => s !== strategy && s.name === strategy.name)?.name) {
    // duplicate — handled below by the caller tracking the set
  }

  // SG-002: wireValue present
  if (!strategy.wireValue) {
    findings.push({
      ruleId: 'SG-002', severity: 'error',
      message: `Strategy[${strategy.name}]/@wireValue is missing (required)`,
      location: { path: path() },
    })
  }

  // SG-003: version present
  if (strategy.version == null) {
    findings.push({
      ruleId: 'SG-003', severity: 'error',
      message: `Strategy[${strategy.name}]/@version is missing (required by spec attribute table)`,
      suggestion: 'Add version="1" or an appropriate version string',
      location: { path: path() },
    })
  }

  // SG-004: uiRep absent → info
  if (!strategy.uiRep) {
    findings.push({
      ruleId: 'SG-004', severity: 'info',
      message: `Strategy[${strategy.name}] has no uiRep — UI will fall back to name "${strategy.name}"`,
      location: { path: path() },
    })
  }

  // SG-005: fixMsgType, if present, must be D/E/AB/s
  if (strategy.fixMsgType != null && !VALID_FIX_MSG_TYPES.has(strategy.fixMsgType)) {
    findings.push({
      ruleId: 'SG-005', severity: 'error',
      message: `Strategy[${strategy.name}]/@fixMsgType "${strategy.fixMsgType}" is invalid — must be one of D, E, AB, s`,
      location: { path: path() },
    })
  }

  // SG-006: fixMsgType E/AB without RepeatingGroup; or RepeatingGroup with fixMsgType D
  const hasFIXMsgTypeMultileg = strategy.fixMsgType === 'E' || strategy.fixMsgType === 'AB'
  const hasRG = strategy.repeatingGroup != null
  if (hasFIXMsgTypeMultileg && !hasRG) {
    findings.push({
      ruleId: 'SG-006', severity: 'warning',
      message: `Strategy[${strategy.name}] has fixMsgType="${strategy.fixMsgType}" but no RepeatingGroup — multi-leg strategies require a RepeatingGroup`,
      location: { path: path() },
    })
  } else if (hasRG && strategy.fixMsgType === 'D') {
    findings.push({
      ruleId: 'SG-006', severity: 'warning',
      message: `Strategy[${strategy.name}] has a RepeatingGroup with fixMsgType="D" — NewOrderSingle does not carry repeating groups`,
      location: { path: path() },
    })
  }

  // SG-007: region/country/market/security-type constraint checks
  if (strategy.regions) {
    for (const region of strategy.regions.regions) {
      if (!VALID_REGIONS.has(region.name)) {
        findings.push({
          ruleId: 'SG-007', severity: 'error',
          message: `Strategy[${strategy.name}] Region/@name "${region.name}" is not a recognized region — expected one of ${[...VALID_REGIONS].join(', ')}`,
          location: { path: path('Regions') },
        })
      }
      for (const country of region.countries) {
        if (!COUNTRY_CODE_RE.test(country.code)) {
          findings.push({
            ruleId: 'SG-007', severity: 'error',
            message: `Strategy[${strategy.name}] Country code "${country.code}" does not match [A-Z0-9]{2}`,
            location: { path: path('Regions') },
          })
        }
      }
    }
  }

  // SG-008: redundant Exclude when an Include already covers the same item at the same level
  const checkRedundantExcludes = (items: Array<{ name?: string; micCode?: string; inclusion: 'Include' | 'Exclude' }>, levelPath: string) => {
    const included = new Set<string>()
    const excluded = new Set<string>()
    for (const item of items) {
      const key = item.name ?? item.micCode ?? ''
      if (item.inclusion === 'Include') included.add(key)
      else excluded.add(key)
    }
    for (const key of excluded) {
      if (included.has(key)) {
        findings.push({
          ruleId: 'SG-008', severity: 'warning',
          message: `Strategy[${strategy.name}] "${key}" appears as both Include and Exclude at ${levelPath} — Include takes precedence; the Exclude is redundant`,
          location: { path: path(levelPath) },
        })
      }
    }
  }

  if (strategy.regions) {
    checkRedundantExcludes(
      strategy.regions.regions.map(r => ({ name: r.name, inclusion: r.inclusion })),
      'Regions',
    )
    for (const region of strategy.regions.regions) {
      checkRedundantExcludes(
        region.countries.map(c => ({ name: c.code, inclusion: c.inclusion })),
        `Regions/Region[${region.name}]`,
      )
    }
  }
  if (strategy.markets) {
    checkRedundantExcludes(
      strategy.markets.map(m => ({ name: m.micCode, inclusion: m.inclusion })),
      'Markets',
    )
  }
  if (strategy.securityTypes) {
    checkRedundantExcludes(
      strategy.securityTypes.map(s => ({ name: s.name, inclusion: s.inclusion })),
      'SecurityTypes',
    )
  }

  return findings
}

export function checkSG(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  // Collect all strategy names to detect duplicates for SG-001
  const nameCounts = new Map<string, number>()
  for (const s of doc.strategies) {
    nameCounts.set(s.name, (nameCounts.get(s.name) ?? 0) + 1)
  }

  const seenNames = new Set<string>()
  for (const strategy of doc.strategies) {
    findings.push(...checkOne(doc, strategy, seenNames))
    seenNames.add(strategy.name)
  }

  // SG-001 duplicate name findings
  for (const [name, count] of nameCounts) {
    if (count > 1) {
      findings.push({
        ruleId: 'SG-001', severity: 'error',
        message: `Strategy/@name "${name}" is used by ${count} strategies — names must be unique`,
        location: { path: `Strategy[${name}]` },
      })
    }
  }

  return findings
}
