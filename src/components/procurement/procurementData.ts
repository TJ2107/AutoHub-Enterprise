import { 
  Supplier, 
  PurchaseRequest, 
  RFQ, 
  PurchaseOrder, 
  GoodsReceipt, 
  SupplierInvoice, 
  SupplierContract, 
  PriceHistoryRecord 
} from '../../types';

export const initialSuppliers: Supplier[] = [
  {
    id: 'sup-1',
    code: 'FOURN-001',
    name: 'Toyota Parts Europe',
    category: 'pieces',
    isSubcontractor: false,
    contactName: 'Philippe Renaud',
    email: 'contact@toyota-parts.eu',
    phone: '+33 1 45 67 89 00',
    address: 'Parc Logistique Nord, 95700 Roissy',
    taxId: 'FR 89 452 390 112',
    paymentTerms: '30 jours fin de mois',
    status: 'active',
    rating: {
      overall: 4.8,
      quality: 4.9,
      delivery: 4.7,
      pricing: 4.2
    },
    contractsCount: 2,
    totalPurchasesYTD: 142500
  },
  {
    id: 'sup-2',
    code: 'FOURN-002',
    name: 'Caterpillar Bergerat Monnoyeur',
    category: 'equipements',
    isSubcontractor: false,
    contactName: 'Alain Vernier',
    email: 'heavy@monnoyeur-cat.fr',
    phone: '+33 4 72 30 11 22',
    address: '12 rue des Ateliers, 69200 Vénissieux',
    taxId: 'FR 45 123 456 789',
    paymentTerms: '45 jours fin de mois',
    status: 'active',
    rating: {
      overall: 4.7,
      quality: 4.9,
      delivery: 4.5,
      pricing: 3.9
    },
    contractsCount: 1,
    totalPurchasesYTD: 285400
  },
  {
    id: 'sup-3',
    code: 'ST-003',
    name: 'Atelier Carrosserie & Rectif Pro (Sous-traitant)',
    category: 'sous_traitance',
    isSubcontractor: true,
    contactName: 'Karim Benali',
    email: 'atelier@rectif-pro.fr',
    phone: '+33 4 78 90 22 33',
    address: 'Zone Industrielle Est, 69800 Saint-Priest',
    taxId: 'FR 78 889 001 234',
    paymentTerms: '30 jours net',
    status: 'active',
    rating: {
      overall: 4.5,
      quality: 4.6,
      delivery: 4.3,
      pricing: 4.4
    },
    contractsCount: 2,
    totalPurchasesYTD: 68400
  },
  {
    id: 'sup-4',
    code: 'FOURN-004',
    name: 'Pneumatiques Michelin Distribution',
    category: 'pneumatiques',
    isSubcontractor: false,
    contactName: 'Estelle Durand',
    email: 'pro@michelin-distrib.com',
    phone: '+33 1 34 56 78 90',
    address: 'Boulevard Industriel, 63000 Clermont-Ferrand',
    taxId: 'FR 32 998 776 543',
    paymentTerms: '30 jours fin de mois',
    status: 'active',
    rating: {
      overall: 4.9,
      quality: 5.0,
      delivery: 4.8,
      pricing: 4.1
    },
    contractsCount: 1,
    totalPurchasesYTD: 94200
  },
  {
    id: 'sup-5',
    code: 'ST-005',
    name: 'Injection & Turbo Diesel Service (Sous-traitant)',
    category: 'sous_traitance',
    isSubcontractor: true,
    contactName: 'Jérôme Martin',
    email: 'sav@turbodiesel-service.fr',
    phone: '+33 4 76 54 32 10',
    address: 'Route de Grenoble, 38100 Grenoble',
    taxId: 'FR 12 345 678 901',
    paymentTerms: 'Comptant',
    status: 'review',
    rating: {
      overall: 3.8,
      quality: 4.0,
      delivery: 3.2,
      pricing: 3.6
    },
    contractsCount: 0,
    totalPurchasesYTD: 22800
  },
  {
    id: 'sup-6',
    code: 'FOURN-006',
    name: 'TotalEnergies Lubrifiants & Fluides',
    category: 'carburant',
    isSubcontractor: false,
    contactName: 'Clara Meunier',
    email: 'grands-comptes@totalenergies.fr',
    phone: '+33 1 41 35 40 00',
    address: '2 Place Jean Millier, 92400 Courbevoie',
    taxId: 'FR 55 542 051 180',
    paymentTerms: '30 jours fin de mois',
    status: 'active',
    rating: {
      overall: 4.6,
      quality: 4.8,
      delivery: 4.7,
      pricing: 4.0
    },
    contractsCount: 1,
    totalPurchasesYTD: 112000
  }
];

