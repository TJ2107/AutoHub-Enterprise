import React, { useState } from 'react';
import { Collaborator, OperationalProfile } from '../../types';
import { initialCollaborators, operationalProfilesList } from './hrData';
import { agencyList } from '../finance/financeData';
import { CollaboratorModal } from './CollaboratorModal';
import { CollaboratorDetailModal } from './CollaboratorDetailModal';
import { 
  Users, UserPlus, Search, Filter, ShieldCheck, Award, Calendar, 
  BarChart2, AlertTriangle, CheckCircle2, Clock, Wrench, Briefcase 
} from 'lucide-react';

export function HRModule() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<string>('all');
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleSaveCollaborator = (newCollab: Collaborator) => {
    setCollaborators((prev) => {
      const exists = prev.find((c) => c.id === newCollab.id);
      if (exists) {
        return prev.map((c) => c.id === newCollab.id ? newCollab : c);
      }
      return [newCollab, ...prev];
    });
  };

  const handleUpdateCollaborator = (updated: Collaborator) => {
    setCollaborators((prev) => prev.map((c) => c.id === updated.id ? updated : c));
    setSelectedCollaborator(updated);
  };

  const filteredCollaborators = collaborators.filter((c) => {
    const matchesSearch = `${c.firstName} ${c.lastName} ${c.employeeNumber} ${c.profile}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesProfile = selectedProfile === 'all' || c.profile === selectedProfile;
    const matchesAgency = selectedAgency === 'all' || c.agency === selectedAgency;
    return matchesSearch && matchesProfile && matchesAgency;
  });

  const totalCollabs = collaborators.length;
  const activeCollabs = collaborators.filter((c) => c.status === 'active').length;
  const inMissionCollabs = collaborators.filter((c) => c.status === 'mission').length;
  const avgWorkload = Math.round(collaborators.reduce((acc, c) => acc + c.workloadPercent, 0) / (totalCollabs || 1));

  return (
    <div className="space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy-main">Ressources Humaines Opérationnelles</h2>
          <p className="text-sm text-slate-500">Gestion des équipes, compétences, habilitations, plannings et suivi des processus.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-orange text-navy-main font-semibold rounded-xl hover:bg-amber-500 transition-colors shadow-sm text-sm"
        >
          <UserPlus size={18} />
          Nouveau Collaborateur
        </button>
      </div>

      {/* Ethical Advisory Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-sm text-amber-900 shadow-sm">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Charte Éthique & Organisationnelle :</strong> Ne pas transformer les indicateurs en jugement automatique sur la valeur d'une personne. Les données et scores présentés servent exclusivement à organiser le travail, équilibrer la charge opérationnelle et améliorer les processus d'atelier.
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Effectif Total</span>
            <p className="text-2xl font-bold text-navy-main mt-1">{totalCollabs}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">En Activité / Sur Site</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCollabs}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">En Mission / Déplacement</span>
            <p className="text-2xl font-bold text-purple-600 mt-1">{inMissionCollabs}</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Charge Moyenne Flotte</span>
            <p className="text-2xl font-bold text-navy-main mt-1">{avgWorkload}%</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <BarChart2 size={24} />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, matricule ou profil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          >
            <option value="all">Tous les profils</option>
            {operationalProfilesList.map((prof) => (
              <option key={prof} value={prof}>{prof}</option>
            ))}
          </select>

          <select
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
          >
            <option value="all">Toutes les agences</option>
            {agencyList.map((ag) => (
              <option key={ag} value={ag}>{ag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Collaborators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollaborators.map((collab) => (
          <div
            key={collab.id}
            onClick={() => {
              setSelectedCollaborator(collab);
              setIsDetailModalOpen(true);
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-navy-main text-brand-orange font-bold flex items-center justify-center text-lg shadow-inner">
                    {collab.firstName[0]}{collab.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-brand-orange transition-colors">
                      {collab.firstName} {collab.lastName}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">{collab.employeeNumber}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                  {collab.profile}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Agence :</span>
                  <span className="font-medium text-slate-700 truncate max-w-[180px]">{collab.agency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Disponibilité :</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    collab.availability === 'disponible' ? 'bg-emerald-100 text-emerald-800' :
                    collab.availability === 'en_intervention' ? 'bg-blue-100 text-blue-800' :
                    collab.availability === 'en_mission' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {collab.availability.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Compétences / Certifs :</span>
                  <span className="font-semibold text-navy-main">{collab.skills.length} skills • {collab.certifications.length} certs</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Charge de travail ({collab.workloadPercent}%)</span>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-orange rounded-full" style={{ width: `${collab.workloadPercent}%` }} />
                </div>
              </div>
              <span className="text-brand-orange font-semibold group-hover:underline">Consulter la fiche →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredCollaborators.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500">
          <Users size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="font-semibold">Aucun collaborateur trouvé pour ces critères.</p>
        </div>
      )}

      {/* Modals */}
      <CollaboratorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCollaborator}
      />

      {selectedCollaborator && (
        <CollaboratorDetailModal
          collaborator={selectedCollaborator}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedCollaborator(null);
          }}
          onUpdateCollaborator={handleUpdateCollaborator}
        />
      )}

    </div>
  );
}
