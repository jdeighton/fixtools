import sampleXml from '../data/SampleStrategiesFor-v1_1.xml?raw'
import { parseAtdlDocument } from '../parse'
import type { Finding } from '../model'
import { validateDocument } from './engine'

// ── helpers ───────────────────────────────────────────────────────────────────

const testedRuleIds = new Set<string>()

function pv(xml: string): Finding[] {
  return validateDocument(parseAtdlDocument(xml))
}

function has(findings: Finding[], id: string): boolean {
  return findings.some(f => f.ruleId === id)
}

// Fully-valid 1.1 base document that triggers zero findings
const BASE = `<?xml version="1.0" encoding="UTF-8"?>
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"
            xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout"
            xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation"
            xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            strategyIdentifierTag="7620" versionIdentifierTag="7621">
  <Strategy name="S1" wireValue="s1" version="1" uiRep="S One" fixMsgType="D">
    <Parameter name="P1" xsi:type="Int_t" fixTag="7001" use="optional"/>
  </Strategy>
</Strategies>`

// ── golden: bundled sample (WF/NS/ST/SG/PA/CT scope) ────────────────────────

describe('bundled sample — zero WF/NS/ST/SG/PA/CT findings', () => {
  let findings: Finding[]
  const PREFIXES = ['WF-', 'NS-', 'ST-', 'SG-', 'PA-', 'CT-']
  beforeAll(() => {
    const all = validateDocument(parseAtdlDocument(sampleXml))
    findings = all.filter(f => PREFIXES.some(p => f.ruleId.startsWith(p)))
  })

  test('zero errors', () => {
    expect(findings.filter(f => f.severity === 'error')).toHaveLength(0)
  })
  test('zero warnings', () => {
    expect(findings.filter(f => f.severity === 'warning')).toHaveLength(0)
  })
  test('zero info findings', () => {
    expect(findings.filter(f => f.severity === 'info')).toHaveLength(0)
  })
})

// ── WF-001 ────────────────────────────────────────────────────────────────────

describe('WF-001', () => {
  testedRuleIds.add('WF-001')
  test('malformed XML triggers WF-001', () => {
    expect(has(pv('<unclosed>'), 'WF-001')).toBe(true)
  })
  test('well-formed XML does not trigger WF-001', () => {
    expect(has(pv(BASE), 'WF-001')).toBe(false)
  })
})

// ── WF-002 ────────────────────────────────────────────────────────────────────

describe('WF-002', () => {
  testedRuleIds.add('WF-002')
  test('missing XML declaration triggers WF-002 warning', () => {
    const xml = BASE.replace(/^<\?xml[^?]*\?>\n/, '')
    const findings = pv(xml)
    expect(has(findings, 'WF-002')).toBe(true)
    expect(findings.find(f => f.ruleId === 'WF-002')?.severity).toBe('warning')
  })
  test('XML declaration present does not trigger WF-002', () => {
    expect(has(pv(BASE), 'WF-002')).toBe(false)
  })
})

// ── WF-003 ────────────────────────────────────────────────────────────────────

describe('WF-003', () => {
  testedRuleIds.add('WF-003')
  test('encoding="ISO-8859-1" triggers WF-003 warning', () => {
    const xml = BASE.replace('encoding="UTF-8"', 'encoding="ISO-8859-1"')
    const findings = pv(xml)
    expect(has(findings, 'WF-003')).toBe(true)
    expect(findings.find(f => f.ruleId === 'WF-003')?.severity).toBe('warning')
  })
  test('encoding="UTF-8" does not trigger WF-003', () => {
    expect(has(pv(BASE), 'WF-003')).toBe(false)
  })
  test('encoding="utf-8" (lowercase) does not trigger WF-003 (case-insensitive)', () => {
    const xml = BASE.replace('encoding="UTF-8"', 'encoding="utf-8"')
    expect(has(pv(xml), 'WF-003')).toBe(false)
  })
})

// ── WF-004 ────────────────────────────────────────────────────────────────────

