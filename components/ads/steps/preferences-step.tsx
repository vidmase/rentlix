"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, Coffee, Music, Book, Gamepad2 } from "lucide-react"

interface PreferencesStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

const lifestyleOptions = [
  { id: "social", label: "Social", icon: Users },
  { id: "professional", label: "Professional", icon: Briefcase },
  { id: "quiet", label: "Quiet", icon: Book },
  { id: "party", label: "Party-friendly", icon: Music },
  { id: "fitness", label: "Fitness-focused", icon: Coffee },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
]

export function PreferencesStep({ formData, updateFormData, onNext, onPrev }: PreferencesStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const toggleLifestyle = (lifestyleId: string) => {
    const currentLifestyle = formData.lifestyle || []
    const updatedLifestyle = currentLifestyle.includes(lifestyleId)
      ? currentLifestyle.filter((id: string) => id !== lifestyleId)
      : [...currentLifestyle, lifestyleId]
    updateFormData({ lifestyle: updatedLifestyle })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-heading font-semibold text-lg mb-2">Roommate Preferences</h3>
        <p className="text-muted-foreground">Help us match you with compatible roommates</p>
      </div>

      {/* Gender Preference */}
      <div className="space-y-2">
        <Label>Gender Preference</Label>
        <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-preference">No Preference</SelectItem>
            <SelectItem value="male">Male Only</SelectItem>
            <SelectItem value="female">Female Only</SelectItem>
            <SelectItem value="non-binary">Non-binary Friendly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Age Range */}
      <div className="space-y-2">
        <Label>Preferred Age Range</Label>
        <Select value={formData.ageRange} onValueChange={(value) => updateFormData({ ageRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="18-25">18-25</SelectItem>
            <SelectItem value="26-35">26-35</SelectItem>
            <SelectItem value="36-45">36-45</SelectItem>
            <SelectItem value="46+">46+</SelectItem>
            <SelectItem value="no-preference">No Preference</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Occupation */}
      <div className="space-y-2">
        <Label>Preferred Occupation</Label>
        <Select value={formData.occupation} onValueChange={(value) => updateFormData({ occupation: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select occupation preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-preference">No Preference</SelectItem>
            <SelectItem value="student">Students Only</SelectItem>
            <SelectItem value="professional">Professionals Only</SelectItem>
            <SelectItem value="mixed">Mixed (Students & Professionals)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lifestyle Preferences */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Lifestyle Preferences</Label>
        <p className="text-sm text-muted-foreground">Select all that apply to you or what you're looking for</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {lifestyleOptions.map((lifestyle) => {
            const Icon = lifestyle.icon
            const isSelected = formData.lifestyle?.includes(lifestyle.id)
            return (
              <Card
                key={lifestyle.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => toggleLifestyle(lifestyle.id)}
              >
                <CardContent className="p-4 flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{lifestyle.label}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {formData.lifestyle?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.lifestyle.map((lifestyleId: string) => {
              const lifestyle = lifestyleOptions.find((l) => l.id === lifestyleId)
              return lifestyle ? (
                <Badge key={lifestyleId} variant="secondary">
                  {lifestyle.label}
                </Badge>
              ) : null
            })}
          </div>
        )}
      </div>

      {/* Additional Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Pets</Label>
          <Select value={formData.pets} onValueChange={(value) => updateFormData({ pets: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-pets">No Pets</SelectItem>
              <SelectItem value="pets-ok">Pets OK</SelectItem>
              <SelectItem value="has-pets">I Have Pets</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Smoking</Label>
          <Select value={formData.smoking} onValueChange={(value) => updateFormData({ smoking: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-smoking">No Smoking</SelectItem>
              <SelectItem value="smoking-ok">Smoking OK</SelectItem>
              <SelectItem value="outside-only">Outside Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Couples</Label>
          <Select value={formData.couples} onValueChange={(value) => updateFormData({ couples: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-couples">No Couples</SelectItem>
              <SelectItem value="couples-ok">Couples OK</SelectItem>
              <SelectItem value="is-couple">I Am Part of a Couple</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onPrev}>
          Previous
        </Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  )
}
