import React, { useState } from 'react';
import { 
  DollarSign, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Plus, 
  Search, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Building, 
  Tag, 
  Smartphone,
  ShieldCheck,
  PieChart
} from 'lucide-react';
import { 
  Quote, 
  Invoice, 
  CreditNote, 
  PaymentRecord, 
  OperationalExpense 
} from '../../types';
import { 
  initialQuotes, 
  initialInvoices, 
  initialCreditNotes, 
  initialPayments, 
  initialExpenses,
  agencyList,
  costCenterList
} from './financeData';
import { QuoteModal } from './QuoteModal';
import { InvoiceModal } from './InvoiceModal';
import { CreditNoteModal } from './CreditNoteModal';
import { RecordPaymentModal } from './RecordPaymentModal';
import { ExpenseModal } from './ExpenseModal';

export function FinanceModule() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quotes' | 'invoices' | 'payments' | 'expenses' | 'credit_notes'>('dashboard');

  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>(initialCreditNotes);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [expenses, setExpenses] = useState<OperationalExpense[]>(initialExpenses);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('Toutes les agences');
  const [selectedCostCenter, setSelectedCostCenter] = useState('Tous les centres');

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCreditNoteModalOpen, setIsCreditNoteModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Financial KPIs Calculations
  const totalInvoicedTTC = invoices.reduce((sum, inv) => sum + inv.totalTTC, 0);
  const totalCollected = payments.reduce((sum, pay) => sum + pay.amount, 0);
  const totalReceivable = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  const totalExpensesTTC = expenses.reduce((sum, exp) => sum + exp.amountTTC, 0);
  const netMargin = totalCollected - totalExpensesTTC;

  const handleSaveQuote = (newQuote: Quote) => {
    setQuotes([newQuote, ...quotes]);
  };

  const handleSaveInvoice = (newInvoice: Invoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const handleSaveCreditNote = (newCN: CreditNote) => {
    setCreditNotes([newCN, ...creditNotes]);
  };

  const handleSavePayment = (newPayment: PaymentRecord) => {
    setPayments([newPayment, ...payments]);
    // Update invoice balance
    setInvoices(invoices.map(inv => {
      if (inv.id === newPayment.invoiceId) {
        const newPaid = inv.paidAmount + newPayment.amount;
        const newBalance = Math.max(0, inv.totalTTC - newPaid);
        const newStatus = newBalance === 0 ? 'paid' : newPaid > 0 ? 'partially_paid' : inv.status;
        return {
          ...inv,
          paidAmount: newPaid,
          balanceDue: newBalance,
          status: newStatus as any,
          payments: [...inv.payments, newPayment]
        };
      }
      return inv;
    }));
  };

  const handleSaveExpense = (newExpense: OperationalExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  const convertQuoteToInvoice = (quote: Quote) => {
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      quoteId: quote.id,
      quoteNumber: quote.quoteNumber,
      title: quote.title,
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerAddress: undefined,
      serviceType: quote.serviceType,
      issueDate: Date.now(),
      dueDate: Date.now() + 86400000 * 30,
      items: quote.items.map(i => ({ ...i })),
      subtotalHT: quote.subtotalHT,
      totalCostHT: quote.totalCostHT,
      totalMarginHT: quote.totalMarginHT,
      overallMarginPercent: quote.overallMarginPercent,
      vatRate: quote.vatRate,
      vatAmount: quote.vatAmount,
      totalTTC: quote.totalTTC,
      paidAmount: 0,
      balanceDue: quote.totalTTC,
      status: 'issued',
      paymentTerms: quote.paymentTerms,
      agency: quote.agency,
      costCenter: quote.costCenter,
      payments: [],
      notes: `Facture générée depuis le devis ${quote.quoteNumber}`
    };

    setInvoices([newInv, ...invoices]);
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: 'invoiced', convertedInvoiceId: newInv.id } : q));
    alert(`Devis ${quote.quoteNumber} converti avec succès en Facture ${newInv.invoiceNumber} !`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              Comptabilité & Trésorerie
            </span>
            <span className="text-xs text-slate-500 font-medium">Exercice 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Finance, Devis & Facturation
          </h1>
          <p className="text-sm text-slate-500">
            Gestion intégrée des devis, factures, encaissements multi-canaux (Mobile Money, Virement, Stripe) et ventilation analytique.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-brand-orange" /> Nouveau Devis
          </button>
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Émettre Facture
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <DollarSign className="w-4 h-4" /> Encaisser
          </button>
          <button
            onClick={() => setIsExpenseModalOpen(true)}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <TrendingDown className="w-4 h-4" /> Dépense
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'dashboard' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <PieChart className="w-4 h-4" /> Tableau de Bord & Profitabilité
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'quotes' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Devis Clients ({quotes.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'invoices' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Factures ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'payments' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" /> Règlements & Encaissements ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'expenses' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <TrendingDown className="w-4 h-4" /> Dépenses & Coûts ({expenses.length})
        </button>
        <button
          onClick={() => setActiveTab('credit_notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'credit_notes' ? 'bg-navy-main text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Avoirs ({creditNotes.length})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par client, référence, montant..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-navy-main outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building className="w-4 h-4 text-slate-400" />
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              {agencyList.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Tag className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCostCenter}
              onChange={(e) => setSelectedCostCenter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
            >
              {costCenterList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tab 1: Dashboard & Profitability */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Facturé TTC</span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-slate-900">{totalInvoicedTTC.toLocaleString('fr-FR')} €</div>
                <p className="text-xs text-slate-500 mt-1">{invoices.length} factures émises en 2026</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trésorerie Encaissée</span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-emerald-600">{totalCollected.toLocaleString('fr-FR')} €</div>
                <p className="text-xs text-emerald-700 mt-1 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Virements & Mobile Money
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Créances Clients (Dû)</span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-amber-600">{totalReceivable.toLocaleString('fr-FR')} €</div>
                <p className="text-xs text-amber-700 mt-1">En attente de règlement</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dépenses & Coûts</span>
                <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-rose-600">{totalExpensesTTC.toLocaleString('fr-FR')} €</div>
                <p className="text-xs text-slate-500 mt-1">{expenses.length} postes de coûts imputés</p>
              </div>
            </div>

            <div className="bg-navy-main text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Marge Nette Estimée</span>
                <div className="p-2 bg-brand-orange/20 text-brand-orange rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold font-mono text-brand-orange">{netMargin.toLocaleString('fr-FR')} €</div>
                <p className="text-xs text-slate-300 mt-1">Encaissements vs Dépenses</p>
              </div>
            </div>
          </div>

          {/* Payment Gateway Status & Analytical Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 lg:col-span-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-orange" />
                Passerelles de Paiement & Intégrations Actives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Mobile Money (Orange & MTN & Wave)</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">Actif / Webhook OK</span>
                  </div>
                  <p className="text-xs text-slate-500">Encaissement instantané par QR Code USSD pour les prestations d'atelier et pièces détachées.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Stripe & Cartes Bancaires Pro</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-bold">Connecté (Live)</span>
                  </div>
                  <p className="text-xs text-slate-500">Paiement sécurisé par lien de facture envoyé par email ou SMS aux clients professionnels.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Répartition des Dépenses par Centre de Coût</h4>
                <div className="space-y-2.5">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Centre 101 - Atelier SAV & Mécanique</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-navy-main h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Centre 103 - Ventes Engins & Pièces</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Centre 105 - Siège & Frais Généraux</span>
                      <span className="font-bold">25%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Activité Financière Récente</h3>
              <div className="space-y-3">
                {payments.slice(0, 5).map(pay => (
                  <div key={pay.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{pay.customerName}</span>
                      <span className="text-[11px] text-slate-500">{pay.invoiceNumber} • {pay.method.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="font-bold font-mono text-emerald-600">+{pay.amount.toLocaleString('fr-FR')} €</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quotes (Devis) */}
      {activeTab === 'quotes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registre des Devis Clients</h3>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-3 py-1.5 bg-brand-orange text-navy-main rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Créer Devis
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-semibold">N° Devis</th>
                  <th className="p-3.5 font-semibold">Client</th>
                  <th className="p-3.5 font-semibold">Agence & Centre</th>
                  <th className="p-3.5 font-semibold">Montant TTC</th>
                  <th className="p-3.5 font-semibold">Statut</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {quotes.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{q.quoteNumber}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{q.customerName}</span>
                      <span className="text-[11px] text-slate-500">{q.customerEmail}</span>
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <span className="block font-medium">{q.agency}</span>
                      <span className="text-[11px] text-slate-400">{q.costCenter}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">{q.totalTTC.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        q.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                        q.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        q.status === 'invoiced' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {q.status === 'sent' ? 'Envoyé' : q.status === 'approved' ? 'Accepté' : q.status === 'invoiced' ? 'Facturé' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {q.status !== 'invoiced' && (
                        <button
                          onClick={() => convertQuoteToInvoice(q)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Convertir en Facture
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Impression PDF / Téléchargement du devis ${q.quoteNumber}`)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        title="Télécharger PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Invoices (Factures) */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registre des Factures Émises</h3>
            <button
              onClick={() => setIsInvoiceModalOpen(true)}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Émettre Facture
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-semibold">N° Facture</th>
                  <th className="p-3.5 font-semibold">Client</th>
                  <th className="p-3.5 font-semibold">Montant TTC</th>
                  <th className="p-3.5 font-semibold">Déjà Payé</th>
                  <th className="p-3.5 font-semibold">Reste Dû</th>
                  <th className="p-3.5 font-semibold">Statut</th>
                  <th className="p-3.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{inv.customerName}</span>
                      <span className="text-[11px] text-slate-500">{inv.customerAddress}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-slate-900">{inv.totalTTC.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5 font-mono text-emerald-600 font-medium">{inv.paidAmount.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5 font-mono font-bold text-amber-600">{inv.balanceDue.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                        inv.status === 'partially_paid' ? 'bg-blue-100 text-blue-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {inv.status === 'paid' ? 'Payée' : inv.status === 'partially_paid' ? 'Partielle' : 'Impayée'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {inv.balanceDue > 0 && (
                        <button
                          onClick={() => setIsPaymentModalOpen(true)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <DollarSign className="w-3 h-3" /> Encaisser
                        </button>
                      )}
                      <button
                        onClick={() => alert(`Téléchargement de la facture ${inv.invoiceNumber} (PDF)`)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        title="Télécharger PDF"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Payments (Règlements) */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registre des Règlements & Encaissements</h3>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Enregistrer Encaissement
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-semibold">Réf. Règl.</th>
                  <th className="p-3.5 font-semibold">Facture</th>
                  <th className="p-3.5 font-semibold">Client</th>
                  <th className="p-3.5 font-semibold">Montant</th>
                  <th className="p-3.5 font-semibold">Moyen</th>
                  <th className="p-3.5 font-semibold">Référence Bancaire</th>
                  <th className="p-3.5 font-semibold text-right">Agence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{p.paymentNumber}</td>
                    <td className="p-3.5 font-mono font-bold text-blue-600">{p.invoiceNumber}</td>
                    <td className="p-3.5 font-semibold text-slate-900">{p.customerName}</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-600">+{p.amount.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-medium capitalize">
                        {p.method.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600">{p.referenceNumber || 'N/A'}</td>
                    <td className="p-3.5 text-right text-slate-500">{p.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Expenses (Dépenses) */}
      {activeTab === 'expenses' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registre des Dépenses & Coûts Opérationnels</h3>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Enregistrer Dépense
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-semibold">Réf. Dépense</th>
                  <th className="p-3.5 font-semibold">Intitulé & Fournisseur</th>
                  <th className="p-3.5 font-semibold">Catégorie</th>
                  <th className="p-3.5 font-semibold">Montant TTC</th>
                  <th className="p-3.5 font-semibold">Agence / Centre</th>
                  <th className="p-3.5 font-semibold text-right">Statut Paiement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {expenses.map(e => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{e.expenseNumber}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{e.title}</span>
                      <span className="text-[11px] text-slate-500">{e.supplierName || 'Fournisseur direct'}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-[10px] font-bold uppercase">
                        {e.category.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-rose-600">-{e.amountTTC.toLocaleString('fr-FR')} €</td>
                    <td className="p-3.5 text-slate-600">
                      <span className="block font-medium">{e.agency}</span>
                      <span className="text-[11px] text-slate-400">{e.costCenter}</span>
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold uppercase">
                        Payé
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Credit Notes (Avoirs) */}
      {activeTab === 'credit_notes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registre des Avoirs & Notes de Crédit</h3>
            <button
              onClick={() => setIsCreditNoteModalOpen(true)}
              className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Émettre Avoir
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200">
                  <th className="p-3.5 font-semibold">N° Avoir</th>
                  <th className="p-3.5 font-semibold">Facture d'Origine</th>
                  <th className="p-3.5 font-semibold">Client</th>
                  <th className="p-3.5 font-semibold">Motif</th>
                  <th className="p-3.5 font-semibold text-right">Montant Avoir TTC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {creditNotes.map(cn => (
                  <tr key={cn.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{cn.creditNoteNumber}</td>
                    <td className="p-3.5 font-mono font-bold text-blue-600">{cn.invoiceNumber}</td>
                    <td className="p-3.5 font-semibold text-slate-900">{cn.customerName}</td>
                    <td className="p-3.5 text-slate-600">{cn.description}</td>
                    <td className="p-3.5 text-right font-mono font-bold text-amber-600">
                      -{cn.totalTTC.toLocaleString('fr-FR')} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modals */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSaveQuote={handleSaveQuote}
      />

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSaveInvoice={handleSaveInvoice}
      />

      <CreditNoteModal
        isOpen={isCreditNoteModalOpen}
        onClose={() => setIsCreditNoteModalOpen(false)}
        invoices={invoices}
        onSaveCreditNote={handleSaveCreditNote}
      />

      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        invoices={invoices}
        onSavePayment={handleSavePayment}
      />

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onSaveExpense={handleSaveExpense}
      />
    </div>
  );
}
