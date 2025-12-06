/**
 * Database types for chatbot_conversations table
 */
export type ChatbotConversation = {
  id: number
  session_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
  metadata: Record<string, unknown> | null
}

/**
 * Insert type for chatbot_conversations (id and created_at are auto-generated)
 */
export type ChatbotConversationInsert = {
  session_id: string
  role: "user" | "assistant"
  content: string
  metadata?: Record<string, unknown> | null
}

/**
 * Session summary for list views
 */
export type ConversationSession = {
  session_id: string
  message_count: number
  first_message: string
  last_updated: string
}

/**
 * Supabase database schema
 */
export type Database = {
  public: {
    Tables: {
      chatbot_conversations: {
        Row: ChatbotConversation
        Insert: ChatbotConversationInsert
        Update: Partial<ChatbotConversationInsert>
      }
    }
  }
}
