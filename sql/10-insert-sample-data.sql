-- Insert sample data for testing (optional)

-- Sample users (you'll need to handle auth.users separately in Supabase Auth)
INSERT INTO users (id, email, full_name, phone, occupation, bio, subscription_tier) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'alex.taylor@example.com', 'Alex Taylor', '+44 7700 900123', 'Software Developer', 'Friendly professional looking for a quiet place to live.', 'premium'),
('550e8400-e29b-41d4-a716-446655440002', 'jane.smith@example.com', 'Jane Smith', '+44 7700 900124', 'Marketing Manager', 'Love cooking and yoga. Looking for like-minded flatmates.', 'basic'),
('550e8400-e29b-41d4-a716-446655440003', 'mike.wilson@example.com', 'Mike Wilson', '+44 7700 900125', 'Teacher', 'Quiet, clean, and respectful. Non-smoker.', 'pro');

-- Sample listings
INSERT INTO listings (
  user_id, title, description, listing_type, property_type, address, city, postcode,
  rent_amount, available_from, bedrooms, bathrooms, furnished, wifi, washing_machine
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Spacious Double Room in Modern Flat',
  'Beautiful double room in a modern 2-bedroom flat. Great transport links and local amenities.',
  'room_available',
  'apartment',
  '123 High Street, Camden',
  'London',
  'NW1 7AB',
  850.00,
  '2024-02-01',
  2,
  1,
  true,
  true,
  true
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Looking for Female Flatmate',
  'Professional female seeking another professional female to share lovely 2-bed flat.',
  'looking_for_roommate',
  'apartment',
  '456 Queen Street, Shoreditch',
  'London',
  'E1 6AA',
  750.00,
  '2024-02-15',
  2,
  1,
  true,
  true,
  true
);

-- Note: Remember to also set up Supabase Auth and link the auth.users to your users table
-- You can do this with a trigger or by using Supabase's built-in user management
