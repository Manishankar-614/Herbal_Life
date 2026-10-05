'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Compass, 
  Users, 
  Activity, 
  UserPlus, 
  ShoppingBag, 
  TrendingUp,
  X,
  Rocket
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const DemoSwitcher: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    coachScreen, 
    setCoachScreen, 
    customerTab, 
    setCustomerTab,
    adminScreen,
    setAdminScreen,
    coach 
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 left-3 sm:bottom-20 sm:left-4 lg:bottom-5 lg:left-5 z-50 font-sans">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-2 w-80 bg-slate-900/95 text-slate-100 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                CoachOS Demo Control
              </h4>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>

          <div className="mt-3 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            {/* 1. Coach View */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Coach Portal ({coach.businessName})
                </span>
                <span className="text-[10px] text-slate-400">Desktop View</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('command-center');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'command-center'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Command Center</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('retention-radar');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'retention-radar'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-300" />
                  <span className="truncate">Retention Radar 🎯</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('customers');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'customers'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Customers List</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('customer-360');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'customer-360'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Customer 360°</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('leads-referrals');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'leads-referrals'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Leads & Referrals</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('growth-hub');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'growth-hub'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Rocket className="w-3.5 h-3.5 shrink-0 text-amber-300" />
                  <span className="truncate">Growth Hub 🚀</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('programs-commerce');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'programs-commerce'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Programs & Store</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('business');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'business'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Business & Brand</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('login');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5",
                    currentRole === 'coach' && coachScreen === 'login'
                      ? "bg-emerald-600 text-white border-emerald-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Coach Login UI</span>
                </button>
              </div>
            </div>

            {/* 2. Customer View */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  Customer App (Rohan Deshpande)
                </span>
                <span className="text-[10px] text-slate-400">Mobile Mockup</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('home');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'home'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('journey');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'journey'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Journey
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('progress');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'progress'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Progress
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('shop');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'shop'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Shop 🛍️
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('rewards');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'rewards'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Rewards
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('referral');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'referral'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Referral 🎁
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('coach');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'customer' && customerTab === 'coach'
                      ? "bg-sky-600 text-white border-sky-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  My Coach
                </button>
              </div>
            </div>

            {/* 3. Onboarding Flows */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-violet-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Onboarding Experiences
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => {
                    setCurrentRole('customer');
                    setCustomerTab('welcome');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all truncate",
                    currentRole === 'customer' && (customerTab === 'welcome' || customerTab === 'assessment')
                      ? "bg-violet-600 text-white border-violet-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Client Intake Flow
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('coach');
                    setCoachScreen('coach-onboarding');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 rounded-lg border transition-all truncate",
                    currentRole === 'coach' && coachScreen === 'coach-onboarding'
                      ? "bg-violet-600 text-white border-violet-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Coach 8-Step Setup
                </button>
              </div>
            </div>

            {/* 4. Platform Admin */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Platform Admin
                </span>
                <span className="text-[10px] text-slate-400">HQ Oversight</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminScreen('dashboard');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'admin' && adminScreen === 'dashboard'
                      ? "bg-amber-600 text-white border-amber-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Overview & MRR
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminScreen('coach-management');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg border text-center transition-all",
                    currentRole === 'admin' && adminScreen === 'coach-management'
                      ? "bg-amber-600 text-white border-amber-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Coach Accounts
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminScreen('subscriptions');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg border text-center transition-all text-[11px]",
                    currentRole === 'admin' && adminScreen === 'subscriptions'
                      ? "bg-amber-600 text-white border-amber-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Subscriptions
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminScreen('templates');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg border text-center transition-all text-[11px]",
                    currentRole === 'admin' && adminScreen === 'templates'
                      ? "bg-amber-600 text-white border-amber-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  Templates (8)
                </button>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setAdminScreen('system-health');
                    setIsOpen(false);
                  }}
                  className={cn(
                    "col-span-2 px-2.5 py-1.5 rounded-lg border text-center transition-all text-[11px] flex items-center justify-center gap-1.5",
                    currentRole === 'admin' && adminScreen === 'system-health'
                      ? "bg-amber-600 text-white border-amber-500 font-medium"
                      : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>System Logs & Health (99.98%)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-slate-900 text-white border border-slate-700/80 shadow-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 group"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs">
          ⚡
        </div>
        <div className="text-left leading-tight pr-1">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Demo Mode Switcher
          </div>
          <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
            {currentRole === 'coach' && <span>Coach: {coachScreen}</span>}
            {currentRole === 'customer' && <span>Client App: {customerTab}</span>}
            {currentRole === 'admin' && <span>Admin: {adminScreen}</span>}
          </div>
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white" />
        ) : (
          <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white" />
        )}
      </button>
    </div>
  );
};
