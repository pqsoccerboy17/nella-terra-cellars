import { useState } from 'react'

/** Monospace code display with title bar and copy button. */
export default function CodeBlock({ title, language, code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-lg border border-cream/10 overflow-hidden my-6">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate/80 border-b border-cream/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-wine-light/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-sage/60" />
          </div>
          {title && <span className="text-xs text-cream/50 ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-xs text-cream/30 uppercase tracking-wider">{language}</span>
          )}
          <button
            onClick={handleCopy}
            className="text-xs text-cream/40 hover:text-cream/70 transition-colors px-2 py-1 rounded hover:bg-cream/5"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto bg-charcoal text-sm leading-relaxed">
        <code className="text-cream/80 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
