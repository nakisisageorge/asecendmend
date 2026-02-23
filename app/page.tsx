"use client"

import { AppProvider, useApp } from "@/lib/app-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SplashScreen } from "@/components/screens/splash-screen"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { LoginScreen } from "@/components/screens/login-screen"
import { SignupScreen } from "@/components/screens/signup-screen"
import { OTPVerificationScreen } from "@/components/screens/otp-screen"
import { ForgotPasswordScreen } from "@/components/screens/forgot-password-screen"
import { HomeScreen } from "@/components/screens/home-screen"
import { AppointmentsScreen } from "@/components/screens/appointments-screen"
import { BookAppointmentScreen } from "@/components/screens/book-appointment-screen"
import { AppointmentDetailsScreen } from "@/components/screens/appointment-details-screen"
import { MembershipsScreen } from "@/components/screens/memberships-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { SOSConfirmScreen, EmergencySOSScreen, IncidentTrackingScreen } from "@/components/screens/sos-screens"
import { ChatScreen } from "@/components/screens/chat-screen"
import {
  WalletScreen,
  SendMoneyScreen,
  PointsScreen,
  RedemptionScreen,
  ReferralScreen,
  ReferredUsersScreen,
  PersonalInfoScreen,
  MedicalHistoryScreen,
  InsuranceInfoScreen,
  EmergencyContactsScreen,
  SettingsScreen,
  PrivacySecurityScreen,
  HelpSupportScreen,
  InvoicesScreen,
  MembershipDetailsScreen,
  MembershipCheckoutScreen,
} from "@/components/screens/sub-screens"
import { useMemo } from "react"

const screensWithBottomNav = new Set([
  "home",
  "appointments",
  "memberships",
  "profile",
])

function ScreenRenderer() {
  const { currentScreen, isAuthenticated, navDirection } = useApp()

  const screens: Record<string, React.ReactNode> = {
    splash: <SplashScreen />,
    onboarding: <OnboardingScreen />,
    login: <LoginScreen />,
    signup: <SignupScreen />,
    "otp-verification": <OTPVerificationScreen />,
    "forgot-password": <ForgotPasswordScreen />,
    home: <HomeScreen />,
    appointments: <AppointmentsScreen />,
    "book-appointment": <BookAppointmentScreen />,
    "appointment-details": <AppointmentDetailsScreen />,
    memberships: <MembershipsScreen />,
    "membership-details": <MembershipDetailsScreen />,
    "membership-checkout": <MembershipCheckoutScreen />,
    profile: <ProfileScreen />,
    "personal-info": <PersonalInfoScreen />,
    "medical-history": <MedicalHistoryScreen />,
    "insurance-info": <InsuranceInfoScreen />,
    "emergency-contacts": <EmergencyContactsScreen />,
    wallet: <WalletScreen />,
    "send-money": <SendMoneyScreen />,
    invoices: <InvoicesScreen />,
    settings: <SettingsScreen />,
    "privacy-security": <PrivacySecurityScreen />,
    "help-support": <HelpSupportScreen />,
    referral: <ReferralScreen />,
    "referred-users": <ReferredUsersScreen />,
    points: <PointsScreen />,
    redemption: <RedemptionScreen />,
    "sos-confirm": <SOSConfirmScreen />,
    "emergency-sos": <EmergencySOSScreen />,
    "incident-tracking": <IncidentTrackingScreen />,
    chat: <ChatScreen />,
    "notifications-settings": <SettingsScreen />,
  }

  const showBottomNav = isAuthenticated && screensWithBottomNav.has(currentScreen)

  const animationClass = useMemo(() => {
    switch (navDirection) {
      case "forward":
        return "animate-slide-in-right"
      case "back":
        return "animate-slide-in-left"
      case "tab":
        return "animate-fade-in"
      case "none":
      default:
        return ""
    }
  }, [navDirection, currentScreen]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative max-w-lg mx-auto bg-background min-h-screen shadow-2xl overflow-hidden">
      <main
        key={currentScreen}
        className={`${showBottomNav ? "pb-24" : ""} ${animationClass}`}
      >
        {screens[currentScreen] || <HomeScreen />}
      </main>
      {showBottomNav && <BottomNavigation />}
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-muted">
      <AppProvider>
        <ScreenRenderer />
      </AppProvider>
    </div>
  )
}
