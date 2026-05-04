// app/api/commodities/route.ts
import { NextResponse } from 'next/server'

const commodities = [
  { name: 'Wheat',      supply_tons: 1_280_000, demand_tons: 1_560_000, unit_price_pkr: 3_800, trend: 'up',    change_percent: 4.2  },
  { name: 'Rice',       supply_tons: 620_000,   demand_tons: 720_000,   unit_price_pkr: 7_200, trend: 'stable',change_percent: 0.8  },
  { name: 'Pulses',     supply_tons: 180_000,   demand_tons: 240_000,   unit_price_pkr: 18_000,trend: 'up',    change_percent: 11.4 },
  { name: 'Vegetables', supply_tons: 240_000,   demand_tons: 280_000,   unit_price_pkr: 4_500, trend: 'down',  change_percent: -3.1 },
  { name: 'Edible Oil', supply_tons: 95_000,    demand_tons: 130_000,   unit_price_pkr: 460_000,trend: 'up',   change_percent: 7.8  },
  { name: 'Sugar',      supply_tons: 110_000,   demand_tons: 140_000,   unit_price_pkr: 8_500, trend: 'stable',change_percent: 1.2  },
]

export async function GET() {
  return NextResponse.json(commodities)
}
