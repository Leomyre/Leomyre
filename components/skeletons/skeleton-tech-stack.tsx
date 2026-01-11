import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonTechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <Card key={index} className="p-6 border border-border bg-card">
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((skillIndex) => (
              <div key={skillIndex} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
