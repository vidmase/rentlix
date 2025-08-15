"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, Activity, MapPin } from "lucide-react"

export function AnalyticsDashboard() {
  const userEngagementData = [
    { day: "Mon", active: 2400, new: 240, returning: 2160 },
    { day: "Tue", active: 2210, new: 198, returning: 2012 },
    { day: "Wed", active: 2290, new: 267, returning: 2023 },
    { day: "Thu", active: 2000, new: 189, returning: 1811 },
    { day: "Fri", active: 2181, new: 234, returning: 1947 },
    { day: "Sat", active: 2500, new: 298, returning: 2202 },
    { day: "Sun", active: 2100, new: 201, returning: 1899 },
  ]

  const locationData = [
    { city: "London", users: 4200, listings: 1200 },
    { city: "Manchester", users: 2100, listings: 650 },
    { city: "Birmingham", users: 1800, listings: 520 },
    { city: "Edinburgh", users: 1200, listings: 380 },
    { city: "Bristol", users: 980, listings: 290 },
    { city: "Leeds", users: 850, listings: 240 },
  ]

  const deviceData = [
    { name: "Mobile", value: 65, color: "#06b6d4" },
    { name: "Desktop", value: 28, color: "#8b5cf6" },
    { name: "Tablet", value: 7, color: "#10b981" },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-cyan-600" />
                  <span>Daily User Engagement</span>
                </CardTitle>
                <CardDescription>Active, new, and returning users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stackId="1"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                    />
                    <Area type="monotone" dataKey="new" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Device Usage</span>
                </CardTitle>
                <CardDescription>How users access the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {deviceData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-600" />
                <span>Geographic Distribution</span>
              </CardTitle>
              <CardDescription>Users and listings by city</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#06b6d4" />
                  <Bar dataKey="listings" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
