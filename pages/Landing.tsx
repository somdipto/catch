import React, { useMemo } from 'react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Coins, FileText, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useWallet } from '../services/wallet-provider';
import { useTheme } from '../services/theme';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface LandingProps {
  onNavigate: (page: string) => void;
}

// --- MICRO COMPONENTS ---

const ScrollArrow = ({ className }: { className?: string }) => {
    return (
        <svg className={className} width="40" height="120" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
                d="M20 0V120" 
                stroke="currentColor" 
                className="text-slate-300 dark:text-zinc-700"
                strokeWidth="2" 
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.circle 
                cx="20" cy="120" r="4" 
                className="fill-slate-400 dark:fill-zinc-600"
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
        <div className="absolute top-full left-1/2 -translate-x-1/2 h-32 w-full max-w-4xl z-0 pointer-events-none hidden md:block opacity-30">
             <svg width="100%" height="100%" viewBox="0 0 800 120" fill="none" preserveAspectRatio="none">
                <motion.path
                    d={from === 'left' && to === 'right' 
                        ? "M200 0 C 200 60, 600 60, 600 120" 
                        : "M600 0 C 600 60, 200 60, 200 120"
                    }
                    stroke="currentColor"
                    className="text-slate-300 dark:text-zinc-600"
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
    const radius = 160; 
    const count = 100; 

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

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth responsive movement springs
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [35, -35]); // Tilt up/down
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-35, 35]); // Tilt left/right

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div 
            className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto flex items-center justify-center perspective-[1000px] group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Core Glow */}
            <div className="absolute inset-0 bg-green-500/5 blur-[80px] rounded-full animate-pulse-slow dark:bg-green-500/10 pointer-events-none" />
            
            {/* Interactive container that tilts based on mouse */}
            <motion.div 
                className="w-full h-full relative"
                style={{ 
                    rotateX, 
                    rotateY,
                    transformStyle: "preserve-3d" 
                }}
            >
                {/* Continuous Spinner */}
                <motion.div
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: 360, rotateZ: 10 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {points.map((pt, i) => {
                        const x = pt.pos[0] * radius;
                        const y = pt.pos[1] * radius;
                        const z = pt.pos[2] * radius;

                        return (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 font-mono font-bold text-lg select-none pointer-events-none"
                                style={{
                                    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                                    color: '#22c55e', 
                                    textShadow: '0 0 5px rgba(34, 197, 94, 0.4)',
                                }}
                                animate={{ opacity: [0.3, 0.8, 0.3] }}
                                transition={{ duration: 3, delay: pt.delay, repeat: Infinity }}
                            >
                                {pt.val}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
};

// --- MAIN LANDING PAGE ---

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { connect, connected } = useWallet();
  const { theme, toggleTheme } = useTheme();
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
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", 
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80" 
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden selection:bg-slate-300 selection:text-black dark:selection:bg-zinc-700 dark:selection:text-white transition-colors duration-500">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-zinc-500 origin-left z-50" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-border transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-mono font-bold shadow-lg">C</div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Catch</span>
            </div>
            <div className="flex gap-4 items-center">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-600 dark:text-slate-300"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Button variant="ghost" onClick={() => onNavigate('marketplace')} className="hidden sm:flex">Marketplace</Button>
                <Button variant="primary" size="sm" onClick={handleStart} className="rounded-full">Launch App</Button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle Gradient Glow instead of Blue Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-slate-200/40 to-transparent dark:from-zinc-800/20 rounded-full blur-3xl opacity-30 -mr-40 -mt-40 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-center md:text-left relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm">
                            <span className="w-2 h-2 inline-block rounded-full bg-slate-900 dark:bg-white mr-2 animate-pulse"></span>
                            Live on Solana Devnet
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                            Data for AI, <br />
                            <span className="gradient-text">verified by humans.</span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed mx-auto md:mx-0">
                            The first decentralized marketplace for ML datasets. 
                            Post a bounty, get validated data, and pay instantly on-chain.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <Button size="lg" onClick={handleStart} className="w-full sm:w-auto text-lg px-8 h-14 rounded-full">
                                Start Collecting <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => onNavigate('marketplace')} className="w-full sm:w-auto h-14 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-sm">
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
      <div className="relative py-20 bg-slate-50/50 dark:bg-zinc-900/30 border-y border-border">
        
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
                    <div className="glass-panel rounded-2xl p-8 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                         {/* Mock UI Card */}
                         <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-zinc-600" />
                                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-zinc-600" />
                                <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-zinc-600" />
                            </div>
                            <div className="text-xs font-mono text-slate-400">new_bounty.json</div>
                         </div>
                         <div className="space-y-4 font-mono text-sm">
                             <div className="flex gap-4">
                                 <span className="text-slate-900 dark:text-white font-bold">"title":</span>
                                 <span className="text-slate-600 dark:text-slate-300">"Street Sign Images"</span>
                             </div>
                             <div className="flex gap-4">
                                 <span className="text-slate-900 dark:text-white font-bold">"reward":</span>
                                 <span className="text-slate-600 dark:text-slate-300">50.0 SOL</span>
                             </div>
                             <div className="flex gap-4">
                                 <span className="text-slate-900 dark:text-white font-bold">"type":</span>
                                 <span className="text-slate-500 dark:text-zinc-500">"IMAGE_CLASSIFICATION"</span>
                             </div>
                             <div className="mt-4 p-3 bg-slate-100 dark:bg-zinc-800 rounded border border-border text-slate-500 text-xs">
                                 Publishing to smart contract...
                             </div>
                         </div>
                    </div>
                </motion.div>
                <div className="flex-1 order-1 md:order-2">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 shadow-sm">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Request specific data.</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                        Don't buy generic datasets. Create a bounty for exactly what you need—whether it's audio, text, or images. Define strict validation rules upfront.
                    </p>
                </div>
            </div>
            <ConnectingLine from="left" to="right" />
        </div>

        {/* 2. Validation */}
        <div className="container mx-auto px-6 relative mb-32">
            <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
                 <div className="flex-1">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 shadow-sm">
                        <ShieldCheck size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Consensus Validation.</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
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
                    <div className="glass-panel rounded-2xl p-8 rotate-[2deg] hover:rotate-0 transition-transform duration-500 relative">
                        {/* Floating Success Badge - Sleek Green */}
                        <motion.div 
                            className="absolute -top-4 -right-4 bg-white dark:bg-zinc-800 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-medium z-10"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <CheckCircle2 size={16} /> Verified
                        </motion.div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             {validationImages.map((src, i) => (
                                 <div key={i} className="aspect-square bg-slate-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative group border border-transparent hover:border-slate-300 dark:hover:border-zinc-500 transition-all">
                                     <img src={src} alt={`Validation sample ${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500" />
                                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                     <div className="absolute bottom-2 right-2 w-6 h-6 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center text-green-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
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
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-zinc-900 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden border border-slate-700 dark:border-zinc-800">
                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-[100px] opacity-20" />
                        
                        <div className="relative z-10">
                            <div className="text-slate-400 text-sm mb-1 font-medium">Your Earnings</div>
                            <div className="text-5xl font-mono font-bold mb-6 flex items-baseline gap-2">
                                42.50 <span className="text-lg text-slate-500">SOL</span>
                            </div>
                            
                            <div className="space-y-3">
                                {[
                                    { label: 'Bounty #102 Payout', amount: '+ 12.5 SOL' },
                                    { label: 'Validation Reward', amount: '+ 0.45 SOL' },
                                    { label: 'Bounty #88 Payout', amount: '+ 29.55 SOL' },
                                ].map((tx, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                                        <span className="text-sm text-slate-300">{tx.label}</span>
                                        <span className="text-sm font-mono text-green-400">{tx.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className="flex-1 order-1 md:order-2">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white mb-6 shadow-sm">
                        <Coins size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Instant, Global Payouts.</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                        No invoices. No Net-30 terms. As soon as data is validated, the smart contract releases funds directly to the contributor's wallet.
                    </p>
                </div>
            </div>
        </div>

      </div>

      {/* CTA Footer */}
      <div className="py-32 container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto bg-slate-900 dark:bg-zinc-950 rounded-3xl p-12 md:p-20 relative overflow-hidden text-white shadow-2xl border border-slate-800 dark:border-zinc-800">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
              
              <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to build the future of AI?</h2>
                  <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">Join thousands of data scientists and contributors on Catch.</p>
                  <Button size="lg" className="h-16 px-10 text-lg bg-white text-slate-900 hover:bg-slate-200 border-none" onClick={handleStart}>
                      Get Started Now
                  </Button>
              </div>
          </div>
          
          <div className="mt-16 flex justify-between items-center text-slate-400 text-sm border-t border-slate-200 dark:border-zinc-800 pt-8">
              <div>&copy; 2024 Catch Protocol</div>
              <div className="flex gap-6">
                  <a href="#" className="hover:text-slate-900 dark:hover:text-white">Twitter</a>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-white">Discord</a>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-white">Docs</a>
              </div>
          </div>
      </div>

    </div>
  );
};