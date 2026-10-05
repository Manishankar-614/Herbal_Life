'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Share2, 
  Copy, 
  Download, 
  Check, 
  RefreshCw, 
  Camera, 
  MessageCircle, 
  X, 
  QrCode, 
  Zap,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ClientWinData {
  id: string;
  name: string;
  avatar: string;
  milestone: string;
  quote: string;
  program: string;
  days: number;
  weightChange: string;
}

interface SocialPostCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWin?: ClientWinData | null;
}

const PRESET_WINS: ClientWinData[] = [
  {
    id: 'rohan',
    name: 'Rohan Deshpande',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    milestone: '-5.2 KG in 22 Days',
    weightChange: '88.0 kg → 82.8 kg',
    days: 22,
    program: 'Weight Transformation Journey',
    quote: 'Energy levels through the roof! Zero 4 PM sugar crashes and 100% adherence to Coach Kavya\'s metabolic diet.',
  },
  {
    id: 'sneha',
    name: 'Sneha Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    milestone: '-4.1 KG & Zero Bloating',
    weightChange: '68.5 kg → 64.4 kg',
    days: 30,
    program: 'Metabolic & Gut Reset',
    quote: 'My severe post-lunch bloating is completely gone. I can finally wear my favorite festive clothes with confidence!',
  },
  {
    id: 'suresh',
    name: 'Suresh Patil',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    milestone: 'Ran First 10K (48 mins) & -3.8 KG',
    weightChange: '79.0 kg → 75.2 kg',
    days: 45,
    program: 'Athletic Conditioning & Endurance',
    quote: 'Never thought I could run 10 kilometers pain-free at age 42. Coach Kavya\'s joint mobility warmup changed everything.',
  },
  {
    id: 'ananya',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    milestone: 'HbA1c Dropped 7.2 → 5.6',
    weightChange: '62.0 kg → 58.2 kg',
    days: 60,
    program: 'PCOS & Hormone Harmony',
    quote: 'My doctor was shocked at my blood reports. No restrictive starvation, just real whole foods and timed movement.',
  }
];

