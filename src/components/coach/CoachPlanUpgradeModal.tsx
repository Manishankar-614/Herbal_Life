'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Users, 
  Building2, 
  Star, 
  TrendingUp, 
  ArrowUpRight,
  Info,
  ChevronRight,
  Calendar,
  Layers,
  Lock
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

interface CoachPlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'review' | 'upgrade';
  onPlanUpgraded?: (newPlan: 'Essential' | 'Growth' | 'Scale', newFee: number) => void;
}

export const CoachPlanUpgradeModal: React.FC<CoachPlanUpgradeModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'upgrade',
  onPlanUpgraded
}) => {
  const { coach, updateCoachProfile, showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'review' | 'upgrade'>(initialMode);
  const [selectedPlanId, setSelectedPlanId] = useState<'Essential' | 'Growth' | 'Scale'>(
    coach.plan === 'Growth' ? 'Scale' : coach.plan === 'Essential' ? 'Growth' : 'Growth'
  );
  const [isConfirmingUpgrade, setIsConfirmingUpgrade] = useState(false);

  if (!isOpen) return null;

  const planTiers = [
    {
      id: 'Essential' as const,
      name: 'Essential Solo',
      price: 5999,
      clientLimit: 35,
      tagline: 'Best for solo beginner coaches starting their digital roster',
      badge: 'Starter',
      popular: false,
      features: [
        'Up to 35 Active Clients',
        'Custom CoachOS Subdomain',
        'Direct 1:1 Consultation Booking',
        'Client Store Catalog (100% Margin)',
        'Basic Retention Radar',
        'Community Forum Support',
      ],
      notIncluded: [
        'AI Social Media Post Studio',
        '15-Day Offline Meetup Protocol',
        'Assistant Coach Sub-accounts',
        'Custom Domain Binding',
      ]
    },
    {
      id: 'Growth' as const,
      name: 'Growth Pro',
      price: 9999,
      clientLimit: 150,
      tagline: 'Ideal for established coaches managing 50–150 active clients',
      badge: 'Most Popular',
      popular: true,
      features: [
        'Up to 150 Active Clients',
        'Custom Branded Subdomain & Themes',
        'AI Social Media Post Creator Studio',
        '15-Day Offline Meetup & Honesty Audit Engine',
        'Strict Non-Annoyance Retention Guard (max 3-4 alerts/day)',
        'Direct Store & Consultation Revenue (100% Margin)',
        'Priority WhatsApp & Concierge Support',
      ],
      notIncluded: [
        'Assistant Coach Sub-accounts',
        'Custom Apex Domain (e.g. yourname.com)',
      ]
    },
    {
      id: 'Scale' as const,
      name: 'Scale Studio',
      price: 14999,
      clientLimit: 'Unlimited',
      tagline: 'For high-earning fitness studios and multi-coach academies',
      badge: 'Uncapped Growth',
      popular: false,
      features: [
        'Unlimited Active Clients',
        'Up to 5 Assistant Trainer / Coach Seats',
        'Custom Apex Domain Binding (e.g. kavyawellness.com)',
        'Full White-label Client App & Email Transports',
        'DEXA & InBody Laboratory API Integration',
        'AI Social Media Studio & Bulk Reels Generator',
        'Dedicated VIP Account Manager & Phone SLA',
      ],
      notIncluded: []
    }
  ];

  const currentTier = planTiers.find(p => p.id === coach.plan) || planTiers[1];
  const targetTier = planTiers.find(p => p.id === selectedPlanId) || planTiers[2];

  const handleConfirmUpgrade = () => {
    updateCoachProfile({
      plan: targetTier.id,
      monthlyFee: targetTier.price,
    });

    if (onPlanUpgraded) {
      onPlanUpgraded(targetTier.id, targetTier.price);
    }

    showNotification(
      `🎉 Congratulations! You have successfully upgraded to the ${targetTier.name} Plan (${formatINR(targetTier.price)}/mo)!`,
      'success'
    );

    setIsConfirmingUpgrade(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200 font-sans overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Subscription & Plan Management</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Current: {coach.plan}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Review your current platform entitlements or upgrade your client capacity
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

        {/* Tab Switcher: Review vs Upgrade */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-2 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <button
            onClick={() => {
              setActiveTab('review');
              setIsConfirmingUpgrade(false);
            }}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
              activeTab === 'review'
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Review Current Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('upgrade')}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
              activeTab === 'upgrade'
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            )}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Compare & Upgrade Tiers</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* TAB 1: REVIEW CURRENT PLAN */}
          {activeTab === 'review' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Active Plan Overview Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Active Subscription
                    </span>
                    <h4 className="text-xl font-black text-white mt-1.5">{currentTier.name} Plan</h4>
                    <p className="text-xs text-slate-300 mt-0.5">{currentTier.tagline}</p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-2xl font-black text-white">{formatINR(coach.monthlyFee || currentTier.price)}</div>
                    <span className="text-[11px] text-slate-400">per month (Auto-renews Oct 28, 2026)</span>
                  </div>
                </div>

                {/* Quota Usage */}
                <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-300 font-medium">Active Roster Capacity:</span>
                    <span className="font-bold text-emerald-300">
                      {coach.stats.activeCustomers} / {currentTier.clientLimit} Clients ({Math.round((coach.stats.activeCustomers / (typeof currentTier.clientLimit === 'number' ? currentTier.clientLimit : 150)) * 100)}% Used)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((coach.stats.activeCustomers / (typeof currentTier.clientLimit === 'number' ? currentTier.clientLimit : 150)) * 100))}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {typeof currentTier.clientLimit === 'number' 
                      ? `${currentTier.clientLimit - coach.stats.activeCustomers} client slots remaining before quota upgrade` 
                      : 'Uncapped client expansion active'}
                  </span>
                </div>
              </div>

              {/* Entitlements Included */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Features & Entitlements in your {currentTier.name} Plan
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentTier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-100 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing & Payment Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Payment Method</span>
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                    <CreditCard className="w-4 h-4 text-slate-600" />
                    <span>HDFC Bank Corporate Debit •••• 8812</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-semibold block">Auto-Debit Enabled ✓</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tax & Registration</span>
                  <div className="font-bold text-slate-900 text-xs">Individual Fitness Practitioner</div>
                  <span className="text-[10px] text-slate-500 block">GST Exempt Sole Proprietor (Under Threshold)</span>
                </div>
              </div>

              {/* Bottom Trigger to Upgrade */}
              {coach.plan !== 'Scale' && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="font-bold text-emerald-950 text-xs">Need to scale past {currentTier.clientLimit} clients?</div>
                    <p className="text-[11px] text-emerald-800">
                      Upgrade to Scale Studio for unlimited active client seats, assistant coaches, and custom domains.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPlanId('Scale');
                      setActiveTab('upgrade');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Upgrade to Scale Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMPARE & UPGRADE TIERS */}
          {activeTab === 'upgrade' && !isConfirmingUpgrade && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Select CoachOS Platform Plan</h4>
                <p className="text-[11px] text-slate-500">Upgrade or switch tiers anytime. Prorated balance is credited automatically.</p>
              </div>

              {/* Tier Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {planTiers.map((tier) => {
                  const isCurrent = coach.plan === tier.id;
                  const isSelected = selectedPlanId === tier.id;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedPlanId(tier.id)}
                      className={cn(
                        "rounded-3xl p-4.5 border-2 transition-all cursor-pointer flex flex-col justify-between relative",
                        isSelected
                          ? "border-emerald-500 bg-emerald-50/40 shadow-md ring-2 ring-emerald-500/20"
                          : isCurrent
                          ? "border-slate-800 bg-slate-50"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      )}
                    >
                      {tier.popular && (
                        <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                          {tier.badge}
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-extrabold text-slate-900 text-sm">{tier.name}</h5>
                          {isCurrent && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white">
                              Current
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-xl font-black text-slate-900">{formatINR(tier.price)}</span>
                          <span className="text-[10px] text-slate-500"> / month</span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-100/80 text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{tier.clientLimit} Active Clients</span>
                        </div>

                        <p className="text-[11px] text-slate-500 leading-tight">
                          {tier.tagline}
                        </p>

                        {/* Feature List */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                          {tier.features.slice(0, 5).map((f, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-slate-700">
                              <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-tight">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Select / Action Button */}
                      <div className="pt-4 mt-3 border-t border-slate-100">
                        {isCurrent ? (
                          <button
                            type="button"
                            disabled
                            className="w-full py-2 rounded-xl bg-slate-200 text-slate-600 font-bold text-xs cursor-default text-center"
                          >
                            Active Plan
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPlanId(tier.id);
                              setIsConfirmingUpgrade(true);
                            }}
                            className={cn(
                              "w-full py-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1",
                              isSelected
                                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                                : "bg-slate-900 hover:bg-slate-800 text-white"
                            )}
                          >
                            <span>Switch to {tier.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upgrade Trigger Bar if different tier selected */}
              {selectedPlanId !== coach.plan && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">
                      Selected: {targetTier.name} ({formatINR(targetTier.price)}/mo)
                    </div>
                    <div className="text-[10px] text-slate-300">
                      Capacity increases to {targetTier.clientLimit} active clients
                    </div>
                  </div>
                  <button
                    onClick={() => setIsConfirmingUpgrade(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Proceed to Review</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CONFIRMATION & PRORATED REVIEW SHEET */}
          {activeTab === 'upgrade' && isConfirmingUpgrade && (
            <div className="space-y-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="text-sm font-black text-slate-900">Review Plan Upgrade Details</h4>
                  <p className="text-[11px] text-slate-500">Confirm your new monthly tier and billing adjustments</p>
                </div>
                <button
                  onClick={() => setIsConfirmingUpgrade(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Choose Different Tier
                </button>
              </div>

              {/* Comparison Summary */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Tier</span>
                  <div className="font-bold text-slate-800">{coach.plan} Plan</div>
                  <div className="text-[11px] text-slate-500">{formatINR(coach.monthlyFee || currentTier.price)} / month</div>
                  <div className="text-[10px] text-slate-400">{currentTier.clientLimit} Clients Limit</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">New Upgraded Tier</span>
                  <div className="font-black text-emerald-950">{targetTier.name}</div>
                  <div className="text-[11px] font-bold text-emerald-800">{formatINR(targetTier.price)} / month</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{targetTier.clientLimit} Clients Limit ✓</div>
                </div>
              </div>

              {/* Billing Calculation Breakdown */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Billing Breakdown</div>
                <div className="flex justify-between text-slate-600 text-[11px]">
                  <span>New Plan Monthly Fee</span>
                  <span>{formatINR(targetTier.price)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 text-[11px]">
                  <span>Prorated credit from remaining {coach.plan} cycle</span>
                  <span>-₹650</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-slate-900 text-xs">
                  <span>Due Today (Prorated Adjustment)</span>
                  <span>{formatINR(Math.max(0, targetTier.price - 650))}</span>
                </div>
              </div>

              {/* Payment Method Verification */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span className="text-slate-800 font-medium">Auto-charge to HDFC Bank •••• 8812</span>
                </div>
                <span className="text-emerald-600 font-bold text-[10px]">Verified ✓</span>
              </div>

              {/* Confirmation CTA */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsConfirmingUpgrade(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmUpgrade}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Confirm & Upgrade to {targetTier.name}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
