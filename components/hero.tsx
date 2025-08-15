import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-card to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-card-foreground mb-6">
            Find Your Perfect
            <span className="text-primary block">Roommate</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded people, discover amazing shared spaces, and make your next move stress-free.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-lg shadow-lg border">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter location (e.g., London, Manchester)"
                  className="pl-10 border-0 bg-transparent text-lg"
                />
              </div>
              <Button size="lg" className="px-8">
                <Search className="h-5 w-5 mr-2" />
                Search Rooms
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="px-8 py-3 text-lg">
              <Link href="/browse">Browse Listings</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 py-3 text-lg bg-transparent">
              <Link href="/post-ad">Post Your Room</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full text-slate-950"></div>
              <span>Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Secure Messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Trusted Community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
