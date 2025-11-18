"use client"

import { cn } from "@workspace/common/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import type { LAYOUT_QUERYResult } from "@/types/sanity"

type LinkFromLayout = NonNullable<LAYOUT_QUERYResult["header"]>["links"][number]

interface BaseLinkProps {
  data: LinkFromLayout
  className?: string
  children?: ReactNode
}

export function NavItemDesktop({ data, children, className }: BaseLinkProps) {
  const { name, linkType, internalLink, externalLink } = data
  const href =
    linkType === "internal" && internalLink?.slug?.current
      ? internalLink.slug.current.startsWith("/")
        ? internalLink.slug.current
        : `/${internalLink.slug.current}`
      : externalLink || "/"
  const path = usePathname()
  const isActive = path === (href.startsWith("/") ? href : `/${href}`)

  if (linkType === "internal" && internalLink?.slug?.current)
    return (
      <Link
        href={href}
        className={cn(
          isActive
            ? "active text-primary-foreground transition dark:text-secondary-foreground"
            : "text-muted-foreground transition-all duration-300 ease-out hover:text-primary-foreground hover:ease-in dark:text-secondary-foreground/50 dark:hover:text-secondary-foreground",
          "underlined h-fit font-light text-base",
          className,
        )}
      >
        {children ? children : name || internalLink?.title}
      </Link>
    )

  return (
    <a
      href={href}
      target={externalLink ? "_blank" : undefined}
      rel={externalLink ? "noopener noreferrer" : undefined}
      className={cn(
        isActive
          ? "active text-primary-foreground transition dark:text-secondary-foreground"
          : "text-muted-foreground transition-all duration-300 ease-out hover:text-primary-foreground hover:ease-in dark:text-secondary-foreground/50 dark:hover:text-secondary-foreground",
        "underlined h-fit font-light text-base",
        className,
      )}
    >
      {children ?? name}
    </a>
  )
}
