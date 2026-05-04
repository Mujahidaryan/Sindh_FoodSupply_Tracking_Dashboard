// data/districts.ts
import type { District, StatusLevel } from '@/lib/types'

// Food consumption: ~2,100 kcal/day/person → ~0.45 kg grain equivalent/day → ~164 kg/year → ~0.164 T/year/person
// We apply a realistic ratio per district based on urbanization and existing supply chains
const CONSUMPTION_KG_PER_PERSON_YEAR = 164 // kg/person/year (FAO South Asia baseline)

function calcGap(supply: number, demand: number) {
  return Math.round(((demand - supply) / demand) * 100)
}
function calcCoverage(supply: number, demand: number) {
  return Math.min(100, Math.round((supply / demand) * 100))
}
function calcStatus(gap: number): StatusLevel {
  if (gap > 40) return 'Critical'
  if (gap > 20) return 'Warning'
  return 'Stable'
}

const rawDistricts = [
  {
    id: 'karachi',
    name: 'Karachi',
    division: 'Karachi',
    population: 16_097_000,
    area_km2: 3_527,
    supply_tons: 1_980_000,
    coordinates: { lat: 24.8607, lng: 67.0011 },
    commodities: { wheat: 52, rice: 18, pulses: 10, vegetables: 9, edible_oil: 6, sugar: 5 },
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    division: 'Hyderabad',
    population: 2_151_000,
    area_km2: 1_012,
    supply_tons: 254_000,
    coordinates: { lat: 25.3960, lng: 68.3578 },
    commodities: { wheat: 48, rice: 20, pulses: 12, vegetables: 10, edible_oil: 6, sugar: 4 },
  },
  {
    id: 'sukkur',
    name: 'Sukkur',
    division: 'Sukkur',
    population: 1_224_000,
    area_km2: 5_165,
    supply_tons: 118_000,
    coordinates: { lat: 27.7244, lng: 68.8574 },
    commodities: { wheat: 55, rice: 22, pulses: 9, vegetables: 7, edible_oil: 4, sugar: 3 },
  },
  {
    id: 'larkana',
    name: 'Larkana',
    division: 'Larkana',
    population: 1_521_000,
    area_km2: 7_536,
    supply_tons: 148_000,
    coordinates: { lat: 27.5580, lng: 68.2149 },
    commodities: { wheat: 54, rice: 21, pulses: 10, vegetables: 8, edible_oil: 4, sugar: 3 },
  },
  {
    id: 'mirpurkhas',
    name: 'Mirpurkhas',
    division: 'Mirpurkhas',
    population: 1_337_000,
    area_km2: 4_627,
    supply_tons: 150_000,
    coordinates: { lat: 25.5273, lng: 69.0099 },
    commodities: { wheat: 50, rice: 25, pulses: 11, vegetables: 8, edible_oil: 4, sugar: 2 },
  },
  {
    id: 'thatta',
    name: 'Thatta',
    division: 'Hyderabad',
    population: 979_000,
    area_km2: 17_856,
    supply_tons: 74_000,
    coordinates: { lat: 24.7461, lng: 67.9231 },
    commodities: { wheat: 45, rice: 22, pulses: 13, vegetables: 11, edible_oil: 5, sugar: 4 },
  },
  {
    id: 'badin',
    name: 'Badin',
    division: 'Hyderabad',
    population: 1_136_000,
    area_km2: 6_726,
    supply_tons: 88_000,
    coordinates: { lat: 24.6558, lng: 68.8376 },
    commodities: { wheat: 46, rice: 24, pulses: 12, vegetables: 10, edible_oil: 5, sugar: 3 },
  },
  {
    id: 'dadu',
    name: 'Dadu',
    division: 'Larkana',
    population: 1_008_000,
    area_km2: 9_748,
    supply_tons: 112_000,
    coordinates: { lat: 26.7318, lng: 67.7768 },
    commodities: { wheat: 52, rice: 20, pulses: 11, vegetables: 9, edible_oil: 5, sugar: 3 },
  },
]

export const districts: District[] = rawDistricts.map(d => {
  const demand_tons = Math.round((d.population * CONSUMPTION_KG_PER_PERSON_YEAR) / 1000)
  const gap = calcGap(d.supply_tons, demand_tons)
  return {
    ...d,
    demand_tons,
    gap_percent: gap,
    coverage_percent: calcCoverage(d.supply_tons, demand_tons),
    status: calcStatus(gap),
    last_updated: new Date().toISOString(),
  }
})

export function getDistrictById(id: string): District | undefined {
  return districts.find(d => d.id === id)
}

export function getSummary() {
  const total_supply = districts.reduce((a, d) => a + d.supply_tons, 0)
  const total_demand = districts.reduce((a, d) => a + d.demand_tons, 0)
  const total_population = districts.reduce((a, d) => a + d.population, 0)
  const overall_gap = calcGap(total_supply, total_demand)
  const critical = districts.filter(d => d.status === 'Critical').length
  const warning = districts.filter(d => d.status === 'Warning').length

  return {
    total_supply,
    total_demand,
    total_population,
    overall_gap,
    critical_districts: critical,
    warning_districts: warning,
    stable_districts: districts.filter(d => d.status === 'Stable').length,
    emergency_level: critical >= 3 ? 'HIGH' : critical >= 1 ? 'MODERATE' : ('LOW' as 'HIGH' | 'MODERATE' | 'LOW'),
    last_updated: new Date().toISOString(),
  }
}

export function generateTrend(days = 30) {
  const points = []
  const now = new Date()
  const baseDemand = 210_000
  const baseSupply = 156_000
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const noise = () => (Math.random() - 0.5) * 8000
    points.push({
      date: date.toISOString().split('T')[0],
      supply: Math.round(baseSupply + i * 120 + noise()),
      demand: Math.round(baseDemand + i * 60 + noise() * 0.4),
    })
  }
  return points
}
