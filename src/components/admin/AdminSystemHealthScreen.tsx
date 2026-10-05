'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  Server, 
  Wifi, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Filter, 
  Database, 
  Lock, 
  Radio, 
  HardDrive,
  MessageSquare,
  Zap,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SystemLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  service: 'AUTH' | 'GATEWAY' | 'SOCKET' | 'WHATSAPP' | 'DATABASE' | 'STORAGE';
  message: string;
  tenantId?: string;
  durationMs?: number;
}

const initialLogs: SystemLogEntry[] = [
  { id: 'log-1', timestamp: '12:04:12', level: 'info', service: 'AUTH', message: 'Coach session refreshed: Kavya Patil (KavyaFit Holistic)', tenantId: 'tenant-kavya-fit', durationMs: 12 },
  { id: 'log-2', timestamp: '12:04:08', level: 'success', service: 'GATEWAY', message: 'Razorpay recurring subscription captured: sub_1048 (₹9,999)', tenantId: 'tenant-kavya-fit', durationMs: 145 },
  { id: 'log-3', timestamp: '12:03:59', level: 'success', service: 'SOCKET', message: 'WebSocket handshake established: client_app_rohan_d (390px mobile)', durationMs: 8 },
  { id: 'log-4', timestamp: '12:03:42', level: 'info', service: 'WHATSAPP', message: 'Meta Cloud API: journey_reminder template delivered to +91 98200 44321', durationMs: 210 },
  { id: 'log-5', timestamp: '12:03:15', level: 'info', service: 'DATABASE', message: 'PostgreSQL read replica sync complete. Replication lag: 3.2ms', durationMs: 4 },
  { id: 'log-6', timestamp: '12:02:48', level: 'success', service: 'STORAGE', message: 'Uploaded client food photo compressed to WebP (1.4MB -> 160KB)', tenantId: 'tenant-ironforge', durationMs: 82 },
  { id: 'log-7', timestamp: '12:02:11', level: 'warn', service: 'GATEWAY', message: 'Dunning alert: Invoice INV-2026-1045 payment retry scheduled for Day 3', tenantId: 'tenant-peakvibe' },
  { id: 'log-8', timestamp: '12:01:30', level: 'info', service: 'AUTH', message: 'Tenant isolation verified: 142 schemas verified against schema migration v2.4.1' },
];

export const AdminSystemHealthScreen: React.FC = () => {
  const { showNotification } = useApp();
  const [logs, setLogs] = useState<SystemLogEntry[]>(initialLogs);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'success' | 'warn' | 'error'>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate background real-time heartbeat logs
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomLogs: Omit<SystemLogEntry, 'id' | 'timestamp'>[] = [
        { level: 'info', service: 'SOCKET', message: `Ping ACK received from ${6200 + Math.floor(Math.random() * 50)} concurrent connections`, durationMs: 14 },
        { level: 'success', service: 'WHATSAPP', message: `WhatsApp webhook: read receipt for intake assessment confirmation`, durationMs: 98 },
        { level: 'info', service: 'DATABASE', message: `Tenant query executed: fetch_retention_radar (25 records)`, tenantId: 'tenant-kavya-fit', durationMs: 18 },
        { level: 'success', service: 'AUTH', message: `JWT token rotation validated for mobile client`, durationMs: 6 },
      ];

      const chosen = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      const newEntry: SystemLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        ...chosen,
      };

      setLogs(prev => [newEntry, ...prev.slice(0, 39)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = logFilter === 'all' || log.level === logFilter;
    const matchesService = serviceFilter === 'all' || log.service === serviceFilter;
    const matchesSearch = 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.tenantId && log.tenantId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesService && matchesSearch;
  });

  const handleRunDiagnostic = () => {
    showNotification('Diagnostic completed: All 142 tenant schemas, Redis caching layer, and gateway webhooks healthy (99.98% SLA)', 'success');
  };

  const handleClearLogs = () => {
    setLogs([]);
    showNotification('System event buffer cleared', 'info');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Platform Utilities · System Logs & Health
            </span>
            <span className="text-xs text-slate-400">99.98% High Availability Uptime</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Infrastructure Telemetry & Live Event Log
          </h1>
          <p className="text-xs text-slate-400">
            Real-time multi-tenant health, edge routing latency, automated gateway webhooks, and live WebSocket streams.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer",
              isLiveStreaming 
                ? "bg-slate-800 text-emerald-400 border-emerald-500/30 hover:bg-slate-700" 
                : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
            )}
          >
            {isLiveStreaming ? <Pause className="w-3.5 h-3.5 text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isLiveStreaming ? 'Live Stream Active' : 'Stream Paused'}</span>
          </button>

          <button
            onClick={handleRunDiagnostic}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Run Health Diagnostic</span>
          </button>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Platform Uptime</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-emerald-400">99.98%</div>
          <p className="text-[11px] text-slate-400 mt-1">Past 90 days · 0 critical outages</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">API Edge Latency</div>
          <div className="text-2xl font-black text-white">38 ms</div>
          <p className="text-[11px] text-emerald-400 mt-1">p95: 72ms · Global CDN Edge</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Active WebSockets</div>
          <div className="text-2xl font-black text-white">6,240 Live</div>
          <p className="text-[11px] text-slate-400 mt-1">Real-time coaching & mobile sync</p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">WhatsApp Cloud API</div>
          <div className="text-2xl font-black text-white">99.7% Delivery</div>
          <p className="text-[11px] text-emerald-400 mt-1">Headroom: 84% below Meta limits</p>
        </div>
      </div>

      {/* Multi-Tenant Security & Infrastructure Status */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Multi-Tenant Architecture & Data Isolation Status</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">PostgreSQL Schemas</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                142 Isolated
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Row-Level Security (RLS) active. Zero cross-tenant data leakage.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Health Data Encryption</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                AES-256
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Blood reports, weight logs & chat transcripts encrypted at rest.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Media Storage S3</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                42.8 GB / 500 GB
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Automatic WebP compression saved 380 GB network bandwidth.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Webhook Queue DLQ</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                0 Failed
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              100% of payment and intake webhooks processed under 500ms.
            </p>
          </div>
        </div>
      </div>

      {/* Live Event Log Console */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Live Event Log Terminal</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
              {filteredLogs.length} events buffered
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Filter logs or tenant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 w-44"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {(['all', 'info', 'success', 'warn', 'error'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLogFilter(lvl)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-md capitalize transition-colors cursor-pointer",
                    logFilter === lvl 
                      ? "bg-amber-500 text-slate-950 font-bold" 
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={handleClearLogs}
              className="px-2.5 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Clear Buffer
            </button>
          </div>
        </div>

        {/* Console Box */}
        <div className="font-mono text-xs bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 h-80 overflow-y-auto space-y-2 select-text">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-500 text-center py-12">
              No matching events in telemetry buffer
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 hover:bg-slate-900/60 p-1.5 rounded transition-colors">
                <span className="text-slate-500 text-[11px] shrink-0 font-mono">[{log.timestamp}]</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0",
                  log.level === 'success' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                  log.level === 'warn' ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                  log.level === 'error' ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                  "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                )}>
                  {log.service}
                </span>
                <span className="text-slate-300 flex-1 leading-relaxed">
                  {log.message}
                  {log.tenantId && (
                    <span className="ml-2 text-slate-500 text-[10px]">({log.tenantId})</span>
                  )}
                </span>
                {log.durationMs && (
                  <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                    {log.durationMs}ms
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
