'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Gift 
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CoachLoginScreen: React.FC = () => {
  const { setCoachScreen, coach, updateCoachTheme } = useApp();
  const [email, setEmail] = useState('kavya@kavyawellness.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCoachScreen('command-center');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row font-sans">
      {/* Left Column: Login Form */}
      <div className="flex-1 bg-white p-8 md:p-14 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              C
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">CoachOS</span>
              <span className="block text-[10px] text-slate-400 font-medium">Independent Coach Operating System</span>
            </div>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline-block">
            Need help? <a href="#" className="font-semibold text-emerald-600 hover:underline">Support</a>
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-12 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Coach Workspace Sign In</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome back, Coach Kavya
            </h1>
            <p className="text-xs text-slate-500">
              Access your client retention dashboard, referral pipeline, and branded store.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Coach Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <a href="#" className="text-[11px] text-emerald-600 font-medium hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500" />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Opening Command Center...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Previews */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Demo Credential: Coach Kavya Menon</span>
            <button
              type="button"
              onClick={() => setCoachScreen('command-center')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Skip Directly to Home →
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-400 text-center">
          CoachOS White-Label Platform · Enterprise Level Privacy & Data Isolation
        </div>
      </div>

      {/* Right Column: Branded Portal Live Showcase */}
      <div 
        className="flex-1 p-8 md:p-14 flex flex-col justify-between text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #090D16 0%, #0F172A 50%, var(--brand-primary) 100%)`
        }}
      >
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>White-Label Client Experience</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Your Brand. Your Clients. Your Growth.
          </h2>
          <p className="text-xs text-slate-300 max-w-md">
            Every coach gets an independent, branded client app and portal at <span className="font-mono text-emerald-300">{coach.subdomain}</span>.
          </p>
        </div>

        {/* Branded Preview Mockup Card */}
        <div className="relative z-10 max-w-md mx-auto my-8 w-full bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/30 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{coach.businessName}</h3>
              <p className="text-xs text-slate-300">kavyawellness.coachos.app</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-base font-black text-white">86</div>
              <div className="text-[10px] text-slate-300">Active Clients</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-base font-black text-emerald-300">91.2%</div>
              <div className="text-[10px] text-slate-300">Retention</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-base font-black text-amber-300">18</div>
              <div className="text-[10px] text-slate-300">Referrals</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-200">Current Plan: Growth Tier</span>
            <span className="font-bold text-emerald-300">₹9,999/mo</span>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
          <span>White-label iOS, Android, and Web PWA</span>
          <span>Instantly customizable theme</span>
        </div>
      </div>
    </div>
  );
};
