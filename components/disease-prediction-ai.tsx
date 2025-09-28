"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Droplets,
  Thermometer,
  Wind,
  Activity,
  Target,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock AI prediction data
const predictionData = [
  { month: "Jan", cholera: 12, typhoid: 8, hepatitis: 5, diarrhea: 25, predicted: 18 },
  { month: "Feb", cholera: 15, typhoid: 12, hepatitis: 7, diarrhea: 30, predicted: 22 },
  { month: "Mar", cholera: 22, typhoid: 18, hepatitis: 12, diarrhea: 45, predicted: 35 },
  { month: "Apr", cholera: 35, typhoid: 25, hepatitis: 18, diarrhea: 60, predicted: 48 },
  { month: "May", cholera: 28, typhoid: 20, hepatitis: 15, diarrhea: 50, predicted: 42 },
  { month: "Jun", cholera: 18, typhoid: 15, hepatitis: 10, diarrhea: 35, predicted: 28 },
]

const riskFactors = [
  { factor: "Water Quality", current: 65, safe: 85, risk: "Medium" },
  { factor: "Sanitation", current: 72, safe: 90, risk: "Medium" },
  { factor: "Population Density", current: 85, safe: 70, risk: "High" },
  { factor: "Rainfall", current: 45, safe: 60, risk: "Low" },
  { factor: "Temperature", current: 78, safe: 75, risk: "Medium" },
  { factor: "Healthcare Access", current: 68, safe: 95, risk: "High" },
]

const diseaseRiskData = [
  { disease: "Cholera", risk: 75, cases: 156, trend: "up" },
  { disease: "Typhoid", risk: 60, cases: 89, trend: "stable" },
  { disease: "Hepatitis A", risk: 45, cases: 67, trend: "down" },
  { disease: "Diarrheal Diseases", risk: 85, cases: 234, trend: "up" },
  { disease: "Dysentery", risk: 55, cases: 78, trend: "stable" },
]

const radarData = [
  { subject: "Water Quality", A: 65, B: 85, fullMark: 100 },
  { subject: "Sanitation", A: 72, B: 90, fullMark: 100 },
  { subject: "Healthcare", A: 68, B: 95, fullMark: 100 },
  { subject: "Education", A: 75, B: 90, fullMark: 100 },
  { subject: "Infrastructure", A: 60, B: 85, fullMark: 100 },
  { subject: "Response Time", A: 80, B: 95, fullMark: 100 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1"]

export default function DiseasePredictionAI() {
  const [selectedDisease, setSelectedDisease] = useState("cholera")
  const [predictionAccuracy, setPredictionAccuracy] = useState(94.2)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [predictionResults, setPredictionResults] = useState(null)

  const runPrediction = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setPredictionResults({
        riskLevel: "High",
        probability: 78,
        affectedPopulation: 15000,
        timeframe: "2-3 weeks",
        confidence: 94.2,
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* AI Prediction Header */}
      <Card className="glass-effect hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary animate-pulse-health" />
            AI Disease Prediction System
          </CardTitle>
          <CardDescription>
            Advanced machine learning models for water-borne disease outbreak prediction in Northeast India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{predictionAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">156</div>
              <div className="text-sm text-muted-foreground">Predictions Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">23</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">2.4h</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="prediction" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-effect">
          <TabsTrigger value="prediction">AI Prediction</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="trends">Disease Trends</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="intervention">Intervention</TabsTrigger>
        </TabsList>

        <TabsContent value="prediction" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prediction Input */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Disease Outbreak Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="disease-select">Select Disease</Label>
                  <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose disease type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cholera">Cholera</SelectItem>
                      <SelectItem value="typhoid">Typhoid</SelectItem>
                      <SelectItem value="hepatitis">Hepatitis A</SelectItem>
                      <SelectItem value="diarrhea">Diarrheal Diseases</SelectItem>
                      <SelectItem value="dysentery">Dysentery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Target Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assam">Assam</SelectItem>
                      <SelectItem value="manipur">Manipur</SelectItem>
                      <SelectItem value="nagaland">Nagaland</SelectItem>
                      <SelectItem value="mizoram">Mizoram</SelectItem>
                      <SelectItem value="tripura">Tripura</SelectItem>
                      <SelectItem value="meghalaya">Meghalaya</SelectItem>
                      <SelectItem value="arunachal">Arunachal Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">Prediction Timeframe</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1week">1 Week</SelectItem>
                      <SelectItem value="2weeks">2 Weeks</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={runPrediction} disabled={isAnalyzing} className="w-full">
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Run AI Prediction
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Prediction Results */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent" />
                  Prediction Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {predictionResults ? (
                  <div className="space-y-4">
                    <Alert
                      className={`border-${predictionResults.riskLevel === "High" ? "destructive" : "warning"}/50`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Risk Level: {predictionResults.riskLevel}</AlertTitle>
                      <AlertDescription>
                        {predictionResults.probability}% probability of outbreak in {predictionResults.timeframe}
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-destructive">{predictionResults.probability}%</div>
                        <div className="text-sm text-muted-foreground">Outbreak Probability</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-warning">
                          {predictionResults.affectedPopulation.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">At-Risk Population</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Model Confidence</span>
                        <span className="text-success">{predictionResults.confidence}%</span>
                      </div>
                      <Progress value={predictionResults.confidence} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risk Assessment</span>
                        <Badge variant={predictionResults.riskLevel === "High" ? "destructive" : "secondary"}>
                          {predictionResults.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Run AI prediction to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Prediction Trends Chart */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle>Disease Prediction Trends</CardTitle>
              <CardDescription>AI-powered forecasting vs actual cases</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400} debounce={120}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cholera" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="typhoid" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="hepatitis" stroke="#ffc658" strokeWidth={2} />
                  <Line type="monotone" dataKey="predicted" stroke="#ff7300" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Factors */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-warning" />
                  Risk Factor Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{factor.factor}</span>
                      <Badge
                        variant={
                          factor.risk === "High" ? "destructive" : factor.risk === "Medium" ? "secondary" : "default"
                        }
                      >
                        {factor.risk}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={factor.current} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground w-12">{factor.current}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {factor.safe}% | Current: {factor.current}%
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Disease Risk Assessment */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-destructive" />
                  Disease Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {diseaseRiskData.map((disease, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{disease.disease}</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          className={`w-4 h-4 ${
                            disease.trend === "up"
                              ? "text-destructive"
                              : disease.trend === "down"
                                ? "text-success rotate-180"
                                : "text-muted-foreground"
                          }`}
                        />
                        <span className="text-sm text-muted-foreground">{disease.cases} cases</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Risk Level</span>
                        <span
                          className={`font-medium ${
                            disease.risk > 70 ? "text-destructive" : disease.risk > 50 ? "text-warning" : "text-success"
                          }`}
                        >
                          {disease.risk}%
                        </span>
                      </div>
                      <Progress value={disease.risk} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Radar Chart */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle>Community Health Radar</CardTitle>
              <CardDescription>Current vs Target health indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400} debounce={120}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle>Historical Disease Trends</CardTitle>
              <CardDescription>6-month trend analysis with seasonal patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400} debounce={120}>
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cholera" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="typhoid" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="hepatitis" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="diarrhea" stackId="1" stroke="#ff7300" fill="#ff7300" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-accent" />
                  Water Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">65%</div>
                  <div className="text-sm text-muted-foreground">Safe Water Access</div>
                  <Progress value={65} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-warning" />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning">28°C</div>
                  <div className="text-sm text-muted-foreground">Average Temperature</div>
                  <Progress value={78} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-success" />
                  Rainfall
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">245mm</div>
                  <div className="text-sm text-muted-foreground">Monthly Rainfall</div>
                  <Progress value={45} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="intervention" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                AI-Recommended Interventions
              </CardTitle>
              <CardDescription>
                Machine learning-powered intervention strategies based on current risk factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-primary/50 bg-primary/10">
                  <Brain className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary">High Priority Intervention</AlertTitle>
                  <AlertDescription>
                    Immediate water quality testing and purification in Dimapur district recommended. AI confidence: 96%
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Water Sanitation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Deploy mobile water purification units to high-risk areas
                    </p>
                    <Badge variant="destructive">Critical</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Health Education</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Conduct awareness campaigns in affected communities
                    </p>
                    <Badge variant="secondary">Medium</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Medical Supplies</h4>
                    <p className="text-sm text-muted-foreground mb-2">Distribute ORS packets and basic medications</p>
                    <Badge variant="destructive">Critical</Badge>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Surveillance</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Increase monitoring frequency in predicted hotspots
                    </p>
                    <Badge variant="default">Low</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
