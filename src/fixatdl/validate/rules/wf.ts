import type { AtdlDocument, Finding } from '../../model'

// WF-002, WF-003, WF-004  (WF-001 is emitted by the parser; engine merges it)

export function checkWF(doc: AtdlDocument): Finding[] {
  const xml = doc.sourceXml
  const findings: Finding[] = []
  const trimmed = xml.trimStart()

  // WF-002: XML declaration present
  if (!trimmed.startsWith('<?xml')) {
    findings.push({
      ruleId: 'WF-002',
      severity: 'warning',
      message: 'XML declaration is absent',
      suggestion: 'Add <?xml version="1.0" encoding="UTF-8"?> at the start of the document',
      specRef: 'XML 1.0 §2.8',
      location: { path: '' },
    })
  }

  // WF-003: Declared encoding is UTF-8
  const encMatch = trimmed.match(/^<\?xml[^?]*encoding\s*=\s*["']([^"']+)["']/)
  if (encMatch && encMatch[1].toUpperCase() !== 'UTF-8') {
    findings.push({
      ruleId: 'WF-003',
      severity: 'warning',
      message: `Declared encoding is "${encMatch[1]}" — FIXatdl specifies UTF-8`,
      suggestion: 'Change to encoding="UTF-8"',
      location: { path: '' },
    })
  }

  // WF-004: Typographic (smart) quotes — U+201C/201D left/right double, U+2018/2019 left/right single
  const smartRe = /[“”‘’]/u
  if (smartRe.test(xml)) {
    const idx = xml.search(smartRe)
    const line = xml.slice(0, idx).split('\n').length
    findings.push({
      ruleId: 'WF-004',
      severity: 'warning',
      message: 'Typographic (smart) quotes detected — likely copied from a PDF',
      suggestion: 'Replace “”‘’ with ASCII " and \'',
      location: { path: '', line },
    })
  }

  return findings
}
