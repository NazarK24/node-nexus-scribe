
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { GraphView } from '@/components/GraphView';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { TopBar } from '@/components/TopBar';
import { WelcomeModal } from '@/components/WelcomeModal';
import { DocumentCreator } from '@/components/DocumentCreator';
import { SettingsPanel } from '@/components/SettingsPanel';

const Index = () => {
  const [currentView, setCurrentView] = useState<'graph' | 'editor'>('graph');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [documents, setDocuments] = useState<string[]>(['Welcome.md', 'Getting Started.md']);

  const handleCreateDocument = (title: string) => {
    const newDoc = `${title}.md`;
    setDocuments(prev => [...prev, newDoc]);
    setSelectedFile(newDoc);
    setCurrentView('editor');
    console.log('Created new document:', newDoc);
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
      <TopBar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onSettingsClick={handleSettingsToggle}
        documentCreator={<DocumentCreator onCreateDocument={handleCreateDocument} />}
      />
      
      <div className="flex w-full h-[calc(100vh-4rem)]">
        <Sidebar 
          onFileSelect={setSelectedFile} 
          selectedFile={selectedFile}
          documents={documents}
          onDocumentDelete={(docName) => {
            setDocuments(prev => prev.filter(doc => doc !== docName));
            if (selectedFile === docName) {
              setSelectedFile(null);
            }
          }}
        />
        
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

      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default Index;
