import React, { useState } from 'react';
import { Invoice, PaymentRecord, PaymentMethodType } from '../../types';
import { X, DollarSign, CheckCircle2 } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: Invoice[];
  onSavePayment: (payment: PaymentRecord) => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  isOpen,
  onClose,
  invoices,
  onSavePayment
}) => {
  const unpaidInvoices = invoices.filter(inv => inv.status !== 'paid');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(unpaidInvoices[0]?.id || invoices[0]?.id || '');
  const targetInvoice = invoices.find(i => i.id === selectedInvoiceId);

  const [amount, setAmount] = useState<number>(targetInvoice ? targetInvoice.balanceDue : 500);
  const [method, setMethod] = useState<PaymentMethodType>('bank_transfer');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('Encaissement validé sur compte bancaire professionnel');

  if (!isOpen) return null;

  const handleInvoiceChange = (invId: string) => {
    setSelectedInvoiceId(invId);
    const inv = invoices.find(i => i.id === invId);
    if (inv) {
      setAmount(inv.balanceDue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInvoice || amount <= 0) {
      alert('Veuillez sélectionner une facture et un montant valide.');
      return;
    }

    const paymentNumber = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      paymentNumber,
      invoiceId: targetInvoice.id,
      invoiceNumber: targetInvoice.invoiceNumber,
      customerId: targetInvoice.customerId,
      customerName: targetInvoice.customerName,
      amount: Number(amount),
      paymentDate: Date.now(),
      method,
      referenceNumber: referenceNumber || undefined,
      agency: targetInvoice.agency,
      status: 'confirmed',
      notes,
      receiptGenerated: true
    };

    onSavePayment(newPayment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg my-8 overflow-hidden flex flex-col">
        <div className="px-6 py-4 bg-navy-main text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Enregistrer un Encaissement</h2>
              <p className="text-xs text-slate-300">Règlement client par Virement, Mobile Money, Carte ou Espèces</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Facture Concernée *</label>
            <select
              value={selectedInvoiceId}
              onChange={(e) => handleInvoiceChange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-medium"
            >
              {invoices.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNumber} - {inv.customerName} (Reste à payer : {inv.balanceDue.toLocaleString('fr-FR')} €)
                </option>
              ))}
            </select>
          </div>

          {targetInvoice && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
              <span className="text-slate-600">Total TTC Facture : <strong>{targetInvoice.totalTTC.toLocaleString('fr-FR')} €</strong></span>
              <span className="text-emerald-700 font-bold">Reste Dû : {targetInvoice.balanceDue.toLocaleString('fr-FR')} €</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Montant Encaissé (€) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              required
              className="w-full px-3 py-2 text-sm bg-white font-bold text-slate-900 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Moyen de Règlement</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as PaymentMethodType)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
            >
              <option value="bank_transfer">Virement Bancaire (SEPA / SWIFT)</option>
              <option value="credit_card">Carte Bancaire / Passerelle Stripe</option>
              <option value="mobile_money_orange">Orange Money</option>
              <option value="mobile_money_mtn">MTN MoMo</option>
              <option value="mobile_money_wave">Wave</option>
              <option value="cash">Espèces en Caisse</option>
              <option value="check">Chèque Bancaire</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Référence Transaction / Bordereau</label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              placeholder="Ex: VIR-REF-998231 ou ID Transaction MoMo"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Commentaires / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
            />
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
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Enregistrer l'Encaissement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
