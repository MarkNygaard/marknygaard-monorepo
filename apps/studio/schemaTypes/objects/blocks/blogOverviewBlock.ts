import { Newspaper } from "lucide-react"
import { defineField, defineType } from "sanity"

export const blogOverviewBlock = defineType({
  name: "blogOverviewBlock",
  title: "Blog Overview",
  icon: Newspaper,
  type: "object",
  description: "Display a list of all blog posts",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Block Title (Internal)",
      description:
        "Optional title for identifying this block in the editor (not displayed on frontend)",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Blog Overview",
        subtitle: "Displays all blog posts",
      }
    },
  },
})
