import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import {
  Activity, ShieldCheck, HardHat, AlertCircle, TrendingUp,
  MapPin, Navigation, Truck, Zap, LayoutDashboard, Globe,
  Bell, Settings, Drill, BarChart2, Package, Users,
  DollarSign, AlertTriangle, CheckCircle, Clock, Wrench,
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const progressData = [
  { name: 'Vale Slope Phase 2', actual: 92, planned: 88, budget: 95 },
  { name: 'Melaka Road Dev',    actual: 38, planned: 45, budget: 42 },
  { name: 'PJS Drainage Site',  actual: 55, planned: 60, budget: 50 },
  { name: 'MRCB TVET Work',     actual: 75, planned: 70, budget: 80 },
];

// Real GPS coordinates (Malaysia)
const siteMarkers = [
  { id: 1, name: 'Cyberjaya HQ',       type: 'Hub',  pos: [2.9241, 101.6558], status: 'Active',  color: '#3b82f6' },
  { id: 2, name: 'Melaka Road Project', type: 'Site', pos: [2.1931, 102.2461], distance: '104km', status: 'Warning', color: '#f97316' },
  { id: 3, name: 'PJS Site (PJ)',       type: 'Site', pos: [3.0836, 101.6066], distance: '20km',  status: 'Optimal', color: '#22c55e' },
  { id: 4, name: 'Vale Slope Site',     type: 'Site', pos: [3.2208, 101.6678], distance: '65km',  status: 'Optimal', color: '#22c55e' },
];

const monthlyProgressData = [
  { month: 'Jan', 'Vale Slope': 35, 'Melaka Road': 12, 'PJS Drainage': 20, 'MRCB TVET': 40 },
  { month: 'Feb', 'Vale Slope': 48, 'Melaka Road': 18, 'PJS Drainage': 28, 'MRCB TVET': 50 },
  { month: 'Mar', 'Vale Slope': 62, 'Melaka Road': 24, 'PJS Drainage': 35, 'MRCB TVET': 60 },
  { month: 'Apr', 'Vale Slope': 72, 'Melaka Road': 28, 'PJS Drainage': 42, 'MRCB TVET': 65 },
  { month: 'May', 'Vale Slope': 84, 'Melaka Road': 33, 'PJS Drainage': 50, 'MRCB TVET': 72 },
  { month: 'Jun', 'Vale Slope': 92, 'Melaka Road': 38, 'PJS Drainage': 55, 'MRCB TVET': 75 },
];

const equipmentData = [
  { name: 'Excavators',  total: 12, active: 8,  idle: 3, maintenance: 1 },
  { name: 'Dump Trucks', total: 18, active: 14, idle: 2, maintenance: 2 },
  { name: 'Cranes',      total: 5,  active: 4,  idle: 0, maintenance: 1 },
  { name: 'Compactors',  total: 8,  active: 6,  idle: 1, maintenance: 1 },
  { name: 'Bulldozers',  total: 6,  active: 5,  idle: 1, maintenance: 0 },
];

const fleetPieData = [
  { name: 'Active',      value: 37, color: '#22c55e' },
  { name: 'Idle',        value: 7,  color: '#f59e0b' },
  { name: 'Maintenance', value: 5,  color: '#ef4444' },
];

const safetyData = [
  { month: 'Jan', incidents: 2, nearMiss: 5, trainingSessions: 45 },
  { month: 'Feb', incidents: 1, nearMiss: 3, trainingSessions: 52 },
  { month: 'Mar', incidents: 0, nearMiss: 4, trainingSessions: 48 },
  { month: 'Apr', incidents: 1, nearMiss: 2, trainingSessions: 60 },
  { month: 'May', incidents: 0, nearMiss: 6, trainingSessions: 55 },
  { month: 'Jun', incidents: 2, nearMiss: 3, trainingSessions: 58 },
];

const budgetData = [
  { month: 'Jan', budget: 8.2,  actual: 7.8,  forecast: 8.5  },
  { month: 'Feb', budget: 9.5,  actual: 9.1,  forecast: 9.8  },
  { month: 'Mar', budget: 11.2, actual: 10.8, forecast: 11.5 },
  { month: 'Apr', budget: 12.8, actual: 13.2, forecast: 13.0 },
  { month: 'May', budget: 14.5, actual: 14.1, forecast: 14.8 },
  { month: 'Jun', budget: 15.8, actual: 15.2, forecast: 16.2 },
];

const workerData = [
  { site: 'Vale Slope', skilled: 35, unskilled: 28, supervisors: 7 },
  { site: 'Melaka Rd',  skilled: 28, unskilled: 22, supervisors: 5 },
  { site: 'PJS Site',   skilled: 20, unskilled: 18, supervisors: 4 },
  { site: 'MRCB TVET',  skilled: 32, unskilled: 25, supervisors: 6 },
];

const materialData = [
  { name: 'Concrete', ordered: 850, delivered: 720, used: 680, unit: 'm³'  },
  { name: 'Steel',    ordered: 45,  delivered: 40,  used: 38,  unit: 'ton' },
  { name: 'Sand',     ordered: 320, delivered: 300, used: 285, unit: 'ton' },
  { name: 'Bricks',   ordered: 120, delivered: 95,  used: 88,  unit: 'k'   },
  { name: 'Pipes',    ordered: 560, delivered: 480, used: 450, unit: 'm'   },
];

const radarData = [
  { metric: 'Progress',  'Vale Slope': 92, 'Melaka Road': 38, 'PJS Drainage': 55, 'MRCB TVET': 75 },
  { metric: 'Safety',    'Vale Slope': 88, 'Melaka Road': 72, 'PJS Drainage': 90, 'MRCB TVET': 85 },
  { metric: 'Budget',    'Vale Slope': 95, 'Melaka Road': 62, 'PJS Drainage': 78, 'MRCB TVET': 82 },
  { metric: 'Quality',   'Vale Slope': 90, 'Melaka Road': 68, 'PJS Drainage': 85, 'MRCB TVET': 88 },
  { metric: 'Workforce', 'Vale Slope': 85, 'Melaka Road': 70, 'PJS Drainage': 80, 'MRCB TVET': 92 },
];

const COLORS = ['#1e3a8a', '#0ea5e9', '#22c55e', '#f59e0b'];

// ─── LEAFLET CUSTOM ICONS ─────────────────────────────────────────────────────

const makeIcon = (color, isHub, isWarning) => L.divIcon({
  className: '',
  html: `<div class="site-marker${isWarning ? ' pulse' : ''}" style="width:${isHub ? 40 : 32}px;height:${isHub ? 40 : 32}px;background:${color};">
    <svg xmlns="http://www.w3.org/2000/svg" width="${isHub ? 18 : 15}" height="${isHub ? 18 : 15}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      ${isHub
        ? '<polygon points="3 11 22 2 13 21 11 13 3 11"/>'
        : '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>'}
    </svg>
  </div>`,
  iconSize:   [isHub ? 40 : 32, isHub ? 40 : 32],
  iconAnchor: [isHub ? 20 : 16, isHub ? 20 : 16],
  popupAnchor: [0, isHub ? -22 : -18],
});

// ─── HEADER ───────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'analytics',  Icon: LayoutDashboard, label: 'Operations' },
  { id: 'geospatial', Icon: Globe,           label: 'Geospatial' },
  { id: 'analysis',   Icon: BarChart2,       label: 'Analysis'   },
];

