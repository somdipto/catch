import React from 'react';
import { MOCK_EARNINGS_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useWallet } from '../services/wallet';
import { Wallet, TrendingUp, History } from 'lucide-react';

export const Earnings: React.FC = () => {
  const { user } = useWallet();

  if (!user) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <Wallet className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
            <p className="text-slate-400 max-w-sm">Connect your Solana wallet to view your earnings history and pending payouts.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Earnings Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface border border-border rounded-xl">
                <div className="flex items-center gap-3 mb-2 text-slate-400">
                    <Wallet size={18} /> Total Earned
                </div>
                <div className="text-3xl font-mono font-bold text-white">{user.totalEarned} SOL</div>
            </div>
            <div className="p-6 bg-surface border border-border rounded-xl">
                <div className="flex items-center gap-3 mb-2 text-slate-400">
                    <History size={18} /> Pending Payouts
                </div>
                <div className="text-3xl font-mono font-bold text-white">2.45 SOL</div>
            </div>
             <div className="p-6 bg-surface border border-border rounded-xl">
                <div className="flex items-center gap-3 mb-2 text-slate-400">
                    <TrendingUp size={18} /> Avg. per Task
                </div>
                <div className="text-3xl font-mono font-bold text-white">0.012 SOL</div>
            </div>
        </div>

        <div className="p-6 bg-surface border border-border rounded-xl">
            <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_EARNINGS_DATA}>
                        <XAxis 
                            dataKey="name" 
                            stroke="#52525b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            stroke="#52525b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value) => `${value} SOL`} 
                        />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '6px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{fill: '#27272a'}}
                        />
                        <Bar dataKey="sol" radius={[4, 4, 0, 0]}>
                            {MOCK_EARNINGS_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#4F7CFF" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-surface/50 text-slate-400">
                    <tr>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Bounty</th>
                        <th className="px-6 py-4 font-medium">Items</th>
                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border bg-surface/20">
                    <tr>
                        <td className="px-6 py-4 text-slate-300">Oct 30, 2023</td>
                        <td className="px-6 py-4 text-white">Street Sign Classification</td>
                        <td className="px-6 py-4 text-slate-300">124</td>
                        <td className="px-6 py-4 text-right font-mono text-green-400">+ 5.80 SOL</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-slate-300">Oct 25, 2023</td>
                        <td className="px-6 py-4 text-white">Medical Handwriting</td>
                        <td className="px-6 py-4 text-slate-300">50</td>
                        <td className="px-6 py-4 text-right font-mono text-green-400">+ 1.50 SOL</td>
                    </tr>
                </tbody>
             </table>
        </div>
    </div>
  );
};
