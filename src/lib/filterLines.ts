export interface Filter {
  id: string
  text: string
  isRegex: boolean
}

export interface FilterSet {
  id: string
  name: string
  filters: Array<{ text: string; isRegex: boolean }>
}

let nextId = 1
export function generateId(): string { return String(nextId++) }

export function createFilterSet(name: string, filters: Filter[]): FilterSet {
  return {
    id: generateId(),
    name,
    filters: filters.map(({ text, isRegex }) => ({ text, isRegex })),
  }
}

export function appendFilterSet(current: Filter[], set: FilterSet): Filter[] {
  const appended = set.filters.map(f => ({ ...f, id: generateId() }))
  return [...current, ...appended]
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
