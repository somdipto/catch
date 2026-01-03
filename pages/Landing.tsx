import React, { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Coins, FileText, ShieldCheck } from 'lucide-react';
import { useWallet } from '../services/wallet';
import { motion, useScroll, useSpring } from 'framer-motion';

interface LandingProps {
  onNavigate: (page: string) => void;
}

// --- MICRO COMPONENTS ---

const ScrollArrow = ({ className }: { className?: string }) => {
    return (
        <svg className={className} width="40" height="120" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
                d="M20 0V120" 
                stroke="#CBD5E1" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle 
                cx="20" cy="120" r="4" fill="#94A3B8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
            />
        </svg>
    );
};

const ConnectingLine = ({ from, to }: { from: 'left' | 'right', to: 'left' | 'right' }) => {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 h-32 w-full max-w-4xl z-0 pointer-events-none hidden md:block">
             <svg width="100%" height="100%" viewBox="0 0 800 120" fill="none" preserveAspectRatio="none">
                <motion.path
                    d={from === 'left' && to === 'right' 
                        ? "M200 0 C 200 60, 600 60, 600 120" 
                        : "M600 0 C 600 60, 200 60, 200 120"
                    }
                    stroke="#E2E8F0"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}

const MatrixSphere = () => {
    const radius = 160; // pixel radius
    const count = 100; // number of points

    // Generate points on a sphere using Fibonacci lattice
    const points = useMemo(() => {
        const p = [];
        const offset = 2 / count;
        const increment = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < count; i++) {
            const y = ((i * offset) - 1) + (offset / 2);
            const r = Math.sqrt(1 - Math.pow(y, 2));
            const phi = ((i + 1) % count) * increment;

            const x = Math.cos(phi) * r;
            const z = Math.sin(phi) * r;

            p.push({ 
                pos: [x, y, z], 
                val: Math.random() > 0.5 ? '1' : '0',
                delay: Math.random() * 2 
            });
        }
        return p;
    }, []);

    return (
        <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto flex items-center justify-center perspective-[1000px]">
            {/* Core Glow */}
            <div className="absolute inset-0 bg-green-500/10 blur-[80px] rounded-full animate-pulse-slow" />
            
            <motion.div 
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: 360, rotateZ: 20, rotateX: -20 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {points.map((pt, i) => {
                    const x = pt.pos[0] * radius;
                    const y = pt.pos[1] * radius;
                    const z = pt.pos[2] * radius;

                    return (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 font-mono font-bold text-lg select-none"
                            style={{
                                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                                color: '#22c55e', // tailwind green-500
                                textShadow: '0 0 5px rgba(34, 197, 94, 0.8)',
                            }}
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, delay: pt.delay, repeat: Infinity }}
                        >
                            {pt.val}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

// --- MAIN LANDING PAGE ---

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { connect, connected } = useWallet();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleStart = () => {
    if (!connected) connect();
    onNavigate('marketplace');
  };

  const validationImages = [
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80", // Data interface
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80", // Code screen
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", // Analytics
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80"  // Matrix
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono font-bold">C</div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Catch</span>
            </div>
            <div className="flex gap-4">
                <Button variant="ghost" onClick={() => onNavigate('marketplace')}>Marketplace</Button>
                <Button variant="primary" size="sm" onClick={handleStart} className="rounded-full">Launch App</Button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-50 animate-float-delayed" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-center md:text-left">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
                            <span className="text-blue-600 mr-2">●</span> Live on Solana Devnet
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                            Data for AI, <br />
                            <span className="gradient-text">verified by humans.</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed mx-auto md:mx-0">
                            The first decentralized marketplace for ML datasets. 
                            Post a bounty, get validated data, and pay instantly on-chain.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <Button size="lg" onClick={handleStart} className="w-full sm:w-auto text-lg px-8 h-14 rounded-full">
                                Start Collecting <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => onNavigate('marketplace')} className="w-full sm:w-auto h-14 rounded-full bg-white/50 backdrop-blur-sm">
                                View Marketplace
                            </Button>
                        </div>
                    </motion.div>
                </div>
                <div className="flex-1 w-full max-w-lg flex justify-center">
                    <MatrixSphere />
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
             <ScrollArrow />
        </div>
      </section>

      {/* Feature Storytelling */}
      <div className="relative py-20 bg-slate-50/50">
        
        {/* 1. Post Bounty */}
        <div className="container mx-auto px-6 relative mb-32">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                <motion.div 
                    className="flex-1 order-2 md:order-1"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-900/5 border border-slate-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                         {/* Mock UI Card */}
                         <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <div className="text-xs font-mono text-slate-400">new_bounty.json</div>
                         </div>
                         <div className="space-y-4 font-mono text-sm">
                             <div className="flex gap-4">
                                 <span className="text-blue-500">"title":</span>
                                 <span className="text-slate-700">"Street Sign Images"</span>
                             </div>
                             <div className="flex gap-4">
                                 <span className="text-blue-500">"reward":</span>
                                 <span className="text-slate-700">50.0 SOL</span>
                             </div>
                             <div className="flex gap-4">
                                 <span className="text-blue-500">"type":</span>
                                 <span className="text-purple-600">"IMAGE_CLASSIFICATION"</span>
                             </div>
                             <div className="mt-4 p-3 bg-slate-50 rounded border border-slate-100 text-slate-500 text-xs">
                                 Publishing to smart contract...
                             </div>
                         </div>
                    </div>
                </motion.div>
                <div className="flex-1 order-1 md:order-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Request specific data.</h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Don't buy generic datasets. Create a bounty for exactly what you need—whether it's audio, text, or images. define strict validation rules upfront.
                    </p>
                </div>
            </div>
            <ConnectingLine from="left" to="right" />
        </div>

        {/* 2. Validation */}
        <div className="container mx-auto px-6 relative mb-32">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                 <div className="flex-1">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                        <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Consensus Validation.</h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Uploaded data isn't accepted blindly. A decentralized network of validators reviews submissions against your criteria. Only high-quality data passes.
                    </p>
                </div>
                <motion.div 
                    className="flex-1"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-white rounded-2xl p-8 shadow-xl shadow-purple-900/5 border border-slate-100 rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative">
                        {/* Floating Success Badge */}
                        <motion.div 
                            className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-medium z-10"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <CheckCircle2 size={16} /> Verified
                        </motion.div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             {validationImages.map((src, i) => (
                                 <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative group">
                                     <img src={src} alt={`Validation sample ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                     <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                                         <CheckCircle2 size={14} />
                                     </div>
                                 </div>
                             ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            <ConnectingLine from="right" to="left" />
        </div>

        {/* 3. Payout */}
         <div className="container mx-auto px-6 relative mb-24">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                <motion.div 
                    className="flex-1 order-2 md:order-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20" />
                        
                        <div className="relative z-10">
                            <div className="text-slate-400 text-sm mb-1 font-medium">Your Earnings</div>
                            <div className="text-5xl font-mono font-bold mb-6 flex items-baseline gap-2">
                                42.50 <span className="text-lg text-blue-400">SOL</span>
                            </div>
                            
                            <div className="space-y-3">
                                {[
                                    { label: 'Bounty #102 Payout', amount: '+ 12.5 SOL' },
                                    { label: 'Validation Reward', amount: '+ 0.45 SOL' },
                                    { label: 'Bounty #88 Payout', amount: '+ 29.55 SOL' },
                                ].map((tx, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                                        <span className="text-sm text-slate-300">{tx.label}</span>
                                        <span className="text-sm font-mono text-green-400">{tx.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className="flex-1 order-1 md:order-2">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                        <Coins size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Instant, Global Payouts.</h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        No invoices. No Net-30 terms. As soon as data is validated, the smart contract releases funds directly to the contributor's wallet.
                    </p>
                </div>
            </div>
        </div>

      </div>

      {/* CTA Footer */}
      <div className="py-32 container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-12 md:p-20 relative overflow-hidden text-white shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-30" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-30" />
              
              <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to build the future of AI?</h2>
                  <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">Join thousands of data scientists and contributors on Catch.</p>
                  <Button size="lg" className="h-16 px-10 text-lg bg-white text-slate-900 hover:bg-slate-100 border-none" onClick={handleStart}>
                      Get Started Now
                  </Button>
              </div>
          </div>
          
          <div className="mt-16 flex justify-between items-center text-slate-400 text-sm border-t border-slate-100 pt-8">
              <div>&copy; 2024 Catch Protocol</div>
              <div className="flex gap-6">
                  <a href="#" className="hover:text-slate-900">Twitter</a>
                  <a href="#" className="hover:text-slate-900">Discord</a>
                  <a href="#" className="hover:text-slate-900">Docs</a>
              </div>
          </div>
      </div>

    </div>
  );
};