import type { StrategyPanel, Control } from '../model'

/**
 * Validates a StringID: starts with a letter, followed by up to 254
 * alphanumeric or underscore characters. Max total length: 255.
 */
export const STRING_ID_RE = /^[A-Za-z][A-Za-z0-9_]{0,254}$/

/**
 * Recursively flattens a tree of StrategyPanels and Controls into
 * a flat array of Controls. Returns the same Control references
 * (not copies).
 */
export function collectControls(panels: StrategyPanel[]): Control[] {
  const out: Control[] = []
  function walk(node: StrategyPanel | Control): void {
    if (node.kind === 'control') { out.push(node); return }
    for (const child of node.children) walk(child)
  }
  for (const panel of panels) walk(panel)
  return out
}
