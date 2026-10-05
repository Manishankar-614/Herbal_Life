'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  BarChart2, 
  Award, 
  MessageSquare, 
  Sparkles, 
  Flame, 
  Gift, 
  ArrowLeft,
  ChevronLeft,
  Wifi,
  Battery,
  Share2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CustomerPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    customerTab, 
    setCustomerTab, 
    setCurrentRole,
    setCoachScreen,
    coach, 
    customerStreak, 
    customerXp,
    notification
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journey', label: 'Journey', icon: Compass, special: true },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'rewards', label: 'Rewards', icon: Award },
    { id: 'coach', label: 'Coach', icon: MessageSquare },
  ];

  const isIntakeFlow = customerTab === 'welcome' || customerTab === 'assessment';

  return (
    <div className="min-h-screen bg-slate-900 sm:py-6 md:py-10 p-0 sm:px-4 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background ambient lighting matching theme */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      />

      {/* Top Header Helper Bar for Investors/Reviewers */}
      <div className="w-full max-w-[390px] mb-2 sm:mb-3 flex items-center justify-between text-xs text-slate-400 px-3 pt-2 sm:pt-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentRole('coach');
              setCoachScreen('command-center');
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Coach Dashboard</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCustomerTab('referral')}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
              customerTab === 'referral' 
                ? "bg-amber-400 text-slate-950 font-bold shadow-xs" 
                : "bg-slate-800/80 text-amber-300 border border-amber-400/30 hover:bg-slate-700"
            )}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Refer a Friend</span>
          </button>
        </div>
      </div>

      {/* Phone Mockup Frame (Full-bleed on real mobile screens, 390px iPhone dimension on desktop) */}
      <div className="relative w-full sm:max-w-[390px] h-screen sm:h-[844px] bg-white rounded-none sm:rounded-[44px] shadow-2xl border-0 sm:border-[9px] border-slate-800 flex flex-col overflow-hidden sm:ring-1 sm:ring-slate-700/50">
        
        {/* Dynamic Island & Notch Area */}
        <div className="h-11 bg-white pt-2.5 px-6 flex items-center justify-between shrink-0 select-none z-40 border-b border-slate-50">
          <span className="text-[12px] font-semibold text-slate-800 tracking-tight">9:41</span>
          
          {/* Dynamic Island pill */}
          <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-slate-300 font-medium tracking-tight">Kavya Live</span>
          </div>

          <div className="flex items-center gap-1 text-slate-700">
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* In-app Toast Banner */}
        {notification && (
          <div className="absolute top-12 left-4 right-4 z-50 bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <p className="text-[11px] font-medium leading-tight">{notification.message}</p>
          </div>
        )}

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-slate-50 flex flex-col relative">
          {children}
        </div>

        {/* Bottom Navigation Bar (Hidden during full-screen onboarding flows) */}
        {!isIntakeFlow && (
          <nav className="h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 flex items-center justify-around shrink-0 z-40">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = customerTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCustomerTab(item.id as any)}
                  className="flex flex-col items-center justify-center flex-1 py-1 group transition-all"
                >
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                      isActive ? "scale-105" : "text-slate-400 group-hover:text-slate-600"
                    )}
                    style={{
                      backgroundColor: isActive ? 'var(--brand-light)' : 'transparent',
                      color: isActive ? 'var(--brand-primary)' : undefined,
                    }}
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <span 
                    className={cn(
                      "text-[10px] mt-0.5 tracking-tight font-medium transition-colors",
                      isActive ? "font-bold" : "text-slate-400 group-hover:text-slate-600"
                    )}
                    style={{
                      color: isActive ? 'var(--brand-primary)' : undefined,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Home Indicator Bar */}
        <div className="h-4 bg-white flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>

      {/* Floating Persona Label below container */}
      <div className="mt-3 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>Rohan Deshpande (Client View) · Weight Transformation Day 34/60</span>
      </div>
    </div>
  );
};
