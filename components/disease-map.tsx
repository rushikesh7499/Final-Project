"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Search,
  AlertTriangle,
  Droplets,
  Users,
  Activity,
  ZoomIn,
  ZoomOut,
  Shield,
  Hospital,
  Phone,
  Navigation,
  Home,
  Truck,
  Stethoscope,
  Cross,
} from "lucide-react"

// Mock data for Northeast India locations with health incidents
const healthIncidents = [
  {
    id: 1,
    location: "Dimapur",
    state: "Nagaland",
    coordinates: { x: 45, y: 35 },
    cases: 42,
    type: "cholera",
    severity: "critical",
    population: 122000,
    waterQuality: 65,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    location: "Imphal",
    state: "Manipur",
    coordinates: { x: 55, y: 45 },
    cases: 28,
    type: "typhoid",
    severity: "warning",
    population: 268000,
    waterQuality: 78,
    lastUpdated: "4 hours ago",
  },
  {
    id: 3,
    location: "Aizawl",
    state: "Mizoram",
    coordinates: { x: 35, y: 65 },
    cases: 15,
    type: "hepatitis",
    severity: "moderate",
    population: 293000,
    waterQuality: 82,
    lastUpdated: "1 hour ago",
  },
  {
    id: 4,
    location: "Shillong",
    state: "Meghalaya",
    coordinates: { x: 25, y: 55 },
    cases: 8,
    type: "diarrhea",
    severity: "low",
    population: 143000,
    waterQuality: 88,
    lastUpdated: "6 hours ago",
  },
  {
    id: 5,
    location: "Itanagar",
    state: "Arunachal Pradesh",
    coordinates: { x: 65, y: 25 },
    cases: 35,
    type: "cholera",
    severity: "critical",
    population: 59000,
    waterQuality: 58,
    lastUpdated: "3 hours ago",
  },
  {
    id: 6,
    location: "Agartala",
    state: "Tripura",
    coordinates: { x: 40, y: 75 },
    cases: 22,
    type: "typhoid",
    severity: "warning",
    population: 400000,
    waterQuality: 72,
    lastUpdated: "5 hours ago",
  },
  {
    id: 7,
    location: "Kohima",
    state: "Nagaland",
    coordinates: { x: 50, y: 30 },
    cases: 12,
    type: "diarrhea",
    severity: "moderate",
    population: 99000,
    waterQuality: 85,
    lastUpdated: "8 hours ago",
  },
  {
    id: 8,
    location: "Gangtok",
    state: "Sikkim",
    coordinates: { x: 15, y: 40 },
    cases: 6,
    type: "hepatitis",
    severity: "low",
    population: 100000,
    waterQuality: 92,
    lastUpdated: "12 hours ago",
  },
]

