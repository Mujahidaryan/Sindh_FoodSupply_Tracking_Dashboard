// components/ui/Skeleton.tsx
import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton', className)} />
}

export function KpiSkeleton() {
  return (
    <div className="card p-5 border-l-4 border-l-sage-200">
      <Skeleton className="w-8 h-8 mb-3" />
      <Skeleton className="w-24 h-9 mb-2" />
      <Skeleton className="w-16 h-3 mb-2" />
      <Skeleton className="w-20 h-5 mt-3" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}
