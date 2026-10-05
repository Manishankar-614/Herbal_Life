'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingDown, 
  Flame, 
  Sparkles, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Camera, 
  Activity, 
  Trophy,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { cn } from '../../lib/utils';

export const CustomerProgressScreen: React.FC = () => {
  const { selectedCustomer, setCustomerTab } = useApp();
  const [activeMetricTab, setActiveMetricTab] = useState<'weight' | 'habits' | 'photos'>('weight');

  const cust = selectedCustomer; // Rohan Deshpande

  const habitData = [
    { day: 'Mon', compliance: 100 },
    { day: 'Tue', compliance: 100 },
    { day: 'Wed', compliance: 80 },
    { day: 'Thu', compliance: 100 },
    { day: 'Fri', compliance: 60 },
    { day: 'Sat', compliance: 80 },
    { day: 'Sun', compliance: 100 },
  ];

  return (
    <div className="p-4 space-y-4 pb-12 font-sans">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCustomerTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold text-slate-800">Body & Habit Analytics</span>
        <div className="w-14" />
      </div>

      {/* Top Banner */}
      <div 
        className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--brand-primary) 0%, #0F172A 100%)`
        }}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full">
              Day 34 Milestone
            </span>
            <div className="text-2xl font-black mt-1">-5.6 kg Fat Loss</div>
            <p className="text-xs text-slate-200">88.0 kg Start → 82.4 kg Today</p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold text-amber-300">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
          <div>
            <div className="text-[10px] text-slate-300">Target</div>
            <div className="font-bold text-white">79.0 kg</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-300">Waist</div>
            <div className="font-bold text-white">-3.5 in</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-300">Streak</div>
            <div className="font-bold text-orange-300">12 Days 🔥</div>
          </div>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/80 rounded-2xl shadow-2xs">
        <button
          onClick={() => setActiveMetricTab('weight')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center",
            activeMetricTab === 'weight' ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Weight Graph
        </button>
        <button
          onClick={() => setActiveMetricTab('habits')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center",
            activeMetricTab === 'habits' ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Daily Habits
        </button>
        <button
          onClick={() => setActiveMetricTab('photos')}
          className={cn(
            "flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center",
            activeMetricTab === 'photos' ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          Photos (DEXA)
        </button>
      </div>

      {/* Tab 1: Weight Chart */}
      {activeMetricTab === 'weight' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weight Progression</h3>
              <p className="text-[11px] text-slate-500">Steady weekly downward fat loss corridor</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              On Track (-0.8kg/wk)
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cust.weightHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  formatter={(val: any) => [`${val} kg`, 'Weight']}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="var(--brand-primary)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--brand-primary)', strokeWidth: 2, stroke: '#fff' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 2: Daily Habit Consistency */}
      {activeMetricTab === 'habits' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weekly Habit Compliance</h3>
            <span className="text-[11px] font-bold text-emerald-600">88% Avg Adherence</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-2 text-center">
            {habitData.map((h, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-24 bg-slate-100 rounded-xl overflow-hidden flex flex-col justify-end p-1">
                  <div 
                    className="w-full bg-emerald-500 rounded-lg transition-all"
                    style={{ height: `${h.compliance}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">{h.day}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Progress Photos Mock */}
      {activeMetricTab === 'photos' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Visual Transformation</h3>
              <p className="text-[11px] text-slate-500">Day 1 vs. Day 30 Comparison</p>
            </div>
            <button className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="space-y-1.5">
              <div className="h-44 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80" 
                  alt="Day 1" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Day 1 (88.0 kg)
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="h-44 bg-slate-100 rounded-2xl overflow-hidden border-2 border-emerald-500 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80" 
                  alt="Day 30" 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Day 30 (83.2 kg)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Body Measurements Snapshot */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Tape Measurements</h3>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400">Chest</span>
            <div className="text-sm font-bold text-slate-800 mt-0.5">41 in</div>
            <span className="text-[9px] text-emerald-600 font-bold">-1.2 in</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400">Waist</span>
            <div className="text-sm font-bold text-slate-800 mt-0.5">34.5 in</div>
            <span className="text-[9px] text-emerald-600 font-bold">-3.5 in</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400">Biceps</span>
            <div className="text-sm font-bold text-slate-800 mt-0.5">14.8 in</div>
            <span className="text-[9px] text-emerald-600 font-bold">+0.4 in</span>
          </div>
        </div>
      </div>
    </div>
  );
};
