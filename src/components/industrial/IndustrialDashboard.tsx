import { useState } from 'react';
import { 
  Truck, 
  Settings, 
  Zap, 
  Activity, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Tractor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { IndustrialEquipment } from '../../types';

const mockEquipment: IndustrialEquipment[] = [
  {
    id: 'e1',
    inventoryNumber: 'INV-CAT-001',
    name: 'Pelle Hydraulique 320',
    brand: 'Caterpillar',
    model: '320 Next Gen',
    serialNumber: 'CAT320X12345',
    type: 'construction',
    location: 'Chantier A1 - Nord',
    owner: 'AutoHub Construction',
    operatingHours: 1250,
    capacity: '20 Tons',
    status: 'operational',
    acquisitionDate: Date.now() - 31536000000,
    warrantyExpiration: Date.now() + 31536000000,
    lastServiceHours: 1000,
    nextServiceHours: 1500
  },
  {
    id: 'e2',
    inventoryNumber: 'INV-GEN-042',
    name: 'Groupe Électrogène 500kVA',
    brand: 'Cummins',
    model: 'C500 D5',
    serialNumber: 'CUM-998877',
    type: 'generator',
    location: 'Site Logistique Alpha',
    owner: 'Energy Solutions',
    operatingHours: 4500,
    capacity: '500 kVA',
    status: 'maintenance',
    acquisitionDate: Date.now() - 63072000000,
    warrantyExpiration: Date.now() - 86400000,
    lastServiceHours: 4000,
    nextServiceHours: 4500
  },
  {
    id: 'e3',
    inventoryNumber: 'INV-BUS-010',
    name: 'Bus Interurbain',
    brand: 'Volvo',
    model: '9700',
    serialNumber: 'VLV-BUS-1122',
    type: 'bus',
    location: 'Dépôt Central',
    owner: 'Transports Régionaux',
    operatingHours: 8500,
    capacity: '55 Places',
    status: 'immobilized',
    acquisitionDate: Date.now() - 94608000000,
    warrantyExpiration: Date.now() - 172800000,
    lastServiceHours: 8000,
    nextServiceHours: 9000
  }
];

export function IndustrialDashboard() {
  const [equipment] = useState<IndustrialEquipment[]>(mockEquipment);

  const getStatusColor = (status: IndustrialEquipment['status']) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-600 border-green-200';
      case 'maintenance': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'immobilized': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getTypeIcon = (type: IndustrialEquipment['type']) => {
    switch (type) {
      case 'truck': return <Truck size={20} />;
      case 'bus': return <Truck size={20} />; // Simplified for icon set
      case 'generator': return <Zap size={20} />;
      case 'construction': return <Tractor size={20} />;
      default: return <Settings size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Véhicules Industriels & Équipements</h2>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-tight">Gestion du Parc Lourd et Matériel Technique</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-neutral-200 text-navy-main px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            <Cpu size={16} /> Diagnostic OBD/IoT
          </button>
          <Link to="/industriels/new" className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20 flex items-center gap-2">
            <Plus size={16} /> Nouvel Équipement
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Unités Opérationnelles', value: '42', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Heures Moteur (Mois)', value: '1,250h', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Alertes Maintenance', value: '8', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Disponibilité Globale', value: '88%', icon: Activity, color: 'text-navy-main', bg: 'bg-slate-100' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-black text-navy-main">{stat.value}</p>
              <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Settings size={20} className="text-navy-main" />
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Inventaire Équipements</h3>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Rechercher par n° d'inventaire, marque..." className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-[10px] outline-none w-64" />
                </div>
                <button className="p-2 bg-white border border-neutral-200 rounded-xl text-slate-500">
                    <Filter size={18} />
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-neutral-200">
                    <tr>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Équipement</th>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Type</th>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Localisation</th>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Utilisation</th>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Prochaine Échéance</th>
                        <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Statut</th>
                        <th className="px-6 py-4"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {equipment.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-all group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-navy-main group-hover:bg-white group-hover:shadow-sm transition-all">
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-navy-main uppercase tracking-tight">{item.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">#{item.inventoryNumber}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{item.type}</span>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-xs font-bold text-navy-main flex items-center gap-1">
                                    <MapPin size={12} className="text-slate-400" /> {item.location}
                                </p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-navy-main">{item.operatingHours.toLocaleString()}h</p>
                                    <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(item.operatingHours % 1000) / 10}%` }} />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-black text-navy-main">{item.nextServiceHours}h</p>
                                    <p className={`text-[10px] font-bold uppercase ${item.nextServiceHours - item.operatingHours < 100 ? 'text-red-500' : 'text-slate-400'}`}>
                                        Dans {item.nextServiceHours - item.operatingHours}h
                                    </p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link to={`/industriels/${item.id}`} className="p-2 text-slate-400 hover:text-navy-main transition-colors inline-block">
                                    <ChevronRight size={18} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-500" /> Immobilisations Critiques
              </h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                      <div>
                          <p className="text-xs font-black text-navy-main uppercase tracking-tight">Bus Interurbain #010</p>
                          <p className="text-[10px] text-red-600 font-bold">Panne Hydraulique • Site: Dépôt Central</p>
                      </div>
                      <Link to="/workshop/new" className="text-[10px] font-black text-white uppercase bg-red-600 px-3 py-1.5 rounded-lg hover:bg-red-700 transition-all">
                          Intervenir
                      </Link>
                  </div>
              </div>
          </div>
          <div className="bg-navy-main p-6 rounded-3xl text-white space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <TrendingUp size={18} /> Analyse Utilisation
              </h3>
              <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>Pelles Hydrauliques</span>
                        <span>85% de charge</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-orange" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>Groupes Électrogènes</span>
                        <span>40% de charge</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '40%' }} />
                    </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
