
import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Link, Code, List, ListOrdered, Quote, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface MarkdownEditorProps {
  selectedFile: string | null;
}

export const MarkdownEditor = ({ selectedFile }: MarkdownEditorProps) => {
  const [content, setContent] = useState(`# Welcome to KnowledgeGraph

This is your collaborative knowledge management platform where ideas connect and grow.

## Features

- **Interactive Graph Visualization** - See how your ideas connect
- **Real-time Collaboration** - Work together seamlessly  
- **Code Execution** - Run Python, JavaScript, and R code blocks
- **Wikilink Support** - Connect files with [[filename]] syntax

## Getting Started

1. Create your first note using the sidebar
2. Add connections with wikilinks: [[Machine Learning]]
3. View the graph to see relationships
4. Collaborate with your team in real-time

\`\`\`python
# Example code block
import numpy as np
import matplotlib.pyplot as plt

# Create some sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Sine Wave")
plt.show()
\`\`\`

Start exploring your knowledge graph!
`);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && !isPreview) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`;
    }
  }, [content, isPreview]);

  const formatMarkdown = (wrapper: string, text: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || text;
    
    const newText = content.substring(0, start) + 
                   `${wrapper}${selectedText}${wrapper}` + 
                   content.substring(end);
    
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + wrapper.length, 
        start + wrapper.length + selectedText.length
      );
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Enhanced markdown rendering with proper line breaks and overflow handling
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-900 break-words">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 text-gray-800 break-words">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-medium mb-2 text-gray-700 break-words">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono break-all">$1</code>')
      .replace(/\[\[(.*?)\]\]/g, '<span class="text-blue-600 underline cursor-pointer break-words">$1</span>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-white p-4 rounded-lg my-4 overflow-x-auto min-w-0"><code class="text-sm whitespace-pre">$2</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p class="mb-4">')
      .replace(/$/, '</p>');
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white/20 backdrop-blur-sm rounded-t-3xl flex-shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800 truncate">
            {selectedFile || 'Welcome.md'}
          </h3>
          <span className="text-xs text-gray-500 bg-white/40 px-2 py-1 rounded-lg flex-shrink-0">
            Markdown
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-white/40 rounded-xl p-1">
            {!isPreview && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatMarkdown('**', 'bold text')}
                  className="rounded-lg hover:bg-white/50"
                >
                  <Bold className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatMarkdown('*', 'italic text')}
                  className="rounded-lg hover:bg-white/50"
                >
                  <Italic className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatMarkdown('`', 'code')}
                  className="rounded-lg hover:bg-white/50"
                >
                  <Code className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => formatMarkdown('[[', 'link]]')}
                  className="rounded-lg hover:bg-white/50"
                >
                  <Link className="w-4 h-4" />
                </Button>
              </>
            )}
            
            <Button
              size="sm"
              variant={isPreview ? "default" : "ghost"}
              onClick={() => setIsPreview(!isPreview)}
              className="rounded-lg"
            >
              {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        {isPreview ? (
          <div 
            className="h-full overflow-y-auto prose prose-sm max-w-none break-words"
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-full bg-transparent border-none outline-none resize-none 
                     text-gray-800 text-sm leading-relaxed font-mono
                     placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0
                     overflow-y-auto"
            placeholder="Start writing your markdown here..."
            style={{ 
              minHeight: '200px',
              height: 'auto',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap'
            }}
          />
        )}
      </div>

      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-b-3xl border-t border-white/20 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>{content.split('\n').length} lines</span>
            <span>{content.length} characters</span>
            <span>Last saved: just now</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Auto-save enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
