"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart, MessageCircle, Calendar, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

interface SearchResultsProps {
  listings: any[]
  viewMode: "grid" | "list"
}

export function SearchResults({ listings, viewMode }: SearchResultsProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-lg mb-2">No listings found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria.</p>
        <Button variant="outline">Clear Filters</Button>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-80 flex-shrink-0 relative">
                  <img
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                  {listing.featured && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={listing.adType === "room-available" ? "default" : "secondary"}>
                          {listing.adType === "room-available" ? "Room Available" : "Looking for Room"}
                        </Badge>
                        {listing.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">{listing.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{listing.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {listing.roommates} current roommate{listing.roommates !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          Available from {new Date(listing.availableFrom).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-heading font-bold text-2xl text-primary mb-1">£{listing.price}/month</div>
                      {listing.billsIncluded && (
                        <Badge variant="secondary" className="mb-2">
                          Bills Included
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {listing.amenities.slice(0, 4).map((amenity: string) => (
                      <Badge key={amenity} variant="outline" className="text-xs capitalize">
                        {amenity.replace("-", " ")}
                      </Badge>
                    ))}
                    {listing.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{listing.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/listing/${listing.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="relative">
            <img
              src={listing.images[0] || "/placeholder.svg"}
              alt={listing.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {listing.featured && (
              <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge
              className="absolute top-3 right-12 bg-primary text-primary-foreground"
              variant={listing.adType === "room-available" ? "default" : "secondary"}
            >
              {listing.adType === "room-available" ? "Room Available" : "Looking for Room"}
            </Badge>
            <Button size="sm" variant="ghost" className="absolute top-3 right-3 bg-background/80 hover:bg-background">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {listing.verified && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{listing.title}</h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground mb-2">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {listing.roommates} current roommate{listing.roommates !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground mb-3">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">Available from {new Date(listing.availableFrom).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {listing.amenities.slice(0, 3).map((amenity: string) => (
                <Badge key={amenity} variant="secondary" className="text-xs capitalize">
                  {amenity.replace("-", " ")}
                </Badge>
              ))}
              {listing.amenities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{listing.amenities.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div>
              <span className="font-heading font-bold text-xl text-primary">£{listing.price}/month</span>
              {listing.billsIncluded && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Bills Inc.
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link href={`/listing/${listing.id}`}>View</Link>
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
