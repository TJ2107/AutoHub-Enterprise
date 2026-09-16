import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Car, 
  User, 
  Clock, 
  FileText, 
  DollarSign, 
  Printer, 
  Share2,
  AlertTriangle,
  History,
  Camera,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { RentalContract } from '../../types';

const mockContract: RentalContract = {
  id: 'r1',
  contractNumber: 'L-2024-001',
  vehicleId: 'v1',
  vehicleName: 'Toyota Hilux (AB-123-CD)',
  customerId: 'c1',
  customerName: 'Jean Dupont',
  driverName: 'Marc Lefebvre',
  startDate: Date.now() - 432000000, // 5 days ago
  endDate: Date.now() + 172800000,   // In 2 days
  type: 'short',
  status: 'active',
  pricing: { 
    baseRate: 85, 
    rateUnit: 'day', 
    deposit: 1500, 
    includedKm: 1000, 
    excessKmRate: 0.25 
  },
  billing: { 
    totalAmount: 595, 
    paidAmount: 595, 
    status: 'paid' 
  },
  checkIn: {
    mileage: 45000,
    fuelLevel: 8,
    photos: [],
    notes: 'R.A.S au départ.',
    date: Date.now() - 432000000
  },
  extensions: [
    { newEndDate: Date.now() + 172800000, reason: 'Besoin prolongé pour chantier', date: Date.now() - 86400000 }
  ]
};

export function RentalContractDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract] = useState(mockContract);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const getStatusColor = (status: RentalContract['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'overdue': return 'bg-red-500 text-white';
      case 'completed': return 'bg-slate-500 text-white';
      case 'reserved': return 'bg-blue-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Contrat #{contract.contractNumber}</h2>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(contract.status)}`}>
                        {contract.status}
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Du {new Date(contract.startDate).toLocaleDateString()} au {new Date(contract.endDate).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2.5 border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white flex items-center gap-2 shadow-sm transition-all">
                <Printer size={16} /> Imprimer Contrat
            </button>
            {contract.status === 'active' && (
                <button 
                    onClick={() => setShowReturnModal(true)}
                    className="px-4 py-2.5 bg-brand-orange text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 flex items-center gap-2 shadow-lg shadow-brand-orange/20 transition-all"
                >
                    <CheckCircle2 size={16} /> Enregistrer Retour
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Main Info */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm divide-y divide-neutral-100 overflow-hidden">
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                            <Car size={18} /> Véhicule & Conducteur
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <div className="p-3 bg-white rounded-xl text-navy-main shadow-sm">
                                    <Car size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-navy-main uppercase">{contract.vehicleName}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {contract.vehicleId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <div className="p-3 bg-white rounded-xl text-navy-main shadow-sm">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-navy-main uppercase">{contract.driverName}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Locataire: {contract.customerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                            <Clock size={18} /> Période de Location
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-100 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Départ</p>
                                <p className="text-sm font-black text-navy-main">{new Date(contract.startDate).toLocaleDateString()}</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-100 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Retour</p>
                                <p className="text-sm font-black text-brand-orange">{new Date(contract.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-navy-main rounded-2xl text-white flex justify-between items-center">
                            <span className="text-xs font-bold uppercase">Durée Totale</span>
                            <span className="text-xl font-black">7 Jours</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                            <History size={18} /> Prolongations & Historique
                        </h3>
                        <button className="text-[10px] font-black text-brand-orange uppercase tracking-widest flex items-center gap-2">
                            <Plus size={14} /> Demander une prolongation
                        </button>
                    </div>
                    <div className="space-y-3">
                        {contract.extensions.map((ext, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100 border-l-4 border-l-brand-orange">
                                <div>
                                    <p className="text-xs font-black text-navy-main uppercase">Prolongation au {new Date(ext.newEndDate).toLocaleDateString()}</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Motif: {ext.reason}</p>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(ext.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Financial Info */}
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-8">
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <DollarSign size={16} /> Détail Facturation
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Tarif ({contract.pricing.baseRate}€ x 7j)</span>
                            <span className="font-bold">{contract.pricing.baseRate * 7} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Dépôt de Garantie</span>
                            <span className="font-bold">{contract.pricing.deposit} €</span>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-widest text-brand-orange">Total Facturé</span>
                            <span className="text-3xl font-black">{(contract.pricing.baseRate * 7).toLocaleString()} €</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800 rounded-xl">
                            <div className="flex items-center gap-2 text-xs">
                                <CreditCard size={14} className="text-green-400" />
                                <span className="text-slate-400 uppercase tracking-widest font-bold">Paiement reçu</span>
                            </div>
                            <span className="text-xs font-black text-green-400 uppercase tracking-widest">Reçu</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Check-In Card (Depart) */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> État des lieux Départ
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-xl border border-neutral-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">KM Départ</p>
                        <p className="text-sm font-black text-navy-main">{contract.checkIn?.mileage.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-neutral-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Carburant</p>
                        <p className="text-sm font-black text-navy-main">{contract.checkIn?.fuelLevel}/8</p>
                    </div>
                </div>
                <button className="w-full py-3 bg-slate-50 text-navy-main text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    <Camera size={14} /> Voir les 4 photos
                </button>
            </div>
        </div>
      </div>

      {/* Return Modal (Simplified for UI preview) */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-navy-main/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95">
                <div className="p-6 bg-surface-gray border-b border-neutral-200 flex justify-between items-center">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">Enregistrer Retour</h3>
                    <button onClick={() => setShowReturnModal(false)} className="text-slate-400 hover:text-navy-main transition-colors">✕</button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">KM Retour</label>
                            <input type="number" placeholder="000,000" className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main font-black text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Carburant Retour</label>
                            <select className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main font-bold text-sm">
                                <option>8/8 (Plein)</option>
                                <option>4/8 (Moitié)</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dommages / État</label>
                        <textarea className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main text-sm font-medium h-24" placeholder="Signalez tout nouvel impact..." />
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-3">
                        <AlertTriangle size={20} className="text-brand-orange" />
                        <p className="text-[10px] text-orange-700 font-bold leading-tight">Un dépassement kilométrique de 150 KM a été détecté. Un supplément de 37.50 € sera ajouté.</p>
                    </div>
                    <button onClick={() => setShowReturnModal(false)} className="w-full py-4 bg-navy-main text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 shadow-xl transition-all">
                        Finaliser le retour & Facturer
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
