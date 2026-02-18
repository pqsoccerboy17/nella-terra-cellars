import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { docsNav } from '../../data/docs-nav'

/** Hierarchical sidebar nav with section groups, active state, mobile overlay. */
export default function Sidebar({ open, onClose }) {
  const { pathname } = useLocation()

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const sidebarContent = (
    <nav className="py-6 px-4">
      {docsNav.map((section) => (
        <div key={section.label} className="mb-6">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 px-3">
            {section.label}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.path
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-accent-light text-accent font-semibold border-l-2 border-accent'
                        : 'text-text-secondary hover:text-text hover:bg-surface'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <aside className="hidden lg:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-surface-alt border-r border-border overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative w-64 h-full bg-surface-alt border-r border-border overflow-y-auto pt-16">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
