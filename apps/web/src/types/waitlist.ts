/**
 * TypeScript types for Event Waitlist functionality
 * Matches EventTicketing.sol smart contract structure
 */

export interface WaitlistEntry {
  user: string // Ethereum address
  joinedAt: bigint // Timestamp
  notified: boolean
}

export interface WaitlistPosition {
  position: number // 1-indexed, 0 if not in waitlist
  total: number // Total number in waitlist
  estimatedWaitTime?: string // Optional: Human-readable wait time
}

export interface WaitlistStatus {
  isInWaitlist: boolean
  position: number
  totalInWaitlist: number
  ticketsAvailable: number
  hasBeenNotified: boolean
}

export interface EventWithWaitlist {
  eventId: bigint
  isSoldOut: boolean
  ticketsAvailable: number
  waitlistCount: number
  userHasTicket: boolean
  userInWaitlist: boolean
  userWaitlistPosition: number
}
