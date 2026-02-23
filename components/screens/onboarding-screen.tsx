"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  Shield,
  CalendarCheck,
  HeartPulse,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"

const slides = [
  {
    icon: Shield,
    title: "Emergency Response",
    subtitle: "24/7 SOS at your fingertips",
    description:
      "Instantly connect with emergency medical services. One tap sends your location and medical data to the nearest responders.",
    color: "bg-navy",
  },
  {
    icon: CalendarCheck,
    title: "Smart Appointments",
    subtitle: "Healthcare on your schedule",
    description:
      "Book, reschedule, and manage appointments with top-rated doctors. Get reminders and real-time updates.",
    color: "bg-navy-light",
  },
  {
    icon: HeartPulse,
    title: "Complete Health Hub",
    subtitle: "Everything in one place",
    description:
      "Track your medical history, manage memberships, store insurance info, and connect with your healthcare team.",
    color: "bg-primary",
  },
]

export function OnboardingScreen() {
  const { navigate } = useApp()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slide = slides[currentSlide]
  const Icon = slide.icon
  const isLast = currentSlide === slides.length - 1

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top section */}
      <div className={`relative flex-1 ${slide.color} flex flex-col items-center justify-center px-6 transition-colors duration-500`}>
        {/* Skip button */}
        <button
          onClick={() => navigate("login")}
          className="absolute top-6 right-6 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          aria-label="Skip onboarding"
        >
          Skip
        </button>

        {/* Icon container */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full bg-gold/10 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
              <Icon className="w-10 h-10 text-gold" />
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mb-4" role="tablist" aria-label="Onboarding slides">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "w-8 bg-gold" : "w-2 bg-gold/30"
              }`}
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-6 pt-8 pb-10 flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-gold uppercase tracking-widest">
            {slide.subtitle}
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-1 text-balance">
            {slide.title}
          </h2>
          <p className="text-muted-foreground mt-2 leading-relaxed text-pretty">
            {slide.description}
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentSlide(currentSlide - 1)}
              className="flex-1 border-primary text-primary"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            size="lg"
            onClick={() =>
              isLast ? navigate("login") : setCurrentSlide(currentSlide + 1)
            }
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLast ? "Get Started" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
