import { describe, test, expect } from 'vitest'
import { parseAtdlDocument } from '../parse'
import type {
  AtdlDocument, Strategy, Control, ControlType, StrategyPanel, Finding,
} from '../model'
import { checkLY } from './rules/ly'
import { validateDocument } from './engine'

// ── Fixtures ───────────────────────────────────────────────────────────────────

const NS_12_CORE = 'http://www.fixprotocol.org/FIXatdl-1-2/Core'
const NS_XSI     = 'http://www.w3.org/2001/XMLSchema-instance'

function makeControl(overrides: Partial<Control> & { id: string; xsiType: ControlType }): Control {
  return { kind: 'control', listItems: [], stateRules: [], ...overrides }
}

function makeGridPanel(
  children: Array<StrategyPanel | Control>,
  numCols?: number,
  numRows?: number,
): StrategyPanel {
  return {
    kind: 'panel', collapsed: false, collapsible: false,
    orientation: 'GRID',
    ...(numCols != null ? { numCols } : {}),
    ...(numRows != null ? { numRows } : {}),
    children,
  }
}

function makeFlowPanel(
  children: Array<StrategyPanel | Control>,
  orientation: 'VERTICAL' | 'HORIZONTAL' = 'VERTICAL',
): StrategyPanel {
  return { kind: 'panel', collapsed: false, collapsible: false, orientation, children }
}

function makeStrategy12(overrides: Partial<Strategy> & { name: string }): Strategy {
  return {
    wireValue: overrides.name, parameters: [], strategyEdits: [], localEdits: [], ...overrides,
  }
}

function makeDoc12(strategies: Strategy[], extra: Partial<AtdlDocument> = {}): AtdlDocument {
  return {
    version: '1.2', namespaces: {}, strategies, tag957Support: false,
    globalEdits: [], findings: [],
    sourceLineIndex: { getLine: () => undefined }, sourceXml: '',
    ...extra,
  }
}

function has(findings: Finding[], id: string): boolean {
  return findings.some(f => f.ruleId === id)
}

// ── Parser round-trip: Control.grid ──────────────────────────────────────────

describe('Parser: 1.2 grid attributes', () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}"
            xmlns:xsi="${NS_XSI}"
            strategyIdentifierTag="7000" versionIdentifierTag="7001"
            tag957Support="false">
  <Strategy name="GridTest" wireValue="GT">
    <StrategyLayout>
      <StrategyPanel orientation="GRID" numCols="3" numRows="2">
        <Control xsi:type="TextField_t" ID="c1" parameterRef="P1" row="1" col="1" colSpan="2" />
        <Control xsi:type="TextField_t" ID="c2" parameterRef="P1" row="2" col="3" />
      </StrategyPanel>
    </StrategyLayout>
    <Parameter xsi:type="String_t" name="P1" fixTag="7002" use="optional" />
  </Strategy>
