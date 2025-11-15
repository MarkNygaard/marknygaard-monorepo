import { Grid, GridItem } from "@workspace/ui/grid"
import { RichText } from "@/components/Elements/RichText"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"

type RichTextBlockProps = PagebuilderType<"richTextBlock">

export function RichTextBlock({ content }: RichTextBlockProps) {
  if (!content) {
    return null
  }

  return (
    <Grid className="px-4 py-8 lg:px-0">
      <GridItem colSpan="8" asChild>
        <RichText value={content} />
      </GridItem>
    </Grid>
  )
}
