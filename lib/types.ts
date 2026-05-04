// lib/types.ts
export type StatusLevel = 'Critical' | 'Warning' | 'Stable'

export interface District {
  id: string
  name: string
  division: string
  population: number
  area_km2: number
  supply_tons: number
  demand_tons: number
  gap_percent: number
  coverage_percent: number
  status: StatusLevel
  coordinates: { lat: number; lng: number }
  commodities: {
    wheat: number
    rice: number
    pulses: number
    vegetables: number
    edible_oil: number
    sugar: number
  }
  last_updated: string
}

export interface Alert {
  id: string
  district: string
  type: StatusLevel
  message: string
  detail: string
  timestamp: string
  resolved: boolean
}

export interface Commodity {
  name: string
  supply_tons: number
  demand_tons: number
  unit_price_pkr: number
  trend: 'up' | 'down' | 'stable'
  change_percent: number
}

export interface TrendPoint {
  date: string
  supply: number
  demand: number
}

export interface Summary {
  total_supply: number
  total_demand: number
  total_population: number
  overall_gap: number
  critical_districts: number
  warning_districts: number
  stable_districts: number
  emergency_level: 'HIGH' | 'MODERATE' | 'LOW'
  last_updated: string
}
