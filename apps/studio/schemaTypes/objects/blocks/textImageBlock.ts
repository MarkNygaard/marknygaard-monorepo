import { FileImage } from "lucide-react"
import { defineField, defineType } from "sanity"

export const textImageBlock = defineType({
  name: "textImageBlock",
  title: "Text & Image",
  icon: FileImage,
  type: "object",
  description: "A section combining rich text content with an image, with flexible layout options",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Main heading for this section",
      validation: (Rule) => Rule.required().error("Title is required"),
    }),
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
      description: "Rich text content with formatting options",
      validation: (Rule) => Rule.required().error("Content is required"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "Image to display alongside the text",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Image is required"),
    }),
    defineField({
      name: "imagePosition",
      type: "string",
      title: "Image Position",
      description: "Choose which side to display the image",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "left",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      blockTitle: "blockTitle",
      image: "image",
      imagePosition: "imagePosition",
    },
    prepare({ title, blockTitle, image, imagePosition }) {
      return {
        title: blockTitle || title || "Text & Image",
        subtitle: `Image on ${imagePosition || "left"}`,
        media: image,
      }
    },
  },
})
