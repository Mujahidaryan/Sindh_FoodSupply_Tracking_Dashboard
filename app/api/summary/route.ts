// app/api/summary/route.ts
import { NextResponse } from 'next/server'
import { getSummary } from '@/data/districts'

export async function GET() {
  return NextResponse.json(getSummary(), {
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=120' },
  })
}
