import { Skeleton } from "@workspace/ui/skeleton"

const SKELETON_IDS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"] as const

export default function ConversationsLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Skeleton className="mb-2 h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Skeleton className="h-5 w-20" />
          <div className="space-y-3">
            {SKELETON_IDS.map((id) => (
              <Skeleton className="h-24 w-full" key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
