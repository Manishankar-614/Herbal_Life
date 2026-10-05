import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  subtext?: string;
  accentColor?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  subtext,
  accentColor,
  onClick,
  className,
}) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'text-left bg-white rounded-xl border border-slate-200/80 p-3.5 xl:p-4 shadow-2xs hover:shadow-md transition-all duration-200 relative overflow-hidden group min-w-0 w-full flex flex-col justify-between select-none',
        onClick && 'cursor-pointer hover:border-slate-300 active:scale-[0.98]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <div className="space-y-0.5 min-w-0 flex-1">
          <p className="text-[10px] xl:text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate" title={title}>
            {title}
          </p>
          <h3 className="text-lg xl:text-2xl font-black tracking-tight text-slate-900 truncate">
            {value}
          </h3>
        </div>
        <div 
          className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
          style={{ backgroundColor: accentColor ? `${accentColor}15` : 'var(--brand-light)' }}
        >
          <Icon 
            className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" 
            style={{ color: accentColor || 'var(--brand-primary)' }} 
          />
        </div>
      </div>

      {(change || subtext) && (
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-0.5 text-xs min-w-0">
          {change && (
            <div className={cn(
              'inline-flex items-center font-semibold gap-0.5 text-[10px] xl:text-[11px] min-w-0',
              trend === 'up' && 'text-emerald-600',
              trend === 'down' && 'text-rose-600',
              trend === 'neutral' && 'text-slate-600'
            )}>
              {trend === 'up' && <ArrowUpRight className="w-3 h-3 shrink-0" />}
              {trend === 'down' && <ArrowDownRight className="w-3 h-3 shrink-0" />}
              <span className="truncate">{change}</span>
            </div>
          )}
          {subtext && <span className="text-slate-400 text-[9px] xl:text-[10px] truncate" title={subtext}>{subtext}</span>}
        </div>
      )}
    </Component>
  );
};
