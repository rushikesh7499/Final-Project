"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Plus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Camera,
  Send,
  CheckCircle,
  User,
  Heart,
  Droplets,
  Activity,
  Shield,
} from "lucide-react"

// Mock community reports data
const communityReports = [
  {
    id: 1,
    title: "Water Quality Concern",
    description: "Strange taste and odor in community well water since yesterday",
    reporter: "Ravi Kumar",
    role: "ASHA Worker",
    location: "Dimapur, Nagaland",
    timestamp: "2024-01-15T09:30:00Z",
    status: "investigating",
    priority: "high",
    category: "water_quality",
    affectedPeople: 150,
    symptoms: ["nausea", "stomach_pain"],
    images: 2,
    verified: true,
  },
  {
    id: 2,
    title: "Multiple Diarrhea Cases",
    description: "5 children in our village have developed diarrhea in the past 2 days",
    reporter: "Maya Devi",
    role: "Community Volunteer",
    location: "Imphal East, Manipur",
    timestamp: "2024-01-15T07:15:00Z",
    status: "active",
    priority: "critical",
    category: "disease_outbreak",
    affectedPeople: 5,
    symptoms: ["diarrhea", "fever", "vomiting"],
    images: 1,
    verified: true,
  },
  {
    id: 3,
    title: "Sanitation Issue",
    description: "Sewage overflow near school affecting children's health",
    reporter: "John Marak",
    role: "School Teacher",
    location: "Shillong, Meghalaya",
    timestamp: "2024-01-14T16:45:00Z",
    status: "resolved",
    priority: "medium",
    category: "sanitation",
    affectedPeople: 200,
    symptoms: ["respiratory_issues"],
    images: 3,
    verified: true,
  },
  {
    id: 4,
    title: "Fever Outbreak",
    description: "Unusual number of fever cases in tribal area, need medical attention",
    reporter: "Lalthanga",
    role: "Village Head",
    location: "Aizawl, Mizoram",
    timestamp: "2024-01-14T11:20:00Z",
    status: "monitoring",
    priority: "high",
    category: "disease_outbreak",
    affectedPeople: 25,
    symptoms: ["fever", "headache", "body_ache"],
    images: 0,
    verified: false,
  },
]

const healthWorkers = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "District Health Officer",
    location: "Dimapur, Nagaland",
    phone: "+91 98765 43210",
    email: "priya.sharma@health.gov.in",
    specialization: "Infectious Diseases",
    experience: "8 years",
    languages: ["English", "Hindi", "Nagamese"],
    availability: "available",
    reportsHandled: 45,
  },
  {
    id: 2,
    name: "Nurse Rita Devi",
    role: "ASHA Supervisor",
    location: "Imphal, Manipur",
    phone: "+91 87654 32109",
    email: "rita.devi@asha.gov.in",
    specialization: "Community Health",
    experience: "12 years",
    languages: ["Manipuri", "English", "Hindi"],
    availability: "busy",
    reportsHandled: 67,
  },
  {
    id: 3,
    name: "Dr. Michael Sangma",
    role: "Public Health Specialist",
    location: "Shillong, Meghalaya",
    phone: "+91 76543 21098",
    email: "michael.sangma@health.gov.in",
    specialization: "Epidemiology",
    experience: "15 years",
    languages: ["English", "Khasi", "Garo"],
    availability: "available",
    reportsHandled: 89,
  },
]

const priorityColors = {
  critical: "destructive",
  high: "secondary",
  medium: "outline",
  low: "default",
} as const

const statusColors = {
  active: "destructive",
  investigating: "secondary",
  monitoring: "outline",
  resolved: "default",
} as const

