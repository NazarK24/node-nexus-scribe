import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Star, Users, Clock, MoreHorizontal, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateWorkspaceModal } from '@/components/CreateWorkspaceModal';

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([
    {
      id: 1,
      name: 'Product Roadmap 2024',
      description: 'Strategic planning and feature development roadmap',
      type: 'roadmap',
      members: 8,
      lastActivity: '2 hours ago',
      isStarred: true,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Engineering Wiki',
      description: 'Technical documentation and best practices',
      type: 'knowledge-base',
      members: 15,
      lastActivity: '1 day ago',
      isStarred: false,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Marketing Campaign Q1',
      description: 'Campaign planning and content strategy',
      type: 'project',
      members: 6,
      lastActivity: '3 days ago',
      isStarred: true,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'User Research Hub',
      description: 'Customer insights and research findings',
      type: 'research',
      members: 4,
      lastActivity: '1 week ago',
      isStarred: false,
      color: 'bg-orange-500'
    }
  ]);

  const handleCreateWorkspace = (workspaceData: any) => {
    const newWorkspace = {
      id: workspaces.length + 1,
      name: workspaceData.name,
      description: workspaceData.description,
      type: workspaceData.type,
      members: 1,
      lastActivity: 'Just now',
      isStarred: false,
      color: 'bg-indigo-500'
    };
    setWorkspaces([newWorkspace, ...workspaces]);
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'starred' && workspace.isStarred) ||
                         (filterBy === 'recent' && workspace.lastActivity.includes('hour'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              KnowledgeGraph
            </h1>
            <p className="text-gray-600 text-sm">Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Workspace
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40 rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Workspaces</SelectItem>
                <SelectItem value="starred">Starred</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent Activity</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="members">Members</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-neumorphic-inset">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-lg"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-lg"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Workspaces Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${workspace.color} rounded-2xl flex items-center justify-center shadow-neumorphic`}>
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {workspace.isStarred && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {workspace.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {workspace.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {workspace.members} members
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workspace.lastActivity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredWorkspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${workspace.color} rounded-xl flex items-center justify-center shadow-neumorphic flex-shrink-0`}>
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                        {workspace.name}
                      </h3>
                      {workspace.isStarred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {workspace.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {workspace.members}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {workspace.lastActivity}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredWorkspaces.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first workspace to get started'}
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Workspace
            </Button>
          </div>
        )}
      </div>

      <CreateWorkspaceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </div>
  );
};

export default Dashboard;