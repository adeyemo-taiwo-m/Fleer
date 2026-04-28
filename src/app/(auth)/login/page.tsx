'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      router.push('/');
    }
    setLoading(false);
  };

  const handleDemoAccess = () => {
    localStorage.setItem('fleer_demo_mode', 'true');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00C896] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#00C896] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,200,150,0.4)]">
            <Zap size={32} className="text-[#0A0E1A]" fill="currentColor" />
          </div>
          <h1 className="font-bold text-3xl text-[#E2E8F0] tracking-tight">Fleer</h1>
          <p className="text-[#64748B] text-sm mt-1">Fleet Intelligence & Revenue Protection</p>
        </div>

        {/* Form */}
        <div className="bg-[#1A2235]/80 backdrop-blur-xl border border-[#1E2D42] rounded-3xl p-8 shadow-2xl">
          <h2 className="font-semibold text-[#E2E8F0] text-lg mb-6 text-center">Sign in to your account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">
              <p className="text-xs text-red-400 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-[#64748B] mb-2 uppercase tracking-widest">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="fleet@company.com"
                className="w-full bg-[#111827] border border-[#1E2D42] rounded-xl px-4 py-3 text-sm text-[#E2E8F0] placeholder:text-[#334155] focus:outline-none focus:border-[#00C896]/60 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                  Password
                </label>
                <a href="#" className="text-[10px] font-bold text-[#00C896] hover:underline uppercase tracking-widest">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#111827] border border-[#1E2D42] rounded-xl px-4 py-3 text-sm text-[#E2E8F0] placeholder:text-[#334155] focus:outline-none focus:border-[#00C896]/60 transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-4 text-base mt-2"
              loading={loading}
            >
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1E2D42]"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-[#1A2235] px-4 text-[#334155]">Or</span></div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full py-3 text-sm border-[#00C896]/20 text-[#00C896] hover:bg-[#00C896]/5"
              onClick={handleDemoAccess}
            >
              Explore Demo Mode
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-[#64748B] mt-8">
          &copy; 2026 Fleer Platform · All rights reserved.
        </p>
      </div>
    </div>
  );
}
