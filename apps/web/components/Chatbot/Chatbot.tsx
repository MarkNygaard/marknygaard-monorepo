"use client"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Loader2, SendIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

function getOrCreateSessionId(): string {
  const storageKey = "chatbot_session_id"
  const existing = sessionStorage.getItem(storageKey)
  if (existing) return existing

  const newId = generateSessionId()
  sessionStorage.setItem(storageKey, newId)
  return newId
}

function renderMessageWithLinks(text: string): React.ReactNode {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match = urlRegex.exec(text)

  while (match !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Remove trailing punctuation from URL
    let url = match[0]
    let trailingPunctuation = ""
    const punctuationRegex = /[).,;:!?]+$/
    const punctuationMatch = url.match(punctuationRegex)
    if (punctuationMatch) {
      trailingPunctuation = punctuationMatch[0]
      url = url.slice(0, -trailingPunctuation.length)
    }

    // Add the URL as a clickable link
    const domainPattern = /^https?:\/\/(www\.)?marknygaard\.dk\//
    const domainMatch = url.match(domainPattern)

    if (domainMatch) {
      // Internal link - use Next.js Link
      const href = url.slice(domainMatch[0].length - 1)
      parts.push(
        <Link key={`link-${match.index}`} href={href} className="underline hover:opacity-80">
          {url}
        </Link>,
      )
    } else {
      // External link - use regular anchor tag
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          {url}
        </a>,
      )
    }

    // Add the trailing punctuation as plain text
    if (trailingPunctuation) {
      parts.push(trailingPunctuation)
    }

    lastIndex = match.index + match[0].length
    match = urlRegex.exec(text)
  }

  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export function Chatbot() {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([])
  const [isComposing, setIsComposing] = useState(false)
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const sessionId = useMemo(() => getOrCreateSessionId(), [])

  // Fetch conversation history on mount
  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch(`/api/chat?sessionId=${sessionId}`)
        if (response.ok) {
          const history = await response.json()
          if (Array.isArray(history) && history.length > 0) {
            setConversation(history)
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error)
      } finally {
        setIsLoadingHistory(false)
      }
    }
    fetchHistory()
  }, [sessionId])

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const endpoint = "/api/chat"
      console.log("Sending to endpoint:", endpoint)
      console.log("Payload:", { question: message, sessionId })

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          sessionId,
        }),
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response error:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      console.log("Response data:", data)
      return Array.isArray(data) ? data[0]?.output : data.answer
    },
  })

  useEffect(() => {
    if (!containerRef) return
    containerRef.scrollTo({
      top: containerRef.scrollHeight,
      behavior: "smooth",
    })
  }, [containerRef])

  async function handleSend(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessage("")
    // show user message immediately
    setConversation((prev) => [...prev, { role: "user", content: trimmed }])
    try {
      const response = await sendMessage(trimmed)
      setConversation((prev) => [...prev, { role: "assistant", content: response }])
    } catch (err) {
      console.error("Chat error:", err)
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setConversation((prev) => [...prev, { role: "assistant", content: `Error: ${errorMessage}` }])
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={setContainerRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {isLoadingHistory && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoadingHistory && conversation.length === 0 && (
          <div className="text-center text-muted-foreground text-sm">
            <p>Hi there! 👋</p>
            <p className="pt-2">
              I'm here to help you learn more about my work, projects, and blog posts. What would
              you like to know?
            </p>
          </div>
        )}
        {conversation.map((item, index) => {
          const isUser = item.role === "user"
          return (
            <div
              key={`${item.role}-${index}`}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm shadow-sm ${isUser ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted dark:bg-zinc-800"}`}
              >
                {renderMessageWithLinks(item.content)}
              </div>
            </div>
          )
        })}
        {isPending && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-muted px-4 py-2 text-sm shadow-sm">
              <div className="flex items-center gap-1">
                <span className="sr-only">Assistant is typing…</span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-foreground/60"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-foreground/60"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-foreground/60"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing && message.trim()) {
                e.preventDefault()
                const text = message
                handleSend(text)
              }
            }}
            className="border-gray-300 dark:border-zinc-800"
          />
          <Button
            disabled={isPending || !message.trim()}
            onClick={async () => {
              handleSend(message)
            }}
          >
            {isPending ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="mr-1 h-4 w-4" />
            )}{" "}
            Send
          </Button>
        </div>
        <p className="mt-2 text-muted-foreground text-xs">
          Press Enter to send • Shift+Enter for newline
        </p>
      </div>
    </div>
  )
}
