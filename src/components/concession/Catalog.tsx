import { useState } from 'react';
import { CatalogVehicle } from '../../types';
import { Search, Filter, Tag, Plus, Info, MessageSquare, LayoutGrid, ClipboardList, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mockCatalog: CatalogVehicle[] = [
  {
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
    features: ['4WD', 'Sunroof', 'Leather Seats', 'Navigation'],
    images: ['https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800'],
    type: 'new',
    availability: 'in-stock'
  },
  {
    id: 'c2',
    make: 'Mercedes-Benz',
    model: 'GLE Coupe',
    version: '450 AMG',
    category: 'SUV Coupe',
    year: 2023,
    price: 72000,
    costPrice: 61000,
    fuelType: 'Essence',
    transmission: 'automatic',
    power: 367,
    colors: ['Obsidian Black', 'Diamond White'],
    features: ['AMG Line', 'Night Package', 'Burmester Sound'],
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800'],
    type: 'used',
    condition: 'Excellent',
    mileage: 15000,
    availability: 'in-stock'
  }
];

export function Catalog() {
  const [vehicles] = useState<CatalogVehicle[]>(mockCatalog);
  const [filter, setFilter] = useState<'all' | 'new' | 'used'>('all');
  const location = useLocation();

  const filteredVehicles = filter === 'all' ? vehicles : vehicles.filter(v => v.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 border-b border-neutral-200 pb-4">
          <Link to="/concession" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === '/concession' ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <LayoutGrid size={18} /> Catalogue
          </Link>
          <Link to="/concession/stock" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname === '/concession/stock' ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <Package size={18} /> Stock & Reprise
          </Link>
          <Link to="/concession/sales" className={`flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors ${location.pathname.startsWith('/concession/sales') ? 'text-navy-main' : 'text-slate-400 hover:text-navy-main'}`}>
              <ClipboardList size={18} /> Gestion Ventes
          </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Rechercher un modèle..." 
                    className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-navy-main focus:border-transparent outline-none w-64 bg-white"
                />
            </div>
            <div className="flex bg-white border border-neutral-200 rounded-lg p-1">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === 'all' ? 'bg-navy-main text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    Tous
                </button>
                <button 
                    onClick={() => setFilter('new')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === 'new' ? 'bg-navy-main text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    Neufs
                </button>
                <button 
                    onClick={() => setFilter('used')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === 'used' ? 'bg-navy-main text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    Occasion
                </button>
            </div>
        </div>
        <button className="bg-navy-main text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-900 transition-shadow shadow-sm">
          <Plus size={18} /> Ajouter au catalogue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="relative h-48">
                <img 
                    src={vehicle.images[0]} 
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        vehicle.type === 'new' ? 'bg-blue-600 text-white' : 'bg-brand-orange text-white'
                    }`}>
                        {vehicle.type === 'new' ? 'Neuf' : 'Occasion'}
                    </span>
                    {vehicle.availability === 'in-stock' && (
                        <span className="bg-green-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            En Stock
                        </span>
                    )}
                </div>
            </div>
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-bold text-navy-main text-lg">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">{vehicle.version}</p>
                </div>
                
                <div className="flex items-center justify-between py-2 border-y border-neutral-100">
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Année</p>
                        <p className="text-sm font-bold text-navy-main">{vehicle.year}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Carburant</p>
                        <p className="text-sm font-bold text-navy-main">{vehicle.fuelType}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Boîte</p>
                        <p className="text-sm font-bold text-navy-main capitalize">{vehicle.transmission === 'automatic' ? 'Auto' : 'Man'}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                    <p className="text-xl font-black text-navy-main">{vehicle.price.toLocaleString()} €</p>
                    <div className="flex gap-2">
                        <Link to={`/concession/catalog/${vehicle.id}`} className="p-2 text-slate-400 hover:text-navy-main hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-neutral-200">
                            <Info size={18} />
                        </Link>
                        <button className="bg-navy-main text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors">
                            Devis
                        </button>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
