'use client';

import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Clock } from 'lucide-react';
import { TimeRow } from '@/components/TimeCalculator/TimeRow';
import { TotalDisplay } from '@/components/TimeCalculator/TotalDisplay';
import { ThemeToggle } from '@/components/ThemeToggle';

interface TimeEntry {
  id: string;
  inTime: string;
  outTime: string;
}

export default function Home() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: '1', inTime: '', outTime: '' },
    { id: '2', inTime: '', outTime: '' },
  ]);

  const [totalMinutes, setTotalMinutes] = useState(0);

  const addEntry = () => {
    setEntries(prev => [
      ...prev,
      { id: crypto.randomUUID(), inTime: '', outTime: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length <= 1) {
      // Keeping logic simple
    }
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: 'inTime' | 'outTime', value: string) => {
    setEntries(prev => prev.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const resetAll = () => {
    setEntries([{ id: crypto.randomUUID(), inTime: '', outTime: '' }]);
  };

  // Helper to parse "HH:mm" to minutes
  const parseTime = (timeStr: string) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    return h * 60 + m;
  };

  const calculateRowDuration = (inTime: string, outTime: string) => {
    const start = parseTime(inTime);
    const end = parseTime(outTime);

    if (start === null || end === null) return null;

    let diff = end - start;
    if (diff < 0) {
      diff += 1440; // Add 24 hours
    }
    return diff;
  };

  useEffect(() => {
    const total = entries.reduce((acc, entry) => {
      const duration = calculateRowDuration(entry.inTime, entry.outTime);
      return acc + (duration || 0);
    }, 0);
    setTotalMinutes(total);
  }, [entries]);

  return (
    <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-4">

      <header className="flex flex-row items-center justify-between pb-2 border-b border-slate-200 dark:border-white/5">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2 transition-colors">
            Time Calculator
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-md transition-colors">Calculate hours effortlessly.</p>
        </div>
        <ThemeToggle />
      </header>

      <TotalDisplay totalMinutes={totalMinutes} className="sticky top-6 z-20 shadow-xl shadow-slate-200/50 dark:shadow-none" />

      <div className="space-y-4">
        {entries.map((entry) => (
          <TimeRow
            key={entry.id}
            id={entry.id}
            inTime={entry.inTime}
            outTime={entry.outTime}
            onChange={updateEntry}
            onRemove={removeEntry}
            duration={calculateRowDuration(entry.inTime, entry.outTime)}
          />
        ))}

        {entries.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 backdrop-blur-sm transition-colors">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Clock size={32} className="text-slate-400 dark:text-slate-600" />
            </div>
            <p className="text-slate-500 mb-6 font-medium">No time entries yet.</p>
            <button
              onClick={addEntry}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 dark:hover:text-blue-300 hover:scale-105 transition-all"
            >
              <Plus size={20} /> Add your first entry
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={addEntry}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 dark:shadow-blue-900/40 active:scale-[0.98]"
        >
          <Plus size={20} />
          Add New Entry
        </button>

        <button
          onClick={resetAll}
          className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3.5 px-6 rounded-xl transition-colors"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

    </main>
  );
}
