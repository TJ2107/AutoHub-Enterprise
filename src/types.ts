export interface FleetVehicle {
  id: string;
  model: string;
  make: string;
  status: 'active' | 'maintenance' | 'retired';
}

export interface Customer {
  id: string;
  name: string;
  type: 'individual' | 'company' | 'partner';
  email: string;
  phone: string;
  address: string;
  createdAt: number;
  // Complex CRM fields
  status: 'prospect' | 'active' | 'inactive';
  contactPerson?: string;
  history: Array<{ date: number; type: 'purchase' | 'service' | 'communication'; description: string }>;
}

export interface Vehicle {
  id: string;
  internalId: string;
  vin: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  category: string;
  fuelType: string;
  mileage: number;
  status: 'available' | 'mission' | 'maintenance' | 'immobilized' | 'sold' | 'rented' | 'retired';
  site: string;
  dateOfFirstRegistration: number;
  owner: string;
  assignedDriver?: string;
  insuranceExpiry: number;
  technicalInspectionExpiry: number;
  value: number;
  history: Array<{ date: number; type: 'maintenance' | 'accident' | 'repair'; description: string; cost: number }>;
  documents: Array<{ name: string; expiryDate: number }>;
}

export interface CatalogVehicle {
  id: string;
  make: string;
  model: string;
  version: string;
  category: string;
  year: number;
  price: number;
  costPrice: number; // For margin tracking
  fuelType: string;
  transmission: 'manual' | 'automatic';
  power: number; // HP
  colors: string[];
  features: string[];
  images: string[];
  type: 'new' | 'used';
  condition?: string; // For used cars
  mileage?: number; // For used cars
  availability: 'in-stock' | 'ordered' | 'sold' | 'reserved';
  stockLocation?: string;
}

export interface SaleOpportunity {
  id: string;
  customerId: string;
  customerName?: string;
  vehicleId: string;
  vehicleName?: string;
  status: 'prospect' | 'quote_sent' | 'reserved' | 'ordered' | 'sold' | 'cancelled';
  date: number;
  totalAmount: number;
  margin?: number;
  notes?: string;
  // Order details
  orderNumber?: string;
  invoiceNumber?: string;
  deliveryStatus?: 'pending' | 'preparing' | 'ready' | 'delivered';
  deliveryDate?: number;
  accessories?: Array<{ name: string; price: number }>;
  // Trade-in (Reprise)
  tradeIn?: {
    make: string;
    model: string;
    year: number;
    valuation: number;
    condition: string;
  };
}

export interface FuelTransaction {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  driverId: string;
  driverName?: string;
  date: number;
  station: string;
  fuelType: 'diesel' | 'gasoline' | 'lpg' | 'electric' | 'adblue';
  liters: number;
  unitPrice: number;
  totalAmount: number;
  mileage: number;
  paymentMode: 'card' | 'cash' | 'voucher';
  voucherNumber?: string;
  receiptUrl?: string;
  isAnomaly?: boolean;
}

export interface Mission {
  id: string;
  missionNumber: string;
  destination: string;
  purpose: string;
  startDate: number;
  endDate: number;
  vehicleId: string;
  vehicleName?: string;
  driverId: string;
  driverName?: string;
  teamMembers?: string[];
  startMileage: number;
  endMileage?: number;
  expenses: Array<{ category: string; amount: number; description: string }>;
  report?: string;
  incidents?: string[];
  status: 'requested' | 'approved' | 'active' | 'completed' | 'cancelled';
  validatedBy?: string;
}

export interface FleetMetrics {
  avgConsumptionPer100km: number;
  costPerKm: number;
  totalFuelCost: number;
  totalMissionsCost: number;
  consumptionByVehicle: Record<string, number>;
}

// Procurement & Suppliers Types
export type AllocationType = 'vehicle' | 'equipment' | 'workshop_order' | 'agency' | 'cost_center';

export interface Supplier {
  id: string;
  code: string;
  name: string;
  category: 'pieces' | 'equipements' | 'sous_traitance' | 'carburant' | 'outillage' | 'pneumatiques';
  isSubcontractor: boolean;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  paymentTerms: string; // e.g. "30 jours fin de mois", "Comptant", "45 jours"
  status: 'active' | 'review' | 'blocked';
  rating: {
    overall: number; // 0 to 5
    quality: number;
    delivery: number;
    pricing: number;
  };
  contractsCount: number;
  totalPurchasesYTD: number;
}

