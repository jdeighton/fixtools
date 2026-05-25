// Reads QuickFIX XML spec files from the specs/ directory and writes fix_spec_combined.json.
//
// Usage:
//   node scripts/buildSpecJson.mjs
//
// To add another version, add its filename to SPEC_FILES below and drop the
// corresponding XML into the specs/ directory.
//
// QuickFIX XML source: https://github.com/quickfix/quickfix/tree/master/spec
// TT FIX XML source:   https://library.tradingtechnologies.com/tt-fix/

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')

// ── Config ───────────────────────────────────────────────────────────────────
// Each entry maps a JSON key to an XML filename in specs/.
// Order determines merge precedence in generateDictionary.mjs (later = higher).
const SPEC_FILES = [
  { key: 'fix42',    file: 'FIX42.xml' },
  { key: 'fix44',    file: 'FIX44.xml' },
  { key: 'tt_fix42', file: 'TT-FIX42.xml' },
  { key: 'tt_fix44', file: 'TT-FIX44.xml' },
]

// ── Minimal XML parser ────────────────────────────────────────────────────────
// Zero-dependency parser for the subset of XML used in QuickFIX/TT spec files.
// Handles: single-quoted attrs (QuickFIX), double-quoted attrs (TT),
//          XML comments, self-closing tags, nested components.

function parseAttrs(attrString) {
  const attrs = {}
  // Match both single-quoted and double-quoted attribute values
  const re = /(\w+)\s*=\s*(?:'([^']*)'|"([^"]*)")/g
  let m
  while ((m = re.exec(attrString)) !== null) {
    attrs[m[1]] = m[2] ?? m[3]
  }
  return attrs
}

// Returns a { tag, attrs, children[] } tree from the raw XML string.
function parseXml(xml) {
  // Strip XML declaration and comments, normalise line endings
  const src = xml
    .replace(/<\?xml[^?]*\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\r\n/g, '\n')

  const stack = []
  let root = null

  const tagRe = /<[^>]+>/g
  let m

  while ((m = tagRe.exec(src)) !== null) {
    const raw = m[0]

    if (raw.startsWith('</')) {
      // Closing tag — pop stack and attach to parent
      const node = stack.pop()
      if (!node) continue
      if (stack.length > 0) {
        stack[stack.length - 1].children.push(node)
      } else {
        root = node
      }
    } else {
      // Opening or self-closing tag
      const tagMatch = raw.match(/^<(\w+)/)
      if (!tagMatch) continue
      const tag = tagMatch[1]
      const attrStr = raw.slice(tag.length + 1, raw.endsWith('/>') ? -2 : -1)
      const node = { tag, attrs: parseAttrs(attrStr), children: [] }

      if (raw.endsWith('/>')) {
        if (stack.length > 0) {
          stack[stack.length - 1].children.push(node)
        } else {
          root = node
        }
      } else {
        stack.push(node)
      }
    }
  }

  return root
}

function childrenNamed(node, tag) {
  return node.children.filter(c => c.tag === tag)
}

function firstChild(node, tag) {
  return node.children.find(c => c.tag === tag) ?? null
}

// ── Spec extraction ───────────────────────────────────────────────────────────

function extractFields(root) {
  const fieldsSection = firstChild(root, 'fields')
  if (!fieldsSection) return []

  return childrenNamed(fieldsSection, 'field').map(f => {
    const values = childrenNamed(f, 'value').map(v => ({
      enum: v.attrs.enum,
      description: v.attrs.description,
    }))
    return {
      number: parseInt(f.attrs.number, 10),
      name: f.attrs.name,
      type: f.attrs.type,
      ...(values.length ? { values } : { values: [] }),
    }
  })
}

// Builds a map of component name → { fields: string[], required: string[] }
// by recursively expanding nested component references.
function buildComponentMap(root) {
  const componentsSection = firstChild(root, 'components')
  if (!componentsSection) return {}

  // First pass: index all component nodes by name
  const raw = {}
  for (const comp of childrenNamed(componentsSection, 'component')) {
    raw[comp.attrs.name] = comp
  }

  // Second pass: recursively expand each component (memoised)
  const memo = {}
  function expand(name, seen = new Set()) {
    if (memo[name]) return memo[name]
    if (seen.has(name)) return { allFields: [], requiredFields: [] }
    seen = new Set(seen).add(name)

    const node = raw[name]
    if (!node) return { allFields: [], requiredFields: [] }

    const allFields = []
    const requiredFields = []

    for (const child of node.children) {
      if (child.tag === 'field') {
        allFields.push(child.attrs.name)
        if (child.attrs.required === 'Y') requiredFields.push(child.attrs.name)
      } else if (child.tag === 'component' || child.tag === 'group') {
        const sub = expand(child.attrs.name, seen)
        allFields.push(...sub.allFields)
        if (child.attrs.required === 'Y') requiredFields.push(...sub.requiredFields)
      }
    }

    memo[name] = { allFields, requiredFields }
    return memo[name]
  }

  for (const name of Object.keys(raw)) expand(name)
  return memo
}

function extractMessages(root, componentMap) {
  const messagesSection = firstChild(root, 'messages')
  if (!messagesSection) return []

  return childrenNamed(messagesSection, 'message').map(m => {
    const allFields = []
    const requiredFields = []

    for (const child of m.children) {
      if (child.tag === 'field') {
        allFields.push(child.attrs.name)
        if (child.attrs.required === 'Y') requiredFields.push(child.attrs.name)
      } else if ((child.tag === 'component' || child.tag === 'group') && componentMap) {
        const comp = componentMap[child.attrs.name]
        if (comp) {
          allFields.push(...comp.allFields)
          if (child.attrs.required === 'Y') requiredFields.push(...comp.requiredFields)
        }
      }
    }

    return {
      msgtype: m.attrs.msgtype,
      name: m.attrs.name,
      requiredFields,
      allFields,
    }
  })
}

// ── Main ──────────────────────────────────────────────────────────────────────

const combined = {}

for (const { key, file } of SPEC_FILES) {
  const xmlPath = resolve(root, 'specs', file)
  let xml
  try {
    xml = readFileSync(xmlPath, 'utf8')
  } catch {
    console.error(`ERROR: Could not read ${xmlPath}`)
    console.error(`       See script header for download URLs`)
    process.exit(1)
  }

  const tree = parseXml(xml)
  if (!tree) {
    console.error(`ERROR: Failed to parse ${file}`)
    process.exit(1)
  }

  const fields = extractFields(tree)
  const componentMap = buildComponentMap(tree)
  const messages = extractMessages(tree, componentMap)
  combined[key] = { fields, messages }

  console.log(`${file}: ${fields.length} fields, ${messages.length} messages, ${Object.keys(componentMap).length} components`)
}

const outPath = resolve(root, 'fix_spec_combined.json')
writeFileSync(outPath, JSON.stringify(combined, null, 4), 'utf8')
console.log(`Written ${outPath} (${Math.round(readFileSync(outPath).length / 1024)}KB)`)
