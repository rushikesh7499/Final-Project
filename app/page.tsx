"use client"

import { useState, useEffect } from "react"
import AuthSystem from "@/components/auth-system"
import HealthMonitoringDashboard from "@/components/health-monitoring-dashboard"

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("healthMonitorUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("healthMonitorUser")
      }
    }
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    localStorage.setItem("healthMonitorUser", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("healthMonitorUser")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse-health mx-auto">
            <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading Smart Health Monitor...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthSystem onAuthSuccess={handleAuthSuccess} />
  }

  return <HealthMonitoringDashboard user={user} onLogout={handleLogout} />
}
