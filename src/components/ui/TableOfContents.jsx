/** In-page navigation from heading anchors. */
export default function TableOfContents({ items }) {
  return (
    <nav className="glass-dark p-5 rounded-lg my-8">
      <p className="text-xs font-semibold text-cream/50 uppercase tracking-wider mb-3">On this page</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-sm text-cream/60 hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
