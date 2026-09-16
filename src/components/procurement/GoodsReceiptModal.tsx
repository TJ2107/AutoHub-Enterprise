import React, { useState } from 'react';
import { 
  X, 
  PackageCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Truck, 
  FileText, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { PurchaseOrder, GoodsReceipt, GoodsReceiptItem } from '../../types';

interface Props {
  po: PurchaseOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReceipt: (receipt: GoodsReceipt) => void;
}

export function GoodsReceiptModal({ po, isOpen, onClose, onSubmitReceipt }: Props) {
  if (!isOpen || !po) return null;

  const [deliveryNoteNumber, setDeliveryNoteNumber] = useState(`BL-FOURN-${Math.floor(10000 + Math.random() * 90000)}`);
  const [receiverName, setReceiverName] = useState('Ahmed Magasinier');
  const [inspectorNotes, setInspectorNotes] = useState('');
  const [itemsConformity, setItemsConformity] = useState<GoodsReceiptItem[]>(
    po.items.map(it => ({
      itemId: it.id,
      description: it.description,
      partNumber: it.partNumber,
      orderedQty: it.quantity,
      receivedQty: it.quantity - (it.receivedQuantity || 0),
      acceptedQty: it.quantity - (it.receivedQuantity || 0),
      rejectedQty: 0,
      conformityStatus: 'conform',
      defectsDescription: ''
    }))
  );

  const handleQtyChange = (idx: number, field: 'receivedQty' | 'acceptedQty' | 'rejectedQty', val: number) => {
    const updated = [...itemsConformity];
    const current = { ...updated[idx], [field]: Math.max(0, val) };
    
    if (field === 'receivedQty') {
      current.acceptedQty = current.receivedQty - current.rejectedQty;
    } else if (field === 'rejectedQty') {
      current.acceptedQty = Math.max(0, current.receivedQty - val);
    } else if (field === 'acceptedQty') {
      current.rejectedQty = Math.max(0, current.receivedQty - val);
    }

    if (current.rejectedQty > 0 && current.acceptedQty > 0) {
      current.conformityStatus = 'partial_defect';
    } else if (current.rejectedQty > 0 && current.acceptedQty === 0) {
      current.conformityStatus = 'rejected';
    } else {
      current.conformityStatus = 'conform';
    }

    updated[idx] = current;
    setItemsConformity(updated);
  };

  const handleStatusChange = (idx: number, status: 'conform' | 'partial_defect' | 'rejected') => {
    const updated = [...itemsConformity];
    const current = { ...updated[idx], conformityStatus: status };
    if (status === 'conform') {
      current.acceptedQty = current.receivedQty;
      current.rejectedQty = 0;
    } else if (status === 'rejected') {
      current.acceptedQty = 0;
      current.rejectedQty = current.receivedQty;
    }
    updated[idx] = current;
    setItemsConformity(updated);
  };

  const hasRejections = itemsConformity.some(it => it.rejectedQty > 0);
  const overallConformity: 'compliant' | 'with_reservations' | 'rejected' = 
    itemsConformity.every(it => it.conformityStatus === 'conform') ? 'compliant' :
    itemsConformity.every(it => it.conformityStatus === 'rejected') ? 'rejected' : 'with_reservations';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReceipt: GoodsReceipt = {
      id: `rec-${Date.now()}`,
      receiptNumber: `BR-2026-${Math.floor(100 + Math.random() * 900)}`,
      poId: po.id,
      poNumber: po.poNumber,
      supplierName: po.supplierName,
      deliveryNoteNumber: deliveryNoteNumber || 'BL-DIRECT',
      receiptDate: Date.now(),
      receiverName,
      items: itemsConformity,
      conformityOverall: overallConformity,
      inspectorNotes,
      stockUpdated: true
    };

    onSubmitReceipt(newReceipt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
              <PackageCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider rounded-md">
                  Contrôle & Réception
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Pour Bon de Commande {po.poNumber}
                </span>
              </div>
              <h3 className="text-xl font-black text-navy-main uppercase tracking-tight mt-0.5">
                Procès-Verbal de Réception & Conformité
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-navy-main rounded-xl hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Entête réception */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-neutral-200">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fournisseur</span>
              <p className="text-sm font-black text-navy-main">{po.supplierName}</p>
              <p className="text-xs text-slate-500 font-medium">Affecté à : {po.allocationTargetName}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                N° Bon de Livraison (BL) Fournisseur *
              </label>
              <input
                type="text"
                required
                value={deliveryNoteNumber}
                onChange={e => setDeliveryNoteNumber(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs font-bold text-navy-main outline-none focus:border-brand-orange"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                Réceptionnaire / Contrôleur *
              </label>
              <input
                type="text"
                required
                value={receiverName}
                onChange={e => setReceiverName(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-xs font-bold text-navy-main outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {/* Grille de contrôle de conformité ligne à ligne */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-navy-main uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-orange" />
                Contrôle Qualitatif & Quantitatif des Articles
              </h4>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                overallConformity === 'compliant' ? 'bg-emerald-100 text-emerald-800' :
                overallConformity === 'with_reservations' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                Statut Global : {
                  overallConformity === 'compliant' ? 'Conforme 100%' :
                  overallConformity === 'with_reservations' ? 'Réserve / Défaut partiel' : 'Rejet Global'
                }
              </span>
            </div>

            <div className="space-y-3">
              {itemsConformity.map((item, idx) => (
                <div key={item.itemId} className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-neutral-100 pb-2">
                    <div>
                      <span className="text-sm font-black text-navy-main">{item.description}</span>
                      {item.partNumber && (
                        <span className="ml-2 text-xs font-mono text-slate-400">[{item.partNumber}]</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 font-bold">
                      Commandé : <span className="text-navy-main">{item.orderedQty}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                        Qté Livrée
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={item.orderedQty}
                        value={item.receivedQty}
                        onChange={e => handleQtyChange(idx, 'receivedQty', Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-neutral-200 rounded-xl text-xs font-black text-navy-main text-center outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">
                        Qté Acceptée (Conforme)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={item.receivedQty}
                        value={item.acceptedQty}
                        onChange={e => handleQtyChange(idx, 'acceptedQty', Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-black text-emerald-800 text-center outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                        Qté Rejetée (Défaut/Non-conforme)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={item.receivedQty}
                        value={item.rejectedQty}
                        onChange={e => handleQtyChange(idx, 'rejectedQty', Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-red-50 border border-red-200 rounded-xl text-xs font-black text-red-800 text-center outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                        Résultat Contrôle
                      </label>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(idx, 'conform')}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            item.conformityStatus === 'conform'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Conforme
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(idx, 'rejected')}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                            item.conformityStatus === 'rejected'
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Rejet
                        </button>
                      </div>
                    </div>
                  </div>

                  {item.rejectedQty > 0 && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Motif de non-conformité (Ex: Colis endommagé, pièce non conforme au plan, rayures...)"
                        value={item.defectsDescription || ''}
                        onChange={e => {
                          const updated = [...itemsConformity];
                          updated[idx] = { ...updated[idx], defectsDescription: e.target.value };
                          setItemsConformity(updated);
                        }}
                        className="w-full px-3 py-1.5 bg-red-50/50 border border-red-200 rounded-xl text-xs font-medium text-red-800 outline-none placeholder:text-red-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Remarques inspecteur & Mise à jour stock */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Procès-Verbal de Contrôle & Réserves éventuelles
            </label>
            <textarea
              rows={2}
              value={inspectorNotes}
              onChange={e => setInspectorNotes(e.target.value)}
              placeholder="Indiquez l'état général des emballages, présence des certificats matière, état visuel..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-xs font-medium text-navy-main outline-none focus:border-brand-orange"
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              <div>
                <span className="font-bold">Mise à jour automatique du Stock :</span>
                <span className="ml-1 text-blue-700">Les quantités conformes seront intégrées au stock magasin et imputées à l'analytique.</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 text-slate-600 font-bold text-xs uppercase hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 flex items-center gap-2"
            >
              <PackageCheck size={16} /> Enregistrer le Bon de Réception (BR)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
