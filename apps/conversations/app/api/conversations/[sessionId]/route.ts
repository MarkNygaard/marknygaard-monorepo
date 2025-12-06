import { getSupabaseServiceClient } from "@workspace/supabase/client"
import { getConversationsBySession } from "@workspace/supabase/queries"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { sessionId } = await params

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    // Get Supabase client
    const supabase = getSupabaseServiceClient()

    // Fetch conversation messages
    const messages = await getConversationsBySession(supabase, sessionId)

    return NextResponse.json({
      sessionId,
      messages,
      totalMessages: messages.length,
    })
  } catch (error) {
    console.error("Error fetching conversation:", error)
    const message = error instanceof Error ? error.message : "Failed to fetch conversation"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
