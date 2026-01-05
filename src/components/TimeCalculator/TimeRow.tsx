import React from 'react';
import { Trash2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface TimeRowProps {
  id: string;
  inTime: string;
  outTime: string;
  onChange: (id: string, field: 'inTime' | 'outTime', value: string) => void;
  onRemove: (id: string) => void;
  className?: string;
  duration?: number | null; // minutes
}

export function TimeRow({ id, inTime, outTime, onChange, onRemove, className, duration }: TimeRowProps) {

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className={twMerge("group flex flex-col sm:flex-row items-center gap-5 p-5 bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-sm dark:shadow-md border border-slate-200 dark:border-white/5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 dark:hover:border-white/10 hover:shadow-md dark:hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-0.5", className)}>
      <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
        <div className="flex-1 relative">
          <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-900 px-2 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest z-10 rounded transition-colors">In Time</label>
          <input
            type="time"
            value={inTime}
            onChange={(e) => onChange(id, 'inTime', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white text-xl font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:light] dark:[color-scheme:dark] hover:border-slate-300 dark:hover:border-slate-600"
          />
        </div>

        <div className="text-slate-400 dark:text-slate-700 sm:block hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </div>

        <div className="flex-1 relative">
          <label className="absolute -top-2.5 left-3 bg-white dark:bg-slate-900 px-2 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest z-10 rounded transition-colors">Out Time</label>
          <input
            type="time"
            value={outTime}
            onChange={(e) => onChange(id, 'outTime', e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 text-slate-900 dark:text-white text-xl font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all [color-scheme:light] dark:[color-scheme:dark] hover:border-slate-300 dark:hover:border-slate-600"
          />
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-4 pl-0 sm:pl-4 border-l border-slate-100 dark:border-white/5 sm:border-l-slate-200 dark:sm:border-l-slate-800 transition-colors">
        {duration !== null && duration !== undefined ? (
          <div className="flex flex-col items-center min-w-[80px]">
            <span className="text-lg font-bold text-slate-700 dark:text-white tracking-tight">{formatDuration(duration)}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold tracking-wider">Duration</span>
          </div>
        ) : (
          <div className="min-w-[80px] text-center text-slate-400 dark:text-slate-600 text-sm italic">
            --
          </div>
        )}

        <button
          onClick={() => onRemove(id)}
          className="p-3 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Remove entry"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
