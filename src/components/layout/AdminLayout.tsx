'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  CreditCard, 
  FileText, 
  ArrowLeft, 
  Activity, 
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminScreen, setAdminScreen, setCurrentRole, setCoachScreen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Overview & MRR', icon: TrendingUp },
    { id: 'coach-management', label: 'Coach Directory', icon: Users, badge: '142 Active' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Banner */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
            ⚡
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-tight">CoachOS HQ Platform Admin</span>
            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              Superadmin Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentRole('coach');
              setCoachScreen('command-center');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Coach View (Kavya)</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Admin Nav (Horizontal on mobile/tablet, vertical on desktop) */}
        <aside className="w-full md:w-64 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-3 md:p-4 flex flex-col shrink-0 overflow-y-auto max-h-48 md:max-h-full">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            HQ Operations
          </div>
          <nav className="space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setAdminScreen(item.id as any)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
                    isActive
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-md",
                      isActive ? "bg-slate-900/20 text-slate-950" : "bg-slate-800 text-slate-400"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
            Platform Utilities
          </div>
          <div className="space-y-1 text-xs">
            <button
              onClick={() => setAdminScreen('subscriptions')}
              className={cn(
                "w-full px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-all text-left",
                adminScreen === 'subscriptions'
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              )}
            >
              <span className="flex items-center gap-2">
                <CreditCard className={cn("w-3.5 h-3.5", adminScreen === 'subscriptions' ? "text-slate-950" : "text-slate-500")} />
                <span>Subscriptions Engine</span>
              </span>
              <span className={cn(
                "text-[10px]",
                adminScreen === 'subscriptions' ? "text-slate-950 font-bold" : "text-slate-500"
              )}>
                Stripe/Razorpay
              </span>
            </button>

            <button
              onClick={() => setAdminScreen('templates')}
              className={cn(
                "w-full px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-all text-left",
                adminScreen === 'templates'
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              )}
            >
              <span className="flex items-center gap-2">
                <FileText className={cn("w-3.5 h-3.5", adminScreen === 'templates' ? "text-slate-950" : "text-slate-500")} />
                <span>Global Templates</span>
              </span>
              <span className={cn(
                "text-[10px]",
                adminScreen === 'templates' ? "text-slate-950 font-bold" : "text-slate-500"
              )}>
                8 Presets
              </span>
            </button>

            <button
              onClick={() => setAdminScreen('system-health')}
              className={cn(
                "w-full px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between transition-all text-left",
                adminScreen === 'system-health'
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/40"
              )}
            >
              <span className="flex items-center gap-2">
                <Activity className={cn("w-3.5 h-3.5", adminScreen === 'system-health' ? "text-slate-950" : "text-slate-500")} />
                <span>System Logs & Health</span>
              </span>
              <span className={cn(
                "text-[10px]",
                adminScreen === 'system-health' ? "text-slate-950 font-bold" : "text-emerald-400 font-semibold"
              )}>
                99.98%
              </span>
            </button>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
