"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Activity,
  AlertTriangle,
  Droplets,
  MapPin,
  Users,
  TrendingUp,
  Bell,
  Shield,
  Heart,
  Zap,
  LogOut,
  User,
} from "lucide-react"
import HealthMetricsChart from "@/components/health-metrics-chart"
import DiseaseMap from "@/components/disease-map"
import AlertSystem from "@/components/alert-system"
import CommunityReporting from "@/components/community-reporting"
import AdvancedAnalytics from "@/components/advanced-analytics"
import Interactive3DElements from "@/components/interactive-3d-elements"
import DiseasePredictionAI from "@/components/disease-prediction-ai"
import EducationalResources from "@/components/educational-resources"
import GovernmentSchemes from "@/components/government-schemes"
import WaterSensorPrediction from "@/components/water-sensor-prediction"
import DiseaseEntryForms from "@/components/disease-entry-forms"
import VoiceAIAssistant from "@/components/voice-ai-assistant"
import VideoCallIntegration from "@/components/video-call-integration"
import DoctorAppointmentSystem from "@/components/doctor-appointment-system"

interface HealthMonitoringDashboardProps {
  user: any
  onLogout: () => void
}

export default function HealthMonitoringDashboard({ user, onLogout }: HealthMonitoringDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [systemStatus, setSystemStatus] = useState("operational")
  const [showInteractive3D, setShowInteractive3D] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("[v0] SW registered:", registration))
        .catch((error) => console.log("[v0] SW registration failed:", error))
    }

    return () => {
      clearInterval(timer)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const healthMetrics = [
    {
      title: "Active Cases",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: Activity,
      color: "text-destructive",
    },
    {
      title: "Water Quality",
      value: "78%",
      change: "-5%",
      trend: "down",
      icon: Droplets,
      color: "text-accent",
    },
    {
      title: "Communities Monitored",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-success",
    },
    {
      title: "Response Time",
      value: "2.4h",
      change: "-15%",
      trend: "down",
      icon: Zap,
      color: "text-warning",
    },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "critical",
      message: "Cholera outbreak detected in Dimapur district",
      location: "Dimapur, Nagaland",
      time: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      type: "warning",
      message: "Water contamination levels rising in Imphal East",
      location: "Imphal East, Manipur",
      time: "4 hours ago",
      status: "investigating",
    },
    {
      id: 3,
      type: "info",
      message: "New health worker registered in Aizawl",
      location: "Aizawl, Mizoram",
      time: "6 hours ago",
      status: "resolved",
    },
  ]

  return (
    <div className="min-h-screen bg-background particle-system">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center animate-pulse-health animate-glow-pulse">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-balance">Smart Health Monitor</h1>
                  <p className="text-sm text-muted-foreground">Northeast India Disease Surveillance</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{currentTime.toLocaleTimeString()}</p>
                <p className="text-xs text-muted-foreground">{currentTime.toLocaleDateString()}</p>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border">
                <User className="w-4 h-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.type.replace("_", " ")}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent hover-lift"
                onClick={() => setShowInteractive3D(!showInteractive3D)}
              >
                <Bell className="w-4 h-4" />
                {activeAlerts > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs animate-pulse-health">
                    {activeAlerts}
                  </Badge>
                )}
              </Button>

              <Button variant="outline" size="sm" onClick={onLogout} className="hover-lift bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>

              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${systemStatus === "operational" ? "bg-success animate-pulse-health" : "bg-destructive"}`}
                />
                <span className="text-sm font-medium capitalize">{systemStatus}</span>
              </div>

              {/* Offline Status Indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${isOnline ? "bg-success animate-pulse-health" : "bg-destructive"}`}
                />
                <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive 3D Elements Overlay */}
      {showInteractive3D && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="absolute top-4 right-4 z-50">
            <Button variant="outline" onClick={() => setShowInteractive3D(false)}>
              Close 3D View
            </Button>
          </div>
          <Interactive3DElements />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Critical Alerts Banner */}
        {activeAlerts > 0 && (
          <Alert className="mb-8 border-destructive/50 bg-destructive/10 animate-pulse-health hover-lift">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Critical Health Alert</AlertTitle>
            <AlertDescription>
              {activeAlerts} active health alerts require immediate attention.
              <Button variant="link" className="p-0 h-auto ml-2 text-destructive">
                View Details →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden animate-float-3d perspective-1000 hover-lift glass-effect"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color} animate-glow-pulse`} />
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp
                      className={`h-3 w-3 ${metric.trend === "up" ? "text-success" : "text-destructive rotate-180"}`}
                    />
                    <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>{metric.change}</span>
                    <span className="text-muted-foreground">from last week</span>
                  </div>
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-data-flow" style={{ width: "60%" }} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex h-auto p-1 bg-muted rounded-lg min-w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-13 gap-1 w-full">
                <TabsTrigger value="overview" className="text-xs px-2 py-2 hover-lift">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="water" className="text-xs px-2 py-2 hover-lift">
                  Water Sensors
                </TabsTrigger>
                <TabsTrigger value="report" className="text-xs px-2 py-2 hover-lift">
                  Report Disease
                </TabsTrigger>
                <TabsTrigger value="ai-assistant" className="text-xs px-2 py-2 hover-lift">
                  AI Assistant
                </TabsTrigger>
                <TabsTrigger value="video-call" className="text-xs px-2 py-2 hover-lift">
                  Video Call
                </TabsTrigger>
                <TabsTrigger value="appointments" className="text-xs px-2 py-2 hover-lift">
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="prediction" className="text-xs px-2 py-2 hover-lift">
                  AI Prediction
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs px-2 py-2 hover-lift">
                  Education
                </TabsTrigger>
                <TabsTrigger value="schemes" className="text-xs px-2 py-2 hover-lift">
                  Gov Schemes
                </TabsTrigger>
                <TabsTrigger value="map" className="text-xs px-2 py-2 hover-lift">
                  Disease Map
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs px-2 py-2 hover-lift">
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs px-2 py-2 hover-lift">
                  Alerts
                </TabsTrigger>
                <TabsTrigger value="community" className="text-xs px-2 py-2 hover-lift">
                  Community
                </TabsTrigger>
              </div>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Health Trends Chart */}
              <Card className="lg:col-span-2 glass-effect hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary animate-pulse-health" />
                    Disease Trends - Last 30 Days
                  </CardTitle>
                  <CardDescription>
                    Real-time monitoring of water-borne disease patterns across Northeast India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HealthMetricsChart />
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card className="glass-effect hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-warning animate-pulse-health" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover-lift">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === "critical"
                            ? "bg-destructive animate-pulse-health"
                            : alert.type === "warning"
                              ? "bg-warning"
                              : "bg-success"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-pretty">{alert.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span>{alert.time}</span>
                        </div>
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "destructive"
                              : alert.type === "warning"
                                ? "secondary"
                                : "default"
                          }
                          className="text-xs"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="glass-effect hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-success animate-pulse-health" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Collection</span>
                      <span className="text-success">98%</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Model Accuracy</span>
                      <span className="text-success">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Network</span>
                      <span className="text-warning">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Water Quality Sensors</span>
                      <span className="text-accent">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Water Sensors Tab */}
          <TabsContent value="water">
            <WaterSensorPrediction />
          </TabsContent>

          {/* Disease Entry Forms Tab */}
          <TabsContent value="report">
            <DiseaseEntryForms user={user} />
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant">
            <VoiceAIAssistant user={user} />
          </TabsContent>

          {/* Video Call Tab */}
          <TabsContent value="video-call">
            <VideoCallIntegration user={user} />
          </TabsContent>

          {/* Doctor Appointments Tab */}
          <TabsContent value="appointments">
            <DoctorAppointmentSystem />
          </TabsContent>

          {/* AI Prediction Tab */}
          <TabsContent value="prediction">
            <DiseasePredictionAI />
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <EducationalResources />
          </TabsContent>

          <TabsContent value="schemes">
            <GovernmentSchemes />
          </TabsContent>

          <TabsContent value="map">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent animate-pulse-health" />
                  Interactive Disease Tracking Map
                </CardTitle>
                <CardDescription>
                  Real-time geographical visualization of health incidents and water quality data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DiseaseMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertSystem />
          </TabsContent>

          <TabsContent value="community">
            <CommunityReporting />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
