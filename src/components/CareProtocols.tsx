import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Heart, 
  Utensils, 
  Wind, 
  AlertTriangle, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  Info,
  Apple,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';
import { SpoonActivity } from '../types';

interface CareProtocolsProps {
  onOpenAiHelper?: (prompt: string) => void;
}

export const CareProtocols: React.FC<CareProtocolsProps> = ({ onOpenAiHelper }) => {
  const [activeSection, setActiveSection] = useState<'sos' | 'spoons' | 'aip' | 'vagus'>('sos');

  // --- SPOON THEORY STATE ---
  const [totalSpoons, setTotalSpoons] = useState<number>(12);
  const [spentSpoons, setSpentSpoons] = useState<number>(0);
  const [selectedActivities, setSelectedActivities] = useState<{ id: string; name: string; cost: number }[]>([]);

  const defaultActivities: SpoonActivity[] = [
    { id: 'act-1', name: 'Showering, dressing & hair', cost: 2, category: 'Self Care', icon: '🚿' },
    { id: 'act-2', name: 'Cooking a fresh meal', cost: 3, category: 'Household', icon: '🍳' },
    { id: 'act-3', name: '4 Hours of focused work/study', cost: 4, category: 'Work / Study', icon: '💻' },
    { id: 'act-4', name: 'Driving / Commuting in traffic', cost: 2, category: 'Work / Study', icon: '🚗' },
    { id: 'act-5', name: 'Social dinner or gathering', cost: 3, category: 'Social', icon: '👥' },
    { id: 'act-6', name: 'Grocery shopping & carrying bags', cost: 3, category: 'Household', icon: '🛒' },
    { id: 'act-7', name: 'House cleaning & laundry', cost: 3, category: 'Household', icon: '🧹' },
    { id: 'act-8', name: '20-min gentle walk / stretching', cost: 1, category: 'Exercise', icon: '🧘' },
    { id: 'act-9', name: 'Doctor appointment & waiting room', cost: 3, category: 'Self Care', icon: '🩺' },
    { id: 'act-10', name: 'Managing a difficult phone call/conflict', cost: 2, category: 'Social', icon: '📞' }
  ];

  const handleToggleActivity = (act: SpoonActivity) => {
    const exists = selectedActivities.find(a => a.id === act.id);
    if (exists) {
      setSelectedActivities(prev => prev.filter(a => a.id !== act.id));
      setSpentSpoons(prev => Math.max(0, prev - act.cost));
    } else {
      setSelectedActivities(prev => [...prev, { id: act.id, name: act.name, cost: act.cost }]);
      setSpentSpoons(prev => prev + act.cost);
    }
  };

  const handleResetSpoons = () => {
    setSelectedActivities([]);
    setSpentSpoons(0);
  };

  const remainingSpoons = totalSpoons - spentSpoons;

  // --- BREATHING TIMER STATE ---
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCounter, setBreathCounter] = useState<number>(4);
  const [breathMode, setBreathMode] = useState<'box' | 'relax'>('box'); // box (4-4-4-4) or 4-7-8

  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathCounter((prev) => {
          if (prev > 1) return prev - 1;

          // Transition to next phase
          if (breathMode === 'box') {
            if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 4; }
            if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 4; }
            if (breathPhase === 'Exhale') { setBreathPhase('Rest'); return 4; }
            if (breathPhase === 'Rest') { setBreathPhase('Inhale'); return 4; }
          } else {
            // 4-7-8 mode
            if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 7; }
            if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 8; }
            if (breathPhase === 'Exhale') { setBreathPhase('Inhale'); return 4; }
          }
          return 4;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathPhase, breathMode]);

  // --- AIP NUTRITION STATE ---
  const [aipFilter, setAipFilter] = useState<'elimination' | 'reintroduction' | 'healing'>('elimination');

  return (
    <div className="space-y-6">
      {/* Care Protocols Header Bento Card */}
      <section className="bento-glass rounded-[32px] p-6 sm:p-7 shadow-sm space-y-4 bento-lift-subtle">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50/90 text-teal-700 text-xs font-bold uppercase tracking-wider border border-teal-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evidence-Based Self-Care Systems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Autoimmune Care Protocols & Energy Pacing
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Master living with chronic illness through somatic nervous system calming, practical Spoon Theory daily budgeting, anti-inflammatory AIP nutrition, and emergency flare management.
          </p>
        </div>

        {/* Section Switcher Bento Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'sos', label: '🔥 Flare-Up SOS Kit' },
            { id: 'spoons', label: '🥄 Spoon Energy Budget' },
            { id: 'aip', label: '🥗 AIP Diet & Gut Matrix' },
            { id: 'vagus', label: '🌬️ Somatic Breath & Vagus' },
          ].map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 bento-lift-subtle ${
                activeSection === sec.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              <span>{sec.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 1: FLARE-UP SOS KIT */}
      {activeSection === 'sos' && (
        <div className="space-y-6">
          <section className="p-6 sm:p-7 rounded-[32px] bg-rose-50/70 border border-rose-200/80 backdrop-blur-md shadow-sm space-y-5 bento-lift-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-rose-950">Active Flare Emergency Protocol</h3>
                  <p className="text-xs text-rose-800">Step-by-step calming actions when symptoms spike acutely</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-200/80 text-rose-900 uppercase tracking-wide shrink-0">
                Priority 1: Stop & Pace
              </span>
            </div>

            {/* Red Flag Warning Box */}
            <div className="p-5 rounded-2xl bg-white/90 border border-rose-200 shadow-xs space-y-3 bento-lift-subtle">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>When to Seek Immediate Emergency Medical Care:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                <div className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Sudden chest pain, difficulty breathing, or pleuritic pain on inhale</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Sudden vision loss, double vision, or severe eye redness/pain</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>High fever (&gt;101°F / 38.3°C) while on immunosuppressive biologics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Difficulty swallowing saliva or severe sudden motor weakness</span>
                </div>
              </div>
            </div>

            {/* 4-Step Flare Recovery Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-2 shadow-xs bento-lift">
                <div className="flex items-center space-x-2.5 text-sky-950 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">1</span>
                  <span>Radical Energy Permission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cancel non-essential commitments immediately. Do not attempt to "push through" autoimmune fatigue—pushing releases inflammatory cortisol and adrenaline, worsening tissue inflammation. Lie flat in a darkened, cool room.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-2 shadow-xs bento-lift">
                <div className="flex items-center space-x-2.5 text-teal-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-black">2</span>
                  <span>Thermal & Compression Relief</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For hot, swollen, throbbing joints: apply ice packs (wrapped in towel) for 15 minutes. For general aching, stiffness, or Raynaud: soak in a warm Epsom salt bath (magnesium sulfate absorbed transdermally relaxes muscles) and wear compression gear.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-2 shadow-xs bento-lift">
                <div className="flex items-center space-x-2.5 text-amber-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">3</span>
                  <span>Anti-Inflammatory Hydration & Meals</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sip warm bone broth or ginger-turmeric tea with a pinch of Celtic sea salt for electrolytes. Eat simple, pureed, gut-soothing foods (pumpkin soup, steamed zucchini, wild salmon). Strictly avoid sugar, alcohol, and refined grains.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/90 border border-slate-200 space-y-2 shadow-xs bento-lift">
                <div className="flex items-center space-x-2.5 text-purple-900 font-bold text-sm">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black">4</span>
                  <span>Document & Contact Care Team</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Record today's flare in your ImmuneQ Care Log. If the flare persists &gt;48 hours or exceeds your normal baseline, send a message to your rheumatologist to consider a temporary steroid taper or medication adjustment.
                </p>
              </div>
            </div>

            {/* Quick Action Prompt for AI */}
            {onOpenAiHelper && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => onOpenAiHelper("Help me create a personalized flare-up rescue plan based on my current symptoms and medications.")}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all bento-lift-subtle"
                >
                  <Sparkles className="w-4 h-4 text-teal-300" />
                  <span>Generate Personalized AI Flare Emergency Advice</span>
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* SECTION 2: SPOON THEORY ENERGY BUDGET */}
      {activeSection === 'spoons' && (
        <div className="space-y-6">
          <section className="p-6 sm:p-7 rounded-[32px] bento-glass space-y-6 shadow-sm bento-lift-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-sky-50/90 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
                  Energy Pacing
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center space-x-2">
                  <span>🥄 Daily Spoon Theory Energy Budget</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The Spoon Theory represents the finite amount of energy people with chronic illness have each day. Allocate your spoons wisely to avoid post-exertional crashes.
                </p>
              </div>

              <button
                onClick={handleResetSpoons}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white border border-slate-200 text-slate-700 font-bold text-xs transition-all shrink-0 bento-lift-subtle shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Day</span>
              </button>
            </div>

            {/* Spoon Meter Dashboard */}
            <div className="p-5 sm:p-6 rounded-2xl bento-glass-subtle space-y-4 bento-lift-subtle">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Spoons Today</span>
                  <div className="text-3xl font-black flex items-center space-x-2 mt-0.5">
                    <span className={
                      remainingSpoons > 4 ? 'text-teal-600' :
                      remainingSpoons > 1 ? 'text-amber-500' : 'text-rose-600 animate-pulse'
                    }>
                      {remainingSpoons}
                    </span>
                    <span className="text-sm font-medium text-slate-400">/ {totalSpoons} Spoons</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-medium">Starting Budget:</span>
                  <select
                    value={totalSpoons}
                    onChange={(e) => setTotalSpoons(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-800 cursor-pointer shadow-2xs"
                  >
                    <option value="8">8 Spoons (Severe Flare Day)</option>
                    <option value="12">12 Spoons (Standard Day)</option>
                    <option value="16">16 Spoons (High Energy Day)</option>
                  </select>
                </div>
              </div>

              {/* Progress Visualizer */}
              <div className="space-y-1.5">
                <div className="w-full h-3.5 bg-slate-200/80 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${Math.min(100, (spentSpoons / totalSpoons) * 100)}%` }}
                    className={`h-full transition-all duration-300 ${
                      remainingSpoons > 4 ? 'bg-teal-500' :
                      remainingSpoons >= 0 ? 'bg-amber-500' : 'bg-rose-600'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Used: {spentSpoons} spoons</span>
                  <span>{remainingSpoons < 0 ? `⚠️ Overspent by ${Math.abs(remainingSpoons)} spoons (Borrowing tomorrow)` : `${remainingSpoons} spoons left in reservoir`}</span>
                </div>
              </div>

              {/* Warning Alert if overspent */}
              {remainingSpoons <= 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Energy Deficit Warning:</strong> You have exhausted your daily energy reservoir. Any further exertion borrows spoons from tomorrow and significantly increases your risk of a multi-day flare crash. Rest immediately.
                  </span>
                </div>
              )}
            </div>

            {/* Daily Activity Spoons Catalog */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tap Activities Completed or Planned Today:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {defaultActivities.map(act => {
                  const isSelected = selectedActivities.some(a => a.id === act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => handleToggleActivity(act)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all bento-lift-subtle ${
                        isSelected 
                          ? 'bg-sky-50/90 border-sky-400 shadow-xs' 
                          : 'bg-white/80 border-slate-200/80 hover:bg-white hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{act.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{act.name}</div>
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">{act.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                          isSelected ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}>
                          {act.cost} 🥄
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-sky-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SECTION 3: AIP & ANTI-INFLAMMATORY NUTRITION */}
      {activeSection === 'aip' && (
        <div className="space-y-6">
          <section className="p-6 sm:p-7 rounded-[32px] bento-glass space-y-6 shadow-sm bento-lift-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 bg-teal-50/90 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider border border-teal-100">
                  Nutrition Matrix
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center space-x-2">
                  <Apple className="w-5 h-5 text-teal-600" />
                  <span>Autoimmune Protocol (AIP) Food Matrix</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scientifically structured nutritional framework designed to calm intestinal permeability and reduce autoantibody production.
                </p>
              </div>

              {/* Sub tabs */}
              <div className="flex flex-wrap bento-glass-subtle p-1 rounded-2xl gap-1">
                <button
                  onClick={() => setAipFilter('elimination')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    aipFilter === 'elimination' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🚫 Elimination Phase
                </button>
                <button
                  onClick={() => setAipFilter('healing')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    aipFilter === 'healing' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🥑 Nutrient Powerhouses
                </button>
                <button
                  onClick={() => setAipFilter('reintroduction')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    aipFilter === 'reintroduction' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🔄 Reintroduction Stages
                </button>
              </div>
            </div>

            {/* Content for Elimination */}
            {aipFilter === 'elimination' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-rose-950 uppercase flex items-center space-x-2">
                    <span>🌾 Grains & Pseudo-grains</span>
                  </h4>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Wheat, rye, barley (gluten contains gliadin which triggers zonulin and increases gut permeability), oats, rice, corn, quinoa, buckwheat.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-rose-950 uppercase flex items-center space-x-2">
                    <span>🍅 Nightshades (Solanaceae family)</span>
                  </h4>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Tomatoes, potatoes (sweet potatoes are OK), bell peppers, eggplant, cayenne pepper, paprika, goji berries (contain solanine alkaloids that can irritate joint synovium).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-rose-950 uppercase flex items-center space-x-2">
                    <span>🥛 Dairy & Industrial Seed Oils</span>
                  </h4>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Cow milk, cheese, yogurt, whey protein (A1 beta-casein mimics human molecular structures). Canola oil, soybean oil, corn oil (high in pro-inflammatory oxidized omega-6).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-rose-950 uppercase flex items-center space-x-2">
                    <span>🥜 Nuts, Seeds & Legumes</span>
                  </h4>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Almonds, walnuts, peanuts, beans, lentils, chickpeas, chia seeds, coffee (during initial 30-day strict elimination).
                  </p>
                </div>
              </div>
            )}

            {/* Content for Healing Powerhouses */}
            {aipFilter === 'healing' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-teal-950 uppercase">🥣 Bone Broth & Collagen</h4>
                  <p className="text-xs text-teal-900 leading-relaxed">
                    Rich in glycine, proline, and glutamine which directly rebuild mucosal tight junctions in the intestinal epithelium.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-teal-950 uppercase">🐟 Wild-Caught Coldwater Fish</h4>
                  <p className="text-xs text-teal-900 leading-relaxed">
                    Salmon, sardines, mackerel, anchovies provide high EPA & DHA to downregulate inflammatory NF-kB and COX-2 enzymes.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200/80 space-y-2 shadow-xs bento-lift">
                  <h4 className="text-xs font-bold text-teal-950 uppercase">🥬 Colorful Phytonutrients</h4>
                  <p className="text-xs text-teal-900 leading-relaxed">
                    Cruciferous veggies, wild blueberries, turmeric with black pepper/oil, sauerkraut brine, and avocados for anti-inflammatory short-chain fatty acids.
                  </p>
                </div>
              </div>
            )}

            {/* Content for Reintroduction */}
            {aipFilter === 'reintroduction' && (
              <div className="space-y-4 text-xs text-slate-700">
                <p className="bg-sky-50/90 p-4 rounded-2xl border border-sky-200 text-sky-950 font-medium leading-relaxed bento-lift-subtle">
                  <strong>Reintroduction Rule:</strong> Reintroduce ONE single food at a time every 4-5 days. Eat half a teaspoon, wait 15 minutes, eat 1 teaspoon, wait 2 hours, eat a normal portion, then monitor your symptoms for 72 hours before trying another food.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1 bento-lift">
                    <span className="font-bold text-sky-700 block">Stage 1 (Easiest)</span>
                    <p className="text-[11px] text-slate-600">Egg yolks, seed-based spices (cumin, coriander), ghee, green beans, fruit-based seed oils.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1 bento-lift">
                    <span className="font-bold text-sky-700 block">Stage 2</span>
                    <p className="text-[11px] text-slate-600">Nuts and seeds, whole eggs, dark chocolate/cocoa, coffee.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1 bento-lift">
                    <span className="font-bold text-sky-700 block">Stage 3</span>
                    <p className="text-[11px] text-slate-600">Fermented A2 dairy (grass-fed goat cheese, kefir), nightshades (potatoes, cooked peppers).</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/80 border border-slate-200 space-y-1 bento-lift">
                    <span className="font-bold text-sky-700 block">Stage 4 (Hardest)</span>
                    <p className="text-[11px] text-slate-600">Tomatoes, non-gluten grains (white rice, corn, oats), alcohol (in strict moderation).</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* SECTION 4: SOMATIC BREATH & VAGUS NERVE */}
      {activeSection === 'vagus' && (
        <div className="space-y-6">
          <section className="p-6 sm:p-7 rounded-[32px] bento-glass space-y-6 shadow-sm bento-lift-subtle">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-sky-50/90 text-sky-700 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-100">
                  Nervous System
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-sky-600" />
                  <span>Somatic Vagus Nerve Stimulation & Breathing</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Stimulate the cholinergic anti-inflammatory pathway via slow diaphragmatic respiration to lower TNF-alpha and interleukin cytokines.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { setBreathMode('box'); setBreathPhase('Inhale'); setBreathCounter(4); }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all bento-lift-subtle ${
                    breathMode === 'box' ? 'bg-sky-600 text-white shadow-xs' : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  Box Breathing (4-4-4-4)
                </button>
                <button
                  onClick={() => { setBreathMode('relax'); setBreathPhase('Inhale'); setBreathCounter(4); }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all bento-lift-subtle ${
                    breathMode === 'relax' ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  4-7-8 Relaxing Breath
                </button>
              </div>
            </div>

            {/* Breathing Animation Canvas (Bento visualizer) */}
            <div className="py-12 flex flex-col items-center justify-center bg-slate-900 rounded-[32px] text-white space-y-6 relative overflow-hidden shadow-sm">
              <div className="relative flex items-center justify-center">
                {/* Outer pulsing circle */}
                <div 
                  className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                    breathPhase === 'Inhale' ? 'scale-110 border-teal-400 bg-teal-500/20 shadow-lg shadow-teal-500/30' :
                    breathPhase === 'Hold' ? 'scale-110 border-sky-400 bg-sky-500/20 shadow-lg shadow-sky-500/30' :
                    breathPhase === 'Exhale' ? 'scale-90 border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/30' :
                    'scale-90 border-slate-600 bg-slate-800/40'
                  }`}
                >
                  <div className="text-center space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                      {breathingActive ? breathPhase : 'Ready'}
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      {breathingActive ? breathCounter : '4s'}
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium">
                      {breathMode === 'box' ? 'Box Rhythm' : 'Vagal Reset'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setBreathingActive(!breathingActive)}
                  className="px-6 py-3 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm flex items-center space-x-2 transition-all shadow-md"
                >
                  {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{breathingActive ? 'Pause Exercise' : 'Start Breathing Rhythm'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 max-w-md text-center px-4">
                Inhale gently through nose expanding the belly • Exhale slowly through mouth with soft pursed lips
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
