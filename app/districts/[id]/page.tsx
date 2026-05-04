// app/districts/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDistrictById, districts, generateTrend } from '@/data/districts'
import { StatusChip } from '@/components/ui/StatusChip'
import { TrendChart } from '@/components/charts/TrendChart'
import { CommodityChart } from '@/components/charts/CommodityChart'
import { formatPopulation, formatDateTime } from '@/lib/utils'

export function generateStaticParams() {
  return districts.map(d => ({ id: d.id }))
}

export default function DistrictDetailPage({ params }: { params: { id: string } }) {
  const district = getDistrictById(params.id)
  if (!district) notFound()

  const trend = generateTrend(30)
  const commodityData = Object.entries(district.commodities).map(([k, v]) => ({
    name: k.charAt(0).toUpperCase() + k.slice(1).replace('_', ' '),
    value: v,
  }))

  const metrics = [
    { label: 'Population', value: formatPopulation(district.population), icon: '👥' },
    { label: 'Area', value: `${district.area_km2.toLocaleString()} km²`, icon: '📐' },
    { label: 'Supply', value: `${(district.supply_tons / 1000).toFixed(0)}K T`, icon: '🌾' },
    { label: 'Demand', value: `${(district.demand_tons / 1000).toFixed(0)}K T`, icon: '📦' },
    { label: 'Coverage', value: `${district.coverage_percent}%`, icon: '📊' },
    { label: 'Supply Gap', value: `${district.gap_percent}%`, icon: '⚠️' },
  ]

  const shortfall = district.demand_tons - district.supply_tons

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-sage-400">
        <Link href="/districts" className="hover:text-forest-600 transition-colors">Districts</Link>
        <span>/</span>
        <span className="text-forest-700 font-medium">{district.name}</span>
      </div>

      {/* Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="sec-kicker">// District Profile</p>
            <h1 className="sec-title text-3xl">{district.name}</h1>
            <p className="text-sm text-sage-500 mt-1">{district.division} Division · Sindh, Pakistan</p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <StatusChip status={district.status} />
              <span className="text-xs text-sage-400">Last updated: {formatDateTime(district.last_updated)}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`text-4xl font-heading italic ${district.gap_percent > 40 ? 'text-earth-red' : district.gap_percent > 20 ? 'text-amber-harvest' : 'text-forest-600'}`}>
              {district.gap_percent}%
            </div>
            <p className="text-xs text-sage-400 text-right">Supply Gap</p>
            <p className="text-xs font-semibold text-earth-red">
              {shortfall > 0 ? `Shortfall: ${(shortfall/1000).toFixed(0)}K T` : 'Surplus'}
            </p>
          </div>
        </div>

        {/* Coverage bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-sage-500 mb-1.5">
            <span>Supply Coverage</span>
            <span className="font-semibold text-forest-700">{district.coverage_percent}%</span>
          </div>
          <div className="h-3 rounded-full bg-sage-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                district.status === 'Critical' ? 'bg-gradient-to-r from-earth-red to-red-400' :
                district.status === 'Warning' ? 'bg-gradient-to-r from-amber-harvest to-amber-warm' :
                'bg-gradient-to-r from-forest-500 to-forest-300'
              }`}
              style={{ width: `${district.coverage_percent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-sage-400 mt-1">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="card p-4 text-center">
            <div className="text-xl mb-1">{m.icon}</div>
            <div className="font-heading italic text-xl text-forest-900">{m.value}</div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-sage-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-5">
          <p className="sec-kicker">// Commodity Mix</p>
          <h2 className="sec-title text-xl mb-2">Commodity Distribution</h2>
          <CommodityChart data={commodityData} />
        </div>
        <div className="card p-5">
          <p className="sec-kicker">// Trend</p>
          <h2 className="sec-title text-xl mb-2">30-Day Supply Trend</h2>
          <TrendChart data={trend} />
        </div>
      </div>

      {/* Risk assessment */}
      <div className="card p-5">
        <p className="sec-kicker">// Risk Assessment</p>
        <h2 className="sec-title text-xl mb-4">Situation Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${district.status === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-forest-50 border-forest-200'}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-500 mb-1">Food Security Status</p>
            <p className="text-sm font-medium text-forest-900">
              {district.status === 'Critical'
                ? 'Phase 4 — Acute food insecurity. Immediate humanitarian intervention required.'
                : district.status === 'Warning'
                ? 'Phase 3 — Stressed. Monitoring and targeted assistance recommended.'
                : 'Phase 1-2 — Minimal to stressed. Routine monitoring in place.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-forest-50 border border-forest-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-500 mb-1">Per Capita Supply</p>
            <p className="text-sm font-medium text-forest-900">
              {((district.supply_tons * 1000) / district.population / 365).toFixed(0)} g/person/day
              <span className="text-[10px] text-sage-400 block mt-0.5">Recommended: 450 g/person/day</span>
            </p>
          </div>
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-500 mb-1">Days of Stock</p>
            <p className="text-sm font-medium text-forest-900">
              {Math.round((district.supply_tons / district.demand_tons) * 365)} days at current supply
              <span className="text-[10px] text-sage-400 block mt-0.5">vs 90-day strategic reserve target</span>
            </p>
          </div>
        </div>
      </div>

      <Link href="/districts" className="btn-secondary inline-flex">
        ← Back to all districts
      </Link>
    </div>
  )
}
