
import React from 'react';
import { Search, Grid3X3, Edit3, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  currentView: 'graph' | 'editor';
  onViewChange: (view: 'graph' | 'editor') => void;
}

export const TopBar = ({ currentView, onViewChange }: TopBarProps) => {
  return (
    <header className="h-16 bg-white/60 backdrop-blur-md border-b border-white/20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          KnowledgeGraph
        </h1>
        
        <div className="flex bg-white/40 rounded-2xl p-1 shadow-neumorphic-inset">
          <Button
            variant={currentView === 'graph' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('graph')}
            className={`rounded-xl transition-all duration-200 ${
              currentView === 'graph' 
                ? 'bg-primary text-white shadow-neumorphic' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Graph
          </Button>
          <Button
            variant={currentView === 'editor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('editor')}
            className={`rounded-xl transition-all duration-200 ${
              currentView === 'editor' 
                ? 'bg-primary text-white shadow-neumorphic' 
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Editor
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search files..."
            className="pl-10 pr-4 py-2 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 
                     shadow-neumorphic-inset text-sm placeholder-gray-500 focus:outline-none 
                     focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200
                     w-64"
          />
        </div>
        
        <Button variant="ghost" size="sm" className="rounded-xl hover:shadow-neumorphic">
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="rounded-xl hover:shadow-neumorphic">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
