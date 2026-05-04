// app/api/districts/route.ts
import { NextResponse } from 'next/server'
import { districts } from '@/data/districts'

export async function GET() {
  return NextResponse.json(districts, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
  })
}
