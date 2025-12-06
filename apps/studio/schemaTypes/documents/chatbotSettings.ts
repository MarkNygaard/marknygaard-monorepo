import { MessageSquare } from "lucide-react"
import { defineField, defineType } from "sanity"

export const chatbotSettings = defineType({
  name: "chatbotSettings",
  title: "Chatbot Settings",
  type: "document",
  icon: MessageSquare,
  fields: [
    defineField({
      name: "enabled",
      title: "Enable Chatbot",
      description: "Control whether the chatbot is visible on the website.",
      type: "string",
      options: {
        list: [
          { title: "Enabled", value: "enabled" },
          { title: "Disabled", value: "disabled" },
        ],
        layout: "radio",
      },
      initialValue: "enabled",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Chatbot Settings",
      }
    },
  },
})
