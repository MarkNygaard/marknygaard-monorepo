import { GlobeIcon } from "lucide-react"
import { defineField, defineType } from "sanity"

export const globalSeo = defineType({
  name: "globalSeo",
  title: "Global SEO",
  type: "document",
  icon: GlobeIcon,
  fields: [
    defineField({
      name: "seoIndexing",
      title: "Indexing",
      description: "Control whether search engines should index this market.",
      type: "string",
      options: {
        list: [
          { title: "Index", value: "index" },
          { title: "Do not index", value: "noindex" },
        ],
        layout: "radio",
      },
      initialValue: "index",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global SEO",
      }
    },
  },
})
