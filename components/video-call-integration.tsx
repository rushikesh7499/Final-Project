"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Calendar,
  Clock,
  AlertTriangle,
  Loader2,
  Send,
  FileText,
  Monitor,
  Maximize,
  Minimize,
  CreditCard as Record,
} from "lucide-react"

interface VideoCallIntegrationProps {
  user: any
}

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  rating: number
  availability: "available" | "busy" | "offline"
  avatar: string
  languages: string[]
  location: string
}

interface CallSession {
  id: string
  doctorId: string
  doctorName: string
  startTime: Date
  duration: number
  status: "connecting" | "active" | "ended"
  type: "consultation" | "emergency" | "followup"
}

export default function VideoCallIntegration({ user }: VideoCallIntegrationProps) {
  const [activeCall, setActiveCall] = useState<CallSession | null>(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [callMessages, setCallMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [consultationType, setConsultationType] = useState<"consultation" | "emergency" | "followup">("consultation")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  // Mock doctors data
  const availableDoctors: Doctor[] = [
    {
      id: "doc1",
      name: "Dr. Priya Sharma",
      specialty: "General Medicine",
      experience: "8 years",
      rating: 4.8,
      availability: "available",
      avatar: "/caring-doctor.png",
      languages: ["English", "Hindi", "Assamese"],
      location: "Guwahati, Assam",
    },
    {
      id: "doc2",
      name: "Dr. Rajesh Kumar",
      specialty: "Infectious Diseases",
      experience: "12 years",
      rating: 4.9,
      availability: "available",
      avatar: "/caring-doctor.png",
      languages: ["English", "Hindi", "Bengali"],
      location: "Imphal, Manipur",
    },
    {
      id: "doc3",
      name: "Dr. Sarah Lalrinnunga",
      specialty: "Public Health",
      experience: "6 years",
      rating: 4.7,
      availability: "busy",
      avatar: "/caring-doctor.png",
      languages: ["English", "Mizo", "Hindi"],
      location: "Aizawl, Mizoram",
    },
    {
      id: "doc4",
      name: "Dr. Kiran Devi",
      specialty: "Emergency Medicine",
      experience: "10 years",
      rating: 4.9,
      availability: "available",
      avatar: "/caring-doctor.png",
      languages: ["English", "Hindi", "Manipuri"],
      location: "Kohima, Nagaland",
    },
  ]

  // Initialize camera and microphone
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        localStreamRef.current = stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing media devices:", error)
      }
    }

    initializeMedia()

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startCall = async (doctor: Doctor, type: "consultation" | "emergency" | "followup") => {
    const callSession: CallSession = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      startTime: new Date(),
      duration: 0,
      status: "connecting",
      type,
    }

    setActiveCall(callSession)
    setSelectedDoctor(doctor)

    // Simulate connection process
    setTimeout(() => {
      setActiveCall((prev) => (prev ? { ...prev, status: "active" } : null))
    }, 3000)

    // Start call timer
    const timer = setInterval(() => {
      setActiveCall((prev) => {
        if (prev && prev.status === "active") {
          return { ...prev, duration: prev.duration + 1 }
        }
        return prev
      })
    }, 1000)

    // Store timer reference for cleanup
    ;(callSession as any).timer = timer
  }

  const endCall = () => {
    if (activeCall && (activeCall as any).timer) {
      clearInterval((activeCall as any).timer)
    }

    setActiveCall((prev) => (prev ? { ...prev, status: "ended" } : null))

    setTimeout(() => {
      setActiveCall(null)
      setSelectedDoctor(null)
      setCallMessages([])
      setIsVideoEnabled(true)
      setIsAudioEnabled(true)
      setIsScreenSharing(false)
      setIsRecording(false)
    }, 2000)
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled
      }
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled
      }
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
        // Replace video track with screen share
        setIsScreenSharing(true)
      } else {
        // Switch back to camera
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = cameraStream
        }
        setIsScreenSharing(false)
      }
    } catch (error) {
      console.error("Error with screen sharing:", error)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: user.name,
        content: newMessage,
        timestamp: new Date(),
        type: "user",
      }
      setCallMessages((prev) => [...prev, message])
      setNewMessage("")

      // Simulate doctor response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          sender: selectedDoctor?.name || "Doctor",
          content: "Thank you for the information. I'll review this during our consultation.",
          timestamp: new Date(),
          type: "doctor",
        }
        setCallMessages((prev) => [...prev, response])
      }, 2000)
    }
  }

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "text-success"
      case "busy":
        return "text-warning"
      case "offline":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "available":
        return "default"
      case "busy":
        return "secondary"
      case "offline":
        return "outline"
      default:
        return "outline"
    }
  }

  if (activeCall) {
    return (
      <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""} space-y-4`}>
        {/* Call Header */}
        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={selectedDoctor?.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {selectedDoctor?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedDoctor?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedDoctor?.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={activeCall.status === "active" ? "default" : "secondary"}>
              {activeCall.status === "connecting"
                ? "Connecting..."
                : activeCall.status === "active"
                  ? `Active - ${formatCallDuration(activeCall.duration)}`
                  : "Call Ended"}
            </Badge>

            <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Video */}
            <Card className="relative overflow-hidden bg-black">
              <CardContent className="p-0 aspect-video">
                {activeCall.status === "connecting" ? (
                  <div className="flex items-center justify-center h-full bg-muted">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-medium">Connecting to {selectedDoctor?.name}...</p>
                      <p className="text-sm text-muted-foreground">Please wait while we establish the connection</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    {/* Remote video (doctor) */}
                    <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />

                    {/* Local video (user) - Picture in Picture */}
                    <div className="absolute top-4 right-4 w-48 h-36 bg-muted rounded-lg overflow-hidden border-2 border-white">
                      <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                      {!isVideoEnabled && (
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                          <VideoOff className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Call Status Overlay */}
                    {activeCall.status === "active" && (
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {formatCallDuration(activeCall.duration)}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Call Controls */}
            <div className="flex items-center justify-center gap-4 p-4 bg-card rounded-lg">
              <Button
                variant={isVideoEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleVideo}
                className="rounded-full w-12 h-12 p-0"
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              <Button
                variant={isAudioEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleAudio}
                className="rounded-full w-12 h-12 p-0"
              >
                {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>

              <Button
                variant={isScreenSharing ? "secondary" : "outline"}
                size="lg"
                onClick={toggleScreenShare}
                className="rounded-full w-12 h-12 p-0"
              >
                <Monitor className="w-5 h-5" />
              </Button>

              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="lg"
                onClick={() => setIsRecording(!isRecording)}
                className="rounded-full w-12 h-12 p-0"
              >
                <Record className="w-5 h-5" />
              </Button>

              <Button variant="destructive" size="lg" onClick={endCall} className="rounded-full w-12 h-12 p-0">
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {callMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-2 text-sm ${
                          message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Video className="w-6 h-6 text-primary animate-pulse-health" />
            Telemedicine Consultations
          </h2>
          <p className="text-muted-foreground">Connect with healthcare professionals through secure video calls</p>
        </div>

        <Badge variant="outline" className="px-3 py-1">
          {availableDoctors.filter((d) => d.availability === "available").length} doctors available
        </Badge>
      </div>

      <Tabs defaultValue="doctors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-effect">
          <TabsTrigger value="doctors">Available Doctors</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Call</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Calls</TabsTrigger>
          <TabsTrigger value="history">Call History</TabsTrigger>
        </TabsList>

        {/* Available Doctors */}
        <TabsContent value="doctors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableDoctors.map((doctor) => (
              <Card key={doctor.id} className="glass-effect hover-lift">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <Badge variant={getAvailabilityBadge(doctor.availability)} className="capitalize">
                          {doctor.availability}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-1">{doctor.specialty}</p>
                      <p className="text-sm text-muted-foreground mb-2">{doctor.experience} experience</p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-warning">★</span>
                          <span>{doctor.rating}</span>
                        </div>
                        <span className="text-muted-foreground">{doctor.location}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => startCall(doctor, "consultation")}
                      disabled={doctor.availability !== "available"}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => startCall(doctor, "consultation")}
                      disabled={doctor.availability !== "available"}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>

                  {doctor.availability !== "available" && (
                    <p className="text-xs text-muted-foreground text-center">
                      {doctor.availability === "busy" ? "Currently in consultation" : "Currently offline"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Emergency Call */}
        <TabsContent value="emergency" className="space-y-6">
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Emergency Medical Consultation</AlertTitle>
            <AlertDescription>
              For life-threatening emergencies, call 108 immediately. This service is for urgent medical consultations
              that require immediate professional guidance.
            </AlertDescription>
          </Alert>

          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Phone className="w-5 h-5" />
                Emergency Video Consultation
              </CardTitle>
              <CardDescription>Connect immediately with an emergency medicine specialist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency-description">Brief Description of Emergency</Label>
                <Textarea
                  id="emergency-description"
                  placeholder="Describe the medical emergency situation..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient-condition">Patient's Current Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conscious">Conscious and responsive</SelectItem>
                    <SelectItem value="semiconscious">Semi-conscious</SelectItem>
                    <SelectItem value="unconscious">Unconscious</SelectItem>
                    <SelectItem value="stable">Stable but concerned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  const emergencyDoctor = availableDoctors.find((d) => d.specialty === "Emergency Medicine")
                  if (emergencyDoctor) {
                    startCall(emergencyDoctor, "emergency")
                  }
                }}
              >
                <Phone className="w-5 h-5 mr-2" />
                Start Emergency Consultation
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Emergency consultations are prioritized and typically connect within 30 seconds</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Calls */}
        <TabsContent value="scheduled" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Scheduled Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Scheduled Consultations</h3>
                <p className="text-muted-foreground mb-4">You don't have any upcoming video consultations scheduled.</p>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Call History */}
        <TabsContent value="history" className="space-y-6">
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Recent Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock call history */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/caring-doctor.png" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Priya Sharma</p>
                      <p className="text-sm text-muted-foreground">General Medicine • 15 min consultation</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Completed</Badge>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/caring-doctor.png" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Dr. Rajesh Kumar</p>
                      <p className="text-sm text-muted-foreground">Infectious Diseases • 22 min consultation</p>
                      <p className="text-xs text-muted-foreground">3 days ago, 10:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Completed</Badge>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Report
                    </Button>
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
