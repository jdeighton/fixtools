// Reads fix_spec_combined.json and writes src/data/fixDictionary.ts
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')

const raw = readFileSync(resolve(root, 'fix_spec_combined.json'), 'utf8').replace(/^﻿/, '')
const spec = JSON.parse(raw)

// Merge fields from both versions; 4.4 takes precedence for conflicts
function buildFieldMap(fields42, fields44) {
  const map = {}
  for (const f of [...fields42, ...fields44]) {
    const existing = map[f.number]
    const values = {}
    for (const v of (f.values ?? [])) {
      values[v.enum] = titleCase(v.description)
    }
    map[f.number] = {
      name: f.name,
      type: f.type,
      ...(Object.keys(values).length ? { values } : {}),
      ...(existing?.values && Object.keys(existing.values).length && !Object.keys(values).length
        ? { values: existing.values }
        : {}),
    }
  }
  return map
}

function buildMsgTypeMap(messages) {
  const map = {}
  for (const m of messages) {
    map[m.msgtype] = titleCase(m.name)
  }
  return map
}

function buildRequiredMap(messages) {
  const map = {}
  for (const m of messages) {
    map[m.msgtype] = m.requiredFields ?? []
  }
  return map
}

function titleCase(str) {
  if (str.includes('_')) {
    // UPPER_SNAKE_CASE: "NEW_ORDER_SINGLE" -> "New Order Single"
    return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  }
  if (/^[A-Z0-9]+$/.test(str)) {
    // All-caps word: "BUY" -> "Buy", "SELL" -> "Sell", "IOI" -> "Ioi"
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  // CamelCase: split on lowercase→uppercase transitions only (preserves "IOI" as-is)
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

const fields42     = spec.fix42?.fields    ?? []
const fields44     = spec.fix44?.fields    ?? []
const messages42   = spec.fix42?.messages  ?? []
const messages44   = spec.fix44?.messages  ?? []
const fieldsTt42   = spec.tt_fix42?.fields   ?? []
const fieldsTt44   = spec.tt_fix44?.fields   ?? []
const messagesTt42 = spec.tt_fix42?.messages ?? []
const messagesTt44 = spec.tt_fix44?.messages ?? []

const allFields = buildFieldMap(fields42, fields44)

// Single-version field map (no merging) for version-aware enum validation and TT specs
function buildSingleVersionFieldMap(fields) {
  const map = {}
  for (const f of fields) {
    const values = {}
    for (const v of (f.values ?? [])) {
      values[v.enum] = titleCase(v.description)
    }
    map[f.number] = {
      name: f.name,
      type: f.type,
      ...(Object.keys(values).length ? { values } : {}),
    }
  }
  return map
}

const fields42Map   = buildSingleVersionFieldMap(fields42)
const fieldsTt42Map = buildSingleVersionFieldMap(fieldsTt42)
const fieldsTt44Map = buildSingleVersionFieldMap(fieldsTt44)
const msgTypes42    = buildMsgTypeMap(messages42)
const msgTypes44    = buildMsgTypeMap(messages44)
const required42    = buildRequiredMap(messages42)
const required44    = buildRequiredMap(messages44)
const requiredTt42  = buildRequiredMap(messagesTt42)
const requiredTt44  = buildRequiredMap(messagesTt44)

// Merge msgType maps
const allMsgTypes = { ...msgTypes42, ...msgTypes44 }

function serialize(obj) {
  return JSON.stringify(obj, null, 2)
}

const output = `// Auto-generated from QuickFIX and TT FIX spec files — do not edit by hand
// Run: node scripts/generateDictionary.mjs

export interface FieldDef {
  name: string
  type: string
  values?: Record<string, string>
}

export const FIELDS: Record<number, FieldDef> = ${serialize(allFields)}

export const FIELDS_42: Record<number, FieldDef> = ${serialize(fields42Map)}

export const FIELDS_TT42: Record<number, FieldDef> = ${serialize(fieldsTt42Map)}

export const FIELDS_TT44: Record<number, FieldDef> = ${serialize(fieldsTt44Map)}

export const MSG_TYPES: Record<string, string> = ${serialize(allMsgTypes)}

export const REQUIRED_FIELDS_42: Record<string, string[]> = ${serialize(required42)}

export const REQUIRED_FIELDS_44: Record<string, string[]> = ${serialize(required44)}

export const REQUIRED_FIELDS_TT42: Record<string, string[]> = ${serialize(requiredTt42)}

export const REQUIRED_FIELDS_TT44: Record<string, string[]> = ${serialize(requiredTt44)}

export interface MessageDef {
  msgtype: string
  name: string
  requiredFields: string[]
  allFields: string[]
}

export const MESSAGES_42: MessageDef[] = ${serialize(messages42.map(m => ({
  msgtype: m.msgtype,
  name: titleCase(m.name),
  requiredFields: m.requiredFields ?? [],
  allFields: m.allFields ?? [],
})))}

export const MESSAGES_44: MessageDef[] = ${serialize(messages44.map(m => ({
  msgtype: m.msgtype,
  name: titleCase(m.name),
  requiredFields: m.requiredFields ?? [],
  allFields: m.allFields ?? [],
})))}

export const MESSAGES_TT42: MessageDef[] = ${serialize(messagesTt42.map(m => ({
  msgtype: m.msgtype,
  name: titleCase(m.name),
  requiredFields: m.requiredFields ?? [],
  allFields: m.allFields ?? [],
})))}

export const MESSAGES_TT44: MessageDef[] = ${serialize(messagesTt44.map(m => ({
  msgtype: m.msgtype,
  name: titleCase(m.name),
  requiredFields: m.requiredFields ?? [],
  allFields: m.allFields ?? [],
})))}

export function fieldName(tag: number): string {
  return FIELDS[tag]?.name ?? \`Tag \${tag}\`
}

export function fieldValueDescription(tag: number, value: string): string | undefined {
  return FIELDS[tag]?.values?.[value]
}

export function msgTypeDescription(msgType: string): string {
  return MSG_TYPES[msgType] ?? \`MsgType \${msgType}\`
}

export function requiredFields(msgType: string, fixVersion: string): string[] {
  const map = fixVersion === 'FIX.4.2' ? REQUIRED_FIELDS_42 : REQUIRED_FIELDS_44
  return map[msgType] ?? []
}
`

const outPath = resolve(root, 'src/data/fixDictionary.ts')
writeFileSync(outPath, output, 'utf8')
console.log(`Written ${outPath} (${Math.round(output.length / 1024)}KB)`)
