"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Plus, Minus, Calendar, MessageCircle, Star, Eye, Search, ArrowRight, TrendingUp } from "lucide-react"
import { PurchaseCreditsModal } from "@/components/credits/purchase-credits-modal"

export default function CreditsPage() {
  const [userCredits, setUserCredits] = useState(47)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const creditPackages = [
    {
      name: "Starter Pack",
      credits: 25,
      price: 5,
      pricePerCredit: 0.2,
      bonus: 0,
      popular: false,
    },
    {
      name: "Popular Pack",
      credits: 60,
      price: 10,
      pricePerCredit: 0.17,
      bonus: 5,
      popular: true,
    },
    {
      name: "Power Pack",
      credits: 150,
      price: 20,
      pricePerCredit: 0.13,
      bonus: 15,
      popular: false,
    },
    {
      name: "Pro Pack",
      credits: 400,
      price: 45,
      pricePerCredit: 0.11,
      bonus: 50,
      popular: false,
    },
  ]

  const [creditHistory, setCreditHistory] = useState([
    { id: 1, type: "purchase", amount: 60, description: "Popular Pack purchase", date: "2024-01-15", balance: 47 },
    { id: 2, type: "spend", amount: -5, description: "Posted featured listing", date: "2024-01-14", balance: 52 },
    { id: 3, type: "spend", amount: -2, description: "Contacted landlord", date: "2024-01-13", balance: 54 },
    { id: 4, type: "spend", amount: -3, description: "Search alert setup", date: "2024-01-12", balance: 57 },
    { id: 5, type: "bonus", amount: 5, description: "Referral bonus", date: "2024-01-10", balance: 60 },
  ])

  const creditCosts = [
    { action: "Browse listings", cost: "Free", icon: Eye },
    { action: "Contact landlord/roommate", cost: "2 credits", icon: MessageCircle },
    { action: "Post basic listing", cost: "5 credits", icon: Plus },
    { action: "Featured listing (24h)", cost: "10 credits", icon: Star },
    { action: "Priority placement (7 days)", cost: "15 credits", icon: TrendingUp },
    { action: "Advanced search alerts", cost: "3 credits/month", icon: Search },
  ]

  const handlePurchaseComplete = (credits: number, transactionId: string) => {
    const newBalance = userCredits + credits
    setUserCredits(newBalance)

    // Add transaction to history
    const newTransaction = {
      id: Date.now(),
      type: "purchase" as const,
      amount: credits,
      description: `Credit purchase (${transactionId})`,
      date: new Date().toISOString().split("T")[0],
      balance: newBalance,
    }

    setCreditHistory((prev) => [newTransaction, ...prev])
    setShowPurchaseModal(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Credits
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">Manage your credits and unlock premium features</p>
          </div>

          {/* Current Balance */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-700 mb-2">Current Balance</h2>
                  <p className="text-yellow-600">Use credits for premium features and actions</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-yellow-700 mb-2">{userCredits}</div>
                  <div className="text-yellow-600">credits available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="buy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buy">Buy Credits</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="costs">Credit Costs</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {creditPackages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`relative transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      pkg.popular
                        ? "border-primary shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5"
                        : "hover:border-primary/50"
                    }`}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">{pkg.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">£{pkg.price}</div>
                      <CardDescription>£{pkg.pricePerCredit.toFixed(2)} per credit</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{pkg.credits}</div>
                        <div className="text-sm text-muted-foreground">base credits</div>
                        {pkg.bonus > 0 && <div className="text-green-600 font-medium">+ {pkg.bonus} bonus credits</div>}
                      </div>
                      <Button
                        className={`w-full ${
                          pkg.popular
                            ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                            : ""
                        }`}
                        variant={pkg.popular ? "default" : "outline"}
                        onClick={() => setShowPurchaseModal(true)}
                      >
                        Buy Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View all your credit purchases and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creditHistory.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "purchase"
                                ? "bg-green-100 text-green-600"
                                : transaction.type === "bonus"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {transaction.type === "purchase" || transaction.type === "bonus" ? (
                              <Plus className="h-4 w-4" />
                            ) : (
                              <Minus className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {transaction.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount} credits
                          </div>
                          <div className="text-sm text-muted-foreground">Balance: {transaction.balance}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="costs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Costs</CardTitle>
                  <CardDescription>See how many credits each action costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {creditCosts.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium">{item.action}</span>
                        </div>
                        <Badge
                          variant={item.cost === "Free" ? "secondary" : "default"}
                          className={
                            item.cost === "Free" ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                          }
                        >
                          {item.cost}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <PurchaseCreditsModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  )
}
