"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, AlertTriangle, Phone, Navigation } from "lucide-react"

export function SOSConfirmScreen() {
  const { goBack, navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-navy px-5 pt-12 pb-6 flex items-center gap-3">
        <button onClick={goBack} className="text-gold/80 hover:text-gold" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-primary-foreground">SOS Emergency</h1>
      </div>

      <div className="flex-1 px-5 py-5 flex flex-col items-center gap-6">
        {/* Map placeholder */}
        <div className="w-full aspect-[4/3] bg-secondary rounded-2xl border border-border flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,var(--border)_20px,var(--border)_21px),repeating-linear-gradient(90deg,transparent,transparent_20px,var(--border)_20px,var(--border)_21px)]" />
          <MapPin className="w-10 h-10 text-destructive relative z-10" />
          <p className="text-sm text-muted-foreground mt-2 relative z-10">Your Current Location</p>
          <p className="text-xs text-foreground font-medium relative z-10">123 Main Street, City</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 w-full">
          <h3 className="font-semibold text-foreground mb-3">Confirm Your Location</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">123 Main Street</p>
              <p className="text-xs text-muted-foreground">City Center, State 12345</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your location will be shared with emergency responders. Make sure this is accurate.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto">
          <Button
            size="lg"
            onClick={() => navigate("emergency-sos")}
            className="w-full h-14 bg-destructive text-destructive-foreground hover:bg-destructive/90 text-base font-bold"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Confirm & Send SOS
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full h-12 border-border text-foreground"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Emergency Directly
          </Button>
        </div>
      </div>
    </div>
  )
}

export function EmergencySOSScreen() {
  const { navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-navy items-center justify-center px-5">
      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
            <div className="w-24 h-24 rounded-full bg-destructive/40 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
            </div>
          </div>
          <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-destructive/30 animate-ping" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-foreground">SOS Activated</h2>
          <p className="text-sm text-gold/80 mt-2">Connecting you with emergency services...</p>
          <p className="text-xs text-gold/50 mt-1">Help is on the way</p>
        </div>

        <div className="bg-navy-light rounded-2xl p-4 w-full max-w-xs mt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-primary-foreground font-medium">Finding nearest responders</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-gold/40" />
            <span className="text-sm text-gold/60">Sharing your location</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gold/20" />
            <span className="text-sm text-gold/40">Dispatching ambulance</span>
          </div>
        </div>

        <Button
          onClick={() => navigate("incident-tracking")}
          className="w-full max-w-xs h-12 bg-gold text-navy hover:bg-gold-light font-bold mt-4"
        >
          Track Response
        </Button>
      </div>
    </div>
  )
}

export function IncidentTrackingScreen() {
  const { navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-navy px-5 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-foreground">Incident Tracking</h1>
          <div className="px-3 py-1 bg-success/20 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">Live</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 flex flex-col gap-4">
        {/* Map */}
        <div className="w-full aspect-video bg-secondary rounded-2xl border border-border flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,var(--border)_20px,var(--border)_21px),repeating-linear-gradient(90deg,transparent,transparent_20px,var(--border)_20px,var(--border)_21px)]" />
          <div className="relative z-10 flex flex-col items-center">
            <Navigation className="w-8 h-8 text-blue-medium" />
            <p className="text-xs text-muted-foreground mt-2">ETA: 8 minutes</p>
          </div>
        </div>

        {/* Responder Info */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">AM</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Ambulance Unit #247</h4>
              <p className="text-xs text-muted-foreground">Driver: Ahmed M. - 2.3 km away</p>
            </div>
            <Button size="sm" variant="outline" className="border-border" onClick={() => navigate("chat")}>
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h4 className="font-semibold text-foreground text-sm mb-3">Status Timeline</h4>
          {[
            { time: "3:42 PM", label: "SOS Activated", done: true },
            { time: "3:43 PM", label: "Responder Assigned", done: true },
            { time: "3:44 PM", label: "En Route to You", done: true, active: true },
            { time: "~3:52 PM", label: "Estimated Arrival", done: false },
          ].map((step, i) => (
            <div key={i} className="flex gap-3 relative">
              {i < 3 && <div className={`absolute left-[9px] top-6 w-0.5 h-6 ${step.done ? "bg-gold" : "bg-border"}`} />}
              <div className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center ${
                step.active ? "bg-gold" : step.done ? "bg-gold/40" : "bg-border"
              }`}>
                {step.done && <div className="w-2 h-2 rounded-full bg-navy" />}
              </div>
              <div className="mb-4">
                <p className={`text-sm font-medium ${step.active ? "text-foreground" : step.done ? "text-muted-foreground" : "text-muted-foreground/60"}`}>{step.label}</p>
                <p className="text-[11px] text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => navigate("home")} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 mt-auto">
          Back to Home
        </Button>
      </div>
    </div>
  )
}
