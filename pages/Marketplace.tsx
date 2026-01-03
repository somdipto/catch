import React from 'react';
import { MOCK_BOUNTIES } from '../constants';
import { Badge } from '../components/ui/Badge';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Bounty } from '../types';
import { motion } from 'framer-motion';

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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Marketplace</h2>
           <p className="text-slate-500 mt-2 text-lg">Browse active data collection requests from AI companies.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search bounties..." 
                    className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="h-11 px-4 border border-slate-200 rounded-xl bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium shadow-sm transition-all hover:shadow-md">
                <SlidersHorizontal size={16} /> Filters
            </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/40">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/80 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-500 w-[40%]">Bounty Name</th>
              <th className="px-6 py-4 font-semibold text-slate-500">Reward</th>
              <th className="px-6 py-4 font-semibold text-slate-500">Progress</th>
              <th className="px-6 py-4 font-semibold text-slate-500">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-500 text-right">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBounties.map((b, index) => (
              <motion.tr 
                key={b.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onNavigate('bounty-detail', { bountyId: b.id })}
                className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 w-2 h-2 rounded-full ${b.status === 'Open' ? 'bg-green-500' : 'bg-slate-300'}`} />
                        <div>
                            <div className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-1">{b.title}</div>
                            <div className="flex gap-2">
                                <Badge status={b.dataType} className="scale-90 origin-left" />
                                {b.tags.slice(0, 2).map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-5">
                    <div className="font-mono font-bold text-slate-900 text-base">{b.rewardPool} SOL</div>
                    <div className="text-xs text-slate-400 mt-1">~{(b.rewardPool / b.requiredQuantity).toFixed(4)} / unit</div>
                </td>
                <td className="px-6 py-5">
                    <div className="w-full max-w-[140px]">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-slate-600 font-medium">{Math.round((b.acceptedQuantity / b.requiredQuantity) * 100)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-blue-500 rounded-full" 
                                initial={{ width: 0 }}
                                animate={{ width: `${(b.acceptedQuantity / b.requiredQuantity) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1.5 text-right">{b.acceptedQuantity}/{b.requiredQuantity}</div>
                    </div>
                </td>
                <td className="px-6 py-5">
                    <Badge status={b.status} />
                </td>
                <td className="px-6 py-5 text-right">
                    <div className="text-slate-600 font-medium">{b.deadline}</div>
                    <div className="text-xs text-slate-400 mt-1">{b.validatorCount} validators</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredBounties.length === 0 && (
            <div className="p-16 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-slate-300" />
                </div>
                <h3 className="text-slate-900 font-medium">No bounties found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search term.</p>
            </div>
        )}
      </div>
    </div>
  );
};
