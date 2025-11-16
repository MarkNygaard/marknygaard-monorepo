import { RichText } from "@/components/Elements/RichText"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"

type RichTextBlockProps = PagebuilderType<"richTextBlock">

export function RichTextBlock({ content }: RichTextBlockProps) {
  if (!content) {
    return null
  }

  return <RichText value={content} />
}
