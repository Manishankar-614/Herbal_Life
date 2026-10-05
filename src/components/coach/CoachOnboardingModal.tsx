'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLOR_THEMES } from '../../data/coach';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Layers, 
  ShoppingBag, 
  Gift, 
  Users, 
  Rocket, 
  Copy, 
  QrCode,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../lib/utils';

export const CoachOnboardingModal: React.FC = () => {
  const { setCoachScreen, updateCoachTheme, coach, showNotification } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [businessName, setBusinessName] = useState('Kavya Wellness');
  const [coachSubdomain, setCoachSubdomain] = useState('kavyawellness');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(['Weight Management', 'Gut Health', 'Strength']);
  const [selectedReward, setSelectedReward] = useState('₹250 discount');
  const [customerImportMethod, setCustomerImportMethod] = useState<'invite' | 'csv' | 'manual'>('invite');
  const [copied, setCopied] = useState(false);

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Profile' },
    { number: 3, title: 'Branding' },
    { number: 4, title: 'Programs' },
    { number: 5, title: 'Store' },
    { number: 6, title: 'Referrals' },
    { number: 7, title: 'Customers' },
    { number: 8, title: 'Launch' },
  ];

  const handleNext = () => {
    if (currentStep === 7) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch (e) {}
    }
    if (currentStep < 8) {
      setCurrentStep(curr => curr + 1);
    } else {
      setCoachScreen('command-center');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const toggleProgram = (prog: string) => {
    if (selectedPrograms.includes(prog)) {
      setSelectedPrograms(selectedPrograms.filter(p => p !== prog));
    } else {
      setSelectedPrograms([...selectedPrograms, prog]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 flex flex-col items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Stepper Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                OS
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">CoachOS 8-Step Launch Wizard</h3>
                <p className="text-xs text-slate-500">Step {currentStep} of 8: {steps[currentStep - 1].title}</p>
              </div>
            </div>

            <button
              onClick={() => setCoachScreen('command-center')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Skip Setup →
            </button>
          </div>

          {/* Stepper Progress Dots */}
          <div className="flex items-center justify-between gap-1">
            {steps.map((s) => (
              <div key={s.number} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className={cn(
                    "w-full h-1.5 rounded-full transition-all duration-300",
                    s.number < currentStep ? "bg-emerald-600" :
                    s.number === currentStep ? "bg-amber-500" : "bg-slate-200"
                  )}
                />
                <span className={cn(
                  "text-[9px] font-bold uppercase hidden sm:block",
                  s.number === currentStep ? "text-slate-900" : "text-slate-400"
                )}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wizard Step Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[520px]">
          {/* Step 1: Account */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Create Coach Superadmin Account</h2>
                <p className="text-xs text-slate-500">You are setting up as Coach Kavya Menon under Growth Tier.</p>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input type="text" readOnly value="Kavya Menon" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Registered Email</label>
                  <input type="text" readOnly value="kavya@kavyawellness.com" className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700" />
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Growth Plan active: ₹9,999/month · White-Label App Included</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Profile */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Business Identity & Specialty</h2>
                <p className="text-xs text-slate-500">What your clients will see on their invoice and app.</p>
              </div>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Coaching Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Coach Bio & Credentials</label>
                  <textarea
                    rows={3}
                    defaultValue="Certified Holistic Nutritionist & Metabolic Transformation Coach. 800+ transformations completed."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Branding & Color */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Custom Brand Color & Styling</h2>
                <p className="text-xs text-slate-500">Pick your primary white-label theme color.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {COLOR_THEMES.map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() => updateCoachTheme(theme.primary, theme.accent, theme.name)}
                    className={cn(
                      "p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all",
                      coach.themeColor.toLowerCase() === theme.primary.toLowerCase()
                        ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900/10"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-white" style={{ backgroundColor: theme.primary }}>
                      {coach.themeColor.toLowerCase() === theme.primary.toLowerCase() && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="text-xs font-bold text-slate-900 truncate">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Programs Selection */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Pick Transformation Journey Templates</h2>
                <p className="text-xs text-slate-500">Select which protocols to enable in your coaching store.</p>
              </div>
              <div className="space-y-2 pt-2">
                {[
                  'Weight Management & Fat Loss (60 Days)',
                  'Gut Health & Clinical Nutrition (60 Days)',
                  'Strength & Hypertrophy Foundation (90 Days)',
                  'Skin Radiance & Hormonal Glow (60 Days)',
                  'Corporate Stress & Sleep Protocol (45 Days)',
                  'Metabolic Maintenance Protocol (180 Days)',
                ].map((prog) => {
                  const isChecked = selectedPrograms.includes(prog.split(' ')[0]);

                  return (
                    <div
                      key={prog}
                      onClick={() => toggleProgram(prog.split(' ')[0])}
                      className={cn(
                        "p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs font-semibold transition-all",
                        isChecked ? "border-emerald-500 bg-emerald-50/50 text-slate-900" : "border-slate-200 text-slate-600"
                      )}
                    >
                      <span>{prog}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center",
                        isChecked ? "bg-emerald-600 text-white" : "border border-slate-300"
                      )}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Products & Services */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Enable Client Commerce Products</h2>
                <p className="text-xs text-slate-500">Allow clients to order approved supplements and 1:1 consults inside their app.</p>
              </div>
              <div className="space-y-2.5 pt-2">
                {[
                  { name: 'Plant Protein Matrix & Electrolytes (Supplements)', enabled: true },
                  { name: '1:1 Blood Report Deep Dive (Consultations)', enabled: true },
                  { name: 'VIP Annual Transformation Club (Memberships)', enabled: true },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-medium">
                    <span>{item.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Enabled</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Referral Reward */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Choose Client Referral Incentive</h2>
                <p className="text-xs text-slate-500">What rewards do existing clients earn when their friends enroll?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {['₹250 discount', '500 reward points', 'Free Consultation call'].map((rew) => (
                  <button
                    key={rew}
                    type="button"
                    onClick={() => setSelectedReward(rew)}
                    className={cn(
                      "p-4 rounded-xl border text-center space-y-1 transition-all",
                      selectedReward === rew
                        ? "border-amber-500 bg-amber-50 text-slate-900 font-bold ring-2 ring-amber-300"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    )}
                  >
                    <Gift className="w-5 h-5 mx-auto text-amber-500" />
                    <div className="text-xs">{rew}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Add Existing Customers */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">Add Existing Clients</h2>
                <p className="text-xs text-slate-500">Migrate your active roster or invite them via WhatsApp link.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'invite', label: 'Share Invite Link', desc: 'Instant WhatsApp onboarding' },
                  { id: 'csv', label: 'Upload CSV', desc: 'Spreadsheet roster import' },
                  { id: 'manual', label: 'Manual Add', desc: 'Add clients one by one' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setCustomerImportMethod(m.id as any)}
                    className={cn(
                      "p-3 rounded-xl border text-left transition-all space-y-1",
                      customerImportMethod === m.id
                        ? "border-emerald-500 bg-emerald-50 text-slate-900 font-bold"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <div className="text-xs">{m.label}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{m.desc}</div>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                25 demo customers pre-loaded including Rohan Deshpande, Sneha Kulkarni, Suresh Patil.
              </div>
            </div>
          )}

          {/* Step 8: Launch Congratulations */}
          {currentStep === 8 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <Rocket className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900">Congratulations, Coach Kavya!</h2>
                <p className="text-xs text-slate-500">Your white-label wellness platform is officially live.</p>
              </div>

              {/* Generated URL & QR Box */}
              <div className="max-w-md mx-auto p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">Your Branded Client URL:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(`https://${coach.subdomain}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-emerald-600 font-bold flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-800 font-bold truncate">
                  https://{coach.subdomain}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Stepper Controls */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={handleBack}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors",
              currentStep === 1 ? "opacity-30 cursor-not-allowed text-slate-400" : "text-slate-600 hover:bg-slate-200"
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{currentStep === 8 ? 'Enter Command Center 🚀' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