</Strategies>`

  let doc: ReturnType<typeof parseAtdlDocument>
  beforeAll(() => { doc = parseAtdlDocument(xml) })

  test('parses version as 1.2', () => {
    expect(doc.version).toBe('1.2')
  })

  test('panel orientation parsed as GRID', () => {
    const panel = doc.strategies[0].layout!.panels[0]
    expect(panel.orientation).toBe('GRID')
    expect(panel.numCols).toBe(3)
    expect(panel.numRows).toBe(2)
  })

  test('Control.grid.col and colSpan parsed', () => {
    const panel = doc.strategies[0].layout!.panels[0]
    const c1 = panel.children[0] as Control
    expect(c1.id).toBe('c1')
    expect(c1.grid?.col).toBe(1)
    expect(c1.grid?.colSpan).toBe(2)
    expect(c1.grid?.row).toBe(1)
  })

  test('Control without span only has row/col', () => {
    const panel = doc.strategies[0].layout!.panels[0]
    const c2 = panel.children[1] as Control
    expect(c2.grid?.col).toBe(3)
    expect(c2.grid?.row).toBe(2)
    expect(c2.grid?.colSpan).toBeUndefined()
  })
})

// ── NS-007: unrecognized 1.2 attribute ────────────────────────────────────────

describe('NS-007: unrecognized 1.2 attribute', () => {
  test('Strategy with objective= in 1.2 doc → NS-007 info finding', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}" xmlns:xsi="${NS_XSI}" tag957Support="false">
  <Strategy name="S" wireValue="S" objective="PAIRS">
    <StrategyLayout>
      <StrategyPanel orientation="VERTICAL">
      </StrategyPanel>
    </StrategyLayout>
  </Strategy>
</Strategies>`
    const doc = parseAtdlDocument(xml)
    const f = doc.findings.find(f => f.ruleId === 'NS-007' && f.message.includes('objective'))
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
  })

  test('Strategy with legAreSeverable in 1.2 doc → NS-007', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}" xmlns:xsi="${NS_XSI}" tag957Support="false">
  <Strategy name="S" wireValue="S" legAreSeverable="true">
    <StrategyLayout><StrategyPanel orientation="VERTICAL"></StrategyPanel></StrategyLayout>
  </Strategy>
</Strategies>`
    const doc = parseAtdlDocument(xml)
    expect(doc.findings.some(f => f.ruleId === 'NS-007')).toBe(true)
  })

  test('Strategy with VendorConfig child → NS-007', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}" xmlns:xsi="${NS_XSI}" tag957Support="false">
  <Strategy name="S" wireValue="S">
    <VendorConfig legParameters="true" />
    <StrategyLayout><StrategyPanel orientation="VERTICAL"></StrategyPanel></StrategyLayout>
  </Strategy>
</Strategies>`
    const doc = parseAtdlDocument(xml)
    expect(doc.findings.some(f => f.ruleId === 'NS-007' && f.message.includes('VendorConfig'))).toBe(true)
  })

  test('Filter registry at root → NS-007', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}" xmlns:xsi="${NS_XSI}" tag957Support="false">
  <Filter id="EU_EQ" />
  <Strategy name="S" wireValue="S">
    <StrategyLayout><StrategyPanel orientation="VERTICAL"></StrategyPanel></StrategyLayout>
  </Strategy>
</Strategies>`
    const doc = parseAtdlDocument(xml)
    expect(doc.findings.some(f => f.ruleId === 'NS-007' && f.message.includes('Filter'))).toBe(true)
  })

  test('1.1 document with unrecognised attr does NOT produce NS-007', () => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"
            xmlns:xsi="${NS_XSI}" tag957Support="false">
  <Strategy name="S" wireValue="S" objective="PAIRS">
    <StrategyLayout><StrategyPanel orientation="VERTICAL"></StrategyPanel></StrategyLayout>
  </Strategy>
</Strategies>`
    const doc = parseAtdlDocument(xml)
    expect(doc.findings.some(f => f.ruleId === 'NS-007')).toBe(false)
  })
})

// ── LY-090: GRID orientation panel ────────────────────────────────────────────

describe('LY-090: GRID orientation', () => {
  test('GRID orientation panel in 1.2 doc → LY-090 info', () => {
    const panel = makeGridPanel([], 3)
    const doc = makeDoc12([makeStrategy12({ name: 'S', layout: { panels: [panel] } })])
    const findings = checkLY(doc)
    expect(has(findings, 'LY-090')).toBe(true)
    expect(findings.find(f => f.ruleId === 'LY-090')?.severity).toBe('info')
  })

  test('GRID orientation with children that have grid attrs → LY-090 info', () => {
    const ctrl = makeControl({ id: 'c1', xsiType: 'TextField_t', grid: { col: 1, row: 1 } })
    const panel = makeGridPanel([ctrl], 3)
    const doc = makeDoc12([makeStrategy12({ name: 'S', layout: { panels: [panel] } })])
    const findings = checkLY(doc)
    expect(has(findings, 'LY-090')).toBe(true)
  })

  test('GRID orientation panel in 1.1 doc does NOT trigger LY-090 for orientation', () => {
    // Existing panel.grid test still covered separately; this checks GRID orientation in 1.1
    const panel = makeGridPanel([], 3)
    const doc: AtdlDocument = {
      version: '1.1', namespaces: {}, strategies: [makeStrategy12({ name: 'S', layout: { panels: [panel] } })],
      tag957Support: false, globalEdits: [], findings: [],
      sourceLineIndex: { getLine: () => undefined }, sourceXml: '',
    }
    const findings = checkLY(doc)
    // LY-090 should not fire for 1.1 with GRID orientation
    expect(has(findings, 'LY-090')).toBe(false)
  })
})

