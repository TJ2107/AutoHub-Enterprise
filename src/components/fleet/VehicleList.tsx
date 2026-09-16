import React, { useState } from 'react';
import { Vehicle } from '../../types';
import { 
  Search, Plus, Car, ShieldAlert, Calendar, Wrench, MapPin, 
  ArrowRight, FileSpreadsheet, Upload, RefreshCw, AlertTriangle, CheckCircle2, Eye, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_VEHICLES: Vehicle[] = [
  { 
    id: 'V-101', internalId: 'PARIS-001', vin: 'VF1RFL00654129841', plate: 'AB-123-CD', make: 'Renault', model: 'Master L3H2', year: 2023, 
    category: 'Utilitaire Léger', fuelType: 'Diesel', mileage: 48200, status: 'available', site: 'Agence Paris Nord',
    dateOfFirstRegistration: Date.now() - 400 * 86400000, owner: 'AutoHub Fleet Leasing', assignedDriver: 'Marc Vanhove',
    insuranceExpiry: Date.now() + 60 * 86400000, technicalInspectionExpiry: Date.now() + 180 * 86400000, value: 31500,
    history: [
      { date: Date.now() - 30 * 86400000, type: 'maintenance', description: 'Vidange complète & filtres', cost: 320 },
      { date: Date.now() - 120 * 86400000, type: 'repair', description: 'Remplacement plaquettes de frein AV', cost: 240 }
    ],
    documents: [
      { name: 'Carte Grise', expiryDate: Date.now() + 1000 * 86400000 },
      { name: 'Attestation Assurance', expiryDate: Date.now() + 60 * 86400000 }
    ]
  },
  { 
    id: 'V-102', internalId: 'LYON-004', vin: 'WBA5G51030G789123', plate: 'XY-987-ZT', make: 'BMW', model: 'Série 3 Touring', year: 2024, 
    category: 'Berline Direction', fuelType: 'Hybride', mileage: 15400, status: 'mission', site: 'Agence Lyon Confluence',
    dateOfFirstRegistration: Date.now() - 200 * 86400000, owner: 'AutoHub Enterprise', assignedDriver: 'Général Philippe Laroche',
    insuranceExpiry: Date.now() + 300 * 86400000, technicalInspectionExpiry: Date.now() + 500 * 86400000, value: 48900,
    history: [
      { date: Date.now() - 15 * 86400000, type: 'maintenance', description: 'Contrôle niveau hybride & pneumatiques', cost: 120 }
    ],
    documents: [
      { name: 'Carte Grise', expiryDate: Date.now() + 1000 * 86400000 }
    ]
  },
  { 
    id: 'V-103', internalId: 'LILLE-012', vin: 'WMA06XZ0NE1234567', plate: 'GH-456-JK', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2021, 
    category: 'Poids Lourd / Camion', fuelType: 'Diesel', mileage: 215000, status: 'maintenance', site: 'Atelier Lille Hub',
    dateOfFirstRegistration: Date.now() - 1000 * 86400000, owner: 'AutoHub Freight', assignedDriver: 'Thomas Mercier',
    insuranceExpiry: Date.now() + 10 * 86400000, technicalInspectionExpiry: Date.now() - 5 * 86400000, value: 72000,
    history: [
      { date: Date.now() - 2 * 86400000, type: 'repair', description: 'Révision boîte de vitesses & embrayage', cost: 2450 }
    ],
    documents: [
      { name: 'Visite Technique', expiryDate: Date.now() - 5 * 86400000 }
    ]
  },
  { 
    id: 'V-104', internalId: 'MARS-008', vin: 'SALWA2249HA987654', plate: 'XX-555-YY', make: 'Land Rover', model: 'Defender 110', year: 2023, 
    category: 'Tout-Terrain', fuelType: 'Diesel', mileage: 34000, status: 'immobilized', site: 'Agence Marseille Port',
    dateOfFirstRegistration: Date.now() - 500 * 86400000, owner: 'AutoHub Logistics', assignedDriver: 'Nathalie Kouassi',
    insuranceExpiry: Date.now() + 150 * 86400000, technicalInspectionExpiry: Date.now() + 200 * 86400000, value: 64000,
    history: [
      { date: Date.now() - 5 * 86400000, type: 'accident', description: 'Choc latéral arrière droit - En attente expertise', cost: 1800 }
    ],
    documents: []
  }
];

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_fleet_vehicles');
      return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
    } catch {
      return INITIAL_VEHICLES;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [agencyFilter, setAgencyFilter] = useState<string>('tous');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // New vehicle form state
  const [internalId, setInternalId] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [vin, setVin] = useState('');
  const [category, setCategory] = useState('Utilitaire Léger');
  const [fuelType, setFuelType] = useState('Diesel');
  const [mileage, setMileage] = useState(0);
  const [site, setSite] = useState('Agence Paris Nord');
  const [value, setValue] = useState(25000);

  const saveVehicles = (updated: Vehicle[]) => {
    setVehicles(updated);
    try {
      localStorage.setItem('autohub_fleet_vehicles', JSON.stringify(updated));
    } catch {}
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make.trim() || !plate.trim()) return;

    const newVeh: Vehicle = {
      id: `V-${Date.now()}`,
      internalId: internalId || `V-${Math.floor(Math.random() * 900 + 100)}`,
      vin: vin || 'VF1' + Math.random().toString(36).substring(2, 14).toUpperCase(),
      plate: plate.toUpperCase(),
      make,
      model,
      year: 2024,
      category,
      fuelType,
      mileage: Number(mileage),
      status: 'available',
      site,
      dateOfFirstRegistration: Date.now(),
      owner: 'AutoHub Enterprise',
      assignedDriver: 'Non affecté',
      insuranceExpiry: Date.now() + 365 * 86400000,
      technicalInspectionExpiry: Date.now() + 365 * 86400000,
      value: Number(value),
      history: [{ date: Date.now(), type: 'maintenance', description: 'Mise en service parc', cost: 0 }],
      documents: [{ name: 'Carte Grise', expiryDate: Date.now() + 1000 * 86400000 }]
    };

    saveVehicles([newVeh, ...vehicles]);
    setShowAddModal(false);
    setInternalId('');
    setMake('');
    setModel('');
    setPlate('');
    setVin('');
    setMileage(0);
  };

  const handleSimulateImport = () => {
    const imported: Vehicle[] = [
      {
        id: `V-IMP-1`,
        internalId: 'PARIS-015',
        vin: 'VF3M45120987123',
        plate: 'ZZ-999-AA',
        make: 'Peugeot',
        model: 'e-Expert Van',
        year: 2024,
        category: 'Utilitaire Électrique',
        fuelType: 'Électrique',
        mileage: 8200,
        status: 'available',
        site: 'Agence Paris Nord',
        dateOfFirstRegistration: Date.now() - 90 * 86400000,
        owner: 'AutoHub Green',
        assignedDriver: 'Équipe Logistique A',
        insuranceExpiry: Date.now() + 300 * 86400000,
        technicalInspectionExpiry: Date.now() + 600 * 86400000,
        value: 39000,
        history: [],
        documents: [{ name: 'Certificat Batterie', expiryDate: Date.now() + 1500 * 86400000 }]
      },
      {
        id: `V-IMP-2`,
        internalId: 'LYON-022',
        vin: 'WDB9061531234567',
        plate: 'YY-888-BB',
        make: 'Mercedes-Benz',
        model: 'Sprinter 316',
        year: 2023,
        category: 'Fourgon Grand Volume',
        fuelType: 'Diesel',
        mileage: 52000,
        status: 'available',
        site: 'Agence Lyon Confluence',
        dateOfFirstRegistration: Date.now() - 400 * 86400000,
        owner: 'AutoHub Enterprise',
        assignedDriver: 'Équipe Messagerie',
        insuranceExpiry: Date.now() + 200 * 86400000,
        technicalInspectionExpiry: Date.now() + 180 * 86400000,
        value: 34500,
        history: [],
        documents: []
      }
    ];

    saveVehicles([...imported, ...vehicles]);
    setShowImportModal(false);
    alert('Importation Excel / CSV réussie : 2 nouveaux véhicules ajoutés au parc.');
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchSearch = v.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        v.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        v.internalId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'tous' || v.status === statusFilter;
    const matchAgency = agencyFilter === 'tous' || v.site === agencyFilter;
    return matchSearch && matchStatus && matchAgency;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Disponible</span>;
      case 'mission': return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-bold">En mission</span>;
      case 'maintenance': return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">En maintenance</span>;
      case 'immobilized': return <span className="px-2.5 py-1 bg-rose-100 text-rose-800 rounded-lg text-xs font-bold">Immobilisé</span>;
      case 'sold': return <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold">Vendu</span>;
      case 'rented': return <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-xs font-bold">Loué</span>;
      case 'retired': return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">Réformé</span>;
      default: return <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-main to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-2">
            <Car size={18} />
            <span>Gestion de Parc & Flotte Automobile (Enterprise)</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Parc Véhicules & Équipements</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Supervision en temps réel des véhicules (VL, VU, Poids Lourds), suivi des documents administratifs, transferts inter-agences, pneumatiques, batteries et renouvellement.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <FileSpreadsheet size={16} className="text-brand-orange" /> Importer Excel / CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-orange/25 transition-all"
          >
            <Plus size={18} /> Nouveau Véhicule
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Flotte</div>
          <div className="text-3xl font-black text-navy-main">{vehicles.length} Véhicules</div>
          <div className="text-xs text-emerald-600 font-semibold">Parc actif et opérationnel</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Disponibles</div>
          <div className="text-3xl font-black text-emerald-600">{vehicles.filter(v => v.status === 'available').length}</div>
          <div className="text-xs text-slate-500 font-semibold">Prêts pour mission / location</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">En Maintenance / Ateliers</div>
          <div className="text-3xl font-black text-amber-600">{vehicles.filter(v => v.status === 'maintenance' || v.status === 'immobilized').length}</div>
          <div className="text-xs text-slate-500 font-semibold">Interventions en cours</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Valeur Globale Parc</div>
          <div className="text-3xl font-black text-navy-main">
            {vehicles.reduce((acc, v) => acc + (v.value || 0), 0).toLocaleString()} €
          </div>
          <div className="text-xs text-slate-500 font-semibold">Évaluation active</div>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher par immatriculation, marque, modèle ou ID interne..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-orange"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-orange"
          >
            <option value="tous">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="mission">En mission</option>
            <option value="maintenance">En maintenance</option>
            <option value="immobilized">Immobilisé</option>
            <option value="rented">Loué</option>
          </select>

          <select
            value={agencyFilter}
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-orange"
          >
            <option value="tous">Toutes les agences</option>
            <option value="Agence Paris Nord">Agence Paris Nord</option>
            <option value="Agence Lyon Confluence">Agence Lyon Confluence</option>
            <option value="Atelier Lille Hub">Atelier Lille Hub</option>
            <option value="Agence Marseille Port">Agence Marseille Port</option>
          </select>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <th className="p-5">Identifiant & Véhicule</th>
                <th className="p-5">Immatriculation & VIN</th>
                <th className="p-5">Statut</th>
                <th className="p-5">Kilométrage & Carburant</th>
                <th className="p-5">Agence / Site</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center font-black">
                        <Car size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-navy-main text-base">{v.make} {v.model}</div>
                        <div className="text-xs text-slate-400 font-mono">ID: {v.internalId} • {v.category} ({v.year})</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 space-y-0.5">
                    <div className="font-mono font-bold text-navy-main bg-slate-100 px-2 py-0.5 rounded inline-block text-xs">{v.plate}</div>
                    <div className="text-[11px] font-mono text-slate-400">VIN: {v.vin}</div>
                  </td>
                  <td className="p-5">
                    {getStatusBadge(v.status)}
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-navy-main">{v.mileage.toLocaleString()} km</div>
                    <div className="text-xs text-slate-500">{v.fuelType}</div>
                  </td>
                  <td className="p-5 text-xs font-semibold text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-brand-orange" />
                      {v.site}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <Link
                      to={`/vehicules/${v.id}`}
                      className="px-4 py-2 bg-navy-main hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-1.5"
                    >
                      <Eye size={14} /> Fiche Complète
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredVehicles.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    Aucun véhicule trouvé pour ces critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD VEHICLE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-navy-main">Enregistrer un Nouveau Véhicule</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Marque *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Renault, Mercedes..."
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Modèle *</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Master, Actros..."
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Immatriculation *</label>
                  <input
                    type="text"
                    required
                    placeholder="AB-123-CD"
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">ID Interne</label>
                  <input
                    type="text"
                    placeholder="PARIS-009"
                    value={internalId}
                    onChange={(e) => setInternalId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Numéro de Châssis (VIN)</label>
                <input
                  type="text"
                  placeholder="17 caractères VIN"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="Utilitaire Léger">Utilitaire Léger</option>
                    <option value="Berline">Berline</option>
                    <option value="Poids Lourd / Camion">Poids Lourd</option>
                    <option value="Tout-Terrain">Tout-Terrain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Carburant</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Essence">Essence</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Kilométrage</label>
                  <input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Agence / Site</label>
                  <select
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
                  >
                    <option value="Agence Paris Nord">Agence Paris Nord</option>
                    <option value="Agence Lyon Confluence">Agence Lyon Confluence</option>
                    <option value="Atelier Lille Hub">Atelier Lille Hub</option>
                    <option value="Agence Marseille Port">Agence Marseille Port</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Valeur Initiale (€)</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-navy-main text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                  Enregistrer le Véhicule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT EXCEL / CSV MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-3xl flex items-center justify-center mx-auto">
              <FileSpreadsheet size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-navy-main">Importation de Véhicules par Fichier</h3>
              <p className="text-xs text-slate-500 mt-2">
                Glissez-déposez votre fichier au format Excel (.xlsx) ou CSV contenant les immatriculations, VIN, marques et kilométrages.
              </p>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-orange transition-colors">
              <Upload size={24} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-700">Sélectionner un fichier CSV / Excel</span>
              <span className="text-[10px] text-slate-400">Taille maximale : 10 Mo</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSimulateImport}
                className="px-6 py-3 bg-brand-orange text-white rounded-xl text-xs font-bold hover:bg-brand-orange/90 shadow-md"
              >
                Lancer l'Importation de Démo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
