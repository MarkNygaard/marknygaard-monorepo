import type { ChatbotConversation } from "@workspace/supabase/types"
import { format } from "date-fns"
import { renderMessageWithLinks } from "@/lib/render-message"

type ConversationThreadProps = {
  messages: ChatbotConversation[]
}

export function ConversationThread({ messages }: ConversationThreadProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, _index) => {
        const isUser = message.role === "user"
        return (
          <div className={`flex ${isUser ? "justify-end" : "justify-start"}`} key={message.id}>
            <div className="max-w-[80%] space-y-2">
              <div
                className={`whitespace-pre-wrap rounded-2xl px-4 py-3 shadow-sm ${
                  isUser
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md bg-muted dark:bg-zinc-800"
                }`}
              >
                {renderMessageWithLinks(message.content)}
              </div>

              <div className="flex items-center gap-2 px-2 text-muted-foreground text-xs">
                <span className="capitalize">{message.role}</span>
                <span>•</span>
                <span>{format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm:ss a")}</span>
                {message.metadata && (
                  <>
                    <span>•</span>
                    <span className="truncate" title={JSON.stringify(message.metadata)}>
                      Has metadata
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
