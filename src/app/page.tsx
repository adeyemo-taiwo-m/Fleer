import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Zap, ShieldCheck, TrendingUp, BarChart3, 
  MapPin, Shield, Fuel, Users, ArrowRight,
  Monitor, Lock, Globe
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fleer — Fleet Intelligence & Revenue Protection",
  description: "Enterprise-grade fleet monitoring, fuel protection, and driver intelligence for logistics leaders.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-fleer-bg overflow-x-hidden font-body selection:bg-fleer-accent/30 selection:text-white">
      
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fleer-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fleer-info/5 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-fleer-border bg-fleer-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fleer-accent flex items-center justify-center shadow-accent">
              <Zap size={16} className="text-fleer-bg" fill="currentColor" />
            </div>
            <span className="font-display font-bold text-lg text-fleer-text tracking-tight uppercase">Fleer</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-display font-bold text-fleer-text-muted hover:text-fleer-text transition-colors uppercase tracking-widest">Solutions</a>
            <a href="#performance" className="text-sm font-display font-bold text-fleer-text-muted hover:text-fleer-text transition-colors uppercase tracking-widest">Performance</a>
            <a href="#security" className="text-sm font-display font-bold text-fleer-text-muted hover:text-fleer-text transition-colors uppercase tracking-widest">Security</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-display font-bold text-fleer-text hover:text-fleer-accent transition-colors uppercase tracking-widest">Sign In</Link>
            <Link 
              href="/signup" 
              className="h-10 px-5 bg-fleer-accent text-fleer-bg font-display font-bold text-xs rounded-lg flex items-center shadow-accent hover:bg-fleer-accent/90 transition-all uppercase tracking-widest"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fleer-accent/10 border border-fleer-accent/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-fleer-accent pulse-green" />
              <span className="text-[10px] font-display font-bold text-fleer-accent uppercase tracking-[0.2em]">Live Fleet Intelligence</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Master Your <br />
              <span className="text-fleer-accent">Fleet Operations.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-fleer-text-muted leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Real-time revenue protection, anti-siphoning alerts, and AI-driven performance tracking for professional logistics enterprises.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                href="/signup" 
                className="h-14 px-8 bg-fleer-accent text-fleer-bg font-display font-bold text-sm rounded-xl flex items-center justify-center gap-3 shadow-accent hover:scale-[1.02] active:scale-100 transition-all uppercase tracking-[0.1em] w-full sm:w-auto"
              >
                Secure Your Fleet
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/login" 
                className="h-14 px-8 bg-fleer-surface text-fleer-text border border-fleer-border font-display font-bold text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-fleer-card transition-all uppercase tracking-[0.1em] w-full sm:w-auto"
              >
                View Live Demo
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-fleer-border flex flex-wrap gap-8 justify-center lg:justify-start opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-display font-bold text-sm tracking-widest text-fleer-text-dim uppercase italic">Enterprise Ready</div>
              <div className="flex items-center gap-2 font-display font-bold text-sm tracking-widest text-fleer-text-dim uppercase italic">ISO Certified</div>
              <div className="flex items-center gap-2 font-display font-bold text-sm tracking-widest text-fleer-text-dim uppercase italic">Bank-Grade</div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="relative rounded-2xl border border-fleer-border bg-fleer-surface/50 p-2 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-fleer-accent/10 to-transparent pointer-events-none" />
              <Image 
                src="/fleer_landing_hero_mockup_1777375420793.png" 
                alt="Fleer Dashboard Mockup" 
                width={800} 
                height={600} 
                className="rounded-xl w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                priority
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-fleer-card border border-fleer-border p-4 rounded-xl shadow-card hidden md:block animate-bounce-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-fleer-accent/10 flex items-center justify-center text-fleer-accent">
                  <Fuel size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-display font-bold text-fleer-text-muted uppercase tracking-wider">Fuel Savings</p>
                  <p className="font-display font-bold text-lg text-fleer-accent">₦1.2M+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">Enterprise Shield Architecture</h2>
            <p className="text-fleer-text-muted max-w-2xl mx-auto">Designed for operators who require absolute transparency and control over their mobile assets.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Anti-Siphoning Shield", 
                desc: "Real-time fuel level monitoring with instant alerts on irregular fuel drops during stops or movement.",
                color: "text-fleer-accent"
              },
              { 
                icon: Monitor, 
                title: "Precision Telemetry", 
                desc: "Sub-meter accuracy in positioning with detailed historical route playback and deviation reporting.",
                color: "text-fleer-info"
              },
              { 
                icon: Users, 
                title: "Driver Intelligence", 
                desc: "AI-calculated safety scores based on speed compliance, harsh braking, and route adherence.",
                color: "text-fleer-warning"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-fleer-card/30 border border-fleer-border rounded-2xl p-8 hover:border-fleer-accent/30 transition-all hover:-translate-y-2 duration-300">
                <div className={`w-12 h-12 rounded-xl bg-fleer-surface border border-fleer-border flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-fleer-text-muted leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Section */}
        <section id="performance" className="bg-fleer-surface/30 border-y border-fleer-border py-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="font-display text-4xl font-bold mb-8 leading-tight tracking-tight">Optimize your fleet for <br /><span className="text-fleer-accent">Maximum Profitability.</span></h2>
                <div className="space-y-8">
                  {[
                    { icon: BarChart3, title: "Cost Attribution", desc: "Know exactly how much every trip costs in fuel, time, and asset wear." },
                    { icon: MapPin, title: "Geofence Enforcement", desc: "Automatically flag unauthorized stops or route diversions with instant resolution tools." },
                    { icon: Lock, title: "Revenue Integrity", desc: "Eliminate leakages and unauthorized asset usage across your entire network." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-fleer-accent/10 flex items-center justify-center text-fleer-accent shrink-0">
                         <item.icon size={18} />
                       </div>
                       <div>
                         <h4 className="font-display font-bold text-fleer-text uppercase tracking-wider text-sm">{item.title}</h4>
                         <p className="text-fleer-text-muted text-sm mt-1 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
             <div className="bg-fleer-card border border-fleer-border rounded-2xl p-8 shadow-card overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <TrendingUp size={120} className="text-fleer-accent" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-display font-bold text-lg uppercase tracking-widest">Fleet ROI Tracker</h3>
                    <Badge label="Active" variant="success" dot />
                  </div>
                  <div className="space-y-6">
                    <div className="p-4 bg-fleer-bg/50 rounded-xl border border-fleer-border">
                       <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-[0.2em] mb-2">Efficiency Gain</p>
                       <div className="flex items-baseline gap-2">
                         <span className="font-display text-3xl font-bold text-fleer-accent">+24%</span>
                         <span className="text-xs text-fleer-text-muted">vs last quarter</span>
                       </div>
                    </div>
                    <div className="p-4 bg-fleer-bg/50 rounded-xl border border-fleer-border">
                       <p className="text-[10px] font-display font-bold text-fleer-text-dim uppercase tracking-[0.2em] mb-2">Leakage Prevented</p>
                       <div className="flex items-baseline gap-2">
                         <span className="font-display text-3xl font-bold text-fleer-accent">₦4.8M</span>
                         <span className="text-xs text-fleer-text-muted">total savings</span>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 text-center max-w-4xl mx-auto px-6 border-t border-fleer-border mt-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fleer-accent/10 border border-fleer-accent/20 mb-8">
              <Shield size={14} className="text-fleer-accent" />
              <span className="text-[10px] font-display font-bold text-fleer-accent uppercase tracking-[0.2em]">Scale Your Logistics Defense</span>
           </div>
           <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">Ready to fortify your <br /><span className="text-fleer-accent">Revenue Infrastructure?</span></h2>
           <p className="text-fleer-text-muted text-lg mb-14 max-w-2xl mx-auto">Join professional logistics operators who have eliminated leakages and optimized their asset performance with Fleer Intelligence.</p>
           <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link 
                href="/signup" 
                className="h-16 px-12 bg-fleer-accent text-fleer-bg font-display font-bold text-sm rounded-xl flex items-center justify-center gap-3 shadow-accent hover:scale-[1.02] active:scale-100 transition-all uppercase tracking-[0.15em] w-full sm:w-auto"
              >
                Secure My Fleet Now
                <ArrowRight size={20} />
              </Link>
              <Link 
                href="/login" 
                className="h-16 px-12 bg-fleer-surface text-fleer-text border border-fleer-border font-display font-bold text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-fleer-card transition-all uppercase tracking-[0.15em] w-full sm:w-auto"
              >
                Launch Dashboard
              </Link>
           </div>
        </section>

        {/* Simple Footer */}
        <footer className="border-t border-fleer-border py-20 bg-fleer-bg/50">
           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-fleer-accent flex items-center justify-center shadow-accent">
                  <Zap size={16} className="text-fleer-bg" fill="currentColor" />
                </div>
                <span className="font-display font-bold text-lg text-fleer-text tracking-tight uppercase">Fleer</span>
             </div>
             
             <div className="flex gap-8 text-[11px] font-display font-bold text-fleer-text-muted uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-fleer-text">Platform</a>
               <a href="#" className="hover:text-fleer-text">Security</a>
               <a href="#" className="hover:text-fleer-text">API Docs</a>
               <a href="#" className="hover:text-fleer-text">Privacy</a>
             </div>

             <div className="text-[11px] font-display font-bold text-fleer-text-dim uppercase tracking-[0.2em]">
               &copy; 2026 Fleer Intelligence Systems. All rights reserved.
             </div>
           </div>
        </footer>

      </main>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function Badge({ label, variant, dot }: { label: string; variant: 'success' | 'warning' | 'danger'; dot?: boolean }) {
  const styles = {
    success: 'bg-fleer-accent/10 text-fleer-accent border-fleer-accent/20',
    warning: 'bg-fleer-warning/10 text-fleer-warning border-fleer-warning/20',
    danger:  'bg-fleer-danger/10 text-fleer-danger border-fleer-danger/20',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-display font-bold uppercase tracking-widest leading-none ${styles[variant]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-fleer-accent pulse-green' : variant === 'warning' ? 'bg-fleer-warning' : 'bg-fleer-danger'}`} />}
      {label}
    </span>
  );
}
