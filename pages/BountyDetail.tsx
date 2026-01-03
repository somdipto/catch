import React, { useState } from 'react';
import { MOCK_BOUNTIES } from '../constants';
import { Bounty, SubmissionStatus } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, UploadCloud, File, AlertCircle, CheckCircle } from 'lucide-react';

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
    // Simulate upload
    setTimeout(() => {
        setIsUploading(false);
        setUploadStep('success');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <Button variant="ghost" size="sm" onClick={onBack} className="pl-0 gap-2 hover:bg-transparent hover:text-primary">
        <ArrowLeft size={16} /> Back to Marketplace
      </Button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <Badge status={bounty.dataType} />
                <Badge status={bounty.status} />
            </div>
            <h1 className="text-3xl font-bold text-white">{bounty.title}</h1>
            <div className="flex flex-wrap gap-2">
                {bounty.tags.map(t => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-surface border border-border text-slate-400">
                        {t}
                    </span>
                ))}
            </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="text-right">
                <span className="text-sm text-slate-400 block mb-1">Total Pool</span>
                <span className="text-4xl font-mono font-bold text-primary">{bounty.rewardPool} SOL</span>
            </div>
            <div className="text-sm text-slate-500 font-mono">
                {bounty.rewardPerUnit} SOL per valid unit
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Details & Tabs */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex border-b border-border">
                {['Overview', 'Submissions', 'Validators'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab.toLowerCase() === tab.toLowerCase()
                                ? 'border-primary text-primary'
                                : 'border-transparent text-slate-400 hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                        <p className="text-slate-300 leading-relaxed bg-surface/30 p-4 rounded-lg border border-border">
                            {bounty.description}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4">Validation Rules</h3>
                        <div className="space-y-3">
                            {bounty.validationRules.map((rule, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-surface/50 rounded-md border border-border/50">
                                    <div className="mt-0.5 text-primary">
                                        <AlertCircle size={18} />
                                    </div>
                                    <span className="text-slate-200 text-sm">{rule}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            )}
            
            {activeTab === 'submissions' && (
                 <div className="text-center py-12 text-slate-500 bg-surface/20 rounded-lg border border-border border-dashed">
                    No submissions yet. Be the first!
                 </div>
            )}
            
            {activeTab === 'validators' && (
                 <div className="space-y-4">
                    <h3 className="text-white font-medium">Active Validators ({bounty.validatorCount})</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-surface border border-border rounded-md">
                                <div className="w-8 h-8 rounded-full bg-slate-700" />
                                <div>
                                    <div className="text-sm font-mono text-slate-300">0x...4k9{i}</div>
                                    <div className="text-xs text-green-500">98% Accuracy</div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            )}
        </div>

        {/* Right Column: Action Card */}
        <div className="space-y-6">
            <div className="p-6 bg-surface border border-border rounded-xl sticky top-6">
                <h3 className="text-lg font-bold text-white mb-4">Submit Data</h3>
                
                {uploadStep === 'idle' && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Progress</span>
                                <span className="text-white font-mono">{bounty.acceptedQuantity} / {bounty.requiredQuantity}</span>
                             </div>
                             <div className="h-2 bg-background rounded-full overflow-hidden border border-border">
                                <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${(bounty.acceptedQuantity / bounty.requiredQuantity) * 100}%` }}
                                />
                             </div>
                        </div>
                        
                        <div className="pt-4">
                            <Button className="w-full h-12 text-lg shadow-lg shadow-primary/20" onClick={handleUploadClick}>
                                <UploadCloud className="mr-2" /> Upload Data
                            </Button>
                            <p className="text-xs text-center text-slate-500 mt-3">
                                Connect wallet to sign submission.
                            </p>
                        </div>
                    </div>
                )}

                {uploadStep === 'selecting' && (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-surface/50 transition-colors cursor-pointer relative">
                        <input 
                            type="file" 
                            multiple 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileSelect}
                        />
                        <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                        <p className="text-white font-medium">Drag & drop files here</p>
                        <p className="text-slate-500 text-xs mt-1">or click to browse</p>
                    </div>
                )}

                {uploadStep === 'preview' && (
                    <div className="space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 p-3 bg-background rounded border border-border">
                            <File className="text-primary" />
                            <div className="flex-1">
                                <div className="text-white text-sm font-medium">{selectedFileCount} files selected</div>
                                <div className="text-xs text-slate-500">{(selectedFileCount * 1.2).toFixed(1)} MB total</div>
                            </div>
                        </div>
                        
                        <div className="bg-primary/10 border border-primary/20 p-4 rounded text-center">
                            <div className="text-sm text-primary-200 mb-1">Estimated Reward</div>
                            <div className="text-2xl font-bold text-primary font-mono">
                                ≈ {(selectedFileCount * bounty.rewardPerUnit).toFixed(3)} SOL
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setUploadStep('idle')}>Cancel</Button>
                            <Button className="flex-1" onClick={handleSubmit} isLoading={isUploading}>Confirm</Button>
                        </div>
                    </div>
                )}

                {uploadStep === 'success' && (
                    <div className="text-center py-6 animate-in zoom-in-95">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">Upload Successful</h4>
                        <p className="text-slate-400 text-sm mb-6">
                            Your submission is now pending validation. You will receive SOL automatically once approved.
                        </p>
                        <Button variant="outline" className="w-full" onClick={() => setUploadStep('idle')}>Done</Button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