export default function CommunityReporting() {
  const [activeTab, setActiveTab] = useState("reports")
  const [showNewReportForm, setShowNewReportForm] = useState(false)
  const [newReport, setNewReport] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    priority: "",
    affectedPeople: "",
    symptoms: [] as string[],
    reporterName: "",
    reporterRole: "",
    reporterPhone: "",
    reporterEmail: "",
  })

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const reportTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - reportTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Less than 1 hour ago"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
  }

  const handleSubmitReport = () => {
    // Handle form submission
    console.log("Submitting report:", newReport)
    setShowNewReportForm(false)
    setNewReport({
      title: "",
      description: "",
      location: "",
      category: "",
      priority: "",
      affectedPeople: "",
      symptoms: [],
      reporterName: "",
      reporterRole: "",
      reporterPhone: "",
      reporterEmail: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Community Reporting Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-primary animate-pulse-health" />
            Community Health Reporting
          </h2>
          <p className="text-muted-foreground">
            Empowering communities to report health incidents and connect with healthcare workers
          </p>
        </div>
        <Button onClick={() => setShowNewReportForm(true)} className="animate-pulse-health">
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Community Reports</TabsTrigger>
          <TabsTrigger value="workers">Health Workers</TabsTrigger>
          <TabsTrigger value="education">Health Education</TabsTrigger>
          <TabsTrigger value="statistics">Community Stats</TabsTrigger>
        </TabsList>

        {/* Community Reports */}
        <TabsContent value="reports" className="space-y-6">
          {showNewReportForm && (
            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Submit New Health Report
                </CardTitle>
                <CardDescription>
                  Report health incidents, water quality issues, or sanitation concerns in your community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title *</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={newReport.title}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="Village, District, State"
                      value={newReport.location}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newReport.category}
                      onValueChange={(value) => setNewReport((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disease_outbreak">Disease Outbreak</SelectItem>
                        <SelectItem value="water_quality">Water Quality</SelectItem>
                        <SelectItem value="sanitation">Sanitation Issue</SelectItem>
                        <SelectItem value="food_safety">Food Safety</SelectItem>
                        <SelectItem value="environmental">Environmental Health</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select
                      value={newReport.priority}
                      onValueChange={(value) => setNewReport((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical - Immediate attention needed</SelectItem>
                        <SelectItem value="high">High - Urgent response required</SelectItem>
                        <SelectItem value="medium">Medium - Important but not urgent</SelectItem>
                        <SelectItem value="low">Low - For monitoring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affected">Number of People Affected</Label>
                    <Input
                      id="affected"
                      type="number"
                      placeholder="Estimated number"
                      value={newReport.affectedPeople}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, affectedPeople: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reporter-name">Your Name *</Label>
                    <Input
                      id="reporter-name"
                      placeholder="Full name"
                      value={newReport.reporterName}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, reporterName: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reporter-role">Your Role</Label>
                    <Select
                      value={newReport.reporterRole}
                      onValueChange={(value) => setNewReport((prev) => ({ ...prev, reporterRole: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asha_worker">ASHA Worker</SelectItem>
                        <SelectItem value="community_volunteer">Community Volunteer</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="village_head">Village Head</SelectItem>
                        <SelectItem value="health_worker">Health Worker</SelectItem>
                        <SelectItem value="citizen">Community Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reporter-phone">Phone Number *</Label>
                    <Input
                      id="reporter-phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={newReport.reporterPhone}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, reporterPhone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the health incident, symptoms observed, timeline, and any other relevant details..."
                    rows={4}
                    value={newReport.description}
                    onChange={(e) => setNewReport((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Add Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload photos or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Photos help health workers assess the situation better
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmitReport} className="flex-1 animate-pulse-health">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewReportForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reports List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {communityReports.map((report) => (
              <Card key={report.id} className="animate-float-3d">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {report.category === "disease_outbreak" && <Activity className="w-4 h-4 text-destructive" />}
                        {report.category === "water_quality" && <Droplets className="w-4 h-4 text-accent" />}
                        {report.category === "sanitation" && <Shield className="w-4 h-4 text-warning" />}
                        <span className="text-pretty">{report.title}</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{report.reporter}</span>
                        <span>•</span>
                        <span>{report.role}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{report.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={priorityColors[report.priority as keyof typeof priorityColors]}>
                        {report.priority}
                      </Badge>
                      {report.verified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-pretty">{report.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Affected:</span>
                      <div className="font-semibold">{report.affectedPeople} people</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge
                        variant={statusColors[report.status as keyof typeof statusColors]}
                        className="text-xs ml-1"
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>

                  {report.symptoms.length > 0 && (
                    <div>
                      <span className="text-xs text-muted-foreground">Symptoms:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {report.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symptom.replace("_", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{getTimeAgo(report.timestamp)}</span>
                    {report.images > 0 && (
                      <span className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {report.images} photos
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Health Workers */}
        <TabsContent value="workers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {healthWorkers.map((worker) => (
              <Card key={worker.id} className="animate-float-3d">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{worker.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{worker.role}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{worker.location}</span>
                      </div>
                    </div>
                    <Badge
                      variant={worker.availability === "available" ? "default" : "secondary"}
                      className={worker.availability === "available" ? "animate-pulse-health" : ""}
                    >
                      {worker.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-primary" />
                      <span>{worker.specialization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{worker.experience} experience</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted-foreground">Languages:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {worker.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Reports handled: <span className="font-semibold text-foreground">{worker.reportsHandled}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Health Education */}
        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-accent" />
                  Water Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to ensure safe drinking water and prevent water-borne diseases
                </p>
                <Button size="sm" className="w-full">
                  View Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Hygiene Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Essential hygiene practices to prevent disease transmission
                </p>
                <Button size="sm" className="w-full">
                  View Guidelines
                </Button>
              </CardContent>
            </Card>

            <Card className="animate-float-3d">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-warning" />
                  Symptom Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Identify early symptoms of common water-borne diseases
                </p>
                <Button size="sm" className="w-full">
                  View Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Community Statistics */}
        <TabsContent value="statistics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{communityReports.length}</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">
                  {healthWorkers.filter((w) => w.availability === "available").length}
                </div>
                <p className="text-sm text-muted-foreground">Available now</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent">94%</div>
                <p className="text-sm text-muted-foreground">Within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-warning">156</div>
                <p className="text-sm text-muted-foreground">Actively reporting</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Community Engagement</CardTitle>
              <CardDescription>Monthly reporting activity across different communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Nagaland</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Manipur</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mizoram</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Meghalaya</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
