import sampleXml from '../data/SampleStrategiesFor-v1_1.xml?raw'
import { parseAtdlDocument } from './parser'
import { buildLineIndex } from './lineIndex'

// ── version detection ─────────────────────────────────────────────────────────

const wrap = (ns: string) => `<Strategies xmlns="${ns}"></Strategies>`

describe('version detection', () => {
  test('1.1 namespace → version 1.1, no findings', () => {
    const doc = parseAtdlDocument(wrap('http://www.fixprotocol.org/FIXatdl-1-1/Core'))
    expect(doc.version).toBe('1.1')
    expect(doc.findings).toHaveLength(0)
  })

  test('1.2 namespace → version 1.2, info NS-006', () => {
    const doc = parseAtdlDocument(wrap('http://www.fixprotocol.org/FIXatdl-1-2/Core'))
    expect(doc.version).toBe('1.2')
    const f = doc.findings.find(f => f.ruleId === 'NS-006')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('1.0 namespace → version 1.0, info NS-005', () => {
    const doc = parseAtdlDocument(wrap('http://www.fixprotocol.org/FIXatdl-1-0/Core'))
    expect(doc.version).toBe('1.0')
    const f = doc.findings.find(f => f.ruleId === 'NS-005')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('unknown namespace → version unknown, error NS-002', () => {
    const doc = parseAtdlDocument(wrap('http://example.com/Unknown'))
    expect(doc.version).toBe('unknown')
    const f = doc.findings.find(f => f.ruleId === 'NS-002')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('error')
  })
})

// ── well-formedness ───────────────────────────────────────────────────────────

describe('WF-001 malformed XML', () => {
  test('unclosed tag → WF-001 error finding, empty strategies', () => {
    const doc = parseAtdlDocument('<Strategies><unclosed>')
    const f = doc.findings.find(f => f.ruleId === 'WF-001')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('error')
    expect(doc.strategies).toHaveLength(0)
    expect(doc.version).toBe('unknown')
  })
})

// ── sample 1.1 golden parse ───────────────────────────────────────────────────

describe('sample 1.1 strategies', () => {
  let doc: ReturnType<typeof parseAtdlDocument>
  beforeAll(() => { doc = parseAtdlDocument(sampleXml) })

  test('version is 1.1', () => { expect(doc.version).toBe('1.1') })

  test('no error findings', () => {
    const errors = doc.findings.filter(f => f.severity === 'error')
    expect(errors).toHaveLength(0)
  })

  test('two strategies', () => { expect(doc.strategies).toHaveLength(2) })

  test('root attributes: strategyIdentifierTag and versionIdentifierTag', () => {
    expect(doc.strategyIdentifierTag).toBe(7620)
    expect(doc.versionIdentifierTag).toBe(7621)
  })

  test('Tazer1: name, wireValue, fixMsgType', () => {
    const t = doc.strategies[0]
    expect(t.name).toBe('Tazer1')
    expect(t.wireValue).toBe('Tazer')
    expect(t.fixMsgType).toBe('D')
  })

  test('Tazer1: 6 parameters', () => {
    expect(doc.strategies[0].parameters).toHaveLength(6)
  })

  test('Tazer1: SweepDistribution has 2 EnumPairs', () => {
    const p = doc.strategies[0].parameters.find(p => p.name === 'SweepDistribution')
    expect(p).toBeDefined()
    expect(p?.enumPairs).toHaveLength(2)
    expect(p?.enumPairs[0].enumID).toBe('e_Uniform')
    expect(p?.enumPairs[0].wireValue).toBe('U')
  })

  test('Tazer1: parameter descriptions parsed', () => {
    const start = doc.strategies[0].parameters.find(p => p.name === 'StartTime')
    expect(start?.description).toBe('Strategy Start Time')
  })

  test('Tazer1: 3 StrategyEdits', () => {
    expect(doc.strategies[0].strategyEdits).toHaveLength(3)
  })

  test('Tazer1: first StrategyEdit errorMsg', () => {
    const se = doc.strategies[0].strategyEdits[0]
    expect(se.errorMsg).toBe('End Time should be later than Start Time')
  })

  test('Tazer1: first StrategyEdit condition is compare node', () => {
    const cond = doc.strategies[0].strategyEdits[0].condition
    expect(cond.kind).toBe('compare')
    if (cond.kind === 'compare') {
      expect(cond.field).toBe('EndTime')
      expect(cond.op).toBe('GT')
      expect(cond.field2).toBe('StartTime')
    }
  })

  test('Tazer1: second StrategyEdit condition is OR logic node', () => {
    const cond = doc.strategies[0].strategyEdits[1].condition
    expect(cond.kind).toBe('logic')
    if (cond.kind === 'logic') expect(cond.op).toBe('OR')
  })

  test('Tazer1: layout present with 1 top-level panel', () => {
    expect(doc.strategies[0].layout?.panels).toHaveLength(1)
  })

  test('Tazer1: DisplayQuantity control has stateRules', () => {
    const topPanel = doc.strategies[0].layout!.panels[0]
    expect(topPanel.kind).toBe('panel')
    // top panel → first child panel → DisplayQuantity control
    const innerPanel = topPanel.children[0]
    expect(innerPanel.kind).toBe('panel')
    if (innerPanel.kind === 'panel') {
      const dqControl = innerPanel.children.find(
        c => c.kind === 'control' && c.id === 'DisplayQuantity'
      )
      expect(dqControl).toBeDefined()
      if (dqControl?.kind === 'control') {
        expect(dqControl.stateRules.length).toBeGreaterThanOrEqual(3)
      }
    }
  })

  test('Tazer1: regions and markets parsed', () => {
    const t = doc.strategies[0]
    expect(t.regions?.regions[0].name).toBe('TheAmericas')
    expect(t.markets?.[0].micCode).toBe('XNAS')
    expect(t.securityTypes?.[0].name).toBe('CS')
  })

  test('OPLX: name and wireValue', () => {
    const o = doc.strategies[1]
    expect(o.name).toBe('OPLX')
    expect(o.wireValue).toBe('60')
  })

  test('OPLX: 5 parameters', () => {
    expect(doc.strategies[1].parameters).toHaveLength(5)
  })
})

// ── ED-001 dangling parameterRef ──────────────────────────────────────────────

describe('ED-001 dangling parameterRef', () => {
  test('control refs unknown parameter → ED-001 error', () => {
    const xml = `
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"
            xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Strategy name="S1" wireValue="s1">
    <Parameter name="Qty" xsi:type="Int_t" use="optional"/>
    <lay:StrategyLayout>
      <lay:StrategyPanel collapsible="false">
        <lay:Control ID="c1" xsi:type="lay:TextField_t" parameterRef="DoesNotExist"/>
      </lay:StrategyPanel>
    </lay:StrategyLayout>
  </Strategy>
</Strategies>`.trim()

    const doc = parseAtdlDocument(xml)
    const f = doc.findings.find(f => f.ruleId === 'ED-001')
    expect(f).toBeDefined()
    expect(f?.severity).toBe('error')
    expect(f?.message).toContain('DoesNotExist')
  })

  test('valid parameterRef → no ED-001', () => {
    const xml = `
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"
            xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Strategy name="S1" wireValue="s1">
    <Parameter name="Qty" xsi:type="Int_t" use="optional"/>
    <lay:StrategyLayout>
      <lay:StrategyPanel collapsible="false">
        <lay:Control ID="c1" xsi:type="lay:TextField_t" parameterRef="Qty"/>
      </lay:StrategyPanel>
    </lay:StrategyLayout>
  </Strategy>
</Strategies>`.trim()

    const doc = parseAtdlDocument(xml)
    const errors = doc.findings.filter(f => f.severity === 'error')
    expect(errors).toHaveLength(0)
  })
})

// ── LineIndex ─────────────────────────────────────────────────────────────────

describe('LineIndex', () => {
  test('root <Strategies> element is on line 13 in sample file', () => {
    const xmlDoc = new DOMParser().parseFromString(sampleXml, 'application/xml')
    const idx = buildLineIndex(sampleXml, xmlDoc)
    expect(idx.getLine(xmlDoc.documentElement)).toBe(13)
  })

  test('returns undefined for an element not in the document', () => {
    const xmlDoc = new DOMParser().parseFromString(sampleXml, 'application/xml')
    const idx = buildLineIndex(sampleXml, xmlDoc)
    const foreign = new DOMParser()
      .parseFromString('<x/>', 'application/xml').documentElement
    expect(idx.getLine(foreign)).toBeUndefined()
  })

  test('parseerror document returns stub index', () => {
    const xmlDoc = new DOMParser().parseFromString('<unclosed>', 'application/xml')
    const idx = buildLineIndex('<unclosed>', xmlDoc)
    // parseerror doc: getLine should return undefined without throwing
    expect(() => idx.getLine(xmlDoc.documentElement)).not.toThrow()
  })
})
