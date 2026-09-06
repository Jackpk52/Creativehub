import { describe, it, expect, beforeEach } from 'vitest'
import { activities, categoryInfo, promptLibrary, achievements, workspaceFields } from '../data/catalog'
import type { Category, Difficulty } from '../types/models'

describe('activity catalog', () => {
  it('exports exactly 20 activities', () => {
    expect(activities).toHaveLength(20)
  })

  it('has unique ids', () => {
    const ids = new Set(activities.map((a) => a.id))
    expect(ids.size).toBe(20)
  })

  it('every activity belongs to a known category', () => {
    const validCategories = new Set(Object.keys(categoryInfo))
    activities.forEach((a) => expect(validCategories.has(a.category)).toBe(true))
  })

  it('every activity has at least one prompt and instruction', () => {
    activities.forEach((a) => {
      expect(a.prompts.length).toBeGreaterThanOrEqual(1)
      expect(a.instructions.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('brain challenges have an explanation', () => {
    const brainActivities = activities.filter((a) => a.activityType === 'brain')
    expect(brainActivities.length).toBeGreaterThanOrEqual(1)
    brainActivities.forEach((a) => expect(a.explanation).toBeDefined())
  })

  it('all 6 categories are represented', () => {
    const used = new Set(activities.map((a) => a.category))
    expect(used.size).toBe(6)
  })
})

describe('prompt library', () => {
  it('has prompts for every difficulty', (): void => {
    const levels: Difficulty[] = ['Beginner', 'Explorer', 'Creator']
    levels.forEach((level) => {
      expect(promptLibrary[level].length).toBeGreaterThanOrEqual(1)
    })
  })
})

describe('workspace fields', () => {
  it('has fields for every activity type', () => {
    const types = new Set(activities.map((a) => a.activityType))
    types.forEach((type) => {
      expect(workspaceFields[type].length).toBeGreaterThanOrEqual(1)
    })
  })
})

describe('achievements', () => {
  it('has 8 achievements', () => {
    expect(achievements).toHaveLength(8)
  })

  it('every achievement has a unique id', () => {
    const ids = new Set(achievements.map((a) => a.id))
    expect(ids.size).toBe(8)
  })
})

describe('category info', () => {
  it('has 6 categories', () => {
    expect(Object.keys(categoryInfo)).toHaveLength(6)
  })

  it('each category has an icon, color and description', () => {
    Object.values(categoryInfo).forEach((info) => {
      expect(info.icon).toBeTruthy()
      expect(info.color).toBeTruthy()
      expect(info.description).toBeTruthy()
    })
  })
})
