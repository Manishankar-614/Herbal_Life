'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Gift, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  Sparkles, 
  Users, 
  Award, 
  Heart, 
  ChevronRight,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../../lib/utils';

export const CustomerReferralScreen: React.FC = () => {
  const { coach, showNotification, setCustomerTab } = useApp();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://${coach.subdomain}/join?ref=ROHAN12`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    showNotification('Referral link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReferFriendConfetti = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in headless test
    }

    // Share link or open WhatsApp
    const message = encodeURIComponent(
      `Hey! I'm on Day 34 of my transformation with Coach Kavya at ${coach.businessName} and lost 5.6kg! Use my special invite link for ₹250 off your intake assessment: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    showNotification('WhatsApp referral message prepared with your personal code!', 'success');
  };

  return (
    <div className="p-4 space-y-4 pb-12 font-sans">
      {/* Top Header with Back Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCustomerTab('home')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold text-slate-800">Refer a Friend</span>
        <div className="w-14" />
      </div>

      {/* Top Hero Banner */}
      <div 
        className="rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0F172A 0%, var(--brand-primary) 100%)`
        }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Gift className="w-7 h-7 text-amber-300 animate-bounce" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 inline-block mb-1.5 shadow-xs">
          Give ₹250, Get ₹250 Voucher
        </span>

        <h1 className="text-xl font-black tracking-tight">
          Transform Together
        </h1>
        <p className="text-xs text-slate-200 mt-1 max-w-[280px] mx-auto leading-relaxed">
          Invite friends, colleagues, or gym buddies to {coach.businessName}. They get ₹250 off their first program, and you unlock coach rewards!
        </p>
      </div>

      {/* Big Interactive "REFER A FRIEND" CTA */}
      <button
        onClick={handleReferFriendConfetti}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all group"
      >
        <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>REFER A FRIEND VIA WHATSAPP 🚀</span>
      </button>

      {/* Referral Link Copy Box */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <label className="text-xs font-bold text-slate-800 block">
          Your Personal Invitation Link
        </label>
        
        <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="text-xs bg-transparent flex-1 text-slate-700 font-mono outline-none truncate select-all"
          />
          <button
            onClick={handleCopyLink}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all shrink-0",
              copied ? "bg-emerald-600 text-white" : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* QR Code Demo Representation */}
        <div className="pt-2 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 p-2.5 bg-white rounded-2xl border-2 border-slate-200 shadow-xs flex flex-col items-center justify-center">
            {/* SVG stylized QR code */}
            <div className="w-full h-full bg-slate-900 rounded-lg p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-emerald-400" /></div>
                <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-emerald-400" /></div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-[8px] font-bold text-white tracking-widest">KAVYA</span>
              </div>
              <div className="flex justify-between">
                <div className="w-6 h-6 border-2 border-white rounded-xs p-1"><div className="w-full h-full bg-emerald-400" /></div>
                <div className="w-4 h-4 bg-amber-400 rounded-xs" />
              </div>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1.5 font-medium">Scan QR in person to join Rohan&apos;s team</span>
        </div>
      </div>

      {/* Referral Status Card (Required by Prompt) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Your Referrals Summary
        </h3>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-lg font-black text-slate-900">2</div>
            <div className="text-[10px] text-slate-500">Invited</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-lg font-black text-emerald-700">1</div>
            <div className="text-[10px] text-emerald-800 font-semibold">Joined</div>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-lg font-black text-amber-700">1</div>
            <div className="text-[10px] text-amber-800 font-semibold">Reward Earned</div>
          </div>
        </div>

        {/* Referred Friend Activity List */}
        <div className="pt-2 space-y-2">
          <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <div>
                <div className="font-bold text-slate-900">Kunal Shah</div>
                <div className="text-[10px] text-slate-500">Joined Day 14 · Active Streak</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              ₹250 Voucher Unlocked
            </span>
          </div>

          <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <div>
                <div className="font-bold text-slate-900">Amit Joshi</div>
                <div className="text-[10px] text-slate-500">Invite Link Opened (Pending Quiz)</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
