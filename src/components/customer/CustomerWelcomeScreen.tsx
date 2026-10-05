'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, Star } from 'lucide-react';

export const CustomerWelcomeScreen: React.FC = () => {
  const { coach, setCustomerTab } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 text-center font-sans bg-white min-h-[700px]">
      {/* Top Coach Crest */}
      <div className="pt-8 space-y-4">
        <div 
          className="w-20 h-20 rounded-3xl mx-auto overflow-hidden border-2 shadow-md p-1"
          style={{ borderColor: 'var(--brand-primary)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover rounded-2xl" />
        </div>

        <div className="space-y-1">
          <span 
            className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white inline-block"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Official Client App
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome to {coach.businessName}
          </h1>
          <p className="text-xs text-slate-500 max-w-[260px] mx-auto leading-relaxed">
            Your personalized transformation journey, daily habits, and coach connection starts here.
          </p>
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="space-y-2.5 my-6 text-left max-w-[290px] mx-auto">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Custom Nutrition & Habits</div>
            <div className="text-[10px] text-slate-500">Tailored to your body composition</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Daily Missions & Streaks</div>
            <div className="text-[10px] text-slate-500">Gamified progress rewards & badges</div>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Direct 1:1 Coach Access</div>
            <div className="text-[10px] text-slate-500">Continuous accountability from Coach Kavya</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-3 pb-4">
        <button
          onClick={() => setCustomerTab('assessment')}
          className="w-full py-4 rounded-2xl text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          style={{
            backgroundColor: 'var(--brand-primary)',
          }}
        >
          <span>Start My Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-slate-400">
          Takes only 90 seconds to personalize your program
        </p>
      </div>
    </div>
  );
};
