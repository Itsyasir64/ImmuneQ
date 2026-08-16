import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DiseasesExplorer } from './components/DiseasesExplorer';
import { SymptomLogger } from './components/SymptomLogger';
import { CareProtocols } from './components/CareProtocols';
import { CommunityForum } from './components/CommunityForum';
import { AiCompanion } from './components/AiCompanion';
import { DoctorSummaryModal } from './components/DoctorSummaryModal';
import { SymptomLogEntry, ForumPost, ForumComment } from './types';
import { INITIAL_FORUM_POSTS } from './data/diseases';
import { ShieldCheck, Heart, Sparkles, BookOpen, Activity, Flame, MessageSquare, Bot } from 'lucide-react';

const INITIAL_SAMPLE_LOGS: SymptomLogEntry[] = [
  {
    id: 'log-1',
    date: new Date(Date.now() - 0 * 86400000).toISOString().split('T')[0],
    timestamp: Date.now() - 0 * 86400000,
    overallEnergy: 5,
    painLevel: 4,
    fatigueLevel: 6,
    brainFogLevel: 5,
    jointStiffnessLevel: 4,
    gutDistressLevel: 3,
    sleepHours: 6.5,
    sleepQuality: 'Fair',
    mood: 'Stable',
    activeSymptoms: ['Cognitive brain fog', 'Morning stiffness > 45m', 'Joint pain & swelling'],
    identifiedTriggers: ['Barometric weather drop / Rain', 'Sleep deprivation (<6 hrs)'],
    medications: [
      { name: 'Levothyroxine (Thyroid)', dose: '75 mcg', taken: true },
      { name: 'Hydroxychloroquine (Plaquenil)', dose: '200 mg', taken: true },
      { name: 'Vitamin D3 + K2', dose: '5000 IU', taken: true }
    ],
    notes: 'Rain front moving in. Knees and wrists aching in the morning. Did 15 mins of gentle vagal box breathing.',
    flareUpActive: false
  },
  {
    id: 'log-2',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    timestamp: Date.now() - 1 * 86400000,
    overallEnergy: 3,
    painLevel: 7,
    fatigueLevel: 8,
    brainFogLevel: 7,
    jointStiffnessLevel: 7,
    gutDistressLevel: 5,
    sleepHours: 5,
    sleepQuality: 'Poor',
    mood: 'Low',
    activeSymptoms: ['Profound fatigue', 'Joint pain & swelling', 'Cognitive brain fog', 'Skin rash / redness'],
    identifiedTriggers: ['High stress / Emotional surge', 'Accidental gluten / dairy ingestion'],
    medications: [
      { name: 'Levothyroxine (Thyroid)', dose: '75 mcg', taken: true },
      { name: 'Hydroxychloroquine (Plaquenil)', dose: '200 mg', taken: true },
      { name: 'Vitamin D3 + K2', dose: '5000 IU', taken: true }
    ],
    notes: 'Acute flare spike after stressful week and dining out. Applied ice packs to wrists and took Epsom salt bath.',
    flareUpActive: true
  },
  {
    id: 'log-3',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    timestamp: Date.now() - 2 * 86400000,
    overallEnergy: 7,
    painLevel: 2,
    fatigueLevel: 3,
    brainFogLevel: 2,
    jointStiffnessLevel: 2,
    gutDistressLevel: 1,
    sleepHours: 8.5,
    sleepQuality: 'Restful',
    mood: 'Good',
    activeSymptoms: [],
    identifiedTriggers: [],
    medications: [
      { name: 'Levothyroxine (Thyroid)', dose: '75 mcg', taken: true },
      { name: 'Hydroxychloroquine (Plaquenil)', dose: '200 mg', taken: true },
      { name: 'Omega-3 EPA/DHA', dose: '2000 mg', taken: true }
    ],
    notes: 'Feeling well rested. Followed strict AIP bone broth meal plan. Walked 30 mins outside in sunlight.',
    flareUpActive: false
  },
  {
    id: 'log-4',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    timestamp: Date.now() - 3 * 86400000,
    overallEnergy: 6,
    painLevel: 3,
    fatigueLevel: 4,
    brainFogLevel: 3,
    jointStiffnessLevel: 3,
    gutDistressLevel: 2,
    sleepHours: 7.5,
    sleepQuality: 'Good',
    mood: 'Stable',
    activeSymptoms: ['Dry eyes / dry mouth'],
    identifiedTriggers: ['Physical overexertion'],
    medications: [
      { name: 'Levothyroxine (Thyroid)', dose: '75 mcg', taken: true },
      { name: 'Hydroxychloroquine (Plaquenil)', dose: '200 mg', taken: true }
    ],
    notes: 'Overexerted slightly during gardening. Used preservative-free eye drops.',
    flareUpActive: false
  },
  {
    id: 'log-5',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    timestamp: Date.now() - 4 * 86400000,
    overallEnergy: 4,
    painLevel: 5,
    fatigueLevel: 6,
    brainFogLevel: 4,
    jointStiffnessLevel: 5,
    gutDistressLevel: 4,
    sleepHours: 6,
    sleepQuality: 'Fair',
    mood: 'Struggling',
    activeSymptoms: ['Morning stiffness > 45m', 'Abdominal bloating / cramps'],
    identifiedTriggers: ['Accidental gluten / dairy ingestion'],
    medications: [
      { name: 'Levothyroxine (Thyroid)', dose: '75 mcg', taken: true },
      { name: 'Hydroxychloroquine (Plaquenil)', dose: '200 mg', taken: true }
    ],
    notes: 'Mild gut irritation after eating takeout soup.',
    flareUpActive: false
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'diseases' | 'logger' | 'care' | 'forum' | 'ai'>('diseases');
  
  // Theme State: 'light' (Sky-blue) vs 'dark' (High-contrast for light sensitivity)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('immuneq_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  });

  // Apply theme class to document element & body
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      localStorage.setItem('immuneq_theme', theme);
    } catch (_) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Stored Logs
  const [logs, setLogs] = useState<SymptomLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('immuneq_symptom_logs');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_LOGS;
    } catch (_) {
      return INITIAL_SAMPLE_LOGS;
    }
  });

  // Stored Forum Posts
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    try {
      const saved = localStorage.getItem('immuneq_forum_posts');
      return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
    } catch (_) {
      return INITIAL_FORUM_POSTS;
    }
  });

  // Forum Condition Filter
  const [forumConditionFilter, setForumConditionFilter] = useState<string | null>(null);

  // AI Prompt Seed
  const [aiPromptSeed, setAiPromptSeed] = useState<string | null>(null);

  // Doctor Summary Modal State
  const [showDoctorSummaryModal, setShowDoctorSummaryModal] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('immuneq_symptom_logs', JSON.stringify(logs));
    } catch (_) {}
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('immuneq_forum_posts', JSON.stringify(posts));
    } catch (_) {}
  }, [posts]);

  // Log handlers
  const handleSaveLog = (newLog: SymptomLogEntry) => {
    setLogs(prev => [newLog, ...prev.filter(l => l.date !== newLog.date)]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  // Forum handlers
  const handleAddPost = (post: ForumPost) => {
    setPosts(prev => [post, ...prev]);
  };

  const handleAddComment = (postId: string, comment: ForumComment) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, comment] };
      }
      return p;
    }));
  };

  const handleToggleReaction = (postId: string, reactionType: 'strength' | 'spoons' | 'helpful' | 'hug') => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const userReactions = p.userReactions || {};
        const isCurrentActive = !!userReactions[reactionType];

        return {
          ...p,
          reactions: {
            ...p.reactions,
            [reactionType]: isCurrentActive 
              ? Math.max(0, p.reactions[reactionType] - 1) 
              : p.reactions[reactionType] + 1
          },
          userReactions: {
            ...userReactions,
            [reactionType]: !isCurrentActive
          }
        };
      }
      return p;
    }));
  };

  // Check if today is an active flare
  const todayDate = new Date().toISOString().split('T')[0];
  const todayLog = logs.find(l => l.date === todayDate);
  const isFlareActive = todayLog ? todayLog.flareUpActive : logs[0]?.flareUpActive || false;

  // Cross-Navigation Helpers
  const handleNavigateToForumWithTag = (conditionName: string) => {
    setForumConditionFilter(conditionName);
    setActiveTab('forum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAiWithPrompt = (prompt: string) => {
    setAiPromptSeed(prompt);
    setActiveTab('ai');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'forum') setForumConditionFilter(null);
        }}
        flareActive={isFlareActive}
        onOpenDoctorSummary={() => setShowDoctorSummaryModal(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'diseases' && (
          <DiseasesExplorer
            onOpenAiChat={handleNavigateToAiWithPrompt}
            onOpenForumFilter={handleNavigateToForumWithTag}
            onOpenCareProtocols={() => setActiveTab('care')}
          />
        )}

        {activeTab === 'logger' && (
          <SymptomLogger
            logs={logs}
            onSaveLog={handleSaveLog}
            onDeleteLog={handleDeleteLog}
            onOpenDoctorSummary={() => setShowDoctorSummaryModal(true)}
          />
        )}

        {activeTab === 'care' && (
          <CareProtocols
            onOpenAiHelper={handleNavigateToAiWithPrompt}
          />
        )}

        {activeTab === 'forum' && (
          <CommunityForum
            posts={posts}
            onAddPost={handleAddPost}
            onAddComment={handleAddComment}
            onToggleReaction={handleToggleReaction}
            filterConditionTag={forumConditionFilter}
          />
        )}

        {activeTab === 'ai' && (
          <AiCompanion
            recentLogs={logs}
            initialPrompt={aiPromptSeed}
            onClearInitialPrompt={() => setAiPromptSeed(null)}
          />
        )}
      </main>

      {/* Doctor Summary Modal */}
      <DoctorSummaryModal
        isOpen={showDoctorSummaryModal}
        onClose={() => setShowDoctorSummaryModal(false)}
        logs={logs}
      />

      {/* Clinical Disclaimer Footer */}
      <footer id="app-footer" className="bento-glass border-t border-sky-100/80 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-sky-500/30">
              Q
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">Immune<span className="text-sky-600">Q</span></span>
              <p className="text-[11px] text-slate-400">Autoimmune Knowledge, Care Pacing & Peer Support Engine</p>
              <p className="text-[11px] font-medium text-slate-600 mt-0.5">Developed by <span className="text-sky-600 font-semibold">Yasir Ali</span></p>
            </div>
          </div>

          <div className="text-center md:text-right max-w-xl text-[11px] text-slate-400 leading-relaxed">
            <p>
              ⚕️ <strong>Medical Disclaimer:</strong> ImmuneQ is an educational resource and self-care tracking platform. Content and AI responses are for informational purposes only and do not constitute medical diagnosis, treatment, or clinical advice. Always consult a qualified rheumatologist or medical provider.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
