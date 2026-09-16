import { useParams, Link } from 'react-router-dom';
import { CatalogVehicle } from '../../types';
import { ChevronLeft, CheckCircle2, BadgeCheck, FileText, Share2, Printer } from 'lucide-react';
import { useState } from 'react';

const mockVehicle: CatalogVehicle = {
  id: 'c1',
  make: 'Toyota',
  model: 'Land Cruiser',
  version: 'VXR V8',
  category: 'SUV',
  year: 2024,
  price: 85000,
  costPrice: 72000,
  fuelType: 'Diesel',
  transmission: 'automatic',
  power: 300,
  colors: ['Pearl White', 'Black Metallic', 'Silver'],
  features: ['4WD', 'Sunroof', 'Leather Seats', 'Navigation', '360 Camera', 'Cool Box', 'Adaptive Cruise Control'],
  images: [
    'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200'
  ],
  type: 'new',
  availability: 'in-stock'
};

export function VehiclePublicSheet() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const v = mockVehicle; // In real app, fetch by id

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/concession" className="flex items-center gap-2 text-slate-500 hover:text-navy-main transition-colors font-medium">
            <ChevronLeft size={20} /> Retour au catalogue
        </Link>
        <div className="flex gap-2">
            <button className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                <Share2 size={18} />
            </button>
            <button className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                <Printer size={18} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
                <img src={v.images[activeImage]} alt={v.model} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {v.images.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveImage(idx)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-navy-main' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img src={img} alt={`${v.model} view ${idx}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>

        {/* Info & Quote Form */}
        <div className="space-y-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-navy-main text-white text-[10px] font-bold uppercase tracking-wider rounded">
                        {v.type === 'new' ? 'Neuf' : 'Occasion'}
                    </span>
                    <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                        <BadgeCheck size={14} /> Certifié AutoHub
                    </span>
                </div>
                <h1 className="text-4xl font-black text-navy-main uppercase tracking-tight">{v.make} {v.model}</h1>
                <p className="text-xl text-slate-500 font-medium">{v.version}</p>
                <div className="pt-4">
                    <p className="text-5xl font-black text-navy-main">{v.price.toLocaleString()} €</p>
                    <p className="text-sm text-slate-400 font-medium">TVA incluse / Hors frais d'immatriculation</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 bg-surface-gray rounded-2xl border border-neutral-200">
                <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Carburant</p>
                    <p className="text-lg font-bold text-navy-main">{v.fuelType}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Boîte de vitesse</p>
                    <p className="text-lg font-bold text-navy-main capitalize">{v.transmission}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Année</p>
                    <p className="text-lg font-bold text-navy-main">{v.year}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Puissance</p>
                    <p className="text-lg font-bold text-navy-main">{v.power} ch</p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-navy-main uppercase tracking-wider">Équipements vedettes</h3>
                <div className="grid grid-cols-2 gap-y-3">
                    {v.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <CheckCircle2 size={16} className="text-green-500" /> {feature}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 border border-neutral-200 rounded-3xl bg-white shadow-xl space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-navy-main uppercase tracking-tight">Demande de devis</h3>
                    <p className="text-sm text-slate-500">Nos experts vous répondront sous 24h avec une offre personnalisée.</p>
                </div>
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nom Complet</label>
                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main transition-all" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Téléphone</label>
                            <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main transition-all" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                        <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-navy-main transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-navy-main text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg hover:shadow-navy-main/20 flex items-center justify-center gap-3">
                        <FileText size={20} /> Obtenir mon offre
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
