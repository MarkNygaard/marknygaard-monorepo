import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemaTypes"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    "Missing required environment variables: SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET",
  )
}

export default defineConfig({
  name: "default",
  title: "marknygaard",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
