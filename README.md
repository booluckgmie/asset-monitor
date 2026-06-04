# DAENGCO Command Center — Asset Monitor Dashboard

A strategic operations and geospatial analytics dashboard built for **Daengco Sdn Bhd** to monitor construction project portfolios, equipment fleets, workforce, safety, and financials in real time.

---

## Overview

The dashboard provides board-level visibility across all active construction sites through three integrated views:

| Tab | Description |
|---|---|
| **Operations** | KPI cards, site progress comparison, and executive decision panel |
| **Geospatial** | Interactive site map with logistics matrix and supply-chain insights |
| **Analysis** | Deep-dive analytics with 8 chart panels and AI-assisted insights |

---

## Features

### Operations Tab
- **Portfolio KPIs** — Total value (RM 142.5M), average project health, active workforce headcount, and ISO 9001:2015 compliance status
- **Site Progress Bar Chart** — Actual vs planned completion % across all 4 active projects
- **Executive Decision Panel** — Bottleneck alerts and one-click action buttons (recovery plan, asset redeployment)
- **Revenue Impact Tracker** — Live optimisation savings indicator

### Geospatial Tab
- **Interactive Site Map** — Plotted markers for Cyberjaya HQ and all 3 project sites with hover tooltips
- **Status Indicators** — Colour-coded pins (blue = hub, orange/pulse = warning, green = optimal)
- **Logistics Matrix** — Distance from HQ and site status for each location
- **Supply Chain Insight** — Procurement recommendation engine with cost differential alerts

### Analysis Tab (Extended Dummy Data)
- **6-Metric KPI Row** — Fleet utilisation, safety score, budget variance, material wastage, HSE incidents YTD, on-time deliveries
- **Monthly Progress Trend** — Area chart tracking cumulative completion % Jan–Jun 2025 across all 4 projects
- **Site Performance Radar** — Multi-axis benchmark across Progress, Safety, Budget, Quality, and Workforce
- **Equipment Fleet Status** — Stacked horizontal bar chart (Active / Idle / Maintenance) for 5 equipment types
- **Fleet Utilisation Donut** — 49 total units breakdown across operational states
- **Budget Burn Rate** — Line chart comparing Budgeted vs Actual vs Forecast spend (RM millions)
- **HSE Safety Metrics** — Monthly incidents, near-miss events, and training sessions
- **Workforce Distribution** — Grouped bar chart by site: Skilled, Unskilled, and Supervisors
- **Materials Inventory** — Layered progress bars showing Ordered → Delivered → Consumed for 5 material types
- **AI-Assisted Insights Panel** — Schedule risk, cost-saving opportunities, and safety trend analysis

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18.x | UI framework |
| Recharts | 2.x | All chart visualisations |
| Lucide React | 0.507 | Icon set |
| Tailwind CSS | CDN | Styling |

---

## Project Sites Covered

| Site | Location | Distance from HQ | Status |
|---|---|---|---|
| Vale Slope Phase 2 | Klang Valley | 65 km | Optimal (92%) |
| PJS Drainage Site | Petaling Jaya | 20 km | Optimal (55%) |
| MRCB TVET Work | Klang Valley | — | On Track (75%) |
| Melaka Road Dev | Melaka | 104 km | Warning (38%) |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/booluckgmie/asset-monitor.git
cd asset-monitor

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`.

---

## Build for Production

```bash
npm run build
```

Output is in the `build/` folder, ready for deployment to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## Folder Structure

```
asset-monitor/
├── public/
│   └── index.html          # HTML shell with Tailwind CDN
├── src/
│   ├── index.js            # React entry point
│   └── App.js              # Full dashboard (all views + data)
├── package.json
└── .gitignore
```

---

## Data

All data in the current version is **dummy/static** for demonstration purposes. The architecture is ready to be wired to a live API — replace the data constants at the top of `src/App.js` with API calls or a state management layer.

---

> **Confidential** — Daengco Sdn Bhd Board Access Only · System V4.1.0
