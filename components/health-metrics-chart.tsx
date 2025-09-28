"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Activity, Droplets } from "lucide-react"

const diseaseData = [
  { date: "Jan 1", cholera: 12, typhoid: 8, hepatitis: 15, diarrhea: 45 },
  { date: "Jan 8", cholera: 15, typhoid: 12, hepatitis: 18, diarrhea: 52 },
  { date: "Jan 15", cholera: 8, typhoid: 6, hepatitis: 12, diarrhea: 38 },
  { date: "Jan 22", cholera: 22, typhoid: 15, hepatitis: 25, diarrhea: 68 },
  { date: "Jan 29", cholera: 18, typhoid: 10, hepatitis: 20, diarrhea: 55 },
  { date: "Feb 5", cholera: 25, typhoid: 18, hepatitis: 28, diarrhea: 72 },
  { date: "Feb 12", cholera: 30, typhoid: 22, hepatitis: 32, diarrhea: 85 },
]

const waterQualityData = [
  { location: "Dimapur", ph: 6.8, turbidity: 12, bacteria: 85 },
  { location: "Imphal", ph: 7.2, turbidity: 8, bacteria: 45 },
  { location: "Aizawl", ph: 6.9, turbidity: 15, bacteria: 92 },
  { location: "Shillong", ph: 7.1, turbidity: 6, bacteria: 32 },
  { location: "Itanagar", ph: 6.7, turbidity: 18, bacteria: 105 },
  { location: "Agartala", ph: 7.0, turbidity: 10, bacteria: 68 },
]

const diseaseDistribution = [
  { name: "Diarrhea", value: 45, color: "#8b5cf6" },
  { name: "Cholera", value: 25, color: "#06b6d4" },
  { name: "Hepatitis A", value: 20, color: "#eab308" },
  { name: "Typhoid", value: 10, color: "#ef4444" },
]

export default function HealthMetricsChart() {
  const [activeChart, setActiveChart] = useState("trends")

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value} cases
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeChart === "trends" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveChart("trends")}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Disease Trends
        </Button>
        <Button
          variant={activeChart === "water" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveChart("water")}
        >
          <Droplets className="w-4 h-4 mr-2" />
          Water Quality
        </Button>
        <Button
          variant={activeChart === "distribution" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveChart("distribution")}
        >
          <Activity className="w-4 h-4 mr-2" />
          Disease Distribution
        </Button>
      </div>

      {/* Charts */}
      <div className="h-96 w-full min-w-0 overflow-hidden">
        {activeChart === "trends" && (
          <ResponsiveContainer width="100%" height="100%" debounce={120}>
            <AreaChart data={diseaseData}>
              <defs>
                <linearGradient id="cholera" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="typhoid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="hepatitis" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="diarrhea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="diarrhea" stackId="1" stroke="#8b5cf6" fill="url(#diarrhea)" />
              <Area type="monotone" dataKey="cholera" stackId="1" stroke="#06b6d4" fill="url(#cholera)" />
              <Area type="monotone" dataKey="hepatitis" stackId="1" stroke="#eab308" fill="url(#hepatitis)" />
              <Area type="monotone" dataKey="typhoid" stackId="1" stroke="#ef4444" fill="url(#typhoid)" />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeChart === "water" && (
          <ResponsiveContainer width="100%" height="100%" debounce={120}>
            <BarChart data={waterQualityData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="location" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-accent">pH: {payload[0]?.payload.ph}</p>
                        <p className="text-sm text-warning">Turbidity: {payload[0]?.payload.turbidity} NTU</p>
                        <p className="text-sm text-destructive">Bacteria: {payload[0]?.payload.bacteria} CFU/ml</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="bacteria" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === "distribution" && (
          <ResponsiveContainer width="100%" height="100%" debounce={120}>
            <PieChart>
              <Pie
                data={diseaseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {diseaseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{payload[0]?.name}</p>
                        <p className="text-sm">{payload[0]?.value}% of total cases</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {activeChart === "trends" && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
              <span className="text-sm">Diarrhea</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#06b6d4]" />
              <span className="text-sm">Cholera</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span className="text-sm">Hepatitis A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="text-sm">Typhoid</span>
            </div>
          </>
        )}

        {activeChart === "distribution" &&
          diseaseDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  )
}
