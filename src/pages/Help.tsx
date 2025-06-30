import React, { useState } from 'react';
import { Search, Book, MessageCircle, Video, FileText, ChevronRight, Star, ThumbsUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const quickStartGuides = [
    {
      title: 'Getting Started with KnowledgeGraph',
      description: 'Learn the basics of creating and managing your first workspace',
      duration: '5 min read',
      icon: Book,
      color: 'bg-blue-500'
    },
    {
      title: 'Creating Your First Knowledge Graph',
      description: 'Step-by-step guide to building connected knowledge',
      duration: '8 min read',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Collaborating with Your Team',
      description: 'Invite members and work together in real-time',
      duration: '6 min read',
      icon: MessageCircle,
      color: 'bg-purple-500'
    },
    {
      title: 'Advanced Graph Features',
      description: 'Explore powerful visualization and analysis tools',
      duration: '10 min read',
      icon: Video,
      color: 'bg-orange-500'
    }
  ];

  const faqItems = [
    {
      question: 'How do I create my first workspace?',
      answer: 'To create a workspace, click the "New Workspace" button on your dashboard. Choose a template or start from scratch, give it a name and description, and invite your team members.'
    },
    {
      question: 'Can I import data from other tools?',
      answer: 'Yes! KnowledgeGraph supports importing from Notion, Google Docs, Markdown files, and many other formats. Go to Settings > Integrations to connect your tools.'
    },
    {
      question: 'How does real-time collaboration work?',
      answer: 'When multiple people are editing the same document, you\'ll see their cursors and changes in real-time. All changes are automatically saved and synced across all devices.'
    },
    {
      question: 'What are wikilinks and how do I use them?',
      answer: 'Wikilinks are connections between documents using [[double brackets]]. Type [[filename]] to link to another document. This creates the knowledge graph connections.'
    },
    {
      question: 'Can I execute code in documents?',
      answer: 'Yes! Use code blocks with language specification (```python, ```javascript, etc.) and click the run button to execute code directly in your documents.'
    },
    {
      question: 'How do I manage workspace permissions?',
      answer: 'Go to Workspace Settings > Members to manage roles. Owners can manage everything, Admins can manage members, Editors can create content, and Viewers can only read.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption, regular backups, and comply with SOC 2 and GDPR standards. Your data is always encrypted in transit and at rest.'
    },
    {
      question: 'How do I export my data?',
      answer: 'You can export individual documents as Markdown, PDF, or HTML. For full workspace exports, go to Workspace Settings > Advanced > Export Data.'
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/workspaces',
      description: 'List all workspaces for the authenticated user'
    },
    {
      method: 'POST',
      endpoint: '/api/workspaces',
      description: 'Create a new workspace'
    },
    {
      method: 'GET',
      endpoint: '/api/workspaces/{id}/documents',
      description: 'Get all documents in a workspace'
    },
    {
      method: 'POST',
      endpoint: '/api/documents',
      description: 'Create a new document'
    },
    {
      method: 'PUT',
      endpoint: '/api/documents/{id}',
      description: 'Update an existing document'
    }
  ];

  const tutorials = [
    {
      title: 'Building a Product Roadmap',
      description: 'Learn how to create and maintain a product roadmap using KnowledgeGraph',
      type: 'Video Tutorial',
      duration: '12 min',
      rating: 4.8,
      views: 1250
    },
    {
      title: 'Team Wiki Best Practices',
      description: 'Best practices for organizing team knowledge and documentation',
      type: 'Article',
      duration: '8 min read',
      rating: 4.9,
      views: 890
    },
    {
      title: 'Advanced Graph Visualization',
      description: 'Master the graph view and discover hidden connections in your knowledge',
      type: 'Interactive Guide',
      duration: '15 min',
      rating: 4.7,
      views: 650
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-gray-600 text-sm">Find answers, learn features, and get the most out of KnowledgeGraph</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles, guides, and tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg rounded-2xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-neumorphic p-1 max-w-2xl mx-auto">
            <TabsTrigger value="getting-started" className="rounded-xl">Getting Started</TabsTrigger>
            <TabsTrigger value="tutorials" className="rounded-xl">Tutorials</TabsTrigger>
            <TabsTrigger value="faq" className="rounded-xl">FAQ</TabsTrigger>
            <TabsTrigger value="api" className="rounded-xl">API Docs</TabsTrigger>
          </TabsList>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {quickStartGuides.map((guide, index) => (
                    <div
                      key={index}
                      className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${guide.color} rounded-2xl flex items-center justify-center shadow-neumorphic`}>
                          <guide.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {guide.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{guide.duration}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-neumorphic-large">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold mb-4">Need Personal Help?</h3>
                  <p className="text-blue-100 mb-6">
                    Our support team is here to help you get the most out of KnowledgeGraph. 
                    Schedule a personalized onboarding session or get direct support.
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl">
                      <Video className="w-4 h-4 mr-2" />
                      Book Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Video Tutorials & Guides</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded-2xl mb-4 overflow-hidden shadow-neumorphic">
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg font-medium">
                          {tutorial.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{tutorial.duration}</span>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          {tutorial.rating}
                          <span>•</span>
                          <span>{tutorial.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </TabsContent>

          {/* API Documentation Tab */}
          <TabsContent value="api">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
                <Button variant="outline" className="rounded-xl">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Full API Docs
                </Button>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
                    <div className="bg-gray-900 rounded-2xl p-4 text-white font-mono text-sm">
                      <div className="text-green-400">// Include your API key in the Authorization header</div>
                      <div className="mt-2">
                        <span className="text-blue-400">Authorization:</span> Bearer your_api_key_here
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Endpoints</h3>
                    <div className="space-y-3">
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="font-mono text-sm text-gray-700 flex-1">
                            {endpoint.endpoint}
                          </code>
                          <span className="text-sm text-gray-600">
                            {endpoint.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Request</h3>
                    <div className="bg-gray-900 rounded-2xl p-4 text-white font-mono text-sm">
                      <div className="text-green-400">// Create a new document</div>
                      <div className="mt-2">
                        <span className="text-purple-400">fetch</span>(<span className="text-yellow-400">'https://api.knowledgegraph.com/api/documents'</span>, {'{'}
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">method:</span> <span className="text-yellow-400">'POST'</span>,
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">headers:</span> {'{'}
                      </div>
                      <div className="ml-8">
                        <span className="text-yellow-400">'Authorization'</span>: <span className="text-yellow-400">'Bearer your_api_key'</span>,
                      </div>
                      <div className="ml-8">
                        <span className="text-yellow-400">'Content-Type'</span>: <span className="text-yellow-400">'application/json'</span>
                      </div>
                      <div className="ml-4">{'}'}</div>
                      <div className="ml-4">
                        <span className="text-blue-400">body:</span> <span className="text-purple-400">JSON</span>.<span className="text-purple-400">stringify</span>({'{'}
                      </div>
                      <div className="ml-8">
                        <span className="text-blue-400">title:</span> <span className="text-yellow-400">'My New Document'</span>,
                      </div>
                      <div className="ml-8">
                        <span className="text-blue-400">content:</span> <span className="text-yellow-400">'# Hello World'</span>
                      </div>
                      <div className="ml-4">{'}'}</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Help;