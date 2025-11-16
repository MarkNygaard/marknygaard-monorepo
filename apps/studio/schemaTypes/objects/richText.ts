import { ImageIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

const richTextMembers = [
  defineArrayMember({
    name: "block",
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
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
        { title: "Code", value: "code" },
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
