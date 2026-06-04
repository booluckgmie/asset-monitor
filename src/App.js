import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
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

const projectNodes = [
  { id: 1, name: 'Cyberjaya HQ',       type: 'Hub',  x: '33%', y: '45%', status: 'Active'  },
  { id: 2, name: 'Melaka Road Project', type: 'Site', x: '75%', y: '75%', distance: '104km', status: 'Warning' },
  { id: 3, name: 'PJS Site (PJ)',       type: 'Site', x: '45%', y: '35%', distance: '20km',  status: 'Optimal' },
  { id: 4, name: 'Vale Slope Site',     type: 'Site', x: '60%', y: '60%', distance: '65km',  status: 'Optimal' },
];

// Extended dummy datasets
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
  { site: 'Vale Slope', skilled: 35, unskilled: 28, supervisors: 7  },
  { site: 'Melaka Rd',  skilled: 28, unskilled: 22, supervisors: 5  },
  { site: 'PJS Site',   skilled: 20, unskilled: 18, supervisors: 4  },
  { site: 'MRCB TVET',  skilled: 32, unskilled: 25, supervisors: 6  },
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

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const Header = ({ activeTab, setActiveTab }) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
        <span className="bg-blue-900 text-white p-1 rounded">DC</span>
        DAENGCO COMMAND CENTER
      </h1>
      <p className="text-sm text-slate-500 font-medium">Strategic Operations & Geospatial Analytics</p>
    </div>
    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex-wrap gap-1">
      {[
        { id: 'analytics',   icon: LayoutDashboard, label: 'Operations' },
        { id: 'geospatial',  icon: Globe,           label: 'Geospatial' },
        { id: 'analysis',    icon: BarChart2,        label: 'Analysis'   },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === id ? 'bg-blue-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Icon className="w-4 h-4" /> {label}
        </button>
      ))}
    </div>
  </header>
);

// ─── ANALYTICS VIEW ───────────────────────────────────────────────────────────

const AnalyticsView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Portfolio Value', val: 'RM 142.5M', icon: TrendingUp,  color: 'text-blue-600',   trend: '+12.5%'    },
        { label: 'Avg. Project Health',   val: '88.4%',     icon: Activity,    color: 'text-emerald-600', trend: 'Optimal'   },
        { label: 'Active Workforce',      val: '210 Pax',   icon: HardHat,     color: 'text-orange-600',  trend: '5 Sites'   },
        { label: 'ISO Compliance',        val: 'Passed',    icon: ShieldCheck, color: 'text-indigo-600',  trend: '9001:2015' },
      ].map((kpi, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-tighter">
              {kpi.trend}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.val}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Drill className="w-5 h-5 text-blue-900" /> Site Progress Comparison (%)
          </h3>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-900 rounded-sm"></div><span className="text-[10px] font-bold text-slate-400">ACTUAL</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-300 rounded-sm"></div><span className="text-[10px] font-bold text-slate-400">PLANNED</span></div>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} fontWeight={600} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Bar name="Actual"  dataKey="actual"  fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={40} />
              <Bar name="Planned" dataKey="planned" fill="#cbd5e1" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl shadow-blue-200 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-400" /> Executive Decisions
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-800/50 p-5 rounded-2xl border border-blue-700/50">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Critical Bottleneck</p>
              <p className="text-sm font-medium leading-relaxed">Melaka Road Dev is trending <span className="text-orange-400 font-bold">7.2% below</span> target baseline.</p>
              <button className="mt-4 w-full py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-xs font-bold transition shadow-lg shadow-orange-900/20">
                INITIATE RECOVERY PLAN
              </button>
            </div>
            <div className="bg-blue-800/50 p-5 rounded-2xl border border-blue-700/50">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Asset Allocation</p>
              <p className="text-sm font-medium leading-relaxed">3 Excavators identified as <span className="text-green-400 font-bold">Idle</span> at Vale Slope.</p>
              <button className="mt-4 w-full py-2.5 bg-white text-blue-900 rounded-xl text-xs font-bold transition shadow-lg">
                REDEPLOY TO PJS SITE
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-blue-800">
          <div className="flex justify-between items-center mb-4">
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

