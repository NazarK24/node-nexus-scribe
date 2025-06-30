import React, { useState } from 'react';
import { X, Users, Globe, Lock, Building, BookOpen, Kanban, Map, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkspace: (workspace: any) => void;
}

export const CreateWorkspaceModal = ({ isOpen, onClose, onCreateWorkspace }: CreateWorkspaceModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    invitedUsers: '',
    accessLevel: 'private'
  });

  const workspaceTypes = [
    { id: 'knowledge-base', name: 'Knowledge Base', icon: BookOpen, description: 'Organize documentation and wikis' },
    { id: 'project', name: 'Project Management', icon: Kanban, description: 'Track tasks and collaborate on projects' },
    { id: 'research', name: 'Research Hub', icon: FileText, description: 'Collect and analyze research data' },
    { id: 'roadmap', name: 'Product Roadmap', icon: Map, description: 'Plan and visualize product development' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWorkspace(formData);
    onClose();
    setFormData({ name: '', description: '', type: '', invitedUsers: '', accessLevel: 'private' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-neumorphic-large max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create New Workspace</h2>
              <p className="text-gray-600 mt-1">Set up your collaborative knowledge space</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workspace Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Awesome Workspace"
                className="rounded-xl"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this workspace is for..."
                className="rounded-xl min-h-[100px]"
              />
            </div>

            {/* Workspace Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Workspace Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {workspaceTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.type === type.id
                        ? 'border-primary bg-primary/5 shadow-neumorphic-inset'
                        : 'border-gray-200 hover:border-gray-300 shadow-neumorphic hover:shadow-neumorphic-large'
                    }`}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                  >
                    <div className="flex items-start gap-3">
                      <type.icon className={`w-5 h-5 mt-0.5 ${formData.type === type.id ? 'text-primary' : 'text-gray-500'}`} />
                      <div>
                        <div className={`font-medium ${formData.type === type.id ? 'text-primary' : 'text-gray-900'}`}>
                          {type.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invite Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invite Team Members
              </label>
              <Input
                value={formData.invitedUsers}
                onChange={(e) => setFormData({ ...formData, invitedUsers: e.target.value })}
                placeholder="Enter email addresses separated by commas"
                className="rounded-xl"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can invite more people later from workspace settings
              </p>
            </div>

            {/* Access Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Access Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                    formData.accessLevel === 'private'
                      ? 'border-primary bg-primary/5 shadow-neumorphic-inset'
                      : 'border-gray-200 hover:border-gray-300 shadow-neumorphic hover:shadow-neumorphic-large'
                  }`}
                  onClick={() => setFormData({ ...formData, accessLevel: 'private' })}
                >
                  <Lock className={`w-5 h-5 mx-auto mb-2 ${formData.accessLevel === 'private' ? 'text-primary' : 'text-gray-500'}`} />
                  <div className={`font-medium text-sm ${formData.accessLevel === 'private' ? 'text-primary' : 'text-gray-900'}`}>
                    Private
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Invite only
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                    formData.accessLevel === 'team'
                      ? 'border-primary bg-primary/5 shadow-neumorphic-inset'
                      : 'border-gray-200 hover:border-gray-300 shadow-neumorphic hover:shadow-neumorphic-large'
                  }`}
                  onClick={() => setFormData({ ...formData, accessLevel: 'team' })}
                >
                  <Building className={`w-5 h-5 mx-auto mb-2 ${formData.accessLevel === 'team' ? 'text-primary' : 'text-gray-500'}`} />
                  <div className={`font-medium text-sm ${formData.accessLevel === 'team' ? 'text-primary' : 'text-gray-900'}`}>
                    Team
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Organization
                  </div>
                </div>
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                    formData.accessLevel === 'public'
                      ? 'border-primary bg-primary/5 shadow-neumorphic-inset'
                      : 'border-gray-200 hover:border-gray-300 shadow-neumorphic hover:shadow-neumorphic-large'
                  }`}
                  onClick={() => setFormData({ ...formData, accessLevel: 'public' })}
                >
                  <Globe className={`w-5 h-5 mx-auto mb-2 ${formData.accessLevel === 'public' ? 'text-primary' : 'text-gray-500'}`} />
                  <div className={`font-medium text-sm ${formData.accessLevel === 'public' ? 'text-primary' : 'text-gray-900'}`}>
                    Public
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Anyone
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl shadow-neumorphic hover:shadow-neumorphic-large"
                disabled={!formData.name || !formData.type}
              >
                Create Workspace
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};