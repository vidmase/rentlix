"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, SlidersHorizontal, Map } from "lucide-react"

interface SearchHeaderProps {
  totalResults: number
  sortBy: string
  onSortChange: (sortBy: string) => void
  viewMode: "grid" | "list" | "map"
  onViewModeChange: (viewMode: "grid" | "list" | "map") => void
}

export function SearchHeader({ totalResults, sortBy, onSortChange, viewMode, onViewModeChange }: SearchHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Browse Listings</h1>
          <p className="text-muted-foreground">
            {totalResults} {totalResults === 1 ? "listing" : "listings"} found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("map")}
              className="rounded-l-none"
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Toggle */}
          <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
