import React, { useState } from 'react';
import { 
  FileText, Download, Printer, Calendar, Filter, Search, CheckCircle2, 
  BarChart3, Car, Wrench, Fuel, DollarSign, Package, ShoppingBag, 
  Building2, Layers, ArrowUpRight, ArrowDownRight, Clock, ShieldAlert,
  FileSpreadsheet, FileCode
} from 'lucide-react';

interface ReportDefinition {
  id: string;
  title: string;
  category: 'Atelier & Maintenance' | 'Flotte & Opérations' | 'Finances & Achats' | 'Commercial & Agences';
  description: string;
  icon: any;
  frequency: string;
  metrics: { label: string; value: string; trend?: string }[];
  columns: string[];
  sampleData: Array<Record<string, any>>;
}

export function ReportsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<string>('Toutes les agences');
  const [dateRange, setDateRange] = useState<string>('Mois en cours (Septembre 2026)');
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const reportsList: ReportDefinition[] = [
    {
      id: 'quotidien-atelier',
      title: "Rapport quotidien d'atelier",
      category: 'Atelier & Maintenance',
      description: "Suivi en temps réel des ordres de réparation (OR) ouverts, clôturés, taux d'occupation des mécaniciens et incidents du jour.",
      icon: Wrench,
      frequency: 'Quotidien',
      metrics: [
        { label: 'OR Ouverts', value: '12', trend: '+2 vs hier' },
        { label: 'OR Clôturés', value: '8', trend: '100% respect SLA' },
        { label: 'Charge Atelier', value: '85.4%', trend: 'Optimal' }
      ],
      columns: ['N° OR', 'Véhicule / Immat', 'Client / Affectation', 'Intervention', 'Technicien', 'Statut', 'Heures'],
      sampleData: [
        { id: 'OR-2026-891', vehicle: 'Renault Master (AB-123-CD)', client: 'Logistique Express', type: 'Révision Générale 50k', tech: 'Marc D.', status: 'En cours', hours: '4.5h' },
        { id: 'OR-2026-892', vehicle: 'Peugeot Expert (EF-456-GH)', client: 'BTP Rhône', type: 'Remplacement Freinage', tech: 'Thomas L.', status: 'En attente pièces', hours: '2.0h' },
        { id: 'OR-2026-893', vehicle: 'Mercedes Sprinter (IJ-789-KL)', client: 'Interne Flotte', type: 'Diagnostic Injection', tech: 'Karim B.', status: 'Terminé', hours: '3.0h' },
        { id: 'OR-2026-894', vehicle: 'Citroën Jumper (MN-012-OP)', client: 'Livraisons Rapides', type: 'Contrôle Technique', tech: 'Marc D.', status: 'En cours', hours: '1.5h' }
      ]
    },
    {
      id: 'hebdomadaire-maintenance',
      title: "Rapport hebdomadaire de maintenance",
      category: 'Atelier & Maintenance',
      description: "Synthèse des entretiens préventifs et curatifs réalisés sur les 7 derniers jours avec analyse des pannes récurrentes.",
      icon: Calendar,
      frequency: 'Hebdomadaire',
      metrics: [
        { label: 'Interventions Réalisées', value: '34', trend: '-12% pannes' },
        { label: 'Coût Total Pièces', value: '12,450 €', trend: '-5.2%' },
        { label: 'Disponibilité Moyenne', value: '88.2%', trend: '+1.4%' }
      ],
      columns: ['Semaine', 'Interventions Préventives', 'Interventions Correctives', 'Coût Pièces (€)', 'Temps Indispo. Moyen', 'Taux Conformité'],
      sampleData: [
        { week: 'S37 (Sep 2026)', preventive: 22, corrective: 12, cost: '12,450 €', downtime: '4.2h', compliance: '98.5%' },
        { week: 'S36 (Sep 2026)', preventive: 25, corrective: 16, cost: '14,100 €', downtime: '5.1h', compliance: '96.2%' },
        { week: 'S35 (Août 2026)', preventive: 20, corrective: 14, cost: '11,800 €', downtime: '4.0h', compliance: '97.8%' }
      ]
    },
    {
      id: 'mensuel-parc',
      title: "Rapport mensuel de parc automobile",
      category: 'Flotte & Opérations',
      description: "Inventaire complet du parc, entrées/sorties de flotte, taux d'utilisation, kilométrage moyen et vieillissement des véhicules.",
      icon: Car,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Flotte Totale', value: '42 unités', trend: '+2 ce mois' },
        { label: 'Kilométrage Global', value: '142,500 km', trend: 'Moyen 3,390 km/v' },
        { label: 'Taux Utilisation', value: '82.6%', trend: 'Optimal' }
      ],
      columns: ['Catégorie', 'Nombre Unités', 'Actifs en Mission', 'En Atelier', 'KM Moyen / Mois', 'Valeur Estimée'],
      sampleData: [
        { category: 'Utilitaires Légers (Fourgons)', count: 18, active: 15, workshop: 3, km: '3,800 km', value: '540,000 €' },
        { category: 'Poids Lourds 12T - 19T', count: 12, active: 10, workshop: 2, km: '4,500 km', value: '1,200,000 €' },
        { category: 'Véhicules de Liaison (Berlines)', count: 8, active: 7, workshop: 1, km: '2,100 km', value: '240,000 €' },
        { category: 'Engins Spécifiques BTP', count: 4, active: 3, workshop: 1, km: '1,200 km', value: '480,000 €' }
      ]
    },
    {
      id: 'consommation-carburant',
      title: "Rapport de consommation de carburant",
      category: 'Flotte & Opérations',
      description: "Suivi des volumes de carburant consommés par véhicule, détection des surconsommations et indexation des pleins carte carburant.",
      icon: Fuel,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Volume Total', value: '18,450 L', trend: '-3.8% vs M-1' },
        { label: 'Coût Carburant', value: '31,365 €', trend: '1.70 €/L moy' },
        { label: 'Consommation Moy.', value: '11.8 L / 100km', trend: 'Conforme' }
      ],
      columns: ['Véhicule', 'Chauffeur / Affectation', 'Litres Consommés', 'Coût Total (€)', 'Conso L/100km', 'Écart vs Norme'],
      sampleData: [
        { vehicle: 'Renault Master (AB-123-CD)', driver: 'Équipe Logistique A', liters: '1,450 L', cost: '2,465 €', consumption: '10.5 L', variance: '-0.5 L' },
        { vehicle: 'Mercedes Actros (GH-789-JK)', driver: 'Pôle Transport Nord', liters: '4,200 L', cost: '7,140 €', consumption: '28.2 L', variance: '+1.2 L' },
        { vehicle: 'Peugeot Expert (EF-456-GH)', driver: 'Service Commercial', liters: '820 L', cost: '1,394 €', consumption: '7.8 L', variance: '0.0 L' },
        { vehicle: 'Iveco Daily (XY-987-ZT)', driver: 'Chantier Lyon', liters: '2,100 L', cost: '3,570 €', consumption: '12.4 L', variance: '+0.3 L' }
      ]
    },
    {
      id: 'couts-vehicule',
      title: "Rapport de coûts par véhicule",
      category: 'Finances & Achats',
      description: "Analyse globale du TCO (Total Cost of Ownership) intégrant amortissement, maintenance, carburant, assurances et taxes par immatriculation.",
      icon: DollarSign,
      frequency: 'Mensuel',
      metrics: [
        { label: 'TCO Moyen Global', value: '1,420 € / mois', trend: 'Par véhicule' },
        { label: 'Poste le plus lourd', value: 'Maintenance (38%)', trend: 'Suivi serré' },
        { label: 'Économies Réalisées', value: '8,400 €', trend: 'Optimisation' }
      ],
      columns: ['Immatriculation', 'Modèle', 'Coût Acquisition', 'Coût Maintenance', 'Carburant', 'TCO Mensuel Total'],
      sampleData: [
        { immat: 'AB-123-CD', model: 'Renault Master L3H2', acquisition: '450 €', maintenance: '320 €', fuel: '380 €', tco: '1,150 €' },
        { immat: 'GH-789-JK', model: 'Mercedes Actros 1845', acquisition: '1,400 €', maintenance: '950 €', fuel: '1,190 €', tco: '3,540 €' },
        { immat: 'EF-456-GH', model: 'Peugeot Expert Standard', acquisition: '380 €', maintenance: '180 €', fuel: '232 €', tco: '792 €' },
        { immat: 'XY-987-ZT', model: 'Iveco Daily 35S18', acquisition: '520 €', maintenance: '410 €', fuel: '595 €', tco: '1,525 €' }
      ]
    },
    {
      id: 'pieces-utilisees',
      title: "Rapport des pièces utilisées",
      category: 'Atelier & Maintenance',
      description: "Mouvement des pièces détachées sorties du magasin, rotation des stocks, pièces critiques et valorisation des consommations atelier.",
      icon: Package,
      frequency: 'Hebdomadaire / Mensuel',
      metrics: [
        { label: 'Références Sorties', value: '312 réf.', trend: 'Ce mois' },
        { label: 'Valeur Consommée', value: '28,450 €', trend: '-2.1%' },
        { label: 'Taux de Rupture', value: '1.2%', trend: 'Excellent (<2%)' }
      ],
      columns: ['Code Pièce', 'Désignation Article', 'Catégorie', 'Qté Consommée', 'Prix Unitaire', 'Valeur Totale'],
      sampleData: [
        { code: 'FR-OIL-5W30', name: 'Huile Moteur 5W30 (Bidon 5L)', cat: 'Lubrifiants', qty: 48, unit: '38.50 €', total: '1,848 €' },
        { code: 'BRK-PAD-FRT', name: 'Jeu de Plaquettes de Frein AV', cat: 'Freinage', qty: 26, unit: '85.00 €', total: '2,210 €' },
        { code: 'FLT-AIR-HD', name: 'Filtre à Air Haute Densité', cat: 'Filtration', qty: 34, unit: '24.20 €', total: '822.80 €' },
        { code: 'BAT-12V-110', name: 'Batterie 12V 110Ah Renforcée', cat: 'Électrique', qty: 12, unit: '165.00 €', total: '1,980 €' }
      ]
    },
    {
      id: 'immobilisations',
      title: "Rapport des immobilisations",
      category: 'Flotte & Opérations',
      description: "Suivi détaillé des véhicules et équipements immobilisés en atelier (panne, accident, attente pièces) et impact sur l'activité.",
      icon: ShieldAlert,
      frequency: 'Quotidien / Hebdomadaire',
      metrics: [
        { label: 'Véhicules Immo.', value: '6 unités', trend: '14.3% du parc' },
        { label: 'Durée Moy. Immo.', value: '38.5 heures', trend: 'Objectif < 36h' },
        { label: 'Coût d\'Inactivité', value: '14,200 €', trend: 'Estimé' }
      ],
      columns: ['Véhicule', 'Agence Rattachement', 'Motif Immobilisation', 'Date Début', 'Durée Actuelle', 'Statut Réparation'],
      sampleData: [
        { vehicle: 'Renault Master (AB-123-CD)', agency: 'Paris Central', motif: 'Panne Boîte de Vitesses', date: '14/09/2026', duration: '42h', status: 'En attente pièce (Arrivée demain)' },
        { vehicle: 'Iveco Daily (XY-987-ZT)', agency: 'Lyon Rhône-Alpes', motif: 'Accrochage Carrosserie', date: '13/09/2026', duration: '58h', status: 'En cours de peinture' },
        { vehicle: 'Mercedes Sprinter (OP-456-RS)', agency: 'Concession Lille', motif: 'Défaut Injection Électronique', date: '15/09/2026', duration: '18h', status: 'Diagnostic valise en cours' }
      ]
    },
    {
      id: 'rentabilite',
      title: "Rapport de rentabilité",
      category: 'Finances & Achats',
      description: "Compte de résultat analytique par véhicule, par contrat de location et par agence régionale.",
      icon: BarChart3,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Chiffre d\'Affaires', value: '189,500 €', trend: '+12.4%' },
        { label: 'Marge Opérationnelle', value: '34.2%', trend: '+2.1 pts' },
        { label: 'Bénéfice Net Estimé', value: '64,850 €', trend: 'Solide' }
      ],
      columns: ['Centre de Profit / Agence', 'Chiffre d\'Affaires (€)', 'Coûts Totaux (€)', 'Marge Brute (€)', 'Taux de Marge (%)', 'Évaluation'],
      sampleData: [
        { center: 'Paris Central (Atelier + Loc)', ca: 85400, costs: 51200, margin: 34200, rate: '40.0%', eval: 'Excellent' },
        { center: 'Lyon Rhône-Alpes', ca: 54200, costs: 36100, margin: 18100, rate: '33.4%', eval: 'Bon' },
        { center: 'Concession Lille - Nord', ca: 34900, costs: 24500, margin: 10400, rate: '29.8%', eval: 'Stable' },
        { center: 'Agence Abidjan - CI', ca: 15000, costs: 9800, margin: 5200, rate: '34.6%', eval: 'En croissance' }
      ]
    },
    {
      id: 'contrats-location',
      title: "Rapport des contrats de location",
      category: 'Commercial & Agences',
      description: "État des contrats de location courte et longue durée (LDD), échéances de renouvellement, impayés et taux d'occupation des flottes louées.",
      icon: FileText,
      frequency: 'Hebdomadaire',
      metrics: [
        { label: 'Contrats Actifs', value: '31 contrats', trend: 'Taux occup. 88%' },
        { label: 'Facturation Périodique', value: '78,400 € / mois', trend: 'Régulier' },
        { label: 'Échéances ce Mois', value: '4 contrats', trend: 'À renouveler' }
      ],
      columns: ['N° Contrat', 'Client', 'Véhicule Loué', 'Type (LCD/LDD)', 'Date Fin', 'Montant Mensuel', 'Statut Paiement'],
      sampleData: [
        { num: 'CTR-2026-401', client: 'BTP Grand Paris', vehicle: 'Renault Master Benne', type: 'LDD (36 mois)', date: '30/11/2026', amount: '1,450 €', status: 'À jour' },
        { num: 'CTR-2026-402', client: 'Transports Express 59', vehicle: 'Mercedes Actros 1845', type: 'LCD (3 mois)', date: '15/10/2026', amount: '3,800 €', status: 'À jour' },
        { num: 'CTR-2026-403', client: 'Électronique Rhône', vehicle: 'Peugeot Expert', type: 'LDD (24 mois)', date: '12/09/2026', amount: '890 €', status: 'En attente virement' }
      ]
    },
    {
      id: 'ventes-automobiles',
      title: "Rapport des ventes automobiles",
      category: 'Commercial & Agences',
      description: "Suivi du volume de véhicules neufs et d'occasion vendus en concession, marges commerciales et commissions vendeurs.",
      icon: ShoppingBag,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Véhicules Vendus', value: '14 unités', trend: '+18% vs M-1' },
        { label: 'CA Ventes', value: '412,000 €', trend: 'Moy 29.4k/veh' },
        { label: 'Marge Commerciale', value: '54,600 €', trend: '13.2%' }
      ],
      columns: ['N° Vente', 'Véhicule / Modèle', 'Acquéreur', 'Commercial', 'Prix Vente TTC', 'Marge Réalisée', 'Date Facture'],
      sampleData: [
        { num: 'VNT-901', vehicle: 'Renault Master Neuf Cabine', buyer: 'Entreprise BTP Sud', commercial: 'Alexandre M.', price: '42,500 €', margin: '5,800 €', date: '14/09/2026' },
        { num: 'VNT-902', vehicle: 'Peugeot 3008 Occasion Révisée', buyer: 'M. Jean Dupont', commercial: 'Sophie V.', price: '24,900 €', margin: '3,200 €', date: '12/09/2026' },
        { num: 'VNT-903', vehicle: 'Citroën Jumper Plateau', buyer: 'Artisans Associés', commercial: 'Alexandre M.', price: '36,200 €', margin: '4,500 €', date: '10/09/2026' }
      ]
    },
    {
      id: 'achats',
      title: "Rapport des achats",
      category: 'Finances & Achats',
      description: "État des commandes fournisseurs, pièces détachées, prestations sous-traitées et respect des budgets d'approvisionnement.",
      icon: Layers,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Commandes Passées', value: '28 commandes', trend: 'Ce mois' },
        { label: 'Montant Global Achats', value: '48,200 €', trend: 'Dans le budget' },
        { label: 'Délai Moyen Livraison', value: '2.4 jours', trend: 'Rapide' }
      ],
      columns: ['N° Commande', 'Fournisseur', 'Catégorie Achat', 'Montant TTC (€)', 'Délai Constaté', 'Statut Livraison'],
      sampleData: [
        { num: 'CMD-501', supplier: 'Bosch Automotive France', cat: 'Pièces & Freinage', amount: '8,450 €', delay: '2 jours', status: 'Livré & Validé' },
        { num: 'CMD-502', supplier: 'TotalEnergies Cartes', cat: 'Carburant Vrac', amount: '15,200 €', delay: 'Immédiat', status: 'Livré & Validé' },
        { num: 'CMD-503', supplier: 'Michelin Pneumatiques', cat: 'Pneumatiques', amount: '12,100 €', delay: '3 jours', status: 'En cours de livraison' }
      ]
    },
    {
      id: 'performance-agences',
      title: "Rapport de performance des agences",
      category: 'Commercial & Agences',
      description: "Classement comparatif des 4 agences régionales (Paris, Lyon, Lille, Abidjan) sur les axes financiers, opérationnels et qualité de service.",
      icon: Building2,
      frequency: 'Mensuel',
      metrics: [
        { label: 'Agence Leader', value: 'Paris Central', trend: '45% du CA Groupe' },
        { label: 'Meilleure Croissance', value: 'Abidjan CI', trend: '+18.5% ce mois' },
        { label: 'Disponibilité Globale', value: '85.7%', trend: 'Moyenne réseau' }
      ],
      columns: ['Agence Régionale', 'Chiffre d\'Affaires', 'Taux Disponibilité', 'OR Traités', 'Satisfaction Client', 'Score Global'],
      sampleData: [
        { agency: 'Paris Central (Siège & Atelier)', ca: '85,400 €', availability: '90.0%', orders: 142, satisfaction: '4.8 / 5', score: '94 / 100' },
        { agency: 'Lyon Rhône-Alpes', ca: '54,200 €', availability: '83.3%', orders: 98, satisfaction: '4.6 / 5', score: '88 / 100' },
        { agency: 'Concession Lille - Nord', ca: '34,900 €', availability: '80.0%', orders: 74, satisfaction: '4.5 / 5', score: '84 / 100' },
        { agency: 'Agence Abidjan - Côte d’Ivoire', ca: '15,000 €', availability: '100.0%', orders: 32, satisfaction: '4.9 / 5', score: '96 / 100' }
      ]
    }
  ];

  const categories = ['Tous', 'Atelier & Maintenance', 'Flotte & Opérations', 'Finances & Achats', 'Commercial & Agences'];

  const filteredReports = reportsList.filter(rep => {
    const matchesCategory = selectedCategory === 'Tous' || rep.category === selectedCategory;
    const matchesSearch = rep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rep.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeReport = reportsList.find(r => r.id === activeReportId);

  // Trigger export handlers
  const handleExport = (report: ReportDefinition, format: 'PDF' | 'Excel' | 'CSV') => {
    setIsExporting(report.id + format);
    setTimeout(() => {
      setIsExporting(null);
      if (format === 'CSV' || format === 'Excel') {
        const headers = report.columns.join(';');
        const rows = report.sampleData.map(row => Object.values(row).join(';')).join('\n');
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(`${headers}\n${rows}`);
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${report.id}_${new Date().toISOString().slice(0, 10)}.${format === 'Excel' ? 'xls' : 'csv'}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setToastMessage(`Export ${format} réussi pour "${report.title}" !`);
      } else {
        window.print();
        setToastMessage(`Génération du PDF pour "${report.title}" lancée avec succès !`);
      }
      setTimeout(() => setToastMessage(null), 4000);
    }, 800);
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-2">
            <BarChart3 size={16} />
            <span>Centre de Reporting & Intelligence d'Entreprise</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-navy-main">Rapports et Exportations</h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            Générez, consultez et exportez l'ensemble des 12 rapports opérationnels, financiers et techniques d'AutoHub Enterprise.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-2">
            <Building2 size={16} className="text-slate-400" />
            <select 
              value={selectedAgency} 
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="bg-transparent text-sm font-bold text-navy-main focus:outline-none cursor-pointer"
            >
              <option>Toutes les agences</option>
              <option>Atelier Central - Paris</option>
              <option>Atelier Lyon - Rhône-Alpes</option>
              <option>Concession Lille - Nord</option>
              <option>Agence Abidjan - Côte d’Ivoire</option>
            </select>
          </div>

          <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-2">
            <Calendar size={16} className="text-slate-400" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm font-bold text-navy-main focus:outline-none cursor-pointer"
            >
              <option>Mois en cours (Septembre 2026)</option>
              <option>Mois dernier (Août 2026)</option>
              <option>Trimestre Q3 2026</option>
              <option>Année 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* If an active report is selected, show detail view */}
      {activeReport ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden animate-fadeIn">
          {/* Report Detail Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                <activeReport.icon size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">{activeReport.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-semibold">{activeReport.frequency}</span>
                </div>
                <h2 className="text-2xl font-black text-navy-main mt-0.5">{activeReport.title}</h2>
                <p className="text-xs text-slate-500 mt-1">{activeReport.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button 
                onClick={() => setActiveReportId(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-300 transition-colors"
              >
                ← Retour à la liste
              </button>
              
              <button 
                onClick={() => handleExport(activeReport, 'PDF')}
                disabled={isExporting !== null}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-all flex items-center gap-2 shadow-sm"
              >
                <Printer size={15} /> Export PDF
              </button>

              <button 
                onClick={() => handleExport(activeReport, 'Excel')}
                disabled={isExporting !== null}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm"
              >
                <FileSpreadsheet size={15} /> Export Excel
              </button>

              <button 
                onClick={() => handleExport(activeReport, 'CSV')}
                disabled={isExporting !== null}
                className="px-4 py-2 bg-navy-main text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm"
              >
                <FileCode size={15} /> Export CSV
              </button>
            </div>
          </div>

          {/* Report Metrics Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-100/60 border-b border-slate-200/60">
            {activeReport.metrics.map((m, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-black text-navy-main">{m.value}</span>
                  {m.trend && (
                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg">
                      {m.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-navy-main uppercase tracking-wider">Aperçu des données consolidées ({selectedAgency})</h3>
              <span className="text-xs text-slate-500 font-medium">Période : {dateRange}</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    {activeReport.columns.map((col, cIdx) => (
                      <th key={cIdx} className="p-4">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {activeReport.sampleData.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                      {Object.values(row).map((val: any, vIdx) => (
                        <td key={vIdx} className="p-4 text-slate-700 font-medium">
                          {vIdx === 0 ? <strong className="text-navy-main">{val}</strong> : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-slate-400">Ce rapport inclut les données en temps réel enregistrées dans AutoHub Enterprise.</p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleExport(activeReport, 'Excel')}
                  className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Download size={16} /> Télécharger le rapport complet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-navy-main text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Rechercher un rapport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-orange shadow-sm"
              />
            </div>
          </div>

          {/* 12 Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const Icon = report.icon;
              return (
                <div 
                  key={report.id}
                  onClick={() => setActiveReportId(report.id)}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-orange/50 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all">
                        <Icon size={24} />
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">
                        {report.frequency}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">{report.category}</span>
                    <h3 className="text-lg font-black text-navy-main mt-1 group-hover:text-brand-orange transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Prêt pour export</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
                      Consulter & Exporter →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
