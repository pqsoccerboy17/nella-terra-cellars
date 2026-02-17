import Hero from './components/sections/Hero'
import ValueProp from './components/sections/ValueProp'
import Platforms from './components/sections/Platforms'
import Dashboard from './components/sections/Dashboard'
import HowItWorks from './components/sections/HowItWorks'
import Footer from './components/ui/Footer'

const NAV_LINKS = [
  { label: 'The Problem', href: '#hero' },
  { label: 'What Changes', href: '#value' },
  { label: 'Your Data', href: '#platforms' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'How It Works', href: '#how' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-oak/20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-display text-lg text-cream font-bold tracking-wide">
            Nella Terra Cellars
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream/70 hover:text-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <Hero />
      <ValueProp />
      <Platforms />
      <Dashboard />
      <HowItWorks />
      <Footer />
    </div>
  )
}
