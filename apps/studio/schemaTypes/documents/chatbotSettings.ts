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
    defineField({
      name: "workspaceId",
      title: "Ticket0 Workspace ID",
      description:
        "Workspace ID from your Ticket0 dashboard (e.g. ws_xxxxxxxx). The widget will not render until this is set.",
      type: "string",
      validation: (rule) =>
        rule.custom((value, context) => {
          const enabled = (context.document as { enabled?: string } | undefined)?.enabled
          if (enabled === "enabled" && !value) {
            return "Workspace ID is required when the chatbot is enabled"
          }
          return true
        }),
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
