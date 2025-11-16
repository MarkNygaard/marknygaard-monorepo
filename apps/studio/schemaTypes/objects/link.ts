import { Link } from "lucide-react"
import { defineField, defineType } from "sanity"

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Link Text",
      description: "The text that will be displayed for this navigation link",
      validation: (rule) => rule.required().error("Link text is required"),
    }),
    defineField({
      name: "linkType",
      type: "string",
      title: "Link Type",
      options: {
        list: [
          { title: "Internal Page", value: "internal" },
          { title: "External URL", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal Page",
      to: [{ type: "homePage" }, { type: "page" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: (rule) =>
        rule.custom((value, context) => {
          const linkType = (context.parent as any)?.linkType
          if (linkType === "internal" && !value) {
            return "Internal page is required when link type is internal"
          }
          return true
        }),
    }),
    defineField({
      name: "externalLink",
      type: "url",
      title: "External URL",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (rule) =>
        rule.custom((value, context) => {
          const linkType = (context.parent as any)?.linkType
          if (linkType === "external" && !value) {
            return "External URL is required when link type is external"
          }
          return true
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      description: "If checked, the link will open in a new tab",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      linkType: "linkType",
      internalLink: "internalLink.title",
      externalLink: "externalLink",
      openInNewTab: "openInNewTab",
    },
    prepare: ({ title, externalLink, linkType, internalLink, openInNewTab }) => {
      const newTabIndicator = openInNewTab ? " ↗" : ""
      const linkTarget = linkType === "internal" ? internalLink : externalLink

      return {
        title: title || "Untitled Link",
        subtitle: `${linkType === "internal" ? "Internal" : "External"}: ${linkTarget}${newTabIndicator}`,
      }
    },
  },
})
