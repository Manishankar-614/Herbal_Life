'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Sparkles, 
  Users, 
  UserPlus, 
  ShoppingBag, 
  TrendingUp, 
  ExternalLink, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Smartphone,
  ChevronRight,
  Shield,
  LogOut,
  Rocket,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  User
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import { CoachSettingsModal } from '../coach/CoachSettingsModal';
import { CoachNotificationsPanel } from '../coach/CoachNotificationsPanel';
import { CoachProfileModal } from '../coach/CoachProfileModal';
import { OfflineMeetupModal } from '../coach/OfflineMeetupModal';

export const CoachLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    coachScreen, 
    setCoachScreen, 
    setCurrentRole, 
    setCustomerTab,
    coach,
    notification,
    leads,
    customers
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Modals and Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<string>('subscription');
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMeetupModalOpen, setIsMeetupModalOpen] = useState(false);

  const atRiskCount = customers.filter(c => c.status === 'declining' || c.status === 'high-risk').length;
  const newLeadsCount = leads.filter(l => l.stage === 'new').length;

  const navItems = [
    {
      id: 'command-center',
      label: 'Command Center',
      icon: Activity,
      badge: null,
    },
    {
      id: 'retention-radar',
      label: 'Retention Radar',
      icon: Sparkles,
      badge: `${atRiskCount} At Risk`,
      badgeColor: 'bg-rose-100 text-rose-700 font-semibold',
      signature: true,
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      badge: '86 Active',
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'leads-referrals',
      label: 'Leads & Referrals',
      icon: UserPlus,
      badge: `${newLeadsCount} New`,
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'growth-hub',
      label: 'Growth Hub',
      icon: Rocket,
      badge: '5 Funnels',
      badgeColor: 'bg-amber-100 text-amber-800 font-semibold',
    },
    {
      id: 'programs-commerce',
      label: 'Programs & Store',
      icon: ShoppingBag,
      badge: null,
    },
    {
      id: 'business',
      label: 'Business & Brand',
      icon: TrendingUp,
      badge: null,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <p className="text-xs font-medium">{notification.message}</p>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden w-full min-w-0 h-full">
        {/* Left Desktop Sidebar (Seamless, Fixed-Height, Collapsible on Large Desktop) */}
        <aside className={cn(
          "h-full bg-white border-r border-slate-200/80 flex flex-col shrink-0 hidden lg:flex z-20 shadow-[1px_0_6px_rgba(0,0,0,0.02)] transition-all duration-200",
          sidebarCollapsed ? "w-20" : "w-64"
        )}>
          {/* Coach Branded Identity & Collapse Button */}
          <div className={cn("p-4 border-b border-slate-100 bg-white", sidebarCollapsed && "px-2 py-4")}>
            <div className={cn("flex items-center", sidebarCollapsed ? "flex-col gap-2 justify-center" : "justify-between")}>
              <div 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-3 min-w-0 cursor-pointer group"
                title="View & Edit Coach Profile"
              >
                <div 
                  className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs relative group-hover:scale-105 transition-transform"
                  style={{ borderColor: 'var(--brand-primary)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={coach.avatar} 
                    alt={coach.name} 
                    className="w-full h-full object-cover" 
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                {!sidebarCollapsed && (
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold text-slate-900 truncate flex items-center gap-1.5 group-hover:text-emerald-700 transition-colors">
                      {coach.businessName}
                    </h2>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                      <span className="text-emerald-700 font-semibold">{coach.subdomain}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Collapse Toggle Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Plan Badge */}
            {!sidebarCollapsed ? (
              <div 
                onClick={() => {
                  setSettingsTab('subscription');
                  setIsSettingsOpen(true);
                }}
                className="mt-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs hover:border-emerald-300 hover:bg-emerald-50/50 transition-all cursor-pointer group"
                title="Click to view subscription & plan details"
              >
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">Growth Pro Plan</span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">₹9,999/mo</span>
              </div>
            ) : (
              <div 
                onClick={() => {
                  setSettingsTab('subscription');
                  setIsSettingsOpen(true);
                }}
                className="mt-2 flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-emerald-50 text-emerald-700 cursor-pointer"
                title="Growth Pro Plan (₹9,999/mo)"
              >
                <Shield className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
            {!sidebarCollapsed && (
              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-3 pt-2 pb-1">
                Core Operations
              </div>
            )}
            {navItems.slice(0, 3).map((item) => {
              const Icon = item.icon;
              const isActive = coachScreen === item.id || (item.id === 'customers' && coachScreen === 'customer-360');

              return (
                <button
                  key={item.id}
                  onClick={() => setCoachScreen(item.id as any)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center rounded-xl text-xs font-medium transition-all group relative cursor-pointer",
                    sidebarCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                    isActive
                      ? "text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--brand-primary)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700")} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium",
                      isActive ? "bg-white/20 text-white" : item.badgeColor
                    )}>
                      {item.badge}
                    </span>
                  )}

                  {sidebarCollapsed && item.signature && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-2 right-2" />
                  )}
                </button>
              );
            })}

            {!sidebarCollapsed && (
              <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-3 pt-4 pb-1">
                Growth & Revenue
              </div>
            )}
            {navItems.slice(3).map((item) => {
              const Icon = item.icon;
              const isActive = coachScreen === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCoachScreen(item.id as any)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center rounded-xl text-xs font-medium transition-all group relative cursor-pointer",
                    sidebarCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2",
                    isActive
                      ? "text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--brand-primary)' : undefined,
                  }}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700")} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium",
                      isActive ? "bg-white/20 text-white" : item.badgeColor
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Live Customer App Switcher CTA */}
          <div className={cn("border-t border-slate-100 bg-slate-50/70", sidebarCollapsed ? "p-2" : "p-3")}>
            <button
              onClick={() => {
                setCurrentRole('customer');
                setCustomerTab('home');
              }}
              title="Preview Client Mobile App as Rohan"
              className={cn(
                "w-full flex items-center rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all group cursor-pointer",
                sidebarCollapsed ? "justify-center p-2" : "justify-between px-3 py-2"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'var(--brand-light)', color: 'var(--brand-primary)' }}
                >
                  <Smartphone className="w-4 h-4" />
                </div>
                {!sidebarCollapsed && (
                  <div className="text-left min-w-0">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Client Mobile App</div>
                    <div className="text-[10px] text-slate-500 truncate">Preview as Rohan</div>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              )}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto overflow-x-hidden">
          {/* Top Bar */}
          <header className="h-16 bg-white border-b border-slate-200/80 px-3.5 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {/* Mobile & Tablet menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 capitalize flex items-center gap-2 truncate">
                  <span className="truncate">{coachScreen.replace('-', ' ')}</span>
                  {coachScreen === 'retention-radar' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 hidden sm:inline-block shrink-0">
                      Retention System
                    </span>
                  )}
                  {coachScreen === 'growth-hub' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hidden sm:inline-block shrink-0">
                      Lead Gen
                    </span>
                  )}
                </h1>
                <p className="text-[11px] text-slate-500 hidden sm:block truncate">
                  Managing {coach.stats.activeCustomers} active clients across 8 running journeys
                </p>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <a
                href={`https://${coach.subdomain}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentRole('customer');
                  setCustomerTab('welcome');
                }}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                <span>{coach.subdomain}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <div className="h-4 w-px bg-slate-200 hidden lg:block" />

              {/* Offline Meetup Quick Action */}
              <button
                onClick={() => setIsMeetupModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                title="15-Day Offline Meetup & Honesty Check"
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>15-Day Meetup</span>
              </button>

              {/* Notifications Panel Trigger */}
              <button 
                onClick={() => setIsNotifsOpen(true)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                title="Retention Alerts & Notification Policy"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              {/* Settings Trigger */}
              <button 
                onClick={() => {
                  setSettingsTab('subscription');
                  setIsSettingsOpen(true);
                }}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
                title="Studio & Subscription Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Coach Profile Trigger */}
              <div 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 pl-1 sm:pl-2 cursor-pointer hover:opacity-80 transition-opacity"
                title="View Coach Profile & Credentials"
              >
                <div 
                  className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 shadow-2xs"
                  style={{ borderColor: 'var(--brand-primary)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">{coach.name}</div>
                  <div className="text-[10px] text-slate-500">Coach Profile</div>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile & Tablet Overlay Drawer with Backdrop */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div 
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
              />

              {/* Slide-out Sheet */}
              <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 overflow-y-auto">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{coach.businessName}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{coach.subdomain}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-3 space-y-1 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                    All Sections
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCoachScreen(item.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer",
                          coachScreen === item.id 
                            ? "bg-slate-900 text-white shadow-xs" 
                            : "text-slate-700 hover:bg-slate-100"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-emerald-500" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full font-bold",
                            coachScreen === item.id ? "bg-emerald-500 text-slate-950" : "bg-slate-100 text-slate-700"
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                    <button
                      onClick={() => {
                        setIsMeetupModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span>15-Day Offline Meetup Check</span>
                    </button>

                    <button
                      onClick={() => {
                        setSettingsTab('subscription');
                        setIsSettingsOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Studio & App Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Coach Profile & Credentials</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentRole('customer');
                        setCustomerTab('home');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span>Client Mobile App Preview</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page Body */}
          <main className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-28 lg:pb-12">
            {children}
          </main>

          {/* Mobile & Tablet Bottom Navigation Bar (Fixed, High-Touch) */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 z-40 px-2 flex items-center justify-around shadow-lg select-none">
            <button
              onClick={() => setCoachScreen('command-center')}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer",
                coachScreen === 'command-center' ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Activity className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Home</span>
            </button>

            <button
              onClick={() => setCoachScreen('retention-radar')}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-all relative cursor-pointer",
                coachScreen === 'retention-radar' ? "text-amber-700 font-bold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Sparkles className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Radar</span>
              {atRiskCount > 0 && (
                <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {atRiskCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCoachScreen('customers')}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer",
                (coachScreen === 'customers' || coachScreen === 'customer-360') ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Clients</span>
            </button>

            <button
              onClick={() => setCoachScreen('growth-hub')}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer",
                coachScreen === 'growth-hub' ? "text-emerald-700 font-bold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Rocket className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Growth</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer",
                mobileMenuOpen ? "text-slate-900 font-bold" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Menu className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Menu</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Modals & Panels */}
      <CoachSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        defaultTab={settingsTab}
      />

      <CoachNotificationsPanel
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
        onOpenSettings={() => {
          setIsNotifsOpen(false);
          setSettingsTab('notifications');
          setIsSettingsOpen(true);
        }}
        onOpenMeetup={() => {
          setIsNotifsOpen(false);
          setIsMeetupModalOpen(true);
        }}
      />

      <CoachProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenSettings={() => {
          setIsProfileOpen(false);
          setSettingsTab('subscription');
          setIsSettingsOpen(true);
        }}
      />

      <OfflineMeetupModal
        isOpen={isMeetupModalOpen}
        onClose={() => setIsMeetupModalOpen(false)}
      />
    </div>
  );
};
