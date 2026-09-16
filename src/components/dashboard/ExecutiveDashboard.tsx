import React, { useState } from 'react';
import { 
  Car, Wrench, AlertTriangle, CheckCircle2, Clock, DollarSign, Fuel, 
  Package, FileText, Users, TrendingUp, BarChart3, ShieldAlert, Calendar,
  ArrowUpRight, ArrowDownRight, RefreshCw, Building2, ExternalLink,
  CheckCircle, Layers, Cpu, ShieldCheck, Activity, PieChart as PieIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';

import { agencyList } from '../finance/financeData';

// Executive Macro-Dashboard (Non-redundant, strategic overview connected to agencies)
export function ExecutiveDashboard() {
  const navigate = useNavigate();
  const [selectedAgency, setSelectedAgency] = useState<string>('Toutes les agences');

  // Agency-specific data mapping for real-time indicator filtering
  const agencyDataMap: Record<string, {
    totalRevenue: number;
    revenueGrowth: string;
    totalOperatingCosts: number;
    costTrend: string;
    fleetAvailabilityRate: number;
    totalFleetCount: number;
    immobilizedCount: number;
    activeWorkloadOrders: number;
    avgImmobilizationHours: number;
    activeRentalContracts: number;
    inventoryStockValue: number;
    riskAlertsCount: number;
    financialPerformanceData: Array<{ mois: string; ca: number; couts: number }>;
    fleetStatusData: Array<{ name: string; value: number; color: string }>;
    workshopWorkloadData: Array<{ atelier: string; charge: number }>;
    costPerAgencyData: Array<{ agence: string; cout: number }>;
  }> = {
    'Toutes les agences': {
      totalRevenue: 189500,
      revenueGrowth: "+12.4% vs M-1",
      totalOperatingCosts: 39050,
      costTrend: "-3.1% d'optimisation",
      fleetAvailabilityRate: 85.7,
      totalFleetCount: 42,
      immobilizedCount: 6,
      activeWorkloadOrders: 12,
      avgImmobilizationHours: 38.5,
      activeRentalContracts: 31,
      inventoryStockValue: 184200,
      riskAlertsCount: 7,
      financialPerformanceData: [
        { mois: 'Jan', ca: 165000, couts: 32000 },
        { mois: 'Fév', ca: 172000, couts: 34200 },
        { mois: 'Mar', ca: 169000, couts: 32600 },
        { mois: 'Avr', ca: 178000, couts: 37300 },
        { mois: 'Mai', ca: 181000, couts: 35900 },
        { mois: 'Juin', ca: 189000, couts: 40200 },
        { mois: 'Juil', ca: 194000, couts: 42000 },
        { mois: 'Août', ca: 186000, couts: 37900 },
        { mois: 'Sep', ca: 189500, couts: 39050 }
      ],
      fleetStatusData: [
        { name: 'Disponibles', value: 28, color: '#10B981' },
        { name: 'En Location / Mission', value: 8, color: '#3B82F6' },
        { name: 'En Maintenance Atelier', value: 6, color: '#F59E0B' },
      ],
      workshopWorkloadData: [
        { atelier: 'Paris Central', charge: 88 },
        { atelier: 'Lyon Rhône-Alpes', charge: 75 },
        { atelier: 'Lille Nord', charge: 82 },
        { atelier: 'Abidjan CI', charge: 91 }
      ],
      costPerAgencyData: [
        { agence: 'Paris Central', cout: 42000 },
        { agence: 'Lyon Rhône-Alpes', cout: 31500 },
        { agence: 'Lille Nord', cout: 24800 },
        { agence: 'Abidjan CI', cout: 18900 }
      ]
    },
    'Atelier Central - Paris': {
      totalRevenue: 85400,
      revenueGrowth: "+14.2% vs M-1",
      totalOperatingCosts: 18200,
      costTrend: "-4.5% d'optimisation",
      fleetAvailabilityRate: 90.0,
      totalFleetCount: 20,
      immobilizedCount: 2,
      activeWorkloadOrders: 5,
      avgImmobilizationHours: 32.0,
      activeRentalContracts: 14,
      inventoryStockValue: 92400,
      riskAlertsCount: 2,
      financialPerformanceData: [
        { mois: 'Jan', ca: 74000, couts: 15000 },
        { mois: 'Fév', ca: 78000, couts: 16200 },
        { mois: 'Mar', ca: 76000, couts: 15500 },
        { mois: 'Avr', ca: 81000, couts: 17800 },
        { mois: 'Mai', ca: 83000, couts: 17100 },
        { mois: 'Juin', ca: 85400, couts: 18200 },
        { mois: 'Juil', ca: 88000, couts: 19000 },
        { mois: 'Août', ca: 84000, couts: 17500 },
        { mois: 'Sep', ca: 85400, couts: 18200 }
      ],
      fleetStatusData: [
        { name: 'Disponibles', value: 14, color: '#10B981' },
        { name: 'En Location / Mission', value: 4, color: '#3B82F6' },
        { name: 'En Maintenance Atelier', value: 2, color: '#F59E0B' },
      ],
      workshopWorkloadData: [
        { atelier: 'Paris Central', charge: 88 },
        { atelier: 'Équipe Diesel', charge: 92 },
        { atelier: 'Électricité', charge: 78 }
      ],
      costPerAgencyData: [
        { agence: 'Paris Central', cout: 18200 }
      ]
    },
    'Atelier Lyon - Rhône-Alpes': {
      totalRevenue: 54200,
      revenueGrowth: "+9.8% vs M-1",
      totalOperatingCosts: 11400,
      costTrend: "-2.1% d'optimisation",
      fleetAvailabilityRate: 83.3,
      totalFleetCount: 12,
      immobilizedCount: 2,
      activeWorkloadOrders: 4,
      avgImmobilizationHours: 41.5,
      activeRentalContracts: 9,
      inventoryStockValue: 48000,
      riskAlertsCount: 2,
      financialPerformanceData: [
        { mois: 'Jan', ca: 48000, couts: 9800 },
        { mois: 'Fév', ca: 50000, couts: 10200 },
        { mois: 'Mar', ca: 49000, couts: 9900 },
        { mois: 'Avr', ca: 52000, couts: 11000 },
        { mois: 'Mai', ca: 53000, couts: 10800 },
        { mois: 'Juin', ca: 54200, couts: 11400 },
        { mois: 'Juil', ca: 56000, couts: 12000 },
        { mois: 'Août', ca: 53000, couts: 11000 },
        { mois: 'Sep', ca: 54200, couts: 11400 }
      ],
      fleetStatusData: [
        { name: 'Disponibles', value: 8, color: '#10B981' },
        { name: 'En Location / Mission', value: 2, color: '#3B82F6' },
        { name: 'En Maintenance Atelier', value: 2, color: '#F59E0B' },
      ],
      workshopWorkloadData: [
        { atelier: 'Lyon Rhône-Alpes', charge: 75 },
        { atelier: 'Poids Lourds', charge: 80 },
        { atelier: 'Hydraulique', charge: 70 }
      ],
      costPerAgencyData: [
        { agence: 'Lyon Rhône-Alpes', cout: 11400 }
      ]
    },
    'Concession Lille - Nord': {
      totalRevenue: 34900,
      revenueGrowth: "+11.1% vs M-1",
      totalOperatingCosts: 6850,
      costTrend: "-5.2% d'optimisation",
      fleetAvailabilityRate: 80.0,
      totalFleetCount: 10,
      immobilizedCount: 2,
      activeWorkloadOrders: 2,
      avgImmobilizationHours: 36.0,
      activeRentalContracts: 6,
      inventoryStockValue: 31800,
      riskAlertsCount: 2,
      financialPerformanceData: [
        { mois: 'Jan', ca: 30000, couts: 6000 },
        { mois: 'Fév', ca: 31500, couts: 6300 },
        { mois: 'Mar', ca: 31000, couts: 6100 },
        { mois: 'Avr', ca: 33000, couts: 6700 },
        { mois: 'Mai', ca: 34000, couts: 6500 },
        { mois: 'Juin', ca: 34900, couts: 6850 },
        { mois: 'Juil', ca: 35500, couts: 7100 },
        { mois: 'Août', ca: 34000, couts: 6600 },
        { mois: 'Sep', ca: 34900, couts: 6850 }
      ],
      fleetStatusData: [
        { name: 'Disponibles', value: 6, color: '#10B981' },
        { name: 'En Location / Mission', value: 2, color: '#3B82F6' },
        { name: 'En Maintenance Atelier', value: 2, color: '#F59E0B' },
      ],
      workshopWorkloadData: [
        { atelier: 'Concession Lille', charge: 82 },
        { atelier: 'Véhicules Utilitaires', charge: 85 },
        { atelier: 'Carrosserie', charge: 79 }
      ],
      costPerAgencyData: [
        { agence: 'Concession Lille - Nord', cout: 6850 }
      ]
    },
    'Agence Abidjan - Côte d’Ivoire': {
      totalRevenue: 15000,
      revenueGrowth: "+18.5% vs M-1",
      totalOperatingCosts: 2600,
      costTrend: "-6.8% d'optimisation",
      fleetAvailabilityRate: 100.0,
      totalFleetCount: 4,
      immobilizedCount: 0,
      activeWorkloadOrders: 1,
      avgImmobilizationHours: 18.0,
      activeRentalContracts: 2,
      inventoryStockValue: 12000,
      riskAlertsCount: 1,
      financialPerformanceData: [
        { mois: 'Jan', ca: 12000, couts: 2200 },
        { mois: 'Fév', ca: 13000, couts: 2400 },
        { mois: 'Mar', ca: 12500, couts: 2300 },
        { mois: 'Avr', ca: 14000, couts: 2500 },
        { mois: 'Mai', ca: 14500, couts: 2550 },
        { mois: 'Juin', ca: 15000, couts: 2600 },
        { mois: 'Juil', ca: 15500, couts: 2700 },
        { mois: 'Août', ca: 14800, couts: 2550 },
        { mois: 'Sep', ca: 15000, couts: 2600 }
      ],
      fleetStatusData: [
        { name: 'Disponibles', value: 3, color: '#10B981' },
        { name: 'En Location / Mission', value: 1, color: '#3B82F6' },
        { name: 'En Maintenance Atelier', value: 0, color: '#F59E0B' },
      ],
      workshopWorkloadData: [
        { atelier: 'Agence Abidjan', charge: 91 },
        { atelier: 'Engins BTP', charge: 95 },
        { atelier: 'Maintenance Générale', charge: 88 }
      ],
      costPerAgencyData: [
        { agence: 'Agence Abidjan - CI', cout: 2600 }
      ]
    }
  };

  const currentData = agencyDataMap[selectedAgency] || agencyDataMap['Toutes les agences'];

  // Module integration shortcuts
  const connectedModules = [
    { name: 'Flotte & Parc', path: '/vehicules', desc: `${currentData.totalFleetCount} véhicules gérés`, icon: Car, color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { name: 'Maintenance', path: '/maintenance', desc: 'Suivi pannes & alertes', icon: Wrench, color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { name: 'Atelier SAV', path: '/workshop', desc: `${currentData.activeWorkloadOrders} OR actifs`, icon: Layers, color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
    { name: 'Location', path: '/rental', desc: `${currentData.activeRentalContracts} contrats en cours`, icon: FileText, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { name: 'Finances', path: '/finance', desc: 'Trésorerie & Factures', icon: DollarSign, color: 'bg-teal-500/10 text-teal-600 border-teal-200' },
    { name: 'Stocks Pièces', path: '/stocks', desc: '1,250 références', icon: Package, color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
    { name: 'Carburant', path: '/carburant', desc: 'Suivi consommations', icon: Fuel, color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
    { name: 'Achats', path: '/achats', desc: 'Commandes en cours', icon: BarChart3, color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      
      {/* Executive Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-navy-main via-slate-900 to-navy-main p-8 rounded-3xl text-white shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Direction Générale • Pilotage Stratégique Macro</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase">Tableau de Bord Exécutif</h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Vue synthétique et décisionnelle filtrée pour : <strong className="text-brand-orange">{selectedAgency}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5">
              <Building2 size={16} className="text-brand-orange" />
              <select
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white outline-none cursor-pointer [&>option]:text-slate-900"
              >
                {agencyList.map((ag) => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white transition-colors flex items-center justify-center"
              title="Actualiser les données"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Quick Module Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {connectedModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(mod.path)}
                className="bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl p-3 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} className="text-brand-orange group-hover:scale-110 transition-transform" />
                  <ExternalLink size={12} className="text-slate-400 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">{mod.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{mod.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8 Non-Redundant Macro-KPIs Bento Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Indicateurs Stratégiques ({selectedAgency})
          </h3>
          <span className="text-xs text-slate-500 font-medium">Données filtrées en temps réel</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* KPI 1: Chiffre d'Affaires Global */}
          <div onClick={() => navigate('/finance')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Chiffre d'Affaires</span>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <TrendingUp size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.totalRevenue.toLocaleString()} €</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1">
                  <ArrowUpRight size={13} /> {currentData.revenueGrowth}
                </span>
                <span className="text-xs text-slate-400">vs M-1</span>
              </div>
            </div>
          </div>

          {/* KPI 2: Coûts Opérationnels Consolidés */}
          <div onClick={() => navigate('/finance')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Coûts Opérationnels</span>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                <DollarSign size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.totalOperatingCosts.toLocaleString()} €</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1">
                  <ArrowDownRight size={13} /> {currentData.costTrend}
                </span>
                <span className="text-xs text-slate-400">Maintenance & Carburant</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Taux de Disponibilité Flotte */}
          <div onClick={() => navigate('/vehicules')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Disponibilité Flotte</span>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Car size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.fleetAvailabilityRate}%</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-semibold text-slate-600">
                  {currentData.totalFleetCount - currentData.immobilizedCount} / {currentData.totalFleetCount} actifs opérationnels
                </span>
              </div>
            </div>
          </div>

          {/* KPI 4: Actifs Immobilisés / En Panne */}
          <div onClick={() => navigate('/maintenance')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Parc Immobilisé</span>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
                <ShieldAlert size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-rose-600 tracking-tight">{currentData.immobilizedCount} <span className="text-lg font-bold text-slate-400">véhicules</span></p>
              <span className="text-xs text-rose-700 font-medium mt-2 block">
                Temps d'immo. moyen: {currentData.avgImmobilizationHours}h
              </span>
            </div>
          </div>

          {/* KPI 5: Charge Atelier (OR Actifs) */}
          <div onClick={() => navigate('/workshop')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Ordres de Réparation (OR)</span>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Wrench size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.activeWorkloadOrders} <span className="text-lg font-bold text-slate-400">en cours</span></p>
              <span className="text-xs text-slate-500 mt-2 block">Affectés à l'atelier de l'agence</span>
            </div>
          </div>

          {/* KPI 6: Contrats de Location Actifs */}
          <div onClick={() => navigate('/rental')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Contrats Location Actifs</span>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                <FileText size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.activeRentalContracts}</p>
              <span className="text-xs text-emerald-600 font-semibold mt-2 block">
                Actifs sur ce site
              </span>
            </div>
          </div>

          {/* KPI 7: Valorisation du Stock Pièces */}
          <div onClick={() => navigate('/stocks')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Valorisation Stock Pièces</span>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Package size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-navy-main tracking-tight">{currentData.inventoryStockValue.toLocaleString()} €</p>
              <span className="text-xs text-slate-500 mt-2 block">Magasin de pièces agence</span>
            </div>
          </div>

          {/* KPI 8: Alertes Risques & Conformité */}
          <div onClick={() => navigate('/maintenance')} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-navy-main">Alertes & Préventifs</span>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
                <AlertTriangle size={22} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black text-rose-600 tracking-tight">{currentData.riskAlertsCount} <span className="text-lg font-bold text-slate-400">urgences</span></p>
              <span className="text-xs text-rose-700 font-medium mt-2 block">
                Nécessitent une action immédiate
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Strategic Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart: Financial Performance (CA vs Coûts) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-navy-main text-lg">Performance Financière ({selectedAgency})</h3>
              <p className="text-xs text-slate-500">Comparatif Chiffre d'Affaires vs Coûts Opérationnels</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider">
              {selectedAgency === 'Toutes les agences' ? 'Consolidé Groupe' : selectedAgency}
            </span>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.financialPerformanceData}>
                <defs>
                  <linearGradient id="colorCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCouts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mois" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip formatter={(val: any) => [`${val.toLocaleString()} €`, '']} />
                <Legend />
                <Area type="monotone" dataKey="ca" name="Chiffre d'Affaires (€)" stroke="#10B981" fillOpacity={1} fill="url(#colorCA)" />
                <Area type="monotone" dataKey="couts" name="Coûts Opérationnels (€)" stroke="#EF4444" fillOpacity={1} fill="url(#colorCouts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart: Fleet Status Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy-main text-lg">État Opérationnel Flotte</h3>
            <p className="text-xs text-slate-500">Répartition pour {selectedAgency}</p>
          </div>
          <div className="h-64 w-full flex items-center justify-center my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.fleetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={6}
                  dataKey="value"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {currentData.fleetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Total: {currentData.totalFleetCount} Unités</span>
            <button onClick={() => navigate('/vehicules')} className="text-brand-orange font-bold hover:underline">
              Voir le détail →
            </button>
          </div>
        </div>

        {/* Regional Cost Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-main text-base">Coûts par Agence</h3>
              <p className="text-xs text-slate-500">Budget géographique</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.costPerAgencyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="agence" type="category" stroke="#64748b" fontSize={11} width={100} />
                <Tooltip formatter={(val: any) => [`${val.toLocaleString()} €`, 'Budget']} />
                <Bar dataKey="cout" name="Coût (€)" fill="#1e3a8a" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workshop Workload Capacity */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-navy-main text-base">Taux d'Occupation des Ateliers (%)</h3>
              <p className="text-xs text-slate-500">Charge de travail par pôle technique</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">Capacité Optimale</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData.workshopWorkloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="atelier" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                <Tooltip formatter={(val: any) => [`${val}%`, 'Charge']} />
                <Bar dataKey="charge" name="Taux d'occupation (%)" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}



