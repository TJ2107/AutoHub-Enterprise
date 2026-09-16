import React, { useState } from 'react';
import { OperationalExpense, PaymentMethodType } from '../../types';
import { 
  X, 
  TrendingDown, 
  CheckCircle2, 
  Tag, 
  Fuel, 
  Wrench, 
  Package, 
  Users, 
  Building,
  Upload
} from 'lucide-react';
import { agencyList, costCenterList } from './financeData';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExpense: (expense: OperationalExpense) => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSaveExpense
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<OperationalExpense['category']>('maintenance_cost');
  const [supplierName, setSupplierName] = useState('');
  const [amountHT, setAmountHT] = useState<number>(500);
  const [vatRate, setVatRate] = useState<number>(20);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bank_transfer');
  const [paymentStatus, setPaymentStatus] = useState<OperationalExpense['paymentStatus']>('paid');
  const [agency, setAgency] = useState('Atelier Central - Paris');
  const [costCenter, setCostCenter] = useState('Centre 101 - Atelier SAV & Mécanique');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const vatAmount = Math.round(amountHT * (vatRate / 100) * 100) / 100;
  const amountTTC = Math.round((amountHT + vatAmount) * 100) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || amountHT <= 0) {
      alert('Veuillez renseigner le titre et un montant valide.');
      return;
    }

    const expenseNumber = `DEP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newExpense: OperationalExpense = {
      id: `exp-${Date.now()}`,
      expenseNumber,
      title,
      category,
      supplierName: supplierName || undefined,
      amountHT: Number(amountHT),
      vatAmount,
      amountTTC,
      date: Date.now(),
      paymentMethod,
      paymentStatus,
      agency,
      costCenter,
      vehiclePlate: vehiclePlate || undefined,
      equipmentName: equipmentName || undefined,
      customerName: customerName || undefined,
      description
    };

    onSaveExpense(newExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl my-8 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-400/40 flex items-center justify-center text-rose-300">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Enregistrer une Dépense / Coût Opérationnel
              </h2>
              <p className="text-xs text-slate-400">
                Imputation analytique par Centre de Coût, Agence, Véhicule ou Équipement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Intitulé / Libellé de la Dépense *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500"
                placeholder="Ex: Ravitaillement Carburant Cuve Atelier ou Achat Huile Moteur"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catégorie de Coût *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as OperationalExpense['category'])}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-medium"
              >
                <option value="maintenance_cost">Coûts de Maintenance & Réparation</option>
                <option value="fuel_cost">Coûts de Carburant & Énergie</option>
                <option value="spare_parts_cost">Coûts des Pièces Détachées</option>
                <option value="labor_cost">Coûts de Main-d'œuvre & Salaires</option>
                <option value="subcontracting_cost">Sous-traitance & Prestataires</option>
                <option value="agency_overhead">Frais Généraux & Agence</option>
                <option value="insurance_tax">Assurances, Taxes & Visites</option>
                <option value="equipment_depreciation">Amortissement Matériel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fournisseur / Prestataire
              </label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
                placeholder="Ex: TotalEnergies, Bosch, Valeo..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Montant HT (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amountHT}
                onChange={(e) => setAmountHT(parseFloat(e.target.value) || 0)}
                required
                className="w-full px-3 py-2 text-sm bg-white font-bold text-slate-900 border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Taux TVA
              </label>
              <select
                value={vatRate}
                onChange={(e) => setVatRate(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              >
                <option value={20}>20% (France standard)</option>
                <option value={18}>18% (Zone UEMOA)</option>
                <option value={10}>10% (Taux réduit)</option>
                <option value={0}>0% (Exonéré / Salaires)</option>
              </select>
            </div>
          </div>

          {/* Totals Preview */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Montant HT : <strong>{amountHT.toLocaleString('fr-FR')} €</strong> | TVA ({vatRate}%) : <strong>{vatAmount.toLocaleString('fr-FR')} €</strong>
            </span>
            <span className="text-sm font-bold text-rose-700 font-mono">
              Total TTC : {amountTTC.toLocaleString('fr-FR')} € TTC
            </span>
          </div>

          {/* Analytical Allocations */}
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Imputations et Ventilations Analytiques
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Agence Responsable
                </label>
                <select
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                >
                  {agencyList.filter(a => a !== 'Toutes les agences').map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Centre de Coût Analytique
                </label>
                <select
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                >
                  {costCenterList.filter(c => c !== 'Tous les centres').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Véhicule Imputé (Optionnel)
                </label>
                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  placeholder="Ex: AB-123-CD (Toyota Hilux)"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Équipement / Engin Imputé (Optionnel)
                </label>
                <input
                  type="text"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                  placeholder="Ex: Pelle CAT 320 GC"
                />
              </div>
            </div>
          </div>

          {/* Payment Method & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Moyen de Paiement Utilisé
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodType)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              >
                <option value="bank_transfer">Virement Bancaire</option>
                <option value="cash">Espèces en Caisse</option>
                <option value="credit_card">Carte Bancaire / Corporate</option>
                <option value="mobile_money_orange">Orange Money</option>
                <option value="mobile_money_mtn">MTN MoMo</option>
                <option value="mobile_money_wave">Wave</option>
                <option value="check">Chèque Entreprise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Statut de Paiement
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as OperationalExpense['paymentStatus'])}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg"
              >
                <option value="paid">Payé / Décaissé</option>
                <option value="pending">En attente d'approbation</option>
                <option value="scheduled">Planifié / Échéance future</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description / Justification
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
              placeholder="Détails complémentaires sur la dépense..."
            />
          </div>

          {/* Footer */}
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
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Enregistrer la Dépense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
