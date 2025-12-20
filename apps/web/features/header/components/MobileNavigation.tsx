import { cn } from "@workspace/common/cn"
import { Search } from "@/components/Elements/Search"
import { ThemeToggle } from "@/components/Elements/ThemeToggle"
import type { LAYOUT_QUERY_RESULT } from "@/types/sanity"
import MobileNavigationMenu from "./MobileNavigationMenu"

type MobileNavigationProps = Partial<Pick<NonNullable<LAYOUT_QUERY_RESULT["header"]>, "links">>

export default function MobileNavigation({ links }: MobileNavigationProps) {
  return (
    <nav
      className={cn(
        "container relative z-50 mx-auto px-4 md:hidden",
        "standalone:w-screen standalone:pt-safe-top",
      )}
    >
      <div className="standalone:my-1 mt-1 mb-3 flex flex-1 justify-between">
        <MobileNavigationMenu links={links} />
        <div className="ml-5 flex space-x-3">
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
