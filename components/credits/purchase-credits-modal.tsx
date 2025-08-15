"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Star, Zap, Crown } from "lucide-react"
import { StripePaymentForm } from "@/components/payments/stripe-payment-form"

interface PurchaseCreditsModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchaseComplete: (credits: number, transactionId: string) => void
}

const creditPackages = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 25,
    price: 5,
    bonus: 0,
    icon: Coins,
    popular: false,
    description: "Perfect for trying out the platform",
  },
  {
    id: "popular",
    name: "Popular Pack",
    credits: 60,
    price: 10,
    bonus: 5,
    icon: Star,
    popular: true,
    description: "Most chosen by our users",
  },
  {
    id: "power",
    name: "Power Pack",
    credits: 150,
    price: 20,
    bonus: 15,
    icon: Zap,
    popular: false,
    description: "Great value for active users",
  },
  {
    id: "pro",
    name: "Pro Pack",
    credits: 400,
    price: 45,
    bonus: 50,
    icon: Crown,
    popular: false,
    description: "Maximum value for power users",
  },
]

export function PurchaseCreditsModal({ isOpen, onClose, onPurchaseComplete }: PurchaseCreditsModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<(typeof creditPackages)[0] | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const handlePackageSelect = (pkg: (typeof creditPackages)[0]) => {
    setSelectedPackage(pkg)
    setShowPayment(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    if (selectedPackage) {
      onPurchaseComplete(selectedPackage.credits + selectedPackage.bonus, transactionId)
      handleClose()
    }
  }

  const handleClose = () => {
    setSelectedPackage(null)
    setShowPayment(false)
    onClose()
  }

  const handleBackToPackages = () => {
    setShowPayment(false)
    setSelectedPackage(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {showPayment ? "Complete Payment" : "Purchase Credits"}
          </DialogTitle>
        </DialogHeader>

        {showPayment && selectedPackage ? (
          <div className="space-y-4">
            <Button variant="ghost" onClick={handleBackToPackages} className="mb-4">
              ← Back to Packages
            </Button>
            <StripePaymentForm
              creditPackage={selectedPackage}
              onPaymentSuccess={handlePaymentSuccess}
              onCancel={handleBackToPackages}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditPackages.map((pkg) => {
              const IconComponent = pkg.icon
              const pricePerCredit = pkg.price / (pkg.credits + pkg.bonus)

              return (
                <Card
                  key={pkg.id}
                  className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                    pkg.popular ? "ring-2 ring-cyan-500 shadow-lg" : ""
                  }`}
                  onClick={() => handlePackageSelect(pkg)}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500">
                      Most Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-2">
                      <IconComponent className={`h-8 w-8 ${pkg.popular ? "text-cyan-600" : "text-gray-600"}`} />
                    </div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center space-y-3">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-gray-900">£{pkg.price}</div>
                      <div className="text-sm text-gray-500">£{pricePerCredit.toFixed(3)} per credit</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Base Credits:</span>
                        <span className="font-medium">{pkg.credits}</span>
                      </div>
                      {pkg.bonus > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Bonus Credits:</span>
                          <span className="font-medium">+{pkg.bonus}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold border-t pt-2">
                        <span>Total Credits:</span>
                        <span className="text-cyan-600">{pkg.credits + pkg.bonus}</span>
                      </div>
                    </div>

                    <Button
                      className={`w-full ${
                        pkg.popular
                          ? "bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                          : ""
                      }`}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
