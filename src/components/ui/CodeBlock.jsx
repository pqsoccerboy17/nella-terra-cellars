import { useState, useMemo } from 'react'

/** Escape HTML entities before wrapping with highlight spans. */
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Simple regex-based syntax highlighting for JSON, JS, and Bash. */
function highlightCode(code, language) {
  const escaped = esc(code)
  const lang = (language || '').toLowerCase()

  if (lang === 'json') {
    return escaped
      .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="code-key">$1</span>$2')
      .replace(/:(\s*)("(?:[^"\\]|\\.)*")/g, ':$1<span class="code-string">$2</span>')
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
  }

  if (lang === 'javascript') {
    return escaped
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|new|import|export|default|from|map|filter)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="code-string">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>')
      .replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="code-string">$1</span>')
  }

  if (lang === 'bash') {
    return escaped
      .replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/\b(claude|node|npx|cat|echo)\b/g, '<span class="code-keyword">$1</span>')
      .replace(/(--?\w[\w-]*)/g, '<span class="code-flag">$1</span>')
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="code-string">$1</span>')
  }

  return escaped
}

/** Monospace code display with title bar, copy button, and syntax highlighting. */
export default function CodeBlock({ title, language, code }) {
  const [copied, setCopied] = useState(false)
  const highlighted = useMemo(() => highlightCode(code, language), [code, language])

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
      {/* Code content with syntax highlighting */}
      <pre className="p-4 overflow-x-auto bg-code-bg text-[15px] leading-relaxed">
        <code
          className="text-white/80 font-mono whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  )
}
