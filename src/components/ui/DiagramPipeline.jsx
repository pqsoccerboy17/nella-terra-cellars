import { motion } from 'framer-motion'

/**
 * Vertical pipeline SVG: Pull → Normalize → Categorize → Reconcile → Output.
 * Each stage animates in sequence on scroll.
 */
const ease = [0.25, 0.46, 0.45, 0.94]

const STAGES = [
  { label: 'Pull', detail: '4 APIs via MCP servers', color: '#4F46E5', icon: '↓' },
  { label: 'Normalize', detail: 'Common order schema', color: '#6B8F6F', icon: '⟳' },
  { label: 'Categorize', detail: 'QB account mapping', color: '#B8963E', icon: '▦' },
  { label: 'Reconcile', detail: 'Cross-platform dedup', color: '#722F37', icon: '⇄' },
  { label: 'Output', detail: 'Sheets + QuickBooks', color: '#059669', icon: '✓' },
]

export default function DiagramPipeline() {
  const stageHeight = 64
  const gap = 30
  const startY = 20
  const totalHeight = startY + STAGES.length * (stageHeight + gap) + 10

  return (
    <svg viewBox={`0 0 500 ${totalHeight}`} className="w-full max-w-md mx-auto" aria-label="Data pipeline diagram showing 5 transformation stages">
      {STAGES.map((stage, i) => {
        const y = startY + i * (stageHeight + gap)
        return (
          <motion.g
            key={stage.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15, ease }}
          >
            {/* Stage box */}
            <rect x="60" y={y} width="380" height={stageHeight} rx="10" fill={stage.color} opacity="0.9" />

            {/* Step number circle */}
            <circle cx="95" cy={y + stageHeight / 2} r="14" fill="rgba(255,255,255,0.2)" />
            <text x="95" y={y + stageHeight / 2 + 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif">{i + 1}</text>

            {/* Label + detail */}
            <text x="125" y={y + 27} fill="white" fontSize="15" fontWeight="700" fontFamily="DM Sans, sans-serif">{stage.label}</text>
            <text x="125" y={y + 46} fill="white" fontSize="12" opacity="0.7" fontFamily="DM Sans, sans-serif">{stage.detail}</text>

            {/* Icon on right */}
            <text x="410" y={y + stageHeight / 2 + 6} textAnchor="middle" fill="white" fontSize="18" opacity="0.5">{stage.icon}</text>

            {/* Connecting arrow (except last) */}
            {i < STAGES.length - 1 && (
              <motion.line
                x1="250" y1={y + stageHeight} x2="250" y2={y + stageHeight + gap}
                stroke="#C4A882" strokeWidth="2" strokeDasharray="4 3" opacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease }}
              />
            )}
          </motion.g>
        )
      })}
    </svg>
  )
}
