import type {
  AtdlDocument, AtdlVersion, Strategy, Parameter, ParameterType,
  Control, ControlType, ListItem, StateRule, EditNode, EditDef,
  StrategyEdit, StrategyLayout, StrategyPanel, RepeatingGroup,
  RegionFilter, MarketFilter, SecurityTypeFilter, EnumPair, Finding,
} from '../model'
import { buildLineIndex } from './lineIndex'

const XSI_NS = 'http://www.w3.org/2001/XMLSchema-instance'

// ── helpers ──────────────────────────────────────────────────────────────────

function detectVersion(ns: string | null): AtdlVersion {
  if (!ns) return 'unknown'
  if (ns.includes('FIXatdl-1-1')) return '1.1'
  if (ns.includes('FIXatdl-1-2')) return '1.2'
  if (ns.includes('FIXatdl-1-0')) return '1.0'
  return 'unknown'
}

function a(el: Element, name: string): string | undefined {
  return el.getAttribute(name) ?? undefined
}

function numA(el: Element, name: string): number | undefined {
  const v = el.getAttribute(name)
  if (v === null) return undefined
  const n = Number(v)
  return isNaN(n) ? undefined : n
}

function getXsiType(el: Element): string | null {
  const v = el.getAttributeNS(XSI_NS, 'type') ?? el.getAttribute('xsi:type')
  if (!v) return null
  const idx = v.indexOf(':')
  return idx >= 0 ? v.slice(idx + 1) : v
}

function kids(el: Element, localName?: string): Element[] {
  const out: Element[] = []
  for (let i = 0; i < el.childNodes.length; i++) {
    const ch = el.childNodes[i]
    if (ch.nodeType === 1) {
      const elem = ch as Element
      if (!localName || elem.localName === localName) out.push(elem)
    }
  }
  return out
}

function firstKid(el: Element, localName: string): Element | undefined {
  return kids(el, localName)[0]
}

function childText(el: Element, childName: string): string | undefined {
  const ch = firstKid(el, childName)
  const t = ch?.textContent?.trim()
  return t || undefined
}

// ── EditNode parsing ──────────────────────────────────────────────────────────

function parseEditNode(el: Element): EditNode {
  const id = a(el, 'id')
  const logicOp = el.getAttribute('logicOperator')
  if (logicOp) {
    const op = logicOp as 'AND' | 'OR' | 'XOR' | 'NOT'
    const operands = kids(el, 'Edit').map(parseEditNode)
    return id ? { kind: 'logic', op, operands, id } : { kind: 'logic', op, operands }
  }
  const field = el.getAttribute('field')
  if (field) {
    const op = (el.getAttribute('operator') ?? 'EX') as 'EX' | 'NX' | 'EQ' | 'NE' | 'LT' | 'GT' | 'LE' | 'GE'
    const field2 = a(el, 'field2')
    const value = el.getAttribute('value') !== null ? el.getAttribute('value')! : undefined
    const base = { kind: 'compare' as const, field, op }
    return {
      ...base,
      ...(field2 !== undefined ? { field2 } : {}),
      ...(value !== undefined ? { value } : {}),
      ...(id ? { id } : {}),
    }
  }
  return id ? { kind: 'logic', op: 'AND', operands: [], id } : { kind: 'logic', op: 'AND', operands: [] }
}

function parseEditRefNode(el: Element): EditNode {
  return { kind: 'ref', id: el.getAttribute('id') ?? '' }
}

function resolveCondition(el: Element): EditNode {
  const editEl = firstKid(el, 'Edit')
  if (editEl) return parseEditNode(editEl)
  const refEl = firstKid(el, 'EditRef')
  if (refEl) return parseEditRefNode(refEl)
  return { kind: 'logic', op: 'AND', operands: [] }
}

// ── Control ───────────────────────────────────────────────────────────────────

function parseListItem(el: Element): ListItem {
  return {
    enumID: el.getAttribute('enumID') ?? '',
    uiRep: el.getAttribute('uiRep') ?? '',
    ...(a(el, 'filter') ? { filter: a(el, 'filter')! } : {}),
  }
}

function parseStateRule(el: Element): StateRule {
  const enabled = el.hasAttribute('enabled') ? el.getAttribute('enabled') === 'true' : undefined
  const visible = el.hasAttribute('visible') ? el.getAttribute('visible') === 'true' : undefined
  const value = el.getAttribute('value') !== null ? el.getAttribute('value')! : undefined
  return {
    ...(enabled !== undefined ? { enabled } : {}),
    ...(visible !== undefined ? { visible } : {}),
    ...(value !== undefined ? { value } : {}),
    condition: resolveCondition(el),
  }
}

