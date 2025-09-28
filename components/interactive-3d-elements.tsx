"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Droplets, Users, Zap, Heart, Shield, Brain, Waves } from "lucide-react"

interface FloatingParticleProps {
  delay: number
  duration: number
  color: string
}

const FloatingParticle = ({ delay, duration, color }: FloatingParticleProps) => (
  <div
    className="absolute w-2 h-2 rounded-full opacity-60"
    style={{
      backgroundColor: color,
      animation: `float-particle ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

interface PulsingOrbProps {
  size: number
  color: string
  intensity: number
}

const PulsingOrb = ({ size, color, intensity }: PulsingOrbProps) => (
  <div
    className="absolute rounded-full animate-pulse-health"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      opacity: 0.1 + intensity * 0.1,
      filter: `blur(${size / 10}px)`,
      animation: `pulse-orb ${2 + intensity}s ease-in-out infinite`,
    }}
  />
)

export default function Interactive3DElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 8)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const healthMetrics = [
    { icon: Activity, label: "Disease Tracking", value: "247", color: "#8b5cf6" },
    { icon: Droplets, label: "Water Quality", value: "78%", color: "#06b6d4" },
    { icon: Users, label: "Communities", value: "156", color: "#22c55e" },
    { icon: Zap, label: "Response Time", value: "2.4h", color: "#eab308" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={8 + i * 0.3}
            color={["#8b5cf6", "#06b6d4", "#22c55e", "#eab308"][i % 4]}
          />
        ))}
      </div>

      {/* Pulsing Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <PulsingOrb
            key={i}
            size={100 + i * 50}
            color={["#8b5cf6", "#06b6d4", "#22c55e", "#eab308"][i % 4]}
            intensity={i % 3}
          />
        ))}
      </div>

      {/* 3D Floating Health Metrics */}
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden transform-3d perspective-1000 animate-float-3d cursor-pointer group"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: `rotateX(${Math.sin(animationPhase + index) * 5}deg) rotateY(${Math.cos(animationPhase + index) * 5}deg)`,
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Animated Background Gradient */}
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `radial-gradient(circle at ${50 + Math.sin(animationPhase) * 20}% ${50 + Math.cos(animationPhase) * 20}%, ${metric.color}40, transparent 70%)`,
                  }}
                />

                {/* Floating Icon */}
                <div className="absolute top-4 right-4 transform-3d">
                  <Icon
                    className="w-8 h-8 transition-all duration-500 group-hover:scale-125"
                    style={{
                      color: metric.color,
                      transform: `translateZ(20px) rotateY(${animationPhase * 10}deg)`,
                      filter: `drop-shadow(0 0 10px ${metric.color}40)`,
                    }}
                  />
                </div>

                <CardContent className="p-6 relative z-10">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div
                      className="text-3xl font-bold transition-all duration-500 group-hover:scale-110"
                      style={{ color: metric.color }}
                    >
                      {metric.value}
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 animate-data-flow"
                      style={{
                        backgroundColor: metric.color,
                        width: `${60 + Math.sin(animationPhase + index) * 20}%`,
                      }}
                    />
                  </div>
                </CardContent>

                {/* Hover Effect Particles */}
                {isHovering && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-ping"
                        style={{
                          backgroundColor: metric.color,
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Interactive 3D Health Status Globe */}
        <Card className="relative overflow-hidden animate-float-3d perspective-1000 mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-primary animate-pulse-health" />
                System Health Status
              </h3>
              <p className="text-muted-foreground">Real-time monitoring of all system components</p>
            </div>

            {/* 3D Globe Visualization */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              <div
                className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute inset-2 rounded-full border border-accent/40 animate-spin"
                style={{ animationDuration: "15s", animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-4 rounded-full border border-success/50 animate-spin"
                style={{ animationDuration: "10s" }}
              />

              {/* Central Health Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart
                  className="w-16 h-16 text-primary animate-pulse-health"
                  style={{
                    filter: "drop-shadow(0 0 20px #8b5cf640)",
                    transform: `scale(${1 + Math.sin(animationPhase) * 0.1})`,
                  }}
                />
              </div>

              {/* Orbiting Status Indicators */}
              {[
                { icon: Shield, color: "#22c55e", angle: 0 },
                { icon: Activity, color: "#8b5cf6", angle: 90 },
                { icon: Droplets, color: "#06b6d4", angle: 180 },
                { icon: Waves, color: "#eab308", angle: 270 },
              ].map((item, index) => {
                const Icon = item.icon
                const angle = item.angle + animationPhase * 10
                const x = Math.cos((angle * Math.PI) / 180) * 80
                const y = Math.sin((angle * Math.PI) / 180) * 80

                return (
                  <div
                    key={index}
                    className="absolute w-8 h-8 flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${x}px - 16px)`,
                      top: `calc(50% + ${y}px - 16px)`,
                      transform: `translateZ(${Math.sin(animationPhase + index) * 10}px)`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6 animate-pulse-health"
                      style={{
                        color: item.color,
                        filter: `drop-shadow(0 0 8px ${item.color}60)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* System Status Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Data Collection", value: 98, color: "#22c55e" },
                { label: "AI Processing", value: 94, color: "#8b5cf6" },
                { label: "Alert System", value: 96, color: "#06b6d4" },
                { label: "Response Network", value: 87, color: "#eab308" },
              ].map((status, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold mb-1 transition-all duration-500" style={{ color: status.color }}>
                    {status.value}%
                  </div>
                  <p className="text-xs text-muted-foreground">{status.label}</p>
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        backgroundColor: status.color,
                        width: `${status.value}%`,
                        animation: "data-flow 3s ease-in-out infinite",
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Deploy Response Team", icon: Users, color: "#ef4444" },
            { label: "Send Alert Notification", icon: Activity, color: "#f97316" },
            { label: "Generate Health Report", icon: Shield, color: "#22c55e" },
          ].map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                className="relative overflow-hidden h-16 group transform-3d perspective-1000 animate-float-3d bg-transparent"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  background: `linear-gradient(135deg, ${action.color}20, ${action.color}10)`,
                  borderColor: action.color,
                }}
                variant="outline"
              >
                {/* Animated Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${action.color}, transparent 70%)`,
                    animation: "pulse-orb 2s ease-in-out infinite",
                  }}
                />

                {/* Button Content */}
                <div className="relative z-10 flex items-center gap-3">
                  <Icon
                    className="w-6 h-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                    style={{ color: action.color }}
                  />
                  <span className="font-medium">{action.label}</span>
                </div>

                {/* Hover Particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full animate-ping"
                      style={{
                        backgroundColor: action.color,
                        left: `${30 + i * 20}%`,
                        top: `${40 + i * 10}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
