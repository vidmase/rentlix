"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicDetailsStep } from "./steps/basic-details-step"
import { PropertyDetailsStep } from "./steps/property-details-step"
import { PreferencesStep } from "./steps/preferences-step"
import { PhotosStep } from "./steps/photos-step"
import { ReviewStep } from "./steps/review-step"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { useCredits } from "@/hooks/use-credits"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/utils/supabase/clients"
import { useRouter } from "next/navigation"

const steps = [
  { id: "basic", title: "Basic Details", component: BasicDetailsStep },
  { id: "property", title: "Property Details", component: PropertyDetailsStep },
  { id: "preferences", title: "Preferences", component: PreferencesStep },
  { id: "photos", title: "Photos", component: PhotosStep },
  { id: "review", title: "Review", component: ReviewStep },
]

interface PostAdFormProps {
  selectedListingType: "basic" | "featured" | "premium"
  onBack: () => void
}

export function PostAdForm({ selectedListingType, onBack }: PostAdFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { deductCredits } = useCredits()
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()
  
  const [formData, setFormData] = useState({
    // Basic Details
    adType: "",
    title: "",
    description: "",
    location: "",
    postcode: "",
    rent: "",
    deposit: "",
    billsIncluded: false,
    availableFrom: "",
    minimumStay: "",
    maximumStay: "",

    // Property Details
    propertyType: "",
    roomType: "",
    roomSize: "",
    furnishing: "",
    parking: "",
    garden: false,
    balcony: false,
    ensuite: false,
    amenities: [],

    // Preferences
    gender: "",
    ageRange: "",
    occupation: "",
    lifestyle: [],
    pets: "",
    smoking: "",
    couples: "",

    // Photos
    photos: [],
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  const AD_COSTS = {
    basic: 5,
    featured: 10,
    premium: 15,
  }

  const currentCost = AD_COSTS[selectedListingType]

  const handleSubmit = async () => {
    console.log('PostAdForm: Starting submission for', selectedListingType, 'listing, cost:', currentCost)
    setIsSubmitting(true)
    
    try {
      // First, try to deduct credits
      console.log('PostAdForm: Attempting to deduct', currentCost, 'credits')
      const creditsDeducted = await deductCredits(currentCost)
      
      console.log('PostAdForm: Credit deduction result:', creditsDeducted)
      
      if (!creditsDeducted) {
        toast({
          title: "Insufficient credits",
          description: "You don't have enough credits to post this listing.",
          variant: "destructive"
        })
        return
      }

      // Create the listing in the database
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Authentication error",
          description: "Please log in again.",
          variant: "destructive"
        })
        return
      }

      const { data: listing, error } = await supabase
        .from('rentlix_listings')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          address: formData.location,
          city: formData.location.split(',')[0]?.trim() || formData.location,
          postcode: formData.postcode,
          rent_amount: parseFloat(formData.rent) || 0,
          rent_period: 'monthly',
          deposit_amount: parseFloat(formData.deposit) || 0,
          bills_included: formData.billsIncluded,
          available_from: formData.availableFrom,
          minimum_stay_months: parseInt(formData.minimumStay) || null,
          maximum_stay_months: parseInt(formData.maximumStay) || null,
          property_type: formData.propertyType,
          furnished: formData.furnishing === 'furnished',
          parking: formData.parking === 'available',
          garden: formData.garden,
          balcony: formData.balcony,
          wifi: formData.amenities?.includes('wifi') || false,
          washing_machine: formData.amenities?.includes('washing-machine') || false,
          dishwasher: formData.amenities?.includes('dishwasher') || false,
          preferred_gender: formData.gender,
          preferred_age_min: formData.ageRange ? parseInt(formData.ageRange.split('-')[0]) : null,
          preferred_age_max: formData.ageRange ? parseInt(formData.ageRange.split('-')[1]) : null,
          couples_ok: formData.couples === 'allowed',
          pets_ok: formData.pets === 'allowed',
          smoking_ok: formData.smoking === 'allowed',
          images: formData.photos?.length > 0 ? formData.photos : null,
          status: 'active',
          listing_type: selectedListingType
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating listing:', error)
        toast({
          title: "Error creating listing",
          description: error.message,
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Listing created successfully!",
        description: `Your ${selectedListingType} listing has been posted for ${currentCost} credits.`,
      })

      // Redirect to the listing page
      router.push(`/listing/${listing.id}`)
      
    } catch (err: any) {
      console.error('Error submitting listing:', err)
      toast({
        title: "Unexpected error",
        description: err.message || "Failed to create listing",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          ← Back to Listing Options
        </Button>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {selectedListingType.charAt(0).toUpperCase() + selectedListingType.slice(1)} Listing - {currentCost} credits
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={async () => {
              console.log('Test: Direct credit deduction test')
              const result = await deductCredits(currentCost)
              console.log('Test: Credit deduction result:', result)
            }}
          >
            Test Credit Deduction
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </h2>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index < currentStep
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading">{steps[currentStep].title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {currentStep === steps.length - 1 && (
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                  {selectedListingType.charAt(0).toUpperCase() + selectedListingType.slice(1)} Listing - {currentCost} credits
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  )
}
