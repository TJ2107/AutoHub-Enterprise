import { useParams, Link } from 'react-router-dom';
import { CorrectiveAction } from '../../types';
import { 
  ChevronLeft, 
  Wrench, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Package, 
  DollarSign, 
  Calendar,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const mockAction: CorrectiveAction = {
  id: 'c1',
  vehicleId: 'v3',
  vehicleName: 'Ford Ranger (JK-456-LM)',
  reportedDate: Date.now() - 86400000,
  symptoms: 'Perte de puissance et fumée noire lors des accélérations franches.',
  diagnosis: 'Turbocharger grippé, présence d\'huile dans le circuit d\'admission.',
  confirmedCause: 'Usure prématurée de la turbine due à un défaut de lubrification.',
  priority: 'critical',
  status: 'repairing',
  technicianId: 't1',
  technicianName: 'Marco Silva',
  downtimeHours: 24,
  partsUsed: [
    { name: 'Turbocharger Garrett VNT', cost: 1200 },
    { name: 'Kit joints turbo', cost: 45 },
    { name: 'Huile moteur 5W30 (5L)', cost: 65 }
  ],
  laborCost: 450,
  totalCost: 1760,
  validationDate: undefined
};

export function MaintenanceDetail() {
  const { id } = useParams();
  const [action] = useState(mockAction);

  const getStatusColor = (status: CorrectiveAction['status']) => {
    switch (status) {
      case 'repairing': return 'bg-blue-500 text-white';
      case 'testing': return 'bg-purple-500 text-white';
      case 'completed': return 'bg-green-500 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <Link to="/maintenance" className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </Link>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Intervention #{action.id}</h2>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(action.status)}`}>
                        {action.status}
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Signalée le {new Date(action.reportedDate).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <Link to={`/maintenance/${action.id}/edit`} className="px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 flex items-center gap-2">
                Éditer le rapport
            </Link>
            <button className="px-4 py-2.5 bg-navy-main text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-navy-main/20">
                <CheckCircle2 size={16} /> Valider la remise en service
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm overflow-x-auto">
                <div className="min-w-[500px] relative flex justify-between items-center px-12">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-100 -translate-y-1/2 -z-0" />
                    <div className="absolute top-1/2 left-0 h-0.5 bg-navy-main -translate-y-1/2 -z-0" style={{ width: '40%' }} />
                    
                    {['Signalement', 'Diagnostic', 'Réparation', 'Essais', 'Clôture'].map((s, idx) => (
                        <div key={s} className="z-10 bg-white p-2 flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${idx <= 2 ? 'bg-navy-main border-navy-main text-white' : 'border-neutral-100 bg-white text-slate-300'}`}>
                                {idx < 2 ? <CheckCircle2 size={16} /> : (idx === 2 ? <Wrench size={16} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />)}
                            </div>
                            <p className={`text-[10px] font-black uppercase tracking-tight ${idx <= 2 ? 'text-navy-main' : 'text-slate-300'}`}>{s}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analysis */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
                <div className="p-8 space-y-4">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle size={18} className="text-brand-orange" /> Analyse de la panne
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Symptômes initiaux</p>
                                <p className="text-sm font-medium text-slate-600 bg-slate-50 p-4 rounded-2xl italic border border-neutral-100">
                                    "{action.symptoms}"
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Diagnostic Technique</p>
                                <p className="text-sm font-bold text-navy-main">{action.diagnosis}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Cause Racine Confirmée</p>
                                <p className="text-sm font-bold text-red-700">{action.confirmedCause}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Criticité</p>
                                    <p className="text-sm font-black text-red-500 uppercase">{action.priority}</p>
                                </div>
                                <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Temps d'arrêt</p>
                                    <p className="text-sm font-black text-navy-main">{action.downtimeHours} Heures</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Package size={18} /> Pièces & Consommables
                    </h3>
                    <div className="space-y-3">
                        {action.partsUsed.map((part, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <span className="text-sm font-bold text-navy-main">{part.name}</span>
                                <span className="text-sm font-black text-slate-500">{part.cost.toLocaleString()} €</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Financial Card */}
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-8">
                <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <DollarSign size={16} /> Récapitulatif Coûts
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Main d'œuvre</span>
                            <span className="font-bold">{action.laborCost} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Pièces de rechange</span>
                            <span className="font-bold">{(action.totalCost - action.laborCost).toLocaleString()} €</span>
                        </div>
                        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-black uppercase tracking-widest">Coût Total</span>
                            <span className="text-3xl font-black text-brand-orange">{action.totalCost.toLocaleString()} €</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <User size={16} /> Intervenant
                    </h3>
                    <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-2xl border border-slate-700">
                        <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-navy-main font-black">
                            {action.technicianName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="text-sm font-bold">{action.technicianName}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Expert Senior</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Validation Card */}
            <div className="bg-green-50 rounded-3xl p-6 border border-green-100 space-y-4">
                <h3 className="text-xs font-black text-green-700 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} /> Remise en service
                </h3>
                <div className="space-y-3">
                    <div className="p-4 bg-white rounded-2xl border border-green-200">
                        <div className="flex items-center gap-2 text-green-600 mb-1">
                            <Activity size={14} />
                            <span className="text-[10px] font-black uppercase">Statut Essais</span>
                        </div>
                        <p className="text-xs font-bold text-navy-main">Essais routiers concluants. Paramètres moteur nominaux.</p>
                    </div>
                    <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                        Approuver & Clôturer
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
