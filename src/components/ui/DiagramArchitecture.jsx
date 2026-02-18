import { motion } from 'framer-motion'

/**
 * 4-tier architecture SVG: Platforms -> MCP Servers -> Claude Code/Cowork -> Outputs.
 * Brand colors per platform, clickable boxes linking to platform sites.
 */
const ease = [0.25, 0.46, 0.45, 0.94]

const PLATFORMS = [
  { name: 'Commerce7', color: '#8B4049', url: 'https://commerce7.com' },
  { name: 'Tock', color: '#2D2D2D', url: 'https://www.exploretock.com' },
  { name: 'Square', color: '#4A7EC4', url: 'https://squareup.com' },
  { name: 'VinoShipper', color: '#6B2D5B', url: 'https://vinoshipper.com' },
]

const MCP_SERVERS = [
  { name: 'C7 MCP', x: 12 },
  { name: 'Tock MCP', x: 207 },
  { name: 'Square MCP', x: 402 },
  { name: 'VS MCP', x: 597 },
]

const OUTPUTS = [
  { name: 'Google Sheets', url: 'https://sheets.google.com' },
  { name: 'QuickBooks', url: 'https://quickbooks.intuit.com' },
]

export default function DiagramArchitecture() {
  return (
    <svg viewBox="0 0 780 420" className="w-full max-w-4xl mx-auto" aria-label="4-tier architecture diagram">
      {/* SVG glow filter for hover */}
      <defs>
        <filter id="glow-arch" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Tier labels */}
      <text x="390" y="24" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fontFamily="DM Sans, sans-serif">PLATFORM LAYER</text>
      <text x="390" y="134" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fontFamily="DM Sans, sans-serif">MCP SERVERS</text>
      <text x="390" y="244" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fontFamily="DM Sans, sans-serif">AUTOMATION LAYER</text>
      <text x="390" y="354" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="10" fontWeight="700" letterSpacing="0.1em" fontFamily="DM Sans, sans-serif">OUTPUTS</text>

      {/* Tier 1: Platform boxes */}
      {PLATFORMS.map((p, i) => {
        const x = 12 + i * 195
        return (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
            <motion.g
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              whileHover={{ filter: 'url(#glow-arch)' }}
              style={{ cursor: 'pointer' }}
            >
              <rect x={x} y="36" width="175" height="44" rx="8" fill={p.color} />
              <text x={x + 87.5} y="63" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">{p.name}</text>
            </motion.g>
          </a>
        )
      })}

      {/* Connecting lines: Platforms -> MCP */}
      {[0, 1, 2, 3].map(i => {
        const x = 99.5 + i * 195
        return (
          <motion.line
            key={`p-mcp-${i}`}
            x1={x} y1="80" x2={x} y2="145"
            stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"
            className="animate-dash-flow"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
          />
        )
      })}

      {/* Tier 2: MCP Server boxes */}
      {MCP_SERVERS.map((m, i) => (
        <motion.g
          key={m.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
        >
          <rect x={m.x} y="145" width="175" height="40" rx="6" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
          <text x={m.x + 87.5} y="170" textAnchor="middle" fill="var(--color-text-secondary)" fontSize="12" fontWeight="600" fontFamily="DM Sans, sans-serif">{m.name}</text>
        </motion.g>
      ))}

      {/* Connecting lines: MCP -> Automation (converge) */}
      {[0, 1, 2, 3].map(i => {
        const x = 99.5 + i * 195
        return (
          <motion.line
            key={`mcp-auto-${i}`}
            x1={x} y1="185" x2={390} y2="255"
            stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"
            className="animate-dash-flow"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease }}
          />
        )
      })}

      {/* Tier 3: Automation box (wide, accent bg) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        style={{ transformOrigin: '390px 280px' }}
      >
        <rect x="140" y="255" width="500" height="55" rx="10" fill="var(--color-accent)" />
        <text x="390" y="278" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">Claude Code + Cowork</text>
        <text x="390" y="296" textAnchor="middle" fill="white" fontSize="11" opacity="0.7" fontFamily="DM Sans, sans-serif">Headless agent loop — 4 parallel sub-agents — nightly at 6:00 AM</text>
      </motion.g>

      {/* Connecting lines: Automation -> Outputs (diverge) */}
      {OUTPUTS.map((_, i) => {
        const targetX = 195 + i * 390
        return (
          <motion.line
            key={`auto-out-${i}`}
            x1={390} y1="310" x2={targetX} y2="365"
            stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"
            className="animate-dash-flow"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease }}
          />
        )
      })}

      {/* Tier 4: Output boxes */}
      {OUTPUTS.map((o, i) => {
        const x = 100 + i * 390
        return (
          <a key={o.name} href={o.url} target="_blank" rel="noopener noreferrer">
            <motion.g
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease }}
              whileHover={{ filter: 'url(#glow-arch)' }}
              style={{ cursor: 'pointer' }}
            >
              <rect x={x} y="365" width="190" height="44" rx="8" fill="var(--color-success)" opacity="0.9" />
              <text x={x + 95} y="392" textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">{o.name}</text>
            </motion.g>
          </a>
        )
      })}
    </svg>
  )
}
