import { getImageDimensions } from "@sanity/asset-utils"
import type { FitMode, SanityAsset } from "@sanity/image-url"
import { cn } from "@workspace/common/cn"
import { stegaClean } from "next-sanity"
import { urlFor } from "@/lib/sanity/image"

type AspectRatio =
  | "square" // 1:1
  | "video" // 16:9
  | "photo" // 4:3
  | "portrait" // 3:4
  | "wide" // 3:2
  | "cinema" // 2.35:1
  | "cover" // 2:1

export interface SanityImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "srcSet" | "width" | "height" | "loading" | "alt"
  > {
  image: SanityAsset
  width?: number
  height?: number
  fixedHeight?: number
  quality?: number
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min"
  bg?: string
  alt?: string | null
  className?: string
  sizes?: string
  srcSetBreakpoints?: number[]
  priority?: boolean
  showPlaceholder?: boolean
  fill?: boolean
  aspectRatio?: AspectRatio
}

/**
 * Server-side Sanity Image Component
 *
 * This is a React Server Component that:
 * - Generates zero JavaScript footprint
 * - Can be rendered and cached on the server
 * - Uses Sanity's auto format for optimal browser support (WebP/AVIF/JPEG)
 * - Uses native lazy loading and priority loading
 * - Automatically applies Sanity's hotspot/crop data
 */

const DEFAULT_BREAKPOINTS = [320, 480, 640, 1024, 1536, 1920, 3840]

// Helper function to convert aspect ratio names to ratio strings (e.g., "square" → "1/1")
const getAspectRatioValue = (ratio: AspectRatio): string => {
  switch (ratio) {
    case "square":
      return "1/1"
    case "video":
      return "16/9"
    case "photo":
      return "4/3"
    case "portrait":
      return "3/4"
    case "wide":
      return "3/2"
    case "cinema":
      return "2.35/1"
    case "cover":
      return "2/1"
  }
}

