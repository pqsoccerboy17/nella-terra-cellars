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
    <div className="rounded-lg border border-border overflow-hidden my-6">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-code-bg border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          {title && <span className="text-sm text-white/50 ml-2">{title}</span>}
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span className="text-sm text-white/30 uppercase tracking-wider">{language}</span>
          )}
          <button
            onClick={handleCopy}
            className="text-sm text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded hover:bg-white/5"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto bg-code-bg text-[15px] leading-relaxed">
        <code className="text-white/80 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}
