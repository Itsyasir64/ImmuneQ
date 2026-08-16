import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Flame, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Check, 
  Pill, 
  Sparkles, 
  FileText, 
  Printer, 
  Copy, 
  Trash2,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SymptomLogEntry } from '../types';
import confetti from 'canvas-confetti';

interface SymptomLoggerProps {
  logs: SymptomLogEntry[];
  onSaveLog: (log: SymptomLogEntry) => void;
  onDeleteLog: (id: string) => void;
  onOpenDoctorSummary: () => void;
}

export const SymptomLogger: React.FC<SymptomLoggerProps> = ({
  logs,
  onSaveLog,
  onDeleteLog,
  onOpenDoctorSummary
}) => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [overallEnergy, setOverallEnergy] = useState<number>(6);
  const [painLevel, setPainLevel] = useState<number>(3);
  const [fatigueLevel, setFatigueLevel] = useState<number>(4);
  const [brainFogLevel, setBrainFogLevel] = useState<number>(3);
  const [jointStiffnessLevel, setJointStiffnessLevel] = useState<number>(3);
  const [gutDistressLevel, setGutDistressLevel] = useState<number>(2);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [sleepQuality, setSleepQuality] = useState<'Poor' | 'Fair' | 'Good' | 'Restful'>('Good');
  const [mood, setMood] = useState<'Struggling' | 'Low' | 'Stable' | 'Good' | 'Energized'>('Stable');
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptomInput, setCustomSymptomInput] = useState('');
  
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [flareUpActive, setFlareUpActive] = useState<boolean>(false);
  const [notes, setNotes] = useState('');

  // Default common medication list
  const [medsList, setMedsList] = useState<{ name: string; dose: string; taken: boolean }[]>([
    { name: 'Thyroid / Hormone Replacement', dose: 'Standard dose', taken: true },
    { name: 'DMARD / Biologic / Immunosuppressant', dose: 'Weekly/Daily', taken: true },
    { name: 'Vitamin D3 + K2', dose: '5,000 IU', taken: true },
    { name: 'Omega-3 / Anti-inflammatory', dose: '2,000 mg', taken: true }
  ]);

  const commonSymptomOptions = [
    'Morning stiffness > 45m',
    'Joint pain & swelling',
    'Cognitive brain fog',
    'Profound fatigue',
    'Dry eyes / dry mouth',
    'Skin rash / redness',
    'Abdominal bloating / cramps',
    'Cold hands / feet (Raynaud)',
    'Muscle weakness',
    'Headache / Migraine'
  ];

  const commonTriggerOptions = [
    'Barometric weather drop / Rain',
    'High stress / Emotional surge',
    'Sleep deprivation (<6 hrs)',
    'Accidental gluten / dairy ingestion',
    'Viral / Bacterial infection',
    'Physical overexertion',
    'Sun / UV exposure'
  ];

  const handleToggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  const handleAddCustomSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSymptomInput.trim() && !selectedSymptoms.includes(customSymptomInput.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptomInput.trim()]);
      setCustomSymptomInput('');
    }
  };

  const handleToggleTrigger = (trig: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trig) ? prev.filter(t => t !== trig) : [...prev, trig]
    );
  };

  const handleToggleMed = (index: number) => {
    setMedsList(prev => prev.map((m, i) => i === index ? { ...m, taken: !m.taken } : m));
  };

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();

    const newLog: SymptomLogEntry = {
      id: `log-${Date.now()}`,
      date,
      timestamp: Date.now(),
      overallEnergy,
      painLevel,
      fatigueLevel,
      brainFogLevel,
      jointStiffnessLevel,
      gutDistressLevel,
      sleepHours,
      sleepQuality,
      mood,
      activeSymptoms: selectedSymptoms,
      identifiedTriggers: selectedTriggers,
      medications: medsList,
      notes,
      flareUpActive
    };

    onSaveLog(newLog);
    setShowLogModal(false);

    // Trigger celebratory confetti for tracking compliance
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (_) {}
  };

  // Analytics & Averages calculation
  const totalLogsCount = logs.length;
  const flareCount = logs.filter(l => l.flareUpActive).length;
  const avgPain = totalLogsCount > 0 
    ? (logs.reduce((acc, l) => acc + l.painLevel, 0) / totalLogsCount).toFixed(1) 
    : '0';
  const avgFatigue = totalLogsCount > 0 
    ? (logs.reduce((acc, l) => acc + l.fatigueLevel, 0) / totalLogsCount).toFixed(1) 
    : '0';
  const avgEnergy = totalLogsCount > 0 
    ? (logs.reduce((acc, l) => acc + l.overallEnergy, 0) / totalLogsCount).toFixed(1) 
    : '0';

  // Trigger frequency map
  const triggerFrequency: { [key: string]: number } = {};
  logs.forEach(l => {
    l.identifiedTriggers?.forEach(t => {
      triggerFrequency[t] = (triggerFrequency[t] || 0) + 1;
    });
  });
  const topTriggers = Object.entries(triggerFrequency).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header & Quick Action Bento Card */}
      <section className="bento-glass p-6 sm:p-7 rounded-[32px] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 bento-lift-subtle">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50/90 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-100">
            <Activity className="w-3.5 h-3.5" />
            <span>Care & Symptom Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Daily Autoimmune Care & Flare Logger
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
            Log daily severity metrics in 60 seconds to detect flare patterns, trigger correlations, and clinical trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            id="open-doctor-summary-btn"
            onClick={onOpenDoctorSummary}
            className="px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all bento-lift-subtle shadow-2xs"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Clinical Summary</span>
          </button>

          <button
            id="new-daily-checkin-btn"
            onClick={() => setShowLogModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-sm shadow-sky-500/20 bento-lift-subtle"
          >
            <Plus className="w-4 h-4" />
            <span>New Daily Check-In</span>
          </button>
        </div>
      </section>

      {/* Analytics Bento Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-[32px] bento-glass shadow-sm space-y-2 bento-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Check-Ins</span>
          <div className="text-3xl font-bold text-slate-900 flex items-center justify-between">
            <span>{totalLogsCount}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50/90 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Active
            </span>
          </div>
          <p className="text-xs text-slate-500">Documented entries</p>
        </div>

        <div className="p-5 rounded-[32px] bento-glass shadow-sm space-y-2 bento-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Pain Score</span>
          <div className="text-3xl font-bold text-slate-900 flex items-center justify-between">
            <span className={Number(avgPain) > 5 ? 'text-amber-600' : 'text-slate-900'}>{avgPain}</span>
            <span className="text-xs font-semibold text-slate-400">/ 10</span>
          </div>
          <p className="text-xs text-slate-500">Clinical pain rating</p>
        </div>

        <div className="p-5 rounded-[32px] bento-glass shadow-sm space-y-2 bento-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Fatigue Level</span>
          <div className="text-3xl font-bold text-slate-900 flex items-center justify-between">
            <span className={Number(avgFatigue) > 5 ? 'text-sky-600' : 'text-slate-900'}>{avgFatigue}</span>
            <span className="text-xs font-semibold text-slate-400">/ 10</span>
          </div>
          <p className="text-xs text-slate-500">Exhaustion severity</p>
        </div>

        <div className="p-5 rounded-[32px] bento-glass shadow-sm space-y-2 bento-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Flare Days</span>
          <div className="text-3xl font-bold text-rose-600 flex items-center justify-between">
            <span>{flareCount}</span>
            <Flame className="w-6 h-6 text-rose-500" />
          </div>
          <p className="text-xs text-slate-500">Flares marked in period</p>
        </div>
      </div>

      {/* Visual Trends & Identified Trigger Correlations Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Severity Sparkline Trend (Col-span 8) */}
        <section className="lg:col-span-8 p-6 sm:p-7 rounded-[32px] bento-glass shadow-sm space-y-5 flex flex-col justify-between bento-lift">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 bg-sky-50/90 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
                Timeline Analytics
              </span>
              <h3 className="font-bold text-slate-900 text-lg mt-1 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                <span>Recent Symptom Severity Trajectory</span>
              </h3>
              <p className="text-xs text-slate-500">Daily Pain & Fatigue tracking</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="flex items-center space-x-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Pain</span>
              </span>
              <span className="flex items-center space-x-1.5 text-sky-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                <span>Fatigue</span>
              </span>
              <span className="flex items-center space-x-1.5 text-teal-600">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span>Energy</span>
              </span>
            </div>
          </div>

          {/* Simple Custom Visual Graph */}
          {logs.length === 0 ? (
            <div className="h-44 flex items-center justify-center text-xs text-slate-400 italic bento-glass-subtle rounded-2xl">
              No logs recorded yet. Complete your first daily check-in above!
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="flex items-end justify-between h-44 gap-2 px-2 border-b border-slate-100/80">
                {logs.slice(-7).map((log) => (
                  <div key={log.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                    {/* Hover tooltip */}
                    <div className="absolute -top-12 bg-slate-900 text-white text-[10px] p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-md">
                      <div>Date: {log.date}</div>
                      <div>Pain: {log.painLevel}/10 | Fatigue: {log.fatigueLevel}/10</div>
                      {log.flareUpActive && <div className="text-rose-300 font-bold">⚠️ Active Flare</div>}
                    </div>

                    <div className="w-full flex items-end justify-center gap-1.5 h-36">
                      {/* Pain bar */}
                      <div 
                        style={{ height: `${(log.painLevel / 10) * 100}%` }}
                        className="w-2.5 sm:w-3.5 bg-rose-400 rounded-t-sm group-hover:bg-rose-500 transition-all" 
                      />
                      {/* Fatigue bar */}
                      <div 
                        style={{ height: `${(log.fatigueLevel / 10) * 100}%` }}
                        className="w-2.5 sm:w-3.5 bg-sky-400 rounded-t-sm group-hover:bg-sky-500 transition-all" 
                      />
                      {/* Energy bar */}
                      <div 
                        style={{ height: `${(log.overallEnergy / 10) * 100}%` }}
                        className="w-2.5 sm:w-3.5 bg-teal-400 rounded-t-sm group-hover:bg-teal-500 transition-all" 
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {log.date.split('-').slice(1).join('/')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Top Triggers Correlation Bento Card (Col-span 4) */}
        <section className="lg:col-span-4 p-6 sm:p-7 rounded-[32px] bento-glass shadow-sm space-y-4 flex flex-col justify-between bento-lift">
          <div>
            <span className="px-3 py-1 bg-amber-50/90 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200/60">
              Correlations
            </span>
            <h3 className="font-bold text-slate-900 text-lg mt-1 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Identified Triggers</span>
            </h3>
            <p className="text-xs text-slate-500">Correlated factors logged before symptom spikes</p>
          </div>

          {topTriggers.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6 text-center bento-glass-subtle rounded-2xl p-4">
              No triggers logged yet. Track sleep, weather, and food to surface correlations.
            </p>
          ) : (
            <div className="space-y-3">
              {topTriggers.map(([triggerName, count], idx) => (
                <div key={idx} className="space-y-1.5 bento-glass-subtle p-3 rounded-2xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{triggerName}</span>
                    <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[11px]">{count}x</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (count / Math.max(1, totalLogsCount)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Historical Logs List (Bento container) */}
      <section className="bento-glass rounded-[32px] p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
              Activity History
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Recorded Care History ({logs.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">Latest first</span>
        </div>

        <div className="space-y-3">
          {logs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            return (
              <div 
                key={log.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all bento-lift-subtle ${
                  log.flareUpActive 
                    ? 'bg-rose-50/70 border-rose-200' 
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedLogId(isExpanded ? null : log.id)}>
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs ${
                      log.flareUpActive ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-700'
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{log.date}</span>
                        {log.flareUpActive && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                            FLARE ACTIVE
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          Mood: {log.mood} • Sleep: {log.sleepHours}h ({log.sleepQuality})
                        </span>
                      </div>
                      
                      {/* Metric Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          Pain: {log.painLevel}/10
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          Fatigue: {log.fatigueLevel}/10
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          Brain Fog: {log.brainFogLevel}/10
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                          Stiffness: {log.jointStiffnessLevel}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLog(log.id);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-white transition-colors"
                      title="Delete log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-700 animate-in fade-in duration-150">
                    {log.activeSymptoms.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Active Symptoms:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {log.activeSymptoms.map((s, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800">
                              • {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {log.identifiedTriggers.length > 0 && (
                      <div>
                        <span className="font-bold text-amber-800 uppercase tracking-wider block mb-1">Triggers Logged:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {log.identifiedTriggers.map((t, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900 font-semibold">
                              ⚡ {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {log.medications && log.medications.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Medications & Supplements:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {log.medications.map((m, i) => (
                            <span key={i} className={`px-2.5 py-1 rounded-lg border ${m.taken ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200 line-through'}`}>
                              💊 {m.name} ({m.dose}) {m.taken ? '✓' : '✗'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {log.notes && (
                      <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
                        <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">Notes:</span>
                        <p className="text-slate-800 italic">{log.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Check-in Modal Form (Bento Rounded) */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 flex items-center justify-between">
              <div>
                <span className="px-3 py-1 bg-sky-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Check-In
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Daily Autoimmune Care Check-In</h3>
                <p className="text-xs text-slate-400">Log today's biomarkers, symptoms, and medications</p>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmitLog} className="p-6 sm:p-7 overflow-y-auto space-y-6 text-slate-800 text-sm">
              
              {/* Date & Flare Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    required
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div>
                    <span className="block text-xs font-bold text-rose-900">Are you in an active flare?</span>
                    <span className="text-[11px] text-rose-700">Sudden spike in inflammation</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFlareUpActive(!flareUpActive)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      flareUpActive ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {flareUpActive ? 'FLARE ACTIVE' : 'No'}
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Severity Sliders (1 = Minimal / 10 = Severe)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Pain Severity</span>
                      <span className="font-bold text-rose-600">{painLevel} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={painLevel}
                      onChange={(e) => setPainLevel(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Fatigue Level</span>
                      <span className="font-bold text-sky-600">{fatigueLevel} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={fatigueLevel}
                      onChange={(e) => setFatigueLevel(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Brain Fog & Memory</span>
                      <span className="font-bold text-purple-600">{brainFogLevel} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={brainFogLevel}
                      onChange={(e) => setBrainFogLevel(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Joint & Muscle Stiffness</span>
                      <span className="font-bold text-amber-600">{jointStiffnessLevel} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={jointStiffnessLevel}
                      onChange={(e) => setJointStiffnessLevel(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Gut Distress / Digestion</span>
                      <span className="font-bold text-teal-600">{gutDistressLevel} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={gutDistressLevel}
                      onChange={(e) => setGutDistressLevel(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Overall Vitality & Energy</span>
                      <span className="font-bold text-emerald-600">{overallEnergy} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={overallEnergy}
                      onChange={(e) => setOverallEnergy(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Sleep & Mood */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sleep Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Sleep Quality</label>
                  <select
                    value={sleepQuality}
                    onChange={(e) => setSleepQuality(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="Poor">Poor (Interrupted / Unrefreshing)</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Restful">Restful</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Mood</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="Struggling">Struggling</option>
                    <option value="Low">Low</option>
                    <option value="Stable">Stable</option>
                    <option value="Good">Good</option>
                    <option value="Energized">Energized</option>
                  </select>
                </div>
              </div>

              {/* Active Symptoms Checklist */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">Active Symptoms Experienced Today</label>
                <div className="flex flex-wrap gap-2">
                  {commonSymptomOptions.map(sym => {
                    const active = selectedSymptoms.includes(sym);
                    return (
                      <button
                        type="button"
                        key={sym}
                        onClick={() => handleToggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                          active ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {sym} {active ? '✓' : '+'}
                      </button>
                    );
                  })}
                </div>

                {/* Custom symptom input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add custom symptom..."
                    value={customSymptomInput}
                    onChange={(e) => setCustomSymptomInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSymptom}
                    className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Potential Triggers */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-amber-800">Possible Triggers Preceding Symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {commonTriggerOptions.map(trig => {
                    const active = selectedTriggers.includes(trig);
                    return (
                      <button
                        type="button"
                        key={trig}
                        onClick={() => handleToggleTrigger(trig)}
                        className={`px-3 py-1.5 rounded-2xl text-xs font-semibold transition-all ${
                          active ? 'bg-amber-500 text-white shadow-xs' : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/60'
                        }`}
                      >
                        ⚡ {trig}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Medication Compliance */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">Medication & Supplement Compliance</label>
                <div className="space-y-2">
                  {medsList.map((med, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleToggleMed(idx)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                        med.taken ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Pill className="w-4 h-4 text-emerald-600" />
                        <span>{med.name}</span>
                        <span className="text-[11px] text-slate-400">({med.dose})</span>
                      </div>
                      <span className="text-xs font-bold">{med.taken ? 'Taken ✓' : 'Skipped / Pending'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Notes / Care Observations</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., Took a 20-minute Epsom salt bath, avoided nightshades, feeling better towards the evening..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  Save Daily Log
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
