import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function LoginFormSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="text-center">
        <Skeleton className="h-4 w-48 mx-auto" />
      </div>
    </div>
  )
}
