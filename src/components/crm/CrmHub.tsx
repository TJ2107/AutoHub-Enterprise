import React, { useState } from 'react';
import { 
  Users, Building2, UserCheck, Shield, Phone, Mail, MapPin, Plus, 
  Search, Filter, Star, FileText, Wrench, Car, DollarSign, Calendar, 
  CheckCircle2, AlertCircle, ArrowRight, Trash2, Edit, Eye, MessageSquare, 
  TrendingUp, Clock, Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CrmContact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface CommercialOpportunity {
  id: string;
  title: string;
  stage: 'prospect' | 'qualification' | 'devis_envoye' | 'negociation' | 'gagne' | 'perdu';
  estimatedValue: number;
  probability: number;
  expectedCloseDate: string;
}

export interface CrmCommunication {
  id: string;
  date: string;
  type: 'appel' | 'email' | 'reunion' | 'sav';
  summary: string;
  author: string;
}

export interface CrmServiceRequest {
  id: string;
  subject: string;
  status: 'ouvert' | 'en_cours' | 'resolu';
  priority: 'basse' | 'normale' | 'urgente';
  date: string;
}

export interface ExtendedCustomer {
  id: string;
  name: string;
  type: 'entreprise' | 'particulier' | 'administration' | 'partenaire';
  segment: 'VIP' | 'Grand Compte' | 'Standard' | 'Partenaire Stratégique';
  status: 'prospect' | 'actif' | 'inactif';
  email: string;
  phone: string;
  address: string;
  siret?: string;
  vatNumber?: string;
  creditLimit: number;
  contacts: CrmContact[];
  vehiclesCount: number;
  activeContractsCount: number;
  totalPurchased: number;
  opportunities: CommercialOpportunity[];
  communications: CrmCommunication[];
  serviceRequests: CrmServiceRequest[];
  createdAt: string;
}

const INITIAL_CUSTOMERS: ExtendedCustomer[] = [
  {
    id: 'CUST-001',
    name: 'BTP Logistics SA',
    type: 'entreprise',
    segment: 'Grand Compte',
    status: 'actif',
    email: 'contact@btplogistics.com',
    phone: '+33 1 42 68 90 00',
    address: '14 Avenue de la République, 75011 Paris',
    siret: '482 910 334 00021',
    vatNumber: 'FR 44 482910334',
    creditLimit: 150000,
    contacts: [
      { id: 'cnt-1', name: 'Marc Vanhove', role: 'Directeur Logistique', email: 'm.vanhove@btplogistics.com', phone: '+33 6 12 34 56 78', isPrimary: true },
      { id: 'cnt-2', name: 'Sylvie Bernard', role: 'Responsable Achats', email: 's.bernard@btplogistics.com', phone: '+33 6 98 76 54 32', isPrimary: false }
    ],
    vehiclesCount: 14,
    activeContractsCount: 3,
    totalPurchased: 245000,
    opportunities: [
      { id: 'opp-1', title: 'Renouvellement flotte utilitaires (6 vans)', stage: 'negociation', estimatedValue: 180000, probability: 80, expectedCloseDate: '2026-10-15' }
    ],
    communications: [
      { id: 'com-1', date: '2026-09-14 10:30', type: 'appel', summary: 'Point sur la maintenance trimestrielle des bennes.', author: 'Jean Commercial' },
      { id: 'com-2', date: '2026-09-10 14:15', type: 'email', summary: 'Envoi du devis comparatif LDD utilitaires.', author: 'Jean Commercial' }
    ],
    serviceRequests: [
      { id: 'sr-1', subject: 'Panne hayon élévateur camion #AB-452', status: 'en_cours', priority: 'urgente', date: '2026-09-15' }
    ],
    createdAt: '2024-03-12'
  },
  {
    id: 'CUST-002',
    name: 'Ministère des Transports',
    type: 'administration',
    segment: 'VIP',
    status: 'actif',
    email: 'flotte@transports.gouv.fr',
    phone: '+33 1 40 81 21 21',
    address: '246 Boulevard Saint-Germain, 75007 Paris',
    siret: '120 025 778 00012',
    vatNumber: 'FR 92 120025778',
    creditLimit: 500000,
    contacts: [
      { id: 'cnt-3', name: 'Général Philippe Laroche', role: 'Directeur des Moyens Généraux', email: 'p.laroche@transports.gouv.fr', phone: '+33 1 40 81 00 00', isPrimary: true }
    ],
    vehiclesCount: 28,
    activeContractsCount: 5,
    totalPurchased: 890000,
    opportunities: [
      { id: 'opp-2', title: 'Appel d’offres véhicules officiels hybrides', stage: 'devis_envoye', estimatedValue: 450000, probability: 60, expectedCloseDate: '2026-11-30' }
    ],
    communications: [
      { id: 'com-3', date: '2026-09-12 09:00', type: 'reunion', summary: 'Soutenance technique de l’offre véhicules hybrides.', author: 'Direction Commerciale' }
    ],
    serviceRequests: [],
    createdAt: '2023-11-05'
  },
  {
    id: 'CUST-003',
    name: 'Jean-Marc Lelièvre',
    type: 'particulier',
    segment: 'Standard',
    status: 'actif',
    email: 'jm.lelievre@gmail.com',
    phone: '+33 6 45 11 22 33',
    address: '8 Rue des Lilas, 69003 Lyon',
    creditLimit: 5000,
    contacts: [],
    vehiclesCount: 1,
    activeContractsCount: 0,
    totalPurchased: 34200,
    opportunities: [],
    communications: [
      { id: 'com-4', date: '2026-09-08 11:20', type: 'sav', summary: 'Révision des 30 000 km effectuée avec succès.', author: 'Atelier Lyon' }
    ],
    serviceRequests: [],
    createdAt: '2025-01-20'
  },
  {
    id: 'CUST-004',
    name: 'AutoClean & Services (Partenaire)',
    type: 'partenaire',
    segment: 'Partenaire Stratégique',
    status: 'actif',
    email: 'partenariat@autoclean.fr',
    phone: '+33 4 78 99 00 11',
    address: 'ZI du Merlan, 13014 Marseille',
    siret: '512 889 441 00015',
    vatNumber: 'FR 81 512889441',
    creditLimit: 25000,
    contacts: [
      { id: 'cnt-4', name: 'Nathalie Kouassi', role: 'Gérante', email: 'n.kouassi@autoclean.fr', phone: '+33 6 77 88 99 00', isPrimary: true }
    ],
    vehiclesCount: 0,
    activeContractsCount: 1,
    totalPurchased: 12000,
    opportunities: [],
    communications: [],
    serviceRequests: [],
    createdAt: '2024-06-18'
  },
  {
    id: 'CUST-005',
    name: 'Innovatech Cloud',
    type: 'entreprise',
    segment: 'VIP',
    status: 'prospect',
    email: 'achats@innovatech.io',
    phone: '+33 1 89 00 12 34',
    address: 'Station F, 5 Parvis Alan Turing, 75013 Paris',
    siret: '891 223 554 00010',
    vatNumber: 'FR 12 891223554',
    creditLimit: 50000,
    contacts: [
      { id: 'cnt-5', name: 'Alexandre Dumas', role: 'CEO', email: 'alex@innovatech.io', phone: '+33 6 01 02 03 04', isPrimary: true }
    ],
    vehiclesCount: 0,
    activeContractsCount: 0,
    totalPurchased: 0,
    opportunities: [
      { id: 'opp-3', title: 'Flotte de direction 100% électrique (Tesla Model Y)', stage: 'qualification', estimatedValue: 75000, probability: 40, expectedCloseDate: '2026-10-31' }
    ],
    communications: [
      { id: 'com-5', date: '2026-09-15 16:00', type: 'appel', summary: 'Intéressé par la LDD sur 36 mois avec bornes incluses.', author: 'Commercial B2B' }
    ],
    serviceRequests: [],
    createdAt: '2026-09-10'
  }
];

export function CrmHub() {
  const [customers, setCustomers] = useState<ExtendedCustomer[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_crm_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [activeTab, setActiveTab] = useState<'directory' | 'prospects' | 'opportunities' | 'communications'>('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [segmentFilter, setSegmentFilter] = useState<string>('tous');
  const [showAddModal, setShowAddModal] = useState(false);

  // New customer form state
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'entreprise' | 'particulier' | 'administration' | 'partenaire'>('entreprise');
  const [newSegment, setNewSegment] = useState<'VIP' | 'Grand Compte' | 'Standard' | 'Partenaire Stratégique'>('Standard');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newSiret, setNewSiret] = useState('');

  const navigate = useNavigate();

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newCust: ExtendedCustomer = {
      id: `CUST-00${customers.length + 1}`,
      name: newName,
      type: newType,
      segment: newSegment,
      status: newType === 'entreprise' || newType === 'administration' ? 'actif' : 'prospect',
      email: newEmail,
      phone: newPhone,
      address: newAddress,
      siret: newSiret,
      vatNumber: newSiret ? `FR 99 ${newSiret.replace(/\s/g, '')}` : undefined,
      creditLimit: newType === 'entreprise' ? 50000 : 10000,
      contacts: [],
      vehiclesCount: 0,
      activeContractsCount: 0,
      totalPurchased: 0,
      opportunities: [],
      communications: [
        { id: `com-${Date.now()}`, date: new Date().toISOString().replace('T', ' ').substring(0, 16), type: 'appel', summary: 'Création initiale de la fiche client.', author: 'Système CRM' }
      ],
      serviceRequests: [],
      createdAt: new Date().toISOString().substring(0, 10)
    };

    const updated = [newCust, ...customers];
    setCustomers(updated);
    try {
      localStorage.setItem('autohub_crm_customers', JSON.stringify(updated));
    } catch {}

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
    setNewSiret('');
  };

  const filteredCustomers = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm);
    const matchType = typeFilter === 'tous' || c.type === typeFilter;
    const matchSegment = segmentFilter === 'tous' || c.segment === segmentFilter;
    return matchSearch && matchType && matchSegment;
  });

  const allOpportunities = customers.flatMap(c => c.opportunities.map(o => ({ ...o, customerName: c.name, customerId: c.id })));
  const allCommunications = customers.flatMap(c => c.communications.map(com => ({ ...com, customerName: c.name, customerId: c.id })));

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-main to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-2">
            <Users size={18} />
            <span>Gestion de la Relation Client (CRM Enterprise)</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Portefeuille Clients & Prospects</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Gestion centralisée des particuliers, entreprises, administrations et partenaires. Vue consolidée, pipeline d'opportunités et historique des interactions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 transition-all"
        >
          <Plus size={18} /> Nouveau Client / Prospect
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'directory' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users size={16} /> Annuaire Clients ({customers.length})
        </button>
        <button
          onClick={() => setActiveTab('prospects')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'prospects' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <UserCheck size={16} /> Prospects & Leads ({customers.filter(c => c.status === 'prospect').length})
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'opportunities' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp size={16} /> Opportunités Commerciales ({allOpportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('communications')}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'communications' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <MessageSquare size={16} /> Journal des Communications
        </button>
      </div>

      {/* TAB 1: DIRECTORY & SEARCH */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher par nom, email, téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-orange"
              >
                <option value="tous">Tous les types</option>
                <option value="entreprise">Entreprises</option>
                <option value="particulier">Particuliers</option>
                <option value="administration">Administrations</option>
                <option value="partenaire">Partenaires</option>
              </select>

              <select
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-brand-orange"
              >
                <option value="tous">Tous les segments</option>
                <option value="VIP">VIP</option>
                <option value="Grand Compte">Grand Compte</option>
                <option value="Standard">Standard</option>
                <option value="Partenaire Stratégique">Partenaire Stratégique</option>
              </select>
            </div>
          </div>

          {/* Customers Table / Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                    <th className="p-5">Client / Raison Sociale</th>
                    <th className="p-5">Type & Segment</th>
                    <th className="p-5">Coordonnées</th>
                    <th className="p-5">Activité & Flotte</th>
                    <th className="p-5">Chiffre d'affaires</th>
                    <th className="p-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCustomers.map((cust) => {
                    const isCompany = cust.type === 'entreprise' || cust.type === 'administration';
                    return (
                      <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-navy-main/10 text-navy-main flex items-center justify-center font-black">
                              {cust.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-navy-main text-base">{cust.name}</div>
                              <div className="text-xs text-slate-400 font-mono">ID: {cust.id} {cust.siret ? `• SIRET: ${cust.siret}` : ''}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold capitalize">
                              {cust.type}
                            </span>
                            <div className="text-[11px] font-bold text-brand-orange">{cust.segment}</div>
                          </div>
                        </td>
                        <td className="p-5 space-y-1 text-xs">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Mail size={14} className="text-slate-400" />
                            <span>{cust.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Phone size={14} className="text-slate-400" />
                            <span>{cust.phone}</span>
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-3 text-xs font-bold">
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-1">
                              <Car size={12} /> {cust.vehiclesCount} véh.
                            </span>
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-1">
                              <FileText size={12} /> {cust.activeContractsCount} contr.
                            </span>
                          </div>
                        </td>
                        <td className="p-5 font-black text-navy-main">
                          {cust.totalPurchased.toLocaleString()} €
                        </td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => navigate(`/crm/${cust.id}`)}
                            className="px-4 py-2 bg-navy-main hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ml-auto"
                          >
                            <Eye size={14} /> Fiche Consolidée
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-400">
                        Aucun client trouvé pour ces critères.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROSPECTS & LEADS */}
      {activeTab === 'prospects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customers.filter(c => c.status === 'prospect').map(prospect => (
              <div key={prospect.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 hover:border-brand-orange transition-all">
                <div className="flex items-start justify-between">
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-xl text-xs font-black uppercase tracking-wider">
                    Prospect Actif
                  </span>
                  <span className="text-xs font-mono text-slate-400">{prospect.createdAt}</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-navy-main">{prospect.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 capitalize">{prospect.type} • {prospect.segment}</p>
                </div>
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600"><Mail size={14} className="text-slate-400" /> {prospect.email}</div>
                  <div className="flex items-center gap-2 text-slate-600"><Phone size={14} className="text-slate-400" /> {prospect.phone}</div>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <button 
                    onClick={() => navigate(`/crm/${prospect.id}`)}
                    className="w-full py-2.5 bg-brand-orange text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-orange/20"
                  >
                    Convertir / Gérer le Prospect <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
            {customers.filter(c => c.status === 'prospect').length === 0 && (
              <div className="col-span-3 text-center py-16 text-slate-400 bg-white rounded-3xl border border-slate-200">
                Aucun prospect en attente. Tous les comptes sont actifs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: COMMERCIAL OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-navy-main">Pipeline des Opportunités Commerciales</h2>
            <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-bold">
              Total Pipeline : {allOpportunities.reduce((acc, o) => acc + o.estimatedValue, 0).toLocaleString()} €
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allOpportunities.map(opp => (
              <div key={opp.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-start justify-between">
                  <span className="px-2.5 py-1 bg-brand-orange text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                    {opp.stage.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{opp.probability}% prob.</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-main text-base">{opp.title}</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">Client : {opp.customerName}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                  <span className="text-slate-500 flex items-center gap-1"><Calendar size={14} /> {opp.expectedCloseDate}</span>
                  <span className="font-black text-navy-main text-sm">{opp.estimatedValue.toLocaleString()} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMMUNICATIONS JOURNAL */}
      {activeTab === 'communications' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
          <h2 className="text-lg font-black text-navy-main">Journal Récent des Communications & Appels</h2>
          <div className="space-y-4">
            {allCommunications.map(com => (
              <div key={com.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-main/10 text-navy-main flex items-center justify-center font-black mt-1">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-main text-sm">{com.customerName}</span>
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md text-[10px] font-bold uppercase">{com.type}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{com.summary}</p>
                    <div className="text-[10px] text-slate-400 mt-2">Auteur : {com.author}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400">{com.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD CUSTOMER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-navy-main">Créer une Fiche Client / Prospect</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Nom / Raison Sociale *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Transports Martin & Fils"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Type de Client</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  >
                    <option value="entreprise">Entreprise</option>
                    <option value="particulier">Particulier</option>
                    <option value="administration">Administration</option>
                    <option value="partenaire">Partenaire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Segment</label>
                  <select
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value as any)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  >
                    <option value="Standard">Standard</option>
                    <option value="VIP">VIP</option>
                    <option value="Grand Compte">Grand Compte</option>
                    <option value="Partenaire Stratégique">Partenaire Stratégique</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Email Pro *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@societe.fr"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Téléphone</label>
                  <input
                    type="text"
                    placeholder="+33 1 ..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">Adresse Postale</label>
                <input
                  type="text"
                  placeholder="12 rue de la Paix, Paris"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                />
              </div>

              {newType === 'entreprise' && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">N° SIRET</label>
                  <input
                    type="text"
                    placeholder="482 910 334 00021"
                    value={newSiret}
                    onChange={(e) => setNewSiret(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                  />
                </div>
              )}

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
                  Enregistrer la Fiche
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
