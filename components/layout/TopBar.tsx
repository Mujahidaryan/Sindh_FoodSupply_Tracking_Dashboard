'use client'
// components/layout/TopBar.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const mobileNav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/districts', label: 'Districts' },
  { href: '/alerts', label: 'Alerts' },
]

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard Overview',
  '/districts': 'District Monitor',
  '/alerts': 'Alerts & Risk Feed',
}

export function TopBar() {
  const [clock, setClock] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleString('en-PK', {
          weekday: 'short', day: '2-digit', month: 'short',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        })
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const title = Object.entries(pageTitles).find(([k]) => pathname.startsWith(k))?.[1] ?? 'Dashboard'

  return (
    <header className="flex-shrink-0 h-14 bg-white border-b border-forest-100 flex items-center justify-between px-4 md:px-6 shadow-sm z-10">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg text-forest-600 hover:bg-forest-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div>
          <h2 className="text-sm font-semibold text-forest-900">{title}</h2>
          <p className="text-[10px] text-sage-500 hidden sm:block">Food Supply Tracking — Sindh Region</p>
        </div>
      </div>

      {/* Right: clock + status */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-50 border border-forest-200">
          <span className="w-2 h-2 rounded-full bg-forest-400 dot-pulse flex-shrink-0" />
          <span className="text-[11px] font-medium text-forest-600 font-mono">{clock}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-200">
          <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-forest-600 uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-forest-100 shadow-lg z-50 md:hidden">
          <nav className="flex flex-col p-3 gap-1">
            {mobileNav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  pathname.startsWith(item.href)
                    ? 'bg-forest-100 text-forest-700'
                    : 'text-sage-600 hover:bg-forest-50 hover:text-forest-700'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
