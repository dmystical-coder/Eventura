/**
 * Event Helper Utilities
 *
 * Provides helper functions to work with EventWithMetadata and extract
 * relevant information for recommendations and display
 */

import type { EventWithMetadata, LanguageCode } from '@/types/multilang-event'
import { getTranslation } from '@/utils/multilang'

/**
 * Get event ID as string
 */
export function getEventId(event: EventWithMetadata): string {
  return event.id.toString()
}

/**
 * Get event category for a specific language
 */
export function getEventCategory(event: EventWithMetadata, language: LanguageCode = 'en'): string {
  const translation = getTranslation(event.metadata, language)
  return translation.category
}

/**
 * Get event location for a specific language
 */
export function getEventLocation(event: EventWithMetadata, language: LanguageCode = 'en'): string {
  const translation = getTranslation(event.metadata, language)
  return translation.location
}

/**
 * Get event name for a specific language
 */
export function getEventName(event: EventWithMetadata, language: LanguageCode = 'en'): string {
  const translation = getTranslation(event.metadata, language)
  return translation.name
}

/**
 * Get event description for a specific language
 */
export function getEventDescription(event: EventWithMetadata, language: LanguageCode = 'en'): string {
  const translation = getTranslation(event.metadata, language)
  return translation.description
}

/**
 * Get event price in ETH (converted from wei)
 */
export function getEventPrice(event: EventWithMetadata): number {
  return Number(event.ticketPrice) / (10 ** 18)
}

/**
 * Get event start time as Date
 */
export function getEventStartTime(event: EventWithMetadata): Date {
  return new Date(Number(event.startTime) * 1000)
}

/**
 * Get event end time as Date
 */
export function getEventEndTime(event: EventWithMetadata): Date {
  return new Date(Number(event.endTime) * 1000)
}

/**
 * Get event cover image URL
 */
export function getEventCoverImage(event: EventWithMetadata): string | undefined {
  return event.metadata.media?.coverImage
}

/**
 * Get event availability (tickets remaining)
 */
export function getEventAvailability(event: EventWithMetadata): {
  available: bigint
  total: bigint
  sold: bigint
  percentage: number
} {
  const available = event.maxTickets - event.ticketsSold
  const percentage = event.maxTickets > 0
    ? Number((event.ticketsSold * BigInt(100)) / event.maxTickets)
    : 0

  return {
    available,
    total: event.maxTickets,
    sold: event.ticketsSold,
    percentage,
  }
}

/**
 * Check if event is active and has tickets available
 */
export function isEventAvailable(event: EventWithMetadata): boolean {
  return event.active && (event.maxTickets - event.ticketsSold) > 0
}

/**
 * Check if event has started
 */
export function hasEventStarted(event: EventWithMetadata): boolean {
  const now = Math.floor(Date.now() / 1000)
  return Number(event.startTime) <= now
}

/**
 * Check if event has ended
 */
export function hasEventEnded(event: EventWithMetadata): boolean {
  const now = Math.floor(Date.now() / 1000)
  return Number(event.endTime) <= now
}

/**
 * Get event status
 */
export function getEventStatus(event: EventWithMetadata): 'upcoming' | 'ongoing' | 'ended' | 'soldout' | 'inactive' {
  if (!event.active) return 'inactive'
  if (event.maxTickets <= event.ticketsSold) return 'soldout'
  if (hasEventEnded(event)) return 'ended'
  if (hasEventStarted(event)) return 'ongoing'
  return 'upcoming'
}

/**
 * Format event for display (simplified structure)
 */
export function formatEventForDisplay(event: EventWithMetadata, language: LanguageCode = 'en') {
  return {
    id: getEventId(event),
    name: getEventName(event, language),
    description: getEventDescription(event, language),
    category: getEventCategory(event, language),
    location: getEventLocation(event, language),
    price: getEventPrice(event),
    startTime: getEventStartTime(event),
    endTime: getEventEndTime(event),
    image: getEventCoverImage(event),
    availability: getEventAvailability(event),
    status: getEventStatus(event),
    organizer: event.organizer,
  }
}
