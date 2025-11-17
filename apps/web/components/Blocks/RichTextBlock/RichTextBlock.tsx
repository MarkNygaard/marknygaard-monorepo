import { cn } from "@workspace/common/cn"
import { RichText } from "@/components/Elements/RichText"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"
import TextAnimation from "./TextAnimation"

type RichTextBlockProps = PagebuilderType<"richTextBlock">

export function RichTextBlock({ _key, fadeIn, fadeInDelay, content, width }: RichTextBlockProps) {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn("mr-auto", {
        "w-full": width === "full",
        "w-2/3": width === "two-thirds",
      })}
    >
      {fadeIn ? (
        <TextAnimation
          id={_key}
          fadeIn={fadeIn}
          fadeInDelay={fadeInDelay || 0}
          className={cn("mr-auto", {
            "w-full": width === "full",
            "w-2/3": width === "two-thirds",
          })}
        >
          <RichText value={content} />
        </TextAnimation>
      ) : (
        <RichText value={content} />
      )}
    </div>
  )
}
