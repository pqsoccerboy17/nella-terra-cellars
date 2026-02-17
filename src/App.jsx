import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import ScrollToTop from './components/shared/ScrollToTop'
import Hero from './components/sections/Hero'
import ValueProp from './components/sections/ValueProp'
import Platforms from './components/sections/Platforms'
import Dashboard from './components/sections/Dashboard'
import HowItWorks from './components/sections/HowItWorks'
import Footer from './components/ui/Footer'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/value" element={<ValueProp />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
