import { ImageIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

export const galleryBlock = defineType({
  name: "galleryBlock",
  title: "Gallery",
  icon: ImageIcon,
  type: "object",
  description: "An image gallery displayed as a carousel",
  fields: [
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      description: "Add images to the gallery carousel",
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe the image for accessibility",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(2).error("A gallery needs at least 2 images"),
    }),
    defineField({
      name: "fadeIn",
      type: "boolean",
      title: "Fade In Animation",
      description: "Enable fade-in animation for this block",
      initialValue: false,
    }),
    defineField({
      name: "fadeInDelay",
      type: "number",
      title: "Fade In Delay (seconds)",
      description: "Delay before the fade-in animation starts (in seconds)",
      hidden: ({ parent }) => !parent?.fadeIn,
      validation: (Rule) => Rule.min(0).max(10),
    }),
  ],
  preview: {
    select: {
      images: "images",
    },
    prepare({ images }) {
      const count = images?.length || 0
      return {
        title: "Gallery",
        subtitle: `${count} image${count === 1 ? "" : "s"}`,
        media: ImageIcon,
      }
    },
  },
})
