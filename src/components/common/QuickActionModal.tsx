'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';
import { MessageSquare, Calendar, Award, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuickActionModalProps {
  customer: Customer | null;
  initialAction?: 'message' | 'challenge' | 'review' | null;
  onClose: () => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  customer,
  initialAction = 'message',
  onClose,
}) => {
  const { sendActionToCustomer } = useApp();
  const [activeTab, setActiveTab] = useState<'message' | 'challenge' | 'review'>(initialAction || 'message');
  const [messageText, setMessageText] = useState(
    customer ? `Hey ${customer.name.split(' ')[0]}, noticed you were off the app for a couple days. How is your week going? Let me know if you need to adjust any daily missions!` : ''
  );
  const [selectedChallenge, setSelectedChallenge] = useState('3-Day Hydration & Breakfast Reset');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 4:00 PM');
  const [submitted, setSubmitted] = useState(false);

  if (!customer) return null;

  const handleSend = () => {
    if (activeTab === 'message') {
      sendActionToCustomer(customer.id, 'Direct Coach Message', messageText);
    } else if (activeTab === 'challenge') {
      sendActionToCustomer(customer.id, `Assigned Challenge: ${selectedChallenge}`);
    } else {
      sendActionToCustomer(customer.id, `1:1 Review Call Scheduled for ${selectedDate}`);
    }
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Take Action: {customer.name}</h3>
              <p className="text-xs text-slate-500">{customer.programName} · Day {customer.programDay} of {customer.programTotalDays}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group shrink-0"
            title="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Action Dispatched!</h4>
            <p className="text-xs text-slate-500">
              {customer.name} received an instant notification in their client app.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('message')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all",
                  activeTab === 'message' ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-900"
                )}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
              <button
                onClick={() => setActiveTab('challenge')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all",
                  activeTab === 'challenge' ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-900"
                )}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Assign Challenge</span>
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all",
                  activeTab === 'review' ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500 hover:text-slate-900"
                )}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Review</span>
              </button>
            </div>

            {/* Tab 1: Message */}
            {activeTab === 'message' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Coach Direct Message (App + WhatsApp)</label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  placeholder="Type an encouraging note or advice..."
                />
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Quick template:</span>
                  <button
                    type="button"
                    onClick={() => setMessageText(`Hey ${customer.name.split(' ')[0]}! Checking in on your nutrition today. Remember, small consistency beats perfection!`)}
                    className="text-[11px] text-emerald-600 hover:underline"
                  >
                    Encourage
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => setMessageText(`Hi ${customer.name.split(' ')[0]}, saw you missed two check-ins. Let’s do a quick 5-min phone call today to remove any road blocks!`)}
                    className="text-[11px] text-emerald-600 hover:underline"
                  >
                    Urgent Re-engagement
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Challenge */}
            {activeTab === 'challenge' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Choose a Micro-Challenge</label>
                <div className="space-y-2">
                  {[
                    { id: 'c-1', name: '3-Day Hydration & Breakfast Reset', desc: '1L water upon waking + 30g protein breakfast check-in for 3 days.', points: 150 },
                    { id: 'c-2', name: 'Weekend 10k Steps Streak', desc: 'Hit 10,000 steps Saturday & Sunday to revive activity streak.', points: 200 },
                    { id: 'c-3', name: 'Sugar-Free Sprint (5 Days)', desc: 'Cut liquid sugars and dessert to overcome weight plateau.', points: 250 },
                  ].map((ch) => (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChallenge(ch.name)}
                      className={cn(
                        "p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between",
                        selectedChallenge === ch.name
                          ? "border-emerald-500 bg-emerald-50/50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{ch.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{ch.desc}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        +{ch.points} XP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Review Call */}
            {activeTab === 'review' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700">Select Call Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Today, 6:00 PM',
                    'Tomorrow, 11:00 AM',
                    'Tomorrow, 4:00 PM',
                    'Friday, 5:30 PM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedDate(slot)}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-medium text-center transition-all",
                        selectedDate === slot
                          ? "border-emerald-500 bg-emerald-500 text-white font-bold"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">
                  Sends a calendar invite and WhatsApp Google Meet / Zoom link automatically.
                </p>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
