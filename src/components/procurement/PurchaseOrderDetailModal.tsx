import { useState } from 'react';
import { 
  X, 
  Printer, 
  CheckCircle2, 
  Send, 
  Truck, 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  PackageCheck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PurchaseOrder } from '../../types';

interface Props {
  po: PurchaseOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (poId: string) => void;
  onSendToSupplier: (poId: string) => void;
  onCreateReceipt: (po: PurchaseOrder) => void;
}

export function PurchaseOrderDetailModal({ 
  po, 
  isOpen, 
  onClose, 
  onApprove, 
  onSendToSupplier,
  onCreateReceipt
}: Props) {
  const [printNotif, setPrintNotif] = useState(false);

  if (!isOpen || !po) return null;

  const handlePrint = () => {
    setPrintNotif(true);
    setTimeout(() => setPrintNotif(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-navy-main text-white rounded-2xl shadow-md">
              <FileText size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-navy-main uppercase tracking-tight">
                  Bon de Commande #{po.poNumber}
                </h3>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                  po.status === 'received' ? 'bg-emerald-100 text-emerald-700' :
                  po.status === 'partially_received' ? 'bg-blue-100 text-blue-700' :
                  po.status === 'sent_to_supplier' ? 'bg-purple-100 text-purple-700' :
                  po.status === 'approved' ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {po.status === 'pending_validation' && 'En attente validation hiérarchique'}
                  {po.status === 'approved' && 'Validé hiérarchiquement'}
                  {po.status === 'sent_to_supplier' && 'Commandé au fournisseur'}
                  {po.status === 'partially_received' && 'Réception partielle'}
                  {po.status === 'received' && 'Marchandises réceptionnées'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Émis le {new Date(po.orderDate).toLocaleDateString()} • Livraison prévue le {new Date(po.expectedDeliveryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 border border-neutral-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all"
              title="Imprimer / Exporter le Bon de Commande"
            >
              <Printer size={16} /> Exporter PDF
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-navy-main rounded-xl hover:bg-slate-100">
              <X size={20} />
            </button>
          </div>
        </div>

        {printNotif && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} /> Document Bon de Commande {po.poNumber} prêt pour l'impression ou l'exportation.
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Imputation analytique & Informations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fournisseur</span>
              <p className="text-base font-black text-navy-main">{po.supplierName}</p>
              <p className="text-xs text-slate-500 font-medium">Code: {po.supplierCode}</p>
              <p className="text-xs text-slate-500 font-medium">Modalités de règlement : <span className="font-bold text-navy-main">{po.paymentTerms}</span></p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Imputation & Affectation</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-navy-main text-white rounded text-[10px] font-black uppercase">
                  {po.allocationType}
                </span>
                <p className="text-sm font-black text-navy-main">{po.allocationTargetName}</p>
              </div>
              <p className="text-xs text-slate-500 font-medium">Lieu de livraison : {po.deliveryAddress}</p>
              {po.prNumber && <p className="text-xs text-slate-400">Origine DA : <span className="font-bold">{po.prNumber}</span></p>}
            </div>
          </div>

          {/* Table des articles commandés */}
          <div className="rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-neutral-200 font-black uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Désignation</th>
                  <th className="py-3 px-4">Réf.</th>
                  <th className="py-3 px-4 text-center">Qté Commandée</th>
                  <th className="py-3 px-4 text-center">Qté Réceptionnée</th>
                  <th className="py-3 px-4 text-right">P.U. HT</th>
                  <th className="py-3 px-4 text-right">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {po.items.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-navy-main">{it.description}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{it.partNumber || '-'}</td>
                    <td className="py-3 px-4 text-center font-bold text-navy-main">
                      {it.quantity} {it.unit}
                    </td>
                    <td className="py-3 px-4 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        (it.receivedQuantity || 0) >= it.quantity 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {it.receivedQuantity || 0} / {it.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-600">
                      {(it.negotiatedUnitPrice || it.estimatedUnitPrice).toFixed(2)} €
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-navy-main">
                      {it.totalAmount.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux financiers */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-neutral-200">
            <div className="text-xs text-slate-500 space-y-1">
              {po.validatedBy && (
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <ShieldCheck size={16} /> Validé par {po.validatedBy} le {new Date(po.validationDate || Date.now()).toLocaleDateString()}
                </div>
              )}
              {po.notes && <p className="italic text-slate-600">Note : {po.notes}</p>}
            </div>
            <div className="space-y-1 text-right w-full md:w-64">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Total HT :</span>
                <span>{po.subtotalHT.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>TVA ({po.vatRate}%) :</span>
                <span>{po.vatAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-base font-black text-navy-main border-t border-neutral-200 pt-1">
                <span>Total TTC :</span>
                <span>{po.totalTTC.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Actions du workflow */}
          <div className="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-medium">
              Statut actuel : <span className="font-bold text-navy-main">{po.status}</span>
            </div>

            <div className="flex items-center gap-3">
              {po.status === 'pending_validation' && (
                <button
                  onClick={() => onApprove(po.id)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <CheckCircle2 size={16} /> Valider le Bon de Commande (Resp. Achats)
                </button>
              )}

              {po.status === 'approved' && (
                <button
                  onClick={() => onSendToSupplier(po.id)}
                  className="px-5 py-2.5 bg-navy-main hover:bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <Send size={16} /> Envoyer au Fournisseur
                </button>
              )}

              {(po.status === 'sent_to_supplier' || po.status === 'partially_received') && (
                <button
                  onClick={() => onCreateReceipt(po)}
                  className="px-5 py-2.5 bg-brand-orange hover:bg-amber-600 text-navy-main font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <PackageCheck size={16} /> Réceptionner & Contrôler les marchandises
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 border border-neutral-200 rounded-xl text-slate-600 text-xs font-bold uppercase hover:bg-slate-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
