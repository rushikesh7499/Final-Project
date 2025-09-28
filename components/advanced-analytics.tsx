"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from "recharts"
import { TrendingUp, Activity, Brain, AlertTriangle, Droplets, Calendar } from "lucide-react"

// Advanced analytics data
const predictiveData = [
  { week: "Week 1", actual: 45, predicted: 42, confidence: 85 },
  { week: "Week 2", actual: 52, predicted: 48, confidence: 82 },
  { week: "Week 3", actual: 38, predicted: 41, confidence: 88 },
  { week: "Week 4", actual: 68, predicted: 65, confidence: 79 },
  { week: "Week 5", actual: null, predicted: 72, confidence: 76 },
  { week: "Week 6", actual: null, predicted: 78, confidence: 73 },
  { week: "Week 7", actual: null, predicted: 85, confidence: 70 },
]

const riskFactorData = [
  { factor: "Water Quality", value: 85, fullMark: 100 },
  { factor: "Population Density", value: 65, fullMark: 100 },
  { factor: "Sanitation", value: 45, fullMark: 100 },
  { factor: "Healthcare Access", value: 55, fullMark: 100 },
  { factor: "Seasonal Patterns", value: 75, fullMark: 100 },
  { factor: "Climate Conditions", value: 80, fullMark: 100 },
]

const outbreakCorrelation = [
  { month: "Jan", rainfall: 45, temperature: 18, cases: 32, waterQuality: 78 },
  { month: "Feb", rainfall: 38, temperature: 22, cases: 28, waterQuality: 82 },
  { month: "Mar", rainfall: 65, temperature: 26, cases: 45, waterQuality: 65 },
  { month: "Apr", rainfall: 120, temperature: 28, cases: 68, waterQuality: 58 },
  { month: "May", rainfall: 180, temperature: 30, cases: 85, waterQuality: 52 },
  { month: "Jun", rainfall: 220, temperature: 29, cases: 92, waterQuality: 48 },
  { month: "Jul", rainfall: 280, temperature: 27, cases: 105, waterQuality: 45 },
  { month: "Aug", rainfall: 250, temperature: 26, cases: 98, waterQuality: 47 },
  { month: "Sep", rainfall: 180, temperature: 25, cases: 75, waterQuality: 55 },
  { month: "Oct", rainfall: 85, temperature: 23, cases: 52, waterQuality: 68 },
  { month: "Nov", rainfall: 25, temperature: 20, cases: 35, waterQuality: 75 },
  { month: "Dec", rainfall: 15, temperature: 17, cases: 28, waterQuality: 80 },
]

const interventionEffectiveness = [
  { intervention: "Water Treatment", before: 85, after: 32, effectiveness: 62 },
  { intervention: "Health Education", before: 68, after: 45, effectiveness: 34 },
  { intervention: "Sanitation Upgrade", before: 92, after: 28, effectiveness: 70 },
  { intervention: "Early Warning", before: 75, after: 38, effectiveness: 49 },
  { intervention: "Mobile Clinics", before: 58, after: 22, effectiveness: 62 },
]

const realTimeMetrics = [
  { time: "00:00", activeReports: 12, responseTeams: 8, waterTests: 45 },
  { time: "04:00", activeReports: 8, responseTeams: 6, waterTests: 32 },
  { time: "08:00", activeReports: 25, responseTeams: 12, waterTests: 68 },
  { time: "12:00", activeReports: 35, responseTeams: 15, waterTests: 85 },
  { time: "16:00", activeReports: 42, responseTeams: 18, waterTests: 92 },
  { time: "20:00", activeReports: 28, responseTeams: 14, waterTests: 65 },
]

