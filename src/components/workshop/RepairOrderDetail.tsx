import { useParams, Link } from 'react-router-dom';
import { WorkshopOrder } from '../../types';
import { 
  ChevronLeft, 
  Wrench, 
  User, 
  Car, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Package, 
  DollarSign, 
  Printer, 
  Send,
  AlertTriangle,
  AlertCircle,
  History
} from 'lucide-react';
import { useState } from 'react';

const mockOrder: WorkshopOrder = {
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
  symptoms: 'Bruit suspect moteur à l\'accélération',
  diagnosis: 'Injecteur n°3 défectueux, claquement haut moteur.',
  tasks: [
    { description: 'Remplacement injecteur n°3', status: 'completed', estimatedHours: 2.5 },
    { description: 'Nettoyage circuit admission', status: 'pending', estimatedHours: 1 }
  ],
  parts: [
    { reference: 'INJ-TY-22', name: 'Injecteur Common Rail', quantity: 1, price: 450 },
    { reference: 'GSK-11', name: 'Joint porte-injecteur', quantity: 1, price: 5 }
  ],
  laborCost: 280,
  partsCost: 455,
  totalCost: 735,
  status: 'repairing',
  priority: 'high',
  workZone: 'Pont 1',
  mileageAtEntry: 45000,
  visualInspectionNotes: 'Rayure aile arrière droite, pneu avant gauche à 30% d\'usure.'
};

export function RepairOrderDetail() {
  const { id } = useParams();
  const [order] = useState(mockOrder);

  const getStatusColor = (status: WorkshopOrder['status']) => {
    switch (status) {
      case 'repairing': return 'bg-blue-500 text-white';
      case 'quality_control': return 'bg-purple-500 text-white';
      case 'ready_to_return': return 'bg-green-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link to="/workshop" className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </Link>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">OR #{order.orderNumber}</h2>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Entrée le {new Date(order.entryDate).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2.5 border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white flex items-center gap-2">
                <Printer size={16} /> Fiche Atelier
            </button>
            <button className="px-4 py-2.5 bg-navy-main text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-navy-main/20">
                <Send size={16} /> Facture Client
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Status Tracker */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm overflow-x-auto">
                <div className="min-w-[600px] relative flex justify-between items-center px-8">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 -z-0" />
                    <div className="absolute top-1/2 left-0 h-0.5 bg-navy-main -translate-y-1/2 -z-0" style={{ width: '50%' }} />
                    
                    {['Réception', 'Diagnostic', 'Réparation', 'Qualité', 'Livraison'].map((s, idx) => (
                        <div key={s} className="z-10 bg-white p-2 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${idx <= 2 ? 'bg-navy-main border-navy-main text-white' : 'border-neutral-100 bg-white text-slate-300'}`}>
                                {idx < 2 ? <CheckCircle2 size={16} /> : (idx === 2 ? <Wrench size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />)}
                            </div>
                            <p className={`text-[10px] font-black uppercase tracking-tight ${idx <= 2 ? 'text-navy-main' : 'text-slate-300'}`}>{s}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Diagnosis & Work */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
                <div className="p-8 space-y-4">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <AlertCircle size={18} className="text-brand-orange" /> Diagnostic Technique
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Symptômes déclarés</p>
                            <p className="text-sm font-medium text-slate-600 italic">"{order.symptoms}"</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Constat Technique</p>
                            <p className="text-sm font-bold text-navy-main">{order.diagnosis || 'Diagnostic en cours...'}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Wrench size={18} /> Travaux & Main d'œuvre
                    </h3>
                    <div className="space-y-3">
                        {order.tasks.map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-white border-2 border-neutral-200 text-transparent'}`}>
                                        <CheckCircle2 size={12} />
                                    </div>
                                    <span className={`text-sm font-bold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-navy-main'}`}>{task.description}</span>
                                </div>
                                <span className="text-xs font-black text-slate-500 uppercase">{task.estimatedHours}h</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Package size={18} /> Pièces de rechange
                    </h3>
                    <div className="space-y-3">
                        {order.parts.map((part, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-navy-main">{part.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">REF: {part.reference}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-navy-main">x{part.quantity}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{part.price} € / ut</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Summary Sidebar */}
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-8">
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <History size={16} /> Résumé financier
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Main d'œuvre</span>
                            <span className="font-bold">{order.laborCost} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Pièces</span>
                            <span className="font-bold">{order.partsCost} €</span>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-widest">Total Estimé</span>
                            <span className="text-3xl font-black">{order.totalCost} €</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <Clock size={16} /> Information Sortie
                    </h3>
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Restitution prévue</p>
                        <p className="text-xl font-bold mt-1 text-brand-orange">{new Date(order.expectedReturnDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <User size={16} /> Responsable
                    </h3>
                    <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <div className="w-10 h-10 bg-navy-main border border-slate-700 rounded-full flex items-center justify-center text-xs font-black">
                            {order.technicianName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="text-sm font-bold">{order.technicianName}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Diagnostic & Réparation</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Card Mini */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Car size={14} /> Dossier Véhicule
                </h3>
                <p className="text-sm font-black text-navy-main uppercase">{order.vehicleName}</p>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px]">
                        <span className="text-slate-400 font-bold uppercase">KM à l'entrée</span>
                        <span className="font-black text-navy-main">{order.mileageAtEntry.toLocaleString()} KM</span>
                    </div>
                    <Link to={`/vehicules/${order.vehicleId}`} className="w-full py-3 bg-slate-50 text-navy-main text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all block">
                        Voir Historique Véhicule
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
