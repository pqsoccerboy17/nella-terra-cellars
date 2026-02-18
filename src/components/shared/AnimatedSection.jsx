import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94]

/**
 * Scroll-triggered fade-up animation wrapper for <section> elements.
 * Uses whileInView to animate once when scrolled into view.
 */
export function AnimatedSection({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/**
 * Scroll-triggered fade-up wrapper for <div> elements.
 * Lighter animation — shorter distance and duration.
 */
export function AnimatedDiv({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Horizontal slide-in for diagrams. */
export function AnimatedSlideIn({ children, className = '', direction = 'left', delay = 0 }) {
  const x = direction === 'left' ? -40 : 40
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Parent container that staggers children. */
export function StaggerGrid({ children, className = '', stagger = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Child item that animates when parent StaggerGrid triggers. */
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