export const initialPurchaseRequests: PurchaseRequest[] = [
  {
    id: 'pr-1',
    prNumber: 'DA-2026-089',
    title: 'Plaquettes & Disques de frein renforcés',
    requesterName: 'Marc Silva (Chef d\'Atelier)',
    department: 'Atelier Mécanique',
    requestDate: Date.now() - 3 * 86400000,
    requiredDate: Date.now() + 4 * 86400000,
    reason: 'Remplacement urgent suite à l\'usure critique détectée lors de l\'inspection technique périodique.',
    urgency: 'high',
    allocationType: 'vehicle',
    allocationTargetId: 'v1',
    allocationTargetName: 'Toyota Hilux (AB-123-CD)',
    items: [
      { id: 'item-1', description: 'Jeu de disques avant ventilés HD', partNumber: 'BRK-DSK-435', quantity: 2, unit: 'paire', estimatedUnitPrice: 145.0, totalAmount: 290.0 },
      { id: 'item-2', description: 'Plaquettes de frein céramique', partNumber: 'BRK-PAD-890', quantity: 2, unit: 'jeu', estimatedUnitPrice: 85.0, totalAmount: 170.0 }
    ],
    estimatedTotal: 460.0,
    status: 'pending_approval'
  },
  {
    id: 'pr-2',
    prNumber: 'DA-2026-088',
    title: 'Kit de vérins hydrauliques & flexibles HP',
    requesterName: 'Benoît Lambert (Resp. Engins)',
    department: 'Maintenance Industrielle',
    requestDate: Date.now() - 6 * 86400000,
    requiredDate: Date.now() + 2 * 86400000,
    reason: 'Fuite sur vérin principal de flèche - Risque d\'immobilisation chantier Lyon.',
    urgency: 'urgent',
    allocationType: 'equipment',
    allocationTargetId: 'eq-cat-01',
    allocationTargetName: 'Pelle CAT 320 (EQ-CAT-01)',
    items: [
      { id: 'item-3', description: 'Flexible haute pression blindé 400 bars', partNumber: 'HYD-FLX-400', quantity: 4, unit: 'unité', estimatedUnitPrice: 195.0, totalAmount: 780.0 },
      { id: 'item-4', description: 'Joints toriques et garnitures de tige CAT', partNumber: 'KIT-SEAL-320', quantity: 1, unit: 'kit', estimatedUnitPrice: 620.0, totalAmount: 620.0 }
    ],
    estimatedTotal: 1400.0,
    status: 'rfq_issued',
    approvedBy: 'Directeur Technique (J. Fournier)',
    approvalDate: Date.now() - 4 * 86400000
  },
  {
    id: 'pr-3',
    prNumber: 'DA-2026-087',
    title: 'Sous-traitance Usinage & Rectification Volant Moteur',
    requesterName: 'Lucie Tech (Mécanicienne)',
    department: 'Atelier SAV',
    requestDate: Date.now() - 10 * 86400000,
    requiredDate: Date.now() - 2 * 86400000,
    reason: 'Prestation extérieure spécialisée pour l\'intervention boîte de transfert.',
    urgency: 'normal',
    allocationType: 'workshop_order',
    allocationTargetId: 'or-5542',
    allocationTargetName: 'Ordre Réparation OR-5542',
    items: [
      { id: 'item-5', description: 'Rectification volant moteur bi-masse + équilibrage', partNumber: 'PREST-RECT-01', quantity: 1, unit: 'forfait', estimatedUnitPrice: 380.0, totalAmount: 380.0 }
    ],
    estimatedTotal: 380.0,
    status: 'ordered',
    approvedBy: 'Marc Silva (Chef Atelier)',
    approvalDate: Date.now() - 9 * 86400000
  },
  {
    id: 'pr-4',
    prNumber: 'DA-2026-086',
    title: 'Fûts huile moteur 15W40 & 5W30 synthèse',
    requesterName: 'Ahmed Magasinier',
    department: 'Magasin Central',
    requestDate: Date.now() - 14 * 86400000,
    requiredDate: Date.now() - 5 * 86400000,
    reason: 'Réapprovisionnement de sécurité seuil critique atteint.',
    urgency: 'normal',
    allocationType: 'cost_center',
    allocationTargetName: 'Centre de Coût - Atelier & Consommables',
    items: [
      { id: 'item-6', description: 'Fût Huile 5W30 C3 Synthèse 208L', partNumber: 'OIL-5W30-208', quantity: 2, unit: 'fût', estimatedUnitPrice: 790.0, totalAmount: 1580.0 },
      { id: 'item-7', description: 'Fût Huile 15W40 Minérale TP 208L', partNumber: 'OIL-15W40-208', quantity: 2, unit: 'fût', estimatedUnitPrice: 620.0, totalAmount: 1240.0 }
    ],
    estimatedTotal: 2820.0,
    status: 'ordered',
    approvedBy: 'Resp. Achats (Valérie Dumont)',
    approvalDate: Date.now() - 12 * 86400000
  }
];

