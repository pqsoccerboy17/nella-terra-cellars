/** Styled callout block — 4 variants: info (sage), warning (gold), detail (wine), code (charcoal). */
const VARIANTS = {
  info: {
    border: 'border-sage/40',
    bg: 'bg-sage/10',
    icon: 'text-sage',
    iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    border: 'border-gold/40',
    bg: 'bg-gold/10',
    icon: 'text-gold',
    iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
  },
  detail: {
    border: 'border-wine/40',
    bg: 'bg-wine/10',
    icon: 'text-wine-light',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  code: {
    border: 'border-cream/10',
    bg: 'bg-charcoal',
    icon: 'text-cream/60',
    iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  },
}

export default function TechCallout({ variant = 'info', title, children }) {
  const v = VARIANTS[variant] || VARIANTS.info

  return (
    <div className={`${v.bg} ${v.border} border rounded-lg p-5 my-6`}>
      <div className="flex items-start gap-3">
        <svg className={`w-5 h-5 mt-0.5 shrink-0 ${v.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d={v.iconPath} />
        </svg>
        <div>
          {title && <p className="font-semibold text-cream mb-1">{title}</p>}
          <div className="docs-prose text-sm">{children}</div>
        </div>
      </div>
    </div>
  )
}
