import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

let supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl?.trim() || !supabaseAnonKey?.trim()) {
    return null
  }

  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return supabase
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl?.trim() && supabaseAnonKey?.trim())
}
