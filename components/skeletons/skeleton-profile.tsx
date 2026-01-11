import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonProfile() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <Skeleton className="w-64 h-64 rounded-full" />
      <div className="space-y-2 p-5">
        <Skeleton className="h-10 w-64 mx-auto" />
        <div className="h-24 md:h-16">
          <Skeleton className="h-6 w-full max-w-[700px] mx-auto" />
          <Skeleton className="h-6 w-5/6 max-w-[650px] mx-auto mt-2" />
        </div>
      </div>
      <div className="space-x-4">
        <Skeleton className="inline-block h-10 w-10 rounded-md" />
        <Skeleton className="inline-block h-10 w-10 rounded-md" />
        <Skeleton className="inline-block h-10 w-10 rounded-md" />
        <Skeleton className="inline-block h-10 w-10 rounded-md" />
      </div>
    </div>
  )
}
