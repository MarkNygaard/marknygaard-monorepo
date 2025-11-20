import { assertValue } from "@workspace/common/assertValue"

export function getEnvironment() {
  const sanityProjectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
  )

  const sanityDataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
  )

  const sanityApiVersion = assertValue(
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-03-01",
    "Missing environment variable: NEXT_PUBLIC_SANITY_API_VERSION",
  )

  const sanityApiReadToken = assertValue(
    process.env.SANITY_API_READ_TOKEN,
    "Missing environment variable: SANITY_API_READ_TOKEN",
  )

  const sanityStudioUrl = assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
    "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_URL",
  )

  const siteUrl = assertValue(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "Missing environment variable: NEXT_PUBLIC_SITE_URL",
  )

  const ogImage = assertValue(
    process.env.NEXT_PUBLIC_OG_IMAGE || "https://placehold.co/1200x630",
    "Missing environment variable: NEXT_PUBLIC_OG_IMAGE",
  )

  return {
    sanity: {
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      studioUrl: sanityStudioUrl,
      apiReadToken: sanityApiReadToken,
    },
    site: {
      siteUrl: siteUrl,
      ogImage: ogImage,
    },
  }
}
