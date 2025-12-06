import { getSupabaseServiceClient } from "@workspace/supabase/client"
import { listUniqueSessions } from "@workspace/supabase/queries"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10)
    const sortOrder = (searchParams.get("sort") as "newest" | "oldest") || "newest"
    const searchQuery = searchParams.get("search") || undefined

    // Get Supabase client
    const supabase = getSupabaseServiceClient()

    // Fetch sessions
    const { sessions, total } = await listUniqueSessions(supabase, {
      page,
      limit,
      sortOrder,
    })

    // Filter by search query if provided
    let filteredSessions = sessions
    if (searchQuery) {
      filteredSessions = sessions.filter((conversationSession) =>
        conversationSession.first_message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return NextResponse.json({
      sessions: filteredSessions,
      total: searchQuery ? filteredSessions.length : total,
      page,
      limit,
      hasMore: page * limit < (searchQuery ? filteredSessions.length : total),
    })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch conversations"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