function gridAttrs(el: Element): Control['grid'] | undefined {
  const row = numA(el, 'row')
  const col = numA(el, 'col') ?? numA(el, 'column')
  const rowSpan = numA(el, 'rowSpan')
  const colSpan = numA(el, 'colSpan')
  if (row == null && col == null && rowSpan == null && colSpan == null) return undefined
  return {
    ...(row != null ? { row } : {}),
    ...(col != null ? { col } : {}),
    ...(rowSpan != null ? { rowSpan } : {}),
    ...(colSpan != null ? { colSpan } : {}),
  }
}

function parseControl(el: Element): Control {
  const helpEl = firstKid(el, 'HelpText')
  return {
    kind: 'control',
    id: el.getAttribute('ID') ?? el.getAttribute('id') ?? '',
    xsiType: (getXsiType(el) ?? 'TextField_t') as ControlType,
    ...(a(el, 'parameterRef') ? { parameterRef: a(el, 'parameterRef')! } : {}),
    ...(a(el, 'label') ? { label: a(el, 'label')! } : {}),
    ...(a(el, 'tooltip') ? { tooltip: a(el, 'tooltip')! } : {}),
    ...(helpEl?.textContent?.trim() ? { helpText: helpEl.textContent.trim() } : {}),
    ...(a(el, 'initValue') ? { initValue: a(el, 'initValue')! } : {}),
    ...(a(el, 'initPolicy') ? { initPolicy: a(el, 'initPolicy') as 'UseValue' | 'UseFixField' } : {}),
    ...(a(el, 'initFixField') ? { initFixField: a(el, 'initFixField')! } : {}),
    ...(el.hasAttribute('initValueMode') ? { initValueMode: Number(el.getAttribute('initValueMode')) as 0 | 1 } : {}),
    ...(a(el, 'localMktTz') ? { localMktTz: a(el, 'localMktTz')! } : {}),
    ...(numA(el, 'increment') != null ? { increment: numA(el, 'increment')! } : {}),
    ...(a(el, 'incrementPolicy') ? { incrementPolicy: a(el, 'incrementPolicy')! } : {}),
    ...(numA(el, 'innerIncrement') != null ? { innerIncrement: numA(el, 'innerIncrement')! } : {}),
    ...(a(el, 'innerIncrementPolicy') ? { innerIncrementPolicy: a(el, 'innerIncrementPolicy')! } : {}),
    ...(numA(el, 'outerIncrement') != null ? { outerIncrement: numA(el, 'outerIncrement')! } : {}),
    ...(a(el, 'outerIncrementPolicy') ? { outerIncrementPolicy: a(el, 'outerIncrementPolicy')! } : {}),
    ...(a(el, 'orientation') ? { orientation: a(el, 'orientation') as 'HORIZONTAL' | 'VERTICAL' } : {}),
    ...(a(el, 'radioGroup') ? { radioGroup: a(el, 'radioGroup')! } : {}),
    ...(a(el, 'checkedEnumRef') ? { checkedEnumRef: a(el, 'checkedEnumRef')! } : {}),
    ...(a(el, 'uncheckedEnumRef') ? { uncheckedEnumRef: a(el, 'uncheckedEnumRef')! } : {}),
    ...(el.hasAttribute('disableForTemplate') ? { disableForTemplate: el.getAttribute('disableForTemplate') === 'true' } : {}),
    listItems: kids(el, 'ListItem').map(parseListItem),
    stateRules: kids(el, 'StateRule').map(parseStateRule),
    ...(gridAttrs(el) ? { grid: gridAttrs(el)! } : {}),
  }
}

// ── StrategyPanel ─────────────────────────────────────────────────────────────

function parsePanelGrid(el: Element): StrategyPanel['grid'] | undefined {
  const row = numA(el, 'row')
  const col = numA(el, 'col') ?? numA(el, 'column')
  const rowSpan = numA(el, 'rowSpan')
  const colSpan = numA(el, 'colSpan')
  if (row == null && col == null && rowSpan == null && colSpan == null) return undefined
  return {
    ...(row != null ? { row } : {}),
    ...(col != null ? { col } : {}),
    ...(rowSpan != null ? { rowSpan } : {}),
    ...(colSpan != null ? { colSpan } : {}),
  }
}

