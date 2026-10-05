'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { StatusBadge } from '../common/StatusBadge';
import { QuickActionModal } from '../common/QuickActionModal';
import { Customer } from '../../types';
import { 
  Users, 
  UserPlus, 
  Gift, 
  AlertTriangle, 
  RotateCcw, 
  IndianRupee, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Zap, 
  ChevronRight,
  Rocket
} from 'lucide-react';
import { formatINR } from '../../lib/utils';
import { OfflineMeetupModal } from './OfflineMeetupModal';

export const CoachHomeScreen: React.FC = () => {
  const { 
    coach, 
    customers, 
    leads, 
    setCoachScreen, 
    openCustomer360,
    sendActionToCustomer 
  } = useApp();

  const [activeModalCustomer, setActiveModalCustomer] = useState<Customer | null>(null);
  const [modalActionType, setModalActionType] = useState<'message' | 'challenge' | 'review'>('message');
  const [isMeetupModalOpen, setIsMeetupModalOpen] = useState(false);

  // Specific customers for "Needs Your Attention"
  const rohan = customers.find(c => c.name.includes('Rohan Deshpande')) || customers[0];
  const sneha = customers.find(c => c.name.includes('Sneha Kulkarni')) || customers[1];
  const ananya = customers.find(c => c.name.includes('Ananya Iyer')) || customers[3];
  const vikramLead = leads.find(l => l.name.includes('Vikram Rao')) || leads[0];

  const attentionItems = [
    {
      id: 'att-1',
      customer: rohan,
      type: 'declining',
      title: 'Rohan Deshpande',
      subtitle: 'Weight Transformation · Day 34 of 60',
      badge: 'Engagement 42% (Declining)',
      badgeType: 'declining' as const,
      reason: 'No app activity for 5 days · 2 missed missions · Renewal in 9 days',
      actionLabel: 'Intervene Now',
      actionType: 'message' as const,
      isLead: false,
    },
    {
      id: 'att-2',
      customer: sneha,
      type: 'renewal',
      title: 'Sneha Kulkarni',
      subtitle: 'Metabolic Reset · Day 57 of 60',
      badge: 'Ends in 3 Days (Renewal Due)',
      badgeType: 'renewal' as const,
      reason: 'Hit 95% target body goals · High satisfaction score · Ready for Maintenance',
      actionLabel: 'Send VIP Renewal (20% Off)',
      actionType: 'review' as const,
      isLead: false,
    },
    {
      id: 'att-3',
      lead: vikramLead,
      type: 'referral',
      title: 'Vikram Rao',
      subtitle: 'New Referral Lead · Post-Festival Fat Loss',
      badge: 'Referred by Suresh Patil',
      badgeType: 'healthy' as const,
      reason: 'Completed intake assessment today · High purchase intent (₹8,999)',
      actionLabel: 'Convert Lead on WhatsApp',
      actionType: 'message' as const,
      isLead: true,
    },
    {
      id: 'att-4',
      customer: ananya,
      type: 'next-journey',
      title: 'Ananya Iyer',
      subtitle: 'Gut Health & Nutrition · Day 58 of 60',
      badge: 'Product Renewal & Next Journey',
      badgeType: 'next-journey' as const,
      reason: 'Gut issues fully resolved · Probiotics refill due · Wants Strength Journey',
      actionLabel: 'Offer Strength Journey',
      actionType: 'message' as const,
      isLead: false,
    },
    {
      id: 'att-5',
      type: 'challenge',
      title: 'New leads from Challenges',
      subtitle: '21-Day Hydration Challenge · 143 Participants',
      badge: 'High Conversion Potential',
      badgeType: 'healthy' as const,
      reason: '4 challenge participants hit Day 10 streak without an active paid journey · Ready for 60-day upsell',
      actionLabel: 'Offer Paid Program to Top 20',
      actionType: 'challenge' as const,
      isLead: true,
      targetScreen: 'growth-hub' as const,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner & Value Metric */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coach Command Center · Assistant Active</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {coach.name} 👋
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Your retention engine identified <span className="text-amber-300 font-semibold">4 priority interventions</span> today. Intervening before day 35 rescues an estimated <span className="text-emerald-400 font-semibold">₹42,000</span> in renewals this week.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsMeetupModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer"
              title="Review 15-day InBody scans and client habit honesty"
            >
              <Calendar className="w-4 h-4 text-indigo-200" />
              <span>15-Day Meetup Check</span>
            </button>
            <button
              onClick={() => setCoachScreen('growth-hub')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-slate-950" />
              <span>Growth Hub</span>
            </button>
            <button
              onClick={() => setCoachScreen('retention-radar')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Retention Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key KPI Cards Specified in Prompt */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
            Real-Time Business Pulse
          </h2>
          <span className="text-xs text-slate-500">Live synchronization</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5 w-full min-w-0">
          <StatCard
            title="Active Customers"
            value="86"
            change="+8 this mo"
            trend="up"
            icon={Users}
            subtext="8 running journeys"
            onClick={() => setCoachScreen('customers')}
          />
          <StatCard
            title="New Leads"
            value="12"
            change="5 from Instagram"
            trend="up"
            icon={UserPlus}
            subtext="Avg response 18m"
            onClick={() => setCoachScreen('leads-referrals')}
          />
          <StatCard
            title="Referral Leads"
            value="7"
            change="61% conversion"
            trend="up"
            icon={Gift}
            subtext="Suresh top referrer"
            accentColor="#10B981"
            onClick={() => setCoachScreen('leads-referrals')}
          />
          <StatCard
            title="Customers At Risk"
            value="9"
            change="Urgent attention"
            trend="down"
            icon={AlertTriangle}
            subtext="Engagement < 50%"
            accentColor="#EF4444"
            onClick={() => setCoachScreen('retention-radar')}
          />
          <StatCard
            title="Renewals Due"
            value="6"
            change="Next 7 days"
            trend="neutral"
            icon={RotateCcw}
            subtext="₹54,000 potential"
            accentColor="#3B82F6"
            onClick={() => setCoachScreen('customers')}
          />
          <StatCard
            title="This Month Revenue"
            value={formatINR(184000)}
            change="+22.4% vs Aug"
            trend="up"
            icon={IndianRupee}
            subtext="Programs + Store"
            accentColor="#0D9488"
            onClick={() => setCoachScreen('business')}
          />
        </div>
      </div>

      {/* "Needs Your Attention" Section (Core AI Business Assistant) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-bold text-slate-900">Needs Your Attention Right Now</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              High-leverage tasks prioritized by revenue impact and churn risk
            </p>
          </div>
          <button
            onClick={() => setCoachScreen('retention-radar')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View all 9 flagged clients</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {attentionItems.map((item) => (
            <div
              key={item.id}
              className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
            >
              <div className="flex items-start gap-3.5">
                {/* Avatar */}
                <button 
                  type="button"
                  onClick={() => {
                    if (!item.isLead && item.customer) {
                      openCustomer360(item.customer.id);
                    }
                  }}
                  className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 cursor-pointer group-hover:border-emerald-500 active:scale-95 transition-all text-left p-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.customer ? item.customer.avatar : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        if ((item as any).targetScreen) {
                          setCoachScreen((item as any).targetScreen);
                        } else if (!item.isLead && item.customer) {
                          openCustomer360(item.customer.id);
                        } else {
                          setCoachScreen('leads-referrals');
                        }
                      }}
                      className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors text-left"
                    >
                      {item.title}
                    </button>
                    <StatusBadge status={item.badgeType} size="sm" />
                  </div>
                  <div className="text-xs text-slate-500">{item.subtitle}</div>
                  <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5 pt-0.5">
                    <span className="text-rose-500 font-bold">●</span>
                    <span>{item.reason}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                {!item.isLead && item.customer && (
                  <button
                    onClick={() => openCustomer360(item.customer.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    View 360°
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if ((item as any).targetScreen) {
                      setCoachScreen((item as any).targetScreen);
                    } else if (item.isLead) {
                      setCoachScreen('leads-referrals');
                    } else if (item.customer) {
                      setActiveModalCustomer(item.customer);
                      setModalActionType(item.actionType);
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>{item.actionLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Retention Impact & Top Advocates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Retention Engine Spotlight */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Retention Economics Summary</h3>
              <p className="text-xs text-slate-500">Why customer lifetime value outperforms new customer acquisition</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              91.2% Retention Rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">CAC vs. Retention</span>
              <div className="text-lg font-bold text-slate-900 mt-1">4.2x Cheaper</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Retaining existing clients vs Instagram ad spend</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Monthly Revenue Saved</span>
              <div className="text-lg font-bold text-emerald-600 mt-1">₹80,991</div>
              <p className="text-[11px] text-slate-500 mt-0.5">By resolving 9 at-risk alerts this cycle</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Next Journey Pipeline</span>
              <div className="text-lg font-bold text-purple-600 mt-1">14 Clients</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Finishing Day 50+ ready to transition</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                🎯
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900">Rohan Deshpande is at the critical Day 34 milestone.</span>
                <p className="text-slate-600">Clients who re-engage before Day 35 have an 84% completion rate.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveModalCustomer(rohan);
                setModalActionType('message');
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shrink-0"
            >
              Re-engage Rohan
            </button>
          </div>
        </div>

        {/* Right: Top Referrers */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900">Top Referral Advocates</h3>
              <Gift className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">Clients bringing you new paying members</p>

            <div className="mt-4 space-y-3">
              {[
                { name: 'Suresh Patil', referrals: '5 referred · 3 converted', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', reward: 'VIP Advocate' },
                { name: 'Neha Bhat', referrals: '4 referred · 3 converted', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', reward: 'Free Consult' },
                { name: 'Sneha Kulkarni', referrals: '3 referred · 2 converted', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', reward: '₹1,000 Voucher' },
              ].map((advocate, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={advocate.avatar} alt={advocate.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{advocate.name}</div>
                      <div className="text-[10px] text-slate-500">{advocate.referrals}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {advocate.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCoachScreen('leads-referrals')}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors text-center"
          >
            Open Referral Pipeline & Rewards
          </button>
        </div>
      </div>

      {/* Modal for Quick Actions */}
      {activeModalCustomer && (
        <QuickActionModal
          customer={activeModalCustomer}
          initialAction={modalActionType}
          onClose={() => setActiveModalCustomer(null)}
        />
      )}

      {/* 15-Day Offline Meetup Modal */}
      <OfflineMeetupModal
        isOpen={isMeetupModalOpen}
        onClose={() => setIsMeetupModalOpen(false)}
      />
    </div>
  );
};
