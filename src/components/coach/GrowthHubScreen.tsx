'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Rocket, 
  Target, 
  Trophy, 
  Share2, 
  Gift, 
  TrendingUp, 
  Copy, 
  QrCode, 
  Eye, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Flame, 
  ExternalLink, 
  Clock, 
  ChevronRight, 
  Send, 
  Download, 
  Check, 
  BarChart3, 
  Percent, 
  ShieldCheck,
  X,
  ArrowLeft,
  HelpCircle,
  Award,
  Camera,
  MessageCircle
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { GrowthHubDetailsDrawer, GrowthHubItem } from './GrowthHubDetailsDrawer';
import { SocialPostCreatorModal, ClientWinData } from './SocialPostCreatorModal';

export const GrowthHubScreen: React.FC = () => {
  const { coach, showNotification, addLead } = useApp();
  const [activeTab, setActiveTab] = useState<'magnets' | 'challenges' | 'wins' | 'referrals' | 'sources'>('magnets');

  // --- SOCIAL POST CREATOR (AI STUDIO) STATE ---
  const [isSocialPostModalOpen, setIsSocialPostModalOpen] = useState(false);
  const [selectedSocialWin, setSelectedSocialWin] = useState<ClientWinData | null>(null);

  // --- DETAILS DRAWER STATE ---
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<GrowthHubItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // --- TAB 1: LEAD MAGNETS STATE ---
  const [previewMagnet, setPreviewMagnet] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [leadFormName, setLeadFormName] = useState('');
  const [leadFormPhone, setLeadFormPhone] = useState('');
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [showQrModal, setShowQrModal] = useState<string | null>(null);

  // --- TAB 2: CHALLENGES STATE ---
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);
  const [newChallengeName, setNewChallengeName] = useState('');
  const [newChallengeDuration, setNewChallengeDuration] = useState('21');
  const [newChallengeMission, setNewChallengeMission] = useState('');
  const [showOfferTop20Modal, setShowOfferTop20Modal] = useState(false);
  const [offerDiscount, setOfferDiscount] = useState('20%');

  // --- TAB 3: SHAREABLE WINS STATE ---
  const [promptAtMilestones, setPromptAtMilestones] = useState(true);
  const [milestoneRewardAmount, setMilestoneRewardAmount] = useState('250');

  // --- TAB 4: REFERRAL ENGINE STATE ---
  const [tier1Reward, setTier1Reward] = useState('250');
  const [tier2Reward, setTier2Reward] = useState('Free Month (30 Days)');
  const [tier3Reward, setTier3Reward] = useState('VIP Badge & Dinner Pass');
  const [buddyDiscountEnabled, setBuddyDiscountEnabled] = useState(true);
  const [giftWeekEnabled, setGiftWeekEnabled] = useState(true);
  const [milestonePromptsEnabled, setMilestonePromptsEnabled] = useState(true);

  // --- TAB 5: LEAD SOURCES STATE ---
  const [day1Toggle, setDay1Toggle] = useState(true);
  const [day3Toggle, setDay3Toggle] = useState(true);
  const [day7Toggle, setDay7Toggle] = useState(true);
  const [whatsAppLeadModal, setWhatsAppLeadModal] = useState(false);
  const [whatsAppText, setWhatsAppText] = useState(
    'Hi Vikram! This is Coach Kavya from Kavya Wellness. Suresh Patil told me you want to jumpstart your fat loss and energy reset. I reviewed your initial quiz — you have a 68/100 metabolic score. Can I send you your 5-page custom protocol?'
  );

  const funnels = [
    {
      id: 'funnel-1',
      title: 'Free Body Health Score',
      tagline: '2-minute intake quiz evaluating metabolism, gut symptoms & sleep',
      views: 1240,
      leads: 186,
      conversion: 15.0,
      link: 'kavyawellness.coachos.app/score',
      badge: 'Highest Volume'
    },
    {
      id: 'funnel-2',
      title: 'Calorie & Goal Calculator',
      tagline: 'Precision TDEE & macro breakdown tool for fat loss and muscle gain',
      views: 890,
      leads: 142,
      conversion: 16.0,
      link: 'kavyawellness.coachos.app/calculator',
      badge: 'High Intent'
    },
    {
      id: 'funnel-3',
      title: '7-Day Reset Quiz',
      tagline: 'Assessment for festive detox, bloat recovery & daily hydration plan',
      views: 650,
      leads: 117,
      conversion: 18.0,
      link: 'kavyawellness.coachos.app/reset-quiz',
      badge: 'Best Conversion'
    }
  ];

  const sourceChartData = [
    { source: 'Referral', leads: 28, convRate: 64, revenue: 112000 },
    { source: 'Instagram', leads: 34, convRate: 23, revenue: 68000 },
    { source: 'Challenges', leads: 42, convRate: 31, revenue: 76000 },
    { source: 'WhatsApp', leads: 22, convRate: 36, revenue: 54000 },
    { source: 'Partners', leads: 23, convRate: 43, revenue: 62000 },
    { source: 'QR Campaign', leads: 18, convRate: 28, revenue: 42000 },
    { source: 'Website', leads: 16, convRate: 19, revenue: 28000 },
  ];

  const handleCopyLink = (link: string) => {
    navigator.clipboard?.writeText(`https://${link}`);
    showNotification(`Copied link: https://${link}`, 'success');
  };

  const handleUnlockQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormName || !leadFormPhone) return;
    setReportUnlocked(true);
    showNotification(`Lead captured: ${leadFormName} (${leadFormPhone}). Full protocol unlocked!`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <Rocket className="w-3.5 h-3.5" />
              <span>CoachOS Growth Hub · Automated Lead Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Acquire Qualified Fitness Clients on Autopilot
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Launch interactive quizzes, free public challenges, client referral loops, and automated WhatsApp intro sequences.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider block">Total Captured Leads</span>
              <div className="text-2xl font-black text-amber-400">445</div>
              <span className="text-[10px] text-emerald-300">+48 this month</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider block">Lead-to-Paid Rate</span>
              <div className="text-2xl font-black text-emerald-400">34.8%</div>
              <span className="text-[10px] text-slate-200">Zero paid ads</span>
            </div>
          </div>
        </div>
      </div>

      {/* Five Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
        <button
          onClick={() => setActiveTab('magnets')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
            activeTab === 'magnets'
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <Target className="w-4 h-4 text-amber-400" />
          <span>Tab 1: Lead Magnets (3 Funnels)</span>
        </button>

        <button
          onClick={() => setActiveTab('challenges')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
            activeTab === 'challenges'
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <Trophy className="w-4 h-4 text-emerald-500" />
          <span>Tab 2: Public Challenges</span>
        </button>

        <button
          onClick={() => setActiveTab('wins')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
            activeTab === 'wins'
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <Share2 className="w-4 h-4 text-sky-500" />
          <span>Tab 3: Shareable Wins</span>
        </button>

        <button
          onClick={() => setActiveTab('referrals')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
            activeTab === 'referrals'
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <Gift className="w-4 h-4 text-purple-500" />
          <span>Tab 4: Referral Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={cn(
            "px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap",
            activeTab === 'sources'
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          )}
        >
          <BarChart3 className="w-4 h-4 text-rose-500" />
          <span>Tab 5: Lead Sources & Follow-Up</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: LEAD MAGNETS */}
      {/* ========================================================================= */}
      {activeTab === 'magnets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ready-Made Interactive Funnels</h2>
              <p className="text-xs text-slate-500">Proven white-label quizzes designed to capture prospective client details before they talk to you</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              3 Active Funnels Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {funnels.map((funnel) => (
              <div
                key={funnel.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {funnel.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-600">{funnel.conversion}% Conv</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {funnel.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {funnel.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Views</span>
                      <span className="text-xs font-black text-slate-900">{funnel.views.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Leads</span>
                      <span className="text-xs font-black text-emerald-600">{funnel.leads}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Conv %</span>
                      <span className="text-xs font-black text-slate-900">{funnel.conversion}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-500 truncate bg-slate-50 px-2 py-1 rounded border border-slate-100 max-w-[170px]">
                      /{funnel.link.split('/')[1]}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewMagnet(funnel.title);
                        setQuizStep(1);
                        setReportUnlocked(false);
                      }}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-slate-500" />
                      <span>Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedDrawerItem({
                        id: funnel.id,
                        title: funnel.title,
                        category: 'magnet',
                        tagline: funnel.tagline,
                        views: funnel.views,
                        leads: funnel.leads,
                        conversion: funnel.conversion,
                        link: funnel.link,
                        badge: funnel.badge
                      });
                      setIsDrawerOpen(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group-hover:bg-emerald-600"
                  >
                    <span>View Details & Funnel Analytics</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PUBLIC CHALLENGES */}
      {/* ========================================================================= */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Viral Public Challenges</h2>
              <p className="text-xs text-slate-500">Run free community challenges to build massive email/WhatsApp lists and upsell top participants to paid journeys</p>
            </div>
            <button
              onClick={() => setIsCreatingChallenge(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Challenge</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Challenge 1: Live */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-emerald-300 shadow-sm space-y-5 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live Now · Day 12 of 21</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">21-Day Hydration & Vitality Challenge</h3>
                  <p className="text-xs text-slate-500">Daily 3.5L water check-in + electrolytes guidance</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">143</div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Active Participants</span>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Top Participant Leaderboard</span>
                  </span>
                  <button
                    onClick={() => setShowOfferTop20Modal(true)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Offer Paid Program to Top 20</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
                  {[
                    { rank: 1, name: 'Siddharth Rao', score: '12-Day Streak', points: 360, phone: '+91 98200 11223' },
                    { rank: 2, name: 'Pooja Iyer', score: '12-Day Streak', points: 350, phone: '+91 98112 44556' },
                    { rank: 3, name: 'Kavita Menon', score: '11-Day Streak', points: 330, phone: '+91 98450 77665' },
                    { rank: 4, name: 'Tanvi Nair', score: '11-Day Streak', points: 320, phone: '+91 98205 33441' },
                    { rank: 5, name: 'Arvind Swamy', score: '10-Day Streak', points: 300, phone: '+91 98301 99881' },
                  ].map((p) => (
                    <div key={p.rank} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          #{p.rank}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] text-slate-400">{p.phone}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-700">{p.score}</div>
                        <div className="text-[10px] text-slate-400">{p.points} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Challenges list */}
            <div className="space-y-4">
              {/* Upcoming */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    Upcoming · Starts in 4 Days
                  </span>
                  <span className="text-xs font-bold text-slate-600">89 Registered</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">10,000 Daily Steps Challenge</h4>
                <p className="text-xs text-slate-500">14-day movement challenge to beat desk worker stiffness</p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink('kavyawellness.coachos.app/c/steps-10k')}
                    className="flex-1 py-1.5 rounded-lg border text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Join Link</span>
                  </button>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    Completed · Converted 18%
                  </span>
                  <span className="text-xs font-bold text-emerald-600">₹3.42L Revenue</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">Summer Reset 30-Day Sprint</h4>
                <div className="text-xs text-slate-500">
                  <strong>212</strong> participants &rarr; <strong>38 converted</strong> into 60-day paid journeys
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[38%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SHAREABLE WINS */}
      {/* ========================================================================= */}
      {activeTab === 'wins' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Branded Social Share Cards & AI Studio</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Post Generator
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically generate aesthetic WhatsApp status, Instagram stories & LinkedIn case studies with AI
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedSocialWin(null);
                  setIsSocialPostModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>+ Create Post for Social Media (AI)</span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <span className="text-xs text-slate-600 font-semibold hidden sm:inline">Auto-Prompt Clients</span>
                <button
                  type="button"
                  onClick={() => {
                    setPromptAtMilestones(!promptAtMilestones);
                    showNotification(`Milestone prompts ${!promptAtMilestones ? 'enabled' : 'disabled'}`, 'info');
                  }}
                  className={cn(
                    "w-11 h-6 rounded-full transition-colors relative cursor-pointer",
                    promptAtMilestones ? "bg-emerald-600" : "bg-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                    promptAtMilestones ? "left-6" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Share Card Mockup */}
            <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    KW
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">Kavya Wellness</h3>
                    <p className="text-[10px] text-slate-400">Holistic Metabolic Coaching</p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                  Verified Milestone 🎉
                </span>
              </div>

              {/* Main Card Content */}
              <div className="space-y-4 text-center py-4 relative z-10">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-emerald-500 shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Rohan Deshpande"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">Rohan Deshpande</h4>
                  <div className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tight mt-1">
                    -5.2 KG in 22 Days
                  </div>
                  <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                    &ldquo;Energy levels through the roof. Zero sugar cravings and 100% adherence to Coach Kavya&apos;s metabolic protocol!&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom footer with QR & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800 relative z-10">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Start your free quiz</span>
                  <span className="text-xs font-bold text-white">{coach.subdomain}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-white p-1.5 rounded-lg shrink-0">
                    <QrCode className="w-7 h-7 text-slate-900" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSocialWin({
                        id: 'rohan',
                        name: 'Rohan Deshpande',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                        milestone: '-5.2 KG in 22 Days',
                        weightChange: '88.0 kg → 82.8 kg',
                        days: 22,
                        program: 'Weight Transformation Journey',
                        quote: 'Energy levels through the roof. Zero sugar cravings and 100% adherence to Coach Kavya\'s metabolic protocol!'
                      });
                      setIsSocialPostModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create AI Post</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addLead({
                        name: 'Priya Deshmukh',
                        phone: '+91 98450 66782',
                        goal: 'Post-pregnancy weight reset (Saw Rohan Deshpande transformation story)',
                        source: 'Instagram',
                        value: 11999,
                        score: 'hot'
                      });
                      showNotification('🚀 Posted Rohan\'s Transformation to Instagram Story! Inbound lead generated: Priya Deshmukh (+91 98450 66782)!', 'success');
                    }}
                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Post Story</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addLead({
                        name: 'Anand Kulkarni',
                        phone: '+91 98209 44321',
                        goal: 'Metabolic health & 5kg fat loss (Saw Rohan transformation on WhatsApp Status)',
                        source: 'WhatsApp',
                        value: 8999,
                        score: 'hot'
                      });
                      showNotification('🚀 Shared to WhatsApp Status! Inbound lead generated: Anand Kulkarni (+91 98209 44321)!', 'success');
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Share WA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showNotification('Downloaded high-res 1080x1920 Instagram Story share card', 'success')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Share Stats & Settings */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Virality Performance</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Milestone Cards Shared</span>
                    <span className="text-base font-bold text-slate-900">48</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Leads from Client Stories</span>
                    <span className="text-base font-bold text-emerald-600">17</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 flex items-center justify-between border border-emerald-100">
                    <span className="text-xs text-emerald-900 font-bold">Paid Client Conversions</span>
                    <span className="text-base font-black text-emerald-700">6 (35.3%)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Client Incentive Reward</h4>
                <p className="text-[11px] text-slate-500">Reward given to clients when they share their verified win on WhatsApp status or Instagram</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">₹</span>
                  <input
                    type="number"
                    value={milestoneRewardAmount}
                    onChange={(e) => setMilestoneRewardAmount(e.target.value)}
                    className="w-28 text-xs p-2 rounded-lg border border-slate-300 font-bold text-slate-900"
                  />
                  <span className="text-xs text-slate-500">discount credit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Verified Client Transformation Stories Ready to Share */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Verified Wins Ready to Share</h3>
                <p className="text-xs text-slate-500">Pick any client to instantly generate AI captions and social media graphics</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSocialWin(null);
                  setIsSocialPostModalOpen(true);
                }}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Open AI Post Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: 'rohan',
                  name: 'Rohan Deshpande',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                  milestone: '-5.2 KG in 22 Days',
                  weightChange: '88.0 kg → 82.8 kg',
                  days: 22,
                  program: 'Weight Transformation Journey',
                  quote: 'Energy levels through the roof. Zero sugar cravings and 100% adherence to Coach Kavya\'s protocol!',
                  badge: 'Weight Loss'
                },
                {
                  id: 'sneha',
                  name: 'Sneha Kulkarni',
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
                  milestone: '-4.1 KG & Zero Bloating',
                  weightChange: '68.5 kg → 64.4 kg',
                  days: 30,
                  program: 'Metabolic & Gut Reset',
                  quote: 'My post-lunch bloating is completely gone. I can finally wear my favorite clothes with confidence!',
                  badge: 'Gut Health'
                },
                {
                  id: 'suresh',
                  name: 'Suresh Patil',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
                  milestone: '10K Run PB (48 mins)',
                  weightChange: '79.0 kg → 75.2 kg',
                  days: 45,
                  program: 'Athletic Conditioning & Endurance',
                  quote: 'Never thought I could run 10 kilometers pain-free at age 42. Warmups changed everything.',
                  badge: 'Endurance'
                },
                {
                  id: 'ananya',
                  name: 'Ananya Iyer',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
                  milestone: 'HbA1c Dropped 7.2 → 5.6',
                  weightChange: '62.0 kg → 58.2 kg',
                  days: 60,
                  program: 'PCOS & Hormone Harmony',
                  quote: 'My doctor was shocked at my blood reports. No starvation, just real whole foods.',
                  badge: 'Hormone Reset'
                }
              ].map((win) => (
                <div 
                  key={win.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={win.avatar} alt={win.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">{win.name}</div>
                          <div className="text-[10px] text-slate-400">{win.days} days active</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {win.badge}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-xs font-black text-emerald-700">{win.milestone}</div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">{win.weightChange}</div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 italic leading-relaxed">
                      &ldquo;{win.quote}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSocialWin(win as any);
                        setIsSocialPostModalOpen(true);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                      <span>Create Post with AI</span>
                    </button>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          addLead({
                            name: `Lead via ${win.name}'s Story`,
                            phone: '+91 98450 11200',
                            goal: `${win.milestone} (Instagram Story)`,
                            source: 'Instagram',
                            value: 9999,
                            score: 'hot'
                          });
                          showNotification(`📸 Shared ${win.name}'s win to Instagram Story! Inbound lead logged.`, 'success');
                        }}
                        className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Camera className="w-3 h-3 text-pink-600" />
                        <span>Story</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          addLead({
                            name: `Lead via ${win.name}'s WhatsApp`,
                            phone: '+91 98200 99881',
                            goal: `${win.milestone} (WhatsApp Status)`,
                            source: 'WhatsApp',
                            value: 8999,
                            score: 'hot'
                          });
                          showNotification(`💬 Shared ${win.name}'s win to WhatsApp! Inbound lead logged.`, 'success');
                        }}
                        className="py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: REFERRAL ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Advocacy & Reward Tier Builder</h2>
              <p className="text-xs text-slate-500">Configure multi-tier rewards to incentivize your happiest clients to refer friends and colleagues</p>
            </div>
            <button
              onClick={() => showNotification('Saved custom referral reward tiers and automation rules', 'success')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-600 transition-colors cursor-pointer"
            >
              Save Tiers
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3 Editable Tier Cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Tiered Milestone Rewards</h3>

                <div className="space-y-3">
                  {/* Tier 1 */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">1 Successful Referral</div>
                        <div className="text-[10px] text-slate-500">Discount voucher on their next renewal or store order</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700">₹</span>
                      <input
                        type="number"
                        value={tier1Reward}
                        onChange={(e) => setTier1Reward(e.target.value)}
                        className="w-24 text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                      />
                      <span className="text-xs text-slate-500">Off</span>
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                        3
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">3 Successful Referrals</div>
                        <div className="text-[10px] text-slate-500">Significant journey extension or free supplement pack</div>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={tier2Reward}
                      onChange={(e) => setTier2Reward(e.target.value)}
                      className="w-48 text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                    />
                  </div>

                  {/* Tier 3 */}
                  <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                        5
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">5 Successful Referrals</div>
                        <div className="text-[10px] text-amber-800 font-semibold">VIP Ambassador status & annual coaching perk</div>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={tier3Reward}
                      onChange={(e) => setTier3Reward(e.target.value)}
                      className="w-52 text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Growth Automation Rules</h3>

                <div className="divide-y divide-slate-100">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Buddy Plan Enrollment</div>
                      <div className="text-[11px] text-slate-500">Automatically offer 15% discount when friends sign up for the same start date</div>
                    </div>
                    <button
                      onClick={() => setBuddyDiscountEnabled(!buddyDiscountEnabled)}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", buddyDiscountEnabled ? "bg-emerald-600" : "bg-slate-300")}
                    >
                      <div className={cn("w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform", buddyDiscountEnabled ? "left-5" : "left-1")} />
                    </button>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Gift-a-Free-Week Pass</div>
                      <div className="text-[11px] text-slate-500">Clients who hit 14-day streaks unlock a 7-day guest pass link to share with family</div>
                    </div>
                    <button
                      onClick={() => setGiftWeekEnabled(!giftWeekEnabled)}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", giftWeekEnabled ? "bg-emerald-600" : "bg-slate-300")}
                    >
                      <div className={cn("w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform", giftWeekEnabled ? "left-5" : "left-1")} />
                    </button>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Milestone-Triggered WhatsApp Prompt</div>
                      <div className="text-[11px] text-slate-500">Auto-send referral link right when a client logs a 3kg loss or finished Stage 1</div>
                    </div>
                    <button
                      onClick={() => setMilestonePromptsEnabled(!milestonePromptsEnabled)}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", milestonePromptsEnabled ? "bg-emerald-600" : "bg-slate-300")}
                    >
                      <div className={cn("w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform", milestonePromptsEnabled ? "left-5" : "left-1")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Leaderboard */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Advocate Leaderboard</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: 'Suresh Patil', referred: 5, converted: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', badge: 'VIP Ambassador' },
                  { name: 'Meghana Hegde', referred: 3, converted: 2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', badge: 'Free Month Unlocked' },
                  { name: 'Farhan Sheikh', referred: 2, converted: 1, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', badge: '₹500 Voucher' },
                ].map((adv, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        #{idx + 1}
                      </span>
                      <img src={adv.avatar} alt={adv.name} className="w-9 h-9 rounded-full object-cover border" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{adv.name}</div>
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          {adv.referred} referred · {adv.converted} converted
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                      {adv.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: LEAD SOURCES & AUTOMATED FOLLOW-UP */}
      {/* ========================================================================= */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Lead Acquisition Channels & Automated Nurturing</h2>
              <p className="text-xs text-slate-500">Track conversion efficiency per channel and automate 7-day WhatsApp follow-ups</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Referrals: Highest Conversion Rate (64%)
            </span>
          </div>

          {/* Bar Chart & Channel Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Conversion Rate & Revenue by Acquisition Channel</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="source" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip 
                      formatter={(val: any, name: any) => [
                        name === 'convRate' ? `${val}%` : val, 
                        name === 'convRate' ? 'Conversion Rate' : 'Total Leads'
                      ] as any} 
                    />
                    <Bar dataKey="leads" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Leads" />
                    <Bar dataKey="convRate" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversion %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table of Channels */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b">
                    <tr>
                      <th className="py-2.5 px-3">Channel</th>
                      <th className="py-2.5 px-3">Leads</th>
                      <th className="py-2.5 px-3">Conversion %</th>
                      <th className="py-2.5 px-3">Revenue (INR)</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sourceChartData.map((s) => (
                      <tr key={s.source} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{s.source}</td>
                        <td className="py-2.5 px-3">{s.leads}</td>
                        <td className="py-2.5 px-3 font-semibold text-emerald-700">{s.convRate}%</td>
                        <td className="py-2.5 px-3 font-bold">{formatINR(s.revenue)}</td>
                        <td className="py-2.5 px-3">
                          {s.convRate >= 50 ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Top ROI</span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">Active</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Partner Codes & WhatsApp Automation */}
            <div className="space-y-4">
              {/* Partner Codes */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Offline Partner Codes</h3>
                  <button 
                    onClick={() => showNotification('Created partner tracking link for WeWork Fitness Desk', 'success')}
                    className="text-[11px] text-emerald-700 font-bold hover:underline"
                  >
                    + Add Partner
                  </button>
                </div>

                <div className="space-y-2.5">
                  {[
                    { partner: 'Fit Hub Gym', code: 'FITHUB10', leads: 14, converted: 6, rev: 54000 },
                    { partner: 'Dr. Shetty Clinic', code: 'DRSHETTY', leads: 9, converted: 5, rev: 48000 },
                    { partner: 'Corporate Desk', code: 'CORPWELL', leads: 8, converted: 3, rev: 27000 },
                  ].map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{p.partner}</div>
                        <div className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {p.code}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{p.leads} leads</div>
                        <div className="text-[10px] text-emerald-700">{p.converted} converted</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Sequence */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Follow-Up Automation</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">Day 1: Welcome Voice Note</div>
                      <div className="text-[10px] text-slate-500">Auto-sent 2 hours after intake quiz</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={day1Toggle}
                      onChange={(e) => setDay1Toggle(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">Day 3: Case Study Video</div>
                      <div className="text-[10px] text-slate-500">Rohan 5kg transformation proof</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={day3Toggle}
                      onChange={(e) => setDay3Toggle(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">Day 7: Discovery Slot Offer</div>
                      <div className="text-[10px] text-slate-500">15-minute consultation invite</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={day7Toggle}
                      onChange={(e) => setDay7Toggle(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: INTERACTIVE MOBILE QUIZ MOCKUP (4 Questions -> Result -> Form) */}
      {/* ========================================================================= */}
      {previewMagnet && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl border relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setPreviewMagnet(null)}
              className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {/* Phone Header Mockup */}
            <div className="text-center pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {previewMagnet}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                Kavya Wellness Health Assessment
              </h3>
            </div>

            {/* Questions 1-4 */}
            {quizStep <= 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Question {quizStep} of 4</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={cn(
                          "w-5 h-1 rounded-full",
                          step <= quizStep ? "bg-emerald-500" : "bg-slate-200"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {quizStep === 1 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">What is your primary wellness goal?</h4>
                    {['Post-Festival Fat Loss (-6kg to -10kg)', 'Gut Reboot & Bloat Relief', 'Athletic Strength & Toning', 'Hormonal Balance & PCOS'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, 1: opt });
                          setQuizStep(2);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-xs text-slate-800 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">How many days a week do you currently exercise?</h4>
                    {['0 - 1 days (mostly sedentary desk work)', '2 - 3 days (occasional walks or gym)', '4 - 5 days (consistent workouts)', 'Daily active'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, 2: opt });
                          setQuizStep(3);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-xs text-slate-800 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">How is your daily energy & digestion?</h4>
                    {['Afternoon 3 PM crash & regular bloating', 'Average energy, occasional acidity', 'Consistent stamina throughout the day'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, 3: opt });
                          setQuizStep(4);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-xs text-slate-800 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {quizStep === 4 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">What is your target timeline?</h4>
                    {['30 Days Rapid Detox', '60 Days Sustainable Lifestyle Shift', '90 Days Total Body Recomposition'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setQuizAnswers({ ...quizAnswers, 4: opt });
                          setQuizStep(5);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-xs text-slate-800 font-medium transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Instant Result & Blurred Full Report Form */}
            {quizStep === 5 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Your Metabolic Score</span>
                  <div className="text-3xl font-black text-emerald-700">68 / 100</div>
                  <p className="text-xs text-emerald-900 font-semibold">Moderate Metabolic Stress Detected</p>
                  <p className="text-[11px] text-slate-600">Your answers suggest high cortisol and afternoon insulin resistance.</p>
                </div>

                {!reportUnlocked ? (
                  <div className="relative rounded-2xl border p-4 bg-slate-50 space-y-3">
                    {/* Blurred background preview */}
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-2xl z-10 flex flex-col items-center justify-center p-4 text-center">
                      <h5 className="text-xs font-bold text-slate-900">Unlock Your Full 7-Page Protocol</h5>
                      <p className="text-[10px] text-slate-500 mt-1">Enter your details to receive your customized meal & supplement plan via WhatsApp</p>

                      <form onSubmit={handleUnlockQuiz} className="w-full space-y-2 mt-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={leadFormName}
                          onChange={(e) => setLeadFormName(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp Phone Number (+91)"
                          value={leadFormPhone}
                          onChange={(e) => setLeadFormPhone(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white text-slate-900"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                        >
                          Unlock Protocol Report &rarr;
                        </button>
                      </form>
                    </div>

                    <div className="filter blur-xs select-none opacity-40 text-[10px] space-y-2">
                      <p>Dietary Guidelines: High Protein 120g target with non-linear carb cycling...</p>
                      <p>Supplements: Inositol 2g, Magnesium Glycinate 300mg before bed...</p>
                      <p>Mobility Routine: 3x/week Zone 2 aerobic base with 10k daily step floor...</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-emerald-400 space-y-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Protocol Dispatched to WhatsApp!</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Coach Kavya has sent your 7-page nutrition and workout breakdown to <strong>{leadFormPhone}</strong>.
                    </p>
                    <button
                      onClick={() => setPreviewMagnet(null)}
                      className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold mt-2"
                    >
                      Done Previewing
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CREATE CHALLENGE */}
      {/* ========================================================================= */}
      {isCreatingChallenge && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Launch New Public Challenge</h3>
              <button 
                onClick={() => setIsCreatingChallenge(false)} 
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showNotification(`Created challenge: "${newChallengeName}" (${newChallengeDuration} days)`, 'success');
                setIsCreatingChallenge(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Challenge Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 7-Day Sugar Free Sprint"
                  value={newChallengeName}
                  onChange={(e) => setNewChallengeName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Duration (Days)</label>
                <select
                  value={newChallengeDuration}
                  onChange={(e) => setNewChallengeDuration(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-900"
                >
                  <option value="7">7 Days (Quick Sprint)</option>
                  <option value="14">14 Days (Habit Builder)</option>
                  <option value="21">21 Days (Full Reset)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Daily Accountability Mission</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drink 3.5L Water & Log 10,000 Steps"
                  value={newChallengeMission}
                  onChange={(e) => setNewChallengeMission(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Public Join Link</label>
                <input
                  type="text"
                  readOnly
                  value="kavyawellness.coachos.app/c/sugar-free"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingChallenge(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Publish Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: OFFER PAID PROGRAM TO TOP 20 */}
      {/* ========================================================================= */}
      {showOfferTop20Modal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Offer Paid Journey to Top 20</h3>
                <p className="text-xs text-slate-500">21-Day Hydration Challenge active participants</p>
              </div>
              <button 
                onClick={() => setShowOfferTop20Modal(false)} 
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                Send an exclusive invitation WhatsApp message with an automatic discount code to the <strong>top 20 participants</strong> who maintained a 10+ day streak.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Special Conversion Discount</label>
                <select
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-900 font-bold"
                >
                  <option value="20%">20% Off 60-Day Weight Reset</option>
                  <option value="₹1,500">₹1,500 Instant Coupon</option>
                  <option value="Free Starter Kit">Free Whey / Probiotic Starter Bundle</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border text-xs text-slate-600 font-mono">
                "Congratulations on crushing your 10-day streak! Coach Kavya has reserved your VIP slot for the 60-Day Transformation with {offerDiscount} applied."
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                onClick={() => setShowOfferTop20Modal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showNotification(`Dispatched WhatsApp conversion campaign to top 20 challenge participants!`, 'success');
                  setShowOfferTop20Modal(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Top 20</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: QR CODE DOWNLOAD */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-6 space-y-4 shadow-xl border text-center animate-in zoom-in-95 duration-150">
            <h4 className="text-sm font-bold text-slate-900">{showQrModal} QR Code</h4>
            <div className="bg-slate-50 p-6 rounded-2xl border flex items-center justify-center">
              <QrCode className="w-36 h-36 text-slate-900" />
            </div>
            <p className="text-[11px] text-slate-500">Print on flyers, visiting cards, or gym reception counter</p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQrModal(null)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showNotification(`Downloaded printable PDF flyer QR code`, 'success');
                  setShowQrModal(null);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Growth Hub Details Drawer */}
      <GrowthHubDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedDrawerItem}
        onPreview={() => {
          setIsDrawerOpen(false);
          if (selectedDrawerItem) {
            setPreviewMagnet(selectedDrawerItem.title);
            setQuizStep(1);
            setReportUnlocked(false);
          }
        }}
        onShowQr={() => {
          setIsDrawerOpen(false);
          if (selectedDrawerItem) {
            setShowQrModal(selectedDrawerItem.title);
          }
        }}
        onShareWhatsApp={() => {
          if (!selectedDrawerItem) return;
          addLead({
            name: 'Karan Vohra',
            phone: '+91 98305 11982',
            goal: `${selectedDrawerItem.title} · WhatsApp Inbound Lead`,
            source: 'WhatsApp',
            value: 9999,
            score: 'hot'
          });
          showNotification(`🚀 Broadcasted ${selectedDrawerItem.title} on WhatsApp! Inbound lead captured!`, 'success');
        }}
        onShareInstagram={() => {
          if (!selectedDrawerItem) return;
          addLead({
            name: 'Meera Nambiar',
            phone: '+91 98112 33499',
            goal: `${selectedDrawerItem.title} · Instagram Story Lead`,
            source: 'Instagram',
            value: 8999,
            score: 'hot'
          });
          showNotification(`🚀 Shared ${selectedDrawerItem.title} on Instagram Story! Inbound lead captured!`, 'success');
        }}
      />

      {/* Social Post Creator & AI Studio Modal */}
      <SocialPostCreatorModal
        isOpen={isSocialPostModalOpen}
        onClose={() => setIsSocialPostModalOpen(false)}
        initialWin={selectedSocialWin}
      />
    </div>
  );
};
