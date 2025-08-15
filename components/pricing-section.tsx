"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Coins, Zap, Crown, Star } from "lucide-react"

const creditPackages = [
  {
    name: "Starter Pack",
    credits: 25,
    bonusCredits: 0,
    price: "£5",
    pricePerCredit: "£0.20",
    description: "Perfect for casual browsing",
    icon: Star,
    features: [
      "25 credits included",
      "Contact 12+ landlords",
      "Post 5 basic listings",
      "Credits never expire",
      "Full platform access",
    ],
    buttonText: "Buy Starter Pack",
    buttonVariant: "outline" as const,
    popular: false,
    savings: null,
  },
  {
    name: "Popular Pack",
    credits: 60,
    bonusCredits: 5,
    price: "£10",
    pricePerCredit: "£0.17",
    description: "Most popular for active users",
    icon: Zap,
    features: [
      "60 credits + 5 bonus",
      "Contact 30+ landlords",
      "Post 13 listings",
      "2 featured listings",
      "Profile verification",
      "Priority support",
    ],
    buttonText: "Buy Popular Pack",
    buttonVariant: "default" as const,
    popular: true,
    savings: "15%",
  },
  {
    name: "Power Pack",
    credits: 150,
    bonusCredits: 15,
    price: "£20",
    pricePerCredit: "£0.13",
    description: "For serious property hunters",
    icon: Coins,
    features: [
      "150 credits + 15 bonus",
      "Contact 80+ landlords",
      "Post 33 listings",
      "10 featured listings",
      "Advanced search alerts",
      "Bulk messaging tools",
    ],
    buttonText: "Buy Power Pack",
    buttonVariant: "outline" as const,
    popular: false,
    savings: "35%",
  },
  {
    name: "Pro Pack",
    credits: 400,
    bonusCredits: 50,
    price: "£45",
    pricePerCredit: "£0.11",
    description: "For landlords & property managers",
    icon: Crown,
    features: [
      "400 credits + 50 bonus",
      "Unlimited contacts",
      "Post 90 listings",
      "30 featured listings",
      "Priority placement",
      "Analytics dashboard",
    ],
    buttonText: "Buy Pro Pack",
    buttonVariant: "outline" as const,
    popular: false,
    savings: "45%",
  },
]

const creditCosts = [
  { action: "Browse listings", cost: "Free", icon: "👀" },
  { action: "Contact landlord/roommate", cost: "2 credits", icon: "💬" },
  { action: "Post basic listing", cost: "5 credits", icon: "📝" },
  { action: "Featured listing (24h)", cost: "10 credits", icon: "⭐" },
  { action: "Priority placement (7 days)", cost: "15 credits", icon: "🚀" },
  { action: "Profile verification", cost: "8 credits", icon: "✅" },
  { action: "Advanced search alerts", cost: "3 credits/month", icon: "🔔" },
  { action: "Bulk messaging (10 messages)", cost: "12 credits", icon: "📢" },
]

export function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Coins className="w-4 h-4 mr-2" />
            Credits System
          </Badge>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Pay Only For What You Use
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No monthly subscriptions. Buy credits once, use them anytime. Credits never expire!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">How Credits Work</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {creditCosts.map((item, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-sm mb-1">{item.action}</div>
                <div className="text-primary font-semibold text-sm">{item.cost}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {creditPackages.map((pack, index) => {
            const IconComponent = pack.icon
            const totalCredits = pack.credits + pack.bonusCredits
            return (
              <Card
                key={pack.name}
                className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  pack.popular
                    ? "border-primary shadow-xl scale-105 bg-gradient-to-br from-background to-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                {pack.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                    Most Popular
                  </Badge>
                )}

                {pack.savings && (
                  <Badge variant="secondary" className="absolute -top-3 -right-3 bg-green-500 text-white">
                    Save {pack.savings}
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      pack.popular ? "bg-gradient-to-br from-primary to-secondary" : "bg-muted"
                    }`}
                  >
                    <IconComponent className={`w-8 h-8 ${pack.popular ? "text-white" : "text-primary"}`} />
                  </div>
                  <CardTitle className="text-xl font-bold">{pack.name}</CardTitle>
                  <CardDescription className="text-sm">{pack.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{pack.price}</span>
                    <div className="text-sm text-muted-foreground mt-1">{pack.pricePerCredit} per credit</div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-primary">
                        {totalCredits} credits total
                      </Badge>
                      {pack.bonusCredits > 0 && (
                        <div className="text-xs text-green-600 mt-1">+{pack.bonusCredits} bonus credits!</div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {pack.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    variant={pack.buttonVariant}
                    className={`w-full py-4 text-sm font-semibold transition-all duration-300 ${
                      pack.popular
                        ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105"
                        : "hover:scale-105"
                    }`}
                  >
                    {pack.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Why choose credits over subscriptions?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Credits never expire</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Pay only for what you use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No monthly commitments</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Bonus credits on larger packs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
