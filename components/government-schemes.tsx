"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Building2,
  Heart,
  Droplets,
  Shield,
  FileText,
  Phone,
  MapPin,
  CheckCircle,
  ExternalLink,
  Search,
  Clock,
  IndianRupee,
  Briefcase,
  Home,
  Stethoscope,
} from "lucide-react"

// Government schemes data
const governmentSchemes = [
  {
    id: 1,
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
    shortName: "PM-JAY",
    category: "Healthcare",
    description: "World's largest health insurance scheme providing coverage up to ₹5 lakh per family per year",
    benefits: [
      "Free treatment up to ₹5 lakh per family per year",
      "Covers 1,393 medical packages",
      "Cashless treatment at empaneled hospitals",
      "Pre and post-hospitalization expenses covered",
    ],
    eligibility: "Families identified through SECC 2011 database",
    coverage: "₹5,00,000",
    beneficiaries: "10.74 crore families",
    applicationProcess: "Visit nearest Common Service Center (CSC) or empaneled hospital",
    documents: ["Ration Card", "Aadhaar Card", "Family ID"],
    contactInfo: {
      helpline: "14555",
      website: "https://pmjay.gov.in",
      email: "support@pmjay.gov.in",
    },
    status: "Active",
    launchDate: "2018",
    ministry: "Ministry of Health and Family Welfare",
    icon: Heart,
    color: "text-destructive",
  },
  {
    id: 2,
    name: "Jal Jeevan Mission",
    shortName: "JJM",
    category: "Water & Sanitation",
    description: "Ensuring piped water supply to every rural household by 2024",
    benefits: [
      "Functional household tap connection (FHTC)",
      "Assured water supply of 55 liters per person per day",
      "Regular and adequate quality water supply",
      "Community participation in planning and implementation",
    ],
    eligibility: "All rural households",
    coverage: "55 liters per person per day",
    beneficiaries: "19.2 crore rural households",
    applicationProcess: "Apply through Gram Panchayat or online portal",
    documents: ["Aadhaar Card", "Residence Proof", "Bank Account Details"],
    contactInfo: {
      helpline: "1800-11-0016",
      website: "https://jaljeevanmission.gov.in",
      email: "jjm-ddws@gov.in",
    },
    status: "Active",
    launchDate: "2019",
    ministry: "Ministry of Jal Shakti",
    icon: Droplets,
    color: "text-accent",
  },
  {
    id: 3,
    name: "Swachh Bharat Mission - Gramin",
    shortName: "SBM-G",
    category: "Sanitation",
    description: "Making rural India open defecation free and improving solid waste management",
    benefits: [
      "Individual household latrines",
      "Community sanitary complexes",
      "Solid and liquid waste management",
      "Behavior change communication",
    ],
    eligibility: "Rural households without toilets",
    coverage: "₹12,000 per toilet",
    beneficiaries: "All rural households",
    applicationProcess: "Apply through Gram Panchayat",
    documents: ["Aadhaar Card", "BPL Card", "Bank Account Details"],
    contactInfo: {
      helpline: "1800-11-0001",
      website: "https://swachhbharatmission.gov.in",
      email: "sbm@gov.in",
    },
    status: "Active",
    launchDate: "2014",
    ministry: "Ministry of Jal Shakti",
    icon: Shield,
    color: "text-success",
  },
  {
    id: 4,
    name: "National Health Mission",
    shortName: "NHM",
    category: "Healthcare",
    description: "Providing accessible, affordable, and quality healthcare to rural and urban poor",
    benefits: [
      "Free essential drugs and diagnostics",
      "Skilled birth attendance",
      "Treatment of communicable diseases",
      "Emergency medical care",
    ],
    eligibility: "All citizens, especially rural and urban poor",
    coverage: "Comprehensive healthcare services",
    beneficiaries: "All citizens",
    applicationProcess: "Visit nearest health facility",
    documents: ["Aadhaar Card", "Any ID Proof"],
    contactInfo: {
      helpline: "104",
      website: "https://nhm.gov.in",
      email: "nhm@gov.in",
    },
    status: "Active",
    launchDate: "2013",
    ministry: "Ministry of Health and Family Welfare",
    icon: Stethoscope,
    color: "text-primary",
  },
  {
    id: 5,
    name: "Pradhan Mantri Awas Yojana - Gramin",
    shortName: "PMAY-G",
    category: "Housing",
    description: "Providing pucca houses with basic amenities to rural homeless and inadequate housing",
    benefits: [
      "Financial assistance for house construction",
      "Technical support for construction",
      "Convergence with other schemes",
      "Geo-tagging and monitoring",
    ],
    eligibility: "Homeless and inadequately housed rural families",
    coverage: "₹1.20 lakh (Plain areas), ₹1.30 lakh (Hilly areas)",
    beneficiaries: "2.95 crore rural families",
    applicationProcess: "Apply through Gram Panchayat or online",
    documents: ["Aadhaar Card", "Job Card", "Bank Account Details"],
    contactInfo: {
      helpline: "1800-11-6446",
      website: "https://pmayg.nic.in",
      email: "pmayg@gov.in",
    },
    status: "Active",
    launchDate: "2016",
    ministry: "Ministry of Rural Development",
    icon: Home,
    color: "text-warning",
  },
  {
    id: 6,
    name: "Mahatma Gandhi National Rural Employment Guarantee Act",
    shortName: "MGNREGA",
    category: "Employment",
    description: "Guaranteeing 100 days of wage employment to rural households",
    benefits: [
      "Guaranteed 100 days of employment",
      "Minimum wage payment",
      "Work within 5 km of residence",
      "Unemployment allowance if work not provided",
    ],
    eligibility: "Adult members of rural households",
    coverage: "100 days of employment per household",
    beneficiaries: "13.82 crore households",
    applicationProcess: "Apply at Gram Panchayat with job card",
    documents: ["Aadhaar Card", "Residence Proof", "Passport Size Photo"],
    contactInfo: {
      helpline: "1800-345-22-44",
      website: "https://nrega.nic.in",
      email: "nrega@nic.in",
    },
    status: "Active",
    launchDate: "2005",
    ministry: "Ministry of Rural Development",
    icon: Briefcase,
    color: "text-accent",
  },
]

