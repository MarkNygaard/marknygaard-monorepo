import { createClient } from "next-sanity"
import { getEnvironment } from "@/lib/getEnvironment"

const { sanity } = getEnvironment()

export const client = createClient({
  projectId: sanity.projectId,
  dataset: sanity.dataset,
  apiVersion: sanity.apiVersion,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: sanity.studioUrl,
  },
})
