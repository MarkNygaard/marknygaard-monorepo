import { SanityLink } from "@/components/Elements/SanityLink";
import { SanityImage } from "@/components/SanityImage"
import type { LAYOUT_QUERYResult } from "@/types/sanity"
import { Link } from "lucide-react"

type HeaderProps = Partial<
	Pick<NonNullable<LAYOUT_QUERYResult["header"]>, "logo" | "links">
>;

export function Header({logo, links}: HeaderProps) {
  if(!logo || !links) return null;

  return (
    <div className="flex bg-card border-border max-w-6xl mx-auto py-8 px-16 my-3 rounded-sm">
      <SanityImage image={logo} width={26} height={26} alt="logo" />
      <div className="flex"> 
        {links.map((link) => <SanityLink key={link._key} data={link} />)}
      </div>
    </div>
  )
}