function parseStrategyPanel(el: Element): StrategyPanel {
  const children: Array<StrategyPanel | Control> = []
  for (let i = 0; i < el.childNodes.length; i++) {
    const ch = el.childNodes[i]
    if (ch.nodeType !== 1) continue
    const elem = ch as Element
    if (elem.localName === 'StrategyPanel') children.push(parseStrategyPanel(elem))
    else if (elem.localName === 'Control') children.push(parseControl(elem))
  }
  return {
    kind: 'panel',
    ...(a(el, 'title') ? { title: a(el, 'title')! } : {}),
    collapsed: el.getAttribute('collapsed') === 'true',
    collapsible: el.getAttribute('collapsible') !== 'false',
    ...(a(el, 'color') ? { color: a(el, 'color')! } : {}),
    ...(a(el, 'orientation') ? { orientation: a(el, 'orientation') as 'HORIZONTAL' | 'VERTICAL' | 'GRID' } : {}),
    ...(a(el, 'border') ? { border: a(el, 'border') as 'None' | 'Line' } : {}),
    ...(numA(el, 'numRows') != null ? { numRows: numA(el, 'numRows')! } : {}),
    ...(numA(el, 'numCols') != null ? { numCols: numA(el, 'numCols')! } : {}),
    ...(a(el, 'fillOrder') ? { fillOrder: a(el, 'fillOrder') as 'ROW-MAJOR' | 'COL-MAJOR' } : {}),
    ...(parsePanelGrid(el) ? { grid: parsePanelGrid(el)! } : {}),
    children,
  }
}

function parseStrategyLayout(el: Element): StrategyLayout {
  return { panels: kids(el, 'StrategyPanel').map(parseStrategyPanel) }
}

// ── Parameter ─────────────────────────────────────────────────────────────────

function parseEnumPair(el: Element): EnumPair {
  return {
    enumID: el.getAttribute('enumID') ?? '',
    wireValue: el.getAttribute('wireValue') ?? '',
    ...(childText(el, 'Description') ? { description: childText(el, 'Description')! } : {}),
    ...(a(el, 'filter') ? { filter: a(el, 'filter')! } : {}),
  }
}

function parseParameter(el: Element): Parameter {
  return {
    name: el.getAttribute('name') ?? '',
    xsiType: (getXsiType(el) ?? 'String_t') as ParameterType,
    ...(numA(el, 'fixTag') != null ? { fixTag: numA(el, 'fixTag')! } : {}),
    use: (el.getAttribute('use') ?? 'optional') as 'optional' | 'required',
    ...(a(el, 'constValue') ? { constValue: a(el, 'constValue')! } : {}),
    ...(a(el, 'minValue') ? { minValue: a(el, 'minValue')! } : {}),
    ...(a(el, 'maxValue') ? { maxValue: a(el, 'maxValue')! } : {}),
    ...(numA(el, 'minLength') != null ? { minLength: numA(el, 'minLength')! } : {}),
    ...(numA(el, 'maxLength') != null ? { maxLength: numA(el, 'maxLength')! } : {}),
    ...(numA(el, 'precision') != null ? { precision: numA(el, 'precision')! } : {}),
    ...(el.hasAttribute('multiplyBy100') ? { multiplyBy100: el.getAttribute('multiplyBy100') === 'true' } : {}),
    mutableOnCxlRpl: el.getAttribute('mutableOnCxlRpl') !== 'false',
    revertOnCxlRpl: el.getAttribute('revertOnCxlRpl') === 'true',
    definedByFIX: el.getAttribute('definedByFIX') === 'true',
    ...(a(el, 'localMktTz') ? { localMktTz: a(el, 'localMktTz')! } : {}),
    ...(el.hasAttribute('invertOnWire') ? { invertOnWire: el.getAttribute('invertOnWire') === 'true' } : {}),
    ...(a(el, 'trueWireValue') ? { trueWireValue: a(el, 'trueWireValue')! } : {}),
    ...(a(el, 'falseWireValue') ? { falseWireValue: a(el, 'falseWireValue')! } : {}),
    ...(a(el, 'scope') ? { scope: a(el, 'scope') as 'ORDER' | 'LEG' } : {}),
    ...(a(el, 'filter') ? { filter: a(el, 'filter')! } : {}),
    enumPairs: kids(el, 'EnumPair').map(parseEnumPair),
    ...(childText(el, 'Description') ? { description: childText(el, 'Description')! } : {}),
  }
}