export interface PurchaseItemLine {
  id: string;
  description: string;
  partNumber?: string;
  quantity: number;
  unit: string;
  estimatedUnitPrice: number;
  negotiatedUnitPrice?: number;
  totalAmount: number;
  receivedQuantity?: number;
}

export interface PurchaseRequest {
  id: string;
  prNumber: string;
  title: string;
  requesterName: string;
  department: string;
  requestDate: number;
  requiredDate: number;
  reason: string;
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  allocationType: AllocationType;
  allocationTargetId?: string;
  allocationTargetName: string; // e.g. "Toyota Hilux AB-123-CD" or "Pelle CAT 320" or "Atelier Central"
  items: PurchaseItemLine[];
  estimatedTotal: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'rfq_issued' | 'ordered' | 'rejected';
  approvedBy?: string;
  approvalDate?: number;
  approvalNotes?: string;
}

export interface SupplierQuote {
  id: string;
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  totalAmount: number;
  deliveryDays: number;
  warrantyMonths: number;
  complianceScore: number; // 0-100%
  notes: string;
  isSelected: boolean;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  prId: string;
  prNumber: string;
  title: string;
  issueDate: number;
  closingDate: number;
  items: PurchaseItemLine[];
  quotes: SupplierQuote[];
  status: 'consulting' | 'evaluated' | 'awarded' | 'cancelled';
  selectedSupplierId?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  prNumber?: string;
  rfqNumber?: string;
  supplierId: string;
  supplierName: string;
  supplierCode: string;
  orderDate: number;
  expectedDeliveryDate: number;
  items: PurchaseItemLine[];
  subtotalHT: number;
  vatRate: number; // e.g. 20
  vatAmount: number;
  totalTTC: number;
  paymentTerms: string;
  allocationType: AllocationType;
  allocationTargetName: string;
  status: 'pending_validation' | 'approved' | 'sent_to_supplier' | 'partially_received' | 'received' | 'billed' | 'cancelled';
  validatedBy?: string;
  validationDate?: number;
  deliveryAddress: string;
  notes?: string;
}

export interface GoodsReceiptItem {
  itemId: string;
  description: string;
  partNumber?: string;
  orderedQty: number;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  conformityStatus: 'conform' | 'partial_defect' | 'rejected';
  defectsDescription?: string;
}

export interface GoodsReceipt {
  id: string;
  receiptNumber: string;
  poId: string;
  poNumber: string;
  supplierName: string;
  deliveryNoteNumber: string; // N° BL Fournisseur
  receiptDate: number;
  receiverName: string;
  items: GoodsReceiptItem[];
  conformityOverall: 'compliant' | 'with_reservations' | 'rejected';
  inspectorNotes?: string;
  stockUpdated: boolean;
}

export interface SupplierInvoice {
  id: string;
  invoiceNumber: string;
  poId: string;
  poNumber: string;
  receiptNumber?: string;
  supplierId: string;
  supplierName: string;
  invoiceDate: number;
  dueDate: number;
  amountHT: number;
  vatAmount: number;
  amountTTC: number;
  threeWayMatch: 'matched' | 'discrepancy' | 'pending'; // 3-way match: PO vs Receipt vs Invoice
  matchDiscrepancyReason?: string;
  paymentStatus: 'pending' | 'partially_paid' | 'paid' | 'overdue';
  allocationTargetName: string;
}

export interface SupplierContract {
  id: string;
  contractNumber: string;
  supplierId: string;
  supplierName: string;
  title: string;
  type: 'framework' | 'subcontracting' | 'service_sla' | 'consignment';
  startDate: number;
  endDate: number;
  discountRate: number; // e.g. 15%
  volumeCommitment?: string;
  status: 'active' | 'expiring_soon' | 'terminated';
  slaTerms: string;
}

export interface PriceHistoryRecord {
  id: string;
  partNumber: string;
  description: string;
  supplierName: string;
  poNumber: string;
  date: number;
  unitPrice: number;
  previousPrice: number;
  percentageChange: number;
}

export interface SparePart {
  id: string;
  internalRef: string;
  manufacturerRef: string;
  name: string;
  category: 'engine' | 'braking' | 'suspension' | 'electrical' | 'filtration' | 'industrial' | 'body' | 'fluids';
  compatibility: string[]; // List of vehicle models/types
  provider: string;
  location: string; // Shelf/Aisle
  minStock: number;
  maxStock: number;
  currentStock: number;
  reservedStock: number;
  purchasePrice: number;
  salePrice: number;
  lotNumber?: string;
  unit: 'unit' | 'liter' | 'set' | 'kg';
}

