'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLOR_THEMES } from '../../data/coach';
import { 
  TrendingUp, 
  IndianRupee, 
  Palette, 
  Smartphone, 
  Save, 
  Sparkles, 
  Check, 
  Upload, 
  ExternalLink, 
  Share2, 
  Globe, 
  Gift, 
  Users, 
  BarChart2, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { cn, formatINR } from '../../lib/utils';

export const BusinessScreen: React.FC = () => {
  const { coach, updateCoachTheme, updateCoachProfile, showNotification, setCurrentRole, setCustomerTab } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'revenue' | 'brand'>('brand');

  // Brand Form Local State
  const [businessName, setBusinessName] = useState(coach.businessName);
  const [coachBio, setCoachBio] = useState(coach.bio);
  const [welcomeMsg, setWelcomeMsg] = useState(coach.welcomeMessage);
  const [subdomain, setSubdomain] = useState('kavyawellness');
  const [rewardType, setRewardType] = useState(coach.referralRewardType);

  // Analytics mock data
  const growthData = [
    { month: 'May', clients: 44, revenue: 92000 },
    { month: 'Jun', clients: 56, revenue: 118000 },
    { month: 'Jul', clients: 68, revenue: 142000 },
    { month: 'Aug', clients: 78, revenue: 164000 },
    { month: 'Sep', clients: 86, revenue: 184000 },
  ];

  const revenueBreakdown = [
    { name: 'Programs (Journeys)', value: 124000, color: 'var(--brand-primary)' },
    { name: 'Supplements / Products', value: 36000, color: '#F59E0B' },
    { name: '1:1 Consultations', value: 14000, color: '#3B82F6' },
    { name: 'Memberships', value: 10000, color: '#8B5CF6' },
  ];

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoachProfile({
      businessName,
      bio: coachBio,
      welcomeMessage: welcomeMsg,
      referralRewardType: rewardType,
      subdomain: `${subdomain}.coachos.app`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Header and Tab Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Business Control & Brand Customizer</h2>
          <p className="text-xs text-slate-500">
            Configure white-label branding, monitor monthly revenue, and inspect retention analytics
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <button
            onClick={() => setActiveTab('brand')}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all",
              activeTab === 'brand'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <Palette className="w-3.5 h-3.5 text-amber-300" />
            <span>My Brand & Live Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all",
              activeTab === 'revenue'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Revenue</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={cn(
              "px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all",
              activeTab === 'analytics'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MY BRAND & LIVE MOBILE PREVIEW (Signature White-Label Demonstration) */}
      {activeTab === 'brand' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Brand Configuration Form */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleSaveBrand} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">White-Label Brand Setup</h3>
                  <p className="text-xs text-slate-500">Changes reflect instantly in your client app</p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              {/* Color Theme Selector (Core White-Label Feature) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-emerald-600" />
                    <span>Portal & Client App Theme Color</span>
                  </label>
                  <span className="text-xs font-semibold text-slate-500">
                    Active: {coach.themeName}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {COLOR_THEMES.map((theme) => {
                    const isSelected = coach.themeColor.toLowerCase() === theme.primary.toLowerCase();

                    return (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() => updateCoachTheme(theme.primary, theme.accent, theme.name)}
                        className={cn(
                          "p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all",
                          isSelected
                            ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        )}
                      >
                        <span 
                          className="w-5 h-5 rounded-full shrink-0 shadow-xs flex items-center justify-center text-white"
                          style={{ backgroundColor: theme.primary }}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">{theme.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{theme.primary}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brand Name & Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">CoachOS Custom URL</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-l-xl border border-r-0 border-slate-300 text-slate-900 font-mono"
                    />
                    <span className="bg-slate-100 border border-slate-300 text-slate-600 text-xs px-3 py-2.5 rounded-r-xl font-mono">
                      .coachos.app
                    </span>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Client App Welcome Greeting</label>
                <textarea
                  rows={2}
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              {/* Referral Reward Choice */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-amber-500" />
                  <span>Client Referral Reward Scheme</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    '₹250 discount',
                    '500 reward points',
                    'Free Consultation call',
                  ].map((rew) => (
                    <button
                      key={rew}
                      type="button"
                      onClick={() => setRewardType(rew as any)}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-bold text-center transition-all",
                        rewardType === rew
                          ? "bg-amber-500 text-slate-950 border-amber-500 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {rew}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Public Social Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <Share2 className="w-4 h-4 text-pink-600" />
                    <span className="text-slate-700">{coach.socials.instagram}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-slate-50">
                    <Globe className="w-4 h-4 text-sky-600" />
                    <span className="text-slate-700">{coach.socials.website}</span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: LIVE MOBILE PREVIEW THAT RE-THEMES IN REAL TIME */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[340px] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Live Client Mobile Preview</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('home');
                  }}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Interactive View →
                </button>
              </div>

              {/* Mini Phone Mockup with CSS Variable Driven Styling */}
              <div className="w-full h-[580px] bg-slate-900 rounded-[38px] p-2.5 shadow-2xl border-4 border-slate-800 relative overflow-hidden flex flex-col">
                {/* Dynamic island */}
                <div className="h-6 flex items-center justify-center shrink-0">
                  <div className="w-20 h-3.5 bg-black rounded-full" />
                </div>

                {/* Inner Screen */}
                <div className="flex-1 bg-white rounded-[28px] overflow-y-auto p-4 space-y-3.5 no-scrollbar text-left font-sans">
                  {/* Branded Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full overflow-hidden border"
                        style={{ borderColor: 'var(--brand-primary)' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">{businessName}</div>
                        <div className="text-xs font-black text-slate-900">Good Morning, Rohan</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                      12d 🔥
                    </span>
                  </div>

                  {/* Re-themed Hero Card */}
                  <div 
                    className="rounded-2xl p-4 text-white shadow-md space-y-2.5 transition-colors duration-300"
                    style={{
                      backgroundColor: 'var(--brand-primary)',
                      backgroundImage: `linear-gradient(135deg, var(--brand-primary) 0%, #0F172A 100%)`
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-full">
                          Journey
                        </span>
                        <div className="text-sm font-black mt-1">Weight Transformation</div>
                        <div className="text-[10px] opacity-80">Day 34 of 60</div>
                      </div>
                      <span className="text-xs font-black">62%</span>
                    </div>

                    <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[62%]" />
                    </div>
                  </div>

                  {/* Missions Preview */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Today&apos;s Missions
                    </span>
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">Morning Hydration</span>
                      <span 
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                      >
                        Done ✓
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">Breakfast (30g protein)</span>
                      <span 
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: 'var(--brand-primary)' }}
                      >
                        Done ✓
                      </span>
                    </div>
                  </div>

                  {/* Referral Card */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                    <div className="text-[11px] font-bold">Reward Scheme: {rewardType}</div>
                    <p className="text-[10px] text-amber-800">Invite a friend to unlock voucher automatically.</p>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-4 flex items-center justify-center">
                  <div className="w-20 h-1 bg-slate-700 rounded-full" />
                </div>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Switch themes above to watch this mobile client app re-theme instantly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REVENUE */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">This Month Revenue</span>
              <div className="text-2xl font-black text-slate-900">{formatINR(184000)}</div>
              <span className="text-xs text-emerald-600 font-bold">+22.4% vs last month</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Program Subscriptions</span>
              <div className="text-2xl font-black text-slate-900">{formatINR(124000)}</div>
              <span className="text-xs text-slate-500">67.4% of total volume</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Product Sales</span>
              <div className="text-2xl font-black text-slate-900">{formatINR(36000)}</div>
              <span className="text-xs text-emerald-600 font-bold">Supplements & Gear</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pipeline Renewals (Next 14d)</span>
              <div className="text-2xl font-black text-blue-600">{formatINR(72000)}</div>
              <span className="text-xs text-blue-700 font-medium">8 clients in review window</span>
            </div>
          </div>

          {/* Revenue Breakdown by Category */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Revenue Stream Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {revenueBreakdown.map((rev, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{rev.name}</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{formatINR(rev.value)}</div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(rev.value / 184000) * 100}%`,
                        backgroundColor: rev.color 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Customer Roster & Revenue Growth</h3>
                <p className="text-xs text-slate-500">5-month trajectory of paying client base</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                +95.4% YoY Expansion
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [val, 'Metrics']}
                  />
                  <Bar dataKey="clients" fill="var(--brand-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Retention Rate</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">91.2%</div>
              <p className="text-xs text-slate-500 mt-0.5">Top 5% among wellness coaches</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Referral Conversion</span>
              <div className="text-2xl font-black text-purple-600 mt-1">61.1%</div>
              <p className="text-xs text-slate-500 mt-0.5">11 of 18 invited friends enrolled</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Renewals Closed</span>
              <div className="text-2xl font-black text-blue-600 mt-1">84.0%</div>
              <p className="text-xs text-slate-500 mt-0.5">Graduate to Phase 2 journeys</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
