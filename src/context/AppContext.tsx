import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { activities } from '../data/catalog'
import { defaultData, storageRepository } from '../storage/storage'
import type { AppData, Creation, CreationStatus, SavedIdea, Settings } from '../types/models'
import { mergeAchievements } from '../utils/progress'
import { toLocalDate } from '../utils/progress'

interface SaveCreationInput {
  id?: string
  activityId: string
  title: string
  content: Record<string, string>
  status: CreationStatus
}

interface AppContextValue {
  data: AppData
  storageMessage: string | null
  saveCreation(input: SaveCreationInput): Creation
  deleteCreation(id: string): void
  saveIdea(prompt: string, difficulty: SavedIdea['difficulty']): void
  deleteIdea(id: string): void
  updateSettings(settings: Partial<Settings>): void
  resetData(): void
  clearMessage(): void
}

const AppContext = createContext<AppContextValue | null>(null)

function safeLoad(): { data: AppData; error: string | null } {
  try {
    return { data: storageRepository.load(), error: null }
  } catch (error) {
    return { data: structuredClone(defaultData), error: error instanceof Error ? error.message : 'Saved data could not be loaded.' }
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = safeLoad()
  const [data, setData] = useState(initial.data)
  const [storageMessage, setStorageMessage] = useState<string | null>(initial.error)

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', data.settings.largeText)
    document.documentElement.classList.toggle('reduce-motion', data.settings.reducedMotion)
  }, [data.settings])

  const commit = (next: AppData) => {
    try {
      storageRepository.save(next)
      setData(next)
    } catch (error) {
      setStorageMessage(error instanceof Error ? error.message : 'This change could not be saved.')
      throw error
    }
  }

  const saveCreation = (input: SaveCreationInput): Creation => {
    const now = new Date()
    const existing = input.id ? data.creations.find((item) => item.id === input.id) : undefined
    const creation: Creation = {
      ...input,
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now.toISOString(),
      updatedAt: now.toISOString(),
    }
    const creations = existing ? data.creations.map((item) => item.id === creation.id ? creation : item) : [creation, ...data.creations]
    const date = toLocalDate(now)
    const participationDates = data.participationDates.includes(date) ? data.participationDates : [...data.participationDates, date]
    commit({ ...data, creations, participationDates, achievements: mergeAchievements(data.achievements, creations, now) })
    return creation
  }

  const deleteCreation = (id: string) => commit({ ...data, creations: data.creations.filter((item) => item.id !== id) })

  const saveIdea = (prompt: string, difficulty: SavedIdea['difficulty']) => {
    const savedIdea: SavedIdea = { id: crypto.randomUUID(), prompt, difficulty, savedAt: new Date().toISOString() }
    commit({ ...data, savedIdeas: [savedIdea, ...data.savedIdeas] })
  }

  const deleteIdea = (id: string) => commit({ ...data, savedIdeas: data.savedIdeas.filter((item) => item.id !== id) })
  const updateSettings = (settings: Partial<Settings>) => commit({ ...data, settings: { ...data.settings, ...settings } })
  const resetData = () => { storageRepository.clear(); setData(structuredClone(defaultData)) }

  return (
    <AppContext.Provider value={{ data, storageMessage, saveCreation, deleteCreation, saveIdea, deleteIdea, updateSettings, resetData, clearMessage: () => setStorageMessage(null) }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp must be used inside AppProvider')
  return value
}

export function useActivity(activityId: string | undefined) {
  return activities.find((activity) => activity.id === activityId)
}
