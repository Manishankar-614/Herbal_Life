'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Bell, 
  Calendar, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sliders,
  Check,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CoachNotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenMeetup?: () => void;
  onOpenMeetupModal?: () => void;
}

export const CoachNotificationsPanel: React.FC<CoachNotificationsPanelProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenMeetup,
  onOpenMeetupModal,
}) => {
  const { setCoachScreen, showNotification } = useApp();
  const [filter, setFilter] = useState<'all' | 'meetups' | 'retention' | 'broadcasts'>('all');
  const [readIds, setReadIds] = useState<string[]>([]);

  const handleMeetupClick = onOpenMeetup || onOpenMeetupModal;

  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      category: 'meetups' as const,
      type: 'meetup',
      title: '14 RSVPs Confirmed for 15-Day Offline Meetup',
      desc: 'Rohan Deshpande, Vikram Rao & 12 others confirmed attendance for Saturday at Indiranagar Studio (10:30 AM). InBody scans pre-queued.',
      time: '18m ago',
      unread: true,
      actionLabel: 'Open Meetup Roster',
      action: () => {
        onClose();
        if (handleMeetupClick) handleMeetupClick();
      },
      iconBg: 'bg-emerald-100 text-emerald-700',
      icon: '🤝'
    },
    {
      id: 'notif-2',
      category: 'retention' as const,
      type: 'retention',
      title: 'Retention Guard: Vikram Rao Missed 3 Check-ins',
      desc: 'Engagement dropped below 50%. A non-intrusive morning reminder is scheduled for 7:00 AM under the max-3-notifications policy.',
      time: '1h ago',
      unread: true,
      actionLabel: 'View in Retention Radar',
      action: () => {
        onClose();
        setCoachScreen('retention-radar');
      },
      iconBg: 'bg-rose-100 text-rose-700',
      icon: '🚨'
    },
    {
      id: 'notif-3',
      category: 'broadcasts' as const,
      type: 'broadcast',
      title: 'Morning Schedule & Daily Missions Dispatched',
      desc: 'Delivered to all 86 active clients at 7:00 AM. 42 clients have already logged their lemon water hydration mission.',
      time: '5h ago',
      unread: false,
      actionLabel: 'Cadence Policy',
      action: () => {
        onClose();
        if (onOpenSettings) onOpenSettings();
      },
      iconBg: 'bg-blue-100 text-blue-700',
      icon: '🌅'
    },
    {
      id: 'notif-4',
      category: 'broadcasts' as const,
      type: 'broadcast',
      title: 'Yesterday\'s Evening Wrap-Up Complete',
      desc: '74 of 86 clients completed all daily milestones (86% adherence). 12-day streak extended for Rohan Deshpande.',
      time: '16h ago',
      unread: false,
      actionLabel: null,
      action: null,
      iconBg: 'bg-purple-100 text-purple-700',
      icon: '🌙'
    },
    {
      id: 'notif-5',
      category: 'retention' as const,
      type: 'system',
      title: 'Subscription Status: Growth Pro Plan Active',
      desc: 'Your monthly cycle renews on Oct 24, 2026 (₹9,999/mo). 86/100 active client capacity utilized.',
      time: '1d ago',
      unread: false,
      actionLabel: 'Manage Subscription',
      action: () => {
        onClose();
        if (onOpenSettings) onOpenSettings();
      },
      iconBg: 'bg-slate-100 text-slate-700',
      icon: '💳'
    },
  ];

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.category === filter;
  });

  const markAllRead = () => {
    setReadIds(notifications.map(n => n.id));
    showNotification('All notifications marked as read', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex justify-end animate-in fade-in duration-150 font-sans">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Panel Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center relative shadow-xs">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications & Alerts</h3>
              <p className="text-[11px] text-slate-500">Live operational & retention pulse</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={markAllRead}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-semibold px-2"
              title="Mark all as read"
            >
              Mark Read
            </button>
            <button 
              onClick={onClose} 
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
              title="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap",
              filter === 'all'
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            All (5)
          </button>
          <button
            onClick={() => setFilter('meetups')}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1",
              filter === 'meetups'
                ? "bg-emerald-600 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            )}
          >
            <span>🤝 Meetups</span>
          </button>
          <button
            onClick={() => setFilter('retention')}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1",
              filter === 'retention'
                ? "bg-rose-600 text-white"
                : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            )}
          >
            <span>🚨 Retention</span>
          </button>
          <button
            onClick={() => setFilter('broadcasts')}
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1",
              filter === 'broadcasts'
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-800 hover:bg-blue-100"
            )}
          >
            <span>🌅 Broadcasts</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filteredNotifs.map((n) => {
            const isRead = readIds.includes(n.id) || !n.unread;

            return (
              <div 
                key={n.id}
                className={cn(
                  "p-4 rounded-2xl transition-all space-y-2 relative group",
                  !isRead ? "bg-slate-50/80 hover:bg-slate-100/60" : "hover:bg-slate-50/50"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">{n.title}</h4>
                        {!isRead && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{n.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-medium shrink-0 whitespace-nowrap">
                    {n.time}
                  </span>
                </div>

                {n.actionLabel && n.action && (
                  <div className="pl-8 pt-1">
                    <button
                      onClick={n.action}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                    >
                      <span>{n.actionLabel}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Cadence Policy CTA */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Customer Non-Annoyance Guard</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Max 3-4/day</span>
          </div>
          <button
            onClick={() => {
              onClose();
              if (onOpenSettings) onOpenSettings();
            }}
            className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-800 shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Configure Cadence & Meetup Timings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
