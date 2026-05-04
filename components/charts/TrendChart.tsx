'use client'
// components/charts/TrendChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { TrendPoint } from '@/lib/types'

interface Props {
  data: TrendPoint[]
}

export function TrendChart({ data }: Props) {
  const formatted = data.map(d => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-PK', { day: '2-digit', month: 'short' }),
    supply: Math.round(d.supply / 1000),
    demand: Math.round(d.demand / 1000),
  }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={formatted} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#5a8870' }} axisLine={false} tickLine={false}
          interval={Math.floor(formatted.length / 6)} />
        <YAxis tick={{ fontSize: 9, fill: '#5a8870' }} axisLine={false} tickLine={false}
          tickFormatter={v => v + 'K'} width={34} />
        <Tooltip
          formatter={(v: number, name: string) => [`${v}K T`, name]}
          contentStyle={{ background: '#fff', border: '1px solid #c0eacc', borderRadius: 10, fontSize: 11 }}
          labelStyle={{ color: '#2c5440', fontWeight: 600 }}
        />
        <Legend iconType="circle" iconSize={7}
          formatter={v => <span style={{ fontSize: 11, color: '#2c5440' }}>{v}</span>} />
        <Line type="monotone" dataKey="supply" stroke="#2d9e50" strokeWidth={2} dot={false}
          name="Supply (K T)" animationDuration={1600} />
        <Line type="monotone" dataKey="demand" stroke="#c9890e" strokeWidth={2} dot={false}
          name="Demand (K T)" strokeDasharray="5 3" animationDuration={1600} />
      </LineChart>
    </ResponsiveContainer>
  )
}
