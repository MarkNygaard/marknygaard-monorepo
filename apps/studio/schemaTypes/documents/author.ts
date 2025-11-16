import { User } from "lucide-react"
import { defineField, defineType } from "sanity"

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: User,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Author name is required"),
    }),
    defineField({
      name: "picture",
      title: "Picture",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Author picture is required"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "picture",
    },
  },
})
