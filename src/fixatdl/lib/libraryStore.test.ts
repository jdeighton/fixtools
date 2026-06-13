import { LibraryStore, computeHash } from './libraryStore'
import type { LibraryEntry } from './libraryStore'
import { loadDocument, SIZE_MAX_BYTES, SIZE_WARN_BYTES } from './loadDocument'

function makeEntry(overrides: Partial<LibraryEntry> = {}): LibraryEntry {
  return {
    id: 'test-id',
    name: 'Test',
    source: 'paste',
    addedAt: 0,
    lastOpenedAt: 0,
    detectedVersion: '1.1',
    strategyCount: 1,
    contentHash: 'abc',
    xml: '<x/>',
    ...overrides,
  }
}

const V11_XML = `<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"></Strategies>`

// ── LibraryStore ──────────────────────────────────────────────────────────────

describe('LibraryStore (in-memory)', () => {
  test('add entry is retrievable via getEntries', () => {
    const store = new LibraryStore(null)
    const entry = makeEntry({ id: '1', contentHash: 'h1' })
    store.add(entry)
    expect(store.getEntries()).toHaveLength(1)
    expect(store.getEntries()[0]).toEqual(entry)
  })

  test('new entries are prepended (most recent first)', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'a', contentHash: 'ha', name: 'A' }))
    store.add(makeEntry({ id: 'b', contentHash: 'hb', name: 'B' }))
    expect(store.getEntries()[0].name).toBe('B')
  })

  test('findByHash returns correct entry', () => {
    const store = new LibraryStore(null)
    const entry = makeEntry({ contentHash: 'hash42' })
    store.add(entry)
    expect(store.findByHash('hash42')).toEqual(entry)
    expect(store.findByHash('nope')).toBeUndefined()
  })

  test('remove deletes entry by id', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'del', contentHash: 'hd' }))
    store.remove('del')
    expect(store.getEntries()).toHaveLength(0)
  })

  test('removeAll clears all entries', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'a', contentHash: 'ha' }))
    store.add(makeEntry({ id: 'b', contentHash: 'hb' }))
    store.removeAll()
    expect(store.getEntries()).toHaveLength(0)
  })

  test('rename updates entry name', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'r1', name: 'Old' }))
    store.rename('r1', 'New')
    expect(store.getEntries()[0].name).toBe('New')
  })

  test('rename ignores blank string (keeps existing name)', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'r2', name: 'Kept' }))
    store.rename('r2', '   ')
    expect(store.getEntries()[0].name).toBe('Kept')
  })

  test('replace swaps entry content but preserves original id', () => {
    const store = new LibraryStore(null)
    store.add(makeEntry({ id: 'orig', contentHash: 'hold', name: 'Old' }))
    const newEntry = makeEntry({ id: 'new-id', contentHash: 'hnew', name: 'New' })
    store.replace('orig', newEntry)
    const entries = store.getEntries()
    expect(entries[0].id).toBe('orig')
    expect(entries[0].name).toBe('New')
  })

  test('exportJSON / importJSON round-trips', () => {
    const store1 = new LibraryStore(null)
    store1.add(makeEntry({ id: 'e1', contentHash: 'he1' }))
    const json = store1.exportJSON()

    const store2 = new LibraryStore(null)
    const { added, skipped } = store2.importJSON(json)
    expect(added).toBe(1)
    expect(skipped).toBe(0)
    expect(store2.getEntries()).toHaveLength(1)
  })

  test('importJSON skips duplicates by hash', () => {
    const entry = makeEntry({ contentHash: 'dup' })
    const store = new LibraryStore(null)
    store.add(entry)
    const json = JSON.stringify([entry])
    const { added, skipped } = store.importJSON(json)
    expect(added).toBe(0)
    expect(skipped).toBe(1)
    expect(store.getEntries()).toHaveLength(1)
  })

  test('importJSON ignores malformed JSON silently', () => {
    const store = new LibraryStore(null)
    const { added, skipped } = store.importJSON('not-json')
    expect(added).toBe(0)
    expect(skipped).toBe(0)
  })
})

// ── computeHash ───────────────────────────────────────────────────────────────

