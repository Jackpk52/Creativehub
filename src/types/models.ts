export type Category = 'Art & Design' | 'Idea Lab' | 'Brain Challenges' | 'Story Studio' | 'Code Lab' | 'Discovery Lab'
export type Difficulty = 'Beginner' | 'Explorer' | 'Creator'
export type ActivityType = 'idea' | 'story' | 'design' | 'brain' | 'code'
export type CreationStatus = 'in-progress' | 'completed'

export interface Activity {
  id: string
  title: string
  category: Category
  description: string
  whyInteresting: string
  instructions: string[]
  difficulty: Difficulty
  estimatedTime: number
  activityType: ActivityType
  prompts: string[]
  challenge?: string
  explanation?: string
}

export interface Creation {
  id: string
  activityId: string
  title: string
  content: Record<string, string>
  status: CreationStatus
  createdAt: string
  updatedAt: string
}

export interface SavedIdea {
  id: string
  prompt: string
  difficulty: Difficulty
  savedAt: string
}

export interface AchievementState {
  id: string
  unlockedAt: string
}

export interface Settings {
  reducedMotion: boolean
  largeText: boolean
  demoCreations: boolean
}

export interface AppData {
  version: 1
  creations: Creation[]
  savedIdeas: SavedIdea[]
  achievements: AchievementState[]
  participationDates: string[]
  settings: Settings
}

export interface AchievementDefinition {
  id: string
  icon: string
  title: string
  description: string
}
