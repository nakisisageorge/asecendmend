"use client"

import { useEffect, useState } from "react"
import { useApp } from "@/lib/app-context"
import { Shield } from "lucide-react"

export function SplashScreen() {
  const { navigate } = useApp()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => navigate("onboarding"), 300)
          return 100
        }
        return prev + 4
      })
    }, 50)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-navy text-primary-foreground">
      <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gold/20 flex items-center justify-center">
            <Shield className="w-12 h-12 text-gold" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold animate-pulse" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary-foreground">AscendiStat</h1>
          <p className="text-sm text-gold mt-1 font-medium">Your Health Companion</p>
        </div>
        <div className="w-48 h-1 bg-navy-light rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-gold rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
