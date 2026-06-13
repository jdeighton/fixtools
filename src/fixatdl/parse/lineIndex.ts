import type { LineIndex } from '../model'

export function buildLineIndex(xml: string, doc: Document): LineIndex {
  if (!doc.documentElement) return { getLine: () => undefined }

  // Map character position → line number (1-based)
  const posToLine = new Uint32Array(xml.length + 1)
  let line = 1
  for (let i = 0; i < xml.length; i++) {
    posToLine[i] = line
    if (xml[i] === '\n') line++
  }
  posToLine[xml.length] = line

  // Collect DOM elements in document order via TreeWalker
  const domElements: Element[] = []
  const walker = doc.createTreeWalker(doc.documentElement, NodeFilter.SHOW_ELEMENT)
  domElements.push(doc.documentElement)
  let node: Node | null
  while ((node = walker.nextNode()) !== null) {
    domElements.push(node as Element)
  }

  // Scan raw text for element start tags in document order.
  // Pattern matches `<localName` and `<prefix:localName`, skipping </ <! <?
  const tagRe = /<(?:[a-zA-Z][a-zA-Z0-9]*:)?([a-zA-Z][a-zA-Z0-9_.-]*)/g
  const occurrences: { localName: string; pos: number }[] = []
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(xml)) !== null) {
    occurrences.push({ localName: m[1], pos: m.index })
  }

  // Match DOM elements to raw-text occurrences positionally.
  // Both sequences are in document order for well-formed XML.
  const map = new WeakMap<Element, number>()
  let oi = 0
  for (const elem of domElements) {
    const name = elem.localName
    while (oi < occurrences.length) {
      const occ = occurrences[oi++]
      if (occ.localName === name) {
        map.set(elem, posToLine[occ.pos])
        break
      }
    }
  }

  return { getLine: (element: Element) => map.get(element) }
}
