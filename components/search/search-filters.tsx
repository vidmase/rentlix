"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MapPin, PoundSterling, Home, Bed, X } from "lucide-react"

interface SearchFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

const amenitiesList = [
  { id: "wifi", label: "WiFi" },
  { id: "kitchen", label: "Kitchen Access" },
  { id: "washing-machine", label: "Washing Machine" },
  { id: "dishwasher", label: "Dishwasher" },
  { id: "gym", label: "Gym" },
  { id: "garden", label: "Garden" },
  { id: "balcony", label: "Balcony" },
  { id: "parking", label: "Parking" },
]

const lifestyleOptions = [
  { id: "professional", label: "Professional" },
  { id: "student", label: "Student" },
  { id: "social", label: "Social" },
  { id: "quiet", label: "Quiet" },
  { id: "creative", label: "Creative" },
  { id: "fitness", label: "Fitness" },
]

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = localFilters[key] || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item: string) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    const clearedFilters = {
      location: "",
      priceMin: "",
      priceMax: "",
      adType: "",
      roomType: "",
      propertyType: "",
      furnishing: "",
      amenities: [],
      gender: "",
      ageRange: "",
      lifestyle: [],
      availableFrom: "",
      billsIncluded: false,
      verifiedOnly: false,
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(localFilters).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === "boolean") return value
    return value !== ""
  })

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Location */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Enter city or area"
            value={localFilters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <PoundSterling className="h-4 w-4 mr-2" />
            Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="priceMin" className="text-xs text-muted-foreground">
                Min
              </Label>
              <Input
                id="priceMin"
                type="number"
                placeholder="£0"
                value={localFilters.priceMin}
                onChange={(e) => updateFilter("priceMin", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="priceMax" className="text-xs text-muted-foreground">
                Max
              </Label>
              <Input
                id="priceMax"
                type="number"
                placeholder="£2000"
                value={localFilters.priceMax}
                onChange={(e) => updateFilter("priceMax", e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="billsIncluded"
              checked={localFilters.billsIncluded}
              onCheckedChange={(checked) => updateFilter("billsIncluded", checked)}
            />
            <Label htmlFor="billsIncluded" className="text-sm">
              Bills included
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Listing Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Listing Type</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={localFilters.adType} onValueChange={(value) => updateFilter("adType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All types</SelectItem>
              <SelectItem value="room-available">Room Available</SelectItem>
              <SelectItem value="looking-for-room">Looking for Room</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Property Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Property Type</Label>
            <Select value={localFilters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="flat">Flat/Apartment</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="maisonette">Maisonette</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground flex items-center">
              <Bed className="h-3 w-3 mr-1" />
              Room Type
            </Label>
            <Select value={localFilters.roomType} onValueChange={(value) => updateFilter("roomType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="single">Single Room</SelectItem>
                <SelectItem value="double">Double Room</SelectItem>
                <SelectItem value="twin">Twin Room</SelectItem>
                <SelectItem value="master">Master Bedroom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Furnishing</Label>
            <Select value={localFilters.furnishing} onValueChange={(value) => updateFilter("furnishing", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="furnished">Fully Furnished</SelectItem>
                <SelectItem value="part-furnished">Part Furnished</SelectItem>
                <SelectItem value="unfurnished">Unfurnished</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.id}
                  checked={localFilters.amenities?.includes(amenity.id)}
                  onCheckedChange={() => toggleArrayFilter("amenities", amenity.id)}
                />
                <Label htmlFor={amenity.id} className="text-xs">
                  {amenity.label}
                </Label>
              </div>
            ))}
          </div>
          {localFilters.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {localFilters.amenities.map((amenityId: string) => {
                const amenity = amenitiesList.find((a) => a.id === amenityId)
                return amenity ? (
                  <Badge key={amenityId} variant="secondary" className="text-xs">
                    {amenity.label}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter("amenities", amenityId)}
                    />
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Roommate Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Roommate Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Gender</Label>
            <Select value={localFilters.gender} onValueChange={(value) => updateFilter("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="no-preference">No Preference</SelectItem>
                <SelectItem value="male">Male Only</SelectItem>
                <SelectItem value="female">Female Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Age Range</Label>
            <Select value={localFilters.ageRange} onValueChange={(value) => updateFilter("ageRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="18-25">18-25</SelectItem>
                <SelectItem value="26-35">26-35</SelectItem>
                <SelectItem value="36-45">36-45</SelectItem>
                <SelectItem value="46+">46+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Lifestyle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {lifestyleOptions.map((lifestyle) => (
              <div key={lifestyle.id} className="flex items-center space-x-2">
                <Checkbox
                  id={lifestyle.id}
                  checked={localFilters.lifestyle?.includes(lifestyle.id)}
                  onCheckedChange={() => toggleArrayFilter("lifestyle", lifestyle.id)}
                />
                <Label htmlFor={lifestyle.id} className="text-xs">
                  {lifestyle.label}
                </Label>
              </div>
            ))}
          </div>
          {localFilters.lifestyle?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {localFilters.lifestyle.map((lifestyleId: string) => {
                const lifestyle = lifestyleOptions.find((l) => l.id === lifestyleId)
                return lifestyle ? (
                  <Badge key={lifestyleId} variant="secondary" className="text-xs">
                    {lifestyle.label}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleArrayFilter("lifestyle", lifestyleId)}
                    />
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verifiedOnly"
              checked={localFilters.verifiedOnly}
              onCheckedChange={(checked) => updateFilter("verifiedOnly", checked)}
            />
            <Label htmlFor="verifiedOnly" className="text-sm">
              Verified Only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
