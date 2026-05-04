// components/ui/StatusChip.tsx
import { cn } from '@/lib/utils'
import type { StatusLevel } from '@/lib/types'

const styles: Record<StatusLevel, string> = {
  Critical: 'bg-red-50 text-earth-red border border-red-200',
  Warning:  'bg-amber-50 text-amber-harvest border border-amber-200',
  Stable:   'bg-forest-50 text-forest-600 border border-forest-200',
}

const dotStyles: Record<StatusLevel, string> = {
  Critical: 'bg-earth-red dot-pulse',
  Warning:  'bg-amber-warm dot-pulse',
  Stable:   'bg-forest-400',
}

export function StatusChip({ status, showDot = true }: { status: StatusLevel; showDot?: boolean }) {
  return (
    <span className={cn('chip', styles[status])}>
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotStyles[status])} />}
      {status}
    </span>
  )
}
