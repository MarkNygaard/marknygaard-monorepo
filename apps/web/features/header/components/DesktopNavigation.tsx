import Link from "next/link"
import { Search } from "@/components/Elements/Search"
import { ThemeToggle } from "@/components/Elements/ThemeToggle"
import type { LAYOUT_QUERY_RESULT } from "@/types/sanity"
import { NavItemDesktop } from "./NavItemDesktop"

type DesktopNavigationProps = Partial<
  Pick<NonNullable<LAYOUT_QUERY_RESULT["header"]>, "logo" | "links">
>

export default function DesktopNavigation({ logo, links }: DesktopNavigationProps) {
  if (!logo || !links) return null

  return (
    <nav className="container sticky top-0 z-10 mx-auto">
      <div className="mx-auto max-w-6xl">
        <div className="hidden md:block">
          <div className="relative w-full">
            <div className="my-3 items-center justify-center rounded-sm border-border/80 bg-linear-to-b from-primary to-primary/80 px-3 dark:border dark:border-border/50 dark:from-muted/90 dark:to-muted/90">
              <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
                <Link
                  href="/"
                  className="cursor-pointer"
                  /* biome-ignore lint/security/noDangerouslySetInnerHtml: SVG content is from trusted Sanity CMS */
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
                <div className="flex divide-x divide-muted-foreground/30">
                  <div className="flex items-center space-x-8 pr-5">
                    {links.map((link) => (
                      <NavItemDesktop key={link._key} data={link} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pl-5">
                    <Search />
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
