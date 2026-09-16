import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Save, 
  AlertTriangle, 
  Wrench, 
  FileText,
  User,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { CorrectiveAction } from '../../types';

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
};

export function MaintenanceEditReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(mockAction);

  const handleSave = () => {
    // In a real app, we would save to Firestore here
    navigate(`/maintenance/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Éditer le rapport #{id}</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Modification de l'analyse technique et des coûts</p>
            </div>
        </div>
        <button onClick={handleSave} className="bg-navy-main text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg flex items-center gap-2">
            <Save size={18} /> Enregistrer les modifications
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle size={18} className="text-brand-orange" /> Analyse de la panne
                </h3>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Symptômes déclarés</label>
                        <textarea 
                            value={formData.symptoms}
                            onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all h-24 text-sm font-medium"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Diagnostic Technique</label>
                        <textarea 
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main transition-all h-24 text-sm font-bold text-navy-main"
                            placeholder="Entrez votre diagnostic..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cause Racine Confirmée</label>
                        <input 
                            type="text"
                            value={formData.confirmedCause}
                            onChange={(e) => setFormData({...formData, confirmedCause: e.target.value})}
                            className="w-full px-4 py-3 bg-red-50 border border-red-100 text-red-700 rounded-2xl outline-none focus:ring-2 focus:ring-red-500 font-bold text-sm"
                            placeholder="Cause de la panne..."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                    <Wrench size={18} /> Main d'œuvre & Temps
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temps d'arrêt (Heures)</label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input 
                                type="number"
                                value={formData.downtimeHours}
                                onChange={(e) => setFormData({...formData, downtimeHours: parseInt(e.target.value)})}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main text-sm font-black"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Coût Main d'œuvre (€)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">€</span>
                            <input 
                                type="number"
                                value={formData.laborCost}
                                onChange={(e) => setFormData({...formData, laborCost: parseInt(e.target.value)})}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-navy-main text-sm font-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Paramètres</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Statut</label>
                        <select 
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange"
                        >
                            <option value="reported">Signalée</option>
                            <option value="diagnosing">Diagnostic</option>
                            <option value="repairing">Réparation</option>
                            <option value="testing">Essais</option>
                            <option value="completed">Clôturée</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Criticité</label>
                        <select 
                            value={formData.priority}
                            onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-orange"
                        >
                            <option value="low">Basse</option>
                            <option value="medium">Moyenne</option>
                            <option value="high">Haute</option>
                            <option value="critical">Critique</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Technicien Assigné
                </h3>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-neutral-100">
                    <div className="w-10 h-10 bg-navy-main rounded-full flex items-center justify-center text-white text-xs font-black">MS</div>
                    <div>
                        <p className="text-sm font-bold text-navy-main">Marco Silva</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Expert Moteur</p>
                    </div>
                </div>
                <button className="w-full py-3 border border-neutral-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
                    Changer de technicien
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
