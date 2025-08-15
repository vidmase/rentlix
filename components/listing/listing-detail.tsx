"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageComposer } from "@/components/messaging/message-composer"
import {
  MapPin,
  Calendar,
  Users,
  Home,
  Bed,
  Trees,
  CheckCircle,
  Heart,
  Share,
  MessageCircle,
  ArrowLeft,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface ListingDetailProps {
  listing: any
}

export function ListingDetail({ listing }: ListingDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showMessageComposer, setShowMessageComposer] = useState(false)

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
    // TODO: Implement actual message sending logic
    setShowMessageComposer(false)
    // Could redirect to messages page or show success notification
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/browse" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>
      </Button>

      {showMessageComposer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <MessageComposer
            recipient={{
              name: listing.landlord.name,
              avatar: listing.landlord.avatar,
              verified: listing.landlord.verified,
            }}
            listing={{
              title: listing.title,
              location: listing.location,
              price: listing.price,
            }}
            onSend={handleSendMessage}
            onClose={() => setShowMessageComposer(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={listing.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                {listing.featured && (
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="bg-background/80 hover:bg-background"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-background/80 hover:bg-background">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {listing.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {listing.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
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
                  <CardTitle className="font-heading text-2xl md:text-3xl">{listing.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {listing.location}, {listing.postcode}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-heading font-bold text-3xl text-primary">£{listing.price}/month</div>
                  {listing.billsIncluded && (
                    <Badge variant="secondary" className="mt-1">
                      Bills Included
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="font-medium">{new Date(listing.availableFrom).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Roommates</p>
                    <p className="font-medium">{listing.roommates} current</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Property</p>
                    <p className="font-medium capitalize">{listing.propertyType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Room</p>
                    <p className="font-medium capitalize">{listing.roomType.replace("-", " ")}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Description</h3>
                <div className="prose prose-sm max-w-none">
                  {listing.description.split("\n\n").map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Property Details */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Size</p>
                    <p className="font-medium capitalize">{listing.roomSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Furnishing</p>
                    <p className="font-medium capitalize">{listing.furnishing.replace("-", " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parking</p>
                    <p className="font-medium capitalize">{listing.parking?.replace("-", " ") || "None"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deposit</p>
                    <p className="font-medium">£{listing.deposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Min Stay</p>
                    <p className="font-medium capitalize">
                      {listing.minimumStay?.replace("-", " ") || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Max Stay</p>
                    <p className="font-medium capitalize">
                      {listing.maximumStay?.replace("-", " ") || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {(listing.garden || listing.balcony || listing.ensuite) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-3">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.garden && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Trees className="h-3 w-3" />
                          Garden
                        </Badge>
                      )}
                      {listing.balcony && <Badge variant="outline">Balcony</Badge>}
                      {listing.ensuite && <Badge variant="outline">En-suite</Badge>}
                    </div>
                  </div>
                </>
              )}

              {/* Amenities */}
              {listing.amenities?.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.amenities.map((amenity: string) => (
                        <Badge key={amenity} variant="outline" className="capitalize">
                          {amenity.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Roommate Preferences */}
              <Separator />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">Roommate Preferences</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium capitalize">{listing.gender?.replace("-", " ") || "No preference"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age Range</p>
                    <p className="font-medium">{listing.ageRange || "No preference"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Occupation</p>
                    <p className="font-medium capitalize">{listing.occupation?.replace("-", " ") || "No preference"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pets</p>
                    <p className="font-medium capitalize">{listing.pets?.replace("-", " ") || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Smoking</p>
                    <p className="font-medium capitalize">{listing.smoking?.replace("-", " ") || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Couples</p>
                    <p className="font-medium capitalize">{listing.couples?.replace("-", " ") || "Not specified"}</p>
                  </div>
                </div>
                {listing.lifestyle?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Lifestyle</p>
                    <div className="flex flex-wrap gap-2">
                      {listing.lifestyle.map((lifestyle: string) => (
                        <Badge key={lifestyle} variant="secondary" className="capitalize">
                          {lifestyle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Roommates */}
              {listing.currentRoommates?.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-3">Current Roommates</h3>
                    <div className="space-y-3">
                      {listing.currentRoommates.map((roommate: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <Avatar>
                            <AvatarImage src={roommate.avatar || "/placeholder.svg"} alt={roommate.name} />
                            <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">
                              {roommate.name}, {roommate.age}
                            </p>
                            <p className="text-sm text-muted-foreground">{roommate.occupation}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {roommate.lifestyle.map((lifestyle: string) => (
                                <Badge key={lifestyle} variant="secondary" className="text-xs capitalize">
                                  {lifestyle}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Landlord Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={listing.landlord.avatar || "/placeholder.svg"} alt={listing.landlord.name} />
                  <AvatarFallback>
                    {listing.landlord.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{listing.landlord.name}</p>
                    {listing.landlord.verified && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {listing.landlord.responseTime}
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Member since {new Date(listing.landlord.joinedDate).toLocaleDateString()}</p>
                <p>{listing.landlord.listings} active listings</p>
              </div>

              <Button className="w-full" size="lg" onClick={() => setShowMessageComposer(true)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Share className="h-4 w-4 mr-2" />
                Share Listing
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 bg-transparent">
                Report Listing
              </Button>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="font-heading text-base">Safety Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Always meet in person before committing</p>
              <p>• Never send money before viewing</p>
              <p>• Trust your instincts</p>
              <p>• Verify identity and references</p>
              <Button variant="link" className="p-0 h-auto text-sm">
                Read full safety guide →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
