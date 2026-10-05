'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PROGRAM_TEMPLATES } from '../../data/programs';
import { ProgramTemplate, StoreItem } from '../../types';
import { 
  ShoppingBag, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  Tag, 
  Users, 
  Star,
  ChevronRight,
  Filter,
  TrendingUp,
  HelpCircle,
  Video,
  ShieldCheck,
  Eye,
  IndianRupee
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import { AddCoachProductModal } from './AddCoachProductModal';
import { JourneyTemplateExplainerModal } from './JourneyTemplateExplainerModal';

export const ProgramsCommerceScreen: React.FC = () => {
  const { storeItems, showNotification, coach, setCurrentRole, setCustomerTab } = useApp();
  const [activeMainTab, setActiveMainTab] = useState<'programs' | 'store'>('programs');
  const [selectedProgram, setSelectedProgram] = useState<ProgramTemplate | null>(PROGRAM_TEMPLATES[0]);
  const [storeCategoryFilter, setStoreCategoryFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  const filteredStoreItems = storeCategoryFilter === 'all'
    ? storeItems
    : storeItems.filter(item => item.category.toLowerCase() === storeCategoryFilter.toLowerCase());

  const coachDirectCount = storeItems.filter(item => item.isCoachDirect).length;
  const totalSalesCount = storeItems.reduce((acc, curr) => acc + (curr.soldCount || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Programs & Digital Commerce</h2>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Direct Coach Revenue
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish transformation journeys, client supplements, consultations, and VIP memberships
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <button
            onClick={() => setActiveMainTab('programs')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all",
              activeMainTab === 'programs'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Journey Templates ({PROGRAM_TEMPLATES.length})</span>
          </button>
          <button
            onClick={() => setActiveMainTab('store')}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all",
              activeMainTab === 'store'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Client Store Catalog ({storeItems.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Journey Templates */}
      {activeMainTab === 'programs' && (
        <div className="space-y-4">
          {/* Educational Explainer Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-emerald-900/40 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-white">What are Journey Templates?</h3>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-900/60 px-2 py-0.2 rounded-full border border-emerald-700/50">
                    Saves 10+ hrs/week
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 max-w-2xl leading-relaxed">
                  Pre-packaged 30/60/90-day transformation curriculums with daily habit checklists, 15-day check-in milestones, and supplement stacks. Instead of creating diets and workouts from scratch for every client, assign a template in 1 click and let CoachOS automate daily compliance.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExplainerOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>How It Works (Deep Dive)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Program Templates List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Curriculum Template
                </span>
                <button
                  onClick={() => showNotification('Custom Journey Builder will open in next release.', 'info')}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Template</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
                {PROGRAM_TEMPLATES.map((prog) => {
                  const isSelected = selectedProgram?.id === prog.id;

                  return (
                    <div
                      key={prog.id}
                      onClick={() => setSelectedProgram(prog)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer space-y-2 group relative",
                        isSelected
                          ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                          : "bg-white border-slate-200/80 hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {prog.title}
                            </h4>
                            {prog.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                                {prog.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">{prog.category}</span>
                        </div>
                        <span className="text-xs font-black text-slate-900">{formatINR(prog.price)}</span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {prog.totalDays} Days ({prog.durationWeeks} Weeks)
                        </span>
                        <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                          <Users className="w-3 h-3" />
                          {prog.activeEnrollments} Active · {prog.completionRate}% Done
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Selected Program Deep-Dive Inspector */}
            {selectedProgram && (
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                        {selectedProgram.category}
                      </span>
                      <span className="text-xs text-slate-500">{selectedProgram.totalDays} Days Curriculum</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedProgram.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedProgram.summary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-black text-slate-900">{formatINR(selectedProgram.price)}</div>
                    <span className="text-[11px] text-emerald-600 font-bold">{selectedProgram.completionRate}% Completion Rate</span>
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Transformation Objectives</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedProgram.goals.map((g, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                        🎯 {g}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Missions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Assigned Daily Missions</h4>
                  <div className="space-y-1.5">
                    {selectedProgram.dailyActivities.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50/70 p-2 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones & Recommended Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Curriculum Milestones
                    </span>
                    <div className="space-y-1 text-xs text-slate-600">
                      {selectedProgram.milestones.map((m, i) => (
                        <div key={i}>• {m}</div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Recommended Client Supplements (In Store)
                    </span>
                    <div className="space-y-1 text-xs text-slate-600">
                      {selectedProgram.recommendedProducts.map((p, i) => (
                        <div key={i}>💊 {p}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                  <button
                    onClick={() => showNotification(`Copied shareable program link for ${selectedProgram.title}!`, 'success')}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    Copy Client Invite Link
                  </button>
                  <button
                    onClick={() => showNotification(`Assigned ${selectedProgram.title} to selected roster!`, 'success')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Assign to Clients
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Client Store Catalog & Direct Coach Revenue */}
      {activeMainTab === 'store' && (
        <div className="space-y-5">
          {/* Revenue Pitch & KPI Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-4 rounded-3xl text-white border border-slate-800 shadow-sm">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Coach Revenue</span>
                <span className="text-lg font-black text-white">{formatINR(coach.stats.monthRevenue)}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Your Direct Products</span>
                <span className="text-lg font-black text-white">{coachDirectCount} Active</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1:1 Consultation Rate</span>
                <span className="text-lg font-black text-emerald-400">100% Coach Margin</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Items Sold</span>
                <span className="text-lg font-black text-white">{totalSalesCount} Orders</span>
              </div>
            </div>
          </div>

          {/* Store Filters & Action Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {['all', 'Consultations', 'Products', 'Packages', 'Programs', 'Memberships'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setStoreCategoryFilter(cat)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-lg border transition-all capitalize",
                    storeCategoryFilter.toLowerCase() === cat.toLowerCase()
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentRole('customer');
                  setCustomerTab('shop');
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Client Shop</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product / Consultation</span>
              </button>
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStoreItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "bg-white rounded-2xl border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group",
                  item.isCoachDirect ? "border-emerald-200 ring-1 ring-emerald-500/10" : "border-slate-200/80"
                )}
              >
                <div>
                  {/* Image */}
                  <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-md">
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {item.isCoachDirect && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-emerald-950/85 backdrop-blur-md text-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Direct Coach Item</span>
                        </span>
                        <span className="text-white">₹{item.coachMargin || item.price} Profit</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                        {item.soldCount !== undefined && (
                          <span className="text-slate-400 font-normal ml-1">({item.soldCount} sold)</span>
                        )}
                      </div>
                      {item.duration && (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          ⏱ {item.duration}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer with Price and Specified CTA Type */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900">{formatINR(item.price)}</span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through ml-1.5">
                        {formatINR(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentRole('customer');
                      setCustomerTab('shop');
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-white text-[11px] font-bold shadow-2xs transition-colors shrink-0",
                      item.category === 'Consultations'
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-slate-900 hover:bg-slate-800"
                    )}
                  >
                    {item.ctaType}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Product / Consultation Modal */}
      <AddCoachProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Journey Template Explainer Modal */}
      <JourneyTemplateExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  );
};
