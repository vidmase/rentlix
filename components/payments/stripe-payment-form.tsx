"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, CheckCircle } from "lucide-react"

interface PaymentFormProps {
  creditPackage: {
    name: string
    credits: number
    price: number
    bonus: number
  }
  onPaymentSuccess: (transactionId: string) => void
  onCancel: () => void
}

export function StripePaymentForm({ creditPackage, onPaymentSuccess, onCancel }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful payment
    const transactionId = `txn_${Date.now()}`
    setPaymentComplete(true)

    setTimeout(() => {
      onPaymentSuccess(transactionId)
    }, 1500)
  }

  if (paymentComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold text-green-700">Payment Successful!</h3>
            <p className="text-gray-600">Your credits are being added to your account...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Complete Your Purchase
        </CardTitle>
        <CardDescription>
          {creditPackage.name} - {creditPackage.credits + creditPackage.bonus} credits for £{creditPackage.price}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Credits:</span>
            <span className="font-bold text-cyan-600">
              {creditPackage.credits} + {creditPackage.bonus} bonus = {creditPackage.credits + creditPackage.bonus}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium">Total Price:</span>
            <span className="font-bold text-lg">£{creditPackage.price}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Cardholder Name</Label>
            <Input
              id="name"
              placeholder="Cardholder name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
          >
            {isProcessing ? "Processing..." : `Pay £${creditPackage.price}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
