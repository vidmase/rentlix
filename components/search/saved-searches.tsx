"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, Trash2, Edit, Plus } from "lucide-react"

export function SavedSearches() {
  const [savedSearches] = useState([
    {
      id: "1",
      name: "Central London Studios",
      query: "Studio apartments in Central London under £1,500",
      filters: {
        location: "Central London",
        type: "Studio",
        maxPrice: "£1,500",
        furnished: true,
      },
      alertsEnabled: true,
      newResults: 3,
      lastRun: "2 hours ago",
      created: "2024-03-10",
    },
    {
      id: "2",
      name: "Camden House Shares",
      query: "Shared rooms in Camden with garden",
      filters: {
        location: "Camden",
        type: "Shared Room",
        maxPrice: "£900",
        features: ["Garden"],
      },
      alertsEnabled: false,
      newResults: 0,
      lastRun: "1 day ago",
      created: "2024-03-08",
    },
    {
      id: "3",
      name: "East London 1-Beds",
      query: "1 bedroom flats in East London",
      filters: {
        location: "East London",
        type: "1 Bedroom",
        maxPrice: "£2,000",
        furnished: false,
      },
      alertsEnabled: true,
      newResults: 7,
      lastRun: "4 hours ago",
      created: "2024-03-05",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Saved Searches</span>
            </CardTitle>
            <CardDescription>Get notified when new listings match your criteria</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Search
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savedSearches.map((search) => (
            <div key={search.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{search.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{search.query}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline">{search.filters.location}</Badge>
                    <Badge variant="outline">{search.filters.type}</Badge>
                    <Badge variant="outline">Max {search.filters.maxPrice}</Badge>
                    {search.filters.furnished !== undefined && (
                      <Badge variant="outline">{search.filters.furnished ? "Furnished" : "Unfurnished"}</Badge>
                    )}
                    {search.filters.features?.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {search.newResults > 0 && <Badge className="bg-cyan-600">{search.newResults} new</Badge>}
                  <Button
                    variant={search.alertsEnabled ? "default" : "outline"}
                    size="sm"
                    className={search.alertsEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last run: {search.lastRun}</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
