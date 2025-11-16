import type { LAYOUT_QUERYResult } from "@/types/sanity"

type FooterProps = Partial<
	Pick<NonNullable<LAYOUT_QUERYResult["footer"]>, "links" | "copyrightText">
>;

export function Footer({links, copyrightText}: FooterProps) {
  return <div />
}
