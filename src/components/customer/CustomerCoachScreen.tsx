'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight,
  Star,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const CustomerCoachScreen: React.FC = () => {
  const { coach, selectedCustomer, showNotification, setCustomerTab } = useApp();
  const [chatMessages, setChatMessages] = useState(selectedCustomer.messages);
  const [inputText, setInputText] = useState('');
  const [requestedCall, setRequestedCall] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      id: `cm-${Date.now()}`,
      sender: 'customer' as const,
      text: inputText,
      timestamp: 'Just now',
    };
    setChatMessages([...chatMessages, newMsg]);
    setInputText('');

    // Simulate automated quick response from Coach Kavya
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: `cm-${Date.now() + 1}`,
          sender: 'coach' as const,
          text: `Got your message Rohan! I'm reviewing your latest progress logs and will send audio notes shortly. Keep going strong! 💪`,
          timestamp: 'Just now',
        }
      ]);
      showNotification('Coach Kavya replied to your message!', 'success');
    }, 1500);
  };

  const handleRequestCall = () => {
    setRequestedCall(true);
    showNotification('Call request submitted! Coach Kavya will confirm a 15-min slot today.', 'success');
  };

  return (
    <div className="p-4 space-y-4 pb-12 font-sans">
      {/* Coach Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-3.5">
          <div 
            className="w-14 h-14 rounded-2xl overflow-hidden border-2 shadow-xs shrink-0"
            style={{ borderColor: 'var(--brand-primary)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coach.avatar} alt={coach.name} className="w-full h-full object-cover" />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-extrabold text-slate-900">{coach.name}</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500">{coach.businessName} · Growth Head</p>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>4.98 Rating · 800+ Transformations</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
          {coach.bio}
        </p>

        {/* 1:1 Call Request CTA */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleRequestCall}
            disabled={requestedCall}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs",
              requestedCall
                ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{requestedCall ? 'Call Requested ✓' : 'Request 1:1 Check-In Call'}</span>
          </button>
        </div>
      </div>

      {/* Direct In-App Chat */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">Direct Chat with Coach Kavya</h3>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Replies typically in 20m</span>
        </div>

        {/* Messages Scroll Area */}
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 no-scrollbar text-xs">
          {chatMessages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "p-3 rounded-2xl max-w-[85%] text-xs",
                m.sender === 'customer'
                  ? "ml-auto bg-slate-900 text-white rounded-tr-xs"
                  : "mr-auto bg-slate-100 text-slate-800 rounded-tl-xs"
              )}
            >
              <div className="flex items-center justify-between gap-2 text-[9px] opacity-70 mb-1">
                <span>{m.sender === 'customer' ? 'You (Rohan)' : 'Coach Kavya'}</span>
                <span>{m.timestamp}</span>
              </div>
              <p className="leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="flex gap-2 pt-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Kavya about meals, form..."
            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Current Recommendations & Supplements */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Coach Recommendations for Day 34
        </h3>

        <div className="space-y-2">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Plant Protein Matrix (1kg)</div>
              <div className="text-[10px] text-slate-500">Take 1 scoop post-resistance training</div>
            </div>
            <button
              onClick={() => showNotification('Added Plant Protein Matrix to checkout!', 'success')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold"
            >
              Restock {formatINR(2800)}
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900">Next Journey: Strength & Fitness</div>
              <div className="text-[10px] text-slate-500">Unlock upon finishing 60-day fat loss</div>
            </div>
            <button 
              onClick={() => setCustomerTab('journey')}
              className="text-[10px] font-bold text-emerald-700"
            >
              Preview →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
