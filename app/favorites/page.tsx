import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FavoritesList } from "@/components/favorites/favorites-list"

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Saved Listings</h1>
            <p className="text-gray-600 mt-2">Keep track of properties you're interested in</p>
          </div>
          <FavoritesList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
