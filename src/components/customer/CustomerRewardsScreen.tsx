'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Gift, 
  ChevronRight, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const CustomerRewardsScreen: React.FC = () => {
  const { customerStreak, customerXp, setCustomerTab } = useApp();

  const badges = [
    { id: 'b-1', title: '10-Day Streak', icon: '🔥', desc: 'Maintained 10 consecutive daily mission check-ins', earned: true, date: 'Unlocked 2 days ago' },
    { id: 'b-2', title: 'Hydration Hero', icon: '💧', desc: '14 days of 3L+ hydration logging', earned: true, date: 'Unlocked Week 2' },
    { id: 'b-3', title: 'Early Bird', icon: '🌅', desc: 'Logged breakfast before 9:00 AM for 7 days', earned: true, date: 'Unlocked Week 1' },
    { id: 'b-4', title: 'Referral Catalyst', icon: '🎁', desc: 'Invited a friend who completed their intake quiz', earned: true, date: 'Unlocked Week 3' },
    { id: 'b-5', title: 'Plateau Smasher', icon: '⚡', desc: 'Break past week 4 body composition plateau', earned: false, progress: 'Day 34/45' },
    { id: 'b-6', title: 'Journey Finisher', icon: '🏆', desc: 'Complete 60-Day Weight Transformation Journey', earned: false, progress: '34/60 Days' },
  ];

  const challenges = [
    {
      id: 'c-1',
      title: '3-Day Hydration & Breakfast Reset',
      desc: '1L morning lemon water + 30g protein breakfast check-in',
      reward: '+150 XP · Streak Shield',
      daysLeft: '2 days left',
      completed: 1,
      total: 3,
    },
    {
      id: 'c-2',
      title: 'Weekend 10,000 Steps Raid',
      desc: 'Hit 10,000 steps on Saturday & Sunday to boost fat burn',
      reward: '+200 XP · Active Badge',
      daysLeft: 'Starts Saturday',
      completed: 0,
      total: 2,
    },
  ];

  return (
    <div className="p-4 space-y-4 pb-12 font-sans">
      {/* Top Banner: XP & Streak Counter */}
      <div 
        className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, #1E293B 100%)`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/15 px-2.5 py-0.5 rounded-full">
              Level 4 Transformation Pioneer
            </span>
            <div className="text-2xl font-black mt-1">{customerXp.toLocaleString()} XP</div>
            <p className="text-[11px] text-slate-200">580 XP until Consistency Level 5</p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-orange-400 fill-orange-400 animate-pulse" />
            <span className="text-xs font-black mt-0.5">{customerStreak} Days</span>
          </div>
        </div>

        {/* Progress Bar to next level */}
        <div className="mt-4 pt-1">
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-300 rounded-full w-[71%]" />
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Active Sprint Challenges</span>
          </h3>
          <span className="text-[10px] text-emerald-600 font-bold">2 Enrolled</span>
        </div>

        <div className="space-y-2.5">
          {challenges.map((ch) => (
            <div key={ch.id} className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{ch.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ch.desc}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">{ch.daysLeft}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  {ch.reward}
                </span>
                <span className="text-[11px] font-bold text-slate-700">
                  {ch.completed} / {ch.total} Days Done
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Badges Grid */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Achievements & Badges</span>
          </h3>
          <span className="text-[10px] text-slate-500 font-medium">4 Unlocked</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={cn(
                "p-3 rounded-2xl border transition-all text-center space-y-1.5",
                badge.earned
                  ? "bg-slate-50/80 border-slate-200"
                  : "bg-slate-100/40 border-dashed border-slate-300 opacity-60"
              )}
            >
              <div className="text-2xl">{badge.icon}</div>
              <div className="text-xs font-bold text-slate-900 leading-tight">{badge.title}</div>
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{badge.desc}</p>
              {badge.earned ? (
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  ✓ {badge.date}
                </span>
              ) : (
                <span className="text-[9px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full inline-block">
                  🔒 {badge.progress}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Referral Rewards Teaser */}
      <div 
        onClick={() => setCustomerTab('referral')}
        className="p-4 rounded-3xl border border-amber-300 bg-amber-50/70 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Your Referral Rewards</div>
            <div className="text-[10px] text-amber-900">1 ₹250 Discount Voucher ready to use at checkout</div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-amber-700" />
      </div>
    </div>
  );
};
