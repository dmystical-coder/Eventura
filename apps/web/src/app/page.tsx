'use client'

import { ConnectButton } from '@/components/ConnectButton'
import { RecommendedEvents } from '@/components/RecommendedEvents'
import { motion } from 'framer-motion'
import { Calendar, Shield, Zap, Users, ArrowRight, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useOnchainEvents } from '@/hooks/useOnchainEvents'

const features = [
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Blockchain-powered ticketing ensures authenticity and prevents fraud'
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    description: 'Buy, sell, and transfer tickets instantly on the Base network'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Connect with event communities and discover new experiences'
  },
  {
    icon: Calendar,
    title: 'Easy Management',
    description: 'Manage all your event tickets in one secure digital wallet'
  }
]

export default function Home() {
  const { isConnected } = useAccount()
  const { events, loading } = useOnchainEvents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Eventura</span>
            </a>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-white hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="/calendar" className="text-white hover:text-blue-400 transition-colors">
              Calendar
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              Browse Events
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">
              Create Event
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ConnectButton />
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          >
            The Future of
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Event Ticketing
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience seamless, secure, and transparent event ticketing powered by Base blockchain.
            No more fraud, no more fake tickets, just pure event magic.
          </motion.p>

          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <ConnectButton />
              <button className="flex items-center gap-2 px-6 py-3 text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Grid - Animated */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-6 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">Why Choose Eventura?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recommended Events Section (on-chain) */}
      <RecommendedEvents
        allEvents={events}
        className="relative z-10"
        limit={6}
      />
      <HomePageContent />
    </>
  )
}
