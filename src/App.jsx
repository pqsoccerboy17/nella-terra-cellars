import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import DocsLayout from './components/layout/DocsLayout'
import ScrollToTop from './components/shared/ScrollToTop'
import Hero from './components/sections/Hero'
import Architecture from './components/sections/Architecture'
import Integrations from './components/sections/Integrations'
import Pipeline from './components/sections/Pipeline'
import Orchestration from './components/sections/Orchestration'
import DashboardDocs from './components/sections/DashboardDocs'
import Footer from './components/ui/Footer'

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    )
  }

  return (
    <DocsLayout>
      <Routes location={location} key={location.pathname}>
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/orchestration" element={<Orchestration />} />
        <Route path="/dashboard" element={<DashboardDocs />} />
      </Routes>
    </DocsLayout>
  )
}
