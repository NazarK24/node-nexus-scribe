import React, { useState } from 'react';
import { User, Settings, CreditCard, Shield, Bell, Link, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Product Manager passionate about knowledge management and team collaboration.',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    weeklyDigest: true,
    mentionAlerts: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-sm">Manage your account and preferences</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-neumorphic p-1">
            <TabsTrigger value="account" className="rounded-xl">
              <User className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-xl">
              <CreditCard className="w-4 h-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="integrations" className="rounded-xl">
              <Link className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-neumorphic">
                      AJ
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 shadow-neumorphic"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                    <p className="text-sm text-gray-600">Upload a photo to personalize your account</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <Textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="rounded-xl min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Email Updates</div>
                        <div className="text-sm text-gray-600">Receive updates about your workspaces</div>
                      </div>
                      <Switch
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Push Notifications</div>
                        <div className="text-sm text-gray-600">Get notified about mentions and comments</div>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Weekly Digest</div>
                        <div className="text-sm text-gray-600">Summary of your workspace activity</div>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-xl shadow-neumorphic hover:shadow-neumorphic-large">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-gray-900">Pro Plan</div>
                        <div className="text-gray-600">$19/month • Billed monthly</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Next billing date</div>
                        <div className="font-medium">March 15, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/80 rounded-2xl p-4 shadow-neumorphic">
                      <div className="text-sm text-gray-600">Storage Used</div>
                      <div className="text-2xl font-bold text-gray-900">8.2 GB</div>
                      <div className="text-xs text-gray-500">of 15 GB</div>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-4 shadow-neumorphic">
                      <div className="text-sm text-gray-600">Workspaces</div>
                      <div className="text-2xl font-bold text-gray-900">4</div>
                      <div className="text-xs text-gray-500">of 10</div>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-4 shadow-neumorphic">
                      <div className="text-sm text-gray-600">Team Members</div>
                      <div className="text-2xl font-bold text-gray-900">6</div>
                      <div className="text-xs text-gray-500">of 10</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-xl">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Billing History
                  </Button>
                  <Button variant="outline" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connected Apps</h3>
                  <p className="text-gray-600">Connect your favorite tools to enhance your workflow</p>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Slack', description: 'Get notifications in your Slack channels', connected: true, icon: '💬' },
                    { name: 'GitHub', description: 'Sync code repositories and issues', connected: true, icon: '🐙' },
                    { name: 'Google Drive', description: 'Import and sync files from Google Drive', connected: false, icon: '📁' },
                    { name: 'Notion', description: 'Import pages and databases from Notion', connected: false, icon: '📝' },
                    { name: 'Figma', description: 'Embed design files and prototypes', connected: false, icon: '🎨' }
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <div className="font-medium text-gray-900">{integration.name}</div>
                          <div className="text-sm text-gray-600">{integration.description}</div>
                        </div>
                      </div>
                      <Button
                        variant={integration.connected ? "outline" : "default"}
                        className="rounded-xl"
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-large border border-white/50">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Settings</h3>
                  <p className="text-gray-600">Manage your account security and privacy</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Password</h4>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current password" className="rounded-xl" />
                      <Input type="password" placeholder="New password" className="rounded-xl" />
                      <Input type="password" placeholder="Confirm new password" className="rounded-xl" />
                      <Button className="rounded-xl">Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                      <div>
                        <div className="font-medium text-gray-900">Authenticator App</div>
                        <div className="text-sm text-gray-600">Use an authenticator app for additional security</div>
                      </div>
                      <Button variant="outline" className="rounded-xl">
                        Enable
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Active Sessions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                        <div>
                          <div className="font-medium text-gray-900">MacBook Pro • Chrome</div>
                          <div className="text-sm text-gray-600">San Francisco, CA • Current session</div>
                        </div>
                        <div className="text-sm text-green-600 font-medium">Active</div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/80 rounded-2xl shadow-neumorphic">
                        <div>
                          <div className="font-medium text-gray-900">iPhone • Safari</div>
                          <div className="text-sm text-gray-600">San Francisco, CA • 2 hours ago</div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl text-red-600 border-red-200 hover:bg-red-50">
                          Revoke
                        </Button>
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

export default Profile;