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

    // Detect if we are in a placeholder/unconfigured state
    const isPlaceholder = supabase.auth.getSession === undefined || 
                         process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') ||
                         !process.env.NEXT_PUBLIC_SUPABASE_URL;

    // Check for demo credentials first to bypass network errors entirely
    const isDemoCreds = email === 'demo@smartsales.ai' || email === 'demo@fleer.ng';

    if (isPlaceholder && isDemoCreds) {
      console.log('Unconfigured Supabase detected, allowing demo login bypass');
      localStorage.setItem('fleer_demo_mode', 'true');
      router.push('/');
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (authError) {
        // Handle "Failed to fetch" returned by Supabase client as an error object
        if (authError.message.includes('fetch') && isDemoCreds) {
          localStorage.setItem('fleer_demo_mode', 'true');
          router.push('/');
          return;
        }
        setError(authError.message);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.warn('Supabase fetch failed:', err);
      
      if (isDemoCreds) {
        localStorage.setItem('fleer_demo_mode', 'true');
        router.push('/');
      } else {
        setError('Connection failed. Please check your internet or Supabase configuration.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    localStorage.setItem('fleer_demo_mode', 'true');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-fleer-bg flex items-center justify-center p-4">
      <div className="max-w-[960px] w-full bg-fleer-surface border border-fleer-border rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Panel: Branding */}
        <div className="p-12 bg-gradient-to-br from-fleer-accent/10 to-transparent flex flex-col justify-between border-r border-fleer-border">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-fleer-accent flex items-center justify-center shadow-accent">
                <Zap size={16} className="text-fleer-bg" fill="currentColor" />
              </div>
              <span className="font-display font-bold text-base text-fleer-text tracking-tight uppercase">Fleer</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] text-fleer-text mt-12 tracking-tight">
              Professional <br />
              <span className="text-fleer-accent">Fleet Intelligence.</span>
            </h1>

            <div className="mt-12 flex flex-col gap-8">
              {[
                { icon: ShieldCheck, title: "Operations Shield", desc: "Enterprise-grade protection for your logistics data." },
                { icon: TrendingUp, title: "Performance Alpha", desc: "Monitor your entire fleet's health from one screen." },
                { icon: Lock, title: "Revenue Integrity", desc: "Keeping your fuel and assets safe 24/7." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-9 h-9 bg-fleer-accent/10 text-fleer-accent rounded-full flex items-center justify-center shrink-0 border border-fleer-accent/10">
                    <item.icon size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-fleer-text uppercase tracking-wider">{item.title}</h4>
                    <p className="font-body text-xs text-fleer-text-muted mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="font-display text-[11px] text-fleer-text-dim font-bold uppercase tracking-[0.2em] mt-12">
            &copy; 2026 Fleer Intelligence
          </p>
        </div>

        {/* Right Panel: Form */}
        <div className="p-12 flex flex-col justify-center bg-fleer-card/30">
          <div className="max-w-[320px] w-full mx-auto">
            <h2 className="font-display text-2xl font-bold text-fleer-text tracking-tight mb-2">Sign In</h2>
            <p className="font-display text-xs text-fleer-text-muted font-medium uppercase tracking-widest mb-10">Access your enterprise dashboard</p>

            {error && (
              <div className="bg-fleer-danger/10 border border-fleer-danger/20 rounded-lg px-4 py-3 mb-6">
                <p className="font-display text-[11px] text-fleer-danger font-bold text-center uppercase tracking-wider">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block font-display text-[11px] font-bold text-fleer-text-muted uppercase tracking-[0.1em] mb-2">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full h-11 bg-fleer-surface border border-fleer-border rounded-lg px-4 font-display text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/60 focus:ring-2 focus:ring-fleer-accent/15 transition-all"
                />
              </div>

              <div>
                <label className="block font-display text-[11px] font-bold text-fleer-text-muted uppercase tracking-[0.1em] mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full h-11 bg-fleer-surface border border-fleer-border rounded-lg px-4 font-display text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/60 focus:ring-2 focus:ring-fleer-accent/15 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-fleer-accent text-fleer-bg font-display font-bold text-sm rounded-lg shadow-accent hover:bg-fleer-accent/90 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {loading ? 'Authenticating...' : 'Enter Dashboard'}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-fleer-border"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-fleer-text-dim"><span className="bg-fleer-surface px-2">OR</span></div>
              </div>

              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full h-11 flex items-center justify-center font-display font-bold text-[11px] text-fleer-text-muted uppercase tracking-[0.15em] border border-fleer-border rounded-lg hover:border-fleer-accent/50 hover:text-fleer-text hover:bg-fleer-accent/5 transition-all duration-150"
              >
                Explore Demo Mode
              </button>
            </form>

            <p className="font-display text-[11px] text-fleer-text-muted text-center mt-12 font-medium uppercase tracking-wider">
              New here? <Link href="/signup" className="text-fleer-accent font-bold hover:underline">Create an organization account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
