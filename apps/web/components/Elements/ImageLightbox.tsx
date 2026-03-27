"use client"

import type { SanityAsset } from "@sanity/image-url"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/dialog"
import { SanityImage } from "@/components/SanityImage/SanityImage"

interface ImageLightboxProps {
  image: SanityAsset
  alt: string
}

export function ImageLightbox({ image, alt }: ImageLightboxProps) {
  return (
    <div className="my-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <SanityImage image={image} alt={alt} className="h-auto w-full rounded-lg" />
          </div>
        </DialogTrigger>
        <DialogContent
          className="border-none bg-transparent p-0 shadow-none sm:max-w-none"
          showCloseButton={false}
        >
          <DialogTitle className="hidden">{alt}</DialogTitle>
          <DialogClose className="flex justify-center focus:outline-none">
            <SanityImage image={image} alt={alt} />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
