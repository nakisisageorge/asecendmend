"use client"

import { useApp } from "@/lib/app-context"
import { useState, useRef, useCallback, useEffect } from "react"
import {
  Bell,
  MapPin,
  Cross,
  Video,
  Phone,
  CalendarDays,
  Wallet,
  ChevronRight,
  Megaphone,
  Sparkles,
  MessageSquare,
  Star,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/* Slideshow cards – cycles between Remote Consultation & Ad banners   */
/* ------------------------------------------------------------------ */
const SLIDE_INTERVAL = 5000

interface SlideProps {
  navigate: (screen: string) => void
}

function RemoteConsultationSlide({ navigate }: SlideProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-navy/10 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-navy">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M7.5 7.5C5.5 9.5 5.5 14.5 7.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16.5 7.5C18.5 9.5 18.5 14.5 16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.5 4.5C1.17 7.83 1.17 16.17 4.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.5 4.5C22.83 7.83 22.83 16.17 19.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-semibold text-foreground text-base">Remote Consultation</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("chat")}
          className="btn-press card-lift flex flex-col items-center gap-2.5 py-5 px-4 rounded-xl bg-secondary border border-border/50"
        >
          <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center">
            <Video className="w-5 h-5 text-gold" />
          </div>
          <span className="text-sm font-medium text-foreground">Video</span>
        </button>
        <button
          onClick={() => navigate("chat")}
          className="btn-press card-lift flex flex-col items-center gap-2.5 py-5 px-4 rounded-xl bg-secondary border border-border/50"
        >
          <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center">
            <Phone className="w-5 h-5 text-gold" />
          </div>
          <span className="text-sm font-medium text-foreground">Voice</span>
        </button>
      </div>
    </div>
  )
}

