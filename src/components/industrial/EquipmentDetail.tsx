import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  ChevronLeft, 
  Settings, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  History, 
  Wrench, 
  Droplets, 
  Zap, 
  Package, 
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { IndustrialEquipment } from '../../types';

const mockEquipment: IndustrialEquipment = {
  id: 'e1',
  inventoryNumber: 'INV-CAT-001',
  name: 'Pelle Hydraulique 320',
  brand: 'Caterpillar',
  model: '320 Next Gen',
  serialNumber: 'CAT320X12345',
  type: 'construction',
  location: 'Chantier A1 - Nord',
  owner: 'AutoHub Construction',
  operatingHours: 1250,
  capacity: '20 Tons',
  status: 'operational',
  acquisitionDate: Date.now() - 31536000000,
  warrantyExpiration: Date.now() + 31536000000,
  lastServiceHours: 1000,
  nextServiceHours: 1500,
  specificSpecs: {
    'Moteur': 'CAT C4.4 ACERT',
    'Puissance': '174 HP',
    'Poids Opérationnel': '22,500 kg',
    'Débit Hydr.': '429 L/min'
  }
};

export function EquipmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item] = useState(mockEquipment);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">{item.name}</h2>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-green-500 text-white`}>
                        {item.status}
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium tracking-tight">#{item.inventoryNumber} • {item.brand} {item.model}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2.5 border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white flex items-center gap-2 shadow-sm transition-all">
                <FileText size={16} /> Fiche Technique
            </button>
            <button className="px-4 py-2.5 bg-navy-main text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-navy-main/20 transition-all">
                <Wrench size={16} /> Programmer Entretien
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Heures Moteur</p>
                    <p className="text-3xl font-black text-navy-main">{item.operatingHours.toLocaleString()}h</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase">
                        <Clock size={12} /> +120h ce mois
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prochaine Révision</p>
                    <p className="text-3xl font-black text-navy-main">{item.nextServiceHours}h</p>
                    <p className="text-[10px] font-bold text-orange-500 uppercase">Échéance dans {item.nextServiceHours - item.operatingHours}h</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-2 text-navy-main">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localisation Actuelle</p>
                    <p className="text-sm font-bold mt-2">{item.location}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <MapPin size={10} /> GPS Actif
                    </p>
                </div>
            </div>

            {/* Maintenance Specifics */}
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden divide-y divide-neutral-100">
                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck size={18} /> Points de Maintenance Critique
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Fluides & Huiles', icon: Droplets, status: 'ok', last: '1200h', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'Contrôle Hydraulique', icon: Settings, status: 'warning', last: '1000h', color: 'text-orange-500', bg: 'bg-orange-50' },
                            { label: 'Circuit Électrique', icon: Zap, status: 'ok', last: '1200h', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                            { label: 'Filtres Air/Gasoil', icon: Package, status: 'ok', last: '1200h', color: 'text-slate-500', bg: 'bg-slate-50' }
                        ].map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 ${m.bg} ${m.color} rounded-lg`}>
                                        <m.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-navy-main uppercase tracking-tight">{m.label}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">Dernier ctrl: {m.last}</p>
                                    </div>
                                </div>
                                {m.status === 'ok' ? (
                                    <CheckCircle2 size={18} className="text-green-500" />
                                ) : (
                                    <AlertTriangle size={18} className="text-orange-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <History size={18} /> Historique des Interventions
                    </h3>
                    <div className="space-y-4">
                        {[
                            { date: '12/08/2024', type: 'Préventif', task: 'Vidange moteur + Filtres', hours: '1000h', cost: '850 €' },
                            { date: '05/06/2024', type: 'Correctif', task: 'Remplacement flexibles hydrauliques', hours: '820h', cost: '1,200 €' }
                        ].map((h, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-neutral-100 rounded-2xl shadow-sm">
                                <div>
                                    <p className="text-xs font-black text-navy-main uppercase">{h.task}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{h.date} • {h.hours} • <span className={h.type === 'Correctif' ? 'text-red-500' : 'text-blue-500'}>{h.type}</span></p>
                                </div>
                                <span className="text-sm font-black text-navy-main">{h.cost}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl space-y-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <BarChart3 size={16} /> Spécifications Techniques
                </h3>
                <div className="space-y-4">
                    {Object.entries(item.specificSpecs || {}).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{key}</span>
                            <span className="text-xs font-black uppercase">{val}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-4 space-y-4">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Capacité nominale</p>
                        <p className="text-xl font-bold mt-1">{item.capacity}</p>
                    </div>
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Propriétaire</p>
                        <p className="text-sm font-bold mt-1">{item.owner}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> Garantie & Assurance
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase">Garantie jusqu'au</span>
                        <span className="font-black text-navy-main">{new Date(item.warrantyExpiration).toLocaleDateString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '65%' }} />
                    </div>
                    <p className="text-[10px] text-green-600 font-bold uppercase tracking-tight">Extension de garantie active</p>
                </div>
                <button className="w-full py-3 bg-slate-50 text-navy-main text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    Voir les documents
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
