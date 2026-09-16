import React, { useState } from 'react';
import { 
  Shield, Lock, KeyRound, UserCheck, History, Database, HardDrive, 
  Eye, EyeOff, CheckCircle2, AlertTriangle, ShieldCheck, Search, 
  Smartphone, Monitor, RefreshCw, Download, Filter, Building2, 
  UserPlus, Trash2, Edit3, LockKeyhole, Terminal, FileText, Globe
} from 'lucide-react';
import { useSecurity, ROLES_CONFIG, MOCK_USERS } from '../../lib/securityContext';
import { UserRole, AuditLogItem, ChangeHistoryItem, UserSession, BackupItem, RetentionRule, SystemUser } from '../../types/security';

export function SecurityHub() {
  const { 
    currentUser, 
    setCurrentRole, 
    isSensitiveDataMasked, 
    setIsSensitiveDataMasked, 
    allUsers, 
    setAllUsers,
    roleConfig 
  } = useSecurity();

  const [activeTab, setActiveTab] = useState<'rbac' | 'users' | 'audit' | 'sessions' | 'backups' | 'rgpd'>('rbac');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Password Reset Modal state
  const [showPasswordResetModal, setShowPasswordResetModal] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [resetSent, setResetSent] = useState<boolean>(false);

  // 2FA Challenge Modal state
  const [show2FAModal, setShow2FAModal] = useState<boolean>(false);
  const [twoFACode, setTwoFACode] = useState<string>('');
  const [targetUserFor2FA, setTargetUserFor2FA] = useState<SystemUser | null>(null);

  // Audit Logs mock data
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    { id: 'log-1', timestamp: '16/09/2026 08:14', user: 'Alexandre Martin', role: 'SUPER_ADMIN', action: 'Modification rôles RBAC', module: 'Sécurité & RBAC', ipAddress: '192.168.1.45', status: 'Succès', details: 'Ajout de permissions sur le module Achats' },
    { id: 'log-2', timestamp: '16/09/2026 07:50', user: 'Claire Fontaine', role: 'ACCOUNTANT', action: 'Validation virement fournisseur', module: 'Finance', ipAddress: '192.168.1.88', status: 'Succès', details: 'Ordre de virement #VF-2026-901 validé (15,200 €)' },
    { id: 'log-3', timestamp: '15/09/2026 18:32', user: 'Thomas Moreau', role: 'TECHNICIAN', action: 'Clôture OR-2026-891', module: 'Atelier', ipAddress: '192.168.2.14', status: 'Succès', details: 'Révision 50k effectuée sur Renault Master' },
    { id: 'log-4', timestamp: '15/09/2026 16:15', user: 'Inconnu', role: 'DRIVER', action: 'Tentative connexion échouée (Mot de passe erroné)', module: 'Authentification', ipAddress: '82.124.55.12', status: 'Échec', details: '3 essais erronés consécutifs - IP temporairement bridée' },
    { id: 'log-5', timestamp: '15/09/2026 14:02', user: 'Sophie Leroy', role: 'FLEET_MANAGER', action: 'Export rapport parc CSV', module: 'Flotte', ipAddress: '192.168.1.102', status: 'Succès', details: 'Exportation de 42 fiches véhicules' },
  ]);

  // Change History mock data
  const [changeHistory, setChangeHistory] = useState<ChangeHistoryItem[]>([
    {
      id: 'ch-1',
      timestamp: '16/09/2026 08:10',
      recordType: 'Fiche Véhicule (Renault Master AB-123-CD)',
      recordId: 'VEH-2026-012',
      author: 'Marc Vanhoutte',
      changes: [
        { field: 'Kilométrage', oldVal: '48,500 km', newVal: '50,120 km' },
        { field: 'Statut affectation', oldVal: 'Disponible', newVal: 'En Mission (Logistique)' }
      ]
    },
    {
      id: 'ch-2',
      timestamp: '15/09/2026 17:25',
      recordType: 'Ordre de Réparation OR-2026-891',
      recordId: 'OR-891',
      author: 'Karim Benali',
      changes: [
        { field: 'Statut OR', oldVal: 'En attente pièces', newVal: 'En cours de réparation' },
        { field: 'Technicien assigné', oldVal: 'Non assigné', newVal: 'Marc D.' }
      ]
    }
  ]);

  // Active Sessions mock data
  const [sessions, setSessions] = useState<UserSession[]>([
    { id: 'sess-1', userId: 'u1', userName: 'Alexandre Martin', device: 'MacBook Pro 16"', browser: 'Chrome 128.0', ipAddress: '192.168.1.45', location: 'Paris, France', loginTime: 'Aujourd’hui à 07:30', isCurrent: true },
    { id: 'sess-2', userId: 'u1', userName: 'Alexandre Martin', device: 'iPad Pro 11"', browser: 'Safari Mobile', ipAddress: '192.168.1.60', location: 'Paris, France', loginTime: 'Hier à 19:15', isCurrent: false },
    { id: 'sess-3', userId: 'u2', userName: 'Éléonore de Saint-Germain', device: 'Dell XPS 13', browser: 'Firefox 125.0', ipAddress: '192.168.1.82', location: 'Paris, France', loginTime: 'Aujourd’hui à 08:05', isCurrent: false },
    { id: 'sess-4', userId: 'u5', userName: 'Karim Benali', device: 'Terminal Atelier Rugged', browser: 'Chrome 126.0', ipAddress: '192.168.2.10', location: 'Atelier Paris Central', loginTime: 'Aujourd’hui à 06:45', isCurrent: false },
  ]);

  // Backups mock data
  const [backups, setBackups] = useState<BackupItem[]>([
    { id: 'bk-1', name: 'autohub_prod_2026-09-16_0400.sql.enc', createdAt: '16/09/2026 04:00', size: '2.4 GB', type: 'Automatique (Quotidien)', status: 'Intègre', checksum: 'sha256:8f9a2b...' },
    { id: 'bk-2', name: 'autohub_prod_2026-09-15_0400.sql.enc', createdAt: '15/09/2026 04:00', size: '2.38 GB', type: 'Automatique (Quotidien)', status: 'Vérifié', checksum: 'sha256:4c1e7d...' },
    { id: 'bk-3', name: 'autohub_pre_migration_v2.sql.enc', createdAt: '14/09/2026 11:20', size: '2.35 GB', type: 'Avant Migration', status: 'Vérifié', checksum: 'sha256:91b2fa...' },
  ]);

  // Data Retention rules mock data
  const [retentionRules] = useState<RetentionRule[]>([
    { id: 'ret-1', category: 'Factures & Pièces Comptables', retentionPeriod: '10 ans (Légal fiscal)', legalBasis: 'Article L123-22 Code de commerce', autoAction: 'Archivage Anonymisé', status: 'Actif' },
    { id: 'ret-2', category: 'Dossiers Véhicules & Carnets d’Entretien', retentionPeriod: 'Durée de vie véhicule + 5 ans', legalBasis: 'Garantie constructeur & Sécurité routière', autoAction: 'Archivage Anonymisé', status: 'Actif' },
    { id: 'ret-3', category: 'Journaux d’Audit & Connexions (Logs)', retentionPeriod: '12 mois glissants', legalBasis: 'Recommandations CNIL / RGPD', autoAction: 'Suppression Définitive', status: 'Actif' },
    { id: 'ret-4', category: 'Données Candidats & RH (Contrats)', retentionPeriod: '5 ans après départ collaborateur', legalBasis: 'Code du travail', autoAction: 'Suppression Définitive', status: 'Actif' },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    showToast("Session distante révoquée avec succès.");
  };

  const handleCreateBackup = () => {
    const newBk: BackupItem = {
      id: 'bk-' + Date.now(),
      name: `autohub_manual_${new Date().toISOString().slice(0, 10)}.sql.enc`,
      createdAt: 'À l’instant',
      size: '2.41 GB',
      type: 'Manuel',
      status: 'Intègre',
      checksum: 'sha256:' + Math.random().toString(36).substring(7)
    };
    setBackups([newBk, ...backups]);
    showToast("Sauvegarde instantanée chiffrée générée avec succès !");
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setShowPasswordResetModal(false);
      setResetSent(false);
      setResetEmail('');
      showToast("E-mail de réinitialisation de mot de passe envoyé avec succès.");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-main text-white px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="text-emerald-400" size={20} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header with Role Switcher Banner */}
      <div className="bg-gradient-to-r from-navy-main to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-2">
            <ShieldCheck size={18} />
            <span>Sécurité & Gouvernance RBAC Enterprise</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Sécurité, Rôles et Droits d'Accès</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Système RBAC à 12 niveaux, journal d'audit infalsifiable, gestion des sessions, chiffrement des données sensibles et conformité RGPD.
          </p>
        </div>

        {/* Current Active Role Switcher Card */}
        <div className="bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-2xl flex flex-col gap-2 min-w-[320px]">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Rôle & Session Actifs :</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold">Sécurisé SSL</span>
          </div>
          <div className="flex items-center gap-3">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover border border-slate-600" />
            <div>
              <div className="text-sm font-bold text-white">{currentUser.name}</div>
              <div className="text-xs text-slate-400">{currentUser.agency}</div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-700 flex items-center justify-between gap-2">
            <select
              value={currentUser.role}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="bg-slate-900 text-xs font-bold text-white border border-slate-600 rounded-xl px-3 py-2 w-full focus:outline-none focus:border-brand-orange cursor-pointer"
            >
              {Object.entries(ROLES_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label} (Niveau {config.level})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'rbac', label: 'Matrice RBAC & Rôles', icon: Shield },
          { id: 'users', label: 'Utilisateurs & Agences', icon: UserCheck },
          { id: 'audit', label: 'Journal d’Audit & Historique', icon: History },
          { id: 'sessions', label: 'Gestion des Sessions', icon: Monitor },
          { id: 'backups', label: 'Sauvegardes & Restauration', icon: Database },
          { id: 'rgpd', label: 'Protection & RGPD', icon: LockKeyhole },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-navy-main text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-brand-orange' : 'text-slate-400'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: RBAC & ROLES */}
      {activeTab === 'rbac' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Hiérarchie et Permissions Granulaires (12 Rôles)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Chaque rôle dispose d'un périmètre d'accès strict défini selon le principe du moindre privilège.
              </p>
            </div>
            <button
              onClick={() => showToast("Mode édition RBAC activé. Modifiez les droits ci-dessous.")}
              className="px-4 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all shadow-sm"
            >
              + Créer un Rôle Personnalisé
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(ROLES_CONFIG).map(([roleKey, role]) => {
              const isCurrentActive = currentUser.role === roleKey;
              return (
                <div 
                  key={roleKey} 
                  className={`bg-white p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isCurrentActive ? 'border-brand-orange ring-2 ring-brand-orange/20 shadow-md' : 'border-slate-200/80 shadow-sm hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black ${role.badgeColor}`}>
                        Niveau {role.level}
                      </span>
                      {isCurrentActive && (
                        <span className="text-xs font-bold text-brand-orange flex items-center gap-1">
                          <CheckCircle2 size={14} /> Actif
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black text-navy-main">{role.label}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{role.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Modules Autorisés :</span>
                      <strong className="text-navy-main">{role.allowedModules.includes('*') ? 'Tous (*)' : `${role.allowedModules.length} modules`}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Export de données :</span>
                      <span className={role.canExportData ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                        {role.canExportData ? 'Autorisé' : 'Restreint'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                      <span>Données Financières :</span>
                      <span className={role.canViewFinancials ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold'}>
                        {role.canViewFinancials ? 'Visible' : 'Masqué'}
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentRole(roleKey as UserRole)}
                      className={`w-full mt-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isCurrentActive 
                          ? 'bg-slate-100 text-slate-700 cursor-default' 
                          : 'bg-navy-main text-white hover:bg-slate-800 shadow-sm'
                      }`}
                    >
                      {isCurrentActive ? 'Rôle Actuel' : 'Tester ce rôle'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: USERS & AGENCIES */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Gestion des Utilisateurs & Droits par Agence</h2>
              <p className="text-xs text-slate-500 mt-1">
                Affectez les collaborateurs aux agences régionales et configurez la double authentification (2FA).
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPasswordResetModal(true)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2"
              >
                <KeyRound size={16} /> Simuler Réinit. Mot de Passe
              </button>
              <button
                onClick={() => showToast("Ouverture du formulaire d'ajout d'utilisateur.")}
                className="px-4 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-sm"
              >
                <UserPlus size={16} /> Nouvel Utilisateur
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Utilisateur</th>
                    <th className="p-4">Rôle Attribué</th>
                    <th className="p-4">Agence de Rattachement</th>
                    <th className="p-4">Double Auth (2FA)</th>
                    <th className="p-4">Dernière Connexion</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {allUsers.map((u) => {
                    const roleCfg = ROLES_CONFIG[u.role];
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-navy-main">{u.name}</div>
                            <div className="text-xs text-slate-400">{u.email}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${roleCfg?.badgeColor || 'bg-slate-600 text-white'}`}>
                            {roleCfg?.label || u.role}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-slate-700 flex items-center gap-1.5 pt-6">
                          <Building2 size={15} className="text-slate-400" />
                          {u.agency}
                        </td>
                        <td className="p-4">
                          {u.twoFactorEnabled ? (
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1 w-fit">
                              <ShieldCheck size={14} /> Activé (TOTP)
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold flex items-center gap-1 w-fit">
                              <AlertTriangle size={14} /> Requis (Désactivé)
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs text-slate-500 font-medium">{u.lastLogin}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setTargetUserFor2FA(u);
                                setShow2FAModal(true);
                              }}
                              className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold" 
                              title="Configurer 2FA"
                            >
                              <Lock size={15} />
                            </button>
                            <button 
                              onClick={() => showToast(`Édition des droits pour ${u.name}`)}
                              className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold" 
                              title="Modifier"
                            >
                              <Edit3 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS & CHANGE HISTORY */}
      {activeTab === 'audit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Journal d'Audit & Historique des Modifications</h2>
              <p className="text-xs text-slate-500 mt-1">
                Traçabilité immuable de toutes les actions sensibles, connexions et modifications de données.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => showToast("Export du journal d'audit au format CSV chiffré.")}
                className="px-4 py-2.5 bg-navy-main text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <Download size={16} /> Exporter les Logs (CSV)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audit Trail */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider flex items-center gap-2">
                <Terminal size={16} className="text-brand-orange" /> Journal d'Audit (Connexions & Actions)
              </h3>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-main">{log.user} ({log.role})</span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${
                        log.status === 'Succès' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{log.action}</div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-200/60">
                      <span>Module : {log.module}</span>
                      <span>IP : {log.ipAddress} • {log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Change History Diff */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider flex items-center gap-2">
                <History size={16} className="text-brand-orange" /> Historique des Modifications (Avant / Après)
              </h3>
              <div className="space-y-3">
                {changeHistory.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-orange">{item.recordType}</span>
                      <span className="text-xs text-slate-400">{item.timestamp}</span>
                    </div>
                    <div className="text-xs text-slate-600">Modifié par : <strong>{item.author}</strong></div>
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      {item.changes.map((c, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-200">
                          <span className="font-semibold text-slate-700">{c.field} :</span>
                          <div className="flex items-center gap-2">
                            <span className="text-rose-600 line-through">{c.oldVal}</span>
                            <span>→</span>
                            <span className="text-emerald-600 font-bold">{c.newVal}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SESSIONS MANAGEMENT */}
      {activeTab === 'sessions' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Gestion des Sessions Actives</h2>
              <p className="text-xs text-slate-500 mt-1">
                Visualisez et révoquez à distance les connexions ouvertes sur les différents appareils et terminaux.
              </p>
            </div>
            <button
              onClick={() => {
                setSessions(sessions.filter(s => s.isCurrent));
                showToast("Toutes les autres sessions distantes ont été terminées.");
              }}
              className="px-4 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-all shadow-sm"
            >
              Déconnecter toutes les autres sessions
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((sess) => (
              <div key={sess.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {sess.device.toLowerCase().includes('mac') || sess.device.toLowerCase().includes('dell') ? (
                        <Monitor className="text-brand-orange" size={24} />
                      ) : (
                        <Smartphone className="text-brand-orange" size={24} />
                      )}
                      <div>
                        <div className="font-bold text-navy-main">{sess.device}</div>
                        <div className="text-xs text-slate-400">{sess.browser}</div>
                      </div>
                    </div>
                    {sess.isCurrent ? (
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">
                        Session Actuelle
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
                        Distante
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
                    <div className="flex justify-between">
                      <span>Utilisateur :</span>
                      <strong className="text-navy-main">{sess.userName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Adresse IP :</span>
                      <span className="font-mono">{sess.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Localisation :</span>
                      <span>{sess.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dernière activité :</span>
                      <span>{sess.loginTime}</span>
                    </div>
                  </div>
                </div>

                {!sess.isCurrent && (
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => handleRevokeSession(sess.id)}
                      className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors"
                    >
                      Révoquer l'accès
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BACKUPS */}
      {activeTab === 'backups' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Sauvegardes et Restauration Sécurisée</h2>
              <p className="text-xs text-slate-500 mt-1">
                Sauvegardes automatisées quotidiennes chiffrées AES-256 avec vérification d’intégrité par checksum.
              </p>
            </div>
            <button
              onClick={handleCreateBackup}
              className="px-4 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <Database size={16} /> Générer une Sauvegarde Instantanée
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="p-4">Nom de la Sauvegarde (Chiffrée)</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Date & Heure</th>
                    <th className="p-4">Taille</th>
                    <th className="p-4">Intégrité</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {backups.map((bk) => (
                    <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono text-xs font-bold text-navy-main flex items-center gap-2">
                        <HardDrive size={16} className="text-brand-orange" />
                        {bk.name}
                      </td>
                      <td className="p-4 text-xs font-semibold text-slate-700">{bk.type}</td>
                      <td className="p-4 text-xs text-slate-500">{bk.createdAt}</td>
                      <td className="p-4 text-xs font-bold text-slate-700">{bk.size}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 size={14} /> {bk.status} ({bk.checksum})
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => showToast(`Téléchargement du fichier chiffré ${bk.name}`)}
                            className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold"
                          >
                            Télécharger
                          </button>
                          <button 
                            onClick={() => showToast(`Restauration test lancée pour ${bk.name}`)}
                            className="px-3 py-1.5 bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Restaurer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: RGPD & SENSITIVE DATA */}
      {activeTab === 'rgpd' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-navy-main">Protection des Données Sensibles & RGPD</h2>
              <p className="text-xs text-slate-500 mt-1">
                Masquage automatique des salaires, IBAN, données personnelles et règles de conservation légales.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSensitiveDataMasked(!isSensitiveDataMasked)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSensitiveDataMasked 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-rose-600 text-white'
                }`}
              >
                {isSensitiveDataMasked ? <EyeOff size={16} /> : <Eye size={16} />}
                {isSensitiveDataMasked ? 'Données Sensibles Masquées' : 'Données Sensibles Démasquées (Mode Audit)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Retention Rules */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider flex items-center gap-2">
                <Database size={16} className="text-brand-orange" /> Règles de Conservation des Données (RGPD)
              </h3>
              <div className="space-y-3">
                {retentionRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-main">{rule.category}</span>
                      <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange rounded-lg text-xs font-bold">
                        {rule.autoAction}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">Durée : {rule.retentionPeriod}</div>
                    <div className="text-xs text-slate-400 italic">Base légale : {rule.legalBasis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Shield Info */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600" /> Conformité & Cryptographie
              </h3>
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-navy-main">Chiffrement au repos (At-Rest)</div>
                  <p>Toutes les bases de données Cloud SQL et Firestore sont chiffrées par défaut via des clés gérées par Google (AES-256).</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-navy-main">Masquage dynamique des salaires & IBAN</div>
                  <p>Le mode masqué est actif par défaut pour les profils non-habilités (ex: `****-****-****-4589`). L'affichage en clair nécessite une authentification 2FA validée.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-navy-main">Droit à l'oubli et Anonymisation</div>
                  <p>L'archivage automatique déclenche un hachage irréversible des données personnelles nominatives après expiration des délais légaux de conservation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal Simulation */}
      {showPasswordResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                <KeyRound size={24} />
              </div>
              <button 
                onClick={() => setShowPasswordResetModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-xl font-black text-navy-main">Réinitialisation de Mot de Passe</h3>
              <p className="text-xs text-slate-500 mt-1">
                Entrez l'adresse e-mail professionnelle du collaborateur pour lui envoyer un lien sécurisé à usage unique.
              </p>
            </div>

            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">E-mail professionnel</label>
                <input 
                  type="email"
                  required
                  placeholder="prenom.nom@autohub.fr"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-orange"
                />
              </div>

              {resetSent && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold text-center">
                  Lien de réinitialisation envoyé avec succès !
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowPasswordResetModal(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={resetSent}
                  className="px-6 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all shadow-sm"
                >
                  Envoyer le lien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2FA Configuration Modal */}
      {show2FAModal && targetUserFor2FA && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <button 
                onClick={() => setShow2FAModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-xl font-black text-navy-main">Double Authentification (2FA)</h3>
              <p className="text-xs text-slate-500 mt-1">
                Configuration pour <strong>{targetUserFor2FA.name}</strong> ({targetUserFor2FA.email})
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-navy-main">État actuel :</div>
                <div>{targetUserFor2FA.twoFactorEnabled ? '✅ 2FA Actif via TOTP (Google Authenticator / Authy)' : '⚠️ 2FA Inactif (Recommandé d’activer)'}</div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button 
                  onClick={() => {
                    const updated = allUsers.map(u => u.id === targetUserFor2FA.id ? { ...u, twoFactorEnabled: !u.twoFactorEnabled } : u);
                    setAllUsers(updated);
                    setShow2FAModal(false);
                    showToast(`2FA ${!targetUserFor2FA.twoFactorEnabled ? 'activé' : 'désactivé'} pour ${targetUserFor2FA.name}`);
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                    targetUserFor2FA.twoFactorEnabled ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  {targetUserFor2FA.twoFactorEnabled ? 'Désactiver la Double Authentification' : 'Activer la Double Authentification (2FA)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
