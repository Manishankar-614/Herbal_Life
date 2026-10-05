'use client';

import React from 'react';
import { 
  X, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert,
  Users,
  Award,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface JourneyTemplateExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JourneyTemplateExplainerModal: React.FC<JourneyTemplateExplainerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Understanding Journey Templates</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Core CoachOS Engine
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                The standardized curriculum blueprint that turns chaotic 1:1 coaching into scalable revenue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Quick TL;DR Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1.5">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>🎯 What is a Journey Template in 1 Sentence?</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              A <strong>Journey Template</strong> is a pre-built 30/60/90-day transformation curriculum (like <em>&ldquo;60-Day Weight Transformation&rdquo;</em> or <em>&ldquo;30-Day Gut Reset&rdquo;</em>). It packages daily habit missions, supplement stacks, and milestone reviews so coaches don&apos;t have to manually build diets and workouts from scratch for every single client.
            </p>
          </div>

          {/* The Old Problem vs CoachOS Journey Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>The Old Way (Coach Burnout)</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-rose-900/80 list-disc list-inside">
                <li>Typing out separate PDF diet sheets on WhatsApp</li>
                <li>Answering the same hydration & breakfast questions 50 times</li>
                <li>Clients drop off after 10 days because there is no structure</li>
                <li>Coach capped at 15 clients before exhausting all free time</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>The CoachOS Journey Way</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-emerald-900/80 list-disc list-inside">
                <li>1-Click assign standard 60-day roadmap to client phone</li>
                <li>Client gets daily gamified checklist (hydration, steps, meals)</li>
                <li>Automatic 15-day check-in and offline meetup milestone reminders</li>
                <li>A single coach can easily manage 100+ clients with high retention</li>
              </ul>
            </div>
          </div>

          {/* 4 Pillars of Every Journey Template */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">
              The 4 Core Elements Inside Each Journey Template
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</div>
                  <span className="font-bold text-slate-900 text-xs">Daily Habit Missions</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Every morning, the client&apos;s app receives actionable missions (e.g. 1L morning lemon water, 30g protein breakfast, 8,000 steps). Tapping &ldquo;complete&rdquo; awards XP and preserves daily streak.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
                  <span className="font-bold text-slate-900 text-xs">15-Day Milestone Syncs</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Structured checkpoint milestones every 15 days (Day 15 In-Person Check-in, Day 30 Body Fat Audit) where the coach verifies honest progress and reinforces client loyalty.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">3</div>
                  <span className="font-bold text-slate-900 text-xs">Recommended Supplement Stack</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Directly embeds the coach&apos;s products and consultations (e.g., Plant Protein, Gut Probiotics) into the curriculum so clients purchase directly from the coach&apos;s shop.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">4</div>
                  <span className="font-bold text-slate-900 text-xs">Adaptive Retention Radar</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  If a client misses 3 days of missions, CoachOS flags them as &ldquo;Declining&rdquo; or &ldquo;High Risk&rdquo; on the coach&apos;s Retention Radar before they drop out.
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Opportunity for Coaches */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Coach Direct Commerce Connection</span>
              </div>
              <p className="text-[11px] text-slate-300 max-w-md">
                Every Journey Template seamlessly feeds clients into your Store to book 1:1 deep-dive calls and purchase your custom herbal blends.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition-colors shrink-0"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
