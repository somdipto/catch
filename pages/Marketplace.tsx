import React from 'react';
import { MOCK_BOUNTIES } from '../constants';
import { Badge } from '../components/ui/Badge';
import { Search, Filter } from 'lucide-react';
import { Bounty } from '../types';

interface MarketplaceProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredBounties = MOCK_BOUNTIES.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
           <h2 className="text-2xl font-bold text-white tracking-tight">Marketplace</h2>
           <p className="text-slate-400 text-sm mt-1">Browse active data collection requests.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input 
                    type="text" 
                    placeholder="Search bounties..." 
                    className="w-full h-10 pl-10 pr-4 bg-surface border border-border rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="h-10 px-4 border border-border rounded-md bg-surface text-slate-300 hover:text-white flex items-center justify-center gap-2 text-sm">
                <Filter size={16} /> Filters
            </button>
        </div>
      </div>

      <div className="border border-border rounded-lg bg-surface/20 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
            <thead className="bg-surface text-slate-400 font-medium">
                <tr>
                <th className="px-6 py-4 font-medium">Bounty Name</th>
                <th className="px-6 py-4 font-medium">Data Type</th>
                <th className="px-6 py-4 font-medium">Reward</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium">Validators</th>
                <th className="px-6 py-4 font-medium">Deadline</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border">
                {filteredBounties.map((b) => (
                <tr 
                    key={b.id} 
                    onClick={() => onNavigate('bounty-detail', { bountyId: b.id })}
                    className="hover:bg-surface/50 transition-colors cursor-pointer group"
                >
                    <td className="px-6 py-4">
                        <div className="font-medium text-white group-hover:text-primary transition-colors">{b.title}</div>
                        <div className="flex gap-2 mt-1.5">
                            {b.tags.map(t => (
                                <span key={t} className="px-1.5 py-0.5 rounded-sm bg-border/50 text-slate-400 text-[10px] uppercase tracking-wide">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <Badge status={b.dataType} />
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-mono text-white font-medium">{b.rewardPool} SOL</div>
                        <div className="text-xs text-slate-500 mt-0.5">~{(b.rewardPool / b.requiredQuantity).toFixed(4)} / unit</div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="w-full min-w-[120px] max-w-[140px]">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-slate-300 font-mono">{b.acceptedQuantity}</span>
                                <span className="text-slate-500 font-mono">/ {b.requiredQuantity}</span>
                            </div>
                            <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border/50">
                                <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${(b.acceptedQuantity / b.requiredQuantity) * 100}%` }}
                                />
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-mono">
                        {b.validatorCount}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                        {b.deadline}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {filteredBounties.length === 0 && (
            <div className="p-12 text-center text-slate-500">
                No bounties found matching your search.
            </div>
        )}
      </div>
    </div>
  );
};