export const initialRFQs: RFQ[] = [
  {
    id: 'rfq-1',
    rfqNumber: 'RFQ-2026-031',
    prId: 'pr-2',
    prNumber: 'DA-2026-088',
    title: 'Consultation Flexibles HP & Kits joints pour CAT 320',
    issueDate: Date.now() - 4 * 86400000,
    closingDate: Date.now() + 2 * 86400000,
    items: [
      { id: 'item-3', description: 'Flexible haute pression blindé 400 bars', partNumber: 'HYD-FLX-400', quantity: 4, unit: 'unité', estimatedUnitPrice: 195.0, totalAmount: 780.0 },
      { id: 'item-4', description: 'Joints toriques et garnitures de tige CAT', partNumber: 'KIT-SEAL-320', quantity: 1, unit: 'kit', estimatedUnitPrice: 620.0, totalAmount: 620.0 }
    ],
    quotes: [
      {
        id: 'q-1',
        supplierId: 'sup-2',
        supplierName: 'Caterpillar Bergerat Monnoyeur',
        unitPrice: 1350.0,
        totalAmount: 1350.0,
        deliveryDays: 2,
        warrantyMonths: 24,
        complianceScore: 98,
        notes: 'Pièces d\'origine OEM Caterpillar, garantie constructeur certifiée.',
        isSelected: true
      },
      {
        id: 'q-2',
        supplierId: 'sup-1',
        supplierName: 'Hydro-Tech Distribution Rhône',
        unitPrice: 1220.0,
        totalAmount: 1220.0,
        deliveryDays: 5,
        warrantyMonths: 12,
        complianceScore: 89,
        notes: 'Équivalence certifiée ISO 9001, flexibles assemblés en atelier local.',
        isSelected: false
      },
      {
        id: 'q-3',
        supplierId: 'sup-3',
        supplierName: 'France Hydraulique Express',
        unitPrice: 1480.0,
        totalAmount: 1480.0,
        deliveryDays: 1,
        warrantyMonths: 12,
        complianceScore: 92,
        notes: 'Livraison express en 24h chrono avec surcoût transport.',
        isSelected: false
      }
    ],
    status: 'evaluated',
    selectedSupplierId: 'sup-2'
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'BC-2026-045',
    prNumber: 'DA-2026-086',
    supplierId: 'sup-6',
    supplierName: 'TotalEnergies Lubrifiants & Fluides',
    supplierCode: 'FOURN-006',
    orderDate: Date.now() - 8 * 86400000,
    expectedDeliveryDate: Date.now() - 2 * 86400000,
    items: [
      { id: 'po-item-1', description: 'Fût Huile 5W30 C3 Synthèse 208L', partNumber: 'OIL-5W30-208', quantity: 2, unit: 'fût', estimatedUnitPrice: 790.0, negotiatedUnitPrice: 760.0, totalAmount: 1520.0, receivedQuantity: 2 },
      { id: 'po-item-2', description: 'Fût Huile 15W40 Minérale TP 208L', partNumber: 'OIL-15W40-208', quantity: 2, unit: 'fût', estimatedUnitPrice: 620.0, negotiatedUnitPrice: 590.0, totalAmount: 1180.0, receivedQuantity: 2 }
    ],
    subtotalHT: 2700.0,
    vatRate: 20,
    vatAmount: 540.0,
    totalTTC: 3240.0,
    paymentTerms: '30 jours fin de mois',
    allocationType: 'cost_center',
    allocationTargetName: 'Centre de Coût - Atelier & Consommables',
    status: 'received',
    validatedBy: 'Direction Financière (J. Martin)',
    validationDate: Date.now() - 7 * 86400000,
    deliveryAddress: 'Magasin Central - Quai 3, AutoHub Site Principal',
    notes: 'Commande sous contrat cadre annuel #CADRE-TOT-2026 (Remise 5% incluse).'
  },
  {
    id: 'po-2',
    poNumber: 'BC-2026-046',
    prNumber: 'DA-2026-087',
    supplierId: 'sup-3',
    supplierName: 'Atelier Carrosserie & Rectif Pro (Sous-traitant)',
    supplierCode: 'ST-003',
    orderDate: Date.now() - 5 * 86400000,
    expectedDeliveryDate: Date.now() + 1 * 86400000,
    items: [
      { id: 'po-item-3', description: 'Rectification volant moteur bi-masse + équilibrage', partNumber: 'PREST-RECT-01', quantity: 1, unit: 'forfait', estimatedUnitPrice: 380.0, negotiatedUnitPrice: 360.0, totalAmount: 360.0, receivedQuantity: 0 }
    ],
    subtotalHT: 360.0,
    vatRate: 20,
    vatAmount: 72.0,
    totalTTC: 432.0,
    paymentTerms: '30 jours net',
    allocationType: 'workshop_order',
    allocationTargetName: 'Ordre Réparation OR-5542',
    status: 'sent_to_supplier',
    validatedBy: 'Marc Silva (Chef Atelier)',
    validationDate: Date.now() - 5 * 86400000,
    deliveryAddress: 'Atelier Réparation Mécanique, Baie 4',
    notes: 'Sous-traitance externe rattachée à l\'OR-5542.'
  },
  {
    id: 'po-3',
    poNumber: 'BC-2026-047',
    rfqNumber: 'RFQ-2026-031',
    prNumber: 'DA-2026-088',
    supplierId: 'sup-2',
    supplierName: 'Caterpillar Bergerat Monnoyeur',
    supplierCode: 'FOURN-002',
    orderDate: Date.now() - 1 * 86400000,
    expectedDeliveryDate: Date.now() + 3 * 86400000,
    items: [
      { id: 'po-item-4', description: 'Flexible haute pression blindé 400 bars', partNumber: 'HYD-FLX-400', quantity: 4, unit: 'unité', estimatedUnitPrice: 195.0, negotiatedUnitPrice: 185.0, totalAmount: 740.0, receivedQuantity: 0 },
      { id: 'po-item-5', description: 'Joints toriques et garnitures de tige CAT', partNumber: 'KIT-SEAL-320', quantity: 1, unit: 'kit', estimatedUnitPrice: 620.0, negotiatedUnitPrice: 610.0, totalAmount: 610.0, receivedQuantity: 0 }
    ],
    subtotalHT: 1350.0,
    vatRate: 20,
    vatAmount: 270.0,
    totalTTC: 1620.0,
    paymentTerms: '45 jours fin de mois',
    allocationType: 'equipment',
    allocationTargetName: 'Pelle CAT 320 (EQ-CAT-01)',
    status: 'approved',
    validatedBy: 'Directeur Technique (J. Fournier)',
    validationDate: Date.now() - 1 * 86400000,
    deliveryAddress: 'Chantier Sud Lyon / Base Matériel',
    notes: 'Pièces d\'origine OEM Caterpillar pour maintien de garantie.'
  }
];

