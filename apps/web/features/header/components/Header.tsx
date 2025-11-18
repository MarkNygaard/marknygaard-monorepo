import Link from "next/link"
import { Search } from "@/components/Elements/Search"
import { ThemeToggle } from "@/components/Elements/ThemeToggle"
import type { LAYOUT_QUERYResult } from "@/types/sanity"
import { NavItemDesktop } from "./NavItemDesktop"

type HeaderProps = Partial<Pick<NonNullable<LAYOUT_QUERYResult["header"]>, "logo" | "links">>

export function Header({ logo, links }: HeaderProps) {
  if (!logo || !links) return null

  return (
    <nav className="container sticky top-0 z-10 mx-auto">
      <div className="mx-auto max-w-6xl">
        <div className="hidden md:block">
          <div className="relative w-full">
            <div className="my-3 items-center justify-center rounded-sm border-border/80 bg-linear-to-b from-primary to-primary/80 px-3 dark:border dark:border-border/50 dark:from-muted/90 dark:to-muted/90">
              <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
                <Link href="/" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.2"
                    viewBox="0 0 165 165"
                    width="26"
                    height="26"
                    fill="currentColor"
                    stroke="currentColor"
                  >
                    <title>Logo</title>
                    <g id="Layer">
                      <path
                        id="Layer"
                        d="m4 8.2v6.7l39.1 40 39.2 40 27.6-28.2c15.2-15.5 30.9-31.6 34.8-35.7l7.3-7.5v70.7 70.8h4.5 4.5v-81.8l-0.1-81.7-39.3 40-39.3 40-27.9-28.5c-15.3-15.7-32.9-33.7-39.1-40l-11.3-11.5z"
                      ></path>
                      <path
                        id="Layer"
                        d="m4 102.3v62.7h4.5 4.5v-51.3-51.2l16.8 17c9.3 9.3 31.9 32.4 50.3 51.3l33.5 34.3 6.2-0.3 6.3-0.3-58.7-60c-32.2-33-59.6-61.1-61-62.5l-2.4-2.5z"
                      ></path>
                    </g>
                  </svg>
                </Link>
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
