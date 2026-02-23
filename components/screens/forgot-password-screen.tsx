"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, ArrowRight } from "lucide-react"

export function ForgotPasswordScreen() {
  const { navigate } = useApp()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-navy px-6 pt-12 pb-16 flex flex-col items-center relative">
        <button
          onClick={() => navigate("login")}
          className="absolute top-6 left-6 text-gold/80 hover:text-gold"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground">Forgot Password</h1>
        <p className="text-gold/80 text-sm mt-1">{"We'll send you a reset link"}</p>
      </div>

      <div className="flex-1 px-6 -mt-8 relative z-10">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="reset-email" className="text-sm font-medium text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="reset-email" type="email" placeholder="you@example.com" className="pl-10 h-12 bg-secondary border-border" />
              </div>
            </div>
            <Button
              size="lg"
              onClick={() => navigate("login")}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Reset Link
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-5">
            Remember your password?{" "}
            <button onClick={() => navigate("login")} className="text-gold font-semibold hover:text-gold-light">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function Lock(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
