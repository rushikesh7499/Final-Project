import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req: NextRequest) {
  // Clone the request headers to pass through
  const res = NextResponse.next({ request: { headers: req.headers } })

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Soft-fail: allow app to run but warn in logs
    console.warn("[v0] Missing Supabase env in middleware. Ensure SUPABASE_URL and SUPABASE_ANON_KEY are configured.")
    return res
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name: string) => req.cookies.get(name)?.value,
      set: (name: string, value: string, options: any) => {
        res.cookies.set(name, value, options)
      },
      remove: (name: string, options: any) => {
        res.cookies.set(name, "", { ...options, maxAge: 0 })
      },
    },
  })

  // This triggers a session refresh if needed and updates cookies on the response.
  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|icon-192.png|icon-512.png).*)"],
}
