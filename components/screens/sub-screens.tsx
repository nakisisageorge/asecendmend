"use client"

import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Wallet,
  Send,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  CreditCard,
  Star,
  Gift,
  ChevronRight,
  User,
  Heart,
  Shield,
  Phone,
  Bell,
  Lock,
  HelpCircle,
  Users,
  Copy,
  Share2,
  Check,
  Crown,
} from "lucide-react"

/* Shared layout for profile sub-screens: navy header + responsive content */
function SubScreenLayout({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  const { goBack } = useApp()
  return (
    <div className={`flex flex-col min-h-full bg-background ${className}`}>
      <header className="bg-navy relative overflow-hidden px-4 sm:px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-6 sm:pb-8">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gold/5 -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-center gap-3 min-h-[44px]">
          <button
            onClick={goBack}
            className="btn-press -ml-1 p-2 rounded-xl text-gold/90 hover:text-gold active:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-primary-foreground truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-gold/70 truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </header>
      <div className="flex-1 px-4 sm:px-5 py-5 sm:py-6 max-w-lg mx-auto w-full">
        {children}
      </div>
    </div>
  )
}

// Wallet Screen
export function WalletScreen() {
  const { navigate } = useApp()

  return (
    <SubScreenLayout title="Wallet">
      <div className="flex flex-col gap-6">
        <div className="bg-navy-light/50 rounded-2xl p-5 sm:p-6 border border-gold/10 -mt-2">
          <p className="text-gold/70 text-xs font-medium uppercase tracking-wider">Available Balance</p>
          <p className="text-3xl sm:text-4xl font-bold text-foreground mt-1">$1,240.00</p>
          <div className="flex gap-3 mt-5">
            <Button
              size="sm"
              className="flex-1 bg-gold text-navy hover:bg-gold-light h-11 font-medium rounded-xl"
              onClick={() => navigate("send-money")}
            >
              <Send className="w-4 h-4 mr-1.5" /> Send
            </Button>
            <Button size="sm" className="flex-1 bg-card border border-border text-foreground hover:bg-muted h-11 font-medium rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" /> Top Up
            </Button>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Transactions</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Appointment Payment", amount: "-$59.00", date: "Feb 20", icon: ArrowUpRight, color: "text-destructive" },
              { label: "Wallet Top Up", amount: "+$200.00", date: "Feb 18", icon: ArrowDownLeft, color: "text-success" },
              { label: "Membership Fee", amount: "-$59.00", date: "Feb 1", icon: ArrowUpRight, color: "text-destructive" },
              { label: "Referral Bonus", amount: "+$25.00", date: "Jan 28", icon: ArrowDownLeft, color: "text-success" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-4 hover:border-gold/20 transition-colors">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tx.color === "text-success" ? "bg-success/10" : "bg-destructive/10"}`}>
                  <tx.icon className={`w-5 h-5 ${tx.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{tx.label}</h4>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${tx.color}`}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubScreenLayout>
  )
}

// Send Money Screen
export function SendMoneyScreen() {
  const { goBack } = useApp()

  return (
    <SubScreenLayout title="Send Money">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="recipient" className="text-sm font-medium text-foreground">Recipient</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="recipient" placeholder="Name or email" className="pl-11 h-12 bg-card border-border rounded-xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount" className="text-sm font-medium text-foreground">Amount</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-foreground">$</span>
            <Input id="amount" type="number" placeholder="0.00" className="pl-9 h-14 bg-card border-border rounded-xl text-2xl font-bold" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="note" className="text-sm font-medium text-foreground">Note (optional)</Label>
          <Input id="note" placeholder="What's this for?" className="h-12 bg-card border-border rounded-xl" />
        </div>
        <Button size="lg" onClick={goBack} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 mt-2 font-medium">
          <Send className="w-4 h-4 mr-2" />
          Send Money
        </Button>
      </div>
    </SubScreenLayout>
  )
}

// Points Screen
export function PointsScreen() {
  const { navigate } = useApp()

  return (
    <SubScreenLayout title="My Points">
      <div className="flex flex-col gap-6 -mt-2">
        <div className="bg-navy-light/50 rounded-2xl p-6 sm:p-8 border border-gold/10 text-center">
          <Star className="w-12 h-12 text-gold mx-auto mb-3" />
          <p className="text-4xl sm:text-5xl font-bold text-foreground">2,580</p>
          <p className="text-sm text-muted-foreground mt-1">Total Points</p>
          <Button
            onClick={() => navigate("redemption")}
            className="mt-5 bg-gold text-navy hover:bg-gold-light font-medium rounded-xl h-11 px-6"
          >
            <Gift className="w-4 h-4 mr-1.5" /> Redeem Points
          </Button>
        </div>

        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3">Points History</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: "Appointment Booking", points: "+50", date: "Feb 20" },
              { label: "Referral Bonus", points: "+200", date: "Feb 18" },
              { label: "Membership Reward", points: "+100", date: "Feb 1" },
              { label: "Redeemed", points: "-500", date: "Jan 25" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-2xl border border-border p-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  item.points.startsWith("+") ? "bg-gold/10" : "bg-muted"
                }`}>
                  <Star className={`w-5 h-5 ${item.points.startsWith("+") ? "text-gold" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${
                  item.points.startsWith("+") ? "text-gold" : "text-muted-foreground"
                }`}>{item.points}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubScreenLayout>
  )
}

// Redemption Screen
export function RedemptionScreen() {
  return (
    <SubScreenLayout title="Redeem Points">
      <div className="flex flex-col gap-3 -mt-2">
        {[
          { title: "$10 Wallet Credit", points: "500 pts", desc: "Add to your wallet balance" },
          { title: "$25 Wallet Credit", points: "1,000 pts", desc: "Add to your wallet balance" },
          { title: "Free Appointment", points: "1,500 pts", desc: "One general checkup" },
          { title: "1 Month Premium", points: "3,000 pts", desc: "Premium Care membership" },
        ].map((item, i) => (
          <button key={i} className="btn-press bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 text-left hover:border-gold/20 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
            <div className="px-3 py-1.5 bg-primary/10 rounded-lg shrink-0">
              <span className="text-xs font-bold text-primary">{item.points}</span>
            </div>
          </button>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Referral Screen
export function ReferralScreen() {
  return (
    <SubScreenLayout title="My Referral">
      <div className="flex flex-col gap-6 -mt-2">
        <div className="bg-navy-light/50 rounded-2xl p-5 sm:p-6 border border-gold/10 text-center">
          <Gift className="w-12 h-12 text-gold mx-auto mb-3" />
          <h3 className="text-foreground font-bold text-lg">Invite Friends</h3>
          <p className="text-sm text-muted-foreground mt-1">Earn 200 points for each referral</p>
          <div className="mt-4 flex items-center gap-2 bg-card rounded-xl p-3 border border-border">
            <code className="flex-1 text-gold font-mono text-sm sm:text-base tracking-wider truncate text-left">ASC-JD2026X</code>
            <button className="btn-press w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0" aria-label="Copy code">
              <Copy className="w-4 h-4 text-gold" />
            </button>
          </div>
          <Button className="w-full mt-4 bg-gold text-navy hover:bg-gold-light font-medium rounded-xl h-11">
            <Share2 className="w-4 h-4 mr-1.5" /> Share Referral Code
          </Button>
        </div>
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3">How it works</h3>
          <div className="flex flex-col gap-3">
            {[
              { step: "1", title: "Share your code", desc: "Send your unique referral code to friends" },
              { step: "2", title: "They sign up", desc: "Friend creates an account using your code" },
              { step: "3", title: "Both earn", desc: "You get 200 points, they get 100 points" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 bg-card rounded-2xl border border-border p-4">
                <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-gold">{item.step}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SubScreenLayout>
  )
}

// Referred Users Screen
export function ReferredUsersScreen() {
  return (
    <SubScreenLayout title="Referred Users">
      <div className="flex flex-col gap-3 -mt-2">
        {[
          { name: "Jane Smith", date: "Feb 10, 2026", status: "Active" },
          { name: "Bob Wilson", date: "Jan 15, 2026", status: "Active" },
          { name: "Alice Brown", date: "Dec 20, 2025", status: "Inactive" },
        ].map((user, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 hover:border-gold/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-sm">{user.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{user.name}</h4>
              <p className="text-xs text-muted-foreground">Joined {user.date}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
              user.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
            }`}>{user.status}</span>
          </div>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Personal Information Screen
export function PersonalInfoScreen() {
  const { goBack } = useApp()

  return (
    <SubScreenLayout title="Personal Information">
      <div className="flex flex-col gap-4 -mt-2">
        <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 flex flex-col gap-4">
          {[
            { label: "First Name", value: "John" },
            { label: "Last Name", value: "Doe" },
            { label: "Email", value: "john.doe@example.com" },
            { label: "Phone", value: "+1 (555) 000-0000" },
            { label: "Date of Birth", value: "January 15, 1990" },
            { label: "Gender", value: "Male" },
            { label: "Blood Type", value: "O+" },
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">{field.label}</Label>
              <Input defaultValue={field.value} className="h-11 bg-muted/50 border-border rounded-xl" />
            </div>
          ))}
        </div>
        <Button size="lg" onClick={goBack} className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
          Save Changes
        </Button>
      </div>
    </SubScreenLayout>
  )
}

// Medical History Screen
export function MedicalHistoryScreen() {
  return (
    <SubScreenLayout title="Medical History">
      <div className="flex flex-col gap-4 -mt-2">
        {[
          { title: "Allergies", items: ["Penicillin", "Peanuts"], icon: Shield },
          { title: "Current Medications", items: ["Lisinopril 10mg", "Metformin 500mg"], icon: Heart },
          { title: "Past Surgeries", items: ["Appendectomy (2018)"], icon: Plus },
          { title: "Chronic Conditions", items: ["Type 2 Diabetes", "Hypertension"], icon: Heart },
        ].map((section) => (
          <div key={section.title} className="bg-card rounded-2xl border border-border p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                <section.icon className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{section.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.items.map((item) => (
                <span key={item} className="px-3 py-1.5 bg-secondary rounded-xl text-xs font-medium text-foreground">
                  {item}
                </span>
              ))}
              <button className="btn-press px-3 py-1.5 bg-gold/10 rounded-xl text-xs font-medium text-gold border border-gold/20 hover:bg-gold/20 transition-colors">
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Insurance Information Screen
export function InsuranceInfoScreen() {
  return (
    <SubScreenLayout title="Insurance Information">
      <div className="flex flex-col gap-4 -mt-2">
        <div className="bg-card rounded-2xl border border-gold/20 p-5 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground text-base sm:text-lg">BlueCross Shield</h3>
              <p className="text-xs text-muted-foreground mt-0.5">PPO Plan</p>
            </div>
            <span className="px-2.5 py-1 bg-success/10 rounded-lg text-[10px] font-semibold text-success shrink-0">Active</span>
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs text-muted-foreground">Policy Number</span>
              <span className="text-xs font-medium text-foreground truncate">BC-2026-XXXXX</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs text-muted-foreground">Group Number</span>
              <span className="text-xs font-medium text-foreground">GRP-12345</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-xs text-muted-foreground">Valid Until</span>
              <span className="text-xs font-medium text-foreground">Dec 31, 2026</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full h-12 rounded-xl border-gold/30 text-gold hover:bg-gold/5 font-medium">
          <Plus className="w-4 h-4 mr-1.5" /> Add Insurance Plan
        </Button>
      </div>
    </SubScreenLayout>
  )
}

// Emergency Contacts Screen
export function EmergencyContactsScreen() {
  return (
    <SubScreenLayout title="Emergency Contacts">
      <div className="flex flex-col gap-3 -mt-2">
        {[
          { name: "Jane Doe", relation: "Spouse", phone: "+1 (555) 111-2222" },
          { name: "Robert Doe", relation: "Father", phone: "+1 (555) 333-4444" },
        ].map((contact, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 hover:border-gold/20 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">{contact.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{contact.relation} · {contact.phone}</p>
            </div>
            <button className="btn-press w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 hover:bg-gold/20 transition-colors" aria-label={`Call ${contact.name}`}>
              <Phone className="w-4 h-4 text-gold" />
            </button>
          </div>
        ))}
        <Button variant="outline" className="w-full h-12 rounded-xl border-gold/30 text-gold hover:bg-gold/5 font-medium mt-1">
          <Plus className="w-4 h-4 mr-1.5" /> Add Contact
        </Button>
      </div>
    </SubScreenLayout>
  )
}

// Settings Screen (Notifications)
export function SettingsScreen() {
  return (
    <SubScreenLayout title="Notifications">
      <div className="flex flex-col gap-2 -mt-2">
        {[
          { label: "Push Notifications", desc: "Receive alerts and updates", enabled: true },
          { label: "Email Notifications", desc: "Important emails from AscendiStat", enabled: true },
          { label: "SMS Notifications", desc: "Text alerts for appointments", enabled: false },
          { label: "Sound", desc: "Notification sounds", enabled: true },
          { label: "Vibration", desc: "Vibrate on notifications", enabled: true },
        ].map((item, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{item.label}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
            <button
              className={`w-12 h-7 rounded-full p-0.5 transition-colors shrink-0 ${
                item.enabled ? "bg-gold" : "bg-muted"
              }`}
              role="switch"
              aria-checked={item.enabled}
              aria-label={item.label}
            >
              <div className={`w-6 h-6 rounded-full bg-card shadow-sm transition-transform duration-200 ${
                item.enabled ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Privacy & Security Screen
export function PrivacySecurityScreen() {
  return (
    <SubScreenLayout title="Privacy & Security">
      <div className="flex flex-col gap-2 -mt-2">
        {[
          { icon: Lock, label: "Change Password", desc: "Update your password" },
          { icon: Shield, label: "Two-Factor Authentication", desc: "Add extra security" },
          { icon: Bell, label: "Login Alerts", desc: "Get notified of new logins" },
          { icon: Users, label: "Active Sessions", desc: "Manage logged-in devices" },
        ].map(({ icon: Icon, label, desc }, i) => (
          <button key={i} className="btn-press bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 text-left hover:border-gold/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{label}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Help & Support Screen
export function HelpSupportScreen() {
  return (
    <SubScreenLayout title="Help & Support">
      <div className="flex flex-col gap-2 -mt-2">
        {[
          { icon: HelpCircle, label: "FAQ", desc: "Frequently asked questions" },
          { icon: Phone, label: "Contact Support", desc: "Call or email our team" },
          { icon: Shield, label: "Terms of Service", desc: "Read our terms" },
          { icon: Lock, label: "Privacy Policy", desc: "How we handle your data" },
        ].map(({ icon: Icon, label, desc }, i) => (
          <button key={i} className="btn-press bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 text-left hover:border-gold/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{label}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Invoices Screen
export function InvoicesScreen() {
  return (
    <SubScreenLayout title="Invoices">
      <div className="flex flex-col gap-2 -mt-2">
        {[
          { id: "INV-001", date: "Feb 20, 2026", amount: "$59.00", desc: "Dr. Johnson Consultation" },
          { id: "INV-002", date: "Feb 1, 2026", amount: "$59.00", desc: "Premium Membership" },
          { id: "INV-003", date: "Jan 15, 2026", amount: "$120.00", desc: "Lab Tests" },
          { id: "INV-004", date: "Jan 5, 2026", amount: "$59.00", desc: "Premium Membership" },
        ].map((inv, i) => (
          <button key={i} className="btn-press bg-card rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3 text-left hover:border-gold/20 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">{inv.desc}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{inv.id} · {inv.date}</p>
            </div>
            <span className="text-sm font-semibold text-foreground shrink-0">{inv.amount}</span>
          </button>
        ))}
      </div>
    </SubScreenLayout>
  )
}

// Membership Details Screen
export function MembershipDetailsScreen() {
  const { navigate } = useApp()

  return (
    <SubScreenLayout title="Plan Details">
      <div className="flex flex-col gap-5 -mt-2">
        <div className="bg-card rounded-2xl border border-gold p-5 sm:p-6 text-center">
          <Crown className="w-12 h-12 text-gold mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Premium Care</h2>
          <div className="flex items-baseline justify-center gap-0.5 mt-2">
            <span className="text-3xl sm:text-4xl font-bold text-primary">$59</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">{"What's included"}</h3>
          <div className="flex flex-col gap-2">
            {["Unlimited appointments", "Priority chat & call", "Full health tracking", "Specialist access", "Emergency SOS priority", "24/7 Support", "Family member discount"].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate("membership-checkout")}
          className="w-full h-12 rounded-xl bg-gold text-navy hover:bg-gold-light font-bold"
        >
          Subscribe Now
        </Button>
      </div>
    </SubScreenLayout>
  )
}

// Membership Checkout Screen
export function MembershipCheckoutScreen() {
  const { goBack } = useApp()

  return (
    <SubScreenLayout title="Checkout">
      <div className="flex flex-col gap-5 -mt-2">
        <div className="bg-card rounded-2xl border border-border p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Premium Care Plan</span>
            <span className="text-sm font-medium text-foreground">$59.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Tax</span>
            <span className="text-sm font-medium text-foreground">$0.00</span>
          </div>
          <div className="border-t border-border pt-3 mt-2 flex justify-between">
            <span className="text-sm font-semibold text-foreground">Total</span>
            <span className="text-sm font-bold text-primary">$59.00</span>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="card-number" className="text-xs font-medium text-muted-foreground">Card Number</Label>
              <Input id="card-number" placeholder="4242 4242 4242 4242" className="h-11 bg-muted/50 border-border rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="expiry" className="text-xs font-medium text-muted-foreground">Expiry</Label>
                <Input id="expiry" placeholder="MM/YY" className="h-11 bg-muted/50 border-border rounded-xl" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="cvc" className="text-xs font-medium text-muted-foreground">CVC</Label>
                <Input id="cvc" placeholder="123" className="h-11 bg-muted/50 border-border rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={goBack}
          className="w-full h-12 rounded-xl bg-gold text-navy hover:bg-gold-light font-bold"
        >
          Pay $59.00
        </Button>
      </div>
    </SubScreenLayout>
  )
}
