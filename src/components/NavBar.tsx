import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Settings, Plus, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const NavBar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            KnowledgeGraph
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-xl"
              >
                <Home className="w-4 h-4 mr-2" />
                Мої воркспейси
              </Button>
            </Link>
            
            <Link to="/new-workspace">
              <Button 
                variant={isActive('/new-workspace') ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Створити воркспейс
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button 
                variant={isActive('/settings') ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-xl"
              >
                <Settings className="w-4 h-4 mr-2" />
                Налаштування
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Вийти
          </Button>
        </div>
      </div>
    </nav>
  );
};