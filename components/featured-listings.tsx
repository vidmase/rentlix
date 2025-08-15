import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Heart } from "lucide-react"

const featuredListings = [
  {
    id: 1,
    title: "Modern Room in Shared House",
    location: "Shoreditch, London",
    price: "£650/month",
    image: "/modern-bedroom-natural-light.png",
    roommates: 2,
    amenities: ["WiFi", "Parking", "Kitchen"],
    type: "Room Available",
  },
  {
    id: 2,
    title: "Spacious Flat Share",
    location: "Northern Quarter, Manchester",
    price: "£450/month",
    image: "/shared-apartment-living-room.png",
    roommates: 1,
    amenities: ["WiFi", "Gym", "Garden"],
    type: "Looking for Flatmate",
  },
  {
    id: 3,
    title: "Student House Share",
    location: "Headingley, Leeds",
    price: "£380/month",
    image: "/cozy-student-bedroom.png",
    roommates: 3,
    amenities: ["WiFi", "Study Room", "Laundry"],
    type: "Room Available",
  },
]

export function FeaturedListings() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Featured Listings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing shared spaces and connect with potential roommates in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{listing.type}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
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
                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="font-heading font-bold text-xl text-primary">{listing.price}</span>
                <Button>View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  )
}
