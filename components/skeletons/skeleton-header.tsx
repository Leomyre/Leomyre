import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center space-x-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>
    </header>
  )
}
