import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, RoleConfig, SystemUser } from '../types/security';

export const ROLES_CONFIG: Record<UserRole, RoleConfig> = {
  SUPER_ADMIN: {
    id: 'SUPER_ADMIN',
    label: 'Super Administrateur',
    level: 100,
    description: 'Accès intégral à l’ensemble des modules, configuration technique, gestion des rôles et des clés API.',
    badgeColor: 'bg-rose-500 text-white',
    allowedModules: ['*'],
    canManageUsers: true,
    canExportData: true,
    canViewFinancials: true,
    canApproveOrders: true,
  },
  GENERAL_DIRECTION: {
    id: 'GENERAL_DIRECTION',
    label: 'Direction Générale',
    level: 90,
    description: 'Vue stratégique consolidée, indicateurs financiers, rapports exécutifs et arbitrage budgétaire.',
    badgeColor: 'bg-indigo-600 text-white',
    allowedModules: ['/', '/crm', '/vehicules', '/concession', '/workshop', '/maintenance', '/rental', '/industriels', '/stocks', '/carburant', '/achats', '/finance', '/rh', '/rapports', '/securite'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: true,
    canApproveOrders: true,
  },
  AGENCY_MANAGER: {
    id: 'AGENCY_MANAGER',
    label: "Responsable d'agence",
    level: 70,
    description: "Pilotage opérationnel de l'agence assignée, supervision atelier, stocks, ventes et planning.",
    badgeColor: 'bg-blue-600 text-white',
    allowedModules: ['/', '/crm', '/vehicules', '/concession', '/workshop', '/maintenance', '/rental', '/stocks', '/carburant', '/rapports'],
    canManageUsers: true,
    canExportData: true,
    canViewFinancials: true,
    canApproveOrders: true,
  },
  FLEET_MANAGER: {
    id: 'FLEET_MANAGER',
    label: 'Responsable de parc',
    level: 60,
    description: 'Gestion du parc automobile, suivi TCO, carburant, kilométrage et affectations véhicules.',
    badgeColor: 'bg-teal-600 text-white',
    allowedModules: ['/', '/vehicules', '/maintenance', '/carburant', '/industriels', '/rapports'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: false,
    canApproveOrders: true,
  },
  WORKSHOP_MANAGER: {
    id: 'WORKSHOP_MANAGER',
    label: "Chef d'atelier",
    level: 60,
    description: "Supervision des ordres de réparation (OR), affectation des techniciens et suivi des pannes.",
    badgeColor: 'bg-amber-600 text-white',
    allowedModules: ['/', '/workshop', '/maintenance', '/stocks', '/vehicules'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: false,
    canApproveOrders: true,
  },
  TECHNICIAN: {
    id: 'TECHNICIAN',
    label: 'Technicien',
    level: 30,
    description: 'Saisie des interventions, diagnostic, temps de main-d’œuvre et demandes de pièces.',
    badgeColor: 'bg-orange-500 text-white',
    allowedModules: ['/', '/workshop', '/maintenance', '/stocks'],
    canManageUsers: false,
    canExportData: false,
    canViewFinancials: false,
    canApproveOrders: false,
  },
  PARTS_MANAGER: {
    id: 'PARTS_MANAGER',
    label: 'Magasinier',
    level: 40,
    description: 'Gestion du stock de pièces détachées, entrées/sorties magasin, inventaire et commandes fournisseurs.',
    badgeColor: 'bg-purple-600 text-white',
    allowedModules: ['/', '/stocks', '/achats', '/workshop'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: false,
    canApproveOrders: false,
  },
  SALES: {
    id: 'SALES',
    label: 'Commercial',
    level: 40,
    description: 'Gestion de la relation client CRM, catalogue véhicules neufs/occasion, devis et ventes.',
    badgeColor: 'bg-pink-600 text-white',
    allowedModules: ['/', '/crm', '/concession', '/rental'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: false,
    canApproveOrders: false,
  },
  ACCOUNTANT: {
    id: 'ACCOUNTANT',
    label: 'Comptable',
    level: 60,
    description: 'Gestion financière, facturation, suivi des règlements, rapprochements et notes de frais.',
    badgeColor: 'bg-emerald-600 text-white',
    allowedModules: ['/', '/finance', '/achats', '/rental', '/concession', '/rapports'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: true,
    canApproveOrders: true,
  },
  RENTAL_MANAGER: {
    id: 'RENTAL_MANAGER',
    label: 'Gestionnaire de location',
    level: 40,
    description: 'Gestion des contrats de location LCD/LDD, attributions de véhicules et restitutions.',
    badgeColor: 'bg-cyan-600 text-white',
    allowedModules: ['/', '/rental', '/vehicules', '/crm'],
    canManageUsers: false,
    canExportData: true,
    canViewFinancials: false,
    canApproveOrders: false,
  },
  DRIVER: {
    id: 'DRIVER',
    label: 'Conducteur',
    level: 10,
    description: 'Accès porteur aux ordres de mission, déclarations de trajets et signalement d’incidents.',
    badgeColor: 'bg-slate-600 text-white',
    allowedModules: ['/', '/carburant', '/vehicules'],
    canManageUsers: false,
    canExportData: false,
    canViewFinancials: false,
    canApproveOrders: false,
  },
  PROFESSIONAL_CLIENT: {
    id: 'PROFESSIONAL_CLIENT',
    label: 'Client professionnel',
    level: 10,
    description: 'Portail client dédié pour suivi de flotte louée, factures et validation de réparations.',
    badgeColor: 'bg-sky-600 text-white',
    allowedModules: ['/', '/rental', '/concession'],
    canManageUsers: false,
    canExportData: false,
    canViewFinancials: false,
    canApproveOrders: false,
  }
};

export const MOCK_USERS: SystemUser[] = [
  { id: 'u1', name: 'Alexandre Martin', email: 'alexandre.martin@autohub.fr', role: 'SUPER_ADMIN', agency: 'Siège Social - Paris', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 5 min', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', phone: '+33 6 12 34 56 78', sessionsCount: 3 },
  { id: 'u2', name: 'Éléonore de Saint-Germain', email: 'e.saintermain@autohub.fr', role: 'GENERAL_DIRECTION', agency: 'Siège Social - Paris', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 22 min', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', phone: '+33 6 98 76 54 32', sessionsCount: 2 },
  { id: 'u3', name: 'Marc Vanhoutte', email: 'marc.vanhoutte@autohub.fr', role: 'AGENCY_MANAGER', agency: 'Atelier Central - Paris', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 1h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', phone: '+33 6 45 12 78 90', sessionsCount: 1 },
  { id: 'u4', name: 'Sophie Leroy', email: 'sophie.leroy@autohub.fr', role: 'FLEET_MANAGER', agency: 'Agence Lyon - Rhône-Alpes', status: 'Actif', twoFactorEnabled: false, lastLogin: 'Il y a 3h', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', phone: '+33 6 78 45 12 34', sessionsCount: 1 },
  { id: 'u5', name: 'Karim Benali', email: 'karim.benali@autohub.fr', role: 'WORKSHOP_MANAGER', agency: 'Atelier Central - Paris', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 30 min', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', phone: '+33 6 23 56 89 12', sessionsCount: 2 },
  { id: 'u6', name: 'Thomas Moreau', email: 'thomas.moreau@autohub.fr', role: 'TECHNICIAN', agency: 'Atelier Central - Paris', status: 'Actif', twoFactorEnabled: false, lastLogin: 'Hier', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', phone: '+33 6 11 22 33 44', sessionsCount: 1 },
  { id: 'u7', name: 'Nathalie Dupont', email: 'nathalie.dupont@autohub.fr', role: 'PARTS_MANAGER', agency: 'Concession Lille - Nord', status: 'Actif', twoFactorEnabled: false, lastLogin: 'Il y a 2h', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', phone: '+33 6 33 44 55 66', sessionsCount: 1 },
  { id: 'u8', name: 'Lucas Gauthier', email: 'lucas.gauthier@autohub.fr', role: 'SALES', agency: 'Concession Lille - Nord', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 10 min', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', phone: '+33 6 55 66 77 88', sessionsCount: 2 },
  { id: 'u9', name: 'Claire Fontaine', email: 'claire.fontaine@autohub.fr', role: 'ACCOUNTANT', agency: 'Siège Social - Paris', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 4h', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150', phone: '+33 6 77 88 99 00', sessionsCount: 1 },
  { id: 'u10', name: 'Julien Perrot', email: 'julien.perrot@autohub.fr', role: 'RENTAL_MANAGER', agency: 'Agence Abidjan - CI', status: 'Actif', twoFactorEnabled: false, lastLogin: 'Il y a 5h', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', phone: '+225 07 00 11 22', sessionsCount: 1 },
  { id: 'u11', name: 'Abdoulaye Diallo', email: 'abdoulaye.diallo@autohub.fr', role: 'DRIVER', agency: 'Agence Abidjan - CI', status: 'Actif', twoFactorEnabled: false, lastLogin: 'Il y a 1j', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', phone: '+225 05 55 44 33', sessionsCount: 1 },
  { id: 'u12', name: 'BTP Logistics SA (Client)', email: 'contact@btplogistics.com', role: 'PROFESSIONAL_CLIENT', agency: 'Portail Externe', status: 'Actif', twoFactorEnabled: true, lastLogin: 'Il y a 2j', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', phone: '+33 1 40 50 60 70', sessionsCount: 1 },
];

interface SecurityContextType {
  currentUser: SystemUser;
  setCurrentUser: (user: SystemUser) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isSensitiveDataMasked: boolean;
  setIsSensitiveDataMasked: (masked: boolean) => void;
  hasPermission: (modulePath: string) => boolean;
  roleConfig: RoleConfig;
  allUsers: SystemUser[];
  setAllUsers: React.Dispatch<React.SetStateAction<SystemUser[]>>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<SystemUser>(MOCK_USERS[0]);
  const [allUsers, setAllUsers] = useState<SystemUser[]>(MOCK_USERS);
  const [isSensitiveDataMasked, setIsSensitiveDataMasked] = useState<boolean>(true);

  const currentRole = currentUser.role;
  const roleConfig = ROLES_CONFIG[currentRole] || ROLES_CONFIG.SUPER_ADMIN;

  const hasPermission = (modulePath: string): boolean => {
    if (roleConfig.allowedModules.includes('*')) return true;
    return roleConfig.allowedModules.some(mod => {
      if (mod === '/') return modulePath === '/';
      return modulePath.startsWith(mod);
    });
  };

  const handleSetRole = (role: UserRole) => {
    const found = allUsers.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
    } else {
      setCurrentUser({
        id: 'custom-' + role,
        name: `Utilisateur ${ROLES_CONFIG[role].label}`,
        email: `${role.toLowerCase()}@autohub.fr`,
        role,
        agency: 'Siège Social - Paris',
        status: 'Actif',
        twoFactorEnabled: true,
        lastLogin: "À l'instant",
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        phone: '+33 6 00 00 00 00',
        sessionsCount: 1
      });
    }
  };

  return (
    <SecurityContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        currentRole, 
        setCurrentRole: handleSetRole, 
        isSensitiveDataMasked, 
        setIsSensitiveDataMasked, 
        hasPermission, 
        roleConfig,
        allUsers,
        setAllUsers
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
