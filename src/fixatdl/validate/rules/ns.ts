import type { AtdlDocument, Finding } from '../../model'

// NS-001, NS-003, NS-004, NS-007
// NS-002/005/006 are emitted by the parser; engine merges them.

const XSI_NS = 'http://www.w3.org/2001/XMLSchema-instance'

const VERSION_SLUG: Record<string, string> = {
  '1.0': '1-0',
  '1.1': '1-1',
  '1.2': '1-2',
}

const KNOWN_ATDL12_URIS = new Set([
  'http://www.fixprotocol.org/FIXatdl-1-2/Core',
  'http://www.fixprotocol.org/FIXatdl-1-2/Validation',
  'http://www.fixprotocol.org/FIXatdl-1-2/Layout',
  'http://www.fixprotocol.org/FIXatdl-1-2/Flow',
  'http://www.fixprotocol.org/FIXatdl-1-2/Timezones',
  'http://www.fixtrading.org/FIXatdl-1-2/Core',
  'http://www.fixtrading.org/FIXatdl-1-2/Validation',
  'http://www.fixtrading.org/FIXatdl-1-2/Layout',
  'http://www.fixtrading.org/FIXatdl-1-2/Flow',
  'http://www.fixtrading.org/FIXatdl-1-2/Timezones',
])

function extractRootLocalName(xml: string): string | null {
  const body = xml
    .replace(/^\s*<\?[^?]*\?>\s*/g, '')
    .replace(/\s*<!--[\s\S]*?-->\s*/g, '')
    .replace(/^\s*<!DOCTYPE[^>]*>\s*/i, '')
    .trimStart()
  const m = body.match(/^<([A-Za-z_][\w.-]*(?::[A-Za-z_][\w.-]*)?)/)
  if (!m) return null
  const raw = m[1]
  const colon = raw.indexOf(':')
  return colon < 0 ? raw : raw.slice(colon + 1)
}

export function checkNS(doc: AtdlDocument): Finding[] {
  const findings: Finding[] = []

  // NS-001: root local-name must be Strategies
  const rootName = extractRootLocalName(doc.sourceXml)
  if (rootName && rootName !== 'Strategies') {
    findings.push({
      ruleId: 'NS-001',
      severity: 'error',
      message: `Root element is <${rootName}> — expected <Strategies>`,
      suggestion: 'Wrap all Strategy elements in a <Strategies> root element',
      location: { path: rootName },
    })
  }

  // NS-003: sub-schema namespaces must match core version
  if (doc.version !== 'unknown') {
    const slug = VERSION_SLUG[doc.version]
    for (const [prefix, uri] of Object.entries(doc.namespaces)) {
      if (!uri.includes('FIXatdl-') || !uri.includes('fixprotocol') && !uri.includes('fixtrading')) continue
      if (!uri.includes(slug)) {
        findings.push({
          ruleId: 'NS-003',
          severity: 'error',
          message: `Namespace ${prefix}="${uri}" does not match core version ${doc.version}`,
          suggestion: `Update namespace to use FIXatdl-${doc.version.replace(/\./g, '-')} URIs`,
          location: { path: 'Strategies' },
        })
      }
    }
  }

  // NS-004: xsi namespace must be declared when xsi:type is used
  const xsiDeclared = Object.values(doc.namespaces).includes(XSI_NS)
  if (!xsiDeclared && /xsi:type/.test(doc.sourceXml)) {
    findings.push({
      ruleId: 'NS-004',
      severity: 'error',
      message: 'xsi:type is used but the XML Schema Instance namespace is not declared',
      suggestion: `Add xmlns:xsi="${XSI_NS}" to the root Strategies element`,
      location: { path: 'Strategies' },
    })
  }

  // NS-007: unrecognized namespace URI under 1.2
  if (doc.version === '1.2') {
    for (const [prefix, uri] of Object.entries(doc.namespaces)) {
      const isAtdl = uri.includes('FIXatdl') && (uri.includes('1-2') || uri.includes('1.2'))
      if (!isAtdl) continue
      if (!KNOWN_ATDL12_URIS.has(uri)) {
        findings.push({
          ruleId: 'NS-007',
          severity: 'info',
          message: `Namespace ${prefix}="${uri}" is not a recognized FIXatdl 1.2 sub-schema — may be unsupported`,
          location: { path: 'Strategies' },
        })
      }
    }
  }

  return findings
}
