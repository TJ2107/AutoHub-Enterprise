import { X, Award, CheckCircle2, Clock, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { RFQ, SupplierQuote } from '../../types';

interface Props {
  rfq: RFQ | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectOffer: (rfqId: string, quote: SupplierQuote) => void;
}

export function RFQComparisonModal({ rfq, isOpen, onClose, onSelectOffer }: Props) {
  if (!isOpen || !rfq) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-100 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-lg">
                Appel d'Offres & Devis
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Réf: {rfq.rfqNumber} (Lié à {rfq.prNumber})
              </span>
            </div>
            <h3 className="text-xl font-black text-navy-main uppercase tracking-tight mt-1">
              {rfq.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-navy-main rounded-xl hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Articles demandés */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-200">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">
              Cahier des charges / Articles en consultation
            </h4>
            <div className="divide-y divide-neutral-200">
              {rfq.items.map((it) => (
                <div key={it.id} className="py-2 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-navy-main">{it.description}</span>
                    {it.partNumber && <span className="ml-2 text-slate-400 font-mono">[{it.partNumber}]</span>}
                  </div>
                  <div className="font-bold text-slate-600">
                    Qté: {it.quantity} {it.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparateur d'offres */}
          <div>
            <h4 className="text-sm font-black text-navy-main uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award size={18} className="text-brand-orange" />
              Comparaison des Offres Fournisseurs ({rfq.quotes.length} reçues)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {rfq.quotes.map((q) => {
                const isCurrentSelected = q.isSelected || rfq.selectedSupplierId === q.supplierId;
                return (
                  <div 
                    key={q.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isCurrentSelected 
                        ? 'border-brand-orange bg-orange-50/30 ring-2 ring-brand-orange/30 shadow-md' 
                        : 'border-neutral-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-black text-sm text-navy-main uppercase tracking-tight">
                          {q.supplierName}
                        </span>
                        {isCurrentSelected && (
                          <span className="px-2 py-0.5 bg-brand-orange text-navy-main font-black text-[10px] uppercase tracking-wider rounded-md">
                            Retenue
                          </span>
                        )}
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-neutral-100 shadow-sm space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Prix Total Proposé</span>
                        <div className="text-2xl font-black text-navy-main">
                          {q.totalAmount.toFixed(2)} € <span className="text-xs font-normal text-slate-500">HT</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock size={14} /> Délai livraison :
                          </span>
                          <span className="font-bold text-navy-main">{q.deliveryDays} jour(s)</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1 text-slate-500">
                            <ShieldCheck size={14} /> Garantie :
                          </span>
                          <span className="font-bold text-navy-main">{q.warrantyMonths} mois</span>
                        </div>

                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center gap-1 text-slate-500">
                            <CheckCircle2 size={14} /> Conformité :
                          </span>
                          <span className="font-black text-emerald-600">{q.complianceScore}%</span>
                        </div>
                      </div>

                      {q.notes && (
                        <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-neutral-100">
                          "{q.notes}"
                        </p>
                      )}
                    </div>

                    <div className="pt-5 mt-4 border-t border-neutral-100">
                      <button
                        type="button"
                        onClick={() => onSelectOffer(rfq.id, q)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          isCurrentSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-navy-main text-white hover:bg-slate-900 shadow-sm'
                        }`}
                      >
                        {isCurrentSelected ? (
                          <>
                            <CheckCircle2 size={16} /> Offre validée
                          </>
                        ) : (
                          <>
                            Retenir cette offre <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
