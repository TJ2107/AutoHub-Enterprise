import React from 'react';
import { GlobalSearch } from './GlobalSearch';
import { useSecurity } from '../../lib/securityContext';
import { Bell, ShieldCheck, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopHeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export function TopHeader({ setMobileOpen }: TopHeaderProps) {
  const { currentUser, roleConfig } = useSecurity();

  return (
    <header className="bg-white border-b border-slate-200 px-6 lg:px-8 py-4 mb-8 rounded-3xl shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-navy-main rounded-2xl transition-colors"
          title="Ouvrir le menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1 max-w-xl">
          <GlobalSearch />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => alert("Aucune nouvelle notification critique.")}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl relative transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
          </button>
        </div>

        <Link to="/admin" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-2xl transition-all">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-xl object-cover border border-slate-300" />
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-navy-main">{currentUser.name}</div>
            <div className="text-[10px] font-semibold text-slate-500">{roleConfig.label}</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
