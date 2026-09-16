import { useParams, Link } from 'react-router-dom';
import { SaleOpportunity } from '../../types';
import { 
  ChevronLeft, FileText, Download, Send, 
  Truck, CheckCircle2, DollarSign, Package,
  History, Clock, AlertCircle
} from 'lucide-react';

const mockSale: SaleOpportunity = {
  id: 'o1',
  customerId: 'c1',
  customerName: 'Jean Dupont',
  vehicleId: 'v1',
  vehicleName: 'Toyota Land Cruiser',
  status: 'ordered',
  date: Date.now() - 432000000,
  totalAmount: 86200,
  margin: 12400,
  orderNumber: 'BC-2024-0042',
  invoiceNumber: 'FAC-2024-0129',
  deliveryStatus: 'preparing',
  deliveryDate: Date.now() + 864000000,
  accessories: [
    { name: 'Tapis de sol protection', price: 150 },
    { name: 'Attelage amovible', price: 1050 }
  ],
  tradeIn: {
    make: 'Toyota',
    model: 'RAV4',
    year: 2018,
    valuation: 15000,
    condition: 'Bon état général'
  }
};

export function SaleDetail() {
  const { id } = useParams();
  const sale = mockSale; // Real app: fetch by id

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link to="/concession/sales" className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-white transition-all">
                <ChevronLeft size={20} />
            </Link>
            <div>
                <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Dossier de Vente #{sale.id}</h2>
                <p className="text-sm text-slate-500 font-medium">Bon de commande : {sale.orderNumber}</p>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 border border-neutral-200 rounded-xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-white flex items-center gap-2">
                <Download size={16} /> Télécharger PDF
            </button>
            <button className="px-4 py-2 bg-navy-main text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 flex items-center gap-2 shadow-lg shadow-navy-main/20">
                <Send size={16} /> Envoyer au client
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* General Info */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-navy-main uppercase tracking-widest mb-6 pb-4 border-b border-neutral-100 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" /> État de la commande
                </h3>
                <div className="relative flex justify-between items-center px-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-100 -translate-y-1/2 -z-0" />
                    <div className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 -z-0" style={{ width: '66%' }} />
                    
                    <div className="z-10 bg-white p-2 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                            <FileText size={18} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-navy-main">Commande</p>
                    </div>
                    <div className="z-10 bg-white p-2 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                            <DollarSign size={18} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-navy-main">Paiement</p>
                    </div>
                    <div className="z-10 bg-white p-2 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center animate-pulse">
                            <Truck size={18} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-blue-500">Livraison</p>
                    </div>
                    <div className="z-10 bg-white p-2 flex flex-col items-center gap-2 opacity-30">
                        <div className="w-10 h-10 bg-neutral-200 text-white rounded-full flex items-center justify-center">
                            <CheckCircle2 size={18} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-neutral-400">Terminé</p>
                    </div>
                </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-navy-main uppercase tracking-widest flex items-center gap-2">
                        <DollarSign size={18} /> Détails Financiers
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider rounded-lg">Facturé</span>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">{sale.vehicleName}</span>
                        <span className="font-bold text-navy-main">85 000 €</span>
                    </div>
                    <div className="space-y-2 pl-4 border-l-2 border-neutral-100">
                        {sale.accessories?.map((acc, i) => (
                            <div key={i} className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">{acc.name}</span>
                                <span className="font-medium text-slate-600">{acc.price.toLocaleString()} €</span>
                            </div>
                        ))}
                    </div>
                    {sale.tradeIn && (
                        <div className="flex justify-between items-center text-sm pt-2 text-orange-600 font-bold border-t border-neutral-50">
                            <span className="flex items-center gap-2">Reprise : {sale.tradeIn.make} {sale.tradeIn.model}</span>
                            <span>- {sale.tradeIn.valuation.toLocaleString()} €</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-6 border-t-2 border-neutral-100">
                        <span className="text-lg font-black text-navy-main uppercase tracking-tighter">Total à régler</span>
                        <span className="text-3xl font-black text-navy-main">{(sale.totalAmount - (sale.tradeIn?.valuation || 0)).toLocaleString()} €</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="space-y-8">
            {/* Delivery Sidebar */}
            <div className="bg-navy-main rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-400">
                    <Truck size={16} /> Suivi Livraison
                </h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-slate-800 rounded-lg">
                            <Clock size={20} className="text-brand-orange" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Date estimée</p>
                            <p className="text-lg font-bold">{new Date(sale.deliveryDate!).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-slate-800 rounded-lg">
                            <Package size={20} className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Statut</p>
                            <p className="text-lg font-bold">Préparation véhicule</p>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white text-navy-main rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all">
                        Valider la livraison
                    </button>
                </div>
            </div>

            {/* Margin Info (Secret/Internal) */}
            <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
                <h3 className="text-xs font-black text-green-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <TrendingUp size={16} /> Analyse de la Marge
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-green-600 font-medium">Marge brute</span>
                        <span className="font-bold text-green-800">{sale.margin?.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-green-600 font-medium">Commission vendeur</span>
                        <span className="font-bold text-green-800">450 €</span>
                    </div>
                    <div className="pt-2 border-t border-green-200 flex justify-between items-center">
                        <span className="text-xs font-black text-green-700 uppercase">Marge nette</span>
                        <span className="text-xl font-black text-green-800">11 950 €</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

import { TrendingUp } from 'lucide-react';
