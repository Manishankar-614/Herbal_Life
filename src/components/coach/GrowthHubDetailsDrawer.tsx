'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  QrCode, 
  Eye, 
  ExternalLink, 
  Users, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  Flame,
  Award,
  Calendar,
  Sliders,
  Download,
  Check
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

export interface GrowthHubItem {
  id: string;
  title: string;
  category: 'magnet' | 'challenge' | 'win' | 'referral' | 'source';
  tagline?: string;
  views?: number;
  leads?: number;
  conversion?: number;
  link?: string;
  badge?: string;
  duration?: string;
  participants?: number;
  mission?: string;
  reward?: string;
}

interface GrowthHubDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: GrowthHubItem | null;
  onPreview?: () => void;
  onShowQr?: () => void;
  onShareWhatsApp?: () => void;
  onShareInstagram?: () => void;
}

export const GrowthHubDetailsDrawer: React.FC<GrowthHubDetailsDrawerProps> = ({
  isOpen,
  onClose,
  item,
  onPreview,
  onShowQr,
  onShareWhatsApp,
  onShareInstagram,
}) => {
  const { showNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'leads' | 'settings'>('analytics');

  if (!isOpen || !item) return null;

  const handleCopyLink = () => {
    const url = item.link ? `https://${item.link}` : 'https://kavyawellness.coachos.app';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopied(true);
    showNotification('Campaign link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock leads captured specifically by this asset
  const recentLeads = [
    { name: 'Vikram Rao', phone: '+91 98450 12891', date: 'Today, 2:15 PM', status: 'Hot Intent', score: 68 },
    { name: 'Priya Sharma', phone: '+91 98201 44321', date: 'Yesterday', status: 'Engaged', score: 82 },
    { name: 'Rahul Verma', phone: '+91 97112 55902', date: '2 days ago', status: 'Completed Quiz', score: 54 },
    { name: 'Sunita Das', phone: '+91 99001 88412', date: '3 days ago', status: 'Consultation Pending', score: 76 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-lg bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {item.category.toUpperCase()}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {item.badge}
                  </span>
                )}
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 mt-1.5 leading-tight">
                {item.title}
              </h2>
              {item.tagline && (
                <p className="text-xs text-slate-500 mt-0.5">{item.tagline}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group shrink-0"
              title="Back to Growth Hub"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center border-b border-slate-100 px-5 gap-6 text-xs font-semibold bg-white shrink-0">
            <button
              onClick={() => setActiveTab('analytics')}
              className={cn(
                "py-3 border-b-2 transition-all cursor-pointer",
                activeTab === 'analytics'
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              Funnel Analytics
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={cn(
                "py-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === 'leads'
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              <span>Captured Leads</span>
              <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded-full font-bold text-slate-700">
                {item.leads || 186}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                "py-3 border-b-2 transition-all cursor-pointer",
                activeTab === 'settings'
                  ? "border-emerald-600 text-emerald-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              )}
            >
              Asset Settings
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {activeTab === 'analytics' && (
              <>
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      Total Views
                    </span>
                    <span className="text-lg font-black text-slate-900 mt-1 block">
                      {(item.views || 1240).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18% this wk</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">
                      Leads Captured
                    </span>
                    <span className="text-lg font-black text-emerald-800 mt-1 block">
                      {item.leads || 186}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">100% Verified</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                    <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">
                      Conversion %
                    </span>
                    <span className="text-lg font-black text-amber-800 mt-1 block">
                      {item.conversion || 15.0}%
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold">High benchmark</span>
                  </div>
                </div>

                {/* Conversion Funnel Breakdown */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Funnel Drop-off Analysis</span>
                    <span className="text-[10px] text-slate-400 font-normal">Last 30 Days</span>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">1. Link Impression / Landing Page</span>
                        <span className="font-bold text-slate-900">1,240 (100%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-slate-800 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">2. Quiz / Form Started</span>
                        <span className="font-bold text-slate-900">682 (55.0%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '55%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">3. Contact Details Submitted</span>
                        <span className="font-bold text-slate-900">186 (15.0%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-600">4. Converted to Paid Consultation</span>
                        <span className="font-bold text-emerald-600">42 (3.4%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '8%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth & Distribution Actions */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Distribution & Lead Capture Channels
                  </h4>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={onShareWhatsApp}
                      className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Broadcast</span>
                    </button>

                    <button
                      onClick={onShareInstagram}
                      className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Instagram Sticker</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    <button
                      onClick={onShowQr}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 text-slate-500" />
                      <span>Show QR</span>
                    </button>

                    <button
                      onClick={onPreview}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Live Preview</span>
                    </button>
                  </div>
                </div>

                {/* Lead Nurture Automation Note */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-indigo-950">
                    <span className="font-bold">Automated Day 1, 3 & 7 WhatsApp Sequence:</span>
                    <p className="text-indigo-800/90 text-[11px] mt-0.5">
                      New leads capturing this magnet receive a personalized health score breakdown within 90 seconds.
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Showing recent verified intake submissions</span>
                  <button 
                    onClick={() => showNotification('Exported 186 leads as CSV', 'success')}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
                  {recentLeads.map((lead, i) => (
                    <div key={i} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{lead.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Score: {lead.score}/100
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{lead.phone}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{lead.date} · {lead.status}</div>
                      </div>

                      <button
                        onClick={() => showNotification(`Opened WhatsApp chat with ${lead.name}`, 'success')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>Chat</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Campaign Calibration</h4>
                  
                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Campaign Public Title</label>
                    <input
                      type="text"
                      defaultValue={item.title}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-semibold block mb-1">Direct Custom Subdomain Route</label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 font-mono text-[11px]">
                        kavyawellness.coachos.app/
                      </span>
                      <input
                        type="text"
                        defaultValue={item.link ? item.link.split('/')[1] || 'score' : 'score'}
                        className="flex-1 px-3 py-2 rounded-r-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        showNotification('Campaign settings updated!', 'success');
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
                    >
                      Save Campaign Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Actions */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Growth Hub</span>
            </button>

            <button
              onClick={onPreview}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Launch Live Preview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
