import { CodeBlockIcon, ImageIcon, ImagesIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

const richTextMembers = [
  defineArrayMember({
    name: "block",
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H1", value: "h1" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "H5", value: "h5" },
      { title: "H6", value: "h6" },
      { title: "Inline", value: "inline" },
    ],
    lists: [
      { title: "Numbered", value: "number" },
      { title: "Bullet", value: "bullet" },
    ],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          fields: [
            {
              name: "href",
              type: "url",
              title: "URL",
            },
            {
              name: "blank",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    name: "paragraph",
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [],
    marks: {
      decorators: [
        { title: "Strong", value: "strong" },
        { title: "Emphasis", value: "em" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          fields: [
            {
              name: "href",
              type: "url",
              title: "URL",
            },
            {
              name: "blank",
              title: "Open in new tab",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    },
  }),
  defineArrayMember({
    name: "image",
    type: "image",
    icon: ImageIcon,
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "caption",
        type: "string",
        title: "Caption Text",
      }),
    ],
  }),
  defineArrayMember({
    name: "gallery",
    type: "object",
    title: "Gallery",
    icon: ImagesIcon,
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
          media: ImagesIcon,
        }
      },
    },
  }),
  defineArrayMember({
    name: "code",
    type: "object",
    title: "Code Block",
    icon: CodeBlockIcon,
    fields: [
      defineField({
        name: "code",
        type: "text",
        title: "Code",
        rows: 10,
      }),
      defineField({
        name: "language",
        type: "string",
        title: "Language",
        options: {
          list: [
            { title: "JavaScript", value: "javascript" },
            { title: "TypeScript", value: "typescript" },
            { title: "JSX", value: "jsx" },
            { title: "TSX", value: "tsx" },
            { title: "HTML", value: "html" },
            { title: "CSS", value: "css" },
            { title: "Python", value: "python" },
            { title: "Bash", value: "bash" },
            { title: "JSON", value: "json" },
            { title: "Markdown", value: "markdown" },
            { title: "SQL", value: "sql" },
            { title: "GraphQL", value: "graphql" },
            { title: "YAML", value: "yaml" },
            { title: "Go", value: "go" },
            { title: "Rust", value: "rust" },
            { title: "Java", value: "java" },
            { title: "C#", value: "csharp" },
            { title: "PHP", value: "php" },
            { title: "Ruby", value: "ruby" },
          ],
        },
        initialValue: "javascript",
      }),
      defineField({
        name: "filename",
        type: "string",
        title: "Filename",
        description: "Optional filename to display",
      }),
      defineField({
        name: "highlightedLines",
        type: "array",
        title: "Highlighted Lines",
        description: "Line numbers to highlight (optional)",
        of: [{ type: "number" }],
      }),
    ],
    preview: {
      select: {
        code: "code",
        language: "language",
        filename: "filename",
      },
      prepare({ code, language, filename }) {
        const codePreview = code ? code.split("\n")[0].substring(0, 50) : "Empty code block"
        return {
          title: filename || `${language || "code"} block`,
          subtitle: codePreview,
        }
      },
    },
  }),
]

export const richText = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: richTextMembers.filter((member) => member.name !== "paragraph"),
})

export const memberTypes = richTextMembers.map((member) => member.name)

type Type = NonNullable<(typeof memberTypes)[number]>

export const customRichText = (
  type: Type[],
  options?: { name?: string; title?: string; group?: string },
) => {
  const { name } = options ?? {}
  const customMembers = richTextMembers.filter(
    (member) => member.name && type.includes(member.name),
  )
  return defineField({
    ...options,
    name: name ?? "richText",
    type: "array",
    of: customMembers,
  })
}
