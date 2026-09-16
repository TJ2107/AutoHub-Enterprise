import { useState } from 'react';
import { SaleOpportunity } from '../../types';
import { Search, DollarSign, Clock, CheckCircle2, XCircle, MoreVertical, Plus, LayoutGrid, ClipboardList, BarChart3, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mockOpportunities: (SaleOpportunity & { customerName: string; vehicleName: string })[] = [
  {
    id: 'o1',
    customerId: 'c1',
    customerName: 'Jean Dupont',
    vehicleId: 'v1',
    vehicleName: 'Toyota Land Cruiser',
    status: 'quote_sent',
    date: Date.now() - 432000000,
    totalAmount: 85000,
  },
  {
    id: 'o2',
    customerId: 'c2',
    customerName: 'Tech Solutions SA',
    vehicleId: 'v2',
    vehicleName: 'Mercedes-Benz GLE',
    status: 'sold',
    date: Date.now() - 864000000,
    totalAmount: 72000,
  }
];

export function SalesManager() {
  const [opportunities] = useState(mockOpportunities);
  const location = useLocation();

  const getStatusStyle = (status: SaleOpportunity['status']) => {
    switch (status) {
      case 'sold': return 'bg-green-100 text-green-700 border-green-200';
      case 'quote_sent': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reserved': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'prospect': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status: SaleOpportunity['status']) => {
    switch (status) {
      case 'sold': return 'Vendu';
      case 'quote_sent': return 'Devis Envoyé';
      case 'reserved': return 'Réservé';
      case 'prospect': return 'Prospect';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 border-b border-neutral-200 pb-4">
          <Link to="/concession" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === '/concession' ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <LayoutGrid size={18} /> Catalogue
          </Link>
          <Link to="/concession/stock" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === '/concession/stock' ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <Package size={18} /> Stock & Reprise
          </Link>
          <Link to="/concession/sales" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname.startsWith('/concession/sales') ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <ClipboardList size={18} /> Gestion Ventes
          </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Chiffre d'affaires</p>
                  <p className="text-2xl font-black text-navy-main">157 000 €</p>
              </div>
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign size={20} />
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Devis en attente</p>
                  <p className="text-2xl font-black text-navy-main">12</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Clock size={20} />
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ventes du mois</p>
                  <p className="text-2xl font-black text-navy-main">4</p>
              </div>
              <div className="w-10 h-10 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={20} />
              </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
              <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Taux conversion</p>
                  <p className="text-2xl font-black text-navy-main">32%</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={20} />
              </div>
          </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-4">
            <h2 className="text-lg font-black text-navy-main uppercase tracking-tight">Opportunités de vente</h2>
            <div className="h-6 w-px bg-neutral-200" />
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                    type="text" 
                    placeholder="Filtrer les ventes..." 
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border border-neutral-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-navy-main w-64"
                />
            </div>
        </div>
        <button className="bg-navy-main text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors flex items-center gap-2">
          <Plus size={16} /> Nouvelle opportunité
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-gray border-b border-neutral-200">
            <tr>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest">Client / Dossier</th>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest">Véhicule</th>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest">Statut</th>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest text-right">Montant</th>
              <th className="px-6 py-4 font-black text-navy-main text-[10px] uppercase tracking-widest text-right text-green-600">Marge</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                    <p className="font-bold text-navy-main">{opp.customerName}</p>
                    <p className="text-[10px] text-slate-400 font-medium">#{opp.id}</p>
                </td>
                <td className="px-6 py-4">
                    <p className="font-medium text-slate-700">{opp.vehicleName}</p>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">
                    {new Date(opp.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(opp.status)}`}>
                        {getStatusLabel(opp.status)}
                    </span>
                </td>
                <td className="px-6 py-4 font-black text-navy-main text-right">
                    {opp.totalAmount.toLocaleString()} €
                </td>
                <td className="px-6 py-4 font-black text-green-600 text-right">
                    {(opp.totalAmount * 0.15).toLocaleString()} €
                </td>
                <td className="px-6 py-4 text-right">
                    <Link to={`/concession/sales/${opp.id}`} className="p-2 text-slate-400 hover:text-navy-main hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center">
                        <MoreVertical size={18} />
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
