import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Folder, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { NavBar } from '@/components/NavBar';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

const NewWorkspace = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('workspace_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a workspace name",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a template",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: workspace, error } = await supabase
        .from('workspaces')
        .insert({
          name: workspaceName,
          description: workspaceDescription,
          template_id: selectedTemplate,
          owner_id: user!.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Workspace created successfully!",
      });

      navigate(`/workspace/${workspace.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create workspace",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до дашборда
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Створити новий воркспейс</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workspace Details */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/50 shadow-neumorphic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Деталі воркспейсу
              </CardTitle>
              <CardDescription>
                Введіть основну інформацію про ваш новий воркспейс
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Назва воркспейсу *
                </label>
                <Input
                  placeholder="Введіть назву воркспейсу..."
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Опис (опціонально)
                </label>
                <Textarea
                  placeholder="Опишіть призначення цього воркспейсу..."
                  value={workspaceDescription}
                  onChange={(e) => setWorkspaceDescription(e.target.value)}
                  className="rounded-xl"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleCreateWorkspace}
                disabled={loading || !workspaceName.trim() || !selectedTemplate}
                className="w-full rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {loading ? 'Створення...' : 'Створити воркспейс'}
              </Button>
            </CardContent>
          </Card>

          {/* Template Selection */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/50 shadow-neumorphic">
            <CardHeader>
              <CardTitle>Оберіть шаблон</CardTitle>
              <CardDescription>
                Виберіть стартовий шаблон для вашого воркспейсу
              </CardDescription>
            </CardHeader>
            <CardContent>
              {templatesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-100 animate-pulse rounded-xl">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5 shadow-neumorphic'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-neumorphic-inset'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: template.color }}
                        >
                          {template.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {template.name}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {template.description}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                            {template.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewWorkspace;