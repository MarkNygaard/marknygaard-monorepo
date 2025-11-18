import { cn } from "@workspace/common/cn"
import { Typography } from "@workspace/ui/typography"
import { RichText } from "@/components/Elements/RichText"
import { SanityImage } from "@/components/SanityImage/SanityImage"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"

type TextImageBlockProps = PagebuilderType<"textImageBlock">

export function TextImageBlock({ title, content, image, imagePosition }: TextImageBlockProps) {
  if (!content || !image) {
    return null
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12">
        {/* Text Content */}
        <div
          className={cn("col-span-4 md:col-span-5 lg:col-span-8", {
            "lg:col-start-1": imagePosition === "right",
            "lg:col-start-5": imagePosition === "left",
          })}
        >
          {title && (
            <Typography variant="heading-large" className="mb-3">
              {title}
            </Typography>
          )}
          <RichText value={content} />
        </div>

        {/* Image */}
        <div
          className={cn("col-span-4 row-start-1 md:col-span-3 lg:col-span-4", {
            "lg:col-start-9": imagePosition === "right",
            "lg:col-start-1": imagePosition === "left",
          })}
        >
          <SanityImage
            image={image}
            alt={title || ""}
            aspectRatio="square"
            className="rounded-lg lg:hidden"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <SanityImage
            image={image}
            alt={title || ""}
            aspectRatio="portrait"
            className="hidden rounded-lg lg:block"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
