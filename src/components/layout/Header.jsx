import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/dashboard', label: 'Dashboard' },
]

/**
 * Glassmorphic fixed header: transparent on top, blurred on scroll.
 * Mobile hamburger menu with AnimatePresence overlay.
 */
export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-charcoal/90 backdrop-blur-xl border-b border-oak/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="font-display text-lg text-cream font-bold tracking-wide">
            Nella Terra Cellars
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const isActive = pathname === link.to
              return (
                <span key={link.to} className="flex items-center">
                  {i > 0 && <span className="w-px h-4 bg-cream/20 mx-3" />}
                  <Link
                    to={link.to}
                    className={`relative text-sm transition-colors pb-1 ${
                      isActive
                        ? 'text-cream font-semibold'
                        : 'text-cream/70 hover:text-cream'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full" />
                    )}
                  </Link>
                </span>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-3 text-cream/70 hover:text-cream"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="relative flex flex-col items-center gap-6 pt-24 px-6"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-xl transition-colors ${
                      isActive
                        ? 'text-cream font-semibold'
                        : 'text-cream/60 hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/architecture"
                className="mt-4 inline-block bg-wine hover:bg-wine-dark text-cream px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Docs
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
