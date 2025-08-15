"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    icon: Star,
    features: [
      "Browse unlimited listings",
      "Contact up to 3 people per month",
      "Basic profile creation",
      "Standard search filters",
      "Email support",
    ],
    limitations: ["Limited messaging", "No priority placement", "Basic profile visibility"],
    buttonText: "Get Started Free",
    popular: false,
  },
  {
    name: "Premium",
    price: "£19.99",
    period: "/month",
    description: "Most popular for active users",
    icon: Crown,
    features: [
      "Everything in Basic",
      "Unlimited messaging",
      "Priority listing placement",
      "Advanced search filters",
      "Profile verification badge",
      "Read receipts",
      "24/7 priority support",
      "Ad-free experience",
    ],
    limitations: [],
    buttonText: "Start Premium Trial",
    popular: true,
  },
  {
    name: "Pro",
    price: "£39.99",
    period: "/month",
    description: "For landlords and property managers",
    icon: Zap,
    features: [
      "Everything in Premium",
      "Multiple property listings",
      "Tenant screening tools",
      "Analytics dashboard",
      "Bulk messaging",
      "Custom branding",
      "API access",
      "Dedicated account manager",
    ],
    limitations: [],
    buttonText: "Contact Sales",
    popular: false,
  },
]

export function PricingPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-1 shadow-sm border">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === "monthly" ? "bg-cyan-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingPeriod === "yearly" ? "bg-cyan-600 text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
              Save 20%
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon
          const yearlyPrice =
            plan.price !== "Free" ? `£${Math.round(Number.parseFloat(plan.price.replace("£", "")) * 12 * 0.8)}` : "Free"

          return (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-cyan-500 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-600">Most Popular</Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? "bg-cyan-100" : "bg-gray-100"}`}>
                    <Icon className={`h-6 w-6 ${plan.popular ? "text-cyan-600" : "text-gray-600"}`} />
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">
                    {billingPeriod === "monthly" ? plan.price : yearlyPrice}
                    {plan.period && (
                      <span className="text-lg font-normal text-gray-600">
                        {billingPeriod === "monthly" ? plan.period : "/year"}
                      </span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && plan.price !== "Free" && (
                    <p className="text-sm text-gray-500 mt-1">Billed annually</p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular ? "bg-cyan-600 hover:bg-cyan-700" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">Can I change my plan anytime?</h4>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
              prorate any billing adjustments.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-gray-600">
              Premium users get a 7-day free trial with full access to all features. No credit card required to start.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
