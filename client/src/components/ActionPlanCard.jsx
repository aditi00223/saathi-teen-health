import React from 'react';

export const ACTION_LEVELS = [
  {
    id: 'Self-care',
    label: 'Self-care',
    icon: 'self_improvement',
    color: 'border-secondary bg-secondary-container/20 text-secondary',
    activeBadge: 'bg-secondary text-on-secondary',
    desc: 'Gentle warmth, rest, hydration & soothing routine'
  },
  {
    id: 'Talk to a trusted adult',
    label: 'Talk to an Adult',
    icon: 'supervisor_account',
    color: 'border-primary bg-primary-container/15 text-primary',
    activeBadge: 'bg-primary text-on-primary',
    desc: 'Share with mom, sister, aunt, or school nurse'
  },
  {
    id: 'See a doctor',
    label: 'See a Doctor',
    icon: 'medical_services',
    color: 'border-amber-500 bg-amber-50 text-amber-800',
    activeBadge: 'bg-amber-600 text-white',
    desc: 'Consult a pediatrician or gynecologist for checkup'
  },
  {
    id: 'Urgent help',
    label: 'Urgent Help',
    icon: 'emergency',
    color: 'border-error bg-error-container/30 text-error',
    activeBadge: 'bg-error text-on-error',
    desc: 'Immediate care, emergency room, or 24/7 helplines'
  }
];

export default function ActionPlanCard({ actionLevel, actionExplanation, onViewFullPlan }) {
  const currentLevel = actionLevel || 'Self-care';

  return (
    <div className="bg-surface-container-high/60 border border-outline-variant/50 p-4 rounded-3xl shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[18px]">task_alt</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">4-Level Action Guide</h4>
            <p className="text-[11px] text-on-surface-variant">Recommended next step</p>
          </div>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 bg-surface-container-lowest text-primary rounded-full font-semibold shadow-2xs border border-primary/20">
          Personalized
        </span>
      </div>

      {/* 4 Levels Indicator */}
      <div className="grid grid-cols-2 gap-2">
        {ACTION_LEVELS.map((level) => {
          const isSelected = level.id === currentLevel;
          return (
            <div
              key={level.id}
              className={`p-2.5 rounded-2xl border transition-all flex items-start gap-2 ${
                isSelected
                  ? `border-2 ${level.color} shadow-sm ring-2 ring-primary/20 font-semibold scale-[1.01]`
                  : 'border-surface-container bg-surface-container-lowest/80 text-on-surface-variant opacity-75'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] mt-0.5 ${isSelected ? 'fill' : ''}`}>
                {level.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate block">{level.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse ml-1" />
                  )}
                </div>
                <span className="text-[10px] leading-tight block line-clamp-1 opacity-85">
                  {level.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Explanation for chosen level */}
      {actionExplanation && (
        <div className="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>Why Saathi recommends: {currentLevel}</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {actionExplanation}
          </p>
        </div>
      )}

      {/* View Full Action Plan CTA */}
      {onViewFullPlan && (
        <button
          onClick={onViewFullPlan}
          className="w-full h-11 rounded-full bg-primary text-on-primary flex items-center justify-center gap-2 text-xs font-semibold shadow-sm active:scale-95 transition-all hover:opacity-95"
          type="button"
        >
          <span>View Detailed Action Plan</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      )}
    </div>
  );
}
