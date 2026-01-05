import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Clock } from 'lucide-react';

interface TotalDisplayProps {
  totalMinutes: number;
  className?: string;
}

export function TotalDisplay({ totalMinutes, className }: TotalDisplayProps) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className={twMerge("relative overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-xl dark:shadow-2xl flex items-center justify-between group transition-all duration-300", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
          <Clock size={28} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">Total Time</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Auto-calculated duration</p>
        </div>
      </div>

      <div className="text-right relative z-10">
        <div className="text-5xl font-black tracking-tight flex items-baseline filter drop-shadow-sm dark:drop-shadow-lg transition-all">
          <span className="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:to-slate-400">{hours}</span>
          <span className="text-slate-400 dark:text-slate-600 text-xl font-bold ml-1 mr-3">h</span>
          <span className="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:to-slate-400">{minutes}</span>
          <span className="text-slate-400 dark:text-slate-600 text-xl font-bold ml-1">m</span>
        </div>
      </div>
    </div>
  );
}
