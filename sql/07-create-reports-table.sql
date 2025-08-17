-- Create reports table for content moderation
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason VARCHAR(100) NOT NULL, -- 'spam', 'inappropriate', 'fake', 'harassment', 'other'
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved', 'dismissed'
  admin_notes TEXT,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reason ON reports(reason);
CREATE INDEX idx_reports_listing ON reports(reported_listing_id);
CREATE INDEX idx_reports_user ON reports(reported_user_id);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can create reports
CREATE POLICY "Users can create reports" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Only admins can view all reports (you'll need to implement admin role checking)
-- For now, users can only see reports they created
CREATE POLICY "Users can see own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);
