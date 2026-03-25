"use client"

import { cn } from "@workspace/common/cn"
import { Gallery } from "@/components/Elements/Gallery"
import type { PagebuilderType } from "@/features/page-builder/types/pagebuilder"

type GalleryBlockProps = PagebuilderType<"galleryBlock">

export function GalleryBlock({ images, fadeIn, fadeInDelay }: GalleryBlockProps) {
  if (!images || images.length === 0) return null

  return (
    <div
      className={cn("mx-auto max-w-6xl", {
        "animate-fade-in-up opacity-0": fadeIn,
      })}
      style={fadeIn && fadeInDelay ? { animationDelay: `${fadeInDelay}s` } : undefined}
    >
      <Gallery images={images} />
    </div>
  )
}
