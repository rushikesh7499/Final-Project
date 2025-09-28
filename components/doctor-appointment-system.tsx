"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Video,
  MapPin,
  Star,
  Filter,
  Search,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  location: string
  avatar: string
  availability: string[]
  consultationFee: number
  languages: string[]
  nextAvailable: string
}

interface Appointment {
  id: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  type: "video" | "phone" | "in-person"
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  reason: string
  notes?: string
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialization: "Infectious Disease Specialist",
    experience: 12,
    rating: 4.8,
    location: "Guwahati Medical College",
    avatar: "/placeholder.svg?height=60&width=60",
    availability: ["Mon", "Wed", "Fri"],
    consultationFee: 500,
    languages: ["English", "Hindi", "Assamese"],
    nextAvailable: "2024-01-15 10:00",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialization: "Public Health Expert",
    experience: 15,
    rating: 4.9,
    location: "NEIGRIHMS, Shillong",
    avatar: "/placeholder.svg?height=60&width=60",
    availability: ["Tue", "Thu", "Sat"],
    consultationFee: 600,
    languages: ["English", "Hindi", "Bengali"],
    nextAvailable: "2024-01-16 14:30",
  },
  {
    id: "3",
    name: "Dr. Anita Devi",
    specialization: "Community Medicine",
    experience: 8,
    rating: 4.7,
    location: "Agartala Government Medical College",
    avatar: "/placeholder.svg?height=60&width=60",
    availability: ["Mon", "Tue", "Thu"],
    consultationFee: 400,
    languages: ["English", "Hindi", "Tripuri"],
    nextAvailable: "2024-01-17 09:15",
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Priya Sharma",
    date: "2024-01-20",
    time: "10:00",
    type: "video",
    status: "scheduled",
    reason: "Water-borne disease consultation",
    notes: "Patient experiencing symptoms for 3 days",
  },
  {
    id: "2",
    doctorId: "2",
    doctorName: "Dr. Rajesh Kumar",
    date: "2024-01-18",
    time: "14:30",
    type: "phone",
    status: "completed",
    reason: "Follow-up consultation",
    notes: "Treatment response positive",
  },
]

export default function DoctorAppointmentSystem() {
  const [activeTab, setActiveTab] = useState<"book" | "appointments" | "doctors">("book")
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("")
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    type: "video" as "video" | "phone" | "in-person",
    reason: "",
    notes: "",
  })

  const filteredDoctors = doctors
    .filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((doctor) => !filterSpecialization || doctor.specialization.includes(filterSpecialization))

  const handleBookAppointment = () => {
    if (!selectedDoctor) return

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: bookingForm.date,
      time: bookingForm.time,
      type: bookingForm.type,
      status: "scheduled",
      reason: bookingForm.reason,
      notes: bookingForm.notes,
    }

    setAppointments([...appointments, newAppointment])
    setBookingForm({ date: "", time: "", type: "video", reason: "", notes: "" })
    setSelectedDoctor(null)
    setActiveTab("appointments")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      case "rescheduled":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "rescheduled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Doctor Appointments</h2>
          <p className="text-blue-200">Book consultations with healthcare experts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "book" ? "default" : "outline"}
            onClick={() => setActiveTab("book")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Appointment
          </Button>
          <Button
            variant={activeTab === "appointments" ? "default" : "outline"}
            onClick={() => setActiveTab("appointments")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            My Appointments
          </Button>
          <Button
            variant={activeTab === "doctors" ? "default" : "outline"}
            onClick={() => setActiveTab("doctors")}
            className="bg-green-600 hover:bg-green-700"
          >
            Find Doctors
          </Button>
        </div>
      </div>

      {/* Book Appointment Tab */}
      {activeTab === "book" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Select Doctor
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-white/30 bg-transparent">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedDoctor?.id === doctor.id
                      ? "border-blue-400 bg-blue-500/20"
                      : "border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{doctor.name}</h3>
                      <p className="text-blue-200 text-sm">{doctor.specialization}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-300">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {doctor.rating}
                        </span>
                        <span>{doctor.experience} years</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {doctor.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          ₹{doctor.consultationFee}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                          Available {doctor.nextAvailable}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Book Appointment
              </CardTitle>
              {selectedDoctor && (
                <CardDescription className="text-blue-200">Booking with {selectedDoctor.name}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedDoctor ? (
                <div className="text-center py-8 text-gray-400">Please select a doctor to book an appointment</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-white">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="bg-white/20 border-white/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="bg-white/20 border-white/30 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Consultation Type</Label>
                    <div className="flex gap-2 mt-2">
                      {[
                        { value: "video", label: "Video Call", icon: Video },
                        { value: "phone", label: "Phone Call", icon: Phone },
                        { value: "in-person", label: "In-Person", icon: User },
                      ].map(({ value, label, icon: Icon }) => (
                        <Button
                          key={value}
                          variant={bookingForm.type === value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setBookingForm({ ...bookingForm, type: value as any })}
                          className="flex items-center gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reason" className="text-white">
                      Reason for Visit
                    </Label>
                    <Input
                      id="reason"
                      placeholder="e.g., Water-borne disease symptoms"
                      value={bookingForm.reason}
                      onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-white">
                      Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional information..."
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleBookAppointment}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={!bookingForm.date || !bookingForm.time || !bookingForm.reason}
                  >
                    Book Appointment
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* My Appointments Tab */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Your Appointments</h3>
            <Button variant="outline" size="sm" className="border-white/30 bg-transparent">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </div>

          {appointments.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-400">No appointments scheduled</p>
                <Button onClick={() => setActiveTab("book")} className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Book Your First Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{appointment.doctorName}</h4>
                          <p className="text-blue-200">{appointment.reason}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {appointment.time}
                            </span>
                            <Badge variant="outline" className="capitalize">
                              {appointment.type}
                            </Badge>
                          </div>
                          {appointment.notes && <p className="text-sm text-gray-400 mt-2">{appointment.notes}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "scheduled" && (
                          <>
                            <Button size="sm" variant="outline" className="border-white/30 bg-transparent">
                              Reschedule
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Join Call
                            </Button>
                          </>
                        )}
                        <Badge className={`${getStatusColor(appointment.status)} text-white capitalize`}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Find Doctors Tab */}
      {activeTab === "doctors" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
            </div>
            <Button variant="outline" className="border-white/30 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{doctor.name}</h3>
                      <p className="text-blue-200 text-sm">{doctor.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {doctor.rating} ({doctor.experience} years)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Consultation Fee</span>
                      <Badge variant="secondary">₹{doctor.consultationFee}</Badge>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs border-white/30">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/20">
                      <p className="text-xs text-green-400 mb-3">Next Available: {doctor.nextAvailable}</p>
                      <Button
                        onClick={() => {
                          setSelectedDoctor(doctor)
                          setActiveTab("book")
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
