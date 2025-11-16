import { FileText } from "lucide-react"
import { defineField, defineType } from "sanity"

interface PortableTextChild {
  _type?: string
  text?: string
}

interface PortableTextBlock {
  _type: string
  children?: PortableTextChild[]
}

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  icon: FileText,
  type: "object",
  description: "A flexible rich text editor with formatting, headings, lists, and images",
  fields: [
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
      description: "Rich text content with formatting options",
      validation: (Rule) => Rule.required().error("Content is required"),
    }),
    defineField({
      name: "blockTitle",
      type: "string",
      title: "Block Title (Internal)",
      description:
        "Optional title for identifying this block in the editor (not displayed on frontend)",
    }),
  ],
  preview: {
    select: {
      content: "content",
      blockTitle: "blockTitle",
    },
    prepare({ content, blockTitle }) {
      const blocks = content as PortableTextBlock[] | undefined

      const textContent =
        blocks && blocks.length > 0
          ? blocks.find((block) => block._type === "block" || block._type === "paragraph")
          : null

      const previewText = textContent?.children
        ? textContent.children
            .filter(
              (child): child is PortableTextChild & { text: string } =>
                typeof child.text === "string",
            )
            .map((child) => child.text)
            .join(" ")
            .slice(0, 100) +
          (textContent.children.some((child) => child.text && child.text.length > 100) ? "..." : "")
        : "Empty rich text block"

      return {
        title: blockTitle || "Rich Text",
        subtitle: previewText,
      }
    },
  },
})
