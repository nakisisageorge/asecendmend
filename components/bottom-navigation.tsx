"use client"

import { useApp, type Screen } from "@/lib/app-context"
import {
  Home,
  CalendarDays,
  MessageSquare,
  User,
  Asterisk,
} from "lucide-react"

const tabs = [
  { icon: Home, label: "Home", screen: "home" as Screen, index: 0 as const },
  { icon: CalendarDays, label: "Appointment", screen: "appointments" as Screen, index: 1 as const },
  { id: "sos", icon: Asterisk, label: "SOS", screen: "sos-confirm" as Screen, index: null },
  { icon: MessageSquare, label: "Membership", screen: "memberships" as Screen, index: 2 as const },
  { icon: User, label: "Profile", screen: "profile" as Screen, index: 3 as const },
]

export function BottomNavigation() {
  const { activeTab, setActiveTab, navigate } = useApp()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-40"
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex items-end justify-around max-w-lg mx-auto px-2 pb-2 pt-1 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon

          if (tab.id === "sos") {
            return (
              <button
                key="sos"
                onClick={() => navigate(tab.screen)}
                className="btn-press flex flex-col items-center gap-1 -mt-7"
                aria-label="SOS Emergency"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-pulse-ring-red bg-red-500 hover:bg-red-600 active:scale-95 transition-all duration-200"
                >
                  <Asterisk className="w-7 h-7 text-white" strokeWidth={3} />
                </div>
                <span className="text-[10px] font-bold text-red-500">SOS</span>
              </button>
            )
          }

          const isActive = tab.index !== null && activeTab === tab.index
          return (
            <button
              key={tab.label}
              onClick={() => {
                if (tab.index !== null) {
                  setActiveTab(tab.index)
                  navigate(tab.screen)
                }
              }}
              className="btn-press relative flex flex-col items-center gap-1 py-1.5 px-3"
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-navy animate-scale-in" />
              )}
              <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                  isActive ? "text-navy scale-110" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors duration-200 ${
                  isActive ? "text-navy font-semibold" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  )
}