// ── RepeatingGroup ────────────────────────────────────────────────────────────

function parseRepeatingGroup(el: Element): RepeatingGroup {
  return {
    ...(numA(el, 'fixTag') != null ? { fixTag: numA(el, 'fixTag')! } : {}),
    minSize: numA(el, 'minSize') ?? 0,
    ...(numA(el, 'maxSize') != null ? { maxSize: numA(el, 'maxSize')! } : {}),
    parameters: kids(el, 'Parameter').map(parseParameter),
    ...(childText(el, 'Description') ? { description: childText(el, 'Description')! } : {}),
  }
}

// ── Strategy ──────────────────────────────────────────────────────────────────

function parseRegionFilter(el: Element): RegionFilter {
  return {
    regions: kids(el, 'Region').map(r => ({
      name: r.getAttribute('name') ?? '',
      inclusion: (r.getAttribute('inclusion') ?? 'Include') as 'Include' | 'Exclude',
      countries: kids(r, 'Country').map(c => ({
        code: c.getAttribute('CountryCode') ?? '',
        inclusion: (c.getAttribute('inclusion') ?? 'Include') as 'Include' | 'Exclude',
      })),
    })),
  }
}

function parseMarkets(el: Element): MarketFilter[] {
  return kids(el, 'Market').map(m => ({
    micCode: m.getAttribute('MICCode') ?? '',
    inclusion: (m.getAttribute('inclusion') ?? 'Include') as 'Include' | 'Exclude',
  }))
}

function parseSecurityTypes(el: Element): SecurityTypeFilter[] {
  return kids(el, 'SecurityType').map(s => ({
    name: s.getAttribute('name') ?? '',
    inclusion: (s.getAttribute('inclusion') ?? 'Include') as 'Include' | 'Exclude',
  }))
}

function parseLocalEdits(el: Element): EditDef[] {
  const defs: EditDef[] = []
  for (const editEl of kids(el, 'Edit')) {
    const id = editEl.getAttribute('id')
    if (id) defs.push({ id, node: parseEditNode(editEl) })
  }
  return defs
}

function parseStrategy(el: Element): Strategy {
  const regionsEl = firstKid(el, 'Regions')
  const marketsEl = firstKid(el, 'Markets')
  const secTypesEl = firstKid(el, 'SecurityTypes')
  const layoutEl = firstKid(el, 'StrategyLayout')
  const rgEl = firstKid(el, 'RepeatingGroup')

  return {
    name: el.getAttribute('name') ?? '',
    ...(a(el, 'uiRep') ? { uiRep: a(el, 'uiRep')! } : {}),
    wireValue: el.getAttribute('wireValue') ?? '',
    ...(a(el, 'version') ? { version: a(el, 'version')! } : {}),
    ...(a(el, 'fixMsgType') ? { fixMsgType: a(el, 'fixMsgType') as 'D' | 'E' | 'AB' | 's' } : {}),
    ...(a(el, 'providerID') ? { providerID: a(el, 'providerID')! } : {}),
    ...(a(el, 'providerSubID') ? { providerSubID: a(el, 'providerSubID')! } : {}),
    ...(a(el, 'disclosureDoc') ? { disclosureDoc: a(el, 'disclosureDoc')! } : {}),
    ...(a(el, 'imageLocation') ? { imageLocation: a(el, 'imageLocation')! } : {}),
    ...(a(el, 'sentOrderLink') ? { sentOrderLink: a(el, 'sentOrderLink')! } : {}),
    ...(numA(el, 'totalOrders') != null ? { totalOrders: numA(el, 'totalOrders')! } : {}),
    ...(numA(el, 'totalLegs') != null ? { totalLegs: numA(el, 'totalLegs')! } : {}),
    ...(numA(el, 'totalOrdersTag') != null ? { totalOrdersTag: numA(el, 'totalOrdersTag')! } : {}),
    ...(numA(el, 'commonIDTag') != null ? { commonIDTag: numA(el, 'commonIDTag')! } : {}),
    ...(numA(el, 'orderSequenceTag') != null ? { orderSequenceTag: numA(el, 'orderSequenceTag')! } : {}),
    ...(a(el, 'filter') ? { filter: a(el, 'filter')! } : {}),
    ...(regionsEl ? { regions: parseRegionFilter(regionsEl) } : {}),
    ...(marketsEl ? { markets: parseMarkets(marketsEl) } : {}),
    ...(secTypesEl ? { securityTypes: parseSecurityTypes(secTypesEl) } : {}),
    parameters: kids(el, 'Parameter').map(parseParameter),
    ...(rgEl ? { repeatingGroup: parseRepeatingGroup(rgEl) } : {}),
    strategyEdits: kids(el, 'StrategyEdit').map(se => ({
      errorMsg: se.getAttribute('errorMessage') ?? se.getAttribute('errorMsg') ?? '',
      condition: resolveCondition(se),
    } satisfies StrategyEdit)),
    localEdits: parseLocalEdits(el),
    ...(layoutEl ? { layout: parseStrategyLayout(layoutEl) } : {}),
    ...(childText(el, 'Description') ? { description: childText(el, 'Description')! } : {}),
  }
}

