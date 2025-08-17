"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/utils/supabase/clients"
import { useToast } from "@/hooks/use-toast"

interface ProfileData {
  firstName: string
  lastName: string
  phone: string
  gender: string
  occupation: string
  bio: string
  dateOfBirth: string
  userType: string
}

export function ProfileCompletionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    occupation: "",
    bio: "",
    dateOfBirth: "",
    userType: ""
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    // Load existing profile data
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile, error } = await supabase
        .from('rentlix_users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile && !error) {
        const [firstName, ...lastNameParts] = (profile.full_name || "").split(" ")
        const lastName = lastNameParts.join(" ")
        
        setProfileData({
          firstName: firstName || "",
          lastName: lastName || "",
          phone: profile.phone || "",
          gender: profile.gender || "",
          occupation: profile.occupation || "",
          bio: profile.bio || "",
          dateOfBirth: profile.date_of_birth || "",
          userType: profile.user_type || ""
        })
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({ title: "Authentication error", description: "Please log in again.", variant: "destructive" })
        return
      }

      const response = await fetch("/api/rentlix/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone || null,
          gender: profileData.gender || null,
          occupation: profileData.occupation || null,
          bio: profileData.bio || null,
          dateOfBirth: profileData.dateOfBirth || null,
          userType: profileData.userType || null,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile")
      }

      toast({ title: "Success", description: "Profile updated successfully!" })
    } catch (error: any) {
      console.error("Profile update error:", error)
      toast({ 
        title: "Update failed", 
        description: error.message || "Failed to update profile", 
        variant: "destructive" 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            value={profileData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            value={profileData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          value={profileData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="mt-1"
          placeholder="+44 7700 900123"
        />
      </div>

      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select value={profileData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="occupation">Occupation</Label>
        <Input
          id="occupation"
          value={profileData.occupation}
          onChange={(e) => handleInputChange("occupation", e.target.value)}
          className="mt-1"
          placeholder="e.g., Software Developer, Student, Teacher"
        />
      </div>

      <div>
        <Label htmlFor="dateOfBirth">Date of birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={profileData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="userType">I am looking to</Label>
        <Select value={profileData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="find-room">Find a room</SelectItem>
            <SelectItem value="find-roommate">Find a roommate</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={profileData.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          className="mt-1"
          placeholder="Tell us a bit about yourself..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Updating profile..." : "Update profile"}
      </Button>
    </form>
  )
}
