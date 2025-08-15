"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Bed, Car, Trees, Wifi, Tv, Utensils, Waves } from "lucide-react"

interface PropertyDetailsStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

const amenitiesList = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "tv", label: "TV", icon: Tv },
  { id: "kitchen", label: "Kitchen Access", icon: Utensils },
  { id: "washing-machine", label: "Washing Machine", icon: Waves },
  { id: "dishwasher", label: "Dishwasher", icon: Utensils },
  { id: "gym", label: "Gym", icon: Home },
  { id: "study-room", label: "Study Room", icon: Home },
  { id: "living-room", label: "Living Room", icon: Home },
]

export function PropertyDetailsStep({ formData, updateFormData, onNext, onPrev }: PropertyDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const toggleAmenity = (amenityId: string) => {
    const currentAmenities = formData.amenities || []
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id: string) => id !== amenityId)
      : [...currentAmenities, amenityId]
    updateFormData({ amenities: updatedAmenities })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Property Type */}
      <div className="space-y-2">
        <Label>
          <Home className="h-4 w-4 inline mr-1" />
          Property Type *
        </Label>
        <Select value={formData.propertyType} onValueChange={(value) => updateFormData({ propertyType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="flat">Flat/Apartment</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="maisonette">Maisonette</SelectItem>
            <SelectItem value="bungalow">Bungalow</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            <Bed className="h-4 w-4 inline mr-1" />
            Room Type *
          </Label>
          <Select value={formData.roomType} onValueChange={(value) => updateFormData({ roomType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Room</SelectItem>
              <SelectItem value="double">Double Room</SelectItem>
              <SelectItem value="twin">Twin Room</SelectItem>
              <SelectItem value="master">Master Bedroom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Room Size</Label>
          <Select value={formData.roomSize} onValueChange={(value) => updateFormData({ roomSize: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="very-large">Very Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Furnishing */}
      <div className="space-y-2">
        <Label>Furnishing *</Label>
        <Select value={formData.furnishing} onValueChange={(value) => updateFormData({ furnishing: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select furnishing level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="furnished">Fully Furnished</SelectItem>
            <SelectItem value="part-furnished">Part Furnished</SelectItem>
            <SelectItem value="unfurnished">Unfurnished</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Parking */}
      <div className="space-y-2">
        <Label>
          <Car className="h-4 w-4 inline mr-1" />
          Parking
        </Label>
        <Select value={formData.parking} onValueChange={(value) => updateFormData({ parking: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select parking option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Parking</SelectItem>
            <SelectItem value="street">Street Parking</SelectItem>
            <SelectItem value="driveway">Driveway</SelectItem>
            <SelectItem value="garage">Garage</SelectItem>
            <SelectItem value="permit">Permit Required</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Features */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Property Features</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="garden"
              checked={formData.garden}
              onCheckedChange={(checked) => updateFormData({ garden: checked })}
            />
            <Label htmlFor="garden" className="flex items-center">
              <Trees className="h-4 w-4 mr-1" />
              Garden
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="balcony"
              checked={formData.balcony}
              onCheckedChange={(checked) => updateFormData({ balcony: checked })}
            />
            <Label htmlFor="balcony">Balcony/Terrace</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ensuite"
              checked={formData.ensuite}
              onCheckedChange={(checked) => updateFormData({ ensuite: checked })}
            />
            <Label htmlFor="ensuite">En-suite Bathroom</Label>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Amenities</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenitiesList.map((amenity) => {
            const Icon = amenity.icon
            const isSelected = formData.amenities?.includes(amenity.id)
            return (
              <Card
                key={amenity.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => toggleAmenity(amenity.id)}
              >
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <Icon className="h-5 w-5 mb-1 text-primary" />
                  <span className="text-xs">{amenity.label}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {formData.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.amenities.map((amenityId: string) => {
              const amenity = amenitiesList.find((a) => a.id === amenityId)
              return amenity ? (
                <Badge key={amenityId} variant="secondary">
                  {amenity.label}
                </Badge>
              ) : null
            })}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit" disabled={!formData.propertyType || !formData.roomType || !formData.furnishing}>
          Continue
        </Button>
      </div>
    </form>
  )
}
