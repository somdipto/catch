import React, { useState } from 'react';
import { DataType } from '../types';
import { Button } from '../components/ui/Button';
import { Plus, Trash2 } from 'lucide-react';

interface CreateBountyProps {
    onNavigate: (page: string) => void;
}

export const CreateBounty: React.FC<CreateBountyProps> = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [rules, setRules] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  const addRule = () => setRules([...rules, '']);
  const updateRule = (index: number, val: string) => {
    const newRules = [...rules];
    newRules[index] = val;
    setRules(newRules);
  };
  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onNavigate('marketplace');
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Create New Bounty</h1>
            <p className="text-slate-400">Define your data needs and fund the reward pool.</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= i ? 'bg-primary' : 'bg-surface border border-border'}`} />
            ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-8">
            {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-300">Bounty Title</label>
                        <input type="text" className="h-10 px-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none w-full" placeholder="e.g. Traffic Sign Image Collection" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-slate-300">Data Type</label>
                            <select className="h-10 px-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none w-full">
                                {Object.values(DataType).map(type => (
                                    <option key={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                         <div className="grid gap-2">
                            <label className="text-sm font-medium text-slate-300">Required Quantity</label>
                            <input type="number" className="h-10 px-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none w-full" placeholder="1000" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-300">Description</label>
                        <textarea className="h-32 p-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none resize-none w-full" placeholder="Describe exactly what you need..." />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button onClick={() => setStep(2)}>Next: Validation</Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-1">Validation Rules</h3>
                        <p className="text-slate-400 text-sm mb-4">Define strict criteria validators will use to approve data.</p>
                        
                        <div className="space-y-3">
                            {rules.map((rule, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={rule}
                                        onChange={(e) => updateRule(idx, e.target.value)}
                                        className="flex-1 h-10 px-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none w-full"
                                        placeholder={`Rule #${idx + 1}`}
                                    />
                                    <button 
                                        onClick={() => removeRule(idx)}
                                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-surface border border-border rounded-md"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" onClick={addRule} className="mt-4">
                            <Plus size={16} className="mr-2" /> Add Rule
                        </Button>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-border">
                        <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={() => setStep(3)}>Next: Funding</Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
                        <p className="text-sm text-slate-300 mb-2">Estimated Total Cost</p>
                        <div className="text-4xl font-mono font-bold text-white mb-2">5.25 SOL</div>
                        <p className="text-xs text-slate-500">Includes 5% platform fee</p>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium text-slate-300">Reward per Item (SOL)</label>
                        <input type="number" className="h-10 px-4 bg-background border border-border rounded-md text-white focus:border-primary focus:outline-none w-full" placeholder="0.005" />
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-yellow-900/10 border border-yellow-900/30 rounded-md">
                        <div className="text-yellow-500 text-sm">
                            Funds will be locked in a smart contract escrow upon publishing. Unused funds can be reclaimed if the bounty expires.
                        </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-border">
                         <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                        <Button onClick={handlePublish} isLoading={loading} className="w-40">
                            Publish Bounty
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};