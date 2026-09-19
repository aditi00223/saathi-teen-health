import React, { useState } from 'react';

// IMPORTANT: Please verify these official national helpline numbers before the demo!
// Childline: 1098 (Toll-free 24/7 helpline for children and teens in India)
// Tele-MANAS: 14416 (Toll-free 24/7 mental health helpline by Ministry of Health, Govt of India)

export default function UrgentHelpCard({ compact = false }) {
  const [copiedId, setCopiedId] = useState(null);

  const helplines = [
    {
      id: 'childline',
      name: 'Childline India',
      number: '1098',
      desc: 'Free 24/7 emergency care & protection for children and teens',
      type: 'Safety & Emergency'
    },
    {
      id: 'tele-manas',
      name: 'Tele-MANAS',
      number: '14416',
      desc: '24/7 toll-free mental health & psychological crisis support',
      type: 'Mental Health Crisis'
    }
  ];

  const handleCopy = (id, num) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-error-container/30 border border-error/20 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
      {/* Alert Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <span className="material-symbols-outlined text-[22px] fill">emergency</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm sm:text-base text-on-error-container">
              Urgent Care & Immediate Support
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-error text-on-error text-[10px] font-bold tracking-wide uppercase">
              Important
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
            Please don't face intense pain, severe bleeding, or crisis alone. Tell a parent, guardian, or call these free official Indian helplines right now:
          </p>
        </div>
      </div>

      {/* Helplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {helplines.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/40 flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">{item.name}</span>
                <span className="text-[10px] font-medium text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
                  {item.type}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-surface-container">
              <a
                href={`tel:${item.number}`}
                className="flex items-center gap-1 text-primary font-bold text-sm hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>{item.number}</span>
              </a>

              <button
                onClick={() => handleCopy(item.id, item.number)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-1 text-on-surface"
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedId === item.id ? 'check' : 'content_copy'}
                </span>
                <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-on-surface-variant italic text-center pt-1">
        If you or someone around you is in immediate medical danger, please visit the nearest clinic or hospital emergency room.
      </p>
    </div>
  );
}
