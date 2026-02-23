"use client"

import { useApp, type Screen } from "@/lib/app-context"
import {
  User,
  FileText,
  Shield,
  Heart,
  Wallet,
  Receipt,
  Bell,
  Lock,
  HelpCircle,
  Gift,
  Users,
  LogOut,
  ChevronRight,
  Camera,
  Star,
  Mail,
} from "lucide-react"

const accountItems: { icon: typeof User; label: string; screen: Screen }[] = [
  { icon: User, label: "Personal Information", screen: "personal-info" },
  { icon: Heart, label: "Medical History", screen: "medical-history" },
  { icon: FileText, label: "Insurance Information", screen: "insurance-info" },
  { icon: Shield, label: "Emergency Contacts", screen: "emergency-contacts" },
]

const appItems: { icon: typeof Wallet; label: string; screen: Screen }[] = [
  { icon: Wallet, label: "Wallet", screen: "wallet" },
  { icon: Receipt, label: "Invoices", screen: "invoices" },
  { icon: Bell, label: "Notifications", screen: "settings" },
  { icon: Lock, label: "Privacy & Security", screen: "privacy-security" },
  { icon: HelpCircle, label: "Help & Support", screen: "help-support" },
]

const referralItems: { icon: typeof Gift; label: string; screen: Screen }[] = [
  { icon: Gift, label: "My Referral Code", screen: "referral" },
  { icon: Users, label: "My Referred Users", screen: "referred-users" },
]

function MenuSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 first:mt-0">
      <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
        {title}
      </h3>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  )
}

export function ProfileScreen() {
  const { navigate, logout } = useApp()

  return (
    <div className="flex flex-col min-h-full bg-background pb-6">
      {/* Header */}
      <header className="bg-navy relative overflow-hidden px-4 sm:px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,73,0.15),transparent)]" />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gold/5 -translate-y-1/2 translate-x-1/3" />
        <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-6 relative z-10">
          Profile
        </h1>

        {/* Profile card */}
        <div className="relative z-10 flex items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold/40 ring-2 ring-white/10">
              <span className="text-gold font-bold text-xl sm:text-2xl">JD</span>
            </div>
            <button
              className="absolute -bottom-0.5 -right-0.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gold flex items-center justify-center border-2 border-navy shadow-lg active:scale-95 transition-transform"
              aria-label="Change profile photo"
            >
              <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-navy" />
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-primary-foreground truncate">
              John Doe
            </h2>
            <p className="text-sm text-gold/80 flex items-center gap-1.5 truncate mt-0.5">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              john.doe@example.com
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 border border-gold/30">
                <Star className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-semibold text-gold">Premium Member</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Menu */}
      <div className="px-4 sm:px-5 max-w-lg mx-auto w-full mt-[-0.5rem] relative z-20">
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
          <MenuSection title="Account">
            {accountItems.map(({ icon: Icon, label, screen }) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                className="btn-press flex items-center gap-3 w-full px-4 py-3.5 sm:py-4 text-left hover:bg-muted/50 active:bg-muted/70 transition-colors first:rounded-t-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </MenuSection>
          <MenuSection title="App & preferences">
            {appItems.map(({ icon: Icon, label, screen }) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                className="btn-press flex items-center gap-3 w-full px-4 py-3.5 sm:py-4 text-left hover:bg-muted/50 active:bg-muted/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </MenuSection>
          <MenuSection title="Referrals">
            {referralItems.map(({ icon: Icon, label, screen }) => (
              <button
                key={label}
                onClick={() => navigate(screen)}
                className="btn-press flex items-center gap-3 w-full px-4 py-3.5 sm:py-4 text-left hover:bg-muted/50 active:bg-muted/70 transition-colors last:rounded-b-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </MenuSection>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="btn-press mt-4 flex items-center gap-3 w-full px-4 py-3.5 sm:py-4 bg-card rounded-2xl border border-destructive/20 text-left hover:bg-destructive/5 active:bg-destructive/10 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="flex-1 text-sm font-semibold text-destructive">Log out</span>
        </button>

        <p className="text-center text-[11px] text-muted-foreground mt-6">
          AscendiStat v2.0.1
        </p>
      </div>
    </div>
  )
}
