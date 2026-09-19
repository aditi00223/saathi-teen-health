import React from 'react';

export default function QuickExitView({ onReturn }) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-800 p-6 flex flex-col font-sans">
      <div className="max-w-md mx-auto w-full space-y-6 pt-6">
        {/* Neutral Weather / Notes Header */}
        <div className="border-b border-neutral-300 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Daily Study Notes</h1>
            <p className="text-xs text-neutral-500">General revision & schedule</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-neutral-700">28°C</span>
            <p className="text-[11px] text-neutral-400">Partly Cloudy</p>
          </div>
        </div>

        {/* Realistic Boring School / Study Content */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs space-y-2">
            <h2 className="text-sm font-bold text-neutral-800">Chapter 6: Photosynthesis & Respiration</h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Photosynthesis is the biological process used by plants to synthesize nutrients from carbon dioxide and water using light energy.
            </p>
            <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2 rounded border border-neutral-100 font-mono">
              6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs space-y-2">
            <h2 className="text-sm font-bold text-neutral-800">Homework Checklist</h2>
            <ul className="text-xs text-neutral-600 space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-neutral-600" />
                <span>Maths Exercise 4.2 (Quadratic Equations)</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-neutral-600" />
                <span>English Literature: Summary paragraph</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-neutral-600" />
                <span>Chemistry lab manual diagram</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Discreet Return Option */}
        <div className="pt-10 flex justify-center">
          <button
            onClick={onReturn}
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors underline py-2 px-4"
            type="button"
          >
            ← Return to session
          </button>
        </div>
      </div>
    </div>
  );
}
