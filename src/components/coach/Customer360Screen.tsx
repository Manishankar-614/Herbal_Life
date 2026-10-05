'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { QuickActionModal } from '../common/QuickActionModal';
import { Customer } from '../../types';
import { 
  ArrowLeft, 
  Flame, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Gift, 
  ShoppingBag, 
  MessageSquare, 
  Compass, 
  Activity, 
  Award, 
  Send, 
  Sparkles, 
  ChevronRight,
  Clock,
  CheckCircle2
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
import { cn, formatINR } from '../../lib/utils';

export const Customer360Screen: React.FC = () => {
  const { selectedCustomer, setCoachScreen, sendActionToCustomer } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'messages' | 'purchases' | 'referrals'>('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'message' | 'challenge' | 'review'>('message');
  const [newMessageText, setNewMessageText] = useState('');

  const customer = selectedCustomer;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;
    sendActionToCustomer(customer.id, 'Message Sent', newMessageText);
    setNewMessageText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Back Button & Top Action Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => setCoachScreen('customers')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers List</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setModalAction('message');
              setModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Send Message</span>
          </button>
          <button
            onClick={() => {
              setModalAction('challenge');
              setModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Assign Challenge</span>
          </button>
          <button
            onClick={() => {
              setModalAction('review');
              setModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule 1:1 Review</span>
          </button>
        </div>
      </div>

      {/* Hero Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-200 shrink-0 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900">{customer.name}</h1>
                <StatusBadge status={customer.status} size="sm" />
                {customer.referredBy && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Referred by {customer.referredBy}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {customer.city}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {customer.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {customer.email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Engagement</span>
              <div className="text-lg font-black text-slate-900 flex items-center justify-center gap-1">
                <span>{customer.engagementScore}%</span>
                {customer.engagementTrend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-rose-500" />}
                {customer.engagementTrend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Streak</span>
              <div className="text-lg font-black text-orange-600 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{customer.streakDays}d</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Net Weight</span>
              <div className="text-lg font-black text-emerald-600">
                -{(customer.startWeightKg - customer.currentWeightKg).toFixed(1)} kg
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">Total LTV</span>
              <div className="text-lg font-black text-slate-900">{formatINR(customer.totalSpent)}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Goals', icon: Compass },
            { id: 'progress', label: 'Weight & Biometrics', icon: Activity },
            { id: 'messages', label: `Messages (${customer.messages.length})`, icon: MessageSquare },
            { id: 'purchases', label: `Purchases (${customer.purchases.length})`, icon: ShoppingBag },
            { id: 'referrals', label: `Referrals (${customer.referralsGenerated})`, icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap",
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview & Goals */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Current Program Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Current Active Program
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{customer.programName}</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">
                    Day {customer.programDay} of {customer.programTotalDays}
                  </div>
                  <span className="text-[11px] text-slate-500">{customer.daysUntilRenewal} days until renewal</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-medium">
                  <span>{customer.progressPercent}% of curriculum completed</span>
                  <span className="font-bold text-slate-900">Renewal Date: {customer.renewalDate}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${customer.progressPercent}%`,
                      backgroundColor: 'var(--brand-primary)' 
                    }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <span className="font-bold text-slate-700">Primary Transformation Goal:</span>
                <p className="text-slate-600">{customer.primaryGoal}</p>
              </div>
            </div>

            {/* Next Recommended Journey (Long-Term Progression) */}
            <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-purple-500 text-white">
                    Next Recommended Journey
                  </span>
                </div>
                <span className="text-xs text-purple-300 font-semibold">Phase 2 Transition</span>
              </div>
              <h4 className="text-base font-bold">{customer.nextRecommendedJourney || 'Strength & Conditioning Phase 2'}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upon completing Day 60 fat loss goals, client is primed for muscle accrual and metabolic stability. Propose transition 7 days before program end.
              </p>
              <button 
                onClick={() => {
                  setModalAction('message');
                  setModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Propose Next Journey to {customer.name.split(' ')[0]}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Recent App Activity & Logs</h3>
              <div className="space-y-2.5">
                {customer.recentActivities.map((act) => (
                  <div key={act.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-800">{act.action}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Coach Notes & Risk Reasons */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Status & Early Warning Signals</h3>
              <div className="space-y-2">
                {customer.statusReasons.map((r, i) => (
                  <div key={i} className="text-xs p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-900 font-medium flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Coach Confidential Notes</h3>
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed border border-slate-100">
                {customer.notes || 'Client is responsive to direct audio check-ins. Watch for travel slip-ups.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Weight & Biometrics Chart */}
      {activeTab === 'progress' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Weight Progression & Body Fat Trend</h3>
              <p className="text-xs text-slate-500">
                Starting: {customer.startWeightKg} kg → Current: {customer.currentWeightKg} kg → Target: {customer.targetWeightKg} kg
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              -{(customer.startWeightKg - customer.currentWeightKg).toFixed(1)} kg Lost
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customer.weightHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#94A3B8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
                  formatter={(val: any) => [`${val} kg`, 'Weight']}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="var(--brand-primary)" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: 'var(--brand-primary)', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 3: Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">In-App Chat History with {customer.name}</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-100">
            {customer.messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "p-3 rounded-2xl max-w-md text-xs",
                  m.sender === 'coach'
                    ? "ml-auto bg-slate-900 text-white rounded-tr-xs"
                    : "mr-auto bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-2xs"
                )}
              >
                <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 mb-1">
                  <span>{m.sender === 'coach' ? 'Coach Kavya' : customer.name}</span>
                  <span>{m.timestamp}</span>
                </div>
                <p className="leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder={`Send message to ${customer.name}...`}
              className="flex-1 text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Purchases */}
      {activeTab === 'purchases' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Customer Purchase Ledger</h3>
            <span className="text-xs font-bold text-slate-800">Total Spent: {formatINR(customer.totalSpent)}</span>
          </div>

          <div className="space-y-2">
            {customer.purchases.map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{p.item}</div>
                  <div className="text-[11px] text-slate-500 capitalize">{p.type} · {p.date}</div>
                </div>
                <span className="font-bold text-slate-800">{formatINR(p.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Referrals Generated */}
      {activeTab === 'referrals' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Referrals Originating from {customer.name}</h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-2xl font-black text-slate-900">{customer.referralsGenerated}</div>
              <div className="text-xs text-slate-500">Friends Invited</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="text-2xl font-black text-emerald-700">{customer.referralsConverted}</div>
              <div className="text-xs text-emerald-800 font-semibold">Paying Customers Converted</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Quick Actions */}
      {modalOpen && (
        <QuickActionModal
          customer={customer}
          initialAction={modalAction}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
