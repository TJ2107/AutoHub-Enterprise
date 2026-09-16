import React, { useState } from 'react';
import { 
  Database, Server, Layers, GitBranch, ShieldCheck, CheckCircle2, 
  FileText, Users, Building2, Car, Wrench, Package, DollarSign, 
  KeyRound, Search, ExternalLink, ArrowRight, Table, Cpu, Lock
} from 'lucide-react';

interface EntityMeta {
  name: string;
  frenchName: string;
  category: 'Gouvernance & Acteurs' | 'Flotte & Véhicules' | 'Atelier & Maintenance' | 'Stocks & Achats' | 'Commercial & Financier' | 'Traçabilité & Logs';
  description: string;
  relations: string[];
  fields: { name: string; type: string; constraint: string }[];
}

const ENTITIES_CATALOG: EntityMeta[] = [
  {
    name: 'User',
    frenchName: 'Utilisateurs',
    category: 'Gouvernance & Acteurs',
    description: 'Comptes d’accès au système avec rôles RBAC, rattachement agence et double authentification.',
    relations: ['Agency', 'AuditLog', 'Notification'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK, Unique' },
      { name: 'agencyId', type: 'UUID', constraint: 'FK -> Agency' },
      { name: 'email', type: 'String', constraint: 'Unique, Indexed' },
      { name: 'role', type: 'Enum', constraint: 'Not Null (12 rôles)' },
      { name: 'status', type: 'Enum', constraint: 'ACTIVE, INACTIVE' }
    ]
  },
  {
    name: 'Organization',
    frenchName: 'Organisations',
    category: 'Gouvernance & Acteurs',
    description: 'Entité juridique faîtière du groupe AutoHub Enterprise.',
    relations: ['Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'name', type: 'String', constraint: 'Not Null' },
      { name: 'siret', type: 'String', constraint: 'Unique (14 chars)' },
      { name: 'vatNumber', type: 'String', constraint: 'Valid VAT' }
    ]
  },
  {
    name: 'Agency',
    frenchName: 'Agences',
    category: 'Gouvernance & Acteurs',
    description: 'Implantations géographiques (Paris, Lyon, Lille, Abidjan) gérant les stocks et ateliers.',
    relations: ['Organization', 'User', 'Vehicle', 'StockMovement', 'Purchase', 'Contract', 'Invoice'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'organizationId', type: 'UUID', constraint: 'FK -> Organization' },
      { name: 'code', type: 'String', constraint: 'Unique (ex: PAR-01)' },
      { name: 'city', type: 'String', constraint: 'Not Null' }
    ]
  },
  {
    name: 'Customer',
    frenchName: 'Clients',
    category: 'Commercial & Financier',
    description: 'Clients B2B (flottes d’entreprise) et B2C (particuliers).',
    relations: ['Agency', 'Contact', 'Contract', 'Quote', 'Invoice'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'agencyId', type: 'UUID', constraint: 'FK -> Agency' },
      { name: 'type', type: 'Enum', constraint: 'B2B, B2C' },
      { name: 'creditLimit', type: 'Decimal', constraint: '>= 0' }
    ]
  },
  {
    name: 'Contact',
    frenchName: 'Contacts',
    category: 'Commercial & Financier',
    description: 'Interlocuteurs rattachés aux clients professionnels.',
    relations: ['Customer'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'customerId', type: 'UUID', constraint: 'FK -> Customer' },
      { name: 'email', type: 'String', constraint: 'Valid Format' }
    ]
  },
  {
    name: 'Vehicle',
    frenchName: 'Véhicules',
    category: 'Flotte & Véhicules',
    description: 'Parc automobile complet (VL, VU, Poids Lourds).',
    relations: ['Agency', 'RepairOrder', 'MaintenancePlan', 'Rental', 'Mission', 'Fuel'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'agencyId', type: 'UUID', constraint: 'FK -> Agency' },
      { name: 'plateNumber', type: 'String', constraint: 'Unique' },
      { name: 'vin', type: 'String', constraint: 'Unique (17 chars)' },
      { name: 'currentMileage', type: 'Integer', constraint: '>= 0' }
    ]
  },
  {
    name: 'Equipment',
    frenchName: 'Équipements',
    category: 'Flotte & Véhicules',
    description: 'Outillages d’atelier et ponts élévateurs.',
    relations: ['Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'serialNumber', type: 'String', constraint: 'Unique' },
      { name: 'status', type: 'Enum', constraint: 'OPERATIONAL, MAINTENANCE' }
    ]
  },
  {
    name: 'Driver',
    frenchName: 'Conducteurs',
    category: 'Flotte & Véhicules',
    description: 'Conducteurs et chauffeurs habilités sur les missions.',
    relations: ['User', 'Agency', 'Rental', 'Mission', 'Fuel'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'userId', type: 'UUID', constraint: 'FK -> User' },
      { name: 'licenseNumber', type: 'String', constraint: 'Unique' }
    ]
  },
  {
    name: 'Technician',
    frenchName: 'Techniciens',
    category: 'Atelier & Maintenance',
    description: 'Mécaniciens et techniciens d’atelier habilités.',
    relations: ['User', 'Agency', 'RepairOrder', 'Intervention'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'userId', type: 'UUID', constraint: 'FK -> User' },
      { name: 'hourlyRate', type: 'Decimal', constraint: '> 0' }
    ]
  },
  {
    name: 'RepairOrder',
    frenchName: 'Ordres de réparation',
    category: 'Atelier & Maintenance',
    description: 'Ordres de réparation (OR) gérant le diagnostic et les interventions atelier.',
    relations: ['Agency', 'Vehicle', 'Technician', 'Intervention'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'vehicleId', type: 'UUID', constraint: 'FK -> Vehicle' },
      { name: 'status', type: 'Enum', constraint: 'OPEN, IN_PROGRESS, COMPLETED' }
    ]
  },
  {
    name: 'MaintenancePlan',
    frenchName: 'Plans de maintenance',
    category: 'Atelier & Maintenance',
    description: 'Calendriers d’entretiens préventifs basés sur le kilométrage et le temps.',
    relations: ['Vehicle'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'vehicleId', type: 'UUID', constraint: 'FK -> Vehicle' },
      { name: 'intervalKm', type: 'Integer', constraint: '> 0' }
    ]
  },
  {
    name: 'Intervention',
    frenchName: 'Interventions',
    category: 'Atelier & Maintenance',
    description: 'Lignes de travaux et temps de main-d’œuvre sur les OR.',
    relations: ['RepairOrder', 'Technician'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'repairOrderId', type: 'UUID', constraint: 'FK -> RepairOrder' },
      { name: 'laborHours', type: 'Decimal', constraint: '>= 0' }
    ]
  },
  {
    name: 'Part',
    frenchName: 'Pièces',
    category: 'Stocks & Achats',
    description: 'Catalogue des pièces détachées et consommables atelier.',
    relations: ['StockMovement'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'partNumber', type: 'String', constraint: 'Unique' },
      { name: 'stockQuantity', type: 'Integer', constraint: '>= 0' }
    ]
  },
  {
    name: 'StockMovement',
    frenchName: 'Mouvements de stock',
    category: 'Stocks & Achats',
    description: 'Traçabilité des entrées, sorties et ajustements de stock.',
    relations: ['Part', 'Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'partId', type: 'UUID', constraint: 'FK -> Part' },
      { name: 'type', type: 'Enum', constraint: 'IN, OUT, ADJUSTMENT' }
    ]
  },
  {
    name: 'Supplier',
    frenchName: 'Fournisseurs',
    category: 'Stocks & Achats',
    description: 'Fournisseurs de pièces et équipements.',
    relations: ['Purchase'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'name', type: 'String', constraint: 'Not Null' }
    ]
  },
  {
    name: 'Purchase',
    frenchName: 'Achats',
    category: 'Stocks & Achats',
    description: 'Commandes d’approvisionnement auprès des fournisseurs.',
    relations: ['Supplier', 'Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'supplierId', type: 'UUID', constraint: 'FK -> Supplier' },
      { name: 'totalAmount', type: 'Decimal', constraint: '>= 0' }
    ]
  },
  {
    name: 'Contract',
    frenchName: 'Contrats',
    category: 'Commercial & Financier',
    description: 'Contrats de location longue durée (LDD) ou courte durée (LCD).',
    relations: ['Customer', 'Agency', 'Rental'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'customerId', type: 'UUID', constraint: 'FK -> Customer' },
      { name: 'contractNumber', type: 'String', constraint: 'Unique' }
    ]
  },
  {
    name: 'Rental',
    frenchName: 'Locations',
    category: 'Flotte & Véhicules',
    description: 'Suivi des attributions de véhicules en location.',
    relations: ['Contract', 'Vehicle', 'Driver'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'contractId', type: 'UUID', constraint: 'FK -> Contract' },
      { name: 'vehicleId', type: 'UUID', constraint: 'FK -> Vehicle' }
    ]
  },
  {
    name: 'Mission',
    frenchName: 'Missions',
    category: 'Flotte & Véhicules',
    description: 'Ordres de mission et trajets logistiques des chauffeurs.',
    relations: ['Driver', 'Vehicle'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'driverId', type: 'UUID', constraint: 'FK -> Driver' },
      { name: 'vehicleId', type: 'UUID', constraint: 'FK -> Vehicle' }
    ]
  },
  {
    name: 'Fuel',
    frenchName: 'Carburant',
    category: 'Flotte & Véhicules',
    description: 'Relevés de consommation de carburant et pleins.',
    relations: ['Vehicle', 'Driver', 'Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'vehicleId', type: 'UUID', constraint: 'FK -> Vehicle' },
      { name: 'liters', type: 'Decimal', constraint: '> 0' }
    ]
  },
  {
    name: 'Quote',
    frenchName: 'Devis',
    category: 'Commercial & Financier',
    description: 'Devis commerciaux émis pour les clients.',
    relations: ['Customer', 'Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'quoteNumber', type: 'String', constraint: 'Unique' },
      { name: 'totalHt', type: 'Decimal', constraint: '>= 0' }
    ]
  },
  {
    name: 'Invoice',
    frenchName: 'Factures',
    category: 'Commercial & Financier',
    description: 'Facturation clients et suivi des règlements.',
    relations: ['Customer', 'Agency', 'Payment'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'invoiceNumber', type: 'String', constraint: 'Unique' },
      { name: 'totalTtc', type: 'Decimal', constraint: '>= 0' }
    ]
  },
  {
    name: 'Payment',
    frenchName: 'Paiements',
    category: 'Commercial & Financier',
    description: 'Règlements reçus affectés aux factures.',
    relations: ['Invoice'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'invoiceId', type: 'UUID', constraint: 'FK -> Invoice' },
      { name: 'amount', type: 'Decimal', constraint: '> 0' }
    ]
  },
  {
    name: 'Notification',
    frenchName: 'Notifications',
    category: 'Traçabilité & Logs',
    description: 'Alertes et notifications en temps réel pour les utilisateurs.',
    relations: ['User'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'userId', type: 'UUID', constraint: 'FK -> User' },
      { name: 'type', type: 'Enum', constraint: 'INFO, WARNING, ALERT' }
    ]
  },
  {
    name: 'Report',
    frenchName: 'Rapports',
    category: 'Traçabilité & Logs',
    description: 'Rapports analytiques générés (PDF, Excel, CSV).',
    relations: ['Agency'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'agencyId', type: 'UUID', constraint: 'FK -> Agency' },
      { name: 'category', type: 'Enum', constraint: 'FINANCIAL, FLEET, etc.' }
    ]
  },
  {
    name: 'AuditLog',
    frenchName: 'Journaux d’audit',
    category: 'Traçabilité & Logs',
    description: 'Piste d’audit immuable de toutes les actions et modifications du système.',
    relations: ['User'],
    fields: [
      { name: 'id', type: 'UUID', constraint: 'PK' },
      { name: 'userId', type: 'UUID', constraint: 'FK -> User' },
      { name: 'action', type: 'String', constraint: 'Not Null' },
      { name: 'timestamp', type: 'Timestamp', constraint: 'Indexed' }
    ]
  }
];

