/**
 * User Interaction Tracking System
 *
 * Tracks user interactions with events for recommendation purposes
 * Stores data in localStorage with privacy considerations
 */

import type { UserInteraction, UserProfile } from './recommendations'

const STORAGE_KEY = 'eventura_user_interactions'
const MAX_INTERACTIONS = 500 // Limit stored interactions for performance

/**
 * Track a user interaction with an event
 */
export function trackInteraction(interaction: Omit<UserInteraction, 'timestamp'>): void {
  try {
    const interactions = getStoredInteractions()

    const newInteraction: UserInteraction = {
      ...interaction,
      timestamp: Date.now(),
    }

    interactions.push(newInteraction)

    // Keep only the most recent interactions
    const trimmedInteractions = interactions
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_INTERACTIONS)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedInteractions))
  } catch (error) {
    console.error('Failed to track interaction:', error)
  }
}

/**
 * Get all stored interactions for the current user
 */
export function getStoredInteractions(): UserInteraction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    return JSON.parse(stored) as UserInteraction[]
  } catch (error) {
    console.error('Failed to retrieve interactions:', error)
    return []
  }
}

/**
 * Get interactions filtered by type
 */
export function getInteractionsByType(
  type: UserInteraction['type']
): UserInteraction[] {
  return getStoredInteractions().filter((i) => i.type === type)
}

/**
 * Get interactions for a specific event
 */
export function getEventInteractions(eventId: string): UserInteraction[] {
  return getStoredInteractions().filter((i) => i.eventId === eventId)
}

/**
 * Check if user has interacted with an event
 */
export function hasInteracted(
  eventId: string,
  type?: UserInteraction['type']
): boolean {
  const interactions = getStoredInteractions()
  return interactions.some(
    (i) => i.eventId === eventId && (!type || i.type === type)
  )
}

/**
 * Get user's favorite events
 */
export function getFavoriteEvents(): string[] {
  return getInteractionsByType('favorite').map((i) => i.eventId)
}

/**
 * Get user's purchased events
 */
export function getPurchasedEvents(): string[] {
  return getInteractionsByType('purchase').map((i) => i.eventId)
}

/**
 * Get recently viewed events
 */
export function getRecentlyViewedEvents(limit: number = 10): string[] {
  return getInteractionsByType('view')
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit)
    .map((i) => i.eventId)
}

/**
 * Clear all stored interactions (for privacy/logout)
 */
export function clearInteractions(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear interactions:', error)
  }
}

/**
 * Get interaction statistics
 */
export function getInteractionStats(): {
  total: number
  byType: Record<string, number>
  categories: Record<string, number>
  oldestInteraction: number | null
  newestInteraction: number | null
} {
  const interactions = getStoredInteractions()

  const stats = {
    total: interactions.length,
    byType: {} as Record<string, number>,
    categories: {} as Record<string, number>,
    oldestInteraction: null as number | null,
    newestInteraction: null as number | null,
  }

  if (interactions.length === 0) return stats

  // Calculate by type
  interactions.forEach((i) => {
    stats.byType[i.type] = (stats.byType[i.type] || 0) + 1

    if (i.metadata?.category) {
      stats.categories[i.metadata.category] =
        (stats.categories[i.metadata.category] || 0) + 1
    }
  })

  // Get timestamp range
  const timestamps = interactions.map((i) => i.timestamp).sort()
  stats.oldestInteraction = timestamps[0]
  stats.newestInteraction = timestamps[timestamps.length - 1]

  return stats
}

/**
 * Export user data (for privacy/data portability)
 */
export function exportUserData(): {
  interactions: UserInteraction[]
  stats: ReturnType<typeof getInteractionStats>
  exportDate: string
} {
  return {
    interactions: getStoredInteractions(),
    stats: getInteractionStats(),
    exportDate: new Date().toISOString(),
  }
}

/**
 * Import user data
 */
export function importUserData(data: {
  interactions: UserInteraction[]
}): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.interactions))
  } catch (error) {
    console.error('Failed to import user data:', error)
  }
}
