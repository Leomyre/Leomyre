import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCharacterTrait() {
  return (
    <Card className="overflow-hidden border border-border bg-card">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Skeleton className="h-14 w-14 rounded-full mb-4" />
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  )
}
