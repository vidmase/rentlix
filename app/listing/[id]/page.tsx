import { ListingDetail } from "@/components/listing/listing-detail"
import { Header } from "@/components/header"

// Mock data for individual listing
const mockListing = {
  id: 1,
  title: "Modern Room in Shared House",
  location: "Shoreditch, London",
  postcode: "E1 6AN",
  price: 650,
  deposit: 650,
  billsIncluded: true,
  availableFrom: "2024-02-01",
  minimumStay: "6-months",
  maximumStay: "no-limit",
  images: [
    "/modern-bedroom-natural-light.png",
    "/modern-shared-kitchen.png",
    "/shared-living-room.png",
    "/shared-house-bathroom.png",
  ],
  roomType: "double",
  roomSize: "large",
  propertyType: "house",
  furnishing: "furnished",
  parking: "street",
  garden: true,
  balcony: false,
  ensuite: false,
  amenities: ["wifi", "kitchen", "washing-machine", "dishwasher", "garden", "study-room"],
  roommates: 2,
  adType: "room-available",
  gender: "no-preference",
  ageRange: "25-35",
  occupation: "professional",
  lifestyle: ["professional", "social", "quiet"],
  pets: "no-pets",
  smoking: "no-smoking",
  couples: "no-couples",
  verified: true,
  featured: true,
  description: `Beautiful double room available in a modern 4-bedroom house share in the heart of Shoreditch. The room is spacious and bright with large windows, fully furnished with a comfortable double bed, wardrobe, desk, and chair.

The house features a modern kitchen with all appliances, comfortable living room, and a lovely garden perfect for relaxing. Located just 5 minutes walk from Old Street station with excellent transport links.

We're looking for a professional, clean, and friendly housemate who will fit in well with our existing group. The house has a great atmosphere - we're social but also respect each other's space and privacy.`,
  landlord: {
    name: "Sarah Johnson",
    avatar: "/professional-woman-avatar.png",
    verified: true,
    responseTime: "Usually responds within 2 hours",
    joinedDate: "2022-03-15",
    listings: 3,
  },
  currentRoommates: [
    {
      name: "Mike",
      age: 28,
      occupation: "Software Developer",
      lifestyle: ["professional", "gaming"],
      avatar: "/male-professional-avatar.png",
    },
    {
      name: "Emma",
      age: 26,
      occupation: "Marketing Manager",
      lifestyle: ["professional", "fitness"],
      avatar: "/placeholder-28nb3.png",
    },
  ],
}

export default function ListingPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ListingDetail listing={mockListing} />
      </main>
    </div>
  )
}
