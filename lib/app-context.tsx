"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "signup"
  | "forgot-password"
  | "otp-verification"
  | "home"
  | "appointments"
  | "memberships"
  | "profile"
  | "book-appointment"
  | "appointment-details"
  | "membership-details"
  | "membership-checkout"
  | "personal-info"
  | "medical-history"
  | "insurance-info"
  | "emergency-contacts"
  | "wallet"
  | "send-money"
  | "invoices"
  | "settings"
  | "privacy-security"
  | "help-support"
  | "referral"
  | "referred-users"
  | "points"
  | "redemption"
  | "sos-confirm"
  | "emergency-sos"
  | "incident-tracking"
  | "chat"
  | "notifications-settings"

export type NavigationDirection = "forward" | "back" | "tab" | "none"
type TabIndex = 0 | 1 | 2 | 3

interface AppContextType {
  currentScreen: Screen
  previousScreen: Screen | null
  activeTab: TabIndex
  isAuthenticated: boolean
  navDirection: NavigationDirection
  navigate: (screen: Screen) => void
  goBack: () => void
  setActiveTab: (index: TabIndex) => void
  login: () => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash")
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null)
  const [screenHistory, setScreenHistory] = useState<Screen[]>([])
  const [activeTab, setActiveTabState] = useState<TabIndex>(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [navDirection, setNavDirection] = useState<NavigationDirection>("none")

  const navigate = useCallback((screen: Screen) => {
    setNavDirection("forward")
    setScreenHistory(prev => [...prev, currentScreen])
    setPreviousScreen(currentScreen)
    setCurrentScreen(screen)
  }, [currentScreen])

  const goBack = useCallback(() => {
    setNavDirection("back")
    setScreenHistory(prev => {
      const newHistory = [...prev]
      const lastScreen = newHistory.pop()
      if (lastScreen) {
        setCurrentScreen(lastScreen)
        setPreviousScreen(newHistory[newHistory.length - 1] || null)
      }
      return newHistory
    })
  }, [])

  const setActiveTab = useCallback((index: TabIndex) => {
    setNavDirection("tab")
    setActiveTabState(index)
  }, [])

  const login = useCallback(() => {
    setNavDirection("forward")
    setIsAuthenticated(true)
    setScreenHistory([])
    setCurrentScreen("home")
    setActiveTabState(0)
  }, [])

  const logout = useCallback(() => {
    setNavDirection("back")
    setIsAuthenticated(false)
    setScreenHistory([])
    setCurrentScreen("login")
  }, [])

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        previousScreen,
        activeTab,
        isAuthenticated,
        navDirection,
        navigate,
        goBack,
        setActiveTab,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
}
