import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedListings } from "@/components/featured-listings"
import { HowItWorks } from "@/components/how-it-works"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeaturedListings />
        <HowItWorks />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
