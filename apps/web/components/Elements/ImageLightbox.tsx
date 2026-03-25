"use client"

import type { SanityAsset } from "@sanity/image-url"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@workspace/ui/dialog"
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
          className="w-fit border-none bg-transparent p-0 shadow-none sm:max-w-fit"
          style={{ maxWidth: "90vw" }}
          showCloseButton={false}
        >
          <DialogClose className="focus:outline-none">
            <SanityImage
              image={image}
              alt={alt}
              className="h-auto w-auto max-w-full rounded-lg object-contain"
              style={{ maxHeight: "85vh" }}
              sizes="90vw"
            />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
