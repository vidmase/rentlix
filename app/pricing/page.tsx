import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingPlans } from "@/components/pricing/pricing-plans"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect plan for your housing needs. From basic listings to premium features, we have options for
              everyone.
            </p>
          </div>
          <PricingPlans />
        </div>
      </main>
      <Footer />
    </div>
  )
}
