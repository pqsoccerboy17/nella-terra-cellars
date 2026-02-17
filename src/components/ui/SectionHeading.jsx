/** h2/h3 with auto-generated anchor links and scroll-mt-24 for fixed header offset. */
export default function SectionHeading({ level = 2, id, children }) {
  const Tag = level === 3 ? 'h3' : 'h2'
  const anchor = id || children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

  const baseClasses = 'scroll-mt-24 font-display font-bold text-cream group'
  const sizeClasses = level === 3
    ? 'text-xl md:text-2xl mt-10 mb-4'
    : 'text-2xl md:text-3xl mt-14 mb-6'

  return (
    <Tag id={anchor} className={`${baseClasses} ${sizeClasses}`}>
      {children}
      <a
        href={`#${anchor}`}
        className="ml-2 text-gold/0 group-hover:text-gold/50 transition-colors text-lg"
        aria-label={`Link to ${children}`}
      >
        #
      </a>
    </Tag>
  )
}
