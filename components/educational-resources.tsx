"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Play,
  Download,
  Share2,
  Search,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  PlayCircle,
  FileText,
  Video,
  Headphones,
  Languages,
  Heart,
  Droplets,
  Shield,
  AlertTriangle,
  Thermometer,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Educational content data
const educationalModules = [
  {
    id: 1,
    title: "Water-Borne Disease Prevention",
    description: "Complete guide to preventing cholera, typhoid, and other water-borne diseases",
    category: "Prevention",
    duration: "45 min",
    level: "Beginner",
    language: "English",
    rating: 4.8,
    enrolled: 1250,
    completed: 980,
    thumbnail: "/placeholder-nghv2.png",
    modules: [
      { title: "Understanding Water-Borne Diseases", duration: "10 min", type: "video" },
      { title: "Safe Water Practices", duration: "15 min", type: "interactive" },
      { title: "Home Water Treatment", duration: "12 min", type: "video" },
      { title: "Community Prevention", duration: "8 min", type: "quiz" },
    ],
  },
  {
    id: 2,
    title: "Emergency Response Protocols",
    description: "Step-by-step guide for health workers during disease outbreaks",
    category: "Emergency",
    duration: "60 min",
    level: "Advanced",
    language: "English",
    rating: 4.9,
    enrolled: 850,
    completed: 720,
    thumbnail: "/placeholder-buex1.png",
    modules: [
      { title: "Outbreak Detection", duration: "15 min", type: "video" },
      { title: "Rapid Response Team", duration: "20 min", type: "interactive" },
      { title: "Community Isolation", duration: "15 min", type: "document" },
      { title: "Medical Supplies", duration: "10 min", type: "checklist" },
    ],
  },
  {
    id: 3,
    title: "Community Health Education",
    description: "Teaching communities about hygiene and disease prevention",
    category: "Community",
    duration: "30 min",
    level: "Intermediate",
    language: "Hindi",
    rating: 4.7,
    enrolled: 2100,
    completed: 1800,
    thumbnail: "/placeholder-x1b6a.png",
    modules: [
      { title: "Hygiene Practices", duration: "8 min", type: "video" },
      { title: "Sanitation Methods", duration: "12 min", type: "interactive" },
      { title: "Health Awareness", duration: "10 min", type: "audio" },
    ],
  },
  {
    id: 4,
    title: "Water Quality Testing",
    description: "Learn to test and monitor water quality in rural communities",
    category: "Technical",
    duration: "40 min",
    level: "Intermediate",
    language: "English",
    rating: 4.6,
    enrolled: 650,
    completed: 520,
    thumbnail: "/placeholder-8b7kg.png",
    modules: [
      { title: "Testing Equipment", duration: "15 min", type: "video" },
      { title: "Sample Collection", duration: "12 min", type: "interactive" },
      { title: "Result Interpretation", duration: "13 min", type: "quiz" },
    ],
  },
]

const quickGuides = [
  {
    title: "Cholera Prevention",
    description: "5-minute guide to prevent cholera transmission",
    icon: Droplets,
    color: "text-accent",
    steps: [
      "Drink only boiled or bottled water",
      "Wash hands frequently with soap",
      "Eat hot, freshly cooked food",
      "Avoid raw vegetables and fruits",
      "Use proper sanitation facilities",
    ],
  },
  {
    title: "Emergency First Aid",
    description: "Basic first aid for water-borne disease symptoms",
    icon: Heart,
    color: "text-destructive",
    steps: [
      "Provide oral rehydration solution (ORS)",
      "Monitor for dehydration signs",
      "Keep patient comfortable and cool",
      "Seek immediate medical attention",
      "Isolate if necessary",
    ],
  },
  {
    title: "Water Purification",
    description: "Simple methods to purify water at home",
    icon: Shield,
    color: "text-success",
    steps: [
      "Boil water for at least 1 minute",
      "Use water purification tablets",
      "Solar disinfection (SODIS) method",
      "Proper storage in clean containers",
      "Regular cleaning of storage vessels",
    ],
  },
  {
    title: "Symptom Recognition",
    description: "Identify early signs of water-borne diseases",
    icon: AlertTriangle,
    color: "text-warning",
    steps: [
      "Sudden onset of diarrhea",
      "Vomiting and nausea",
      "Fever and body aches",
      "Dehydration symptoms",
      "Abdominal pain and cramps",
    ],
  },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "as", name: "Assamese", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "mni", name: "Manipuri", flag: "🇮🇳" },
  { code: "lus", name: "Mizo", flag: "🇮🇳" },
]

