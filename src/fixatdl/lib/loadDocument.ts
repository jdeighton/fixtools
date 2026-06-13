import type { AtdlDocument } from '../model'
import { parseAtdlDocument } from '../parse'
import { computeHash, LibraryStore } from './libraryStore'
import type { LibraryEntry } from './libraryStore'

export const SIZE_WARN_BYTES = 2 * 1024 * 1024
export const SIZE_MAX_BYTES = 10 * 1024 * 1024

export type LoadResult =
  | { kind: 'too_large'; sizeBytes: number }
  | { kind: 'added'; entry: LibraryEntry; doc: AtdlDocument }
  | { kind: 'size_warned'; entry: LibraryEntry; doc: AtdlDocument }
  | { kind: 'duplicate'; existing: LibraryEntry; pendingEntry: LibraryEntry; doc: AtdlDocument }

function deriveName(
  source: 'file' | 'paste' | 'sample',
  hint: string,
  doc: AtdlDocument,
): string {
  if (hint) return hint
  const providerID = doc.strategies[0]?.providerID
  if (providerID) return providerID
  const firstName = doc.strategies[0]?.name
  if (firstName) return firstName
  return source === 'sample' ? 'Sample Document' : 'Unnamed Document'
}

export async function loadDocument(
  xml: string,
  source: 'file' | 'paste' | 'sample',
  nameHint: string,
  store: LibraryStore,
): Promise<LoadResult> {
  const sizeBytes = new TextEncoder().encode(xml).length

  if (sizeBytes > SIZE_MAX_BYTES) {
    return { kind: 'too_large', sizeBytes }
  }

  const [hash, doc] = await Promise.all([
    computeHash(xml),
    Promise.resolve(parseAtdlDocument(xml)),
  ])

  const name = deriveName(source, nameHint, doc)
  const now = Date.now()

  const entry: LibraryEntry = {
    id: crypto.randomUUID(),
    name,
    source,
    addedAt: now,
    lastOpenedAt: now,
    detectedVersion: doc.version,
    strategyCount: doc.strategies.length,
    contentHash: hash,
    xml,
  }

  const existing = store.findByHash(hash)
  if (existing) {
    return { kind: 'duplicate', existing, pendingEntry: entry, doc }
  }

  store.add(entry)

  if (sizeBytes > SIZE_WARN_BYTES) {
    return { kind: 'size_warned', entry, doc }
  }

  return { kind: 'added', entry, doc }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
