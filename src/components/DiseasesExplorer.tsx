import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FlaskConical, 
  Pill, 
  HeartHandshake, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen,
  HelpCircle,
  Flame,
  Activity,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Disease, DiseaseCategory } from '../types';
import { DISEASES_DATA, SYMPTOM_CHECKER_PRESETS } from '../data/diseases';

interface DiseasesExplorerProps {
  onSelectConditionForAI?: (diseaseName: string) => void;
  onSelectConditionForForum?: (diseaseName: string) => void;
  onOpenAiChat?: (prompt: string) => void;
  onOpenForumFilter?: (diseaseName: string) => void;
  onOpenCareProtocols?: () => void;
}

export const DiseasesExplorer: React.FC<DiseasesExplorerProps> = ({
  onSelectConditionForAI,
  onSelectConditionForForum,
  onOpenAiChat,
  onOpenForumFilter,
  onOpenCareProtocols
}) => {
  const handleAi = onOpenAiChat || onSelectConditionForAI;
  const handleForum = onOpenForumFilter || onSelectConditionForForum;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBodySystem, setSelectedBodySystem] = useState<string>('All');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [modalTab, setModalTab] = useState<'overview' | 'symptoms' | 'biomarkers' | 'treatments' | 'lifestyle' | 'doctorQuestions'>('overview');
  const [copiedQuestionIndex, setCopiedQuestionIndex] = useState<number | null>(null);

  // Symptom cross-checker state
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([]);

  const spotlightDisease = DISEASES_DATA[spotlightIndex] || DISEASES_DATA[0];

  const categories: string[] = [
    'All',
    'Thyroid & Endocrine',
    'Joints & Musculoskeletal',
    'Gastrointestinal & Liver',
    'Neurological & Neuromuscular',
    'Dermatological & Connective',
    'Systemic & Vascular'
  ];

  const bodySystems = [
    { id: 'All', label: 'All Systems', icon: '🌐' },
    { id: 'Joints', label: 'Joints & Spine', icon: '🦴' },
    { id: 'Thyroid', label: 'Thyroid & Hormones', icon: '🦋' },
    { id: 'Gut', label: 'Digestive & Gut', icon: '🥣' },
    { id: 'Brain', label: 'Brain & Nerves', icon: '🧠' },
    { id: 'Skin', label: 'Skin & Connective', icon: '✨' },
    { id: 'Sicca', label: 'Eyes & Moisture', icon: '👁️' }
  ];

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter((disease) => {
      const matchesSearch = 
        disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.hallmarkSymptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        disease.primaryOrgans.some(o => o.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || disease.category === selectedCategory;

      const matchesBody = selectedBodySystem === 'All' || 
        (selectedBodySystem === 'Joints' && (disease.category.includes('Joints') || disease.hallmarkSymptoms.some(s => s.toLowerCase().includes('joint')))) ||
        (selectedBodySystem === 'Thyroid' && (disease.category.includes('Thyroid') || disease.name.toLowerCase().includes('thyroid'))) ||
        (selectedBodySystem === 'Gut' && (disease.category.includes('Gastrointestinal') || disease.primaryOrgans.some(o => o.toLowerCase().includes('gut') || o.toLowerCase().includes('bowel') || o.toLowerCase().includes('intestine')))) ||
        (selectedBodySystem === 'Brain' && (disease.category.includes('Neurological') || disease.hallmarkSymptoms.some(s => s.toLowerCase().includes('nerve') || s.toLowerCase().includes('brain') || s.toLowerCase().includes('numbness')))) ||
        (selectedBodySystem === 'Skin' && (disease.category.includes('Dermatological') || disease.hallmarkSymptoms.some(s => s.toLowerCase().includes('skin') || s.toLowerCase().includes('rash') || s.toLowerCase().includes('psoriasis')))) ||
        (selectedBodySystem === 'Sicca' && (disease.hallmarkSymptoms.some(s => s.toLowerCase().includes('dry') || s.toLowerCase().includes('eye'))));

      return matchesSearch && matchesCategory && matchesBody;
    });
  }, [searchQuery, selectedCategory, selectedBodySystem]);

  // Symptom checker matching
  const symptomMatches = useMemo(() => {
    if (selectedSymptomIds.length === 0) return [];
    
    const selectedLabels = selectedSymptomIds.map(id => {
      const found = SYMPTOM_CHECKER_PRESETS.find(p => p.id === id);
      return found ? found.label.toLowerCase() : '';
    });

    return DISEASES_DATA.map(disease => {
      let score = 0;
      const matchedSymptoms: string[] = [];

      selectedLabels.forEach(selectedLabel => {
        const found = disease.hallmarkSymptoms.find(s => 
          s.toLowerCase().includes(selectedLabel.split('/')[0].trim().toLowerCase()) ||
          selectedLabel.split(' ').some(w => w.length > 4 && s.toLowerCase().includes(w))
        );
        if (found) {
          score += 1;
          matchedSymptoms.push(found);
        }
      });

      return {
        disease,
        score,
        matchedSymptoms,
        matchPercent: Math.min(100, Math.round((score / Math.max(1, selectedSymptomIds.length)) * 100))
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
  }, [selectedSymptomIds]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptomIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleCopyQuestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIndex(index);
    setTimeout(() => setCopiedQuestionIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Bento Grid Spotlight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Bento Spotlight Card (Col-span 8) */}
        <section className="lg:col-span-8 bento-glass rounded-[32px] p-6 sm:p-7 shadow-sm flex flex-col justify-between relative overflow-hidden group bento-lift">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-sky-50/90 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
                  Disease Spotlight
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {spotlightDisease.category}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setSpotlightIndex((prev) => (prev > 0 ? prev - 1 : DISEASES_DATA.length - 1))}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all bento-lift-subtle"
                  title="Previous Condition"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={() => setSpotlightIndex((prev) => (prev < DISEASES_DATA.length - 1 ? prev + 1 : 0))}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all bento-lift-subtle"
                  title="Next Condition"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {spotlightDisease.name}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
              {spotlightDisease.tagline}
            </p>
          </div>

          {/* Sub Bento Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="bento-glass-subtle p-4 rounded-2xl bento-lift-subtle">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hallmark Signs</p>
              <p className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                {spotlightDisease.hallmarkSymptoms.slice(0, 2).join(', ')}
              </p>
            </div>
            <div className="bento-glass-subtle p-4 rounded-2xl bento-lift-subtle">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prevalence</p>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {spotlightDisease.prevalence}
              </p>
            </div>
            <div className="bento-glass-subtle p-4 rounded-2xl bento-lift-subtle">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Serology</p>
              <p className="text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                {spotlightDisease.diagnosticTests[0]?.name || 'Autoantibodies'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100/80">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-medium">Systems:</span>
              <div className="flex flex-wrap gap-1">
                {spotlightDisease.primaryOrgans.slice(0, 3).map((org, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-sky-50/80 text-sky-700 text-[11px] font-semibold border border-sky-100/50">
                    {org}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedDisease(spotlightDisease)}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center space-x-1.5 bento-lift-subtle"
              >
                <span>Explore Clinical Guide</span>
                <ArrowUpRight className="w-4 h-4 text-sky-300" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Side Bento Column (Col-span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Bento Card 1: Interactive Differential Matcher (Sky / Cyan Gradient) */}
          <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-700 backdrop-blur-md border border-sky-400/30 text-white rounded-[32px] p-6 shadow-lg shadow-sky-600/10 relative overflow-hidden flex flex-col justify-between bento-lift">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-xs">
                  Differential Tool
                </span>
                <Sparkles className="w-4 h-4 text-sky-200" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Multi-Symptom Matcher</h3>
                <p className="text-sky-100 text-xs mt-1 leading-relaxed">
                  Select active symptoms to discover potential autoimmune patterns & serology panels.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs bg-white/10 p-3 rounded-2xl border border-white/20">
                  <span>Selected Symptoms</span>
                  <span className="font-bold">{selectedSymptomIds.length} active</span>
                </div>
                {selectedSymptomIds.length > 0 && symptomMatches.length > 0 && (
                  <div className="flex items-center justify-between text-xs bg-white/15 p-3 rounded-2xl border border-white/20">
                    <span>Top Match</span>
                    <span className="font-bold text-cyan-200">{symptomMatches[0].disease.shortName} ({symptomMatches[0].matchPercent}%)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-2">
              <button
                onClick={() => setCheckerOpen(!checkerOpen)}
                className="w-full py-2.5 bg-white text-sky-900 rounded-2xl font-bold text-xs hover:bg-sky-50 transition-all shadow-sm bento-lift-subtle"
              >
                {checkerOpen ? 'Close Symptom Matrix' : 'Open Symptom Matrix'}
              </button>
            </div>

            {/* Glowing ambient background blur */}
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-sky-400/40 rounded-full blur-2xl pointer-events-none"></div>
          </section>

          {/* Bento Card 2: Care Checklist & Pacing (Emerald Tinted) */}
          <section className="bg-emerald-50/90 backdrop-blur-md rounded-[32px] p-6 border border-emerald-100/90 flex flex-col justify-between shadow-2xs bento-lift">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-emerald-950">Daily Care Pacing</h3>
                <span className="px-2.5 py-0.5 bg-emerald-100/90 text-emerald-800 text-[11px] font-bold rounded-full uppercase border border-emerald-200/50">
                  AIP Protocol
                </span>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium bg-white/80 p-2.5 rounded-xl border border-emerald-200/50">
                  <div className="w-4 h-4 rounded-md border border-emerald-400 flex items-center justify-center bg-white text-emerald-600 text-[10px] font-bold">✓</div>
                  <span>Anti-inflammatory Meal Focus</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium bg-white/80 p-2.5 rounded-xl border border-emerald-200/50">
                  <div className="w-4 h-4 rounded-md border border-emerald-400 flex items-center justify-center bg-white text-emerald-600 text-[10px] font-bold">✓</div>
                  <span>Vagus Nerve 4-7-8 Breathing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium bg-white/80 p-2.5 rounded-xl border border-emerald-200/50">
                  <div className="w-4 h-4 rounded-md border border-emerald-300 bg-white"></div>
                  <span>Spoon Theory Energy Budget</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              {onOpenCareProtocols && (
                <button
                  onClick={onOpenCareProtocols}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs transition-all shadow-sm bento-lift-subtle"
                >
                  View Care Protocols & Spoons
                </button>
              )}
            </div>
          </section>

        </div>
      </div>

      {/* Interactive Symptom Cross-Checker Panel (Bento Dropdown) */}
      {checkerOpen && (
        <div className="p-6 rounded-[32px] bento-glass border border-sky-200 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
                Symptom Matrix
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Select Your Active Symptoms to Analyze Overlaps
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-system autoimmune cross-matching based on ACR and EULAR clinical criteria.
              </p>
            </div>
            {selectedSymptomIds.length > 0 && (
              <button
                onClick={() => setSelectedSymptomIds([])}
                className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-rose-50 text-xs font-bold text-slate-600 hover:text-rose-600 transition-all bento-lift-subtle"
              >
                Clear all ({selectedSymptomIds.length})
              </button>
            )}
          </div>

          {/* Symptom Tag Pills */}
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_CHECKER_PRESETS.map(preset => {
              const active = selectedSymptomIds.includes(preset.id);
              return (
                <button
                  key={preset.id}
                  onClick={() => toggleSymptom(preset.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center space-x-1.5 bento-lift-subtle ${
                    active
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <span>{preset.label}</span>
                  {active && <Check className="w-3.5 h-3.5 ml-1 text-sky-200" />}
                </button>
              );
            })}
          </div>

          {/* Results Grid */}
          {selectedSymptomIds.length > 0 && (
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Matched Conditions ({symptomMatches.length})
              </h4>
              {symptomMatches.length === 0 ? (
                <p className="text-sm text-slate-500 italic bento-glass-subtle p-4 rounded-2xl">
                  No direct matches for this combination. Try selecting common markers like fatigue, joint pain, or morning stiffness.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {symptomMatches.map(match => (
                    <div 
                      key={match.disease.id}
                      onClick={() => setSelectedDisease(match.disease)}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-white/80 hover:bg-white hover:border-sky-400 hover:shadow-xs transition-all cursor-pointer space-y-2 group bento-lift-subtle"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-sky-600 transition-colors">
                          {match.disease.name}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                          {match.matchPercent}% Overlap
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{match.disease.tagline}</p>
                      <div className="text-[11px] text-sky-600 font-semibold flex items-center justify-between pt-1">
                        <span>Matched {match.matchedSymptoms.length} hallmark symptoms</span>
                        <span>View &rarr;</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search & Multi-Filter Bar (Bento styled card) */}
      <div className="bento-glass rounded-[32px] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="disease-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases, symptoms (e.g. fatigue, rash, joint stiffness), or antibodies (ANA, TPO)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/80 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white/80 border border-slate-200 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-2xs cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Body Systems Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
            Target System:
          </span>
          {bodySystems.map(system => {
            const isActive = selectedBodySystem === system.id;
            return (
              <button
                key={system.id}
                onClick={() => setSelectedBodySystem(system.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 bento-lift-subtle ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                <span>{system.icon}</span>
                <span>{system.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Disease Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiseases.map((disease) => (
          <div
            key={disease.id}
            id={`disease-card-${disease.id}`}
            onClick={() => setSelectedDisease(disease)}
            className="group relative bento-glass rounded-[32px] hover:border-sky-300 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between bento-lift"
          >
            <div className="space-y-3.5">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-sky-50 text-sky-700 border border-sky-100">
                  {disease.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {disease.shortName}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                  <span>{disease.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {disease.tagline}
                </p>
              </div>

              {/* Hallmark Symptoms Inner Bento Card */}
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Hallmark Symptoms
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {disease.hallmarkSymptoms.slice(0, 3).map((sym, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white border border-slate-200 text-slate-700 line-clamp-1"
                    >
                      {sym}
                    </span>
                  ))}
                  {disease.hallmarkSymptoms.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[11px] font-semibold text-slate-500 bg-slate-200/60">
                      +{disease.hallmarkSymptoms.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Primary Organs / Biomarkers Tag */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-sky-600" />
                  <span className="font-medium">Labs: {disease.diagnosticTests.map(t => t.name).slice(0, 2).join(', ')}</span>
                </span>
                <span className="text-sky-600 font-bold text-xs group-hover:underline">
                  View Guide &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-16 bg-white rounded-[32px] border border-slate-200 space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching autoimmune conditions found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords or resetting filters to 'All Categories' to view all verified conditions.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedBodySystem('All'); }}
            className="px-5 py-2.5 rounded-2xl bg-sky-50 text-sky-700 font-semibold text-xs hover:bg-sky-100 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Comprehensive Disease Detail Modal (Bento Rounded) */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div 
            id="disease-detail-modal"
            className="bg-white rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-7 relative">
              <button
                onClick={() => setSelectedDisease(null)}
                className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
                title="Close"
              >
                ✕
              </button>

              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-sky-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {selectedDisease.category}
                  </span>
                  <span className="text-xs text-slate-400">{selectedDisease.prevalence}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedDisease.name}
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedDisease.tagline}
                </p>
              </div>

              {/* Action buttons inside header */}
              <div className="flex flex-wrap gap-2 pt-4">
                {handleAi && (
                  <button
                    onClick={() => {
                      handleAi(`Tell me about ${selectedDisease.name}, key diagnostic labs, and evidence-based self-care strategies.`);
                      setSelectedDisease(null);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                    <span>Ask AI Companion about {selectedDisease.shortName}</span>
                  </button>
                )}
                {handleForum && (
                  <button
                    onClick={() => {
                      handleForum(selectedDisease.shortName);
                      setSelectedDisease(null);
                    }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />
                    <span>View {selectedDisease.shortName} Forum Posts</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto no-scrollbar gap-2 py-2">
              {[
                { id: 'overview', label: 'Overview & Organs' },
                { id: 'symptoms', label: 'Symptoms & Red Flags' },
                { id: 'biomarkers', label: 'Labs & Biomarkers' },
                { id: 'treatments', label: 'Medical Treatments' },
                { id: 'lifestyle', label: 'AIP & Lifestyle' },
                { id: 'doctorQuestions', label: 'Doctor Questions' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setModalTab(tab.id as any)}
                  className={`py-2 px-3.5 text-xs font-bold whitespace-nowrap rounded-2xl transition-all ${
                    modalTab === tab.id
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
              
              {/* 1. OVERVIEW TAB */}
              {modalTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Clinical Overview & Pathology
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {selectedDisease.overview}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Primary Biological Systems Involved
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {selectedDisease.primaryOrgans.map((organ, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100 font-semibold text-xs text-sky-900 flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full bg-sky-600" />
                          <span>{organ}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Known Flare-Up Triggers
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedDisease.commonTriggers.map((trig, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start space-x-2">
                          <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{trig}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. SYMPTOMS TAB */}
              {modalTab === 'symptoms' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Hallmark & Classic Symptoms
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedDisease.hallmarkSymptoms.map((sym, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-2.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-slate-800">{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                    <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Flare Warning Signs & Urgent Red Flags</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-rose-900">
                      {selectedDisease.flareWarningSigns.map((flag, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 3. BIOMARKERS TAB */}
              {modalTab === 'biomarkers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Diagnostic Biomarkers & Serology Panels
                    </h4>
                    <span className="text-xs text-sky-700 bg-sky-50 px-3 py-1 rounded-full font-bold border border-sky-100">
                      Verify with Fasting Blood Draw
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedDisease.diagnosticTests.map((test, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-sky-950">{test.name}</span>
                          <span className="text-xs text-slate-500 italic">{test.fullName}</span>
                        </div>
                        <p className="text-xs text-slate-700">{test.purpose}</p>
                        {test.normalRange && (
                          <div className="text-xs font-mono bg-white px-3 py-1 rounded-xl border border-slate-200 text-slate-800 inline-block">
                            Reference Range: {test.normalRange}
                          </div>
                        )}
                        <div className="text-xs text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-100 font-medium">
                          <strong>Clinical Significance:</strong> {test.significance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. TREATMENTS TAB */}
              {modalTab === 'treatments' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Evidence-Based Treatment Classes & Pharmacotherapy
                  </h4>
                  <div className="space-y-3">
                    {selectedDisease.treatmentClasses.map((treat, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Pill className="w-4 h-4 text-sky-600" />
                          <h5 className="font-bold text-sm text-slate-900">{treat.name}</h5>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{treat.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {treat.examples.map((ex, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white border border-slate-200 text-slate-700">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. LIFESTYLE & AIP TAB */}
              {modalTab === 'lifestyle' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Holistic, AIP Nutrition & Energy Conservation
                  </h4>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <h5 className="font-bold text-xs text-emerald-900 uppercase">🥗 Dietary Strategy (AIP / Anti-Inflammatory)</h5>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      {selectedDisease.evidenceBasedLifestyle.diet}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                    <h5 className="font-bold text-xs text-sky-900 uppercase">🏃‍♂️ Exercise & Joint/Nerve Pacing</h5>
                    <p className="text-xs text-sky-950 leading-relaxed">
                      {selectedDisease.evidenceBasedLifestyle.exercise}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="font-bold text-xs text-slate-800 uppercase">🧘 Stress Management & Vagus Nerve Stimulation</h5>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {selectedDisease.evidenceBasedLifestyle.stressPacing}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="font-bold text-xs text-slate-500 uppercase">Supplements to Discuss with Physician</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDisease.evidenceBasedLifestyle.supplementsToDiscuss.map((supp, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-800">
                          💊 {supp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. DOCTOR QUESTIONS TAB */}
              {modalTab === 'doctorQuestions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      High-Yield Questions for Your Next Specialist Visit
                    </h4>
                    <span className="text-xs text-slate-500">Click to copy</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedDisease.questionsForDoctor.map((q, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleCopyQuestion(q, idx)}
                        className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50/40 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-sky-600 group-hover:text-white text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-slate-800 font-medium leading-relaxed">{q}</span>
                        </div>
                        <button className="text-slate-400 group-hover:text-sky-600 p-1 shrink-0">
                          {copiedQuestionIndex === idx ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">ImmuneQ Clinical Reference Engine</span>
              <button
                onClick={() => setSelectedDisease(null)}
                className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
