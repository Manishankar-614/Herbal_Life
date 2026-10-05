'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Filter, 
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { formatINR, cn } from '../../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

interface SubscriptionTransaction {
  id: string;
  coachName: string;
  brandName: string;
  tier: 'Scale' | 'Growth' | 'Essential';
  amount: number;
  gateway: 'Razorpay' | 'Stripe';
  billingCycle: 'Monthly' | 'Annual';
  status: 'paid' | 'retrying' | 'upcoming';
  date: string;
  nextBilling: string;
  invoiceNumber: string;
}

const mockTransactions: SubscriptionTransaction[] = [
  {
    id: 'sub-tx-1',
    coachName: 'Kavya Patil',
    brandName: 'KavyaFit Holistic',
    tier: 'Growth',
    amount: 9999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-10-01',
    nextBilling: '2026-11-01',
    invoiceNumber: 'INV-2026-1048',
  },
  {
    id: 'sub-tx-2',
    coachName: 'Aman Singhania',
    brandName: 'IronForge Academy',
    tier: 'Scale',
    amount: 19999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-09-30',
    nextBilling: '2026-10-30',
    invoiceNumber: 'INV-2026-1047',
  },
  {
    id: 'sub-tx-3',
    coachName: 'Dr. Shruti Sen',
    brandName: 'MetabolicRx Clinics',
    tier: 'Scale',
    amount: 19999,
    gateway: 'Stripe',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-09-28',
    nextBilling: '2026-10-28',
    invoiceNumber: 'INV-2026-1046',
  },
  {
    id: 'sub-tx-4',
    coachName: 'Devansh Kulkarni',
    brandName: 'PeakVibe Calisthenics',
    tier: 'Growth',
    amount: 9999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'retrying',
    date: '2026-09-27',
    nextBilling: '2026-10-03 (Retry #2)',
    invoiceNumber: 'INV-2026-1045',
  },
  {
    id: 'sub-tx-5',
    coachName: 'Rhea Chakraborty',
    brandName: 'MindBodyPrana Yoga',
    tier: 'Essential',
    amount: 4999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-09-26',
    nextBilling: '2026-10-26',
    invoiceNumber: 'INV-2026-1044',
  },
  {
    id: 'sub-tx-6',
    coachName: 'Nitin Bharadwaj',
    brandName: 'MarathonFuel Coaching',
    tier: 'Growth',
    amount: 9999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-09-25',
    nextBilling: '2026-10-25',
    invoiceNumber: 'INV-2026-1043',
  },
  {
    id: 'sub-tx-7',
    coachName: 'Sunaina Rao',
    brandName: 'GlowHarmonics Health',
    tier: 'Scale',
    amount: 19999,
    gateway: 'Stripe',
    billingCycle: 'Monthly',
    status: 'paid',
    date: '2026-09-24',
    nextBilling: '2026-10-24',
    invoiceNumber: 'INV-2026-1042',
  },
  {
    id: 'sub-tx-8',
    coachName: 'Vikrant Saxena',
    brandName: 'CrossEnduro Systems',
    tier: 'Essential',
    amount: 4999,
    gateway: 'Razorpay',
    billingCycle: 'Monthly',
    status: 'upcoming',
    date: '2026-10-05',
    nextBilling: '2026-10-05',
    invoiceNumber: 'INV-2026-1049',
  },
];

const tierRevenueData = [
  { tier: 'Scale (₹14,999)', coaches: 28, mrr: 420000, color: '#f59e0b' },
  { tier: 'Growth (₹9,999)', coaches: 82, mrr: 820000, color: '#10b981' },
  { tier: 'Essential (₹5,999)', coaches: 32, mrr: 192000, color: '#6366f1' },
];

