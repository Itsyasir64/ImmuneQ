import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  BookOpen, 
  HeartHandshake, 
  Bot, 
  Sparkles, 
  FileText, 
  Heart,
  Flame
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  activeTab: 'diseases' | 'logger' | 'care' | 'forum' | 'community' | 'ai';
  setActiveTab: (tab: any) => void;
  onOpenSos?: () => void;
  onOpenDoctorReport?: () => void;
  onOpenDoctorSummary?: () => void;
  flareActive?: boolean;
  activeFlareCount?: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSos,
  onOpenDoctorReport,
  onOpenDoctorSummary,
  flareActive,
  activeFlareCount = 0,
  theme,
  onToggleTheme
}) => {
  const isFlare = flareActive || activeFlareCount > 0;
  const handleOpenDoc = onOpenDoctorSummary || onOpenDoctorReport || (() => {});
  const isForumActive = activeTab === 'forum' || activeTab === 'community';

  return (
    <div className="sticky top-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2 backdrop-blur-md">
      <header className="max-w-7xl mx-auto bento-glass p-3.5 sm:p-4 rounded-[28px] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-3 transition-all duration-300">
        <div className="w-full lg:w-auto flex items-center justify-between">
          {/* Logo & Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveTab('diseases')}
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-sky-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-md shadow-sky-500/25 text-white font-bold text-xl group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg">Q</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Immune<span className="text-sky-600">Q</span>
                </h1>
                <span className="px-2.5 py-0.5 bg-sky-50/90 text-sky-700 text-[11px] font-bold rounded-full uppercase tracking-wider hidden sm:inline-flex border border-sky-100">
                  Care Grid
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">Autoimmune Knowledge • Symptom Pacing • Community</p>
            </div>
          </div>

          {/* Quick Actions (Mobile view) */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} compact />

            <button
              id="mobile-flare-sos-btn"
              onClick={() => {
                if (onOpenSos) onOpenSos();
                else setActiveTab('care');
              }}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-2xl font-bold text-xs transition-all ${
                isFlare 
                  ? 'bg-rose-600 text-white shadow-xs animate-pulse' 
                  : 'bg-rose-50/90 text-rose-700 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>

            <button
              id="mobile-doctor-report-btn"
              onClick={handleOpenDoc}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-sky-300" />
              <span>Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 w-full lg:w-auto overflow-x-auto no-scrollbar py-1 lg:py-0">
          <button
            id="nav-diseases-btn"
            onClick={() => setActiveTab('diseases')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap bento-lift-subtle ${
              activeTab === 'diseases'
                ? 'bg-sky-50/90 text-sky-700 border border-sky-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Diseases</span>
            </span>
          </button>

          <button
            id="nav-logger-btn"
            onClick={() => setActiveTab('logger')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap relative bento-lift-subtle ${
              activeTab === 'logger'
                ? 'bg-sky-50/90 text-sky-700 border border-sky-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-sky-600" />
              <span>Care Log</span>
              {isFlare && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping ml-0.5"></span>
              )}
            </span>
          </button>

          <button
            id="nav-care-btn"
            onClick={() => setActiveTab('care')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap bento-lift-subtle ${
              activeTab === 'care'
                ? 'bg-sky-50/90 text-sky-700 border border-sky-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Care Plans</span>
            </span>
          </button>

          <button
            id="nav-forum-btn"
            onClick={() => setActiveTab('forum')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap bento-lift-subtle ${
              isForumActive
                ? 'bg-sky-50/90 text-sky-700 border border-sky-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <HeartHandshake className="w-4 h-4 text-sky-600" />
              <span>Community</span>
            </span>
          </button>

          <button
            id="nav-ai-btn"
            onClick={() => setActiveTab('ai')}
            className={`px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap bento-lift-subtle ${
              activeTab === 'ai'
                ? 'bg-sky-50/90 text-sky-700 border border-sky-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-sky-600" />
              <span>AI Companion</span>
            </span>
          </button>
        </nav>

        {/* Action CTAs (Desktop view) */}
        <div className="hidden lg:flex items-center space-x-2.5">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            id="header-flare-sos-btn"
            onClick={() => {
              if (onOpenSos) onOpenSos();
              else setActiveTab('care');
            }}
            className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all border bento-lift-subtle ${
              isFlare 
                ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 animate-pulse' 
                : 'bg-rose-50/90 hover:bg-rose-100 text-rose-700 border-rose-200'
            }`}
            title="Quick Flare-Up SOS Action Guide"
          >
            <Flame className="w-4 h-4" />
            <span>Flare SOS</span>
          </button>

          <button
            id="header-doctor-report-btn"
            onClick={handleOpenDoc}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm group bento-lift-subtle"
          >
            <FileText className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />
            <span>Doctor Summary</span>
          </button>
        </div>
      </header>
    </div>
  );
};