export const initialGoodsReceipts: GoodsReceipt[] = [
  {
    id: 'rec-1',
    receiptNumber: 'BR-2026-039',
    poId: 'po-1',
    poNumber: 'BC-2026-045',
    supplierName: 'TotalEnergies Lubrifiants & Fluides',
    deliveryNoteNumber: 'BL-TOT-89234',
    receiptDate: Date.now() - 2 * 86400000,
    receiverName: 'Ahmed Magasinier',
    items: [
      { itemId: 'po-item-1', description: 'Fût Huile 5W30 C3 Synthèse 208L', partNumber: 'OIL-5W30-208', orderedQty: 2, receivedQty: 2, acceptedQty: 2, rejectedQty: 0, conformityStatus: 'conform' },
      { itemId: 'po-item-2', description: 'Fût Huile 15W40 Minérale TP 208L', partNumber: 'OIL-15W40-208', orderedQty: 2, receivedQty: 2, acceptedQty: 2, rejectedQty: 0, conformityStatus: 'conform' }
    ],
    conformityOverall: 'compliant',
    inspectorNotes: 'Fûts scellés d\'origine intacts, certificats de conformité de lot vérifiés.',
    stockUpdated: true
  }
];

export const initialSupplierInvoices: SupplierInvoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'FAC-TOT-2026-904',
    poId: 'po-1',
    poNumber: 'BC-2026-045',
    receiptNumber: 'BR-2026-039',
    supplierId: 'sup-6',
    supplierName: 'TotalEnergies Lubrifiants & Fluides',
    invoiceDate: Date.now() - 2 * 86400000,
    dueDate: Date.now() + 28 * 86400000,
    amountHT: 2700.0,
    vatAmount: 540.0,
    amountTTC: 3240.0,
    threeWayMatch: 'matched',
    paymentStatus: 'pending',
    allocationTargetName: 'Centre de Coût - Atelier & Consommables'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'FAC-MIC-2026-118',
    poId: 'po-old-1',
    poNumber: 'BC-2026-038',
    supplierId: 'sup-4',
    supplierName: 'Pneumatiques Michelin Distribution',
    invoiceDate: Date.now() - 25 * 86400000,
    dueDate: Date.now() + 5 * 86400000,
    amountHT: 4200.0,
    vatAmount: 840.0,
    amountTTC: 5040.0,
    threeWayMatch: 'matched',
    paymentStatus: 'pending',
    allocationTargetName: 'Véhicules Flotte Commerciale'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'FAC-CAT-2026-055',
    poId: 'po-old-2',
    poNumber: 'BC-2026-030',
    supplierId: 'sup-2',
    supplierName: 'Caterpillar Bergerat Monnoyeur',
    invoiceDate: Date.now() - 40 * 86400000,
    dueDate: Date.now() - 5 * 86400000,
    amountHT: 8900.0,
    vatAmount: 1780.0,
    amountTTC: 10680.0,
    threeWayMatch: 'discrepancy',
    matchDiscrepancyReason: 'Écart de 180 € HT sur les frais de port non prévus au Bon de Commande.',
    paymentStatus: 'overdue',
    allocationTargetName: 'Pelle CAT 320 (EQ-CAT-01)'
  }
];

