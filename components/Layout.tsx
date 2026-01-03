import React from 'react';
import { useWallet } from '../services/wallet-provider';
import { useTheme } from '../services/theme';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  CheckCircle, 
  Wallet, 
  Award, 
  FileText, 
  Bell,
  Search,
  ChevronRight,
  Sun,
  Moon
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
  const { theme, toggleTheme } = useTheme();

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
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar - Glassmorphic Dark/Light */}
      <aside className="w-72 border-r border-border flex flex-col bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl relative z-20 transition-colors duration-300">
        <div className="p-6 pb-2 flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/10 transition-shadow">
            <span className="font-mono font-bold text-white dark:text-black text-xl">C</span>
          </div>
          <div>
             <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white block leading-tight">Catch</span>
             <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Protocol</span>
          </div>
        </div>

        <div className="px-4 py-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all shadow-sm text-slate-900 dark:text-slate-200"
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
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md shadow-black/5 dark:shadow-white/5"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-800 dark:hover:text-slate-200"
              )}
            >
              <item.icon size={18} className={cn(activePage === item.id ? "text-slate-200 dark:text-zinc-600" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
              {item.label}
              {activePage === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 dark:bg-black/5"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-border bg-white/30 dark:bg-black/30">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferences</span>
            <button 
                onClick={toggleTheme}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
            >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
          
          {connected && user ? (
            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 dark:from-zinc-700 dark:to-zinc-600 border-2 border-white dark:border-zinc-800 shadow-sm" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{user.walletAddress}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">Rank: Top 5%</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-zinc-950/50 rounded-lg p-2 px-3 mb-2">
                 <span className="text-xs text-slate-500 dark:text-slate-400">Balance</span>
                 <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{user.balance.toFixed(2)} SOL</span>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 h-8" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">Connect to start earning</p>
                <Button variant="primary" className="w-full h-9 text-xs" onClick={connect}>
                Connect Wallet
                </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-background">
        {/* Top Header - Glassmorphism */}
        <header className="h-20 flex items-center justify-between px-8 z-10 sticky top-0 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-border">
          <div className="flex flex-col">
             <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize tracking-tight">
                {NAV_ITEMS.find(i => i.id === activePage)?.label || activePage}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>Application</span>
                <ChevronRight size={10} />
                <span>{activePage}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 rounded-full bg-transparent border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black" />
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