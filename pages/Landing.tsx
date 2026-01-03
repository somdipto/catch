import React from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Database, ShieldCheck } from 'lucide-react';
import { useWallet } from '../services/wallet';
import { MOCK_BOUNTIES } from '../constants';
import { Badge } from '../components/ui/Badge';

interface LandingProps {
  onNavigate: (page: string) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { connect, connected } = useWallet();

  const handleStart = () => {
    if (!connected) connect();
    onNavigate('marketplace');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="relative border-b border-border/50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <nav className="relative container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="font-mono font-bold text-white text-lg">C</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">Catch</span>
            </div>
            <div className="hidden md:flex gap-4">
                <Button variant="ghost" onClick={() => onNavigate('marketplace')}>Marketplace</Button>
                <Button variant="outline" onClick={handleStart}>Connect Wallet</Button>
            </div>
             <div className="md:hidden flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onNavigate('marketplace')}>App</Button>
            </div>
        </nav>
        
        <div className="relative container mx-auto px-6 py-16 md:py-24 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                Bounty-driven data collection, <br/>
                <span className="text-primary">validated by humans.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Get datasets faster for your ML models. Pay only for usable data. 
                Built on Solana for instant payments and provenance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg" onClick={handleStart}>
                    Start Collecting Data <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg" onClick={() => onNavigate('marketplace')}>
                    Browse Bounties
                </Button>
            </div>
        </div>
      </div>

      {/* Stats / Features Grid */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
             <div className="p-8 border border-border rounded-xl bg-surface/30">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 text-primary">
                    <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Partial Datasets</h3>
                <p className="text-slate-400 leading-relaxed">
                    Contributors upload what they have. You don't need a single vendor to fulfill a massive order.
                </p>
             </div>
             <div className="p-8 border border-border rounded-xl bg-surface/30">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-500">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Human Validation</h3>
                <p className="text-slate-400 leading-relaxed">
                    Validators review submissions against your strict criteria. Reputation systems ensure high quality.
                </p>
             </div>
             <div className="p-8 border border-border rounded-xl bg-surface/30">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 text-green-500">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Payouts</h3>
                <p className="text-slate-400 leading-relaxed">
                    Smart contracts distribute funds automatically upon validation approval. No invoices, no delays.
                </p>
             </div>
        </div>

        {/* Live Marketplace Preview */}
        <div className="border border-border rounded-xl overflow-hidden bg-background">
            <div className="p-6 border-b border-border flex justify-between items-center bg-surface/50">
                <h2 className="text-2xl font-bold text-white">Live Bounties</h2>
                <Button variant="ghost" size="sm" onClick={() => onNavigate('marketplace')}>View All</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                    <thead className="bg-surface/50 text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Bounty</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Reward Pool</th>
                            <th className="px-6 py-4">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {MOCK_BOUNTIES.slice(0, 3).map((b) => (
                            <tr key={b.id} className="hover:bg-surface/30 transition-colors cursor-pointer" onClick={() => onNavigate('marketplace')}>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{b.title}</div>
                                    <div className="text-xs text-slate-500 mt-1">{b.tags.join(', ')}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge status={b.dataType} />
                                </td>
                                <td className="px-6 py-4 font-mono text-primary">
                                    {b.rewardPool} SOL
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary" 
                                                style={{ width: `${(b.acceptedQuantity / b.requiredQuantity) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400 font-mono">
                                            {Math.round((b.acceptedQuantity / b.requiredQuantity) * 100)}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};