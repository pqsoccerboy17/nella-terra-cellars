export default function PlatformCard({ name, color, metrics, description }) {
  return (
    <div className="group relative card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-semibold text-lg text-text">{name}</h3>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
          Connected
        </span>
      </div>

      {/* Metrics */}
      <div className="space-y-2 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex justify-between text-base">
            <span className="text-text-secondary">{m.label}</span>
            <span className="font-semibold text-text">{m.value}</span>
          </div>
        ))}
      </div>

      {/* Hover description */}
      <p className="text-base text-text-secondary/0 group-hover:text-text-secondary transition-colors duration-300">
        {description}
      </p>
    </div>
  )
}
