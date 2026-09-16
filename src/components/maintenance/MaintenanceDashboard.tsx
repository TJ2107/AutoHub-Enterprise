import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  BarChart3, 
  Wrench, 
  Calendar, 
  TrendingUp,
  Activity,
  Plus,
  Filter,
  ChevronRight,
  Search
} from 'lucide-react';
import { MaintenancePlan, CorrectiveAction } from '../../types';
import { Link } from 'react-router-dom';

const mockPreventive: MaintenancePlan[] = [
  {
    id: 'p1',
    vehicleId: 'v1',
    vehicleName: 'Toyota Hilux (AB-123-CD)',
    taskType: 'oil_change',
    nextDueKm: 55000,
    nextDueDate: Date.now() + 1209600000,
    priority: 'high',
    status: 'overdue',
    lastPerformedDate: Date.now() - 15552000000,
    lastPerformedKm: 45000
  },
  {
    id: 'p2',
    vehicleId: 'v2',
    vehicleName: 'Mercedes Actros (XY-987-ZT)',
    taskType: 'brakes',
    nextDueKm: 150000,
    nextDueDate: Date.now() + 2592000000,
    priority: 'medium',
    status: 'active',
    lastPerformedDate: Date.now() - 31104000000,
    lastPerformedKm: 120000
  }
];

const mockCorrective: CorrectiveAction[] = [
  {
    id: 'c1',
    vehicleId: 'v3',
    vehicleName: 'Ford Ranger (JK-456-LM)',
    reportedDate: Date.now() - 86400000,
    symptoms: 'Perte de puissance et fumée noire',
    priority: 'critical',
    status: 'repairing',
    downtimeHours: 24,
    partsUsed: [{ name: 'Turbocharger', cost: 1200 }],
    laborCost: 450,
    totalCost: 1650
  }
];

export function MaintenanceDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'preventive' | 'corrective'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Gestion de Maintenance (GMAO)</h2>
          <p className="text-sm text-slate-500 font-medium">Préventive, Corrective et Analyse de Performance</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-navy-main text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20">
            <Plus size={16} /> Nouvelle Alerte / Plan
          </button>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-neutral-200 w-fit">
        {[
          { id: 'overview', label: 'Tableau de bord', icon: BarChart3 },
          { id: 'preventive', label: 'Préventif', icon: ShieldCheck },
          { id: 'corrective', label: 'Correctif / Pannes', icon: AlertTriangle }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-navy-main text-white shadow-md' : 'text-slate-400 hover:text-navy-main'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disponibilité Flotte</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black text-navy-main">92%</p>
                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <Activity size={20} />
                </div>
              </div>
              <p className="text-[10px] text-green-600 font-bold">+2.4% vs mois dernier</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coût Maintenance / KM</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black text-navy-main">0.14 €</p>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <TrendingUp size={20} />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-bold">Cible: 0.12 €</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temps Moyen d'Arrêt</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black text-navy-main">4.2j</p>
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Clock size={20} />
                </div>
              </div>
              <p className="text-[10px] text-red-500 font-bold">+0.5j vs mois dernier</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ratio Préventif / Correctif</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-black text-navy-main">65/35</p>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <p className="text-[10px] text-blue-600 font-bold">Objectif: 80/20</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle size={18} className="text-brand-orange" /> Pannes Récurrentes & Criticité
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Circuit d\'injection (Toyota)', count: 8, trend: 'up' },
                  { label: 'Système de freinage (Mercedes)', count: 5, trend: 'stable' },
                  { label: 'Suspension (Ford)', count: 4, trend: 'down' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                    <span className="text-sm font-bold text-navy-main">{item.label}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-slate-500">{item.count} cas</span>
                      <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-red-500' : item.trend === 'down' ? 'bg-green-500' : 'bg-slate-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={18} /> Top Coûts Maintenance par Marque
              </h3>
              <div className="space-y-4">
                {[
                  { brand: 'Mercedes-Benz', amount: 45200, percentage: 85 },
                  { brand: 'Toyota', amount: 32800, percentage: 65 },
                  { brand: 'Ford', amount: 12400, percentage: 30 }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-navy-main">{item.brand}</span>
                      <span className="font-black text-slate-500">{item.amount.toLocaleString()} €</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-navy-main" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preventive' && (
        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-surface-gray">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Échéancier de Maintenance Préventive</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Véhicule..." className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs outline-none" />
              </div>
              <button className="p-2 bg-white border border-neutral-200 rounded-lg text-slate-500">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Véhicule</th>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Opération</th>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Dernière fois</th>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest text-center">Échéance</th>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Priorité</th>
                <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {mockPreventive.map(plan => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <p className="font-bold text-navy-main">{plan.vehicleName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Plan constructeur actif</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded-full">
                      {plan.taskType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                    {new Date(plan.lastPerformedDate).toLocaleDateString()}<br/>
                    ({plan.lastPerformedKm.toLocaleString()} KM)
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-sm font-black text-navy-main">{new Date(plan.nextDueDate).toLocaleDateString()}</p>
                    <p className="text-[10px] text-brand-orange font-bold uppercase tracking-tighter">Dans {plan.nextDueKm - 45000} KM</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      plan.priority === 'high' ? 'text-red-500' : 'text-slate-500'
                    }`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      plan.status === 'overdue' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {plan.status === 'overdue' ? 'RETARD' : 'À JOUR'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'corrective' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-surface-gray">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Journal des Interventions Correctives</h3>
              <button className="bg-navy-main text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Plus size={16} /> Déclarer une panne
              </button>
            </div>
            <div className="divide-y divide-neutral-100">
              {mockCorrective.map(action => (
                <div key={action.id} className="p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-black uppercase rounded">Critique</span>
                      <span className="text-xs font-black text-navy-main">#{action.id}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Déclaré le {new Date(action.reportedDate).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-lg font-black text-navy-main">{action.vehicleName}</h4>
                    <p className="text-sm text-slate-600 font-medium bg-white p-3 rounded-xl border border-neutral-100 italic">
                      "{action.symptoms}"
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-lg">En réparation</span>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Coût Estimé</p>
                      <p className="text-xl font-black text-navy-main">{action.totalCost.toLocaleString()} €</p>
                    </div>
                    <Link to={`/maintenance/${action.id}`} className="text-[10px] font-black text-navy-main uppercase tracking-widest flex items-center gap-1 hover:text-brand-orange transition-colors">
                      Détails de l'intervention <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
