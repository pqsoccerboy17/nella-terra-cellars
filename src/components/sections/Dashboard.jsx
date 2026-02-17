import { useState, useEffect, useRef } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { monthlyRevenue, kpiByMonth, qbCategories, wines } from '../../data/dummy'
import KPICard from '../ui/KPICard'
import SKUTable from '../ui/SKUTable'

const MONTHS = ['Oct', 'Nov', 'Dec']

const CHANNEL_COLORS = {
  tastingRoom: '#722F37',
  wineClub: '#B8963E',
  online: '#6B8F6F',
  events: '#6B5B45',
}

const CHANNEL_LABELS = {
  tastingRoom: 'Tasting Room',
  wineClub: 'Wine Club',
  online: 'Online Sales',
  events: 'Events & Venue',
}

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  // Reset animation flag when target changes
  useEffect(() => {
    hasAnimated.current = false
    setCount(0)
    // Re-trigger observation
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          function tick(now) {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div className="bg-charcoal text-cream text-sm rounded-lg px-4 py-3 shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {CHANNEL_LABELS[entry.dataKey]}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState('Oct')
  const kpi = kpiByMonth[selectedMonth]
  const { count: heroCount, ref: heroRef } = useCountUp(kpi.totalRevenue)

  return (
    <section id="dashboard" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl text-slate font-bold text-center mb-4">
          Your Unified View
        </h2>
        <p className="text-center text-cork text-lg mb-10">
          Every number, from every platform, in one place.
        </p>

        {/* Month tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {MONTHS.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedMonth === m
                  ? 'bg-wine text-cream'
                  : 'bg-parchment text-cork hover:bg-oak/30'
              }`}
            >
              {m} 2024
            </button>
          ))}
        </div>

        {/* Hero revenue number */}
        <div ref={heroRef} className="text-center mb-10">
          <p className="font-display text-6xl md:text-8xl text-wine font-bold">
            ${heroCount.toLocaleString()}
          </p>
          <p className="text-cork text-lg mt-2">Total Revenue — {selectedMonth} 2024</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <KPICard
            label="Active Members"
            value={kpi.activeMembers}
            trend={kpi.trends.activeMembers}
          />
          <KPICard
            label="Avg Order Value"
            value={kpi.avgOrderValue}
            prefix="$"
            trend={kpi.trends.avgOrderValue}
          />
          <KPICard
            label="Tastings Booked"
            value={kpi.tastingsBooked}
            trend={kpi.trends.tastingsBooked}
          />
          <KPICard
            label="Time to Report"
            value={kpi.timeToReport}
          />
        </div>

        {/* Stacked bar chart — 12-month revenue */}
        <div className="bg-parchment rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-lg text-slate mb-4">Revenue by Channel — 12 Months</h3>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={monthlyRevenue} barCategoryGap="15%">
              <XAxis dataKey="month" tick={{ fill: '#6B5B45', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: '#6B5B45', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => CHANNEL_LABELS[value]}
                wrapperStyle={{ fontSize: 12 }}
              />
              <Bar dataKey="tastingRoom" stackId="a" fill={CHANNEL_COLORS.tastingRoom} radius={[0, 0, 0, 0]} />
              <Bar dataKey="wineClub" stackId="a" fill={CHANNEL_COLORS.wineClub} />
              <Bar dataKey="online" stackId="a" fill={CHANNEL_COLORS.online} />
              <Bar dataKey="events" stackId="a" fill={CHANNEL_COLORS.events} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* QuickBooks category bars */}
        <div className="bg-parchment rounded-xl p-6 mb-10">
          <h3 className="font-semibold text-lg text-slate mb-6">QuickBooks Category Breakdown</h3>
          <div className="space-y-4">
            {qbCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-slate">{cat.name}</span>
                  <span className="text-cork">${cat.amount.toLocaleString()} ({cat.pct}%)</span>
                </div>
                <div className="h-3 bg-oak/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-wine rounded-full"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SKU table */}
        <div className="mb-10">
          <h3 className="font-semibold text-lg text-slate mb-4">Wine Sales Detail</h3>
          <SKUTable wines={wines} />
        </div>

        {/* Banner */}
        <div className="bg-wine/10 border border-wine/20 rounded-xl p-6 text-center">
          <p className="text-lg font-semibold text-slate">
            This report used to take 3-4 hours.
            <span className="text-wine"> It now generates automatically every night.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
