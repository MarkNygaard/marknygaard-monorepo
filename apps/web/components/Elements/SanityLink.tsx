import Link from "next/link"
import type { ReactNode } from "react"
import type { ResolveReferences } from "@/lib/resolveReference"
import type { Link as LinkType } from "@/types/sanity"

interface BaseLinkProps {
  data: ResolveReferences<LinkType>
  className?: string
  children?: ReactNode
}

export function SanityLink({ data, children, className }: BaseLinkProps) {
  const { name, linkType, internalLink, externalLink } = data

  if (linkType === "internal" && internalLink?.slug?.current)
    return (
      <Link href={internalLink.slug.current} className={className}>
        {children ? children : name || internalLink?.title}
      </Link>
    )

  return (
    <a
      href={externalLink || "/"}
      target={externalLink ? "_blank" : undefined}
      rel={externalLink ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children ?? name}
    </a>
  )
}