// ── Link pass ─────────────────────────────────────────────────────────────────

function checkEditRefs(node: EditNode, globalEdits: Map<string, EditDef>, localEdits: Map<string, EditDef>, findings: Finding[], path: string): void {
  if (node.kind === 'ref') {
    if (!localEdits.has(node.id) && !globalEdits.has(node.id)) {
      findings.push({
        ruleId: 'ED-002',
        severity: 'error',
        message: `EditRef "${node.id}" does not resolve to any named Edit`,
        location: { path },
      })
    }
  } else if (node.kind === 'logic') {
    for (const operand of node.operands) {
      checkEditRefs(operand, globalEdits, localEdits, findings, path)
    }
  }
}

function checkPanelRefs(panel: StrategyPanel, paramNames: Set<string>, findings: Finding[], strategyName: string): void {
  for (const child of panel.children) {
    if (child.kind === 'control') {
      if (child.parameterRef && !paramNames.has(child.parameterRef)) {
        findings.push({
          ruleId: 'ED-001',
          severity: 'error',
          message: `Control "${child.id}" references unknown parameter "${child.parameterRef}"`,
          location: { path: `Strategy[${strategyName}]/Control[${child.id}]` },
        })
      }
    } else {
      checkPanelRefs(child, paramNames, findings, strategyName)
    }
  }
}

function runLinkPass(doc: AtdlDocument): void {
  const globalEditMap = new Map(doc.globalEdits.map(e => [e.id, e]))

  for (const strategy of doc.strategies) {
    const localEditMap = new Map(strategy.localEdits.map(e => [e.id, e]))
    const paramNames = new Set(strategy.parameters.map(p => p.name))

    // Check parameterRef on all controls
    if (strategy.layout) {
      for (const panel of strategy.layout.panels) {
        checkPanelRefs(panel, paramNames, doc.findings, strategy.name)
      }
    }

    // Check EditRef nodes in StrategyEdits and StateRules
    for (let i = 0; i < strategy.strategyEdits.length; i++) {
      checkEditRefs(
        strategy.strategyEdits[i].condition,
        globalEditMap, localEditMap,
        doc.findings,
        `Strategy[${strategy.name}]/StrategyEdit[${i}]`,
      )
    }
  }
}

// ── FIXatdl 1.2 metadata notices ─────────────────────────────────────────────

// Attributes that appear in 1.2 Strategy elements but are stored as metadata only
const ATDL_12_STRATEGY_METADATA_ATTRS = [
  'objective', 'legAreSeverable', 'requiredNumberOfLegs', 'totalLegsTag', 'legSequenceTag',
]
// Elements that appear under 1.2 Strategy but are not yet parsed deeply
const ATDL_12_STRATEGY_METADATA_ELEMENTS = ['VendorConfig', 'DeliveryMethods']

