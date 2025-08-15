"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, CheckCircle } from "lucide-react"

interface ReviewStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export function ReviewStep({ formData, onPrev }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement actual submission logic
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="font-heading font-bold text-2xl mb-2">Listing Published!</h2>
        <p className="text-muted-foreground mb-6">
          Your listing is now live and potential roommates can start contacting you.
        </p>
        <div className="space-y-3">
          <Button size="lg" className="w-full sm:w-auto">
            View My Listing
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
            Create Another Listing
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-semibold text-lg mb-2">Review Your Listing</h3>
        <p className="text-muted-foreground">Please review all details before publishing your listing.</p>
      </div>

      {/* Listing Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-2">
                {formData.adType === "room-available" ? "Room Available" : "Looking for Room"}
              </Badge>
              <CardTitle className="font-heading text-xl">{formData.title}</CardTitle>
            </div>
            <div className="text-right">
              <div className="font-heading font-bold text-2xl text-primary">£{formData.rent}/month</div>
              {formData.billsIncluded && (
                <Badge variant="secondary" className="mt-1">
                  Bills Included
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {formData.location}, {formData.postcode}
            </span>
          </div>

          {/* Availability */}
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Available from {new Date(formData.availableFrom).toLocaleDateString()}</span>
          </div>

          {/* Description */}
          <p className="text-foreground leading-relaxed">{formData.description}</p>

          <Separator />

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Property Type</span>
              <p className="font-medium capitalize">{formData.propertyType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Room Type</span>
              <p className="font-medium capitalize">{formData.roomType?.replace("-", " ")}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Furnishing</span>
              <p className="font-medium capitalize">{formData.furnishing?.replace("-", " ")}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Parking</span>
              <p className="font-medium capitalize">{formData.parking?.replace("-", " ") || "None"}</p>
            </div>
          </div>

          {/* Features */}
          {(formData.garden || formData.balcony || formData.ensuite) && (
            <div>
              <span className="text-muted-foreground text-sm">Features</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.garden && <Badge variant="outline">Garden</Badge>}
                {formData.balcony && <Badge variant="outline">Balcony</Badge>}
                {formData.ensuite && <Badge variant="outline">En-suite</Badge>}
              </div>
            </div>
          )}

          {/* Amenities */}
          {formData.amenities?.length > 0 && (
            <div>
              <span className="text-muted-foreground text-sm">Amenities</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.amenities.map((amenity: string) => (
                  <Badge key={amenity} variant="outline" className="capitalize">
                    {amenity.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Gender Preference</span>
              <p className="font-medium capitalize">{formData.gender?.replace("-", " ") || "Not specified"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Age Range</span>
              <p className="font-medium">{formData.ageRange || "Not specified"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Occupation</span>
              <p className="font-medium capitalize">{formData.occupation?.replace("-", " ") || "Not specified"}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Lifestyle</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.lifestyle?.length > 0 ? (
                  formData.lifestyle.map((lifestyle: string) => (
                    <Badge key={lifestyle} variant="secondary" className="text-xs capitalize">
                      {lifestyle}
                    </Badge>
                  ))
                ) : (
                  <span className="font-medium">Not specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Photos */}
          {formData.photos?.length > 0 && (
            <div>
              <span className="text-muted-foreground text-sm">Photos ({formData.photos.length})</span>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                {formData.photos.slice(0, 6).map((photo: any, index: number) => (
                  <div key={photo.id} className="aspect-square relative overflow-hidden rounded-md">
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {formData.photos.length > 6 && (
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{formData.photos.length - 6}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Ready to publish?</p>
              <p className="text-muted-foreground">
                By publishing this listing, you agree to our Terms of Service and confirm that all information provided
                is accurate and up-to-date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting} className="px-8">
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </Button>
      </div>
    </form>
  )
}