export interface StockMovement {
  id: string;
  partId: string;
  partName: string;
  type: 'in' | 'out' | 'transfer' | 'return';
  quantity: number;
  date: number;
  user: string;
  referenceId?: string; // Order ID or Transfer ID
  notes?: string;
  fromLocation?: string;
  toLocation?: string;
}

export interface PartRequest {
  id: string;
  orderId: string;
  technicianId: string;
  technicianName: string;
  partId: string;
  partName: string;
  quantity: number;
  status: 'requested' | 'reserved' | 'issued' | 'cancelled' | 'returned';
  requestDate: number;
  validationDate?: number;
}

export interface IndustrialEquipment {
  id: string;
  inventoryNumber: string;
  name: string;
  brand: string;
  model: string;
  serialNumber: string;
  type: 'truck' | 'bus' | 'construction' | 'generator' | 'forklift' | 'other';
  location: string;
  owner: string;
  operatingHours: number;
  capacity?: string;
  status: 'operational' | 'maintenance' | 'immobilized' | 'retired';
  acquisitionDate: number;
  warrantyExpiration: number;
  lastServiceHours: number;
  nextServiceHours: number;
  specificSpecs?: Record<string, string>;
}

export interface RentalContract {
  id: string;
  contractNumber: string;
  vehicleId: string;
  vehicleName?: string;
  customerId: string;
  customerName?: string;
  driverId?: string;
  driverName?: string;
  startDate: number;
  endDate: number;
  actualEndDate?: number;
  type: 'short' | 'medium' | 'long';
  status: 'draft' | 'reserved' | 'active' | 'completed' | 'cancelled' | 'overdue';
  pricing: {
    baseRate: number;
    rateUnit: 'day' | 'month' | 'custom';
    deposit: number;
    includedKm: number;
    excessKmRate: number;
  };
  checkIn?: {
    mileage: number;
    fuelLevel: number;
    photos: string[];
    notes: string;
    date: number;
  };
  checkOut?: {
    mileage: number;
    fuelLevel: number;
    photos: string[];
    notes: string;
    date: number;
    damages?: string[];
  };
  billing: {
    totalAmount: number;
    paidAmount: number;
    status: 'pending' | 'partially_paid' | 'paid';
  };
  extensions: Array<{ newEndDate: number; reason: string; date: number }>;
}

export interface MaintenancePlan {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  taskType: 'oil_change' | 'filter' | 'brakes' | 'tires' | 'battery' | 'suspension' | 'ac' | 'belts' | 'general_service';
  intervalKm?: number;
  intervalDays?: number;
  intervalHours?: number;
  lastPerformedDate: number;
  lastPerformedKm: number;
  lastPerformedHours?: number;
  nextDueDate: number;
  nextDueKm: number;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'overdue' | 'scheduled';
}

export interface CorrectiveAction {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  reportedDate: number;
  symptoms: string;
  diagnosis?: string;
  confirmedCause?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'diagnosing' | 'repairing' | 'testing' | 'completed';
  technicianId?: string;
  technicianName?: string;
  downtimeHours: number;
  partsUsed: Array<{ name: string; cost: number }>;
  laborCost: number;
  totalCost: number;
  validationDate?: number;
  validatedBy?: string;
}

export interface MaintenanceMetrics {
  topFailingVehicles: Array<{ id: string; name: string; count: number }>;
  topFailingComponents: Array<{ component: string; count: number }>;
  totalDowntimeHours: number;
  maintenanceCostByBrand: Record<string, number>;
}

export interface Technician {
  id: string;
  name: string;
  specialty: string;
  status: 'available' | 'busy' | 'off';
}

export interface WorkshopOrder {
  id: string;
  orderNumber: string;
  vehicleId: string;
  vehicleName?: string;
  customerId: string;
  customerName?: string;
  technicianId?: string;
  technicianName?: string;
  entryDate: number;
  expectedReturnDate: number;
  symptoms: string;
  diagnosis?: string;
  tasks: Array<{ description: string; status: 'pending' | 'completed'; estimatedHours: number }>;
  parts: Array<{ reference: string; name: string; quantity: number; price: number }>;
  laborCost: number;
  partsCost: number;
  totalCost: number;
  status: 
    | 'request_received' 
    | 'received' 
    | 'diagnosing' 
    | 'quote_pending' 
    | 'quote_approved' 
    | 'repairing' 
    | 'waiting_parts' 
    | 'quality_control' 
    | 'ready_to_return' 
    | 'returned' 
    | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  workZone?: string;
  mileageAtEntry: number;
  visualInspectionNotes?: string;
}

