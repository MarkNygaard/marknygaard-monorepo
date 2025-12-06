import type { SupabaseClient } from "@supabase/supabase-js"
import type { ChatbotConversation, ConversationSession, Database } from "./types"

/**
 * Get all messages for a specific session
 */
export async function getConversationsBySession(
  client: SupabaseClient<Database>,
  sessionId: string
): Promise<ChatbotConversation[]> {
  const { data, error } = await client
    .from("chatbot_conversations")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(`Failed to fetch conversation: ${error.message}`)
  }

  return data || []
}

/**
 * List all unique sessions with pagination and metadata
 */
export async function listUniqueSessions(
  client: SupabaseClient<Database>,
  options: {
    page?: number
    limit?: number
    sortOrder?: "newest" | "oldest"
  } = {}
): Promise<{ sessions: ConversationSession[]; total: number }> {
  const { page = 1, limit = 20, sortOrder = "newest" } = options
  const offset = (page - 1) * limit

  // Get unique sessions with aggregated data
  const { data, error, count } = await client
    .from("chatbot_conversations")
    .select("session_id, content, created_at", { count: "exact" })
    .order("created_at", { ascending: sortOrder === "oldest" })
    .range(offset, offset + limit - 1)

  if (error) {
    throw new Error(`Failed to fetch sessions: ${error.message}`)
  }

  // Group by session_id and aggregate
  const sessionMap = new Map<string, ConversationSession>()
  type SessionRow = { session_id: string; content: string; created_at: string }

  for (const row of (data || []) as SessionRow[]) {
    const existing = sessionMap.get(row.session_id)
    if (existing) {
      existing.message_count += 1
      if (new Date(row.created_at) > new Date(existing.last_updated)) {
        existing.last_updated = row.created_at
      }
    } else {
      sessionMap.set(row.session_id, {
        session_id: row.session_id,
        message_count: 1,
        first_message: row.content,
        last_updated: row.created_at,
      })
    }
  }

  return {
    sessions: Array.from(sessionMap.values()),
    total: count || 0,
  }
}

/**
 * Search conversations by content
 */
export async function searchConversations(
  client: SupabaseClient<Database>,
  searchQuery: string
): Promise<ConversationSession[]> {
  const { data, error } = await client
    .from("chatbot_conversations")
    .select("session_id, content, created_at")
    .ilike("content", `%${searchQuery}%`)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to search conversations: ${error.message}`)
  }

  // Group by session_id
  const sessionMap = new Map<string, ConversationSession>()
  type SessionRow = { session_id: string; content: string; created_at: string }

  for (const row of (data || []) as SessionRow[]) {
    const existing = sessionMap.get(row.session_id)
    if (existing) {
      existing.message_count += 1
      if (new Date(row.created_at) > new Date(existing.last_updated)) {
        existing.last_updated = row.created_at
      }
    } else {
      sessionMap.set(row.session_id, {
        session_id: row.session_id,
        message_count: 1,
        first_message: row.content,
        last_updated: row.created_at,
      })
    }
  }

  return Array.from(sessionMap.values())
}
