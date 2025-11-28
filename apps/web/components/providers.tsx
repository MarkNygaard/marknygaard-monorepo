"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useState } from "react"
import ActiveSectionContextProvider from "@/context/ActiveSectionContext"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <QueryClientProvider client={queryClient}>
        <ActiveSectionContextProvider>{children}</ActiveSectionContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
