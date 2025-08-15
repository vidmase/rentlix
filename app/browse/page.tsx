import { SearchAndBrowse } from "@/components/search/search-and-browse"
import { Header } from "@/components/header"

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SearchAndBrowse />
      </main>
    </div>
  )
}