const healthTips = [
  {
    title: "Daily Water Intake",
    tip: "Drink at least 8-10 glasses of clean, safe water daily",
    category: "Hydration",
    icon: Droplets,
  },
  {
    title: "Hand Hygiene",
    tip: "Wash hands with soap for 20 seconds before eating and after using toilet",
    category: "Hygiene",
    icon: Shield,
  },
  {
    title: "Food Safety",
    tip: "Cook food thoroughly and eat while hot. Avoid street food during outbreaks",
    category: "Nutrition",
    icon: Thermometer,
  },
  {
    title: "Environmental Cleanliness",
    tip: "Keep surroundings clean and dispose of waste properly",
    category: "Environment",
    icon: Heart,
  },
]

export default function EducationalResources() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentModule, setCurrentModule] = useState(null)
  const [progress, setProgress] = useState({})

  const filteredModules = educationalModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || module.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const startModule = (moduleId) => {
    setCurrentModule(moduleId)
    // Initialize progress if not exists
    if (!progress[moduleId]) {
      setProgress((prev) => ({ ...prev, [moduleId]: 0 }))
    }
  }

  const updateProgress = (moduleId, newProgress) => {
    setProgress((prev) => ({ ...prev, [moduleId]: newProgress }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary animate-pulse-health" />
            Educational Resources
          </CardTitle>
          <CardDescription>
            Comprehensive health education materials for disease prevention and community awareness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">4,850</div>
              <div className="text-sm text-muted-foreground">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">6</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-effect">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="quick-guides">Quick Guides</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="tips">Health Tips</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          {/* Search and Filters */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search">Search Courses</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="prevention">Prevention</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card key={module.id} className="glass-effect hover-lift overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={module.thumbnail || "/placeholder.svg"}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2">{module.category}</Badge>
                    <h3 className="text-white font-semibold text-lg text-balance">{module.title}</h3>
                  </div>
                  <Button size="sm" className="absolute top-4 right-4" onClick={() => startModule(module.id)}>
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4 text-pretty">{module.description}</p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {module.enrolled}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-warning" />
                      {module.rating}
                    </div>
                  </div>

                  {progress[module.id] !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{progress[module.id]}%</span>
                      </div>
                      <Progress value={progress[module.id]} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{module.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Languages className="w-4 h-4" />
                      <span className="text-sm">{module.language}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick-guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickGuides.map((guide, index) => {
              const Icon = guide.icon
              return (
                <Card key={index} className="glass-effect hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${guide.color}`} />
                      {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {guide.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {stepIndex + 1}
                          </div>
                          <p className="text-sm text-pretty">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Video Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Educational videos on disease prevention and health practices
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Available Videos</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Duration</span>
                    <span className="font-medium">24h 30m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Languages</span>
                    <span className="font-medium">6</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Browse Videos
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Downloadable guides, protocols, and reference materials
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>PDF Guides</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Protocols</span>
                    <span className="font-medium">34</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Checklists</span>
                    <span className="font-medium">45</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-success" />
                  Audio Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Audio lessons and podcasts for on-the-go learning</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Audio Lessons</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Podcasts</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Duration</span>
                    <span className="font-medium">18h 45m</span>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Headphones className="w-4 h-4 mr-2" />
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="glass-effect hover-lift">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{tip.title}</h3>
                        <Badge variant="outline" className="mb-2">
                          {tip.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground text-pretty">{tip.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Alert className="border-primary/50 bg-primary/10">
            <Heart className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Daily Health Reminder</AlertTitle>
            <AlertDescription>
              Remember to follow these health tips daily to prevent water-borne diseases and maintain good health in
              your community.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Community Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Discussion Forums</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Join discussions with health workers and community members
                  </p>
                  <Button size="sm">Join Discussion</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Study Groups</h4>
                  <p className="text-sm text-muted-foreground mb-2">Form study groups with peers in your region</p>
                  <Button size="sm" variant="outline">
                    Create Group
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Expert Q&A</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ask questions to medical experts and health professionals
                  </p>
                  <Button size="sm" variant="outline">
                    Ask Question
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-8 h-8 text-success" />
                  <div>
                    <h4 className="font-medium">Course Completion</h4>
                    <p className="text-sm text-muted-foreground">Complete 5 courses</p>
                  </div>
                  <Badge>3/5</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Star className="w-8 h-8 text-warning" />
                  <div>
                    <h4 className="font-medium">Top Learner</h4>
                    <p className="text-sm text-muted-foreground">Maintain 90% average</p>
                  </div>
                  <Badge variant="outline">Locked</Badge>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-medium">Community Helper</h4>
                    <p className="text-sm text-muted-foreground">Help 10 community members</p>
                  </div>
                  <Badge variant="outline">2/10</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
