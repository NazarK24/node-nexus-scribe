
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentCreatorProps {
  onCreateDocument: (title: string) => void;
}

export const DocumentCreator = ({ onCreateDocument }: DocumentCreatorProps) => {
  const handleCreateDocument = () => {
    const timestamp = new Date().toLocaleString();
    const title = `Untitled Document - ${timestamp}`;
    onCreateDocument(title);
  };

  return (
    <Button
      onClick={handleCreateDocument}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300"
      style={{ 
        backgroundColor: '#a2d5f2',
        borderRadius: '12px',
        color: 'white'
      }}
    >
      <Plus className="w-4 h-4" />
      Create Document
    </Button>
  );
};