export function SanityImage({
  image,
  width,
  height,
  fixedHeight,
  quality = 85,
  fit = "max",
  bg,
  alt,
  className,
  sizes,
  srcSetBreakpoints = DEFAULT_BREAKPOINTS,
  priority = false,
  showPlaceholder = true,
  fill = false,
  aspectRatio,
  ...props
}: SanityImageProps) {
  // Get original image dimensions
  const dimensions = getImageDimensions(image)
  const cleanAspectRatio = stegaClean(aspectRatio)

  // Calculate dimensions based on aspect ratio if provided
  const calculateDimensionsFromAspectRatio = (
    maxWidth: number,
    maxHeight: number,
    ratio: AspectRatio,
  ) => {
    const ratioValue = getAspectRatioValue(ratio)
    const [widthPart = 1, heightPart = 1] = ratioValue.split("/").map(Number)
    const targetRatio = widthPart / heightPart

    // Calculate dimensions that fit within both width and height constraints
    const widthBasedHeight = maxWidth / targetRatio
    const heightBasedWidth = maxHeight * targetRatio

    if (widthBasedHeight <= maxHeight) {
      // Width is the constraining factor
      return {
        width: maxWidth,
        height: Math.round(widthBasedHeight),
      }
    } else {
      // Height is the constraining factor
      return {
        width: Math.round(heightBasedWidth),
        height: maxHeight,
      }
    }
  }

  // Helper to calculate height from width and aspect ratio
  const calculateHeightFromWidth = (targetWidth: number, ratio: AspectRatio) => {
    const ratioValue = getAspectRatioValue(ratio)
    const [widthPart = 1, heightPart = 1] = ratioValue.split("/").map(Number)
    return Math.round(targetWidth * (heightPart / widthPart))
  }

  // Use provided dimensions or fall back to original or calculate from aspect ratio
  let finalWidth = width || dimensions.width
  let finalHeight = fixedHeight || height || dimensions.height

  // If aspect ratio is provided, calculate optimal dimensions
  if (cleanAspectRatio) {
    if (!width && !height && !fixedHeight) {
      // Use reasonable max dimensions for responsive images (largest breakpoint)
      const maxBreakpoint = Math.max(...srcSetBreakpoints)
      const calculated = calculateDimensionsFromAspectRatio(
        Math.min(dimensions.width, maxBreakpoint),
        Math.min(dimensions.height, maxBreakpoint),
        cleanAspectRatio,
      )
      finalWidth = calculated.width
      finalHeight = calculated.height
    } else if (width && !height && !fixedHeight) {
      // Calculate height from provided width and aspect ratio
      finalHeight = calculateHeightFromWidth(width, cleanAspectRatio)
    }
  }

  // Automatically use crop when aspect ratio or fixed height is specified (for better filling)
  const effectiveFit = cleanAspectRatio || fixedHeight ? "crop" : fit

  // Build base image builder with transformations
  let baseBuilder = urlFor(image).quality(quality).fit(effectiveFit)

  // Apply background color if provided
  if (bg) baseBuilder = baseBuilder.bg(bg)

  // Generate srcset for different breakpoints with auto format
  const generateSrcSet = () => {
    return srcSetBreakpoints
      .filter((breakpoint) => breakpoint <= finalWidth * 4)
      .map((breakpoint) => {
        let builder = baseBuilder.width(breakpoint)

        // Calculate height based on aspect ratio or proportional scaling
        if (cleanAspectRatio && !fixedHeight) {
          // Calculate exact height for this width using the aspect ratio
          const calculatedHeight = calculateHeightFromWidth(breakpoint, cleanAspectRatio)
          builder = builder.height(calculatedHeight)
        } else if (fixedHeight) {
          // Use fixed height for all breakpoints
          builder = builder.height(fixedHeight)
        } else if (finalHeight && finalWidth) {
          // Scale height maintaining aspect ratio
          const scaledHeight = Math.round((breakpoint / finalWidth) * finalHeight)
          builder = builder.height(scaledHeight)
        }

        // Always use auto format
        return `${builder.auto("format").url()} ${breakpoint}w`
      })
      .join(", ")
  }

  // Generate fallback image URL with auto format
  const fallbackSrc = (() => {
    let builder = baseBuilder.auto("format")
    if (cleanAspectRatio && !fixedHeight) {
      // Use aspect ratio to calculate exact dimensions
      builder = builder.width(finalWidth).height(finalHeight)
    } else {
      if (finalWidth) builder = builder.width(finalWidth)
      if (finalHeight) builder = builder.height(finalHeight)
    }
    return builder.url()
  })()

  // Generate low-quality placeholder for blur effect
  const placeholderSrc = showPlaceholder
    ? baseBuilder
        .width(20)
        .height(finalHeight ? Math.round((20 / finalWidth) * finalHeight) : 15)
        .blur(10)
        .quality(20)
        .auto("format")
        .url()
    : undefined

  // Determine alt text
  const altText = alt || ""

  // Create responsive srcset with auto format
  const srcSet = generateSrcSet()

  // Loading behavior based on priority
  const loadingProps = priority
    ? { loading: "eager" as const, fetchPriority: "high" as const }
    : { loading: "lazy" as const }

  // Check if the image is an SVG
  const isSvg = image?.asset?.url?.endsWith(".svg")

  // Placeholder styles (skip for SVGs as they don't need placeholders)
  const placeholderStyle: React.CSSProperties =
    showPlaceholder && placeholderSrc && !isSvg
      ? {
          backgroundImage: `url("${placeholderSrc}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          color: "transparent",
        }
      : {}

  // Sizing styles - different behavior for fill vs normal
  const sizingStyle: React.CSSProperties =
    fill || fixedHeight
      ? {
          // Fill/FixedHeight mode: image takes up all available space
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }
      : {
          // Normal mode: respect aspect ratio and max dimensions
          aspectRatio: `${finalWidth} / ${finalHeight}`,
          width: "100%",
          maxWidth: `${finalWidth}px`,
          height: "auto",
        }

  return (
    // biome-ignore lint: @next/next/no-img-element
    <img
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      width={finalWidth}
      height={finalHeight}
      alt={altText}
      {...loadingProps}
      decoding="async"
      className={cn(className)}
      style={{
        ...placeholderStyle,
        ...sizingStyle,
        ...props.style,
      }}
      {...props}
    />
  )
}

// Utility function to generate responsive image data (for manual use)
export function getSanityImageData(
  image: SanityAsset,
  options: {
    width?: number
    height?: number
    quality?: number
    fit?: FitMode
  } = {},
) {
  if (!image?.asset) {
    return null
  }

  const dimensions = getImageDimensions(image)
  const {
    width = dimensions.width,
    height = dimensions.height,
    quality = 85,
    fit = "max",
  } = options

  const builder = urlFor(image).quality(quality).fit(fit).auto("format")

  return {
    src: builder.width(width).height(height).url(),
    width,
    height,
    alt: image.alt || "",
    placeholder: builder
      .width(20)
      .height(Math.round((20 / width) * height))
      .blur(10)
      .quality(20)
      .url(),
  }
}
