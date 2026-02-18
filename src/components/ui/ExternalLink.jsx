/** Reusable external link with arrow-up-right icon. Opens in new tab. */
export default function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-accent hover:text-accent-dark underline underline-offset-2 transition-colors ${className}`}
    >
      {children}
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M3.5 1.5h7v7" />
        <path d="M10.5 1.5 1.5 10.5" />
      </svg>
    </a>
  )
}
