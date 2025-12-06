import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/components/auth-provider"
import { Nav } from "@/components/nav"
import "@workspace/ui/globals.css"

export const metadata: Metadata = {
  title: "Chatbot Conversations",
  description: "View and manage chatbot conversation history",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Nav />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
