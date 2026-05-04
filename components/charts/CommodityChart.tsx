'use client'
// components/charts/CommodityChart.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#1a5c2d', '#227539', '#2d9e50', '#4dbe70', '#4a6741', '#82d49e']

const RADIAN = Math.PI / 180
function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  if (percent < 0.06) return null
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

interface Props {
  data: { name: string; value: number }[]
}

export function CommodityChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
          label={renderLabel}
          animationBegin={0}
          animationDuration={1200}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
          ))}
        </Pie>
        <Tooltip
          formatter={(v: number) => [`${v}%`, 'Share']}
          contentStyle={{ background: '#fff', border: '1px solid #c0eacc', borderRadius: 10, fontSize: 12 }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => <span style={{ fontSize: 11, color: '#2c5440' }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
