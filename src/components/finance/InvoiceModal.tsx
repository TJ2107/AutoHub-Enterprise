import React, { useState } from 'react';
import { Invoice, FinanceLineItem, FinanceServiceType, PaymentMethodType } from '../../types';
import { X, FileText, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { agencyList, costCenterList } from './financeData';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveInvoice: (invoice: Invoice) => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  onSaveInvoice
}) => {
  const [title, setTitle] = useState('Prestation Atelier & Pièces Détachées');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [serviceType, setServiceType] = useState<FinanceServiceType>('workshop_repair');
  const [agency, setAgency] = useState('Atelier Central - Paris');
  const [costCenter, setCostCenter] = useState('Centre 101 - Atelier SAV & Mécanique');
  const [paymentTerms, setPaymentTerms] = useState('30 jours fin de mois');
  const [notes, setNotes] = useState('Facture payable par virement bancaire.');
  
  const [items, setItems] = useState<FinanceLineItem[]>([
    {
      id: '1',
      type: 'labor',
      description: 'Prestation de Maintenance & Pièces détachées',
      quantity: 1,
      unit: 'forfait',
      unitPriceHT: 1200,
      unitCostHT: 500,
      vatRate: 20,
      totalHT: 1200,
      totalCostHT: 500,
      marginHT: 700,
      marginRatePercent: 58.3
    }
  ]);

  if (!isOpen) return null;

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        type: 'part',
        description: '',
        quantity: 1,
        unit: 'pièce',
        unitPriceHT: 150,
        unitCostHT: 90,
        vatRate: 20,
        totalHT: 150,
        totalCostHT: 90,
        marginHT: 60,
        marginRatePercent: 40
      }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof FinanceLineItem, value: any) => {
    setItems(items.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === 'quantity' || field === 'unitPriceHT' || field === 'unitCostHT') {
        const qty = Number(field === 'quantity' ? value : updated.quantity);
        const price = Number(field === 'unitPriceHT' ? value : updated.unitPriceHT);
        const cost = Number(field === 'unitCostHT' ? value : updated.unitCostHT);
        updated.totalHT = qty * price;
        updated.totalCostHT = qty * cost;
        updated.marginHT = updated.totalHT - updated.totalCostHT;
        updated.marginRatePercent = updated.totalHT > 0 ? Math.round((updated.marginHT / updated.totalHT) * 1000) / 10 : 0;
      }
      return updated;
    }));
  };

  const subtotalHT = items.reduce((sum, item) => sum + item.totalHT, 0);
  const totalCostHT = items.reduce((sum, item) => sum + item.totalCostHT, 0);
  const totalMarginHT = subtotalHT - totalCostHT;
  const overallMarginPercent = subtotalHT > 0 ? Math.round((totalMarginHT / subtotalHT) * 1000) / 10 : 0;
  const vatAmount = items.reduce((sum, item) => sum + (item.totalHT * (item.vatRate / 100)), 0);
  const totalTTC = subtotalHT + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || items.length === 0) {
      alert('Veuillez renseigner le client et au moins une ligne de facturation.');
      return;
    }

    const invoiceNumber = `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      title,
      customerId: `cust-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      customerAddress,
      serviceType,
      issueDate: Date.now(),
      dueDate: Date.now() + 86400000 * 30,
      items,
      subtotalHT,
      totalCostHT,
      totalMarginHT,
      overallMarginPercent,
      vatRate: 20,
      vatAmount,
      totalTTC,
      paidAmount: 0,
      balanceDue: totalTTC,
      status: 'issued',
      paymentTerms,
      agency,
      costCenter,
      payments: [],
      notes
    };

    onSaveInvoice(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 bg-navy-main text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Émettre une Facture Client</h2>
              <p className="text-xs text-slate-300">Facture normalisée conforme aux obligations fiscales et comptables</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Client Information */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">1. Client Facturé</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du Client / Entreprise *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  placeholder="Ex: SARL Transports Express"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email de Facturation</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  placeholder="facturation@client.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Siège Social</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                  placeholder="10 Boulevard Industriel, 69008 Lyon"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type de Prestation</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as FinanceServiceType)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                >
                  <option value="workshop_repair">Réparation Atelier</option>
                  <option value="vehicle_sale">Vente Véhicule</option>
                  <option value="fleet_rental">Location Flotte</option>
                  <option value="preventive_maintenance">Maintenance Préventive</option>
                  <option value="spare_parts_sale">Vente Pièces Détachées</option>
                </select>
              </div>
            </div>
          </div>

          {/* Agency & Cost Center */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Centre de Coût</label>
              <select
                value={costCenter}
                onChange={(e) => setCostCenter(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              >
                {costCenterList.filter(c => c !== 'Tous les centres').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">2. Lignes de Facturation</h3>
              <button
                type="button"
                onClick={addItem}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Ajouter une ligne
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-semibold">Description</th>
                    <th className="p-3 font-semibold w-20">Qté</th>
                    <th className="p-3 font-semibold w-28">Prix U. HT (€)</th>
                    <th className="p-3 font-semibold w-24">TVA (%)</th>
                    <th className="p-3 font-semibold w-28 text-right">Total HT</th>
                    <th className="p-3 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item) => (
                    <tr key={item.id} className="bg-white">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          required
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                          placeholder="Désignation article ou main d'œuvre..."
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs text-center"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPriceHT}
                          onChange={(e) => updateItem(item.id, 'unitPriceHT', parseFloat(e.target.value) || 0)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs text-right font-medium"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={item.vatRate}
                          onChange={(e) => updateItem(item.id, 'vatRate', parseFloat(e.target.value))}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs"
                        >
                          <option value={20}>20%</option>
                          <option value={18}>18%</option>
                          <option value={10}>10%</option>
                          <option value={0}>0%</option>
                        </select>
                      </td>
                      <td className="p-2 text-right font-mono font-bold text-slate-900">
                        {item.totalHT.toLocaleString('fr-FR')} €
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Total HT : <strong className="text-white">{subtotalHT.toLocaleString('fr-FR')} €</strong> | TVA : <strong className="text-white">{vatAmount.toLocaleString('fr-FR')} €</strong>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Général TTC à Régler</span>
              <span className="text-2xl font-bold font-mono text-emerald-400">{totalTTC.toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Conditions & Mentions Légales</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
            />
          </div>

          {/* Footer Actions */}
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
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Émettre la Facture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
