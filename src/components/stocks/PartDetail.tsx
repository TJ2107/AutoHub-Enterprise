import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ChevronLeft, 
  Package, 
  Truck, 
  History, 
  Settings, 
  BarChart3, 
  MapPin, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Layers,
  FileText,
  Users,
  RefreshCcw,
  TrendingUp
} from 'lucide-react';
import { SparePart, StockMovement } from '../../types';

const mockPart: SparePart = {
  id: 'p1',
  internalRef: 'FLT-OIL-001',
  manufacturerRef: 'TH-90915-10001',
  name: 'Filtre à huile Hilux',
  category: 'filtration',
  compatibility: ['Toyota Hilux', 'Toyota Fortuner', 'Toyota Land Cruiser Prado'],
  provider: 'Toyota Parts Center',
  location: 'A-12-04',
  minStock: 10,
  maxStock: 50,
  currentStock: 12,
  reservedStock: 4,
  purchasePrice: 8.50,
  salePrice: 15.00,
  unit: 'unit',
  lotNumber: 'LOT-2024-08-A'
};

const mockMovements: StockMovement[] = [
  { id: 'm1', partId: 'p1', partName: 'Filtre à huile Hilux', type: 'out', quantity: 1, date: Date.now() - 3600000, user: 'Marco Silva', referenceId: 'OR-5542', notes: 'Vidange périodique' },
  { id: 'm2', partId: 'p1', partName: 'Filtre à huile Hilux', type: 'in', quantity: 20, date: Date.now() - 86400000, user: 'Ahmed Magasinier', referenceId: 'PO-998', notes: 'Réception commande fournisseur' },
  { id: 'm3', partId: 'p1', partName: 'Filtre à huile Hilux', type: 'out', quantity: 2, date: Date.now() - 172800000, user: 'Lucie Tech', referenceId: 'OR-5530', notes: 'Maintenance préventive' }
];

export function PartDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [part] = useState(mockPart);
  const [movements] = useState(mockMovements);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">{part.name}</h2>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${part.currentStock <= part.minStock ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                        {part.currentStock <= part.minStock ? 'Réapprovisionner' : 'En Stock'}
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Ref: {part.internalRef} • OEM: {part.manufacturerRef}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2.5 border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white flex items-center gap-2 shadow-sm transition-all">
                <FileText size={16} /> Fiche Article
            </button>
            <button className="px-4 py-2.5 bg-navy-main text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-navy-main/20 transition-all">
                <RefreshCcw size={16} /> Ajustement de Stock
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Disponible</p>
                    <p className="text-3xl font-black text-navy-main">{part.currentStock} {part.unit}s</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase">
                        <AlertTriangle size={12} /> {part.reservedStock} unités réservées
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localisation</p>
                    <p className="text-2xl font-black text-navy-main">{part.location}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <MapPin size={10} /> Rayon Principal
                    </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prix de Vente</p>
                    <p className="text-3xl font-black text-navy-main">{part.salePrice.toFixed(2)} €</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase">Marge: +{(((part.salePrice - part.purchasePrice) / part.purchasePrice) * 100).toFixed(0)}%</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden divide-y divide-neutral-100">
                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Users size={18} /> Compatibilité Véhicules
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {part.compatibility.map(v => (
                            <span key={v} className="px-4 py-2 bg-slate-50 text-xs font-bold text-navy-main rounded-xl border border-neutral-100">
                                {v}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <History size={18} /> Historique des Mouvements
                    </h3>
                    <div className="space-y-4">
                        {movements.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${m.type === 'in' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {m.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-navy-main uppercase">{m.notes}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">
                                            {new Date(m.date).toLocaleString()} • Par {m.user} {m.referenceId && `• Ref: ${m.referenceId}`}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-sm font-black ${m.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                    {m.type === 'in' ? '+' : '-'}{m.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Settings size={16} /> Informations Achat
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fournisseur</span>
                        <span className="text-xs font-black uppercase">{part.provider}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">N° de Lot</span>
                        <span className="text-xs font-black uppercase text-brand-orange">{part.lotNumber}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prix d'achat</span>
                        <span className="text-xs font-black uppercase">{part.purchasePrice.toFixed(2)} €</span>
                    </div>
                </div>
                <div className="pt-4 space-y-4">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Stock Min</p>
                            <p className="text-xl font-bold mt-1">{part.minStock}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Stock Max</p>
                            <p className="text-xl font-bold mt-1 text-right">{part.maxStock}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} /> Statistiques Mensuelles
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase">Taux de Rotation</span>
                        <span className="font-black text-navy-main">4.2x / mois</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '75%' }} />
                    </div>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">Forte demande identifiée</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
