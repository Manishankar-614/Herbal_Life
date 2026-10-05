'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Sparkles, 
  Clock, 
  Users, 
  Activity, 
  Award,
  ChevronRight,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface OfflineMeetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineMeetupModal: React.FC<OfflineMeetupModalProps> = ({ isOpen, onClose }) => {
  const { showNotification } = useApp();
  const [selectedAuditClient, setSelectedAuditClient] = useState<string | null>(null);

  if (!isOpen) return null;

  const meetupAttendees = [
    {
      id: 'cust-1',
      name: 'Rohan Deshpande',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      journey: 'Weight Transformation · Day 34 of 60',
      loggedWeight: '82.4 kg',
      inPersonWeight: '82.2 kg',
      bodyFatChange: '-2.7% (22.1% → 19.4%)',
      status: 'verified' as const,
      auditVerdict: 'Genuine Adherence (100% Honest)',
      auditNotes: 'True fat loss matches logged 450 kcal deficit. Muscle mass preserved via 120g protein adherence.',
      rsvp: 'Confirmed (Will arrive 10:30 AM)'
    },
    {
      id: 'cust-2',
      name: 'Vikram Rao',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      journey: 'PCOS & Metabolic Reset · Day 18 of 60',
      loggedWeight: '76.0 kg',
      inPersonWeight: '77.8 kg',
      bodyFatChange: '+0.4% (Water retention detected)',
      status: 'discrepancy' as const,
      auditVerdict: 'Dietary Slip Detected (Weekend Splurge)',
      auditNotes: 'InBody scan shows visceral water retention. Client admitted to skipping weekend food logging during family dinner.',
      rsvp: 'Confirmed (Will arrive 11:15 AM)'
    },
    {
      id: 'cust-3',
      name: 'Ananya Iyer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      journey: 'Gut Health & Strength · Day 58 of 60',
      loggedWeight: '59.5 kg',
      inPersonWeight: '59.1 kg',
      bodyFatChange: '-1.8% (Visceral fat down 2 levels)',
      status: 'verified' as const,
      auditVerdict: 'Flawless Execution (Ready for Phase 2)',
      auditNotes: 'Bloating 100% resolved. Tape measurement shows -3.5 cm at waist. Ready for advanced strength journey.',
      rsvp: 'Confirmed (Will arrive 11:45 AM)'
    },
    {
      id: 'cust-4',
      name: 'Meghana Hegde',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      journey: 'Post-Festival Detox · Day 14 of 30',
      loggedWeight: '68.0 kg',
      inPersonWeight: '67.4 kg',
      bodyFatChange: '-1.2% fat loss verified',
      status: 'verified' as const,
      auditVerdict: 'Genuine Progress',
      auditNotes: 'Consistently hitting 10,000 daily steps. Hydration levels optimal on bio-scan.',
      rsvp: 'Confirmed (Will arrive 12:15 PM)'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-3xl w-full shadow-2xl border-0 sm:border border-slate-200 overflow-hidden flex flex-col h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md text-xl">
              🤝
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>Bi-Weekly In-Person Audit</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">15-Day Live Offline Meetup & Progress Review</h3>
              <p className="text-xs text-slate-500">Physically verify client body recomp & audit diet/workout honesty before calibrating the next 15-day cycle</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
        </div>

        {/* Meetup Details Ribbon */}
        <div className="px-6 py-3 bg-emerald-950 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Next Session: This Saturday · 10:30 AM – 1:00 PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Kavya Wellness Studio, 100ft Road, Indiranagar, Bengaluru</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-emerald-300">
            <Users className="w-3.5 h-3.5" />
            <span>14 RSVPs Confirmed</span>
          </div>
        </div>

        {/* Attendee Roster & In-Person Honesty Audit Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saturday In-Person Honesty & Body Recomp Audit</span>
            </h4>
            <span className="text-[11px] text-slate-500">Cross-checking logged data vs InBody scans</span>
          </div>

          <div className="space-y-3">
            {meetupAttendees.map((att) => (
              <div
                key={att.id}
                className={cn(
                  "p-4 rounded-2xl border transition-all space-y-3",
                  att.status === 'verified' 
                    ? "border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40" 
                    : "border-amber-300 bg-amber-50/30 hover:bg-amber-50/50"
                )}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img src={att.avatar} alt={att.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{att.name}</span>
                        <span className={cn(
                          "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                          att.status === 'verified' ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"
                        )}>
                          {att.auditVerdict}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{att.journey}</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {att.rsvp}
                  </span>
                </div>

                {/* Metrics Comparison Row */}
                <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">App Logged Weight</span>
                    <span className="font-bold text-slate-700">{att.loggedWeight}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Measured in Studio</span>
                    <span className="font-black text-slate-900">{att.inPersonWeight}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">InBody Scan Fat Recomp</span>
                    <span className={cn("font-black", att.status === 'verified' ? "text-emerald-700" : "text-amber-700")}>
                      {att.bodyFatChange}
                    </span>
                  </div>
                </div>

                {/* Coach Audit Notes & Calibration */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <p className="text-[11px] text-slate-600 italic">
                    &ldquo;{att.auditNotes}&rdquo;
                  </p>
                  <button
                    onClick={() => showNotification(`Calibrated Phase 2 protocol & sent WhatsApp update to ${att.name}`, 'success')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white font-bold text-[11px] shrink-0 ml-3 transition-colors cursor-pointer"
                  >
                    Calibrate Next 15 Days →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <span className="text-xs text-slate-500">
            Protected by non-annoyance policy · Automatic reminders sent at 5d, 3d, 1d prior
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Dashboard</span>
            </button>
            <button
              onClick={() => {
                showNotification('Broadcasted Saturday check-in reminder & directions link to all 14 confirmed clients on WhatsApp!', 'success');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Meetup Reminder (Touchpoint #3)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