export function DataArchitectureHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEntity, setSelectedEntity] = useState<EntityMeta>(ENTITIES_CATALOG[0]);

  const categories = ['Tous', 'Gouvernance & Acteurs', 'Flotte & Véhicules', 'Atelier & Maintenance', 'Stocks & Achats', 'Commercial & Financier', 'Traçabilité & Logs'];

  const filteredEntities = ENTITIES_CATALOG.filter(e => {
    const matchCat = selectedCategory === 'Tous' || e.category === selectedCategory;
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.frenchName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-main to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-brand-orange text-xs font-black uppercase tracking-wider mb-2">
            <Database size={18} />
            <span>Architecture des Données Enterprise (26 Entités)</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Modèle Relationnel & Traçabilité</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Modèle de données relationnel normalisé avec clés primaires/étrangères, horodatage universel (createdAt, updatedAt, version) et règles de validation métier.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
          <div className="text-center px-4">
            <div className="text-2xl font-black text-brand-orange">26</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Entités Cœurs</div>
          </div>
          <div className="w-px h-10 bg-slate-700" />
          <div className="text-center px-4">
            <div className="text-2xl font-black text-emerald-400">100%</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">Traçables</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Entity List & Filters */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Rechercher une entité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-orange"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-navy-main text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredEntities.map((ent) => {
              const isSelected = selectedEntity.name === ent.name;
              return (
                <button
                  key={ent.name}
                  onClick={() => setSelectedEntity(ent)}
                  className={`w-full text-left p-4 transition-all flex items-center justify-between ${
                    isSelected ? 'bg-brand-orange/10 border-l-4 border-brand-orange' : 'hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-main text-sm">{ent.frenchName}</span>
                      <span className="text-xs font-mono text-slate-400">({ent.name})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{ent.description}</div>
                  </div>
                  <ArrowRight size={16} className={isSelected ? 'text-brand-orange' : 'text-slate-300'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Schema Explorer */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-xl text-xs font-black uppercase tracking-wider">
                  {selectedEntity.category}
                </span>
                <h2 className="text-2xl font-black text-navy-main mt-2">{selectedEntity.frenchName}</h2>
                <div className="text-xs font-mono text-slate-400">Modèle : {selectedEntity.name}</div>
              </div>
              <div className="p-3 bg-slate-900 text-white rounded-2xl">
                <Table size={24} className="text-brand-orange" />
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {selectedEntity.description}
            </p>

            {/* Fields Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <Cpu size={14} className="text-brand-orange" /> Structure des Attributs & Règles Standard
              </h3>
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">Attribut</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Contrainte / Règle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 font-medium text-slate-700">
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold text-navy-main">id</td>
                      <td className="p-3 font-mono text-slate-500">UUID</td>
                      <td className="p-3 text-emerald-600">PK (Identifiant Unique)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold text-navy-main">createdAt</td>
                      <td className="p-3 font-mono text-slate-500">Timestamp</td>
                      <td className="p-3 text-slate-600">Horodatage automatique création</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold text-navy-main">updatedAt</td>
                      <td className="p-3 font-mono text-slate-500">Timestamp</td>
                      <td className="p-3 text-slate-600">Mise à jour automatique (Trigger)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-mono font-bold text-navy-main">version</td>
                      <td className="p-3 font-mono text-slate-500">Integer</td>
                      <td className="p-3 text-slate-600">Verrou optimiste (Concurrence)</td>
                    </tr>
                    {selectedEntity.fields.map((f, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="p-3 font-mono font-bold text-navy-main">{f.name}</td>
                        <td className="p-3 font-mono text-slate-500">{f.type}</td>
                        <td className="p-3 font-semibold text-brand-orange">{f.constraint}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Relations */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                <GitBranch size={14} className="text-brand-orange" /> Relations Entités (Foreign Keys)
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedEntity.relations.map((rel, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-navy-main text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                    <ArrowRight size={12} className="text-brand-orange" />
                    {rel}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
