import { describe, it, expect } from 'vitest'
import { calculateAchievementIds, mergeAchievements, calculateStreak } from './progress'
import type { Creation, AchievementState } from '../types/models'

const makeCreation = (activityId: string, status: Creation['status'] = 'completed'): Creation => ({
  id: crypto.randomUUID(),
  activityId,
  title: 'Test',
  content: {},
  status,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

describe('calculateAchievementIds', () => {
  it('returns empty array when no creations', () => {
    expect(calculateAchievementIds([])).toEqual([])
  })

  it('includes first-creation when any creation exists', () => {
    const ids = calculateAchievementIds([makeCreation('future-city')])
    expect(ids).toContain('first-creation')
  })

  it('unlocks creative-artist for completed Art & Design activity', () => {
    const ids = calculateAchievementIds([makeCreation('future-city')])
    expect(ids).toContain('creative-artist')
  })

  it('unlocks problem-solver for completed Brain Challenge', () => {
    const ids = calculateAchievementIds([makeCreation('logic-challenge')])
    expect(ids).toContain('problem-solver')
  })

  it('unlocks innovation-starter when 3 different categories completed', () => {
    const ids = calculateAchievementIds([
      makeCreation('future-city'),
      makeCreation('logic-challenge'),
      makeCreation('new-app'),
    ])
    expect(ids).toContain('innovation-starter')
  })

  it('does not unlock category achievements for in-progress creations', () => {
    const ids = calculateAchievementIds([makeCreation('future-city', 'in-progress')])
    expect(ids).toContain('first-creation')
    expect(ids).not.toContain('creative-artist')
  })
})

describe('mergeAchievements', () => {
  it('adds new achievements', () => {
    const result = mergeAchievements([], [makeCreation('future-city')])
    expect(result.length).toBeGreaterThan(0)
    expect(result.some((a) => a.id === 'first-creation')).toBe(true)
  })

  it('does not duplicate existing achievements', () => {
    const existing: AchievementState[] = [{ id: 'first-creation', unlockedAt: new Date().toISOString() }]
    const result = mergeAchievements(existing, [makeCreation('future-city')])
    const firstCreationCount = result.filter((a) => a.id === 'first-creation').length
    expect(firstCreationCount).toBe(1)
  })
})

describe('calculateStreak', () => {
  it('returns 0 for empty dates', () => {
    const today = new Date('2025-06-15T12:00:00')
    expect(calculateStreak([], today)).toBe(0)
  })

  it('counts consecutive days from today', () => {
    const today = new Date('2025-06-15T12:00:00')
    const dates = ['2025-06-15', '2025-06-14', '2025-06-13']
    expect(calculateStreak(dates, today)).toBe(3)
  })

  it('stops at a gap', () => {
    const today = new Date('2025-06-15T12:00:00')
    const dates = ['2025-06-15', '2025-06-13']
    expect(calculateStreak(dates, today)).toBe(1)
  })
})
