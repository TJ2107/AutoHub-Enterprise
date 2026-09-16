import React, { useState } from 'react';
import { Collaborator, OperationalProfile } from '../../types';
import { operationalProfilesList } from './hrData';
import { agencyList } from '../finance/financeData';
import { X, UserPlus, Save } from 'lucide-react';

interface CollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collaborator: Collaborator) => void;
  initialData?: Collaborator | null;
}

export function CollaboratorModal({ isOpen, onClose, onSave, initialData }: CollaboratorModalProps) {
  const [formData, setFormData] = useState<Partial<Collaborator>>(() => initialData || {
    employeeNumber: `RH-2026-${Math.floor(100 + Math.random() * 900)}`,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: 'Technicien',
    agency: agencyList[0],
    status: 'active',
    availability: 'disponible',
    workloadPercent: 70,
    productivityScore: 88,
    skills: [],
    certifications: [],
    habilitations: [],
    trainings: [],
    evaluations: [],
    interventions: [],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ],
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.profile) return;

    const newCollaborator: Collaborator = {
      id: initialData ? initialData.id : `collab-${Date.now()}`,
      employeeNumber: formData.employeeNumber || `RH-2026-${Math.floor(100 + Math.random() * 900)}`,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      profile: (formData.profile as OperationalProfile) || 'Technicien',
      agency: formData.agency || agencyList[0],
      status: formData.status || 'active',
      availability: formData.availability || 'disponible',
      workloadPercent: Number(formData.workloadPercent) || 75,
      productivityScore: Number(formData.productivityScore) || 90,
      skills: initialData ? initialData.skills : [],
      certifications: initialData ? initialData.certifications : [],
      habilitations: initialData ? initialData.habilitations : [],
      trainings: initialData ? initialData.trainings : [],
      evaluations: initialData ? initialData.evaluations : [],
      interventions: initialData ? initialData.interventions : [],
      schedule: formData.schedule || [
        { day: 'Lundi', shift: 'Journée (08h-17h)' },
        { day: 'Mardi', shift: 'Journée (08h-17h)' },
        { day: 'Mercredi', shift: 'Journée (08h-17h)' },
        { day: 'Jeudi', shift: 'Journée (08h-17h)' },
        { day: 'Vendredi', shift: 'Journée (08h-17h)' }
      ],
      notes: formData.notes || ''
    };

    onSave(newCollaborator);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-navy-main text-white">
          <div className="flex items-center gap-2">
            <UserPlus size={20} className="text-brand-orange" />
            <h2 className="text-lg font-bold">
              {initialData ? 'Modifier la Fiche Collaborateur' : 'Nouveau Collaborateur Opérationnel'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Matricule</label>
              <input
                type="text"
                value={formData.employeeNumber || ''}
                onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Profil Opérationnel</label>
              <select
                value={formData.profile || 'Technicien'}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value as OperationalProfile })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-orange"
              >
                {operationalProfilesList.map((prof) => (
                  <option key={prof} value={prof}>{prof}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Prénom</label>
              <input
                type="text"
                value={formData.firstName || ''}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nom</label>
              <input
                type="text"
                value={formData.lastName || ''}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Professionnel</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Téléphone</label>
              <input
                type="text"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Agence / Site</label>
              <select
                value={formData.agency || agencyList[0]}
                onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                {agencyList.map((ag) => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Statut Administratif</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="active">Actif</option>
                <option value="on_leave">En congé</option>
                <option value="mission">En mission</option>
                <option value="training">En formation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Disponibilité</label>
              <select
                value={formData.availability || 'disponible'}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="disponible">Disponible</option>
                <option value="en_intervention">En intervention</option>
                <option value="en_mission">En mission</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Charge de travail estimée (%)</label>
              <input
                type="number"
                min="0"
                max="120"
                value={formData.workloadPercent ?? 75}
                onChange={(e) => setFormData({ ...formData, workloadPercent: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Indicateur de productivité / processus (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.productivityScore ?? 90}
                onChange={(e) => setFormData({ ...formData, productivityScore: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Notes / Remarques opérationnelles</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="Informations complémentaires, habilitations spécifiques..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-brand-orange text-navy-main font-semibold rounded-lg hover:bg-amber-500 transition-colors text-sm shadow-sm"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