export const AdminSubscriptionsScreen: React.FC = () => {
  const { showNotification } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'retrying' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulatingDunning, setIsSimulatingDunning] = useState(false);

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesFilter = filterStatus === 'all' || tx.status === filterStatus;
    const matchesSearch = 
      tx.coachName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRetryFailed = () => {
    setIsSimulatingDunning(true);
    setTimeout(() => {
      setIsSimulatingDunning(false);
      showNotification('Dunning webhook dispatched to Razorpay for Devansh Kulkarni (Retry #2 succeeded)', 'success');
    }, 1200);
  };

  const handleTestWebhook = () => {
    showNotification('Simulated 200 OK webhook: invoice.payment_succeeded verified via Stripe Webhook signing key', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Platform Utilities · Subscriptions Engine
            </span>
            <span className="text-xs text-slate-400">Multi-Gateway Dunning & Recurring Billing</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Subscriptions & Gateway Engine
          </h1>
          <p className="text-xs text-slate-400">
            Real-time Razorpay/Stripe subscription orchestration, recurring billing dunning, and GST compliance for 142 white-label coaches.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleTestWebhook}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Webhook Ping</span>
          </button>
          <button
            onClick={handleRetryFailed}
            disabled={isSimulatingDunning}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/10 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", isSimulatingDunning && "animate-spin")} />
            <span>{isSimulatingDunning ? 'Retrying Dunning...' : 'Retry Failed Invoices (1)'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Total Platform MRR</div>
          <div className="text-2xl font-black text-white">{formatINR(1540000)}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% MoM organic expansion</span>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Gateway Status</div>
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Razorpay (India)
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Stripe (Global)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">99.94% payment success rate</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active Subscriptions</div>
          <div className="text-2xl font-black text-white">142 Coaches</div>
          <p className="text-[11px] text-slate-400 mt-1">0 involuntary churns this billing cycle</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Smart Dunning Engine</div>
          <div className="text-2xl font-black text-amber-400">1 Retrying</div>
          <p className="text-[11px] text-slate-400 mt-1">Auto-retry Day 1, 3, 5 with WhatsApp alert</p>
        </div>
      </div>

      {/* Tier Revenue Breakdown Card */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">Platform Subscription Tier Distribution</h3>
            <p className="text-xs text-slate-400">White-label coach licenses categorized by SaaS package level</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Scale (₹19,999/mo)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Growth (₹9,999/mo)
            </span>
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              Essential (₹4,999/mo)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {tierRevenueData.map((item) => (
            <div key={item.tier} className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{item.tier}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {item.coaches} Coaches
                </span>
              </div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                {formatINR(item.mrr)} <span className="text-[11px] text-slate-500 font-normal">/ month</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${(item.mrr / 1540000) * 100}%`,
                    backgroundColor: item.color 
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction & Invoicing Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white">Live Invoices & Recurring Transactions</h3>
            <p className="text-xs text-slate-400">Automated tax invoices, GST reconciliation, and gateway events</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search coach or invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-52"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {(['all', 'paid', 'retrying', 'upcoming'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer",
                    filterStatus === st 
                      ? "bg-amber-500 text-slate-950 font-bold" 
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Coach & Brand</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Billing Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-400">{tx.invoiceNumber}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{tx.coachName}</div>
                    <div className="text-[11px] text-slate-500">{tx.brandName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-bold border",
                      tx.tier === 'Scale' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                      tx.tier === 'Growth' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    )}>
                      {tx.tier}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    {formatINR(tx.amount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <CreditCard className="w-3 h-3 text-slate-400" />
                      <span>{tx.gateway}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {tx.status === 'paid' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Paid</span>
                      </span>
                    )}
                    {tx.status === 'retrying' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Retrying (Dunning)</span>
                      </span>
                    )}
                    {tx.status === 'upcoming' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Scheduled</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div>{tx.date}</div>
                    <div className="text-[10px] text-slate-500">Next: {tx.nextBilling}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => showNotification(`Downloaded PDF GST Invoice for ${tx.invoiceNumber}`, 'success')}
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Download GST Invoice"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
