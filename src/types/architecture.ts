export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface OrganizationEntity extends BaseEntity {
  name: string;
  siret: string;
  vatNumber: string;
  headquartersAddress: string;
  country: string;
}

export interface AgencyEntity extends BaseEntity {
  organizationId: string;
  name: string;
  code: string;
  city: string;
  managerId: string;
  phone: string;
  email: string;
}

export interface UserEntity extends BaseEntity {
  agencyId: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  twoFactorEnabled: boolean;
}

export interface CustomerEntity extends BaseEntity {
  agencyId: string;
  type: 'B2B' | 'B2C';
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  creditLimit: number;
}

export interface ContactEntity extends BaseEntity {
  customerId: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  isMain: boolean;
}

export interface VehicleEntity extends BaseEntity {
  agencyId: string;
  plateNumber: string;
  brand: string;
  model: string;
  year: number;
  vin: string;
  currentMileage: number;
  status: 'AVAILABLE' | 'RENTED' | 'MAINTENANCE' | 'DECOMMISSIONED';
  fuelType: 'DIESEL' | 'GASOLINE' | 'ELECTRIC' | 'HYBRID';
  purchaseCost: number;
}

export interface EquipmentEntity extends BaseEntity {
  agencyId: string;
  serialNumber: string;
  name: string;
  category: 'LIFT' | 'DIAGNOSTIC' | 'TOOL' | 'GENERATOR';
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'OUT_OF_ORDER';
  nextInspectionDate: string;
}

export interface DriverEntity extends BaseEntity {
  userId: string;
  agencyId: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiryDate: string;
  medicalCheckDate: string;
  status: 'ON_DUTY' | 'OFF_DUTY' | 'ON_MISSION';
}

export interface TechnicianEntity extends BaseEntity {
  userId: string;
  agencyId: string;
  specialty: 'MECHANICS' | 'ELECTRICITY' | 'BODYWORK' | 'GENERAL';
  hourlyRate: number;
  certifications: string[];
  currentWorkloadHours: number;
}

export interface RepairOrderEntity extends BaseEntity {
  agencyId: string;
  vehicleId: string;
  technicianId: string;
  customerComplaint: string;
  diagnosis: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'WAITING_PARTS' | 'COMPLETED' | 'CANCELLED';
  estimatedCost: number;
  actualCost: number;
}

export interface MaintenancePlanEntity extends BaseEntity {
  vehicleId: string;
  planName: string;
  intervalKm: number;
  intervalMonths: number;
  lastDoneMileage: number;
  nextDueMileage: number;
}

export interface InterventionEntity extends BaseEntity {
  repairOrderId: string;
  technicianId: string;
  description: string;
  laborHours: number;
  partsCost: number;
  status: 'PLANNED' | 'DONE';
}

export interface PartEntity extends BaseEntity {
  partNumber: string;
  name: string;
  category: string;
  unitPrice: number;
  stockQuantity: number;
  minThreshold: number;
  locationBin: string;
}

export interface StockMovementEntity extends BaseEntity {
  partId: string;
  agencyId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  referenceDoc: string;
  operatorId: string;
}

export interface SupplierEntity extends BaseEntity {
  name: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  paymentTermDays: number;
}

export interface PurchaseEntity extends BaseEntity {
  supplierId: string;
  agencyId: string;
  orderDate: string;
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'RECEIVED' | 'CANCELLED';
  itemsSummary: string;
}

export interface ContractEntity extends BaseEntity {
  customerId: string;
  agencyId: string;
  contractNumber: string;
  type: 'LCD' | 'LDD' | 'FLEET_MANAGEMENT';
  startDate: string;
  endDate: string;
  monthlyAmount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}

export interface RentalEntity extends BaseEntity {
  contractId: string;
  vehicleId: string;
  driverId?: string;
  departureMileage: number;
  returnMileage?: number;
  startDate: string;
  scheduledEndDate: string;
  actualEndDate?: string;
  status: 'BOOKED' | 'ONGOING' | 'COMPLETED';
}

export interface MissionEntity extends BaseEntity {
  driverId: string;
  vehicleId: string;
  departureAgency: string;
  arrivalDestination: string;
  departureDate: string;
  arrivalDate?: string;
  status: 'PLANNED' | 'IN_TRANSIT' | 'COMPLETED';
  cargoDescription: string;
}

export interface FuelEntity extends BaseEntity {
  vehicleId: string;
  driverId: string;
  agencyId: string;
  liters: number;
  totalPrice: number;
  mileageAtPump: number;
  stationName: string;
  date: string;
}

export interface QuoteEntity extends BaseEntity {
  customerId: string;
  agencyId: string;
  quoteNumber: string;
  issueDate: string;
  validUntil: string;
  totalHt: number;
  taxAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
}

export interface InvoiceEntity extends BaseEntity {
  customerId: string;
  agencyId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  totalTtc: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'OVERDUE';
}

export interface PaymentEntity extends BaseEntity {
  invoiceId: string;
  amount: number;
  paymentMethod: 'BANK_TRANSFER' | 'CREDIT_CARD' | 'CHECK' | 'CASH';
  reference: string;
  paymentDate: string;
}

export interface NotificationEntity extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ALERT' | 'SUCCESS';
  isRead: boolean;
  link?: string;
}

export interface ReportEntity extends BaseEntity {
  agencyId: string;
  title: string;
  category: 'FINANCIAL' | 'FLEET' | 'WORKSHOP' | 'HR' | 'STOCKS';
  format: 'PDF' | 'EXCEL' | 'CSV';
  generatedBy: string;
  downloadUrl: string;
}

export interface ArchitectureAuditEntity extends BaseEntity {
  userId: string;
  action: string;
  entityName: string;
  recordId: string;
  previousState?: string;
  newState?: string;
  ipAddress: string;
}
