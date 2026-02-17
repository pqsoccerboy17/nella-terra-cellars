import { useState } from 'react'

const COLUMNS = [
  { key: 'name', label: 'Product' },
  { key: 'category', label: 'Category' },
  { key: 'unitsSold', label: 'Units' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'channel', label: 'Channel' },
]

export default function SKUTable({ wines }) {
  const [sortKey, setSortKey] = useState('revenue')
  const [sortAsc, setSortAsc] = useState(false)

  const sorted = [...wines].sort((a, b) => {
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === 'number') return sortAsc ? aVal - bVal : bVal - aVal
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal))
  })

  function handleSort(key) {
    if (key === sortKey) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(false)
    }
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-oak/30">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-3 text-left font-semibold text-cork cursor-pointer hover:text-slate select-none"
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1">{sortAsc ? '\u2191' : '\u2193'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((wine) => (
            <tr key={wine.name} className="border-b border-oak/15 hover:bg-parchment/50">
              <td className="px-4 py-3 font-semibold text-slate">{wine.name}</td>
              <td className="px-4 py-3 text-cork">{wine.category}</td>
              <td className="px-4 py-3 text-slate">{wine.unitsSold}</td>
              <td className="px-4 py-3 text-slate font-semibold">${wine.revenue.toLocaleString()}</td>
              <td className="px-4 py-3 text-cork">{wine.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
