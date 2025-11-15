import { createDataAttribute } from "next-sanity"
import { getEnvironment } from "@/lib/getEnvironment"

/**
 * Creates a Sanity data attribute for visual editing
 * @param documentId - The document ID
 * @param documentType - The document type (e.g., "page", "homePage")
 * @param path - The path to the field (e.g., "pageBuilder[_key=="abc123"]" or "pageBuilder[_key=="abc123"].cards[0]")
 * @returns The data attribute string
 */
export function createSanityDataAttribute(
  documentId: string,
  documentType: string,
  path: string,
): string {
  const { sanity } = getEnvironment()

  return createDataAttribute({
    id: documentId,
    baseUrl: sanity.studioUrl,
    projectId: sanity.projectId,
    dataset: sanity.dataset,
    type: documentType,
    path,
  }).toString()
}