// ─── GEOSPATIAL VIEW ──────────────────────────────────────────────────────────

const GeospatialView = () => (
  <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
    <div className="xl:col-span-3 bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 min-h-[600px] shadow-2xl">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 330 270 Q 450 300 750 450" fill="none" stroke="rgba(30,58,138,0.4)" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M 330 270 Q 380 250 450 210" fill="none" stroke="rgba(30,58,138,0.4)" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
      <div className="relative w-full h-full">
        {projectNodes.map((node) => (
          <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-110" style={{ left: node.x, top: node.y }}>
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full shadow-lg ${node.type === 'Hub' ? 'bg-blue-600' : node.status === 'Warning' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}>
                {node.type === 'Hub' ? <Navigation className="w-5 h-5 text-white" /> : <MapPin className="w-5 h-5 text-white" />}
              </div>
              <div className="mt-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-center whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] font-bold text-white uppercase">{node.name}</p>
                <p className="text-[9px] text-slate-400">{node.type} • {node.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-6 left-6">
        <div className="bg-slate-950/90 border border-slate-800 p-1.5 rounded-xl flex items-center gap-3 backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/50 rounded-lg border border-blue-700/50">
            <Zap className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Live Sites</span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <span className="text-[10px] font-bold text-slate-400 pr-3">5 Active Trackers</span>
        </div>
      </div>
      <div className="absolute bottom-6 right-6">
        <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-md shadow-2xl">
          <h4 className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-widest">Regional Legend</h4>
          <div className="space-y-2 text-[10px] font-bold">
            <div className="flex items-center gap-3 text-slate-300"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Main Hub (Cyberjaya)</div>
            <div className="flex items-center gap-3 text-slate-300"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Critical Delay Detected</div>
            <div className="flex items-center gap-3 text-slate-300"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Operations Normal</div>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-3xl backdrop-blur-sm">
        <h3 className="font-bold text-sm mb-6 flex items-center gap-2 text-blue-400">
          <Navigation className="w-4 h-4" /> Logistics Matrix
        </h3>
        <div className="space-y-4">
          {projectNodes.filter(n => n.type === 'Site').map(node => (
            <div key={node.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase">{node.name}</span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${node.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>{node.status}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white leading-none tracking-tight">{node.distance}</span>
                <span className="text-[10px] text-slate-500 mb-1">from HQ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 rounded-3xl shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -m-4 opacity-10"><Truck className="w-24 h-24 text-white" /></div>
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-white"><Truck className="w-4 h-4" /> Logistics Insight</h3>
        <p className="text-xs leading-relaxed text-blue-100 font-medium">
          Material costs in <strong>Melaka</strong> are currently <span className="text-green-300 font-bold">4.2% lower</span> than Klang Valley.
        </p>
        <div className="mt-6 bg-blue-950/40 p-3 rounded-xl border border-blue-400/20">
          <p className="text-[10px] text-blue-200">Decision recommendation:</p>
          <p className="text-[11px] font-bold text-white mt-1 italic">"Redirect quarry supply from Melaka for PJS site to save RM 15.5k next cycle."</p>
        </div>
        <button className="mt-6 w-full py-3 bg-white text-blue-900 text-xs font-extrabold rounded-xl hover:bg-slate-50 transition">EXECUTE PROCUREMENT SHIFT</button>
      </div>
    </div>
  </div>
);

// ─── ANALYSIS VIEW (Extended dummy data) ─────────────────────────────────────

const StatCard = ({ label, value, sub, icon: Icon, color, badge, badgeColor }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-2.5 rounded-xl bg-slate-50`}><Icon className={`w-5 h-5 ${color}`} /></div>
      {badge && <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>}
    </div>
    <p className="text-xs font-medium text-slate-500">{label}</p>
    <p className="text-xl font-bold text-slate-900 mt-0.5">{value}</p>
    {sub && <p className="text-[10px] text-slate-400 mt-1">{sub}</p>}
  </div>
);

const SectionTitle = ({ icon: Icon, title, sub }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-blue-50 rounded-xl"><Icon className="w-5 h-5 text-blue-900" /></div>
    <div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  </div>
);

const tooltipStyle = { borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: 11 };

const AnalysisView = () => (
  <div className="space-y-10">

    {/* ── KPI Summary Row ── */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <StatCard label="Fleet Utilisation"   value="75.5%"   icon={Truck}         color="text-blue-600"   badge="↑ 3.2%"    badgeColor="bg-blue-50 text-blue-600"   />
      <StatCard label="Safety Score"        value="94.1"    icon={ShieldCheck}   color="text-green-600"  badge="Excellent" badgeColor="bg-green-50 text-green-600"  />
      <StatCard label="Budget Variance"     value="-RM 0.6M" icon={DollarSign}   color="text-purple-600" badge="On Track"  badgeColor="bg-purple-50 text-purple-600" />
      <StatCard label="Material Wastage"    value="3.2%"    icon={Package}       color="text-orange-600" badge="Low"       badgeColor="bg-orange-50 text-orange-600" />
      <StatCard label="HSE Incidents (YTD)" value="6"       icon={AlertTriangle} color="text-red-600"    badge="↓ 25%"    badgeColor="bg-red-50 text-red-500"     />
      <StatCard label="On-Time Deliveries"  value="88.4%"   icon={CheckCircle}   color="text-teal-600"   badge="Good"     badgeColor="bg-teal-50 text-teal-600"   />
    </div>

    {/* ── Row 1: Monthly Trend + Radar ── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={TrendingUp} title="Monthly Progress Trend (%)" sub="Jan–Jun 2025 cumulative completion" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyProgressData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {['Vale Slope', 'Melaka Road', 'PJS Drainage', 'MRCB TVET'].map((k, i) => (
                  <linearGradient key={k} id={`g${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={COLORS[i]} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={COLORS[i]} stopOpacity={0}   />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              {['Vale Slope', 'Melaka Road', 'PJS Drainage', 'MRCB TVET'].map((k, i) => (
                <Area key={k} type="monotone" dataKey={k} stroke={COLORS[i]} fill={`url(#g${i})`} strokeWidth={2} dot={false} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Activity} title="Site Performance Radar" sub="Multi-metric benchmark" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius={80}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              {['Vale Slope', 'Melaka Road', 'PJS Drainage', 'MRCB TVET'].map((k, i) => (
                <Radar key={k} name={k} dataKey={k} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.12} strokeWidth={2} />
              ))}
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* ── Row 2: Equipment Fleet + Pie ── */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Wrench} title="Equipment Fleet Status" sub="Active · Idle · Maintenance breakdown" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={equipmentData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} fontSize={11} fontWeight={600} width={80} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Active"      dataKey="active"      fill="#22c55e" radius={[0, 4, 4, 0]} barSize={12} stackId="a" />
              <Bar name="Idle"        dataKey="idle"        fill="#f59e0b" radius={[0, 0, 0, 0]} barSize={12} stackId="a" />
              <Bar name="Maintenance" dataKey="maintenance" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Truck} title="Fleet Utilisation" sub="49 total units" />
        <div className="h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={fleetPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {fleetPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} units`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-2">
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

    {/* ── Row 3: Budget Burn + Safety ── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={DollarSign} title="Budget Burn Rate (RM M)" sub="Budgeted vs Actual vs Forecast" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} tickFormatter={v => `${v}M`} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => [`RM ${v}M`, '']} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line name="Budget"   type="monotone" dataKey="budget"   stroke="#94a3b8" strokeWidth={2} strokeDasharray="6 3" dot={false} />
              <Line name="Actual"   type="monotone" dataKey="actual"   stroke="#1e3a8a" strokeWidth={2.5} dot={{ r: 4, fill: '#1e3a8a' }} />
              <Line name="Forecast" type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 2" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={ShieldCheck} title="HSE Safety Metrics" sub="Incidents · Near-Miss · Training sessions" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={safetyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Incidents"    dataKey="incidents"       fill="#ef4444" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar name="Near Miss"    dataKey="nearMiss"        fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar name="Training Hrs" dataKey="trainingSessions" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* ── Row 4: Workforce Distribution + Materials ── */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Users} title="Workforce Distribution by Site" sub="Skilled · Unskilled · Supervisors" />
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={workerData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="site" axisLine={false} tickLine={false} fontSize={11} />
              <YAxis axisLine={false} tickLine={false} fontSize={11} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar name="Skilled"      dataKey="skilled"     fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar name="Unskilled"    dataKey="unskilled"   fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={18} />
              <Bar name="Supervisors"  dataKey="supervisors" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <SectionTitle icon={Package} title="Materials Inventory Status" sub="Ordered · Delivered · Consumed" />
        <div className="space-y-4 mt-2">
          {materialData.map((m, i) => {
            const deliveredPct = Math.round((m.delivered / m.ordered) * 100);
            const usedPct      = Math.round((m.used / m.ordered) * 100);
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">{m.name}</span>
                  <span className="text-[10px] text-slate-400">{m.delivered}/{m.ordered} {m.unit} delivered</span>
                </div>
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-blue-200" style={{ width: `${deliveredPct}%` }}></div>
                  <div className="absolute left-0 top-0 h-full rounded-full bg-blue-700" style={{ width: `${usedPct}%` }}></div>
                </div>
                <div className="flex gap-4 mt-1 text-[9px] font-bold text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-700 inline-block"></span>Used {usedPct}%</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-200 inline-block"></span>Delivered {deliveredPct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* ── Insight Panel ── */}
    <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-8 rounded-3xl text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-xl"><Clock className="w-5 h-5 text-white" /></div>
        <h3 className="text-base font-bold">AI-Assisted Insights — June 2025</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { color: 'border-orange-400', title: 'Schedule Risk',  body: 'Melaka Road Dev at 38% vs 45% planned. At current velocity, projected completion is Aug 2026 — 6 weeks behind contract deadline.' },
          { color: 'border-green-400',  title: 'Cost Saving',    body: 'Redeploying 3 idle excavators from Vale Slope to PJS Drainage could reduce equipment rental cost by RM 42k over next 8 weeks.' },
          { color: 'border-blue-400',   title: 'Safety Trend',   body: 'Zero incidents in Mar & May. Correlates with increased training sessions (60+). Recommend maintaining ≥50 sessions/month across all sites.' },
        ].map((ins, i) => (
          <div key={i} className={`bg-white/10 border-l-4 ${ins.color} p-5 rounded-xl`}>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">{ins.title}</p>
            <p className="text-sm leading-relaxed text-slate-100">{ins.body}</p>
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
      <aside className="hidden lg:flex flex-col w-20 bg-blue-950 items-center py-8 gap-10 border-r border-blue-900 shadow-xl z-20">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-blue-950 text-xl shadow-lg">D</div>
        <nav className="flex flex-col gap-6 text-blue-400">
          <button className="p-3 hover:bg-blue-900 rounded-xl transition-colors text-white"><LayoutDashboard className="w-6 h-6" /></button>
          <button className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><MapPin className="w-6 h-6" /></button>
          <button className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><Bell className="w-6 h-6" /></button>
          <button className="p-3 hover:bg-blue-900 rounded-xl transition-colors"><Settings className="w-6 h-6" /></button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-w-[1600px] mx-auto w-full">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'analytics'  && <AnalyticsView  />}
        {activeTab === 'geospatial' && <GeospatialView />}
        {activeTab === 'analysis'   && <AnalysisView   />}
        <footer className="mt-12 flex justify-between items-center text-slate-400 border-t border-slate-200 pt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest italic">Confidential — Daengco Sdn Bhd Board Access Only</p>
          <div className="flex gap-4 text-xs font-bold">
            <span>SYSTEM V4.1.0</span>
            <span className="text-emerald-500">ENCRYPTED</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
