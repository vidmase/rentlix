"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCredits } from "@/hooks/use-credits"
import { createClient } from "@/utils/supabase/clients"
import { useToast } from "@/hooks/use-toast"

export default function TestCreditsPage() {
  const { credits, loading, error, refreshCredits, deductCredits } = useCredits()
  const [isTesting, setIsTesting] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  const testCreditDeduction = async (amount: number) => {
    setIsTesting(true)
    
    try {
      const success = await deductCredits(amount)
      
      if (success) {
        toast({
          title: "Success!",
          description: `Successfully deducted ${amount} credits. New balance: ${credits - amount}`,
        })
      } else {
        toast({
          title: "Failed",
          description: "Failed to deduct credits. Check console for details.",
          variant: "destructive"
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      })
    } finally {
      setIsTesting(false)
    }
  }

  const testListingCreation = async () => {
    setIsTesting(true)
    
    try {
      // First deduct credits
      const creditsDeducted = await deductCredits(5)
      
      if (!creditsDeducted) {
        toast({
          title: "Insufficient credits",
          description: "You don't have enough credits to create a listing.",
          variant: "destructive"
        })
        return
      }

      // Create a test listing
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
          title: "Test Listing",
          description: "This is a test listing created to verify the credit system.",
          address: "123 Test Street",
          city: "Test City",
          postcode: "TE1 1ST",
          rent_amount: 500,
          rent_period: 'monthly',
          deposit_amount: 500,
          bills_included: true,
          available_from: new Date().toISOString().split('T')[0],
          property_type: 'house',
          furnished: true,
          parking: true,
          status: 'active',
          listing_type: 'basic'
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
        title: "Test listing created!",
        description: `Listing ID: ${listing.id}. 5 credits deducted.`,
      })

    } catch (err: any) {
      console.error('Error in test listing creation:', err)
      toast({
        title: "Unexpected error",
        description: err.message || "Failed to create test listing",
        variant: "destructive"
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Credit System Test Page</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Status */}
        <Card>
          <CardHeader>
            <CardTitle>Current Credit Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <p>Loading credits...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <>
                <div className="text-2xl font-bold text-primary">{credits} credits</div>
                <Button onClick={refreshCredits} variant="outline">
                  Refresh Credits
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Credit Deduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                onClick={() => testCreditDeduction(5)} 
                disabled={isTesting || loading}
                variant="outline"
              >
                Deduct 5
              </Button>
              <Button 
                onClick={() => testCreditDeduction(10)} 
                disabled={isTesting || loading}
                variant="outline"
              >
                Deduct 10
              </Button>
              <Button 
                onClick={() => testCreditDeduction(15)} 
                disabled={isTesting || loading}
                variant="outline"
              >
                Deduct 15
              </Button>
            </div>
            
            <Button 
              onClick={testListingCreation} 
              disabled={isTesting || loading}
              className="w-full"
            >
              Test Full Listing Creation (5 credits)
            </Button>
          </CardContent>
        </Card>

        {/* Credit Costs */}
        <Card>
          <CardHeader>
            <CardTitle>Listing Credit Costs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Basic Listing</span>
              <span className="text-green-600 font-bold">5 credits</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium">Featured Listing</span>
              <span className="text-yellow-600 font-bold">10 credits</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Premium Listing</span>
              <span className="text-purple-600 font-bold">15 credits</span>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>1. <strong>Check your current credits</strong> - Should show your real credit balance</p>
            <p>2. <strong>Test credit deduction</strong> - Try deducting different amounts</p>
            <p>3. <strong>Test full listing creation</strong> - Creates a real listing and deducts 5 credits</p>
            <p>4. <strong>Go to Post Ad page</strong> - <a href="/post-ad" className="text-primary underline">/post-ad</a></p>
            <p>5. <strong>Select a listing type</strong> - Should show your real credits</p>
            <p>6. <strong>Complete the form</strong> - Should deduct credits when published</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
