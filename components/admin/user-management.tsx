"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Mail, CheckCircle, Eye, MoreHorizontal } from "lucide-react"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      verified: true,
      joinDate: "Jan 15, 2024",
      lastActive: "2 hours ago",
      listings: 3,
      credits: 45,
      reports: 0,
    },
    {
      id: "2",
      name: "David Chen",
      email: "david.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
      verified: true,
      joinDate: "Dec 8, 2023",
      lastActive: "1 day ago",
      listings: 1,
      credits: 23,
      reports: 0,
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "warning",
      verified: false,
      joinDate: "Feb 22, 2024",
      lastActive: "3 days ago",
      listings: 2,
      credits: 12,
      reports: 2,
    },
    {
      id: "4",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "suspended",
      verified: true,
      joinDate: "Nov 30, 2023",
      lastActive: "1 week ago",
      listings: 0,
      credits: 0,
      reports: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Search & Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{user.name}</h4>
                      {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Joined {user.joinDate}</span>
                      <span>•</span>
                      <span>Last active {user.lastActive}</span>
                      <span>•</span>
                      <span>{user.listings} listings</span>
                      <span>•</span>
                      <span>{user.credits} credits</span>
                      {user.reports > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-red-500">{user.reports} reports</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
