import { Link } from "lucide-react"
import { defineField, defineType } from "sanity"

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "logo",
      type: "image",
      description: "Site logo",
    }),
    defineField({
      name: "externalLink",
      type: "string",
      title: "External URL",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return "A valid URL is required"
          const isMailto = value.startsWith("mailto:")
          try {
            if (isMailto) {
              // Basic mailto validation
              const email = value.slice(7)
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return "A valid email address is required for mailto links"
              }
            } else {
              // Validate http/https URLs
              const url = new URL(value)
              if (!["http:", "https:"].includes(url.protocol)) {
                return "URL must start with http:// or https://"
              }
            }
            return true
          } catch {
            return "A valid URL is required"
          }
        }),
    }),
  ],
  preview: {
    select: {
      externalLink: "externalLink",
      logo: "logo",
    },
    prepare({ externalLink, logo }) {
      return {
        title: externalLink,
        media: logo,
      }
    },
  },
})
