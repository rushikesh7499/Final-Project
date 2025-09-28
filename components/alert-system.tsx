"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Filter,
  MapPin,
  Phone,
  Send,
  Settings,
  Zap,
  Eye,
  Archive,
  Plus,
} from "lucide-react"

// Mock alert data
const alerts = [
  {
    id: 1,
    title: "Critical Cholera Outbreak",
    description: "Multiple cases of cholera reported in Dimapur district. Immediate response required.",
    location: "Dimapur, Nagaland",
    severity: "critical",
    status: "active",
    timestamp: "2024-01-15T10:30:00Z",
    affectedPopulation: 12000,
    responseTeams: 3,
    estimatedCases: 42,
    source: "ASHA Worker Report",
    actions: ["Deploy medical team", "Water quality testing", "Community alert"],
  },
  {
    id: 2,
    title: "Water Contamination Alert",
    description: "Elevated bacterial levels detected in main water supply. Monitoring situation closely.",
    location: "Imphal East, Manipur",
    severity: "warning",
    status: "investigating",
    timestamp: "2024-01-15T08:15:00Z",
    affectedPopulation: 8500,
    responseTeams: 2,
    estimatedCases: 28,
    source: "IoT Sensor",
    actions: ["Water testing", "Public notification", "Alternative water supply"],
  },
  {
    id: 3,
    title: "Typhoid Cases Increasing",
    description: "Gradual increase in typhoid cases over the past week. Trend monitoring active.",
    location: "Aizawl, Mizoram",
    severity: "moderate",
    status: "monitoring",
    timestamp: "2024-01-15T06:45:00Z",
    affectedPopulation: 5200,
    responseTeams: 1,
    estimatedCases: 15,
    source: "Health Clinic",
    actions: ["Enhanced surveillance", "Health education", "Vaccination drive"],
  },
  {
    id: 4,
    title: "Diarrhea Cluster Resolved",
    description: "Small cluster of diarrhea cases successfully contained through rapid response.",
    location: "Shillong, Meghalaya",
    severity: "low",
    status: "resolved",
    timestamp: "2024-01-14T14:20:00Z",
    affectedPopulation: 1800,
    responseTeams: 1,
    estimatedCases: 8,
    source: "Community Report",
    actions: ["Follow-up monitoring", "Health education", "Water quality check"],
  },
  {
    id: 5,
    title: "Hepatitis A Outbreak",
    description: "Confirmed hepatitis A outbreak in rural area. Response team deployed.",
    location: "Itanagar, Arunachal Pradesh",
    severity: "critical",
    status: "active",
    timestamp: "2024-01-15T12:00:00Z",
    affectedPopulation: 3500,
    responseTeams: 2,
    estimatedCases: 35,
    source: "District Hospital",
    actions: ["Medical intervention", "Contact tracing", "Vaccination campaign"],
  },
]

const severityColors = {
  critical: "destructive",
  warning: "secondary",
  moderate: "outline",
  low: "default",
} as const

const statusColors = {
  active: "destructive",
  investigating: "secondary",
  monitoring: "outline",
  resolved: "default",
} as const

export default function AlertSystem() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewAlertForm, setShowNewAlertForm] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    webhook: false,
  })

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesSearch =
      searchTerm === "" ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSeverity && matchesStatus && matchesSearch
  })

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Less than 1 hour ago"
    if (diffInHours === 1) return "1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
  }

  return (
    <div className="space-y-6">
      {/* Alert System Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-warning animate-pulse-health" />
            Alert Management System
          </h2>
          <p className="text-muted-foreground">Real-time health alerts and emergency response coordination</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowNewAlertForm(true)} className="animate-pulse-health">
            <Plus className="w-4 h-4 mr-2" />
            New Alert
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="analytics">Alert Analytics</TabsTrigger>
        </TabsList>

        {/* Active Alerts */}
        <TabsContent value="active" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alert List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg animate-float-3d ${
                    selectedAlert?.id === alert.id ? "ring-2 ring-primary" : ""
                  } ${alert.severity === "critical" ? "border-destructive/50" : ""}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {alert.severity === "critical" && (
                            <AlertTriangle className="w-4 h-4 text-destructive animate-pulse-health" />
                          )}
                          {alert.severity === "warning" && <AlertTriangle className="w-4 h-4 text-warning" />}
                          {alert.severity === "moderate" && <Clock className="w-4 h-4 text-accent" />}
                          {alert.severity === "low" && <CheckCircle className="w-4 h-4 text-success" />}
                          <span className="text-pretty">{alert.title}</span>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span>{getTimeAgo(alert.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant={severityColors[alert.severity as keyof typeof severityColors]}>
                          {alert.severity}
                        </Badge>
                        <Badge variant={statusColors[alert.status as keyof typeof statusColors]} className="text-xs">
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 text-pretty">{alert.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Cases:</span>
                        <div className="font-semibold">{alert.estimatedCases}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Population:</span>
                        <div className="font-semibold">{alert.affectedPopulation.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Teams:</span>
                        <div className="font-semibold">{alert.responseTeams}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Alert Details Panel */}
            <div className="lg:sticky lg:top-6">
              {selectedAlert ? (
                <Card className="animate-float-3d">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-primary" />
                      Alert Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-pretty">{selectedAlert.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{selectedAlert.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Severity</Label>
                        <Badge
                          variant={severityColors[selectedAlert.severity as keyof typeof severityColors]}
                          className="mt-1"
                        >
                          {selectedAlert.severity}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Status</Label>
                        <Badge
                          variant={statusColors[selectedAlert.status as keyof typeof statusColors]}
                          className="mt-1"
                        >
                          {selectedAlert.status}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Source</Label>
                        <p className="text-sm font-medium">{selectedAlert.source}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Location</Label>
                        <p className="text-sm font-medium">{selectedAlert.location}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Response Actions</Label>
                      <div className="space-y-2">
                        {selectedAlert.actions.map((action: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <CheckCircle className="w-4 h-4 text-success" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 animate-pulse-health">
                        <Zap className="w-4 h-4 mr-2" />
                        Deploy Response
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Team
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select an alert to view details</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Alert History */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Historical view of all health alerts and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts
                  .filter((alert) => alert.status === "resolved")
                  .map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="space-y-1">
                        <p className="font-medium text-pretty">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {alert.location} • {getTimeAgo(alert.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Resolved</Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive health alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser and mobile push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="webhook-notifications">Webhook Integration</Label>
                    <p className="text-sm text-muted-foreground">Send alerts to external systems</p>
                  </div>
                  <Switch
                    id="webhook-notifications"
                    checked={notifications.webhook}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, webhook: checked }))}
                  />
                </div>
              </div>

              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alert Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{alerts.length}</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-destructive">
                  {alerts.filter((a) => a.status === "active").length}
                </div>
                <p className="text-sm text-muted-foreground">Requiring attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success">2.4h</div>
                <p className="text-sm text-muted-foreground">Average response</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
