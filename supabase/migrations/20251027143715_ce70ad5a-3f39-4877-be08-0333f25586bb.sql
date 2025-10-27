-- Create enum for activity types
CREATE TYPE public.activity_type AS ENUM ('voice_help', 'text_help', 'contact_family', 'find_nearby', 'sos_alert', 'location_update');

-- Create tourist activities table for tracking all user actions
CREATE TABLE public.tourist_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tourist_id TEXT NOT NULL,
  activity_type activity_type NOT NULL,
  activity_data JSONB,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create emergency contacts table
CREATE TABLE public.tourist_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  relationship TEXT,
  is_emergency BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create help requests table
CREATE TABLE public.tourist_help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tourist_id TEXT NOT NULL,
  request_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  response TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tourist_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tourist_activities
CREATE POLICY "Users can view their own activities"
  ON public.tourist_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities"
  ON public.tourist_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for tourist_contacts
CREATE POLICY "Users can view their own contacts"
  ON public.tourist_contacts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts"
  ON public.tourist_contacts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
  ON public.tourist_contacts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
  ON public.tourist_contacts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for tourist_help_requests
CREATE POLICY "Users can view their own help requests"
  ON public.tourist_help_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own help requests"
  ON public.tourist_help_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view their own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_tourist_activities_user_id ON public.tourist_activities(user_id);
CREATE INDEX idx_tourist_activities_created_at ON public.tourist_activities(created_at DESC);
CREATE INDEX idx_tourist_contacts_user_id ON public.tourist_contacts(user_id);
CREATE INDEX idx_tourist_help_requests_user_id ON public.tourist_help_requests(user_id);
CREATE INDEX idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tourist_contacts_updated_at
  BEFORE UPDATE ON public.tourist_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tourist_help_requests_updated_at
  BEFORE UPDATE ON public.tourist_help_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();