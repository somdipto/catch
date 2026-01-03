import React, { useState } from 'react';
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
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const { connected, user, connect, disconnect } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: 'marketplace', label: 'Marketplace', icon: List },
    { id: 'create', label: 'Create Bounty', icon: PlusCircle },
    { id: 'contributions', label: 'My Contributions', icon: LayoutDashboard },
    { id: 'validations', label: 'Validations', icon: CheckCircle },
    { id: 'earnings', label: 'Earnings', icon: Wallet },
    { id: 'reputation', label: 'Reputation', icon: Award },
    { id: 'docs', label: 'Docs', icon: FileText },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-background text-slate-200 overflow-hidden font-sans">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 border-r border-border flex flex-col bg-surface/95 md:bg-surface/50 backdrop-blur-xl md:backdrop-blur-none transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('landing')}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-mono font-bold text-white text-lg">C</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Catch</span>
            </div>
            <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
            </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activePage === item.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-slate-400 hover:bg-surface hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          {connected && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">{user.walletAddress}</p>
                  <p className="text-xs text-slate-500 font-mono">{user.balance.toFixed(2)} SOL</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={disconnect}>
                <LogOut size={14} /> Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="primary" className="w-full" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative w-full">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 md:px-6 bg-background/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
                className="md:hidden text-slate-400 hover:text-white p-1" 
                onClick={() => setIsMobileMenuOpen(true)}
            >
                <Menu size={24} />
            </button>
            <h1 className="text-lg font-semibold text-white capitalize">
                {NAV_ITEMS.find(i => i.id === activePage)?.label || activePage}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-background" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};