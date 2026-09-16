import { useState } from 'react';
import { 
  Fuel, 
  MapPin, 
  Calendar, 
  User, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight, 
  DollarSign, 
  Activity,
  FileText,
  Map,
  Users,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FuelTransaction, Mission } from '../../types';

const mockFuelTransactions: FuelTransaction[] = [
  {
    id: 'f1',
    vehicleId: 'v1',
    vehicleName: 'Toyota Hilux (AB-123-CD)',
    driverId: 'd1',
    driverName: 'Marc Lefebvre',
    date: Date.now() - 3600000,
    station: 'TotalEnergies A1',
    fuelType: 'diesel',
    liters: 65,
    unitPrice: 1.85,
    totalAmount: 120.25,
    mileage: 45200,
    paymentMode: 'card',
    isAnomaly: false
  },
  {
    id: 'f2',
    vehicleId: 'v3',
    vehicleName: 'Ford Ranger (JK-456-LM)',
    driverId: 'd2',
    driverName: 'Sophie Bernard',
    date: Date.now() - 86400000,
    station: 'Shell Nord',
    fuelType: 'diesel',
    liters: 72,
    unitPrice: 1.92,
    totalAmount: 138.24,
    mileage: 12500,
    paymentMode: 'voucher',
    voucherNumber: 'V-2024-998',
    isAnomaly: true
  }
];

const mockMissions: Mission[] = [
  {
    id: 'm1',
    missionNumber: 'MS-2024-042',
    destination: 'Chantier Sud - Lyon',
    purpose: 'Installation pylônes électriques',
    startDate: Date.now() + 86400000,
    endDate: Date.now() + 432000000,
    vehicleId: 'v1',
    vehicleName: 'Toyota Hilux (AB-123-CD)',
    driverId: 'd1',
    driverName: 'Marc Lefebvre',
    teamMembers: ['Jean D.', 'Paul M.'],
    startMileage: 45200,
    expenses: [],
    status: 'approved'
  },
  {
    id: 'm2',
    missionNumber: 'MS-2024-041',
    destination: 'Dépôt Ouest - Nantes',
    purpose: 'Récupération matériel technique',
    startDate: Date.now() - 172800000,
    endDate: Date.now() - 86400000,
    vehicleId: 'v2',
    vehicleName: 'Renault Master (XY-987-ZT)',
    driverId: 'd3',
    driverName: 'Luc Moreau',
    startMileage: 88500,
    endMileage: 89100,
    expenses: [{ category: 'Péage', amount: 45, description: 'A11' }],
    status: 'completed',
    report: 'Matériel livré sans incident.'
  }
];

export function FuelMissionDashboard() {
  const [activeTab, setActiveTab] = useState<'fuel' | 'missions'>('fuel');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Carburant & Missions</h2>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-tight">Gestion des flux énergétiques et déplacements</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-neutral-200 text-navy-main px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            <Activity size={16} /> Rapports Conso
          </button>
          <button className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20 flex items-center gap-2">
            <Plus size={16} /> {activeTab === 'fuel' ? 'Saisie Carburant' : 'Nouvelle Mission'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Conso Moyenne', value: '8.4 L/100', icon: Fuel, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Coût au KM', value: '0.24 €', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Anomalies Conso', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Missions Actives', value: '12', icon: Map, color: 'text-navy-main', bg: 'bg-slate-100' }
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

      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('fuel')}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fuel' ? 'bg-white text-navy-main shadow-sm' : 'text-slate-500 hover:text-navy-main'}`}
        >
          Suivi Carburant
        </button>
        <button 
          onClick={() => setActiveTab('missions')}
          className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'missions' ? 'bg-white text-navy-main shadow-sm' : 'text-slate-500 hover:text-navy-main'}`}
        >
          Gestion Missions
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
            <div className="flex items-center gap-3">
                {activeTab === 'fuel' ? <Fuel size={20} className="text-navy-main" /> : <Map size={20} className="text-navy-main" />}
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    {activeTab === 'fuel' ? 'Journal des Pleins' : 'Registre des Missions'}
                </h3>
            </div>
            <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-[10px] outline-none w-64" />
                </div>
                <button className="p-2 bg-white border border-neutral-200 rounded-xl text-slate-500">
                    <Filter size={18} />
                </button>
            </div>
        </div>

        {activeTab === 'fuel' ? (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Date & Station</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Véhicule & Conducteur</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Litres / Prix</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Montant</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">KM</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Paiement</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {mockFuelTransactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-slate-50 transition-all group">
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-navy-main">{new Date(tx.date).toLocaleDateString()}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.station}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-black text-navy-main uppercase">{tx.vehicleName}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.driverName}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-black text-navy-main">{tx.liters} L</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.unitPrice} €/L</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-black text-navy-main">{tx.totalAmount.toFixed(2)} €</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-bold text-slate-500">{tx.mileage.toLocaleString()} KM</p>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${tx.paymentMode === 'voucher' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                            {tx.paymentMode}
                                        </span>
                                        {tx.isAnomaly && <AlertTriangle size={14} className="text-red-500" />}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-navy-main transition-colors">
                                        <ChevronRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-neutral-200">
                        <tr>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Mission & Destination</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Dates</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Véhicule & Équipe</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Budget / Frais</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Statut</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {mockMissions.map(mission => (
                            <tr key={mission.id} className="hover:bg-slate-50 transition-all group">
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="font-bold text-navy-main uppercase tracking-tight">{mission.destination}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">#{mission.missionNumber} • {mission.purpose}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-black text-navy-main">{new Date(mission.startDate).toLocaleDateString()} - {new Date(mission.endDate).toLocaleDateString()}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-bold text-navy-main uppercase">{mission.vehicleName}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{mission.driverName} {mission.teamMembers && `+ ${mission.teamMembers.length}`}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-black text-navy-main">
                                        {mission.expenses.reduce((acc, curr) => acc + curr.amount, 0)} €
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                        mission.status === 'completed' ? 'bg-green-100 text-green-600' :
                                        mission.status === 'active' ? 'bg-blue-100 text-blue-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                        {mission.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-navy-main transition-colors">
                                        <ChevronRight size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={18} className="text-brand-orange" /> Analyse des Coûts
              </h3>
              <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coût Carburant Total</p>
                          <p className="text-xl font-black text-navy-main">12,450.50 €</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Evolution</p>
                          <p className="text-sm font-black text-green-600 flex items-center gap-1">
                              <ArrowUpRight size={14} /> -4.2%
                          </p>
                      </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frais de Missions</p>
                          <p className="text-xl font-black text-navy-main">4,820.00 €</p>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Evolution</p>
                          <p className="text-sm font-black text-red-600 flex items-center gap-1">
                              <ArrowUpRight size={14} /> +12.5%
                          </p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="bg-navy-main p-6 rounded-3xl text-white space-y-4 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <AlertTriangle size={18} /> Alertes & Anomalies
              </h3>
              <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700">
                      <div>
                          <p className="text-xs font-black uppercase tracking-tight">Ford Ranger (JK-456-LM)</p>
                          <p className="text-[10px] text-red-400 font-bold">Conso élevée: 14.5L/100 (Cible: 9.0)</p>
                      </div>
                      <button className="text-[10px] font-black text-white uppercase bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-600 transition-all">
                          Analyser
                      </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl border border-slate-700">
                      <div>
                          <p className="text-xs font-black uppercase tracking-tight">Mission #042 - Lyon</p>
                          <p className="text-[10px] text-orange-400 font-bold">Absence de rapport de fin de mission</p>
                      </div>
                      <button className="text-[10px] font-black text-white uppercase bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-600 transition-all">
                          Relancer
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
