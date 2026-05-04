# 🌾 Food Supply Tracking Dashboard — Sindh Region

A production-grade humanitarian logistics monitoring system built for FAO/WFP-style food security tracking across Sindh, Pakistan.

## 🖥️ Live Preview

Deploy on Vercel in one click — see deployment section below.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 + Tailwind CSS |
| Charts | Recharts |
| Language | TypeScript |
| Deployment | Vercel |

---

## 📦 Project Structure

```
sindh-food-dashboard/
├── app/
│   ├── layout.tsx              # Root layout (sidebar + topbar)
│   ├── page.tsx                # Redirects → /dashboard
│   ├── dashboard/page.tsx      # Main overview dashboard
│   ├── districts/
│   │   ├── page.tsx            # Sortable district table
│   │   └── [id]/page.tsx       # Individual district deep-dive
│   ├── alerts/page.tsx         # Live alert feed with filters
│   └── api/
│       ├── districts/route.ts  # GET /api/districts
│       ├── summary/route.ts    # GET /api/summary
│       ├── alerts/route.ts     # GET /api/alerts?type=Critical
│       └── commodities/route.ts # GET /api/commodities
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Collapsible sidebar navigation
│   │   └── TopBar.tsx          # Top bar with live clock
│   ├── ui/
│   │   ├── KpiCard.tsx         # Animated KPI metric cards
│   │   ├── StatusChip.tsx      # Status badge (Critical/Warning/Stable)
│   │   ├── DistrictBar.tsx     # Animated progress bar per district
│   │   ├── AlertItem.tsx       # Alert event card
│   │   └── Skeleton.tsx        # Loading skeletons
│   └── charts/
│       ├── CommodityChart.tsx  # Doughnut chart (Recharts)
│       ├── GapBarChart.tsx     # Supply vs Demand bar chart
│       └── TrendChart.tsx      # 30-day trend line chart
├── data/
│   ├── districts.ts            # Sindh district data + calculations
│   └── alerts.ts               # Alert generation with realistic messages
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   └── utils.ts                # Formatters, exportToCSV, helpers
├── styles/globals.css          # Tailwind base + custom animations
├── tailwind.config.ts          # Custom green color palette
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Install & Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/sindh-food-dashboard.git
cd sindh-food-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/dashboard`.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deploy on Vercel

### Method 1 — Vercel CLI (Recommended)

```bash
npm install -g vercel
vercel
# Follow prompts — framework auto-detected as Next.js
```

### Method 2 — GitHub Integration

1. Push this project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your dashboard is live in ~60 seconds

### Method 3 — Direct Deploy Button

Add this to your GitHub README after setting up the repo:

```
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/sindh-food-dashboard)
```

---

## 📊 Data Model

### Food Demand Calculation
```
demand_tons = (population × 164 kg/person/year) / 1000
```
Based on FAO South Asia baseline of 2,100 kcal/day → ~164 kg grain equivalent/year.

### Status Classification
```
gap > 40%      → Critical  (IPC Phase 4 — Acute)
gap 20–40%     → Warning   (IPC Phase 3 — Stressed)
gap < 20%      → Stable    (IPC Phase 1-2)
```

### API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/districts` | GET | All 8 districts with computed metrics |
| `/api/summary` | GET | Aggregated KPIs and emergency level |
| `/api/alerts` | GET | Alert feed (filter: `?type=Critical`) |
| `/api/commodities` | GET | Commodity supply/demand/price data |

---

## 🎨 Design System

**Theme:** Humanitarian / Agriculture Green (FAO-style)

| Token | Value | Usage |
|---|---|---|
| `forest-500` | `#227539` | Primary CTA, stable status |
| `forest-900` | `#0d2e17` | Dark backgrounds, sidebar |
| `amber-harvest` | `#c9890e` | Warning states |
| `earth-red` | `#b84040` | Critical alerts |
| `sage-50` | `#f0f8f2` | Page background |

**Fonts:** Fraunces (display, italic) + DM Sans (body)

---

## 🧠 Features

- ✅ **Dashboard** — KPI cards, district bars, commodity chart, trend simulation, alert feed
- ✅ **Districts** — Searchable/sortable table, status filters, CSV export
- ✅ **District Detail** — Per-capita supply, coverage bar, commodity mix, risk assessment
- ✅ **Alerts** — Live feed, severity filter, search, auto-refresh
- ✅ **API routes** — RESTful JSON endpoints
- ✅ **Responsive** — Mobile, tablet, desktop
- ✅ **Animations** — Page load, bar fills, chart entrance, hover states
- ✅ **Loading skeletons** — Graceful loading states
- ✅ **CSV export** — Download district data

---

## 📋 Alignment with International Standards

This prototype references:
- **IPC (Integrated Food Security Phase Classification)** — status thresholds
- **FAO Food Balance Sheet methodology** — consumption factor baseline
- **WFP Emergency Response Protocol ERP-7** — alert messaging templates
- **PDMA Sindh** — district administrative boundaries

---

## 👤 Author

Developed by **Humanitarian Data Systems Unit**  
Prototype aligned with FAO / WFP / Sindh Food Authority standards.

---

## 📄 License

MIT — Free to use for educational, research, and humanitarian purposes.
