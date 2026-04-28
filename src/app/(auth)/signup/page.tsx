'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Zap, ShieldCheck, TrendingUp, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      await supabase.from('organizations').insert({ name: orgName });
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleDemoAccess = () => {
    localStorage.setItem('fleer_demo_mode', 'true');
    router.push('/dashboard');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center p-[var(--space-6)]">
        <div className="max-w-md w-full text-center space-y-[var(--space-8)]">
          <div className="w-[80px] h-[80px] rounded-full bg-[var(--accent-green-dim)] flex items-center justify-center mx-auto text-[var(--accent-green)] border border-[var(--accent-green)]/20 shadow-[0_0_32px_rgba(0,229,160,0.1)]">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
          <div className="space-y-[var(--space-3)]">
            <h2 className="text-[var(--text-4xl)] font-[800] text-[var(--text-primary)] tracking-tighter">Check your email</h2>
            <p className="text-[var(--text-lg)] text-[var(--text-secondary)] leading-relaxed">
              We've sent an activation link to <span className="text-[var(--text-primary)] font-semibold">{email}</span>. Please verify your account to continue.
            </p>
          </div>
          <Link href="/login" className="block pt-[var(--space-6)]">
            <button className="w-full h-[52px] bg-[var(--accent-green)] text-[#0d1117] font-[800] text-[var(--text-base)] rounded-[var(--radius-md)] border-none cursor-pointer hover:bg-[#00c98a] hover:-translate-y-[2px] transition-all duration-200">
              Return to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
              Start building your <br />
              <span className="text-[var(--accent-green)]">Fleet Defense.</span>
            </h1>

            <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-6)]">
              {[
                { icon: ShieldCheck, title: "Fraud Prevention", desc: "Automated siphoning detection and route compliance." },
                { icon: TrendingUp, title: "Cost Efficiency", desc: "Reduce fuel variance by up to 15% in the first month." },
                { icon: Lock, title: "Revenue Shield", desc: "Keeping your assets safe with 24/7 AI monitoring." }
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
          <h2 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] mb-[var(--space-2)]">Get Started</h2>
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mb-[var(--space-8)]">Register your logistics organization</p>

          {error && (
            <div className="bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 rounded-[var(--radius-md)] px-4 py-3 mb-6">
              <p className="text-[var(--text-xs)] text-[var(--accent-red)] font-semibold text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-[var(--space-5)]">
            <div>
              <label className="block text-[var(--text-xs)] font-bold text-[var(--text-secondary)] uppercase tracking-[0.06em] mb-[var(--space-2)]">Company Name</label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                required
                placeholder="Logistics Hub Ltd"
                className="w-full h-[44px] bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[var(--radius-md)] px-[var(--space-4)] text-[var(--text-sm)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)] focus:ring-[3px] focus:ring-[var(--accent-green)]/15 transition-all"
              />
            </div>

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
              {loading ? 'Creating Account...' : 'Create Organization'}
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
            Already registered? <Link href="/login" className="text-[var(--accent-green)] font-bold hover:underline">Sign In Instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
