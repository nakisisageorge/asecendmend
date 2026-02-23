"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  CalendarClock,
  Clock,
  Plus,
  Stethoscope,
  ChevronRight,
  Filter,
} from "lucide-react"

const appointments = [
  { id: 1, doctor: "Dr. Sarah Johnson", type: "General Checkup", date: "Mar 15, 2026", time: "10:30 AM", status: "confirmed" },
  { id: 2, doctor: "Dr. Michael Chen", type: "Cardiology", date: "Mar 20, 2026", time: "2:00 PM", status: "pending" },
  { id: 3, doctor: "Dr. Emily Davis", type: "Dermatology", date: "Mar 25, 2026", time: "11:00 AM", status: "confirmed" },
  { id: 4, doctor: "Dr. James Wilson", type: "Orthopedics", date: "Feb 10, 2026", time: "9:00 AM", status: "completed" },
  { id: 5, doctor: "Dr. Lisa Thompson", type: "Ophthalmology", date: "Jan 28, 2026", time: "3:30 PM", status: "cancelled" },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "bg-success/10", text: "text-success" },
  pending: { bg: "bg-gold/10", text: "text-gold" },
  completed: { bg: "bg-blue-medium/10", text: "text-blue-medium" },
  cancelled: { bg: "bg-destructive/10", text: "text-destructive" },
}

export function AppointmentsScreen() {
  const { navigate } = useApp()
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = ["all", "upcoming", "completed", "cancelled"]

  const filteredAppointments = appointments.filter((apt) => {
    if (activeFilter === "all") return true
    if (activeFilter === "upcoming") return apt.status === "confirmed" || apt.status === "pending"
    return apt.status === activeFilter
  })

  return (
    <div className="flex flex-col pb-4 bg-background min-h-full">
      {/* Header */}
      <div className="bg-navy px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary-foreground">Appointments</h1>
          <button className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center" aria-label="Filter">
            <Filter className="w-4 h-4 text-gold/80" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? "bg-gold text-navy"
                  : "bg-navy-light text-gold/70 hover:bg-navy-light/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-5 mt-4 flex flex-col gap-3">
        {filteredAppointments.map((apt) => {
          const color = statusColors[apt.status]
          return (
            <button
              key={apt.id}
              onClick={() => navigate("appointment-details")}
              className="w-full bg-card rounded-xl border border-border p-4 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">{apt.doctor}</h4>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-md ${color.bg}`}>
                      <span className={`text-[10px] font-medium capitalize ${color.text}`}>{apt.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <CalendarClock className="w-3 h-3 text-gold" />
                      <span className="text-[11px] text-muted-foreground">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      <span className="text-[11px] text-muted-foreground">{apt.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
              </div>
            </button>
          )
        })}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate("book-appointment")}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-gold shadow-lg flex items-center justify-center hover:bg-gold-light transition-colors z-50"
        aria-label="Book new appointment"
      >
        <Plus className="w-6 h-6 text-navy" />
      </button>
    </div>
  )
}
