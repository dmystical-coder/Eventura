/**
 * Event Recommendation System
 *
 * Implements a hybrid recommendation algorithm using:
 * - Content-based filtering (event attributes)
 * - Collaborative filtering (similar users)
 * - Popularity-based recommendations
 * - Web3 wallet integration via Reown/WalletConnect
 * - On-chain behavior analysis (NFT ownership, transaction history)
 */

import type { EventWithMetadata, LanguageCode } from '@/types/multilang-event'
import type { Address } from 'viem'
import {
  getEventId,
  getEventCategory,
  getEventLocation,
  getEventPrice,
} from './eventHelpers'

// User interaction types
export interface UserInteraction {
  userId: string
  eventId: string
  type: 'view' | 'favorite' | 'purchase' | 'share'
  timestamp: number
  metadata?: {
    category?: string
    price?: number
    location?: string
  }
}

export interface UserProfile {
  userId: string
  interactions: UserInteraction[]
  preferences: {
    categories: Record<string, number> // category -> score
    priceRange: { min: number; max: number }
    locations: string[]
  }
}

export interface RecommendationScore {
  eventId: string
  score: number
  reasons: string[]
}

// Weights for different recommendation factors
const WEIGHTS = {
  purchase: 1.0,
  favorite: 0.7,
  view: 0.3,
  share: 0.5,
  categoryMatch: 0.8,
  priceMatch: 0.5,
  locationMatch: 0.6,
  popularity: 0.4,
  recency: 0.3,
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB)
  return denominator === 0 ? 0 : dotProduct / denominator
}

/**
 * Build user profile from interactions
 */
export function buildUserProfile(interactions: UserInteraction[]): UserProfile {
  const userId = interactions[0]?.userId || 'anonymous'
  const categories: Record<string, number> = {}
  const locations: string[] = []
  let minPrice = Infinity
  let maxPrice = 0

  interactions.forEach((interaction) => {
    // Weight categories by interaction type
    const weight = WEIGHTS[interaction.type] || 0.1
    const category = interaction.metadata?.category || 'general'
    categories[category] = (categories[category] || 0) + weight

    // Track price preferences
    if (interaction.metadata?.price) {
      minPrice = Math.min(minPrice, interaction.metadata.price)
      maxPrice = Math.max(maxPrice, interaction.metadata.price)
    }

    // Track location preferences
    if (interaction.metadata?.location && !locations.includes(interaction.metadata.location)) {
      locations.push(interaction.metadata.location)
    }
  })

  return {
    userId,
    interactions,
    preferences: {
      categories,
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === 0 ? 1000 : maxPrice,
      },
      locations,
    },
  }
}

/**
 * Content-based filtering: Score events based on user profile
 */
export function scoreEventByContent(
  event: EventWithMetadata,
  profile: UserProfile,
  language: LanguageCode = 'en'
): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []

  // Category matching
  const eventCategory = getEventCategory(event, language)
  const categoryScore = profile.preferences.categories[eventCategory] || 0
  if (categoryScore > 0) {
    score += categoryScore * WEIGHTS.categoryMatch
    reasons.push(`Matches your interest in ${eventCategory}`)
  }

  // Price range matching
  const eventPrice = getEventPrice(event)
  if (
    eventPrice >= profile.preferences.priceRange.min &&
    eventPrice <= profile.preferences.priceRange.max
  ) {
    score += WEIGHTS.priceMatch
    reasons.push('Within your price range')
  }

  // Location matching
  const eventLocation = getEventLocation(event, language)
  if (profile.preferences.locations.includes(eventLocation)) {
    score += WEIGHTS.locationMatch
    reasons.push(`In your preferred location: ${eventLocation}`)
  }

  return { score, reasons }
}

/**
 * Collaborative filtering: Find similar users and recommend what they liked
 */
export function findSimilarUsers(
  targetProfile: UserProfile,
  allProfiles: UserProfile[]
): { userId: string; similarity: number }[] {
  const targetCategories = Object.keys(targetProfile.preferences.categories)
  const similarities: { userId: string; similarity: number }[] = []

  allProfiles.forEach((profile) => {
    if (profile.userId === targetProfile.userId) return

    // Create category vectors for comparison
    const allCategories = Array.from(
      new Set([
        ...targetCategories,
        ...Object.keys(profile.preferences.categories),
      ])
    )

    const targetVector = allCategories.map(
      (cat) => targetProfile.preferences.categories[cat] || 0
    )
    const profileVector = allCategories.map(
      (cat) => profile.preferences.categories[cat] || 0
    )

    const similarity = cosineSimilarity(targetVector, profileVector)
    if (similarity > 0.3) {
      // Threshold for similarity
      similarities.push({ userId: profile.userId, similarity })
    }
  })

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 10)
}

/**
 * Calculate event popularity score
 */
