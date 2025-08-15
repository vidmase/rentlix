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

const steps = [
  { id: "basic", title: "Basic Details", component: BasicDetailsStep },
  { id: "property", title: "Property Details", component: PropertyDetailsStep },
  { id: "preferences", title: "Preferences", component: PreferencesStep },
  { id: "photos", title: "Photos", component: PhotosStep },
  { id: "review", title: "Review", component: ReviewStep },
]

export function PostAdForm() {
  const [currentStep, setCurrentStep] = useState(0)
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

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
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
          <CardTitle className="font-heading">{steps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
            isFirst={currentStep === 0}
            isLast={currentStep === steps.length - 1}
          />
        </CardContent>
      </Card>
    </div>
  )
}
