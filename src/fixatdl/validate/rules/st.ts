import type { AtdlDocument, Finding } from '../../model'

export function checkST(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  // ST-001: strategyIdentifierTag present and positive integer
  if (doc.strategyIdentifierTag == null) {
    findings.push({
      ruleId: 'ST-001',
      severity: 'error',
      message: 'strategyIdentifierTag is absent — required by spec',
      suggestion: 'Add strategyIdentifierTag="<tag>" to <Strategies> (e.g. a vendor-reserved tag > 5000)',
      location: { path: 'Strategies' },
    })
  } else if (!Number.isInteger(doc.strategyIdentifierTag) || doc.strategyIdentifierTag <= 0) {
    findings.push({
      ruleId: 'ST-001',
      severity: 'error',
      message: `strategyIdentifierTag="${doc.strategyIdentifierTag}" is not a positive integer`,
      location: { path: 'Strategies' },
    })
  }

  // ST-002: at least one Strategy child
  if (doc.strategies.length === 0) {
    findings.push({
      ruleId: 'ST-002',
      severity: 'error',
      message: 'No Strategy elements found — a FIXatdl document must contain at least one',
      location: { path: 'Strategies' },
    })
  }

  // ST-003: if tag957Support is false, every parameter must have fixTag
  if (!doc.tag957Support) {
    for (const strategy of doc.strategies) {
      const allParams = [
        ...strategy.parameters,
        ...(strategy.repeatingGroup?.parameters ?? []),
      ]
      for (const param of allParams) {
        if (param.fixTag == null) {
          findings.push({
            ruleId: 'ST-003',
            severity: 'error',
            message: `Strategy[${strategy.name}]/Parameter[${param.name}] has no fixTag but tag957Support is false — UDF transport requires fixTag on every parameter`,
            suggestion: 'Either add fixTag to the parameter or set tag957Support="true" on <Strategies>',
            specRef: 'Spec §Transport, decision table',
            location: { path: `Strategy[${strategy.name}]/Parameter[${param.name}]` },
          })
        }
      }
    }
  }

  // ST-004: versionIdentifierTag absent while strategies carry version values
  if (doc.versionIdentifierTag == null) {
    const hasVersioned = doc.strategies.some(s => s.version != null)
    if (hasVersioned) {
      findings.push({
        ruleId: 'ST-004',
        severity: 'warning',
        message: 'Strategy/@version values are present but versionIdentifierTag is absent — version cannot be transmitted',
        suggestion: 'Add versionIdentifierTag="<tag>" to <Strategies>',
        location: { path: 'Strategies' },
      })
    }
  }

  // ST-005: duplicate wireValue across strategies
  const wireValues = new Map<string, string>()
  for (const strategy of doc.strategies) {
    if (!strategy.wireValue) continue
    const prev = wireValues.get(strategy.wireValue)
    if (prev) {
      findings.push({
        ruleId: 'ST-005',
        severity: 'warning',
        message: `Strategy wireValue="${strategy.wireValue}" is shared by "${prev}" and "${strategy.name}" — recipients cannot distinguish them`,
        location: { path: `Strategy[${strategy.name}]` },
      })
    } else {
      wireValues.set(strategy.wireValue, strategy.name)
    }
  }

  return findings
}
