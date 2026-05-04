// components/ui/AlertItem.tsx
import { cn, timeAgo } from '@/lib/utils'
import type { Alert } from '@/lib/types'

const dotStyles = {
  Critical: 'bg-earth-red shadow-[0_0_6px_rgba(184,64,64,0.7)] dot-pulse',
  Warning:  'bg-amber-warm shadow-[0_0_6px_rgba(224,160,32,0.6)] dot-pulse',
  Stable:   'bg-forest-400',
}

const borderStyles = {
  Critical: 'border-red-100 hover:border-red-200',
  Warning:  'border-amber-100 hover:border-amber-200',
  Stable:   'border-forest-100 hover:border-forest-200',
}

const bgStyles = {
  Critical: 'hover:bg-red-50/50',
  Warning:  'hover:bg-amber-50/50',
  Stable:   'hover:bg-forest-50/50',
}

export function AlertItem({ alert }: { alert: Alert }) {
  return (
    <div className={cn(
      'flex gap-3 p-3 rounded-xl border transition-all duration-200',
      borderStyles[alert.type],
      bgStyles[alert.type],
      alert.resolved && 'opacity-50'
    )}>
      <div className="pt-0.5 flex-shrink-0">
        <span className={cn('block w-2.5 h-2.5 rounded-full', dotStyles[alert.type])} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-forest-900 leading-snug">
            {alert.district} — {alert.message}
          </p>
          {alert.resolved && (
            <span className="text-[9px] font-semibold uppercase tracking-wide text-sage-400 bg-sage-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
              Resolved
            </span>
          )}
        </div>
        <p className="text-[11px] text-sage-500 mt-0.5 leading-snug">{alert.detail}</p>
        <p className="text-[10px] text-sage-400 mt-1 italic">{timeAgo(alert.timestamp)}</p>
      </div>
    </div>
  )
}
