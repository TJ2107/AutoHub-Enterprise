import { useState } from 'react';
import { 
  ShoppingBag, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowUpRight, 
  DollarSign, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  PackageCheck, 
  FileCheck2, 
  Award, 
  Receipt, 
  Wrench, 
  Car, 
  Truck, 
  Layers, 
  Calendar,
  Send,
  Printer,
  ChevronDown
} from 'lucide-react';
import { 
  Supplier, 
  PurchaseRequest, 
  RFQ, 
  PurchaseOrder, 
  GoodsReceipt, 
  SupplierInvoice, 
  SupplierContract, 
  PriceHistoryRecord,
  SupplierQuote,
  AllocationType
} from '../../types';
import { 
  initialSuppliers, 
  initialPurchaseRequests, 
  initialRFQs, 
  initialPurchaseOrders, 
  initialGoodsReceipts, 
  initialSupplierInvoices, 
  initialContracts, 
  initialPriceHistory 
} from './procurementData';
import { NewPurchaseRequestModal } from './NewPurchaseRequestModal';
import { RFQComparisonModal } from './RFQComparisonModal';
import { PurchaseOrderDetailModal } from './PurchaseOrderDetailModal';
import { GoodsReceiptModal } from './GoodsReceiptModal';
import { SupplierDetailModal } from './SupplierDetailModal';