const categories = ["All", "Healthcare", "Water & Sanitation", "Sanitation", "Housing", "Employment"]

const states = ["Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura", "Sikkim"]

const applicationSteps = [
  {
    step: 1,
    title: "Check Eligibility",
    description: "Verify if you meet the scheme requirements",
    icon: CheckCircle,
  },
  {
    step: 2,
    title: "Gather Documents",
    description: "Collect all required documents and certificates",
    icon: FileText,
  },
  {
    step: 3,
    title: "Submit Application",
    description: "Apply online or visit nearest government office",
    icon: Building2,
  },
  {
    step: 4,
    title: "Track Status",
    description: "Monitor your application progress online",
    icon: Clock,
  },
]

export default function GovernmentSchemes() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedState, setSelectedState] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedScheme, setSelectedScheme] = useState(null)

  const filteredSchemes = governmentSchemes.filter((scheme) => {
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-effect hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary animate-pulse-health" />
            Government Schemes & Benefits
          </CardTitle>
          <CardDescription>
            Comprehensive information about government health and welfare schemes available in Northeast India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Active Schemes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">₹2.5L Cr</div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">45 Cr</div>
              <div className="text-sm text-muted-foreground">Beneficiaries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">8</div>
              <div className="text-sm text-muted-foreground">NE States Covered</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="schemes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-effect">
          <TabsTrigger value="schemes">Browse Schemes</TabsTrigger>
          <TabsTrigger value="application">How to Apply</TabsTrigger>
          <TabsTrigger value="benefits">Benefits Calculator</TabsTrigger>
          <TabsTrigger value="contact">Contact & Support</TabsTrigger>
        </TabsList>

        <TabsContent value="schemes" className="space-y-6">
          {/* Search and Filters */}
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search">Search Schemes</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or description..."
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
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schemes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => {
              const Icon = scheme.icon
              return (
                <Card key={scheme.id} className="glass-effect hover-lift">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className={`w-6 h-6 ${scheme.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-balance">{scheme.shortName}</CardTitle>
                          <Badge variant="outline">{scheme.category}</Badge>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">{scheme.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground text-pretty">{scheme.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Coverage:</span>
                        <span className="text-primary">{scheme.coverage}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Beneficiaries:</span>
                        <span className="text-success">{scheme.beneficiaries}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Launch Year:</span>
                        <span className="text-muted-foreground">{scheme.launchDate}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Key Benefits:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {scheme.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" onClick={() => setSelectedScheme(scheme)} className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Scheme Details Modal */}
          {selectedScheme && (
            <Card className="glass-effect border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <selectedScheme.icon className={`w-6 h-6 ${selectedScheme.color}`} />
                    {selectedScheme.name}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setSelectedScheme(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                      <p className="text-sm text-muted-foreground">{selectedScheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Required Documents</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {selectedScheme.documents.map((doc, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Application Process</h4>
                      <p className="text-sm text-muted-foreground">{selectedScheme.applicationProcess}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">All Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {selectedScheme.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>Helpline: {selectedScheme.contactInfo.helpline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-accent" />
                          <a href={selectedScheme.contactInfo.website} className="text-accent hover:underline">
                            {selectedScheme.contactInfo.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedScheme.ministry}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="application" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle>How to Apply for Government Schemes</CardTitle>
              <CardDescription>Step-by-step guide to apply for various government schemes and benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {applicationSteps.map((step) => {
                  const Icon = step.icon
                  return (
                    <div key={step.step} className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          Step {step.step}: {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground text-pretty">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Common Documents Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Aadhaar Card (Mandatory for most schemes)",
                    "Ration Card / BPL Card",
                    "Bank Account Details",
                    "Income Certificate",
                    "Residence Proof",
                    "Caste Certificate (if applicable)",
                    "Passport Size Photographs",
                    "Mobile Number for OTP verification",
                  ].map((doc, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Where to Apply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Online Portals</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Digital India Portal</li>
                      <li>• State Government Websites</li>
                      <li>• Scheme-specific Portals</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Physical Locations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Common Service Centers (CSC)</li>
                      <li>• Block Development Offices</li>
                      <li>• Gram Panchayat Offices</li>
                      <li>• District Collector Offices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-success" />
                Benefits Calculator
              </CardTitle>
              <CardDescription>
                Calculate potential benefits you may be eligible for based on your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="family-size">Family Size</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select family size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 members</SelectItem>
                      <SelectItem value="3-4">3-4 members</SelectItem>
                      <SelectItem value="5-6">5-6 members</SelectItem>
                      <SelectItem value="7+">7+ members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-1">Below ₹1 lakh</SelectItem>
                      <SelectItem value="1-2">₹1-2 lakh</SelectItem>
                      <SelectItem value="2-5">₹2-5 lakh</SelectItem>
                      <SelectItem value="above-5">Above ₹5 lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rural">Rural</SelectItem>
                      <SelectItem value="urban">Urban</SelectItem>
                      <SelectItem value="tribal">Tribal Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full">Calculate Benefits</Button>

              <Alert className="border-success/50 bg-success/10">
                <IndianRupee className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Estimated Benefits</AlertTitle>
                <AlertDescription>
                  Based on your profile, you may be eligible for benefits worth ₹2,50,000 annually across various
                  schemes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Helpline Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "PM-JAY Helpline", number: "14555", available: "24x7" },
                  { name: "Jal Jeevan Mission", number: "1800-11-0016", available: "9 AM - 6 PM" },
                  { name: "Swachh Bharat Mission", number: "1800-11-0001", available: "9 AM - 6 PM" },
                  { name: "MGNREGA Helpline", number: "1800-345-22-44", available: "9 AM - 6 PM" },
                  { name: "National Health Mission", number: "104", available: "24x7" },
                ].map((helpline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{helpline.name}</h4>
                      <p className="text-sm text-muted-foreground">{helpline.available}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-lg text-primary">{helpline.number}</p>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  Regional Offices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {states.slice(0, 4).map((state, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{state}</h4>
                    <p className="text-sm text-muted-foreground">District Collector Office, {state}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <MapPin className="w-4 h-4 mr-1" />
                        Location
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    question: "How do I check if I'm eligible for PM-JAY?",
                    answer:
                      "Visit the PM-JAY website or call 14555 to check your eligibility using your mobile number or ration card details.",
                  },
                  {
                    question: "What documents are required for Jal Jeevan Mission?",
                    answer:
                      "You need Aadhaar card, residence proof, and bank account details to apply for household tap connection.",
                  },
                  {
                    question: "How long does it take to get MGNREGA job card?",
                    answer: "Job cards are issued within 15 days of application at the Gram Panchayat office.",
                  },
                  {
                    question: "Can I apply for multiple schemes simultaneously?",
                    answer:
                      "Yes, you can apply for multiple schemes if you meet the eligibility criteria for each scheme.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground text-pretty">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
