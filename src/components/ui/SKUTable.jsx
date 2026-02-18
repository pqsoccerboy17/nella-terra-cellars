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
    <div className="card overflow-x-auto">
      <table className="w-full text-base">
        <thead>
          <tr className="border-b border-border">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-3 text-left font-semibold text-text-secondary cursor-pointer hover:text-text select-none"
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
            <tr key={wine.name} className="border-b border-border hover:bg-surface">
              <td className="px-4 py-3 font-semibold text-text">{wine.name}</td>
              <td className="px-4 py-3 text-text-secondary">{wine.category}</td>
              <td className="px-4 py-3 text-text">{wine.unitsSold}</td>
              <td className="px-4 py-3 text-text font-semibold">${wine.revenue.toLocaleString()}</td>
              <td className="px-4 py-3 text-text-secondary">{wine.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
