import { Inter } from "next/font/google"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { Providers } from "@/components/providers"
import { SanityLive } from "@/lib/sanity/live"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", inter.className)}>
        <Providers>
          {children}
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </Providers>
        <SanityLive />
      </body>
    </html>
  )
}