export const SocialPostCreatorModal: React.FC<SocialPostCreatorModalProps> = ({
  isOpen,
  onClose,
  initialWin
}) => {
  const { coach, showNotification, addLead } = useApp();

  // Selected client win
  const [selectedClient, setSelectedClient] = useState<ClientWinData>(initialWin || PRESET_WINS[0]);
  const [customName, setCustomName] = useState('');
  const [customMilestone, setCustomMilestone] = useState('');
  const [customQuote, setCustomQuote] = useState('');

  // Post generation settings
  const [platform, setPlatform] = useState<'instagram' | 'whatsapp' | 'linkedin'>('instagram');
  const [postTone, setPostTone] = useState<'inspiring' | 'educational' | 'story' | 'celebratory'>('inspiring');
  const [aspectRatio, setAspectRatio] = useState<'story' | 'square'>('story');
  const [includeCta, setIncludeCta] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);

  // AI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiHeadline, setAiHeadline] = useState('');
  const [aiCaption, setAiCaption] = useState('');
  const [aiHashtags, setAiHashtags] = useState('');
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Sync initialWin when opened
  useEffect(() => {
    if (initialWin) {
      setSelectedClient(initialWin);
      setCustomName(initialWin.name);
      setCustomMilestone(initialWin.milestone);
      setCustomQuote(initialWin.quote);
    } else {
      setSelectedClient(PRESET_WINS[0]);
      setCustomName(PRESET_WINS[0].name);
      setCustomMilestone(PRESET_WINS[0].milestone);
      setCustomQuote(PRESET_WINS[0].quote);
    }
  }, [initialWin, isOpen]);

  // Generate AI copy function
  const generateAiPost = (overrideClient?: ClientWinData, overrideTone?: string, overridePlatform?: string) => {
    const c = overrideClient || selectedClient;
    const tone = overrideTone || postTone;
    const plat = overridePlatform || platform;
    const clientName = customName || c.name;
    const milestone = customMilestone || c.milestone;
    const quote = customQuote || c.quote;

    setIsGenerating(true);

    setTimeout(() => {
      let headline = '';
      let caption = '';
      let tags = '';

      if (plat === 'instagram') {
        if (tone === 'inspiring') {
          headline = `How ${clientName} Achieved ${milestone} Without Starvation 🥑✨`;
          caption = `Proof that consistency beats extreme restriction every single time. 🌿\n\nWhen ${clientName} joined our ${c.program}, the goal wasn't just to see the scale drop — it was to regain energy, fix digestion, and create a sustainable routine that fits a busy schedule.\n\n✨ 22 Days Later:\n✅ ${milestone}\n✅ 0 extreme cardio or calorie deprivation\n✅ 120g clean protein + 3.5L hydration daily\n✅ "${quote}"\n\n${includeCta ? `🔥 Ready to calibrate your own transformation? Click the link in bio to take our Free 2-Minute Metabolic Health Assessment!` : ''}`;
          tags = `#TransformationStory #${coach.businessName.replace(/\s+/g, '')} #FatLossJourney #MetabolicHealth #HealthyLiving #Coach${coach.name.split(' ')[0]}`;
        } else if (tone === 'educational') {
          headline = `The 3-Step Protocol Behind ${clientName}'s ${milestone} 🔬`;
          caption = `Most people believe losing weight requires skipping dinner and endless cardio. Here is what we ACTUALLY did with ${clientName}:\n\n1️⃣ Caloric Deficit via Protein Pacing (1,850 kcal/day with zero starvation)\n2️⃣ 8,500 Daily NEAT Steps instead of exhausting gym sessions\n3️⃣ Sleep hygiene & cortisol control to eliminate 4 PM sugar spikes\n\nResult? ${milestone} in record time with steady energy.\n\n"${quote}"\n\n${includeCta ? `📩 DM me "RESET" or visit ${coach.subdomain} to get your custom macro corridor.` : ''}`;
          tags = `#NutritionScience #MetabolicReset #HealthCoach #SustainableFatLoss #EvidenceBasedFitness`;
        } else {
          headline = `Celebrating ${clientName}'s Verified Transformation Milestone! 🎉`;
          caption = `Huge shoutout to ${clientName}! 🏆\n\nDedication, showing up every single day for the daily missions, and trusting the process led to ${milestone}.\n\n"${quote}"\n\nProud of you, ${clientName.split(' ')[0]}! Next stop: Phase 2 milestone! 🚀\n\n${includeCta ? `👉 Check your bio score at: ${coach.subdomain}` : ''}`;
          tags = `#ClientWin #ProudCoach #FitnessMotivation #HealthyHabits`;
        }
      } else if (plat === 'whatsapp') {
        headline = `🎉 Client Milestone Alert: ${clientName} (${milestone})`;
        caption = `*Kavya Wellness Client Spotlight* 🌟\n\nCongratulations to *${clientName}* for smashing their milestone: *${milestone}* in our ${c.program}!\n\n💬 _"${quote}"_\n\nKey to their success: Consistent daily habits, balanced home-cooked meals, and bi-weekly InBody progress checks.\n\n${includeCta ? `👉 Curious about your metabolic score? Take our free 2-minute quiz here: https://${coach.subdomain}` : ''}`;
        tags = '';
      } else {
        // LinkedIn
        headline = `Case Study: How ${clientName} Achieved ${milestone} While Working a 50-Hour Tech Job`;
        caption = `Corporate wellness is broken when it prescribes unsustainable 2-hour gym routines to busy professionals.\n\nHere is how we structured ${clientName}'s protocol inside the ${c.program}:\n\n• Habit Stacking: Paired 10k steps with walking team calls.\n• Macro Anchoring: Balanced protein-rich breakfasts to stop afternoon slumps.\n• Biofeedback: Measured visceral fat & recovery every 15 days.\n\nOutcome:\n• ${milestone}\n• Improved cognitive stamina and focus.\n• "${quote}"\n\nSustainable health is a business asset, not an after-work chore.\n\n${includeCta ? `Link in comments to calculate your team or personal metabolic baseline.` : ''}`;
        tags = `#CorporateWellness #LeadershipHealth #MetabolicFitness #ExecutiveCoaching`;
      }

      setAiHeadline(headline);
      setAiCaption(caption);
      setAiHashtags(tags);
      setIsGenerating(false);
      showNotification('AI Post generated tailored for ' + plat.toUpperCase() + '!', 'success');
    }, 600);
  };

  // Run on mount or tab change
  useEffect(() => {
    if (isOpen) {
      generateAiPost();
    }
  }, [isOpen, selectedClient, platform, postTone]);

  if (!isOpen) return null;

  const handleCopyCaption = () => {
    const fullText = aiHashtags ? `${aiCaption}\n\n${aiHashtags}` : aiCaption;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(fullText);
    }
    setCopiedCaption(true);
    showNotification('Caption and hashtags copied to clipboard! 📋', 'success');
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleShareInstagram = () => {
    addLead({
      name: 'Aditi Deshpande',
      phone: '+91 98451 77219',
      goal: `Inbound from Instagram Story (${selectedClient.name} win: ${selectedClient.milestone})`,
      source: 'Instagram',
      value: 12999,
      score: 'hot'
    });
    showNotification(`📸 Posted ${selectedClient.name}'s win to Instagram! Inbound lead captured: Aditi Deshpande (+91 98451 77219)`, 'success');
    onClose();
  };

  const handleShareWhatsApp = () => {
    addLead({
      name: 'Deepak Hegde',
      phone: '+91 98204 33189',
      goal: `Inbound from WhatsApp Status (${selectedClient.name} win: ${selectedClient.milestone})`,
      source: 'WhatsApp',
      value: 9999,
      score: 'hot'
    });
    showNotification(`💬 Shared to WhatsApp Status! Inbound lead captured: Deepak Hegde (+91 98204 33189)`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-5xl w-full shadow-2xl border-0 sm:border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[90vh]">
        
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 text-white flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  Social Post Creator & AI Studio
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  AI Powered
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Turn verified client wins into high-converting Instagram, WhatsApp & LinkedIn posts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Controls & Right Live Preview */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          
          {/* LEFT: Controls & AI Options (Scrollable) */}
          <div className="w-full lg:w-1/2 p-5 overflow-y-auto space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/40">
            
            {/* 1. Client Win Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>1. Select Client Win</span>
                <span className="text-[10px] text-slate-400 lowercase">choose verified transformation</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {PRESET_WINS.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      setSelectedClient(w);
                      setCustomName(w.name);
                      setCustomMilestone(w.milestone);
                      setCustomQuote(w.quote);
                      generateAiPost(w);
                    }}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer",
                      selectedClient.id === w.id 
                        ? "bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500" 
                        : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.avatar} alt={w.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 truncate">{w.name}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold truncate">{w.milestone}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Platform & Format */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Target Platform & Format
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPlatform('instagram')}
                  className={cn(
                    "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer",
                    platform === 'instagram' 
                      ? "bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 text-white border-transparent shadow-sm" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <Camera className="w-4 h-4" />
                  <span>Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform('whatsapp')}
                  className={cn(
                    "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer",
                    platform === 'whatsapp' 
                      ? "bg-emerald-600 text-white border-transparent shadow-sm" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform('linkedin')}
                  className={cn(
                    "p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer",
                    platform === 'linkedin' 
                      ? "bg-blue-700 text-white border-transparent shadow-sm" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <Layers className="w-4 h-4" />
                  <span>LinkedIn / FB</span>
                </button>
              </div>

              {platform === 'instagram' && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-600">Aspect Ratio:</span>
                  <button
                    type="button"
                    onClick={() => setAspectRatio('story')}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
                      aspectRatio === 'story' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    )}
                  >
                    9:16 (Story / Reel)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectRatio('square')}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
                      aspectRatio === 'square' ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200"
                    )}
                  >
                    1:1 (Square Feed)
                  </button>
                </div>
              )}
            </div>

            {/* 3. AI Tone & Narrative Strategy */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>3. AI Narrative Tone</span>
                <span className="text-[10px] text-emerald-700 font-semibold">CoachOS AI v2.4</span>
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'inspiring', label: 'Inspiring & Motivational', desc: 'Focus on mindset, grit & consistency' },
                  { id: 'educational', label: 'Scientific Breakdown', desc: 'Protein, caloric pacing & macros' },
                  { id: 'story', label: 'Client Journey & Struggle', desc: 'From busy schedule to thriving' },
                  { id: 'celebratory', label: 'High-Energy Celebration', desc: 'Direct celebration & milestone shoutout' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setPostTone(t.id as any);
                      generateAiPost(undefined, t.id);
                    }}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                      postTone === t.id 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-2xs" 
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <div className="font-bold text-xs">{t.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Fine-Tune Details & Regenerate */}
            <div className="space-y-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Custom Transformation Details</span>
                <button
                  type="button"
                  onClick={() => generateAiPost()}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  <RefreshCw className={cn("w-3 h-3", isGenerating && "animate-spin")} />
                  <span>{isGenerating ? 'Generating...' : 'Re-Generate with AI'}</span>
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Milestone Headline</label>
                  <input
                    type="text"
                    value={customMilestone}
                    onChange={(e) => setCustomMilestone(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-300 font-semibold text-slate-900"
                    placeholder="e.g. -5.2 KG in 22 Days"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Client Direct Quote</label>
                  <textarea
                    rows={2}
                    value={customQuote}
                    onChange={(e) => setCustomQuote(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-slate-800"
                    placeholder="e.g. Energy levels through the roof..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCta}
                    onChange={(e) => setIncludeCta(e.target.checked)}
                    className="w-3.5 h-3.5 text-emerald-600 rounded"
                  />
                  <span>Include Link-in-Bio Quiz CTA</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Visual Card & Generated Caption (Preview & Actions) */}
          <div className="w-full lg:w-1/2 p-5 overflow-y-auto flex flex-col justify-between space-y-5 bg-slate-900 text-white">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Live Graphic & Copy Preview
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                  Ready to Share
                </span>
              </div>

              {/* Graphic Mockup (Live Rendered) */}
              <div className={cn(
                "w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 shadow-2xl border border-slate-700 relative overflow-hidden flex flex-col justify-between transition-all",
                aspectRatio === 'story' ? "min-h-[340px]" : "min-h-[280px]"
              )}>
                {/* Glow backdrop */}
                <div className="absolute right-0 top-0 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm"
                      style={{ backgroundColor: 'var(--brand-primary)', color: 'white' }}
                    >
                      {coach.businessName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{coach.businessName}</h4>
                      <p className="text-[9px] text-slate-400">{coach.subdomain}</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    VERIFIED WIN 🔥
                  </span>
                </div>

                {/* Center Content */}
                <div className="py-4 text-center space-y-2 relative z-10 my-auto">
                  <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-emerald-400 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selectedClient.avatar} alt={selectedClient.name} className="w-full h-full object-cover" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-200">{customName || selectedClient.name}</h5>
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 tracking-tight">
                    {customMilestone || selectedClient.milestone}
                  </div>
                  <p className="text-[11px] text-slate-300 italic max-w-sm mx-auto leading-relaxed">
                    &ldquo;{customQuote || selectedClient.quote}&rdquo;
                  </p>
                </div>

                {/* Card Footer with QR */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between relative z-10 text-[10px]">
                  <div className="text-left">
                    <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Free Health Score Quiz</span>
                    <span className="font-bold text-white text-xs">{coach.subdomain}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-md shrink-0 shadow-sm">
                      <QrCode className="w-6 h-6 text-slate-900" />
                    </div>
                    <span className="text-[9px] text-slate-300 font-medium">Scan to start</span>
                  </div>
                </div>
              </div>

              {/* Generated Post Caption */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    Generated Post Caption ({platform.toUpperCase()})
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCaption}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {copiedCaption ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-sans text-xs text-slate-200 max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
                  {aiCaption}
                  {aiHashtags && (
                    <div className="mt-2 text-emerald-400 font-medium text-[11px]">{aiHashtags}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-3 border-t border-slate-800 space-y-2 shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleShareInstagram}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Post to Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    handleCopyCaption();
                    showNotification('Copied caption & graphic prepared for download!', 'success');
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Graphic</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showNotification('Saved post to Content Calendar for tomorrow 9:00 AM! 📅', 'success');
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
