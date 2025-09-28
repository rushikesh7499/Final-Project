"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  Bot,
  User,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
  Brain,
  Heart,
  HelpCircle,
  Phone,
  FileText,
  Activity,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

interface VoiceAIAssistantProps {
  user: any
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  audioUrl?: string
  isPlaying?: boolean
}

export default function VoiceAIAssistant({ user }: VoiceAIAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentLanguage, setCurrentLanguage] = useState("en-IN")
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [assistantMode, setAssistantMode] = useState<"general" | "medical" | "emergency">("general")

  // Voice recognition and synthesis refs
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize voice recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = currentLanguage

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        handleUserMessage(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthesisRef.current = window.speechSynthesis
    }

    // Add initial greeting
    const greeting = {
      id: Date.now().toString(),
      type: "assistant" as const,
      content: `Hello ${user?.name}! I'm your AI health assistant. I can help you with health information, guide you through disease reporting, answer questions about water quality, and provide emergency assistance. How can I help you today?`,
      timestamp: new Date(),
    }
    setMessages([greeting])

    // Speak greeting if voice is enabled
    if (voiceEnabled) {
      speakMessage(greeting.content)
    }
  }, [])

  const languages = [
    { code: "en-IN", name: "English (India)", flag: "🇮🇳" },
    { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
    { code: "as-IN", name: "Assamese", flag: "🇮🇳" },
    { code: "bn-IN", name: "Bengali", flag: "🇮🇳" },
    { code: "mni-IN", name: "Manipuri", flag: "🇮🇳" },
  ]

  const quickActions = [
    { id: "report-disease", label: "Report Disease Case", icon: FileText, mode: "medical" },
    { id: "water-quality", label: "Check Water Quality", icon: Activity, mode: "general" },
    { id: "emergency-help", label: "Emergency Assistance", icon: Phone, mode: "emergency" },
    { id: "health-tips", label: "Health Tips", icon: Heart, mode: "medical" },
    { id: "system-help", label: "System Help", icon: HelpCircle, mode: "general" },
  ]

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.lang = currentLanguage
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speakMessage = (text: string) => {
    if (synthesisRef.current && voiceEnabled) {
      // Stop any ongoing speech
      synthesisRef.current.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = currentLanguage
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthesisRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleUserMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const response = generateAIResponse(content, assistantMode)
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsProcessing(false)

    // Speak the response if voice is enabled
    if (voiceEnabled) {
      speakMessage(response)
    }
  }

  const generateAIResponse = (userInput: string, mode: string): string => {
    const input = userInput.toLowerCase()

    // Emergency responses
    if (mode === "emergency" || input.includes("emergency") || input.includes("urgent") || input.includes("help")) {
      if (input.includes("cholera") || input.includes("diarrhea") || input.includes("vomiting")) {
        return "This sounds like a medical emergency. Please contact emergency services immediately at 108. For cholera symptoms: ensure the patient drinks ORS solution, avoid solid foods, and seek immediate medical attention. I can help you find the nearest hospital."
      }
      return "I understand this is urgent. Please call emergency services at 108 immediately. If this is a disease outbreak, I can help you quickly report it to health authorities. Would you like me to guide you through emergency reporting?"
    }

    // Disease reporting
    if (input.includes("report") || input.includes("disease") || input.includes("sick") || input.includes("symptoms")) {
      return "I can help you report a disease case. I'll guide you through the process step by step. First, is this for an individual patient or a community outbreak? Please tell me the main symptoms you've observed."
    }

    // Water quality inquiries
    if (input.includes("water") || input.includes("quality") || input.includes("contamination")) {
      return "I can provide current water quality information for your area. Based on our latest sensor data, water quality in most Northeast regions is at 78% safety level. Would you like specific information for your location, or do you have concerns about your water source?"
    }

    // Health tips and prevention
    if (input.includes("prevent") || input.includes("tips") || input.includes("health") || input.includes("advice")) {
      return "Here are key prevention tips for water-borne diseases: 1) Boil water for 1 minute before drinking, 2) Wash hands frequently with soap, 3) Eat freshly cooked food, 4) Avoid street food during outbreaks, 5) Use ORS for dehydration. Would you like specific advice for any particular disease?"
    }

    // System navigation help
    if (input.includes("how") || input.includes("navigate") || input.includes("use") || input.includes("help")) {
      return "I can help you navigate the Smart Health Monitor system. You can: report diseases in the 'Report Disease' tab, check water sensor data in 'Water Sensors', view predictions in 'AI Prediction', and access educational resources. What specific feature would you like help with?"
    }

    // Symptom analysis
    if (input.includes("fever") || input.includes("headache") || input.includes("nausea")) {
      return "Based on the symptoms you mentioned, this could indicate several conditions. Fever with nausea might suggest gastroenteritis or typhoid. I recommend: 1) Monitor temperature, 2) Ensure hydration, 3) Seek medical attention if symptoms worsen. Would you like me to help you report this case or find nearby healthcare facilities?"
    }

    // Default response
    return "I'm here to help with health monitoring, disease reporting, water quality information, and emergency assistance. You can ask me about symptoms, prevention tips, how to use the system, or request immediate help. What would you like to know?"
  }

  const handleQuickAction = (actionId: string, mode: string) => {
    setAssistantMode(mode as any)

    const responses = {
      "report-disease":
        "I'll help you report a disease case. Please tell me: Is this for an individual patient or a community outbreak? What are the main symptoms?",
      "water-quality":
        "Let me check the latest water quality data for your area. Current regional average is 78% safety level. Would you like specific sensor readings for your location?",
      "emergency-help":
        "I'm switching to emergency mode. Please describe the situation. For immediate medical emergencies, call 108. I can help coordinate with health authorities.",
      "health-tips":
        "Here are essential health tips for preventing water-borne diseases: Always boil drinking water, wash hands frequently, eat freshly cooked food, and maintain good sanitation. What specific health topic interests you?",
      "system-help":
        "I can guide you through the Smart Health Monitor system. The main features are: Disease Reporting, Water Sensor Monitoring, AI Predictions, Educational Resources, and Emergency Alerts. Which area do you need help with?",
    }

    const response = responses[actionId as keyof typeof responses]
    handleUserMessage(response)
  }

  const playMessageAudio = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId)
    if (message && message.type === "assistant") {
      speakMessage(message.content)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary animate-pulse-health" />
            AI Health Assistant
          </h2>
          <p className="text-muted-foreground">Voice-powered health guidance and system navigation</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant={
              assistantMode === "emergency" ? "destructive" : assistantMode === "medical" ? "secondary" : "default"
            }
          >
            {assistantMode} mode
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {languages.find((l) => l.code === currentLanguage)?.flag}{" "}
            {languages.find((l) => l.code === currentLanguage)?.name}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <Card className="lg:col-span-2 glass-effect hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-accent" />
              Voice Chat Interface
            </CardTitle>
            <CardDescription>
              Speak naturally or type your questions about health, diseases, and system features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <ScrollArea className="h-96 w-full border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user" ? "bg-primary" : "bg-accent"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <Bot className="w-4 h-4 text-accent-foreground" />
                        )}
                      </div>

                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          {message.type === "assistant" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => playMessageAudio(message.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isProcessing && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Voice Controls */}
            <div className="flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                onClick={isListening ? stopListening : startListening}
                className="relative"
                disabled={isProcessing}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Stop Listening
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Start Voice Chat
                  </>
                )}
              </Button>

              <Button
                variant={isSpeaking ? "secondary" : "outline"}
                onClick={isSpeaking ? stopSpeaking : () => {}}
                disabled={!isSpeaking}
              >
                {isSpeaking ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Speaking
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Not Speaking
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                {voiceEnabled ? (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Voice On
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Voice Off
                  </>
                )}
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isListening ? "bg-destructive animate-pulse" : "bg-muted"}`} />
                <span>Listening</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isProcessing ? "bg-warning animate-pulse" : "bg-muted"}`} />
                <span>Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-accent animate-pulse" : "bg-muted"}`} />
                <span>Speaking</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Settings */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-warning" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleQuickAction(action.id, action.mode)}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Disease symptom analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Water quality guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Emergency assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">System navigation help</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Multi-language support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Voice-guided reporting</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="glass-effect hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
                Voice Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assistant Mode</label>
                <select
                  value={assistantMode}
                  onChange={(e) => setAssistantMode(e.target.value as any)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="general">General Assistant</option>
                  <option value="medical">Medical Focus</option>
                  <option value="emergency">Emergency Mode</option>
                </select>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Conversation
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Alert */}
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertTitle className="text-destructive">Emergency Assistance</AlertTitle>
            <AlertDescription>
              For medical emergencies, call 108 immediately. The AI assistant can provide guidance but is not a
              substitute for professional medical care.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
