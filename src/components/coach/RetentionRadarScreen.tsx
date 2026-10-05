'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer, CustomerStatus } from '../../types';
import { STATUS_CONFIG, StatusBadge } from '../common/StatusBadge';
import { QuickActionModal } from '../common/QuickActionModal';
import { 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  MessageSquare, 
  Award, 
  Calendar, 
  Search,
  ArrowLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Users,
  ShieldAlert,
  Clock,
  ArrowRight
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const RetentionRadarScreen: React.FC = () => {
  const { customers, openCustomer360 } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CustomerStatus | null>(null);
  const [viewMode, setViewMode] = useState<'categories' | 'board'>('categories');
  const [activeModalCustomer, setActiveModalCustomer] = useState<Customer | null>(null);
  const [modalActionType, setModalActionType] = useState<'message' | 'challenge' | 'review'>('message');

  const atRiskCount = customers.filter(c => c.status === 'declining' || c.status === 'high-risk').length;
  const renewalCount = customers.filter(c => c.status === 'renewal').length;
  const nextJourneyCount = customers.filter(c => c.status === 'next-journey').length;
  const healthyCount = customers.filter(c => c.status === 'healthy').length;
  const followUpCount = customers.filter(c => c.status === 'follow-up').length;

  const categoriesConfig: { 
    status: CustomerStatus; 
    title: string; 
    icon: string;
    borderAccent: string;
    bgAccent: string;
    textAccent: string;
    badgeBg: string;
    desc: string;
    urgencyText: string;
  }[] = [
    { 
      status: 'high-risk', 
      title: 'High Risk (Urgent)', 
      icon: '🚨',
      borderAccent: 'border-rose-300 hover:border-rose-500', 
      bgAccent: 'bg-rose-50/50 hover:bg-rose-50/80',
      textAccent: 'text-rose-700', 
      badgeBg: 'bg-rose-100 text-rose-800',
      desc: 'No activity for 7+ days or critical drop in motivation. Requires immediate 1:1 intervention.',
      urgencyText: 'Immediate Action Needed'
    },
    { 
      status: 'declining', 
      title: 'Engagement Declining', 
      icon: '⚠️',
      borderAccent: 'border-amber-300 hover:border-amber-500', 
      bgAccent: 'bg-amber-50/50 hover:bg-amber-50/80',
      textAccent: 'text-amber-800', 
      badgeBg: 'bg-amber-100 text-amber-800',
      desc: 'Missed missions, inconsistent meal logging, or slowed momentum before day 35.',
      urgencyText: 'Intervention Window (48h)'
    },
    { 
      status: 'renewal', 
      title: 'Renewal Opportunity', 
      icon: '🔄',
      borderAccent: 'border-blue-300 hover:border-blue-500', 
      bgAccent: 'bg-blue-50/50 hover:bg-blue-50/80',
      textAccent: 'text-blue-700', 
      badgeBg: 'bg-blue-100 text-blue-800',
      desc: 'Programs completing in less than 7 days. High readiness for continuation.',
      urgencyText: 'Next 7 Days'
    },
    { 
      status: 'next-journey', 
      title: 'Ready for Next Journey', 
      icon: '🚀',
      borderAccent: 'border-purple-300 hover:border-purple-500', 
      bgAccent: 'bg-purple-50/50 hover:bg-purple-50/80',
      textAccent: 'text-purple-700', 
      badgeBg: 'bg-purple-100 text-purple-800',
      desc: 'Achieved primary transformation goals. Ready for progressive upsell programs.',
      urgencyText: 'High LTV Expansion'
    },
    { 
      status: 'follow-up', 
      title: 'Follow-Up Required', 
      icon: '💬',
      borderAccent: 'border-orange-300 hover:border-orange-500', 
      bgAccent: 'bg-orange-50/50 hover:bg-orange-50/80',
      textAccent: 'text-orange-800', 
      badgeBg: 'bg-orange-100 text-orange-800',
      desc: 'Specific blockers reported (travel, festive derailment, slight joint stiffness).',
      urgencyText: 'Check-in Scheduled'
    },
    { 
      status: 'healthy', 
      title: 'Healthy Momentum', 
      icon: '✨',
      borderAccent: 'border-emerald-300 hover:border-emerald-500', 
      bgAccent: 'bg-emerald-50/50 hover:bg-emerald-50/80',
      textAccent: 'text-emerald-700', 
      badgeBg: 'bg-emerald-100 text-emerald-800',
      desc: '100% daily mission adherence, regular check-ins, and consistent streak.',
      urgencyText: 'Prime Referral Champions'
    },
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.primaryGoal.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (selectedCategory) return c.status === selectedCategory;
    return true;
  });

  const activeCategoryConfig = categoriesConfig.find(c => c.status === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Signature Banner Explaining Retention Economics */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 md:p-7 shadow-xl border border-emerald-700/40 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CoachOS Signature Screen · Clean Retention Radar</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Preserve Recurring Journey Revenue Through Early Warning Signals
            </h2>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Acquiring a new fitness client costs <span className="text-amber-300 font-bold">₹2,800 to ₹4,500</span> in ad spend. Saving your {atRiskCount} at-risk clients this month preserves <span className="text-emerald-300 font-bold">₹80,991</span> in high-margin journey renewals with zero customer acquisition cost.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => {
                setSelectedCategory('high-risk');
                setViewMode('categories');
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center transition-all cursor-pointer"
            >
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider block">At-Risk Clients</span>
              <div className="text-2xl font-black text-rose-400">{atRiskCount}</div>
              <span className="text-[10px] text-rose-200">Needs intervention</span>
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('renewal');
                setViewMode('categories');
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center transition-all cursor-pointer"
            >
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider block">Renewals Due</span>
              <div className="text-2xl font-black text-blue-400">{renewalCount}</div>
              <span className="text-[10px] text-blue-200">Next 7 days</span>
            </button>
            <button 
              onClick={() => {
                setSelectedCategory('next-journey');
                setViewMode('categories');
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center transition-all cursor-pointer"
            >
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider block">Next Journeys</span>
              <div className="text-2xl font-black text-purple-400">{nextJourneyCount}</div>
              <span className="text-[10px] text-purple-200">High LTV Upsell</span>
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedCategory ? (
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Categories</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('categories')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === 'categories'
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Category Overview</span>
              </button>
              <button
                onClick={() => setViewMode('board')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === 'board'
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Full Board</span>
              </button>
            </div>
          )}

          {selectedCategory && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-slate-400">/</span>
              <span className="font-bold text-slate-800">{activeCategoryConfig?.title}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border">
                {filteredCustomers.length} Clients
              </span>
            </div>
          )}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, journey, or goal..."
            className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
          />
        </div>
      </div>

      {/* --- MODE 1: CLEAN CATEGORY CARDS LANDING (Selected Category is null & viewMode is categories) --- */}
      {selectedCategory === null && viewMode === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoriesConfig.map((cat) => {
            const catClients = customers.filter(c => c.status === cat.status);
            
            return (
              <div
                key={cat.status}
                onClick={() => setSelectedCategory(cat.status)}
                className={cn(
                  "rounded-2xl p-6 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-lg flex flex-col justify-between space-y-5 group relative overflow-hidden",
                  cat.borderAccent,
                  cat.bgAccent
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-slate-100">
                        {cat.icon}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {cat.title}
                        </h3>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          {cat.urgencyText}
                        </span>
                      </div>
                    </div>

                    <div className={cn("px-3 py-1.5 rounded-full text-sm font-black shadow-xs", cat.badgeBg)}>
                      {catClients.length}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                {/* Avatar Preview Row */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="flex items-center -space-x-2">
                    {catClients.slice(0, 4).map((c) => (
                      <img
                        key={c.id}
                        src={c.avatar}
                        alt={c.name}
                        title={c.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-2xs"
                      />
                    ))}
                    {catClients.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                        +{catClients.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    <span>View {catClients.length} Clients</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODE 2: CATEGORY DETAIL EXPANDED VIEW (When coach clicked a category card) --- */}
      {selectedCategory !== null && (
        <div className="space-y-4">
          {/* Quick jump category pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categoriesConfig.map((cat) => {
              const count = customers.filter(c => c.status === cat.status).length;
              const isActive = selectedCategory === cat.status;

              return (
                <button
                  key={cat.status}
                  onClick={() => setSelectedCategory(cat.status)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg border font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards for the selected category */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCustomers.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                No clients match this search criteria in {activeCategoryConfig?.title}
              </div>
            ) : (
              filteredCustomers.map((cust) => {
                const isRohan = cust.id === 'cust-1';

                return (
                  <div
                    key={cust.id}
                    className={cn(
                      "bg-white rounded-2xl p-5 border shadow-2xs hover:shadow-md transition-all space-y-4 relative group",
                      isRohan ? "border-amber-400 ring-2 ring-amber-300/30" : "border-slate-200/90 hover:border-slate-300"
                    )}
                  >
                    {isRohan && (
                      <div className="absolute -top-2.5 right-4 bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        Demo Persona ⚡
                      </div>
                    )}

                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div 
                        onClick={() => openCustomer360(cust.id)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                            {cust.name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Day {cust.programDay} of {cust.programTotalDays} · {cust.streakDays}d streak
                          </p>
                        </div>
                      </div>

                      {/* Engagement Score */}
                      <div className={cn(
                        "px-2.5 py-1 rounded-xl border text-right shrink-0",
                        cust.engagementScore >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
                        cust.engagementScore >= 50 ? "bg-amber-50 border-amber-200 text-amber-800" :
                        "bg-rose-50 border-rose-200 text-rose-800"
                      )}>
                        <div className="text-xs font-black flex items-center justify-end gap-1">
                          <span>{cust.engagementScore}%</span>
                          {cust.engagementTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                          {cust.engagementTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
                          {cust.engagementTrend === 'neutral' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                        </div>
                        <span className="text-[9px] block text-slate-500 uppercase tracking-tighter">Engagement</span>
                      </div>
                    </div>

                    {/* Journey & Goal */}
                    <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl font-medium flex items-center justify-between">
                      <span className="truncate">{cust.programName}</span>
                      <span className="text-slate-400 shrink-0 text-[11px]">{cust.primaryGoal}</span>
                    </div>

                    {/* Signals & Reasons */}
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Retention Signals
                      </span>
                      {cust.statusReasons.map((reason, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                          <span className={cn(
                            idx === 0 && (cust.status === 'declining' || cust.status === 'high-risk') ? "text-rose-700 font-semibold" : ""
                          )}>
                            {reason}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar & Weight */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span>Progress ({cust.progressPercent}%)</span>
                        <span className="font-semibold text-slate-800">{cust.currentWeightKg} kg <span className="text-[10px] text-slate-400">({cust.startWeightKg}kg start)</span></span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${cust.progressPercent}%`,
                            backgroundColor: 'var(--brand-primary)' 
                          }}
                        />
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="pt-2 border-t border-slate-100 space-y-2">
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => {
                            setActiveModalCustomer(cust);
                            setModalActionType('message');
                          }}
                          className="px-2 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-800 flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveModalCustomer(cust);
                            setModalActionType('challenge');
                          }}
                          className="px-2 py-2 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-xs font-semibold text-slate-700 hover:text-amber-800 flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span>Challenge</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveModalCustomer(cust);
                            setModalActionType('review');
                          }}
                          className="px-2 py-2 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-800 flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>Review</span>
                        </button>
                      </div>

                      <button
                        onClick={() => openCustomer360(cust.id)}
                        className="w-full text-center text-xs text-slate-500 hover:text-slate-900 font-semibold py-1 block transition-colors cursor-pointer"
                      >
                        View Full 360° Profile →
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* --- MODE 3: FULL HORIZONTAL KANBAN BOARD VIEW (When viewMode is 'board' and selectedCategory is null) --- */}
      {selectedCategory === null && viewMode === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-6 items-start">
          {categoriesConfig.map((col) => {
            const laneCustomers = filteredCustomers.filter(c => c.status === col.status);

            return (
              <div
                key={col.status}
                className="w-[310px] shrink-0 bg-slate-100/80 rounded-2xl p-3.5 border border-slate-200/90 flex flex-col"
              >
                {/* Column Header */}
                <div className="p-2.5 rounded-xl border bg-white mb-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{col.icon}</span>
                      <span>{col.title}</span>
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {laneCustomers.length}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{col.desc}</p>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[660px] pr-1">
                  {laneCustomers.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50">
                      No clients in this state
                    </div>
                  ) : (
                    laneCustomers.map((cust) => (
                      <div
                        key={cust.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <h5 
                            onClick={() => openCustomer360(cust.id)}
                            className="text-xs font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                          >
                            {cust.name}
                          </h5>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {cust.engagementScore}%
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{cust.programName}</p>
                        <div className="text-[10px] text-slate-600 line-clamp-2">
                          • {cust.statusReasons[0]}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setActiveModalCustomer(cust);
                              setModalActionType('message');
                            }}
                            className="text-[10px] font-semibold text-emerald-700 hover:underline"
                          >
                            Message
                          </button>
                          <button
                            onClick={() => openCustomer360(cust.id)}
                            className="text-[10px] text-slate-400 hover:text-slate-700"
                          >
                            360° Profile →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Quick Actions */}
      {activeModalCustomer && (
        <QuickActionModal
          customer={activeModalCustomer}
          initialAction={modalActionType}
          onClose={() => setActiveModalCustomer(null)}
        />
      )}
    </div>
  );
};
