-- Create conversations table for messaging
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  participant_1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  participant_2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique conversations between two users for a listing
  UNIQUE(listing_id, participant_1_id, participant_2_id)
);

-- Create indexes
CREATE INDEX idx_conversations_participant_1 ON conversations(participant_1_id);
CREATE INDEX idx_conversations_participant_2 ON conversations(participant_2_id);
CREATE INDEX idx_conversations_listing ON conversations(listing_id);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Users can only see conversations they're part of
CREATE POLICY "Users can see own conversations" ON conversations
  FOR SELECT USING (
    auth.uid() = participant_1_id OR auth.uid() = participant_2_id
  );

-- Users can create conversations
CREATE POLICY "Users can create conversations" ON conversations
  FOR INSERT WITH CHECK (
    auth.uid() = participant_1_id OR auth.uid() = participant_2_id
  );
