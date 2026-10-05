'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Search, 
  Filter, 
  Plus, 
  Flame, 
  Target, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  BookOpen,
  Award,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface GlobalTemplate {
  id: string;
  name: string;
  category: 'Weight Loss' | 'Hormonal & Women' | 'Gut & Detox' | 'Strength & Performance' | 'Longevity & Health';
  durationDays: number;
  coachesAdopted: number;
  totalClientsEnrolled: number;
  completionRate: number;
  suggestedPriceINR: number;
  description: string;
  isPopular?: boolean;
  status: 'active' | 'draft';
  phases: { name: string; days: string; focus: string }[];
  dailyMissions: string[];
}

const mockGlobalTemplates: GlobalTemplate[] = [
  {
    id: 'gt-1',
    name: '60-Day Metabolic Reset & Fat Loss',
    category: 'Weight Loss',
    durationDays: 60,
    coachesAdopted: 118,
    totalClientsEnrolled: 3420,
    completionRate: 91,
    suggestedPriceINR: 8999,
    description: 'Gold-standard progressive fat loss protocol with non-linear carb cycling and micro-workout accountability.',
    isPopular: true,
    status: 'active',
    phases: [
      { name: 'Phase 1: Metabolic Cleanse', days: 'Day 1 - 14', focus: 'Eliminate inflammatory foods & establish baseline hydration' },
      { name: 'Phase 2: Progressive Overload', days: 'Day 15 - 45', focus: 'Caloric deficit with 10k daily steps and zone 2 cardio' },
      { name: 'Phase 3: Reverse Dieting', days: 'Day 46 - 60', focus: 'Metabolic adaptation lock-in and maintenance calories' }
    ],
    dailyMissions: ['Log 3.5L Water', 'Record Morning Fasted Weight', '10,000 Steps', 'Upload Dinner Photo for Macro Review']
  },
  {
    id: 'gt-2',
    name: '90-Day PCOS & Hormonal Balance Protocol',
    category: 'Hormonal & Women',
    durationDays: 90,
    coachesAdopted: 84,
    totalClientsEnrolled: 1840,
    completionRate: 88,
    suggestedPriceINR: 14999,
    description: 'Inositol timing, cortisol mitigation, and anti-inflammatory seed cycling for regularizing ovulatory cycles.',
    isPopular: true,
    status: 'active',
    phases: [
      { name: 'Phase 1: Blood Sugar Stabilization', days: 'Day 1 - 30', focus: 'Low GI meals & morning apple cider vinegar routine' },
      { name: 'Phase 2: Stress & Cortisol Reset', days: 'Day 31 - 60', focus: 'Adrenal support, parasympathetic yoga & sleep hygiene' },
      { name: 'Phase 3: Cycle Regularization', days: 'Day 61 - 90', focus: 'Seed cycling and luteal phase strength modification' }
    ],
    dailyMissions: ['Inositol Supplementation Log', '15-min Sun Salutation', '8-Hour Sleep Tracker', 'Caffeine Cutoff at 2 PM']
  },
  {
    id: 'gt-3',
    name: '30-Day Gut Reboot & Bloat Cleanse',
    category: 'Gut & Detox',
    durationDays: 30,
    coachesAdopted: 96,
    totalClientsEnrolled: 2150,
    completionRate: 94,
    suggestedPriceINR: 4999,
    description: 'Rapid symptom-relief protocol targeting IBS, chronic indigestion, and gut microbiome diversity.',
    status: 'active',
    phases: [
      { name: 'Phase 1: Elimination', days: 'Day 1 - 10', focus: 'Remove refined grains, artificial sweeteners and dairy' },
      { name: 'Phase 2: Microbe Inoculation', days: 'Day 11 - 20', focus: 'Prebiotic fiber ramp-up and fermented foods' },
      { name: 'Phase 3: Gentle Reintroduction', days: 'Day 21 - 30', focus: 'Identify trigger foods with symptom logs' }
    ],
    dailyMissions: ['Pre/Probiotic Intake Log', 'Bloat Severity Score (1-5)', 'Post-Meal 1000 Steps', 'Bone Broth or Herbal Tea']
  },
  {
    id: 'gt-4',
    name: '90-Day Athletic Strength & Body Recomp',
    category: 'Strength & Performance',
    durationDays: 90,
    coachesAdopted: 62,
    totalClientsEnrolled: 1210,
    completionRate: 86,
    suggestedPriceINR: 14999,
    description: 'Hypertrophy and compound lift progression with gram-accurate protein targets and mobility drills.',
    status: 'active',
    phases: [
      { name: 'Phase 1: Form & Joint Primer', days: 'Day 1 - 21', focus: 'Mobility screening, squat depth and shoulder stability' },
      { name: 'Phase 2: Progressive Hypertrophy', days: 'Day 22 - 65', focus: 'RPE 8-9 working sets with progressive overload' },
      { name: 'Phase 3: Peak & De-load Test', days: 'Day 66 - 90', focus: '1RM testing and DEXA scan body recomp validation' }
    ],
    dailyMissions: ['Hit 1.8g/kg Protein', 'Log Working Sets & Weight in Gym', 'Post-Workout Stretch', 'Creatine 5g']
  },
  {
    id: 'gt-5',
    name: '60-Day Heart & Hypertension Reversal',
    category: 'Longevity & Health',
    durationDays: 60,
    coachesAdopted: 48,
    totalClientsEnrolled: 890,
    completionRate: 93,
    suggestedPriceINR: 9999,
    description: 'DASH nutrition adaptation with potassium-rich Indian meal plans and doctor-verified blood pressure logs.',
    status: 'active',
    phases: [
      { name: 'Phase 1: Sodium Baseline', days: 'Day 1 - 20', focus: 'Salt substitution and daily systolic/diastolic measurement' },
      { name: 'Phase 2: Nitric Oxide Boost', days: 'Day 21 - 40', focus: 'Beetroot & leafy green integration with light brisk walks' },
      { name: 'Phase 3: Medication Taper Support', days: 'Day 41 - 60', focus: 'Physician coordination report and lifestyle lock-in' }
    ],
    dailyMissions: ['Log Morning & Evening BP', 'Sodium < 1500mg', '30-min Zone 2 Walk', 'Breathing Exercise 10-min']
  },
  {
    id: 'gt-6',
    name: '30-Day Post-Festival Detox & Energy Reset',
    category: 'Gut & Detox',
    durationDays: 30,
    coachesAdopted: 104,
    totalClientsEnrolled: 2780,
    completionRate: 92,
    suggestedPriceINR: 3999,
    description: 'High-velocity seasonal challenge to shed 3-4kg festive water weight and overcome sugar cravings.',
    isPopular: true,
    status: 'active',
    phases: [
      { name: 'Phase 1: Sugar Flush', days: 'Day 1 - 7', focus: 'Zero refined sugar and hydration replenishment' },
      { name: 'Phase 2: Cleanse & Burn', days: 'Day 8 - 21', focus: 'Intermittent fasting 14:10 with morning lemon water' },
      { name: 'Phase 3: Sustained Energy', days: 'Day 22 - 30', focus: 'Clean complex carbs and consistent sleep routine' }
    ],
    dailyMissions: ['Zero Added Sugar Checklist', '4L Hydration', 'Morning Sun Exposure', '12-Hour Fast Completed']
  },
  {
    id: 'gt-7',
    name: '60-Day Senior Joint Mobility & Longevity',
    category: 'Longevity & Health',
    durationDays: 60,
    coachesAdopted: 36,
    totalClientsEnrolled: 640,
    completionRate: 89,
    suggestedPriceINR: 7999,
    description: 'Low-impact resistance band movements, balance drills, and cartilage-protecting nutrition for ages 55+.',
    status: 'active',
    phases: [
      { name: 'Phase 1: Chair Mobility', days: 'Day 1 - 20', focus: 'Hip flexor release and seated ankle-knee range of motion' },
      { name: 'Phase 2: Balance & Bone Density', days: 'Day 21 - 40', focus: 'Single-leg stand drills and light resistance band pulls' },
      { name: 'Phase 3: Functional Independence', days: 'Day 41 - 60', focus: 'Stair climbing ease and outdoor walking endurance' }
    ],
    dailyMissions: ['Joint Mobility Routine', 'Glucosamine / Omega-3 Log', 'Stair Climbing Count', 'Hydration Cup Counter']
  },
  {
    id: 'gt-8',
    name: '45-Day Corporate Stress & Sleep Optimization',
    category: 'Longevity & Health',
    durationDays: 45,
    coachesAdopted: 78,
    totalClientsEnrolled: 1670,
    completionRate: 87,
    suggestedPriceINR: 6999,
    description: 'Designed for desk executives: ergonomic stretch cues, blue-light curfew, and 8 PM dinner cutoff.',
    status: 'active',
    phases: [
      { name: 'Phase 1: Sleep Sanctuary', days: 'Day 1 - 15', focus: 'Dark room, blue-light blockers, and fixed wake-up times' },
      { name: 'Phase 2: Desk De-Stressing', days: 'Day 16 - 30', focus: 'Hourly posture breaks and box breathing meetings' },
      { name: 'Phase 3: Circadian Synchrony', days: 'Day 31 - 45', focus: 'Morning sunlight exposure and caffeine curfews' }
    ],
    dailyMissions: ['No Screens 45m Before Bed', 'Dinner Before 8 PM', '5 Micro-Stretches at Desk', 'Deep Sleep Score Log']
  }
];

