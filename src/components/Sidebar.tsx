import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Car, Store, Wrench, CalendarClock, 
  FileText, Truck, Package, Fuel, ShoppingBag, DollarSign, 
  UserCog, Brain, BarChart3, Settings, Database, Star, Shield,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSecurity } from '../lib/securityContext';

interface NavItem {
  name: string;
  path: string;
  icon: any;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'CRM et Clients', path: '/crm', icon: Users },
  { name: 'Véhicules et Parc', path: '/vehicules', icon: Car },
  { name: 'Concession et Ventes', path: '/concession', icon: Store },
  { name: 'Atelier et SAV', path: '/workshop', icon: Wrench },
  { name: 'Maintenance', path: '/maintenance', icon: CalendarClock },
  { name: 'Location', path: '/rental', icon: FileText },
  { name: 'Véhicules Industriels', path: '/industriels', icon: Truck },
  { name: 'Pièces de rechange', path: '/stocks', icon: Package },
  { name: 'Carburant et Missions', path: '/carburant', icon: Fuel },
  { name: 'Achats et Fournisseurs', path: '/achats', icon: ShoppingBag },
  { name: 'Finance et Facturation', path: '/finance', icon: DollarSign },
  { name: 'Ressources Humaines', path: '/rh', icon: UserCog },
  { name: 'IA et Analytics', path: '/ia', icon: Brain },
  { name: 'Rapports et Indicateurs', path: '/rapports', icon: BarChart3 },
  { name: 'Architecture Données', path: '/architecture', icon: Database },
  { name: 'Administration', path: '/admin', icon: Settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const location = useLocation();
  const { roleConfig, hasPermission } = useSecurity();
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('autohub_favorites');
      return saved ? JSON.parse(saved) : ['/', '/vehicules', '/workshop'];
    } catch {
      return ['/', '/vehicules', '/workshop'];
    }
  });

  const toggleFavorite = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(path)) {
      updated = favorites.filter(p => p !== path);
    } else {
      updated = [...favorites, path];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('autohub_favorites', JSON.stringify(updated));
    } catch {}
  };

  const filteredItems = navItems.filter(item => hasPermission(item.path));
  const favoriteItems = filteredItems.filter(item => favorites.includes(item.path));

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`bg-navy-main text-white h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800 shadow-2xl z-50 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 min-w-[36px] bg-brand-orange rounded-xl rotate-45 flex items-center justify-center shadow-lg">
              <Car className="text-navy-main -rotate-45" size={20} />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h1 className="text-base font-black tracking-tight">AUTOHUB</h1>
                <span className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">Enterprise v1.0</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            title={isCollapsed ? 'Agrandir la barre latérale' : 'Rétracter la barre latérale'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 bg-slate-800 text-slate-300 rounded-xl"
          >
            <X size={18} />
          </button>
        </div>

        {/* Role Badge */}
        {!isCollapsed && (
          <div className="mx-4 my-3 px-3 py-2 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Shield size={14} className="text-brand-orange min-w-[14px]" />
              <span className="text-xs font-bold text-slate-300 truncate">{roleConfig.label}</span>
            </div>
            <Link to="/admin" className="text-[10px] bg-slate-800 hover:bg-slate-700 text-brand-orange font-bold px-2 py-0.5 rounded-xl">
              Rôles
            </Link>
          </div>
        )}

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Favorites Section */}
          {!isCollapsed && favoriteItems.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 flex items-center gap-1.5">
                <Star size={12} className="text-amber-400 fill-amber-400" /> Favoris
              </div>
              {favoriteItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={'fav-' + item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon size={16} className="text-brand-orange min-w-[16px]" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(e, item.path)}
                      className="text-amber-400 opacity-80 hover:opacity-100"
                    >
                      <Star size={14} className="fill-amber-400" />
                    </button>
                  </Link>
                );
              })}
            </div>
          )}

          {/* All Modules */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Modules Métiers ({filteredItems.length})
              </div>
            )}
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isFav = favorites.includes(item.path);
              return (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3.5 py-2.5'} rounded-xl text-xs font-medium transition-all group ${
                    isActive ? 'bg-brand-orange text-white font-bold shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon size={18} className={isActive ? 'text-white min-w-[18px]' : 'text-slate-400 group-hover:text-white min-w-[18px]'} />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <button
                      onClick={(e) => toggleFavorite(e, item.path)}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${isFav ? 'opacity-100 text-amber-400' : 'text-slate-500 hover:text-amber-400'}`}
                      title={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                      <Star size={14} className={isFav ? 'fill-amber-400' : ''} />
                    </button>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">Agence active</span>
            <span className="font-mono text-[10px] text-emerald-400">ONLINE</span>
          </div>
        )}
      </aside>
    </>
  );
}
