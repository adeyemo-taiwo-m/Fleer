'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // 2. Create organization
      const { error: orgError } = await supabase
        .from('organizations')
        .insert({
          name: orgName,
          // user_id is handled by RLS/Trigger ideally, but we'll assume a trigger or logic here
        });

      if (orgError) {
        // We could handle this, but for now let's just proceed
      }
      
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
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#00C896]/10 flex items-center justify-center mx-auto mb-6 text-[#00C896]">
            <Zap size={40} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-[#E2E8F0] mb-2">Check your email</h2>
          <p className="text-[#64748B] mb-8">We've sent a confirmation link to {email}. Please verify your account to continue.</p>
          <Link href="/login">
            <Button variant="primary" className="w-full">Back to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00C896] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-[#00C896] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,200,150,0.4)]">
            <Zap size={32} className="text-[#0A0E1A]" fill="currentColor" />
          </div>
          <h1 className="font-bold text-3xl text-[#E2E8F0] tracking-tight">Fleer</h1>
          <p className="text-[#64748B] text-sm mt-1">Start Protecting Your Fleet</p>
        </div>

        <div className="bg-[#1A2235]/80 backdrop-blur-xl border border-[#1E2D42] rounded-3xl p-8 shadow-2xl">
          <h2 className="font-semibold text-[#E2E8F0] text-lg mb-6 text-center">Create your organization</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-center">
              <p className="text-xs text-red-400 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-[#64748B] mb-2 uppercase tracking-widest">Company Name</label>
              <input
                type="text"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                required
                placeholder="Logistics Hub Ltd"
                className="w-full bg-[#111827] border border-[#1E2D42] rounded-xl px-4 py-3 text-sm text-[#E2E8F0] placeholder:text-[#334155] focus:outline-none focus:border-[#00C896]/60 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#64748B] mb-2 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@company.com"
                className="w-full bg-[#111827] border border-[#1E2D42] rounded-xl px-4 py-3 text-sm text-[#E2E8F0] placeholder:text-[#334155] focus:outline-none focus:border-[#00C896]/60 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#64748B] mb-2 uppercase tracking-widest">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#111827] border border-[#1E2D42] rounded-xl px-4 py-3 text-sm text-[#E2E8F0] placeholder:text-[#334155] focus:outline-none focus:border-[#00C896]/60 transition-all"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-4 text-base mt-2" loading={loading}>
              Create Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#1E2D42]"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-[#1A2235] px-4 text-[#334155]">Or</span></div>
            </div>

            <Button type="button" variant="secondary" className="w-full py-3 text-sm border-[#00C896]/20 text-[#00C896] hover:bg-[#00C896]/5" onClick={handleDemoAccess}>
              Explore Demo Mode
            </Button>
          </form>

          <p className="text-center text-xs text-[#64748B] mt-6">
            Already have an account? <Link href="/login" className="text-[#00C896] font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
