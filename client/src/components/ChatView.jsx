import React, { useState, useEffect, useRef } from 'react';
import ActionPlanCard from './ActionPlanCard';
import UrgentHelpCard from './UrgentHelpCard';
import MythOrFactCard from './MythOrFactCard';

export default function ChatView({
  messages,
  onSendMessage,
  isLoading,
  error,
  onViewFullActionPlan,
  selectedLanguage
}) {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Web Speech API safely
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Set language based on selected language
      if (selectedLanguage === 'Hindi') {
        recognition.lang = 'hi-IN';
      } else if (selectedLanguage === 'Punjabi') {
        recognition.lang = 'pa-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
  }, [selectedLanguage]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleVoiceToggle = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Speech recognition error:', e);
        setIsListening(false);
      }
    }
  };

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || isLoading) return;
    onSendMessage(query.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const starterChips = [
    { label: 'Period cramps relief 🌸', query: 'My period cramps hurt quite a bit. Is this normal and what gentle remedies help?' },
    { label: 'Irregular cycle? 🩸', query: 'My period is sometimes late or irregular. Should I be worried?' },
    { label: 'Mood swings & stress 🧘', query: 'I feel very emotional, irritable and tearful before my period. Why does this happen?' },
    { label: 'Healthy skin & iron food 🥗', query: 'What Indian foods help with low iron, energy, and teenage skin changes?' }
  ];

  return (
    <div className="max-w-xl mx-auto flex flex-col pb-32">
      {/* Listening Status Pill */}
      <div className="flex items-center justify-between bg-surface-container-low px-4 py-2 rounded-2xl shadow-2xs mb-4">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span className="text-xs font-semibold text-secondary">
            Saathi is listening gently
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-[15px] fill">shield</span>
          <span className="text-[11px] font-medium">Safe & Private</span>
        </div>
      </div>

      {/* Welcome & Topic Starters Card */}
      {messages.length === 0 && (
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/40 shadow-sm space-y-4 mb-4 animate-fade-in">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-secondary text-2xl fill">
                favorite
              </span>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-on-surface flex items-center gap-1.5">
                Hi, I'm Saathi <span className="text-primary text-base">💜</span>
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Ask me anything about your body, periods, mood, nutrition, or hygiene. No questions are silly, and your conversation vanishes completely when you leave.
              </p>
            </div>
          </div>

          {/* Quick topic buttons */}
          <div className="space-y-2 pt-1 border-t border-surface-container">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
              Tap a starter topic:
            </p>
            <div className="flex flex-wrap gap-2">
              {starterChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface text-xs font-medium hover:bg-primary hover:text-on-primary active:scale-95 transition-all shadow-2xs border border-outline-variant/30"
                  type="button"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages Stream */}
      <div className="space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';

          if (isUser) {
            return (
              <div key={index} className="flex justify-end w-full pl-8 animate-fade-in">
                <div className="bg-primary-container text-on-primary-container p-4 rounded-3xl rounded-tr-sm shadow-sm max-w-[90%] space-y-1">
                  <p className="text-xs sm:text-sm text-on-primary leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                  <div className="flex justify-end items-center gap-1 opacity-80 pt-0.5">
                    <span className="text-[10px] text-on-primary font-medium">Just now</span>
                    <span className="material-symbols-outlined text-on-primary text-[13px]">done_all</span>
                  </div>
                </div>
              </div>
            );
          }

          // Bot message
          const data = msg.data || {};
          const isUrgent = data.actionLevel === 'Urgent help';

          return (
            <div key={index} className="flex items-start gap-2.5 w-full pr-3 animate-fade-in">
              <div className="w-9 h-9 rounded-2xl bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1 shadow-2xs">
                <span className="material-symbols-outlined text-secondary text-lg fill">
                  spa
                </span>
              </div>

              <div className="flex-1 space-y-3">
                {/* Saathi Reply Bubble */}
                <div className="bg-surface-container-lowest text-on-surface p-4 rounded-3xl rounded-tl-sm border border-outline-variant/40 shadow-xs space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">Saathi Sister</span>
                      <span className="bg-secondary-container/80 text-secondary px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        Reassurance
                      </span>
                    </div>
                    {data.actionLevel && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isUrgent ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {data.actionLevel}
                      </span>
                    )}
                  </div>

                  {/* Main text reply */}
                  <p className="text-xs sm:text-sm text-on-surface leading-relaxed whitespace-pre-wrap">
                    {data.reply || msg.text}
                  </p>

                  {/* Gentle Follow-up Questions if question was vague */}
                  {data.followUpQuestions && data.followUpQuestions.length > 0 && (
                    <div className="bg-surface-container-low/70 p-3 rounded-2xl border border-surface-container space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-[16px]">help_outline</span>
                        <span>To help you better, could you tell me:</span>
                      </div>
                      <div className="space-y-1.5">
                        {data.followUpQuestions.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSend(q)}
                            className="w-full text-left p-2 rounded-xl bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-all text-xs font-medium text-on-surface border border-outline-variant/30 flex items-center justify-between group shadow-2xs"
                            type="button"
                          >
                            <span>{q}</span>
                            <span className="material-symbols-outlined text-[14px] text-primary group-hover:text-on-primary">
                              arrow_forward
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Myth or Fact callout */}
                  {data.mythOrFact && (
                    <MythOrFactCard mythOrFact={data.mythOrFact} />
                  )}
                </div>

                {/* Urgent Safety Card if triggered */}
                {isUrgent && (
                  <UrgentHelpCard />
                )}

                {/* In-chat Action Plan Preview */}
                {data.actionLevel && (
                  <ActionPlanCard
                    actionLevel={data.actionLevel}
                    actionExplanation={data.actionExplanation}
                    onViewFullPlan={onViewFullActionPlan}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Loading / Typing Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5 w-full pr-4 animate-fade-in">
            <div className="w-9 h-9 rounded-2xl bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1 shadow-2xs">
              <span className="material-symbols-outlined text-secondary text-lg fill">
                spa
              </span>
            </div>
            <div className="bg-surface-container-lowest p-3.5 rounded-3xl rounded-tl-sm border border-outline-variant/40 shadow-xs flex items-center gap-2">
              <div className="flex space-x-1.5 items-center px-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]"></div>
              </div>
              <span className="text-xs text-on-surface-variant font-medium">
                Saathi is thinking gently...
              </span>
            </div>
          </div>
        )}

        {/* Error notification without breaking UI */}
        {error && (
          <div className="bg-error-container/40 border border-error/30 p-3 rounded-2xl text-xs text-on-error-container flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-error">error</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSend()}
              className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-xs font-semibold text-error hover:bg-error hover:text-white transition-colors"
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sticky Bottom Input Bar */}
      <div className="fixed bottom-24 left-0 right-0 z-30 px-4 pt-2 pb-1 bg-gradient-to-t from-surface via-surface/90 to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <div className="bg-surface-container-lowest/95 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-outline-variant/50 shadow-lg flex items-center gap-2">
            {/* Voice Input Button (hidden if unsupported) */}
            {speechSupported && (
              <button
                onClick={handleVoiceToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  isListening
                    ? 'bg-error text-on-error animate-pulse shadow-md'
                    : 'bg-surface-container text-on-surface-variant hover:text-primary active:scale-90'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Voice input (Hindi / English / Punjabi)'}
                type="button"
                aria-label="Voice input"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isListening ? 'mic_off' : 'mic'}
                </span>
              </button>
            )}

            {/* Input field */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? 'Listening now... speak softly...' : 'Type your question privately here...'}
              disabled={isLoading}
              className="flex-1 bg-transparent border-0 outline-none px-3 text-xs sm:text-sm text-on-surface placeholder:text-outline/70 focus:ring-0"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm active:scale-90 transition-transform flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
              aria-label="Send message"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>

          {/* Privacy reassurance below input */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <span className="material-symbols-outlined text-outline text-[12px]">lock</span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              Anonymous. No login. Nothing is stored.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
