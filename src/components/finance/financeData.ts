import { Quote, Invoice, CreditNote, PaymentRecord, OperationalExpense, FinanceLineItem } from '../../types';

export const initialQuotes: Quote[] = [
  {
    id: 'q-101',
    quoteNumber: 'DEV-2026-1001',
    title: 'Révision Générale & Remplacement embrayage - Renault Kerax',
    customerId: 'cust-01',
    customerName: 'Transport & Logistique de l’Ouest',
    customerEmail: 'contact@tlo-logistics.com',
    customerPhone: '+33 1 42 68 90 00',
    serviceType: 'workshop_repair',
    creationDate: Date.now() - 86400000 * 3,
    validUntilDate: Date.now() + 86400000 * 27,
    status: 'sent',
    items: [
      {
        id: 'qi-1',
        type: 'labor',
        description: 'Main d’œuvre Mécanique Poids Lourd',
        quantity: 1,
        unit: 'forfait',
        unitPriceHT: 1850,
        unitCostHT: 900,
        vatRate: 20,
        totalHT: 1850,
        totalCostHT: 900,
        marginHT: 950,
        marginRatePercent: 51.3
      },
      {
        id: 'qi-2',
        type: 'part',
        description: 'Kit Embrayage complet OEM HD',
        reference: 'KIT-EMB-882',
        quantity: 1,
        unit: 'pièce',
        unitPriceHT: 850,
        unitCostHT: 520,
        vatRate: 20,
        totalHT: 850,
        totalCostHT: 520,
        marginHT: 330,
        marginRatePercent: 38.8
      },
      {
        id: 'qi-3',
        type: 'part',
        description: 'Huile transmission 75W90 (20L)',
        reference: 'HUILE-75W90',
        quantity: 2,
        unit: 'bidon',
        unitPriceHT: 120,
        unitCostHT: 75,
        vatRate: 20,
        totalHT: 240,
        totalCostHT: 150,
        marginHT: 90,
        marginRatePercent: 37.5
      }
    ],
    subtotalHT: 2940,
    totalCostHT: 1570,
    totalMarginHT: 1370,
    overallMarginPercent: 46.5,
    vatRate: 20,
    vatAmount: 588,
    totalTTC: 3528,
    paymentTerms: '30 jours fin de mois',
    agency: 'Atelier Central - Paris',
    costCenter: 'Centre 101 - Atelier SAV & Mécanique',
    vehiclePlate: 'AB-123-CD',
    notes: 'Devis valable 30 jours. Paiement à 30 jours fin de mois pour compte pro agréé.'
  },
  {
    id: 'q-102',
    quoteNumber: 'DEV-2026-1002',
    title: 'Fourniture chenilles acier renforcé pour Caterpillar 320',
    customerId: 'cust-02',
    customerName: 'BTP Grands Chantiers Afrique',
    customerEmail: 'achats@btp-grandschantiers.com',
    customerPhone: '+225 27 20 00 11 22',
    serviceType: 'industrial_service',
    creationDate: Date.now() - 86400000 * 1,
    validUntilDate: Date.now() + 86400000 * 29,
    status: 'draft',
    items: [
      {
        id: 'qi-4',
        type: 'part',
        description: 'Chenilles acier renforcé Caterpillar 320',
        reference: 'CAT-CH-320',
        quantity: 2,
        unit: 'paire',
        unitPriceHT: 4500,
        unitCostHT: 3100,
        vatRate: 18,
        totalHT: 9000,
        totalCostHT: 6200,
        marginHT: 2800,
        marginRatePercent: 31.1
      }
    ],
    subtotalHT: 9000,
    totalCostHT: 6200,
    totalMarginHT: 2800,
    overallMarginPercent: 31.1,
    vatRate: 18,
    vatAmount: 1620,
    totalTTC: 10620,
    paymentTerms: 'Comptant à la commande',
    agency: 'Agence Abidjan - Côte d’Ivoire',
    costCenter: 'Centre 103 - Ventes Engins & Pièces',
    equipmentName: 'Pelle CAT 320 GC',
    notes: 'Incoterm Ex-Works. Expédition maritime incluse.'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'inv-201',
    invoiceNumber: 'FAC-2026-0489',
    quoteId: 'q-095',
    quoteNumber: 'DEV-2026-095',
    title: 'Remplacement Système de Freinage Complet - Volvo FH',
    customerId: 'cust-03',
    customerName: 'Transports Express Martin',
    customerAddress: '45 Rue de la République, 69002 Lyon',
    serviceType: 'workshop_repair',
    issueDate: Date.now() - 86400000 * 10,
    dueDate: Date.now() + 86400000 * 20,
    status: 'partially_paid',
    items: [
      {
        id: 'ii-1',
        type: 'labor',
        description: 'Main d’œuvre Freinage Poids Lourd',
        quantity: 1,
        unit: 'forfait',
        unitPriceHT: 2400,
        unitCostHT: 1200,
        vatRate: 20,
        totalHT: 2400,
        totalCostHT: 1200,
        marginHT: 1200,
        marginRatePercent: 50
      },
      {
        id: 'ii-2',
        type: 'part',
        description: 'Disques et Plaquettes essieu avant & arrière',
        reference: 'BRAKE-KIT-VOLVO',
        quantity: 2,
        unit: 'jeu',
        unitPriceHT: 650,
        unitCostHT: 410,
        vatRate: 20,
        totalHT: 1300,
        totalCostHT: 820,
        marginHT: 480,
        marginRatePercent: 36.9
      }
    ],
    subtotalHT: 3700,
    totalCostHT: 2020,
    totalMarginHT: 1680,
    overallMarginPercent: 45.4,
    vatRate: 20,
    vatAmount: 740,
    totalTTC: 4440,
    paidAmount: 2000,
    balanceDue: 2440,
    paymentTerms: '30 jours fin de mois',
    agency: 'Atelier Lyon - Rhône-Alpes',
    costCenter: 'Centre 101 - Atelier SAV & Mécanique',
    vehiclePlate: 'LY-888-ZZ',
    payments: [
      {
        id: 'pay-1',
        paymentNumber: 'REG-2026-8901',
        invoiceId: 'inv-201',
        invoiceNumber: 'FAC-2026-0489',
        customerId: 'cust-03',
        customerName: 'Transports Express Martin',
        amount: 2000,
        paymentDate: Date.now() - 86400000 * 10,
        method: 'bank_transfer',
        referenceNumber: 'VIR-SEPA-REF-998231',
        agency: 'Atelier Lyon - Rhône-Alpes',
        status: 'confirmed',
        receiptGenerated: true
      }
    ],
    notes: 'Acompte de 2000€ réglé le 06/09/2026.'
  },
  {
    id: 'inv-202',
    invoiceNumber: 'FAC-2026-0490',
    title: 'Contrat Maintenance Flotte 5 Berlines Hybrides',
    customerId: 'cust-04',
    customerName: 'SARL Taxi Prestige Paris',
    customerAddress: '12 Rue de Rivoli, 75004 Paris',
    serviceType: 'preventive_maintenance',
    issueDate: Date.now() - 86400000 * 5,
    dueDate: Date.now() + 86400000 * 25,
    status: 'issued',
    items: [
      {
        id: 'ii-3',
        type: 'service',
        description: 'Contrat Maintenance Flotte 5 Berlines Hybrides (Août 2026)',
        quantity: 5,
        unit: 'véhicule',
        unitPriceHT: 350,
        unitCostHT: 180,
        vatRate: 20,
        totalHT: 1750,
        totalCostHT: 900,
        marginHT: 850,
        marginRatePercent: 48.5
      }
    ],
    subtotalHT: 1750,
    totalCostHT: 900,
    totalMarginHT: 850,
    overallMarginPercent: 48.5,
    vatRate: 20,
    vatAmount: 350,
    totalTTC: 2100,
    paidAmount: 0,
    balanceDue: 2100,
    paymentTerms: 'Comptant',
    agency: 'Atelier Central - Paris',
    costCenter: 'Centre 102 - Flotte Pro & Location',
    payments: [],
    notes: 'Facture mensuelle de maintenance forfaitaire.'
  }
];