const Header = ({ activeTab, setActiveTab }) => (
  <header className="mb-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span className="bg-blue-900 text-white px-2 py-0.5 rounded text-base">DC</span>
          DAENGCO COMMAND CENTER
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Strategic Operations & Geospatial Analytics</p>
      </div>
    </div>
    {/* Tab bar — full width on mobile, auto on larger screens */}
    <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 w-full sm:w-auto sm:inline-flex">
      {TABS.map(({ id, Icon, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => setActiveTab(id)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === id ? 'bg-blue-900 text-white shadow-md' : 'text-slate-600 active:bg-slate-100'
          }`}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  </header>
);

// ─── ANALYTICS VIEW ───────────────────────────────────────────────────────────

const AnalyticsView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[
        { label: 'Total Portfolio Value', val: 'RM 142.5M', icon: TrendingUp,  color: 'text-blue-600',   trend: '+12.5%'    },
        { label: 'Avg. Project Health',   val: '88.4%',     icon: Activity,    color: 'text-emerald-600', trend: 'Optimal'   },
        { label: 'Active Workforce',      val: '210 Pax',   icon: HardHat,     color: 'text-orange-600',  trend: '5 Sites'   },
        { label: 'ISO Compliance',        val: 'Passed',    icon: ShieldCheck, color: 'text-indigo-600',  trend: '9001:2015' },
      ].map((kpi, i) => (
        <div key={i} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
              <kpi.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${kpi.color}`} />
            </div>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-tighter">{kpi.trend}</span>
          </div>
          <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{kpi.val}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <Drill className="w-5 h-5 text-blue-900" /> Site Progress (%)
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-900 rounded-sm"></div><span className="text-[10px] font-bold text-slate-400">ACTUAL</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-300 rounded-sm"></div><span className="text-[10px] font-bold text-slate-400">PLANNED</span></div>
          </div>
        </div>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={600} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar name="Actual"  dataKey="actual"  fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={36} />
              <Bar name="Planned" dataKey="planned" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-200 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400" /> Executive Decisions
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-800/50 p-4 rounded-2xl border border-blue-700/50">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Critical Bottleneck</p>
              <p className="text-sm font-medium leading-relaxed">Melaka Road Dev is trending <span className="text-orange-400 font-bold">7.2% below</span> target.</p>
              <button type="button" className="mt-3 w-full py-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl text-xs font-bold transition shadow-lg">INITIATE RECOVERY PLAN</button>
            </div>
            <div className="bg-blue-800/50 p-4 rounded-2xl border border-blue-700/50">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Asset Allocation</p>
              <p className="text-sm font-medium leading-relaxed">3 Excavators <span className="text-green-400 font-bold">Idle</span> at Vale Slope.</p>
              <button type="button" className="mt-3 w-full py-2.5 bg-white text-blue-900 rounded-xl text-xs font-bold transition shadow-lg">REDEPLOY TO PJS SITE</button>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-blue-800">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">Revenue Impact</span>
            <span className="text-xs font-bold text-green-400">+RM 24k Optimized</span>
          </div>
          <div className="w-full bg-blue-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-green-500 h-full w-[65%] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── GEOSPATIAL VIEW (real OpenStreetMap) ─────────────────────────────────────

const GeospatialView = () => {
  const hub = siteMarkers[0];
  const sites = siteMarkers.filter(s => s.type === 'Site');

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
      {/* Map */}
      <div className="xl:col-span-3 relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl" style={{ height: 520 }}>
        {/* Overlay badge */}
        <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-900/60 rounded-lg border border-blue-700/50">
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Live Sites</span>
          </div>
          <div className="h-3.5 w-px bg-slate-700"></div>
          <span className="text-[10px] font-bold text-slate-400">5 Active Trackers</span>
        </div>

        <MapContainer
          center={[2.85, 101.95]}
          zoom={9}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Polylines from HQ to each site */}
          {sites.map(site => (
            <Polyline
              key={site.id}
              positions={[hub.pos, site.pos]}
              color={site.status === 'Warning' ? '#f97316' : '#1e3a8a'}
              weight={2}
              dashArray="8 6"
              opacity={0.7}
            />
          ))}

          {/* Markers */}
          {siteMarkers.map(site => (
            <Marker
              key={site.id}
              position={site.pos}
              icon={makeIcon(site.color, site.type === 'Hub', site.status === 'Warning')}
            >
              <Popup>
                <div style={{ fontFamily: 'sans-serif', minWidth: 140 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 3px', color: '#0f172a' }}>{site.name}</p>
                  <p style={{ fontSize: 11, color: '#64748b', margin: '0 0 2px' }}>
                    {site.type} &bull;&nbsp;
                    <span style={{ color: site.status === 'Warning' ? '#f97316' : site.status === 'Active' ? '#3b82f6' : '#22c55e', fontWeight: 700 }}>
                      {site.status}
                    </span>
                  </p>
                  {site.distance && (
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{site.distance} from HQ</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Side Panel */}
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
          <h3 className="font-bold text-sm mb-5 flex items-center gap-2 text-slate-700">
            <Navigation className="w-4 h-4 text-blue-600" /> Logistics Matrix
          </h3>
          <div className="space-y-3">
            {sites.map(node => (
              <div key={node.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase leading-tight">{node.name}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${node.status === 'Warning' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {node.status}
                  </span>
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-xl font-bold text-slate-900 leading-none">{node.distance}</span>
                  <span className="text-[10px] text-slate-400 mb-0.5">from HQ</span>
                </div>
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Legend</p>
            {[
              { color: '#3b82f6', label: 'Main Hub (Cyberjaya)' },
              { color: '#f97316', label: 'Critical Delay' },
              { color: '#22c55e', label: 'Operations Normal' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }}></div>
                {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-6 rounded-3xl shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 -m-3 opacity-10"><Truck className="w-20 h-20 text-white" /></div>
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2 text-white"><Truck className="w-4 h-4" /> Logistics Insight</h3>
          <p className="text-xs leading-relaxed text-blue-100">
            Material costs in <strong>Melaka</strong> are <span className="text-green-300 font-bold">4.2% lower</span> than Klang Valley.
          </p>
          <div className="mt-4 bg-blue-950/40 p-3 rounded-xl border border-blue-400/20">
            <p className="text-[10px] text-blue-200">Recommendation:</p>
            <p className="text-[11px] font-bold text-white mt-1 italic">"Redirect quarry supply from Melaka to save RM 15.5k next cycle."</p>
          </div>
          <button type="button" className="mt-4 w-full py-2.5 bg-white text-blue-900 text-xs font-extrabold rounded-xl active:bg-slate-50 transition">
            EXECUTE PROCUREMENT SHIFT
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ANALYSIS VIEW ────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon: Icon, color, badge, badgeColor }) => (
  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 rounded-xl bg-slate-50"><Icon className={`w-5 h-5 ${color}`} /></div>
      {badge && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>}
    </div>
    <p className="text-xs font-medium text-slate-500">{label}</p>
    <p className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{value}</p>
  </div>
);

const SectionTitle = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2 bg-blue-50 rounded-xl"><Icon className="w-5 h-5 text-blue-900" /></div>
    <div>
      <h3 className="text-sm sm:text-base font-bold text-slate-800">{title}</h3>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  </div>
);

const ttStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: 11 };

const AnalysisView = () => (
  <div className="space-y-8 sm:space-y-10">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      <StatCard label="Fleet Utilisation"   value="75.5%"    icon={Truck}         color="text-blue-600"   badge="↑ 3.2%"    badgeColor="bg-blue-50 text-blue-600"    />
      <StatCard label="Safety Score"        value="94.1"     icon={ShieldCheck}   color="text-green-600"  badge="Excellent" badgeColor="bg-green-50 text-green-600"   />
      <StatCard label="Budget Variance"     value="-RM 0.6M" icon={DollarSign}    color="text-purple-600" badge="On Track"  badgeColor="bg-purple-50 text-purple-600" />
      <StatCard label="Material Wastage"    value="3.2%"     icon={Package}       color="text-orange-600" badge="Low"       badgeColor="bg-orange-50 text-orange-600" />
      <StatCard label="HSE Incidents (YTD)" value="6"        icon={AlertTriangle} color="text-red-600"    badge="↓ 25%"    badgeColor="bg-red-50 text-red-500"       />
      <StatCard label="On-Time Deliveries"  value="88.4%"    icon={CheckCircle}   color="text-teal-600"   badge="Good"     badgeColor="bg-teal-50 text-teal-600"     />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={TrendingUp} title="Monthly Progress Trend (%)" sub="Jan–Jun 2025 cumulative completion" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProgressData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {['Vale Slope','Melaka Road','PJS Drainage','MRCB TVET'].map((k, i) => (
                  <linearGradient key={k} id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={COLORS[i]} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0}   />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={ttStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              {['Vale Slope','Melaka Road','PJS Drainage','MRCB TVET'].map((k, i) => (
                <Area key={k} type="monotone" dataKey={k} stroke={COLORS[i]} fill={`url(#g${i})`} strokeWidth={2} dot={false} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Activity} title="Site Performance Radar" sub="Multi-metric benchmark" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius={75}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
              {['Vale Slope','Melaka Road','PJS Drainage','MRCB TVET'].map((k, i) => (
                <Radar key={k} name={k} dataKey={k} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.12} strokeWidth={2} />
              ))}
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 9 }} />
              <Tooltip contentStyle={ttStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Wrench} title="Equipment Fleet Status" sub="Active · Idle · Maintenance" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={equipmentData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={600} width={78} />
              <Tooltip contentStyle={ttStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Active"      dataKey="active"      fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} stackId="a" />
              <Bar name="Idle"        dataKey="idle"        fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={12} stackId="a" />
              <Bar name="Maintenance" dataKey="maintenance" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Truck} title="Fleet Utilisation" sub="49 total units" />
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={fleetPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                {fleetPieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} formatter={v => [`${v} units`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-1">
          {fleetPieData.map(d => (
            <div key={d.name} className="text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: d.color }}></div>
              <p className="text-[10px] font-bold text-slate-500">{d.name}</p>
              <p className="text-sm font-bold text-slate-800">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={DollarSign} title="Budget Burn Rate (RM M)" sub="Budgeted vs Actual vs Forecast" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} tickFormatter={v => `${v}M`} />
              <Tooltip contentStyle={ttStyle} formatter={v => [`RM ${v}M`, '']} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line name="Budget"   type="monotone" dataKey="budget"   stroke="#94a3b8" strokeWidth={2}   strokeDasharray="6 3" dot={false} />
              <Line name="Actual"   type="monotone" dataKey="actual"   stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 4, fill: '#1e3a8a' }} />
              <Line name="Forecast" type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2}   strokeDasharray="4 2" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={ShieldCheck} title="HSE Safety Metrics" sub="Incidents · Near-Miss · Training" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safetyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} />
              <Tooltip contentStyle={ttStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Incidents"    dataKey="incidents"        fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Near Miss"    dataKey="nearMiss"         fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Training Hrs" dataKey="trainingSessions" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Users} title="Workforce Distribution" sub="Skilled · Unskilled · Supervisors" />
        <div className="h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workerData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="site" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} />
              <Tooltip contentStyle={ttStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Skilled"     dataKey="skilled"     fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Unskilled"   dataKey="unskilled"   fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar name="Supervisors" dataKey="supervisors" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Package} title="Materials Inventory" sub="Ordered · Delivered · Consumed" />
        <div className="space-y-3.5 mt-1">
          {materialData.map((m, i) => {
            const deliveredPct = Math.round((m.delivered / m.ordered) * 100);
            const usedPct      = Math.round((m.used / m.ordered) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.delivered}/{m.ordered} {m.unit}</span>
                </div>
                <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-blue-200" style={{ width: `${deliveredPct}%` }}></div>
                  <div className="absolute left-0 top-0 h-full rounded-full bg-blue-700" style={{ width: `${usedPct}%` }}></div>
                </div>
                <div className="flex gap-4 mt-1 text-[9px] font-bold text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-700 inline-block"></span>Used {usedPct}%</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-200 inline-block"></span>Delivered {deliveredPct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 sm:p-8 rounded-3xl text-white">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-white/10 rounded-xl"><Clock className="w-5 h-5 text-white" /></div>
        <h3 className="text-sm sm:text-base font-bold">AI-Assisted Insights — June 2025</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { color: 'border-orange-400', title: 'Schedule Risk', body: 'Melaka Road Dev at 38% vs 45% planned. Projected completion Aug 2026 — 6 weeks behind deadline.' },
          { color: 'border-green-400',  title: 'Cost Saving',   body: 'Redeploying 3 idle excavators from Vale Slope to PJS Drainage saves RM 42k over next 8 weeks.' },
          { color: 'border-blue-400',   title: 'Safety Trend',  body: 'Zero incidents in Mar & May correlates with 60+ training sessions. Maintain ≥50 sessions/month.' },
        ].map((ins, i) => (
          <div key={i} className={`bg-white/10 border-l-4 ${ins.color} p-4 sm:p-5 rounded-xl`}>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">{ins.title}</p>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-100">{ins.body}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

const App = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex flex-col w-20 bg-blue-950 items-center py-8 gap-10 border-r border-blue-900 shadow-xl z-20 shrink-0">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-blue-950 text-xl shadow-lg">D</div>
        <nav className="flex flex-col gap-6 text-blue-400">
          <button type="button" className="p-3 hover:bg-blue-900 rounded-xl transition-colors text-white"><LayoutDashboard className="w-6 h-6" /></button>
          <button type="button" className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><MapPin className="w-6 h-6" /></button>
          <button type="button" className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><Bell className="w-6 h-6" /></button>
          <button type="button" className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><Settings className="w-6 h-6" /></button>
        </nav>
      </aside>

      {/* Main — sticky header, scrollable content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-slate-50 px-4 sm:px-8 lg:px-10 pt-5 sm:pt-8 border-b border-slate-100 shadow-sm">
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-y-auto">
          {activeTab === 'analytics'  && <AnalyticsView  />}
          {activeTab === 'geospatial' && <GeospatialView />}
          {activeTab === 'analysis'   && <AnalysisView   />}

          <footer className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-400 border-t border-slate-200 pt-5 gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest italic">Confidential — Daengco Sdn Bhd Board Access Only</p>
            <div className="flex gap-4 text-xs font-bold">
              <span>SYSTEM V4.2.0</span>
              <span className="text-emerald-500">ENCRYPTED</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
