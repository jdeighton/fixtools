import { describe, it, expect } from 'vitest'
import { parseAtdlDocument } from './parser'

const wrap = (body: string) =>
  `<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Strategy name="Test" wireValue="t">
      <StrategyLayout>${body}</StrategyLayout>
    </Strategy>
  </Strategies>`

describe('grid attribute extraction', () => {
  it('parses grid attributes on a Control', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel>
        <Control ID="C1" xsi:type="TextField_t" row="2" col="3" rowSpan="1" colSpan="2"/>
      </StrategyPanel>`
    ))
    const ctrl = doc.strategies[0]?.layout?.panels[0]?.children?.[0]
    expect(ctrl?.kind).toBe('control')
    expect(ctrl?.grid).toEqual({ row: 2, col: 3, rowSpan: 1, colSpan: 2 })
  })

  it('parses grid attributes on a Control using the column alias', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel>
        <Control ID="C2" xsi:type="TextField_t" row="1" column="5"/>
      </StrategyPanel>`
    ))
    const ctrl = doc.strategies[0]?.layout?.panels[0]?.children?.[0]
    expect(ctrl?.kind).toBe('control')
    expect(ctrl?.grid).toEqual({ row: 1, col: 5 })
  })

  it('omits grid when no grid attributes are present', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel>
        <Control ID="C3" xsi:type="TextField_t"/>
      </StrategyPanel>`
    ))
    const ctrl = doc.strategies[0]?.layout?.panels[0]?.children?.[0]
    expect(ctrl?.grid).toBeUndefined()
  })

  it('parses grid attributes on a StrategyPanel', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel row="4" col="1" colSpan="3">
        <Control ID="Inner" xsi:type="TextField_t"/>
      </StrategyPanel>`
    ))
    const panel = doc.strategies[0]?.layout?.panels[0]
    expect(panel?.kind).toBe('panel')
    expect(panel?.grid).toEqual({ row: 4, col: 1, colSpan: 3 })
  })

  it('parses grid attributes on a nested StrategyPanel with column alias', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel row="0" column="0">
        <Control ID="Inner" xsi:type="TextField_t" row="1" col="1"/>
      </StrategyPanel>`
    ))
    const panel = doc.strategies[0]?.layout?.panels[0]
    expect(panel?.kind).toBe('panel')
    expect(panel?.grid).toEqual({ row: 0, col: 0 })
    const inner = panel?.children?.[0]
    expect(inner?.grid).toEqual({ row: 1, col: 1 })
  })

  it('parses partial grid attributes (only row and colSpan)', () => {
    const doc = parseAtdlDocument(wrap(
      `<StrategyPanel>
        <Control ID="C4" xsi:type="TextField_t" row="10" colSpan="4"/>
      </StrategyPanel>`
    ))
    const ctrl = doc.strategies[0]?.layout?.panels[0]?.children?.[0]
    expect(ctrl?.grid).toEqual({ row: 10, colSpan: 4 })
  })
})
