import { Link, useLocation } from 'react-router-dom'
import { docsNav } from '../../data/docs-nav'

/** Solid charcoal header for docs pages — always opaque, breadcrumb, sidebar toggle. */
export default function DocsHeader({ onToggleSidebar }) {
  const { pathname } = useLocation()

  const currentItem = docsNav
    .flatMap(s => s.items)
    .find(item => item.path === pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal border-b border-cream/10">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-cream/60 hover:text-cream transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-lg text-cream font-bold tracking-wide">
            Nella Terra Cellars
          </Link>

          {/* Breadcrumb */}
          {currentItem && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-cream/30">/</span>
              <span className="text-cream/60">{currentItem.label}</span>
            </div>
          )}
        </div>

        {/* Right: link back to landing */}
        <Link
          to="/"
          className="text-sm text-cream/50 hover:text-cream transition-colors"
        >
          Home
        </Link>
      </div>
    </header>
  )
}
