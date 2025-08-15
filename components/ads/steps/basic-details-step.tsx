"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Users, MapPin, Calendar, PoundSterling } from "lucide-react"

interface BasicDetailsStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export function BasicDetailsStep({ formData, updateFormData, onNext, isFirst }: BasicDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Ad Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-medium">What type of listing is this?</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all ${
              formData.adType === "room-available" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => updateFormData({ adType: "room-available" })}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <Home className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Room Available</h3>
                <p className="text-sm text-muted-foreground">I have a room to rent</p>
              </div>
            </CardContent>
          </Card>
          <Card
            className={`cursor-pointer transition-all ${
              formData.adType === "looking-for-room" ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
            }`}
            onClick={() => updateFormData({ adType: "looking-for-room" })}
          >
            <CardContent className="p-4 flex items-center space-x-3">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Looking for Room</h3>
                <p className="text-sm text-muted-foreground">I need a room to rent</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Listing Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="e.g., Spacious double room in friendly house share"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Describe your room, the property, and what you're looking for in a roommate..."
          rows={4}
          required
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">
            <MapPin className="h-4 w-4 inline mr-1" />
            Location *
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="e.g., Shoreditch, London"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode *</Label>
          <Input
            id="postcode"
            value={formData.postcode}
            onChange={(e) => updateFormData({ postcode: e.target.value })}
            placeholder="e.g., E1 6AN"
            required
          />
        </div>
      </div>

      {/* Rent and Deposit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rent">
            <PoundSterling className="h-4 w-4 inline mr-1" />
            Monthly Rent *
          </Label>
          <Input
            id="rent"
            type="number"
            value={formData.rent}
            onChange={(e) => updateFormData({ rent: e.target.value })}
            placeholder="650"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deposit">Deposit</Label>
          <Input
            id="deposit"
            type="number"
            value={formData.deposit}
            onChange={(e) => updateFormData({ deposit: e.target.value })}
            placeholder="650"
          />
        </div>
      </div>

      {/* Bills Included */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="billsIncluded"
          checked={formData.billsIncluded}
          onCheckedChange={(checked) => updateFormData({ billsIncluded: checked })}
        />
        <Label htmlFor="billsIncluded">Bills included in rent</Label>
      </div>

      {/* Availability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="availableFrom">
            <Calendar className="h-4 w-4 inline mr-1" />
            Available From *
          </Label>
          <Input
            id="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={(e) => updateFormData({ availableFrom: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minimumStay">Minimum Stay</Label>
          <Select value={formData.minimumStay} onValueChange={(value) => updateFormData({ minimumStay: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 month</SelectItem>
              <SelectItem value="3-months">3 months</SelectItem>
              <SelectItem value="6-months">6 months</SelectItem>
              <SelectItem value="12-months">12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maximumStay">Maximum Stay</Label>
          <Select value={formData.maximumStay} onValueChange={(value) => updateFormData({ maximumStay: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6-months">6 months</SelectItem>
              <SelectItem value="12-months">12 months</SelectItem>
              <SelectItem value="18-months">18 months</SelectItem>
              <SelectItem value="no-limit">No limit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <div></div>
        <Button type="submit" disabled={!formData.adType || !formData.title || !formData.description}>
          Continue
        </Button>
      </div>
    </form>
  )
}