describe('computeHash', () => {
  test('same input produces same hash', async () => {
    const a = await computeHash('hello')
    const b = await computeHash('hello')
    expect(a).toBe(b)
  })

  test('different inputs produce different hashes', async () => {
    const a = await computeHash('hello')
    const b = await computeHash('world')
    expect(a).not.toBe(b)
  })
})

// ── loadDocument ──────────────────────────────────────────────────────────────

describe('loadDocument', () => {
  test('adds entry to library and returns kind=added', async () => {
    const store = new LibraryStore(null)
    const result = await loadDocument(V11_XML, 'paste', 'My Doc', store)
    expect(result.kind).toBe('added')
    if (result.kind === 'added') {
      expect(result.entry.name).toBe('My Doc')
      expect(result.entry.source).toBe('paste')
      expect(result.entry.detectedVersion).toBe('1.1')
    }
    expect(store.getEntries()).toHaveLength(1)
  })

  test('duplicate hash returns kind=duplicate and does not add', async () => {
    const store = new LibraryStore(null)
    await loadDocument(V11_XML, 'paste', 'First', store)
    const result = await loadDocument(V11_XML, 'paste', 'Second', store)
    expect(result.kind).toBe('duplicate')
    expect(store.getEntries()).toHaveLength(1)
    if (result.kind === 'duplicate') {
      expect(result.existing.name).toBe('First')
      expect(result.pendingEntry.name).toBe('Second')
    }
  })

  test('>10 MB returns kind=too_large and does not add', async () => {
    const store = new LibraryStore(null)
    const bigXml = 'x'.repeat(SIZE_MAX_BYTES + 1)
    const result = await loadDocument(bigXml, 'paste', '', store)
    expect(result.kind).toBe('too_large')
    if (result.kind === 'too_large') expect(result.sizeBytes).toBeGreaterThan(SIZE_MAX_BYTES)
    expect(store.getEntries()).toHaveLength(0)
  })

  test('>2 MB (but ≤10 MB) returns kind=size_warned and still adds', async () => {
    const store = new LibraryStore(null)
    const padding = 'x'.repeat(SIZE_WARN_BYTES + 500)
    const bigXml = `<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core">${padding}</Strategies>`
    const result = await loadDocument(bigXml, 'paste', 'Big', store)
    expect(result.kind).toBe('size_warned')
    expect(store.getEntries()).toHaveLength(1)
  }, 10000)

  test('falls back to strategy name when nameHint is empty', async () => {
    const store = new LibraryStore(null)
    const xmlWithStrategy = `
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core">
  <Strategy name="MyAlgo" wireValue="ma"></Strategy>
</Strategies>`.trim()
    const result = await loadDocument(xmlWithStrategy, 'paste', '', store)
    if (result.kind === 'added') expect(result.entry.name).toBe('MyAlgo')
  })

  test('strategyCount reflects number of strategies parsed', async () => {
    const store = new LibraryStore(null)
    const xml = `
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core">
  <Strategy name="A" wireValue="a"></Strategy>
  <Strategy name="B" wireValue="b"></Strategy>
</Strategies>`.trim()
    const result = await loadDocument(xml, 'paste', 'Two', store)
    if (result.kind === 'added') expect(result.entry.strategyCount).toBe(2)
  })
})

// ── localStorage unavailable fallback ────────────────────────────────────────

describe('localStorage unavailable', () => {
  test('store works in-memory when storage constructor throws', () => {
    const throwingStorage = {
      getItem: () => { throw new Error('unavailable') },
      setItem: () => { throw new Error('unavailable') },
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    } as unknown as Storage

    const store = new LibraryStore(throwingStorage)
    store.add(makeEntry({ id: 'x', contentHash: 'hx' }))
    expect(store.getEntries()).toHaveLength(1)
  })

  test('store recovers when setItem throws after initial load', () => {
    let callCount = 0
    const faultyStorage = {
      getItem: () => null,
      setItem: () => { if (++callCount > 0) throw new Error('quota') },
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null,
    } as unknown as Storage

    const store = new LibraryStore(faultyStorage)
    // persist failure should not throw
    expect(() => store.add(makeEntry({ id: 'y', contentHash: 'hy' }))).not.toThrow()
    expect(store.getEntries()).toHaveLength(1)
  })
})
