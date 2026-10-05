'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  Sparkles, 
  Droplet, 
  Utensils, 
  Footprints, 
  Dumbbell, 
  MessageSquare, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Gift, 
  Trophy, 
  Calendar,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CustomerHomeScreen: React.FC = () => {
  const { 
    coach, 
    missions, 
    toggleMission, 
    customerStreak, 
    customerXp, 
    setCustomerTab,
    showNotification
  } = useApp();

  const completedCount = missions.filter(m => m.completed).length;
  const missionProgress = Math.round((completedCount / missions.length) * 100);

  const getMissionIcon = (title: string) => {
    if (title.toLowerCase().includes('hydrat')) return <Droplet className="w-4 h-4 text-sky-500" />;
    if (title.toLowerCase().includes('breakfast') || title.toLowerCase().includes('meal')) return <Utensils className="w-4 h-4 text-amber-500" />;
    if (title.toLowerCase().includes('step')) return <Footprints className="w-4 h-4 text-emerald-500" />;
    if (title.toLowerCase().includes('activity') || title.toLowerCase().includes('resist')) return <Dumbbell className="w-4 h-4 text-purple-500" />;
    return <MessageSquare className="w-4 h-4 text-rose-500" />;
  };

  return (
    <div className="p-4 space-y-4 pb-8 font-sans">
      {/* Top Header: Branded Coach Crest & Streak */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-10 h-10 rounded-full overflow-hidden border-2 shadow-xs shrink-0"
            style={{ borderColor: 'var(--brand-primary)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-slate-500">{coach.businessName}</div>
            <h1 className="text-base font-extrabold text-slate-900 leading-tight">
              Good Morning, Rohan 👋
            </h1>
          </div>
        </div>

        {/* Streak Flame Pill */}
        <button 
          type="button"
          onClick={() => setCustomerTab('rewards')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 shadow-2xs cursor-pointer active:scale-95 transition-transform"
        >
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
          <span className="text-xs font-black">{customerStreak} Days</span>
        </button>
      </div>

      {/* Main Journey Card */}
      <button 
        type="button"
        onClick={() => setCustomerTab('journey')}
        className="w-full text-left rounded-3xl p-5 text-white shadow-xl relative overflow-hidden cursor-pointer group active:scale-[0.99] transition-all"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, #0F172A 100%)`
        }}
      >
        {/* Glow */}
        <div className="absolute right-0 top-0 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
              Active Transformation Journey
            </span>
            <h2 className="text-lg font-black mt-1.5">Weight Transformation</h2>
            <p className="text-xs text-slate-200 mt-0.5">Day 34 of 60 · Fat Loss & Stamina</p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-black">62%</span>
            <span className="text-[8px] uppercase tracking-tighter opacity-80">Done</span>
          </div>
        </div>

        {/* Horizontal Progress Meter */}
        <div className="mt-4 pt-2 relative z-10">
          <div className="flex items-center justify-between text-[11px] text-slate-200 mb-1.5 font-medium">
            <span>Progress: 88.0 kg → 82.4 kg</span>
            <span className="font-bold text-emerald-300">Goal: 79.0 kg</span>
          </div>
          <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: '62%' }}
            />
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-200">
          <span className="text-[11px]">Next Milestone: 5 Days away</span>
          <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View Game Path <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </button>

      {/* Today's Mission Checklist (Interactive Core Habit Loop) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Today&apos;s Missions</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {completedCount} of {missions.length} completed today
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            +{missions.filter(m => m.completed).reduce((acc, m) => acc + m.points, 0)} XP Earned
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {missions.map((mission) => (
            <div
              key={mission.id}
              onClick={() => toggleMission(mission.id)}
              className={cn(
                "p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none group active:scale-[0.98]",
                mission.completed
                  ? "bg-emerald-50/50 border-emerald-200"
                  : "bg-slate-50 border-slate-200/80 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0",
                    mission.completed
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "border-2 border-slate-300 group-hover:border-slate-400 bg-white"
                  )}
                >
                  {mission.completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="flex items-center gap-2">
                  {getMissionIcon(mission.title)}
                  <span className={cn(
                    "text-xs font-semibold transition-all",
                    mission.completed ? "line-through text-slate-400" : "text-slate-800"
                  )}>
                    {mission.title}
                  </span>
                </div>
              </div>

              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                mission.completed ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
              )}>
                +{mission.points} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1. EARLY MORNING NOTIFICATION & WHOLE DAY SCHEDULE DISPATCH (07:00 AM) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌅</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-slate-900">07:00 AM · Today&apos;s Full Schedule</h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">Alert 1 of 3</span>
              </div>
              <p className="text-[10px] text-slate-500">Coach Kavya&apos;s morning focus & plan</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Active Day 34
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          {[
            { id: 'sc-1', time: '07:30 AM', title: '1L Warm Water + Himalayan Pink Salt (Hydration)', done: true },
            { id: 'sc-2', time: '09:00 AM', title: '35g Protein Breakfast (4 eggs + spinach toast)', done: true },
            { id: 'sc-3', time: '02:00 PM', title: 'Post-Lunch 15-min Brisk Walk (1,800 steps)', done: true },
            { id: 'sc-4', time: '07:30 PM', title: '20-min Resistance Circuit (Squats & Pushups)', done: false },
          ].map((item) => (
            <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center text-[10px]",
                  item.done ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                )}>
                  {item.done ? '✓' : ''}
                </span>
                <span className={cn(
                  "text-[11px] font-medium",
                  item.done ? "line-through text-slate-400" : "text-slate-800"
                )}>
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 15-DAY IN-PERSON PROGRESS CHECK-IN (BI-WEEKLY HONESTY & INBODY AUDIT) */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-5 text-white shadow-lg border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-400/30 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-indigo-300" />
                15-Day Physical Progress Check-in
              </span>
            </div>
            <h3 className="text-sm font-black text-white mt-2">
              Bi-Weekly Offline Review & Scan
            </h3>
            <p className="text-xs text-indigo-200/90 mt-0.5 leading-snug">
              Indiranagar Studio · Sat, 10:30 AM (Slot #2)
            </p>
          </div>

          <div className="text-center px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shrink-0">
            <span className="text-base font-black text-amber-300 block leading-tight">5</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold">Days Left</span>
          </div>
        </div>

        {/* Audit Details */}
        <div className="mt-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 relative z-10">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Target Protocol:</span>
            <span className="font-semibold text-emerald-300">InBody 270 + Tape Audit</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Coach Kavya will physically review your body fat %, visceral fat index, and calibrate your Phase 2 diet based on genuine logged progress.
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>RSVP Confirmed & Machine Reserved</span>
          </div>
          <button
            onClick={() => showNotification("RSVP Confirmed for Saturday 10:30 AM at Indiranagar Studio! Coach Kavya notified.", "success")}
            className="text-[10px] text-amber-300 hover:underline font-bold"
          >
            Prep Guide →
          </button>
        </div>
      </div>

      {/* 3. END-OF-DAY MILESTONE WRAP-UP (09:00 PM ALERT & INTERACTIVE CHECKBOXES) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌙</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-white">09:00 PM · Milestone Wrap-Up</h3>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Alert 3 of 3</span>
              </div>
              <p className="text-[10px] text-slate-400">Hope you completed all today&apos;s milestones!</p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
            Streak Keeper 🔥
          </span>
        </div>

        {/* Milestone Checkboxes */}
        <div className="space-y-2 pt-1 text-xs">
          <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-500 cursor-pointer" />
            <span className="text-[11px] text-slate-200">Completed all meals within 1,850 kcal target</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-500 cursor-pointer" />
            <span className="text-[11px] text-slate-200">Reached daily step target (8,420 / 8,000 steps)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-500 cursor-pointer" />
            <span className="text-[11px] text-slate-200">Hit hydration goal (3.5L water logged)</span>
          </label>

          <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 cursor-pointer hover:bg-slate-800 transition-colors">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-emerald-500 cursor-pointer" />
            <span className="text-[11px] text-slate-200">Avoided late-night processed sugary snacks</span>
          </label>
        </div>

        <button
          onClick={() => showNotification("🎉 Awesome job Rohan! Day 34 milestones logged. 12-day streak locked in and +100 XP awarded!", "success")}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
        >
          <span>Confirm Day 34 Milestones (+100 XP)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gentle Notification Policy (Max 3-4 alerts/day guarantee) */}
      <div className="bg-slate-900 text-white rounded-3xl p-4 border border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Non-Annoyance Retention Guard</div>
              <div className="text-[10px] text-slate-400">Strictly max 3 to 4 notifications per day</div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            Active Guard
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[9px] text-slate-400 font-mono block">07:00 AM</span>
            <span className="text-[10px] font-bold text-slate-200 mt-0.5 block leading-tight">Daily Schedule</span>
            <span className="text-[9px] text-emerald-400">Delivered ✓</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[9px] text-slate-400 font-mono block">03:00 PM</span>
            <span className="text-[10px] font-bold text-slate-200 mt-0.5 block leading-tight">Meetup Count</span>
            <span className="text-[9px] text-indigo-400">5d countdown</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <span className="text-[9px] text-slate-400 font-mono block">09:00 PM</span>
            <span className="text-[10px] font-bold text-slate-200 mt-0.5 block leading-tight">Milestone Wrap</span>
            <span className="text-[9px] text-amber-400">Ready to Log</span>
          </div>
        </div>
      </div>

      {/* Coach Store & 1:1 Consultation Teaser */}
      <div 
        onClick={() => setCustomerTab('shop')}
        className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-4 border border-emerald-900/50 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-500/50 transition-all active:scale-[0.99]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">Coach Store & 1:1 Calls</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Direct
              </span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5">
              Book private review calls, detox infusions & supplements (+150 XP)
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0" />
      </div>

      {/* Message from Coach Kavya */}
      <div 
        onClick={() => setCustomerTab('coach')}
        className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3 cursor-pointer hover:border-emerald-300 transition-all active:scale-[0.99]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coach.avatar} alt={coach.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">{coach.name} (Coach)</span>
            <span className="text-[10px] text-slate-400">7d ago</span>
          </div>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            &ldquo;Totally understand about work travel Rohan. Even on travel, remember the 3-glass water rule and protein breakfast!&rdquo;
          </p>
          <span className="text-[11px] font-bold text-emerald-600 mt-1.5 inline-block">
            Reply to Coach Kavya →
          </span>
        </div>
      </div>

      {/* Refer a Friend Mini Teaser */}
      <div 
        onClick={() => setCustomerTab('referral')}
        className="rounded-3xl p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold flex items-center justify-between shadow-md cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center text-slate-950">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black">Refer a Friend, Earn ₹250 Voucher</div>
            <div className="text-[10px] text-slate-900/80 font-medium">1 friend joined · 1 voucher unlocked!</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-950" />
      </div>
    </div>
  );
};
