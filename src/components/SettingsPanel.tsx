
import React from 'react';
import { X, User, Building, CreditCard, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="bg-white w-96 h-full shadow-neumorphic-large border-l border-gray-200 animate-slide-in-right overflow-y-auto"
        style={{ borderRadius: '24px 0 0 24px' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Profile</h3>
            </div>
            <div className="space-y-4 pl-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input placeholder="Your name" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input placeholder="your@email.com" type="email" className="rounded-xl" />
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                Update Profile
              </Button>
            </div>
          </div>

          {/* Workspace Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Workspace</h3>
            </div>
            <div className="space-y-4 pl-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workspace Name</label>
                <Input placeholder="My Workspace" className="rounded-xl" />
              </div>
              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                  Rename
                </Button>
                <Button variant="destructive" className="rounded-xl">
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Members Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Members</h3>
            </div>
            <div className="space-y-4 pl-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Invite Member</label>
                <div className="flex gap-2">
                  <Input placeholder="email@example.com" className="rounded-xl" />
                  <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                    Invite
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold">Billing</h3>
            </div>
            <div className="space-y-4 pl-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Current Plan: Free</p>
                <p className="text-xs text-gray-500 mt-1">Upgrade to unlock more features</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
