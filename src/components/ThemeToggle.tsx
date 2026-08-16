import React from 'react';
import { Sun, Moon, Eye, Sparkles } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  compact?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  compact = false,
  className = ''
}) => {
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        id="theme-toggle-compact-btn"
        type="button"
        onClick={onToggle}
        aria-label={isDark ? 'Switch to Sky-Blue Light Mode' : 'Switch to High-Contrast Dark Mode for Light Sensitivity'}
        title={isDark ? 'Switch to Sky-Blue Light Mode' : 'Switch to High-Contrast Dark Mode (Light Sensitive / Reduced Glare)'}
        className={`relative p-2 rounded-2xl transition-all duration-300 flex items-center justify-center ${
          isDark 
            ? 'bg-slate-800 text-sky-300 border border-slate-700 hover:bg-slate-700 hover:text-sky-200 shadow-sm' 
            : 'bg-sky-50/90 text-sky-700 border border-sky-200/80 hover:bg-sky-100 shadow-2xs'
        } ${className}`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-500" />
        )}
      </button>
    );
  }

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to Sky-Blue Light Mode' : 'Switch to High-Contrast Dark Mode for Light Sensitivity'}
      title={isDark ? 'Switch to Sky-Blue Light Mode' : 'Anti-Glare High-Contrast Dark Mode for Light-Sensitive Eyes'}
      className={`group relative flex items-center space-x-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-300 border bento-lift-subtle ${
        isDark 
          ? 'bg-slate-800/90 text-sky-300 border-slate-700 hover:border-sky-500/50 shadow-sm' 
          : 'bg-sky-50/90 text-slate-700 border-sky-200/80 hover:bg-sky-100/80 shadow-2xs'
      } ${className}`}
    >
      <div className={`w-5 h-5 rounded-xl flex items-center justify-center transition-transform duration-300 ${
        isDark ? 'bg-sky-500/20 text-sky-300 rotate-12' : 'bg-amber-100 text-amber-600 rotate-0'
      }`}>
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-sky-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </div>

      <div className="flex flex-col text-left leading-tight hidden xl:flex">
        <span className="text-[11px] font-bold">
          {isDark ? 'High-Contrast Dark' : 'Sky-Blue Light'}
        </span>
        <span className="text-[9px] font-medium opacity-75">
          {isDark ? 'Anti-Glare Active' : 'Light-Sensitive Mode'}
        </span>
      </div>

      <span className="xl:hidden text-xs font-bold">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