function AdvertisementSlide() {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #12185d 0%, #383c89 60%, #00299a 100%)",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-gold-light" />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-light">
            Special Offer
          </span>
        </div>
        <h3 className="text-white font-bold text-lg leading-snug mb-1 text-balance">
          Get 30% Off Premium Membership
        </h3>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          Unlimited consultations, priority booking & emergency cover included.
        </p>
        <div className="flex items-center gap-2">
          <span
            className="btn-press inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-navy cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f0d998 0%, #c9a249 100%)" }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Claim Now
          </span>
        </div>
      </div>
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main Home Screen                                                    */
/* ------------------------------------------------------------------ */
export function HomeScreen() {
  const { navigate } = useApp()
  const [sosHolding, setSOSHolding] = useState(false)
  const [sosProgress, setSOSProgress] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalSlides = 2
  const SOS_HOLD_DURATION = 3000

  // Auto-play slideshow
  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % totalSlides)
    }, SLIDE_INTERVAL)
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    }
  }, [])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    // Reset timer on manual switch
    if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    slideTimerRef.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % totalSlides)
    }, SLIDE_INTERVAL)
  }

  const startHold = useCallback(() => {
    setSOSHolding(true)
    setSOSProgress(0)
    const startTime = Date.now()
    holdTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / SOS_HOLD_DURATION, 1)
      setSOSProgress(progress)
      if (progress >= 1) {
        if (holdTimerRef.current) clearInterval(holdTimerRef.current)
        setSOSHolding(false)
        setSOSProgress(0)
        navigate("sos-confirm")
      }
    }, 30)
  }, [navigate])

  const endHold = useCallback(() => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    setSOSHolding(false)
    setSOSProgress(0)
  }, [])

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearInterval(holdTimerRef.current)
    }
  }, [])

  const circumference = 2 * Math.PI * 88
  const slides = [
    <RemoteConsultationSlide key="consultation" navigate={navigate} />,
    <AdvertisementSlide key="ad" />,
  ]

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* ---- Header ---- */}
      <div className="px-5 pt-12 pb-3 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary ring-2 ring-gold/30">
                <img
                  src="/placeholder.svg?height=48&width=48"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-background" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Good Evening,</p>
              <h2 className="text-foreground font-bold text-lg leading-tight">Mukasa</h2>
            </div>
          </div>
          <button
            onClick={() => navigate("settings")}
            className="btn-press relative w-11 h-11 rounded-full bg-secondary flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <div className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-destructive border-2 border-secondary" />
          </button>
        </div>
      </div>

      {/* ---- Location ---- */}
      <div className="flex items-center justify-center gap-1.5 pb-2 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
        <MapPin className="w-4 h-4 text-gold" />
        <span className="text-sm text-muted-foreground font-medium">Kololo, Kampala</span>
      </div>

      {/* ---- Emergency question ---- */}
      <div className="px-5 pt-2 pb-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-xl font-bold text-foreground text-center text-balance">
          Are you in an emergency?
        </h1>
      </div>

      {/* ---- SOS Button ---- */}
      <div className="flex flex-col items-center px-5 py-6 animate-scale-in" style={{ animationDelay: "0.15s" }}>
        <div className="relative">
          {/* Pulse ring when idle */}
          {!sosHolding && (
            <div className="absolute inset-0 w-48 h-48 rounded-full animate-pulse-ring-red" />
          )}
          {/* Progress ring */}
          <svg
            className="absolute inset-0 -rotate-90"
            width="192"
            height="192"
            viewBox="0 0 192 192"
          >
            <circle cx="96" cy="96" r="88" stroke="transparent" strokeWidth="6" fill="none" />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={sosHolding ? "#DC3545" : "transparent"}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - sosProgress)}
              className="transition-none"
            />
          </svg>
          <button
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
            className={`btn-press w-48 h-48 rounded-full flex flex-col items-center justify-center select-none ${
              sosHolding ? "scale-95" : ""
            }`}
            style={{
              background: "radial-gradient(circle at 40% 35%, #f87171 0%, #ef4444 40%, #dc2626 70%, #b91c1c 100%)",
              boxShadow: sosHolding
                ? "0 0 50px rgba(220, 38, 38, 0.6), inset 0 2px 12px rgba(255,255,255,0.3)"
                : "0 10px 40px rgba(220, 38, 38, 0.35), inset 0 2px 12px rgba(255,255,255,0.25)",
              transition: "transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
            }}
            aria-label="SOS Emergency - Press and hold for 3 seconds"
          >
            <Cross className="w-10 h-10 text-white mb-1" fill="currentColor" />
            <span className="text-white font-bold text-2xl tracking-wider">SOS</span>
            <span className="text-white/80 text-xs font-semibold tracking-widest mt-0.5">
              PRESS & HOLD
            </span>
          </button>
        </div>
        <p className="text-muted-foreground text-sm text-center mt-4 leading-relaxed">
          Hold for 3 seconds to dispatch ambulance.
        </p>
      </div>

      {/* ---- Slideshow: Remote Consultation / Ads ---- */}
      <div className="px-5 pb-4" style={{ animationDelay: "0.2s" }}>
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full shrink-0">
                {slide}
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSlide === i
                    ? "w-6 h-2 bg-gold"
                    : "w-2 h-2 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ---- Quick Actions ---- */}
      <div className="px-5 pb-4 stagger-children">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageSquare, label: "Chat", screen: "chat" as const },
            { icon: CalendarDays, label: "Book Appointment", screen: "book-appointment" as const },
            { icon: Wallet, label: "Wallet", screen: "wallet" as const },
          ].map(({ icon: Icon, label, screen }) => (
            <button
              key={label}
              onClick={() => navigate(screen)}
              className="btn-press card-lift flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Next Appointment ---- */}
      <div className="px-5 pb-8 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
        <div className="card-lift bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
              <h3 className="font-bold text-foreground text-xs tracking-widest uppercase">
                Next Appointment
              </h3>
            </div>
            <button
              onClick={() => navigate("appointments")}
              className="btn-press text-sm font-semibold text-gold"
            >
              View All
            </button>
          </div>
          <button
            onClick={() => navigate("appointment-details")}
            className="btn-press flex items-center gap-3 w-full text-left"
          >
            <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden shrink-0 ring-2 ring-gold/20">
              <img
                src="/placeholder.svg?height=48&width=48"
                alt="Dr. Sarah K."
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-base">Dr. Sarah K.</h4>
              <p className="text-sm text-muted-foreground">General Checkup</p>
              <p className="text-xs text-muted-foreground mt-0.5">Today, 4:30 PM</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <ChevronRight className="w-4 h-4 text-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* ---- Balance & Points ---- */}
      <div className="px-5 pb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="card-lift grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("wallet")}
            className="btn-press bg-card rounded-2xl border border-border p-5 flex flex-col items-start gap-2 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-gold" />
            </div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Balance</p>
            <p className="text-xl font-bold text-foreground">$1,240</p>
            <span className="text-xs font-semibold text-gold flex items-center gap-1">
              View wallet <ChevronRight className="w-3 h-3" />
            </span>
          </button>
          <button
            onClick={() => navigate("points")}
            className="btn-press bg-card rounded-2xl border border-border p-5 flex flex-col items-start gap-2 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Points</p>
            <p className="text-xl font-bold text-foreground">1,850</p>
            <span className="text-xs font-semibold text-gold flex items-center gap-1">
              Earn & redeem <ChevronRight className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
