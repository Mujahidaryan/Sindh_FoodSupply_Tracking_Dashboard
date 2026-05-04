'use client'
// components/ui/DistrictBar.tsx
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { StatusChip } from './StatusChip'
import type { District } from '@/lib/types'
import Link from 'next/link'

export function DistrictBar({ district, delay = 0 }: { district: District; delay?: number }) {
  const [filled, setFilled] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const barColor =
    district.status === 'Critical' ? 'bg-gradient-to-r from-earth-red to-red-400' :
    district.status === 'Warning'  ? 'bg-gradient-to-r from-amber-harvest to-amber-warm' :
    'bg-gradient-to-r from-forest-500 to-forest-300'

  return (
    <Link href={`/districts/${district.id}`} className="block group">
      <div ref={ref} className="flex items-center gap-3 py-2 px-1 rounded-xl hover:bg-forest-50 transition-all duration-200 cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
        <div className="w-24 flex-shrink-0">
          <span className="text-sm font-medium text-forest-800 group-hover:text-forest-600 transition-colors">{district.name}</span>
        </div>
        <div className="flex-1 h-2 rounded-full bg-sage-100 overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-1000 ease-out', barColor)}
            style={{ width: filled ? `${district.coverage_percent}%` : '0%', transitionDelay: `${delay}ms` }}
          />
        </div>
        <div className="w-10 text-right text-xs font-semibold text-forest-700 flex-shrink-0">
          {district.coverage_percent}%
        </div>
        <div className="w-20 flex-shrink-0">
          <StatusChip status={district.status} />
        </div>
      </div>
    </Link>
  )
}
