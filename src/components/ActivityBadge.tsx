import { ActivityStatus } from '@/lib/types';
import { Flame, Zap, Clock } from 'lucide-react';

interface ActivityBadgeProps {
  activity: ActivityStatus;
}

export default function ActivityBadge({ activity }: ActivityBadgeProps) {
  const { level } = activity;

  if (level === 'Highly Active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
        </span>
        <Flame className="h-3 w-3 text-emerald-700" />
        <span className="tracking-wide">High Velocity</span>
      </span>
    );
  }

  if (level === 'Active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        <Zap className="h-3 w-3 text-amber-600" />
        <span className="tracking-wide">Active</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      <Clock className="h-3 w-3 text-slate-500" />
      <span className="tracking-wide">{level}</span>
    </span>
  );
}

export function LastActiveIndicator({ activity }: ActivityBadgeProps) {
  const { lastActiveDaysAgo, isRecentlyActive } = activity;

  const daysText =
    lastActiveDaysAgo === 0
      ? 'Active today'
      : lastActiveDaysAgo === 1
      ? 'Active yesterday'
      : `Active ${lastActiveDaysAgo}d ago`;

  return (
    <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isRecentlyActive
            ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)] animate-pulse'
            : 'bg-slate-400'
        }`}
        title={isRecentlyActive ? 'Active within last 7 days' : 'Inactive in last 7 days'}
      />
      <span>{daysText}</span>
    </div>
  );
}
