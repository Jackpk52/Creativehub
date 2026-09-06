import type { AppData, Creation, Settings } from '../types/models'

const STORAGE_KEY = 'creativehub:v1'

export const defaultSettings: Settings = { reducedMotion: false, largeText: false, demoCreations: false }

export const defaultData: AppData = {
  version: 1,
  creations: [],
  savedIdeas: [],
  achievements: [],
  participationDates: [],
  settings: defaultSettings,
}

const isCreation = (value: unknown): value is Creation => {
  if (!value || typeof value !== 'object') return false
  const creation = value as Partial<Creation>
  return typeof creation.id === 'string' && typeof creation.activityId === 'string' && typeof creation.title === 'string' && typeof creation.content === 'object' && (creation.status === 'in-progress' || creation.status === 'completed')
}

export interface StorageRepository {
  load(): AppData
  save(data: AppData): void
  clear(): void
}

export class LocalStorageRepository implements StorageRepository {
  load(): AppData {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultData)

    try {
      const parsed = JSON.parse(raw) as Partial<AppData>
      if (parsed.version !== 1 || !Array.isArray(parsed.creations) || !parsed.creations.every(isCreation)) {
        throw new Error('Stored CreativeHub data has an unexpected shape.')
      }
      return {
        ...structuredClone(defaultData),
        ...parsed,
        settings: { ...defaultSettings, ...parsed.settings },
        savedIdeas: Array.isArray(parsed.savedIdeas) ? parsed.savedIdeas : [],
        achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
        participationDates: Array.isArray(parsed.participationDates) ? parsed.participationDates : [],
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
      throw new Error('We found unreadable saved data and safely reset it.')
    }
  }

  save(data: AppData): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      throw new Error('Your browser could not save this change.')
    }
  }

  clear(): void {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}

export const storageRepository: StorageRepository = new LocalStorageRepository()
