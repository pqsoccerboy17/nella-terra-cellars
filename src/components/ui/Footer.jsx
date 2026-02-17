import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../shared/AnimatedSection'

export default function Footer() {
  return (
    <AnimatedSection className="bg-charcoal text-cream/70 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="font-display text-2xl text-cream font-bold mb-4">
          Ready to build this for real?
        </h3>
        <p className="text-lg mb-6 max-w-xl mx-auto">
          This demo shows what's possible. The integrations are real, the APIs are ready,
          and the automation can be live in weeks — not months.
        </p>
        <motion.a
          href="mailto:mike@yourco.dev"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-wine hover:bg-wine-dark text-cream px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Let's Talk
        </motion.a>
        <div className="mt-8 flex justify-center gap-6 text-sm text-cream/50">
          <Link to="/" className="hover:text-cream transition-colors">Home</Link>
          <Link to="/value" className="hover:text-cream transition-colors">What Changes</Link>
          <Link to="/platforms" className="hover:text-cream transition-colors">Your Data</Link>
          <Link to="/dashboard" className="hover:text-cream transition-colors">Dashboard</Link>
          <Link to="/how-it-works" className="hover:text-cream transition-colors">How It Works</Link>
        </div>
        <p className="mt-8 text-sm text-cream/40">
          Demo using representative data. All figures are illustrative.
          <br />
          Built by Mike Duncan — YourCo
        </p>
      </div>
    </AnimatedSection>
  )
}
