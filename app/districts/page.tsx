'use client'
// app/districts/page.tsx
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { districts } from '@/data/districts'
import { StatusChip } from '@/components/ui/StatusChip'
import { formatPopulation, formatTons, exportToCSV } from '@/lib/utils'
import type { StatusLevel } from '@/lib/types'

type SortKey = 'name' | 'population' | 'supply_tons' | 'demand_tons' | 'gap_percent' | 'status'

export default function DistrictsPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusLevel | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const filtered = useMemo(() => {
    let d = [...districts]
    if (query) d = d.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    if (statusFilter !== 'all') d = d.filter(x => x.status === statusFilter)
    d.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * sortDir
      return ((av as number) - (bv as number)) * sortDir
    })
    return d
  }, [query, statusFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => (d === 1 ? -1 : 1))
    else { setSortKey(key); setSortDir(1) }
  }

  function handleExport() {
    exportToCSV(
      filtered.map(d => ({
        District: d.name, Division: d.division, Population: d.population,
        'Supply (T)': d.supply_tons, 'Demand (T)': d.demand_tons,
        'Gap (%)': d.gap_percent, 'Coverage (%)': d.coverage_percent, Status: d.status,
      })),
      'sindh-districts.csv'
    )
  }

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-sage-400">
      {sortKey === col ? (sortDir === 1 ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div className="space-y-6">
      <div>
        <p className="sec-kicker">// Districts</p>
        <h1 className="sec-title text-2xl md:text-3xl">District Supply Monitor</h1>
        <p className="text-sm text-sage-500 mt-1">
          Detailed supply, demand, and gap analysis for all 8 Sindh districts
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {(['Critical', 'Warning', 'Stable'] as StatusLevel[]).map(s => {
          const count = districts.filter(d => d.status === s).length
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}
              className={`card p-4 text-left transition-all duration-200 ${statusFilter === s ? 'ring-2 ring-forest-400' : ''} cursor-pointer`}
            >
              <div className="text-2xl font-heading italic text-forest-900">{count}</div>
              <StatusChip status={s} showDot />
            </button>
          )
        })}
      </div>

      {/* Table card */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <input
            className="input flex-1 min-w-[180px]"
            placeholder="Search district…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select
            className="input w-auto"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as StatusLevel | 'all')}
          >
            <option value="all">All Status</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Stable">Stable</option>
          </select>
          <button className="btn-secondary" onClick={handleExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-forest-100">
                {([
                  ['name', 'District'], ['population', 'Population'], ['supply_tons', 'Supply (T)'],
                  ['demand_tons', 'Demand (T)'], ['gap_percent', 'Gap %'], ['status', 'Status'],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key)}
                    className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-sage-500 cursor-pointer hover:text-forest-700 whitespace-nowrap select-none transition-colors"
                  >
                    {label}<SortIcon col={key} />
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-sage-500">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr
                  key={d.id}
                  className="border-b border-sage-100 hover:bg-forest-50 transition-all duration-150 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-forest-900">{d.name}</div>
                    <div className="text-[10px] text-sage-400">{d.division} Division</div>
                  </td>
                  <td className="px-4 py-3 text-sage-700">{formatPopulation(d.population)}</td>
                  <td className="px-4 py-3 text-forest-700 font-medium">{(d.supply_tons / 1000).toFixed(0)}K T</td>
                  <td className="px-4 py-3 text-sage-700">{(d.demand_tons / 1000).toFixed(0)}K T</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${d.gap_percent > 40 ? 'text-earth-red' : d.gap_percent > 20 ? 'text-amber-harvest' : 'text-forest-600'}`}>
                      {d.gap_percent}%
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusChip status={d.status} /></td>
                  <td className="px-4 py-3">
                    <Link href={`/districts/${d.id}`} className="btn-ghost py-1 px-2 text-xs">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sage-400 text-sm">No districts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-sage-400 mt-3">{filtered.length} of {districts.length} districts shown</p>
      </div>
    </div>
  )
}
