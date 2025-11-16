"use client"

import { ThemeProvider } from "next-themes"
import type * as React from "react"
import ActiveSectionContextProvider from "@/context/ActiveSectionContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
    </ThemeProvider>
  )
}
