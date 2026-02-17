export default function PlatformCard({ name, color, metrics, description }) {
  return (
    <div className="group relative glass glass-hover glass-shimmer p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-semibold text-lg text-slate">{name}</h3>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-sage">
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse-dot" />
          Connected
        </span>
      </div>

      {/* Metrics */}
      <div className="space-y-2 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex justify-between text-sm">
            <span className="text-cork">{m.label}</span>
            <span className="font-semibold text-slate">{m.value}</span>
          </div>
        ))}
      </div>

      {/* Hover description */}
      <p className="text-sm text-cork/0 group-hover:text-cork transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}
