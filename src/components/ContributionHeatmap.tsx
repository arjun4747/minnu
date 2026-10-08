'use client';

import { ContributionData } from '@/lib/types';
import { GitCommit, Sparkles } from 'lucide-react';

interface ContributionHeatmapProps {
  contributions: ContributionData;
}

export default function ContributionHeatmap({ contributions }: ContributionHeatmapProps) {
  const { totalContributions, weeks, months } = contributions;

  // Render a responsive portion of the calendar (last 30 weeks for crisp card layout)
  const displayWeeks = weeks.slice(-30);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
            <GitCommit className="h-3 w-3" />
          </div>
          <span className="text-xs font-bold text-slate-900">
            {totalContributions.toLocaleString()}
            <span className="ml-1 text-[11px] font-normal text-slate-500">contributions this year</span>
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
          <Sparkles className="h-2.5 w-2.5 text-emerald-700" />
          GraphQL Synced
        </span>
      </div>

      <div className="overflow-x-auto pb-1 pt-0.5">
        {/* Month Labels Header */}
        <div className="flex text-[9px] font-mono text-slate-500 mb-1.5 ml-6 space-x-2 select-none">
          {months.slice(-8).map((m, idx) => (
            <span key={idx} className="min-w-[28px] uppercase tracking-wider">
              {m.name}
            </span>
          ))}
        </div>

        <div className="flex items-start gap-1.5">
          {/* Day of Week Row Labels */}
          <div className="flex flex-col justify-between text-[8px] font-mono text-slate-400 h-[72px] pr-1 py-0.5 select-none uppercase">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid Columns (Weeks) */}
          <div className="flex gap-[3px]">
            {displayWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.days.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    title={`${day.count} contributions on ${day.date}`}
                    className={`h-[9px] w-[9px] rounded-[2px] transition-transform duration-150 hover:scale-150 hover:z-10 cursor-pointer ${getHeatmapClass(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-slate-200 text-[10px] text-slate-500">
          <span className="text-[10px] text-slate-500 font-mono">Recent 30 weeks</span>
          <div className="flex items-center gap-1.5 font-mono text-[9px]">
            <span>Less</span>
            <div className="flex gap-[3px]">
              <span className="h-2 w-2 rounded-[2px] heatmap-level-0" />
              <span className="h-2 w-2 rounded-[2px] heatmap-level-1" />
              <span className="h-2 w-2 rounded-[2px] heatmap-level-2" />
              <span className="h-2 w-2 rounded-[2px] heatmap-level-3" />
              <span className="h-2 w-2 rounded-[2px] heatmap-level-4" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHeatmapClass(level: 0 | 1 | 2 | 3 | 4): string {
  switch (level) {
    case 1:
      return 'heatmap-level-1';
    case 2:
      return 'heatmap-level-2';
    case 3:
      return 'heatmap-level-3';
    case 4:
      return 'heatmap-level-4';
    case 0:
    default:
      return 'heatmap-level-0';
  }
}
