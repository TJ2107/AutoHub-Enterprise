import React, { useState } from 'react';
import { X, Plus, Trash2, ShieldCheck, Car, Truck, Wrench, Building2, Layers } from 'lucide-react';
import { PurchaseRequest, AllocationType, PurchaseItemLine } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pr: PurchaseRequest) => void;
}

export function NewPurchaseRequestModal({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [requesterName, setRequesterName] = useState('Marc Silva (Chef d\'Atelier)');
  const [department, setDepartment] = useState('Atelier & Maintenance');
  const [urgency, setUrgency] = useState<'low' | 'normal' | 'high' | 'urgent'>('normal');
  const [allocationType, setAllocationType] = useState<AllocationType>('vehicle');
  const [allocationTargetName, setAllocationTargetName] = useState('Toyota Hilux (AB-123-CD)');
  const [reason, setReason] = useState('');
  const [items, setItems] = useState<Array<{ id: string; description: string; partNumber: string; quantity: number; unit: string; estimatedUnitPrice: number }>>([
    { id: 'item-new-1', description: '', partNumber: '', quantity: 1, unit: 'unité', estimatedUnitPrice: 0 }
  ]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: `item-new-${Date.now()}`, description: '', partNumber: '', quantity: 1, unit: 'unité', estimatedUnitPrice: 0 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const estimatedTotal = items.reduce((acc, curr) => acc + (curr.quantity * (curr.estimatedUnitPrice || 0)), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedItems: PurchaseItemLine[] = items.map(item => ({
      id: item.id,
      description: item.description || 'Article non spécifié',
      partNumber: item.partNumber,
      quantity: Number(item.quantity) || 1,
      unit: item.unit,
      estimatedUnitPrice: Number(item.estimatedUnitPrice) || 0,
      totalAmount: (Number(item.quantity) || 1) * (Number(item.estimatedUnitPrice) || 0)
    }));

    const newPr: PurchaseRequest = {
      id: `pr-${Date.now()}`,
      prNumber: `DA-2026-${Math.floor(100 + Math.random() * 900)}`,
      title,
      requesterName,
      department,
      requestDate: Date.now(),
      requiredDate: Date.now() + 7 * 86400000,
      reason,
      urgency,
      allocationType,
      allocationTargetName,
      items: formattedItems,
      estimatedTotal,
      status: 'pending_approval'
    };

    onSubmit(newPr);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-neutral-100 flex items-center justify-between z-10">
          <div>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs uppercase tracking-wider rounded-lg">
              Workflow Achats
            </span>
            <h3 className="text-xl font-black text-navy-main uppercase tracking-tight mt-1">
              Nouvelle Demande d'Achat (DA)
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-navy-main rounded-xl hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Intitulé de la demande *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Remplacement filtre & kit de distribution"
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none focus:border-brand-orange"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Demandeur
              </label>
              <input
                type="text"
                value={requesterName}
                onChange={e => setRequesterName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Département / Service
              </label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Degré d'urgence
              </label>
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none"
              >
                <option value="low">Faible (Planifié)</option>
                <option value="normal">Normale</option>
                <option value="high">Haute</option>
                <option value="urgent">Urgente (Immobilisation)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Type d'imputation analytique
              </label>
              <select
                value={allocationType}
                onChange={e => {
                  const type = e.target.value as AllocationType;
                  setAllocationType(type);
                  if (type === 'vehicle') setAllocationTargetName('Toyota Hilux (AB-123-CD)');
                  else if (type === 'equipment') setAllocationTargetName('Pelle CAT 320 (EQ-CAT-01)');
                  else if (type === 'workshop_order') setAllocationTargetName('Ordre Réparation OR-5542');
                  else if (type === 'agency') setAllocationTargetName('Agence Lyon Sud');
                  else setAllocationTargetName('Centre de Coût - Maintenance Générale');
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none"
              >
                <option value="vehicle">Véhicule spécifique</option>
                <option value="equipment">Équipement industriel</option>
                <option value="workshop_order">Ordre de Réparation / Atelier</option>
                <option value="agency">Agence / Dépôt</option>
                <option value="cost_center">Centre de Coût Général</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                {allocationType === 'vehicle' && <Car size={14} className="text-blue-500" />}
                {allocationType === 'equipment' && <Truck size={14} className="text-amber-500" />}
                {allocationType === 'workshop_order' && <Wrench size={14} className="text-orange-500" />}
                {allocationType === 'agency' && <Building2 size={14} className="text-emerald-500" />}
                {allocationType === 'cost_center' && <Layers size={14} className="text-purple-500" />}
                Cible d'affectation (Véhicule, Équipement, Ordre...) *
              </label>
              <input
                type="text"
                required
                value={allocationTargetName}
                onChange={e => setAllocationTargetName(e.target.value)}
                placeholder="Ex: Immatriculation, N° Série, OR, ou Département"
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-semibold text-navy-main outline-none focus:border-brand-orange"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Suggestions :</span>
                {allocationType === 'vehicle' && (
                  <>
                    <button type="button" onClick={() => setAllocationTargetName('Toyota Hilux (AB-123-CD)')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">Toyota Hilux AB-123-CD</button>
                    <button type="button" onClick={() => setAllocationTargetName('Renault Master (XY-987-ZT)')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">Renault Master XY-987-ZT</button>
                    <button type="button" onClick={() => setAllocationTargetName('Ford Ranger (JK-456-LM)')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">Ford Ranger JK-456-LM</button>
                  </>
                )}
                {allocationType === 'equipment' && (
                  <>
                    <button type="button" onClick={() => setAllocationTargetName('Pelle CAT 320 (EQ-CAT-01)')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">Pelle CAT 320</button>
                    <button type="button" onClick={() => setAllocationTargetName('Chargeuse Komatsu WA380')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">Chargeuse Komatsu WA380</button>
                  </>
                )}
                {allocationType === 'workshop_order' && (
                  <>
                    <button type="button" onClick={() => setAllocationTargetName('Ordre Réparation OR-5542')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">OR-5542</button>
                    <button type="button" onClick={() => setAllocationTargetName('Ordre Réparation OR-5530')} className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 font-medium">OR-5530</button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Motif & Justification de l'achat *
              </label>
              <textarea
                required
                rows={2}
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Précisez la nécessité technique ou l'urgence de la dépense..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-sm font-medium text-navy-main outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          {/* Lignes d'articles */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-navy-main uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-orange" />
                Articles / Prestations demandés ({items.length})
              </h4>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-main rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
              >
                <Plus size={14} /> Ajouter une ligne
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-neutral-200 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Désignation de la pièce / prestation *"
                      required
                      value={item.description}
                      onChange={e => handleItemChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-navy-main outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Ref / OEM"
                      value={item.partNumber}
                      onChange={e => handleItemChange(idx, 'partNumber', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-navy-main outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="number"
                      min="1"
                      placeholder="Qté"
                      value={item.quantity}
                      onChange={e => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-center font-bold text-navy-main outline-none"
                    />
                  </div>
                  <div className="col-span-1">
                    <select
                      value={item.unit}
                      onChange={e => handleItemChange(idx, 'unit', e.target.value)}
                      className="w-full px-1 py-1.5 bg-white border border-neutral-200 rounded-lg text-[10px] font-bold text-navy-main outline-none"
                    >
                      <option value="unité">U</option>
                      <option value="paire">Pr</option>
                      <option value="jeu">Jeu</option>
                      <option value="kit">Kit</option>
                      <option value="fût">Fût</option>
                      <option value="forfait">Forfait</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="P.U. Est."
                        value={item.estimatedUnitPrice || ''}
                        onChange={e => handleItemChange(idx, 'estimatedUnitPrice', Number(e.target.value))}
                        className="w-full pl-2 pr-5 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs font-bold text-navy-main outline-none"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">€</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      disabled={items.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-4">
                <span className="text-xs font-bold text-slate-500 uppercase">Montant estimé Total HT :</span>
                <span className="text-lg font-black text-navy-main">{estimatedTotal.toFixed(2)} € HT</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-navy-main hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-navy-main/20 flex items-center gap-2"
            >
              Soumettre à validation hiérarchique
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
