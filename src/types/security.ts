export type UserRole = 
  | 'SUPER_ADMIN'
  | 'GENERAL_DIRECTION'
  | 'AGENCY_MANAGER'
  | 'FLEET_MANAGER'
  | 'WORKSHOP_MANAGER'
  | 'TECHNICIAN'
  | 'PARTS_MANAGER'
  | 'SALES'
  | 'ACCOUNTANT'
  | 'RENTAL_MANAGER'
  | 'DRIVER'
  | 'PROFESSIONAL_CLIENT';

export interface RoleConfig {
  id: UserRole;
  label: string;
  level: number;
  description: string;
  badgeColor: string;
  allowedModules: string[];
  canManageUsers: boolean;
  canExportData: boolean;
  canViewFinancials: boolean;
  canApproveOrders: boolean;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency: string;
  status: 'Actif' | 'Inactif' | 'Suspendu';
  twoFactorEnabled: boolean;
  lastLogin: string;
  avatar: string;
  phone: string;
  sessionsCount: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  ipAddress: string;
  status: 'Succès' | 'Alerte' | 'Échec';
  details: string;
}

export interface ChangeHistoryItem {
  id: string;
  timestamp: string;
  recordType: string;
  recordId: string;
  author: string;
  changes: { field: string; oldVal: string; newVal: string }[];
}

export interface UserSession {
  id: string;
  userId: string;
  userName: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  loginTime: string;
  isCurrent: boolean;
}

export interface BackupItem {
  id: string;
  name: string;
  createdAt: string;
  size: string;
  type: 'Automatique (Quotidien)' | 'Manuel' | 'Avant Migration';
  status: 'Intègre' | 'Vérifié' | 'En cours';
  checksum: string;
}

export interface RetentionRule {
  id: string;
  category: string;
  retentionPeriod: string;
  legalBasis: string;
  autoAction: 'Archivage Anonymisé' | 'Suppression Définitive' | 'Conservation Illimitée';
  status: 'Actif' | 'En révision';
}