describe('WF-004', () => {
  testedRuleIds.add('WF-004')
  test('typographic double-quote triggers WF-004 warning', () => {
    const xml = BASE + '“ smart quote injected ”'
    const findings = pv(xml)
    expect(has(findings, 'WF-004')).toBe(true)
    expect(findings.find(f => f.ruleId === 'WF-004')?.severity).toBe('warning')
  })
  test('typographic single-quote triggers WF-004', () => {
    const xml = BASE + '‘ apostrophe ’'
    expect(has(pv(xml), 'WF-004')).toBe(true)
  })
  test('ASCII-only XML does not trigger WF-004', () => {
    expect(has(pv(BASE), "WF-004")).toBe(false)
  })
})

// ── NS-001 ────────────────────────────────────────────────────────────────────

describe('NS-001', () => {
  testedRuleIds.add('NS-001')
  test('root element other than Strategies triggers NS-001', () => {
    const xml = BASE
      .replace(/<Strategies /, '<NotStrategies ')
      .replace(/<\/Strategies>/, '</NotStrategies>')
    expect(has(pv(xml), 'NS-001')).toBe(true)
  })
  test('root element Strategies does not trigger NS-001', () => {
    expect(has(pv(BASE), 'NS-001')).toBe(false)
  })
})

// ── NS-002 ────────────────────────────────────────────────────────────────────

describe('NS-002', () => {
  testedRuleIds.add('NS-002')
  test('unrecognized namespace triggers NS-002 error', () => {
    const xml = BASE.replace(
      'xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"',
      'xmlns="http://example.com/Unknown"'
    )
    expect(has(pv(xml), 'NS-002')).toBe(true)
  })
  test('recognized 1.1 namespace does not trigger NS-002', () => {
    expect(has(pv(BASE), 'NS-002')).toBe(false)
  })
})

// ── NS-003 ────────────────────────────────────────────────────────────────────

describe('NS-003', () => {
  testedRuleIds.add('NS-003')
  test('1.2 Layout namespace in 1.1 document triggers NS-003 error', () => {
    const xml = BASE.replace(
      'xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout"',
      'xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-2/Layout"'
    )
    const findings = pv(xml)
    expect(has(findings, 'NS-003')).toBe(true)
    expect(findings.find(f => f.ruleId === 'NS-003')?.severity).toBe('error')
  })
  test('all matching 1.1 namespaces do not trigger NS-003', () => {
    expect(has(pv(BASE), 'NS-003')).toBe(false)
  })
})

// ── NS-004 ────────────────────────────────────────────────────────────────────

describe('NS-004', () => {
  testedRuleIds.add('NS-004')
  test('xsi:type used but xsi namespace undeclared triggers NS-004', () => {
    const xml = BASE.replace(
      'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
      'xmlns:other="http://example.com/other"'
    )
    const findings = pv(xml)
    expect(has(findings, 'NS-004')).toBe(true)
    expect(findings.find(f => f.ruleId === 'NS-004')?.severity).toBe('error')
  })
  test('xsi namespace declared does not trigger NS-004', () => {
    expect(has(pv(BASE), 'NS-004')).toBe(false)
  })
})

// ── NS-005 ────────────────────────────────────────────────────────────────────

describe('NS-005', () => {
  testedRuleIds.add('NS-005')
  test('FIXatdl 1.0 namespace triggers NS-005 info', () => {
    const xml = BASE
      .replace(/FIXatdl-1-1/g, 'FIXatdl-1-0')
    const findings = pv(xml)
    expect(has(findings, 'NS-005')).toBe(true)
    expect(findings.find(f => f.ruleId === 'NS-005')?.severity).toBe('info')
  })
  test('FIXatdl 1.1 does not trigger NS-005', () => {
    expect(has(pv(BASE), 'NS-005')).toBe(false)
  })
})

// ── NS-006 ────────────────────────────────────────────────────────────────────

describe('NS-006', () => {
  testedRuleIds.add('NS-006')
  test('FIXatdl 1.2 namespace triggers NS-006 info', () => {
    const xml = BASE.replace(/FIXatdl-1-1/g, 'FIXatdl-1-2')
    const findings = pv(xml)
    expect(has(findings, 'NS-006')).toBe(true)
    expect(findings.find(f => f.ruleId === 'NS-006')?.severity).toBe('info')
  })
  test('FIXatdl 1.1 does not trigger NS-006', () => {
    expect(has(pv(BASE), 'NS-006')).toBe(false)
  })
})

