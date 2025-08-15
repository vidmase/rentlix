import { AdminHeader } from "@/components/admin/admin-header"
import { ReportsManagement } from "@/components/admin/reports-management"

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Content Reports</h1>
            <p className="text-gray-600 mt-2">Review and moderate reported content and users</p>
          </div>
          <ReportsManagement />
        </div>
      </main>
    </div>
  )
}
