"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface FavoritesButtonProps {
  listingId: string
  initialFavorited?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
}

export function FavoritesButton({
  listingId,
  initialFavorited = false,
  className,
  size = "default",
}: FavoritesButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    setIsFavorited(!isFavorited)
    setIsLoading(false)
  }

  return (
    <Button
      variant={isFavorited ? "default" : "outline"}
      size={size}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={cn(
        "transition-all duration-200",
        isFavorited
          ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
          : "hover:bg-red-50 hover:border-red-200 hover:text-red-600",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", size === "sm" && "h-3 w-3", size === "lg" && "h-5 w-5", isFavorited && "fill-current")}
      />
      {size !== "sm" && <span className="ml-2">{isFavorited ? "Saved" : "Save"}</span>}
    </Button>
  )
}
