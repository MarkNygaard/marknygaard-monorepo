"use client"

import { Button } from "@workspace/ui/button"
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  function goToConversations() {
    window.location.href = "/conversations"
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Something went wrong</h1>
          <p className="text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button onClick={goToConversations} variant="outline">
            Go to conversations
          </Button>
        </div>
      </div>
    </div>
  )
}
