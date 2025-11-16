import { PanelTop } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: PanelTop,
  fields: [
    defineField({
      name: "logo",
      type: "image",
      description: "Site logo",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Column Links",
      validation: (rule) => rule.required().min(1).error("At least one link is required"),
      description: "The list of links to display in this column",
      of: [defineArrayMember({ type: "link" })],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Header",
      }
    },
  },
})
