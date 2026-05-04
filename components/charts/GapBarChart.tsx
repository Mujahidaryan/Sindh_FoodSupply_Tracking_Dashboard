'use client'
// components/charts/GapBarChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { District } from '@/lib/types'

interface Props {
  districts: District[]
}

export function GapBarChart({ districts }: Props) {
  const data = districts.map(d => ({
    name: d.name.length > 7 ? d.name.slice(0, 7) : d.name,
    Supply: Math.round(d.supply_tons / 1000),
    Demand: Math.round(d.demand_tons / 1000),
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={14} barGap={3}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#5a8870' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#5a8870' }} axisLine={false} tickLine={false}
          tickFormatter={v => v + 'K'} width={36} />
        <Tooltip
          formatter={(v: number, name: string) => [`${v}K T`, name]}
          contentStyle={{ background: '#fff', border: '1px solid #c0eacc', borderRadius: 10, fontSize: 12 }}
        />
        <Legend iconType="circle" iconSize={7}
          formatter={v => <span style={{ fontSize: 11, color: '#2c5440' }}>{v}</span>} />
        <Bar dataKey="Supply" fill="#2d9e50" radius={[4,4,0,0]} animationDuration={1400} />
        <Bar dataKey="Demand" fill="#c9890e" radius={[4,4,0,0]} opacity={0.75} animationDuration={1400} />
      </BarChart>
    </ResponsiveContainer>
  )
}
