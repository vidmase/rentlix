"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Flag,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  CreditCard,
  Activity,
  DollarSign,
  UserCheck,
} from "lucide-react"
import {
  LineChart,
  Line,
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

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active registered users",
    },
    {
      title: "Active Listings",
      value: "3,421",
      change: "+8%",
      changeType: "positive" as const,
      icon: FileText,
      description: "Currently published listings",
    },
    {
      title: "Pending Reports",
      value: "23",
      change: "-15%",
      changeType: "negative" as const,
      icon: Flag,
      description: "Reports awaiting review",
    },
    {
      title: "Monthly Revenue",
      value: "£45,231",
      change: "+23%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Credits purchased this month",
    },
    {
      title: "Credit Transactions",
      value: "1,847",
      change: "+18%",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "Credit purchases this month",
    },
    {
      title: "User Engagement",
      value: "87%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Activity,
      description: "Daily active users",
    },
  ]

  const userGrowthData = [
    { month: "Jan", users: 8500, listings: 2100 },
    { month: "Feb", users: 9200, listings: 2400 },
    { month: "Mar", users: 10100, listings: 2800 },
    { month: "Apr", users: 11200, listings: 3100 },
    { month: "May", users: 12000, listings: 3300 },
    { month: "Jun", users: 12847, listings: 3421 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 28500, credits: 142500 },
    { month: "Feb", revenue: 32100, credits: 160500 },
    { month: "Mar", revenue: 35800, credits: 179000 },
    { month: "Apr", revenue: 39200, credits: 196000 },
    { month: "May", revenue: 42100, credits: 210500 },
    { month: "Jun", revenue: 45231, credits: 226155 },
  ]

  const listingTypesData = [
    { name: "Room Available", value: 1847, color: "#06b6d4" },
    { name: "Looking for Roommate", value: 1124, color: "#8b5cf6" },
    { name: "Entire Property", value: 450, color: "#10b981" },
  ]

  const recentReports = [
    {
      id: "1",
      type: "Inappropriate Content",
      listing: "Modern flat in Central London",
      reporter: "user@example.com",
      status: "pending",
      date: "2 hours ago",
    },
    {
      id: "2",
      type: "Fake Listing",
      listing: "Luxury apartment near Thames",
      reporter: "jane@example.com",
      status: "investigating",
      date: "5 hours ago",
    },
    {
      id: "3",
      type: "Spam",
      listing: "Shared house in Manchester",
      reporter: "mike@example.com",
      status: "resolved",
      date: "1 day ago",
    },
  ]

  const pendingListings = [
    {
      id: "1",
      title: "Spacious room in Victorian house",
      user: "Sarah Johnson",
      location: "Brighton",
      price: "£650/month",
      submitted: "3 hours ago",
    },
    {
      id: "2",
      title: "Modern studio apartment",
      user: "David Chen",
      location: "Manchester",
      price: "£800/month",
      submitted: "6 hours ago",
    },
    {
      id: "3",
      title: "Shared flat near university",
      user: "Emma Wilson",
      location: "Edinburgh",
      price: "£450/month",
      submitted: "1 day ago",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-purple-50 opacity-50" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">{stat.description}</CardDescription>
                </div>
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg">
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-600 flex items-center mt-1">
                  <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"} font-medium`}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-cyan-600" />
              <span>User & Listing Growth</span>
            </CardTitle>
            <CardDescription>Monthly growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="listings" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <span>Revenue Analytics</span>
            </CardTitle>
            <CardDescription>Monthly revenue and credits sold</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span>Listing Distribution</span>
            </CardTitle>
            <CardDescription>Types of listings posted</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={listingTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {listingTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {listingTypesData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-cyan-600" />
              <span>Platform Health</span>
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Verification Rate</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Listing Approval Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Report Resolution Rate</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>User Satisfaction</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Recent Reports</TabsTrigger>
          <TabsTrigger value="listings">Pending Listings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flag className="h-5 w-5" />
                <span>Content Reports</span>
              </CardTitle>
              <CardDescription>Review and moderate reported content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge
                          variant={
                            report.status === "pending"
                              ? "destructive"
                              : report.status === "investigating"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>
                        <span className="font-medium">{report.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{report.listing}</p>
                      <p className="text-xs text-gray-500">
                        Reported by {report.reporter} • {report.date}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Pending Approval</span>
              </CardTitle>
              <CardDescription>Review new listings awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{listing.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {listing.location} • {listing.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {listing.user} • Submitted {listing.submitted}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>User Actions Required</span>
              </CardTitle>
              <CardDescription>Users requiring moderation attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "User One",
                    email: "user.one@example.com",
                    issue: "Multiple spam reports",
                    joined: "Jan 2024",
                    status: "warning",
                  },
                  {
                    name: "Lisa Brown",
                    email: "lisa@example.com",
                    issue: "Inappropriate messages",
                    joined: "Dec 2023",
                    status: "suspended",
                  },
                  {
                    name: "Mike Johnson",
                    email: "mike@example.com",
                    issue: "Fake profile suspected",
                    joined: "Feb 2024",
                    status: "investigating",
                  },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge
                          variant={
                            user.status === "warning"
                              ? "destructive"
                              : user.status === "suspended"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {user.status}
                        </Badge>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        {user.issue} • Joined {user.joined}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Platform Activity</span>
              </CardTitle>
              <CardDescription>Latest actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "New user registration",
                    user: "sarah.johnson@email.com",
                    time: "2 minutes ago",
                    type: "user",
                  },
                  {
                    action: "Listing published",
                    user: "Modern flat in Central London",
                    time: "15 minutes ago",
                    type: "listing",
                  },
                  {
                    action: "Credit purchase",
                    user: "david.chen@email.com - 60 credits",
                    time: "32 minutes ago",
                    type: "payment",
                  },
                  {
                    action: "Report resolved",
                    user: "Inappropriate content report #1247",
                    time: "1 hour ago",
                    type: "moderation",
                  },
                  {
                    action: "User verification completed",
                    user: "emma.wilson@email.com",
                    time: "2 hours ago",
                    type: "verification",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.type === "user"
                            ? "bg-blue-500"
                            : activity.type === "listing"
                              ? "bg-green-500"
                              : activity.type === "payment"
                                ? "bg-purple-500"
                                : activity.type === "moderation"
                                  ? "bg-red-500"
                                  : "bg-cyan-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
