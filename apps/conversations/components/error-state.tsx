import { Button } from "@workspace/ui/button"
import { Card } from "@workspace/ui/card"
import { AlertCircle } from "lucide-react"

type ErrorStateProps = {
  title?: string
  message?: string
  retry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading the data. Please try again.",
  retry,
}: ErrorStateProps) {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mb-2 font-semibold text-lg">{title}</h3>
      <p className="mb-4 text-muted-foreground text-sm">{message}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </Card>
  )
}