const safetyPoints = [
  {
    id: 1,
    name: "Regional Institute of Medical Sciences",
    type: "hospital",
    location: "Imphal",
    state: "Manipur",
    coordinates: { x: 55, y: 45 },
    capacity: 500,
    specialties: ["Emergency Care", "Infectious Diseases", "ICU"],
    contact: "+91-385-2414238",
    status: "operational",
    distance: "0.5 km from city center",
  },
  {
    id: 2,
    name: "Dimapur District Hospital",
    type: "hospital",
    location: "Dimapur",
    state: "Nagaland",
    coordinates: { x: 45, y: 35 },
    capacity: 200,
    specialties: ["General Medicine", "Pediatrics", "Emergency"],
    contact: "+91-3862-232017",
    status: "operational",
    distance: "1.2 km from city center",
  },
  {
    id: 3,
    name: "Civil Hospital Aizawl",
    type: "hospital",
    location: "Aizawl",
    state: "Mizoram",
    coordinates: { x: 35, y: 65 },
    capacity: 300,
    specialties: ["Emergency Care", "Surgery", "Maternity"],
    contact: "+91-389-2322988",
    status: "operational",
    distance: "0.8 km from city center",
  },
  {
    id: 4,
    name: "Emergency Response Center",
    type: "emergency",
    location: "Shillong",
    state: "Meghalaya",
    coordinates: { x: 25, y: 55 },
    capacity: 50,
    specialties: ["Disaster Response", "Medical Emergency", "Ambulance"],
    contact: "108",
    status: "operational",
    distance: "Central location",
  },
  {
    id: 5,
    name: "Safe Water Distribution Point",
    type: "water",
    location: "Kohima",
    state: "Nagaland",
    coordinates: { x: 50, y: 30 },
    capacity: 1000,
    specialties: ["Clean Water Supply", "Water Testing", "Purification"],
    contact: "+91-370-2290258",
    status: "operational",
    distance: "Multiple locations",
  },
  {
    id: 6,
    name: "Community Health Center",
    type: "clinic",
    location: "Itanagar",
    state: "Arunachal Pradesh",
    coordinates: { x: 65, y: 25 },
    capacity: 100,
    specialties: ["Primary Care", "Vaccination", "Health Education"],
    contact: "+91-360-2212624",
    status: "operational",
    distance: "0.3 km from city center",
  },
  {
    id: 7,
    name: "Mobile Medical Unit Base",
    type: "mobile",
    location: "Agartala",
    state: "Tripura",
    coordinates: { x: 40, y: 75 },
    capacity: 25,
    specialties: ["Mobile Healthcare", "Remote Area Coverage", "Emergency Response"],
    contact: "+91-381-2325693",
    status: "operational",
    distance: "Covers 50km radius",
  },
  {
    id: 8,
    name: "STNM Hospital",
    type: "hospital",
    location: "Gangtok",
    state: "Sikkim",
    coordinates: { x: 15, y: 40 },
    capacity: 400,
    specialties: ["Multi-specialty", "Emergency", "Critical Care"],
    contact: "+91-3592-202016",
    status: "operational",
    distance: "0.6 km from city center",
  },
]

const safeZones = [
  {
    id: 1,
    name: "Imphal Safe Zone Alpha",
    location: "Imphal",
    state: "Manipur",
    coordinates: { x: 53, y: 43 },
    radius: 15,
    population: 50000,
    facilities: ["Clean Water", "Medical Aid", "Food Distribution"],
    status: "active",
  },
  {
    id: 2,
    name: "Dimapur Safe Zone Beta",
    location: "Dimapur",
    state: "Nagaland",
    coordinates: { x: 43, y: 33 },
    radius: 12,
    population: 35000,
    facilities: ["Emergency Shelter", "Medical Care", "Communication"],
    status: "active",
  },
  {
    id: 3,
    name: "Shillong Safe Zone Gamma",
    location: "Shillong",
    state: "Meghalaya",
    coordinates: { x: 23, y: 53 },
    radius: 10,
    population: 25000,
    facilities: ["Water Purification", "Health Screening", "Isolation Units"],
    status: "active",
  },
]

const diseaseColors = {
  cholera: "#ef4444",
  typhoid: "#f97316",
  hepatitis: "#eab308",
  diarrhea: "#8b5cf6",
}

const severityColors = {
  critical: "#ef4444",
  warning: "#f97316",
  moderate: "#eab308",
  low: "#22c55e",
}

const safetyPointIcons = {
  hospital: Hospital,
  emergency: Cross,
  water: Droplets,
  clinic: Stethoscope,
  mobile: Truck,
  shelter: Home,
}

const safetyPointColors = {
  hospital: "#22c55e",
  emergency: "#ef4444",
  water: "#3b82f6",
  clinic: "#8b5cf6",
  mobile: "#f97316",
  shelter: "#6b7280",
}

