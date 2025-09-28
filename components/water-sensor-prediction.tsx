"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Thermometer,
  Zap,
  MapPin,
  Clock,
  Wifi,
  WifiOff,
  RefreshCw,
  Settings,
  Eye,
  BarChart3,
  Bell,
} from "lucide-react"

export default function WaterSensorPrediction() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Mock sensor data
  const sensorLocations = [
    { id: "all", name: "All Locations", sensors: 45 },
    { id: "dimapur", name: "Dimapur District", sensors: 12 },
    { id: "imphal", name: "Imphal East", sensors: 8 },
    { id: "aizawl", name: "Aizawl", sensors: 10 },
    { id: "kohima", name: "Kohima", sensors: 7 },
    { id: "shillong", name: "Shillong", sensors: 8 },
  ]

  const waterQualityData = [
    { time: "00:00", ph: 7.2, turbidity: 2.1, chlorine: 0.8, temperature: 24.5, prediction: 85 },
    { time: "04:00", ph: 7.1, turbidity: 2.3, chlorine: 0.7, temperature: 23.8, prediction: 82 },
    { time: "08:00", ph: 6.9, turbidity: 3.2, chlorine: 0.6, temperature: 25.2, prediction: 78 },
    { time: "12:00", ph: 6.8, turbidity: 4.1, chlorine: 0.5, temperature: 27.1, prediction: 72 },
    { time: "16:00", ph: 6.7, turbidity: 4.8, chlorine: 0.4, temperature: 28.3, prediction: 68 },
    { time: "20:00", ph: 6.9, turbidity: 3.9, chlorine: 0.6, temperature: 26.7, prediction: 75 },
  ]

  const predictionData = [
    { location: "Dimapur", current: 72, predicted: 68, risk: "medium", trend: "down" },
    { location: "Imphal East", current: 85, predicted: 82, risk: "low", trend: "down" },
    { location: "Aizawl", current: 91, predicted: 89, risk: "low", trend: "stable" },
    { location: "Kohima", current: 78, predicted: 74, risk: "medium", trend: "down" },
    { location: "Shillong", current: 88, predicted: 90, risk: "low", trend: "up" },
  ]

  const sensorStatus = [
    { id: "WS001", location: "Dimapur Central", status: "online", battery: 87, lastReading: "2 min ago" },
    { id: "WS002", location: "Imphal Market", status: "online", battery: 92, lastReading: "1 min ago" },
    { id: "WS003", location: "Aizawl Hospital", status: "offline", battery: 23, lastReading: "2 hours ago" },
    { id: "WS004", location: "Kohima School", status: "online", battery: 78, lastReading: "3 min ago" },
    { id: "WS005", location: "Shillong Clinic", status: "warning", battery: 45, lastReading: "15 min ago" },
  ]

  const contaminationRisks = [
    { name: "E. coli", value: 15, color: "#ef4444" },
    { name: "Cholera", value: 8, color: "#f97316" },
    { name: "Typhoid", value: 12, color: "#eab308" },
    { name: "Hepatitis A", value: 6, color: "#22c55e" },
    { name: "Other", value: 4, color: "#6366f1" },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsRefreshing(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-warning"
      case "low":
        return "text-success"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Droplets className="w-6 h-6 text-accent animate-pulse-health" />
            Water Sensor Prediction System
          </h2>
          <p className="text-muted-foreground">AI-powered water quality monitoring and contamination prediction</p>
        </div>

        <div className="flex gap-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {sensorLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location.name} ({location.sensors} sensors)
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hover-lift bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sensors</p>
                <p className="text-2xl font-bold">42/45</p>
                <p className="text-xs text-success">93% operational</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Water Quality</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-warning flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -5% from yesterday
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Droplets className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk Areas</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-destructive">Immediate attention needed</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive animate-pulse-health" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prediction Accuracy</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +2% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-effect">
          <TabsTrigger value="realtime">Real-time Data</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="sensors">Sensor Status</TabsTrigger>
          <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
        </TabsList>

        {/* Real-time Data Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Water Quality Trends */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Water Quality Trends
                </CardTitle>
                <CardDescription>Real-time sensor readings over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300} debounce={120}>
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ph" stroke="#8884d8" name="pH Level" />
                    <Line type="monotone" dataKey="turbidity" stroke="#82ca9d" name="Turbidity (NTU)" />
                    <Line type="monotone" dataKey="chlorine" stroke="#ffc658" name="Chlorine (mg/L)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Temperature & Quality Score */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-warning" />
                  Temperature & Quality Score
                </CardTitle>
                <CardDescription>Combined temperature and quality prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300} debounce={120}>
                  <AreaChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stackId="1"
                      stroke="#ff7300"
                      fill="#ff7300"
                      name="Temperature (°C)"
                    />
                    <Area
                      type="monotone"
                      dataKey="prediction"
                      stackId="2"
                      stroke="#387908"
                      fill="#387908"
                      name="Quality Score (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Current Readings */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-accent" />
                Current Sensor Readings
              </CardTitle>
              <CardDescription>
                Last updated: {lastUpdate.toLocaleTimeString()} • Auto-refresh every 5 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">pH Level</span>
                    <Badge variant="outline">6.8</Badge>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-muted-foreground">Slightly acidic (Normal: 6.5-8.5)</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Turbidity</span>
                    <Badge variant="secondary">4.1 NTU</Badge>
                  </div>
                  <Progress value={82} className="h-2" />
                  <p className="text-xs text-muted-foreground">Elevated (Normal: &lt;1 NTU)</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Chlorine</span>
                    <Badge variant="default">0.5 mg/L</Badge>
                  </div>
                  <Progress value={50} className="h-2" />
                  <p className="text-xs text-muted-foreground">Low (Normal: 0.2-1.0 mg/L)</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Temperature</span>
                    <Badge variant="outline">28.3°C</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground">Warm (Normal: 15-25°C)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Predictions */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  24-Hour Predictions by Location
                </CardTitle>
                <CardDescription>AI-powered water quality forecasts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictionData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{item.location}</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {item.current}% → Predicted: {item.predicted}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRiskBadgeVariant(item.risk)} className="capitalize">
                        {item.risk} risk
                      </Badge>
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : item.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      ) : (
                        <div className="w-4 h-4 bg-muted rounded-full" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contamination Risk Breakdown */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Contamination Risk Analysis
                </CardTitle>
                <CardDescription>Predicted disease outbreak probabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300} debounce={120}>
                  <PieChart>
                    <Pie
                      data={contaminationRisks}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contaminationRisks.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Prediction Alerts */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                AI Prediction Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-warning/50 bg-warning/10">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Medium Risk Prediction</AlertTitle>
                <AlertDescription>
                  Water quality in Dimapur is predicted to decline by 6% in the next 24 hours due to increased turbidity
                  and reduced chlorine levels. Recommend immediate water treatment intervention.
                </AlertDescription>
              </Alert>

              <Alert className="border-success/50 bg-success/10">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Positive Trend</AlertTitle>
                <AlertDescription>
                  Shillong water quality is expected to improve by 2% due to recent filtration system upgrades and
                  favorable weather conditions.
                </AlertDescription>
              </Alert>

              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertTitle className="text-destructive">High Risk Alert</AlertTitle>
                <AlertDescription>
                  Critical contamination risk detected in Kohima. pH levels dropping rapidly. Immediate action required
                  to prevent potential disease outbreak.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sensor Status Tab */}
        <TabsContent value="sensors" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Sensor Network Status
              </CardTitle>
              <CardDescription>Real-time monitoring of all water quality sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sensorStatus.map((sensor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {sensor.status === "online" ? (
                          <Wifi className="w-5 h-5 text-success" />
                        ) : sensor.status === "offline" ? (
                          <WifiOff className="w-5 h-5 text-destructive" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-warning" />
                        )}
                        <div>
                          <p className="font-medium">{sensor.id}</p>
                          <p className="text-sm text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Battery: {sensor.battery}%</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sensor.lastReading}
                        </p>
                      </div>

                      <div className="w-16">
                        <Progress value={sensor.battery} className="h-2" />
                      </div>

                      <Badge
                        variant={
                          sensor.status === "online"
                            ? "default"
                            : sensor.status === "offline"
                              ? "destructive"
                              : "secondary"
                        }
                        className="capitalize"
                      >
                        {sensor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risks" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-destructive" />
                Risk Factor Analysis
              </CardTitle>
              <CardDescription>Comprehensive water contamination risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400} debounce={120}>
                <BarChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#8884d8" name="Current Quality %" />
                  <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Quality %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-warning animate-pulse-health" />
                Smart Alert System
              </CardTitle>
              <CardDescription>Automated alerts based on sensor data and AI predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-destructive/10 border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <span className="font-medium text-destructive">Critical Alerts</span>
                  </div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Require immediate action</p>
                </div>

                <div className="p-4 rounded-lg border bg-warning/10 border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <span className="font-medium text-warning">Warning Alerts</span>
                  </div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Monitor closely</p>
                </div>

                <div className="p-4 rounded-lg border bg-success/10 border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Normal Status</span>
                  </div>
                  <p className="text-2xl font-bold">38</p>
                  <p className="text-sm text-muted-foreground">Operating normally</p>
                </div>
              </div>

              <div className="space-y-3">
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertTitle className="text-destructive">CRITICAL: Sensor WS003 Offline</AlertTitle>
                  <AlertDescription>
                    Water sensor at Aizawl Hospital has been offline for 2 hours. Battery critically low (23%).
                    Immediate maintenance required.
                  </AlertDescription>
                </Alert>

                <Alert className="border-warning/50 bg-warning/10">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <AlertTitle className="text-warning">WARNING: High Turbidity Detected</AlertTitle>
                  <AlertDescription>
                    Turbidity levels in Dimapur Central have exceeded safe limits (4.1 NTU). Water treatment
                    recommended.
                  </AlertDescription>
                </Alert>

                <Alert className="border-accent/50 bg-accent/10">
                  <Activity className="h-4 w-4 text-accent" />
                  <AlertTitle className="text-accent">INFO: Maintenance Scheduled</AlertTitle>
                  <AlertDescription>
                    Routine maintenance for sensors WS001 and WS004 scheduled for tomorrow 10:00 AM. Expected downtime:
                    2 hours.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
