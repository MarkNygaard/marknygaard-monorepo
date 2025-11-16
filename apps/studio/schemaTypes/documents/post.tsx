import { FileText } from "lucide-react"
import { defineField, defineType } from "sanity"
import { GROUP, GROUPS } from "../../utils/constant"

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: FileText,
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Post title is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Cover image is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required().error("Excerpt is required and should be max 160 characters"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required().error("Author is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Published date is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "postPageBuilder",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: GROUP.SEO,
    }),
    defineField({
      name: "og",
      title: "Open Graph",
      type: "og",
      group: GROUP.OG,
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "coverImage",
    },
    prepare({ title, author, media }) {
      return {
        title: title || "Untitled Post",
        subtitle: author ? `By ${author}` : "No author",
        media,
      }
    },
  },
})
