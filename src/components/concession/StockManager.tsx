import { useState } from 'react';
import { CatalogVehicle } from '../../types';
import { Search, Package, MapPin, TrendingUp, AlertTriangle, Filter, Plus, LayoutGrid, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mockStock: CatalogVehicle[] = [
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
    colors: ['Pearl White'],
    features: ['4WD'],
    images: [],
    type: 'new',
    availability: 'in-stock',
    stockLocation: 'Parc Principal A'
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
    colors: ['Obsidian Black'],
    features: [],
    images: [],
    type: 'used',
    availability: 'reserved',
    stockLocation: 'Showroom B'
  }
];

export function StockManager() {
  const [stock] = useState(mockStock);
  const location = useLocation();

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-navy-main text-white rounded-xl">
                      <Package size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Total Stock</p>
                      <p className="text-2xl font-black text-navy-main">{stock.length} Véhicules</p>
                  </div>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Neufs</span>
                      <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Occasion</span>
                      <span className="font-bold">8</span>
                  </div>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-orange text-white rounded-xl">
                      <TrendingUp size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Valeur Stock (Vente)</p>
                      <p className="text-2xl font-black text-navy-main">1 245 000 €</p>
                  </div>
              </div>
              <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Marge Potentielle</span>
                      <span className="font-bold text-green-600">+185 000 €</span>
                  </div>
              </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-status-alert text-white rounded-xl">
                      <AlertTriangle size={24} />
                  </div>
                  <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Alertes Stock</p>
                      <p className="text-2xl font-black text-navy-main">3 Critiques</p>
                  </div>
              </div>
              <div className="space-y-1">
                  <p className="text-[10px] text-red-500 font-bold">• 2 véhicules en stock &gt; 90 jours</p>
                  <p className="text-[10px] text-orange-500 font-bold">• 1 réservation expirée</p>
              </div>
          </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <h2 className="text-sm font-black text-navy-main uppercase tracking-widest">Inventaire Détaillé</h2>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="Rechercher..." className="pl-9 pr-4 py-1.5 bg-slate-50 border border-neutral-200 rounded-lg text-xs outline-none" />
                  </div>
              </div>
              <div className="flex gap-2">
                  <button className="p-2 border border-neutral-200 rounded-lg text-slate-500 hover:bg-slate-50">
                      <Filter size={16} />
                  </button>
                  <button className="bg-navy-main text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <Plus size={16} /> Nouvelle Reprise
                  </button>
              </div>
          </div>
          <table className="w-full text-left text-sm">
              <thead className="bg-surface-gray border-b border-neutral-200">
                  <tr>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Modèle</th>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Emplacement</th>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">État</th>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Coût (Achat)</th>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Prix (Vente)</th>
                      <th className="px-6 py-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Marge</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                  {stock.map(v => (
                      <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                              <p className="font-bold text-navy-main">{v.make} {v.model}</p>
                              <p className="text-[10px] text-slate-400">{v.version}</p>
                          </td>
                          <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                                  <MapPin size={12} className="text-slate-400" />
                                  {v.stockLocation}
                              </div>
                          </td>
                          <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                  v.availability === 'in-stock' ? 'bg-green-100 text-green-700' : 
                                  v.availability === 'reserved' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                              }`}>
                                  {v.availability}
                              </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-500">
                              {v.costPrice.toLocaleString()} €
                          </td>
                          <td className="px-6 py-4 font-bold text-navy-main">
                              {v.price.toLocaleString()} €
                          </td>
                          <td className="px-6 py-4">
                              <span className="text-green-600 font-black text-xs">
                                  +{(v.price - v.costPrice).toLocaleString()} €
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}
