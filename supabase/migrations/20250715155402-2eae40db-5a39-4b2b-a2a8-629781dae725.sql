-- Create users profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscription types enum
CREATE TYPE subscription_type AS ENUM ('free', 'pro', 'team');

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_type subscription_type DEFAULT 'free',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create workspace templates table
CREATE TABLE public.workspace_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  color TEXT,
  preview_image TEXT,
  tags TEXT[],
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create workspaces table
CREATE TABLE public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES workspace_templates(id),
  node_spacing INTEGER DEFAULT 50,
  node_density INTEGER DEFAULT 100,
  auto_centering BOOLEAN DEFAULT TRUE,
  grid_visible BOOLEAN DEFAULT TRUE,
  theme_color TEXT DEFAULT '#a2d5f2',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create workspace_members table for multi-user access
CREATE TABLE public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for workspace templates (publicly viewable)
CREATE POLICY "Anyone can view workspace templates" ON public.workspace_templates
  FOR SELECT USING (true);

-- RLS Policies for workspaces
CREATE POLICY "Users can view workspaces they own or are members of" ON public.workspaces
  FOR SELECT USING (
    auth.uid() = owner_id OR 
    EXISTS (
      SELECT 1 FROM workspace_members 
      WHERE workspace_members.workspace_id = workspaces.id 
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create workspaces" ON public.workspaces
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can update their workspaces" ON public.workspaces
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can delete their workspaces" ON public.workspaces
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for workspace_members
CREATE POLICY "Users can view workspace members for their workspaces" ON public.workspace_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = workspace_members.workspace_id 
      AND workspaces.owner_id = auth.uid()
    ) OR auth.uid() = user_id
  );

CREATE POLICY "Workspace owners can manage members" ON public.workspace_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = workspace_members.workspace_id 
      AND workspaces.owner_id = auth.uid()
    )
  );

-- RLS Policies for documents
CREATE POLICY "Users can view documents in their workspaces" ON public.documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = documents.workspace_id 
      AND (workspaces.owner_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM workspace_members 
             WHERE workspace_members.workspace_id = workspaces.id 
             AND workspace_members.user_id = auth.uid()
           ))
    )
  );

CREATE POLICY "Users can create documents in their workspaces" ON public.documents
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = documents.workspace_id 
      AND (workspaces.owner_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM workspace_members 
             WHERE workspace_members.workspace_id = workspaces.id 
             AND workspace_members.user_id = auth.uid()
           ))
    )
  );

CREATE POLICY "Users can update documents in their workspaces" ON public.documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = documents.workspace_id 
      AND (workspaces.owner_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM workspace_members 
             WHERE workspace_members.workspace_id = workspaces.id 
             AND workspace_members.user_id = auth.uid()
           ))
    )
  );

CREATE POLICY "Users can delete documents in their workspaces" ON public.documents
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = documents.workspace_id 
      AND (workspaces.owner_id = auth.uid() OR 
           EXISTS (
             SELECT 1 FROM workspace_members 
             WHERE workspace_members.workspace_id = workspaces.id 
             AND workspace_members.user_id = auth.uid()
           ))
    )
  );

-- Insert default workspace templates
INSERT INTO public.workspace_templates (name, description, category, icon, color, tags, content) VALUES
  ('Product Roadmap', 'Strategic planning template for product development with timeline and feature tracking', 'planning', 'Map', 'bg-blue-500', ARRAY['roadmap', 'planning', 'strategy'], '{"type":"roadmap","sections":["vision","objectives","timeline","features"]}'),
  ('Team Wiki', 'Comprehensive knowledge base template for team documentation and processes', 'documentation', 'BookOpen', 'bg-green-500', ARRAY['wiki', 'documentation', 'knowledge'], '{"type":"wiki","sections":["overview","processes","guidelines","resources"]}'),
  ('Sprint Planning Board', 'Agile project management template with sprint planning and task tracking', 'project-management', 'Kanban', 'bg-purple-500', ARRAY['agile', 'sprint', 'kanban'], '{"type":"kanban","columns":["backlog","todo","in-progress","done"]}'),
  ('Research Repository', 'Organize user research, insights, and findings in a structured format', 'research', 'FileText', 'bg-orange-500', ARRAY['research', 'insights', 'data'], '{"type":"research","sections":["methodology","findings","insights","recommendations"]}'),
  ('Meeting Notes', 'Structured template for meeting notes, action items, and follow-ups', 'documentation', 'Calendar', 'bg-indigo-500', ARRAY['meetings', 'notes', 'action-items'], '{"type":"meeting","sections":["agenda","notes","action-items","follow-up"]}'),
  ('Brainstorming Canvas', 'Creative ideation template for brainstorming sessions and idea development', 'creative', 'Lightbulb', 'bg-yellow-500', ARRAY['brainstorming', 'ideas', 'creative'], '{"type":"brainstorm","sections":["challenge","ideas","solutions","next-steps"]}');

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  
  INSERT INTO public.subscriptions (user_id, subscription_type)
  VALUES (NEW.id, 'free');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();