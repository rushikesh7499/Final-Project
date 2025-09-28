"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import { Suspense } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Suspense fallback={null}>
        {children}
        <Toaster />
      </Suspense>
      <Analytics />
    </ThemeProvider>
  )
}
