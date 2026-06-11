export function extractCopyText(rawLine: string, includePreamble: boolean): string {
  if (includePreamble) return rawLine
  const idx = rawLine.indexOf('8=FIX')
  return idx > 0 ? rawLine.slice(idx) : rawLine
}