export const initialCreditNotes: CreditNote[] = [
  {
    id: 'cn-1',
    creditNoteNumber: 'AV-2026-0012',
    invoiceId: 'inv-200',
    invoiceNumber: 'FAC-2026-0470',
    customerId: 'cust-03',
    customerName: 'Transports Express Martin',
    issueDate: Date.now() - 86400000 * 12,
    reason: 'part_return',
    description: 'Retour de pièce défectueuse (Filtre à particules non conforme)',
    items: [
      {
        id: 'cni-1',
        description: 'Filtre à particules Volvo FH (Retour)',
        quantity: 1,
        unitPriceHT: 350,
        totalHT: 350
      }
    ],
    subtotalHT: 350,
    vatAmount: 70,
    totalTTC: 420,
    status: 'applied_to_invoice',
    agency: 'Atelier Lyon - Rhône-Alpes',
    costCenter: 'Centre 101 - Atelier SAV & Mécanique'
  }
];

export const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    paymentNumber: 'REG-2026-8901',
    invoiceId: 'inv-201',
    invoiceNumber: 'FAC-2026-0489',
    customerId: 'cust-03',
    customerName: 'Transports Express Martin',
    amount: 2000,
    paymentDate: Date.now() - 86400000 * 10,
    method: 'bank_transfer',
    referenceNumber: 'VIR-SEPA-REF-998231',
    agency: 'Atelier Lyon - Rhône-Alpes',
    status: 'confirmed',
    receiptGenerated: true
  },
  {
    id: 'pay-2',
    paymentNumber: 'REG-2026-8902',
    invoiceId: 'inv-203',
    invoiceNumber: 'FAC-2026-0485',
    customerId: 'cust-05',
    customerName: 'Entreprise BTP Générale du Nord',
    amount: 102000,
    paymentDate: Date.now() - 86400000 * 25,
    method: 'bank_transfer',
    referenceNumber: 'VIR-SWIFT-BTP-NORTH-77',
    agency: 'Concession Lille - Nord',
    status: 'confirmed',
    receiptGenerated: true
  }
];

