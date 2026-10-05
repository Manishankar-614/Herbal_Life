'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Trophy, 
  ArrowUpRight, 
  Flame, 
  Compass, 
  Star, 
  Target, 
  ChevronRight,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CustomerJourneyScreen: React.FC = () => {
  const { setCustomerTab, coach } = useApp();

  const journeySteps = [
    {
      id: 'step-1',
      title: 'Starting Point: Metabolic Intake',
      dayLabel: 'Day 1',
      weight: '88.0 kg',
      status: 'completed',
      desc: 'Baseline body measurements, blood work review, and grocery reboot checklist completed.',
      icon: CheckCircle2,
      points: 200,
    },
    {
      id: 'step-2',
      title: '5 KG Milestone Crushed',
      dayLabel: 'Day 21',
      weight: '84.6 kg (-3.4kg net fat)',
      status: 'completed',
      desc: 'Overcame the initial water weight threshold and achieved fat oxidation pacing.',
      icon: Trophy,
      points: 500,
    },
    {
      id: 'step-3',
      title: 'Consistency Level 3 Unlocked',
      dayLabel: 'Day 30',
      weight: '83.2 kg',
      status: 'completed',
      desc: 'Completed 25 consecutive days of morning hydration and 30g protein breakfast check-in.',
      icon: Flame,
      points: 350,
    },
    {
      id: 'step-4',
      title: 'Current Mission: Mid-Point Plateau Buster',
      dayLabel: 'Day 34 (Active Now)',
      weight: '82.4 kg',
      status: 'active',
      desc: 'Calibrating carb cycling for travel and locking in daily 8,000 steps.',
      icon: Target,
      points: 400,
      activePulse: true,
    },
    {
      id: 'step-5',
      title: 'Phase 1 Transformation Completion',
      dayLabel: 'Day 60',
      weight: 'Target: 79.0 kg (-9.0kg total)',
      status: 'upcoming',
      desc: 'Final measurement photoshoot, DEXA comparison, and celebration review with Coach Kavya.',
      icon: Star,
      points: 1000,
    },
    {
      id: 'step-6',
      title: 'Next Journey: Strength & Athletic Conditioning',
      dayLabel: 'Phase 2 (Locked)',
      weight: 'Hypertrophy & Mobility',
      status: 'locked',
      desc: 'Graduate into advanced progressive resistance overload and athletic conditioning protocol.',
      icon: Lock,
      points: 2500,
      isNextJourney: true,
    },
  ];

  return (
    <div className="p-4 space-y-4 pb-10 font-sans">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCustomerTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold text-slate-800">Transformation Journey</span>
        <div className="w-14" />
      </div>

      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div 
          className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        />
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
              Long-Term Life Path
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">Rohan&apos;s Transformation Map</h1>
          <p className="text-xs text-slate-300">
            More than a 30-day challenge. A structured game-style pathway to sustainable athletic vitality.
          </p>
        </div>
      </div>

      {/* Game-Style Vertical Path Container */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs relative">
        {/* Connecting central dotted/pulsing line */}
        <div className="absolute left-[34px] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-emerald-300 z-0" />

        <div className="space-y-6 relative z-10">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isLocked = step.status === 'locked';

            return (
              <div key={step.id} className="flex items-start gap-4 group">
                {/* Step Node Icon */}
                <div 
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-transform shadow-xs",
                    isCompleted && "bg-emerald-600 border-emerald-600 text-white shadow-emerald-200",
                    isActive && "bg-white border-amber-500 text-amber-500 ring-4 ring-amber-400/30 scale-110",
                    !isCompleted && !isActive && !isLocked && "bg-white border-slate-300 text-slate-400",
                    isLocked && "bg-slate-100 border-slate-300 text-slate-400"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                </div>

                {/* Step Content Card */}
                <div 
                  className={cn(
                    "flex-1 p-3.5 rounded-2xl border transition-all",
                    isActive && "bg-amber-50/60 border-amber-300 shadow-xs",
                    isCompleted && "bg-slate-50/80 border-slate-200/80",
                    !isCompleted && !isActive && !isLocked && "bg-white border-slate-200/80",
                    isLocked && "bg-slate-50/40 border-dashed border-slate-300 opacity-80"
                  )}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                      isCompleted && "bg-emerald-100 text-emerald-800",
                      isActive && "bg-amber-500 text-slate-950 font-black",
                      !isCompleted && !isActive && !isLocked && "bg-slate-200 text-slate-600",
                      isLocked && "bg-purple-100 text-purple-800"
                    )}>
                      {step.dayLabel}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">{step.weight}</span>
                  </div>

                  <h3 className={cn(
                    "text-xs font-bold leading-tight mt-1",
                    isActive ? "text-slate-900 font-extrabold" : "text-slate-800"
                  )}>
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>

                  {step.isNextJourney && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-purple-700 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Unlocks upon Day 60 completion
                      </span>
                      <button 
                        onClick={() => setCustomerTab('coach')}
                        className="text-[10px] font-bold text-slate-900 underline hover:text-emerald-600"
                      >
                        Ask Coach Kavya
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
