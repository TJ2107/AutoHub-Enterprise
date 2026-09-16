import { useState } from 'react';
import { 
  User, 
  Car, 
  Clipboard, 
  Camera, 
  Calendar, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Search,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function RepairOrderForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-white transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Réception Véhicule</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Création d'un nouvel Ordre de Réparation (OR)</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-navy-main text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className={`h-0.5 w-8 ${step >= 2 ? 'bg-navy-main' : 'bg-slate-100'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-navy-main text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <div className={`h-0.5 w-8 ${step >= 3 ? 'bg-navy-main' : 'bg-slate-100'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-navy-main text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
        {step === 1 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <User size={20} /> Identification Client & Véhicule
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Client</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Rechercher un client..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-medium" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Véhicule (Immat/VIN)</label>
                            <div className="relative">
                                <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Rechercher un véhicule..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-medium" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Kilométrage Actuel</p>
                        <input type="number" placeholder="000,000" className="w-full bg-transparent text-xl font-black text-navy-main outline-none" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Niveau Carburant</p>
                        <div className="flex gap-1 mt-1">
                            {[1, 2, 3, 4].map(b => (
                                <div key={b} className="h-2 flex-1 bg-neutral-200 rounded-full" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase">Priorité</p>
                        <select className="w-full bg-transparent text-sm font-bold text-navy-main outline-none appearance-none">
                            <option>Standard</option>
                            <option>Haute</option>
                            <option>Urgente</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button onClick={() => setStep(2)} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg">
                        Continuer l'inspection
                    </button>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Camera size={20} /> Inspection Visuelle
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-navy-main hover:border-navy-main transition-all cursor-pointer">
                                <Camera size={24} />
                                <span className="text-[10px] font-bold uppercase">Ajouter Photo</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes d'inspection (Rayures, chocs...)</label>
                        <textarea className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all h-32 text-sm font-medium" placeholder="Décrivez l'état extérieur du véhicule..." />
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="px-8 py-3.5 border border-neutral-200 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                        Retour
                    </button>
                    <button onClick={() => setStep(3)} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg">
                        Finaliser la demande
                    </button>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Clipboard size={20} /> Travaux & Symptômes
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symptômes déclarés</label>
                            <textarea className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all h-24 text-sm font-medium" placeholder="Ex: Bruit de claquement à l'avant gauche..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Travaux demandés</label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-neutral-200 rounded-xl">
                                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-navy-main focus:ring-navy-main" />
                                    <span className="text-sm font-medium text-navy-main">Vidange moteur + Filtre</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-neutral-200 rounded-xl">
                                    <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-navy-main focus:ring-navy-main" />
                                    <span className="text-sm font-medium text-navy-main">Révision complète (15 points)</span>
                                </div>
                                <button className="text-xs font-black text-brand-orange uppercase tracking-widest flex items-center gap-2 ml-2">
                                    <Plus size={14} /> Ajouter une opération
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-green-50 rounded-3xl border border-green-100 space-y-4">
                    <div className="flex items-center gap-3 text-green-700">
                        <AlertCircle size={20} />
                        <p className="text-sm font-bold">Engagement client</p>
                    </div>
                    <p className="text-xs text-green-600 font-medium">En signant cet Ordre de Réparation, le client autorise l'établissement du diagnostic et des travaux mentionnés ci-dessus.</p>
                    <div className="h-32 bg-white rounded-2xl border border-green-200 flex items-center justify-center text-slate-300 italic text-xs">
                        Signature numérique ici
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="px-8 py-3.5 border border-neutral-200 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                        Retour
                    </button>
                    <button onClick={() => navigate('/workshop')} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-3">
                        <CheckCircle2 size={20} /> Créer l'OR
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
