import { useState, useCallback } from 'react'
import DocsHeader from './DocsHeader'
import Sidebar from './Sidebar'
import ScrollToTop from '../shared/ScrollToTop'

/** Sidebar + main content wrapper for all docs pages. Light bg, pt-16 for header offset. */
export default function DocsLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="min-h-screen bg-surface">
      <DocsHeader onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <ScrollToTop />
      <main className="pt-16 lg:pl-64">
        <div className="max-w-4xl mx-auto px-6 py-12 docs-prose">
          {children}
        </div>
      </main>
    </div>
  )
}
