import React, { useState } from 'react';
import { Collaborator, EmployeeSkill, EmployeeCertification, EmployeeHabilitation, EmployeeTraining, OperationalEvaluation } from '../../types';
import { 
  X, User, Award, ShieldCheck, Calendar, Clock, BarChart2, BookOpen, 
  FileText, CheckCircle2, AlertTriangle, Plus, Briefcase, Phone, Mail, MapPin 
} from 'lucide-react';

interface CollaboratorDetailModalProps {
  collaborator: Collaborator;
  isOpen: boolean;
  onClose: () => void;
  onUpdateCollaborator: (updated: Collaborator) => void;
}

export function CollaboratorDetailModal({ collaborator, isOpen, onClose, onUpdateCollaborator }: CollaboratorDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'fiche' | 'competences' | 'certifs' | 'planning' | 'interventions' | 'formations' | 'evaluations'>('fiche');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddCert, setShowAddCert] = useState(false);
  const [showAddHab, setShowAddHab] = useState(false);
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [showAddEval, setShowAddEval] = useState(false);

  // Form states for modal additions
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Débutant' | 'Intermédiaire' | 'Expert'>('Intermédiaire');

  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');

  const [newHabName, setNewHabName] = useState('');
  const [newHabLevel, setNewHabLevel] = useState('');

  const [newTrainTitle, setNewTrainTitle] = useState('');
  const [newTrainCategory, setNewTrainCategory] = useState<'Sécurité' | 'Technique' | 'Management' | 'Conduite' | 'Diagnostic'>('Technique');
  const [newTrainHours, setNewTrainHours] = useState(14);
  const [newTrainProvider, setNewTrainProvider] = useState('');

  const [newEvalType, setNewEvalType] = useState<'Bilan Annuel' | 'Point trimestriel' | 'Évaluation Compétence Atelier'>('Point trimestriel');
  const [newEvalComments, setNewEvalComments] = useState('');
  const [newEvalObjectives, setNewEvalObjectives] = useState('');
  const [newEvalSupport, setNewEvalSupport] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;
    const skill: EmployeeSkill = {
      id: `sk-${Date.now()}`,
      name: newSkillName,
      level: newSkillLevel,
      validatedDate: Date.now()
    };
    const updated = {
      ...collaborator,
      skills: [...collaborator.skills, skill]
    };
    onUpdateCollaborator(updated);
    setNewSkillName('');
    setShowAddSkill(false);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName) return;
    const cert: EmployeeCertification = {
      id: `cert-${Date.now()}`,
      name: newCertName,
      issuer: newCertIssuer || 'Organisme agréé',
      issueDate: Date.now(),
      expiryDate: Date.now() + 86400000 * 365
    };
    const updated = {
      ...collaborator,
      certifications: [...collaborator.certifications, cert]
    };
    onUpdateCollaborator(updated);
    setNewCertName('');
    setNewCertIssuer('');
    setShowAddCert(false);
  };

  const handleAddHab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabName) return;
    const hab: EmployeeHabilitation = {
      id: `hab-${Date.now()}`,
      name: newHabName,
      level: newHabLevel,
      issueDate: Date.now(),
      expiryDate: Date.now() + 86400000 * 365,
      status: 'valid'
    };
    const updated = {
      ...collaborator,
      habilitations: [...collaborator.habilitations, hab]
    };
    onUpdateCollaborator(updated);
    setNewHabName('');
    setNewHabLevel('');
    setShowAddHab(false);
  };

  const handleAddTraining = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainTitle) return;
    const tr: EmployeeTraining = {
      id: `tr-${Date.now()}`,
      title: newTrainTitle,
      category: newTrainCategory,
      date: Date.now(),
      durationHours: Number(newTrainHours) || 10,
      status: 'completed',
      provider: newTrainProvider || 'Interne'
    };
    const updated = {
      ...collaborator,
      trainings: [...collaborator.trainings, tr]
    };
    onUpdateCollaborator(updated);
    setNewTrainTitle('');
    setNewTrainProvider('');
    setShowAddTraining(false);
  };

  const handleAddEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvalComments) return;
    const ev: OperationalEvaluation = {
      id: `ev-${Date.now()}`,
      date: Date.now(),
      evaluator: 'Responsable Opérationnel',
      type: newEvalType,
      comments: newEvalComments,
      objectivesNextPeriod: newEvalObjectives,
      supportNeeded: newEvalSupport
    };
    const updated = {
      ...collaborator,
      evaluations: [ev, ...collaborator.evaluations]
    };
    onUpdateCollaborator(updated);
    setNewEvalComments('');
    setNewEvalObjectives('');
    setNewEvalSupport('');
    setShowAddEval(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-navy-main text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange font-bold text-xl">
              {collaborator.firstName[0]}{collaborator.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{collaborator.firstName} {collaborator.lastName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-orange text-navy-main">
                  {collaborator.profile}
                </span>
                <span className="text-xs text-slate-300 font-mono">({collaborator.employeeNumber})</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-300 mt-1">
                <span className="flex items-center gap-1"><MapPin size={13} /> {collaborator.agency}</span>
                <span className="flex items-center gap-1"><Mail size={13} /> {collaborator.email}</span>
                <span className="flex items-center gap-1"><Phone size={13} /> {collaborator.phone}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* Ethical Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center gap-3 text-xs text-amber-900">
          <AlertTriangle size={16} className="text-amber-600 shrink-0" />
          <span>
            <strong>Principe éthique :</strong> Ne pas transformer les indicateurs en jugement automatique sur la valeur d'une personne. Les données servent à organiser le travail et à améliorer les processus.
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto">
          {[
            { id: 'fiche', label: 'Fiche & Statut', icon: User },
            { id: 'competences', label: `Compétences (${collaborator.skills.length})`, icon: Award },
            { id: 'certifs', label: `Certifications & Habilitations (${collaborator.certifications.length + collaborator.habilitations.length})`, icon: ShieldCheck },
            { id: 'planning', label: 'Planning & Charge', icon: Calendar },
            { id: 'interventions', label: `Interventions (${collaborator.interventions.length})`, icon: Briefcase },
            { id: 'formations', label: `Formations (${collaborator.trainings.length})`, icon: BookOpen },
            { id: 'evaluations', label: `Évaluations (${collaborator.evaluations.length})`, icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  active 
                    ? 'border-brand-orange text-navy-main bg-white' 
                    : 'border-transparent text-slate-600 hover:text-navy-main hover:bg-slate-100/60'
                }`}
              >
                <Icon size={16} className={active ? 'text-brand-orange' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          
          {/* Fiche & Statut */}
          {activeTab === 'fiche' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Statut Opérationnel</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${
                      collaborator.status === 'active' ? 'bg-emerald-500' :
                      collaborator.status === 'mission' ? 'bg-blue-500' :
                      collaborator.status === 'training' ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <span className="text-sm font-bold text-slate-800 uppercase">{collaborator.status}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Disponibilité Temps Réel</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      collaborator.availability === 'disponible' ? 'bg-emerald-100 text-emerald-800' :
                      collaborator.availability === 'en_intervention' ? 'bg-blue-100 text-blue-800' :
                      collaborator.availability === 'en_mission' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {collaborator.availability.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase">Charge & Indicateur Process</span>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500">Charge : <strong>{collaborator.workloadPercent}%</strong></span>
                      <div className="w-28 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-brand-orange rounded-full" style={{ width: `${collaborator.workloadPercent}%` }} />
                      </div>
                    </div>
                    {collaborator.productivityScore && (
                      <div className="text-right">
                        <span className="text-xs text-slate-500">Efficacité Process</span>
                        <p className="text-lg font-bold text-navy-main">{collaborator.productivityScore}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Informations Administratives & Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                  <div><strong>Matricule :</strong> {collaborator.employeeNumber}</div>
                  <div><strong>Agence de rattachement :</strong> {collaborator.agency}</div>
                  <div><strong>Téléphone :</strong> {collaborator.phone}</div>
                  <div><strong>Email :</strong> {collaborator.email}</div>
                </div>
                {collaborator.notes && (
                  <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                    <strong>Remarques :</strong> {collaborator.notes}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Compétences */}
          {activeTab === 'competences' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Compétences & Maîtrise Métier</h3>
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-main text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus size={14} /> Ajouter une compétence
                </button>
              </div>

              {showAddSkill && (
                <form onSubmit={handleAddSkill} className="bg-white p-4 rounded-xl border border-brand-orange/40 shadow-md space-y-3">
                  <h4 className="text-xs font-bold uppercase text-navy-main">Nouvelle Compétence</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Intitulé de la compétence"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value as any)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddSkill(false)} className="px-3 py-1 text-xs text-slate-600 border border-slate-300 rounded-lg">Annuler</button>
                    <button type="submit" className="px-3 py-1 text-xs bg-brand-orange text-navy-main font-semibold rounded-lg">Ajouter</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collaborator.skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{skill.name}</h4>
                      <span className="text-xs text-slate-400">Validée le {new Date(skill.validatedDate).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      skill.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                      skill.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
                {collaborator.skills.length === 0 && (
                  <p className="text-sm text-slate-500 italic col-span-2">Aucune compétence enregistrée.</p>
                )}
              </div>
            </div>
          )}

          {/* Certifications & Habilitations */}
          {activeTab === 'certifs' && (
            <div className="space-y-6">
              
              {/* Certifications */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Certifications Professionnelles</h3>
                  <button
                    onClick={() => setShowAddCert(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-main text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus size={14} /> Ajouter certification
                  </button>
                </div>

                {showAddCert && (
                  <form onSubmit={handleAddCert} className="bg-white p-4 rounded-xl border border-brand-orange/40 shadow-md space-y-3">
                    <h4 className="text-xs font-bold uppercase text-navy-main">Nouvelle Certification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Intitulé de la certification"
                        value={newCertName}
                        onChange={(e) => setNewCertName(e.target.value)}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Organisme émetteur"
                        value={newCertIssuer}
                        onChange={(e) => setNewCertIssuer(e.target.value)}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddCert(false)} className="px-3 py-1 text-xs text-slate-600 border border-slate-300 rounded-lg">Annuler</button>
                      <button type="submit" className="px-3 py-1 text-xs bg-brand-orange text-navy-main font-semibold rounded-lg">Ajouter</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collaborator.certifications.map((cert) => (
                    <div key={cert.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-slate-800">{cert.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">Certifié</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Émetteur : {cert.issuer}</p>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                        <span>Émise : {new Date(cert.issueDate).toLocaleDateString()}</span>
                        <span>Expire : {new Date(cert.expiryDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {collaborator.certifications.length === 0 && (
                    <p className="text-sm text-slate-500 italic col-span-2">Aucune certification enregistrée.</p>
                  )}
                </div>
              </div>

              {/* Habilitations */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Habilitations & Autorisations Spéciales (Électrique, CACES, ADR...)</h3>
                  <button
                    onClick={() => setShowAddHab(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-main text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus size={14} /> Ajouter habilitation
                  </button>
                </div>

                {showAddHab && (
                  <form onSubmit={handleAddHab} className="bg-white p-4 rounded-xl border border-brand-orange/40 shadow-md space-y-3">
                    <h4 className="text-xs font-bold uppercase text-navy-main">Nouvelle Habilitation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Intitulé (ex: Habilitation Électrique B2V)"
                        value={newHabName}
                        onChange={(e) => setNewHabName(e.target.value)}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Niveau (ex: B2V / CACES Cat 3)"
                        value={newHabLevel}
                        onChange={(e) => setNewHabLevel(e.target.value)}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddHab(false)} className="px-3 py-1 text-xs text-slate-600 border border-slate-300 rounded-lg">Annuler</button>
                      <button type="submit" className="px-3 py-1 text-xs bg-brand-orange text-navy-main font-semibold rounded-lg">Ajouter</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collaborator.habilitations.map((hab) => (
                    <div key={hab.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-slate-800">{hab.name}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">{hab.level || 'Valide'}</span>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                        <span>Émise : {new Date(hab.issueDate).toLocaleDateString()}</span>
                        <span className="text-emerald-600 font-semibold">Validité OK ({new Date(hab.expiryDate).toLocaleDateString()})</span>
                      </div>
                    </div>
                  ))}
                  {collaborator.habilitations.length === 0 && (
                    <p className="text-sm text-slate-500 italic col-span-2">Aucune habilitation enregistrée.</p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Planning & Charge */}
          {activeTab === 'planning' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Planning Hebdomadaire des Équipes</h3>
                <div className="space-y-2">
                  {collaborator.schedule.map((sch, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                      <span className="font-semibold text-slate-800 w-32">{sch.day}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sch.shift.includes('Journée') ? 'bg-blue-100 text-blue-800' :
                        sch.shift.includes('Matin') ? 'bg-amber-100 text-amber-800' :
                        sch.shift.includes('Astreinte') ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {sch.shift}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Historique des Interventions */}
          {activeTab === 'interventions' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Historique des Interventions & Missions</h3>
              <div className="space-y-3">
                {collaborator.interventions.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-brand-orange bg-navy-main px-2 py-0.5 rounded">{item.reference}</span>
                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Cible / Véhicule : {item.clientOrVehicle} • Durée : {item.durationMinutes} min</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</span>
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {collaborator.interventions.length === 0 && (
                  <p className="text-sm text-slate-500 italic">Aucun historique d'intervention enregistré.</p>
                )}
              </div>
            </div>
          )}

          {/* Formations */}
          {activeTab === 'formations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Formations & Montée en Compétences</h3>
                <button
                  onClick={() => setShowAddTraining(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-main text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus size={14} /> Planifier / Enregistrer formation
                </button>
              </div>

              {showAddTraining && (
                <form onSubmit={handleAddTraining} className="bg-white p-4 rounded-xl border border-brand-orange/40 shadow-md space-y-3">
                  <h4 className="text-xs font-bold uppercase text-navy-main">Enregistrer une Formation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Intitulé de la formation"
                      value={newTrainTitle}
                      onChange={(e) => setNewTrainTitle(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                    <select
                      value={newTrainCategory}
                      onChange={(e) => setNewTrainCategory(e.target.value as any)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="Sécurité">Sécurité</option>
                      <option value="Technique">Technique</option>
                      <option value="Management">Management</option>
                      <option value="Conduite">Conduite</option>
                      <option value="Diagnostic">Diagnostic</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Durée en heures"
                      value={newTrainHours}
                      onChange={(e) => setNewTrainHours(Number(e.target.value))}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Organisme formateur"
                      value={newTrainProvider}
                      onChange={(e) => setNewTrainProvider(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddTraining(false)} className="px-3 py-1 text-xs text-slate-600 border border-slate-300 rounded-lg">Annuler</button>
                    <button type="submit" className="px-3 py-1 text-xs bg-brand-orange text-navy-main font-semibold rounded-lg">Enregistrer</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collaborator.trainings.map((tr) => (
                  <div key={tr.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-bold text-slate-800">{tr.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tr.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tr.status === 'completed' ? 'Validée' : 'Planifiée'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Catégorie : {tr.category} • Organisme : {tr.provider} ({tr.durationHours}h)</p>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-400">
                      Date : {new Date(tr.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {collaborator.trainings.length === 0 && (
                  <p className="text-sm text-slate-500 italic col-span-2">Aucune formation enregistrée.</p>
                )}
              </div>
            </div>
          )}

          {/* Évaluations Opérationnelles */}
          {activeTab === 'evaluations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Évaluations Opérationnelles & Accompagnement</h3>
                <button
                  onClick={() => setShowAddEval(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-navy-main text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Plus size={14} /> Nouvelle évaluation
                </button>
              </div>

              {showAddEval && (
                <form onSubmit={handleAddEval} className="bg-white p-4 rounded-xl border border-brand-orange/40 shadow-md space-y-3">
                  <h4 className="text-xs font-bold uppercase text-navy-main">Ajouter une Évaluation</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <select
                      value={newEvalType}
                      onChange={(e) => setNewEvalType(e.target.value as any)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    >
                      <option value="Point trimestriel">Point trimestriel</option>
                      <option value="Bilan Annuel">Bilan Annuel</option>
                      <option value="Évaluation Compétence Atelier">Évaluation Compétence Atelier</option>
                    </select>
                    <textarea
                      placeholder="Commentaires & observations constructives..."
                      value={newEvalComments}
                      onChange={(e) => setNewEvalComments(e.target.value)}
                      rows={2}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Objectifs pour la période suivante"
                      value={newEvalObjectives}
                      onChange={(e) => setNewEvalObjectives(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Soutien / Moyens demandés (outils, formation...)"
                      value={newEvalSupport}
                      onChange={(e) => setNewEvalSupport(e.target.value)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddEval(false)} className="px-3 py-1 text-xs text-slate-600 border border-slate-300 rounded-lg">Annuler</button>
                    <button type="submit" className="px-3 py-1 text-xs bg-brand-orange text-navy-main font-semibold rounded-lg">Enregistrer</button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {collaborator.evaluations.map((ev) => (
                  <div key={ev.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-navy-main text-white">{ev.type}</span>
                        <span className="text-xs text-slate-500">Par {ev.evaluator}</span>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(ev.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-lg">
                      <strong>Commentaires :</strong> {ev.comments}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                      <div className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                        <strong>🎯 Objectifs :</strong> {ev.objectivesNextPeriod || 'Non spécifié'}
                      </div>
                      <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                        <strong>🛠️ Soutien & Moyens :</strong> {ev.supportNeeded || 'Aucun'}
                      </div>
                    </div>
                  </div>
                ))}
                {collaborator.evaluations.length === 0 && (
                  <p className="text-sm text-slate-500 italic">Aucune évaluation enregistrée.</p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
