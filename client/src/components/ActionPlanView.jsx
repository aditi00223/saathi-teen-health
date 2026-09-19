import React from 'react';
import { ACTION_LEVELS } from './ActionPlanCard';
import UrgentHelpCard from './UrgentHelpCard';

export default function ActionPlanView({ 
  latestActionLevel = 'Self-care', 
  latestExplanation, 
  onBackToChat 
}) {
  const currentLevel = latestActionLevel || 'Self-care';

  const selfCareTips = [
    {
      title: "Warmth & Comfort",
      desc: "Apply a warm water bottle or heating pad to your lower abdomen or lower back for 15-20 minutes.",
      icon: "wb_sunny"
    },
    {
      title: "Hydration & Warm Sips",
      desc: "Sip warm ginger tea, ajwain water, or simply lukewarm water to ease muscle spasms.",
      icon: "local_cafe"
    },
    {
      title: "Gentle Rest Position",
      desc: "Lie on your side with your knees bent toward your chest (fetal position) to relieve tension.",
      icon: "bed"
    },
    {
      title: "Nourishing Foods",
      desc: "Opt for warm dal, khichdi, leafy greens (palak), dates, and jaggery for iron replenishment.",
      icon: "nutrition"
    }
  ];

  return (
    <div className="max-w-xl mx-auto space-y-5 pb-12 animate-fade-in">
      {/* View Header */}
      <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px] fill">spa</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-on-surface">Your Action Plan</h2>
              <p className="text-xs text-on-surface-variant">4-tier supportive healthcare guide</p>
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
          Saathi categorizes every health situation into four clear care levels, so you always know what step to take next with confidence.
        </p>
      </div>

      {/* Current Level Highlight */}
      <div className="bg-primary/5 border border-primary/20 p-5 rounded-3xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Current Assessment
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary">
            Level: {currentLevel}
          </span>
        </div>

        <p className="text-sm font-semibold text-on-surface">
          {latestExplanation || "Based on your discussion, here is the recommended care pathway:"}
        </p>

        {currentLevel === 'Urgent help' && (
          <UrgentHelpCard />
        )}
      </div>

      {/* 4 Levels Detailed Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider px-1">
          The 4 Care Levels Explained
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {ACTION_LEVELS.map((level) => {
            const isCurrent = level.id === currentLevel;
            return (
              <div
                key={level.id}
                className={`p-4 rounded-3xl border transition-all ${
                  isCurrent
                    ? 'border-2 border-primary bg-surface-container-lowest shadow-md ring-2 ring-primary/20'
                    : 'border-outline-variant/40 bg-surface-container-lowest/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${level.activeBadge}`}>
                      <span className="material-symbols-outlined text-[20px] fill">{level.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-on-surface">{level.label}</h4>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                            Active Recommendation
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">{level.desc}</p>
                    </div>
                  </div>
                </div>

                {level.id === 'Self-care' && (
                  <div className="mt-3 pt-3 border-t border-surface-container grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selfCareTips.map((tip, idx) => (
                      <div key={idx} className="bg-surface-container-low/60 p-2.5 rounded-2xl flex items-start gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px] mt-0.5">{tip.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-on-surface">{tip.title}</p>
                          <p className="text-[11px] text-on-surface-variant leading-tight mt-0.5">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {level.id === 'Talk to a trusted adult' && (
                  <div className="mt-3 pt-3 border-t border-surface-container text-xs text-on-surface-variant space-y-1">
                    <p className="font-semibold text-primary">When to choose this:</p>
                    <p>If you feel nervous, have questions about pads or changes, or want support purchasing hygiene products or scheduling an appointment.</p>
                  </div>
                )}

                {level.id === 'See a doctor' && (
                  <div className="mt-3 pt-3 border-t border-surface-container text-xs text-on-surface-variant space-y-1">
                    <p className="font-semibold text-amber-800">When to choose this:</p>
                    <p>Cramps that keep you from school/routine despite resting, periods lasting more than 8 days, or cycles that haven't appeared for 90+ days after starting.</p>
                  </div>
                )}

                {level.id === 'Urgent help' && (
                  <div className="mt-3 pt-3 border-t border-surface-container text-xs text-error space-y-1">
                    <p className="font-semibold">When to choose this:</p>
                    <p>Sudden extreme pelvic pain, bleeding through more than 1 pad every hour for several hours, dizziness, or emotional distress crisis.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
