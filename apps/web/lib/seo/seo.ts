import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import type { Metadata } from "next"
import { getEnvironment } from "@/lib/getEnvironment"
import { sanityFetch } from "@/lib/sanity/live"
import type { GLOBAL_SEO_QUERYResult, PAGE_QUERYResult } from "@/types/sanity"

import { urlFor } from "../sanity/image"
import { GLOBAL_SEO_QUERY } from "../sanity/queries"

const { site } = getEnvironment()

// Fetch global SEO data with caching
export async function getGlobalSeoData(): Promise<GLOBAL_SEO_QUERYResult> {
  try {
    const { data: globalSeoData } = await sanityFetch({
      query: GLOBAL_SEO_QUERY,
    })
    return globalSeoData
  } catch (error) {
    console.error("Failed to fetch global SEO data:", error)
    return null
  }
}

function resolveImageUrl(image: SanityImageSource | null | undefined): string | undefined {
  if (!image) return undefined

  return urlFor(image).width(1200).height(630).auto("format").url()
}

export type SeoQueryData = NonNullable<PAGE_QUERYResult>["seo"]

// Helper function to format metadata from Sanity data
export async function formatMetaDataFromSanity({
  data,
  slug,
  title,
}: {
  data: SeoQueryData
  slug: string
  title: string
}): Promise<Metadata> {
  const seoNoIndex = data?.seoIndexing === "noindex"
  const image = data?.seoImage

  // Fetch global SEO data
  const globalSeoData = await getGlobalSeoData()

  // Normalize slug to ensure it starts with "/"
  const pageUrl = slug.startsWith("/") ? slug : `/${slug}`

  // Use global data as fallbacks, then site config
  const defaultTitle = data?.seoTitle || title || globalSeoData?.title || ""

  // Apply global SEO suffix if available and there's room

  const finalTitle = defaultTitle.length <= 65 ? defaultTitle : defaultTitle

  // Use hierarchical indexing logic:
  // 1. If market is set to "noindex", it cannot be overridden (always noindex)
  // 2. If market is set to "index", page-level setting can override it
  const shouldIndex =
    globalSeoData?.seoIndexing === "noindex"
      ? false // Market-level noindex cannot be overridden
      : !seoNoIndex // Market-level index can be overridden by page setting

  return {
    title: finalTitle,
    description: data?.seoDescription,
    metadataBase: new URL(site.siteUrl),
    icons: {
      icon: "/favicon.ico",
    },
    robots: shouldIndex ? "index, follow" : "noindex, nofollow",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      description: data?.seoDescription,
      title: finalTitle,
      images: [
        {
          url: resolveImageUrl(image) || site.ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      url: pageUrl,
    },
  }
}
