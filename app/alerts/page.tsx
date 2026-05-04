'use client'
// app/alerts/page.tsx
import { useState, useMemo, useEffect } from 'react'
import { generateAlerts } from '@/data/alerts'
import { AlertItem } from '@/components/ui/AlertItem'
import type { Alert, StatusLevel } from '@/lib/types'

const FILTER_OPTIONS: (StatusLevel | 'all')[] = ['all', 'Critical', 'Warning', 'Stable']

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [filter, setFilter] = useState<StatusLevel | 'all'>('all')
  const [showResolved, setShowResolved] = useState(false)
  const [search, setSearch] = useState('')

  // Initial load + simulate live updates
  useEffect(() => {
    setAlerts(generateAlerts())
    const interval = setInterval(() => {
      setAlerts(generateAlerts())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const filtered = useMemo(() => {
    let a = [...alerts]
    if (filter !== 'all') a = a.filter(x => x.type === filter)
    if (!showResolved) a = a.filter(x => !x.resolved)
    if (search) a = a.filter(x =>
      x.district.toLowerCase().includes(search.toLowerCase()) ||
      x.message.toLowerCase().includes(search.toLowerCase())
    )
    return a
  }, [alerts, filter, showResolved, search])

  const counts = {
    Critical: alerts.filter(a => a.type === 'Critical').length,
    Warning:  alerts.filter(a => a.type === 'Warning').length,
    Stable:   alerts.filter(a => a.type === 'Stable').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="sec-kicker">// Alerts</p>
          <h1 className="sec-title text-2xl md:text-3xl">Alerts & Risk Feed</h1>
          <p className="text-sm text-sage-500 mt-1">
            Real-time simulated event monitoring · Auto-refreshes every 30 seconds
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 animate-pulse-slow">
          <span className="w-2 h-2 rounded-full bg-earth-red dot-pulse" />
          <span className="text-xs font-semibold text-earth-red">{counts.Critical} Critical Active</span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 border-l-4 border-l-earth-red">
          <div className="text-2xl font-heading italic text-forest-900">{counts.Critical}</div>
          <div className="text-xs font-semibold uppercase tracking-widest text-earth-red mt-1">Critical</div>
        </div>
        <div className="card p-4 border-l-4 border-l-amber-harvest">
          <div className="text-2xl font-heading italic text-forest-900">{counts.Warning}</div>
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-harvest mt-1">Warning</div>
        </div>
        <div className="card p-4 border-l-4 border-l-forest-400">
          <div className="text-2xl font-heading italic text-forest-900">{counts.Stable}</div>
          <div className="text-xs font-semibold uppercase tracking-widest text-forest-600 mt-1">Stable</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            className="input flex-1 min-w-[200px]"
            placeholder="Search district or issue…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border transition-all duration-200 ${
                  filter === f
                    ? f === 'Critical' ? 'bg-earth-red text-white border-earth-red'
                      : f === 'Warning' ? 'bg-amber-harvest text-white border-amber-harvest'
                      : f === 'Stable' ? 'bg-forest-500 text-white border-forest-500'
                      : 'bg-forest-700 text-white border-forest-700'
                    : 'bg-white text-sage-600 border-sage-200 hover:border-forest-300 hover:text-forest-700'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-sage-600 font-medium">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={e => setShowResolved(e.target.checked)}
              className="rounded accent-forest-500"
            />
            Show resolved
          </label>
        </div>
      </div>

      {/* Alert feed */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="sec-title text-lg">Event Timeline</h2>
          <span className="text-xs text-sage-400">{filtered.length} events</span>
        </div>
        {alerts.length === 0 ? (
          <div className="space-y-2">
            {Array.from({length:6}).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-sage-50 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-sage-400 text-sm">No alerts match your filters.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((alert, i) => (
              <div
                key={alert.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
              >
                <AlertItem alert={alert} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
