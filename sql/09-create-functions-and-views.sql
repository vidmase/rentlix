-- Create useful functions and views

-- Function to get user's active subscription
CREATE OR REPLACE FUNCTION get_user_subscription(user_uuid UUID)
RETURNS TABLE (
  plan_type VARCHAR(20),
  status VARCHAR(20),
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.plan_type, s.status, s.current_period_end
  FROM subscriptions s
  WHERE s.user_id = user_uuid 
    AND s.status = 'active'
    AND s.current_period_end > NOW()
  ORDER BY s.current_period_end DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- View for listing search with user info
CREATE OR REPLACE VIEW listings_with_user AS
SELECT 
  l.*,
  u.full_name as user_name,
  u.profile_image_url as user_image,
  u.is_verified as user_verified,
  (SELECT COUNT(*) FROM favorites f WHERE f.listing_id = l.id) as favorite_count
FROM listings l
JOIN users u ON l.user_id = u.id
WHERE l.status = 'active';

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_listing_views(listing_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE listings 
  SET view_count = view_count + 1 
  WHERE id = listing_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get conversation between two users for a listing
CREATE OR REPLACE FUNCTION get_or_create_conversation(
  listing_uuid UUID,
  user1_uuid UUID,
  user2_uuid UUID
)
RETURNS UUID AS $$
DECLARE
  conversation_uuid UUID;
BEGIN
  -- Try to find existing conversation
  SELECT id INTO conversation_uuid
  FROM conversations
  WHERE listing_id = listing_uuid
    AND ((participant_1_id = user1_uuid AND participant_2_id = user2_uuid)
         OR (participant_1_id = user2_uuid AND participant_2_id = user1_uuid));
  
  -- If not found, create new conversation
  IF conversation_uuid IS NULL THEN
    INSERT INTO conversations (listing_id, participant_1_id, participant_2_id)
    VALUES (listing_uuid, user1_uuid, user2_uuid)
    RETURNING id INTO conversation_uuid;
  END IF;
  
  RETURN conversation_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
