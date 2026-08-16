import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Activity, 
  Flame, 
  Calendar, 
  Pill, 
  AlertCircle 
} from 'lucide-react';
import { SymptomLogEntry } from '../types';

interface DoctorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SymptomLogEntry[];
}

export const DoctorSummaryModal: React.FC<DoctorSummaryModalProps> = ({
  isOpen,
  onClose,
  logs
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalLogs = logs.length;
  const flareLogs = logs.filter(l => l.flareUpActive);
  const avgPain = totalLogs > 0 ? (logs.reduce((acc, l) => acc + l.painLevel, 0) / totalLogs).toFixed(1) : 'N/A';
  const avgFatigue = totalLogs > 0 ? (logs.reduce((acc, l) => acc + l.fatigueLevel, 0) / totalLogs).toFixed(1) : 'N/A';
  const avgBrainFog = totalLogs > 0 ? (logs.reduce((acc, l) => acc + l.brainFogLevel, 0) / totalLogs).toFixed(1) : 'N/A';
  const avgStiffness = totalLogs > 0 ? (logs.reduce((acc, l) => acc + l.jointStiffnessLevel, 0) / totalLogs).toFixed(1) : 'N/A';
  const avgSleep = totalLogs > 0 ? (logs.reduce((acc, l) => acc + l.sleepHours, 0) / totalLogs).toFixed(1) : 'N/A';

  // Aggregate symptoms
  const symptomCounts: { [key: string]: number } = {};
  logs.forEach(l => {
    l.activeSymptoms?.forEach(s => {
      symptomCounts[s] = (symptomCounts[s] || 0) + 1;
    });
  });
  const topSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]);

  // Aggregate triggers
  const triggerCounts: { [key: string]: number } = {};
  logs.forEach(l => {
    l.identifiedTriggers?.forEach(t => {
      triggerCounts[t] = (triggerCounts[t] || 0) + 1;
    });
  });
  const topTriggers = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1]);

  const generateReportText = () => {
    return `=== IMMUNEQ PATIENT SYMPTOM & CARE CLINICAL SUMMARY ===
Generated on: ${new Date().toLocaleDateString()}
Reporting Period: Last ${totalLogs} logged days

1. AGGREGATE SEVERITY SCORES (Scale 1-10):
- Average Clinical Pain Score: ${avgPain} / 10
- Average Fatigue Score: ${avgFatigue} / 10
- Average Brain Fog / Cognitive Score: ${avgBrainFog} / 10
- Average Morning Joint Stiffness: ${avgStiffness} / 10
- Average Sleep Duration: ${avgSleep} hours/night

2. FLARE-UP FREQUENCY:
- Total Documented Flare Days: ${flareLogs.length} out of ${totalLogs} check-ins (${totalLogs > 0 ? Math.round((flareLogs.length / totalLogs) * 100) : 0}% of tracking period)

3. MOST FREQUENT ACTIVE SYMPTOMS:
${topSymptoms.map(([sym, count]) => `• ${sym}: logged on ${count} days (${Math.round((count/totalLogs)*100)}%)`).join('\n')}

4. IDENTIFIED TRIGGER CORRELATIONS:
${topTriggers.map(([trig, count]) => `• ${trig}: correlated ${count} times with symptom onset`).join('\n')}

5. RECENT CLINICAL NOTES FROM PATIENT:
${logs.slice(0, 3).filter(l => l.notes).map(l => `• [${l.date}]: ${l.notes}`).join('\n')}

=======================================================
Prepared via ImmuneQ Autoimmune Health Management Engine`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="px-3 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                Clinical Report
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">Rheumatologist & Doctor Appointment Summary</h3>
              <p className="text-xs text-slate-400">Clinical-grade aggregate report for your upcoming consultation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Printable Report Preview */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-slate-800 text-sm">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reporting Period</span>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                {logs.length > 0 ? `${logs[logs.length - 1]?.date} to ${logs[0]?.date}` : 'No logs recorded'}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tracking Compliance</span>
              <div className="text-sm font-extrabold text-teal-700 mt-0.5">{totalLogs} Daily Entries</div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Documented Flares</span>
              <div className="text-sm font-extrabold text-rose-600 mt-0.5">{flareLogs.length} Days</div>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Average Symptom Severity Metrics (1-10 Scale)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100">
                <span className="text-[11px] font-bold text-rose-800 block">Avg Pain Level</span>
                <span className="text-xl font-extrabold text-rose-950">{avgPain} / 10</span>
              </div>
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                <span className="text-[11px] font-bold text-sky-800 block">Avg Fatigue</span>
                <span className="text-xl font-extrabold text-sky-950">{avgFatigue} / 10</span>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                <span className="text-[11px] font-bold text-purple-800 block">Avg Brain Fog</span>
                <span className="text-xl font-extrabold text-purple-950">{avgBrainFog} / 10</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-[11px] font-bold text-amber-800 block">Joint Stiffness</span>
                <span className="text-xl font-extrabold text-amber-950">{avgStiffness} / 10</span>
              </div>
            </div>
          </div>

          {/* Top Symptoms */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              2. Hallmark Symptoms & Frequency
            </h4>
            {topSymptoms.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No symptoms recorded.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {topSymptoms.map(([sym, count], idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">{sym}</span>
                    <span className="font-bold text-slate-600">{count} of {totalLogs} days</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Triggers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              3. Trigger Correlations Preceding Flares
            </h4>
            {topTriggers.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No triggers logged.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topTriggers.map(([trig, count], idx) => (
                  <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                    ⚡ {trig} ({count}x)
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer & Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-200 text-xs font-bold transition-all"
          >
            Close
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-all"
            >
              <Printer className="w-4 h-4 text-teal-300" />
              <span>Print Clinical Summary</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
