"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Plus } from "lucide-react"
import Link from "next/link"

interface CreditsDisplayProps {
  credits: number
  className?: string
}

export function CreditsDisplay({ credits, className }: CreditsDisplayProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Coins className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Credits</p>
              <Badge variant="secondary" className="text-base font-semibold">
                {credits} credits
              </Badge>
            </div>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link href="/pricing" className="flex items-center gap-2">
              <Plus className="h-3 w-3" />
              Buy More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
