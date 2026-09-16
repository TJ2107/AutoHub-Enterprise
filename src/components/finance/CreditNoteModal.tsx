import React, { useState } from 'react';
import { CreditNote, Invoice } from '../../types';
import { X, FileText, CheckCircle2 } from 'lucide-react';
import { agencyList } from './financeData';

interface CreditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: Invoice[];
  onSaveCreditNote: (cn: CreditNote) => void;
}

export const CreditNoteModal: React.FC<CreditNoteModalProps> = ({
  isOpen,
  onClose,
  invoices,
  onSaveCreditNote
}) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id || '');
  const [reason, setReason] = useState<'commercial_discount' | 'part_return' | 'service_cancellation' | 'billing_error' | 'goodwill_gesture'>('part_return');
  const [description, setDescription] = useState('Retour de pièce non conforme');
  const [amountHT, setAmountHT] = useState<number>(350);
  const [vatRate, setVatRate] = useState<number>(20);
  const [agency, setAgency] = useState('Atelier Central - Paris');

  if (!isOpen) return null;

  const vatAmount = Math.round(amountHT * (vatRate / 100) * 100) / 100;
  const totalTTC = Math.round((amountHT + vatAmount) * 100) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = invoices.find(i => i.id === selectedInvoiceId);
    if (!inv || amountHT <= 0 || !description) {
      alert('Veuillez sélectionner une facture valide, un motif et un montant.');
      return;
    }

    const creditNoteNumber = `AV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCN: CreditNote = {
      id: `cn-${Date.now()}`,
      creditNoteNumber,
      invoiceId: inv.id,
      invoiceNumber: inv.invoiceNumber,
      customerId: inv.customerId,
      customerName: inv.customerName,
      issueDate: Date.now(),
      reason,
      description,
      items: [
        {
          id: `cni-${Date.now()}`,
          description: `Avoir sur ${inv.invoiceNumber} : ${description}`,
          quantity: 1,
          unitPriceHT: amountHT,
          totalHT: amountHT
        }
      ],
      subtotalHT: amountHT,
      vatAmount,
      totalTTC,
      status: 'applied_to_invoice',
      agency,
      costCenter: inv.costCenter
    };

    onSaveCreditNote(newCN);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl my-8 overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-navy-main text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Émettre un Avoir (Note de Crédit)</h2>
              <p className="text-xs text-slate-300">Régularisation et minoration de créance client</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facture d'Origine Concernée *</label>
            <select
              value={selectedInvoiceId}
              onChange={(e) => setSelectedInvoiceId(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-medium"
            >
              {invoices.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.customerName} ({inv.totalTTC.toLocaleString('fr-FR')} €)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Motif de l'Avoir *</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            >
              <option value="part_return">Retour de Pièce</option>
              <option value="commercial_discount">Remise Commerciale</option>
              <option value="service_cancellation">Annulation Prestation</option>
              <option value="billing_error">Erreur de Facturation</option>
              <option value="goodwill_gesture">Geste Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Justification *</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              placeholder="Ex: Retour pièce non conforme"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Montant HT Remboursé (€) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amountHT}
                onChange={(e) => setAmountHT(parseFloat(e.target.value) || 0)}
                required
                className="w-full px-3 py-2 text-sm bg-white font-bold border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Taux TVA</label>
              <select
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              >
                <option value={20}>20%</option>
                <option value={18}>18%</option>
                <option value={10}>10%</option>
                <option value={0}>0%</option>
              </select>
            </div>
          </div>

          {/* Totals Preview */}
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs">
            <span className="text-amber-900">
              Montant HT : <strong>{amountHT.toLocaleString('fr-FR')} €</strong> | TVA : <strong>{vatAmount.toLocaleString('fr-FR')} €</strong>
            </span>
            <span className="text-sm font-bold text-amber-900 font-mono">
              Total Avoir TTC : {totalTTC.toLocaleString('fr-FR')} €
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Agence Émettrice</label>
            <select
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            >
              {agencyList.filter(a => a !== 'Toutes les agences').map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Émettre l'Avoir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
