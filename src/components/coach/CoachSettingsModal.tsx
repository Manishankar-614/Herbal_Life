'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CreditCard, 
  Bell, 
  Calendar, 
  Shield, 
  CheckCircle2, 
  Download, 
  Clock, 
  MapPin, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  Sliders,
  AlertTriangle,
  Building2,
  Lock,
  ArrowUpRight,
  Sun,
  Moon,
  Laptop,
  User,
  DollarSign,
  Palette,
  ArrowLeft,
  Check
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export type SettingsSection = 
  | 'profile' 
  | 'subscription' 
  | 'notifications' 
  | 'meetups' 
  | 'theme' 
  | 'payouts';

interface CoachSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export const CoachSettingsModal: React.FC<CoachSettingsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'subscription'
}) => {
  const { coach, updateCoachProfile, theme, setTheme, showNotification } = useApp();
  
  // Map string to valid section
  const initialSection: SettingsSection = 
    defaultTab === 'notifications' ? 'notifications' :
    defaultTab === 'meetups' ? 'meetups' :
    defaultTab === 'theme' ? 'theme' :
    defaultTab === 'profile' ? 'profile' :
    defaultTab === 'payouts' ? 'payouts' : 'subscription';

  const [activeSection, setActiveSection] = useState<SettingsSection>(initialSection);
  const [mobileView, setMobileView] = useState<'menu' | 'detail'>('detail');

  // Form states for profile
  const [name, setName] = useState(coach.name);
  const [businessName, setBusinessName] = useState(coach.businessName);
  const [bio, setBio] = useState(coach.bio);
  const [yearsExperience, setYearsExperience] = useState((coach.yearsExperience ?? 7).toString());

  // Notification Cadence State (Max 3-4 notifications per day policy)
  const [morningScheduleEnabled, setMorningScheduleEnabled] = useState(true);
  const [morningTime, setMorningTime] = useState('07:00 AM');
  const [eveningWrapupEnabled, setEveningWrapupEnabled] = useState(true);
  const [eveningTime, setEveningTime] = useState('09:00 PM');
  const [meetupCountdownEnabled, setMeetupCountdownEnabled] = useState(true);
  const [middayNudge, setMiddayNudge] = useState(false);

  // 15-Day Offline Meetup Settings State
  const [meetupInterval, setMeetupInterval] = useState('15');
  const [meetupLocation, setMeetupLocation] = useState('Kavya Wellness Studio, 100ft Road, Indiranagar, Bengaluru');
  const [inBodyScanEnabled, setInBodyScanEnabled] = useState(true);
  const [tapeMeasurementEnabled, setTapeMeasurementEnabled] = useState(true);
  const [honestyAuditEnabled, setHonestyAuditEnabled] = useState(true);

  if (!isOpen) return null;

  const sections = [
    {
      id: 'profile' as const,
      label: 'Profile & Brand',
      desc: 'Name, avatar, bio & credentials',
      icon: User,
      badge: null
    },
    {
      id: 'subscription' as const,
      label: 'Subscription & Plan',
      desc: 'Growth Pro Plan, capacity & invoices',
      icon: CreditCard,
      badge: 'Active'
    },
    {
      id: 'notifications' as const,
      label: 'Notification Policy',
      desc: 'Max 3–4 alerts/day quiet policy',
      icon: Bell,
      badge: 'Protected'
    },
    {
      id: 'meetups' as const,
      label: '15-Day Meetup Protocol',
      desc: 'Physical checks, InBody scan & honesty',
      icon: Calendar,
      badge: 'Bi-Weekly'
    },
    {
      id: 'theme' as const,
      label: 'Appearance & Theme',
      desc: 'Light / Dark mode & studio accents',
      icon: Palette,
      badge: theme === 'dark' ? 'Dark' : 'Light'
    },
    {
      id: 'payouts' as const,
      label: 'Settlement & Bank Account',
      desc: 'Direct bank payout details & UPI',
      icon: Building2,
      badge: 'Verified'
    },
  ];

  const handleSaveProfile = () => {
    updateCoachProfile({
      name,
      businessName,
      bio,
      yearsExperience: parseInt(yearsExperience) || coach.yearsExperience || 7,
    });
    showNotification('Settings and studio profile saved successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-4xl w-full shadow-2xl border-0 sm:border border-slate-200 overflow-hidden flex flex-col h-full sm:h-[680px]">
        
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            {/* Prominent Back Button (Desktop & Mobile) */}
            <button
              onClick={() => {
                if (mobileView === 'detail') {
                  setMobileView('menu');
                } else {
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
              title={mobileView === 'detail' ? "Back to Settings menu" : "Back to Dashboard"}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>{mobileView === 'detail' ? 'Back' : 'Back to Dashboard'}</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Studio & App Settings</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hidden xs:inline-block">
                  CoachOS Pro
                </span>
              </h2>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Manage your subscription, client notification cadence, and bi-weekly in-person protocols
              </p>
            </div>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Column: Main Settings Sections */}
          <aside className={cn(
            "w-full sm:w-72 border-r border-slate-100 bg-slate-50/50 p-3 space-y-1 overflow-y-auto shrink-0",
            mobileView === 'detail' ? "hidden sm:block" : "block"
          )}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Main Sections
            </div>

            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setMobileView('detail');
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all group cursor-pointer",
                    isActive
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/80 font-bold"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                      isActive ? "bg-emerald-600 text-white shadow-xs" : "bg-white border border-slate-200 text-slate-500 group-hover:text-slate-900"
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs truncate">{section.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{section.desc}</div>
                    </div>
                  </div>

                  <ChevronRight className={cn(
                    "w-4 h-4 shrink-0 transition-transform",
                    isActive ? "text-emerald-600 translate-x-0.5" : "text-slate-300 group-hover:text-slate-400"
                  )} />
                </button>
              );
            })}
          </aside>

          {/* Right Column: Subsection Details Content */}
          <main className={cn(
            "flex-1 overflow-y-auto p-5 sm:p-6 bg-white space-y-6",
            mobileView === 'menu' ? "hidden sm:block" : "block"
          )}>
            
            {/* SUBSECTION 1: PROFILE & BRAND */}
            {activeSection === 'profile' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Coach Profile & Identity</h3>
                  <p className="text-xs text-slate-500">How clients and prospects see you across the mobile app and lead funnels</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Coach Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Business / Brand Name</label>
                      <input 
                        type="text" 
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Bio & Philosophy</label>
                    <textarea 
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Years of Experience</label>
                      <input 
                        type="number" 
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Subdomain</label>
                      <div className="flex items-center text-xs">
                        <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-mono text-[11px]">
                          https://
                        </span>
                        <input 
                          type="text" 
                          defaultValue={coach.subdomain}
                          disabled
                          className="flex-1 px-3 py-2.5 border border-slate-200 bg-slate-100 text-slate-500 font-mono text-[11px] rounded-r-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUBSECTION 2: SUBSCRIPTION & BILLING (NO GST NUMBER REQUIRED) */}
            {activeSection === 'subscription' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Subscription & Client Capacity</h3>
                  <p className="text-xs text-slate-500">Your white-label CoachOS platform license and billing details</p>
                </div>

                {/* Current Plan Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-md">
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        Current Active Plan
                      </span>
                      <h4 className="text-lg font-black text-white mt-1.5">Growth Pro Plan</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Auto-renews on Oct 28, 2026 · HDFC Bank ending 8812</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-white">₹9,999</div>
                      <span className="text-[11px] text-slate-400">per month</span>
                    </div>
                  </div>

                  {/* Active Capacity Bar */}
                  <div className="mt-5 pt-4 border-t border-white/10 relative z-10">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Active Clients Quota:</span>
                      <span className="font-bold text-emerald-300">86 / 150 Clients (57% Used)</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                        style={{ width: '57%' }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">64 client slots remaining this cycle</span>
                  </div>
                </div>

                {/* Tax Status - Explicitly No GST Needed */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Tax & Professional Registration:</span>
                    <p className="mt-0.5 text-slate-500 leading-relaxed">
                      Registered as an <span className="font-semibold text-slate-800">Individual Fitness Coach / Sole Practitioner</span>. Under Indian tax laws, independent coaches operating below the statutory service threshold are <span className="font-semibold text-emerald-700">GST-Exempt</span>. No GST number is required.
                    </p>
                  </div>
                </div>

                {/* Invoices List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Platform Invoices & Receipts</h4>
                  <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
                    {[
                      { id: 'INV-2026-0922', date: 'Sep 28, 2026', amount: '₹9,999', status: 'Paid' },
                      { id: 'INV-2026-0822', date: 'Aug 28, 2026', amount: '₹9,999', status: 'Paid' },
                      { id: 'INV-2026-0722', date: 'Jul 28, 2026', amount: '₹9,999', status: 'Paid' },
                    ].map((inv) => (
                      <div key={inv.id} className="p-3.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                        <div>
                          <div className="font-bold text-slate-900 font-mono">{inv.id}</div>
                          <div className="text-[11px] text-slate-400">{inv.date} · CoachOS SaaS Subscription</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900">{inv.amount}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {inv.status}
                          </span>
                          <button
                            onClick={() => showNotification(`Downloaded receipt: ${inv.id}`, 'success')}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            title="Download Receipt PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUBSECTION 3: NOTIFICATION CADENCE (STRICT MAX 3-4/DAY) */}
            {activeSection === 'notifications' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Retention & Notification Cadence Policy</h3>
                  <p className="text-xs text-slate-500">Ensures clients stay on track without ever feeling spammed or annoyed</p>
                </div>

                {/* Core Policy Guarantee Pill */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-950">
                    <span className="font-bold">Strict Non-Annoyance Engine Guarantee:</span>
                    <p className="text-emerald-800 mt-0.5 leading-relaxed">
                      Clients will receive a <span className="font-bold">maximum of 3 to 4 notifications per day</span>. Extra automated marketing broadcasts are automatically suppressed to safeguard retention and build genuine client goodwill.
                    </p>
                  </div>
                </div>

                {/* 3 Core Touchpoints */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">The 3 Daily Touchpoints</h4>

                  {/* 1. Early Morning Schedule */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">1. Early Morning Schedule Dispatch</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-100 text-amber-800">Touchpoint 1</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Sends whole day&apos;s schedule, meals, target step count, and encouragement to complete missions.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select 
                        value={morningTime} 
                        onChange={(e) => setMorningTime(e.target.value)}
                        className="text-xs font-bold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option>06:30 AM</option>
                        <option>07:00 AM</option>
                        <option>07:30 AM</option>
                      </select>
                      <button
                        onClick={() => setMorningScheduleEnabled(!morningScheduleEnabled)}
                        className={cn(
                          "w-10 h-6 rounded-full transition-colors relative cursor-pointer",
                          morningScheduleEnabled ? "bg-emerald-600" : "bg-slate-300"
                        )}
                      >
                        <span className={cn(
                          "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                          morningScheduleEnabled ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>
                  </div>

                  {/* 2. Midday Meetup Alert */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">2. 15-Day Offline Meetup Countdown</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-indigo-100 text-indigo-800">Touchpoint 2</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Alerts client of days remaining for their bi-weekly in-person progress and body fat audit.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 font-mono">03:00 PM</span>
                      <button
                        onClick={() => setMeetupCountdownEnabled(!meetupCountdownEnabled)}
                        className={cn(
                          "w-10 h-6 rounded-full transition-colors relative cursor-pointer",
                          meetupCountdownEnabled ? "bg-emerald-600" : "bg-slate-300"
                        )}
                      >
                        <span className={cn(
                          "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                          meetupCountdownEnabled ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>
                  </div>

                  {/* 3. End-of-Day Wrap-up */}
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">3. End-of-Day Milestone Wrap-Up</span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">Touchpoint 3</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        Checks if today&apos;s milestones were completed, preserves daily streak, and shares gentle motivation.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select 
                        value={eveningTime} 
                        onChange={(e) => setEveningTime(e.target.value)}
                        className="text-xs font-bold px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                      >
                        <option>08:30 PM</option>
                        <option>09:00 PM</option>
                        <option>09:30 PM</option>
                      </select>
                      <button
                        onClick={() => setEveningWrapupEnabled(!eveningWrapupEnabled)}
                        className={cn(
                          "w-10 h-6 rounded-full transition-colors relative cursor-pointer",
                          eveningWrapupEnabled ? "bg-emerald-600" : "bg-slate-300"
                        )}
                      >
                        <span className={cn(
                          "w-4 h-4 rounded-full bg-white absolute top-1 transition-transform",
                          eveningWrapupEnabled ? "right-1" : "left-1"
                        )} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showNotification('Cadence policy saved! Max 3-4 alerts/day active.', 'success')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Save Cadence Policy
                  </button>
                </div>
              </div>
            )}

            {/* SUBSECTION 4: 15-DAY MEETUP PROTOCOL */}
            {activeSection === 'meetups' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">15-Day Live Offline Meetup Protocol</h3>
                  <p className="text-xs text-slate-500">Bi-weekly physical audits to verify real progress and genuine diet/workout adherence</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Check-in Interval</label>
                    <select 
                      value={meetupInterval}
                      onChange={(e) => setMeetupInterval(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option value="15">Every 15 Days (Recommended standard for recomposition audits)</option>
                      <option value="30">Every 30 Days (Monthly milestone check)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Studio / Physical Venue Address</label>
                    <input 
                      type="text"
                      value={meetupLocation}
                      onChange={(e) => setMeetupLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">In-Person Verification Checklist</h4>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Physical InBody 270 Body Composition Scan</div>
                        <div className="text-[11px] text-slate-500">Measures body fat %, visceral fat index, and skeletal muscle mass</div>
                      </div>
                      <input 
                        type="checkbox"
                        checked={inBodyScanEnabled}
                        onChange={() => setInBodyScanEnabled(!inBodyScanEnabled)}
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Physical Measuring Tape Audit</div>
                        <div className="text-[11px] text-slate-500">Waist-to-hip ratio and chest/thigh circumference comparison</div>
                      </div>
                      <input 
                        type="checkbox"
                        checked={tapeMeasurementEnabled}
                        onChange={() => setTapeMeasurementEnabled(!tapeMeasurementEnabled)}
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">Diet & Workout Adherence Honesty Audit</div>
                        <div className="text-[11px] text-slate-500">Cross-reference physical fat loss with app logged missions to detect cheating</div>
                      </div>
                      <input 
                        type="checkbox"
                        checked={honestyAuditEnabled}
                        onChange={() => setHonestyAuditEnabled(!honestyAuditEnabled)}
                        className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => showNotification('15-Day Meetup Protocol saved!', 'success')}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Save Meetup Configuration
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUBSECTION 5: APPEARANCE & THEME (LIGHT / DARK MODE TOGGLE) */}
            {activeSection === 'theme' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Appearance & Theme Settings</h3>
                  <p className="text-xs text-slate-500">Configure Light / Dark mode for Coach portal, Customer mobile app, and Admin panel</p>
                </div>

                {/* Theme Selector */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Display Theme</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer",
                        theme === 'light'
                          ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      )}
                    >
                      <Sun className={cn("w-6 h-6", theme === 'light' ? "text-amber-500" : "text-slate-400")} />
                      <div className="text-center">
                        <div className="text-xs font-bold text-slate-900">☀️ Light Mode</div>
                        <span className="text-[10px] text-slate-500">Crisp high-contrast day theme</span>
                      </div>
                      {theme === 'light' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer",
                        theme === 'dark'
                          ? "border-emerald-500 bg-slate-900 text-white shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      )}
                    >
                      <Moon className={cn("w-6 h-6", theme === 'dark' ? "text-indigo-400" : "text-slate-400")} />
                      <div className="text-center">
                        <div className={cn("text-xs font-bold", theme === 'dark' ? "text-white" : "text-slate-900")}>🌙 Dark Mode</div>
                        <span className="text-[10px] text-slate-400">Low-glare night palette</span>
                      </div>
                      {theme === 'dark' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Brand Primary Color Note */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Studio Brand Accent</span>
                    <span className="font-mono text-emerald-700 font-bold">{coach.themeName || 'Emerald Jade'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 border border-white shadow-2xs" />
                    <span className="text-xs text-slate-500">Theme is synchronized across customer mobile app & coach portal</span>
                  </div>
                </div>
              </div>
            )}

            {/* SUBSECTION 6: PAYOUTS & SETTLEMENT */}
            {activeSection === 'payouts' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Bank Settlement & Payout Details</h3>
                  <p className="text-xs text-slate-500">Direct NEFT/IMPS earnings deposits from client subscriptions and programs</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        HDFC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">HDFC Bank Primary Current Account</div>
                        <div className="text-[10px] text-slate-500 font-mono">A/C: ************8812 · IFSC: HDFC0001234</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Verified & Active
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>UPI ID for QR Inbound Payments:</span>
                    <span className="font-mono font-bold text-slate-800">kavyawellness@hdfcbank</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-dashed border-slate-200 text-center space-y-1">
                  <div className="text-xs font-bold text-slate-700">Next Auto-Payout Cycle: Monday, 10:00 AM</div>
                  <p className="text-[11px] text-slate-400">Total ₹42,500 pending settlement to account ending 8812</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
