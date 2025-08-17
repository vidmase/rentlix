"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, CheckCircle, X, AlertTriangle, Flag } from "lucide-react"

export function ReportsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const reports = [
    {
      id: "RPT-001",
      type: "Inappropriate Content",
      category: "listing",
      title: "Modern flat in Central London",
      reporter: "user@example.com",
      reported: "user.reported@example.com",
      reason: "Contains inappropriate images and misleading information about the property",
      status: "pending",
      priority: "high",
      date: "2024-03-15 14:30",
      evidence: ["Screenshot 1", "Screenshot 2"],
    },
    {
      id: "RPT-002",
      type: "Harassment",
      category: "message",
      title: "Inappropriate messaging behavior",
      reporter: "jane@example.com",
      reported: "mike.smith@example.com",
      reason: "User sent multiple inappropriate messages despite being asked to stop",
      status: "investigating",
      priority: "high",
      date: "2024-03-15 12:15",
      evidence: ["Message thread", "Screenshots"],
    },
    {
      id: "RPT-003",
      type: "Fake Listing",
      category: "listing",
      title: "Luxury apartment near Thames",
      reporter: "admin@roomshare.com",
      reported: "fake.user@example.com",
      reason: "Listing uses stock photos and property doesn't exist at given address",
      status: "resolved",
      priority: "medium",
      date: "2024-03-14 16:45",
      evidence: ["Address verification", "Photo analysis"],
    },
    {
      id: "RPT-004",
      type: "Spam",
      category: "listing",
      title: "Multiple duplicate listings",
      reporter: "system",
      reported: "spammer@example.com",
      reason: "User posted the same listing 15 times with slight variations",
      status: "resolved",
      priority: "low",
      date: "2024-03-14 09:20",
      evidence: ["Duplicate detection report"],
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reported.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive"
      case "investigating":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                    <Badge variant="outline" className={getPriorityColor(report.priority)}>
                      {report.priority} priority
                    </Badge>
                    <span className="text-sm text-gray-500">#{report.id}</span>
                  </div>
                  <CardTitle className="text-lg">{report.type}</CardTitle>
                  <CardDescription>{report.title}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {report.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm">
                        <X className="h-4 w-4 mr-1" />
                        Dismiss
                      </Button>
                      <Button size="sm">
                        <Flag className="h-4 w-4 mr-1" />
                        Investigate
                      </Button>
                    </>
                  )}
                  {report.status === "investigating" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Reporter:</span>
                    <span className="ml-2 text-gray-600">{report.reporter}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Reported User:</span>
                    <span className="ml-2 text-gray-600">{report.reported}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600 capitalize">{report.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="ml-2 text-gray-600">{report.date}</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Reason:</span>
                  <p className="mt-1 text-gray-600">{report.reason}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Evidence:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {report.evidence.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">No reports match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
