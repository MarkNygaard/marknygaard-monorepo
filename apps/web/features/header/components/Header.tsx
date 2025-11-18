import type { LAYOUT_QUERYResult } from "@/types/sanity"
import DesktopNavigation from "./DesktopNavigation"
import MobileNavigation from "./MobileNavigation"

type HeaderProps = Partial<Pick<NonNullable<LAYOUT_QUERYResult["header"]>, "logo" | "links">>

export function Header({ logo, links }: HeaderProps) {
  return (
    <>
      <DesktopNavigation logo={logo} links={links} />
      <MobileNavigation links={links} />
    </>
  )
}
