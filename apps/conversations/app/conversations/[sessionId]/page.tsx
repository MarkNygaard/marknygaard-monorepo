import { getSupabaseServiceClient } from "@workspace/supabase/client"
import { getConversationsBySession } from "@workspace/supabase/queries"
import { Button } from "@workspace/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ConversationThread } from "@/components/conversation-thread"
import { auth } from "@/lib/auth"

export default async function ConversationDetailPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const { sessionId } = await params

  // Fetch conversation messages
  const supabase = getSupabaseServiceClient()
  const messages = await getConversationsBySession(supabase, sessionId)

  if (messages.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Link href="/conversations">
          <Button className="mb-6" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to conversations
          </Button>
        </Link>

        <div className="rounded-lg border p-12 text-center">
          <h2 className="mb-2 font-semibold text-lg">Conversation not found</h2>
          <p className="text-muted-foreground text-sm">
            This conversation may have been deleted or does not exist.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/conversations">
        <Button className="mb-6" variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to conversations
        </Button>
      </Link>

      <div className="mb-6">
        <h1 className="mb-2 font-bold text-2xl">Conversation Details</h1>
        <p className="text-muted-foreground text-sm">
          Session ID: <code className="rounded bg-muted px-2 py-1">{sessionId}</code>
        </p>
      </div>

      <ConversationThread messages={messages} />
    </div>
  )
}
