"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Shield, Globe } from "lucide-react"

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "RoomShare",
    siteDescription: "Find your perfect shared living space",
    maintenanceMode: false,
    userRegistration: true,
    emailVerification: true,
    autoApproveListings: false,
    maxListingsPerUser: 5,
    creditPrices: {
      starter: 5,
      popular: 10,
      power: 20,
      pro: 45,
    },
  })

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Site Configuration</span>
              </CardTitle>
              <CardDescription>Basic site settings and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxListings">Max Listings Per User</Label>
                  <Input
                    id="maxListings"
                    type="number"
                    value={settings.maxListingsPerUser}
                    onChange={(e) => setSettings({ ...settings, maxListingsPerUser: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Temporarily disable public access</p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="registration">User Registration</Label>
                    <p className="text-sm text-gray-500">Allow new user registrations</p>
                  </div>
                  <Switch
                    id="registration"
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, userRegistration: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApprove">Auto-approve Listings</Label>
                    <p className="text-sm text-gray-500">Automatically approve new listings</p>
                  </div>
                  <Switch
                    id="autoApprove"
                    checked={settings.autoApproveListings}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoApproveListings: checked })}
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Credit Pricing</span>
              </CardTitle>
              <CardDescription>Configure credit package pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="starterPrice">Starter Pack (25 credits)</Label>
                  <div className="flex items-center space-x-2">
                    <span>£</span>
                    <Input
                      id="starterPrice"
                      type="number"
                      value={settings.creditPrices.starter}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          creditPrices: { ...settings.creditPrices, starter: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="popularPrice">Popular Pack (65 credits)</Label>
                  <div className="flex items-center space-x-2">
                    <span>£</span>
                    <Input
                      id="popularPrice"
                      type="number"
                      value={settings.creditPrices.popular}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          creditPrices: { ...settings.creditPrices, popular: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="powerPrice">Power Pack (165 credits)</Label>
                  <div className="flex items-center space-x-2">
                    <span>£</span>
                    <Input
                      id="powerPrice"
                      type="number"
                      value={settings.creditPrices.power}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          creditPrices: { ...settings.creditPrices, power: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proPrice">Pro Pack (450 credits)</Label>
                  <div className="flex items-center space-x-2">
                    <span>£</span>
                    <Input
                      id="proPrice"
                      type="number"
                      value={settings.creditPrices.pro}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          creditPrices: { ...settings.creditPrices, pro: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <Button>Update Pricing</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Configure security and verification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailVerification">Email Verification Required</Label>
                    <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                  </div>
                  <Switch
                    id="emailVerification"
                    checked={settings.emailVerification}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailVerification: checked })}
                  />
                </div>
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
