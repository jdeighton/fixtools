import type { AtdlDocument, Finding } from '../model'
import { checkWF } from './rules/wf'
import { checkNS } from './rules/ns'
import { checkST } from './rules/st'
import { checkSG } from './rules/sg'
import { checkPA } from './rules/pa'
import { checkCT } from './rules/ct'

export function validateDocument(doc: AtdlDocument): Finding[] {
  return [
    ...doc.findings,   // WF-001, NS-002/005/006, and any link-pass findings from parser
    ...checkWF(doc),
    ...checkNS(doc),
    ...checkST(doc),
    ...checkSG(doc),
    ...checkPA(doc),
    ...checkCT(doc),
  ]
}
