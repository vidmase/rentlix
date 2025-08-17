"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, CreditCard, User, Bell, Shield } from "lucide-react"
import { ProfileCompletionForm } from "./profile-completion-form"

export function AccountDashboard() {
  const [currentPlan] = useState("Premium")
  const [billingDate] = useState("March 15, 2024")

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-cyan-600" />
              <div>
                <CardTitle>Current Plan: {currentPlan}</CardTitle>
                <CardDescription>Next billing date: {billingDate}</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">£19.99/month</p>
              <p className="text-gray-600">Unlimited messaging and priority support</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Tabs */}
      <Tabs defaultValue="billing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="billing" className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <Badge variant="secondary">Primary</Badge>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Feb 15, 2024", amount: "£19.99", status: "Paid" },
                  { date: "Jan 15, 2024", amount: "£19.99", status: "Paid" },
                  { date: "Dec 15, 2023", amount: "£19.99", status: "Paid" },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-gray-600">Premium Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileCompletionForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "New Messages", description: "Get notified when you receive new messages" },
                { title: "Listing Updates", description: "Updates about your posted listings" },
                { title: "Marketing Emails", description: "Tips and promotional content" },
                { title: "Account Security", description: "Important security notifications" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Download Account Data
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
