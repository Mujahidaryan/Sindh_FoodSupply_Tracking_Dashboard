// data/alerts.ts
import type { Alert, StatusLevel } from '@/lib/types'

const alertTemplates: Record<StatusLevel, { message: string; detail: string }[]> = {
  Critical: [
    { message: 'Severe food shortage detected', detail: 'Supply levels have dropped below 60% of demand threshold. Emergency distribution required.' },
    { message: 'Stock depletion imminent', detail: 'Current reserves will be exhausted within 12 days at current consumption rates.' },
    { message: 'Emergency ration activation required', detail: 'FAO emergency protocol ERP-7 should be initiated immediately for affected population.' },
    { message: 'Supply chain disruption', detail: 'Road infrastructure damage limiting inbound food convoys by 40%.' },
  ],
  Warning: [
    { message: 'Supply below 30-day buffer', detail: 'Reserves are at 22-day equivalent. Replenishment logistics must be expedited.' },
    { message: 'Demand surge observed', detail: 'Population movement from affected zones has increased district demand by approximately 18%.' },
    { message: 'Price volatility alert', detail: 'Wheat flour prices have risen 23% above baseline in local markets over 14 days.' },
    { message: 'Distribution delay noted', detail: 'Transport disruptions have delayed scheduled convoy by 72 hours.' },
  ],
  Stable: [
    { message: 'Supply within normal range', detail: 'All monitored commodities are above the 30-day buffer threshold.' },
    { message: 'Logistics on schedule', detail: 'All planned convoys have arrived within the delivery window.' },
    { message: 'Rations fully distributed', detail: 'Monthly ration cycle completed. No deficiencies reported in target households.' },
    { message: 'Market prices stable', detail: 'Commodity prices remain within ±5% of baseline across all monitored markets.' },
  ],
}

let alertIdCounter = 1

function makeAlerts(districtName: string, status: StatusLevel, count: number, baseMinutesAgo: number): Alert[] {
  const templates = alertTemplates[status]
  return Array.from({ length: count }, (_, i) => {
    const template = templates[i % templates.length]
    const minutesAgo = baseMinutesAgo + i * 17
    const ts = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()
    return {
      id: `alert-${alertIdCounter++}`,
      district: districtName,
      type: status,
      message: template.message,
      detail: template.detail,
      timestamp: ts,
      resolved: status === 'Stable' && i % 3 === 0,
    }
  })
}

export function generateAlerts(): Alert[] {
  const all: Alert[] = [
    ...makeAlerts('Thatta', 'Critical', 2, 5),
    ...makeAlerts('Badin', 'Critical', 2, 12),
    ...makeAlerts('Sukkur', 'Warning', 2, 30),
    ...makeAlerts('Larkana', 'Warning', 2, 45),
    ...makeAlerts('Karachi', 'Warning', 1, 60),
    ...makeAlerts('Hyderabad', 'Stable', 2, 90),
    ...makeAlerts('Mirpurkhas', 'Stable', 2, 120),
    ...makeAlerts('Dadu', 'Stable', 1, 140),
  ]
  return all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}
