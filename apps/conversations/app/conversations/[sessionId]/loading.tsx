import { Skeleton } from "@workspace/ui/skeleton"

const MESSAGE_SKELETONS = [
  { id: "msg-1", isUser: true },
  { id: "msg-2", isUser: false },
  { id: "msg-3", isUser: true },
  { id: "msg-4", isUser: false },
  { id: "msg-5", isUser: true },
  { id: "msg-6", isUser: false },
] as const

export default function ConversationDetailLoading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="mb-6 h-10 w-48" />

      <div className="mb-6">
        <Skeleton className="mb-2 h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="space-y-6">
        {MESSAGE_SKELETONS.map((skeleton) => (
          <div
            className={`flex ${skeleton.isUser ? "justify-end" : "justify-start"}`}
            key={skeleton.id}
          >
            <div className="max-w-[80%] space-y-2">
              <Skeleton className={`h-20 ${skeleton.isUser ? "w-64" : "w-80"}`} />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
