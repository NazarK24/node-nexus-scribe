
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { GraphView } from '@/components/GraphView';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { TopBar } from '@/components/TopBar';
import { WelcomeModal } from '@/components/WelcomeModal';

const Index = () => {
  const [currentView, setCurrentView] = useState<'graph' | 'editor'>('graph');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
      <TopBar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <Sidebar onFileSelect={setSelectedFile} selectedFile={selectedFile} />
        
        <main className="flex-1 p-6">
          <div className="h-full bg-white/40 backdrop-blur-sm rounded-3xl shadow-neumorphic-large border border-white/50">
            {currentView === 'graph' ? (
              <GraphView />
            ) : (
              <MarkdownEditor selectedFile={selectedFile} />
            )}
          </div>
        </main>
      </div>

      {showWelcome && (
        <WelcomeModal onClose={() => setShowWelcome(false)} />
      )}
    </div>
  );
};

export default Index;
