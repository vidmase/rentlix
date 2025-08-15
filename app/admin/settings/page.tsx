import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSettings } from "@/components/admin/admin-settings"

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
          </div>
          <AdminSettings />
        </div>
      </main>
    </div>
  )
}
