import { FileText } from "lucide-react"
import { defineField, defineType } from "sanity"

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
      const textContent =
        content && content.length > 0
          ? // biome-ignore lint: false positive - allow find for block or paragraph type
            content.find((block: any) => block._type === "block" || block._type === "paragraph")
          : null

      const previewText = textContent?.children
        ? textContent.children
            // biome-ignore lint: false positive - filtering children to extract text nodes
            .filter((child: any) => child.text)
            // biome-ignore lint: false positive - mapping children to extract text nodes
            .map((child: any) => child.text)
            .join(" ")
            .slice(0, 100) +
          // biome-ignore lint: false positive - allow ellipsis for long text nodes
          (textContent.children.some((child: any) => child.text && child.text.length > 100)
            ? "..."
            : "")
        : "Empty rich text block"

      return {
        title: blockTitle || "Rich Text",
        subtitle: previewText,
      }
    },
  },
})