export default function AdvancedAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState("predictive")
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg backdrop-blur-sm">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.dataKey}: {entry.value}
              {entry.dataKey === "confidence" && "%"}
              {entry.dataKey === "effectiveness" && "% reduction"}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary animate-pulse-health" />
            AI-Powered Health Analytics
          </h2>
          <p className="text-muted-foreground">
            Advanced predictive modeling and correlation analysis for disease outbreak prevention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="animate-data-flow">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
          <Badge variant="secondary">
            <Calendar className="w-3 h-3 mr-1" />
            Updated 2 min ago
          </Badge>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="correlation">Correlations</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        {/* Predictive Analytics */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Outbreak Prediction Model
                </CardTitle>
                <CardDescription>AI-powered forecasting with confidence intervals for the next 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 min-w-0 overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%" debounce={120}>
                    <ComposedChart data={predictiveData}>
                      <defs>
                        <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="week" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="#8b5cf6"
                        fill="url(#actualGradient)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                      />
                      <Bar dataKey="confidence" fill="#eab308" opacity={0.3} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Risk Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse-health" />
                    <span className="font-medium text-destructive">High Risk</span>
                  </div>
                  <p className="text-sm">Dimapur shows 85% outbreak probability in next 2 weeks</p>
                </div>

                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="font-medium text-warning">Medium Risk</span>
                  </div>
                  <p className="text-sm">Imphal water quality declining, monitor closely</p>
                </div>

                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="font-medium text-accent">Trend Alert</span>
                  </div>
                  <p className="text-sm">Seasonal pattern suggests increased cases in monsoon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Factor Analysis */}
        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle>Risk Factor Analysis</CardTitle>
                <CardDescription>Multi-dimensional risk assessment across key factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 min-w-0 overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%" debounce={120}>
                    <RadarChart data={riskFactorData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" className="text-xs" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                      <Radar
                        name="Risk Level"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle>Intervention Effectiveness</CardTitle>
                <CardDescription>Impact analysis of health interventions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 min-w-0 overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%" debounce={120}>
                    <BarChart data={interventionEffectiveness} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="intervention" type="category" className="text-xs" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="before" fill="#ef4444" opacity={0.7} />
                      <Bar dataKey="after" fill="#22c55e" opacity={0.7} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Environmental Correlations */}
        <TabsContent value="correlation" className="space-y-6">
          <Card className="animate-float-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-accent" />
                Environmental Correlation Analysis
              </CardTitle>
              <CardDescription>Relationship between environmental factors and disease outbreaks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 min-w-0 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" debounce={120}>
                  <ComposedChart data={outbreakCorrelation}>
                    <defs>
                      <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis yAxisId="left" className="text-xs" />
                    <YAxis yAxisId="right" orientation="right" className="text-xs" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="rainfall"
                      stroke="#06b6d4"
                      fill="url(#rainfallGradient)"
                    />
                    <Bar yAxisId="right" dataKey="cases" fill="#ef4444" opacity={0.7} />
                    <Line yAxisId="right" type="monotone" dataKey="waterQuality" stroke="#22c55e" strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#eab308" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interventions */}
        <TabsContent value="interventions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interventionEffectiveness.map((intervention, index) => (
              <Card key={index} className="animate-float-3d">
                <CardHeader>
                  <CardTitle className="text-lg">{intervention.intervention}</CardTitle>
                  <CardDescription>Effectiveness Analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Before</span>
                      <span className="font-bold text-destructive">{intervention.before} cases</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">After</span>
                      <span className="font-bold text-success">{intervention.after} cases</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Reduction</span>
                      <Badge variant="outline" className="text-accent">
                        {intervention.effectiveness}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all duration-1000 animate-data-flow"
                        style={{ width: `${intervention.effectiveness}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Real-time Metrics */}
        <TabsContent value="realtime" className="space-y-6">
          <Card className="animate-float-3d">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary animate-pulse-health" />
                Real-time System Activity
              </CardTitle>
              <CardDescription>Live monitoring of system components and response activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 min-w-0 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" debounce={120}>
                  <LineChart data={realTimeMetrics}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="activeReports"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="responseTeams"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="waterTests"
                      stroke="#eab308"
                      strokeWidth={2}
                      dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
