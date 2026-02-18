export default function KPICard({ label, value, trend, prefix = '', suffix = '' }) {
  const isUp = trend?.direction === 'up'
  const trendColor = isUp ? 'text-success' : 'text-accent'
  const arrow = isUp ? '\u2191' : '\u2193'

  return (
    <div className="card p-6 text-center">
      <p className="text-base font-semibold text-text-secondary uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-text">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      {trend && (
        <p className={`text-base mt-1 font-semibold ${trendColor}`}>
          {arrow} {Math.abs(trend.value)}% vs last month
        </p>
      )}
    </div>
  )
}
