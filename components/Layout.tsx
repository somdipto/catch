import React from 'react';
import { useWallet } from '../services/wallet';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  CheckCircle, 
  Wallet, 
  Award, 
  FileText, 
  LogOut,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const { connected, user, connect, disconnect } = useWallet();

  const NAV_ITEMS = [
    { id: 'marketplace', label: 'Marketplace', icon: List },
    { id: 'create', label: 'Create Bounty', icon: PlusCircle },
    { id: 'contributions', label: 'My Contributions', icon: LayoutDashboard },
    { id: 'validations', label: 'Validations', icon: CheckCircle },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'reputation', label: 'Reputation', icon: Award },
    { id: 'docs', label: 'Docs', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden font-sans">
      {/* Sidebar - Apple/Stripe Style */}
      <aside className="w-72 border-r border-border flex flex-col bg-surface/50 backdrop-blur-xl relative z-20">
        <div className="p-6 pb-2 flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-DEFAULT to-accent-purple rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
            <span className="font-mono font-bold text-white text-xl">C</span>
          </div>
          <div>
             <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">Catch</span>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Enterprise</span>
          </div>
        </div>

        <div className="px-4 py-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT/20 transition-all shadow-sm"
                />
            </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileHover={{ x: 4 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all relative overflow-hidden group",
                activePage === item.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon size={18} className={cn(activePage === item.id ? "text-blue-300" : "text-slate-400 group-hover:text-slate-600")} />
              {item.label}
              {activePage === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-border bg-white/50">
          {connected && user ? (
            <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white shadow-sm" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user.walletAddress}</p>
                  <p className="text-xs text-slate-500 font-mono">Rank: Top 5%</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 rounded-lg p-2 px-3 mb-2">
                 <span className="text-xs text-slate-500">Balance</span>
                 <span className="text-sm font-mono font-bold text-slate-900">{user.balance.toFixed(2)} SOL</span>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs text-red-500 hover:text-red-600 hover:bg-red-50 h-8" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-center shadow-lg shadow-slate-900/20">
                <p className="text-xs text-blue-200 mb-3 font-medium">Connect to start earning</p>
                <Button variant="secondary" className="w-full h-9 text-xs" onClick={connect}>
                Connect Wallet
                </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-surface">
        {/* Top Header - Glassmorphism */}
        <header className="h-20 flex items-center justify-between px-8 z-10 sticky top-0 bg-surface/80 backdrop-blur-md">
          <div className="flex flex-col">
             <h1 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">
                {NAV_ITEMS.find(i => i.id === activePage)?.label || activePage}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span>Application</span>
                <ChevronRight size={10} />
                <span>{activePage}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4 scroll-smooth">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
             {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};
