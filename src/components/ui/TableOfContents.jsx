/** In-page navigation from heading anchors. */
export default function TableOfContents({ items }) {
  return (
    <nav className="card-muted p-5 rounded-lg my-8">
      <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">On this page</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-base text-text-secondary hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
