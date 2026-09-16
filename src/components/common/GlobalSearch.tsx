import React, { useState, useEffect } from 'react';
import { Search, Car, Users, Wrench, FileText, Package, DollarSign, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  path: string;
  icon: any;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const mockData: SearchResult[] = [
    { id: '1', title: 'Renault Master L3H2', subtitle: 'AB-123-CD • Flotte Active', category: 'Véhicules', path: '/vehicules', icon: Car },
    { id: '2', title: 'BTP Logistics SA', subtitle: 'Client Pro • Lyon', category: 'CRM', path: '/crm', icon: Users },
    { id: '3', title: 'Ordre de Réparation #OR-2026-891', subtitle: 'Révision 50k • En cours', category: 'Atelier', path: '/workshop', icon: Wrench },
    { id: '4', title: 'Contrat LDD #LDD-2026-042', subtitle: '12 véhicules • Actif', category: 'Location', path: '/rental', icon: FileText },
    { id: '5', title: 'Plaquette de frein AV (Brembo)', subtitle: 'Stock : 42 unités', category: 'Stocks', path: '/stocks', icon: Package },
    { id: '6', title: 'Facture #FAC-2026-109', subtitle: '15,200 € • En attente', category: 'Finance', path: '/finance', icon: DollarSign },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = query.trim() === '' 
    ? mockData.slice(0, 4) 
    : mockData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-500 px-4 py-2 rounded-2xl text-xs font-semibold transition-all border border-slate-200"
      >
        <Search size={16} />
        <span>Recherche globale (Véhicules, Clients, OR, Pièces...)</span>
        <kbd className="hidden md:inline-block bg-white px-2 py-0.5 rounded-md text-[10px] font-mono border border-slate-300 text-slate-600">Ctrl+K</kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search size={20} className="text-brand-orange" />
              <input
                type="text"
                autoFocus
                placeholder="Tapez votre recherche (ex: Renault, Facture, OR-891...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3">
                {query.trim() === '' ? 'Suggestions récentes' : 'Résultats de recherche'}
              </div>
              {results.map((res) => {
                const Icon = res.icon;
                return (
                  <button
                    key={res.id}
                    onClick={() => {
                      navigate(res.path);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-navy-main text-sm">{res.title}</div>
                        <div className="text-xs text-slate-500">{res.subtitle}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">{res.category}</span>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
                    </div>
                  </button>
                );
              })}
              {results.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Aucun résultat trouvé pour "{query}"
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400 font-medium">
              Astuce : Utilisez <strong>Échap</strong> pour fermer ou cliquez sur un résultat pour naviguer instantanément.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
