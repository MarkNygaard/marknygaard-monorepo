"use client"

import type { SanityAsset } from "@sanity/image-url"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/carousel"
import { Button } from "@workspace/ui/components/button"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@workspace/ui/dialog"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { SanityImage } from "@/components/SanityImage/SanityImage"

interface GalleryImage extends SanityAsset {
  alt?: string
  _key: string
}

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleImageClick = useCallback((index: number) => {
    setSelectedIndex(index)
    setOpen(true)
  }, [])

  const goToPrevious = useCallback(() => {
    setSelectedIndex((i) => (i > 0 ? i - 1 : i))
  }, [])

  const goToNext = useCallback(() => {
    setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : i))
  }, [images.length])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, goToPrevious, goToNext])

  if (!images || images.length === 0) return null

  const currentImage = images[selectedIndex]

  return (
    <div className="my-6">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={image._key} className="basis-[85%] pl-2 md:basis-[85%] md:pl-4">
              <button
                type="button"
                className="w-full cursor-pointer text-left"
                onClick={() => handleImageClick(index)}
              >
                <SanityImage
                  image={image}
                  alt={image.alt || ""}
                  className="h-auto w-full rounded-lg"
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="border-none bg-transparent shadow-none focus:outline-none sm:max-w-[90vw]"
          showCloseButton={false}
        >
          <DialogTitle className="hidden">{currentImage?.alt}</DialogTitle>

          {currentImage && (
            <DialogClose className="flex justify-center focus:outline-none">
              <SanityImage image={currentImage} alt={currentImage.alt || ""} sizes="90vw" />
            </DialogClose>
          )}
          {selectedIndex > 0 && (
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="fixed top-1/2 left-[2%] z-50 size-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
            >
              <ArrowLeft className="size-5" />
              <span className="sr-only">Previous image</span>
            </Button>
          )}

          {selectedIndex < images.length - 1 && (
            <Button
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="fixed top-1/2 right-[2%] z-50 size-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
            >
              <ArrowRight className="size-5" />
              <span className="sr-only">Next image</span>
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
