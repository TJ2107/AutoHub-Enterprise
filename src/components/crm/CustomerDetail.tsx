import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, User, History, FileText, Wrench, Car, 
  ArrowLeft, Building2, Shield, DollarSign, Calendar, CheckCircle2, 
  Plus, MessageSquare, Briefcase, Tag
} from 'lucide-react';
import { ExtendedCustomer } from './CrmHub';

export function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<ExtendedCustomer[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_crm_customers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const customer = customers.find(c => c.id === id) || {
    id: id || 'CUST-001',
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
      { id: 'cnt-1', name: 'Marc Vanhove', role: 'Directeur Logistique', email: 'm.vanhove@btplogistics.com', phone: '+33 6 12 34 56 78', isPrimary: true }
    ],
    vehiclesCount: 14,
    activeContractsCount: 3,
    totalPurchased: 245000,
    opportunities: [
      { id: 'opp-1', title: 'Renouvellement flotte utilitaires', stage: 'negociation', estimatedValue: 180000, probability: 80, expectedCloseDate: '2026-10-15' }
    ],
    communications: [
      { id: 'com-1', date: '2026-09-14 10:30', type: 'appel', summary: 'Point sur la maintenance trimestrielle.', author: 'Jean Commercial' }
    ],
    serviceRequests: [
      { id: 'sr-1', subject: 'Panne hayon élévateur camion', status: 'en_cours', priority: 'urgente', date: '2026-09-15' }
    ],
    createdAt: '2024-03-12'
  };

  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'vehicles' | 'contracts' | 'invoices' | 'interventions' | 'communications'>('overview');
  const [newNote, setNewNote] = useState('');

  const handleAddCommunication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const newCom = {
      id: `com-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'appel' as const,
      summary: newNote,
      author: 'Conseiller AutoHub'
    };

    const updatedCusts = customers.map(c => {
      if (c.id === customer.id) {
        return { ...c, communications: [newCom, ...c.communications] };
      }
      return c;
    });

    setCustomers(updatedCusts);
    try {
      localStorage.setItem('autohub_crm_customers', JSON.stringify(updatedCusts));
    } catch {}
    setNewNote('');
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/crm')}
          className="flex items-center gap-2 text-slate-500 hover:text-navy-main font-bold text-xs bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft size={16} /> Retour à l'Annuaire CRM
        </button>
        <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-black uppercase tracking-wider">
          Fiche Consolidée 360°
        </span>
      </div>

      {/* Main Client Header Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-navy-main text-white flex items-center justify-center font-black text-2xl shadow-lg">
            {customer.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-navy-main">{customer.name}</h1>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold uppercase tracking-wider">
                {customer.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mt-2">
              <span className="capitalize font-bold text-slate-700">{customer.type}</span>
              <span>•</span>
              <span className="text-brand-orange font-bold">{customer.segment}</span>
              {customer.siret && <><span>•</span><span>SIRET: {customer.siret}</span></>}
              <span>•</span>
              <span>Créé le {customer.createdAt}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-center px-3">
            <div className="text-xl font-black text-navy-main">{customer.vehiclesCount}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">Véhicules</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center px-3">
            <div className="text-xl font-black text-emerald-600">{customer.totalPurchased.toLocaleString()} €</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">CA Total</div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'overview' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Vue d'Ensemble & Contacts
        </button>
        <button
          onClick={() => setActiveSubTab('vehicles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'vehicles' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Véhicules & Parc ({customer.vehiclesCount})
        </button>
        <button
          onClick={() => setActiveSubTab('contracts')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'contracts' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Contrats Actifs ({customer.activeContractsCount})
        </button>
        <button
          onClick={() => setActiveSubTab('invoices')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'invoices' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Devis & Factures
        </button>
        <button
          onClick={() => setActiveSubTab('interventions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'interventions' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Interventions & SAV ({customer.serviceRequests.length})
        </button>
        <button
          onClick={() => setActiveSubTab('communications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'communications' ? 'bg-navy-main text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Historique Communications ({customer.communications.length})
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3">Coordonnées Officielles</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail size={16} className="text-brand-orange" />
                  <span className="font-medium">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone size={16} className="text-brand-orange" />
                  <span className="font-medium">{customer.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin size={16} className="text-brand-orange mt-0.5" />
                  <span className="font-medium">{customer.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Limite de Crédit :</span>
                  <span className="font-bold text-navy-main">{customer.creditLimit.toLocaleString()} €</span>
                </div>
                {customer.vatNumber && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">N° TVA :</span>
                    <span className="font-bold text-navy-main">{customer.vatNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contacts & Interlocuteurs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-sm font-black text-navy-main uppercase tracking-wider">Interlocuteurs & Contacts</h3>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">{customer.contacts.length}</span>
              </div>
              <div className="space-y-3">
                {customer.contacts.map(cnt => (
                  <div key={cnt.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy-main text-xs">{cnt.name}</span>
                      {cnt.isPrimary && <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange rounded text-[10px] font-bold">Principal</span>}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{cnt.role}</div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-2 pt-1">
                      <Mail size={12} className="text-slate-400" /> {cnt.email}
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-2">
                      <Phone size={12} className="text-slate-400" /> {cnt.phone}
                    </div>
                  </div>
                ))}
                {customer.contacts.length === 0 && (
                  <div className="text-xs text-slate-400 text-center py-4">Aucun contact supplémentaire enregistré.</div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Consolidated Activity & Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3">Opportunités Commerciales en Cours</h3>
              <div className="space-y-3">
                {customer.opportunities.map(opp => (
                  <div key={opp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-navy-main text-sm">{opp.title}</div>
                      <div className="text-xs text-slate-500 mt-1">Clôture prévue : {opp.expectedCloseDate} • Probabilité : {opp.probability}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-black text-navy-main">{opp.estimatedValue.toLocaleString()} €</div>
                      <span className="px-2 py-0.5 bg-brand-orange text-white rounded-md text-[10px] font-bold uppercase">{opp.stage}</span>
                    </div>
                  </div>
                ))}
                {customer.opportunities.length === 0 && (
                  <div className="text-xs text-slate-400 text-center py-6">Aucune opportunité commerciale active.</div>
                )}
              </div>
            </div>

            {/* Quick Note / Interaction Addition */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-navy-main uppercase tracking-wider border-b pb-3">Ajouter une note ou un compte-rendu d'appel</h3>
              <form onSubmit={handleAddCommunication} className="space-y-3">
                <textarea
                  rows={3}
                  required
                  placeholder="Résumé de l'échange téléphonique, réunion ou action menée..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-brand-orange"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-navy-main text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md"
                  >
                    Enregistrer l'Interaction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* OTHER SUB-TABS PLACEHOLDERS / TABLES */}
      {activeSubTab === 'vehicles' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Flotte de Véhicules Attribués</h3>
            <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-bold">{customer.vehiclesCount} Véhicules</span>
          </div>
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
            Liste complète des véhicules immatriculés rattachés à ce client (Renault Master, Peugeot Expert, etc.) avec kilométrage et état de service.
          </div>
        </div>
      )}

      {activeSubTab === 'contracts' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Contrats Actifs & LDD/LCD</h3>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold">{customer.activeContractsCount} Contrats Actifs</span>
          </div>
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
            Détails des contrats de location longue durée, conditions tarifaires et échéances de renouvellement.
          </div>
        </div>
      )}

      {activeSubTab === 'invoices' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Historique des Devis & Factures</h3>
            <span className="px-3 py-1 bg-navy-main text-white rounded-xl text-xs font-bold">Total CA : {customer.totalPurchased.toLocaleString()} €</span>
          </div>
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 text-sm">
            Historique complet des factures émises, règlements perçus et devis en attente de validation.
          </div>
        </div>
      )}

      {activeSubTab === 'interventions' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Interventions Atelier & Demandes de Service</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold">{customer.serviceRequests.length} Demandes</span>
          </div>
          <div className="space-y-3">
            {customer.serviceRequests.map(sr => (
              <div key={sr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-navy-main text-sm">{sr.subject}</div>
                  <div className="text-xs text-slate-500 mt-1">Date : {sr.date} • Priorité : <span className="font-bold text-brand-orange">{sr.priority}</span></div>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold uppercase">{sr.status}</span>
              </div>
            ))}
            {customer.serviceRequests.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">Aucune intervention ou SAV en cours.</div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'communications' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-navy-main">Journal Complet des Communications</h3>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">{customer.communications.length} Interactions</span>
          </div>
          <div className="space-y-3">
            {customer.communications.map(com => (
              <div key={com.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-navy-main uppercase">{com.type} • {com.author}</span>
                  <span className="font-mono text-slate-400">{com.date}</span>
                </div>
                <p className="text-sm text-slate-700">{com.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
