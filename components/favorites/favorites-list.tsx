"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FavoritesButton } from "./favorites-button"
import { Search, MapPin, Calendar, Eye, MessageCircle, Heart } from "lucide-react"

export function FavoritesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date-added")

  const favorites = [
    {
      id: "1",
      title: "Modern Studio in Shoreditch",
      location: "Shoreditch, London",
      price: "£1,200/month",
      type: "Studio",
      available: "Available Now",
      dateAdded: "2024-03-15",
      image: "/modern-studio-apartment.png",
      features: ["Furnished", "Bills Included", "WiFi"],
      description: "Beautiful modern studio in the heart of Shoreditch with all amenities included.",
    },
    {
      id: "2",
      title: "Shared House in Camden",
      location: "Camden, London",
      price: "£800/month",
      type: "Shared Room",
      available: "From April 1st",
      dateAdded: "2024-03-14",
      image: "/shared-house-room.png",
      features: ["Garden", "Living Room", "Kitchen"],
      description: "Friendly house share in Camden with great transport links and lovely housemates.",
    },
    {
      id: "3",
      title: "Luxury Flat in Kensington",
      location: "Kensington, London",
      price: "£2,500/month",
      type: "1 Bedroom",
      available: "Available Now",
      dateAdded: "2024-03-13",
      image: "/luxury-apartment-interior.png",
      features: ["Balcony", "Gym", "Concierge"],
      description: "Stunning luxury apartment in prestigious Kensington with premium amenities.",
    },
  ]

  const filteredFavorites = favorites.filter(
    (favorite) =>
      favorite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search saved listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added">Date Added</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img
                  src={favorite.image || "/placeholder.svg"}
                  alt={favorite.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <FavoritesButton listingId={favorite.id} initialFavorited={true} size="sm" />
                </div>
                <Badge className="absolute bottom-3 left-3 bg-white/90 text-gray-900">{favorite.type}</Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{favorite.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {favorite.location}
                    </div>
                    <p className="text-gray-600 text-sm">{favorite.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {favorite.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-gray-900">{favorite.price}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {favorite.available}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Saved {new Date(favorite.dateAdded).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved listings found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "No listings match your search." : "Start saving listings you're interested in!"}
            </p>
            <Button>Browse Listings</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
