const CACHE_NAME = "smart-health-monitor-v1"
const urlsToCache = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  // Add other static assets
]

// Install event - cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response
      }

      // Clone the request because it's a stream
      const fetchRequest = event.request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response because it's a stream
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Return offline page or cached data
          if (event.request.destination === "document") {
            return caches.match("/")
          }
        })
    }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "health-data-sync") {
    event.waitUntil(syncHealthData())
  }
})

async function syncHealthData() {
  // Sync offline health reports when connection is restored
  const offlineData = await getOfflineData()
  if (offlineData.length > 0) {
    try {
      await fetch("/api/sync-health-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offlineData),
      })
      await clearOfflineData()
    } catch (error) {
      console.log("[SW] Sync failed:", error)
    }
  }
}

async function getOfflineData() {
  // Get data from IndexedDB or localStorage
  return JSON.parse(localStorage.getItem("offline-health-data") || "[]")
}

async function clearOfflineData() {
  localStorage.removeItem("offline-health-data")
}
