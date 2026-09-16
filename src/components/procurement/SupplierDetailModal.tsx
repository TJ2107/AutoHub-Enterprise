import { useState } from 'react';
import { 
  X, 
  Building2, 
  Star, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  FileCode,
  Tag,
  Wrench
} from 'lucide-react';
import { Supplier, SupplierContract, PriceHistoryRecord, PurchaseOrder } from '../../types';

interface Props {
  supplier: Supplier | null;
  contracts: SupplierContract[];
  priceHistory: PriceHistoryRecord[];
  orders: PurchaseOrder[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateRating?: (supplierId: string, rating: Supplier['rating']) => void;
}

export function SupplierDetailModal({
  supplier,
  contracts,
  priceHistory,
  orders,
  isOpen,
  onClose,
  onUpdateRating
}: Props) {
  const [activeTab, setActiveTab] = useState<'profile' | 'evaluation' | 'contracts' | 'prices'>('profile');

  if (!isOpen || !supplier) return null;

  const supplierContracts = contracts.filter(c => c.supplierId === supplier.id);
  const supplierPrices = priceHistory.filter(p => p.supplierName.toLowerCase().includes(supplier.name.toLowerCase().slice(0, 8)));
  const supplierOrders = orders.filter(o => o.supplierId === supplier.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl text-white shadow-md ${
              supplier.isSubcontractor ? 'bg-purple-700' : 'bg-navy-main'
            }`}>
              {supplier.isSubcontractor ? <Wrench size={22} /> : <Building2 size={22} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md ${
                  supplier.isSubcontractor ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {supplier.isSubcontractor ? 'Sous-traitant Partenaire' : 'Fournisseur Agréé'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {supplier.code}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  supplier.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                  supplier.status === 'review' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {supplier.status}
                </span>
              </div>
              <h3 className="text-xl font-black text-navy-main uppercase tracking-tight mt-0.5">
                {supplier.name}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-navy-main rounded-xl hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-neutral-100 flex gap-2 bg-slate-50/50">
          {[
            { id: 'profile', label: 'Fiche & Coordonnées', icon: Building2 },
            { id: 'evaluation', label: 'Évaluation & Performance', icon: Star },
            { id: 'contracts', label: `Contrats & SLA (${supplierContracts.length})`, icon: FileText },
            { id: 'prices', label: 'Historique Prix & Tarifs', icon: TrendingUp }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-navy-main text-navy-main bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-navy-main'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Informations Générales
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Catégorie :</span>
                      <span className="font-bold text-navy-main uppercase">{supplier.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">N° TVA Intracommunautaire :</span>
                      <span className="font-mono font-bold text-navy-main">{supplier.taxId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Conditions de règlement :</span>
                      <span className="font-bold text-emerald-700">{supplier.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Volume d'achats YTD :</span>
                      <span className="font-black text-navy-main">{supplier.totalPurchasesYTD.toLocaleString()} € HT</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    Contact & Localisation
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={14} className="text-slate-400" />
                      <span className="font-bold text-navy-main">{supplier.contactName}</span> ({supplier.email})
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={14} className="text-slate-400" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{supplier.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dernières commandes passées */}
              <div>
                <h4 className="text-xs font-black text-navy-main uppercase tracking-wider mb-3">
                  Historique des Bons de Commande ({supplierOrders.length})
                </h4>
                <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-neutral-200 font-bold uppercase text-slate-400">
                      <tr>
                        <th className="py-2.5 px-4">N° Commande</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4">Affectation</th>
                        <th className="py-2.5 px-4 text-right">Montant TTC</th>
                        <th className="py-2.5 px-4 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {supplierOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-slate-400">Aucune commande enregistrée pour ce fournisseur</td>
                        </tr>
                      ) : (
                        supplierOrders.map(o => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-bold text-navy-main">{o.poNumber}</td>
                            <td className="py-2.5 px-4 text-slate-500">{new Date(o.orderDate).toLocaleDateString()}</td>
                            <td className="py-2.5 px-4 text-slate-600 font-medium">{o.allocationTargetName}</td>
                            <td className="py-2.5 px-4 text-right font-black text-navy-main">{o.totalTTC.toFixed(2)} €</td>
                            <td className="py-2.5 px-4 text-center">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Evaluation */}
          {activeTab === 'evaluation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-200 text-center space-y-1">
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Score Global</span>
                  <div className="text-3xl font-black text-amber-900 flex items-center justify-center gap-1">
                    <Star size={24} className="fill-amber-500 text-amber-500" />
                    {supplier.rating.overall} / 5
                  </div>
                  <p className="text-[10px] text-amber-700 font-bold">Fournisseur Certifié Qualité</p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conformité Qualité</span>
                  <div className="text-2xl font-black text-navy-main">{supplier.rating.quality} / 5</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(supplier.rating.quality / 5) * 100}%` }} />
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Respect Délais</span>
                  <div className="text-2xl font-black text-navy-main">{supplier.rating.delivery} / 5</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${(supplier.rating.delivery / 5) * 100}%` }} />
                  </div>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compétitivité Prix</span>
                  <div className="text-2xl font-black text-navy-main">{supplier.rating.pricing} / 5</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${(supplier.rating.pricing / 5) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Critères d'audit */}
              <div className="p-5 bg-white rounded-2xl border border-neutral-200 space-y-4">
                <h4 className="text-xs font-black text-navy-main uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Grille d'Évaluation & SLA Fournisseur
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-neutral-100 flex justify-between items-center">
                    <span>Taux de service (OTIF - On-Time In-Full) :</span>
                    <span className="font-black text-emerald-600">97.4%</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-neutral-100 flex justify-between items-center">
                    <span>Taux de retour / Non-conformité :</span>
                    <span className="font-black text-slate-700">1.2% (Faible)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-neutral-100 flex justify-between items-center">
                    <span>Délai moyen de réponse aux devis :</span>
                    <span className="font-black text-slate-700">4.5 heures</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-neutral-100 flex justify-between items-center">
                    <span>Certifications :</span>
                    <span className="font-bold text-navy-main">ISO 9001 / IATF 16949</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Contracts */}
          {activeTab === 'contracts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-black text-navy-main uppercase tracking-wider">
                  Contrats Cadres & Accords de Sous-traitance
                </h4>
              </div>

              {supplierContracts.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-neutral-200">
                  Aucun contrat cadre formalisé actuellement.
                </div>
              ) : (
                <div className="space-y-3">
                  {supplierContracts.map(ctr => (
                    <div key={ctr.id} className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-navy-main text-white text-[10px] font-black uppercase rounded">
                              {ctr.contractNumber}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              ctr.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                              ctr.status === 'expiring_soon' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {ctr.status === 'active' ? 'Actif' : ctr.status === 'expiring_soon' ? 'Expire bientôt' : 'Résilié'}
                            </span>
                          </div>
                          <h5 className="text-sm font-black text-navy-main mt-1">{ctr.title}</h5>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Remise Cadre Négociée</span>
                          <p className="text-lg font-black text-emerald-600">-{ctr.discountRate}%</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs p-3 bg-slate-50 rounded-xl">
                        <div>
                          <span className="text-slate-400 font-bold block">Période de validité :</span>
                          <span className="font-semibold text-navy-main">
                            {new Date(ctr.startDate).toLocaleDateString()} au {new Date(ctr.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block">Engagement volume :</span>
                          <span className="font-semibold text-navy-main">{ctr.volumeCommitment || 'Non soumis à quota'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block">Type :</span>
                          <span className="font-semibold text-navy-main uppercase">{ctr.type}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 italic">
                        <span className="font-bold text-slate-700">Conditions SLA :</span> {ctr.slaTerms}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Price History */}
          {activeTab === 'prices' && (
            <div className="space-y-4">
              <h4 className="text-xs font-black text-navy-main uppercase tracking-wider">
                Évolution des Prix Unitaires Négociés
              </h4>

              {supplierPrices.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-2xl border border-neutral-200">
                  Aucun historique tarifaire spécifique pour ce fournisseur.
                </div>
              ) : (
                <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-neutral-200 font-bold uppercase text-slate-400">
                      <tr>
                        <th className="py-2.5 px-4">Référence</th>
                        <th className="py-2.5 px-4">Désignation</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4 text-right">Prix Précédent</th>
                        <th className="py-2.5 px-4 text-right">Nouveau P.U.</th>
                        <th className="py-2.5 px-4 text-center">Évolution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {supplierPrices.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-mono font-bold text-navy-main">{p.partNumber}</td>
                          <td className="py-2.5 px-4 font-medium text-slate-700">{p.description}</td>
                          <td className="py-2.5 px-4 text-slate-500">{new Date(p.date).toLocaleDateString()}</td>
                          <td className="py-2.5 px-4 text-right text-slate-500">{p.previousPrice.toFixed(2)} €</td>
                          <td className="py-2.5 px-4 text-right font-black text-navy-main">{p.unitPrice.toFixed(2)} €</td>
                          <td className="py-2.5 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              p.percentageChange <= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {p.percentageChange > 0 ? '+' : ''}{p.percentageChange.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-neutral-200 text-slate-600 font-bold text-xs uppercase hover:bg-slate-100"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
