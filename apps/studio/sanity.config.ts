import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { presentationTool } from "sanity/presentation"
import { structureTool } from "sanity/structure"
import { locations, mainDocuments } from "./lib/presentation/resolve"
import { schemaTypes, singletonType } from "./schemaTypes"
import { structure } from "./structure"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    "Missing required environment variables: SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET",
  )
}

// Define which actions are allowed for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define which document types should be treated as singletons
const singletonTypes = new Set<string>(singletonType)

export default defineConfig({
  name: "default",
  title: "marknygaard",

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PRESENTATION_URL ?? "http://localhost:3000",
        preview: `/`,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        mainDocuments,
        locations,
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global "Create" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Filter actions for singleton documents to remove duplicate and delete
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
