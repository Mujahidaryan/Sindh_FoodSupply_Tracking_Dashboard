// app/dashboard/page.tsx
import { Suspense } from 'react'
import { districts, getSummary, generateTrend } from '@/data/districts'
import { generateAlerts } from '@/data/alerts'
import { KpiCard } from '@/components/ui/KpiCard'
import { KpiSkeleton } from '@/components/ui/Skeleton'
import { DistrictBar } from '@/components/ui/DistrictBar'
import { AlertItem } from '@/components/ui/AlertItem'
import { CommodityChart } from '@/components/charts/CommodityChart'
import { GapBarChart } from '@/components/charts/GapBarChart'
import { TrendChart } from '@/components/charts/TrendChart'
import { formatTons, formatPopulation } from '@/lib/utils'

export const revalidate = 30

export default function DashboardPage() {
  const summary = getSummary()
  const trend = generateTrend(30)
  const alerts = generateAlerts().slice(0, 8)

  const commodityData = [
    { name: 'Wheat', value: 38 },
    { name: 'Rice', value: 22 },
    { name: 'Pulses', value: 12 },
    { name: 'Vegetables', value: 10 },
    { name: 'Edible Oil', value: 10 },
    { name: 'Sugar', value: 8 },
  ]

  type BadgeType = 'success' | 'warning' | 'danger' | 'info'
  const kpis: { icon: string; label: string; value: string; badge: string; badgeType: BadgeType; description?: string }[] = [
    {
      icon: '🌾',
      label: 'Total Food Supply',
      value: formatTons(summary.total_supply),
      badge: '+2.3% vs last month',
      badgeType: 'success',
      description: 'Aggregate supply across all districts',
    },
    {
      icon: '👥',
      label: 'Population Covered',
      value: formatPopulation(summary.total_population),
      badge: 'Sindh Region',
      badgeType: 'info',
      description: '8 monitored districts',
    },
    {
      icon: '📊',
      label: 'Overall Supply Gap',
      value: `${summary.overall_gap}%`,
      badge: summary.overall_gap > 30 ? 'Above threshold' : 'Monitored',
      badgeType: (summary.overall_gap > 30 ? 'danger' : 'warning') as BadgeType,
      description: `Demand exceeds supply by ${summary.overall_gap}%`,
    },
    {
      icon: '🔴',
      label: 'Critical Districts',
      value: `${summary.critical_districts}`,
      badge: `${summary.warning_districts} Warning`,
      badgeType: (summary.critical_districts >= 2 ? 'danger' : 'warning') as BadgeType,
      description: `${summary.stable_districts} districts stable`,
    },
    {
      icon: '🚨',
      label: 'Emergency Level',
      value: summary.emergency_level,
      badge: `${summary.critical_districts + summary.warning_districts} districts at risk`,
      badgeType: (summary.emergency_level === 'HIGH' ? 'danger' : summary.emergency_level === 'MODERATE' ? 'warning' : 'success') as BadgeType,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="sec-kicker">// Overview</p>
          <h1 className="sec-title text-2xl md:text-3xl">Sindh Food Security Monitor</h1>
          <p className="text-sm text-sage-500 mt-1">
            Humanitarian logistics tracking · {new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200">
          <span className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
          <span className="text-xs font-semibold text-forest-600 uppercase tracking-wide">
            {summary.emergency_level} Alert
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <Suspense fallback={<>{Array.from({length:5}).map((_,i)=><KpiSkeleton key={i}/>)}</>}>
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.label} {...kpi} delay={i * 80} />
          ))}
        </Suspense>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* District coverage — takes 2 cols */}
        <div className="xl:col-span-2 card p-5">
          <p className="sec-kicker">// District Coverage</p>
          <h2 className="sec-title text-xl mb-4">Supply Coverage by District</h2>
          <div className="space-y-1">
            {districts.map((d, i) => (
              <DistrictBar key={d.id} district={d} delay={i * 60} />
            ))}
          </div>
          <p className="text-[10px] text-sage-400 mt-4">
            Click any district to view detailed analytics →
          </p>
        </div>

        {/* Alerts panel */}
        <div className="card p-5 flex flex-col">
          <p className="sec-kicker">// Live Feed</p>
          <h2 className="sec-title text-xl mb-4">Alerts & Risk Monitor</h2>
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[500px] pr-1">
            {alerts.map(alert => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
          <a href="/alerts" className="btn-ghost text-xs mt-3 self-start">
            View all alerts →
          </a>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-5">
          <p className="sec-kicker">// Commodity</p>
          <h2 className="sec-title text-xl mb-2">Supply Breakdown</h2>
          <CommodityChart data={commodityData} />
        </div>
        <div className="card p-5">
          <p className="sec-kicker">// Gap Analysis</p>
          <h2 className="sec-title text-xl mb-2">Supply vs Demand</h2>
          <GapBarChart districts={districts} />
        </div>
      </div>

      {/* Trend chart */}
      <div className="card p-5">
        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
          <div>
            <p className="sec-kicker">// Temporal Simulation</p>
            <h2 className="sec-title text-xl">30-Day Supply Trend</h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-sage-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-forest-500 rounded inline-block"/><span>Supply</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-harvest rounded inline-block border-dashed border-t-2 border-amber-harvest"/><span>Demand</span></span>
          </div>
        </div>
        <TrendChart data={trend} />
      </div>

      {/* Footer note */}
      <p className="text-center text-[10px] text-sage-400 uppercase tracking-widest py-2">
        Prototype · Aligned with FAO/WFP international food security monitoring standards · Sindh Food Authority
      </p>
    </div>
  )
}