export const AdminTemplatesScreen: React.FC = () => {
  const { showNotification } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingTemplate, setInspectingTemplate] = useState<GlobalTemplate | null>(null);

  const categories = ['all', 'Weight Loss', 'Hormonal & Women', 'Gut & Detox', 'Strength & Performance', 'Longevity & Health'];

  const filteredTemplates = mockGlobalTemplates.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBroadcastUpdate = (templateName: string) => {
    showNotification(`Published curriculum update for "${templateName}" to all coaches!`, 'success');
  };

  const handleDuplicateTemplate = (templateName: string) => {
    showNotification(`Cloned "${templateName}" into draft blueprint library`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              Platform Utilities · Global Templates
            </span>
            <span className="text-xs text-slate-400">8 Master Presets Live</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Master Journey Blueprint Library
          </h1>
          <p className="text-xs text-slate-400">
            Pre-built, clinically validated coaching curricula available for white-label coaches to adopt with 1-click branding.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showNotification('Synchronized all 8 master presets across 142 coach tenant databases', 'success')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deploy Update to Network (142 Coaches)</span>
          </button>
        </div>
      </div>

      {/* Network Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Active Presets</div>
          <div className="text-xl font-bold text-white">8 Curricula</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">100% verified protocols</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Coach Adoptions</div>
          <div className="text-xl font-bold text-white">666 Deployments</div>
          <div className="text-[11px] text-slate-400 mt-1">Avg 4.7 presets per coach</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Total Client Completions</div>
          <div className="text-xl font-bold text-white">14,700 Clients</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">Across all white-label instances</div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Avg Completion Rate</div>
          <div className="text-xl font-bold text-emerald-400">90.2%</div>
          <div className="text-[11px] text-slate-400 mt-1">vs 18% industry standard gym apps</div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates or keywords..."
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors cursor-pointer capitalize",
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold border-amber-500"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all space-y-4 relative group"
          >
            {tmpl.isPopular && (
              <span className="absolute top-4 right-4 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-2.5 h-2.5 text-amber-400" />
                <span>Top Performer</span>
              </span>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                  {tmpl.category}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {tmpl.durationDays} Days Duration
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                {tmpl.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {tmpl.description}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-center">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Coaches</span>
                <span className="text-xs font-bold text-white">{tmpl.coachesAdopted} Active</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Clients</span>
                <span className="text-xs font-bold text-white">{tmpl.totalClientsEnrolled}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Completion</span>
                <span className="text-xs font-bold text-emerald-400">{tmpl.completionRate}%</span>
              </div>
            </div>

            {/* Phases pill previews */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
                Phased Architecture
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {tmpl.phases.map((p, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                    {p.name.split(':')[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setInspectingTemplate(tmpl)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect Curriculum Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleDuplicateTemplate(tmpl.name)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  title="Duplicate Blueprint"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleBroadcastUpdate(tmpl.name)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
                >
                  Broadcast Push
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Inspector Drawer / Modal */}
      {inspectingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {inspectingTemplate.category} · {inspectingTemplate.durationDays} Days
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">{inspectingTemplate.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{inspectingTemplate.description}</p>
              </div>
              <button
                onClick={() => setInspectingTemplate(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>

            {/* Phases breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Curriculum Milestone Stages
              </h4>
              <div className="space-y-2.5">
                {inspectingTemplate.phases.map((phase, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{phase.name}</span>
                      <span className="text-amber-400 font-semibold">{phase.days}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{phase.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Missions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Standard Daily Accountability Missions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {inspectingTemplate.dailyMissions.map((mission, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{mission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Adopted by <strong className="text-white">{inspectingTemplate.coachesAdopted}</strong> coaches
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectingTemplate(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleBroadcastUpdate(inspectingTemplate.name);
                    setInspectingTemplate(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Push Update to Network
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
