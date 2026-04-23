"use client"

import { cn } from "@workspace/common/cn"
import Link from "next/link"
import ProgressBar from "@/components/Elements/ProgressBar"
import { useActiveSectionContext } from "@/context/ActiveSectionContext"
import type { POST_QUERY_RESULT } from "@/types/sanity"

type SectionBlock = NonNullable<NonNullable<POST_QUERY_RESULT>["pageBuilder"]>[number]

interface SectionMenuProps {
  post: POST_QUERY_RESULT
}

export default function SectionMenu({ post }: SectionMenuProps) {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  const renderMenuItems = (menu: SectionBlock, level: number = 0) => {
    if (!menu || menu._type !== "sectionBlock") return null

    return (
      <li key={menu._key} className={level > 0 ? "pl-4" : ""}>
        <Link
          onClick={() => {
            setActiveSection(menu.name)
            setTimeOfLastClick(Date.now())
          }}
          href={`#${menu.name}`}
          className={cn(
            "block py-1 hover:text-primary-foreground dark:hover:text-secondary-foreground",
            {
              "text-primary-foreground dark:text-secondary-foreground": activeSection === menu.name,
            },
          )}
        >
          {menu.name}
        </Link>
        {menu.sections && menu.sections.length > 0 && (
          <ol className="space-y-1">
            {menu.sections.map((subMenu) => renderMenuItems(subMenu as SectionBlock, level + 1))}
          </ol>
        )}
      </li>
    )
  }

  if (!post?.pageBuilder || post.pageBuilder.length === 0) {
    return null
  }

  return (
    <nav className="flex flex-col text-accent-foreground/50 text-sm">
      <ProgressBar />
      <ol className="space-y-1">
        {post.pageBuilder.map((section) => renderMenuItems(section as SectionBlock))}
      </ol>
    </nav>
  )
}
