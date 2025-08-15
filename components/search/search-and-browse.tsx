"use client"

import { useState } from "react"
import { SearchFilters } from "./search-filters"
import { SearchResults } from "./search-results"
import { SearchHeader } from "./search-header"
import { InteractiveMap } from "../map/interactive-map"
import { SavedSearches } from "./saved-searches"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: "Modern Room in Shared House",
    location: "Shoreditch, London",
    postcode: "E1 6AN",
    price: 650,
    deposit: 650,
    billsIncluded: true,
    availableFrom: "2024-02-01",
    images: ["/modern-bedroom-natural-light.png"],
    roomType: "double",
    propertyType: "house",
    furnishing: "furnished",
    amenities: ["wifi", "kitchen", "washing-machine"],
    roommates: 2,
    adType: "room-available",
    gender: "no-preference",
    ageRange: "25-35",
    lifestyle: ["professional", "social"],
    verified: true,
    featured: true,
  },
  {
    id: 2,
    title: "Spacious Flat Share",
    location: "Northern Quarter, Manchester",
    postcode: "M1 1AA",
    price: 450,
    deposit: 450,
    billsIncluded: false,
    availableFrom: "2024-01-15",
    images: ["/shared-apartment-living-room.png"],
    roomType: "single",
    propertyType: "flat",
    furnishing: "part-furnished",
    amenities: ["wifi", "gym", "garden"],
    roommates: 1,
    adType: "room-available",
    gender: "female",
    ageRange: "22-30",
    lifestyle: ["professional", "quiet"],
    verified: true,
    featured: false,
  },
  {
    id: 3,
    title: "Student House Share",
    location: "Headingley, Leeds",
    postcode: "LS6 3AA",
    price: 380,
    deposit: 380,
    billsIncluded: true,
    availableFrom: "2024-03-01",
    images: ["/cozy-student-bedroom.png"],
    roomType: "single",
    propertyType: "house",
    furnishing: "furnished",
    amenities: ["wifi", "study-room", "washing-machine"],
    roommates: 3,
    adType: "room-available",
    gender: "no-preference",
    ageRange: "18-25",
    lifestyle: ["student", "social"],
    verified: false,
    featured: false,
  },
  {
    id: 4,
    title: "Professional Looking for Room",
    location: "Camden, London",
    postcode: "NW1 8AA",
    price: 800,
    deposit: 800,
    billsIncluded: false,
    availableFrom: "2024-02-15",
    images: ["/professional-person.png"],
    roomType: "double",
    propertyType: "flat",
    furnishing: "furnished",
    amenities: ["wifi", "gym"],
    roommates: 0,
    adType: "looking-for-room",
    gender: "no-preference",
    ageRange: "28-35",
    lifestyle: ["professional", "quiet"],
    verified: true,
    featured: false,
  },
  {
    id: 5,
    title: "Luxury En-suite Room",
    location: "Canary Wharf, London",
    postcode: "E14 5AA",
    price: 950,
    deposit: 950,
    billsIncluded: true,
    availableFrom: "2024-01-20",
    images: ["/luxury-bedroom-ensuite.png"],
    roomType: "master",
    propertyType: "flat",
    furnishing: "furnished",
    amenities: ["wifi", "gym", "balcony", "dishwasher"],
    roommates: 1,
    adType: "room-available",
    gender: "professional",
    ageRange: "25-40",
    lifestyle: ["professional", "quiet"],
    verified: true,
    featured: true,
  },
  {
    id: 6,
    title: "Creative House Share",
    location: "Hackney, London",
    postcode: "E8 3AA",
    price: 550,
    deposit: 550,
    billsIncluded: false,
    availableFrom: "2024-02-10",
    images: ["/creative-artistic-bedroom.png"],
    roomType: "double",
    propertyType: "house",
    furnishing: "part-furnished",
    amenities: ["wifi", "garden", "study-room"],
    roommates: 2,
    adType: "room-available",
    gender: "no-preference",
    ageRange: "22-35",
    lifestyle: ["creative", "social"],
    verified: true,
    featured: false,
  },
]

export function SearchAndBrowse() {
  const [listings, setListings] = useState(mockListings)
  const [filteredListings, setFilteredListings] = useState(mockListings)
  const [filters, setFilters] = useState({
    location: "",
    priceMin: "",
    priceMax: "",
    adType: "",
    roomType: "",
    propertyType: "",
    furnishing: "",
    amenities: [],
    gender: "",
    ageRange: "",
    lifestyle: [],
    availableFrom: "",
    billsIncluded: false,
    verifiedOnly: false,
  })
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [showSavedSearches, setShowSavedSearches] = useState(false)

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)

    let filtered = listings.filter((listing) => {
      // Location filter
      if (newFilters.location && !listing.location.toLowerCase().includes(newFilters.location.toLowerCase())) {
        return false
      }

      // Price filter
      if (newFilters.priceMin && listing.price < Number.parseInt(newFilters.priceMin)) {
        return false
      }
      if (newFilters.priceMax && listing.price > Number.parseInt(newFilters.priceMax)) {
        return false
      }

      // Ad type filter
      if (newFilters.adType && listing.adType !== newFilters.adType) {
        return false
      }

      // Room type filter
      if (newFilters.roomType && listing.roomType !== newFilters.roomType) {
        return false
      }

      // Property type filter
      if (newFilters.propertyType && listing.propertyType !== newFilters.propertyType) {
        return false
      }

      // Furnishing filter
      if (newFilters.furnishing && listing.furnishing !== newFilters.furnishing) {
        return false
      }

      // Amenities filter
      if (newFilters.amenities.length > 0) {
        const hasAllAmenities = newFilters.amenities.every((amenity: string) => listing.amenities.includes(amenity))
        if (!hasAllAmenities) {
          return false
        }
      }

      // Gender filter
      if (newFilters.gender && listing.gender !== newFilters.gender && listing.gender !== "no-preference") {
        return false
      }

      // Verified only filter
      if (newFilters.verifiedOnly && !listing.verified) {
        return false
      }

      // Bills included filter
      if (newFilters.billsIncluded && !listing.billsIncluded) {
        return false
      }

      return true
    })

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return new Date(b.availableFrom).getTime() - new Date(a.availableFrom).getTime()
        case "featured":
        default:
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
      }
    })

    setFilteredListings(filtered)
  }

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    applyFilters(filters) // Re-apply filters with new sorting
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setShowSavedSearches(!showSavedSearches)}
          className="flex items-center space-x-2"
        >
          <Bookmark className="h-4 w-4" />
          <span>{showSavedSearches ? "Hide" : "Show"} Saved Searches</span>
        </Button>
      </div>

      {showSavedSearches && (
        <div className="mb-8">
          <SavedSearches />
        </div>
      )}

      <SearchHeader
        totalResults={filteredListings.length}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === "map" ? (
        <div className="space-y-6">
          <InteractiveMap
            listings={filteredListings.map((listing) => ({
              id: listing.id.toString(),
              title: listing.title,
              price: `£${listing.price}/month`,
              location: listing.location,
              coordinates: [51.5074 + (Math.random() - 0.5) * 0.1, -0.1278 + (Math.random() - 0.5) * 0.1], // Mock coordinates
              type: listing.roomType,
              image: listing.images[0],
            }))}
            className="h-96"
          />
          <div className="lg:w-80">
            <SearchFilters filters={filters} onFiltersChange={applyFilters} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters filters={filters} onFiltersChange={applyFilters} />
          </div>

          {/* Results */}
          <div className="flex-1">
            <SearchResults listings={filteredListings} viewMode={viewMode} />
          </div>
        </div>
      )}
    </div>
  )
}
