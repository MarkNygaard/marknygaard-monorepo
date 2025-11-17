import { Star } from "lucide-react"
import { defineField, defineType } from "sanity"

export const featuredPostsBlock = defineType({
  name: "featuredPostsBlock",
  title: "Featured Posts",
  icon: Star,
  type: "object",
  description: "Display up to 3 featured blog posts",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Section Title",
      description: "Optional heading for the featured posts section",
    }),
    defineField({
      name: "posts",
      type: "array",
      title: "Featured Posts",
      description: "Select up to 3 posts to feature",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(3).error("Please select between 1 and 3 posts"),
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
      title: "title",
      blockTitle: "blockTitle",
      posts: "posts",
    },
    prepare({ title, blockTitle, posts }) {
      const postCount = posts?.length || 0
      return {
        title: blockTitle || title || "Featured Posts",
        subtitle: `${postCount} post${postCount !== 1 ? "s" : ""} selected`,
      }
    },
  },
})