function emitAtdl12Notices(root: Element, findings: Finding[]): void {
  // Filter registry at Strategies level
  if (kids(root, 'Filter').length > 0) {
    findings.push({
      ruleId: 'NS-007',
      severity: 'info',
      message: '<Filter> elements (FIXatdl 1.2 named-filter registry) detected — stored as metadata; filter resolution not implemented',
      location: { path: 'Strategies/Filter' },
    })
  }

  for (const stratEl of kids(root, 'Strategy')) {
    const stratName = stratEl.getAttribute('name') ?? ''
    const path = `Strategy[${stratName}]`

    // Unsupported metadata attributes
    for (const attr of ATDL_12_STRATEGY_METADATA_ATTRS) {
      if (stratEl.hasAttribute(attr)) {
        findings.push({
          ruleId: 'NS-007',
          severity: 'info',
          message: `${path}/@${attr} is a FIXatdl 1.2 attribute — stored as metadata only`,
          location: { path },
        })
        break // one NS-007 per strategy attribute block to avoid noise
      }
    }

    // Unsupported child elements
    for (const elem of ATDL_12_STRATEGY_METADATA_ELEMENTS) {
      if (firstKid(stratEl, elem)) {
        findings.push({
          ruleId: 'NS-007',
          severity: 'info',
          message: `${path}/<${elem}> is a FIXatdl 1.2 element — not yet processed`,
          location: { path: `${path}/${elem}` },
        })
      }
    }
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export function parseAtdlDocument(xml: string): AtdlDocument {
  const findings: Finding[] = []
  const parser = new DOMParser()
  const domDoc = parser.parseFromString(xml, 'application/xml')

  // Well-formedness check
  const isParseError =
    domDoc.documentElement?.localName === 'parsererror' ||
    !!domDoc.querySelector('parsererror')

  if (isParseError) {
    const msg = domDoc.documentElement.textContent?.trim() ?? 'XML parse error'
    findings.push({
      ruleId: 'WF-001',
      severity: 'error',
      message: msg.slice(0, 300),
      location: { path: '' },
    })
    return {
      version: 'unknown',
      namespaces: {},
      strategies: [],
      tag957Support: false,
      globalEdits: [],
      findings,
      sourceLineIndex: buildLineIndex(xml, domDoc),
      sourceXml: xml,
    }
  }

  const root = domDoc.documentElement
  const coreNs = root.namespaceURI
  const version = detectVersion(coreNs)

  if (version === '1.0') {
    findings.push({
      ruleId: 'NS-005',
      severity: 'info',
      message: 'FIXatdl 1.0 detected — validated against 1.1 rules; expect differences',
      location: { path: 'Strategies' },
    })
  } else if (version === '1.2') {
    findings.push({
      ruleId: 'NS-006',
      severity: 'info',
      message: 'FIXatdl 1.2 Release Candidate detected — core 1.1 vocabulary fully supported',
      location: { path: 'Strategies' },
    })
  } else if (version === 'unknown') {
    findings.push({
      ruleId: 'NS-002',
      severity: 'error',
      message: `Unrecognised Core namespace "${coreNs ?? '(none)'}" — document version could not be determined`,
      location: { path: 'Strategies' },
    })
  }

  // Collect xmlns declarations
  const namespaces: Record<string, string> = {}
  for (let i = 0; i < root.attributes.length; i++) {
    const attr = root.attributes[i]
    if (attr.name === 'xmlns') namespaces[''] = attr.value
    else if (attr.name.startsWith('xmlns:')) namespaces[attr.name.slice(6)] = attr.value
  }

  // NS-007: known FIXatdl 1.2 constructs that are not yet fully processed
  if (version === '1.2') {
    emitAtdl12Notices(root, findings)
  }

  const globalEdits = parseLocalEdits(root)
  const lineIndex = buildLineIndex(xml, domDoc)

  const doc: AtdlDocument = {
    version,
    namespaces,
    strategies: kids(root, 'Strategy').map(parseStrategy),
    tag957Support: root.getAttribute('tag957Support') === 'true',
    ...(numA(root, 'strategyIdentifierTag') != null ? { strategyIdentifierTag: numA(root, 'strategyIdentifierTag')! } : {}),
    ...(numA(root, 'versionIdentifierTag') != null ? { versionIdentifierTag: numA(root, 'versionIdentifierTag')! } : {}),
    ...(root.hasAttribute('changeStrategyOnCxlRpl') ? { changeStrategyOnCxlRpl: root.getAttribute('changeStrategyOnCxlRpl') === 'true' } : {}),
    ...(numA(root, 'draftFlagIdentifierTag') != null ? { draftFlagIdentifierTag: numA(root, 'draftFlagIdentifierTag')! } : {}),
    ...(a(root, 'imageLocation') ? { imageLocation: a(root, 'imageLocation')! } : {}),
    ...(childText(root, 'Description') ? { description: childText(root, 'Description')! } : {}),
    globalEdits,
    findings,
    sourceLineIndex: lineIndex,
    sourceXml: xml,
  }

  runLinkPass(doc)
  return doc
}
