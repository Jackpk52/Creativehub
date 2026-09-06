import { activities } from '../data/catalog'
import type { AchievementState, Category, Creation } from '../types/models'

const categoryAchievement: Partial<Record<Category, string>> = {
  'Idea Lab': 'idea-explorer',
  'Art & Design': 'creative-artist',
  'Brain Challenges': 'problem-solver',
  'Story Studio': 'story-builder',
  'Code Lab': 'code-explorer',
  'Discovery Lab': 'curious-mind',
}

export function calculateAchievementIds(creations: Creation[]): string[] {
  if (creations.length === 0) return []
  const ids = new Set<string>(['first-creation'])
  const completed = creations.filter((creation) => creation.status === 'completed')
  const categories = new Set<Category>()
  completed.forEach((creation) => {
    const activity = activities.find((item) => item.id === creation.activityId)
    if (activity) {
      categories.add(activity.category)
      const achievement = categoryAchievement[activity.category]
      if (achievement) ids.add(achievement)
    }
  })
  if (categories.size >= 3) ids.add('innovation-starter')
  return [...ids]
}

export function mergeAchievements(current: AchievementState[], creations: Creation[], now = new Date()): AchievementState[] {
  const next = [...current]
  calculateAchievementIds(creations).forEach((id) => {
    if (!next.some((item) => item.id === id)) next.push({ id, unlockedAt: now.toISOString() })
  })
  return next
}

export const toLocalDate = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export function calculateStreak(dates: string[], today = new Date()): number {
  const days = new Set(dates)
  let count = 0
  const cursor = new Date(today)
  cursor.setHours(0, 0, 0, 0)
  while (days.has(toLocalDate(cursor))) {
    count += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
}
