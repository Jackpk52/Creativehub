import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { LocalStorageRepository, defaultData } from './storage'
import type { Creation } from '../types/models'

describe('LocalStorageRepository', () => {
  let repo: LocalStorageRepository

  beforeEach(() => {
    localStorage.clear()
    repo = new LocalStorageRepository()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('returns default data when storage is empty', () => {
    const data = repo.load()
    expect(data.version).toBe(1)
    expect(data.creations).toEqual([])
    expect(data.settings.reducedMotion).toBe(false)
  })

  it('round-trips data through save and load', () => {
    const creation: Creation = {
      id: 'test-1',
      activityId: 'future-city',
      title: 'My Future City',
      content: { created: 'A floating city', how: 'It floats.', why: 'Why not?' },
      status: 'completed',
      createdAt: '2025-01-15T10:00:00.000Z',
      updatedAt: '2025-01-15T10:30:00.000Z',
    }
    const data = { ...defaultData, creations: [creation] }
    repo.save(data)
    const loaded = repo.load()
    expect(loaded.creations).toHaveLength(1)
    expect(loaded.creations[0].title).toBe('My Future City')
  })

  it('throws on corrupted data and removes the key', () => {
    localStorage.setItem('creativehub:v1', '{bad json')
    expect(() => repo.load()).toThrow()
    expect(localStorage.getItem('creativehub:v1')).toBeNull()
  })

  it('clear removes stored data', () => {
    repo.save({ ...defaultData, creations: [] })
    repo.clear()
    expect(localStorage.getItem('creativehub:v1')).toBeNull()
  })
})