export function calculatePopularityScore(
  eventId: string,
  allInteractions: UserInteraction[]
): number {
  const eventInteractions = allInteractions.filter((i) => i.eventId === eventId)

  let popularityScore = 0
  eventInteractions.forEach((interaction) => {
    popularityScore += WEIGHTS[interaction.type] || 0.1
  })

  // Normalize by time (more recent = higher score)
  const now = Date.now()
  const recencyBoost = eventInteractions.reduce((acc, interaction) => {
    const daysSince = (now - interaction.timestamp) / (1000 * 60 * 60 * 24)
    const recencyFactor = Math.max(0, 1 - daysSince / 30) // Decay over 30 days
    return acc + recencyFactor * WEIGHTS.recency
  }, 0)

  return popularityScore + recencyBoost
}

/**
 * Main recommendation function: Generate personalized event recommendations
 */
export function generateRecommendations(
  events: EventWithMetadata[],
  userProfile: UserProfile,
  allProfiles: UserProfile[],
  allInteractions: UserInteraction[],
  options: {
    limit?: number
    excludeViewed?: boolean
    minScore?: number
  } = {}
): RecommendationScore[] {
  const { limit = 10, excludeViewed = true, minScore = 0.1 } = options

  // Get events user has already interacted with
  const viewedEventIds = new Set(
    userProfile.interactions.map((i) => i.eventId)
  )

  // Find similar users for collaborative filtering
  const similarUsers = findSimilarUsers(userProfile, allProfiles)

  // Score each event
  const scoredEvents: RecommendationScore[] = events
    .filter((event) => {
      // Optionally exclude already viewed events
      const eventId = getEventId(event)
      if (excludeViewed && viewedEventIds.has(eventId)) {
        return false
      }
      return true
    })
    .map((event) => {
      const eventId = getEventId(event)
      let totalScore = 0
      const reasons: string[] = []

      // 1. Content-based score
      const contentScore = scoreEventByContent(event, userProfile)
      totalScore += contentScore.score
      reasons.push(...contentScore.reasons)

      // 2. Collaborative filtering score
      let collaborativeScore = 0
      similarUsers.forEach((similarUser) => {
        const similarProfile = allProfiles.find((p) => p.userId === similarUser.userId)
        if (similarProfile) {
          const hasInteracted = similarProfile.interactions.some(
            (i) => i.eventId === eventId && (i.type === 'purchase' || i.type === 'favorite')
          )
          if (hasInteracted) {
            collaborativeScore += similarUser.similarity
          }
        }
      })

      if (collaborativeScore > 0) {
        totalScore += collaborativeScore
        reasons.push('Popular with similar users')
      }

      // 3. Popularity score
      const popularityScore = calculatePopularityScore(eventId, allInteractions)
      totalScore += popularityScore * WEIGHTS.popularity

      if (popularityScore > 5) {
        reasons.push('Trending event')
      }

      return {
        eventId,
        score: totalScore,
        reasons: reasons.length > 0 ? reasons : ['Recommended for you'],
      }
    })
    .filter((scored) => scored.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scoredEvents
}

/**
 * Find similar events based on content similarity
 */
export function findSimilarEvents(
  targetEvent: EventWithMetadata,
  allEvents: EventWithMetadata[],
  limit: number = 5,
  language: LanguageCode = 'en'
): EventWithMetadata[] {
  const targetCategory = getEventCategory(targetEvent, language)
  const targetPrice = getEventPrice(targetEvent)
  const targetLocation = getEventLocation(targetEvent, language)
  const targetId = getEventId(targetEvent)

  const scoredEvents = allEvents
    .filter((event) => getEventId(event) !== targetId)
    .map((event) => {
      let similarity = 0

      // Category match (highest weight)
      if (getEventCategory(event, language) === targetCategory) {
        similarity += 3
      }

      // Price similarity
      const eventPrice = getEventPrice(event)
      const priceDiff = Math.abs(eventPrice - targetPrice)
      const priceSimilarity = Math.max(0, 1 - priceDiff / Math.max(targetPrice, eventPrice, 1))
      similarity += priceSimilarity * 2

      // Location match
      if (getEventLocation(event, language) === targetLocation) {
        similarity += 1
      }

      return { event, similarity }
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map((item) => item.event)

  return scoredEvents
}

/**
 * Cache management for recommendations
 */
const recommendationCache = new Map<string, { recommendations: RecommendationScore[]; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export function getCachedRecommendations(userId: string): RecommendationScore[] | null {
  const cached = recommendationCache.get(userId)
  if (!cached) return null

  const now = Date.now()
  if (now - cached.timestamp > CACHE_TTL) {
    recommendationCache.delete(userId)
    return null
  }

  return cached.recommendations
}

export function setCachedRecommendations(userId: string, recommendations: RecommendationScore[]): void {
  recommendationCache.set(userId, {
    recommendations,
    timestamp: Date.now(),
  })
}

export function clearRecommendationCache(userId?: string): void {
  if (userId) {
    recommendationCache.delete(userId)
  } else {
    recommendationCache.clear()
  }
}
