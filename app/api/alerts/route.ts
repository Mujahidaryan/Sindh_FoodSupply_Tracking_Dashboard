// app/api/alerts/route.ts
import { NextResponse } from 'next/server'
import { generateAlerts } from '@/data/alerts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  let alerts = generateAlerts()
  if (type && type !== 'all') {
    alerts = alerts.filter(a => a.type.toLowerCase() === type.toLowerCase())
  }
  return NextResponse.json(alerts)
}
