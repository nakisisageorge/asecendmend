"use client"

import { useState, useRef, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export function OTPVerificationScreen() {
  const { navigate, login } = useApp()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy px-6 pt-12 pb-16 flex flex-col items-center relative">
        <button
          onClick={() => navigate("signup")}
          className="absolute top-6 left-6 text-gold/80 hover:text-gold"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground">Verify Your Email</h1>
        <p className="text-gold/80 text-sm mt-1">We sent a code to your email</p>
      </div>

      {/* OTP Input */}
      <div className="flex-1 px-6 -mt-8 relative z-10">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter the 6-digit code sent to <span className="text-foreground font-medium">j***@example.com</span>
          </p>

          <div className="flex justify-center gap-3 mb-6" role="group" aria-label="OTP input">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold bg-secondary border-2 border-border rounded-xl
                  focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all text-foreground"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={login}
            size="lg"
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Verify & Continue
          </Button>

          <div className="text-center mt-5">
            {timer > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in <span className="text-gold font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={() => setTimer(60)}
                className="text-sm text-gold font-semibold hover:text-gold-light transition-colors"
              >
                Resend Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
