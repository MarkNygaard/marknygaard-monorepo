import { cn } from "@workspace/common/cn"
import { RichText } from "@/components/Elements/RichText"
import type { POST_QUERYResult } from "@/types/sanity"
import SectionClient from "./SectionClient"

type SectionBlock = NonNullable<NonNullable<POST_QUERYResult>["pageBuilder"]>[number]

interface SectionProps {
  section: SectionBlock
  level?: number
}

export function Section({ section, level = 0 }: SectionProps) {
  if (!section || section._type !== "sectionBlock") return null

  // Define an indentation style based on the level
  const indentationStyle = {
    paddingLeft: `${level > 0 ? 15 : 0}px`,
  }

  // Define heading size based on the level
  const headingSizes = ["text-2xl", "text-xl", "text-lg", "text-base", "text-sm"]
  const headingSize = headingSizes[level] || "text-2xl"

  return (
    <SectionClient
      id={section._key}
      name={section.name}
      level={level}
      indentationStyle={indentationStyle}
    >
      {section.name && (
        <div
          className={cn(
            "mb-2 pt-4 font-semibold text-gray-900 dark:border-gray-800 dark:text-gray-100",
            headingSize,
          )}
        >
          {section.name}
        </div>
      )}
      {section.content && <RichText value={section.content} />}
      {section.sections && section.sections.length > 0 && (
        <div>
          {section.sections.map((nestedSection) => (
            <Section
              key={nestedSection._key}
              section={nestedSection as SectionBlock}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </SectionClient>
  )
}
