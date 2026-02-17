import { motion } from 'framer-motion'

const PLATFORMS = [
  { name: 'Commerce7', color: '#4F46E5' },
  { name: 'Tock', color: '#059669' },
  { name: 'Square', color: '#000000' },
  { name: 'VinoShipper', color: '#9333EA' },
]

const OUTPUTS = [
  { name: 'Google Sheets', color: '#0F9D58' },
  { name: 'QuickBooks', color: '#2CA01C' },
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function FlowDiagram() {
  return (
    <svg viewBox="0 0 800 260" className="w-full max-w-3xl mx-auto" aria-label="Data flow diagram showing platforms connecting through automation to outputs">
      {/* Platform boxes — fly in from left */}
      {PLATFORMS.map((p, i) => {
        const y = 20 + i * 58
        return (
          <motion.g
            key={p.name}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
          >
            <rect x="10" y={y} width="160" height="42" rx="8" fill={p.color} opacity="0.9" />
            <text x="90" y={y + 26} textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
              {p.name}
            </text>
            <line x1="175" y1={y + 21} x2="295" y2="125" stroke="#C4A882" strokeWidth="1.5" opacity="0.5" />
          </motion.g>
        )
      })}

      {/* Center automation box — scale up */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        style={{ transformOrigin: '400px 125px' }}
      >
        <rect x="295" y="85" width="210" height="80" rx="12" fill="#722F37" />
        <text x="400" y="118" textAnchor="middle" fill="#F9F5EE" fontSize="14" fontWeight="700" fontFamily="DM Sans, sans-serif">
          Automation Layer
        </text>
        <text x="400" y="140" textAnchor="middle" fill="#F9F5EE" fontSize="11" opacity="0.7" fontFamily="DM Sans, sans-serif">
          Nightly sync + categorize
        </text>
      </motion.g>

      {/* Output boxes — fly in from right */}
      {OUTPUTS.map((o, i) => {
        const y = 65 + i * 80
        return (
          <motion.g
            key={o.name}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease }}
          >
            <line x1="510" y1="125" x2="600" y2={y + 21} stroke="#C4A882" strokeWidth="1.5" opacity="0.5" />
            <rect x="600" y={y} width="180" height="42" rx="8" fill={o.color} opacity="0.9" />
            <text x="690" y={y + 26} textAnchor="middle" fill="white" fontSize="13" fontWeight="600" fontFamily="DM Sans, sans-serif">
              {o.name}
            </text>
          </motion.g>
        )
      })}

      {/* Arrow indicators */}
      <polygon points="290,122 300,118 300,126" fill="#C4A882" opacity="0.7" />
      <polygon points="596,86 606,82 606,90" fill="#C4A882" opacity="0.7" />
      <polygon points="596,166 606,162 606,170" fill="#C4A882" opacity="0.7" />
    </svg>
  )
}
