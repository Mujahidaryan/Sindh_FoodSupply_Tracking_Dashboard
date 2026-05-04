'use client'
// components/ui/KpiCard.tsx
import { cn } from '@/lib/utils'

interface KpiCardProps {
  icon: string
  label: string
  value: string
  badge?: string
  badgeType?: 'success' | 'warning' | 'danger' | 'info'
  delay?: number
  description?: string
}

const badgeStyles = {
  success: 'bg-forest-50 text-forest-600 border border-forest-200',
  warning: 'bg-amber-50 text-amber-harvest border border-amber-200',
  danger:  'bg-red-50 text-earth-red border border-red-200',
  info:    'bg-blue-50 text-blue-600 border border-blue-200',
}

const borderColors = [
  'border-l-forest-500',
  'border-l-olive-600',
  'border-l-forest-300',
  'border-l-amber-harvest',
  'border-l-earth-red',
]

export function KpiCard({ icon, label, value, badge, badgeType = 'success', delay = 0, description }: KpiCardProps) {
  return (
    <div
      className="card card-hover p-5 border-l-4 border-l-forest-500"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <div className="font-heading italic text-3xl lg:text-4xl text-forest-900 leading-none tracking-tight">
        {value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-widest text-sage-500 mt-2">{label}</div>
      {description && <div className="text-xs text-sage-400 mt-1">{description}</div>}
      {badge && (
        <span className={cn('chip text-[10px] mt-3', badgeStyles[badgeType])}>
          {badge}
        </span>
      )}
    </div>
  )
}
