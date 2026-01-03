import React, { useState } from 'react';
import { MOCK_BOUNTIES } from '../constants';
import { Bounty, SubmissionStatus } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, UploadCloud, File, AlertCircle, CheckCircle, Clock, Users, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BountyDetailProps {
  bountyId: string;
  onBack: () => void;
}

export const BountyDetail: React.FC<BountyDetailProps> = ({ bountyId, onBack }) => {
  const bounty = MOCK_BOUNTIES.find(b => b.id === bountyId);
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'validators'>('overview');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<'idle' | 'selecting' | 'preview' | 'success'>('idle');
  const [selectedFileCount, setSelectedFileCount] = useState(0);

  if (!bounty) return <div>Bounty not found</div>;

  const handleUploadClick = () => {
    setUploadStep('selecting');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
        setSelectedFileCount(e.target.files.length);
        setUploadStep('preview');
    }
  };

  const handleSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
        setIsUploading(false);
        setUploadStep('success');
    }, 1500);
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 gap-2 text-slate-500 hover:text-slate-900">
        <ArrowLeft size={16} /> Back to Marketplace
      </Button>

      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 md:gap-8">
            <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                    <Badge status={bounty.dataType} />
                    <Badge status={bounty.status} />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">{bounty.title}</h1>
                <div className="flex flex-wrap gap-2">
                    {bounty.tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                            #{t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                 <div className="bg-slate-50 rounded-2xl p-4 min-w-[140px] flex-1 md:flex-none border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs font-semibold uppercase tracking-wider">
                         <Coins size={14} /> Reward Pool
                     </div>
                     <div className="text-xl md:text-2xl font-mono font-bold text-slate-900 whitespace-nowrap">{bounty.rewardPool} SOL</div>
                 </div>
                 <div className="bg-slate-50 rounded-2xl p-4 min-w-[140px] flex-1 md:flex-none border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs font-semibold uppercase tracking-wider">
                         <Clock size={14} /> Per Unit
                     </div>
                     <div className="text-xl md:text-2xl font-mono font-bold text-slate-900 whitespace-nowrap">{bounty.rewardPerUnit}</div>
                 </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto">
                {['Overview', 'Submissions', 'Validators'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors relative whitespace-nowrap ${
                            activeTab.toLowerCase() === tab.toLowerCase()
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-8"
                    >
                        <section className="prose prose-slate max-w-none">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Description</h3>
                            <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm md:text-base">
                                {bounty.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Validation Rules</h3>
                            <div className="grid gap-3">
                                {bounty.validationRules.map((rule, i) => (
                                    <div key={i} className="flex items-start md:items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
                                            <AlertCircle size={16} />
                                        </div>
                                        <span className="text-slate-700 text-sm font-medium leading-relaxed">{rule}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}
                
                {activeTab === 'submissions' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300">
                            <File size={24} />
                        </div>
                        <p className="text-slate-900 font-medium">No public submissions yet</p>
                        <p className="text-slate-500 text-sm">Be the first to contribute to this dataset.</p>
                     </motion.div>
                )}
                
                {activeTab === 'validators' && (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
                                <div>
                                    <div className="text-sm font-bold text-slate-900">Validator 0x...4k9{i}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-xs text-slate-500">98% Consensus Score</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Right Column: Upload Card */}
        <div className="space-y-6">
            <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contribute Data</h3>
                
                {uploadStep === 'idle' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="space-y-3">
                             <div className="flex justify-between text-sm font-medium">
                                <span className="text-slate-500">Progress Goal</span>
                                <span className="text-slate-900">{bounty.acceptedQuantity} / {bounty.requiredQuantity}</span>
                             </div>
                             <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(bounty.acceptedQuantity / bounty.requiredQuantity) * 100}%` }}
                                    transition={{ duration: 1 }}
                                />
                             </div>
                        </div>
                        
                        <div className="pt-2">
                            <Button className="w-full h-14 text-base shadow-lg shadow-blue-500/20" onClick={handleUploadClick}>
                                <UploadCloud className="mr-2" /> Start Upload
                            </Button>
                            <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
                                By uploading, you agree to the validation terms. <br/>
                                Smart contract execution occurs upon approval.
                            </p>
                        </div>
                    </motion.div>
                )}

                {uploadStep === 'selecting' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-8 text-center hover:bg-blue-50 transition-colors cursor-pointer relative group"
                    >
                        <input 
                            type="file" 
                            multiple 
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            onChange={handleFileSelect}
                        />
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8 text-blue-500" />
                        </div>
                        <p className="text-slate-900 font-semibold mb-1">Click to browse</p>
                        <p className="text-slate-500 text-sm">or drag files here</p>
                    </motion.div>
                )}

                {uploadStep === 'preview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <File className="text-blue-500" size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="text-slate-900 text-sm font-semibold">{selectedFileCount} files selected</div>
                                <div className="text-xs text-slate-500">Ready for validation</div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-center text-white relative overflow-hidden shadow-lg">
                            <div className="relative z-10">
                                <div className="text-sm text-slate-400 mb-1">Estimated Reward</div>
                                <div className="text-3xl font-mono font-bold">
                                    ≈ {(selectedFileCount * bounty.rewardPerUnit).toFixed(3)} SOL
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setUploadStep('idle')}>Cancel</Button>
                            <Button className="flex-1" onClick={handleSubmit} isLoading={isUploading}>Submit</Button>
                        </div>
                    </motion.div>
                )}

                {uploadStep === 'success' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} />
                        </div>
                        <h4 className="text-slate-900 font-bold text-xl mb-3">Submission Received</h4>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            Your data has been hashed and sent to the validator network. You can track progress in the dashboard.
                        </p>
                        <Button variant="outline" className="w-full" onClick={() => setUploadStep('idle')}>Submit More</Button>
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};