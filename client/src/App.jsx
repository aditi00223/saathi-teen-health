import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ChatView from './components/ChatView';
import ActionPlanView from './components/ActionPlanView';
import ScriptsView from './components/ScriptsView';
import QuickExitView from './components/QuickExitView';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isQuickExit, setIsQuickExit] = useState(false);

  // Quick Exit: Instantly erase state from memory & swap view
  const handleQuickExit = () => {
    setMessages([]);
    setLatestData(null);
    setError(null);
    setIsQuickExit(true);
  };

  const handleReturnFromQuickExit = () => {
    setIsQuickExit(false);
    setActiveTab('chat');
  };

  const handleSendMessage = async (text) => {
    if (!text || !text.trim() || isLoading) return;

    setError(null);
    const userMsg = { sender: 'user', text: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build brief history context
      const historyPayload = messages.slice(-4).map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyPayload,
          language: selectedLanguage
        })
      });

      const json = await res.json();

      if (!res.ok || !json.data) {
        throw new Error(json.error || 'Server error occurred');
      }

      const botData = json.data;
      const botMsg = {
        sender: 'bot',
        text: botData.reply || '',
        data: botData
      };

      setMessages([...updatedMessages, botMsg]);
      setLatestData(botData);
    } catch (err) {
      console.error('[Saathi Chat Request Error]', err);
      setError('Could not connect to Saathi right now. Please try again in a moment.');
      // Add a reassuring fallback message so demo never shows a dead end
      const fallbackBotMsg = {
        sender: 'bot',
        text: 'I had a slight hiccup connecting to my knowledge base, but remember: you are safe here. Take a slow, gentle breath and try tapping send once more.',
        data: {
          reply: 'I had a slight hiccup connecting to my knowledge base, but remember: you are safe here. Take a slow, gentle breath and try tapping send once more.',
          followUpQuestions: [],
          actionLevel: 'Self-care',
          actionExplanation: 'Rest, gentle warmth, and hydration are always safe immediate steps.',
          script: 'Mom, I am experiencing some discomfort today and wanted to ask if you could help me.',
          summary: 'Inquiry paused due to connectivity.',
          mythOrFact: null
        }
      };
      setMessages([...updatedMessages, fallbackBotMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // If Quick Exit triggered, replace UI completely
  if (isQuickExit) {
    return <QuickExitView onReturn={handleReturnFromQuickExit} />;
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Header with simple heart logo & privacy notice */}
      <Header
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        onQuickExit={handleQuickExit}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-28 px-4 pb-20">
        {activeTab === 'chat' && (
          <ChatView
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            error={error}
            onViewFullActionPlan={() => setActiveTab('action-plan')}
            selectedLanguage={selectedLanguage}
          />
        )}

        {activeTab === 'action-plan' && (
          <ActionPlanView
            latestActionLevel={latestData?.actionLevel || 'Self-care'}
            latestExplanation={latestData?.actionExplanation}
            onBackToChat={() => setActiveTab('chat')}
          />
        )}

        {activeTab === 'scripts' && (
          <ScriptsView
            latestScript={latestData?.script}
            latestSummary={latestData?.summary}
            onBackToChat={() => setActiveTab('chat')}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
