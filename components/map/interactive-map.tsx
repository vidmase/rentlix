"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Maximize2, Minimize2, Navigation } from "lucide-react"

interface MapListing {
  id: string
  title: string
  price: string
  location: string
  coordinates: [number, number]
  type: string
  image: string
}

interface InteractiveMapProps {
  listings: MapListing[]
  selectedListing?: string
  onListingSelect?: (listingId: string) => void
  className?: string
}

export function InteractiveMap({ listings, selectedListing, onListingSelect, className }: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hoveredListing, setHoveredListing] = useState<string | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.5074, -0.1278]) // London center

  // Mock map implementation - in real app would use Google Maps, Mapbox, etc.
  const mockListings: MapListing[] = [
    {
      id: "1",
      title: "Modern Studio in Shoreditch",
      price: "£1,200/month",
      location: "Shoreditch, London",
      coordinates: [51.5225, -0.0785],
      type: "Studio",
      image: "/modern-studio-apartment.png",
    },
    {
      id: "2",
      title: "Shared House in Camden",
      price: "£800/month",
      location: "Camden, London",
      coordinates: [51.5392, -0.1426],
      type: "Shared Room",
      image: "/shared-house-room.png",
    },
    {
      id: "3",
      title: "Luxury Flat in Kensington",
      price: "£2,500/month",
      location: "Kensington, London",
      coordinates: [51.4994, -0.1746],
      type: "1 Bedroom",
      image: "/luxury-apartment-interior.png",
    },
    {
      id: "4",
      title: "Cozy Room in Greenwich",
      price: "£650/month",
      location: "Greenwich, London",
      coordinates: [51.4769, -0.0005],
      type: "Shared Room",
      image: "/cozy-bedroom.png",
    },
  ]

  const displayListings = listings.length > 0 ? listings : mockListings

  return (
    <div className={`relative ${className}`}>
      <Card className={`${isFullscreen ? "fixed inset-4 z-50" : "h-96"} transition-all duration-300`}>
        <CardContent className="p-0 h-full relative">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white/90 backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>

          {/* Mock Map Background */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden">
            {/* Map Grid Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Thames River Mock */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-blue-200 opacity-30 transform -rotate-12" />

            {/* Listing Markers */}
            {displayListings.map((listing) => {
              const x = ((listing.coordinates[1] + 0.2) / 0.4) * 100 // Normalize longitude
              const y = ((51.6 - listing.coordinates[0]) / 0.2) * 100 // Normalize latitude

              return (
                <div
                  key={listing.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onMouseEnter={() => setHoveredListing(listing.id)}
                  onMouseLeave={() => setHoveredListing(null)}
                  onClick={() => onListingSelect?.(listing.id)}
                >
                  {/* Marker Pin */}
                  <div
                    className={`relative ${
                      selectedListing === listing.id || hoveredListing === listing.id
                        ? "scale-110 z-20"
                        : "scale-100 z-10"
                    } transition-transform duration-200`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                        selectedListing === listing.id
                          ? "bg-cyan-600"
                          : listing.type === "Studio"
                            ? "bg-purple-500"
                            : listing.type === "1 Bedroom"
                              ? "bg-green-500"
                              : "bg-orange-500"
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>

                    {/* Price Badge */}
                    <Badge
                      className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap ${
                        selectedListing === listing.id || hoveredListing === listing.id ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-200`}
                    >
                      {listing.price}
                    </Badge>
                  </div>

                  {/* Hover Card */}
                  {hoveredListing === listing.id && (
                    <Card className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 z-30 shadow-lg">
                      <CardContent className="p-3">
                        <div className="flex space-x-3">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{listing.title}</h4>
                            <p className="text-xs text-gray-600 truncate">{listing.location}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {listing.type}
                              </Badge>
                              <span className="font-semibold text-sm">{listing.price}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )
            })}
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="text-xs font-medium mb-2">Property Types</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs">Studio</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs">1 Bedroom</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-xs">Shared Room</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
