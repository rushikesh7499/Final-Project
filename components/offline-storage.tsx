"use client"

import { useState, useEffect } from "react"

interface OfflineData {
  id: string
  type: "disease-report" | "water-quality" | "appointment"
  data: any
  timestamp: number
  synced: boolean
}

export function useOfflineStorage() {
  const [offlineData, setOfflineData] = useState<OfflineData[]>([])
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Load offline data from localStorage
    const stored = localStorage.getItem("offline-health-data")
    if (stored) {
      setOfflineData(JSON.parse(stored))
    }

    // Monitor online status
    const handleOnline = () => {
      setIsOnline(true)
      syncOfflineData()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const saveOfflineData = (type: OfflineData["type"], data: any) => {
    const newEntry: OfflineData = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
      synced: false,
    }

    const updated = [...offlineData, newEntry]
    setOfflineData(updated)
    localStorage.setItem("offline-health-data", JSON.stringify(updated))

    // If online, try to sync immediately
    if (isOnline) {
      syncOfflineData()
    }
  }

  const syncOfflineData = async () => {
    const unsyncedData = offlineData.filter((item) => !item.synced)

    for (const item of unsyncedData) {
      try {
        await fetch("/api/sync-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })

        // Mark as synced
        item.synced = true
      } catch (error) {
        console.log("[v0] Sync failed for item:", item.id, error)
      }
    }

    // Update storage
    const syncedData = offlineData.map((item) => unsyncedData.find((synced) => synced.id === item.id) || item)
    setOfflineData(syncedData)
    localStorage.setItem("offline-health-data", JSON.stringify(syncedData))
  }

  return {
    saveOfflineData,
    offlineData: offlineData.filter((item) => !item.synced),
    isOnline,
    syncOfflineData,
  }
}
