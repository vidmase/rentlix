-- Create listings table for room/roommate ads
CREATE TABLE IF NOT EXISTS listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  listing_type VARCHAR(20) NOT NULL, -- 'room_available', 'looking_for_room', 'looking_for_roommate'
  
  -- Property details
  property_type VARCHAR(50), -- 'house', 'apartment', 'studio', 'shared_room'
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Room details
  rent_amount DECIMAL(10, 2) NOT NULL,
  rent_period VARCHAR(20) DEFAULT 'monthly', -- 'weekly', 'monthly'
  deposit_amount DECIMAL(10, 2),
  bills_included BOOLEAN DEFAULT FALSE,
  available_from DATE NOT NULL,
  minimum_stay_months INTEGER,
  maximum_stay_months INTEGER,
  
  -- Property features
  bedrooms INTEGER,
  bathrooms INTEGER,
  furnished BOOLEAN DEFAULT FALSE,
  parking BOOLEAN DEFAULT FALSE,
  garden BOOLEAN DEFAULT FALSE,
  balcony BOOLEAN DEFAULT FALSE,
  wifi BOOLEAN DEFAULT FALSE,
  washing_machine BOOLEAN DEFAULT FALSE,
  dishwasher BOOLEAN DEFAULT FALSE,
  
  -- Roommate preferences
  preferred_gender VARCHAR(20), -- 'male', 'female', 'any'
  preferred_age_min INTEGER,
  preferred_age_max INTEGER,
  couples_ok BOOLEAN DEFAULT FALSE,
  pets_ok BOOLEAN DEFAULT FALSE,
  smoking_ok BOOLEAN DEFAULT FALSE,
  
  -- Images and media
  images JSONB DEFAULT '[]', -- Array of image URLs
  virtual_tour_url TEXT,
  
  -- Status and moderation
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'active', 'inactive', 'suspended'
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_listings_user_id ON listings(user_id);
CREATE INDEX idx_listings_city ON listings(city);
CREATE INDEX idx_listings_listing_type ON listings(listing_type);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_available_from ON listings(available_from);
CREATE INDEX idx_listings_rent_amount ON listings(rent_amount);
CREATE INDEX idx_listings_location ON listings(latitude, longitude);

-- Enable RLS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Anyone can read active listings
CREATE POLICY "Anyone can read active listings" ON listings
  FOR SELECT USING (status = 'active');

-- Users can read their own listings
CREATE POLICY "Users can read own listings" ON listings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own listings
CREATE POLICY "Users can insert own listings" ON listings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own listings
CREATE POLICY "Users can update own listings" ON listings
  FOR UPDATE USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
