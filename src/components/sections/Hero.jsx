import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../shared/PageTransition'
import ExternalLink from '../ui/ExternalLink'

const PLATFORM_PILLS = [
  { name: 'Commerce7', color: '#8B4049', url: 'https://commerce7.com' },
  { name: 'Tock', color: '#2D2D2D', url: 'https://www.exploretock.com' },
  { name: 'Square', color: '#4A7EC4', url: 'https://squareup.com' },
  { name: 'VinoShipper', color: '#6B2D5B', url: 'https://vinoshipper.com' },
]

export default function Hero() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-surface/85" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="block text-sm font-bold uppercase tracking-[0.1em] text-text-secondary mb-3"
          >
            Automated Revenue Operations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-[53px] text-text font-bold leading-tight mb-6"
          >
            Four platforms. One&nbsp;agent.
            <br />
            <span className="text-accent">Zero manual exports.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            Claude Code orchestrates MCP servers across{' '}
            <ExternalLink href="https://commerce7.com">Commerce7</ExternalLink>,{' '}
            <ExternalLink href="https://www.exploretock.com">Tock</ExternalLink>,{' '}
            <ExternalLink href="https://squareup.com">Square</ExternalLink>,
            and <ExternalLink href="https://vinoshipper.com">VinoShipper</ExternalLink> — pulling, normalizing, and categorizing revenue data
            into QuickBooks-ready reports every night.
          </motion.p>

          {/* Platform pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {PLATFORM_PILLS.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: p.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                {p.name}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/architecture"
                className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Explore the Architecture
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