export function ProcurementDashboard() {
  const [activeTab, setActiveTab] = useState<'requests' | 'orders' | 'receipts' | 'invoices' | 'suppliers' | 'prices'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAllocationFilter, setSelectedAllocationFilter] = useState<string>('all');

  // State
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>(initialPurchaseRequests);
  const [rfqs, setRfqs] = useState<RFQ[]>(initialRFQs);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [goodsReceipts, setGoodsReceipts] = useState<GoodsReceipt[]>(initialGoodsReceipts);
  const [invoices, setInvoices] = useState<SupplierInvoice[]>(initialSupplierInvoices);
  const [contracts] = useState<SupplierContract[]>(initialContracts);
  const [priceHistory] = useState<PriceHistoryRecord[]>(initialPriceHistory);

  // Modals state
  const [isNewPRModalOpen, setIsNewPRModalOpen] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [poForReceipt, setPoForReceipt] = useState<PurchaseOrder | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers
  const handleCreatePR = (newPR: PurchaseRequest) => {
    setPurchaseRequests([newPR, ...purchaseRequests]);
    showToast(`Demande d'achat ${newPR.prNumber} soumise avec succès.`);
  };

  const handleApprovePR = (prId: string) => {
    setPurchaseRequests(prev => prev.map(pr => {
      if (pr.id === prId) {
        return {
          ...pr,
          status: 'approved',
          approvedBy: 'Direction Technique (Validé)',
          approvalDate: Date.now()
        };
      }
      return pr;
    }));
    showToast("Demande d'achat validée hiérarchiquement.");
  };

  const handleCreateRFQFromPR = (pr: PurchaseRequest) => {
    const newRfq: RFQ = {
      id: `rfq-${Date.now()}`,
      rfqNumber: `RFQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      prId: pr.id,
      prNumber: pr.prNumber,
      title: `Consultation : ${pr.title}`,
      issueDate: Date.now(),
      closingDate: Date.now() + 3 * 86400000,
      items: pr.items,
      quotes: [
        {
          id: `q-${Date.now()}-1`,
          supplierId: 'sup-1',
          supplierName: 'Toyota Parts Europe',
          unitPrice: pr.estimatedTotal * 0.95,
          totalAmount: pr.estimatedTotal * 0.95,
          deliveryDays: 2,
          warrantyMonths: 24,
          complianceScore: 98,
          notes: 'Tarif préférentiel sous contrat cadre.',
          isSelected: true
        },
        {
          id: `q-${Date.now()}-2`,
          supplierId: 'sup-2',
          supplierName: 'Bergerat Distribution Pro',
          unitPrice: pr.estimatedTotal * 1.02,
          totalAmount: pr.estimatedTotal * 1.02,
          deliveryDays: 1,
          warrantyMonths: 12,
          complianceScore: 94,
          notes: 'Disponibilité immédiate magasin.',
          isSelected: false
        }
      ],
      status: 'evaluated',
      selectedSupplierId: 'sup-1'
    };

    setRfqs([newRfq, ...rfqs]);
    setPurchaseRequests(prev => prev.map(p => p.id === pr.id ? { ...p, status: 'rfq_issued' } : p));
    setSelectedRFQ(newRfq);
    showToast(`Appel d'offres / Devis ${newRfq.rfqNumber} généré.`);
  };

  const handleSelectQuoteAndGeneratePO = (rfqId: string, quote: SupplierQuote) => {
    const targetRfq = rfqs.find(r => r.id === rfqId);
    if (!targetRfq) return;

    const sourcePR = purchaseRequests.find(p => p.id === targetRfq.prId);

    const newPO: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: `BC-2026-${Math.floor(100 + Math.random() * 900)}`,
      prNumber: targetRfq.prNumber,
      rfqNumber: targetRfq.rfqNumber,
      supplierId: quote.supplierId,
      supplierName: quote.supplierName,
      supplierCode: quote.supplierId === 'sup-1' ? 'FOURN-001' : 'FOURN-002',
      orderDate: Date.now(),
      expectedDeliveryDate: Date.now() + quote.deliveryDays * 86400000,
      items: targetRfq.items.map(it => ({
        ...it,
        negotiatedUnitPrice: it.estimatedUnitPrice * 0.95,
        totalAmount: it.quantity * (it.estimatedUnitPrice * 0.95),
        receivedQuantity: 0
      })),
      subtotalHT: quote.totalAmount,
      vatRate: 20,
      vatAmount: quote.totalAmount * 0.20,
      totalTTC: quote.totalAmount * 1.20,
      paymentTerms: '30 jours fin de mois',
      allocationType: sourcePR?.allocationType || 'vehicle',
      allocationTargetName: sourcePR?.allocationTargetName || 'Flotte AutoHub',
      status: 'pending_validation',
      deliveryAddress: 'Magasin Central - Quai 3, AutoHub Site Principal',
      notes: `Émis suite à adjudication consultation ${targetRfq.rfqNumber}.`
    };

    setPurchaseOrders([newPO, ...purchaseOrders]);
    setRfqs(prev => prev.map(r => r.id === rfqId ? { ...r, status: 'awarded', selectedSupplierId: quote.supplierId } : r));
    setPurchaseRequests(prev => prev.map(p => p.id === targetRfq.prId ? { ...p, status: 'ordered' } : p));
    setSelectedRFQ(null);
    setSelectedPO(newPO);
    showToast(`Bon de Commande ${newPO.poNumber} créé avec succès.`);
  };

  const handleApprovePO = (poId: string) => {
    setPurchaseOrders(prev => prev.map(po => {
      if (po.id === poId) {
        return {
          ...po,
          status: 'approved',
          validatedBy: 'Resp. Achats (Valérie Dumont)',
          validationDate: Date.now()
        };
      }
      return po;
    }));
    if (selectedPO?.id === poId) {
      setSelectedPO(prev => prev ? { ...prev, status: 'approved', validatedBy: 'Resp. Achats (Valérie Dumont)', validationDate: Date.now() } : null);
    }
    showToast("Bon de Commande validé hiérarchiquement.");
  };

  const handleSendPOToSupplier = (poId: string) => {
    setPurchaseOrders(prev => prev.map(po => po.id === poId ? { ...po, status: 'sent_to_supplier' } : po));
    if (selectedPO?.id === poId) {
      setSelectedPO(prev => prev ? { ...prev, status: 'sent_to_supplier' } : null);
    }
    showToast("Bon de commande transmis par EDI / Email au fournisseur.");
  };

  const handleCreateGoodsReceipt = (newReceipt: GoodsReceipt) => {
    setGoodsReceipts([newReceipt, ...goodsReceipts]);

    // Update PO status and received quantities
    setPurchaseOrders(prev => prev.map(po => {
      if (po.id === newReceipt.poId) {
        const updatedItems = po.items.map(poItem => {
          const recItem = newReceipt.items.find(ri => ri.itemId === poItem.id);
          return {
            ...poItem,
            receivedQuantity: (poItem.receivedQuantity || 0) + (recItem?.acceptedQty || 0)
          };
        });
        const isFullyReceived = updatedItems.every(it => (it.receivedQuantity || 0) >= it.quantity);
        return {
          ...po,
          items: updatedItems,
          status: isFullyReceived ? 'received' : 'partially_received'
        };
      }
      return po;
    }));

    // Auto-create provisional supplier invoice in 3-way match system
    const matchingPO = purchaseOrders.find(p => p.id === newReceipt.poId);
    if (matchingPO) {
      const newInvoice: SupplierInvoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber: `FAC-PROV-${Math.floor(1000 + Math.random() * 9000)}`,
        poId: matchingPO.id,
        poNumber: matchingPO.poNumber,
        receiptNumber: newReceipt.receiptNumber,
        supplierId: matchingPO.supplierId,
        supplierName: matchingPO.supplierName,
        invoiceDate: Date.now(),
        dueDate: Date.now() + 30 * 86400000,
        amountHT: matchingPO.subtotalHT,
        vatAmount: matchingPO.vatAmount,
        amountTTC: matchingPO.totalTTC,
        threeWayMatch: newReceipt.conformityOverall === 'compliant' ? 'matched' : 'discrepancy',
        matchDiscrepancyReason: newReceipt.conformityOverall !== 'compliant' ? 'Réserves émises au contrôle de conformité BR' : undefined,
        paymentStatus: 'pending',
        allocationTargetName: matchingPO.allocationTargetName
      };
      setInvoices([newInvoice, ...invoices]);
    }

    setPoForReceipt(null);
    showToast(`Réception ${newReceipt.receiptNumber} enregistrée & stocks mis à jour.`);
  };

  // KPIs
  const totalApprovedOrdersTTC = purchaseOrders
    .filter(p => p.status !== 'cancelled')
    .reduce((acc, curr) => acc + curr.totalTTC, 0);

  const pendingApprovalsCount = purchaseRequests.filter(pr => pr.status === 'pending_approval').length + 
    purchaseOrders.filter(po => po.status === 'pending_validation').length;

  const totalInvoicesPendingPayment = invoices
    .filter(inv => inv.paymentStatus === 'pending' || inv.paymentStatus === 'overdue')
    .reduce((acc, curr) => acc + curr.amountTTC, 0);

  const matchedInvoicesRate = Math.round(
    (invoices.filter(i => i.threeWayMatch === 'matched').length / (invoices.length || 1)) * 100
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notif */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 bg-navy-main text-white rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={20} className="text-brand-orange shrink-0" />
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-orange text-navy-main rounded-xl">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">
                Achats & Fournisseurs
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Processus complet d'approvisionnement, consultations, commandes & contrôle de conformité
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsNewPRModalOpen(true)}
            className="px-5 py-2.5 bg-navy-main hover:bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-navy-main/20 transition-all"
          >
            <Plus size={16} /> Demande d'Achat (DA)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagements Commandes TTC</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-navy-main">{totalApprovedOrdersTTC.toLocaleString()} €</p>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-500">Sur {purchaseOrders.length} bons de commande émis</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validations en Attente</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-navy-main">{pendingApprovalsCount}</p>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={20} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-amber-700">Workflow hiérarchique actif</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rapprochement 3-Way Match</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-emerald-600">{matchedInvoicesRate}%</p>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck size={20} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-emerald-700">Factures conformes BC & Réception</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm space-y-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Échéances Fournisseurs</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-navy-main">{totalInvoicesPendingPayment.toLocaleString()} €</p>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <Receipt size={20} />
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-500">{invoices.filter(i => i.paymentStatus === 'overdue').length} facture(s) en retard</p>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {[
          { id: 'requests', label: `Demandes d'Achat (${purchaseRequests.length})`, icon: FileText },
          { id: 'orders', label: `Bons de Commande (${purchaseOrders.length})`, icon: ShoppingBag },
          { id: 'receipts', label: `Réceptions & Contrôle (${goodsReceipts.length})`, icon: PackageCheck },
          { id: 'invoices', label: `Factures & Rapprochement (${invoices.length})`, icon: Receipt },
          { id: 'suppliers', label: `Fournisseurs & Sous-traitants (${suppliers.length})`, icon: Building2 },
          { id: 'prices', label: 'Historique des Prix', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-white text-navy-main shadow-sm'
                : 'text-slate-500 hover:text-navy-main'
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: 1. Demandes d'Achat (DA) & Consultations */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Consultations RFQ en cours */}
          {rfqs.length > 0 && (
            <div className="bg-gradient-to-r from-blue-900 to-navy-main rounded-3xl p-6 text-white shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-brand-orange" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-200">
                    Consultations Fournisseurs & Devis Comparatifs en cours ({rfqs.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rfqs.map(rfq => (
                  <div key={rfq.id} className="bg-slate-800/80 backdrop-blur rounded-2xl p-4 border border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-brand-orange">{rfq.rfqNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-700 rounded text-slate-300 font-bold uppercase">{rfq.prNumber}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{rfq.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {rfq.quotes.length} offres reçues • Meilleure offre : {Math.min(...rfq.quotes.map(q => q.totalAmount)).toFixed(2)} € HT
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedRFQ(rfq)}
                      className="px-4 py-2 bg-brand-orange hover:bg-amber-500 text-navy-main font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Award size={14} /> Comparer & Choisir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table des Demandes d'achat */}
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-navy-main" />
                <div>
                  <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    Registre des Demandes d'Achat (DA)
                  </h3>
                  <p className="text-xs text-slate-400">Suivi des besoins matériels, pièces et sous-traitances atelier</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Rechercher DA, véhicule, pièce..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs outline-none w-64 focus:border-brand-orange"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">N° DA & Objet</th>
                    <th className="py-3.5 px-6">Demandeur & Service</th>
                    <th className="py-3.5 px-6">Imputation / Affectation</th>
                    <th className="py-3.5 px-6">Urgence</th>
                    <th className="py-3.5 px-6 text-right">Montant Est. HT</th>
                    <th className="py-3.5 px-6 text-center">Statut Workflow</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {purchaseRequests
                    .filter(pr => pr.title.toLowerCase().includes(searchQuery.toLowerCase()) || pr.prNumber.toLowerCase().includes(searchQuery.toLowerCase()) || pr.allocationTargetName.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(pr => (
                      <tr key={pr.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="font-mono font-bold text-slate-400">{pr.prNumber}</span>
                            <p className="text-xs font-black text-navy-main">{pr.title}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{pr.reason}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <p className="font-bold text-navy-main">{pr.requesterName}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">{pr.department}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5">
                            {pr.allocationType === 'vehicle' && <Car size={13} className="text-blue-500" />}
                            {pr.allocationType === 'equipment' && <Truck size={13} className="text-amber-500" />}
                            {pr.allocationType === 'workshop_order' && <Wrench size={13} className="text-orange-500" />}
                            {pr.allocationType === 'cost_center' && <Layers size={13} className="text-purple-500" />}
                            <span className="font-bold text-navy-main text-xs">{pr.allocationTargetName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            pr.urgency === 'urgent' ? 'bg-red-100 text-red-700 font-black' :
                            pr.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {pr.urgency}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-black text-navy-main text-xs">
                          {pr.estimatedTotal.toFixed(2)} €
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            pr.status === 'ordered' ? 'bg-emerald-100 text-emerald-800' :
                            pr.status === 'rfq_issued' ? 'bg-blue-100 text-blue-800' :
                            pr.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {pr.status === 'pending_approval' && 'À valider'}
                            {pr.status === 'approved' && 'Validée'}
                            {pr.status === 'rfq_issued' && 'En consultation RFQ'}
                            {pr.status === 'ordered' && 'Commandée (BC créé)'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {pr.status === 'pending_approval' && (
                              <button
                                onClick={() => handleApprovePR(pr.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                Valider
                              </button>
                            )}
                            {pr.status === 'approved' && (
                              <button
                                onClick={() => handleCreateRFQFromPR(pr)}
                                className="px-3 py-1.5 bg-navy-main hover:bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                Consulter Devis
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. Bons de Commande (BC) */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-navy-main" />
                <div>
                  <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    Bons de Commande Fournisseurs (BC)
                  </h3>
                  <p className="text-xs text-slate-400">Engagements juridiques et financiers vis-à-vis des tiers</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    placeholder="Rechercher N° BC, Fournisseur..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs outline-none w-64"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">N° BC & Date</th>
                    <th className="py-3.5 px-6">Fournisseur / Sous-traitant</th>
                    <th className="py-3.5 px-6">Imputation Analytique</th>
                    <th className="py-3.5 px-6 text-right">Montant HT</th>
                    <th className="py-3.5 px-6 text-right">Montant TTC</th>
                    <th className="py-3.5 px-6 text-center">Avancement</th>
                    <th className="py-3.5 px-6 text-right">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {purchaseOrders
                    .filter(po => po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) || po.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) || po.allocationTargetName.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(po => (
                      <tr key={po.id} className="hover:bg-slate-50/80 transition-all">
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <span className="font-mono font-bold text-navy-main text-xs">{po.poNumber}</span>
                            <p className="text-[11px] text-slate-400">{new Date(po.orderDate).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-0.5">
                            <p className="font-bold text-navy-main">{po.supplierName}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Conditions: {po.paymentTerms}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-600 uppercase">
                              {po.allocationType}
                            </span>
                            <span className="font-bold text-navy-main text-xs">{po.allocationTargetName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-medium text-slate-600">
                          {po.subtotalHT.toFixed(2)} €
                        </td>
                        <td className="py-4 px-6 text-right font-black text-navy-main text-xs">
                          {po.totalTTC.toFixed(2)} €
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            po.status === 'received' ? 'bg-emerald-100 text-emerald-800' :
                            po.status === 'partially_received' ? 'bg-blue-100 text-blue-800' :
                            po.status === 'sent_to_supplier' ? 'bg-purple-100 text-purple-800' :
                            po.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {po.status === 'pending_validation' && 'Validation requise'}
                            {po.status === 'approved' && 'Validé (Prêt à l\'envoi)'}
                            {po.status === 'sent_to_supplier' && 'Commandé au fournisseur'}
                            {po.status === 'partially_received' && 'Réception partielle'}
                            {po.status === 'received' && 'Réceptionné & Conforme'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => setSelectedPO(po)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-main rounded-lg text-xs font-bold transition-all flex items-center gap-1 ml-auto"
                          >
                            Consulter <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. Réceptions & Contrôle de Conformité (BR) */}
      {activeTab === 'receipts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
              <div className="flex items-center gap-3">
                <PackageCheck size={20} className="text-navy-main" />
                <div>
                  <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    Bons de Réception & Procès-Verbaux de Contrôle (BR)
                  </h3>
                  <p className="text-xs text-slate-400">Contrôle qualitatif, quantitatif et gestion des non-conformités</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">N° Réception (BR)</th>
                    <th className="py-3.5 px-6">Bon de Commande & BL</th>
                    <th className="py-3.5 px-6">Fournisseur</th>
                    <th className="py-3.5 px-6">Date & Contrôleur</th>
                    <th className="py-3.5 px-6 text-center">Conformité Qualité</th>
                    <th className="py-3.5 px-6">Observations & PV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {goodsReceipts.map(rec => (
                    <tr key={rec.id} className="hover:bg-slate-50 transition-all">
                      <td className="py-4 px-6 font-mono font-bold text-navy-main">
                        {rec.receiptNumber}
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <p className="font-bold text-navy-main">{rec.poNumber}</p>
                          <p className="text-[10px] text-slate-400 font-mono">BL: {rec.deliveryNoteNumber}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-700">
                        {rec.supplierName}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-navy-main">{new Date(rec.receiptDate).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-400">Par {rec.receiverName}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          rec.conformityOverall === 'compliant' ? 'bg-emerald-100 text-emerald-800' :
                          rec.conformityOverall === 'with_reservations' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {rec.conformityOverall === 'compliant' && 'Conforme 100%'}
                          {rec.conformityOverall === 'with_reservations' && 'Avec réserves'}
                          {rec.conformityOverall === 'rejected' && 'Non-conforme'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs italic">
                        {rec.inspectorNotes || 'Aucune anomalie constatée.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. Factures Fournisseurs & 3-Way Match */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Receipt size={20} className="text-navy-main" />
                <div>
                  <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    Factures & Rapprochement Automatique (3-Way Matching)
                  </h3>
                  <p className="text-xs text-slate-400">Contrôle de concordance : Bon de Commande vs Bon de Réception vs Facture</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">N° Facture & Échéance</th>
                    <th className="py-3.5 px-6">Fournisseur</th>
                    <th className="py-3.5 px-6">Liaisons BC & BR</th>
                    <th className="py-3.5 px-6">Imputation</th>
                    <th className="py-3.5 px-6 text-right">Montant TTC</th>
                    <th className="py-3.5 px-6 text-center">3-Way Match</th>
                    <th className="py-3.5 px-6 text-center">Règlement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {invoices.map(inv => (
                    <tr key={inv.id} className="hover:bg-slate-50 transition-all">
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-navy-main">{inv.invoiceNumber}</span>
                          <p className="text-[10px] text-slate-400 font-medium">Échéance: {new Date(inv.dueDate).toLocaleDateString()}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-navy-main">
                        {inv.supplierName}
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-mono text-[11px]">
                        <div>BC: <span className="font-bold text-navy-main">{inv.poNumber}</span></div>
                        {inv.receiptNumber && <div>BR: {inv.receiptNumber}</div>}
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {inv.allocationTargetName}
                      </td>
                      <td className="py-4 px-6 text-right font-black text-navy-main text-xs">
                        {inv.amountTTC.toFixed(2)} €
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          inv.threeWayMatch === 'matched' ? 'bg-emerald-100 text-emerald-800' :
                          inv.threeWayMatch === 'discrepancy' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.threeWayMatch === 'matched' && 'Concordance OK'}
                          {inv.threeWayMatch === 'discrepancy' && 'Écart détecté'}
                          {inv.threeWayMatch === 'pending' && 'En rapprochement'}
                        </span>
                        {inv.matchDiscrepancyReason && (
                          <p className="text-[9px] text-red-600 font-bold mt-1 line-clamp-1">{inv.matchDiscrepancyReason}</p>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inv.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                          inv.paymentStatus === 'overdue' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {inv.paymentStatus === 'pending' && 'À payer'}
                          {inv.paymentStatus === 'paid' && 'Payée'}
                          {inv.paymentStatus === 'overdue' && 'Échue (En retard)'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. Base Fournisseurs & Sous-traitants */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suppliers.map(sup => (
              <div 
                key={sup.id} 
                onClick={() => setSelectedSupplier(sup)}
                className="bg-white rounded-3xl border border-neutral-200 p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md ${
                        sup.isSubcontractor ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sup.isSubcontractor ? 'Sous-traitant' : 'Fournisseur'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{sup.code}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-700">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      {sup.rating.overall}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-navy-main uppercase tracking-tight">{sup.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{sup.address}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-neutral-100 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Règlement :</span>
                      <span className="font-bold text-navy-main">{sup.paymentTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Achats YTD :</span>
                      <span className="font-black text-navy-main">{sup.totalPurchasesYTD.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Contrats Cadres :</span>
                      <span className="font-bold text-emerald-600">{sup.contractsCount} actif(s)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs font-black text-navy-main uppercase tracking-wider">
                  <span>Voir fiche & contrats</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. Historique des Prix & Tendances */}
      {activeTab === 'prices' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-neutral-200 bg-surface-gray flex justify-between items-center">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-navy-main" />
                <div>
                  <h3 className="text-sm font-black text-navy-main uppercase tracking-widest">
                    Observatoire & Historique des Prix d'Achat
                  </h3>
                  <p className="text-xs text-slate-400">Traçabilité des négociations tarifaires et inflation par référence</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="py-3.5 px-6">Référence Pièce</th>
                    <th className="py-3.5 px-6">Désignation</th>
                    <th className="py-3.5 px-6">Fournisseur</th>
                    <th className="py-3.5 px-6">Bon de Commande & Date</th>
                    <th className="py-3.5 px-6 text-right">Ancien P.U.</th>
                    <th className="py-3.5 px-6 text-right">Nouveau P.U.</th>
                    <th className="py-3.5 px-6 text-center">Variation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {priceHistory.map(ph => (
                    <tr key={ph.id} className="hover:bg-slate-50 transition-all">
                      <td className="py-4 px-6 font-mono font-bold text-navy-main">{ph.partNumber}</td>
                      <td className="py-4 px-6 font-semibold text-slate-800">{ph.description}</td>
                      <td className="py-4 px-6 text-slate-600 font-medium">{ph.supplierName}</td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-navy-main">{ph.poNumber}</span>
                        <span className="text-[10px] text-slate-400 block">{new Date(ph.date).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6 text-right text-slate-500">{ph.previousPrice.toFixed(2)} €</td>
                      <td className="py-4 px-6 text-right font-black text-navy-main">{ph.unitPrice.toFixed(2)} €</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          ph.percentageChange <= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {ph.percentageChange > 0 ? '+' : ''}{ph.percentageChange.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <NewPurchaseRequestModal
        isOpen={isNewPRModalOpen}
        onClose={() => setIsNewPRModalOpen(false)}
        onSubmit={handleCreatePR}
      />

      <RFQComparisonModal
        rfq={selectedRFQ}
        isOpen={!!selectedRFQ}
        onClose={() => setSelectedRFQ(null)}
        onSelectOffer={handleSelectQuoteAndGeneratePO}
      />

      <PurchaseOrderDetailModal
        po={selectedPO}
        isOpen={!!selectedPO}
        onClose={() => setSelectedPO(null)}
        onApprove={handleApprovePO}
        onSendToSupplier={handleSendPOToSupplier}
        onCreateReceipt={(po) => {
          setSelectedPO(null);
          setPoForReceipt(po);
        }}
      />

      <GoodsReceiptModal
        po={poForReceipt}
        isOpen={!!poForReceipt}
        onClose={() => setPoForReceipt(null)}
        onSubmitReceipt={handleCreateGoodsReceipt}
      />

      <SupplierDetailModal
        supplier={selectedSupplier}
        contracts={contracts}
        priceHistory={priceHistory}
        orders={purchaseOrders}
        isOpen={!!selectedSupplier}
        onClose={() => setSelectedSupplier(null)}
      />
    </div>
  );
}
