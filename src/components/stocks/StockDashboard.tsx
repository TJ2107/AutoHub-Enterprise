import { useState } from 'react';
import { 
  Package, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus,
  History,
  TrendingUp,
  DollarSign,
  ChevronRight,
  ClipboardList,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SparePart, StockMovement, PartRequest } from '../../types';

const mockParts: SparePart[] = [
  {
    id: 'p1',
    internalRef: 'FLT-OIL-001',
    manufacturerRef: 'TH-90915-10001',
    name: 'Filtre à huile Hilux',
    category: 'filtration',
    compatibility: ['Toyota Hilux', 'Toyota Fortuner'],
    provider: 'Toyota Parts Center',
    location: 'A-12-04',
    minStock: 10,
    maxStock: 50,
    currentStock: 12,
    reservedStock: 4,
    purchasePrice: 8.50,
    salePrice: 15.00,
    unit: 'unit'
  },
  {
    id: 'p2',
    internalRef: 'BRK-PAD-042',
    manufacturerRef: 'MB-004-420-10-20',
    name: 'Plaquettes de frein AV',
    category: 'braking',
    compatibility: ['Mercedes Actros', 'Mercedes Atego'],
    provider: 'EuroBrake',
    location: 'B-04-01',
    minStock: 5,
    maxStock: 20,
    currentStock: 4,
    reservedStock: 2,
    purchasePrice: 45.00,
    salePrice: 78.00,
    unit: 'set'
  }
];

const mockRequests: PartRequest[] = [
  {
    id: 'req-001',
    orderId: 'OR-5542',
    technicianId: 't1',
    technicianName: 'Marco Silva',
    partId: 'p1',
    partName: 'Filtre à huile Hilux',
    quantity: 1,
    status: 'requested',
    requestDate: Date.now() - 3600000
  }
];

export function StockDashboard() {
  const [parts] = useState<SparePart[]>(mockParts);
  const [requests] = useState<PartRequest[]>(mockRequests);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Magasin & Stocks</h2>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-tight">Gestion centralisée des pièces et consommables</p>
        </div>
        <div className="flex gap-2">
          <Link to="/stocks/movements" className="bg-white border border-neutral-200 text-navy-main px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            <History size={16} /> Mouvements
          </Link>
          <Link to="/stocks/new" className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-navy-main/20 flex items-center gap-2">
            <Plus size={16} /> Ajouter une pièce
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Références en Stock', value: '1,240', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Valeur du Stock', value: '84.2k €', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Alertes Rupture', value: '12', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Commandes en cours', value: '4', icon: TrendingUp, color: 'text-navy-main', bg: 'bg-slate-100' }
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
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <ClipboardList size={20} className="text-navy-main" />
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Demandes Techniciens</h3>
                </div>
            </div>
            <div className="divide-y divide-neutral-100">
                {requests.map(req => (
                    <div key={req.id} className="p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Plus size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-navy-main uppercase">Demande #{req.id}</span>
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-[10px] font-black uppercase tracking-widest">{req.status}</span>
                                </div>
                                <p className="font-bold text-navy-main uppercase tracking-tight">{req.partName} x{req.quantity}</p>
                                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Par {req.technicianName} pour Order {req.orderId}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-neutral-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white hover:text-red-500 transition-all">Refuser</button>
                            <button className="px-4 py-2 bg-navy-main text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md flex items-center gap-2">
                                <CheckCircle2 size={14} /> Valider Sortie
                            </button>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Package size={20} className="text-navy-main" />
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Inventaire & Stock</h3>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="text" placeholder="Référence, désignation..." className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-[10px] outline-none w-64" />
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
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Pièce</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Catégorie</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Stock</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Emplacement</th>
                            <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Prix Vente</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {parts.map(part => (
                            <tr key={part.id} className="hover:bg-slate-50 transition-all group">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-bold text-navy-main uppercase tracking-tight">{part.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Ref: {part.internalRef}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{part.category}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="space-y-1">
                                            <p className={`text-sm font-black ${part.currentStock <= part.minStock ? 'text-red-500' : 'text-navy-main'}`}>
                                                {part.currentStock} / {part.maxStock}
                                            </p>
                                            <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${part.currentStock <= part.minStock ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(part.currentStock / part.maxStock) * 100}%` }} />
                                            </div>
                                        </div>
                                        {part.reservedStock > 0 && (
                                            <span className="text-[10px] font-bold text-orange-500 uppercase">({part.reservedStock} Réservés)</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-bold text-navy-main uppercase">{part.location}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-black text-navy-main">{part.salePrice.toFixed(2)} €</p>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/stocks/part/${part.id}`} className="p-2 text-slate-400 hover:text-navy-main transition-colors inline-block">
                                        <ChevronRight size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4 shadow-sm">
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                    <ArrowUpRight size={18} className="text-green-500" /> Flux Magasin
                </h3>
                <div className="space-y-4">
                    <button className="w-full p-4 bg-slate-50 border border-neutral-100 rounded-2xl flex items-center gap-4 hover:border-navy-main transition-all group">
                        <div className="p-3 bg-white rounded-xl text-green-600 shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                            <ArrowDownLeft size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black text-navy-main uppercase tracking-tight">Réception de Commande</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Entrée de pièces en stock</p>
                        </div>
                    </button>
                    <button className="w-full p-4 bg-slate-50 border border-neutral-100 rounded-2xl flex items-center gap-4 hover:border-navy-main transition-all group">
                        <div className="p-3 bg-white rounded-xl text-red-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
                            <ArrowUpRight size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black text-navy-main uppercase tracking-tight">Sortie Exceptionnelle</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Hors ordre de réparation</p>
                        </div>
                    </button>
                    <button className="w-full p-4 bg-slate-50 border border-neutral-100 rounded-2xl flex items-center gap-4 hover:border-navy-main transition-all group">
                        <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <RefreshCcw size={20} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black text-navy-main uppercase tracking-tight">Transfert Inter-Agence</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Mouvement entre sites</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="bg-navy-main p-6 rounded-3xl text-white space-y-4 shadow-xl">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <TrendingUp size={18} /> Pièces les plus demandées
                </h3>
                <div className="space-y-4">
                    {[
                        { name: 'Filtre Huile (Toyota)', qty: 85, trend: 'up' },
                        { name: 'Huile 5W30 (L)', qty: 420, trend: 'stable' },
                        { name: 'Lave Glace (L)', qty: 150, trend: 'up' }
                    ].map((p, i) => (
                        <div key={i} className="flex justify-between items-center pb-2 border-b border-slate-800">
                            <div>
                                <p className="text-xs font-bold">{p.name}</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">{p.qty} sorties / mois</p>
                            </div>
                            <ArrowUpRight size={16} className={p.trend === 'up' ? 'text-green-500' : 'text-slate-500'} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
