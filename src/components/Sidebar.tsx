
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onFileSelect: (fileName: string) => void;
  selectedFile: string | null;
  documents: string[];
  onDocumentDelete: (docName: string) => void;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

const sampleFiles: FileNode[] = [
  {
    name: 'Welcome',
    type: 'folder',
    path: 'welcome',
    children: [
      { name: 'Getting Started.md', type: 'file', path: 'welcome/getting-started.md' },
      { name: 'Graph Tutorial.md', type: 'file', path: 'welcome/graph-tutorial.md' },
    ]
  },
  {
    name: 'Research',
    type: 'folder', 
    path: 'research',
    children: [
      { name: 'Machine Learning.md', type: 'file', path: 'research/machine-learning.md' },
      { name: 'Data Analysis.ipynb', type: 'file', path: 'research/data-analysis.ipynb' },
    ]
  },
  { name: 'Daily Notes.md', type: 'file', path: 'daily-notes.md' },
  { name: 'Ideas.md', type: 'file', path: 'ideas.md' },
];

export const Sidebar = ({ onFileSelect, selectedFile, documents, onDocumentDelete }: SidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['welcome']));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleContextMenu = (e: React.MouseEvent, docName: string) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete "${docName}"?`)) {
      onDocumentDelete(docName);
    }
  };

  const FileTreeNode = ({ node, depth = 0 }: { node: FileNode; depth?: number }) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;
    
    return (
      <div>
        <div
          className={`flex items-center gap-2 px-3 py-2 mx-2 rounded-xl cursor-pointer
                     transition-all duration-200 hover:bg-white/30 group
                     ${isSelected ? 'bg-primary/10 border border-primary/20 shadow-neumorphic-inset' : ''}
                     ${depth > 0 ? 'ml-4' : ''}`}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
          onContextMenu={(e) => node.type === 'file' && handleContextMenu(e, node.name)}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              <Folder className="w-4 h-4 text-blue-500" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <File className="w-4 h-4 text-gray-500" />
            </>
          )}
          <span className={`text-sm truncate flex-1 ${isSelected ? 'text-primary font-medium' : 'text-gray-700'}`}>
            {node.name}
          </span>
          {node.type === 'file' && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 p-1 h-auto hover:bg-red-100"
              onClick={(e) => {
                e.stopPropagation();
                handleContextMenu(e, node.name);
              }}
            >
              <Trash2 className="w-3 h-3 text-red-500" />
            </Button>
          )}
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div className="ml-2">
            {node.children.map((child) => (
              <FileTreeNode key={child.path} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render user documents
  const UserDocuments = () => (
    <div className="space-y-1">
      <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
        Your Documents
      </div>
      {documents.map((doc) => (
        <div
          key={doc}
          className={`flex items-center gap-2 px-3 py-2 mx-2 rounded-xl cursor-pointer
                     transition-all duration-200 hover:bg-white/30 group
                     ${selectedFile === doc ? 'bg-primary/10 border border-primary/20 shadow-neumorphic-inset' : ''}`}
          onClick={() => onFileSelect(doc)}
          onContextMenu={(e) => handleContextMenu(e, doc)}
        >
          <div className="w-4" />
          <File className="w-4 h-4 text-gray-500" />
          <span className={`text-sm truncate flex-1 ${selectedFile === doc ? 'text-primary font-medium' : 'text-gray-700'}`}>
            {doc}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 p-1 h-auto hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(e, doc);
            }}
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <aside className="w-80 bg-white/30 backdrop-blur-sm border-r border-white/20 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Files</h2>
        <Button size="sm" variant="ghost" className="rounded-xl hover:shadow-neumorphic">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Filter files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 
                   shadow-neumorphic-inset text-sm placeholder-gray-500 focus:outline-none 
                   focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <UserDocuments />
        
        <div className="space-y-1">
          <div className="px-3 py-1 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Sample Files
          </div>
          {sampleFiles.map((node) => (
            <FileTreeNode key={node.path} node={node} />
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-white/50 shadow-neumorphic-inset">
        <div className="text-xs text-gray-600 mb-1">Storage Used</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white/50 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-500" 
                 style={{ width: '23%' }} />
          </div>
          <span className="text-xs text-gray-500">230MB / 1GB</span>
        </div>
      </div>
    </aside>
  );
};
