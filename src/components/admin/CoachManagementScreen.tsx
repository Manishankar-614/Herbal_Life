'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ADMIN_COACHES } from '../../data/admin';
import { AdminCoachRecord } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const CoachManagementScreen: React.FC = () => {
  const { setCurrentRole, setCoachScreen, showNotification } = useApp();
  const [coachesList, setCoachesList] = useState<AdminCoachRecord[]>(ADMIN_COACHES);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'coaches' | 'subscriptions' | 'content' | 'support'>('coaches');

  const filteredCoaches = coachesList.filter(c => 
    c.coachName.toLowerCase().includes(search.toLowerCase()) ||
    c.businessName.toLowerCase().includes(search.toLowerCase()) ||
    c.subdomain.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setCoachesList(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
        showNotification(`${c.businessName} status changed to ${nextStatus}`, 'info');
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Coach Directory & Subscriptions</h2>
          <p className="text-xs text-slate-400">
            Monitor multi-tenant coaches, customer volumes, plan allocations, and account standing
          </p>
        </div>

        {/* Small Tabs / Stubs as Specified in Prompt */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {[
            { id: 'coaches', label: 'Coaches (142)' },
            { id: 'subscriptions', label: 'Subscriptions' },
            { id: 'content', label: 'Platform Content' },
            { id: 'support', label: 'System Health' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                activeTab === t.id
                  ? "bg-amber-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'coaches' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by coach name, domain, or business..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline-block">
              Showing {filteredCoaches.length} registered coaches
            </span>
          </div>

          {/* Table */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/50">
                    <th className="py-3.5 px-5">Coach & Subdomain</th>
                    <th className="py-3.5 px-4">Plan Tier</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Active Customers</th>
                    <th className="py-3.5 px-4">Retention Rate</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredCoaches.map((c) => {
                    const isKavya = c.coachName.includes('Kavya');

                    return (
                      <tr key={c.id} className={cn("hover:bg-slate-900/60 transition-colors", isKavya && "bg-amber-500/5")}>
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{c.businessName}</span>
                            {isKavya && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black">
                                Current Demo Coach
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">{c.subdomain} · {c.coachName}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md font-bold text-[10px]",
                            c.plan === 'Scale' ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" :
                            c.plan === 'Growth' ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                            "bg-slate-800 text-slate-300"
                          )}>
                            {c.plan} (₹{c.plan === 'Scale' ? '19,999' : c.plan === 'Growth' ? '9,999' : '4,999'}/m)
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                            c.status === 'Active' ? "bg-emerald-500/20 text-emerald-400" :
                            c.status === 'Trial' ? "bg-blue-500/20 text-blue-400" : "bg-rose-500/20 text-rose-400"
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full", c.status === 'Active' ? "bg-emerald-400" : "bg-rose-400")} />
                            <span>{c.status}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-white">{c.customerCount} clients</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={cn(
                            "font-bold",
                            c.retentionRate >= 90 ? "text-emerald-400" : "text-amber-400"
                          )}>
                            {c.retentionRate}%
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setCurrentRole('coach');
                              setCoachScreen('command-center');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                          >
                            View
                          </button>
                          <button
                            onClick={() => toggleStatus(c.id)}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors",
                              c.status === 'Active'
                                ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                                : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                            )}
                          >
                            {c.status === 'Active' ? 'Suspend' : 'Reactivate'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Lightweight Stubs as requested */}
      {activeTab === 'subscriptions' && (
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-3">
          <h3 className="text-sm font-bold text-white">Stripe / Razorpay Gateway Subscriptions</h3>
          <p className="text-slate-400">142 active coach billing agreements. Next automated renewal cycle runs in 4 days.</p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400">Success Rate:</span> <div className="text-base font-bold text-emerald-400">99.2%</div></div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400">Failed Retries:</span> <div className="text-base font-bold text-slate-200">1</div></div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800"><span className="text-slate-400">Next Payout:</span> <div className="text-base font-bold text-amber-400">₹14,20,000</div></div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-3">
          <h3 className="text-sm font-bold text-white">Global Program Curriculum Presets</h3>
          <p className="text-slate-400">8 verified master templates synced across all coach accounts.</p>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400 font-semibold">
            Weight Loss, Gut Health, Strength, Hormonal Glow, Corporate Fatigue, Maintenance.
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-3">
          <h3 className="text-sm font-bold text-white">Platform Health & Cloud Uptime</h3>
          <p className="text-slate-400">All services operating with 99.98% availability.</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400">Tenant Isolation: Nominal ✓</div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-400">WebSocket / Push Latency: 42ms ✓</div>
          </div>
        </div>
      )}
    </div>
  );
};
