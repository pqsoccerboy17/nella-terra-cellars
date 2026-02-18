import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AnimatedSection } from '../shared/AnimatedSection'

export default function Footer() {
  return (
    <AnimatedSection className="relative bg-charcoal text-white/70 py-16 overflow-hidden">
      {/* Gradient top-border accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Grain overlay */}
      <div className="grain-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-4">
          Ready to build this for real?
        </h3>
        <p className="text-lg mb-6 max-w-xl mx-auto text-white/60">
          This demo shows what's possible. The integrations are real, the APIs are ready,
          and the automation can be live in weeks — not months.
        </p>
        <motion.a
          href="mailto:mike@yourco.dev"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Let's Talk
        </motion.a>

        <hr className="border-white/10 my-8 max-w-md mx-auto" />

        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/architecture" className="hover:text-white transition-colors">Architecture</Link>
          <Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link>
          <Link to="/pipeline" className="hover:text-white transition-colors">Pipeline</Link>
          <Link to="/orchestration" className="hover:text-white transition-colors">Orchestration</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>
        <p className="mt-8 text-sm text-white/40">
          Demo using representative data. All figures are illustrative.
          <br />
          Built by Mike Duncan — YourCo
        </p>
      </div>
    </AnimatedSection>
  )
}
