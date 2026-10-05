'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { Customer, CustomerStatus } from '../../types';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Flame, 
  Sparkles, 
  ArrowUpDown, 
  Download, 
  UserPlus, 
  ExternalLink 
} from 'lucide-react';
import { cn, formatINR } from '../../lib/utils';

export const CustomersListScreen: React.FC = () => {
  const { customers, openCustomer360, setCoachScreen } = useApp();
  const [filterChip, setFilterChip] = useState<'All' | 'Active' | 'At Risk' | 'New' | 'Renewal Due' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'engagement' | 'renewal' | 'streak'>('engagement');

  const filterCustomers = customers.filter(c => {
    // Search
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter Chips
    if (filterChip === 'All') return true;
    if (filterChip === 'Active') return c.programDay <= c.programTotalDays;
    if (filterChip === 'At Risk') return c.status === 'declining' || c.status === 'high-risk';
    if (filterChip === 'New') return c.programDay <= 7;
    if (filterChip === 'Renewal Due') return c.status === 'renewal' || c.daysUntilRenewal <= 7;
    if (filterChip === 'Completed') return c.status === 'next-journey' || c.progressPercent >= 95;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Customer Roster ({customers.length})</h2>
          <p className="text-xs text-slate-500">
            Click any client row to open their full Customer 360° Profile & Progress logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCoachScreen('retention-radar')}
            className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>View Retention Radar</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {(['All', 'Active', 'At Risk', 'New', 'Renewal Due', 'Completed'] as const).map((chip) => (
              <button
                key={chip}
                onClick={() => setFilterChip(chip)}
                className={cn(
                  "text-xs px-3 py-1.5 rounded-xl border transition-all font-medium",
                  filterChip === chip
                    ? "bg-slate-900 text-white border-slate-900 font-bold shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                )}
              >
                {chip}
                {chip === 'At Risk' && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
                    9
                  </span>
                )}
                {chip === 'Renewal Due' && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-blue-500 text-white text-[10px]">
                    6
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, city..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Customer & City</th>
                <th className="py-3.5 px-4">Journey & Day</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Engagement</th>
                <th className="py-3.5 px-4">Streak</th>
                <th className="py-3.5 px-4">Renewal In</th>
                <th className="py-3.5 px-4 text-right">Referrals</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filterCustomers.map((cust) => {
                const isRohan = cust.id === 'cust-1';

                return (
                  <tr
                    key={cust.id}
                    onClick={() => openCustomer360(cust.id)}
                    className={cn(
                      "hover:bg-slate-50/80 transition-colors cursor-pointer group",
                      isRohan && "bg-amber-50/30"
                    )}
                  >
                    {/* Customer & Avatar */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cust.avatar}
                          alt={cust.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                            <span>{cust.name}</span>
                            {isRohan && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                                Persona
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">{cust.city}</div>
                        </div>
                      </div>
                    </td>

                    {/* Journey & Day */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 line-clamp-1">{cust.programName}</div>
                      <div className="text-[11px] text-slate-500">
                        Day {cust.programDay} of {cust.programTotalDays} ({cust.progressPercent}%)
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={cust.status} size="sm" />
                    </td>

                    {/* Engagement */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold",
                          cust.engagementScore >= 80 ? "text-emerald-600" :
                          cust.engagementScore >= 50 ? "text-amber-600" : "text-rose-600"
                        )}>
                          {cust.engagementScore}%
                        </span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              cust.engagementScore >= 80 ? "bg-emerald-500" :
                              cust.engagementScore >= 50 ? "bg-amber-500" : "bg-rose-500"
                            )}
                            style={{ width: `${cust.engagementScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                        <span>{cust.streakDays}d</span>
                      </div>
                    </td>

                    {/* Renewal In */}
                    <td className="py-3.5 px-4">
                      <span className={cn(
                        "text-[11px] font-semibold",
                        cust.daysUntilRenewal <= 5 ? "text-rose-600 font-bold" : "text-slate-600"
                      )}>
                        {cust.daysUntilRenewal} days
                      </span>
                    </td>

                    {/* Referrals */}
                    <td className="py-3.5 px-4 text-right">
                      <span className={cn(
                        "text-xs font-bold",
                        cust.referralsGenerated > 0 ? "text-emerald-700" : "text-slate-400"
                      )}>
                        {cust.referralsGenerated} sent
                      </span>
                    </td>

                    {/* Action Arrow */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCustomer360(cust.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Open 360 View"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
