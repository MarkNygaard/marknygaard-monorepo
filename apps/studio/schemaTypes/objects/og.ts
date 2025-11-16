import { InsertAboveIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const og = defineType({
  name: "og",
  title: "Open Graph",
  type: "object",
  icon: InsertAboveIcon,
  fields: [
    defineField({
      name: "ogTitle",
      title: "Open graph title override",
      description:
        "This will override the open graph title. If left blank it will inherit the page title.",
      type: "string",
      validation: (Rule) => Rule.warning("A page title is required"),
    }),
    defineField({
      name: "ogDescription",
      title: "Open graph description override",
      description:
        "This will override the meta description. If left blank it will inherit the description from the page description.",
      type: "text",
      rows: 2,
      validation: (Rule) => [
        Rule.warning("A description is required"),
        Rule.max(160).warning("No more than 160 characters"),
      ],
    }),
  ],
  preview: {
    select: {
      title: "ogTitle",
      description: "ogDescription",
    },
    prepare({ title, description }) {
      return {
        title: title || "Open Graph (using defaults)",
        subtitle: description || "No custom OG description",
      }
    },
  },
})
