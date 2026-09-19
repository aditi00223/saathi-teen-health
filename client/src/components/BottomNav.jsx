import React from 'react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: 'chat_bubble' },
    { id: 'action-plan', label: 'Action Plan', icon: 'spa' },
    { id: 'scripts', label: 'Scripts', icon: 'forum' }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_20px_rgba(46,42,59,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[72px] min-h-[44px] py-1 px-3 rounded-full transition-all gap-0.5 ${
                isActive
                  ? 'text-primary font-semibold bg-surface-container shadow-xs scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[12px] leading-tight font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
