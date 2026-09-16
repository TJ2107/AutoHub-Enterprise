import { useState } from 'react';
import { 
  Car, 
  Search, 
  Filter, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Fuel, 
  Settings,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const mockCatalog = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Hilux',
    category: 'Pick-up',
    plate: 'AB-123-CD',
    status: 'available',
    site: 'Agence Centrale',
    fuelType: 'Diesel',
    dailyRate: 85,
    monthlyRate: 2100,
    features: ['4x4', 'GPS', 'Clim']
  },
  {
    id: 'v2',
    make: 'Renault',
    model: 'Master',
    category: 'Utilitaire',
    plate: 'JK-456-LM',
    status: 'available',
    site: 'Atelier Nord',
    fuelType: 'Diesel',
    dailyRate: 110,
    monthlyRate: 2800,
    features: ['12m3', 'Caméra de recul']
  },
  {
    id: 'v3',
    make: 'Peugeot',
    model: '3008',
    category: 'SUV',
    plate: 'XY-987-ZT',
    status: 'reserved',
    site: 'Agence Centrale',
    fuelType: 'Hybride',
    dailyRate: 95,
    monthlyRate: 2300,
    features: ['Auto', 'Premium']
  }
];

export function RentalCatalog() {
  const navigate = useNavigate();
  const [vehicles] = useState(mockCatalog);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 border border-neutral-200 rounded-xl text-slate-500 hover:bg-white shadow-sm transition-all">
                <ChevronLeft size={20} />
            </button>
            <div>
                <h2 className="text-2xl font-black text-navy-main uppercase tracking-tight">Catalogue de Location</h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Vérification de la disponibilité et tarifs</p>
            </div>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Modèle, immat, ville..." className="pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy-main w-64 shadow-sm" />
            </div>
            <button className="p-2.5 bg-white border border-neutral-200 rounded-xl text-slate-500 hover:text-navy-main transition-all shadow-sm">
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden group hover:border-brand-orange transition-all flex flex-col">
            <div className="p-6 space-y-4 flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-black uppercase tracking-widest">{vehicle.category}</span>
                    <h3 className="text-xl font-black text-navy-main uppercase tracking-tighter">{vehicle.make} {vehicle.model}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{vehicle.plate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    vehicle.status === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                    {vehicle.status === 'available' ? 'Disponible' : 'Réservé'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-100">
                <div className="flex items-center gap-2 text-slate-500">
                    <Fuel size={14} />
                    <span className="text-[10px] font-bold uppercase">{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase">{vehicle.site}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {vehicle.features.map(f => (
                    <span key={f} className="px-2 py-1 bg-slate-50 text-[10px] font-bold text-slate-400 rounded-lg">{f}</span>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">À partir de</p>
                    <p className="text-2xl font-black text-navy-main">{vehicle.dailyRate} €<span className="text-xs text-slate-400">/jour</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mensuel</p>
                    <p className="text-sm font-black text-brand-orange">{vehicle.monthlyRate} €</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-neutral-100 flex gap-2">
                <button className="flex-1 py-3 bg-white border border-neutral-200 text-navy-main rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Calendrier
                </button>
                <Link 
                    to={`/rental/new?vehicle=${vehicle.id}`} 
                    className={`flex-[2] py-3 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        vehicle.status === 'available' 
                        ? 'bg-navy-main text-white hover:bg-slate-900 shadow-md' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                    Réserver maintenant
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