// ==========================================
// FINANCE, DEVIS & FACTURATION MODULE TYPES
// ==========================================

export type FinanceServiceType = 
  | 'workshop_repair' 
  | 'vehicle_sale' 
  | 'fleet_rental' 
  | 'preventive_maintenance' 
  | 'spare_parts_sale' 
  | 'bodywork_painting' 
  | 'industrial_service' 
  | 'towing_mission';

export type PaymentMethodType = 
  | 'cash' 
  | 'bank_transfer' 
  | 'credit_card' 
  | 'mobile_money_orange' 
  | 'mobile_money_mtn' 
  | 'mobile_money_wave' 
  | 'mobile_money_moov' 
  | 'mobile_money_airtel' 
  | 'check';

export interface FinanceLineItem {
  id: string;
  type: 'part' | 'labor' | 'service' | 'rental_day' | 'vehicle' | 'fee' | 'discount';
  description: string;
  reference?: string;
  quantity: number;
  unit: string;
  unitPriceHT: number;
  unitCostHT: number; // For margin calculation
  vatRate: number; // e.g. 20%
  discountPercent?: number;
  totalHT: number;
  totalCostHT: number;
  marginHT: number;
  marginRatePercent: number;
}

export interface Quote {
  id: string;
  quoteNumber: string; // e.g. DEV-2026-0042
  title: string;
  customerId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceType: FinanceServiceType;
  creationDate: number;
  validUntilDate: number;
  items: FinanceLineItem[];
  subtotalHT: number;
  totalCostHT: number;
  totalMarginHT: number;
  overallMarginPercent: number;
  vatRate: number;
  vatAmount: number;
  totalTTC: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'invoiced' | 'expired';
  paymentTerms: string;
  notes?: string;
  agency: string;
  costCenter: string;
  vehicleId?: string;
  vehiclePlate?: string;
  equipmentId?: string;
  equipmentName?: string;
  convertedInvoiceId?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. FAC-2026-0158
  quoteId?: string;
  quoteNumber?: string;
  title: string;
  customerId: string;
  customerName: string;
  customerAddress?: string;
  customerTaxId?: string;
  serviceType: FinanceServiceType;
  issueDate: number;
  dueDate: number;
  items: FinanceLineItem[];
  subtotalHT: number;
  totalCostHT: number;
  totalMarginHT: number;
  overallMarginPercent: number;
  vatRate: number;
  vatAmount: number;
  totalTTC: number;
  paidAmount: number;
  balanceDue: number;
  status: 'draft' | 'issued' | 'partially_paid' | 'paid' | 'overdue' | 'credited' | 'cancelled';
  paymentTerms: string;
  notes?: string;
  agency: string;
  costCenter: string;
  vehicleId?: string;
  vehiclePlate?: string;
  equipmentId?: string;
  equipmentName?: string;
  relatedCreditNoteIds?: string[];
  payments: PaymentRecord[];
}

export interface CreditNote {
  id: string;
  creditNoteNumber: string; // e.g. AV-2026-0012
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  issueDate: number;
  reason: 'commercial_discount' | 'part_return' | 'service_cancellation' | 'billing_error' | 'goodwill_gesture';
  description: string;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPriceHT: number;
    totalHT: number;
  }>;
  subtotalHT: number;
  vatAmount: number;
  totalTTC: number;
  status: 'applied_to_invoice' | 'refunded' | 'pending';
  agency: string;
  costCenter: string;
  refundPaymentMethod?: PaymentMethodType;
}

export interface PaymentRecord {
  id: string;
  paymentNumber: string; // e.g. REG-2026-0310
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  paymentDate: number;
  method: PaymentMethodType;
  referenceNumber?: string; // Cheque number, Bank ref, MoMo transaction ID, Stripe charge ID
  operatorName?: string; // Orange Money, MTN MoMo, Wave, etc.
  operatorTransactionId?: string;
  operatorPhoneNumber?: string;
  operatorFee?: number;
  agency: string;
  cashRegisterId?: string;
  status: 'confirmed' | 'pending_verification' | 'failed' | 'refunded';
  notes?: string;
  receiptGenerated: boolean;
}

