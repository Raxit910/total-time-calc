'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md border border-slate-200 dark:border-white/10"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
        <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
