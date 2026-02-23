"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  MapPin,
  CalendarClock,
  Clock,
  User,
  Stethoscope,
  ChevronDown,
} from "lucide-react"

export function BookAppointmentScreen() {
  const { goBack, navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy px-5 pt-12 pb-6 flex items-center gap-3">
        <button onClick={goBack} className="text-gold/80 hover:text-gold" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-primary-foreground">Book Appointment</h1>
      </div>

      <div className="flex-1 px-5 py-5 flex flex-col gap-4">
        {/* Specialty */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Specialty</Label>
          <button className="flex items-center justify-between h-12 px-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Select specialty</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Doctor */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Doctor</Label>
          <button className="flex items-center justify-between h-12 px-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Select doctor</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Preferred Date</Label>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {["Mon 15", "Tue 16", "Wed 17", "Thu 18", "Fri 19", "Sat 20"].map((day, i) => (
              <button
                key={day}
                className={`flex flex-col items-center px-4 py-3 rounded-xl border shrink-0 transition-all ${
                  i === 0
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-foreground hover:border-gold/30"
                }`}
              >
                <span className="text-[10px] font-medium opacity-80">{day.split(" ")[0]}</span>
                <span className="text-lg font-bold">{day.split(" ")[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Available Time</Label>
          <div className="grid grid-cols-3 gap-2">
            {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"].map((time, i) => (
              <button
                key={time}
                className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                  i === 3
                    ? "bg-primary border-primary text-primary-foreground"
                    : i === 5
                    ? "bg-muted border-border text-muted-foreground cursor-not-allowed opacity-50"
                    : "bg-card border-border text-foreground hover:border-gold/30"
                }`}
                disabled={i === 5}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-foreground">Location</Label>
          <button className="flex items-center justify-between h-12 px-4 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm text-foreground">Select location</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes" className="text-sm font-medium text-foreground">Notes (Optional)</Label>
          <textarea
            id="notes"
            placeholder="Any symptoms or concerns..."
            className="h-20 px-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button
          size="lg"
          onClick={goBack}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  )
}
