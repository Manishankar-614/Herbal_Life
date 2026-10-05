'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Heart, 
  Activity, 
  Moon, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../lib/utils';

export const CustomerAssessmentScreen: React.FC = () => {
  const { setCustomerTab, coach, showNotification } = useApp();
  const [step, setStep] = useState(1);

  // Assessment answers state
  const [goal, setGoal] = useState('Weight Management & Fat Loss');
  const [ageRange, setAgeRange] = useState('28-35 years');
  const [activity, setActivity] = useState('Desk Job (Mostly Sedentary)');
  const [currentWeight, setCurrentWeight] = useState(88);
  const [targetWeight, setTargetWeight] = useState(79);
  const [diet, setDiet] = useState('Non-Vegetarian (Eggs & Chicken)');

  const totalSteps = 6;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const handleNext = () => {
    if (step === 5) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
    if (step < 6) {
      setStep(s => s + 1);
    } else {
      showNotification('Welcome aboard Rohan! Your 60-Day Transformation Journey is active.', 'success');
      setCustomerTab('home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
    } else {
      setCustomerTab('welcome');
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-white min-h-[700px] font-sans">
      {/* Top Header & Progress Bar */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button onClick={handleBack} className="p-1 hover:text-slate-900 flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span className="font-bold text-slate-800">Step {step} of {totalSteps}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${progressPercent}%`,
              backgroundColor: 'var(--brand-primary)' 
            }}
          />
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="my-auto py-4 space-y-4">
        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Primary Focus
              </span>
              <h2 className="text-lg font-black text-slate-900">What is your primary wellness goal?</h2>
              <p className="text-xs text-slate-500">Coach Kavya calibrates your program around this single metric.</p>
            </div>

            <div className="space-y-2">
              {[
                { title: 'Weight Management & Fat Loss', desc: 'Lose 5-10 kg safely with sustained metabolic rate' },
                { title: 'Gut Reboot & Bloat Reduction', desc: 'Improve digestion, bowel transit, and food tolerance' },
                { title: 'Muscle Tone & Strength', desc: 'Build lean muscle mass and athletic conditioning' },
                { title: 'Hormonal & Skin Radiance', desc: 'Regulate cycles, cortisol, and clear skin from within' },
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => setGoal(opt.title)}
                  className={cn(
                    "w-full p-3 rounded-2xl border cursor-pointer transition-all flex items-start justify-between text-left",
                    goal === opt.title ? "border-emerald-500 bg-emerald-50/50 shadow-xs" : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{opt.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
                  </div>
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    goal === opt.title ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300"
                  )}>
                    {goal === opt.title && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Age Range */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">What is your age bracket?</h2>
              <p className="text-xs text-slate-500">Helps calibrate metabolic pacing and recovery times.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {['18-24 years', '25-34 years', '35-44 years', '45-55 years', '55+ years'].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAgeRange(a)}
                  className={cn(
                    "p-3.5 rounded-2xl border text-xs font-bold text-center transition-all",
                    ageRange === a ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Activity Level */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">What is your current activity level?</h2>
              <p className="text-xs text-slate-500">Daily movement habits during the work week.</p>
            </div>
            <div className="space-y-2">
              {[
                'Desk Job (Mostly Sedentary, < 4,000 steps)',
                'Lightly Active (Walking 5,000 - 8,000 steps)',
                'Moderately Active (Gym 3-4 days/week)',
                'High Performance Athlete (5+ rigorous sessions/week)',
              ].map((act) => (
                <button
                  key={act}
                  type="button"
                  onClick={() => setActivity(act)}
                  className={cn(
                    "w-full text-left p-3 rounded-2xl border cursor-pointer text-xs font-semibold transition-all",
                    activity === act ? "border-emerald-500 bg-emerald-50 text-slate-900" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Weight & Target */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">Your Current & Target Weight</h2>
              <p className="text-xs text-slate-500">We establish realistic 60-day milestone corridors.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Current Weight</span>
                  <span className="text-emerald-700 font-black">{currentWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="130"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Target Weight</span>
                  <span className="text-emerald-700 font-black">{targetWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="110"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-900 font-semibold">
                🎯 Target Net Fat Loss: -{(currentWeight - targetWeight)} kg across 60 days
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Preferences */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900">Dietary Style & Lifestyle</h2>
              <p className="text-xs text-slate-500">What foods fit your daily routine?</p>
            </div>
            <div className="space-y-2">
              {[
                'Vegetarian (Dairy included)',
                'Non-Vegetarian (Eggs & Chicken)',
                'Vegan / Plant-Based Only',
                'Eggetarian (Vegetarian + Eggs)',
              ].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiet(d)}
                  className={cn(
                    "w-full p-3 rounded-2xl border text-xs font-semibold text-left transition-all",
                    diet === d ? "border-emerald-500 bg-emerald-50 text-slate-900 font-bold" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Confirmation & Program Assigned */}
        {step === 6 && (
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Personalized Assessment Complete
              </span>
              <h2 className="text-lg font-black text-slate-900">
                Your Primary Goal: Weight Management
              </h2>
              <p className="text-xs text-slate-500">
                Coach Kavya has assigned your <span className="font-bold text-slate-900">60-Day Transformation Journey</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Client Profile:</span>
                <span className="font-bold text-slate-800">Rohan Deshpande ({ageRange})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Curriculum:</span>
                <span className="font-bold text-emerald-700">60-Day Weight Transformation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Weight Goal:</span>
                <span className="font-bold text-slate-800">{currentWeight} kg → {targetWeight} kg (-9kg)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Coach:</span>
                <span className="font-bold text-slate-800">{coach.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Continue Button */}
      <div className="pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <span>{step === 6 ? 'Enter My Dashboard 🚀' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
