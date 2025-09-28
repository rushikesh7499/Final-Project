"use client"

import { createBrowserClient } from "@supabase/ssr"

let supabaseBrowser: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (supabaseBrowser) return supabaseBrowser

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Use v0 debug-friendly log; surfaces clean error in UI code
    console.warn(
      "[v0] Missing Supabase env. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Project Settings.",
    )
    throw new Error("Supabase is not configured. Please set the required environment variables.")
  }

  supabaseBrowser = createBrowserClient(supabaseUrl, supabaseAnonKey)
  return supabaseBrowser
}
