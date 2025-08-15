-- Create saved searches table
CREATE TABLE IF NOT EXISTS saved_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  search_criteria JSONB NOT NULL, -- Store search filters as JSON
  email_alerts BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_saved_searches_user ON saved_searches(user_id);
CREATE INDEX idx_saved_searches_active ON saved_searches(is_active);

-- Enable RLS
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saved searches
CREATE POLICY "Users can see own saved searches" ON saved_searches
  FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own saved searches
CREATE POLICY "Users can manage own saved searches" ON saved_searches
  FOR ALL USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
