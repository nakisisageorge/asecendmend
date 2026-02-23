"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import {
  Crown,
  Check,
  Star,
  ChevronRight,
  CreditCard,
  Clock,
  Zap,
} from "lucide-react"

const plans = [
  {
    id: 1,
    name: "Basic Care",
    price: "$29",
    period: "/month",
    features: ["5 appointments/month", "Basic chat support", "Health tracking", "Email support"],
    popular: false,
  },
  {
    id: 2,
    name: "Premium Care",
    price: "$59",
    period: "/month",
    features: ["Unlimited appointments", "Priority chat & call", "Full health tracking", "Specialist access", "Emergency SOS priority"],
    popular: true,
  },
  {
    id: 3,
    name: "Family Plan",
    price: "$99",
    period: "/month",
    features: ["Up to 5 family members", "All Premium features", "Family health dashboard", "Dedicated coordinator", "Home visits"],
    popular: false,
  },
]

export function MembershipsScreen() {
  const { navigate } = useApp()
  const [activeTab, setActiveTab] = useState("plans")

  const tabs = ["plans", "active", "history", "payments"]

  return (
    <div className="flex flex-col pb-4 bg-background min-h-full">
      {/* Header */}
      <div className="bg-navy px-5 pt-12 pb-6">
        <h1 className="text-xl font-bold text-primary-foreground mb-4">Memberships</h1>
        <div className="flex gap-1 bg-navy-light rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-gold text-navy"
                  : "text-gold/60 hover:text-gold/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-4 flex flex-col gap-4">
        {activeTab === "plans" && (
          <>
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => navigate("membership-details")}
                className={`relative bg-card rounded-2xl border p-5 text-left transition-all hover:shadow-md ${
                  plan.popular ? "border-gold shadow-sm" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-5 px-3 py-1 bg-gold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-navy" />
                    <span className="text-[10px] font-bold text-navy uppercase">Most Popular</span>
                  </div>
                )}
                <div className="flex items-start justify-between mt-1">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-2xl font-bold text-primary">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${plan.popular ? "bg-gold/20" : "bg-primary/10"}`}>
                    <Crown className={`w-5 h-5 ${plan.popular ? "text-gold" : "text-primary"}`} />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${plan.popular ? "text-gold" : "text-success"}`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1 mt-4 text-xs font-medium text-gold">
                  View Details <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </>
        )}

        {activeTab === "active" && (
          <div className="bg-card rounded-2xl border border-gold p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Premium Care</h3>
                <p className="text-xs text-muted-foreground">Active since Jan 2026</p>
              </div>
              <div className="ml-auto px-3 py-1 bg-success/10 rounded-full">
                <span className="text-xs font-medium text-success">Active</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 py-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next billing</span>
                <span className="text-sm font-medium text-foreground">Mar 1, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium text-foreground">$59.00/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Appointments used</span>
                <span className="text-sm font-medium text-foreground">8 this month</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col gap-3">
            {[
              { plan: "Premium Care", period: "Jan 2026 - Current", amount: "$59.00", status: "Active" },
              { plan: "Basic Care", period: "Oct 2025 - Dec 2025", amount: "$29.00", status: "Expired" },
              { plan: "Basic Care", period: "Jul 2025 - Sep 2025", amount: "$29.00", status: "Expired" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{item.plan}</h4>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{item.amount}</p>
                  <p className={`text-[10px] font-medium ${item.status === "Active" ? "text-success" : "text-muted-foreground"}`}>{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "payments" && (
          <div className="flex flex-col gap-3">
            {[
              { date: "Feb 1, 2026", amount: "$59.00", method: "Visa ****4242", status: "Paid" },
              { date: "Jan 1, 2026", amount: "$59.00", method: "Visa ****4242", status: "Paid" },
              { date: "Dec 1, 2025", amount: "$29.00", method: "Visa ****4242", status: "Paid" },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{item.amount}</h4>
                  <p className="text-xs text-muted-foreground">{item.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                  <p className="text-[10px] font-medium text-success">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
