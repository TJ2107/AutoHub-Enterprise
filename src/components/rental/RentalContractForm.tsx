import { useState } from 'react';
import { 
  User, 
  Car, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Search,
  DollarSign,
  Camera,
  AlertTriangle,
  Users
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function RentalContractForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [contractType, setContractType] = useState<'short' | 'medium' | 'long'>('short');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Nouveau Contrat</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Création d'une réservation ou d'un contrat direct</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= s ? 'bg-navy-main text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {s}
                    </div>
                    {s < 3 && <div className={`h-0.5 w-6 ${step > s ? 'bg-navy-main' : 'bg-slate-100'}`} />}
                </div>
            ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
        {step === 1 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Users size={20} /> Identification Locataire & Conducteur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Locataire (Facturation)</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Rechercher client..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-medium" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Conducteur Principal</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder="Nom du conducteur..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-medium" />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
                        <ShieldCheck size={20} className="text-blue-600 mt-1" />
                        <div>
                            <p className="text-xs font-bold text-blue-800">Vérification Permis</p>
                            <p className="text-[10px] text-blue-600 font-medium">Assurez-vous de scanner le permis de conduire du conducteur avant le départ.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Car size={20} /> Sélection du Véhicule
                    </h3>
                    <div className="p-6 bg-slate-50 border border-neutral-200 rounded-3xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-navy-main shadow-sm border border-neutral-100">
                                <Car size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-navy-main uppercase">Toyota Hilux</p>
                                <p className="text-[10px] font-bold text-slate-400">AB-123-CD • Pick-up</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-brand-orange uppercase tracking-widest hover:underline">Changer</button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button onClick={() => setStep(2)} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2">
                        Période & Tarification <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={20} /> Période & Type de Contrat
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { id: 'short', label: 'Court Terme', desc: '< 30 jours' },
                            { id: 'medium', label: 'Moyen Terme', desc: '1 - 6 mois' },
                            { id: 'long', label: 'Long Terme', desc: '> 6 mois' }
                        ].map(t => (
                            <button 
                                key={t.id}
                                onClick={() => setContractType(t.id as any)}
                                className={`p-4 rounded-2xl border-2 transition-all text-left space-y-1 ${
                                    contractType === t.id ? 'border-navy-main bg-slate-50' : 'border-neutral-100 hover:border-neutral-200'
                                }`}
                            >
                                <p className="text-xs font-black text-navy-main uppercase">{t.label}</p>
                                <p className="text-[10px] text-slate-400 font-bold">{t.desc}</p>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Départ prévu</label>
                            <input type="datetime-local" className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-bold" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Retour prévu</label>
                            <input type="datetime-local" className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-bold" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <DollarSign size={20} /> Conditions Financières
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tarif Journalier (€)</label>
                            <input type="number" defaultValue={85} className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-black" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">KM Inclus / Jour</label>
                            <input type="number" defaultValue={200} className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-black" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dépôt de Garantie (€)</label>
                            <input type="number" defaultValue={1500} className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-black" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="px-8 py-3.5 border border-neutral-200 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                        Retour
                    </button>
                    <button onClick={() => setStep(3)} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2">
                        État des lieux <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        )}

        {step === 3 && (
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="space-y-6">
                    <h3 className="text-lg font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <Camera size={20} /> État des lieux Départ
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-square bg-slate-50 border-2 border-dashed border-neutral-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-navy-main hover:border-navy-main transition-all cursor-pointer">
                                <Camera size={24} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Photo {i === 1 ? 'Avant' : i === 2 ? 'Arrière' : i === 3 ? 'Gauche' : 'Droite'}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kilométrage Départ</label>
                            <input type="number" placeholder="000,000" className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-black" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Niveau Carburant</label>
                            <select className="w-full px-4 py-3.5 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all text-sm font-bold">
                                <option>8/8 (Plein)</option>
                                <option>6/8</option>
                                <option>4/8 (Moitié)</option>
                                <option>2/8</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Dommages pré-existants / Notes</label>
                        <textarea className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all h-24 text-sm font-medium" placeholder="Signalez toute rayure, impact ou anomalie..." />
                    </div>
                </div>

                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 flex items-start gap-4">
                    <AlertTriangle size={24} className="text-brand-orange mt-1" />
                    <div>
                        <p className="text-sm font-black text-navy-main uppercase">Engagement & Signature</p>
                        <p className="text-xs text-slate-600 font-medium">En validant ce contrat, vous confirmez que le véhicule a été inspecté et que les informations ci-dessus sont exactes.</p>
                        <div className="h-24 bg-white mt-4 rounded-xl border border-orange-200 flex items-center justify-center text-slate-300 italic text-xs">
                            Signature numérique locataire
                        </div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="px-8 py-3.5 border border-neutral-200 rounded-2xl font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                        Retour
                    </button>
                    <button onClick={() => navigate('/rental')} className="bg-navy-main text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2">
                        <FileText size={18} /> Générer le Contrat & Départ
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
