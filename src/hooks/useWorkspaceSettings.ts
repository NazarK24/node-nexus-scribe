import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface WorkspaceSettings {
  id: string;
  name: string;
  description: string;
  nodeSpacing: number;
  nodeDensity: number;
  autoCentering: boolean;
  gridVisible: boolean;
  themeColor: string;
}

export const useWorkspaceSettings = (workspaceId?: string) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<WorkspaceSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !workspaceId) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('workspaces')
          .select('*')
          .eq('id', workspaceId)
          .single();

        if (error) throw error;

        setSettings({
          id: data.id,
          name: data.name,
          description: data.description || '',
          nodeSpacing: data.node_spacing,
          nodeDensity: data.node_density,
          autoCentering: data.auto_centering,
          gridVisible: data.grid_visible,
          themeColor: data.theme_color,
        });
      } catch (error) {
        console.error('Error fetching workspace settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user, workspaceId]);

  const updateSettings = async (updates: Partial<WorkspaceSettings>) => {
    if (!user || !workspaceId) return;

    try {
      const { error } = await supabase
        .from('workspaces')
        .update({
          name: updates.name,
          description: updates.description,
          node_spacing: updates.nodeSpacing,
          node_density: updates.nodeDensity,
          auto_centering: updates.autoCentering,
          grid_visible: updates.gridVisible,
          theme_color: updates.themeColor,
        })
        .eq('id', workspaceId);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating workspace settings:', error);
    }
  };

  return {
    settings,
    loading,
    updateSettings,
  };
};