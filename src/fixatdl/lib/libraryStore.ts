import type { AtdlVersion } from '../model'

const STORAGE_KEY = 'fixtoolkit.fixatdl.library.v1'

export interface LibraryEntry {
  id: string
  name: string
  source: 'file' | 'paste' | 'sample'
  addedAt: number
  lastOpenedAt: number
  detectedVersion: AtdlVersion
  strategyCount: number
  contentHash: string
  xml: string
}

export async function computeHash(xml: string): Promise<string> {
  try {
    const buf = new TextEncoder().encode(xml)
    const hash = await crypto.subtle.digest('SHA-256', buf)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    // djb2 fallback when subtle crypto is unavailable
    let h = 5381
    for (let i = 0; i < xml.length; i++) h = ((h << 5) + h) ^ xml.charCodeAt(i)
    return (h >>> 0).toString(16)
  }
}

export class LibraryStore {
  private entries: LibraryEntry[] = []
  private storage: Storage | null

  constructor(storage: Storage | null = LibraryStore.defaultStorage()) {
    this.storage = storage
    if (storage) this.loadFromStorage()
  }

  private static defaultStorage(): Storage | null {
    try { return window.localStorage } catch { return null }
  }

  private loadFromStorage(): void {
    if (!this.storage) return
    try {
      const raw = this.storage.getItem(STORAGE_KEY)
      if (raw) this.entries = JSON.parse(raw) as LibraryEntry[]
    } catch {
      this.storage = null
    }
  }

  private persist(): void {
    if (!this.storage) return
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.entries))
    } catch {}
  }

  getEntries(): LibraryEntry[] { return [...this.entries] }

  findByHash(hash: string): LibraryEntry | undefined {
    return this.entries.find(e => e.contentHash === hash)
  }

  add(entry: LibraryEntry): void {
    this.entries = [entry, ...this.entries]
    this.persist()
  }

  replace(existingId: string, entry: LibraryEntry): void {
    const idx = this.entries.findIndex(e => e.id === existingId)
    if (idx >= 0) {
      this.entries[idx] = { ...entry, id: existingId }
      this.persist()
    }
  }

  remove(id: string): void {
    this.entries = this.entries.filter(e => e.id !== id)
    this.persist()
  }

  removeAll(): void {
    this.entries = []
    this.persist()
  }

  rename(id: string, name: string): void {
    const e = this.entries.find(e => e.id === id)
    if (e) { e.name = name.trim() || e.name; this.persist() }
  }

  touch(id: string): void {
    const e = this.entries.find(e => e.id === id)
    if (e) { e.lastOpenedAt = Date.now(); this.persist() }
  }

  exportJSON(): string {
    return JSON.stringify(this.entries, null, 2)
  }

  importJSON(json: string): { added: number; skipped: number } {
    let added = 0, skipped = 0
    try {
      const incoming = JSON.parse(json) as LibraryEntry[]
      const existingHashes = new Set(this.entries.map(e => e.contentHash))
      for (const entry of incoming) {
        if (!existingHashes.has(entry.contentHash)) {
          this.entries.push(entry)
          existingHashes.add(entry.contentHash)
          added++
        } else {
          skipped++
        }
      }
      this.persist()
    } catch {}
    return { added, skipped }
  }
}
