import React, { useState } from 'react';

export default function ScriptsView({ 
  latestScript, 
  latestSummary, 
  onBackToChat 
}) {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const defaultScript = latestScript || "Mom, my lower tummy has been hurting with my period today, and I'm feeling a bit uncomfortable. Could you help me make some warm tea and find a heating pad?";
  const defaultSummary = latestSummary || "Teen reports menstrual cramps and lower abdominal tenderness for 1-2 days. Seeking guidance on pain management and cycle normalcy.";

  const handleCopyScript = () => {
    navigator.clipboard.writeText(defaultScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(defaultSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] fill">forum</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-on-surface">Conversation Scripts</h2>
              <p className="text-xs text-on-surface-variant">Simple words to express what you feel</p>
            </div>
          </div>
          <button
            onClick={onBackToChat}
            className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Back to Chat</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed pt-1">
          Talking about periods and bodily changes can feel awkward or overwhelming. Saathi writes easy, respectful scripts you can use directly or copy into a text message.
        </p>
      </div>

      {/* Script Card: How to tell mom or doctor */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] fill">record_voice_over</span>
            <h3 className="text-sm font-bold text-on-surface">How to tell your mom or elder sister</h3>
          </div>
          <button
            onClick={handleCopyScript}
            className="h-8 px-3 rounded-full bg-primary-container text-on-primary text-xs font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shadow-2xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copiedScript ? 'check' : 'content_copy'}
            </span>
            <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
          </button>
        </div>

        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container">
          <p className="text-sm sm:text-base text-on-surface italic leading-relaxed">
            "{defaultScript}"
          </p>
        </div>

        <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">tips_and_updates</span>
          <span>Tip: You can read this aloud, or copy-paste it directly into WhatsApp or SMS.</span>
        </p>
      </div>

      {/* Doctor Visit Summary Card */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px] fill">medical_information</span>
            <h3 className="text-sm font-bold text-on-surface">Doctor Visit Quick Summary</h3>
          </div>
          <button
            onClick={handleCopySummary}
            className="h-8 px-3 rounded-full bg-secondary text-on-secondary text-xs font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shadow-2xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copiedSummary ? 'check' : 'content_copy'}
            </span>
            <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>

        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container">
          <p className="text-xs sm:text-sm text-on-surface font-mono leading-relaxed">
            {defaultSummary}
          </p>
        </div>

        <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">lock_reset</span>
          <span>Generated on demand from your recent question. Never saved to any database.</span>
        </p>
      </div>
    </div>
  );
}