export default function DiseaseMap() {
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const [selectedSafetyPoint, setSelectedSafetyPoint] = useState<any>(null)
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [showSafetyPoints, setShowSafetyPoints] = useState(true)
  const [showSafeZones, setShowSafeZones] = useState(true)
  const [selectedSafetyType, setSelectedSafetyType] = useState("all")

  // Animation for pulsing indicators
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredIncidents = healthIncidents.filter((incident) => {
    const matchesType = filterType === "all" || incident.type === filterType
    const matchesSeverity = filterSeverity === "all" || incident.severity === filterSeverity
    const matchesSearch =
      searchTerm === "" ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.state.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSeverity && matchesSearch
  })

  const filteredSafetyPoints = safetyPoints.filter((point) => {
    const matchesType = selectedSafetyType === "all" || point.type === selectedSafetyType
    const matchesSearch =
      searchTerm === "" ||
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const getIndicatorSize = (cases: number) => {
    if (cases > 30) return 24
    if (cases > 15) return 18
    if (cases > 5) return 14
    return 10
  }

  const getIndicatorOpacity = (severity: string) => {
    switch (severity) {
      case "critical":
        return animationPhase === 0 ? 1 : animationPhase === 1 ? 0.7 : 0.9
      case "warning":
        return animationPhase === 0 ? 0.9 : animationPhase === 1 ? 0.6 : 0.8
      default:
        return 0.8
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="disease-tracking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-effect">
          <TabsTrigger value="disease-tracking">Disease Tracking</TabsTrigger>
          <TabsTrigger value="safety-points">Safety Points</TabsTrigger>
          <TabsTrigger value="emergency-response">Emergency Response</TabsTrigger>
        </TabsList>

        <TabsContent value="disease-tracking" className="space-y-6">
          {/* Map Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Disease Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Diseases</SelectItem>
                  <SelectItem value="cholera">Cholera</SelectItem>
                  <SelectItem value="typhoid">Typhoid</SelectItem>
                  <SelectItem value="hepatitis">Hepatitis A</SelectItem>
                  <SelectItem value="diarrhea">Diarrhea</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={showSafetyPoints ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSafetyPoints(!showSafetyPoints)}
              >
                <Shield className="w-4 h-4 mr-1" />
                Safety Points
              </Button>
              <Button
                variant={showSafeZones ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSafeZones(!showSafeZones)}
              >
                <Home className="w-4 h-4 mr-1" />
                Safe Zones
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.2, 2))}
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.2, 0.8))}
                disabled={zoomLevel <= 0.8}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl overflow-hidden border">
            <div
              className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
            >
              {/* Northeast India Map Outline */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M10,30 L20,25 L35,20 L50,15 L70,20 L80,25 L85,35 L80,45 L75,55 L70,65 L60,75 L45,80 L30,75 L20,70 L15,60 L10,50 Z"
                  fill="currentColor"
                  className="text-muted-foreground/30"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>

              {/* State Labels */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[60%] text-xs text-muted-foreground font-medium">
                  Arunachal Pradesh
                </div>
                <div className="absolute top-[35%] left-[45%] text-xs text-muted-foreground font-medium">Nagaland</div>
                <div className="absolute top-[45%] left-[55%] text-xs text-muted-foreground font-medium">Manipur</div>
                <div className="absolute top-[55%] left-[25%] text-xs text-muted-foreground font-medium">Meghalaya</div>
                <div className="absolute top-[65%] left-[35%] text-xs text-muted-foreground font-medium">Mizoram</div>
                <div className="absolute top-[75%] left-[40%] text-xs text-muted-foreground font-medium">Tripura</div>
                <div className="absolute top-[40%] left-[15%] text-xs text-muted-foreground font-medium">Sikkim</div>
              </div>

              {/* Safe Zones */}
              {showSafeZones &&
                safeZones.map((zone) => (
                  <div
                    key={`zone-${zone.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${zone.coordinates.x}%`,
                      top: `${zone.coordinates.y}%`,
                    }}
                  >
                    <div
                      className="rounded-full border-2 border-success/30 bg-success/10 animate-pulse"
                      style={{
                        width: zone.radius * 4,
                        height: zone.radius * 4,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-success" />
                    </div>
                  </div>
                ))}

              {/* Safety Points */}
              {showSafetyPoints &&
                filteredSafetyPoints.map((point) => {
                  const Icon = safetyPointIcons[point.type as keyof typeof safetyPointIcons]
                  return (
                    <div
                      key={`safety-${point.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        left: `${point.coordinates.x}%`,
                        top: `${point.coordinates.y}%`,
                      }}
                      onClick={() => setSelectedSafetyPoint(point)}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{
                          backgroundColor: safetyPointColors[point.type as keyof typeof safetyPointColors],
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Hover Label */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-card border rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                          <div className="font-medium">{point.name}</div>
                          <div className="text-muted-foreground capitalize">{point.type}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              {/* Health Incident Indicators */}
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer animate-float-3d"
                  style={{
                    left: `${incident.coordinates.x}%`,
                    top: `${incident.coordinates.y}%`,
                  }}
                  onClick={() => setSelectedIncident(incident)}
                >
                  {/* Pulsing Ring for Critical Cases */}
                  {incident.severity === "critical" && (
                    <div
                      className="absolute inset-0 rounded-full border-2 animate-ping"
                      style={{
                        borderColor: severityColors[incident.severity],
                        width: getIndicatorSize(incident.cases) + 8,
                        height: getIndicatorSize(incident.cases) + 8,
                        left: -4,
                        top: -4,
                      }}
                    />
                  )}

                  {/* Main Indicator */}
                  <div
                    className="rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: diseaseColors[incident.type as keyof typeof diseaseColors],
                      width: getIndicatorSize(incident.cases),
                      height: getIndicatorSize(incident.cases),
                      opacity: getIndicatorOpacity(incident.severity),
                      boxShadow: `0 0 20px ${diseaseColors[incident.type as keyof typeof diseaseColors]}40`,
                    }}
                  >
                    {incident.cases}
                  </div>

                  {/* Hover Label */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-card border rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                      <div className="font-medium">{incident.location}</div>
                      <div className="text-muted-foreground">{incident.cases} cases</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3 space-y-3">
              <div className="text-sm font-medium mb-2">Legend</div>

              <div>
                <div className="text-xs font-medium mb-1">Disease Types</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(diseaseColors).map(([disease, color]) => (
                    <div key={disease} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="capitalize">{disease}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium mb-1">Safety Points</div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {Object.entries(safetyPointColors)
                    .slice(0, 3)
                    .map(([type, color]) => {
                      const Icon = safetyPointIcons[type as keyof typeof safetyPointIcons]
                      return (
                        <div key={type} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: color }}
                          >
                            <Icon className="w-2 h-2 text-white" />
                          </div>
                          <span className="capitalize">{type}</span>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>

            {/* Severity Legend */}
            <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border rounded-lg p-3 space-y-2">
              <div className="text-sm font-medium mb-2">Severity Levels</div>
              <div className="space-y-1 text-xs">
                {Object.entries(severityColors).map(([severity, color]) => (
                  <div key={severity} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="capitalize">{severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Incident Details */}
          {selectedIncident && (
            <Card className="animate-float-3d">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {selectedIncident.location}, {selectedIncident.state}
                    </h3>
                    <p className="text-sm text-muted-foreground">Last updated: {selectedIncident.lastUpdated}</p>
                  </div>
                  <Badge
                    variant={
                      selectedIncident.severity === "critical"
                        ? "destructive"
                        : selectedIncident.severity === "warning"
                          ? "secondary"
                          : "default"
                    }
                    className="animate-pulse-health"
                  >
                    {selectedIncident.severity}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Activity className="w-4 h-4" />
                      Active Cases
                    </div>
                    <div className="text-2xl font-bold text-destructive">{selectedIncident.cases}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      Population
                    </div>
                    <div className="text-2xl font-bold">{selectedIncident.population.toLocaleString()}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Droplets className="w-4 h-4" />
                      Water Quality
                    </div>
                    <div className="text-2xl font-bold text-accent">{selectedIncident.waterQuality}%</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="w-4 h-4" />
                      Disease Type
                    </div>
                    <div
                      className="text-lg font-semibold capitalize"
                      style={{ color: diseaseColors[selectedIncident.type as keyof typeof diseaseColors] }}
                    >
                      {selectedIncident.type}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="animate-pulse-health">
                    Deploy Response Team
                  </Button>
                  <Button variant="outline" size="sm">
                    View Detailed Report
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedIncident(null)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">
                  {filteredIncidents.reduce((sum, incident) => sum + incident.cases, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Active Cases</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">
                  {filteredIncidents.filter((i) => i.severity === "critical").length}
                </div>
                <div className="text-sm text-muted-foreground">Critical Locations</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">
                  {Math.round(
                    filteredIncidents.reduce((sum, incident) => sum + incident.waterQuality, 0) /
                      filteredIncidents.length,
                  )}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Avg Water Quality</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{filteredIncidents.length}</div>
                <div className="text-sm text-muted-foreground">Monitored Areas</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety-points" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search safety points..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={selectedSafetyType} onValueChange={setSelectedSafetyType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Facility Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="hospital">Hospitals</SelectItem>
                  <SelectItem value="emergency">Emergency Centers</SelectItem>
                  <SelectItem value="water">Water Points</SelectItem>
                  <SelectItem value="clinic">Clinics</SelectItem>
                  <SelectItem value="mobile">Mobile Units</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSafetyPoints.map((point) => {
              const Icon = safetyPointIcons[point.type as keyof typeof safetyPointIcons]
              return (
                <Card key={point.id} className="glass-effect hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                        style={{
                          backgroundColor: safetyPointColors[point.type as keyof typeof safetyPointColors],
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-balance">{point.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {point.location}, {point.state}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {point.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="font-medium">{point.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="default" className="text-xs">
                          {point.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Specialties:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {point.specialties.slice(0, 2).map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline">
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="emergency-response" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Cross className="w-5 h-5 text-destructive" />
                  Emergency Contacts
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Medical Emergency", number: "108", available: "24/7" },
                    { name: "Disaster Response", number: "1070", available: "24/7" },
                    { name: "Health Helpline", number: "104", available: "24/7" },
                    { name: "Water Emergency", number: "1916", available: "24/7" },
                    { name: "Police Emergency", number: "100", available: "24/7" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{contact.name}</h4>
                        <p className="text-xs text-muted-foreground">{contact.available}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-lg text-primary">{contact.number}</p>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Safe Zones Status
                </h3>
                <div className="space-y-3">
                  {safeZones.map((zone) => (
                    <div key={zone.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{zone.name}</h4>
                        <Badge variant="default" className="text-xs">
                          {zone.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {zone.location}, {zone.state}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span>Population: {zone.population.toLocaleString()}</span>
                        <span>Radius: {zone.radius}km</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {zone.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect hover-lift">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Emergency Response Protocol
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  {
                    step: 1,
                    title: "Immediate Response",
                    description: "Call emergency services and secure the area",
                    icon: Phone,
                  },
                  {
                    step: 2,
                    title: "Medical Assessment",
                    description: "Evaluate casualties and provide first aid",
                    icon: Stethoscope,
                  },
                  {
                    step: 3,
                    title: "Evacuation",
                    description: "Move affected population to safe zones",
                    icon: Navigation,
                  },
                  {
                    step: 4,
                    title: "Resource Deployment",
                    description: "Deploy medical teams and supplies",
                    icon: Truck,
                  },
                ].map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.step} className="text-center p-4 border rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium text-sm mb-2">
                        Step {step.step}: {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground text-pretty">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedSafetyPoint && (
        <Card className="glass-effect border-success/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = safetyPointIcons[selectedSafetyPoint.type as keyof typeof safetyPointIcons]
                  return (
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{
                        backgroundColor: safetyPointColors[selectedSafetyPoint.type as keyof typeof safetyPointColors],
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  )
                })()}
                <div>
                  <h3 className="text-lg font-semibold">{selectedSafetyPoint.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSafetyPoint.location}, {selectedSafetyPoint.state}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedSafetyPoint(null)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Facility Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="outline">{selectedSafetyPoint.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span>{selectedSafetyPoint.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="default">{selectedSafetyPoint.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span>{selectedSafetyPoint.distance}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{selectedSafetyPoint.contact}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Specialties & Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSafetyPoint.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
