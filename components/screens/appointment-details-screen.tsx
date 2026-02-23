"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  CalendarClock,
  Clock,
  MapPin,
  Stethoscope,
  Phone,
  MessageCircle,
  X,
  RefreshCw,
} from "lucide-react"

export function AppointmentDetailsScreen() {
  const { goBack, navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-navy px-5 pt-12 pb-6 flex items-center gap-3">
        <button onClick={goBack} className="text-gold/80 hover:text-gold" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-primary-foreground">Appointment Details</h1>
      </div>

      <div className="flex-1 px-5 py-5 flex flex-col gap-4">
        {/* Doctor Card */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">Dr. Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">General Practitioner</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="px-2 py-0.5 bg-success/10 rounded-md">
                  <span className="text-[10px] font-medium text-success">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 border-border text-foreground">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-border text-foreground" onClick={() => navigate("chat")}>
              <MessageCircle className="w-4 h-4 mr-1" />
              Message
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-4">
          <h4 className="font-semibold text-foreground text-sm">Appointment Info</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <CalendarClock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">March 15, 2026</p>
              <p className="text-xs text-muted-foreground">Monday</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">10:30 AM - 11:00 AM</p>
              <p className="text-xs text-muted-foreground">30 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">City General Hospital</p>
              <p className="text-xs text-muted-foreground">123 Medical Drive, Suite 200</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h4 className="font-semibold text-foreground text-sm mb-2">Notes</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Annual general checkup. Please bring previous lab results and current medication list.
          </p>
        </div>

        <div className="flex gap-3 mt-auto pt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
            onClick={goBack}
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("book-appointment")}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Reschedule
          </Button>
        </div>
      </div>
    </div>
  )
}