// ── LY-090: control grid attrs in non-GRID parent (unsupported, flow fallback) ──

describe('LY-090: control grid attrs outside GRID parent', () => {
  test('control with grid attr in VERTICAL parent → LY-090 info (attrs ignored, flow fallback)', () => {
    const ctrl = makeControl({ id: 'c1', xsiType: 'TextField_t', grid: { col: 2, row: 1 } })
    const panel = makeFlowPanel([ctrl], 'VERTICAL')
    const doc = makeDoc12([makeStrategy12({ name: 'S', layout: { panels: [panel] } })])
    const findings = checkLY(doc)
    const f = findings.find(f => f.ruleId === 'LY-090' && f.message.includes('c1'))
    expect(f).toBeDefined()
    expect(f?.severity).toBe('info')
    expect(f?.message).toContain('ignored')
  })

  test('control with grid attr in GRID parent → LY-090 info (attrs applied)', () => {
    const ctrl = makeControl({ id: 'c1', xsiType: 'TextField_t', grid: { col: 2, row: 1 } })
    const panel = makeGridPanel([ctrl], 3)
    const doc = makeDoc12([makeStrategy12({ name: 'S', layout: { panels: [panel] } })])
    const findings = checkLY(doc)
    const f = findings.find(f => f.ruleId === 'LY-090' && f.message.includes('c1'))
    expect(f).toBeDefined()
    expect(f?.message).not.toContain('ignored')
  })
})

// ── Full document round-trip: 1.2 grid document validates cleanly ──────────────

describe('1.2 grid document validates with only info findings', () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Strategies xmlns="${NS_12_CORE}"
            xmlns:xsi="${NS_XSI}"
            tag957Support="false"
            strategyIdentifierTag="7000">
  <Strategy name="TWAP" wireValue="TWAP" version="1">
    <StrategyLayout>
      <StrategyPanel orientation="GRID" numCols="2">
        <Control xsi:type="SingleSpinner_t" ID="qty" parameterRef="Qty"
                 label="Qty" row="1" col="1" />
        <Control xsi:type="SingleSpinner_t" ID="rate" parameterRef="Rate"
                 label="Rate" row="1" col="2" />
      </StrategyPanel>
    </StrategyLayout>
    <Parameter xsi:type="Qty_t"        name="Qty"  fixTag="38" use="required" />
    <Parameter xsi:type="Percentage_t" name="Rate" fixTag="7001" use="optional" />
  </Strategy>
</Strategies>`

  test('no errors in 1.2 grid document', () => {
    const doc = parseAtdlDocument(xml)
    const all = validateDocument(doc)
    const errors = all.filter(f => f.severity === 'error')
    expect(errors).toHaveLength(0)
  })

  test('LY-090 fires as info for GRID orientation', () => {
    const doc = parseAtdlDocument(xml)
    const all = validateDocument(doc)
    expect(all.some(f => f.ruleId === 'LY-090' && f.severity === 'info')).toBe(true)
  })

  test('NS-006 fires as info for 1.2 version', () => {
    const doc = parseAtdlDocument(xml)
    const all = validateDocument(doc)
    expect(all.some(f => f.ruleId === 'NS-006' && f.severity === 'info')).toBe(true)
  })
})
