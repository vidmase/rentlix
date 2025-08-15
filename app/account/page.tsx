import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountDashboard } from "@/components/account/account-dashboard"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600 mt-2">Manage your subscription and account preferences</p>
          </div>
          <AccountDashboard />
        </div>
      </main>
      <Footer />
    </div>
  )
}
