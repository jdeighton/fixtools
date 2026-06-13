// Derived from src/data/fixDictionary.ts — name→tag map for FIX_* reference resolution
import { FIELDS } from '../../data/fixDictionary'

export const FIX_FIELD_MAP: Record<string, number> = Object.fromEntries(
  Object.entries(FIELDS).map(([tag, def]) => [def.name, Number(tag)])
)

export function fieldName(tag: number): string | undefined {
  return FIELDS[tag]?.name
}
