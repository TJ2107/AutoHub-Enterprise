import { useState } from 'react';
import { WorkshopOrder, Technician } from '../../types';
import { 
  Calendar, 
  Clock, 
  User, 
  Car, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  Plus, 
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockTechnicians: Technician[] = [
  { id: 't1', name: 'Marco Silva', specialty: 'Mécanique lourde', status: 'busy' },
  { id: 't2', name: 'Sofiane Ben', specialty: 'Électronique', status: 'available' },
  { id: 't3', name: 'Léa Bernard', specialty: 'Carrosserie', status: 'busy' },
];

const mockOrders: WorkshopOrder[] = [
  {
    id: 'w1',
    orderNumber: 'OR-2024-001',
    vehicleId: 'v1',
    vehicleName: 'Toyota Hilux (AB-123-CD)',
    customerId: 'c1',
    customerName: 'Jean Dupont',
    technicianId: 't1',
    technicianName: 'Marco Silva',
    entryDate: Date.now() - 172800000,
    expectedReturnDate: Date.now() + 86400000,
    symptoms: 'Bruit suspect moteur',
    status: 'repairing',
    priority: 'high',
    workZone: 'Pont 1',
    mileageAtEntry: 45000,
    tasks: [],
    parts: [],
    laborCost: 0,
    partsCost: 0,
    totalCost: 0
  },
  {
    id: 'w2',
    orderNumber: 'OR-2024-002',
    vehicleId: 'v2',
    vehicleName: 'Mercedes Actros (XY-987-ZT)',
    customerId: 'c2',
    customerName: 'Tech Solutions SA',
    technicianId: 't3',
    technicianName: 'Léa Bernard',
    entryDate: Date.now() - 86400000,
    expectedReturnDate: Date.now() - 3600000,
    symptoms: 'Révision annuelle',
    status: 'quality_control',
    priority: 'medium',
    workZone: 'Baie 4',
    mileageAtEntry: 120000,
    tasks: [],
    parts: [],
    laborCost: 0,
    partsCost: 0,
    totalCost: 0
  }
];

export function WorkshopPlanning() {
  const [orders] = useState<WorkshopOrder[]>(mockOrders);
  const [techs] = useState<Technician[]>(mockTechnicians);

  const getStatusColor = (status: WorkshopOrder['status']) => {
    switch (status) {
      case 'repairing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'quality_control': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ready_to_return': return 'bg-green-100 text-green-700 border-green-200';
      case 'waiting_parts': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'diagnosing': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Planning Atelier</h2>
            <div className="h-8 w-px bg-neutral-200 hidden md:block" />
            <div className="flex bg-white border border-neutral-200 rounded-lg p-1 text-[10px] font-bold uppercase tracking-widest">
                <button className="px-3 py-1.5 bg-navy-main text-white rounded-md">Vue Globale</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-md">Par Technicien</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-md">Par Pont</button>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <Filter size={18} />
            </button>
            <Link to="/workshop/new" className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20 flex items-center gap-2">
                <Plus size={18} /> Nouvelle Réception
            </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Techs & Stats */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                    <User size={16} /> Équipe en poste
                </h3>
                <div className="space-y-3">
                    {techs.map(tech => (
                        <div key={tech.id} className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 hover:border-navy-main/20 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${tech.status === 'available' ? 'bg-green-500' : 'bg-orange-500'}`} />
                                <div>
                                    <p className="text-xs font-bold text-navy-main group-hover:text-brand-orange transition-colors">{tech.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{tech.specialty}</p>
                                </div>
                            </div>
                            {tech.status === 'busy' && <Clock size={14} className="text-slate-300" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-navy-main rounded-2xl p-5 text-white shadow-xl space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Charge de travail</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                            <span>Occupation Ponts</span>
                            <span>80%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-orange" style={{ width: '80%' }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">En cours</p>
                            <p className="text-xl font-black">12</p>
                        </div>
                        <div className="bg-slate-800 p-3 rounded-xl">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Retards</p>
                            <p className="text-xl font-black text-red-400">2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Board */}
        <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Wrench size={18} className="text-navy-main" />
                        <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Interventions Actives</h3>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="text" placeholder="Véhicule, OR, Client..." className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-navy-main w-64" />
                    </div>
                </div>
                <div className="divide-y divide-neutral-100">
                    {orders.map(order => (
                        <div key={order.id} className="p-5 hover:bg-slate-50 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-slate-100 rounded-2xl text-navy-main group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <Car size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-black text-navy-main uppercase">{order.orderNumber}</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                                {order.status.replace('_', ' ')}
                                            </span>
                                            {order.priority === 'urgent' && (
                                                <span className="flex items-center gap-1 text-[10px] font-black uppercase text-red-600 animate-pulse">
                                                    <AlertTriangle size={12} /> Urgent
                                                </span>
                                            )}
                                        </div>
                                        <p className="font-bold text-navy-main">{order.vehicleName}</p>
                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight flex items-center gap-2 mt-1">
                                            <User size={12} /> {order.customerName} • <Clock size={12} /> Sortie prévue: {new Date(order.expectedReturnDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Zone</p>
                                        <p className="text-xs font-black text-navy-main">{order.workZone || 'N/A'}</p>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Responsable</p>
                                        <p className="text-xs font-black text-navy-main">{order.technicianName || 'Non affecté'}</p>
                                    </div>
                                    <Link to={`/workshop/order/${order.id}`} className="p-2.5 bg-white border border-neutral-200 rounded-xl text-slate-400 hover:text-navy-main hover:border-navy-main transition-all shadow-sm">
                                        <ChevronRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Immobilized Vehicles */}
            <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
                <h3 className="text-xs font-black text-red-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <AlertTriangle size={16} /> Véhicules Immobilisés (Alerte)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-navy-main">Ford Ranger (JK-456-LM)</p>
                            <p className="text-[10px] text-red-500 font-medium">Attente Pièces (Turbo) • J+5</p>
                        </div>
                        <button className="text-[10px] font-black text-navy-main uppercase hover:text-brand-orange">Relancer</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
