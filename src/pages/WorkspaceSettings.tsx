import React, { useState } from 'react';
import { Users, Settings, Shield, Link, Trash2, Crown, UserPlus, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WorkspaceSettings = () => {
  const [workspaceData, setWorkspaceData] = useState({
    name: 'Product Roadmap 2024',
    description: 'Strategic planning and feature development roadmap for the upcoming year',
    visibility: 'private',
    allowGuests: false,
    requireApproval: true
  });

  const [members] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'owner', avatar: 'AJ', status: 'active' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'admin', avatar: 'SC', status: 'active' },
    { id: 3, name: 'Mike Rodriguez', email: 'mike@example.com', role: 'editor', avatar: 'MR', status: 'active' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'viewer', avatar: 'EW', status: 'pending' }
  ]);

  const [inviteEmail, setInviteEmail] = useState('');

  const roleColors = {
    owner: 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    editor: 'bg-green-100 text-green-800',
    viewer: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Workspace Settings
          </h1>
          <p className="text-gray-600 text-sm">Manage your workspace configuration and team</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-neumorphic p-1">
            <TabsTrigger value="general" className="rounded-xl">
              <Settings className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-xl">
              <Users className="w-4 h-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl">
              <Link className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="advanced" className="rounded-xl">
              <Shield className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Workspace Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
                      <Input
                        value={workspaceData.name}
                        onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <Textarea
                        value={workspaceData.description}
                        onChange={(e) => setWorkspaceData({ ...workspaceData, description: e.target.value })}
                        className="rounded-xl min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Access</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                      <Select value={workspaceData.visibility} onValueChange={(value) => setWorkspaceData({ ...workspaceData, visibility: value })}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private - Invite only</SelectItem>
                          <SelectItem value="team">Team - Anyone in organization</SelectItem>
                          <SelectItem value="public">Public - Anyone with link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Allow guest access</div>
                        <div className="text-sm text-gray-600">Let people outside your organization join</div>
                      </div>
                      <Switch
                        checked={workspaceData.allowGuests}
                        onCheckedChange={(checked) => setWorkspaceData({ ...workspaceData, allowGuests: checked })}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Require approval for new members</div>
                        <div className="text-sm text-gray-600">Admins must approve join requests</div>
                      </div>
                      <Switch
                        checked={workspaceData.requireApproval}
                        onCheckedChange={(checked) => setWorkspaceData({ ...workspaceData, requireApproval: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="Enter email address"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="rounded-xl w-64"
                    />
                    <Button className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {member.name}
                            {member.role === 'owner' && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="text-sm text-gray-600">{member.email}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${roleColors[member.role]}`}>
                          {member.role}
                        </span>
                        {member.status === 'pending' && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                        {member.role !== 'owner' && (
                          <div className="flex items-center gap-2">
                            <Select defaultValue={member.role}>
                              <SelectTrigger className="w-24 h-8 text-xs rounded-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Role Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700">Owner</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Full workspace access</li>
                        <li>• Manage members and settings</li>
                        <li>• Delete workspace</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700">Admin</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Manage members</li>
                        <li>• Edit workspace settings</li>
                        <li>• Create and edit content</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700">Editor</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Create and edit content</li>
                        <li>• Comment and collaborate</li>
                        <li>• View all content</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-gray-700">Viewer</div>
                      <ul className="text-gray-600 space-y-1">
                        <li>• View content</li>
                        <li>• Add comments</li>
                        <li>• Export content</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Workspace Integrations</h3>
                  <p className="text-gray-600">Connect external tools to enhance your workspace</p>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Slack', description: 'Send notifications to Slack channels', connected: true, icon: '💬' },
                    { name: 'GitHub', description: 'Link issues and pull requests', connected: false, icon: '🐙' },
                    { name: 'Jira', description: 'Sync tickets and project status', connected: false, icon: '🎯' },
                    { name: 'Figma', description: 'Embed design files and prototypes', connected: true, icon: '🎨' }
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">{integration.name}</div>
                          <div className="text-sm text-gray-600">{integration.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {integration.connected && (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Connected
                          </span>
                        )}
                        <Button
                          variant={integration.connected ? "outline" : "default"}
                          className="rounded-xl"
                        >
                          {integration.connected ? 'Configure' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Settings</h3>
                  <p className="text-gray-600">Manage advanced workspace configuration</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Export & Backup</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="rounded-xl">
                        Export Workspace Data
                      </Button>
                      <Button variant="outline" className="rounded-xl">
                        Download Backup
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Transfer Ownership</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Transfer ownership of this workspace to another member
                    </p>
                    <div className="flex gap-3">
                      <Select>
                        <SelectTrigger className="w-64 rounded-xl">
                          <SelectValue placeholder="Select new owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sarah">Sarah Chen</SelectItem>
                          <SelectItem value="mike">Mike Rodriguez</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="rounded-xl">
                        Transfer
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-red-200 pt-6">
                    <h4 className="font-medium text-red-900 mb-3">Danger Zone</h4>
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium text-red-900">Archive Workspace</div>
                          <div className="text-sm text-red-700">Make this workspace read-only</div>
                        </div>
                        <div>
                          <div className="font-medium text-red-900">Delete Workspace</div>
                          <div className="text-sm text-red-700">Permanently delete this workspace and all its content</div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" className="rounded-xl border-red-300 text-red-700 hover:bg-red-100">
                            Archive
                          </Button>
                          <Button variant="destructive" className="rounded-xl">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
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

export default WorkspaceSettings;