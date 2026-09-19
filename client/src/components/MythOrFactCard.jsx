import React, { useState } from 'react';

export default function MythOrFactCard({ mythOrFact }) {
  const [revealed, setRevealed] = useState(false);

  if (!mythOrFact) return null;

  return (
    <div className="bg-tertiary-container/15 border border-tertiary/20 p-4 rounded-3xl shadow-xs space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] fill">auto_fix</span>
          </div>
          <span className="text-xs font-bold text-tertiary">Myth or Fact? 💡</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-surface-container-lowest text-tertiary border border-tertiary/20">
          Cultural Clarifier
        </span>
      </div>

      {mythOrFact.topic && (
        <div className="bg-surface-container-lowest/90 p-3 rounded-2xl border border-surface-container">
          <p className="text-xs font-semibold text-on-surface">
            Common belief: <span className="italic">"{mythOrFact.topic}"</span>
          </p>
        </div>
      )}

      <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
          <span className="material-symbols-outlined text-[16px] fill">check_circle</span>
          <span>The Truth:</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {mythOrFact.fact}
        </p>
      </div>
    </div>
  );
}