export interface OperationalExpense {
  id: string;
  expenseNumber: string; // e.g. DEP-2026-0089
  title: string;
  category: 
    | 'maintenance_cost' 
    | 'fuel_cost' 
    | 'spare_parts_cost' 
    | 'labor_cost' 
    | 'subcontracting_cost' 
    | 'agency_overhead' 
    | 'insurance_tax' 
    | 'equipment_depreciation';
  supplierId?: string;
  supplierName?: string;
  amountHT: number;
  vatAmount: number;
  amountTTC: number;
  date: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pending' | 'scheduled';
  agency: string;
  costCenter: string;
  vehicleId?: string;
  vehiclePlate?: string;
  equipmentId?: string;
  equipmentName?: string;
  customerId?: string;
  customerName?: string;
  description: string;
  receiptFile?: string;
}

export interface PaymentGatewayConfig {
  id: string;
  code: PaymentMethodType;
  name: string;
  providerType: 'cash' | 'bank' | 'card_processor' | 'mobile_money';
  countryScope: string[]; // e.g. ['CI', 'SN', 'CM', 'FR', 'MA']
  currency: string; // e.g. 'EUR', 'XOF', 'XAF', 'MAD'
  isEnabled: boolean;
  environment: 'sandbox' | 'live';
  merchantId?: string;
  apiKey?: string;
  webhookSecret?: string;
  commissionFeePercent: number; // e.g. 1.0%
  fixedFee: number; // e.g. 0.25€
  instructions: string;
  supportsUssdPush?: boolean;
  supportsQrCode?: boolean;
  iconName: string;
}

export interface CostCenterSummary {
  id: string;
  code: string;
  name: string;
  agency: string;
  revenue: number;
  expenses: {
    maintenance: number;
    fuel: number;
    parts: number;
    labor: number;
    other: number;
    total: number;
  };
  grossMargin: number;
  grossMarginPercent: number;
}

// ==========================================
// MODULE RESSOURCES HUMAINES OPÉRATIONNELLES
// ==========================================

export type OperationalProfile =
  | 'Technicien'
  | 'Mécanicien'
  | 'Électricien automobile'
  | 'Magasinier'
  | 'Chauffeur'
  | "Chef d'atelier"
  | 'Réceptionnaire'
  | 'Responsable de parc'
  | "Responsable d'agence"
  | 'Commercial'
  | 'Gestionnaire de flotte';

export interface EmployeeSkill {
  id: string;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Expert';
  validatedDate: number;
}

export interface EmployeeCertification {
  id: string;
  name: string;
  issuer: string;
  issueDate: number;
  expiryDate: number;
  documentRef?: string;
}

export interface EmployeeHabilitation {
  id: string;
  name: string;
  level?: string;
  issueDate: number;
  expiryDate: number;
  status: 'valid' | 'expiring_soon' | 'expired';
}

export interface EmployeeTraining {
  id: string;
  title: string;
  category: 'Sécurité' | 'Technique' | 'Management' | 'Conduite' | 'Diagnostic';
  date: number;
  durationHours: number;
  status: 'completed' | 'planned' | 'in_progress';
  provider: string;
}

export interface OperationalEvaluation {
  id: string;
  date: number;
  evaluator: string;
  type: 'Bilan Annuel' | 'Point trimestriel' | 'Évaluation Compétence Atelier';
  comments: string;
  objectivesNextPeriod: string;
  supportNeeded: string;
}

export interface InterventionHistoryItem {
  id: string;
  reference: string;
  type: 'maintenance' | 'repair' | 'delivery' | 'inspection' | 'sale' | 'logistics';
  title: string;
  date: number;
  durationMinutes: number;
  status: 'completed' | 'verified';
  clientOrVehicle: string;
}

export interface Collaborator {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: OperationalProfile;
  agency: string;
  status: 'active' | 'on_leave' | 'mission' | 'training';
  availability: 'disponible' | 'en_intervention' | 'en_mission' | 'absent';
  workloadPercent: number;
  productivityScore?: number;
  skills: EmployeeSkill[];
  certifications: EmployeeCertification[];
  habilitations: EmployeeHabilitation[];
  trainings: EmployeeTraining[];
  evaluations: OperationalEvaluation[];
  interventions: InterventionHistoryItem[];
  schedule: Array<{ day: string; shift: 'Matin (07h-15h)' | 'Journée (08h-17h)' | 'Soir (15h-23h)' | 'Astreinte' | 'Repos' }>;
  notes?: string;
}


