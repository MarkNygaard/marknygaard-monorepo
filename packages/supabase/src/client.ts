import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

/**
 * Get Supabase client for browser/client-side usage
 * Uses the anon key which is safe to expose
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!(supabaseUrl && supabaseAnonKey)) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    )
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

/**
 * Get Supabase client for server-side usage with elevated permissions
 * Uses the service role key which should NEVER be exposed to the client
 * Only use this in API routes or server components
 */
export function getSupabaseServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!(supabaseUrl && supabaseServiceKey)) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    )
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
