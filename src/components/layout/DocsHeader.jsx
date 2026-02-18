import { Link, useLocation } from 'react-router-dom'
import { docsNav } from '../../data/docs-nav'
import useTheme from '../../hooks/useTheme'

/** Solid white header for docs pages — always opaque, breadcrumb, sidebar toggle. */
export default function DocsHeader({ onToggleSidebar }) {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  const currentItem = docsNav
    .flatMap(s => s.items)
    .find(item => item.path === pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-alt border-b border-border">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {/* Mobile sidebar toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-text-secondary hover:text-text transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-lg text-text font-bold tracking-wide">
            Nella Terra Cellars
          </Link>

          {/* Breadcrumb */}
          {currentItem && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-border">/</span>
              <span className="text-text-secondary">{currentItem.label}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Dark/light toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-text-secondary hover:text-text transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Link back to landing */}
          <Link
            to="/"
            className="text-sm text-text-secondary hover:text-text transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </header>
  )
}
