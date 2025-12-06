import { getSupabaseServiceClient } from "@workspace/supabase/client"
import { listUniqueSessions } from "@workspace/supabase/queries"
import { redirect } from "next/navigation"
import { ConversationsList } from "@/components/conversations-list"
import { auth } from "@/lib/auth"

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>
}) {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  })

  if (!session) {
    redirect("/sign-in")
  }

  const params = await searchParams
  const page = Number.parseInt(params.page || "1", 10)
  const sortOrder = (params.sort as "newest" | "oldest") || "newest"

  // Fetch initial conversations
  const supabase = getSupabaseServiceClient()
  const { sessions, total } = await listUniqueSessions(supabase, {
    page,
    limit: 20,
    sortOrder,
  })

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-4xl">Conversations</h1>
        <p className="text-muted-foreground">View and search chatbot conversation history</p>
      </div>

      <ConversationsList
        initialPage={page}
        initialSessions={sessions}
        initialSort={sortOrder}
        initialTotal={total}
      />
    </div>
  )
}
