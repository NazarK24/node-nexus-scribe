import React, { useState } from 'react';
import { Search, Filter, Star, Users, Eye, GitFork, Globe, Lock, Heart, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const publicWorkspaces = [
    {
      id: 1,
      name: 'Open Source Design System',
      description: 'A comprehensive design system with components, guidelines, and best practices for modern web applications',
      owner: 'DesignCorp',
      ownerAvatar: 'DC',
      category: 'design',
      tags: ['design-system', 'components', 'ui-kit'],
      stars: 1250,
      forks: 89,
      views: 5400,
      lastUpdated: '2 days ago',
      preview: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      isLiked: false,
      isBookmarked: true
    },
    {
      id: 2,
      name: 'Startup Playbook',
      description: 'Complete guide for building and scaling a startup from idea to IPO with templates and frameworks',
      owner: 'StartupHub',
      ownerAvatar: 'SH',
      category: 'business',
      tags: ['startup', 'business-plan', 'strategy'],
      stars: 890,
      forks: 156,
      views: 3200,
      lastUpdated: '1 week ago',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      isLiked: true,
      isBookmarked: false
    },
    {
      id: 3,
      name: 'Machine Learning Research',
      description: 'Collection of ML research papers, experiments, and findings from leading AI research institutions',
      owner: 'AI Research Lab',
      ownerAvatar: 'AR',
      category: 'research',
      tags: ['machine-learning', 'ai', 'research'],
      stars: 2100,
      forks: 234,
      views: 8900,
      lastUpdated: '3 days ago',
      preview: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 4,
      name: 'Product Management Toolkit',
      description: 'Essential tools, templates, and frameworks for product managers to build better products',
      owner: 'ProductGuru',
      ownerAvatar: 'PG',
      category: 'product',
      tags: ['product-management', 'frameworks', 'templates'],
      stars: 750,
      forks: 67,
      views: 2800,
      lastUpdated: '5 days ago',
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      isLiked: true,
      isBookmarked: true
    },
    {
      id: 5,
      name: 'Web Development Resources',
      description: 'Curated collection of web development tutorials, tools, and best practices for modern developers',
      owner: 'DevCommunity',
      ownerAvatar: 'DV',
      category: 'development',
      tags: ['web-development', 'tutorials', 'resources'],
      stars: 1800,
      forks: 145,
      views: 6700,
      lastUpdated: '1 day ago',
      preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      isLiked: false,
      isBookmarked: false
    },
    {
      id: 6,
      name: 'UX Research Methods',
      description: 'Comprehensive guide to user experience research methods, tools, and case studies',
      owner: 'UX Institute',
      ownerAvatar: 'UX',
      category: 'design',
      tags: ['ux-research', 'user-testing', 'methods'],
      stars: 650,
      forks: 43,
      views: 2100,
      lastUpdated: '1 week ago',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      isLiked: false,
      isBookmarked: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'research', label: 'Research' },
    { value: 'product', label: 'Product' },
    { value: 'development', label: 'Development' }
  ];

  const filteredWorkspaces = publicWorkspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || workspace.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id: number) => {
    // Handle like toggle
    console.log('Toggle like for workspace:', id);
  };

  const toggleBookmark = (id: number) => {
    // Handle bookmark toggle
    console.log('Toggle bookmark for workspace:', id);
  };

  const forkWorkspace = (id: number) => {
    // Handle fork workspace
    console.log('Fork workspace:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Explore Public Workspaces
          </h1>
          <p className="text-gray-600 text-sm">Discover and fork amazing workspaces from the community</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search public workspaces..."
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
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="forks">Most Forks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Workspace */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Workspace</h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-neumorphic-large">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    OS
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Open Source Design System</h3>
                    <p className="text-blue-100">by DesignCorp</p>
                  </div>
                </div>
                <p className="text-blue-100 mb-6 text-lg">
                  A comprehensive design system with components, guidelines, and best practices for modern web applications
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span>1,250</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="w-5 h-5" />
                    <span>89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    <span>5,400</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl">
                    <Eye className="w-4 h-4 mr-2" />
                    View Workspace
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl">
                    <GitFork className="w-4 h-4 mr-2" />
                    Fork
                  </Button>
                </div>
              </div>
              <div className="w-full h-64 bg-white/10 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop"
                  alt="Featured workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
            >
              <div className="mb-4">
                <div className="w-full h-40 bg-gray-200 rounded-2xl overflow-hidden shadow-neumorphic mb-4">
                  <img
                    src={workspace.preview}
                    alt={workspace.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {workspace.ownerAvatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {workspace.name}
                      </h3>
                      <p className="text-sm text-gray-500">by {workspace.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(workspace.id)}
                      className="p-1 h-auto"
                    >
                      <Bookmark className={`w-4 h-4 ${workspace.isBookmarked ? 'text-blue-600 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(workspace.id)}
                      className="p-1 h-auto"
                    >
                      <Heart className={`w-4 h-4 ${workspace.isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {workspace.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {workspace.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      {tag}
                    </span>
                  ))}
                  {workspace.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                      +{workspace.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      {workspace.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {workspace.forks}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {workspace.views}
                    </div>
                  </div>
                  <span>{workspace.lastUpdated}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
                  onClick={() => forkWorkspace(workspace.id)}
                >
                  <GitFork className="w-4 h-4 mr-2" />
                  Fork
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkspaces.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;