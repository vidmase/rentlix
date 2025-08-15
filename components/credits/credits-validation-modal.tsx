"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, AlertCircle, CheckCircle, Star, Zap } from "lucide-react"
import { PurchaseCreditsModal } from "@/components/credits/purchase-credits-modal"

interface CreditsValidationModalProps {
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
  userCredits: number
}

const AD_COSTS = {
  basic: {
    credits: 5,
    name: "Basic Listing",
    features: ["7 days visibility", "Standard placement", "Basic contact options"],
  },
  featured: {
    credits: 10,
    name: "Featured Listing",
    features: ["14 days visibility", "Featured placement", "Priority in search", "Highlighted border"],
  },
  premium: {
    credits: 15,
    name: "Premium Listing",
    features: ["30 days visibility", "Top placement", "Premium badge", "Enhanced visibility", "Priority support"],
  },
}

export function CreditsValidationModal({ isOpen, onClose, onProceed, userCredits }: CreditsValidationModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof AD_COSTS>("basic")
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [currentCredits, setCurrentCredits] = useState(userCredits)

  const selectedCost = AD_COSTS[selectedPlan]
  const hasEnoughCredits = currentCredits >= selectedCost.credits

  const handlePurchaseComplete = (credits: number, transactionId: string) => {
    setCurrentCredits((prev) => prev + credits)
    setShowPurchaseModal(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Coins className="h-5 w-5 text-primary" />
              Choose Your Listing Type
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Current Credits Display */}
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="font-medium">Your Credits</span>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {currentCredits} credits
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Listing Options */}
            <div className="grid gap-4">
              {Object.entries(AD_COSTS).map(([key, plan]) => {
                const isSelected = selectedPlan === key
                const canAfford = currentCredits >= plan.credits

                return (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                    } ${!canAfford ? "opacity-60" : ""}`}
                    onClick={() => canAfford && setSelectedPlan(key as keyof typeof AD_COSTS)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{plan.name}</h3>
                            {key === "featured" && <Star className="h-4 w-4 text-yellow-500" />}
                            {key === "premium" && <Zap className="h-4 w-4 text-purple-500" />}
                            {!canAfford && <AlertCircle className="h-4 w-4 text-destructive" />}
                          </div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{plan.credits}</div>
                          <div className="text-sm text-muted-foreground">credits</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {hasEnoughCredits ? (
                  <span className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    You have enough credits to proceed
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Insufficient credits. You need {selectedCost.credits - currentCredits} more credits.
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                {hasEnoughCredits ? (
                  <Button onClick={onProceed} className="bg-gradient-to-r from-primary to-secondary">
                    Proceed ({selectedCost.credits} credits)
                  </Button>
                ) : (
                  <Button onClick={() => setShowPurchaseModal(true)}>Buy Credits</Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PurchaseCreditsModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </>
  )
}
