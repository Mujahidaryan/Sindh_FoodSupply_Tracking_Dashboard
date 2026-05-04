// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import type { StatusLevel } from './types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

export function formatPopulation(n: number): string {
  return (n / 1_000_000).toFixed(2) + 'M'
}

export function formatTons(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'MT'
  return (n / 1_000).toFixed(0) + 'K T'
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-PK', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

export const statusConfig: Record<StatusLevel, { label: string; color: string; bg: string; border: string; dot: string }> = {
  Critical: {
    label: 'Critical',
    color: 'text-earth-red',
    bg: 'bg-red-50',
    border: 'border-red-200',
    dot: 'bg-earth-red',
  },
  Warning: {
    label: 'Warning',
    color: 'text-amber-harvest',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-warm',
  },
  Stable: {
    label: 'Stable',
    color: 'text-forest-500',
    bg: 'bg-forest-50',
    border: 'border-forest-200',
    dot: 'bg-forest-400',
  },
}

export function exportToCSV(rows: Record<string, string | number>[], filename: string) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => `"${r[h]}"`).join(',')),
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}