export const initialContracts: SupplierContract[] = [
  {
    id: 'ctr-1',
    contractNumber: 'CTR-2026-01',
    supplierId: 'sup-1',
    supplierName: 'Toyota Parts Europe',
    title: 'Contrat Cadre Pièces d\'Origine Toyota & Lexus',
    type: 'framework',
    startDate: Date.now() - 180 * 86400000,
    endDate: Date.now() + 185 * 86400000,
    discountRate: 18,
    volumeCommitment: '> 100 000 € HT annuel',
    status: 'active',
    slaTerms: 'Livraison sous 24h pour commandes passées avant 16h.'
  },
  {
    id: 'ctr-2',
    contractNumber: 'CTR-2026-02',
    supplierId: 'sup-3',
    supplierName: 'Atelier Carrosserie & Rectif Pro',
    title: 'Convention de Sous-traitance Usinage & Rectification Moteurs',
    type: 'subcontracting',
    startDate: Date.now() - 90 * 86400000,
    endDate: Date.now() + 275 * 86400000,
    discountRate: 12,
    volumeCommitment: 'Priorité atelier sous 48h',
    status: 'active',
    slaTerms: 'Garantie 12 mois pièces et main-d\'oeuvre sur rectifications.'
  },
  {
    id: 'ctr-3',
    contractNumber: 'CTR-2025-08',
    supplierId: 'sup-5',
    supplierName: 'Injection & Turbo Diesel Service',
    title: 'Sous-traitance Révision Injecteurs & Pompes Haute Pression',
    type: 'subcontracting',
    startDate: Date.now() - 340 * 86400000,
    endDate: Date.now() + 25 * 86400000,
    discountRate: 8,
    status: 'expiring_soon',
    slaTerms: 'Délai d\'expertise sous 72h max.'
  }
];

export const initialPriceHistory: PriceHistoryRecord[] = [
  {
    id: 'ph-1',
    partNumber: 'BRK-PAD-890',
    description: 'Plaquettes de frein céramique',
    supplierName: 'Toyota Parts Europe',
    poNumber: 'BC-2026-042',
    date: Date.now() - 15 * 86400000,
    unitPrice: 85.0,
    previousPrice: 82.0,
    percentageChange: 3.65
  },
  {
    id: 'ph-2',
    partNumber: 'OIL-5W30-208',
    description: 'Fût Huile 5W30 C3 Synthèse 208L',
    supplierName: 'TotalEnergies Lubrifiants',
    poNumber: 'BC-2026-045',
    date: Date.now() - 8 * 86400000,
    unitPrice: 760.0,
    previousPrice: 790.0,
    percentageChange: -3.8
  },
  {
    id: 'ph-3',
    partNumber: 'HYD-FLX-400',
    description: 'Flexible haute pression blindé 400 bars',
    supplierName: 'Caterpillar Bergerat',
    poNumber: 'BC-2026-047',
    date: Date.now() - 1 * 86400000,
    unitPrice: 185.0,
    previousPrice: 175.0,
    percentageChange: 5.71
  }
];
