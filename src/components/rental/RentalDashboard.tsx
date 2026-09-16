import { useState } from 'react';
import { 
  Calendar, 
  Car, 
  Users, 
  Clock, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { RentalContract } from '../../types';

const mockContracts: RentalContract[] = [
  {
    id: 'r1',
    contractNumber: 'L-2024-001',
    vehicleId: 'v1',
    vehicleName: 'Toyota Hilux (AB-123-CD)',
    customerId: 'c1',
    customerName: 'Jean Dupont',
    startDate: Date.now() - 432000000,
    endDate: Date.now() + 172800000,
    type: 'short',
    status: 'active',
    pricing: { baseRate: 85, rateUnit: 'day', deposit: 1500, includedKm: 1000, excessKmRate: 0.25 },
    billing: { totalAmount: 425, paidAmount: 425, status: 'paid' },
    extensions: []
  },
  {
    id: 'r2',
    contractNumber: 'L-2024-002',
    vehicleId: 'v2',
    vehicleName: 'Mercedes Actros (XY-987-ZT)',
    customerId: 'c2',
    customerName: 'Tech Solutions SA',
    startDate: Date.now() - 86400000,
    endDate: Date.now() + 2592000000,
    type: 'medium',
    status: 'active',
    pricing: { baseRate: 2500, rateUnit: 'month', deposit: 5000, includedKm: 5000, excessKmRate: 0.50 },
    billing: { totalAmount: 2500, paidAmount: 1000, status: 'partially_paid' },
    extensions: []
  }
];

export function RentalDashboard() {
  const [contracts] = useState<RentalContract[]>(mockContracts);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Gestion des Locations</h2>
          <p className="text-sm text-slate-500 font-medium">Court, Moyen et Long Terme</p>
        </div>
        <div className="flex gap-2">
          <Link to="/rental/catalog" className="bg-white border border-neutral-200 text-navy-main px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            <Car size={18} /> Catalogue Véhicules
          </Link>
          <Link to="/rental/new" className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20 flex items-center gap-2">
            <Plus size={18} /> Nouvelle Location
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Locations Actives', value: '24', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Retours du Jour', value: '5', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Taux d\'Occupation', value: '78%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Chiffre d\'Affaires', value: '42.5k €', icon: DollarSign, color: 'text-navy-main', bg: 'bg-slate-100' }
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                <FileText size={18} /> Contrats en cours
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-1.5 bg-white border border-neutral-200 rounded-lg text-[10px] outline-none w-48" />
              </div>
            </div>
            <div className="divide-y divide-neutral-100">
              {contracts.map(contract => (
                <div key={contract.id} className="p-5 hover:bg-slate-50 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-100 rounded-2xl text-navy-main">
                        <Car size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black text-navy-main uppercase">{contract.contractNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            contract.type === 'short' ? 'bg-blue-100 text-blue-600' : 
                            contract.type === 'medium' ? 'bg-purple-100 text-purple-600' : 
                            'bg-indigo-100 text-indigo-600'
                          }`}>
                            {contract.type === 'short' ? 'Court Terme' : contract.type === 'medium' ? 'Moyen Terme' : 'Long Terme'}
                          </span>
                        </div>
                        <p className="font-bold text-navy-main">{contract.vehicleName}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase flex items-center gap-2 mt-1">
                          <Users size={12} /> {contract.customerName} • <Calendar size={12} /> Fin le {new Date(contract.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Facturation</p>
                        <p className={`text-xs font-black ${contract.billing.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                          {contract.billing.totalAmount} € - {contract.billing.status === 'paid' ? 'Soldé' : 'À régler'}
                        </p>
                      </div>
                      <Link to={`/rental/contract/${contract.id}`} className="p-2.5 bg-white border border-neutral-200 rounded-xl text-slate-400 hover:text-navy-main hover:border-navy-main transition-all shadow-sm">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" /> Alertes Retards
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl space-y-1">
                <p className="text-xs font-bold text-red-700">Renault Master (LM-789-PQ)</p>
                <p className="text-[10px] text-red-500 font-medium">Retard: 2 jours • Client: LogiTransport</p>
                <div className="flex gap-2 mt-2">
                  <button className="text-[10px] font-black text-red-700 uppercase bg-white px-2 py-1 rounded">Relancer</button>
                  <button className="text-[10px] font-black text-white uppercase bg-red-600 px-2 py-1 rounded">Clôturer</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-navy-main rounded-2xl p-6 text-white shadow-xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Calendar size={16} /> Disponibilité Flotte
            </h3>
            <div className="space-y-4">
              {[
                { cat: 'Berlines', total: 15, available: 3 },
                { cat: 'Utilitaires', total: 20, available: 12 },
                { cat: 'SUV / 4x4', total: 10, available: 2 },
                { cat: 'Luxe', total: 5, available: 4 }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span>{item.cat}</span>
                    <span>{item.available} / {item.total} dispos</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.available < 3 ? 'bg-red-500' : 'bg-brand-orange'}`} 
                      style={{ width: `${(item.available / item.total) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
