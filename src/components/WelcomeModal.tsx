
import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, Users, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeModalProps {
  onClose: () => void;
}

export const WelcomeModal = ({ onClose }: WelcomeModalProps) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to KnowledgeGraph",
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Your collaborative knowledge management platform where ideas connect and grow.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-800">Graph View</div>
              <div className="text-xs text-gray-500">Visualize connections</div>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-800">Collaborate</div>
              <div className="text-xs text-gray-500">Real-time editing</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-2xl">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Code className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-sm font-medium text-gray-800">Execute</div>
              <div className="text-xs text-gray-500">Run code blocks</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Explore Your Graph",
      icon: <Sparkles className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            See how your knowledge connects. Hover over nodes to highlight relationships.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                ML
              </div>
              <div className="w-8 h-0.5 bg-blue-300"></div>
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                AI
              </div>
              <div className="w-8 h-0.5 bg-purple-300"></div>
              <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                DS
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Files automatically connect through wikilinks and shared concepts
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Start Creating",
      icon: <Code className="w-8 h-8 text-green-500" />,
      content: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Ready to build your knowledge graph? Create your first note and see the magic happen.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <div className="text-left">
              <div className="text-sm font-mono text-gray-700 mb-2">
                # My First Note
              </div>
              <div className="text-sm font-mono text-gray-700 mb-2">
                This connects to [[Machine Learning]]
              </div>
              <div className="text-sm font-mono text-gray-700">
                ```python<br />
                print("Hello, Knowledge Graph!")
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Use [[wikilinks]] to connect files and create executable code blocks
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-neumorphic-large max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {steps[step].icon}
              <h2 className="text-xl font-bold text-gray-800">
                {steps[step].title}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-xl hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-6">
            {steps[step].content}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === step ? 'bg-primary w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
                >
                  Get Started <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
