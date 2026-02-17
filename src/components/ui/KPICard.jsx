export default function KPICard({ label, value, trend, prefix = '', suffix = '' }) {
  const isUp = trend?.direction === 'up'
  const trendColor = isUp ? 'text-sage' : 'text-wine-light'
  const arrow = isUp ? '\u2191' : '\u2193'

  return (
    <div className="bg-parchment rounded-xl p-6 text-center">
      <p className="text-sm font-semibold text-cork uppercase tracking-wide mb-2">{label}</p>
      <p className="text-3xl font-bold text-slate font-[DM_Sans]">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
      {trend && (
        <p className={`text-sm mt-1 font-semibold ${trendColor}`}>
          {arrow} {Math.abs(trend.value)}% vs last month
        </p>
      )}
    </div>
  )
}
