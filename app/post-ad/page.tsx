"use client"

import { useState } from "react"
import { PostAdForm } from "@/components/ads/post-ad-form"
import { Header } from "@/components/header"
import { CreditsValidationModal } from "@/components/credits/credits-validation-modal"
import { CreditsDisplay } from "@/components/credits/credits-display"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PostAdPage() {
  const [showCreditsModal, setShowCreditsModal] = useState(true)
  const [canProceed, setCanProceed] = useState(false)
  const [userCredits] = useState(45) // This would come from user context/API in real app

  const handleProceed = () => {
    setShowCreditsModal(false)
    setCanProceed(true)
  }

  const handleBack = () => {
    setShowCreditsModal(true)
    setCanProceed(false)
  }

  return (
    <div className="min-h-screen bg-background">
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
            <PostAdForm />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Please validate your credits to continue posting your ad.</p>
              <Button onClick={() => setShowCreditsModal(true)} className="mt-4">
                Check Credits & Continue
              </Button>
            </div>
          )}

          <CreditsValidationModal
            isOpen={showCreditsModal}
            onClose={() => setShowCreditsModal(false)}
            onProceed={handleProceed}
            userCredits={userCredits}
          />
        </div>
      </main>
    </div>
  )
}
