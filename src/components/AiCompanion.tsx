import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  ShieldAlert, 
  Flame, 
  FileText, 
  RotateCcw,
  Activity,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, SymptomLogEntry } from '../types';

interface AiCompanionProps {
  recentLogs?: SymptomLogEntry[];
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

export const AiCompanion: React.FC<AiCompanionProps> = ({
  recentLogs,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello, I am **ImmuneQ AI**, your autoimmune health companion and educational guide.\n\nI can help you:\n- 🔬 **Decipher lab biomarkers** (ANA, TPOAb, ESR, CRP, Anti-CCP, C3/C4, Fecal Calprotectin)\n- 🩺 **Prepare targeted questions** for your rheumatologist or specialist\n- 🥗 **Understand AIP nutrition** and anti-inflammatory lifestyle strategies\n- 🥄 **Formulate energy conservation** and flare-up rescue protocols\n\n*What would you like to explore today?*`,
      timestamp: Date.now(),
      suggestedPrompts: [
        'Explain elevated Anti-TPO and TgAb antibodies',
        'What questions should I ask at my first Rheumatologist appointment?',
        'How does barometric pressure affect joint inflammation?',
        'What is the difference between seropositive and seronegative RA?'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setLoading(true);

    try {
      // Build simple history
      const history = messages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          userContext: {
            recentLogsSummary: recentLogs ? `${recentLogs.length} logs recorded` : 'None'
          }
        })
      });

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I received your request but encountered an empty response. Please try again.',
        timestamp: Date.now(),
        suggestedPrompts: [
          'What lifestyle adjustments support this?',
          'What diagnostic blood tests should I discuss?',
          'How can I pace my energy during a flare?'
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("AI Error:", err);
      const fallbackMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        sender: 'assistant',
        text: `**Educational Note on: ${text}**\n\nAutoimmune disorders are complex systemic conditions where immune tolerance is broken. In managing chronic autoimmune illness, key priorities include:\n- Getting a comprehensive autoimmune serology workup (ANA IFA, complete blood counts, inflammatory markers ESR/CRP)\n- Tracking food sensitivities and environmental triggers\n- Protecting restorative sleep and regulating the autonomic nervous system.\n\n*Please discuss with your licensed physician.*`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bento Card */}
      <section className="p-6 sm:p-7 rounded-[32px] bg-slate-900/95 backdrop-blur-md text-white flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm border border-slate-800 bento-lift-subtle">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5" />
            <span>ImmuneQ Intelligence Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Autoimmune Clinical Educator & Q&A
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Empathetic AI medical educator to explain lab panels, autoimmune dynamics, and rheumatology visit questions.
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-all shadow-xs shrink-0 self-start md:self-auto bento-lift-subtle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </section>

      {/* Main Chat Bento Container */}
      <div className="bento-glass rounded-[32px] shadow-sm flex flex-col h-[620px] overflow-hidden bento-lift-subtle">
        
        {/* Messages Stream */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-5">
          {messages.map((msg) => {
            const isAi = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-9 h-9 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-2xl rounded-[24px] p-5 text-xs sm:text-sm leading-relaxed space-y-3 ${
                  isAi 
                    ? 'bento-glass-subtle text-slate-800 shadow-2xs' 
                    : 'bg-sky-600 text-white shadow-xs'
                }`}>
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Actions under AI response */}
                  {isAi && (
                    <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>ImmuneQ Clinical Education</span>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center space-x-1 hover:text-sky-600 font-bold transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Answer</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Suggested follow-up prompt chips */}
                  {isAi && msg.suggestedPrompts && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/90 border border-slate-200/80 text-slate-700 hover:border-sky-400 hover:text-sky-600 transition-all text-left flex items-center space-x-1.5 shadow-2xs bento-lift-subtle"
                        >
                          <span>{prompt}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isAi && (
                  <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3.5 items-center">
              <div className="w-9 h-9 rounded-2xl bg-sky-600 text-white flex items-center justify-center text-xs animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-[20px] bento-glass-subtle text-xs text-slate-600 flex items-center space-x-2.5">
                <div className="w-2 h-2 rounded-full bg-sky-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-bounce [animation-delay:0.4s]" />
                <span className="font-medium">ImmuneQ AI is analyzing medical literature...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 bento-glass-subtle border-t border-slate-200/60 space-y-2">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputPrompt);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              id="ai-companion-input"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask about symptoms, lab tests (e.g. ANA titer, CRP), flare pacing, or doctor visit questions..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white/90 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 shadow-2xs"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-sm bento-lift-subtle"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center">
            ⚕️ ImmuneQ provides educational insights. Always consult your rheumatologist or specialist for clinical diagnosis and prescriptions.
          </p>
        </div>

      </div>
    </div>
  );
};
