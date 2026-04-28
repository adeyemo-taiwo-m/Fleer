'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Zap, ShieldCheck, TrendingUp, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@smartsales.ai');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    
    if (authError) {
      setError(authError.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleDemoAccess = () => {
    localStorage.setItem('fleer_demo_mode', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-[var(--space-4)]">
      <div className="max-w-[960px] w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Panel */}
        <div className="p-[var(--space-12)] bg-gradient-to-br from-[rgba(0,229,160,0.06)] to-transparent flex flex-col justify-between border-r border-[var(--border-subtle)]">
          <div>
            <div className="flex flex-row items-center gap-[var(--space-3)]">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-green)] flex items-center justify-center text-[#0d1117] shadow-[0_0_12px_rgba(0,229,160,0.25)]">
                <Zap size={16} fill="currentColor" />
              </div>
              <span className="text-[var(--text-xl)] font-[800] text-[var(--text-primary)] tracking-tight">Fleer</span>
            </div>

            <h1 className="text-[var(--text-4xl)] font-[800] leading-[1.1] text-[var(--text-primary)] mt-[var(--space-8)] tracking-tighter">
              Welcome back to <br />
              <span className="text-[var(--accent-green)]">Fleet Intelligence.</span>
            </h1>

            <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-6)]">
              {[
                { icon: ShieldCheck, title: "Secure Access", desc: "Enterprise-grade protection for your logistics data." },
                { icon: TrendingUp, title: "Live Tracking", desc: "Monitor your entire fleet's health from one screen." },
                { icon: Lock, title: "Revenue Shield", desc: "Keeping your fuel and assets safe 24/7." }
              ].map((item, i) => (
                <div key={i} className="flex flex-row gap-[var(--space-4)] items-start">
                  <div className="w-[36px] h-[36px] bg-[var(--accent-green-dim)] text-[var(--accent-green)] rounded-full flex items-center justify-center shrink-0">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-[var(--text-sm)] font-semibold text-[var(--text-primary)]">{item.title}</h4>
                    <p className="text-[var(--text-xs)] text-[var(--text-secondary)] mt-[2px]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[var(--text-xs)] text-[var(--text-muted)] font-bold uppercase tracking-[0.08em] mt-[var(--space-8)]">
            &copy; 2026 Fleer Intelligence
          </p>
        </div>

        {/* Right Panel */}
        <div className="p-[var(--space-12)] flex flex-col justify-center bg-[var(--bg-card)]/30">
          <h2 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] mb-[var(--space-2)]">Sign In</h2>
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mb-[var(--space-8)]">Access your enterprise dashboard</p>

          {error && (
            <div className="bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 rounded-[var(--radius-md)] px-4 py-3 mb-6">
              <p className="text-[var(--text-xs)] text-[var(--accent-red)] font-semibold text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-[var(--space-5)]">
            <div>
              <label className="block text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-[0.06em] mb-[var(--space-2)]">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full h-[44px] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-[var(--space-4)] text-[var(--text-sm)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)] focus:ring-[3px] focus:ring-[var(--accent-green)]/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-[0.06em] mb-[var(--space-2)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full h-[44px] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-[var(--space-4)] text-[var(--text-sm)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)] focus:ring-[3px] focus:ring-[var(--accent-green)]/15 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[var(--accent-green)] text-[#0d1117] font-[700] text-[var(--text-sm)] rounded-[var(--radius-md)] border-none cursor-pointer transition-all duration-180 hover:bg-[#00c98a] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full h-[44px] mt-[var(--space-4)] flex items-center justify-center text-[var(--text-sm)] text-[var(--text-secondary)] border border-[var(--border-default)] rounded-[var(--radius-md)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)] hover:bg-white/[0.03] transition-all duration-180"
            >
              Explore Demo Mode
            </button>
          </form>

          <p className="text-[var(--text-xs)] text-[var(--text-secondary)] text-center mt-[var(--space-8)]">
            New here? <Link href="/signup" className="text-[var(--accent-green)] font-bold hover:underline">Create an organization account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
