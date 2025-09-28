import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export function getSupabaseServerClient() {
  const cookieStore = cookies()

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[v0] Missing Supabase env. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are set in Project Settings.")
    throw new Error("Supabase is not configured on the server. Please set the required environment variables.")
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: Parameters<typeof cookieStore.set>[0]) {
        // cookieStore.set supports object param in App Router
        // @ts-expect-error - next/headers cookie typings accept an object param
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: Parameters<typeof cookieStore.set>[0]) {
        // @ts-expect-error - next/headers cookie typings accept an object param
        cookieStore.set({ name, value: "", ...options, maxAge: 0 })
      },
    },
  })
}