// ── NS-007 ────────────────────────────────────────────────────────────────────

describe('NS-007', () => {
  testedRuleIds.add('NS-007')
  test('unknown 1.2 namespace URI triggers NS-007 info', () => {
    const xml = BASE
      .replace(/FIXatdl-1-1/g, 'FIXatdl-1-2')
      + '' // already replaced, add unknown ns
    const xml2 = xml.replace(
      'xmlns:xsi=',
      'xmlns:ext="http://www.fixprotocol.org/FIXatdl-1-2/CustomExtension" xmlns:xsi='
    )
    const findings = pv(xml2)
    expect(has(findings, 'NS-007')).toBe(true)
    expect(findings.find(f => f.ruleId === 'NS-007')?.severity).toBe('info')
  })
  test('1.2 document with only known namespaces does not trigger NS-007', () => {
    const xml = BASE.replace(/FIXatdl-1-1/g, 'FIXatdl-1-2')
    expect(has(pv(xml), 'NS-007')).toBe(false)
  })
  test('1.1 document does not trigger NS-007', () => {
    expect(has(pv(BASE), 'NS-007')).toBe(false)
  })
})

// ── ST-001 ────────────────────────────────────────────────────────────────────

describe('ST-001', () => {
  testedRuleIds.add('ST-001')
  test('missing strategyIdentifierTag triggers ST-001 error', () => {
    const xml = BASE.replace(' strategyIdentifierTag="7620"', '')
    const findings = pv(xml)
    expect(has(findings, 'ST-001')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ST-001')?.severity).toBe('error')
  })
  test('strategyIdentifierTag=0 (not positive) triggers ST-001', () => {
    const xml = BASE.replace('strategyIdentifierTag="7620"', 'strategyIdentifierTag="0"')
    expect(has(pv(xml), 'ST-001')).toBe(true)
  })
  test('valid strategyIdentifierTag does not trigger ST-001', () => {
    expect(has(pv(BASE), 'ST-001')).toBe(false)
  })
})

// ── ST-002 ────────────────────────────────────────────────────────────────────

describe('ST-002', () => {
  testedRuleIds.add('ST-002')
  test('no Strategy children triggers ST-002 error', () => {
    const xml = BASE.replace(/<Strategy[\s\S]*<\/Strategy>/m, '')
    const findings = pv(xml)
    expect(has(findings, 'ST-002')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ST-002')?.severity).toBe('error')
  })
  test('at least one Strategy does not trigger ST-002', () => {
    expect(has(pv(BASE), 'ST-002')).toBe(false)
  })
})

// ── ST-003 ────────────────────────────────────────────────────────────────────

describe('ST-003', () => {
  testedRuleIds.add('ST-003')
  test('parameter without fixTag when tag957Support=false triggers ST-003', () => {
    const xml = BASE.replace(' fixTag="7001"', '')
    const findings = pv(xml)
    expect(has(findings, 'ST-003')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ST-003')?.severity).toBe('error')
  })
  test('parameter without fixTag when tag957Support=true does not trigger ST-003', () => {
    const xml = BASE
      .replace('strategyIdentifierTag="7620"', 'strategyIdentifierTag="7620" tag957Support="true"')
      .replace(' fixTag="7001"', '')
    expect(has(pv(xml), 'ST-003')).toBe(false)
  })
  test('all parameters have fixTag (default tag957Support=false) does not trigger ST-003', () => {
    expect(has(pv(BASE), 'ST-003')).toBe(false)
  })
})

// ── ST-004 ────────────────────────────────────────────────────────────────────

describe('ST-004', () => {
  testedRuleIds.add('ST-004')
  test('version on strategy but no versionIdentifierTag triggers ST-004 warning', () => {
    const xml = BASE.replace(' versionIdentifierTag="7621"', '')
    const findings = pv(xml)
    expect(has(findings, 'ST-004')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ST-004')?.severity).toBe('warning')
  })
  test('versionIdentifierTag present does not trigger ST-004', () => {
    expect(has(pv(BASE), 'ST-004')).toBe(false)
  })
  test('no version on any strategy and no versionIdentifierTag does not trigger ST-004', () => {
    const xml = BASE
      .replace(' versionIdentifierTag="7621"', '')
      .replace(' version="1"', '')
    expect(has(pv(xml), 'ST-004')).toBe(false)
  })
})

// ── ST-005 ────────────────────────────────────────────────────────────────────

describe('ST-005', () => {
  testedRuleIds.add('ST-005')
  test('duplicate wireValue across strategies triggers ST-005 warning', () => {
    const xml = BASE.replace(
      '</Strategies>',
      `<Strategy name="S2" wireValue="s1" version="1" uiRep="S Two" fixMsgType="D">
        <Parameter name="P2" xsi:type="Int_t" fixTag="7002" use="optional"/>
       </Strategy></Strategies>`
    )
    const findings = pv(xml)
    expect(has(findings, 'ST-005')).toBe(true)
    expect(findings.find(f => f.ruleId === 'ST-005')?.severity).toBe('warning')
  })
  test('unique wireValues do not trigger ST-005', () => {
    expect(has(pv(BASE), 'ST-005')).toBe(false)
  })
})

// ── SG-001 ────────────────────────────────────────────────────────────────────

describe('SG-001', () => {
  testedRuleIds.add('SG-001')
  test('duplicate strategy name triggers SG-001 error', () => {
    const xml = BASE.replace(
      '</Strategies>',
      `<Strategy name="S1" wireValue="s2" version="2" uiRep="Dup" fixMsgType="D">
        <Parameter name="P2" xsi:type="Int_t" fixTag="7002" use="optional"/>
       </Strategy></Strategies>`
    )
    expect(has(pv(xml), 'SG-001')).toBe(true)
  })
  test('name starting with digit triggers SG-001', () => {
    const xml = BASE.replace('name="S1"', 'name="1BadName"')
    expect(has(pv(xml), 'SG-001')).toBe(true)
  })
  test('valid unique name does not trigger SG-001', () => {
    expect(has(pv(BASE), 'SG-001')).toBe(false)
  })
})

// ── SG-002 ────────────────────────────────────────────────────────────────────

describe('SG-002', () => {
  testedRuleIds.add('SG-002')
  test('missing wireValue triggers SG-002 error', () => {
    const xml = BASE.replace(' wireValue="s1"', '')
    expect(has(pv(xml), 'SG-002')).toBe(true)
  })
  test('wireValue present does not trigger SG-002', () => {
    expect(has(pv(BASE), 'SG-002')).toBe(false)
  })
})

// ── SG-003 ────────────────────────────────────────────────────────────────────

describe('SG-003', () => {
  testedRuleIds.add('SG-003')
  test('missing version triggers SG-003 error', () => {
    const xml = BASE.replace(' version="1"', '')
    const findings = pv(xml)
    expect(has(findings, 'SG-003')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-003')?.severity).toBe('error')
  })
  test('version present does not trigger SG-003', () => {
    expect(has(pv(BASE), 'SG-003')).toBe(false)
  })
})

// ── SG-004 ────────────────────────────────────────────────────────────────────

describe('SG-004', () => {
  testedRuleIds.add('SG-004')
  test('missing uiRep triggers SG-004 info', () => {
    const xml = BASE.replace(' uiRep="S One"', '')
    const findings = pv(xml)
    expect(has(findings, 'SG-004')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-004')?.severity).toBe('info')
  })
  test('uiRep present does not trigger SG-004', () => {
    expect(has(pv(BASE), 'SG-004')).toBe(false)
  })
})

// ── SG-005 ────────────────────────────────────────────────────────────────────

describe('SG-005', () => {
  testedRuleIds.add('SG-005')
  test('invalid fixMsgType triggers SG-005 error', () => {
    const xml = BASE.replace('fixMsgType="D"', 'fixMsgType="X"')
    const findings = pv(xml)
    expect(has(findings, 'SG-005')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-005')?.severity).toBe('error')
  })
  test('valid fixMsgType D does not trigger SG-005', () => {
    expect(has(pv(BASE), 'SG-005')).toBe(false)
  })
  test('fixMsgType absent does not trigger SG-005', () => {
    const xml = BASE.replace(' fixMsgType="D"', '')
    expect(has(pv(xml), 'SG-005')).toBe(false)
  })
})

// ── SG-006 ────────────────────────────────────────────────────────────────────

describe('SG-006', () => {
  testedRuleIds.add('SG-006')
  test('fixMsgType="E" without RepeatingGroup triggers SG-006 warning', () => {
    const xml = BASE.replace('fixMsgType="D"', 'fixMsgType="E"')
    const findings = pv(xml)
    expect(has(findings, 'SG-006')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-006')?.severity).toBe('warning')
  })
  test('fixMsgType="D" with RepeatingGroup triggers SG-006 warning', () => {
    const xml = BASE.replace(
      '<Parameter name="P1"',
      '<RepeatingGroup fixTag="555" minSize="0"/><Parameter name="P1"'
    )
    const findings = pv(xml)
    expect(has(findings, 'SG-006')).toBe(true)
  })
  test('fixMsgType="D" without RepeatingGroup does not trigger SG-006', () => {
    expect(has(pv(BASE), 'SG-006')).toBe(false)
  })
})

// ── SG-007 ────────────────────────────────────────────────────────────────────

describe('SG-007', () => {
  testedRuleIds.add('SG-007')
  const xmlWithBadRegion = BASE.replace(
    '<Parameter',
    `<Regions>
       <Region name="InvalidContinent" inclusion="Include"/>
     </Regions>
     <Parameter`
  )
  const xmlWithBadCountry = BASE.replace(
    '<Parameter',
    `<Regions>
       <Region name="TheAmericas" inclusion="Include">
         <Country CountryCode="usa" inclusion="Include"/>
       </Region>
     </Regions>
     <Parameter`
  )

  test('unrecognized region name triggers SG-007 error', () => {
    const findings = pv(xmlWithBadRegion)
    expect(has(findings, 'SG-007')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-007')?.severity).toBe('error')
  })
  test('invalid country code (lowercase) triggers SG-007 error', () => {
    expect(has(pv(xmlWithBadCountry), 'SG-007')).toBe(true)
  })
  test('valid region and country does not trigger SG-007', () => {
    const xml = BASE.replace(
      '<Parameter',
      `<Regions>
         <Region name="TheAmericas" inclusion="Include">
           <Country CountryCode="US" inclusion="Include"/>
         </Region>
       </Regions>
       <Parameter`
    )
    expect(has(pv(xml), 'SG-007')).toBe(false)
  })
})

// ── SG-008 ────────────────────────────────────────────────────────────────────

describe('SG-008', () => {
  testedRuleIds.add('SG-008')
  test('same region with both Include and Exclude triggers SG-008 warning', () => {
    const xml = BASE.replace(
      '<Parameter',
      `<Regions>
         <Region name="TheAmericas" inclusion="Include"/>
         <Region name="TheAmericas" inclusion="Exclude"/>
       </Regions>
       <Parameter`
    )
    const findings = pv(xml)
    expect(has(findings, 'SG-008')).toBe(true)
    expect(findings.find(f => f.ruleId === 'SG-008')?.severity).toBe('warning')
  })
  test('distinct regions (no overlap) does not trigger SG-008', () => {
    const xml = BASE.replace(
      '<Parameter',
      `<Regions>
         <Region name="TheAmericas" inclusion="Include"/>
         <Region name="AsiaPacificJapan" inclusion="Exclude"/>
       </Regions>
       <Parameter`
    )
    expect(has(pv(xml), 'SG-008')).toBe(false)
  })
  test('no regions does not trigger SG-008', () => {
    expect(has(pv(BASE), 'SG-008')).toBe(false)
  })
})

// ── meta: all rule IDs covered ────────────────────────────────────────────────

describe('meta', () => {
  const ALL_RULES = [
    'WF-001', 'WF-002', 'WF-003', 'WF-004',
    'NS-001', 'NS-002', 'NS-003', 'NS-004', 'NS-005', 'NS-006', 'NS-007',
    'ST-001', 'ST-002', 'ST-003', 'ST-004', 'ST-005',
    'SG-001', 'SG-002', 'SG-003', 'SG-004', 'SG-005', 'SG-006', 'SG-007', 'SG-008',
  ]
  test('every rule ID in this group has at least one test', () => {
    for (const id of ALL_RULES) {
      expect(testedRuleIds.has(id), `Missing test for rule ${id}`).toBe(true)
    }
  })
})
