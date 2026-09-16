import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Vehicle } from '../../types';
import { 
  Car, ShieldCheck, AlertCircle, Calendar, Wrench, DollarSign, 
  ArrowLeft, MapPin, User, FileText, Plus, ShieldAlert, RefreshCw, 
  CheckCircle2, AlertTriangle, Disc, Battery, TrendingDown, Send
} from 'lucide-react';

export function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_fleet_vehicles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const vehicle = vehicles.find(v => v.id === id) || {
    id: id || 'V-101',
    internalId: 'PARIS-001',
    vin: 'VF1RFL00654129841',
    plate: 'AB-123-CD',
    make: 'Renault',
    model: 'Master L3H2',
    year: 2023,
    category: 'Utilitaire Léger',
    fuelType: 'Diesel',
    mileage: 48200,
    status: 'available',
    site: 'Agence Paris Nord',
    dateOfFirstRegistration: Date.now() - 400 * 86400000,
    owner: 'AutoHub Fleet Leasing',
    assignedDriver: 'Marc Vanhove',
    insuranceExpiry: Date.now() + 60 * 86400000,
    technicalInspectionExpiry: Date.now() + 180 * 86400000,
    value: 31500,
    history: [
      { date: Date.now() - 30 * 86400000, type: 'maintenance', description: 'Vidange complète & filtres', cost: 320 },
      { date: Date.now() - 120 * 86400000, type: 'repair', description: 'Remplacement plaquettes de frein AV', cost: 240 }
    ],
    documents: [
      { name: 'Carte Grise', expiryDate: Date.now() + 1000 * 86400000 },
      { name: 'Attestation Assurance', expiryDate: Date.now() + 60 * 86400000 }
    ]
  };

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'maintenance' | 'documents' | 'equipment' | 'transfer'>('overview');
  
  // Modal states
  const [showMileageModal, setShowMileageModal] = useState(false);
  const [newMileage, setNewMileage] = useState(vehicle.mileage);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [targetSite, setTargetSite] = useState(vehicle.site);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintDesc, setMaintDesc] = useState('');
  const [maintCost, setMaintCost] = useState(0);

  const updateVehiclesList = (updatedVehicle: Vehicle) => {
    const updatedList = vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v);
    // If not found in list (e.g. mock fallback), add it
    const finalList = updatedList.some(v => v.id === updatedVehicle.id) ? updatedList : [updatedVehicle, ...vehicles];
    setVehicles(finalList);
    try {
      localStorage.setItem('autohub_fleet_vehicles', JSON.stringify(finalList));
    } catch {}
  };

  const handleUpdateMileage = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...vehicle, mileage: Number(newMileage) };
    updateVehiclesList(updated);
    setShowMileageModal(false);
  };

  const handleTransferAgency = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...vehicle, site: targetSite };
    updateVehiclesList(updated);
    setShowTransferModal(false);
  };

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maintDesc.trim()) return;
    const newEntry = {
      date: Date.now(),
      type: 'maintenance' as const,
      description: maintDesc,
      cost: Number(maintCost)
    };
    const updated = { ...vehicle, history: [newEntry, ...vehicle.history] };
    updateVehiclesList(updated);
    setShowMaintenanceModal(false);
    setMaintDesc('');
    setMaintCost(0);
  };

  const totalCost = vehicle.history.reduce((acc, h) => acc + (h.cost || 0), 0);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-fadeIn">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vehicules')}
          className="flex items-center gap-2 text-slate-500 hover:text-navy-main font-bold text-xs bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft size={16} /> Retour au Parc Véhicules
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMileageModal(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            Mettre à jour le Kilométrage
          </button>
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold hover:bg-brand-orange/90 shadow-md flex items-center gap-1.5"
          >
            <Send size={14} /> Transférer Agence
          </button>
        </div>
      </div>

      {/* Main Vehicle Header Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-navy-main text-white flex items-center justify-center font-black text-2xl shadow-lg">
            <Car size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-navy-main">{vehicle.make} {vehicle.model} ({vehicle.year})</h1>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold uppercase tracking-wider">
                {vehicle.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mt-2">
              <span className="font-mono bg-slate-100 px-2.5 py-1 rounded text-navy-main font-bold">{vehicle.plate}</span>
              <span>•</span>
              <span>ID Interne: {vehicle.internalId}</span>
              <span>•</span>
              <span>Propriétaire: {vehicle.owner}</span>
              <span>•</span>
              <span className="text-brand-orange font-bold flex items-center gap-1"><MapPin size={12} /> {vehicle.site}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-center px-3">
            <div className="text-xl font-black text-navy-main">{vehicle.mileage.toLocaleString()} km</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Kilométrage</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center px-3">
            <div className="text-xl font-black text-emerald-600">{(vehicle.value || 0).toLocaleString()} €</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Valeur Vénale</div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'overview' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Fiche Technique & Affectation
        </button>
        <button
          onClick={() => setActiveSubTab('maintenance')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'maintenance' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Entretiens, Pannes & Coûts ({vehicle.history.length})
        </button>
        <button
          onClick={() => setActiveSubTab('documents')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'documents' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Documents & Alertes Assurance
        </button>
        <button
          onClick={() => setActiveSubTab('equipment')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'equipment' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Pneumatiques & Batteries
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3 flex items-center gap-2">
              <Car size={16} /> Spécifications Véhicule
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">VIN / Châssis :</span> <span className="font-mono font-bold text-navy-main">{vehicle.vin}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Catégorie :</span> <span className="font-bold">{vehicle.category}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Carburant :</span> <span className="font-bold">{vehicle.fuelType}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Année modèle :</span> <span className="font-bold">{vehicle.year}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Mise en circulation :</span> <span className="font-bold">{new Date(vehicle.dateOfFirstRegistration).toLocaleDateString()}</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3 flex items-center gap-2">
              <User size={16} /> Affectation & Site
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Agence actuelle :</span> <span className="font-bold text-brand-orange">{vehicle.site}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Conducteur assigné :</span> <span className="font-bold text-navy-main">{vehicle.assignedDriver || 'Non assigné'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Propriétaire :</span> <span className="font-bold">{vehicle.owner}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Statut opérationnel :</span> <span className="font-bold uppercase text-emerald-600">{vehicle.status}</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3 flex items-center gap-2">
              <DollarSign size={16} /> Valeur & Coûts Cumulés
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Valeur d'achat / cote :</span> <span className="font-bold text-navy-main">{(vehicle.value || 0).toLocaleString()} €</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Dépréciation estimée :</span> <span className="font-bold text-amber-600">- 12% / an</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Total entretiens & pannes :</span> <span className="font-bold text-brand-orange">{totalCost.toLocaleString()} €</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Coût moyen au km :</span> <span className="font-bold">{(totalCost / (vehicle.mileage || 1)).toFixed(2)} €/km</span></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MAINTENANCE */}
      {activeSubTab === 'maintenance' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-navy-main">Historique des Entretiens, Pannes et Coûts</h3>
              <p className="text-xs text-slate-500 mt-1">Total cumulé des interventions : <span className="font-bold text-brand-orange">{totalCost.toLocaleString()} €</span></p>
            </div>
            <button
              onClick={() => setShowMaintenanceModal(true)}
              className="px-5 py-2.5 bg-navy-main text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
            >
              <Plus size={16} /> Ajouter une Intervention / Panne
            </button>
          </div>

          <div className="space-y-4">
            {vehicle.history.map((h, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-main/10 text-navy-main flex items-center justify-center font-black">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-main text-sm capitalize">{h.type}</span>
                      <span className="text-xs font-mono text-slate-400">• {new Date(h.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{h.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-navy-main">{h.cost} €</div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Réglé</span>
                </div>
              </div>
            ))}
            {vehicle.history.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">Aucun historique d'entretien enregistré.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeSubTab === 'documents' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Documents Administratifs & Alertes d'Expiration</h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">Conforme</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-main text-sm">Assurance Flotte</span>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Valide (60 jours restants)</span>
              </div>
              <p className="text-xs text-slate-500">Police d'assurance multirisque professionnelle active.</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-main text-sm">Visite Technique (Contrôle Technique)</span>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Valide</span>
              </div>
              <p className="text-xs text-slate-500">Prochaine échéance dans 6 mois.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: EQUIPMENT (TIRES & BATTERIES) */}
      {activeSubTab === 'equipment' && (
        <div className="bg-grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3 flex items-center gap-2">
              <Disc size={16} /> Suivi des Pneumatiques
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Train Avant :</span> <span className="font-bold text-emerald-600">Michelin Primacy 4 (Usure : 25%)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Train Arrière :</span> <span className="font-bold text-emerald-600">Michelin Primacy 4 (Usure : 30%)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Pression conseillée :</span> <span className="font-bold">2.8 bar</span></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3 flex items-center gap-2">
              <Battery size={16} /> Suivi de la Batterie / Alternateur
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">État de santé (SoH) :</span> <span className="font-bold text-emerald-600">94% (Excellent)</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Tension nominale :</span> <span className="font-bold">12.6V</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Dernier test :</span> <span className="font-bold">Il y a 2 mois</span></div>
            </div>
          </div>
        </div>
      )}

      {/* MILEAGE UPDATE MODAL */}
      {showMileageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-navy-main">Mettre à jour le Kilométrage</h3>
            <form onSubmit={handleUpdateMileage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nouveau Kilométrage (km)</label>
                <input
                  type="number"
                  required
                  value={newMileage}
                  onChange={(e) => setNewMileage(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowMileageModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Annuler</button>
                <button type="submit" className="px-5 py-2 bg-navy-main text-white rounded-xl text-xs font-bold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSFER AGENCY MODAL */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-navy-main">Transférer vers une autre Agence</h3>
            <form onSubmit={handleTransferAgency} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nouvelle Agence / Site</label>
                <select
                  value={targetSite}
                  onChange={(e) => setTargetSite(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Agence Paris Nord">Agence Paris Nord</option>
                  <option value="Agence Lyon Confluence">Agence Lyon Confluence</option>
                  <option value="Atelier Lille Hub">Atelier Lille Hub</option>
                  <option value="Agence Marseille Port">Agence Marseille Port</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowTransferModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Annuler</button>
                <button type="submit" className="px-5 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold">Valider le Transfert</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MAINTENANCE MODAL */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-navy-main">Ajouter une Intervention / Panne</h3>
            <form onSubmit={handleAddMaintenance} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Description de l'intervention</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Révision périodique, changement courroie..."
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Coût (€)</label>
                <input
                  type="number"
                  required
                  value={maintCost}
                  onChange={(e) => setMaintCost(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowMaintenanceModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Annuler</button>
                <button type="submit" className="px-5 py-2 bg-navy-main text-white rounded-xl text-xs font-bold">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
