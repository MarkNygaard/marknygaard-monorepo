"use client"

import { Button } from "@workspace/ui/button"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { disableDraftMode } from "./actions"

export function DisableDraftMode() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode()
      router.refresh()
    })
  return (
    <div className="fixed right-0 bottom-1 left-0 z-10 px-2 md:bottom-2 md:px-4">
      <div className="mx-auto w-fit rounded-sm border border-border bg-primary p-1 backdrop-blur-sm">
        <div className="flex items-center">
          {pending ? (
            <p className="px-4 text-primary-foreground text-sm">Disabling draft mode...</p>
          ) : (
            <>
              <p className="px-4 text-primary-foreground text-sm">
                Viewing the website in draft mode.
              </p>
              <Button
                type="button"
                onClick={disable}
                disabled={pending}
                variant="outline"
                size="sm"
                className="cursor-pointer text-primary-foreground"
              >
                Disable draft mode
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
