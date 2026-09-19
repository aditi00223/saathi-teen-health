import React from 'react';

export default function Header({ 
  selectedLanguage, 
  onSelectLanguage, 
  onQuickExit 
}) {
  const languages = [
    { code: 'English', label: 'EN' },
    { code: 'Hindi', label: 'हिं' },
    { code: 'Punjabi', label: 'ਪੰ' },
    { code: 'Hinglish', label: 'Hing' }
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high shadow-[0_1px_12px_rgba(46,42,59,0.04)]">
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex flex-col gap-2">
        {/* Top Row: Logo, Languages, Quick Exit */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo with Heart Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px] fill">favorite</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-primary tracking-tight">Saathi</span>
                <span className="text-xs font-semibold text-primary/70">(साथी)</span>
              </div>
              <span className="text-[11px] text-on-surface-variant leading-none">
                your private health companion
              </span>
            </div>
          </div>

          {/* Controls: Language Pills & Quick Exit */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center bg-surface-container rounded-full p-0.5 shadow-inner" role="group" aria-label="Language selector">
              {languages.map((lang) => {
                const isActive = selectedLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onSelectLanguage(lang.code)}
                    className={`h-7 px-2.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    title={`Switch to ${lang.code}`}
                    type="button"
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Exit Button */}
            <button
              onClick={onQuickExit}
              className="h-8 px-3 rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-all flex items-center gap-1 text-xs font-semibold shadow-sm active:scale-95"
              title="Quickly exit and wipe chat"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Quick Exit</span>
            </button>
          </div>
        </div>

        {/* Bottom Banner: Privacy reassurance */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary">
            <span className="material-symbols-outlined text-[13px] fill">lock</span>
            <span className="text-[11px] font-medium tracking-tight">
              Anonymous. No login. Nothing is stored.
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium">
            Safe & Confidential Space
          </span>
        </div>
      </div>
    </header>
  );
}
