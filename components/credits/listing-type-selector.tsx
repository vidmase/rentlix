"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Star, Zap, CheckCircle, AlertCircle } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"

interface ListingTypeSelectorProps {
  onSelect: (listingType: "basic" | "featured" | "premium") => void
  onClose: () => void
}

const LISTING_TYPES = {
  basic: {
    name: "Basic Listing",
    credits: 5,
    features: ["7 days visibility", "Standard placement", "Basic contact options"],
    icon: Coins,
    color: "bg-green-50 border-green-200",
    textColor: "text-green-700",
    badgeColor: "bg-green-100 text-green-800"
  },
  featured: {
    name: "Featured Listing",
    credits: 10,
    features: ["14 days visibility", "Featured placement", "Priority in search", "Highlighted border"],
    icon: Star,
    color: "bg-yellow-50 border-yellow-200",
    textColor: "text-yellow-700",
    badgeColor: "bg-yellow-100 text-yellow-800"
  },
  premium: {
    name: "Premium Listing",
    credits: 15,
    features: ["30 days visibility", "Top placement", "Premium badge", "Enhanced visibility", "Priority support"],
    icon: Zap,
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-700",
    badgeColor: "bg-purple-100 text-purple-800"
  }
}

export function ListingTypeSelector({ onSelect, onClose }: ListingTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<"basic" | "featured" | "premium" | null>(null)
  const { credits, loading } = useCredits()

  const handleSelect = (type: "basic" | "featured" | "premium") => {
    setSelectedType(type)
  }

  const handleProceed = () => {
    if (selectedType) {
      onSelect(selectedType)
    }
  }

  const canAfford = (type: "basic" | "featured" | "premium") => {
    return credits >= LISTING_TYPES[type].credits
  }

  const selectedTypeData = selectedType ? LISTING_TYPES[selectedType] : null
  const canProceed = selectedType && canAfford(selectedType)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Choose Your Listing Type</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          {/* Credits Display */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Your Credits</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {loading ? "Loading..." : `${credits} credits`}
              </Badge>
            </div>
          </div>
        </div>

        {/* Listing Options */}
        <div className="p-6 space-y-4">
          {Object.entries(LISTING_TYPES).map(([key, type]) => {
            const IconComponent = type.icon
            const isSelected = selectedType === key
            const affordable = canAfford(key as "basic" | "featured" | "premium")

            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all border-2 ${
                  isSelected 
                    ? `${type.color} border-primary shadow-lg` 
                    : 'hover:shadow-md border-gray-200'
                } ${!affordable ? 'opacity-60' : ''}`}
                onClick={() => affordable && handleSelect(key as "basic" | "featured" | "premium")}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-5 w-5 ${type.textColor}`} />
                      <CardTitle className={type.textColor}>{type.name}</CardTitle>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${type.textColor}`}>
                        {type.credits}
                      </div>
                      <div className="text-sm text-gray-500">credits</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {type.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {!affordable && (
                    <div className="mt-3 p-2 bg-red-50 rounded flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Need {type.credits - credits} more credits
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedType ? (
                <div className="flex items-center gap-2">
                  {canProceed ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">
                        You have enough credits to proceed
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600">
                        Insufficient credits for {selectedTypeData?.name}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <span>Select a listing type to continue</span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                disabled={!canProceed || loading}
                className="bg-gradient-to-r from-primary to-secondary text-white px-6"
              >
                {loading ? "Loading..." : `Proceed (${selectedTypeData?.credits || 0} credits)`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
