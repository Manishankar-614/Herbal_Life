'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeadStage, LeadSource, Lead, LeadScore } from '../../types';
import { REFERRAL_STATS } from '../../data/leads';
import { 
  UserPlus, 
  Gift, 
  ArrowRight, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Award, 
  Clock, 
  Plus, 
  Share2, 
  Filter, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Sparkles,
  Search,
  MessageSquare,
  ArrowLeft,
  LayoutGrid,
  Layers,
  Flame,
  Zap,
  Send,
  X,
  Camera,
  MessageCircle
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const LeadsReferralsScreen: React.FC = () => {
  const { leads, moveLeadStage, addLead, showNotification } = useApp();
  const [selectedStage, setSelectedStage] = useState<LeadStage | null>(null);
  const [viewMode, setViewMode] = useState<'stages' | 'board'>('stages');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Social Lead Generation Campaign Modal State
  const [socialPostModal, setSocialPostModal] = useState<null | 'instagram' | 'whatsapp' | 'all'>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<'quiz' | 'challenge' | 'transformation' | 'calculator'>('quiz');

  // WhatsApp modal state for Hot Lead
  const [whatsAppLead, setWhatsAppLead] = useState<Lead | null>(null);
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const stages: { stage: LeadStage; title: string; desc: string; color: string; badgeBg: string; icon: string }[] = [
    { stage: 'new', title: 'New Leads', desc: 'Inquiries & intake quizzes', color: 'border-blue-300 hover:border-blue-500 bg-blue-50/40', badgeBg: 'bg-blue-100 text-blue-800', icon: '📥' },
    { stage: 'contacted', title: 'Contacted', desc: 'WhatsApp audio / discovery call', color: 'border-amber-300 hover:border-amber-500 bg-amber-50/40', badgeBg: 'bg-amber-100 text-amber-800', icon: '📞' },
    { stage: 'assessment', title: 'Assessment', desc: 'Reviewing blood/food diary', color: 'border-purple-300 hover:border-purple-500 bg-purple-50/40', badgeBg: 'bg-purple-100 text-purple-800', icon: '📋' },
    { stage: 'interested', title: 'Interested', desc: 'Reviewing program link & pricing', color: 'border-indigo-300 hover:border-indigo-500 bg-indigo-50/40', badgeBg: 'bg-indigo-100 text-indigo-800', icon: '💡' },
    { stage: 'converted', title: 'Converted 🎉', desc: 'Enrolled in paying Journey', color: 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/40', badgeBg: 'bg-emerald-100 text-emerald-800', icon: '🏆' },
  ];

  const sourceColors: Record<LeadSource, string> = {
    'Instagram': 'bg-pink-50 text-pink-700 border-pink-200',
    'QR Campaign': 'bg-violet-50 text-violet-700 border-violet-200',
    'Referral': 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    'Existing Customer': 'bg-blue-50 text-blue-700 border-blue-200',
    'WhatsApp': 'bg-green-50 text-green-700 border-green-200',
    'Website': 'bg-slate-100 text-slate-700 border-slate-200',
    'Challenges': 'bg-amber-100 text-amber-800 border-amber-300 font-semibold',
    'Partners': 'bg-purple-100 text-purple-800 border-purple-300 font-semibold',
  };

  const scoreBadgeConfig: Record<LeadScore, { label: string; badge: string; icon: string }> = {
    'hot': { label: 'Hot Lead', badge: 'bg-rose-50 text-rose-700 border-rose-200 font-bold', icon: '🔥' },
    'warm': { label: 'Warm Lead', badge: 'bg-amber-50 text-amber-700 border-amber-200 font-semibold', icon: '⚡' },
    'cold': { label: 'Cold Lead', badge: 'bg-slate-100 text-slate-600 border-slate-200', icon: '❄️' },
  };

  const filteredLeads = leads.filter(l => {
    const matchesSource = selectedSourceFilter === 'all' || l.source === selectedSourceFilter;
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.referredBy && l.referredBy.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSource || !matchesSearch) return false;
    if (selectedStage) return l.stage === selectedStage;
    return true;
  });

  const referralLeadsCount = leads.filter(l => l.source === 'Referral' && l.stage !== 'converted').length;
  const newLeadsCount = leads.filter(l => l.stage === 'new').length;

  const socialCampaigns = [
    {
      id: 'quiz' as const,
      platform: 'Instagram' as LeadSource,
      platformName: 'Instagram Story & Reel Link Sticker',
      title: 'Free Body Health Score Quiz',
      tagline: '2-min interactive quiz evaluating metabolism, cortisol & digestion',
      badge: 'Highest Lead Volume',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
      caption: 'Stop guessing your macros! 🥑 Take my 2-min free metabolic health score quiz to find your personal calorie deficit & fat loss blockers. Tap the sticker below! 👇',
      stickerText: 'kavyawellness.coachos.app/score',
      simulatedLead: {
        name: 'Sneha Kulkarni',
        phone: '+91 98204 55123',
        goal: 'PCOS & Fat Loss (Scored 62/100 on Metabolic Quiz)',
        source: 'Instagram' as LeadSource,
        value: 8999,
        score: 'hot' as LeadScore,
      }
    },
    {
      id: 'challenge' as const,
      platform: 'WhatsApp' as LeadSource,
      platformName: 'WhatsApp Community Broadcast',
      title: '21-Day Hydration & Vitality Challenge',
      tagline: 'Community reset with daily missions, hydration tracking & streak leaderboard',
      badge: 'Best Engagement',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      caption: '💧 Starting our free 21-Day Hydration & Energy Reset this Monday! 140+ people registered. Get your daily water goals, electrolytes plan & coach check-ins for free. Claim your link:',
      stickerText: 'kavyawellness.coachos.app/c/hydration',
      simulatedLead: {
        name: 'Amitabh Sen',
        phone: '+91 98331 44521',
        goal: 'Desk worker posture & belly fat (Joined 21-Day Challenge)',
        source: 'WhatsApp' as LeadSource,
        value: 9999,
        score: 'hot' as LeadScore,
      }
    },
    {
      id: 'transformation' as const,
      platform: 'Instagram' as LeadSource,
      platformName: 'Instagram Verified Milestone Post',
      title: 'Rohan Deshpande Transformation (-5.2 KG in 22 Days)',
      tagline: 'Social proof share card with verified milestone badge and QR code',
      badge: 'Highest Purchase Intent',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      caption: '⭐ Proud of Rohan! -5.2 KG in 22 Days with zero starvation or extreme cardio. Sustainable metabolic coaching works. DM "RESET" or tap below for your personalized assessment!',
      stickerText: 'kavyawellness.coachos.app/rohan-win',
      simulatedLead: {
        name: 'Priya Deshmukh',
        phone: '+91 98450 66782',
        goal: 'Post-pregnancy weight reset (Responded to Rohan transformation story)',
        source: 'Instagram' as LeadSource,
        value: 11999,
        score: 'hot' as LeadScore,
      }
    },
    {
      id: 'calculator' as const,
      platform: 'Partners' as LeadSource,
      platformName: 'Partner Clinic & Studio Campaign',
      title: 'Fit Hub Gym & Dr. Shetty Clinic Health Pass',
      tagline: 'QR campaign placed at gym receptions and doctor waiting rooms',
      badge: 'Institutional Referral',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
      caption: '🏥 Partner Clinic Collaboration: Members of Fit Hub Gym and patients of Dr. Shetty Clinic receive an exclusive 1-on-1 metabolic evaluation. Use code FITHUB10 or DRSHETTY.',
      stickerText: 'kavyawellness.coachos.app/partner',
      simulatedLead: {
        name: 'Dr. Rajesh Varma',
        phone: '+91 98111 22345',
        goal: 'Pre-diabetes & metabolic health (Partner Code: DRSHETTY)',
        source: 'Partners' as LeadSource,
        value: 12999,
        score: 'hot' as LeadScore,
      }
    },
  ];

  const handlePublishPost = (campaignId: string) => {
    const campaign = socialCampaigns.find(c => c.id === campaignId) || socialCampaigns[0];
    addLead({
      name: campaign.simulatedLead.name,
      source: campaign.simulatedLead.source,
      goal: campaign.simulatedLead.goal,
      value: campaign.simulatedLead.value,
      score: campaign.simulatedLead.score,
    });
    setSocialPostModal(null);
    setSelectedStage('new');
    showNotification(
      `🚀 Published to ${campaign.platform}! Inbound lead generated: ${campaign.simulatedLead.name} (${campaign.simulatedLead.phone}) just submitted their details!`,
      'success'
    );
  };

  const advanceStage = (leadId: string, current: LeadStage) => {
    const stageOrder: LeadStage[] = ['new', 'contacted', 'assessment', 'interested', 'converted'];
    const currentIndex = stageOrder.indexOf(current);
    if (currentIndex < stageOrder.length - 1) {
      moveLeadStage(leadId, stageOrder[currentIndex + 1]);
    }
  };

  const regressStage = (leadId: string, current: LeadStage) => {
    const stageOrder: LeadStage[] = ['new', 'contacted', 'assessment', 'interested', 'converted'];
    const currentIndex = stageOrder.indexOf(current);
    if (currentIndex > 0) {
      moveLeadStage(leadId, stageOrder[currentIndex - 1]);
    }
  };

  const openWhatsAppModal = (lead: Lead) => {
    setWhatsAppLead(lead);
    setWhatsAppMessage(`Hi ${lead.name.split(' ')[0]}! This is Coach Kavya from Kavya Wellness. ${lead.referredBy ? `${lead.referredBy} told me all about your goals!` : 'Saw your intake quiz submission.'} I have your personalized nutrition & metabolic report ready. Are you free for a 5-min voice note or quick call today?`);
  };

  const handleSendWhatsApp = () => {
    if (!whatsAppLead) return;
    showNotification(`Sent WhatsApp intro message to ${whatsAppLead.name} (${whatsAppLead.phone})`, 'success');
    setWhatsAppLead(null);
  };

  const activeStageConfig = stages.find(s => s.stage === selectedStage);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Referral Engine Dashboard Panel */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5 border border-emerald-200">
              <Gift className="w-3.5 h-3.5" />
              <span>Organic Referral Engine</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Referral Velocity & Word-of-Mouth Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Turn client milestones into high-converting word-of-mouth client signups
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedCampaignId('quiz');
                setSocialPostModal('instagram');
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Post to Instagram</span>
            </button>
            <button
              onClick={() => {
                setSelectedCampaignId('challenge');
                setSocialPostModal('whatsapp');
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Broadcast on WhatsApp</span>
            </button>
            <button
              onClick={() => {
                setSelectedCampaignId('transformation');
                setSocialPostModal('all');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Leads via Post 🚀</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Referrals</span>
            <div className="text-2xl font-bold text-slate-900">{REFERRAL_STATS.totalReferrals} Generated</div>
            <p className="text-[11px] text-emerald-600 font-medium">All generated by clients</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
            <span className="text-[11px] font-medium text-emerald-800 uppercase tracking-wider">Converted Clients</span>
            <div className="text-2xl font-bold text-emerald-700">{REFERRAL_STATS.convertedReferrals} Enrolled</div>
            <p className="text-[11px] text-emerald-800 font-medium">{REFERRAL_STATS.conversionRate} Conversion Rate</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 space-y-1">
            <span className="text-[11px] font-medium text-amber-800 uppercase tracking-wider">Rewards Pending</span>
            <div className="text-2xl font-bold text-amber-700">{REFERRAL_STATS.rewardsPending} Vouchers</div>
            <button 
              onClick={() => showNotification('Sent automated reward coupon codes via WhatsApp to top advocates!', 'success')}
              className="text-[11px] text-amber-900 font-bold hover:underline block"
            >
              Approve Vouchers →
            </button>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 space-y-1">
            <span className="text-[11px] font-medium text-purple-800 uppercase tracking-wider">Referral Revenue</span>
            <div className="text-2xl font-bold text-purple-700">{formatINR(REFERRAL_STATS.totalRevenueFromReferrals)}</div>
            <p className="text-[11px] text-purple-800 font-medium">Zero paid ad CAC</p>
          </div>
        </div>

        {/* Top Referrers Leaderboard Strip */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Top Referrer Leaderboard</span>
            </h4>
            <span className="text-xs text-slate-500">Rewarded automatically upon friend conversion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {REFERRAL_STATS.topReferrers.map((r, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>
                <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{r.name}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{r.referrals} sent · {r.converted} converted</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hot Lead Alert Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 rounded-2xl p-4 md:p-5 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
            🔥
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-100 bg-black/20 px-2 py-0.5 rounded-full mb-1">
              <span>Hot Lead Alert</span>
            </div>
            <p className="text-xs md:text-sm font-bold">
              Vikram Rao, referred by Suresh Patil, wants weight loss, active 4+ days/week. Reply now.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const vikram = leads.find(l => l.name.includes('Vikram Rao')) || leads[0];
            openWhatsAppModal(vikram);
          }}
          className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold shadow-sm hover:bg-amber-50 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Send WhatsApp Intro</span>
        </button>
      </div>

      {/* View Mode Bar & Stage Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedStage ? (
            <button
              onClick={() => setSelectedStage(null)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Pipeline Stages</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('stages')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all cursor-pointer",
                  viewMode === 'stages'
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Stage Overview</span>
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
                <span>Full Kanban</span>
              </button>
            </div>
          )}

          {selectedStage && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="text-slate-400">/</span>
              <span className="font-bold text-slate-800">{activeStageConfig?.title}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border">
                {filteredLeads.length} Leads
              </span>
            </div>
          )}
        </div>

        {/* Search & Source filter */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lead or referrer..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white w-48 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            {['all', 'Referral', 'Instagram', 'WhatsApp', 'Challenges'].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSourceFilter(src)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded-lg border transition-all capitalize cursor-pointer",
                  selectedSourceFilter === src
                    ? "bg-slate-900 text-white border-slate-900 font-bold"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                )}
              >
                {src}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODE 1: CLEAN STAGE CARDS LANDING (Selected Stage is null & viewMode is stages) --- */}
      {selectedStage === null && viewMode === 'stages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stages.map((stg) => {
            const stgLeads = leads.filter(l => l.stage === stg.stage);
            const totalValue = stgLeads.reduce((acc, l) => acc + l.value, 0);

            return (
              <div
                key={stg.stage}
                onClick={() => setSelectedStage(stg.stage)}
                className={cn(
                  "rounded-2xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4 group",
                  stg.color
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-slate-100">
                      {stg.icon}
                    </span>
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-black shadow-xs", stg.badgeBg)}>
                      {stgLeads.length}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {stg.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {stg.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <div className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">
                    Pipeline Value
                  </div>
                  <div className="text-base font-black text-slate-900">
                    {formatINR(totalValue)}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 group-hover:text-emerald-600 transition-colors mt-2">
                    <span>View {stgLeads.length} Leads</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODE 2: STAGE DETAIL EXPANDED VIEW (When coach clicked a stage card) --- */}
      {selectedStage !== null && (
        <div className="space-y-4">
          {/* Quick jump stage pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {stages.map((stg) => {
              const count = leads.filter(l => l.stage === stg.stage).length;
              const isActive = selectedStage === stg.stage;

              return (
                <button
                  key={stg.stage}
                  onClick={() => setSelectedStage(stg.stage)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-lg border font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  <span>{stg.icon}</span>
                  <span>{stg.title}</span>
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

          {/* Cards for the selected stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                No leads match this search criteria in {activeStageConfig?.title}
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const score = lead.score || 'warm';
                const scoreCfg = scoreBadgeConfig[score];

                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all space-y-3.5 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Row: Name, Score Badge, and Value */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-slate-900">
                              {lead.name}
                            </h4>
                            <span className={cn("text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1", scoreCfg.badge)}>
                              <span>{scoreCfg.icon}</span>
                              <span>{scoreCfg.label}</span>
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{lead.phone}</p>
                        </div>

                        <span className="text-sm font-black text-slate-900 shrink-0">
                          {formatINR(lead.value)}
                        </span>
                      </div>

                      {/* Source & Referral */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={cn("text-[10px] px-2 py-0.5 rounded-md border shrink-0", sourceColors[lead.source])}>
                          {lead.source}
                        </span>
                        {lead.referredBy && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 flex items-center gap-1">
                            <Gift className="w-2.5 h-2.5" />
                            <span>Referred by: {lead.referredBy}</span>
                          </span>
                        )}
                      </div>

                      {/* Goal & Activity */}
                      <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                        🎯 {lead.goal}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{lead.lastActivity}</span>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => openWhatsAppModal(lead)}
                        className="p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors"
                        title="Send WhatsApp Message"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      </button>

                      {selectedStage !== 'new' && (
                        <button
                          type="button"
                          onClick={() => regressStage(lead.id, lead.stage)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                      )}

                      {selectedStage !== 'converted' && (
                        <button
                          type="button"
                          onClick={() => advanceStage(lead.id, lead.stage)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* --- MODE 3: FULL KANBAN BOARD VIEW (When viewMode is 'board' and selectedStage is null) --- */}
      {selectedStage === null && viewMode === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-6 items-start">
          {stages.map((col) => {
            const colLeads = filteredLeads.filter(l => l.stage === col.stage);

            return (
              <div
                key={col.stage}
                className="w-[300px] shrink-0 bg-slate-100/80 rounded-2xl p-3.5 border border-slate-200/90 flex flex-col"
              >
                {/* Column Header */}
                <div className="p-2.5 rounded-xl border bg-white mb-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{col.icon}</span>
                      <span>{col.title}</span>
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {colLeads.length}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{col.desc}</p>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[660px] pr-1">
                  {colLeads.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50">
                      No leads in this stage
                    </div>
                  ) : (
                    colLeads.map((lead) => {
                      const score = lead.score || 'warm';
                      const scoreCfg = scoreBadgeConfig[score];

                      return (
                        <div
                          key={lead.id}
                          className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col gap-2.5"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <h5 className="text-xs font-bold text-slate-900">{lead.name}</h5>
                              <p className="text-[10px] text-slate-500">{lead.phone}</p>
                            </div>
                            <span className={cn("text-[9px] px-1.5 py-0.5 rounded border shrink-0", scoreCfg.badge)}>
                              {scoreCfg.icon} {scoreCfg.label}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg leading-tight">
                            🎯 {lead.goal}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-black text-slate-900">{formatINR(lead.value)}</span>
                            <div className="flex items-center gap-1">
                              {col.stage !== 'new' && (
                                <button
                                  onClick={() => regressStage(lead.id, lead.stage)}
                                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                                >
                                  <ChevronLeft className="w-3 h-3" />
                                </button>
                              )}
                              {col.stage !== 'converted' && (
                                <button
                                  onClick={() => advanceStage(lead.id, lead.stage)}
                                  className="p-1 rounded bg-slate-900 hover:bg-emerald-600 text-white"
                                >
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WhatsApp Modal */}
      {whatsAppLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  WA
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Send WhatsApp Intro</h4>
                  <p className="text-xs text-slate-500">{whatsAppLead.name} ({whatsAppLead.phone})</p>
                </div>
              </div>
              <button 
                onClick={() => setWhatsAppLead(null)} 
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Personalized Message</label>
              <textarea
                rows={5}
                value={whatsAppMessage}
                onChange={(e) => setWhatsAppMessage(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 leading-relaxed font-sans"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setWhatsAppLead(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Lead Generation Campaign Publisher Modal */}
      {socialPostModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl border animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-amber-500 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                  🚀
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Publish Social Campaign & Capture Inbound Leads
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Real coaches don't type manual leads — launch high-converting funnels to pull qualified clients automatically
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSocialPostModal(null)} 
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            {/* Campaign Selection Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {socialCampaigns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCampaignId(c.id)}
                  className={cn(
                    "p-2.5 rounded-xl border text-left transition-all text-xs flex flex-col justify-between cursor-pointer",
                    selectedCampaignId === c.id
                      ? "border-emerald-600 bg-emerald-50/70 text-slate-900 shadow-2xs font-bold"
                      : "border-slate-200 hover:bg-slate-50 text-slate-600 font-medium"
                  )}
                >
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">
                    {c.platform}
                  </span>
                  <span className="text-[11px] font-bold line-clamp-1 mt-0.5">{c.title}</span>
                </button>
              ))}
            </div>

            {/* Active Campaign Preview Box */}
            {(() => {
              const activeCampaign = socialCampaigns.find(c => c.id === selectedCampaignId) || socialCampaigns[0];
              return (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 relative overflow-hidden shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {activeCampaign.platform === 'Instagram' ? (
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-xs">
                            <Camera className="w-3.5 h-3.5" />
                          </div>
                        ) : activeCampaign.platform === 'WhatsApp' ? (
                          <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            P
                          </div>
                        )}
                        <span className="text-xs font-bold">{activeCampaign.platformName}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                        {activeCampaign.badge}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        "{activeCampaign.caption}"
                      </p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-mono border border-emerald-500/30">
                        <span>🔗</span>
                        <span>{activeCampaign.stickerText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Inbound Lead Banner */}
                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instant Inbound Lead Ingestion on Publish:</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                        🔥 Hot Lead
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs bg-white p-3 rounded-lg border border-emerald-100">
                      <div>
                        <div className="font-black text-slate-900">{activeCampaign.simulatedLead.name}</div>
                        <div className="text-[11px] text-slate-500">{activeCampaign.simulatedLead.phone}</div>
                        <div className="text-[11px] text-emerald-700 font-medium mt-0.5">🎯 {activeCampaign.simulatedLead.goal}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{formatINR(activeCampaign.simulatedLead.value)}</div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Ready for WhatsApp</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setSocialPostModal(null)}
                      className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePublishPost(activeCampaign.id)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publish & Ingest Inbound Lead 🚀</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
