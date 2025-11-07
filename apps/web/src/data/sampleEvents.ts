/**
 * Sample Event Data for Development and Demo
 *
 * This file contains mock event data to demonstrate the recommendation system
 * In production, this would be fetched from the Base blockchain via Reown/WalletConnect
 */

import type { EventWithMetadata } from '@/types/multilang-event'

export const sampleEvents: EventWithMetadata[] = [
  {
    id: BigInt(1),
    organizer: '0x1234567890123456789012345678901234567890',
    metadataURI: 'ipfs://QmExample1',
    startTime: BigInt(Math.floor(new Date('2025-12-15').getTime() / 1000)),
    endTime: BigInt(Math.floor(new Date('2025-12-15').getTime() / 1000) + 86400),
    ticketPrice: BigInt(299 * 10 ** 18), // 299 ETH in wei
    maxTickets: BigInt(500),
    ticketsSold: BigInt(234),
    active: true,
    createdAt: BigInt(Math.floor(Date.now() / 1000)),
    metadata: {
      version: '1.0',
      defaultLanguage: 'en',
      translations: {
        en: {
          name: 'Web3 Developer Conference 2025',
          description: 'Join us for the biggest Web3 developer conference of the year. Learn about the latest in blockchain technology, DeFi, and NFTs.',
          category: 'technology',
          location: 'San Francisco, CA',
          venue: 'Moscone Center',
          tags: ['web3', 'blockchain', 'developer', 'conference'],
        },
        es: {
          name: 'Conferencia de Desarrolladores Web3 2025',
          description: 'Únete a nosotros para la mayor conferencia de desarrolladores Web3 del año.',
          category: 'tecnología',
          location: 'San Francisco, CA',
          venue: 'Moscone Center',
        },
        fr: {
          name: 'Conférence des Développeurs Web3 2025',
          description: 'Rejoignez-nous pour la plus grande conférence de développeurs Web3 de l\'année.',
          category: 'technologie',
          location: 'San Francisco, CA',
          venue: 'Moscone Center',
        },
      },
      media: {
        coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      },
    },
  },
  {
    id: 'event-2',
    metadata: {
      title: 'Live Jazz Night',
      description: 'An evening of smooth jazz with renowned artists. Enjoy cocktails and great music.',
      category: 'music',
      location: 'New York, NY',
      date: new Date('2025-11-20').toISOString(),
      price: 75,
      image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-3',
    metadata: {
      title: 'Modern Art Exhibition',
      description: 'Explore contemporary art from emerging artists around the world.',
      category: 'art',
      location: 'Los Angeles, CA',
      date: new Date('2025-11-25').toISOString(),
      price: 25,
      image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-4',
    metadata: {
      title: 'Startup Networking Mixer',
      description: 'Connect with fellow entrepreneurs, investors, and innovators in the startup ecosystem.',
      category: 'networking',
      location: 'Austin, TX',
      date: new Date('2025-11-18').toISOString(),
      price: 50,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-5',
    metadata: {
      title: 'Electronic Music Festival',
      description: 'Three days of non-stop electronic music featuring top DJs from around the world.',
      category: 'music',
      location: 'Miami, FL',
      date: new Date('2025-12-05').toISOString(),
      price: 350,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-6',
    metadata: {
      title: 'AI & Machine Learning Summit',
      description: 'Discover the latest advancements in AI and machine learning from industry leaders.',
      category: 'technology',
      location: 'Seattle, WA',
      date: new Date('2025-12-10').toISOString(),
      price: 399,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-7',
    metadata: {
      title: 'Yoga & Wellness Retreat',
      description: 'A weekend of mindfulness, yoga, and wellness activities in a serene mountain setting.',
      category: 'wellness',
      location: 'Boulder, CO',
      date: new Date('2025-11-22').toISOString(),
      price: 450,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-8',
    metadata: {
      title: 'Food & Wine Festival',
      description: 'Taste exquisite cuisines and premium wines from award-winning chefs and sommeliers.',
      category: 'food',
      location: 'Napa Valley, CA',
      date: new Date('2025-11-28').toISOString(),
      price: 180,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-9',
    metadata: {
      title: 'Stand-Up Comedy Night',
      description: 'Laugh out loud with performances from top comedians. A night of pure entertainment.',
      category: 'entertainment',
      location: 'Chicago, IL',
      date: new Date('2025-11-16').toISOString(),
      price: 45,
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-10',
    metadata: {
      title: 'Marathon Running Event',
      description: 'Join thousands of runners in this annual city marathon. All skill levels welcome.',
      category: 'sports',
      location: 'Boston, MA',
      date: new Date('2025-12-01').toISOString(),
      price: 85,
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-11',
    metadata: {
      title: 'Blockchain Gaming Conference',
      description: 'Explore the future of gaming with blockchain technology and NFTs.',
      category: 'technology',
      location: 'San Francisco, CA',
      date: new Date('2025-12-08').toISOString(),
      price: 275,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-12',
    metadata: {
      title: 'Classical Orchestra Performance',
      description: 'An enchanting evening with the city orchestra performing timeless classics.',
      category: 'music',
      location: 'Philadelphia, PA',
      date: new Date('2025-11-19').toISOString(),
      price: 95,
      image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-13',
    metadata: {
      title: 'Photography Workshop',
      description: 'Master the art of photography with hands-on training from professional photographers.',
      category: 'art',
      location: 'Portland, OR',
      date: new Date('2025-11-21').toISOString(),
      price: 150,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-14',
    metadata: {
      title: 'Business Leadership Summit',
      description: 'Learn from top business leaders and executives about strategy and innovation.',
      category: 'networking',
      location: 'Dallas, TX',
      date: new Date('2025-12-03').toISOString(),
      price: 500,
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    },
  },
  {
    id: 'event-15',
    metadata: {
      title: 'Rock Concert Extravaganza',
      description: 'An epic rock concert featuring legendary bands and special guest performers.',
      category: 'music',
      location: 'Las Vegas, NV',
      date: new Date('2025-12-12').toISOString(),
      price: 125,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
    },
  },
]
