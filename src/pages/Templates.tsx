import React, { useState } from 'react';
import { Search, Filter, Star, Users, Download, Eye, Kanban, BookOpen, Map, FileText, Lightbulb, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateWorkspaceModal } from '@/components/CreateWorkspaceModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleUseTemplate = () => {
    if (!user) {
      navigate('/');
      return;
    }
    setShowCreateModal(true);
  };

  const handleWorkspaceCreated = (workspace: any) => {
    navigate('/app');
  };

  const templates = [
    {
      id: 1,
      name: 'Product Roadmap',
      description: 'Strategic planning template for product development with timeline and feature tracking',
      category: 'planning',
      icon: Map,
      color: 'bg-blue-500',
      downloads: 1250,
      rating: 4.8,
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      tags: ['roadmap', 'planning', 'strategy']
    },
    {
      id: 2,
      name: 'Team Wiki',
      description: 'Comprehensive knowledge base template for team documentation and processes',
      category: 'documentation',
      icon: BookOpen,
      color: 'bg-green-500',
      downloads: 980,
      rating: 4.9,
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      tags: ['wiki', 'documentation', 'knowledge']
    },
    {
      id: 3,
      name: 'Sprint Planning Board',
      description: 'Agile project management template with sprint planning and task tracking',
      category: 'project-management',
      icon: Kanban,
      color: 'bg-purple-500',
      downloads: 2100,
      rating: 4.7,
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      tags: ['agile', 'sprint', 'kanban']
    },
    {
      id: 4,
      name: 'Research Repository',
      description: 'Organize user research, insights, and findings in a structured format',
      category: 'research',
      icon: FileText,
      color: 'bg-orange-500',
      downloads: 750,
      rating: 4.6,
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      tags: ['research', 'insights', 'data']
    },
    {
      id: 5,
      name: 'Meeting Notes',
      description: 'Structured template for meeting notes, action items, and follow-ups',
      category: 'documentation',
      icon: Calendar,
      color: 'bg-indigo-500',
      downloads: 1800,
      rating: 4.5,
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      tags: ['meetings', 'notes', 'action-items']
    },
    {
      id: 6,
      name: 'Brainstorming Canvas',
      description: 'Creative ideation template for brainstorming sessions and idea development',
      category: 'creative',
      icon: Lightbulb,
      color: 'bg-yellow-500',
      downloads: 650,
      rating: 4.4,
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      tags: ['brainstorming', 'ideas', 'creative']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'planning', label: 'Planning' },
    { value: 'documentation', label: 'Documentation' },
    { value: 'project-management', label: 'Project Management' },
    { value: 'research', label: 'Research' },
    { value: 'creative', label: 'Creative' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Template Library
          </h1>
          <p className="text-gray-600 text-sm">Ready-made workspace templates to get you started quickly</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Templates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.slice(0, 2).map((template) => (
              <div
                key={template.id}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic-large hover:shadow-neumorphic transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 ${template.color} rounded-2xl flex items-center justify-center shadow-neumorphic`}>
                        <template.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {template.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          {template.rating}
                          <span>•</span>
                          <Download className="w-4 h-4" />
                          {template.downloads}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{template.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleUseTemplate} className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                        Use Template
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  <div className="w-48 h-32 bg-gray-200 rounded-2xl overflow-hidden shadow-neumorphic">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Templates Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Templates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
            >
              <div className="mb-4">
                <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden shadow-neumorphic mb-4">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${template.color} rounded-xl flex items-center justify-center shadow-neumorphic`}>
                    <template.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      {template.rating}
                      <span>•</span>
                      <Download className="w-3 h-3" />
                      {template.downloads}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      +{template.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleUseTemplate} size="sm" className="flex-1 rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                  Use Template
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
      
      <CreateWorkspaceModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onWorkspaceCreated={handleWorkspaceCreated}
      />
    </div>
  );
};

export default Templates;