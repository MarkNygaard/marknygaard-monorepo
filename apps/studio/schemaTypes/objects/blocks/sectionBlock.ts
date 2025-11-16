import { LayoutList } from "lucide-react"
import { defineField, defineType } from "sanity"

interface PortableTextChild {
  _type?: string
  text?: string
}

interface PortableTextBlock {
  _type: string
  children?: PortableTextChild[]
}

export const sectionBlock = defineType({
  name: "sectionBlock",
  title: "Section",
  icon: LayoutList,
  type: "object",
  description: "A section with rich text content and nested subsections",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Section Name",
      description: "Name or title for this section",
      validation: (Rule) => Rule.required().error("Section name is required"),
    }),
    defineField({
      name: "content",
      type: "richText",
      title: "Content",
      description: "Rich text content for this section",
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Nested Sections",
      description: "Add subsections within this section",
      of: [{ type: "sectionBlock" }],
    }),
  ],
  preview: {
    select: {
      name: "name",
      content: "content",
      sections: "sections",
    },
    prepare({ name, content, sections }) {
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
            .slice(0, 80)
        : ""

      const sectionCount = sections?.length || 0
      const subtitle = [
        previewText && `${previewText}${previewText.length >= 80 ? "..." : ""}`,
        sectionCount > 0 && `${sectionCount} subsection${sectionCount !== 1 ? "s" : ""}`,
      ]
        .filter(Boolean)
        .join(" • ")

      return {
        title: name || "Untitled Section",
        subtitle: subtitle || "Empty section",
      }
    },
  },
})
