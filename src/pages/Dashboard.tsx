import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Grid, List, Star, Users, Clock, MoreHorizontal, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NavBar } from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Workspace {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  theme_color: string;
}

const Dashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadWorkspaces();
    }
  }, [user]);

  const loadWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('owner_id', user!.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load workspaces",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Щойно';
    if (diffInHours < 24) return `${diffInHours} год тому`;
    if (diffInHours < 48) return 'Вчора';
    return date.toLocaleDateString('uk-UA');
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (workspace.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />

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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic border border-white/50">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <div
                key={workspace.id}
                onClick={() => navigate(`/workspace/${workspace.id}`)}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-neumorphic"
                    style={{ backgroundColor: workspace.theme_color }}
                  >
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {workspace.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {workspace.description || 'Опис відсутній'}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    1 учасник
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(workspace.updated_at)}
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
                onClick={() => navigate(`/workspace/${workspace.id}`)}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-neumorphic hover:shadow-neumorphic-large transition-all duration-300 cursor-pointer group border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-neumorphic flex-shrink-0"
                    style={{ backgroundColor: workspace.theme_color }}
                  >
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors truncate mb-1">
                      {workspace.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {workspace.description || 'Опис відсутній'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      1
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(workspace.updated_at)}
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

        {!loading && filteredWorkspaces.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? 'Воркспейси не знайдено' : 'У вас поки немає воркспейсів'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Спробуйте змінити пошукові терміни' : 'Створіть свій перший воркспейс, щоб почати'}
            </p>
            <Button
              onClick={() => navigate('/new-workspace')}
              className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
            >
              <Plus className="w-4 h-4 mr-2" />
              Створити воркспейс
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;