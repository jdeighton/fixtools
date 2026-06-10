export interface Filter {
  id: string
  text: string
  isRegex: boolean
}

export function getFilterError(filter: Filter): string | null {
  if (!filter.isRegex || filter.text === '') return null
  try {
    new RegExp(filter.text)
    return null
  } catch (e) {
    return (e as Error).message
  }
}

export function applyFilters(lines: string[], filters: Filter[]): string[] {
  if (filters.length === 0) return lines
  const validFilters = filters.filter(f => getFilterError(f) === null && f.text !== '')
  if (validFilters.length === 0) return lines
  return lines.filter(line =>
    validFilters.every(f => {
      if (f.isRegex) return new RegExp(f.text).test(line)
      return line.toLowerCase().includes(f.text.toLowerCase())
    })
  )
}
