"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Zap, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setDemoLoading(true);
    localStorage.setItem("fleer_demo_mode", "true");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-fleer-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fleer-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fleer-info/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-fleer-accent flex items-center justify-center shadow-accent">
              <Zap size={20} className="text-fleer-bg" fill="currentColor" />
            </div>
            <span className="font-display font-bold text-2xl text-fleer-text tracking-tight uppercase">
              Fleer
            </span>
          </Link>
          <h1 className="text-xl font-display font-bold text-fleer-text">
            Welcome back
          </h1>
          <p className="text-sm text-fleer-text-muted mt-1">
            Sign in to your enterprise dashboard
          </p>
        </div>

        <div className="bg-fleer-card border border-fleer-border rounded-2xl p-8 shadow-card">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-display font-bold text-fleer-text-dim uppercase tracking-widest ml-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-fleer-text-dim">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-fleer-surface border border-fleer-border rounded-xl pl-11 pr-4 py-3 text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/50 focus:ring-4 focus:ring-fleer-accent/5 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label
                  htmlFor="password"
                  className="text-xs font-display font-bold text-fleer-text-dim uppercase tracking-widest"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-display font-bold text-fleer-accent hover:underline uppercase tracking-wider"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-fleer-text-dim">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-fleer-surface border border-fleer-border rounded-xl pl-11 pr-4 py-3 text-sm text-fleer-text placeholder:text-fleer-text-dim focus:outline-none focus:border-fleer-accent/50 focus:ring-4 focus:ring-fleer-accent/5 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-fleer-danger/10 border border-fleer-danger/20 rounded-xl p-3 text-xs text-fleer-danger font-medium animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || demoLoading}
              className="w-full h-12 bg-fleer-accent text-fleer-bg font-display font-bold text-xs rounded-xl shadow-accent hover:bg-fleer-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fleer-border"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-display font-bold">
              <span className="bg-fleer-card px-3 text-fleer-text-dim">
                Or Continue With
              </span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={loading || demoLoading}
            className="w-full h-12 bg-fleer-surface border border-fleer-border text-fleer-text font-display font-bold text-xs rounded-xl hover:bg-fleer-card transition-all uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {demoLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Launch Live Demo"
            )}
          </button>
        </div>

        <p className="text-center mt-8 text-xs text-fleer-text-muted">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-fleer-accent font-bold hover:underline"
          >
            Contact Sales
          </Link>
        </p>
      </div>
    </div>
  );
}
