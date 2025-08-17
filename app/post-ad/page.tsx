"use client"

import { useState } from "react"
import { PostAdForm } from "@/components/ads/post-ad-form"
import { Header } from "@/components/header"
import { ListingTypeSelector } from "@/components/credits/listing-type-selector"
import { CreditsDisplay } from "@/components/credits/credits-display"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCredits } from "@/hooks/use-credits"

export default function PostAdPage() {
  const [showCreditsModal, setShowCreditsModal] = useState(true)
  const [canProceed, setCanProceed] = useState(false)
  const [selectedListingType, setSelectedListingType] = useState<"basic" | "featured" | "premium">("basic")
  const { credits: userCredits, loading: creditsLoading } = useCredits()

  const handleProceed = (listingType: "basic" | "featured" | "premium") => {
    console.log('PostAdPage: Proceeding with listing type:', listingType)
    setSelectedListingType(listingType)
    setShowCreditsModal(false)
    setCanProceed(true)
  }

  const handleBack = () => {
    setShowCreditsModal(true)
    setCanProceed(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {console.log('PostAdPage: Rendering, showCreditsModal:', showCreditsModal, 'canProceed:', canProceed)}
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Post Your Listing</h1>
            <p className="text-lg text-muted-foreground">
              Create a detailed listing to find your perfect roommate or advertise your available room.
            </p>
          </div>

          {canProceed && (
            <div className="mb-6">
              <CreditsDisplay credits={userCredits} />
            </div>
          )}

          {canProceed ? (
            <PostAdForm 
              selectedListingType={selectedListingType}
              onBack={handleBack}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Please validate your credits to continue posting your ad.</p>
              <Button onClick={() => setShowCreditsModal(true)} className="mt-4">
                Check Credits & Continue
              </Button>
            </div>
          )}

          {showCreditsModal && (
            <ListingTypeSelector
              onSelect={handleProceed}
              onClose={() => setShowCreditsModal(false)}
            />
          )}
        </div>
      </main>
    </div>
  )
}
