import { motion } from 'framer-motion'

/**
 * Agent tree SVG: Cron → Main Agent → 4 parallel Cowork agents → Aggregate.
 * Shows the orchestration topology with timing annotations.
 */
const ease = [0.25, 0.46, 0.45, 0.94]

const AGENTS = [
  { name: 'C7 Agent', color: '#4F46E5', time: '~12s' },
  { name: 'Tock Agent', color: '#059669', time: '~8s' },
  { name: 'Square Agent', color: '#2D2A26', time: '~10s' },
  { name: 'VS Agent', color: '#9333EA', time: '~6s' },
]

export default function DiagramOrchestration() {
  return (
    <svg viewBox="0 0 700 380" className="w-full max-w-3xl mx-auto" aria-label="Orchestration diagram showing cron trigger, main agent, parallel cowork agents, and aggregation">
      {/* Cron trigger */}
      <motion.g
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <rect x="260" y="10" width="180" height="40" rx="20" fill="none" stroke="#B8963E" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x="350" y="35" textAnchor="middle" fill="#B8963E" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">Cron — 6:00 AM</text>
      </motion.g>

      {/* Arrow: Cron → Main */}
      <motion.line
        x1="350" y1="50" x2="350" y2="80"
        stroke="#C4A882" strokeWidth="2" opacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3, ease }}
      />

      {/* Main Agent box */}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        style={{ transformOrigin: '350px 110px' }}
      >
        <rect x="200" y="80" width="300" height="55" rx="10" fill="#722F37" />
        <text x="350" y="103" textAnchor="middle" fill="#F9F5EE" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">Main Claude Code Agent</text>
        <text x="350" y="121" textAnchor="middle" fill="#F9F5EE" fontSize="11" opacity="0.7" fontFamily="DM Sans, sans-serif">Headless mode — orchestrates all pulls</text>
      </motion.g>

      {/* Fan-out lines: Main → 4 agents */}
      {AGENTS.map((_, i) => {
        const targetX = 52 + i * 200
        return (
          <motion.line
            key={`fan-${i}`}
            x1="350" y1="135" x2={targetX + 75} y2="185"
            stroke="#C4A882" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease }}
          />
        )
      })}

      {/* Cowork label */}
      <motion.text
        x="350" y="172"
        textAnchor="middle" fill="#B8963E" fontSize="10" fontWeight="700" letterSpacing="0.1em" fontFamily="DM Sans, sans-serif"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5, ease }}
      >
        COWORK — PARALLEL EXECUTION
      </motion.text>

      {/* 4 parallel agent boxes */}
      {AGENTS.map((agent, i) => {
        const x = 52 + i * 160
        return (
          <motion.g
            key={agent.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease }}
          >
            <rect x={x} y="185" width="140" height="60" rx="8" fill={agent.color} opacity="0.85" />
            <text x={x + 70} y="212" textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="DM Sans, sans-serif">{agent.name}</text>
            <text x={x + 70} y="232" textAnchor="middle" fill="white" fontSize="10" opacity="0.6" fontFamily="DM Sans, sans-serif">{agent.time}</text>
          </motion.g>
        )
      })}

      {/* Fan-in lines: 4 agents → Aggregate */}
      {AGENTS.map((_, i) => {
        const sourceX = 52 + i * 160 + 70
        return (
          <motion.line
            key={`fan-in-${i}`}
            x1={sourceX} y1="245" x2="350" y2="300"
            stroke="#C4A882" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease }}
          />
        )
      })}

      {/* Aggregate box */}
      <motion.g
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.0, ease }}
      >
        <rect x="200" y="300" width="300" height="55" rx="10" fill="#6B8F6F" />
        <text x="350" y="323" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">Aggregate + Categorize</text>
        <text x="350" y="341" textAnchor="middle" fill="white" fontSize="11" opacity="0.7" fontFamily="DM Sans, sans-serif">Normalize → Reconcile → Write to Sheets + QB</text>
      </motion.g>

      {/* Timing annotation */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2, ease }}
      >
        <text x="650" y="220" textAnchor="end" fill="#B8963E" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif">Wall clock:</text>
        <text x="650" y="236" textAnchor="end" fill="#B8963E" fontSize="18" fontWeight="700" fontFamily="DM Sans, sans-serif">~35s</text>
        <text x="650" y="254" textAnchor="end" fill="#C4A882" fontSize="10" opacity="0.6" fontFamily="DM Sans, sans-serif">(vs ~2 min sequential)</text>
      </motion.g>
    </svg>
  )
}
