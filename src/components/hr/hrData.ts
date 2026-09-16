import { Collaborator } from '../../types';
import { agencyList } from '../finance/financeData';

export const initialCollaborators: Collaborator[] = [
  {
    id: 'collab-1',
    employeeNumber: 'RH-2026-101',
    firstName: 'Marc',
    lastName: 'Lefevre',
    email: 'm.lefevre@autohub.fr',
    phone: '+33 6 12 34 56 78',
    profile: "Chef d'atelier",
    agency: 'Atelier Central - Paris',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 85,
    productivityScore: 94,
    skills: [
      { id: 'sk-1', name: 'Diagnostic Moteur Diesel HD', level: 'Expert', validatedDate: Date.now() - 86400000 * 300 },
      { id: 'sk-2', name: 'Management Équipe Technique', level: 'Expert', validatedDate: Date.now() - 86400000 * 500 },
      { id: 'sk-3', name: 'Gestion des Flux SAV', level: 'Intermédiaire', validatedDate: Date.now() - 86400000 * 150 }
    ],
    certifications: [
      { id: 'cert-1', name: 'Certification Technique Avancée Renault Trucks', issuer: 'Renault Academy', issueDate: Date.now() - 86400000 * 600, expiryDate: Date.now() + 86400000 * 400, documentRef: 'CERT-RT-889' }
    ],
    habilitations: [
      { id: 'hab-1', name: 'Habilitation Électrique B2V / BC', level: 'B2V Essentiel', issueDate: Date.now() - 86400000 * 200, expiryDate: Date.now() + 86400000 * 500, status: 'valid' },
      { id: 'hab-2', name: 'Conduite Ponts Roulants & Chariots', level: 'CACES R489 Cat 3', issueDate: Date.now() - 86400000 * 400, expiryDate: Date.now() + 86400000 * 300, status: 'valid' }
    ],
    trainings: [
      { id: 'tr-1', title: 'Sécurité et Levage Poids Lourd', category: 'Sécurité', date: Date.now() - 86400000 * 90, durationHours: 14, status: 'completed', provider: 'INRS Formation' },
      { id: 'tr-2', title: 'Diagnostic Véhicules Électriques & Hybrides', category: 'Technique', date: Date.now() + 86400000 * 20, durationHours: 21, status: 'planned', provider: 'Bosch Training Center' }
    ],
    evaluations: [
      {
        id: 'ev-1',
        date: Date.now() - 86400000 * 120,
        evaluator: 'Directeur des Opérations',
        type: 'Bilan Annuel',
        comments: 'Excellente maîtrise de l’atelier central. Très bon leadership et soutien technique aux mécaniciens.',
        objectivesNextPeriod: 'Optimiser le taux de rotation des ponts de levage et accompagner la transition hybride.',
        supportNeeded: 'Prévoir l’acquisition d’un outil de diagnostic complémentaire et planifier la formation électrique.'
      }
    ],
    interventions: [
      { id: 'int-1', reference: 'WO-2026-089', type: 'repair', title: 'Révision Générale & Remplacement Embrayage Renault Kerax', date: Date.now() - 86400000 * 3, durationMinutes: 240, status: 'completed', clientOrVehicle: 'Renault Kerax (AB-123-CD)' },
      { id: 'int-2', reference: 'WO-2026-072', type: 'maintenance', title: 'Contrôle freinage Volvo FH', date: Date.now() - 86400000 * 10, durationMinutes: 180, status: 'verified', clientOrVehicle: 'Volvo FH (LY-888-ZZ)' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ],
    notes: 'Référent technique principal pour la flotte poids lourds.'
  },
  {
    id: 'collab-2',
    employeeNumber: 'RH-2026-102',
    firstName: 'Thomas',
    lastName: 'Moreau',
    email: 't.moreau@autohub.fr',
    phone: '+33 6 23 45 67 89',
    profile: 'Mécanicien',
    agency: 'Atelier Central - Paris',
    status: 'active',
    availability: 'en_intervention',
    workloadPercent: 90,
    productivityScore: 91,
    skills: [
      { id: 'sk-4', name: 'Mécanique Générale Poids Lourd', level: 'Expert', validatedDate: Date.now() - 86400000 * 400 },
      { id: 'sk-5', name: 'Hydraulique Engins TP', level: 'Intermédiaire', validatedDate: Date.now() - 86400000 * 200 }
    ],
    certifications: [
      { id: 'cert-2', name: 'Technicien Mécanicien Confirmé', issuer: 'FAFCEA', issueDate: Date.now() - 86400000 * 500, expiryDate: Date.now() + 86400000 * 600, documentRef: 'MEC-CONF-441' }
    ],
    habilitations: [
      { id: 'hab-3', name: 'Habilitation Électrique BS / BE', level: 'BS Intervention Basse Tension', issueDate: Date.now() - 86400000 * 180, expiryDate: Date.now() + 86400000 * 550, status: 'valid' }
    ],
    trainings: [
      { id: 'tr-3', title: 'Sécurité et Manipulation Fluides Frigorigènes', category: 'Sécurité', date: Date.now() - 86400000 * 150, durationHours: 14, status: 'completed', provider: 'Apave' }
    ],
    evaluations: [
      {
        id: 'ev-2',
        date: Date.now() - 86400000 * 90,
        evaluator: 'Marc Lefevre (Chef d’atelier)',
        type: 'Point trimestriel',
        comments: 'Très rigoureux sur les interventions de freinage et les boîtes de vitesses.',
        objectivesNextPeriod: 'Monter en compétence sur les circuits hydrauliques Caterpillar.',
        supportNeeded: 'Accompagnement en binôme sur les pelles hydrauliques.'
      }
    ],
    interventions: [
      { id: 'int-3', reference: 'WO-2026-091', type: 'repair', title: 'Remplacement kit embrayage', date: Date.now() - 86400000 * 1, durationMinutes: 300, status: 'completed', clientOrVehicle: 'Renault Kerax' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Matin (07h-15h)' },
      { day: 'Mardi', shift: 'Matin (07h-15h)' },
      { day: 'Mercredi', shift: 'Matin (07h-15h)' },
      { day: 'Jeudi', shift: 'Matin (07h-15h)' },
      { day: 'Vendredi', shift: 'Matin (07h-15h)' }
    ]
  },
  {
    id: 'collab-3',
    employeeNumber: 'RH-2026-103',
    firstName: 'Amadou',
    lastName: 'Diallo',
    email: 'a.diallo@autohub.fr',
    phone: '+225 07 08 09 10 11',
    profile: 'Électricien automobile',
    agency: 'Atelier Abidjan - Côte d’Ivoire',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 75,
    productivityScore: 89,
    skills: [
      { id: 'sk-6', name: 'Électronique Embarquée & Calculateurs', level: 'Expert', validatedDate: Date.now() - 86400000 * 300 },
      { id: 'sk-7', name: 'Systèmes de Démarrage & Alternateurs', level: 'Expert', validatedDate: Date.now() - 86400000 * 400 }
    ],
    certifications: [
      { id: 'cert-3', name: 'Diagnostic Multiplexage Poids Lourd', issuer: 'Wabco University', issueDate: Date.now() - 86400000 * 250, expiryDate: Date.now() + 86400000 * 480 }
    ],
    habilitations: [
      { id: 'hab-4', name: 'Habilitation Électrique B2VL / BR', level: 'BR Essentiel', issueDate: Date.now() - 86400000 * 100, expiryDate: Date.now() + 86400000 * 600, status: 'valid' }
    ],
    trainings: [
      { id: 'tr-4', title: 'Diagnostic réseaux CAN Bus', category: 'Diagnostic', date: Date.now() - 86400000 * 60, durationHours: 18, status: 'completed', provider: 'Bosch Africa' }
    ],
    evaluations: [
      {
        id: 'ev-3',
        date: Date.now() - 86400000 * 60,
        evaluator: 'Responsable Agence Abidjan',
        type: 'Point trimestriel',
        comments: 'Excellent diagnostic sur les pannes intermittentes de faisceaux électriques sur flottes minières.',
        objectivesNextPeriod: 'Former un apprenti aux bases du diagnostic électronique.',
        supportNeeded: 'Mise à disposition de licences logicielles de diagnostic actualisées.'
      }
    ],
    interventions: [
      { id: 'int-4', reference: 'WO-2026-065', type: 'repair', title: 'Recherche panne faisceau multiplexé', date: Date.now() - 86400000 * 5, durationMinutes: 210, status: 'completed', clientOrVehicle: 'IVECO T-Way' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Repos' }
    ]
  },
  {
    id: 'collab-4',
    employeeNumber: 'RH-2026-104',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 's.bernard@autohub.fr',
    phone: '+33 6 34 56 78 90',
    profile: 'Magasinier',
    agency: 'Atelier Lyon - Rhône-Alpes',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 80,
    productivityScore: 95,
    skills: [
      { id: 'sk-8', name: 'Gestion des Stocks & FIFO', level: 'Expert', validatedDate: Date.now() - 86400000 * 600 },
      { id: 'sk-9', name: 'Inventaire & Logistique Pièces', level: 'Expert', validatedDate: Date.now() - 86400000 * 500 }
    ],
    certifications: [
      { id: 'cert-4', name: 'Gestion Logistique Entrepôt', issuer: 'AFPA', issueDate: Date.now() - 86400000 * 700, expiryDate: Date.now() + 86400000 * 900 }
    ],
    habilitations: [
      { id: 'hab-5', name: 'Conduite Chariots Élévateurs', level: 'CACES R489 Cat 3 & 5', issueDate: Date.now() - 86400000 * 300, expiryDate: Date.now() + 86400000 * 400, status: 'valid' }
    ],
    trainings: [
      { id: 'tr-5', title: 'Optimisation Stock Pièces Détachées', category: 'Technique', date: Date.now() - 86400000 * 100, durationHours: 12, status: 'completed', provider: 'Logistique Pro' }
    ],
    evaluations: [
      {
        id: 'ev-4',
        date: Date.now() - 86400000 * 110,
        evaluator: 'Responsable Agence Lyon',
        type: 'Bilan Annuel',
        comments: 'Zéro rupture critique constatée sur les pièces d’usure freinage et filtration. Excellent classement des stocks.',
        objectivesNextPeriod: 'Mettre en place le réapprovisionnement automatique sur seuil critique.',
        supportNeeded: 'Intégration du lecteur code-barres mobile sous Android.'
      }
    ],
    interventions: [
      { id: 'int-5', reference: 'STK-2026-112', type: 'logistics', title: 'Réception & Contrôle 45 lignes de pièces Bosch', date: Date.now() - 86400000 * 2, durationMinutes: 120, status: 'verified', clientOrVehicle: 'Stock Central' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ]
  },
  {
    id: 'collab-5',
    employeeNumber: 'RH-2026-105',
    firstName: 'Karim',
    lastName: 'Benali',
    email: 'k.benali@autohub.fr',
    phone: '+33 6 45 67 89 01',
    profile: 'Chauffeur',
    agency: 'Concession Lille - Nord',
    status: 'mission',
    availability: 'en_mission',
    workloadPercent: 95,
    productivityScore: 92,
    skills: [
      { id: 'sk-10', name: 'Conduite Super-Lourd SPL & Remorques', level: 'Expert', validatedDate: Date.now() - 86400000 * 800 },
      { id: 'sk-11', name: 'Arrimage & Sécurisation Marchandises', level: 'Expert', validatedDate: Date.now() - 86400000 * 600 }
    ],
    certifications: [
      { id: 'cert-5', name: 'FIMO / FCO Marchandises à jour', issuer: 'AFTI', issueDate: Date.now() - 86400000 * 400, expiryDate: Date.now() + 86400000 * 700 }
    ],
    habilitations: [
      { id: 'hab-6', name: 'Permis EC + ADR Base Colis', level: 'ADR Colis', issueDate: Date.now() - 86400000 * 300, expiryDate: Date.now() + 86400000 * 400, status: 'valid' }
    ],
    trainings: [
      { id: 'tr-6', title: 'Éco-conduite et Sécurité Routière', category: 'Conduite', date: Date.now() - 86400000 * 80, durationHours: 14, status: 'completed', provider: 'Transfec' }
    ],
    evaluations: [
      {
        id: 'ev-5',
        date: Date.now() - 86400000 * 140,
        evaluator: 'Responsable Flotte Lille',
        type: 'Bilan Annuel',
        comments: 'Consommation de carburant optimisée (-6% par rapport à la moyenne). Conduite très souple et respect des temps de repos.',
        objectivesNextPeriod: 'Partager les bonnes pratiques d’éco-conduite avec les nouveaux conducteurs.',
        supportNeeded: 'Aucun besoin particulier, matériel en parfait état.'
      }
    ],
    interventions: [
      { id: 'int-6', reference: 'MSN-2026-44', type: 'delivery', title: 'Livraison convoi exceptionnel pièces engins TP', date: Date.now() - 86400000 * 1, durationMinutes: 480, status: 'completed', clientOrVehicle: 'Volvo FH (AB-999-XYZ)' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Astreinte' }
    ]
  },
  {
    id: 'collab-6',
    employeeNumber: 'RH-2026-106',
    firstName: 'Élodie',
    lastName: 'Garnier',
    email: 'e.garnier@autohub.fr',
    phone: '+33 6 56 78 90 12',
    profile: 'Réceptionnaire',
    agency: 'Atelier Central - Paris',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 85,
    productivityScore: 93,
    skills: [
      { id: 'sk-12', name: 'Accueil Client & Devis Express', level: 'Expert', validatedDate: Date.now() - 86400000 * 400 },
      { id: 'sk-13', name: 'Ordonnancement Atelier & Planification', level: 'Expert', validatedDate: Date.now() - 86400000 * 300 }
    ],
    certifications: [
      { id: 'cert-6', name: 'Conseil & Relation Client Automobile', issuer: 'GNFA', issueDate: Date.now() - 86400000 * 500, expiryDate: Date.now() + 86400000 * 600 }
    ],
    habilitations: [],
    trainings: [
      { id: 'tr-7', title: 'Gestion des Réclamations & Négociation', category: 'Management', date: Date.now() - 86400000 * 45, durationHours: 16, status: 'completed', provider: 'CEGOS' }
    ],
    evaluations: [
      {
        id: 'ev-6',
        date: Date.now() - 86400000 * 75,
        evaluator: 'Chef d’atelier Paris',
        type: 'Point trimestriel',
        comments: 'Taux de satisfaction client élevé (4.8/5). Très bonne organisation des fiches d’accueil et états des lieux.',
        objectivesNextPeriod: 'Accélérer le processus de signature numérique des devis.',
        supportNeeded: 'Tablette tactile supplémentaire pour les états des lieux sur parc.'
      }
    ],
    interventions: [
      { id: 'int-7', reference: 'RCP-2026-210', type: 'inspection', title: 'Réception véhicule et état des lieux contradictoire', date: Date.now() - 86400000 * 2, durationMinutes: 45, status: 'completed', clientOrVehicle: 'Transport & Logistique de l’Ouest' }
    ],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ]
  },
  {
    id: 'collab-7',
    employeeNumber: 'RH-2026-107',
    firstName: 'Philippe',
    lastName: 'Rousseau',
    email: 'p.rousseau@autohub.fr',
    phone: '+33 6 67 89 01 23',
    profile: 'Responsable de parc',
    agency: 'Atelier Central - Paris',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 80,
    productivityScore: 90,
    skills: [
      { id: 'sk-14', name: 'Gestion de Flotte & TCO', level: 'Expert', validatedDate: Date.now() - 86400000 * 900 },
      { id: 'sk-15', name: 'Suivi CT & Conformité Réglementaire', level: 'Expert', validatedDate: Date.now() - 86400000 * 700 }
    ],
    certifications: [
      { id: 'cert-7', name: 'Fleet Manager Certification', issuer: 'CNPA', issueDate: Date.now() - 86400000 * 800, expiryDate: Date.now() + 86400000 * 400 }
    ],
    habilitations: [],
    trainings: [
      { id: 'tr-8', title: 'Transition Énergétique des Flottes Professionnelles', category: 'Management', date: Date.now() - 86400000 * 100, durationHours: 14, status: 'completed', provider: 'IDPC' }
    ],
    evaluations: [
      {
        id: 'ev-7',
        date: Date.now() - 86400000 * 180,
        evaluator: 'Directeur Général',
        type: 'Bilan Annuel',
        comments: 'Parc véhicules maintenu à 96.5% de disponibilité opérationnelle. Excellent suivi des échéances de contrôle technique.',
        objectivesNextPeriod: 'Intégrer 15 utilitaires électriques supplémentaires et optimiser les recharges.',
        supportNeeded: 'Validation du budget bornes de recharge pour l’agence.'
      }
    ],
    interventions: [],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ]
  },
  {
    id: 'collab-8',
    employeeNumber: 'RH-2026-108',
    firstName: 'Nathalie',
    lastName: 'Dupond',
    email: 'n.dupond@autohub.fr',
    phone: '+33 6 78 90 12 34',
    profile: "Responsable d'agence",
    agency: 'Atelier Lyon - Rhône-Alpes',
    status: 'active',
    availability: 'disponible',
    workloadPercent: 90,
    productivityScore: 96,
    skills: [
      { id: 'sk-16', name: 'Pilotage P&L & Gestion Centre de Coût', level: 'Expert', validatedDate: Date.now() - 86400000 * 1000 },
      { id: 'sk-17', name: 'Management Opérationnel Multi-métiers', level: 'Expert', validatedDate: Date.now() - 86400000 * 800 }
    ],
    certifications: [
      { id: 'cert-8', name: 'Executive MBA Management Industriel', issuer: 'IAE Lyon', issueDate: Date.now() - 86400000 * 1200, expiryDate: Date.now() + 86400000 * 1500 }
    ],
    habilitations: [],
    trainings: [
      { id: 'tr-9', title: 'Management Sécurité & Prévention des Risques', category: 'Sécurité', date: Date.now() - 86400000 * 90, durationHours: 21, status: 'completed', provider: 'CARSAT' }
    ],
    evaluations: [
      {
        id: 'ev-8',
        date: Date.now() - 86400000 * 200,
        evaluator: 'Direction des Opérations',
        type: 'Bilan Annuel',
        comments: 'Agence Lyon performante avec une croissance de la marge brute atelier de +14%. Climat social constructif.',
        objectivesNextPeriod: 'Renforcer l’équipe de mécaniciens poids lourds et développer le portefeuille grands comptes régionaux.',
        supportNeeded: 'Recrutement d’un mécanicien supplémentaire au T4.'
      }
    ],
    interventions: [],
    schedule: [
      { day: 'Lundi', shift: 'Journée (08h-17h)' },
      { day: 'Mardi', shift: 'Journée (08h-17h)' },
      { day: 'Mercredi', shift: 'Journée (08h-17h)' },
      { day: 'Jeudi', shift: 'Journée (08h-17h)' },
      { day: 'Vendredi', shift: 'Journée (08h-17h)' }
    ]
  }
];

export const operationalProfilesList = [
  'Technicien',
  'Mécanicien',
  'Électricien automobile',
  'Magasinier',
  'Chauffeur',
  "Chef d'atelier",
  'Réceptionnaire',
  'Responsable de parc',
  "Responsable d'agence",
  'Commercial',
  'Gestionnaire de flotte'
];
