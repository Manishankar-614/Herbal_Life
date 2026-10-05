import React from 'react';
import { CustomerStatus } from '../../types';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: CustomerStatus;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export const STATUS_CONFIG: Record<CustomerStatus, { label: string; dotColor: string; bgClass: string; textClass: string; borderClass: string; icon: string }> = {
  'healthy': {
    label: 'Healthy',
    dotColor: 'bg-emerald-500',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    icon: '🟢',
  },
  'declining': {
    label: 'Engagement Declining',
    dotColor: 'bg-amber-500',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
    icon: '🟡',
  },
  'follow-up': {
    label: 'Follow-Up Required',
    dotColor: 'bg-orange-500',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-800',
    borderClass: 'border-orange-200',
    icon: '🟠',
  },
  'high-risk': {
    label: 'High Risk',
    dotColor: 'bg-rose-500',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-700',
    borderClass: 'border-rose-200',
    icon: '🔴',
  },
  'renewal': {
    label: 'Renewal Opportunity',
    dotColor: 'bg-blue-500',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
    icon: '🔵',
  },
  'next-journey': {
    label: 'Ready for Next Journey',
    dotColor: 'bg-purple-500',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-200',
    icon: '🟣',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true,
  className,
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['healthy'];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 rounded-full',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-full font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border transition-colors',
        config.bgClass,
        config.textClass,
        config.borderClass,
        sizeClasses[size],
        className
      )}
    >
      {showDot && (
        <span className={cn('w-2 h-2 rounded-full shrink-0 animate-pulse', config.dotColor)} />
      )}
      <span>{config.label}</span>
    </span>
  );
};
