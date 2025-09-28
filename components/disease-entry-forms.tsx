"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  FileText,
  User,
  MapPin,
  CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  Upload,
  Phone,
  Activity,
  Droplets,
  Loader2,
  Save,
  Send,
  Plus,
  Minus,
  Info,
} from "lucide-react"

interface DiseaseEntryFormsProps {
  user: any
}

export default function DiseaseEntryForms({ user }: DiseaseEntryFormsProps) {
  const [activeForm, setActiveForm] = useState("individual")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formErrors, setFormErrors] = useState<string[]>([])

  // Individual Case Form State
  const [individualForm, setIndividualForm] = useState({
    // Patient Information
    patientName: "",
    age: "",
    gender: "",
    contactNumber: "",
    guardianName: "",
    guardianContact: "",

    // Location Information
    village: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
    gpsCoordinates: "",

    // Disease Information
    diseaseType: "",
    symptoms: [] as string[],
    onsetDate: null as Date | null,
    severity: "",
    currentStatus: "",

    // Medical History
    previousIllness: "",
    medications: "",
    allergies: "",
    vaccination: "",

    // Environmental Factors
    waterSource: "",
    sanitationAccess: "",
    recentTravel: "",
    contactWithPatients: "",

    // Reporter Information
    reporterName: user?.name || "",
    reporterRole: user?.type || "",
    reporterContact: "",
    reportingDate: new Date(),

    // Additional Information
    notes: "",
    urgencyLevel: "medium",
    followUpRequired: false,
    attachments: [] as File[],
  })

  // Outbreak Form State
  const [outbreakForm, setOutbreakForm] = useState({
    outbreakType: "",
    affectedArea: "",
    totalCases: "",
    confirmedCases: "",
    suspectedCases: "",
    deaths: "",
    recoveries: "",
    onsetDate: null as Date | null,
    reportingDate: new Date(),
    sourceOfInfection: "",
    transmissionMode: "",
    controlMeasures: "",
    resourcesNeeded: "",
    urgencyLevel: "high",
    reporterName: user?.name || "",
    reporterRole: user?.type || "",
    notes: "",
  })

  const diseases = [
    "Cholera",
    "Typhoid",
    "Hepatitis A",
    "Hepatitis E",
    "Diarrhea",
    "Dysentery",
    "Gastroenteritis",
    "Malaria",
    "Dengue",
    "Chikungunya",
    "Japanese Encephalitis",
    "Tuberculosis",
    "COVID-19",
    "Influenza",
    "Other",
  ]

  const symptoms = [
    "Fever",
    "Vomiting",
    "Diarrhea",
    "Nausea",
    "Abdominal Pain",
    "Headache",
    "Body Ache",
    "Weakness",
    "Dehydration",
    "Rash",
    "Cough",
    "Difficulty Breathing",
    "Joint Pain",
    "Loss of Appetite",
    "Other",
  ]

  const states = ["Assam", "Arunachal Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"]

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setIndividualForm((prev) => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptom] : prev.symptoms.filter((s) => s !== symptom),
    }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setIndividualForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }))
    }
  }

  const removeAttachment = (index: number) => {
    setIndividualForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const validateIndividualForm = () => {
    const errors: string[] = []

    if (!individualForm.patientName) errors.push("Patient name is required")
    if (!individualForm.age) errors.push("Patient age is required")
    if (!individualForm.gender) errors.push("Patient gender is required")
    if (!individualForm.village) errors.push("Village/Location is required")
    if (!individualForm.district) errors.push("District is required")
    if (!individualForm.state) errors.push("State is required")
    if (!individualForm.diseaseType) errors.push("Disease type is required")
    if (individualForm.symptoms.length === 0) errors.push("At least one symptom is required")
    if (!individualForm.onsetDate) errors.push("Onset date is required")
    if (!individualForm.severity) errors.push("Severity level is required")

    return errors
  }

  const validateOutbreakForm = () => {
    const errors: string[] = []

    if (!outbreakForm.outbreakType) errors.push("Outbreak type is required")
    if (!outbreakForm.affectedArea) errors.push("Affected area is required")
    if (!outbreakForm.totalCases) errors.push("Total cases is required")
    if (!outbreakForm.onsetDate) errors.push("Onset date is required")
    if (!outbreakForm.sourceOfInfection) errors.push("Source of infection is required")

    return errors
  }

  const handleSubmit = async (formType: string) => {
    setIsSubmitting(true)
    setFormErrors([])

    const errors = formType === "individual" ? validateIndividualForm() : validateOutbreakForm()

    if (errors.length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitSuccess(true)

      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false)
        if (formType === "individual") {
          setIndividualForm({
            ...individualForm,
            patientName: "",
            age: "",
            gender: "",
            contactNumber: "",
            guardianName: "",
            guardianContact: "",
            village: "",
            district: "",
            state: "",
            pincode: "",
            landmark: "",
            gpsCoordinates: "",
            diseaseType: "",
            symptoms: [],
            onsetDate: null,
            severity: "",
            currentStatus: "",
            previousIllness: "",
            medications: "",
            allergies: "",
            vaccination: "",
            waterSource: "",
            sanitationAccess: "",
            recentTravel: "",
            contactWithPatients: "",
            notes: "",
            urgencyLevel: "medium",
            followUpRequired: false,
            attachments: [],
          })
        }
      }, 3000)
    } catch (error) {
      setFormErrors(["Submission failed. Please try again."])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary animate-pulse-health" />
            Disease Reporting System
          </h2>
          <p className="text-muted-foreground">Report individual cases or disease outbreaks for immediate response</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Reporter: {user?.name} ({user?.type?.replace("_", " ")})
        </Badge>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <Alert className="border-success/50 bg-success/10 animate-pulse-health">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertTitle className="text-success">Report Submitted Successfully!</AlertTitle>
          <AlertDescription>
            Your disease report has been submitted and will be reviewed by health authorities immediately. Case ID: #
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Messages */}
      {formErrors.length > 0 && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">Please fix the following errors:</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1 mt-2">
              {formErrors.map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Form Tabs */}
      <Tabs value={activeForm} onValueChange={setActiveForm} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-effect">
          <TabsTrigger value="individual">Individual Case</TabsTrigger>
          <TabsTrigger value="outbreak">Disease Outbreak</TabsTrigger>
          <TabsTrigger value="followup">Follow-up Report</TabsTrigger>
        </TabsList>

        {/* Individual Case Form */}
        <TabsContent value="individual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Patient Information */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Patient Information
                </CardTitle>
                <CardDescription>Basic details about the patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Full Name *</Label>
                    <Input
                      id="patient-name"
                      placeholder="Enter patient's full name"
                      value={individualForm.patientName}
                      onChange={(e) => setIndividualForm({ ...individualForm, patientName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-age">Age *</Label>
                    <Input
                      id="patient-age"
                      type="number"
                      placeholder="Age in years"
                      value={individualForm.age}
                      onChange={(e) => setIndividualForm({ ...individualForm, age: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={individualForm.gender}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, gender: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-number">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="contact-number"
                        placeholder="+91 XXXXX XXXXX"
                        className="pl-10"
                        value={individualForm.contactNumber}
                        onChange={(e) => setIndividualForm({ ...individualForm, contactNumber: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardian-name">Guardian Name</Label>
                    <Input
                      id="guardian-name"
                      placeholder="Parent/Guardian name"
                      value={individualForm.guardianName}
                      onChange={(e) => setIndividualForm({ ...individualForm, guardianName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardian-contact">Guardian Contact</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="guardian-contact"
                      placeholder="+91 XXXXX XXXXX"
                      className="pl-10"
                      value={individualForm.guardianContact}
                      onChange={(e) => setIndividualForm({ ...individualForm, guardianContact: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  Location Information
                </CardTitle>
                <CardDescription>Patient's address and location details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/Town *</Label>
                    <Input
                      id="village"
                      placeholder="Village or town name"
                      value={individualForm.village}
                      onChange={(e) => setIndividualForm({ ...individualForm, village: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      placeholder="District name"
                      value={individualForm.district}
                      onChange={(e) => setIndividualForm({ ...individualForm, district: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={individualForm.state}
                      onValueChange={(value) => setIndividualForm({ ...individualForm, state: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input
                      id="pincode"
                      placeholder="6-digit PIN code"
                      value={individualForm.pincode}
                      onChange={(e) => setIndividualForm({ ...individualForm, pincode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    placeholder="Nearby landmark or reference point"
                    value={individualForm.landmark}
                    onChange={(e) => setIndividualForm({ ...individualForm, landmark: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gps">GPS Coordinates (Optional)</Label>
                  <Input
                    id="gps"
                    placeholder="Latitude, Longitude"
                    value={individualForm.gpsCoordinates}
                    onChange={(e) => setIndividualForm({ ...individualForm, gpsCoordinates: e.target.value })}
                  />
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Current Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Disease Information */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-destructive" />
                  Disease Information
                </CardTitle>
                <CardDescription>Details about the disease and symptoms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="disease-type">Disease Type *</Label>
                  <Select
                    value={individualForm.diseaseType}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, diseaseType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select disease type" />
                    </SelectTrigger>
                    <SelectContent>
                      {diseases.map((disease) => (
                        <SelectItem key={disease} value={disease}>
                          {disease}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Symptoms *</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {symptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={individualForm.symptoms.includes(symptom)}
                          onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                        />
                        <Label htmlFor={symptom} className="text-sm">
                          {symptom}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Onset Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {individualForm.onsetDate ? format(individualForm.onsetDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={individualForm.onsetDate || undefined}
                          onSelect={(date) => setIndividualForm({ ...individualForm, onsetDate: date || null })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="severity">Severity *</Label>
                    <Select
                      value={individualForm.severity}
                      onValueChange={(value) => setIndividualForm({ ...individualForm, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-status">Current Status</Label>
                  <Select
                    value={individualForm.currentStatus}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, currentStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_treatment">Under Treatment</SelectItem>
                      <SelectItem value="hospitalized">Hospitalized</SelectItem>
                      <SelectItem value="recovered">Recovered</SelectItem>
                      <SelectItem value="deceased">Deceased</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card className="glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-accent" />
                  Environmental Factors
                </CardTitle>
                <CardDescription>Water source and sanitation details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="water-source">Water Source</Label>
                  <Select
                    value={individualForm.waterSource}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, waterSource: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piped_water">Piped Water</SelectItem>
                      <SelectItem value="tube_well">Tube Well</SelectItem>
                      <SelectItem value="hand_pump">Hand Pump</SelectItem>
                      <SelectItem value="well">Open Well</SelectItem>
                      <SelectItem value="river_stream">River/Stream</SelectItem>
                      <SelectItem value="pond_lake">Pond/Lake</SelectItem>
                      <SelectItem value="bottled_water">Bottled Water</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sanitation">Sanitation Access</Label>
                  <Select
                    value={individualForm.sanitationAccess}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, sanitationAccess: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sanitation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flush_toilet">Flush Toilet</SelectItem>
                      <SelectItem value="pit_latrine">Pit Latrine</SelectItem>
                      <SelectItem value="shared_facility">Shared Facility</SelectItem>
                      <SelectItem value="open_defecation">Open Defecation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recent-travel">Recent Travel</Label>
                  <Textarea
                    id="recent-travel"
                    placeholder="Any recent travel history (places visited in last 2 weeks)"
                    value={individualForm.recentTravel}
                    onChange={(e) => setIndividualForm({ ...individualForm, recentTravel: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-patients">Contact with Other Patients</Label>
                  <Textarea
                    id="contact-patients"
                    placeholder="Any contact with other sick individuals"
                    value={individualForm.contactWithPatients}
                    onChange={(e) => setIndividualForm({ ...individualForm, contactWithPatients: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="lg:col-span-2 glass-effect hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Additional Information
                </CardTitle>
                <CardDescription>Medical history, attachments, and other details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previous-illness">Previous Illness</Label>
                    <Textarea
                      id="previous-illness"
                      placeholder="Any previous medical conditions or illnesses"
                      value={individualForm.previousIllness}
                      onChange={(e) => setIndividualForm({ ...individualForm, previousIllness: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List of current medications"
                      value={individualForm.medications}
                      onChange={(e) => setIndividualForm({ ...individualForm, medications: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="Any known allergies"
                      value={individualForm.allergies}
                      onChange={(e) => setIndividualForm({ ...individualForm, allergies: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vaccination">Vaccination History</Label>
                    <Textarea
                      id="vaccination"
                      placeholder="Recent vaccinations received"
                      value={individualForm.vaccination}
                      onChange={(e) => setIndividualForm({ ...individualForm, vaccination: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information or observations"
                    value={individualForm.notes}
                    onChange={(e) => setIndividualForm({ ...individualForm, notes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <RadioGroup
                    value={individualForm.urgencyLevel}
                    onValueChange={(value) => setIndividualForm({ ...individualForm, urgencyLevel: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="critical" />
                      <Label htmlFor="critical">Critical</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="follow-up"
                    checked={individualForm.followUpRequired}
                    onCheckedChange={(checked) =>
                      setIndividualForm({ ...individualForm, followUpRequired: checked as boolean })
                    }
                  />
                  <Label htmlFor="follow-up">Follow-up required</Label>
                </div>

                {/* File Attachments */}
                <div className="space-y-2">
                  <Label>Attachments (Photos, Documents)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload files or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">Images, PDF, DOC files (Max 10MB each)</p>
                    </label>
                  </div>

                  {individualForm.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files:</Label>
                      {individualForm.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" disabled={isSubmitting}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSubmit("individual")} disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        {/* Outbreak Form */}
        <TabsContent value="outbreak" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive animate-pulse-health" />
                Disease Outbreak Report
              </CardTitle>
              <CardDescription>Report multiple cases or disease outbreak in a community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="outbreak-type">Outbreak Type *</Label>
                    <Select
                      value={outbreakForm.outbreakType}
                      onValueChange={(value) => setOutbreakForm({ ...outbreakForm, outbreakType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select outbreak type" />
                      </SelectTrigger>
                      <SelectContent>
                        {diseases.map((disease) => (
                          <SelectItem key={disease} value={disease}>
                            {disease}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="affected-area">Affected Area *</Label>
                    <Input
                      id="affected-area"
                      placeholder="Village/District/Region affected"
                      value={outbreakForm.affectedArea}
                      onChange={(e) => setOutbreakForm({ ...outbreakForm, affectedArea: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="total-cases">Total Cases *</Label>
                      <Input
                        id="total-cases"
                        type="number"
                        placeholder="Total number of cases"
                        value={outbreakForm.totalCases}
                        onChange={(e) => setOutbreakForm({ ...outbreakForm, totalCases: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmed-cases">Confirmed Cases</Label>
                      <Input
                        id="confirmed-cases"
                        type="number"
                        placeholder="Laboratory confirmed"
                        value={outbreakForm.confirmedCases}
                        onChange={(e) => setOutbreakForm({ ...outbreakForm, confirmedCases: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="suspected-cases">Suspected Cases</Label>
                      <Input
                        id="suspected-cases"
                        type="number"
                        placeholder="Suspected"
                        value={outbreakForm.suspectedCases}
                        onChange={(e) => setOutbreakForm({ ...outbreakForm, suspectedCases: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deaths">Deaths</Label>
                      <Input
                        id="deaths"
                        type="number"
                        placeholder="Deaths"
                        value={outbreakForm.deaths}
                        onChange={(e) => setOutbreakForm({ ...outbreakForm, deaths: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recoveries">Recoveries</Label>
                      <Input
                        id="recoveries"
                        type="number"
                        placeholder="Recovered"
                        value={outbreakForm.recoveries}
                        onChange={(e) => setOutbreakForm({ ...outbreakForm, recoveries: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Outbreak Onset Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {outbreakForm.onsetDate ? format(outbreakForm.onsetDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={outbreakForm.onsetDate || undefined}
                          onSelect={(date) => setOutbreakForm({ ...outbreakForm, onsetDate: date || null })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source-infection">Source of Infection *</Label>
                    <Textarea
                      id="source-infection"
                      placeholder="Suspected source of infection (water source, food, etc.)"
                      value={outbreakForm.sourceOfInfection}
                      onChange={(e) => setOutbreakForm({ ...outbreakForm, sourceOfInfection: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transmission-mode">Transmission Mode</Label>
                    <Select
                      value={outbreakForm.transmissionMode}
                      onValueChange={(value) => setOutbreakForm({ ...outbreakForm, transmissionMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="waterborne">Waterborne</SelectItem>
                        <SelectItem value="foodborne">Foodborne</SelectItem>
                        <SelectItem value="airborne">Airborne</SelectItem>
                        <SelectItem value="vector_borne">Vector-borne</SelectItem>
                        <SelectItem value="person_to_person">Person-to-person</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="control-measures">Control Measures Taken</Label>
                    <Textarea
                      id="control-measures"
                      placeholder="Describe control measures already implemented"
                      value={outbreakForm.controlMeasures}
                      onChange={(e) => setOutbreakForm({ ...outbreakForm, controlMeasures: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resources-needed">Resources Needed</Label>
                  <Textarea
                    id="resources-needed"
                    placeholder="List of resources, supplies, or support needed"
                    value={outbreakForm.resourcesNeeded}
                    onChange={(e) => setOutbreakForm({ ...outbreakForm, resourcesNeeded: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outbreak-notes">Additional Notes</Label>
                  <Textarea
                    id="outbreak-notes"
                    placeholder="Any additional information about the outbreak"
                    value={outbreakForm.notes}
                    onChange={(e) => setOutbreakForm({ ...outbreakForm, notes: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Urgency Level</Label>
                  <RadioGroup
                    value={outbreakForm.urgencyLevel}
                    onValueChange={(value) => setOutbreakForm({ ...outbreakForm, urgencyLevel: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="outbreak-medium" />
                      <Label htmlFor="outbreak-medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="outbreak-high" />
                      <Label htmlFor="outbreak-high">High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="outbreak-critical" />
                      <Label htmlFor="outbreak-critical">Critical</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={() => handleSubmit("outbreak")} disabled={isSubmitting} className="min-w-32">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Outbreak Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Follow-up Form */}
        <TabsContent value="followup" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Follow-up Report
              </CardTitle>
              <CardDescription>Update on previously reported cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Follow-up Form</h3>
                <p className="text-muted-foreground mb-4">
                  This feature allows you to update the status of previously reported cases.
                </p>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Follow-up Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
