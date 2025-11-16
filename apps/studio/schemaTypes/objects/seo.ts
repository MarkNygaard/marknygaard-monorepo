import { SearchIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO meta title override",
      description:
        "This will override the meta title. If left blank it will inherit the page title.",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .warning("A page title is required")
          .max(65)
          .warning("Keep under 65 characters for best display in search results"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO meta description override",
      description:
        "This will override the meta description. If left blank it will inherit the description from the page description.",
      type: "text",
      rows: 2,
      validation: (rule) =>
        rule
          .required()
          .warning("A description is required")
          .max(155)
          .warning("Keep under 155 characters for best display in search results")
          .min(120)
          .warning("Aim for at least 120 characters for better SEO"),
    }),
    defineField({
      name: "seoImage",
      title: "SEO image override",
      description:
        "This will override the main image. If left blank it will inherit the image from the main image.",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seoIndexing",
      title: "Indexing",
      description: "Control whether search engines should index this page.",
      type: "string",
      options: {
        list: [
          { title: "Index", value: "index" },
          { title: "Do not index", value: "noindex" },
        ],
        layout: "radio",
      },
      initialValue: "index",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoListVisibility",
      title: "List visibility",
      description: "Control whether this page should appear in list pages.",
      type: "string",
      options: {
        list: [
          { title: "Show in lists", value: "show" },
          { title: "Hide from lists", value: "hide" },
        ],
        layout: "radio",
      },
      initialValue: "show",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "seoTitle",
      description: "seoDescription",
    },
    prepare({ title, description }) {
      return {
        title: title || "SEO (using defaults)",
        subtitle: description || "No custom SEO description",
      }
    },
  },
})
