'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ADMIN_STATS } from '../../data/admin';
import { 
  Users, 
  IndianRupee, 
  TrendingUp, 
  ShieldAlert, 
  ArrowUpRight, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';
import { formatINR } from '../../lib/utils';

export const AdminDashboardScreen: React.FC = () => {
  const { setAdminScreen, setCurrentRole, setCoachScreen } = useApp();

  const mrrTrend = [
    { month: 'Apr', mrr: 880000, coaches: 94 },
    { month: 'May', mrr: 1020000, coaches: 108 },
    { month: 'Jun', mrr: 1140000, coaches: 119 },
    { month: 'Jul', mrr: 1260000, coaches: 129 },
    { month: 'Aug', mrr: 1350000, coaches: 136 },
    { month: 'Sep', mrr: 1420000, coaches: 142 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-sans">
      {/* Top Welcome Strip */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform Performance & MRR</h1>
          <p className="text-xs text-slate-400">
            Real-time multi-tenant health across 142 active white-label coaching businesses
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminScreen('coach-management')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Manage Coach Accounts (142) →
          </button>
        </div>
      </div>

      {/* 5 Core Metrics Specified in Prompt */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Coaches</span>
          <div className="text-2xl font-black text-white">{ADMIN_STATS.totalCoaches}</div>
          <span className="text-[11px] text-emerald-400 font-medium">+{ADMIN_STATS.newSubscriptionsThisMonth} this month</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Active Customers</span>
          <div className="text-2xl font-black text-white">{ADMIN_STATS.activeCustomers.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400">Across all portals</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Platform MRR</span>
          <div className="text-2xl font-black text-amber-400">{formatINR(ADMIN_STATS.mrr)}</div>
          <span className="text-[11px] text-emerald-400 font-medium">{ADMIN_STATS.mrrGrowth}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Coach Churn</span>
          <div className="text-2xl font-black text-emerald-400">{ADMIN_STATS.coachChurn}%</div>
          <span className="text-[11px] text-slate-400">Industry avg 7.8%</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Avg Coach GMV</span>
          <div className="text-2xl font-black text-white">{formatINR(ADMIN_STATS.avgRevenuePerCoach)}</div>
          <span className="text-[11px] text-slate-400">Monthly GMV/coach</span>
        </div>
      </div>

      {/* MRR & Coach Growth Simple Chart (Specified in Prompt) */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Platform MRR Growth Trajectory (₹ Lakhs)
            </h3>
            <p className="text-xs text-slate-400">Monthly recurring subscription revenue from coaches</p>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            ₹14.2L Current MRR
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mrrTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderRadius: '12px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
                formatter={(val: any) => [`₹${(val / 100000).toFixed(1)}L`, 'Platform MRR']}
              />
              <Bar dataKey="mrr" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spotlight on Featured Coach: Kavya Wellness */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            KM
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Kavya Wellness (Growth Tier · ₹9,999/mo)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Top Retainer 91.2%
              </span>
            </div>
            <p className="text-xs text-slate-400">86 active clients · kavyawellness.coachos.app</p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentRole('coach');
            setCoachScreen('command-center');
          }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
        >
          Impersonate Coach Kavya →
        </button>
      </div>
    </div>
  );
};
