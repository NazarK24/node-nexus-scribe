import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  tags: string[];
}

interface CreateWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkspaceCreated?: (workspace: any) => void;
}

export const CreateWorkspaceModal = ({ open, onOpenChange, onWorkspaceCreated }: CreateWorkspaceModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchTemplates();
    }
  }, [open]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('workspace_templates')
        .select('*')
        .order('name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleCreate = async () => {
    if (!user || !name) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .insert({
          name,
          description,
          owner_id: user.id,
          template_id: selectedTemplate || null,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Workspace created!",
        description: "Your new workspace has been created successfully.",
      });

      onWorkspaceCreated?.(data);
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error creating workspace:', error);
      toast({
        title: "Error",
        description: "Failed to create workspace. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedTemplate('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border-white/20 shadow-neumorphic-large">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Workspace
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
              <Input
                placeholder="Enter workspace name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
              <Textarea
                placeholder="Describe your workspace"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl bg-white/60 backdrop-blur-sm border-white/30 shadow-neumorphic-inset min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedTemplate === '' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 bg-white/60 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate('')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Blank Workspace</h4>
                      <p className="text-sm text-gray-600">Start from scratch</p>
                    </div>
                  </div>
                </div>

                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 bg-white/60 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-sm">📋</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!name || loading}
              className="flex-1 rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
            >
              {loading ? 'Creating...' : 'Create Workspace'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};