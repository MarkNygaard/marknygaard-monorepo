import { Inter } from "next/font/google"
import "@workspace/ui/globals.css"

import { cn } from "@workspace/common/cn"
import { draftMode } from "next/headers"
import { VisualEditing } from "next-sanity/visual-editing"
import { DisableDraftMode } from "@/components/DisableDraftMode"
import { ThemeColorUpdater } from "@/components/Elements/ThemeColorUpdater"
import { Providers } from "@/components/providers"
import { Footer } from "@/features/footer/components/Footer"
import { Header } from "@/features/header/components/Header"
import { SanityLive, sanityFetch } from "@/lib/sanity/live"
import { LAYOUT_QUERY } from "@/lib/sanity/queries"

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data: layoutData } = await sanityFetch({
    query: LAYOUT_QUERY,
  })

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        style={{ WebkitTapHighlightColor: "transparent" }}
        className={cn("flex min-h-screen flex-col font-sans antialiased", inter.className)}
      >
        <Providers>
          <ThemeColorUpdater />
          <Header {...layoutData.header} />
          <main className="container mx-auto flex-1 px-4 standalone:pt-safe-top pb-6 sm:pb-16 standalone:md:mt-0 md:py-10 standalone:md:pt-6">
            <div className="mx-auto max-w-5xl">{children}</div>
          </main>
          <Footer {...layoutData.footer} />
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
