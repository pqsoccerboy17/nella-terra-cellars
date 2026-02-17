import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GradientText from '../shared/GradientText'
import PageTransition from '../shared/PageTransition'

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
        <div className="absolute inset-0 bg-charcoal/75" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="section-label-light"
          >
            Automated Revenue Operations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-6xl text-cream font-bold leading-tight mb-6"
          >
            Four platforms. One&nbsp;agent.
            <br />
            <GradientText as="span" className="text-4xl md:text-6xl font-display font-bold">
              Zero manual exports.
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10"
          >
            Claude Code orchestrates MCP servers across Commerce7, Tock, Square,
            and VinoShipper — pulling, normalizing, and categorizing revenue data
            into QuickBooks-ready reports every night.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/architecture"
                className="inline-block bg-wine hover:bg-wine-dark text-cream px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
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