export const initialExpenses: OperationalExpense[] = [
  {
    id: 'exp-1',
    expenseNumber: 'DEP-2026-301',
    title: 'Ravitaillement Carburant Cuve Atelier Principal',
    category: 'fuel_cost',
    supplierName: 'TotalEnergies Pro',
    amountHT: 4500,
    vatAmount: 900,
    amountTTC: 5400,
    date: Date.now() - 86400000 * 4,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    agency: 'Atelier Central - Paris',
    costCenter: 'Centre 101 - Atelier SAV & Mécanique',
    description: 'Remplissage cuve gasoil 5000L pour véhicules de courtoisie et intervention.'
  },
  {
    id: 'exp-2',
    expenseNumber: 'DEP-2026-302',
    title: 'Achat de pièces détachées freinage en gros (Plaquettes, Disques)',
    category: 'spare_parts_cost',
    supplierName: 'Bosch Automotive Parts',
    amountHT: 12500,
    vatAmount: 2500,
    amountTTC: 15000,
    date: Date.now() - 86400000 * 8,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    agency: 'Atelier Lyon - Rhône-Alpes',
    costCenter: 'Centre 103 - Ventes Engins & Pièces',
    description: 'Stock trimestriel plaquettes et disques freins poids lourds.'
  }
];

export const agencyList = [
  'Toutes les agences',
  'Atelier Central - Paris',
  'Atelier Lyon - Rhône-Alpes',
  'Concession Lille - Nord',
  'Agence Abidjan - Côte d’Ivoire'
];

export const costCenterList = [
  'Tous les centres',
  'Centre 101 - Atelier SAV & Mécanique',
  'Centre 102 - Flotte Pro & Location',
  'Centre 103 - Ventes Engins & Pièces',
  'Centre 104 - Logistique & Carburant',
  'Centre 105 - Siège & Frais Généraux'
];
