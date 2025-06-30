import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Tag, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Introducing Real-time Collaborative Editing',
      excerpt: 'Experience seamless collaboration with our new real-time editing features that let teams work together like never before.',
      content: 'Today we\'re excited to announce the launch of real-time collaborative editing in KnowledgeGraph...',
      author: 'Sarah Chen',
      authorAvatar: 'SC',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'product-updates',
      tags: ['collaboration', 'real-time', 'editing'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'The Science Behind Knowledge Graphs',
      excerpt: 'Dive deep into the research and technology that powers our knowledge graph visualization and connection algorithms.',
      content: 'Knowledge graphs represent a fundamental shift in how we organize and connect information...',
      author: 'Dr. Alex Rodriguez',
      authorAvatar: 'AR',
      date: '2024-03-12',
      readTime: '8 min read',
      category: 'research',
      tags: ['knowledge-graphs', 'research', 'algorithms'],
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Building Better Teams with Shared Knowledge',
      excerpt: 'Learn how successful teams use KnowledgeGraph to break down silos and create a culture of shared learning.',
      content: 'In today\'s fast-paced work environment, the ability to share knowledge effectively...',
      author: 'Mike Johnson',
      authorAvatar: 'MJ',
      date: '2024-03-10',
      readTime: '6 min read',
      category: 'best-practices',
      tags: ['teamwork', 'knowledge-sharing', 'culture'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'March 2024 Product Updates',
      excerpt: 'A roundup of all the new features, improvements, and bug fixes we shipped this month.',
      content: 'This month has been packed with exciting updates and improvements to KnowledgeGraph...',
      author: 'Product Team',
      authorAvatar: 'PT',
      date: '2024-03-08',
      readTime: '4 min read',
      category: 'changelog',
      tags: ['updates', 'features', 'improvements'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Customer Spotlight: How TechCorp Scaled Their Documentation',
      excerpt: 'Discover how TechCorp transformed their documentation process and improved team productivity by 40%.',
      content: 'TechCorp faced a common challenge: their documentation was scattered across multiple tools...',
      author: 'Emma Wilson',
      authorAvatar: 'EW',
      date: '2024-03-05',
      readTime: '7 min read',
      category: 'customer-stories',
      tags: ['case-study', 'documentation', 'productivity'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'The Future of Knowledge Management',
      excerpt: 'Our vision for the future of knowledge management and how AI will transform the way we work with information.',
      content: 'As we look toward the future, we see exciting possibilities for how AI and machine learning...',
      author: 'David Kim',
      authorAvatar: 'DK',
      date: '2024-03-01',
      readTime: '10 min read',
      category: 'thought-leadership',
      tags: ['future', 'ai', 'vision'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'product-updates', label: 'Product Updates' },
    { value: 'research', label: 'Research' },
    { value: 'best-practices', label: 'Best Practices' },
    { value: 'changelog', label: 'Changelog' },
    { value: 'customer-stories', label: 'Customer Stories' },
    { value: 'thought-leadership', label: 'Thought Leadership' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog & Updates
          </h1>
          <p className="text-gray-600 text-sm">Latest news, features, and insights from the KnowledgeGraph team</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-64 rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic">
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
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured</h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-neumorphic-large border border-white/50">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg font-medium">
                      Featured
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {categories.find(c => c.value === featuredPost.category)?.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {featuredPost.authorAvatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{featuredPost.author}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(featuredPost.date).toLocaleDateString()}
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                    <Button className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                    {categories.find(c => c.value === post.category)?.label}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{post.author}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-neumorphic-large">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6">
              Get the latest product updates, feature announcements, and insights delivered to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/20 border-white/30 text-white placeholder-blue-200 rounded-xl"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;