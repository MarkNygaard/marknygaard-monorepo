/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */
import { assertValue } from "@workspace/common/assertValue"

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET",
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
)

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = assertValue(
  process.env.SANITY_STUDIO_APIVERSION || "2025-03-01",
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
)
